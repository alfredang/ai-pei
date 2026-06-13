import { Container } from "@/components/layout/Container";
import { HiGlobeAlt, HiLanguage, HiBriefcase } from "react-icons/hi2";

const PROPS = [
  {
    icon: HiGlobeAlt,
    title: "Globally Recognised",
    description:
      "Earn portable, industry-aligned certifications that employers trust worldwide. Study in Singapore and carry your qualification anywhere your career takes you.",
    color: "var(--color-cyan)",
  },
  {
    icon: HiLanguage,
    title: "English-Taught, Foreigner-Ready",
    description:
      "Every programme is delivered in English in one of the world's safest, most English-fluent cities — so you can settle in fast and focus on learning, not logistics.",
    color: "var(--color-purple-light)",
  },
  {
    icon: HiBriefcase,
    title: "Career & Relocation Pathways",
    description:
      "Train where the jobs are. We guide you on visa and relocation options and connect your new skills to MNCs, startups and government tech employers across Asia.",
    color: "var(--color-amber)",
  },
];

export function ValueProps() {
  return (
    <section className="relative py-7 overflow-hidden">
      <Container>
        <div className="grid md:grid-cols-3 gap-6">
          {PROPS.map((prop) => {
            const Icon = prop.icon;
            return (
              <div
                key={prop.title}
                className="glass p-8 group hover:border-white/15 transition-all duration-300"
              >
                <div
                  className="w-14 h-14 rounded-xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110"
                  style={{ background: `color-mix(in srgb, ${prop.color} 12%, transparent)` }}
                >
                  <Icon className="w-7 h-7" style={{ color: prop.color }} />
                </div>
                <h3 className="font-display font-bold text-xl text-white mb-3">{prop.title}</h3>
                <p className="text-sm text-(--color-muted) leading-relaxed">{prop.description}</p>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
