import Link from "next/link";
import Image from "next/image";
import type { CSSProperties } from "react";
import { Container } from "@/components/layout/Container";
import { htmlPath } from "@/lib/html-url";
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
  image: string;
  imageAlt: string;
  focus: string;
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
    image: "/images/programmes/cybersecurity.webp",
    imageAlt: "Emerald glass shield surrounded by illuminated server circuits",
    focus: "Security & resilience",
    discipline: "Cybersecurity",
    headline: "Defend the Smart Nation",
    pitch:
      "Singapore is one of the world's most-targeted digital economies — and one of its best-defended. Train inside a government-backed cyber ecosystem and graduate ready to protect banks, MNCs and critical infrastructure across Asia.",
    outcomes: [
      "Hands-on SOC, threat-hunting and penetration-testing labs",
      "Career paths: Security Analyst, SOC Engineer, Penetration Tester",
      "Globally portable, industry-aligned certifications",
    ],
    cta: { label: "Advanced Certificate in Cyber Security in Singapore", href: "/courses/advanced-certificate-in-cyber-security" },
    accent: "var(--color-cyan)",
  },
  {
    id: "ai",
    icon: HiCpuChip,
    image: "/images/programmes/artificial-intelligence.webp",
    imageAlt: "Luminous teal neural network suspended above a microchip",
    focus: "Intelligence & innovation",
    discipline: "Artificial Intelligence",
    headline: "Build the Models Powering Asia",
    pitch:
      "From fintech to healthcare, Singapore's Smart Nation push has made applied AI talent one of the region's scarcest resources. Learn to design, deploy and govern real AI systems — taught entirely in English.",
    outcomes: [
      "Machine learning, generative AI and agentic-AI engineering",
      "Career paths: AI Engineer, ML Engineer, Data Scientist",
      "Project portfolio built on production-grade tooling",
    ],
    cta: { label: "Advanced Certificate in Artificial Intelligence in Singapore", href: "/advanced-certificate-in-artificial-intelligence" },
    accent: "var(--color-purple-light)",
  },
  {
    id: "blockchain",
    icon: HiCubeTransparent,
    image: "/images/programmes/blockchain.webp",
    imageAlt: "Amber glass blocks connected across a distributed network",
    focus: "Trust & digital finance",
    discipline: "Blockchain",
    headline: "Engineer the Future of Finance",
    pitch:
      "Singapore is a global fintech and digital-asset hub with clear regulatory frameworks and deep investor access. Master smart contracts, Web3 and distributed-ledger systems where the industry is actually being built.",
    outcomes: [
      "Smart-contract development, Web3 and tokenisation",
      "Career paths: Blockchain Developer, Web3 Engineer, Solutions Architect",
      "Gateway to ASEAN fintech employers and startups",
    ],
    cta: { label: "Advanced Certificate in Blockchain in Singapore", href: "/advanced-certificate-in-blockchain" },
    accent: "var(--color-amber)",
  },
  {
    id: "quantum",
    icon: HiSparkles,
    image: "/images/programmes/quantum-computing.webp",
    imageAlt: "Copper quantum computing apparatus in an illuminated laboratory",
    focus: "Discovery & possibility",
    discipline: "Quantum Computing",
    headline: "Get Ahead of the Next Computing Era",
    pitch:
      "Singapore is home to some of Asia's most advanced quantum research and national investment. Build foundational quantum skills now and position yourself years ahead of a market that is only beginning to hire.",
    outcomes: [
      "Quantum algorithms, qubits and quantum programming",
      "Career paths: Quantum Developer, Research Engineer, R&D Specialist",
      "Early-mover advantage in a high-growth Asian field",
    ],
    cta: { label: "Advanced Certificate in Quantum Computing in Singapore", href: "/courses/advanced-certificate-in-applied-quantum-computing-and-qiskit-programming" },
    accent: "var(--color-cyan)",
  },
];

export function Programs() {
  return (
    <section id="programs" className="programmes-section relative overflow-hidden" aria-labelledby="programmes-title">
      <Container width="full" className="relative">
        <div className="programmes-heading">
          <div>
            <div className="kicker mb-4">[ EXPLORE YOUR NEXT CHAPTER ]</div>
            <h2 id="programmes-title" className="font-display text-[clamp(2rem,4.5vw,3.5rem)] font-extrabold leading-[1.08] tracking-tight">
              Four Future-Tech Disciplines.<br />
              <span className="gradient-text">One Launchpad.</span>
            </h2>
          </div>
          <p className="text-(--color-muted) text-base leading-relaxed max-w-md">
            English-taught, career-focused programmes in the four fields shaping the next
            decade — designed for international learners who want to study tech in Singapore.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {PROGRAMS.map((p, index) => {
            const Icon = p.icon;
            return (
              <article
                key={p.id}
                id={p.id}
                className="programme-card group flex flex-col"
                style={{ "--programme-accent": p.accent } as CSSProperties}
                aria-labelledby={`${p.id}-title`}
              >
                <div className="programme-art" data-theme="dark">
                  <Image
                    src={p.image}
                    alt={p.imageAlt}
                    fill
                    sizes="(max-width: 767px) 100vw, 50vw"
                    className="object-cover transition-transform duration-700 motion-safe:group-hover:scale-105"
                  />
                  <div className="programme-art-scrim" />
                  <div className="absolute top-5 left-5 right-5 flex justify-between items-center text-white">
                    <span className="programme-tag"><Icon className="w-4 h-4" aria-hidden /> {p.focus}</span>
                    <span className="font-mono text-xs tracking-widest text-white/70" aria-hidden>0{index + 1} / 04</span>
                  </div>
                  <div className="absolute bottom-6 left-6 right-6 lg:bottom-8 lg:left-8 lg:right-8">
                    <h3 id={`${p.id}-title`} className="font-display text-[clamp(1.65rem,2.7vw,2.75rem)] font-bold tracking-tight leading-tight text-white">
                      {p.discipline}
                    </h3>
                    <p className="mt-2 text-sm sm:text-base text-white/85">{p.headline}</p>
                  </div>
                </div>

                <div className="p-6 lg:p-8 flex flex-col flex-1">
                  <div className="programme-meta mb-5">
                    <span>Advanced Certificate</span><span>Live online</span>
                  </div>
                  <p className="text-sm lg:text-base text-(--color-muted) leading-relaxed mb-6">{p.pitch}</p>
                  <ul className="space-y-3 mb-7">
                    {p.outcomes.map((outcome) => (
                      <li key={outcome} className="flex items-start gap-3 text-sm leading-relaxed">
                        <span className="programme-check" aria-hidden>✓</span>
                        <span>{outcome}</span>
                      </li>
                    ))}
                  </ul>
                  <Link href={htmlPath(p.cta.href)} className="programme-link mt-auto" aria-label={p.cta.label}>
                    <span>Explore {p.discipline} <span className="sr-only">Advanced Certificate in Singapore</span></span>
                    <span className="programme-arrow"><HiArrowRight className="w-5 h-5" aria-hidden /></span>
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
