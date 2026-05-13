import Link from "next/link";
import { db } from "@/db";
import { menus, menuItems } from "@/db/schema";
import { eq, asc } from "drizzle-orm";
import { Container } from "./Container";
import { getSiteBrand } from "@/lib/site-settings";
import { FaFacebookF, FaYoutube, FaLinkedinIn, FaWhatsapp } from "react-icons/fa";
import { HiMapPin, HiEnvelope, HiPhone } from "react-icons/hi2";

const SOCIALS: Array<{
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}> = [
  { label: "Facebook", href: "https://www.facebook.com/TertiaryCourses/", icon: FaFacebookF },
  { label: "YouTube", href: "https://www.youtube.com/@TertiaryCourses", icon: FaYoutube },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/tertiaryinfotech/?originalSubdomain=sg",
    icon: FaLinkedinIn,
  },
  { label: "WhatsApp", href: "https://wa.me/6588666375", icon: FaWhatsapp },
];

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
    <footer className="relative mt-10 border-t border-(--color-border) bg-(--color-bg-elevated)">
      <Container className="py-8">
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
              We are a bespoke EdTech solution provider, specializing in full-stack IT and AI solutions to power your business to the next level.
            </p>
            <div className="mt-5 flex items-center gap-2">
              {SOCIALS.map((s) => {
                const Icon = s.icon;
                return (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="w-9 h-9 flex items-center justify-center rounded-full border border-white/10 bg-white/3 text-white/70 hover:text-(--color-cyan) hover:border-(--color-cyan)/50 hover:bg-(--color-cyan)/5 transition"
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                );
              })}
            </div>
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
            <div className="flex items-start gap-2.5 text-sm text-(--color-muted)">
              <HiMapPin className="w-4 h-4 mt-0.5 shrink-0 text-(--color-cyan)/80" />
              <span>
                12 Woodlands Square, #07-85 Woods Square Tower 1
                <br />
                Singapore 737715
              </span>
            </div>
            <div className="mt-3 space-y-1.5 text-sm">
              <a
                href="mailto:enquiry@tertiaryinfotech.com"
                className="flex items-center gap-2.5 text-(--color-cyan) hover:underline"
              >
                <HiEnvelope className="w-4 h-4 shrink-0 text-(--color-cyan)/80" />
                enquiry@tertiaryinfotech.com
              </a>
              <a
                href="tel:+6561000613"
                className="flex items-center gap-2.5 text-(--color-cyan) hover:underline"
              >
                <HiPhone className="w-4 h-4 shrink-0 text-(--color-cyan)/80" />
                +65 6100 0613
              </a>
              <a
                href="https://wa.me/6588666375"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 text-(--color-cyan) hover:underline"
              >
                <FaWhatsapp className="w-4 h-4 shrink-0 text-(--color-cyan)/80" />
                +65 8866 6375
              </a>
            </div>
          </div>
        </div>
        <div className="mt-6 pt-4 border-t border-white/5 flex flex-wrap items-center justify-between gap-4 text-xs text-(--color-muted) font-mono">
          <p>
            © {new Date().getFullYear()} {brand.fullName.toUpperCase()}
            {brand.uen ? ` · UEN ${brand.uen}` : ""}
          </p>
          <p>BUILT WITH NEXT.JS · POSTGRES · CLAUDE AGENT SDK</p>
        </div>
      </Container>
    </footer>
  );
}
