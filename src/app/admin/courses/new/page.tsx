import { revalidatePath } from "next/cache";
import { db } from "@/db";
import { courses, courseModules } from "@/db/schema";
import {
  CourseEditorForm,
  type CourseFormData,
} from "@/components/admin/CourseEditorForm";
import { CourseBackButton } from "@/components/admin/CourseBackButton";
import { slugify, freeCourseSlug } from "@/lib/course-slug";

const BLANK: CourseFormData = {
  id: 0,
  title: "",
  slug: "",
  courseCode: "",
  status: "draft",
  summary: "",
  certificate: "",
  overview: "",
  outcomes: "",
  whoShouldEnroll: "",
  assessment: "",
  priceExclGst: "",
  priceInclGst: "",
  fundingTags: [],
  brochureUrl: "",
  heroImage: "",
  seoTitle: "",
  seoDescription: "",
  modules: [],
};

export default function NewCourse() {
  // The course row is created ONLY when the user clicks Save — navigating away
  // (Back) writes nothing, so no orphan "Untitled course" drafts are left behind.
  async function create(data: CourseFormData): Promise<{ slug: string }> {
    "use server";
    const base = slugify(data.title || data.slug) || "untitled-course";
    const slug = await freeCourseSlug(base);

    const [created] = await db
      .insert(courses)
      .values({
        slug,
        title: data.title || "Untitled course",
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
      })
      .returning();

    const rows = (data.modules ?? [])
      .filter((m) => m.title.trim() || m.details.trim())
      .map((m, idx) => ({
        courseId: created.id,
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
    revalidatePath("/courses");
    if (data.status === "published") revalidatePath("/sitemap.xml");
    return { slug };
  }

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <CourseBackButton />
        <h1 className="text-2xl font-bold">New Course</h1>
      </div>
      <CourseEditorForm initial={BLANK} save={create} />
    </div>
  );
}
