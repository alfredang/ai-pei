import { Container } from "@/components/layout/Container";
import { HiStar } from "react-icons/hi2";

const TESTIMONIALS = [
  {
    quote:
      "[PLACEHOLDER: Authentic learner testimonial. Quote a foreign graduate on how studying in Singapore advanced their cybersecurity / AI career and made relocation easy.]",
    name: "[PLACEHOLDER: Learner name]",
    detail: "[PLACEHOLDER: Programme · Home country]",
  },
  {
    quote:
      "[PLACEHOLDER: Authentic learner testimonial. Highlight English-taught delivery, global recognition of the certificate, and the support received as an international student.]",
    name: "[PLACEHOLDER: Learner name]",
    detail: "[PLACEHOLDER: Programme · Home country]",
  },
  {
    quote:
      "[PLACEHOLDER: Authentic learner testimonial. Focus on the career outcome — new role, salary uplift, or move to a Singapore / ASEAN tech employer.]",
    name: "[PLACEHOLDER: Learner name]",
    detail: "[PLACEHOLDER: Programme · Home country]",
  },
];

export function SocialProof() {
  return (
    <section id="testimonials" className="relative py-20 overflow-hidden">
      <div
        className="glow-blob"
        style={{
          top: "20%",
          left: "-5%",
          width: 480,
          height: 480,
          background: "radial-gradient(circle, #59EBFD 0%, transparent 60%)",
          opacity: 0.08,
        }}
      />

      <Container className="relative">
        <div className="text-center mb-14">
          <div className="kicker mb-4">[ LEARNER STORIES ]</div>
          <h2 className="font-display text-[clamp(2rem,4.5vw,3.25rem)] font-extrabold leading-[1.05]">
            Trusted by Learners from{" "}
            <span className="gradient-text">Around the World</span>
          </h2>
          <p className="mt-4 text-(--color-muted) text-lg max-w-2xl mx-auto">
            Real stories from international graduates who chose to study tech in Singapore.
            <span className="block text-sm text-(--color-muted)/70 mt-2 font-mono">
              [ Replace with verified testimonials, photos and ratings ]
            </span>
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t, i) => (
            <figure key={i} className="glass p-8 flex flex-col">
              <div className="flex gap-1 mb-5" aria-hidden>
                {Array.from({ length: 5 }).map((_, s) => (
                  <HiStar key={s} className="w-4 h-4 text-(--color-amber)" />
                ))}
              </div>
              <blockquote className="text-sm text-white/80 leading-relaxed flex-1">
                {t.quote}
              </blockquote>
              <figcaption className="mt-6 pt-5 border-t border-white/8">
                <div className="font-display font-bold text-sm text-white">{t.name}</div>
                <div className="text-xs text-(--color-muted) mt-0.5">{t.detail}</div>
              </figcaption>
            </figure>
          ))}
        </div>
      </Container>
    </section>
  );
}
