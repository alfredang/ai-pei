import { Container } from "@/components/layout/Container";
import Image from "next/image";

const PROPS = [
  {
    image: "global",
    title: "Globally Recognised",
    description:
      "Earn portable, industry-aligned certifications that employers trust worldwide. Study in Singapore and carry your qualification anywhere your career takes you.",
    color: "var(--color-cyan)",
  },
  {
    image: "english",
    title: "English-Taught, Foreigner-Ready",
    description:
      "Every programme is taught in English by Singapore-based trainers in live online classes — so you can focus on learning from wherever you are.",
    color: "var(--color-purple-light)",
  },
  {
    image: "career",
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
        <div className="grid lg:grid-cols-3 gap-4">
          {PROPS.map((prop) => {
            return (
              <div
                key={prop.title}
                className="flex items-center gap-4 py-1 group"
              >
                <Image src={`/images/features/icon-${prop.image}.webp`} alt="" width={184} height={184} className="feature-illustration" />
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
