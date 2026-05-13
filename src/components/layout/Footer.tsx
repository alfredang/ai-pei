import Link from "next/link";
import { db } from "@/db";
import { menus, menuItems } from "@/db/schema";
import { eq, asc } from "drizzle-orm";
import { Container } from "./Container";

async function loadFooter() {
  try {
    const [menu] = await db.select().from(menus).where(eq(menus.location, "footer")).limit(1);
    if (!menu) return [];
    return db
      .select()
      .from(menuItems)
      .where(eq(menuItems.menuId, menu.id))
      .orderBy(asc(menuItems.sortOrder));
  } catch {
    return [];
  }
}

export async function Footer() {
  const items = await loadFooter();
  return (
    <footer className="mt-24 border-t border-white/10 py-10 text-sm text-white/60">
      <Container className="flex flex-col md:flex-row gap-6 items-center justify-between">
        <p>© {new Date().getFullYear()} Tertiary Infotech Pte Ltd. All rights reserved.</p>
        <nav className="flex flex-wrap gap-4">
          {items.map((it) => (
            <Link key={it.id} href={it.href} className="hover:text-white">
              {it.label}
            </Link>
          ))}
        </nav>
      </Container>
    </footer>
  );
}
