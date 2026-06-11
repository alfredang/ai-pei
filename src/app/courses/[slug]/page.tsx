import { notFound } from "next/navigation";
import { db } from "@/db";
import { courses, courseModules } from "@/db/schema";
import { and, asc, eq } from "drizzle-orm";
import { Container } from "@/components/layout/Container";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CourseRegisterForm } from "@/components/sections/CourseRegisterForm";
import { fundingColor } from "@/lib/funding";
import {
  HiAcademicCap,
  HiCheckBadge,
  HiClipboardDocumentCheck,
  HiMapPin,
} from "react-icons/hi2";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.tertiaryinfotech.com";

// Shared boilerplate — identical for every course, edited here once.
const VENUE =
  "12 Woodlands Square #07-85/86/87 Woods Square Tower 1, Singapore 737715. 5 mins walk from Woodlands (NS9) MRT station. The venue is disabled-friendly.";
const CERTIFICATION_STATEMENTS = [
  "Certificate of Completion from Tertiary Infotech — upon meeting at least 75% attendance and passing the assessment(s).",
  "OpenCerts (Statement of Achievement) from SkillsFuture Singapore — after passing the assessment(s) and achieving at least 75% attendance.",
];
const POST_COURSE_SUPPORT =
  "We provide free consultation related to the subject matter after the course. Email your queries to enquiry@tertiaryinfotech.com and we will forward them to the subject matter experts.";
const CANCELLATION_POLICY =
  "You can register your interest without upfront payment. There is no penalty for withdrawal before the class commences. We reserve the right to cancel or re-schedule the course due to unforeseen circumstances; if cancelled, we refund 100% of any paid amount. The training venue is subject to change due to classroom availability.";

async function getCourse(slug: string) {
  const [c] = await db
    .select()
    .from(courses)
    .where(and(eq(courses.slug, slug), eq(courses.status, "published")))
    .limit(1);
  if (!c) return null;
  const mods = await db
    .select()
    .from(courseModules)
    .where(eq(courseModules.courseId, c.id))
    .orderBy(asc(courseModules.sortOrder));
  return { course: c, modules: mods };
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const data = await getCourse(slug);
  if (!data) return { title: "Course not found" };
  const { course: c } = data;
  const title = c.seoTitle || `${c.title} | WSQ Funded`;
  const description =
    c.seoDescription || c.summary || `${c.title} — WSQ-funded training pathway.`;
  return {
    title,
    description,
    alternates: { canonical: `/courses/${c.slug}` },
    openGraph: {
      type: "website",
      url: `/courses/${c.slug}`,
      title: `${c.title} | Tertiary Infotech Academy`,
      description,
      locale: "en_SG",
      siteName: "Tertiary Infotech Academy",
      ...(c.heroImage ? { images: [{ url: c.heroImage }] } : {}),
    },
  };
}

/** Split a textarea value into bullet lines. */
function lines(text: string | null | undefined): string[] {
  if (!text) return [];
  return text
    .split("\n")
    .map((l) => l.replace(/^[-•*]\s*/, "").trim())
    .filter(Boolean);
}

