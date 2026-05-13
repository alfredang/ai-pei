import Link from "next/link";
import { db } from "@/db";
import { posts } from "@/db/schema";
import { desc } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export default async function PostsList() {
  const list = await db.select().from(posts).orderBy(desc(posts.updatedAt));
  async function createPost() {
    "use server";
    const [p] = await db
      .insert(posts)
      .values({
        slug: `untitled-${Date.now()}`,
        title: "Untitled post",
        content: { type: "doc", content: [{ type: "paragraph" }] },
        status: "draft",
      })
      .returning();
    revalidatePath("/admin/posts");
    redirect(`/admin/posts/${p.id}/edit`);
  }
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Posts</h1>
        <form action={createPost}>
          <button className="px-4 py-2 rounded bg-neon-blue/30 border border-neon-blue/50 hover:bg-neon-blue/40 text-sm font-medium">
            + New Post
          </button>
        </form>
      </div>
      <div className="glass rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-white/5 text-left text-xs uppercase text-white/60">
            <tr>
              <th className="px-4 py-3">Title</th>
              <th className="px-4 py-3">Slug</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Updated</th>
            </tr>
          </thead>
          <tbody>
            {list.map((p) => (
              <tr key={p.id} className="border-t border-white/5 hover:bg-white/5">
                <td className="px-4 py-3">
                  <Link className="hover:text-neon-cyan" href={`/admin/posts/${p.id}/edit`}>
                    {p.title}
                  </Link>
                </td>
                <td className="px-4 py-3 text-white/60">{p.slug}</td>
                <td className="px-4 py-3">
                  <span className="px-2 py-0.5 rounded text-xs bg-white/10">{p.status}</span>
                </td>
                <td className="px-4 py-3 text-white/60">
                  {new Date(p.updatedAt).toLocaleString()}
                </td>
              </tr>
            ))}
            {list.length === 0 && (
              <tr>
                <td colSpan={4} className="px-4 py-8 text-center text-white/50">
                  No posts yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
