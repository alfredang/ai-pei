"use client";

import { useEffect, useRef, useState } from "react";
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
  { id: "ai", label: "Artificial Intelligence", icon: HiCpuChip, color: "var(--color-purple-light)" },
  { id: "cybersecurity", label: "Cyber Security", icon: HiShieldCheck, color: "var(--color-cyan)" },
  { id: "blockchain", label: "Blockchain", icon: HiCubeTransparent, color: "var(--color-amber)" },
  { id: "quantum", label: "Quantum Computing", icon: HiSparkles, color: "var(--color-cyan)" },
];

/** Matrix-style digital rain of falling characters (top → bottom). Hero only. */
function MatrixRain() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const parent = canvas?.parentElement;
    if (!canvas || !parent) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#*+=/&%<>$".split("");
    const pick = () => CHARS[Math.floor(Math.random() * CHARS.length)];
    const cell = 22;
    const fontSize = 16;
    const trailLen = 16;

    let w = 0, h = 0;
    let heads: number[] = [];
    let speeds: number[] = [];
    let rows: number[] = [];
    let trails: string[][] = [];

    function setup() {
      const rect = parent!.getBoundingClientRect();
      w = Math.max(1, rect.width);
      h = Math.max(1, rect.height);
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas!.width = Math.floor(w * dpr);
      canvas!.height = Math.floor(h * dpr);
      canvas!.style.width = `${w}px`;
      canvas!.style.height = `${h}px`;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx!.font = `${fontSize}px "JetBrains Mono", ui-monospace, monospace`;
      ctx!.textBaseline = "top";
      const cols = Math.ceil(w / cell);
      heads = Array.from({ length: cols }, () => -Math.random() * h);
      speeds = Array.from({ length: cols }, () => 1.5 + Math.random() * 3.5);
      rows = heads.map(() => -999);
      trails = heads.map(() => []);
    }

    let raf = 0;
    function frame() {
      raf = requestAnimationFrame(frame);
      ctx!.clearRect(0, 0, w, h); // transparent — lets the blue backdrop show through
      for (let i = 0; i < heads.length; i++) {
        heads[i] += speeds[i];
        const headRow = Math.floor(heads[i] / cell);
        if (headRow !== rows[i]) {
          rows[i] = headRow;
          trails[i].unshift(pick());
          if (trails[i].length > trailLen) trails[i].pop();
        }
        const x = i * cell;
        for (let k = 0; k < trails[i].length; k++) {
          const yy = (headRow - k) * cell;
          if (yy < -cell || yy > h) continue;
          if (k === 0) {
            ctx!.fillStyle = "rgba(205,255,215,0.95)"; // bright leading char
          } else {
            const op = (1 - k / trailLen) * 0.85;
            ctx!.fillStyle = `rgba(60,224,124,${op.toFixed(3)})`; // green tail
          }
          ctx!.fillText(trails[i][k], x, yy);
        }
        if (heads[i] > h + trailLen * cell) {
          heads[i] = -Math.random() * h * 0.5 - cell;
          speeds[i] = 1.5 + Math.random() * 3.5;
          rows[i] = -999;
          trails[i] = [];
        }
      }
    }

    setup();
    raf = requestAnimationFrame(frame);

    let rt = 0;
    const onResize = () => {
      window.clearTimeout(rt);
      rt = window.setTimeout(setup, 150);
    };
    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(rt);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return <canvas ref={ref} className="absolute inset-0 h-full w-full" aria-hidden />;
}

export function HomeHero() {
  const [selected, setSelected] = useState(DISCIPLINES[0].id);

  return (
    <section
      id="hero"
      data-theme="dark"
      className="relative isolate overflow-hidden text-white"
    >
      {/* Matrix character-rain over a blue backdrop — applies only to this hero */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        {/* blue gradient base (matches the reference image) */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 95% 85% at 50% 22%, #19386f 0%, #0d2150 45%, #060a16 100%)",
          }}
        />
        <MatrixRain />
        {/* readability scrim — keeps the left-side headline legible */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/30 to-transparent" />
      </div>

      <Container className="relative z-10">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-center min-h-[70vh] py-16">
          {/* LEFT — copy + discipline dropdown */}
          <div className="max-w-xl">
            <div className="kicker mb-5 reveal">
              [ STUDY TECH IN SINGAPORE · ASIA&apos;S LEADING TECH HUB ]
            </div>

            <h1 className="font-display font-medium tracking-tight leading-[1.06] text-[clamp(2.3rem,5.2vw,4.25rem)] reveal">
              Build a Future-Tech Career in Singapore
            </h1>

            <p className="mt-6 text-lg md:text-xl text-white/80 leading-relaxed reveal reveal-d1">
              Advanced Certificate programmes for international learners across four fields shaping
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
              English-taught · Globally recognised · Visa &amp; relocation guidance
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
                Future-tech disciplines · one launchpad
              </span>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