export default async function CourseDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const data = await getCourse(slug);
  if (!data) notFound();
  const { course: c, modules } = data;

  const outcomeItems = lines(c.outcomes);
  const enrollItems = lines(c.whoShouldEnroll);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Course",
    name: c.title,
    url: `${BASE}/courses/${c.slug}`,
    ...(c.summary || c.seoDescription
      ? { description: c.seoDescription || c.summary }
      : {}),
    ...(c.courseCode ? { courseCode: c.courseCode } : {}),
    provider: {
      "@type": "Organization",
      name: "Tertiary Infotech Academy",
      sameAs: BASE,
    },
  };

  return (
    <>
      <Navbar />
      <main>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        {/* Hero */}
        <section className="relative pt-24 pb-12 overflow-hidden">
          <div className="grid-bg opacity-50" />
          <div
            className="glow-blob"
            style={{
              top: "-20%",
              right: "5%",
              width: 520,
              height: 520,
              background: "radial-gradient(circle, #59EBFD 0%, transparent 65%)",
              opacity: 0.1,
            }}
          />
          <Container className="relative">
            <div className="kicker mb-4">[ WSQ ADVANCED CERTIFICATE ]</div>
            <h1 className="font-display text-[clamp(2rem,5vw,3.5rem)] font-extrabold leading-[1.05] max-w-4xl">
              {c.title}
            </h1>
            {c.summary && (
              <p className="mt-5 text-(--color-muted) text-lg max-w-2xl">{c.summary}</p>
            )}

            <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm">
              {c.courseCode && (
                <span className="font-mono text-white/60">
                  Course Code: <span className="text-white">{c.courseCode}</span>
                </span>
              )}
              {c.priceExclGst && (
                <span className="text-white">
                  <span className="font-semibold">{c.priceExclGst}</span>{" "}
                  <span className="text-white/50">excl. GST</span>
                  {c.priceInclGst && (
                    <span className="text-white/50">
                      {" "}
                      · {c.priceInclGst} incl. GST
                    </span>
                  )}
                </span>
              )}
            </div>

            {(c.fundingTags ?? []).length > 0 && (
              <div className="mt-5 flex flex-wrap gap-2">
                {(c.fundingTags ?? []).map((t) => (
                  <span
                    key={t}
                    style={{ backgroundColor: fundingColor(t) }}
                    className="px-3 py-1 rounded-full text-xs font-semibold text-white"
                  >
                    {t}
                  </span>
                ))}
              </div>
            )}

            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#register" className="btn-primary">
                Register Your Interest →
              </a>
              {c.brochureUrl && (
                <a
                  href={c.brochureUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-5 py-2.5 rounded-lg border border-(--color-cyan)/40 text-(--color-cyan) hover:bg-(--color-cyan)/10 transition text-sm"
                >
                  Download Brochure
                </a>
              )}
            </div>
          </Container>
        </section>

        {/* Overview */}
        {c.overview && (
          <section className="py-12">
            <Container className="max-w-3xl">
              <div className="kicker mb-4">[ COURSE OVERVIEW ]</div>
              <h2 className="font-display text-2xl md:text-3xl font-extrabold mb-5">
                What’s This Course About
              </h2>
              <div className="space-y-4 text-(--color-muted) leading-relaxed whitespace-pre-line">
                {c.overview}
              </div>
            </Container>
          </section>
        )}

        {/* Modules */}
        {modules.length > 0 && (
          <section className="py-12">
            <Container>
              <div className="text-center mb-10">
                <div className="kicker mb-4">[ MODULES ]</div>
                <h2 className="font-display text-2xl md:text-3xl font-extrabold">
                  Course <span className="gradient-text">Modules</span>
                </h2>
              </div>
              <div className="grid md:grid-cols-2 gap-5">
                {modules.map((m, i) => (
                  <div key={m.id} className="glass p-6 flex flex-col">
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-mono text-xs text-(--color-cyan)">
                        Module {String(i + 1).padStart(2, "0")}
                      </span>
                      {m.kind && (
                        <span
                          className={`px-2 py-0.5 rounded-full text-[10px] uppercase tracking-wide border ${
                            m.kind === "elective"
                              ? "text-(--color-amber) border-(--color-amber)/40 bg-(--color-amber)/10"
                              : "text-(--color-cyan) border-(--color-cyan)/40 bg-(--color-cyan)/10"
                          }`}
                        >
                          {m.kind}
                        </span>
                      )}
                    </div>
                    <h3 className="font-display font-bold text-lg text-white mb-2">
                      {m.title}
                    </h3>
                    {m.details && (
                      <p className="text-sm text-(--color-muted) leading-relaxed whitespace-pre-line flex-1">
                        {m.details}
                      </p>
                    )}
                    {(m.sessions || m.duration) && (
                      <div className="mt-4 flex flex-wrap gap-x-5 gap-y-1 text-xs font-mono text-white/55">
                        {m.sessions && <span>◷ {m.sessions}</span>}
                        {m.duration && <span>⏱ {m.duration}</span>}
                      </div>
                    )}
                    {m.registrationLink && (
                      <a
                        href={m.registrationLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-4 text-xs text-(--color-cyan) hover:underline font-mono"
                      >
                        Register for this module →
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </Container>
          </section>
        )}

        {/* Outcomes + Who should enroll */}
        {(outcomeItems.length > 0 || enrollItems.length > 0) && (
          <section className="py-12">
            <Container className="grid md:grid-cols-2 gap-6">
              {outcomeItems.length > 0 && (
                <div className="glass p-7">
                  <div className="flex items-center gap-2 mb-4">
                    <HiAcademicCap className="w-5 h-5 text-(--color-cyan)" />
                    <h2 className="font-display font-bold text-xl">Program Outcomes</h2>
                  </div>
                  <ul className="space-y-2.5">
                    {outcomeItems.map((o, i) => (
                      <li key={i} className="flex gap-3 text-sm text-(--color-muted)">
                        <HiCheckBadge className="w-5 h-5 text-(--color-green) shrink-0 mt-0.5" />
                        <span>{o}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {enrollItems.length > 0 && (
                <div className="glass p-7">
                  <div className="flex items-center gap-2 mb-4">
                    <HiClipboardDocumentCheck className="w-5 h-5 text-(--color-purple-light)" />
                    <h2 className="font-display font-bold text-xl">Who Should Enroll</h2>
                  </div>
                  <ul className="space-y-2.5">
                    {enrollItems.map((o, i) => (
                      <li key={i} className="flex gap-3 text-sm text-(--color-muted)">
                        <span className="text-(--color-cyan) shrink-0">→</span>
                        <span>{o}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </Container>
          </section>
        )}

        {/* Certification + course info */}
        <section className="py-12">
          <Container className="grid md:grid-cols-2 gap-6">
            <div className="glass p-7">
              <div className="flex items-center gap-2 mb-4">
                <HiCheckBadge className="w-5 h-5 text-(--color-green)" />
                <h2 className="font-display font-bold text-xl">Certification</h2>
              </div>
              {c.certificate ? (
                <div className="text-sm text-(--color-muted) leading-relaxed whitespace-pre-line">
                  {c.certificate}
                </div>
              ) : (
                <ul className="space-y-2.5">
                  {CERTIFICATION_STATEMENTS.map((s, i) => (
                    <li key={i} className="flex gap-3 text-sm text-(--color-muted)">
                      <HiCheckBadge className="w-5 h-5 text-(--color-green) shrink-0 mt-0.5" />
                      <span>{s}</span>
                    </li>
                  ))}
                </ul>
              )}
              {c.assessment && (
                <p className="mt-4 text-sm text-white/70">
                  <span className="text-white/50">Assessment:</span> {c.assessment}
                </p>
              )}
            </div>
            <div className="glass p-7">
              <div className="flex items-center gap-2 mb-4">
                <HiMapPin className="w-5 h-5 text-(--color-cyan)" />
                <h2 className="font-display font-bold text-xl">Venue</h2>
              </div>
              <p className="text-sm text-(--color-muted) leading-relaxed">{VENUE}</p>
            </div>
          </Container>
        </section>

        {/* Support + policy */}
        <section className="pb-12">
          <Container className="grid md:grid-cols-2 gap-6">
            <div className="glass p-7">
              <h2 className="font-display font-bold text-lg mb-3">Post-Course Support</h2>
              <p className="text-sm text-(--color-muted) leading-relaxed">
                {POST_COURSE_SUPPORT}
              </p>
            </div>
            <div className="glass p-7">
              <h2 className="font-display font-bold text-lg mb-3">
                Cancellation &amp; Reschedule Policy
              </h2>
              <p className="text-sm text-(--color-muted) leading-relaxed">
                {CANCELLATION_POLICY}
              </p>
            </div>
          </Container>
        </section>

        {/* Register */}
        <CourseRegisterForm
          courseTitle={c.title}
          courseSlug={c.slug}
          modules={modules.map((m) => m.title)}
        />
      </main>
      <Footer />
    </>
  );
}
