import { NextResponse } from "next/server";
import { asc, eq } from "drizzle-orm";
import { db } from "@/db";
import { courses, courseModules } from "@/db/schema";
import { isAdminRequest } from "@/lib/admin-guard";
import {
  generatePeiApplicationPack,
  peiApplicationPackFilename,
  type PeiApplicationCourse,
} from "@/lib/pei-application-documents";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  if (!(await isAdminRequest())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { slug } = await params;
  const decodedSlug = decodeURIComponent(slug);
  const [course] = await db
    .select()
    .from(courses)
    .where(eq(courses.slug, decodedSlug))
    .limit(1);

  if (!course) {
    return NextResponse.json({ error: "Course not found" }, { status: 404 });
  }

  const modules = await db
    .select()
    .from(courseModules)
    .where(eq(courseModules.courseId, course.id))
    .orderBy(asc(courseModules.sortOrder));

  const packCourse: PeiApplicationCourse = {
    title: course.title,
    slug: course.slug,
    courseCode: course.courseCode,
    certificate: course.certificate,
    summary: course.summary,
    overview: course.overview,
    outcomes: course.outcomes,
    whoShouldEnroll: course.whoShouldEnroll,
    assessment: course.assessment,
    modules: modules.map((module) => ({
      title: module.title,
      details: module.details,
      sessions: module.sessions,
      duration: module.duration,
      sortOrder: module.sortOrder,
    })),
  };

  const buffer = await generatePeiApplicationPack(packCourse);
  const filename = peiApplicationPackFilename(packCourse);

  const body = new Uint8Array(buffer);

  return new Response(body, {
    headers: {
      "Content-Type": "application/zip",
      "Content-Disposition": `attachment; filename="${filename}"`,
      "Cache-Control": "no-store",
    },
  });
}
