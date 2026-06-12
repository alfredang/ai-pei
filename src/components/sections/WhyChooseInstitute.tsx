import { Container } from "@/components/layout/Container";
import { HiBuildingOffice2, HiShieldCheck, HiGlobeAlt } from "react-icons/hi2";

const REASONS = [
  {
    icon: HiBuildingOffice2,
    title: "Asia's #1 Tech & Fintech Hub",
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
      "Singapore is the strategic launchpad into a market of 600+ million people. With heavy government investment in cybersecurity and AI, demand for skilled talent is high — and a Singapore qualification opens doors right across the region.",
  },
];

export function WhyChooseInstitute() {
  return (
    <section id="why-us" className="relative py-20 overflow-hidden">
      <div className="grid-bg opacity-30" />
      <div
        className="glow-blob"
        style={{
          top: "10%",
          right: "-5%",
          width: 500,
          height: 500,
          background: "radial-gradient(circle, #5C00E5 0%, transparent 60%)",
          opacity: 0.12,
        }}
      />

      <Container className="relative">
        <div className="max-w-3xl mx-auto text-center mb-14">
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

        <div className="grid lg:grid-cols-3 gap-6">
          {REASONS.map((reason) => {
            const Icon = reason.icon;
            return (
              <div
                key={reason.title}
                className="glass p-8 hover:border-white/15 transition-all duration-300 group"
              >
                <div className="w-12 h-12 rounded-xl bg-(--color-cyan)/10 border border-(--color-cyan)/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Icon className="w-6 h-6 text-(--color-cyan)" />
                </div>
                <h3 className="font-display font-bold text-lg text-white mb-3 leading-snug">
                  {reason.title}
                </h3>
                <p className="text-sm text-(--color-muted) leading-relaxed">{reason.description}</p>
              </div>
            );
          })}
        </div>

        {/* Partner logos strip */}
        <div className="mt-14 text-center">
          <div className="text-xs font-mono uppercase tracking-wider text-(--color-muted) mb-6">
            Accreditations &amp; Industry Partners
          </div>
          <div className="flex flex-wrap items-center justify-center gap-4">
            {[
              "[PLACEHOLDER: Accreditation 1]",
              "[PLACEHOLDER: Accreditation 2]",
              "[PLACEHOLDER: Certification Partner]",
              "[PLACEHOLDER: Industry Partner]",
              "[PLACEHOLDER: Hiring Partner]",
              "[PLACEHOLDER: Test Centre]",
            ].map((partner) => (
              <span
                key={partner}
                className="px-4 py-2 rounded-lg bg-white/4 border border-white/8 text-xs font-medium text-white/50 hover:text-white/70 hover:border-white/15 transition"
              >
                {partner}
              </span>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
