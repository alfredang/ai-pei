import { notFound } from "next/navigation";
import { revalidatePath } from "next/cache";
import { db } from "@/db";
import { posts, categories, tags, postTags } from "@/db/schema";
import { eq, inArray } from "drizzle-orm";
import { PostEditorForm, type PostFormData } from "@/components/admin/PostEditorForm";
import type { JSONContent } from "@tiptap/react";

function slugify(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9-]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

function titleCase(slug: string): string {
  return slug
    .split("-")
    .filter(Boolean)
    .map((w) => w[0].toUpperCase() + w.slice(1))
    .join(" ");
}

/** Resolve a category by slug — return its id, creating the row if it doesn't exist. */
async function resolveCategoryId(slug: string): Promise<number> {
  const clean = slugify(slug);
  const [existing] = await db
    .select()
    .from(categories)
    .where(eq(categories.slug, clean))
    .limit(1);
  if (existing) return existing.id;
  const [created] = await db
    .insert(categories)
    .values({ slug: clean, name: titleCase(clean) })
    .returning();
  return created.id;
}

/** Resolve tag slugs — create any that don't exist, return ordered list of ids. */
async function resolveTagIds(slugs: string[]): Promise<number[]> {
  const cleaned = Array.from(new Set(slugs.map(slugify).filter(Boolean)));
  if (cleaned.length === 0) return [];
  const existing = await db
    .select()
    .from(tags)
    .where(inArray(tags.slug, cleaned));
  const existingBySlug = new Map(existing.map((t) => [t.slug, t.id]));
  const missing = cleaned.filter((s) => !existingBySlug.has(s));
  if (missing.length > 0) {
    const created = await db
      .insert(tags)
      .values(missing.map((s) => ({ slug: s, name: titleCase(s) })))
      .returning();
    for (const t of created) existingBySlug.set(t.slug, t.id);
  }
  return cleaned.map((s) => existingBySlug.get(s)!).filter(Boolean);
}

export default async function EditPost({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const postId = Number(id);
  if (!Number.isFinite(postId)) notFound();
  const [p] = await db.select().from(posts).where(eq(posts.id, postId)).limit(1);
  if (!p) notFound();

  const initial: PostFormData = {
    id: p.id,
    title: p.title,
    slug: p.slug,
    excerpt: p.excerpt ?? "",
    content: p.content as JSONContent,
    contentHtml: p.contentHtml ?? "",
    status: p.status,
    seoTitle: p.seoTitle ?? "",
    seoDescription: p.seoDescription ?? "",
    seoKeywords: p.seoKeywords ?? "",
    ogImage: p.ogImage ?? "",
    featuredImage: p.featuredImage ?? "",
  };

  async function save(data: PostFormData) {
    "use server";
    const categoryId = data.suggestedCategorySlug
      ? await resolveCategoryId(data.suggestedCategorySlug)
      : undefined;

    await db
      .update(posts)
      .set({
        title: data.title,
        slug: data.slug,
        excerpt: data.excerpt || null,
        content: data.content,
        contentHtml: data.contentHtml,
        status: data.status,
        seoTitle: data.seoTitle || null,
        seoDescription: data.seoDescription || null,
        seoKeywords: data.seoKeywords || null,
        ogImage: data.ogImage || null,
        featuredImage: data.featuredImage || null,
        ...(categoryId ? { categoryId } : {}),
        publishedAt:
          data.status === "published" && !p.publishedAt ? new Date() : p.publishedAt,
        updatedAt: new Date(),
      })
      .where(eq(posts.id, data.id));

    if (data.suggestedTagSlugs && data.suggestedTagSlugs.length > 0) {
      const tagIds = await resolveTagIds(data.suggestedTagSlugs);
      // Append-only: don't drop existing tag links, just add the new ones.
      if (tagIds.length > 0) {
        await db
          .insert(postTags)
          .values(tagIds.map((tagId) => ({ postId: data.id, tagId })))
          .onConflictDoNothing();
      }
    }

    revalidatePath(`/blog/${data.slug}`);
    revalidatePath("/blog");
    revalidatePath("/");
    revalidatePath("/sitemap.xml");
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Edit Post</h1>
      <PostEditorForm initial={initial} save={save} kind="post" />
    </div>
  );
}
