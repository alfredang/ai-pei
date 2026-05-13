import Link from "next/link";
import { db } from "@/db";
import { menus, menuItems } from "@/db/schema";
import { eq, asc } from "drizzle-orm";
import { Container } from "./Container";

async function loadMenu() {
  try {
    const [menu] = await db.select().from(menus).where(eq(menus.location, "header")).limit(1);
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

const FALLBACK = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/#services" },
  { label: "AI LMS/TMS", href: "/#ai-lms-tms" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/#contact" },
];

export async function Navbar() {
  const items = await loadMenu();
  const links = items.length > 0 ? items : FALLBACK;

  return (
    <header className="sticky top-0 z-50 glass border-b border-white/10">
      <Container className="flex h-16 items-center justify-between">
        <Link href="/" className="text-xl font-bold bg-gradient-to-r from-neon-blue to-neon-cyan bg-clip-text text-transparent">
          Tertiary Infotech
        </Link>
        <nav className="hidden md:flex items-center gap-6">
          {links.map((l) => (
            <Link
              key={l.href + l.label}
              href={l.href}
              target={"openInNewTab" in l && l.openInNewTab ? "_blank" : undefined}
              className="text-sm text-white/80 hover:text-white transition"
            >
              {l.label}
            </Link>
          ))}
        </nav>
        <Link
          href="/#contact"
          className="hidden md:inline-block px-4 py-2 rounded-lg bg-neon-blue/20 border border-neon-blue/50 text-sm hover:bg-neon-blue/30"
        >
          Get a Quote
        </Link>
      </Container>
    </header>
  );
}
