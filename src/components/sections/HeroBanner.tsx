"use client";

import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { HiShieldCheck, HiLockClosed, HiCommandLine, HiAcademicCap } from "react-icons/hi2";

export function HeroBanner() {
  return (
    <section id="hero" className="relative min-h-[85vh] flex items-center overflow-hidden">
      {/* Background grid */}
      <div className="grid-bg opacity-40" />

      {/* Glow blobs */}
      <div
        className="glow-blob"
        style={{
          top: "-20%",
          left: "5%",
          width: 600,
          height: 600,
          background: "radial-gradient(circle, #5C00E5 0%, transparent 60%)",
          opacity: 0.2,
        }}
      />
      <div
        className="glow-blob"
        style={{
          bottom: "-10%",
          right: "0%",
          width: 500,
          height: 500,
          background: "radial-gradient(circle, #59EBFD 0%, transparent 60%)",
          opacity: 0.12,
        }}
      />

      {/* Floating security icons */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden>
        <div className="hero-float-1 absolute top-[15%] right-[12%] opacity-[0.12]">
          <HiShieldCheck className="w-24 h-24 text-(--color-cyan)" />
        </div>
        <div className="hero-float-2 absolute bottom-[20%] left-[8%] opacity-[0.10]">
          <HiLockClosed className="w-20 h-20 text-(--color-purple-light)" />
        </div>
        <div className="hero-float-3 absolute top-[40%] right-[30%] opacity-[0.08]">
          <HiCommandLine className="w-16 h-16 text-(--color-amber)" />
        </div>
      </div>

      <Container className="relative z-10 py-20">
        <div className="max-w-4xl">
          {/* WSQ Badge */}
          <div className="inline-flex items-center gap-2 mb-8">
            <span className="badge-shimmer inline-flex items-center gap-2 px-4 py-2 rounded-full border border-(--color-cyan)/30">
              <HiAcademicCap className="w-4 h-4 text-(--color-cyan)" />
              <span className="font-mono text-xs font-semibold tracking-wider uppercase text-(--color-cyan)">
                WSQ Funded · Up to 70% Subsidy
              </span>
            </span>
          </div>

          {/* Kicker */}
          <div className="kicker mb-4">[ PEI ADVANCED CERTIFICATE ]</div>

          {/* Main headline */}
          <h1 className="font-display text-[clamp(2.5rem,6vw,4.5rem)] font-extrabold leading-[1.05] mb-6">
            Advanced Certificate in{" "}
            <span className="gradient-text">Cyber Security</span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-(--color-muted) max-w-2xl mb-4 leading-relaxed">
            A comprehensive WSQ training pathway with{" "}
            <span className="text-white font-semibold">4 stackable modules</span> —
            CompTIA A+, Security+, Linux+, and your choice of CySA+ or PenTest+.
          </p>

          {/* Certification logos strip */}
          <div className="flex flex-wrap items-center gap-3 mb-10">
            {["CompTIA A+", "Security+", "Linux+", "CySA+ / PenTest+"].map((cert) => (
              <span
                key={cert}
                className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs font-mono font-medium text-white/70"
              >
                {cert}
              </span>
            ))}
          </div>

          {/* CTAs */}
          <div className="flex flex-wrap gap-4">
            <Link href="#contact" className="btn-primary text-base">
              Enquire Now
              <span aria-hidden>→</span>
            </Link>
            <Link href="#course-details" className="btn-secondary text-base">
              View Course Details
            </Link>
          </div>

          {/* Quick info cards */}
          <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { label: "Duration", value: "2 Months", sub: "Full-Time" },
              { label: "Mode", value: "E-Learning", sub: "Online Classes" },
              { label: "Assessment", value: "3 Hours", sub: "Per Module" },
              { label: "Class Ratio", value: "1:20", sub: "Teacher : Student" },
            ].map((item) => (
              <div
                key={item.label}
                className="glass-soft p-4 text-center group hover:border-(--color-cyan)/30 transition-colors"
              >
                <div className="font-display font-bold text-lg text-white">{item.value}</div>
                <div className="text-xs text-(--color-muted) mt-1">{item.sub}</div>
                <div className="text-[0.65rem] font-mono uppercase tracking-wider text-(--color-cyan)/60 mt-1.5">
                  {item.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>

      {/* Scanline effect */}
      <div className="scanline" />
    </section>
  );
}
