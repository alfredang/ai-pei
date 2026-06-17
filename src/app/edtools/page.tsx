import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ServiceLeadForm } from "@/components/sections/ServiceLeadForm";
import { EDTOOLS, ED_TOOL_CATEGORIES, getEdToolsGrouped } from "@/lib/edtools-data";
import { htmlPath } from "@/lib/html-url";
import { HiArrowUpRight } from "react-icons/hi2";

const PAGE_URL = "https://www.tertiaryinfotech.edu.sg/edtools.html";

export const metadata: Metadata = {
  title: "50+ EdTools — Interactive Classroom, Analytics, Cybersecurity, Finance",
  description:
    "Browse the 50+ EdTools bundled inside Tertiary Infotech Academy's AI-LMS-TMS — interactive classroom widgets, problem-solving frameworks, cybersecurity labs, data analytics, finance, statistics, sustainability, and blockchain tools.",
  alternates: { canonical: "/edtools.html" },
  openGraph: {
    type: "website",
    url: PAGE_URL,
    title: "50+ EdTools — AI-LMS-TMS by Tertiary Infotech Academy",
    description:
      "Padlet, Whiteboard, Live Q&A, Pareto, Fishbone, CyberLabs, HackLabs, NovaStats, NovaSPC, Carbon Calculator and more — all bundled in our AI-LMS-TMS.",
    locale: "en_SG",
    siteName: "Tertiary Infotech Academy",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Tertiary Infotech Academy" }],
  },
};

export default function EdToolsIndex() {
  const grouped = getEdToolsGrouped();
  return (
    <>
      <Navbar />
      <main>
        <section className="relative pt-10 pb-12 overflow-hidden">
          <div className="grid-bg opacity-60" />
          <div
            className="glow-blob"
            style={{
              top: "-25%",
              left: "20%",
              width: 520,
              height: 520,
              background: "radial-gradient(circle, #5C00E5 0%, transparent 70%)",
            }}
          />
          <Container className="relative">
            <div className="kicker mb-4">[ AI-LMS-TMS · EDTOOLS ]</div>
            <h1 className="font-display text-[clamp(2rem,5vw,3.5rem)] font-extrabold leading-[1.1] max-w-4xl">
              <span className="gradient-text">{EDTOOLS.length}+ EdTools</span>, bundled with our AI-LMS-TMS.
            </h1>
            <p className="mt-5 text-(--color-muted) text-lg max-w-3xl">
              Every Tertiary Infotech Academy deployment ships with a working set of classroom widgets, analytics
              calculators, security labs, and statistical workbenches — so trainers stop renting{" "}
              <span className="text-white/80">Mentimeter</span>,{" "}
              <span className="text-white/80">Padlet</span>,{" "}
              <span className="text-white/80">Slido</span>, and a dozen single-tool SaaS subscriptions.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/learning-management-system.html" className="btn-primary">
                ← Back to LMS / TMS
              </Link>
              <Link
                href="/contact.html?source=edtools-index-quote"
                className="px-5 py-3 rounded-lg border border-(--color-cyan)/40 text-(--color-cyan) hover:bg-(--color-cyan)/10 text-sm font-medium"
              >
                Get a deployment quote →
              </Link>
            </div>
          </Container>
        </section>

        <section className="pb-12">
          <Container>
            {ED_TOOL_CATEGORIES.map((cat) => {
              const tools = grouped[cat];
              if (tools.length === 0) return null;
              return (
                <div key={cat} className="mb-12">
                  <div className="flex items-baseline justify-between mb-5 gap-4 flex-wrap">
                    <h2 className="font-display text-2xl md:text-3xl font-bold">
                      {cat}
                      <span className="ml-3 text-sm font-mono text-white/40">[{tools.length}]</span>
                    </h2>
                  </div>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {tools.map((t) => (
                      <Link
                        key={t.slug}
                        href={htmlPath(`/edtools/${t.slug}`)}
                        className="glass card-hover p-5 flex flex-col group"
                      >
                        <div className="flex items-start justify-between gap-3 mb-2">
                          <h3 className="font-display font-bold text-white group-hover:text-(--color-cyan) transition">
                            {t.name}
                          </h3>
                          <HiArrowUpRight className="w-4 h-4 text-white/30 group-hover:text-(--color-cyan) transition" />
                        </div>
                        <p className="text-sm text-(--color-muted) line-clamp-3 leading-relaxed flex-1">
                          {t.description}
                        </p>
                        <div className="mt-3 flex flex-wrap gap-1">
                          {(t.stack ?? []).slice(0, 3).map((s) => (
                            <span
                              key={s}
                              className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-white/5 text-white/50 border border-white/10"
                            >
                              {s}
                            </span>
                          ))}
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              );
            })}
          </Container>
        </section>

        <section className="relative py-20 overflow-hidden">
          <div
            className="glow-blob"
            style={{
              bottom: "-30%",
              right: "10%",
              width: 500,
              height: 500,
              background: "radial-gradient(circle, #59EBFD 0%, transparent 70%)",
            }}
          />
          <Container className="relative">
            <div className="grid lg:grid-cols-[1fr_1fr] gap-10 items-center">
              <div>
                <div className="kicker mb-3">[ DEPLOY THE FULL SUITE ]</div>
                <h2 className="font-display text-3xl md:text-4xl font-extrabold leading-tight">
                  Want all {EDTOOLS.length}+ EdTools inside your own AI-LMS-TMS?
                </h2>
                <p className="mt-4 text-(--color-muted) leading-relaxed">
                  We deploy the full suite into your own cloud, configure WSQ/TPQA-compliant workflows, integrate
                  with TPGateway, and migrate your existing learner data. Fixed-fee scoping, four-week typical
                  go-live.
                </p>
                <ul className="mt-5 space-y-2 text-sm text-white/80">
                  <li>✓ All EdTools bundled, no per-tool licensing</li>
                  <li>✓ SSG API, TRAQOM, OpenCerts integration ready</li>
                  <li>✓ Self-hosted in your tenancy — no vendor lock-in</li>
                  <li>✓ Singapore data residency by default</li>
                </ul>
              </div>
              <ServiceLeadForm
                source="edtools-index"
                buttonLabel="Request a deployment quote →"
                qualifyingPlaceholder="Tell us your learner volume, target go-live date, and any specific tools you need first…"
              />
            </div>
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
}
