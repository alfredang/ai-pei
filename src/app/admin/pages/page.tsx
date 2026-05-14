import Link from "next/link";
import { db } from "@/db";
import { pages } from "@/db/schema";
import { desc } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export default async function PagesList() {
  const list = await db.select().from(pages).orderBy(desc(pages.updatedAt));
  async function createPage() {
    "use server";
    const [p] = await db
      .insert(pages)
      .values({
        slug: `untitled-${Date.now()}`,
        title: "Untitled page",
        content: { type: "doc", content: [{ type: "paragraph" }] },
        status: "draft",
      })
      .returning();
    revalidatePath("/admin/pages");
    redirect(`/admin/pages/${p.id}/edit`);
  }
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Pages</h1>
        <form action={createPage}>
          <button className="px-4 py-2 rounded bg-neon-blue/30 border border-neon-blue/50 hover:bg-neon-blue/40 text-sm font-medium">
            + New Page
          </button>
        </form>
      </div>
      <div className="glass rounded-xl overflow-hidden">
        <table className="w-full text-sm table-fixed">
          <thead className="bg-white/5 text-left text-xs uppercase text-white/60">
            <tr>
              <th className="px-3 py-2 w-[42%]">Title</th>
              <th className="px-3 py-2 w-[28%]">Slug</th>
              <th className="px-3 py-2 w-[12%]">Status</th>
              <th className="px-3 py-2 w-[18%]">Updated</th>
            </tr>
          </thead>
          <tbody>
            {list.map((p) => (
              <tr key={p.id} className="border-t border-white/5 hover:bg-white/5">
                <td className="px-3 py-1.5 truncate">
                  <Link className="hover:text-neon-cyan" href={`/admin/pages/${p.id}/edit`}>
                    {p.title}
                  </Link>
                </td>
                <td className="px-3 py-1.5 text-white/60 font-mono truncate">/{p.slug}</td>
                <td className="px-3 py-1.5">
                  <span className="px-2 py-0.5 rounded text-xs bg-white/10">{p.status}</span>
                </td>
                <td className="px-3 py-1.5 text-white/60 whitespace-nowrap">
                  {new Date(p.updatedAt).toLocaleString("en-SG", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: false,
                  })}
                </td>
              </tr>
            ))}
            {list.length === 0 && (
              <tr>
                <td colSpan={4} className="px-4 py-8 text-center text-white/50">
                  No pages yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
