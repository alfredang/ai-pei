import Link from "next/link";
import { db } from "@/db";
import { courses, courseModules } from "@/db/schema";
import { asc, desc, eq, sql } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { DeleteCourseButton } from "@/components/admin/DeleteCourseButton";

export default async function CoursesList() {
  const list = await db
    .select()
    .from(courses)
    .orderBy(asc(courses.sortOrder), desc(courses.updatedAt));

  // Module counts per course in one query.
  const counts = await db
    .select({
      courseId: courseModules.courseId,
      count: sql<number>`count(*)::int`,
    })
    .from(courseModules)
    .groupBy(courseModules.courseId);
  const countByCourse = new Map(counts.map((c) => [c.courseId, c.count]));

  async function deleteCourse(id: number) {
    "use server";
    if (!id) return;
    // course_modules cascade-delete via FK.
    await db.delete(courses).where(eq(courses.id, id));
    revalidatePath("/admin/courses");
    revalidatePath("/courses");
    revalidatePath("/sitemap.xml");
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-3xl font-bold">Courses</h1>
        <Link
          href="/admin/courses/new"
          className="px-4 py-2 rounded bg-neon-blue/30 border border-neon-blue/50 hover:bg-neon-blue/40 text-sm font-medium"
        >
          + New Course
        </Link>
      </div>

      <p className="text-sm text-(--color-muted) mb-6">
        Add and manage courses — title, certificate, fees, funding schemes, and modules (each with
        its own details, sessions, and duration). Published courses appear at{" "}
        <span className="font-mono">/courses</span>.
      </p>

      {list.length === 0 ? (
        <div className="glass rounded-xl p-10 text-center text-(--color-muted)">
          No courses yet. Click <strong>+ New Course</strong> to add one.
        </div>
      ) : (
        <div className="glass rounded-xl overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-white/50 border-b border-white/10">
                <th className="px-4 py-3 font-medium">Title</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium">Modules</th>
                <th className="px-4 py-3 font-medium">Updated</th>
                <th className="px-4 py-3 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {list.map((c) => (
                <tr key={c.id} className="border-b border-white/5 hover:bg-white/5">
                  <td className="px-4 py-3">
                    <Link
                      href={`/admin/courses/${c.slug}/edit`}
                      className="font-medium hover:text-(--color-cyan)"
                    >
                      {c.title}
                    </Link>
                    <div className="text-xs text-white/40 font-mono">/{c.slug}</div>
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-block px-2 py-0.5 rounded text-xs ${
                        c.status === "published"
                          ? "bg-(--color-green)/15 text-(--color-green)"
                          : c.status === "archived"
                            ? "bg-white/10 text-white/50"
                            : "bg-(--color-amber)/15 text-(--color-amber)"
                      }`}
                    >
                      {c.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-white/70">{countByCourse.get(c.id) ?? 0}</td>
                  <td className="px-4 py-3 text-white/50">
                    {c.updatedAt.toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="inline-flex items-center gap-2">
                      <Link
                        href={`/admin/courses/${c.slug}/edit`}
                        className="px-3 py-1 rounded border border-white/10 hover:bg-white/10 text-xs"
                      >
                        Edit
                      </Link>
                      <DeleteCourseButton
                        title={c.title}
                        onConfirm={deleteCourse.bind(null, c.id)}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
