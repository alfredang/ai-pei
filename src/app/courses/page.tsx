import Link from "next/link";
import { db } from "@/db";
import { courses } from "@/db/schema";
import { asc, desc, eq } from "drizzle-orm";
import { Container } from "@/components/layout/Container";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { fundingColor } from "@/lib/funding";
import { absoluteHtmlUrl, htmlPath } from "@/lib/html-url";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.tertiaryinfotech.edu.sg";

export const metadata: Metadata = {
  title: "Advanced Certificate Courses in AI, Cyber Security & Blockchain",
  description:
    "Browse Advanced Certificate courses in AI, Cyber Security and Blockchain at Tertiary Infotech Academy — a Singapore Private Education Institution. Hands-on, industry-recognised certifications for international students and career switchers.",
  keywords:
    "advanced certificate courses Singapore, cyber security course Singapore, AI course Singapore, blockchain course Singapore, study tech in Singapore, courses for international students Singapore, Tertiary Infotech Academy courses",
  alternates: { canonical: "/courses.html" },
  openGraph: {
    type: "website",
    url: "/courses.html",
    title: "Advanced Certificate Courses in AI, Cyber Security & Blockchain | Tertiary Infotech Academy",
    description:
      "Advanced Certificate courses in AI, Cyber Security and Blockchain — hands-on, industry-recognised training in Singapore for international students.",
    locale: "en_SG",
    siteName: "Tertiary Infotech Academy",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Tertiary Infotech Academy" }],
  },
};

export default async function CoursesIndex() {
  const list = await db
    .select()
    .from(courses)
    .where(eq(courses.status, "published"))
    .orderBy(asc(courses.sortOrder), desc(courses.updatedAt))
    .catch(() => []);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Courses",
    url: absoluteHtmlUrl(BASE, "/courses"),
    hasPart: list.map((c) => ({
      "@type": "Course",
      name: c.title,
      url: absoluteHtmlUrl(BASE, `/courses/${c.slug}`),
      ...(c.summary ? { description: c.summary } : {}),
      provider: {
        "@type": "EducationalOrganization",
        name: "Tertiary Infotech Academy",
        url: BASE,
        sameAs: BASE,
      },
    })),
  };

  return (
    <>
      <Navbar />
      <main>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <section className="relative pt-10 pb-10 overflow-hidden">
          <div className="grid-bg opacity-60" />
          <div
            className="glow-blob"
            style={{
              top: "-30%",
              left: "20%",
              width: 500,
              height: 500,
              background: "radial-gradient(circle, #5C00E5 0%, transparent 70%)",
            }}
          />
          <Container className="relative">
            <div className="kicker mb-4">[ COURSES ]</div>
            <h1 className="font-display text-[clamp(1.75rem,4vw,3rem)] font-extrabold leading-[1.15]">
              Advanced Certificate <span className="gradient-text">Courses</span>
            </h1>
            <p className="mt-5 text-(--color-muted) text-lg max-w-2xl">
              Hands-on, industry-recognised Advanced Certificate courses in AI, Cyber Security
              and Blockchain — built for international students and career switchers. WSQ funding
              available for eligible Singaporeans.
            </p>
            <div className="mt-6">
              <Link href="/study-in-singapore.html" className="btn-primary">
                International student? Study in Singapore →
              </Link>
            </div>
          </Container>
        </section>

        <section className="pb-24 pt-6">
          <Container>
            {list.length === 0 ? (
              <p className="text-(--color-muted) font-mono">[ NO COURSES YET ]</p>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {list.map((c) => (
                  <Link
                    key={c.id}
                    href={htmlPath(`/courses/${c.slug}`)}
                    className="card-hover glass overflow-hidden flex flex-col group p-6"
                  >
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {(c.fundingTags ?? []).slice(0, 3).map((t) => (
                        <span
                          key={t}
                          style={{ backgroundColor: fundingColor(t) }}
                          className="px-2 py-0.5 rounded-full text-[10px] font-semibold text-white"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                    <h3 className="font-display font-bold text-lg text-white group-hover:text-(--color-cyan) transition mb-2 leading-tight">
                      {c.title}
                    </h3>
                    {c.summary && (
                      <p className="text-sm text-(--color-muted) line-clamp-4 leading-relaxed flex-1">
                        {c.summary}
                      </p>
                    )}
                    <div className="mt-4 flex items-center justify-between">
                      {c.priceExclGst ? (
                        <span className="text-sm font-semibold text-white">
                          {c.priceExclGst}
                          <span className="text-xs text-white/40 font-normal"> excl. GST</span>
                        </span>
                      ) : (
                        <span />
                      )}
                      <span className="text-xs text-(--color-cyan) font-mono">View details →</span>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </Container>
        </section>

        {/* Specialisation tracks — SEO landers for the AI / Blockchain pillars */}
        <section className="pb-24">
          <Container>
            <div className="mb-8">
              <div className="kicker mb-3">[ SPECIALISATION TRACKS ]</div>
              <h2 className="font-display text-2xl md:text-3xl font-extrabold">
                AI, Cyber Security &amp; <span className="gradient-text">Blockchain</span>
              </h2>
              <p className="mt-3 text-(--color-muted) max-w-2xl">
                Explore our Advanced Certificate tracks — built for international students and
                career switchers entering Singapore&apos;s tech sector.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  href: "/courses/advanced-certificate-in-cyber-security",
                  tag: "Cyber Security",
                  title: "Advanced Certificate in Cyber Security",
                  body: "Four stackable CompTIA modules — A+, Security+, Linux+, and CySA+ / PenTest+ electives.",
                },
                {
                  href: "/advanced-certificate-in-ai-security-analyst",
                  tag: "AI + Security",
                  title: "Advanced Certificate in AI Security Analyst",
                  body: "Defend systems with AI and secure AI/LLM systems — threat detection, SOC automation, LLM security.",
                },
                {
                  href: "/advanced-certificate-in-agentic-ai-coding",
                  tag: "AI Engineering",
                  title: "Advanced Certificate in Agentic AI Coding & Architecting",
                  body: "Design, build and deploy autonomous AI agents — agentic patterns, RAG, and production architecture.",
                },
                {
                  href: "/advanced-certificate-in-blockchain",
                  tag: "Blockchain / Web3",
                  title: "Advanced Certificate in Blockchain",
                  body: "Smart contracts, DApps and Web3 — Solidity, Ethereum/EVM, and smart-contract security.",
                },
              ].map((p) => (
                <Link
                  key={p.href}
                  href={htmlPath(p.href)}
                  className="card-hover glass overflow-hidden flex flex-col group p-6"
                >
                  <div className="mb-4">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold text-(--color-cyan) border border-(--color-cyan)/40 bg-(--color-cyan)/10">
                      {p.tag}
                    </span>
                  </div>
                  <h3 className="font-display font-bold text-lg text-white group-hover:text-(--color-cyan) transition mb-2 leading-tight">
                    {p.title}
                  </h3>
                  <p className="text-sm text-(--color-muted) leading-relaxed flex-1">{p.body}</p>
                  <span className="mt-4 text-xs text-(--color-cyan) font-mono">View details →</span>
                </Link>
              ))}
            </div>
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
}
