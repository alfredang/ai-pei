import { Container } from "@/components/layout/Container";
import { WHY_CHOOSE_US } from "@/lib/site-content";

const accentMap: Record<string, string> = {
  blue: "text-(--color-cyan)",
  cyan: "text-(--color-green)",
  purple: "text-(--color-purple-light)",
};

export function WhyChooseUs() {
  return (
    <section id="why-us" className="relative py-28 overflow-hidden">
      <div className="grid-bg opacity-50" />
      <Container className="relative">
        <div className="max-w-2xl mb-14">
          <div className="kicker mb-4">[ WHY TERTIARY ]</div>
          <h2 className="font-display text-[clamp(2rem,4.5vw,3.25rem)] font-extrabold leading-[1.05]">
            Built for builders. Trusted by <span className="gradient-text">training providers</span>.
          </h2>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/5 rounded-2xl overflow-hidden border border-white/8">
          {WHY_CHOOSE_US.map((w) => {
            const Icon = w.icon;
            return (
              <div key={w.title} className="bg-(--color-bg-elevated) p-7 hover:bg-(--color-bg-elevated)/80 transition group">
                <Icon className={`w-8 h-8 mb-4 ${accentMap[w.accent]}`} />
                <h3 className="font-display font-bold text-lg text-white mb-2">{w.title}</h3>
                <p className="text-sm text-(--color-muted) leading-relaxed">{w.description}</p>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
