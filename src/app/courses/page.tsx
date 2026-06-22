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

// Display order of the course categories.
const CATEGORY_ORDER = [
  "Artificial Intelligence",
  "Cyber Security",
  "Blockchain",
  "Quantum Computing",
] as const;

// Explicit slug → category map for the current catalogue.
const COURSE_CATEGORY: Record<string, (typeof CATEGORY_ORDER)[number]> = {
  "advanced-certificate-in-ai-security-analyst": "Artificial Intelligence",
  "advanced-certificate-in-agentic-ai-coding": "Artificial Intelligence",
  "advanced-certificate-in-ai-audit-and-assurance": "Artificial Intelligence",
  "advanced-certificate-in-ai-risk-management": "Artificial Intelligence",
  "advanced-certificate-in-ai-security-and-governance-management": "Artificial Intelligence",
  "advanced-certificate-in-cyber-security": "Cyber Security",
  "advanced-certificate-in-cybersecurity-operations-analyst": "Cyber Security",
  "advanced-certificate-in-enterprise-information-security-leadership": "Cyber Security",
  "advanced-certificate-in-enterprise-blockchain-solution-architecture": "Blockchain",
  "advanced-certificate-in-digital-asset-compliance-and-blockchain-risk-operations": "Blockchain",
  "advanced-certificate-in-applied-quantum-computing-and-qiskit-programming": "Quantum Computing",
};

// Categorize a course: explicit map first, then a keyword fallback so future
// courses still land in a sensible group. Order matters — AI wins over Cyber
// for "AI Security" titles, which is the intended placement.
function categoryFor(c: { slug: string; title: string }): (typeof CATEGORY_ORDER)[number] {
  const mapped = COURSE_CATEGORY[c.slug];
  if (mapped) return mapped;
  const t = `${c.slug} ${c.title}`.toLowerCase();
  if (t.includes("quantum")) return "Quantum Computing";
  if (t.includes("blockchain") || t.includes("digital asset") || t.includes("web3"))
    return "Blockchain";
  if (t.includes("ai") || t.includes("artificial intelligence") || t.includes("agentic"))
    return "Artificial Intelligence";
  if (t.includes("security") || t.includes("cyber")) return "Cyber Security";
  return "Artificial Intelligence";
}

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

  // Group the published courses by category, preserving the DB sort order
  // within each group and CATEGORY_ORDER across groups.
  const grouped = new Map<string, typeof list>();
  for (const c of list) {
    const cat = categoryFor(c);
    (grouped.get(cat) ?? grouped.set(cat, []).get(cat)!).push(c);
  }
  const orderedCategories = [
    ...CATEGORY_ORDER.filter((c) => grouped.has(c)),
    ...[...grouped.keys()].filter(
      (c) => !(CATEGORY_ORDER as readonly string[]).includes(c),
    ),
  ];

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
              <div className="space-y-14">
                {orderedCategories.map((cat) => (
                  <div key={cat}>
                    <div className="kicker mb-3">[ {cat.toUpperCase()} ]</div>
                    <h2 className="font-display text-xl md:text-2xl font-extrabold mb-6">
                      {cat}
                    </h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {(grouped.get(cat) ?? []).map((c) => (
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
                  </div>
                ))}
              </div>
            )}
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
}
