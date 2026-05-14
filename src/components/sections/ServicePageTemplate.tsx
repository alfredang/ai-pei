import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ServiceLeadForm } from "@/components/sections/ServiceLeadForm";
import type { ServicePageContent } from "@/lib/service-pages";

/** Render a full service landing page from a ServicePageContent config. */
export function ServicePageTemplate({ content }: { content: ServicePageContent }) {
  const SITE_URL = "https://www.tertiaryinfotech.com";
  const pageUrl = `${SITE_URL}/${content.slug}`;

  const serviceLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: content.serviceType,
    name: content.title,
    provider: {
      "@type": "Organization",
      name: "Tertiary Infotech",
      url: SITE_URL,
    },
    areaServed: { "@type": "Country", name: "Singapore" },
    description: content.meta.description,
    url: pageUrl,
  };

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: content.faq.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Services", item: `${SITE_URL}/#services` },
      { "@type": "ListItem", position: 3, name: content.title, item: pageUrl },
    ],
  };

  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <section className="relative py-10 md:py-14 overflow-hidden">
          <div
            className="glow-blob"
            style={{
              top: "-10%",
              left: "-5%",
              width: 520,
              height: 520,
              background: "radial-gradient(circle, #5C00E5 0%, transparent 70%)",
            }}
          />
          <div
            className="glow-blob"
            style={{
              top: "20%",
              right: "-10%",
              width: 480,
              height: 480,
              background: "radial-gradient(circle, rgba(89,235,253,0.45) 0%, transparent 70%)",
            }}
          />
          <Container>
            <div className="grid lg:grid-cols-12 gap-8 items-start relative">
              <div className="lg:col-span-7">
                <div className="kicker mb-4">{content.hero.kicker}</div>
                <h1
                  className="font-display text-[clamp(2.25rem,5.2vw,3.75rem)] font-extrabold leading-[1.04] mb-5"
                  dangerouslySetInnerHTML={{ __html: content.hero.headlineHtml }}
                />
                <p className="text-(--color-muted) text-lg max-w-2xl mb-6">{content.hero.subhead}</p>
                <div className="flex flex-wrap gap-3">
                  <a href="#book" className="btn-primary">
                    Book a consultation →
                  </a>
                  <a
                    href="#whats-included"
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-lg border border-white/15 text-white/85 hover:border-(--color-cyan)/50 hover:text-(--color-cyan) transition"
                  >
                    What's included
                  </a>
                </div>
              </div>
              <div className="lg:col-span-5 lg:sticky lg:top-24">
                <div id="book" className="scroll-mt-24">
                  <div className="kicker mb-3">[ START HERE ]</div>
                  <ServiceLeadForm
                    source={content.leadSource}
                    buttonLabel="Book my consultation →"
                    compact
                  />
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* Benefits */}
        <section className="relative py-10">
          <Container>
            <div className="max-w-3xl mb-8">
              <div className="kicker mb-3">[ WHY US ]</div>
              <h2 className="font-display text-[clamp(1.75rem,3.5vw,2.5rem)] font-extrabold leading-tight">
                What you get with our <span className="gradient-text">{content.title}</span>.
              </h2>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              {content.benefits.map((b) => (
                <div key={b.title} className="glass card-hover p-6 relative overflow-hidden">
                  <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-(--color-cyan) to-transparent" />
                  <h3 className="font-display font-bold text-lg mb-2">{b.title}</h3>
                  <p className="text-sm text-(--color-muted) leading-relaxed">{b.body}</p>
                </div>
              ))}
            </div>
          </Container>
        </section>

        {/* What's included */}
        <section id="whats-included" className="relative py-10 scroll-mt-20">
          <Container>
            <div className="grid md:grid-cols-2 gap-8 items-start">
              <div>
                <div className="kicker mb-3">[ WHAT WE DELIVER ]</div>
                <h2 className="font-display text-[clamp(1.75rem,3.5vw,2.5rem)] font-extrabold leading-tight mb-4">
                  Everything you need, <span className="gradient-text-warm">in one engagement</span>.
                </h2>
              </div>
              <ul className="space-y-3">
                {content.whatsIncluded.map((line) => (
                  <li key={line} className="flex gap-3">
                    <span className="text-(--color-green) font-mono mt-0.5">✓</span>
                    <span className="text-white/90">{line}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Container>
        </section>

        {/* FAQ */}
        <section className="relative py-10">
          <Container className="max-w-4xl">
            <div className="mb-8">
              <div className="kicker mb-3">[ FAQ ]</div>
              <h2 className="font-display text-[clamp(1.75rem,3.5vw,2.5rem)] font-extrabold leading-tight">
                Common questions about {content.title}.
              </h2>
            </div>
            <div className="space-y-3">
              {content.faq.map((f) => (
                <details
                  key={f.q}
                  className="glass p-5 group [&_summary::-webkit-details-marker]:hidden"
                >
                  <summary className="cursor-pointer flex justify-between items-center gap-4">
                    <span className="font-display font-semibold text-base text-white">{f.q}</span>
                    <span className="text-(--color-cyan) font-mono text-lg transition group-open:rotate-45">
                      +
                    </span>
                  </summary>
                  <p className="text-sm text-(--color-muted) leading-relaxed mt-3">{f.a}</p>
                </details>
              ))}
            </div>
          </Container>
        </section>

        {/* Final CTA */}
        <section className="relative py-10 overflow-hidden">
          <div
            className="glow-blob"
            style={{
              top: "10%",
              left: "0",
              width: 480,
              height: 480,
              background: "radial-gradient(circle, #5C00E5 0%, transparent 70%)",
            }}
          />
          <Container className="max-w-4xl relative">
            <div className="text-center mb-8">
              <div className="kicker mb-3">[ GET STARTED ]</div>
              <h2 className="font-display text-[clamp(2rem,4.5vw,3rem)] font-extrabold leading-[1.05] mb-4">
                Ready to start? <span className="gradient-text">Talk to a consultant.</span>
              </h2>
              <p className="text-(--color-muted) text-lg">
                Free 30-minute consultation. We'll tell you what's realistic before you spend a
                dollar.
              </p>
            </div>
            <ServiceLeadForm source={content.leadSource} />
            <p className="mt-5 text-center text-xs text-(--color-muted) font-mono">
              [{" "}
              <Link href="/#services" className="hover:text-(--color-cyan)">
                See all services
              </Link>{" "}
              ]
            </p>
          </Container>
        </section>
      </main>
      <Footer />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
    </>
  );
}
