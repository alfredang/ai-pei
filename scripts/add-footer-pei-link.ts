import { and, eq } from "drizzle-orm";
import { db } from "../src/db";
import { menus, menuItems } from "../src/db/schema";

// Adds (idempotently) a "PEI Course Submission" link to the footer menu.
// Run: set -a; source .env; set +a; npx tsx scripts/add-footer-pei-link.ts
async function main() {
  const [menu] = await db
    .select()
    .from(menus)
    .where(eq(menus.location, "footer"))
    .limit(1);
  if (!menu) throw new Error("Footer menu not found — seed menus first.");

  const label = "PEI Course Submission";
  const href = "/pei-course-submission";

  const existing = await db
    .select()
    .from(menuItems)
    .where(and(eq(menuItems.menuId, menu.id), eq(menuItems.href, href)))
    .limit(1);
  if (existing.length) {
    await db.update(menuItems).set({ label }).where(eq(menuItems.id, existing[0].id));
    console.log(`Footer item already present — updated label to "${label}".`);
    process.exit(0);
  }

  const all = await db.select().from(menuItems).where(eq(menuItems.menuId, menu.id));
  const sortOrder = all.length;
  const [created] = await db
    .insert(menuItems)
    .values({ menuId: menu.id, label, href, sortOrder })
    .returning();
  console.log(`Added footer item "${created.label}" → ${created.href} at position ${created.sortOrder}`);
  process.exit(0);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
