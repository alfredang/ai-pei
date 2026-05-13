import { db } from "@/db";
import { tags } from "@/db/schema";
import { asc, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { slugify } from "@/lib/slugify";

export default async function TagsAdmin() {
  const list = await db.select().from(tags).orderBy(asc(tags.name));
  async function add(formData: FormData) {
    "use server";
    const name = String(formData.get("name") ?? "").trim();
    if (!name) return;
    await db.insert(tags).values({ name, slug: slugify(name) }).onConflictDoNothing();
    revalidatePath("/admin/tags");
  }
  async function remove(formData: FormData) {
    "use server";
    const id = Number(formData.get("id"));
    if (id) await db.delete(tags).where(eq(tags.id, id));
    revalidatePath("/admin/tags");
  }
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Tags</h1>
      <form action={add} className="glass rounded-xl p-4 flex gap-2 mb-6">
        <input name="name" placeholder="Tag name" className="flex-1 px-3 py-2 bg-white/5 border border-white/10 rounded" />
        <button className="px-4 py-2 rounded bg-neon-blue/30 border border-neon-blue/50 hover:bg-neon-blue/40 text-sm">Add</button>
      </form>
      <ul className="space-y-2">
        {list.map((t) => (
          <li key={t.id} className="glass px-4 py-3 rounded flex items-center justify-between">
            <span><strong>{t.name}</strong> <span className="text-white/50 text-sm font-mono">/{t.slug}</span></span>
            <form action={remove}>
              <input type="hidden" name="id" value={t.id} />
              <button className="text-xs text-red-400 hover:text-red-300">Delete</button>
            </form>
          </li>
        ))}
      </ul>
    </div>
  );
}
