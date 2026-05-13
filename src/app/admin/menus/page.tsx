import { db } from "@/db";
import { menus, menuItems } from "@/db/schema";
import { asc, eq, count as drizzleCount } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export default async function MenusAdmin() {
  const allMenus = await db.select().from(menus);

  async function addItem(formData: FormData) {
    "use server";
    const menuId = Number(formData.get("menuId"));
    const label = String(formData.get("label") ?? "").trim();
    const href = String(formData.get("href") ?? "").trim();
    if (!menuId || !label || !href) return;
    const [row] = await db
      .select({ c: drizzleCount() })
      .from(menuItems)
      .where(eq(menuItems.menuId, menuId));
    await db.insert(menuItems).values({
      menuId,
      label,
      href,
      sortOrder: row?.c ?? 999,
    });
    revalidatePath("/admin/menus");
    revalidatePath("/");
  }

  async function deleteItem(formData: FormData) {
    "use server";
    const id = Number(formData.get("id"));
    if (!id) return;
    await db.delete(menuItems).where(eq(menuItems.id, id));
    revalidatePath("/admin/menus");
    revalidatePath("/");
  }

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Menus</h1>
      {await Promise.all(
        allMenus.map(async (m) => {
          const items = await db
            .select()
            .from(menuItems)
            .where(eq(menuItems.menuId, m.id))
            .orderBy(asc(menuItems.sortOrder));
          return (
            <section key={m.id} className="glass rounded-xl p-6">
              <h2 className="text-xl font-bold mb-4">
                {m.name} <span className="text-sm text-white/50">({m.location})</span>
              </h2>
              <ul className="space-y-2 mb-4">
                {items.map((it) => (
                  <li
                    key={it.id}
                    className="flex items-center justify-between gap-3 px-3 py-2 bg-white/5 rounded"
                  >
                    <span>
                      <strong>{it.label}</strong>{" "}
                      <span className="text-white/50 text-sm">→ {it.href}</span>
                    </span>
                    <form action={deleteItem}>
                      <input type="hidden" name="id" value={it.id} />
                      <button className="text-xs text-red-400 hover:text-red-300">
                        Delete
                      </button>
                    </form>
                  </li>
                ))}
              </ul>
              <form action={addItem} className="flex gap-2">
                <input type="hidden" name="menuId" value={m.id} />
                <input
                  name="label"
                  placeholder="Label"
                  className="flex-1 px-3 py-2 bg-white/5 border border-white/10 rounded"
                />
                <input
                  name="href"
                  placeholder="/path or https://…"
                  className="flex-1 px-3 py-2 bg-white/5 border border-white/10 rounded"
                />
                <button className="px-4 py-2 rounded bg-neon-blue/30 border border-neon-blue/50 hover:bg-neon-blue/40 text-sm">
                  Add
                </button>
              </form>
            </section>
          );
        }),
      )}
    </div>
  );
}
