import { Container } from "@/components/layout/Container";
import { SERVICES } from "@/lib/site-content";
import { HiCheckCircle } from "react-icons/hi2";

const accentMap: Record<string, string> = {
  blue: "from-neon-blue to-neon-cyan",
  cyan: "from-neon-cyan to-neon-blue",
  purple: "from-neon-purple to-neon-pink",
};

export function Services() {
  return (
    <section id="services" className="py-24">
      <Container>
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Our Services</h2>
          <p className="text-white/70 max-w-2xl mx-auto">
            Beyond AI-LMS-TMS, we build training platforms, custom AI workflows, and enterprise software.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {SERVICES.map((s) => {
            const Icon = s.icon;
            return (
              <div key={s.id} className="glass rounded-2xl p-6 hover:translate-y-[-4px] transition">
                <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${accentMap[s.accent]} mb-4`}>
                  <Icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2">{s.title}</h3>
                <p className="text-white/70 text-sm mb-4">{s.description}</p>
                <ul className="space-y-2 text-sm">
                  {s.features.map((f) => (
                    <li key={f} className="flex gap-2">
                      <HiCheckCircle className="text-neon-cyan shrink-0 mt-0.5" />
                      <span className="text-white/80">{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
