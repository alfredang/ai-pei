import Link from "next/link";
import { db } from "@/db";
import { courses } from "@/db/schema";
import { asc, desc, eq } from "drizzle-orm";
import { Container } from "@/components/layout/Container";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { fundingColor } from "@/lib/funding";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.tertiaryinfotech.edu.sg";

export const metadata: Metadata = {
  title: "Courses | WSQ Advanced Certificates",
  description:
    "WSQ-funded advanced certificate courses from Tertiary Infotech Academy — stackable, industry-aligned training pathways with up to 70% subsidy and SkillsFuture Credit claimable.",
  keywords:
    "WSQ courses Singapore, advanced certificate, SkillsFuture courses, stackable certification, Tertiary Infotech Academy courses",
  alternates: { canonical: "/courses" },
  openGraph: {
    type: "website",
    url: "/courses",
    title: "Courses | Tertiary Infotech Academy",
    description:
      "WSQ-funded advanced certificate courses — stackable, industry-aligned training pathways.",
    locale: "en_SG",
    siteName: "Tertiary Infotech Academy",
    images: [{ url: "/icon-192.png", width: 192, height: 192, alt: "Tertiary Infotech Academy" }],
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
    url: `${BASE}/courses`,
    hasPart: list.map((c) => ({
      "@type": "Course",
      name: c.title,
      url: `${BASE}/courses/${c.slug}`,
      ...(c.summary ? { description: c.summary } : {}),
      provider: {
        "@type": "Organization",
        name: "Tertiary Infotech Academy",
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
        <section className="relative pt-24 pb-10 overflow-hidden">
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
              WSQ <span className="gradient-text">Advanced Certificates</span>
            </h1>
            <p className="mt-5 text-(--color-muted) text-lg max-w-2xl">
              Stackable, industry-aligned training pathways with up to 70% WSQ funding and
              SkillsFuture Credit claimable.
            </p>
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
                    href={`/courses/${c.slug}`}
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
      </main>
      <Footer />
    </>
  );
}
