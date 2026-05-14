import Link from "next/link";
import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Container } from "@/components/layout/Container";
import { CLIENTS, TESTIMONIALS } from "@/lib/clients-content";
import { HiArrowUpRight, HiCheckCircle } from "react-icons/hi2";

export const metadata: Metadata = {
  title: "Real Clients for LMS/TMS Singapore",
  description:
    "Production LMS and TMS deployments by Tertiary Infotech Academy — IES Digital Academy, Intellisoft Systems, and Chariot Learning & Consultancy.",
  keywords:
    "LMS Singapore case studies, TMS Singapore clients, WSQ LMS deployments, training provider LMS, Tertiary Infotech Academy clients",
  alternates: { canonical: "/real-clients" },
  openGraph: {
    type: "website",
    url: "/real-clients",
    title: "Real Clients for LMS/TMS Singapore | Tertiary Infotech Academy",
    description:
      "Production LMS and TMS deployments — IES Digital Academy, Intellisoft Systems, Chariot Learning & Consultancy.",
    locale: "en_SG",
    siteName: "Tertiary Infotech Academy",
    images: [{ url: "/icon-192.png", width: 192, height: 192, alt: "Tertiary Infotech Academy" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Real Clients for LMS/TMS Singapore | Tertiary Infotech Academy",
    description: "Production LMS and TMS deployments by Tertiary Infotech Academy.",
    images: ["/icon-192.png"],
  },
};

const productBadge: Record<string, string> = {
  LMS: "bg-(--color-cyan)/15 text-(--color-cyan) border-(--color-cyan)/30",
  TMS: "bg-(--color-amber)/15 text-(--color-amber) border-(--color-amber)/30",
  "LMS + TMS": "bg-(--color-purple)/20 text-(--color-purple-light) border-(--color-purple)/40",
};

export default function RealClientsPage() {
  return (
    <>
      <Navbar />
      <main>
        <section className="relative pt-12 pb-16 overflow-hidden">
          <div className="grid-bg opacity-60" />
          <div className="glow-blob" style={{ top: "-20%", left: "10%", width: 500, height: 500, background: "radial-gradient(circle, #5C00E5 0%, transparent 70%)" }} />
          <div className="glow-blob" style={{ top: "20%", right: "0%", width: 420, height: 420, background: "radial-gradient(circle, #59EBFD 0%, transparent 70%)" }} />
          <Container className="relative">
            <div className="kicker mb-4">[ REAL CLIENTS ]</div>
            <h1 className="font-display text-[clamp(2rem,5vw,4rem)] font-extrabold leading-[1.05] max-w-4xl">
              Real clients running our{" "}
              <span className="gradient-text">AI Powered LMS &amp; TMS</span>.
            </h1>
            <p className="mt-6 text-lg text-(--color-muted) max-w-3xl">
              Production deployments for Singapore training providers and professional bodies —
              live, in use, and serving learners every day.
            </p>
          </Container>
        </section>

        <section className="pb-20">
          <Container>
            <div className="grid md:grid-cols-2 gap-5">
              {CLIENTS.map((c) => (
                <article key={c.name} className="card-hover glass p-7 relative overflow-hidden">
                  <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-(--color-cyan) to-transparent" />
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div className="flex items-center gap-4 min-w-0">
                      {c.logo && (
                        <div className="shrink-0 w-14 h-14 rounded-lg bg-white grid place-items-center p-2">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={c.logo} alt={`${c.name} logo`} className="max-w-full max-h-full object-contain" />
                        </div>
                      )}
                      <div className="min-w-0">
                        <div className="kicker mb-1 truncate">{c.category}</div>
                        <h2 className="font-display font-bold text-2xl text-white truncate">{c.name}</h2>
                      </div>
                    </div>
                    <span className={`shrink-0 font-mono text-[10px] px-2 py-1 rounded border ${productBadge[c.product]}`}>
                      {c.product}
                    </span>
                  </div>
                  <p className="text-sm text-(--color-muted) leading-relaxed mb-5">{c.description}</p>
                  {c.metrics && (
                    <div className="grid grid-cols-3 gap-px bg-white/5 border border-white/8 rounded-lg overflow-hidden mb-5">
                      {c.metrics.map((m) => (
                        <div key={m.label} className="bg-(--color-bg-elevated) px-3 py-3 text-center">
                          <div className="font-display font-bold text-lg text-white">{m.value}</div>
                          <div className="text-[10px] text-(--color-muted) font-mono uppercase mt-0.5">{m.label}</div>
                        </div>
                      ))}
                    </div>
                  )}
                  <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
                    {c.url && (
                      <a
                        href={c.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-sm font-mono text-(--color-cyan) hover:gap-2.5 transition-all"
                      >
                        Customer site <HiArrowUpRight className="w-3.5 h-3.5" />
                      </a>
                    )}
                    {c.lmsUrl && (
                      <a
                        href={c.lmsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-sm font-mono text-(--color-amber) hover:gap-2.5 transition-all"
                      >
                        Live LMS <HiArrowUpRight className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                </article>
              ))}
            </div>
          </Container>
        </section>

        <section className="relative py-20 overflow-hidden">
          <div className="glow-blob" style={{ bottom: "-20%", left: "40%", width: 500, height: 500, background: "radial-gradient(circle, #5C00E5 0%, transparent 70%)", opacity: 0.3 }} />
          <Container className="relative">
            <div className="kicker mb-4">[ WHAT CLIENTS SAY ]</div>
            <div className="grid md:grid-cols-2 gap-5">
              {TESTIMONIALS.map((t) => (
                <blockquote key={t.quote} className="glass p-7 relative">
                  <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-(--color-cyan) to-transparent" />
                  <p className="font-display text-xl leading-snug text-white mb-5">“{t.quote}”</p>
                  <footer className="text-sm text-(--color-muted)">
                    <span className="text-white">{t.author}</span> · {t.company}
                  </footer>
                </blockquote>
              ))}
            </div>
          </Container>
        </section>

        <section className="py-20">
          <Container>
            <div className="glass p-10 md:p-14 relative overflow-hidden text-center">
              <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-(--color-cyan) to-transparent" />
              <div className="glow-blob" style={{ top: "-50%", left: "30%", width: 600, height: 600, background: "radial-gradient(circle, #5C00E5 0%, transparent 70%)", opacity: 0.35 }} />
              <div className="relative">
                <div className="kicker mb-4">[ WANT TO BE NEXT? ]</div>
                <h2 className="font-display text-[clamp(1.75rem,4vw,3rem)] font-extrabold leading-tight mb-4">
                  Ready to launch your own <span className="gradient-text">AI-LMS-TMS</span>?
                </h2>
                <p className="text-(--color-muted) text-lg max-w-2xl mx-auto mb-8 flex items-center justify-center gap-2 flex-wrap">
                  <HiCheckCircle className="text-(--color-cyan)" /> Singapore-based
                  <HiCheckCircle className="text-(--color-cyan)" /> WSQ + TPQA experts
                  <HiCheckCircle className="text-(--color-cyan)" /> Claude Code-powered
                </p>
                <Link href="/#contact" className="btn-primary">Request a demo →</Link>
              </div>
            </div>
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
}
