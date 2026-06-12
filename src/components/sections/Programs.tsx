import Link from "next/link";
import { Container } from "@/components/layout/Container";
import {
  HiShieldCheck,
  HiCpuChip,
  HiCubeTransparent,
  HiSparkles,
  HiArrowRight,
} from "react-icons/hi2";
import type { IconType } from "react-icons";

type Program = {
  id: string;
  icon: IconType;
  /** Discipline name — used for the H3 keyword anchor. */
  discipline: string;
  /** Benefit-driven headline. */
  headline: string;
  pitch: string;
  outcomes: string[];
  cta: { label: string; href: string };
  accent: string;
};

const PROGRAMS: Program[] = [
  {
    id: "cybersecurity",
    icon: HiShieldCheck,
    discipline: "Cybersecurity",
    headline: "Defend the Smart Nation",
    pitch:
      "Singapore is one of the world's most-targeted digital economies — and one of its best-defended. Train inside a government-backed cyber ecosystem and graduate ready to protect banks, MNCs and critical infrastructure across Asia.",
    outcomes: [
      "Hands-on SOC, threat-hunting and penetration-testing labs",
      "Career paths: Security Analyst, SOC Engineer, Penetration Tester",
      "Globally portable certifications [PLACEHOLDER: certification body]",
    ],
    cta: { label: "Explore Cybersecurity courses in Singapore", href: "/courses" },
    accent: "var(--color-cyan)",
  },
  {
    id: "ai",
    icon: HiCpuChip,
    discipline: "Artificial Intelligence",
    headline: "Build the Models Powering Asia",
    pitch:
      "From fintech to healthcare, Singapore's Smart Nation push has made applied AI talent one of the region's scarcest resources. Learn to design, deploy and govern real AI systems — taught entirely in English.",
    outcomes: [
      "Machine learning, generative AI and agentic-AI engineering",
      "Career paths: AI Engineer, ML Engineer, Data Scientist",
      "Project portfolio built on production-grade tooling",
    ],
    cta: { label: "Explore AI training for foreigners", href: "/courses" },
    accent: "var(--color-purple-light)",
  },
  {
    id: "blockchain",
    icon: HiCubeTransparent,
    discipline: "Blockchain",
    headline: "Engineer the Future of Finance",
    pitch:
      "Singapore is a global fintech and digital-asset hub with clear regulatory frameworks and deep investor access. Master smart contracts, Web3 and distributed-ledger systems where the industry is actually being built.",
    outcomes: [
      "Smart-contract development, Web3 and tokenisation",
      "Career paths: Blockchain Developer, Web3 Engineer, Solutions Architect",
      "Gateway to ASEAN fintech employers and startups",
    ],
    cta: { label: "Explore the Blockchain academy in Singapore", href: "/courses" },
    accent: "var(--color-amber)",
  },
  {
    id: "quantum",
    icon: HiSparkles,
    discipline: "Quantum Computing",
    headline: "Get Ahead of the Next Computing Era",
    pitch:
      "Singapore is home to some of Asia's most advanced quantum research and national investment. Build foundational quantum skills now and position yourself years ahead of a market that is only beginning to hire.",
    outcomes: [
      "Quantum algorithms, qubits and quantum programming",
      "Career paths: Quantum Developer, Research Engineer, R&D Specialist",
      "Early-mover advantage in a high-growth Asian field",
    ],
    cta: { label: "Explore Quantum Computing courses in Asia", href: "/courses" },
    accent: "var(--color-cyan)",
  },
];

export function Programs() {
  return (
    <section id="programs" className="relative py-20 overflow-hidden">
      <div
        className="glow-blob"
        style={{
          top: "0%",
          left: "30%",
          width: 600,
          height: 600,
          background: "radial-gradient(circle, #5C00E5 0%, transparent 60%)",
          opacity: 0.1,
        }}
      />

      <Container className="relative">
        <div className="text-center mb-14">
          <div className="kicker mb-4">[ OUR PROGRAMMES ]</div>
          <h2 className="font-display text-[clamp(2rem,4.5vw,3.25rem)] font-extrabold leading-[1.05]">
            Four Future-Tech Disciplines.{" "}
            <span className="gradient-text">One Launchpad.</span>
          </h2>
          <p className="mt-4 text-(--color-muted) text-lg max-w-2xl mx-auto">
            English-taught, career-focused programmes in the four fields shaping the next
            decade — designed for international learners who want to study tech in Singapore.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {PROGRAMS.map((p) => {
            const Icon = p.icon;
            return (
              <div
                key={p.id}
                id={p.id}
                className="glass p-8 flex flex-col group hover:border-white/15 transition-all duration-300"
              >
                <div className="flex items-center gap-4 mb-5">
                  <div
                    className="w-14 h-14 rounded-xl flex items-center justify-center shrink-0 transition-transform group-hover:scale-110"
                    style={{ background: `color-mix(in srgb, ${p.accent} 12%, transparent)` }}
                  >
                    <Icon className="w-7 h-7" style={{ color: p.accent }} />
                  </div>
                  <div>
                    {/* H3 carries the discipline keyword */}
                    <h3 className="font-display font-extrabold text-xl text-white leading-tight">
                      {p.discipline}
                    </h3>
                    <p className="text-sm font-medium" style={{ color: p.accent }}>
                      {p.headline}
                    </p>
                  </div>
                </div>

                <p className="text-sm text-(--color-muted) leading-relaxed mb-6">{p.pitch}</p>

                <ul className="space-y-3 mb-8">
                  {p.outcomes.map((o) => (
                    <li key={o} className="flex items-start gap-3">
                      <span
                        className="w-1.5 h-1.5 rounded-full shrink-0 mt-2"
                        style={{ background: p.accent }}
                      />
                      <span className="text-sm text-white/80 leading-relaxed">{o}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  href={p.cta.href}
                  className="mt-auto inline-flex items-center gap-2 text-sm font-medium text-white/90 hover:text-white transition-colors"
                >
                  {p.cta.label}
                  <HiArrowRight className="w-4 h-4" />
                </Link>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
