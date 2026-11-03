import { Container } from "@/components/layout/Container";
import { HiBuildingOffice2, HiShieldCheck, HiGlobeAlt } from "react-icons/hi2";

const REASONS = [
  {
    icon: HiBuildingOffice2,
    title: "Asia's Leading Tech & Fintech Hub",
    description:
      "Singapore's Smart Nation initiative has drawn the regional headquarters of the world's biggest technology, banking and fintech companies. Study here and you study minutes from the MNCs, startups and government employers hiring future-tech talent.",
  },
  {
    icon: HiShieldCheck,
    title: "Safe, English-Speaking & Easy for Foreigners",
    description:
      "Ranked among the world's safest cities, Singapore is English-speaking, clean and welcoming to international learners. Settling in is simple — so you can focus on your studies and your career from day one.",
  },
  {
    icon: HiGlobeAlt,
    title: "Your Gateway to ASEAN & Asia",
    description:
      "Singapore is the strategic launchpad into one of the world's largest and fastest-growing regional markets. With strong government investment in cybersecurity and AI, demand for skilled talent is high — and a Singapore qualification opens doors right across the region.",
  },
];

export function WhyChooseInstitute() {
  return (
    <section id="why-us" data-theme="dark" className="home-singapore relative overflow-hidden">
      <div className="grid-bg opacity-30" />
      <div
        className="glow-blob"
        style={{
          top: "10%",
          right: "-5%",
          width: 500,
          height: 500,
          background: "radial-gradient(circle, #10B981 0%, transparent 60%)",
          opacity: 0.12,
        }}
      />

      <Container className="relative grid lg:grid-cols-[0.85fr_1.15fr] gap-10 lg:gap-20 items-start">
        <div className="lg:sticky lg:top-28">
          <div className="kicker mb-4">[ WHY SINGAPORE ]</div>
          <h2 className="font-display text-[clamp(2rem,4.5vw,3.25rem)] font-extrabold leading-[1.05]">
            Why Study Tech in <span className="gradient-text">Singapore</span>?
          </h2>
          <p className="mt-5 text-(--color-muted) text-lg">
            For international professionals and students, Singapore is the smartest place in Asia
            to build a future-tech career. A world-class, English-speaking environment, deep
            government investment in cybersecurity and AI, and a strategic gateway to ASEAN make
            it the launchpad foreign learners choose.
          </p>
        </div>

        <div className="grid gap-4">
          {REASONS.map((reason) => {
            const Icon = reason.icon;
            return (
              <div
                key={reason.title}
                className="relative rounded-2xl border border-white/10 bg-white/3 p-6 sm:pl-28 group"
              >
                <div className="sm:absolute sm:left-6 sm:top-6 w-16 h-16 rounded-xl bg-(--color-cyan)/10 border border-(--color-cyan)/20 flex items-center justify-center mb-4 sm:mb-0 group-hover:scale-110 transition-transform">
                  <Icon className="w-9 h-9 text-(--color-cyan)" />
                </div>
                <h3 className="font-display font-bold text-lg text-white mb-3 leading-snug">
                  {reason.title}
                </h3>
                <p className="text-sm text-(--color-muted) leading-relaxed">{reason.description}</p>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
