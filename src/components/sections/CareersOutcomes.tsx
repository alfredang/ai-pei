import { Container } from "@/components/layout/Container";
import {
  HiBanknotes,
  HiBuildingOffice2,
  HiGlobeAlt,
  HiArrowTrendingUp,
} from "react-icons/hi2";

const OUTCOMES = [
  {
    icon: HiBanknotes,
    stat: "S$6k–10k",
    label: "AI Engineer · Monthly Pay",
    description:
      "AI and machine-learning engineers in Singapore start around S$6,000 a month and quickly climb past S$10,000 — among the best-paid roles in Asia.",
    color: "var(--color-cyan)",
  },
  {
    icon: HiBuildingOffice2,
    stat: "S$6.2k",
    label: "Cyber Security · Median Pay",
    description:
      "Cyber security professionals in Singapore earn a median of about S$6,236 a month in 2026, with senior engineers reaching well over S$14,000.",
    color: "var(--color-purple-light)",
  },
  {
    icon: HiArrowTrendingUp,
    stat: "+25%",
    label: "AI-Skills Pay Premium",
    description:
      "Engineers with AI skills are earning up to 25% more than their peers in 2026 — the skills our Advanced Certificates are built around.",
    color: "var(--color-green)",
  },
  {
    icon: HiGlobeAlt,
    stat: "#1",
    label: "Asia's Leading Tech Hub",
    description:
      "Singapore is consistently ranked Asia's top destination for tech talent and investment — your gateway to MNCs, startups and government tech across the region.",
    color: "var(--color-amber)",
  },
];

export function CareersOutcomes() {
  return (
    <section id="careers" className="relative py-7 overflow-hidden">
      <div className="grid-bg opacity-25" />

      <Container className="relative">
        <div className="text-center mb-14">
          <h2 className="font-display text-[clamp(2rem,4.5vw,3.25rem)] font-extrabold leading-[1.05]">
            Skills That Travel. <span className="gradient-text">Careers That Scale.</span>
          </h2>
          <p className="mt-4 text-(--color-muted) text-lg max-w-2xl mx-auto">
            Singapore&apos;s tech economy is hungry for talent, and your qualification is built
            to be globally recognised. Train here, then build your career across the MNCs,
            startups and government employers driving Asia&apos;s digital growth.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {OUTCOMES.map((o) => {
            const Icon = o.icon;
            return (
              <div
                key={o.label}
                className="glass p-7 hover:border-white/15 transition-all duration-300 group"
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-transform group-hover:scale-110"
                  style={{ background: `color-mix(in srgb, ${o.color} 12%, transparent)` }}
                >
                  <Icon className="w-6 h-6" style={{ color: o.color }} />
                </div>
                <div
                  className="font-display font-extrabold text-2xl leading-tight mb-1"
                  style={{ color: o.color }}
                >
                  {o.stat}
                </div>
                <div className="font-display font-bold text-sm text-white mb-2">{o.label}</div>
                <p className="text-xs text-(--color-muted) leading-relaxed">{o.description}</p>
              </div>
            );
          })}
        </div>

        <p className="mt-8 text-center text-xs text-(--color-muted) font-mono">
          Salary data: NodeFlair, Morgan McKinley &amp; Vulcan Post — Singapore Tech Salary Reports 2026
        </p>
      </Container>
    </section>
  );
}
