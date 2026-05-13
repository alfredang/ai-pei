import { notFound } from "next/navigation";
import { revalidatePath } from "next/cache";
import { db } from "@/db";
import { posts } from "@/db/schema";
import { eq } from "drizzle-orm";
import { PostEditorForm, type PostFormData } from "@/components/admin/PostEditorForm";
import type { JSONContent } from "@tiptap/react";

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
        publishedAt:
          data.status === "published" && !p.publishedAt ? new Date() : p.publishedAt,
        updatedAt: new Date(),
      })
      .where(eq(posts.id, data.id));
    revalidatePath(`/blog/${data.slug}`);
    revalidatePath("/blog");
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Edit Post</h1>
      <PostEditorForm initial={initial} save={save} kind="post" />
    </div>
  );
}
