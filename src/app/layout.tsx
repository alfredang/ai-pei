import "./globals.css";
import type { Metadata } from "next";
import { Inter, Exo_2, JetBrains_Mono } from "next/font/google";
import { ChatBot } from "@/components/ui/ChatBot";
import {
  getSiteBrand,
  getCompanyContact,
  getSocialLinks,
} from "@/lib/site-settings";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans-import", display: "swap" });
const exo2 = Exo_2({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800", "900"],
  variable: "--font-display-import",
  display: "swap",
});
const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono-import",
  display: "swap",
});

const SITE_URL = "https://www.tertiaryinfotech.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "AI LMS & TMS for WSQ, TPQA & SSG ATO Compliance | Tertiary Infotech Academy",
    template: "%s | Tertiary Infotech Academy",
  },
  description:
    "AI-powered LMS & TMS for Singapore training providers — automate WSQ compliance, pass TPQA audits, and integrate with SSG out of the box.",
  openGraph: {
    type: "website",
    siteName: "Tertiary Infotech Academy",
    locale: "en_SG",
    url: SITE_URL,
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [brand, contact, socials] = await Promise.all([
    getSiteBrand().catch(() => null),
    getCompanyContact().catch(() => null),
    getSocialLinks().catch(() => []),
  ]);

  const orgLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: brand?.fullName ?? "Tertiary Infotech Academy Pte Ltd",
    alternateName: brand?.shortName ?? undefined,
    url: SITE_URL,
    logo: brand?.logoUrl ? new URL(brand.logoUrl, SITE_URL).toString() : `${SITE_URL}/favicon.ico`,
    email: contact?.email,
    telephone: contact?.tel,
    address: contact?.address
      ? {
          "@type": "PostalAddress",
          streetAddress: contact.address,
          addressCountry: "SG",
        }
      : undefined,
    sameAs: socials.map((s) => s.href),
    taxID: brand?.uen ?? undefined,
  };

  return (
    <html lang="en" className={`dark ${inter.variable} ${exo2.variable} ${mono.variable}`}>
      <body className="min-h-screen antialiased">
        {children}
        <ChatBot />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgLd) }}
        />
      </body>
    </html>
  );
}
