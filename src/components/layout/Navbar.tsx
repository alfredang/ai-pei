import Link from "next/link";
import { db } from "@/db";
import { menus, menuItems } from "@/db/schema";
import { eq, asc } from "drizzle-orm";
import { Container } from "./Container";
import { MobileMenu } from "./MobileMenu";
import { getSiteBrand, getCompanyContact } from "@/lib/site-settings";
import { htmlPath } from "@/lib/html-url";
import { FaWhatsapp } from "react-icons/fa6";
import { HiPhone } from "react-icons/hi2";

const FALLBACK = [
  { label: "Home", href: "/" },
  { label: "PEI Advanced Certificate", href: "/courses.html" },
  { label: "Study in Singapore", href: "/study-in-singapore.html" },
  { label: "Blog", href: "/blog.html" },
  { label: "Contact", href: "/#contact" },
];

let cachedMenuItems: any[] | null = null;

async function loadMenu() {
  try {
    const [menu] = await db.select().from(menus).where(eq(menus.location, "header")).limit(1);
    if (!menu) return cachedMenuItems || FALLBACK;
    const items = await db.select().from(menuItems).where(eq(menuItems.menuId, menu.id)).orderBy(asc(menuItems.sortOrder));
    if (items.length > 0) {
      cachedMenuItems = items;
      return items;
    }
    return cachedMenuItems || FALLBACK;
  } catch {
    return cachedMenuItems || FALLBACK;
  }
}

export async function Navbar() {
  const [items, brand, contact] = await Promise.all([
    loadMenu(),
    getSiteBrand(),
    getCompanyContact(),
  ]);
  const links = items;

  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-(--color-bg-elevated) border-b border-(--color-border) relative text-(--color-text)">
      <Container className="flex h-16 items-center justify-between gap-2">
        <Link href="/" className="flex items-center gap-2 group shrink-0">
          {brand.logoUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={brand.logoUrl}
              alt={brand.shortName}
              className="w-9 h-9 rounded-md object-contain"
            />
          ) : (
            <span
              data-theme="dark"
              className="w-8 h-8 rounded-lg bg-gradient-to-br from-(--color-purple) to-(--color-cyan) grid place-items-center text-xs font-mono font-bold text-white shadow-sm ring-1 ring-black/5"
            >
              TI
            </span>
          )}
          <span className="font-display font-bold text-base sm:text-lg tracking-tight whitespace-nowrap">
            {brand.shortName}
          </span>
        </Link>
        {/* In-flow (not absolutely centered) so the menu can never overlap the
            brand or CTA; the full menu appears only from lg where it fits. */}
        <nav className="hidden lg:flex flex-1 items-center justify-center gap-0.5 xl:gap-2">
          {links.map((l) => (
            <Link
              key={l.href + l.label}
              href={htmlPath(l.href)}
              target={"openInNewTab" in l && l.openInNewTab ? "_blank" : undefined}
              className="px-2.5 xl:px-4 py-2 font-medium text-sm whitespace-nowrap text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition"
            >
              {l.label}
            </Link>
          ))}
        </nav>
        <Link
          href="/#contact"
          className="hidden lg:inline-flex shrink-0 items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-(--color-cyan)/40 text-sm whitespace-nowrap text-(--color-cyan) hover:bg-(--color-cyan)/10 transition"
        >
          Register Now
          <span aria-hidden>→</span>
        </Link>

        {/* Mobile quick-actions: phone + WhatsApp icons next to the burger */}
        <div className="lg:hidden flex items-center gap-1 shrink-0">
          {contact.tel && (
            <a
              href={`tel:${contact.tel.replace(/\s+/g, "")}`}
              aria-label="Call us"
              className="w-9 h-9 inline-flex items-center justify-center rounded-md text-(--color-cyan) hover:bg-white/5 transition"
            >
              <HiPhone className="w-5 h-5" />
            </a>
          )}
          {contact.whatsapp && (
            <a
              href={`https://wa.me/${contact.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              className="w-9 h-9 inline-flex items-center justify-center rounded-md text-(--color-green) hover:bg-white/5 transition"
            >
              <FaWhatsapp className="w-5 h-5" />
            </a>
          )}
        </div>

        <MobileMenu
          links={links.map((l) => ({
            label: l.label,
            href: htmlPath(l.href),
            openInNewTab: "openInNewTab" in l ? Boolean(l.openInNewTab) : false,
          }))}
        />
      </Container>
    </header>
  );
}
