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
    label: "Competitive Salaries",
    description:
      "Future-tech roles are among the best-paid careers in Singapore, and your skills are built to command strong earning power across the region.",
    color: "var(--color-cyan)",
  },
  {
    icon: HiBuildingOffice2,
    label: "Hiring Across Asia",
    description:
      "Global banks, MNCs, high-growth startups and government tech agencies all recruit future-tech talent — and they are concentrated right here in Singapore.",
    color: "var(--color-purple-light)",
  },
  {
    icon: HiGlobeAlt,
    label: "A Global Cohort",
    description:
      "Learn alongside ambitious peers from around the world and graduate with qualifications that travel with you to any market in Asia and beyond.",
    color: "var(--color-amber)",
  },
  {
    icon: HiArrowTrendingUp,
    label: "Career Mobility",
    description:
      "Globally portable, in-demand skills open doors to new roles, promotions and relocation opportunities as your career grows.",
    color: "var(--color-green)",
  },
];

export function CareersOutcomes() {
  return (
    <section id="careers" className="relative py-4 overflow-hidden">
      <div className="grid-bg opacity-25" />

      <Container className="relative">
        <div className="text-center mb-8">
          <div className="kicker mb-4">[ CAREER OUTCOMES ]</div>
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
                className="glass p-6 hover:border-white/15 transition-all duration-300 group"
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-transform group-hover:scale-110"
                  style={{ background: `color-mix(in srgb, ${o.color} 12%, transparent)` }}
                >
                  <Icon className="w-6 h-6" style={{ color: o.color }} />
                </div>
                <div className="font-display font-bold text-base text-white mb-2">{o.label}</div>
                <p className="text-sm text-(--color-muted) leading-relaxed">{o.description}</p>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
