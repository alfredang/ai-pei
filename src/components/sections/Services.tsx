import { Container } from "@/components/layout/Container";
import { SERVICES } from "@/lib/site-content";
import { HiArrowRight } from "react-icons/hi2";

const accentMap: Record<string, { glow: string; text: string; line: string }> = {
  blue: { glow: "rgba(89,235,253,0.35)", text: "text-(--color-cyan)", line: "from-(--color-cyan) to-transparent" },
  cyan: { glow: "rgba(1,201,130,0.35)", text: "text-(--color-green)", line: "from-(--color-green) to-transparent" },
  purple: { glow: "rgba(92,0,229,0.45)", text: "text-(--color-purple-light)", line: "from-(--color-purple) to-transparent" },
};

export function Services() {
  return (
    <section id="services" className="relative py-28">
      <Container>
        <div className="max-w-2xl mb-14">
          <div className="kicker mb-4">[ WHAT WE BUILD ]</div>
          <h2 className="font-display text-[clamp(2rem,4.5vw,3.25rem)] font-extrabold leading-[1.05]">
            Beyond AI-LMS-TMS — we ship <span className="gradient-text-warm">production AI</span> systems.
          </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-5">
          {SERVICES.map((s) => {
            const Icon = s.icon;
            const a = accentMap[s.accent];
            return (
              <article key={s.id} className="card-hover glass p-7 relative overflow-hidden group">
                <div className={`absolute top-0 inset-x-0 h-px bg-gradient-to-r ${a.line}`} />
                <div className="absolute -top-12 -right-12 w-40 h-40 rounded-full opacity-0 group-hover:opacity-60 transition duration-500" style={{ background: `radial-gradient(circle, ${a.glow} 0%, transparent 70%)` }} />
                <Icon className={`w-9 h-9 ${a.text} mb-5`} />
                <h3 className="font-display font-bold text-xl text-white mb-3">{s.title}</h3>
                <p className="text-sm text-(--color-muted) mb-5 leading-relaxed">{s.description}</p>
                <ul className="space-y-2 mb-6">
                  {s.features.map((f) => (
                    <li key={f} className="text-sm text-white/80 flex gap-2.5">
                      <span className={`${a.text} font-mono mt-0.5`}>▸</span>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <div className={`inline-flex items-center gap-2 text-sm font-mono ${a.text}`}>
                  Learn more <HiArrowRight className="w-3.5 h-3.5" />
                </div>
              </article>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
