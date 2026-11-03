"use client";

import { useEffect, useRef, useState } from "react";
import { Container } from "@/components/layout/Container";
import { FiberGlobe } from "@/components/sections/FiberGlobe";
import {
  HiShieldCheck,
  HiCpuChip,
  HiCubeTransparent,
  HiSparkles,
  HiChevronDown,
  HiArrowRight,
} from "react-icons/hi2";

// `color` is a hex (not a CSS var) because the globe paints these on a canvas.
// Values come from the dark-scope palette in globals.css; quantum uses the
// matrix-rain highlight so all four fibre colours stay distinct.
const DISCIPLINES = [
  { id: "ai", label: "Artificial Intelligence", icon: HiCpuChip, color: "#2DD4BF", href: "/advanced-certificate-in-artificial-intelligence.html" },
  { id: "cybersecurity", label: "Cyber Security", icon: HiShieldCheck, color: "#3CE07C", href: "/courses/advanced-certificate-in-cyber-security.html" },
  { id: "blockchain", label: "Blockchain", icon: HiCubeTransparent, color: "#F6AE64", href: "/advanced-certificate-in-blockchain.html" },
  { id: "quantum", label: "Quantum Computing", icon: HiSparkles, color: "#CDFFD7", href: "/courses/advanced-certificate-in-applied-quantum-computing-and-qiskit-programming.html" },
];
const FIBER_COLORS = DISCIPLINES.map((d) => d.color);

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
      ctx!.clearRect(0, 0, w, h); // transparent — lets the green backdrop show through
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
  const selectedHref =
    DISCIPLINES.find((d) => d.id === selected)?.href ?? "/courses.html";

  return (
    <section
      id="hero"
      data-theme="dark"
      className="relative isolate overflow-hidden text-white"
    >
      {/* Matrix character-rain over a green backdrop — applies only to this hero */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        {/* green gradient base — fades into the site's --color-bg */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 95% 85% at 50% 22%, #0f4a2b 0%, #082a19 45%, #04120B 100%)",
          }}
        />
        <MatrixRain />
        {/* readability scrim — keeps the left-side headline legible */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#020B06]/80 via-[#020B06]/30 to-transparent" />
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
                  href={selectedHref}
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
              Live online classes · Study from anywhere · English-taught
            </p>
          </div>

          {/* RIGHT — rotating Earth with discipline-coloured light racing along fibre routes */}
          <div className="relative reveal reveal-d1">
            <div
              role="img"
              aria-label="Rotating globe with light pulses travelling between cities worldwide and Singapore, representing AI, Cyber Security, Blockchain and Quantum Computing"
              className="relative mx-auto aspect-square w-full max-w-[560px] flex items-center justify-center"
            >
              <FiberGlobe colors={FIBER_COLORS} />
            </div>

            <ul className="mt-2 flex flex-wrap justify-center gap-2.5">
              {DISCIPLINES.map((d) => {
                const Icon = d.icon;
                return (
                  <li key={d.id}>
                    <a
                      href={d.href}
                      className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-[#04120B]/75 backdrop-blur-sm px-3.5 py-2 text-xs font-mono uppercase tracking-wider text-white/80 transition-colors duration-200 hover:border-white/30 hover:bg-white/10 hover:text-white"
                    >
                      <span
                        className="h-2 w-2 rounded-full"
                        style={{ background: d.color, boxShadow: `0 0 8px ${d.color}` }}
                        aria-hidden
                      />
                      <Icon className="h-4 w-4" style={{ color: d.color }} aria-hidden />
                      {d.label}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
}
