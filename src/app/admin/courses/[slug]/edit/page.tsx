import { notFound } from "next/navigation";
import { revalidatePath } from "next/cache";
import { db } from "@/db";
import { courses, courseModules } from "@/db/schema";
import { asc, eq } from "drizzle-orm";
import {
  CourseEditorForm,
  type CourseFormData,
} from "@/components/admin/CourseEditorForm";
import { CourseBackButton } from "@/components/admin/CourseBackButton";
import { slugify, freeCourseSlug } from "@/lib/course-slug";

export default async function EditCourse({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug: routeSlug } = await params;

  const [c] = await db
    .select()
    .from(courses)
    .where(eq(courses.slug, decodeURIComponent(routeSlug)))
    .limit(1);
  if (!c) notFound();

  const mods = await db
    .select()
    .from(courseModules)
    .where(eq(courseModules.courseId, c.id))
    .orderBy(asc(courseModules.sortOrder));

  const initial: CourseFormData = {
    id: c.id,
    title: c.title,
    slug: c.slug,
    courseCode: c.courseCode ?? "",
    status: c.status,
    summary: c.summary ?? "",
    certificate: c.certificate ?? "",
    overview: c.overview ?? "",
    outcomes: c.outcomes ?? "",
    whoShouldEnroll: c.whoShouldEnroll ?? "",
    assessment: c.assessment ?? "",
    priceExclGst: c.priceExclGst ?? "",
    priceInclGst: c.priceInclGst ?? "",
    fundingTags: c.fundingTags ?? [],
    brochureUrl: c.brochureUrl ?? "",
    heroImage: c.heroImage ?? "",
    seoTitle: c.seoTitle ?? "",
    seoDescription: c.seoDescription ?? "",
    modules: mods.map((m) => ({
      title: m.title,
      kind: m.kind ?? "",
      details: m.details ?? "",
      sessions: m.sessions ?? "",
      duration: m.duration ?? "",
      registrationLink: m.registrationLink ?? "",
    })),
  };

  async function save(data: CourseFormData): Promise<{ slug: string }> {
    "use server";
    const base = slugify(data.slug || data.title) || "course";
    const slug = await freeCourseSlug(base, data.id);
    const wasPublished = c.status === "published";
    const oldSlug = c.slug;

    await db
      .update(courses)
      .set({
        title: data.title,
        slug,
        courseCode: data.courseCode || null,
        status: data.status,
        summary: data.summary || null,
        certificate: data.certificate || null,
        overview: data.overview || null,
        outcomes: data.outcomes || null,
        whoShouldEnroll: data.whoShouldEnroll || null,
        assessment: data.assessment || null,
        priceExclGst: data.priceExclGst || null,
        priceInclGst: data.priceInclGst || null,
        fundingTags: Array.isArray(data.fundingTags) ? data.fundingTags : [],
        brochureUrl: data.brochureUrl || null,
        heroImage: data.heroImage || null,
        seoTitle: data.seoTitle || null,
        seoDescription: data.seoDescription || null,
        updatedAt: new Date(),
      })
      .where(eq(courses.id, data.id));

    // Replace modules wholesale (the form is authoritative). Skip blank rows.
    await db.delete(courseModules).where(eq(courseModules.courseId, data.id));
    const rows = (data.modules ?? [])
      .filter((m) => m.title.trim() || m.details.trim())
      .map((m, idx) => ({
        courseId: data.id,
        title: m.title.trim() || `Module ${idx + 1}`,
        kind: m.kind || null,
        details: m.details || null,
        sessions: m.sessions || null,
        duration: m.duration || null,
        registrationLink: m.registrationLink || null,
        sortOrder: idx,
      }));
    if (rows.length > 0) {
      await db.insert(courseModules).values(rows);
    }

    revalidatePath("/admin/courses");
    revalidatePath(`/admin/courses/${slug}/edit`);
    revalidatePath("/courses");
    revalidatePath(`/courses/${slug}`);
    if (oldSlug !== slug) revalidatePath(`/courses/${oldSlug}`);
    if (wasPublished || data.status === "published") {
      revalidatePath("/sitemap.xml");
    }
    return { slug };
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <CourseBackButton />
          <h1 className="text-2xl font-bold">Edit Course</h1>
        </div>
        {c.status === "published" && (
          <a
            href={`/courses/${c.slug}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs px-3 py-1.5 rounded border border-white/10 hover:bg-white/10"
          >
            View live ↗
          </a>
        )}
      </div>
      <CourseEditorForm initial={initial} save={save} />
    </div>
  );
}
