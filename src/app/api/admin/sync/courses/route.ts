import { NextResponse } from "next/server";
import { z } from "zod";
import { sql, eq, desc } from "drizzle-orm";
import { db } from "@/db";
import { courses, courseModules } from "@/db/schema";
import { syncAuthorized } from "@/lib/sync-auth";
import { ensureCourseTables } from "@/lib/ensure-course-tables";

const moduleSchema = z.object({
  title: z.string().min(1).max(500),
  kind: z.string().max(32).optional().nullable(),
  details: z.string().max(20000).optional().nullable(),
  sessions: z.string().max(255).optional().nullable(),
  duration: z.string().max(255).optional().nullable(),
  registrationLink: z.string().max(2000).optional().nullable(),
  sortOrder: z.number().int().min(0).max(9999).optional().default(0),
});

const courseSchema = z.object({
  slug: z.string().min(1).max(255),
  title: z.string().min(1).max(500),
  courseCode: z.string().max(64).optional().nullable(),
  certificate: z.string().max(20000).optional().nullable(),
  summary: z.string().max(5000).optional().nullable(),
  overview: z.string().max(50000).optional().nullable(),
  outcomes: z.string().max(20000).optional().nullable(),
  whoShouldEnroll: z.string().max(20000).optional().nullable(),
  assessment: z.string().max(255).optional().nullable(),
  priceExclGst: z.string().max(50).optional().nullable(),
  priceInclGst: z.string().max(50).optional().nullable(),
  fundingTags: z.array(z.string().max(64)).optional().default([]),
  brochureUrl: z.string().max(2000).optional().nullable(),
  heroImage: z.string().max(2000).optional().nullable(),
  status: z.enum(["draft", "published", "archived"]).default("draft"),
  sortOrder: z.number().int().min(0).max(9999).optional().default(0),
  seoTitle: z.string().max(500).optional().nullable(),
  seoDescription: z.string().max(5000).optional().nullable(),
  // Preserve original authoring timestamp across sync (matches posts/pages).
  createdAt: z.string().datetime().optional().nullable(),
  modules: z.array(moduleSchema).max(50).optional().default([]),
});

const payloadSchema = z.object({
  courses: z.array(courseSchema).min(1).max(200),
});

export async function POST(req: Request) {
  if (!(await syncAuthorized(req))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  // Provision tables on first sync — see ensureCourseTables docstring.
  await ensureCourseTables();

  const parsed = payloadSchema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  let upserted = 0;
  for (const c of parsed.data.courses) {
    const row = {
      slug: c.slug,
      title: c.title,
      courseCode: c.courseCode ?? null,
      certificate: c.certificate ?? null,
      summary: c.summary ?? null,
      overview: c.overview ?? null,
      outcomes: c.outcomes ?? null,
      whoShouldEnroll: c.whoShouldEnroll ?? null,
      assessment: c.assessment ?? null,
      priceExclGst: c.priceExclGst ?? null,
      priceInclGst: c.priceInclGst ?? null,
      fundingTags: c.fundingTags ?? [],
      brochureUrl: c.brochureUrl ?? null,
      heroImage: c.heroImage ?? null,
      status: c.status,
      sortOrder: c.sortOrder ?? 0,
      seoTitle: c.seoTitle ?? null,
      seoDescription: c.seoDescription ?? null,
    };
    const createdAt = c.createdAt ? new Date(c.createdAt) : null;

    await db
      .insert(courses)
      .values(createdAt ? { ...row, createdAt } : row)
      .onConflictDoUpdate({
        target: courses.slug,
        set: createdAt
          ? { ...row, createdAt, updatedAt: sql`now()` }
          : { ...row, updatedAt: sql`now()` },
      });

    const [courseRow] = await db
      .select({ id: courses.id })
      .from(courses)
      .where(eq(courses.slug, c.slug))
      .limit(1);
    if (courseRow) {
      // Replace modules wholesale (the local copy is authoritative).
      await db.delete(courseModules).where(eq(courseModules.courseId, courseRow.id));
      const mods = (c.modules ?? []).map((m, idx) => ({
        courseId: courseRow.id,
        title: m.title,
        kind: m.kind ?? null,
        details: m.details ?? null,
        sessions: m.sessions ?? null,
        duration: m.duration ?? null,
        registrationLink: m.registrationLink ?? null,
        sortOrder: m.sortOrder ?? idx,
      }));
      if (mods.length > 0) {
        await db.insert(courseModules).values(mods);
      }
    }
    upserted += 1;
  }

  return NextResponse.json({ ok: true, upserted });
}

/**
 * DELETE — remove a course by slug (cascade-deletes its modules). Same auth as POST.
 */
export async function DELETE(req: Request) {
  if (!(await syncAuthorized(req))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  await ensureCourseTables();
  const body = (await req.json().catch(() => null)) as { slug?: string } | null;
  const slug = body?.slug?.trim();
  if (!slug) return NextResponse.json({ error: "slug required" }, { status: 400 });
  const [row] = await db
    .select({ id: courses.id })
    .from(courses)
    .where(eq(courses.slug, slug))
    .limit(1);
  if (!row) return NextResponse.json({ ok: true, deleted: 0 });
  await db.delete(courses).where(eq(courses.id, row.id));
  return NextResponse.json({ ok: true, deleted: 1, slug });
}

/**
 * GET — verification probe. Returns up to 10 courses with module counts.
 */
export async function GET(req: Request) {
  if (!(await syncAuthorized(req))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  await ensureCourseTables();
  const rows = await db
    .select({
      slug: courses.slug,
      title: courses.title,
      status: courses.status,
      updatedAt: courses.updatedAt,
    })
    .from(courses)
    .orderBy(desc(courses.updatedAt))
    .limit(10);
  return NextResponse.json({ ok: true, count: rows.length, courses: rows });
}
