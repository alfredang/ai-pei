import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { HiArrowUpRight } from "react-icons/hi2";

export function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-[calc(100vh-4rem)] flex flex-col pt-6 md:pt-8 pb-4 overflow-hidden"
    >
      {/* layered background effects */}
      <div className="grid-bg" />
      <div className="scanline" />

      {/* glow blobs */}
      <div
        className="glow-blob animate-[float-drift_18s_ease-in-out_infinite]"
        style={{
          top: "-15%",
          left: "-8%",
          width: 640,
          height: 640,
          background: "radial-gradient(circle, #5C00E5 0%, transparent 70%)",
        }}
      />
      <div
        className="glow-blob animate-[float-drift_22s_ease-in-out_infinite_reverse]"
        style={{
          top: "20%",
          right: "-12%",
          width: 600,
          height: 600,
          background: "radial-gradient(circle, #59EBFD 0%, transparent 70%)",
        }}
      />
      <div
        className="glow-blob"
        style={{
          bottom: "-25%",
          left: "30%",
          width: 500,
          height: 500,
          background: "radial-gradient(circle, #F6AE64 0%, transparent 70%)",
          opacity: 0.18,
        }}
      />

      {/* orbiting particles around the right edge */}
      <div className="absolute top-1/2 right-[12%] hidden lg:block pointer-events-none">
        <div
          className="orbit-dot bg-(--color-cyan) shadow-[0_0_12px_4px_rgba(89,235,253,0.7)]"
          style={{ ["--orbit-r" as string]: "220px" }}
        />
        <div
          className="orbit-dot bg-(--color-purple-light) shadow-[0_0_10px_3px_rgba(135,87,242,0.7)]"
          style={{ ["--orbit-r" as string]: "300px", animationDuration: "20s", animationDirection: "reverse" }}
        />
        <div
          className="orbit-dot bg-(--color-amber) shadow-[0_0_10px_3px_rgba(246,174,100,0.7)]"
          style={{ ["--orbit-r" as string]: "380px", animationDuration: "26s" }}
        />
      </div>

      {/* film-grain overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.05]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          mixBlendMode: "overlay",
        }}
      />

      <Container width="full" className="relative z-10 flex-1 flex flex-col">
        <div className="reveal kicker mb-5 inline-flex items-center gap-2 px-3.5 py-1.5 border border-white/15 rounded-full bg-white/3 backdrop-blur">
          <span className="w-1.5 h-1.5 rounded-full bg-(--color-cyan) animate-pulse" />
          EDTECH · AGENTIC AI · VIBE CODING
        </div>

        <h1
          className="reveal reveal-d1 halo font-display font-extrabold leading-[1.02] [text-wrap:balance]"
          style={{
            fontSize: "clamp(2.25rem, 4.5vw, 4.5rem)",
            letterSpacing: "-0.025em",
          }}
        >
          AI-powered <span className="gradient-text">LMS &amp; TMS</span>{" "}
          for WSQ &amp; TPQA{" "}
          <span className="text-white/85">compliant training providers</span>
          <span className="cursor-blink" aria-hidden />
        </h1>

        <p
          className="reveal reveal-d2 mt-8 text-(--color-muted) max-w-3xl leading-relaxed"
          style={{ fontSize: "clamp(1.125rem, 1.35vw, 1.5rem)" }}
        >
          End-to-end open-source Learning &amp; Training Management Systems — augmented with
          Agentic AI, Claude Code, and AI Harness Systems — for Singapore training providers. SSG API
          integration works out of the box.
          <span className="block mt-3 font-display font-bold gradient-text-warm">
            No per-user, per-transaction, or recurring cost.
          </span>
        </p>

        <div className="reveal reveal-d3 mt-10 flex flex-wrap gap-3">
          <Link href="#ai-lms-tms" className="btn-primary">
            Explore AI-LMS-TMS
            <span aria-hidden>→</span>
          </Link>
          <Link href="#contact" className="btn-secondary">
            Book a demo
          </Link>
        </div>

        <div className="flex-1" />

        <div className="reveal reveal-d4 grid grid-cols-2 md:grid-cols-4 gap-px bg-white/5 border border-white/10 rounded-xl overflow-hidden max-w-[1400px]">
          <Stat
            label="Open-source EdTools"
            value="50+"
            href="https://github.com/alfredang?tab=repositories"
          />
          <Stat label="Courses delivered" value="1,200+" />
          <Stat label="Years building TMS" value="12" />
          <Stat label="AI agents deployed" value="60+" />
        </div>
      </Container>
    </section>
  );
}

function Stat({
  label,
  value,
  href,
}: {
  label: string;
  value: string;
  href?: string;
}) {
  const body = (
    <>
      <div className="flex items-start justify-between gap-2">
        <div className="font-display text-3xl md:text-4xl font-extrabold text-white">{value}</div>
        {href && (
          <HiArrowUpRight className="w-4 h-4 text-(--color-cyan) opacity-70 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition" />
        )}
      </div>
      <div className="kicker mt-1 text-white/60 group-hover:text-(--color-cyan) transition">{label}</div>
    </>
  );

  const cls =
    "group block bg-(--color-bg-elevated) px-5 py-6 hover:bg-(--color-bg-elevated)/70 transition";

  return href ? (
    <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
      {body}
    </a>
  ) : (
    <div className={cls}>{body}</div>
  );
}
