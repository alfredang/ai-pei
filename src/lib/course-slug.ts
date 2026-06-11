import { and, eq, ne } from "drizzle-orm";
import { db } from "@/db";
import { courses } from "@/db/schema";

export function slugify(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9-]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

/**
 * Find a slug that's unique across courses. Pass `selfId` when updating an
 * existing course so it doesn't collide with itself.
 */
export async function freeCourseSlug(
  base: string,
  selfId?: number,
): Promise<string> {
  const root = base || "course";
  // Hard cap so this can never spin or hammer the DB, no matter the data.
  // 500 indexed lookups is already absurd for a course catalogue; the unique
  // index on `slug` is the real backstop if two requests ever race.
  const MAX_ATTEMPTS = 500;
  for (let n = 1; n <= MAX_ATTEMPTS; n++) {
    const candidate = n === 1 ? root : `${root}-${n}`;
    const cond =
      selfId != null
        ? and(eq(courses.slug, candidate), ne(courses.id, selfId))
        : eq(courses.slug, candidate);
    const [hit] = await db
      .select({ id: courses.id })
      .from(courses)
      .where(cond)
      .limit(1);
    if (!hit) return candidate;
  }
  // Practically unreachable — fall back to a suffix that won't collide.
  return `${root}-${MAX_ATTEMPTS + 1}`;
}
