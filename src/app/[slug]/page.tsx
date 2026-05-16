import { notFound, redirect } from "next/navigation";
import { db } from "@/db";
import { pages, redirects, categories } from "@/db/schema";
import { and, eq } from "drizzle-orm";
import { Container } from "@/components/layout/Container";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ServiceLeadForm } from "@/components/sections/ServiceLeadForm";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

async function getPage(slug: string) {
  const [p] = await db
    .select()
    .from(pages)
    .where(and(eq(pages.slug, slug), eq(pages.status, "published")))
    .limit(1);
  return p;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const page = await getPage(slug);
  if (!page) return { title: "Not found" };
  const canonical = page.canonicalUrl ?? `/${page.slug}`;
  const ogImage = page.ogImage ?? "/icon-192.png";
  return {
    title: page.seoTitle ?? page.title,
    description: page.seoDescription ?? page.excerpt ?? undefined,
    keywords: page.seoKeywords ?? undefined,
    alternates: { canonical },
    robots: page.noIndex ? { index: false } : undefined,
    openGraph: {
      title: page.seoTitle ?? page.title,
      description: page.seoDescription ?? page.excerpt ?? undefined,
      images: [ogImage],
      type: "article",
      url: `/${page.slug}`,
      locale: "en_SG",
      siteName: "Tertiary Infotech Academy",
    },
    twitter: {
      card: "summary_large_image",
      title: page.seoTitle ?? page.title,
      description: page.seoDescription ?? page.excerpt ?? undefined,
      images: [ogImage],
    },
  };
}

export default async function CmsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  // Reserved top-level routes are handled by their own pages; redirects table covers WP legacy paths.
  const [redir] = await db
    .select()
    .from(redirects)
    .where(eq(redirects.fromPath, `/${slug}`))
    .limit(1);
  if (redir) redirect(redir.toPath);

  const page = await getPage(slug);
  if (!page) notFound();

  const SITE_URL = "https://www.tertiaryinfotech.com";
  const pageUrl = `${SITE_URL}/${page.slug}`;
  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: page.title, item: pageUrl },
    ],
  };
  const webPageLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: page.seoTitle ?? page.title,
    description: page.seoDescription ?? page.excerpt ?? undefined,
    url: pageUrl,
    inLanguage: "en-SG",
    isPartOf: { "@type": "WebSite", name: "Tertiary Infotech Academy", url: SITE_URL },
    dateModified: page.updatedAt?.toISOString(),
  };

  // Source-tag the embedded lead form so submissions are attributable to this page
  const leadSource = `page-${page.slug}`;

  return (
    <>
      <Navbar />
      <main className="pt-16">
        <Container className="max-w-3xl py-16">
          <h1 className="text-3xl md:text-5xl font-bold mb-8">{page.title}</h1>
          <div
            className="prose-dark"
            dangerouslySetInnerHTML={{ __html: page.contentHtml ?? "" }}
          />
        </Container>

        {/* Consultation form — embedded on every DB-driven page so every URL doubles as a lead-gen funnel. */}
        <section className="relative py-16 border-t border-white/5">
          <div
            className="glow-blob"
            style={{
              bottom: "-30%",
              right: "10%",
              width: 460,
              height: 460,
              background: "radial-gradient(circle, #59EBFD 0%, transparent 70%)",
              opacity: 0.35,
            }}
          />
          <Container className="max-w-5xl relative">
            <div className="grid lg:grid-cols-[1fr_1fr] gap-10 items-start">
              <div>
                <div className="kicker mb-3">[ FREE CONSULTATION ]</div>
                <h2 className="font-display text-3xl md:text-4xl font-extrabold leading-tight">
                  Want something like <span className="gradient-text">{page.title}</span> for your team?
                </h2>
                <p className="mt-4 text-(--color-muted) leading-relaxed">
                  Tell us what you&apos;re building. We&apos;ll scope a fixed-fee deployment, share a working
                  prototype within 1&ndash;2 weeks, and hand over a self-hosted system you fully own — no
                  vendor lock-in, weekly demos, Singapore data residency by default.
                </p>
                <ul className="mt-5 space-y-2 text-sm text-white/80">
                  <li>✓ Fixed-fee scoping with a clear deliverable</li>
                  <li>✓ Weekly demo cadence — no surprises</li>
                  <li>✓ Self-hosted in your own cloud — your data, your control</li>
                  <li>✓ Free reply within 1 business day</li>
                </ul>
              </div>
              <ServiceLeadForm
                source={leadSource}
                buttonLabel="Book my free consultation →"
                qualifyingPlaceholder="Tell us about the project — team size, timeline, must-have integrations…"
              />
            </div>
          </Container>
        </section>
      </main>
      <Footer />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
    </>
  );
}
