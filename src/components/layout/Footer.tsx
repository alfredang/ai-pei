import Link from "next/link";
import { db } from "@/db";
import { menus, menuItems } from "@/db/schema";
import { eq, asc } from "drizzle-orm";
import { Container } from "./Container";
import { getSiteBrand } from "@/lib/site-settings";

async function loadFooter() {
  try {
    const [menu] = await db.select().from(menus).where(eq(menus.location, "footer")).limit(1);
    if (!menu) return [];
    return db.select().from(menuItems).where(eq(menuItems.menuId, menu.id)).orderBy(asc(menuItems.sortOrder));
  } catch {
    return [];
  }
}

export async function Footer() {
  const [items, brand] = await Promise.all([loadFooter(), getSiteBrand()]);
  return (
    <footer className="relative mt-32 border-t border-(--color-border) bg-(--color-bg-elevated)">
      <Container className="py-14">
        <div className="grid md:grid-cols-3 gap-10">
          <div>
            <div className="flex items-center gap-2 mb-4">
              {brand.logoUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={brand.logoUrl} alt={brand.shortName} className="h-8 w-auto" />
              ) : (
                <span className="w-7 h-7 rounded-md bg-gradient-to-br from-(--color-purple) to-(--color-cyan)" />
              )}
              <span className="font-display font-bold text-lg">{brand.shortName}</span>
            </div>
            <p className="text-sm text-(--color-muted) max-w-xs">
              AI-powered LMS &amp; TMS for WSQ / TPQA compliant training providers in Singapore.
            </p>
          </div>
          <div>
            <div className="kicker mb-3">[ NAVIGATE ]</div>
            <nav className="flex flex-col gap-2 text-sm">
              {items.map((it) => (
                <Link key={it.id} href={it.href} className="text-white/80 hover:text-(--color-cyan) transition">
                  {it.label}
                </Link>
              ))}
            </nav>
          </div>
          <div>
            <div className="kicker mb-3">[ CONTACT ]</div>
            <p className="text-sm text-(--color-muted)">
              12 Woodlands Square<br />
              #07-85 Woods Square Tower 1<br />
              Singapore 737715
            </p>
            <a href="mailto:sales@tertiarycourses.com.sg" className="block mt-3 text-sm text-(--color-cyan) hover:underline">
              sales@tertiarycourses.com.sg
            </a>
          </div>
        </div>
        <div className="mt-10 pt-6 border-t border-white/5 flex flex-wrap items-center justify-between gap-4 text-xs text-(--color-muted) font-mono">
          <p>© {new Date().getFullYear()} TERTIARY INFOTECH PTE LTD · UEN 201200606W</p>
          <p>BUILT WITH NEXT.JS · POSTGRES · CLAUDE AGENT SDK</p>
        </div>
      </Container>
    </footer>
  );
}
