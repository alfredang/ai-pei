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
      "Every programme is taught in English by Singapore-based trainers in live online classes — so you can focus on learning from wherever you are.",
    color: "var(--color-purple-light)",
  },
  {
    icon: HiBriefcase,
    title: "Career Pathways",
    description:
      "Learn live online from anywhere and build skills for MNCs, startups and government tech employers across Asia — with career guidance from our team.",
    color: "var(--color-amber)",
  },
];

export function ValueProps() {
  return (
    <section className="home-benefits relative overflow-hidden">
      <Container>
        <div className="grid md:grid-cols-3 gap-6">
          {PROPS.map((prop) => {
            const Icon = prop.icon;
            return (
              <div
                key={prop.title}
                className="flex items-start gap-4 py-4 group"
              >
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 transition-transform group-hover:scale-110"
                  style={{ background: `color-mix(in srgb, ${prop.color} 12%, transparent)` }}
                >
                  <Icon className="w-6 h-6" style={{ color: prop.color }} />
                </div>
                <div>
                  <h3 className="font-display font-bold text-lg text-white mb-2">{prop.title}</h3>
                  <p className="text-sm text-(--color-muted) leading-relaxed">{prop.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
