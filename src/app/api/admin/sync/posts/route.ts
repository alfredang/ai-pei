import { NextResponse } from "next/server";
import { z } from "zod";
import { sql, eq } from "drizzle-orm";
import { db } from "@/db";
import { posts, users, categories, tags, postTags } from "@/db/schema";
import { syncAuthorized } from "@/lib/sync-auth";

const postSchema = z.object({
  slug: z.string().min(1).max(255),
  title: z.string().min(1).max(500),
  excerpt: z.string().max(5000).optional().nullable(),
  content: z.unknown(),
  contentHtml: z.string().optional().nullable(),
  status: z.enum(["draft", "published", "archived"]).default("draft"),
  seoTitle: z.string().max(500).optional().nullable(),
  seoDescription: z.string().max(5000).optional().nullable(),
  seoKeywords: z.string().max(5000).optional().nullable(),
  ogImage: z.string().max(2000).optional().nullable(),
  canonicalUrl: z.string().max(2000).optional().nullable(),
  noIndex: z.boolean().optional().default(false),
  featuredImage: z.string().max(2000).optional().nullable(),
  readingTime: z.number().int().min(0).max(9999).optional().nullable(),
  authorEmail: z.string().email().optional().nullable(),
  categorySlug: z.string().max(255).optional().nullable(),
  tagSlugs: z.array(z.string().max(255)).optional().default([]),
  publishedAt: z.string().datetime().optional().nullable(),
});

const payloadSchema = z.object({
  posts: z.array(postSchema).min(1).max(200),
});

async function resolveAuthorId(email: string | null | undefined) {
  if (!email) return null;
  const [u] = await db.select().from(users).where(eq(users.email, email)).limit(1);
  return u?.id ?? null;
}

async function resolveCategoryId(slug: string | null | undefined) {
  if (!slug) return null;
  const [c] = await db.select().from(categories).where(eq(categories.slug, slug)).limit(1);
  return c?.id ?? null;
}

async function resolveTagIds(slugs: string[]) {
  if (slugs.length === 0) return [] as number[];
  const found = await db.select().from(tags);
  const map = new Map(found.map((t) => [t.slug, t.id]));
  return slugs.map((s) => map.get(s)).filter((x): x is number => typeof x === "number");
}

export async function POST(req: Request) {
  if (!(await syncAuthorized(req))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const parsed = payloadSchema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  let upserted = 0;
  for (const p of parsed.data.posts) {
    const [authorId, categoryId, tagIds] = await Promise.all([
      resolveAuthorId(p.authorEmail),
      resolveCategoryId(p.categorySlug),
      resolveTagIds(p.tagSlugs ?? []),
    ]);
    const row = {
      slug: p.slug,
      title: p.title,
      excerpt: p.excerpt ?? null,
      content: p.content as unknown as object,
      contentHtml: p.contentHtml ?? null,
      status: p.status,
      seoTitle: p.seoTitle ?? null,
      seoDescription: p.seoDescription ?? null,
      seoKeywords: p.seoKeywords ?? null,
      ogImage: p.ogImage ?? null,
      canonicalUrl: p.canonicalUrl ?? null,
      noIndex: p.noIndex ?? false,
      featuredImage: p.featuredImage ?? null,
      readingTime: p.readingTime ?? null,
      authorId,
      categoryId,
      publishedAt: p.publishedAt ? new Date(p.publishedAt) : null,
    };
    await db
      .insert(posts)
      .values(row)
      .onConflictDoUpdate({
        target: posts.slug,
        set: { ...row, updatedAt: sql`now()` },
      });

    const [postRow] = await db.select().from(posts).where(eq(posts.slug, p.slug)).limit(1);
    if (postRow) {
      await db.delete(postTags).where(eq(postTags.postId, postRow.id));
      if (tagIds.length > 0) {
        await db
          .insert(postTags)
          .values(tagIds.map((tagId) => ({ postId: postRow.id, tagId })));
      }
    }
    upserted += 1;
  }

  return NextResponse.json({ ok: true, upserted });
}
