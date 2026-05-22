import { eq } from "drizzle-orm";
import { db } from "../src/db";
import { menus, menuItems } from "../src/db/schema";

const ITEMS = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/#why-us" },
  { label: "Programme", href: "/#featured-course" },
  { label: "Trainers", href: "/#trainers" },
  { label: "Admissions", href: "/#admissions" },
];

async function main() {
  const [menu] = await db
    .select()
    .from(menus)
    .where(eq(menus.location, "header"))
    .limit(1);
  if (!menu) throw new Error("Header menu not found");

  await db.delete(menuItems).where(eq(menuItems.menuId, menu.id));
  await db.insert(menuItems).values(
    ITEMS.map((it, i) => ({
      menuId: menu.id,
      label: it.label,
      href: it.href,
      sortOrder: i,
    })),
  );
  console.log(`Header menu rewritten with ${ITEMS.length} items:`);
  for (const it of ITEMS) console.log(`  ${it.label} → ${it.href}`);
  process.exit(0);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
