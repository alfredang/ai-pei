import { Container } from "@/components/layout/Container";
import { WHY_CHOOSE_US } from "@/lib/site-content";

const accentMap: Record<string, string> = {
  blue: "text-neon-blue",
  cyan: "text-neon-cyan",
  purple: "text-neon-purple",
};

export function WhyChooseUs() {
  return (
    <section id="why-us" className="py-24">
      <Container>
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Why Tertiary Infotech</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {WHY_CHOOSE_US.map((w) => {
            const Icon = w.icon;
            return (
              <div key={w.title} className="glass rounded-2xl p-6">
                <Icon className={`w-10 h-10 mb-3 ${accentMap[w.accent]}`} />
                <h3 className="text-lg font-bold mb-1">{w.title}</h3>
                <p className="text-white/70 text-sm">{w.description}</p>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
