import Link from "next/link";
import { db } from "@/db";
import { menus, menuItems } from "@/db/schema";
import { eq, asc } from "drizzle-orm";
import { Container } from "./Container";
import {
  getSiteBrand,
  getCompanyContact,
  getSocialLinks,
  type SocialLink,
} from "@/lib/site-settings";
import {
  FaFacebookF,
  FaYoutube,
  FaLinkedinIn,
  FaWhatsapp,
  FaInstagram,
  FaXTwitter,
  FaTiktok,
  FaGithub,
} from "react-icons/fa6";
import { HiMapPin, HiEnvelope, HiPhone } from "react-icons/hi2";

const SOCIAL_ICONS: Record<SocialLink["platform"], React.ComponentType<{ className?: string }>> = {
  facebook: FaFacebookF,
  youtube: FaYoutube,
  linkedin: FaLinkedinIn,
  whatsapp: FaWhatsapp,
  instagram: FaInstagram,
  x: FaXTwitter,
  tiktok: FaTiktok,
  github: FaGithub,
};

async function loadFooter() {
  try {
    const [menu] = await db.select().from(menus).where(eq(menus.location, "footer")).limit(1);
    if (!menu) return [];
    return db.select().from(menuItems).where(eq(menuItems.menuId, menu.id)).orderBy(asc(menuItems.sortOrder));
  } catch {
    return [];
  }
}

function formatPhone(raw: string): string {
  // Reformat compact "+6561000613" → "+65 6100 0613" for display.
  const digits = raw.replace(/[^\d+]/g, "");
  const m = /^(\+\d{2})(\d{4})(\d+)$/.exec(digits);
  return m ? `${m[1]} ${m[2]} ${m[3]}` : raw;
}

function formatWhatsapp(digits: string): string {
  const m = /^(\d{2})(\d{4})(\d+)$/.exec(digits);
  return m ? `+${m[1]} ${m[2]} ${m[3]}` : `+${digits}`;
}

export async function Footer() {
  const [items, brand, contact, socials] = await Promise.all([
    loadFooter(),
    getSiteBrand(),
    getCompanyContact(),
    getSocialLinks(),
  ]);
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
              {socials.map((s) => {
                const Icon = SOCIAL_ICONS[s.platform];
                if (!Icon) return null;
                return (
                  <a
                    key={`${s.platform}-${s.href}`}
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
              <span>{contact.address}</span>
            </div>
            <div className="mt-3 space-y-1.5 text-sm">
              {contact.supportEmail ? (
                <a
                  href={`mailto:${contact.supportEmail}`}
                  className="flex items-center gap-2.5 text-(--color-cyan) hover:underline"
                >
                  <HiEnvelope className="w-4 h-4 shrink-0 text-(--color-cyan)/80" />
                  {contact.supportEmail}
                </a>
              ) : (
                <a
                  href={`mailto:${contact.email}`}
                  className="flex items-center gap-2.5 text-(--color-cyan) hover:underline"
                >
                  <HiEnvelope className="w-4 h-4 shrink-0 text-(--color-cyan)/80" />
                  {contact.email}
                </a>
              )}
              <a
                href={`tel:${contact.tel.replace(/\s+/g, "")}`}
                className="flex items-center gap-2.5 text-(--color-cyan) hover:underline"
              >
                <HiPhone className="w-4 h-4 shrink-0 text-(--color-cyan)/80" />
                {formatPhone(contact.tel)}
              </a>
              {contact.whatsapp && (
                <a
                  href={`https://wa.me/${contact.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 text-(--color-cyan) hover:underline"
                >
                  <FaWhatsapp className="w-4 h-4 shrink-0 text-(--color-cyan)/80" />
                  {formatWhatsapp(contact.whatsapp)}
                </a>
              )}
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
