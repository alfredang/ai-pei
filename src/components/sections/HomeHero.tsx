"use client";

import { useState } from "react";
import { Container } from "@/components/layout/Container";
import {
  HiShieldCheck,
  HiCpuChip,
  HiCubeTransparent,
  HiSparkles,
  HiChevronDown,
  HiArrowRight,
} from "react-icons/hi2";

const DISCIPLINES = [
  { id: "cybersecurity", label: "Cybersecurity", icon: HiShieldCheck, color: "var(--color-cyan)" },
  { id: "ai", label: "Artificial Intelligence", icon: HiCpuChip, color: "var(--color-purple-light)" },
  { id: "blockchain", label: "Blockchain", icon: HiCubeTransparent, color: "var(--color-amber)" },
  { id: "quantum", label: "Quantum Computing", icon: HiSparkles, color: "var(--color-cyan)" },
];

export function HomeHero() {
  const [selected, setSelected] = useState(DISCIPLINES[0].id);

  return (
    <section
      id="hero"
      data-theme="dark"
      className="relative isolate overflow-hidden text-white"
    >
      {/* Designed background — replaces the full-bleed photograph */}
      <div className="absolute inset-0 -z-10 bg-(--color-bg)">
        <div className="grid-bg opacity-40" />
        <div
          className="glow-blob"
          style={{
            top: "-10%",
            left: "-5%",
            width: 560,
            height: 560,
            background: "radial-gradient(circle, #5C00E5 0%, transparent 60%)",
            opacity: 0.22,
          }}
        />
        <div
          className="glow-blob"
          style={{
            bottom: "-15%",
            right: "0%",
            width: 620,
            height: 620,
            background: "radial-gradient(circle, #59EBFD 0%, transparent 60%)",
            opacity: 0.16,
          }}
        />
      </div>

      <Container className="relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center min-h-[82vh] py-24">
          {/* LEFT — copy + discipline dropdown */}
          <div className="max-w-xl">
            <div className="kicker mb-5 reveal">
              [ STUDY TECH IN SINGAPORE · ASIA&apos;S #1 TECH HUB ]
            </div>

            <h1 className="font-display font-medium tracking-tight leading-[1.06] text-[clamp(2.3rem,5.2vw,4.25rem)] reveal">
              Build a Future-Tech Career in Singapore
            </h1>

            <p className="mt-6 text-lg md:text-xl text-white/80 leading-relaxed reveal reveal-d1">
              English-taught programmes for international learners across four fields shaping
              the next decade — your gateway to Asia&apos;s fastest-growing tech market.
            </p>

            {/* Discipline dropdown + CTA */}
            <div className="mt-9 reveal reveal-d2">
              <label htmlFor="discipline-select" className="kicker block mb-2">
                I want to study
              </label>
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <select
                    id="discipline-select"
                    value={selected}
                    onChange={(e) => setSelected(e.target.value)}
                    className="w-full appearance-none rounded-full bg-white/8 border border-white/25 px-5 py-3.5 pr-11 text-base font-medium text-white focus:outline-none focus:border-(--color-cyan) focus:ring-2 focus:ring-(--color-cyan)/30 transition cursor-pointer"
                  >
                    {DISCIPLINES.map((d) => (
                      <option key={d.id} value={d.id} className="bg-(--color-bg-elevated) text-white">
                        {d.label}
                      </option>
                    ))}
                  </select>
                  <HiChevronDown className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/60" />
                </div>
                <a
                  href={`#${selected}`}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-7 py-3.5 text-base font-semibold text-black transition-colors duration-200 hover:bg-white/90 whitespace-nowrap"
                >
                  Explore Programme
                  <HiArrowRight className="w-4 h-4" />
                </a>
              </div>

              <a
                href="#contact"
                className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-white/70 hover:text-white transition-colors"
              >
                or apply now
                <span aria-hidden>→</span>
              </a>
            </div>

            {/* Trust line */}
            <p className="mt-8 text-sm text-white/55 reveal reveal-d2">
              English-taught · Globally recognised · Visa &amp; relocation guidance ·
              [PLACEHOLDER: 1,000+ learners trained]
            </p>
          </div>

          {/* RIGHT — designed visual: the four disciplines (swap for a photo anytime) */}
          <div className="relative reveal reveal-d1">
            <div className="glass p-6 md:p-8">
              <div className="text-xs font-mono uppercase tracking-wider text-(--color-muted) mb-5">
                Choose your future-tech path
              </div>
              <div className="grid grid-cols-2 gap-4">
                {DISCIPLINES.map((d) => {
                  const Icon = d.icon;
                  const active = d.id === selected;
                  return (
                    <button
                      key={d.id}
                      type="button"
                      onClick={() => setSelected(d.id)}
                      aria-pressed={active}
                      className={`text-left rounded-2xl p-5 border transition-all duration-300 ${
                        active
                          ? "bg-white/10 border-white/30 scale-[1.02]"
                          : "bg-white/3 border-white/10 hover:border-white/20"
                      }`}
                    >
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-transform"
                        style={{ background: `color-mix(in srgb, ${d.color} 16%, transparent)` }}
                      >
                        <Icon className="w-6 h-6" style={{ color: d.color }} />
                      </div>
                      <div className="font-display font-bold text-sm text-white leading-snug">
                        {d.label}
                      </div>
                      <div
                        className="mt-2 text-[0.7rem] font-mono uppercase tracking-wider transition-opacity"
                        style={{ color: d.color, opacity: active ? 1 : 0.5 }}
                      >
                        {active ? "Selected →" : "Select"}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Subtle floating accent */}
            <div
              className="hidden lg:block absolute -bottom-5 -right-5 glass px-5 py-3"
              aria-hidden
            >
              <span className="text-xs font-mono text-(--color-muted)">
                4 disciplines · 1 launchpad
              </span>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
