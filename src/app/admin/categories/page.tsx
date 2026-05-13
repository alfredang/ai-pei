import { db } from "@/db";
import { categories } from "@/db/schema";
import { asc, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { slugify } from "@/lib/slugify";

export default async function CategoriesAdmin() {
  const list = await db.select().from(categories).orderBy(asc(categories.name));

  async function add(formData: FormData) {
    "use server";
    const name = String(formData.get("name") ?? "").trim();
    if (!name) return;
    await db
      .insert(categories)
      .values({ name, slug: slugify(name) })
      .onConflictDoNothing();
    revalidatePath("/admin/categories");
  }

  async function remove(formData: FormData) {
    "use server";
    const id = Number(formData.get("id"));
    if (id) await db.delete(categories).where(eq(categories.id, id));
    revalidatePath("/admin/categories");
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Categories</h1>
      <form action={add} className="glass rounded-xl p-4 flex gap-2 mb-6">
        <input
          name="name"
          placeholder="Category name"
          className="flex-1 px-3 py-2 bg-white/5 border border-white/10 rounded"
        />
        <button className="px-4 py-2 rounded bg-neon-blue/30 border border-neon-blue/50 hover:bg-neon-blue/40 text-sm">
          Add
        </button>
      </form>
      <ul className="space-y-2">
        {list.map((c) => (
          <li key={c.id} className="glass px-4 py-3 rounded flex items-center justify-between">
            <span>
              <strong>{c.name}</strong>{" "}
              <span className="text-white/50 text-sm font-mono">/{c.slug}</span>
            </span>
            <form action={remove}>
              <input type="hidden" name="id" value={c.id} />
              <button className="text-xs text-red-400 hover:text-red-300">Delete</button>
            </form>
          </li>
        ))}
      </ul>
    </div>
  );
}
