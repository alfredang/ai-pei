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
    stat: "[PLACEHOLDER: e.g. S$X,000]",
    label: "Average Starting Salary",
    description:
      "Future-tech roles are among the best-paid in Singapore. Insert your verified salary benchmark here to show real earning potential.",
    color: "var(--color-cyan)",
  },
  {
    icon: HiBuildingOffice2,
    stat: "[PLACEHOLDER: e.g. 50+]",
    label: "Hiring Partners",
    description:
      "From global banks and MNCs to high-growth startups and government tech agencies — list the employers who recruit your graduates.",
    color: "var(--color-purple-light)",
  },
  {
    icon: HiGlobeAlt,
    stat: "[PLACEHOLDER: e.g. 30+]",
    label: "Countries Represented",
    description:
      "Learners join from across the world and graduate with globally portable skills they can take to any market in Asia and beyond.",
    color: "var(--color-amber)",
  },
  {
    icon: HiArrowTrendingUp,
    stat: "[PLACEHOLDER: e.g. 90%]",
    label: "Career-Outcome Rate",
    description:
      "Show the share of graduates who advance into a new tech role, promotion or relocation within months of completing a programme.",
    color: "var(--color-green)",
  },
];

export function CareersOutcomes() {
  return (
    <section id="careers" className="relative py-20 overflow-hidden">
      <div className="grid-bg opacity-25" />

      <Container className="relative">
        <div className="text-center mb-14">
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
          [ Replace the placeholder figures above with your verified, audited outcome data ]
        </p>
      </Container>
    </section>
  );
}
