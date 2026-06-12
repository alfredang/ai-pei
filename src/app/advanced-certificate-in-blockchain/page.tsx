import type { Metadata } from "next";
import Link from "next/link";
import {
  HiCubeTransparent,
  HiCodeBracket,
  HiSquares2X2,
  HiShieldCheck,
  HiRocketLaunch,
  HiGlobeAlt,
  HiAcademicCap,
  HiUserGroup,
  HiBriefcase,
  HiCheckBadge,
  HiBuildingOffice2,
  HiSparkles,
} from "react-icons/hi2";
import { Container } from "@/components/layout/Container";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

const SITE_URL = "https://www.tertiaryinfotech.edu.sg";
const PAGE_URL = `${SITE_URL}/advanced-certificate-in-blockchain`;

export const metadata: Metadata = {
  title: "Advanced Certificate in Blockchain — Study in Singapore",
  description:
    "Build on the blockchain — smart contracts, DApps and Web3 — at a Singapore Private Education Institution. A hands-on Advanced Certificate in Blockchain for international students and career switchers. Talk to a course advisor.",
  keywords:
    "Advanced Certificate in Blockchain, blockchain course Singapore, study blockchain Singapore, smart contract development course, Solidity course, Web3 developer course, DApp development, international students blockchain Singapore",
  alternates: { canonical: PAGE_URL },
  openGraph: {
    type: "website",
    locale: "en_SG",
    url: PAGE_URL,
    title: "Advanced Certificate in Blockchain — Study in Singapore",
    description:
      "A hands-on Advanced Certificate in Blockchain — smart contracts, DApps and Web3 — for international students and career switchers, at a Singapore Private Education Institution.",
    siteName: "Tertiary Infotech Academy",
    images: [{ url: "/icon-192.png", width: 192, height: 192, alt: "Advanced Certificate in Blockchain — Tertiary Infotech Academy" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Advanced Certificate in Blockchain — Study in Singapore",
    description:
      "Smart contracts, DApps and Web3 — a hands-on Advanced Certificate in Blockchain for international students at a Singapore PEI.",
    images: ["/icon-192.png"],
  },
};

const MODULES = [
  {
    id: "foundations",
    title: "Blockchain & Distributed Ledger Foundations",
    icon: HiCubeTransparent,
    accent: "cyan" as const,
    body:
      "How distributed ledgers, consensus, cryptographic hashing and public/private keys actually work. You build a clear mental model of blocks, transactions and decentralised trust before writing a line of code.",
  },
  {
    id: "solidity",
    title: "Smart Contract Development with Solidity",
    icon: HiCodeBracket,
    accent: "blue" as const,
    body:
      "Write, compile and deploy smart contracts in Solidity on Ethereum and EVM-compatible networks. Variables, functions, modifiers, events, gas and common contract patterns — taught hands-on.",
  },
  {
    id: "dapps",
    title: "Building Decentralised Apps (DApps) & Web3",
    icon: HiSquares2X2,
    accent: "purple" as const,
    body:
      "Connect a front end to the chain. Use JavaScript Web3 libraries and wallet integration to read contract state, send transactions and ship a working decentralised application with a real user interface.",
  },
  {
    id: "security",
    title: "Blockchain Security & Smart Contract Auditing",
    icon: HiShieldCheck,
    accent: "amber" as const,
    body:
      "Recognise the vulnerability classes that matter — reentrancy, access-control flaws, integer issues and unsafe external calls — and apply a structured auditing checklist to review and harden contract code.",
  },
  {
    id: "capstone",
    title: "Hands-on Capstone — Deploy on a Testnet",
    icon: HiRocketLaunch,
    accent: "green" as const,
    body:
      "Bring it together: design, build and deploy your own smart contract plus a DApp front end to a public testnet, then demonstrate it end-to-end. A portfolio project you can show employers.",
  },
];

const ACCENT: Record<string, { ring: string; iconText: string; chip: string; line: string }> = {
  cyan: {
    ring: "border-(--color-cyan)/40",
    iconText: "text-(--color-cyan)",
    chip: "bg-(--color-cyan)/10 text-(--color-cyan)",
    line: "from-(--color-cyan)",
  },
  blue: {
    ring: "border-(--color-cyan)/40",
    iconText: "text-(--color-cyan)",
    chip: "bg-(--color-cyan)/10 text-(--color-cyan)",
    line: "from-(--color-cyan)",
  },
  purple: {
    ring: "border-(--color-purple)/50",
    iconText: "text-(--color-purple-light)",
    chip: "bg-(--color-purple)/15 text-(--color-purple-light)",
    line: "from-(--color-purple)",
  },
  amber: {
    ring: "border-(--color-amber)/50",
    iconText: "text-(--color-amber)",
    chip: "bg-(--color-amber)/10 text-(--color-amber)",
    line: "from-(--color-amber)",
  },
  green: {
    ring: "border-(--color-green)/50",
    iconText: "text-(--color-green)",
    chip: "bg-(--color-green)/10 text-(--color-green)",
    line: "from-(--color-green)",
  },
};

const OUTCOMES = [
  "Explain how blockchains, distributed ledgers and consensus mechanisms work",
  "Write, test and deploy smart contracts in Solidity on Ethereum / EVM networks",
  "Build a decentralised application (DApp) with Web3 wallet and front-end integration",
  "Identify common smart-contract vulnerabilities and apply an auditing checklist",
  "Deploy a working smart contract and DApp to a public testnet",
  "Present a portfolio-ready blockchain capstone project to prospective employers",
];

const AUDIENCE = [
  {
    icon: HiAcademicCap,
    title: "Fresh international graduates",
    body:
      "Recent computing, engineering or science graduates who want a specialised, hands-on blockchain credential to stand out in a global job market.",
  },
  {
    icon: HiUserGroup,
    title: "Career switchers abroad",
    body:
      "Professionals moving into software and Web3 from another field, looking for a structured pathway into smart-contract and DApp development.",
  },
  {
    icon: HiGlobeAlt,
    title: "Students seeking a Singapore pathway",
    body:
      "International learners who want to study an in-demand tech skill at a Singapore Private Education Institution in a leading global fintech hub.",
  },
  {
    icon: HiBuildingOffice2,
    title: "Employer-sponsored staff",
    body:
      "Teams upskilling engineers into blockchain and Web3 capability, sponsored by employers building on distributed-ledger technology.",
  },
];

const CAREERS = [
  {
    icon: HiCodeBracket,
    title: "Blockchain Developer",
    body:
      "Design and build blockchain-based systems and protocols, working across the smart-contract and application layers.",
  },
  {
    icon: HiCubeTransparent,
    title: "Smart Contract Engineer",
    body:
      "Specialise in writing, testing and reviewing secure smart contracts on Ethereum and other EVM-compatible chains.",
  },
  {
    icon: HiSquares2X2,
    title: "Web3 Developer",
    body:
      "Build decentralised applications that connect users and wallets to on-chain logic through Web3 front ends.",
  },
];

const TOOLS = [
  "Solidity",
  "Ethereum / EVM",
  "JavaScript & Web3 libraries",
  "Public testnets",
  "Wallet integration",
  "Smart-contract auditing techniques",
];

const FAQ = [
  {
    q: "What are the prerequisites for international students?",
    a: "Basic programming familiarity and comfort with general computer use are the most helpful starting points. The course begins with blockchain foundations and builds up to Solidity and DApp development, so you do not need prior blockchain experience. Contact a course advisor to confirm entry requirements for your background.",
  },
  {
    q: "When are the intakes and how long is the course?",
    a: "Intakes run periodically through the year, with both the schedule and duration depending on the delivery format. Talk to a course advisor for the next available intake date and the exact duration so you can plan your travel and study timeline.",
  },
  {
    q: "What are the course fees?",
    a: "Fees vary by intake and any applicable arrangements, so we share the latest fee schedule on request rather than publishing a fixed figure here. Request the latest fee schedule from a course advisor for a current, accurate quote.",
  },
  {
    q: "What careers and Singapore study pathway does this lead to?",
    a: "Graduates target roles such as Blockchain Developer, Smart Contract Engineer and Web3 Developer. Singapore is a recognised global fintech and Web3 hub, which makes it a strong base to build these skills. For specifics on any study or post-study pathway, speak to a course advisor who can guide you on the options relevant to your situation.",
  },
  {
    q: "Do I need a crypto or finance background to enrol?",
    a: "No. This is an educational, vendor-neutral developer course focused on building on blockchain technology — smart contracts, DApps and Web3. It does not require any cryptocurrency, trading or finance background, and it does not offer investment or financial advice.",
  },
];

const courseLd = {
  "@context": "https://schema.org",
  "@type": "Course",
  name: "Advanced Certificate in Blockchain",
  description:
    "A hands-on Advanced Certificate in Blockchain covering distributed-ledger foundations, smart contract development with Solidity on Ethereum/EVM, decentralised applications and Web3 integration, blockchain security and smart-contract auditing, and a deploy-to-testnet capstone. Designed for international students and career switchers studying at a Singapore Private Education Institution.",
  inLanguage: "en",
  educationalCredentialAwarded: "Advanced Certificate",
  provider: {
    "@type": "EducationalOrganization",
    name: "Tertiary Infotech Academy",
    url: SITE_URL,
  },
  hasCourseInstance: {
    "@type": "CourseInstance",
    courseMode: "Onsite",
    location: {
      "@type": "Place",
      name: "Tertiary Infotech Academy",
      address: {
        "@type": "PostalAddress",
        streetAddress: "12 Woodlands Square #07-85/86/87 Woods Square Tower 1",
        postalCode: "737715",
        addressCountry: "SG",
      },
    },
  },
  url: PAGE_URL,
};

const faqLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQ.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

const breadcrumbLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "Courses", item: `${SITE_URL}/courses` },
    { "@type": "ListItem", position: 3, name: "Advanced Certificate in Blockchain", item: PAGE_URL },
  ],
};

export default function AdvancedCertificateInBlockchainPage() {
  return (
    <>
      <Navbar />
      <main>
        {/* HERO */}
        <section className="relative py-10 md:py-14 overflow-hidden">
          <div
            className="glow-blob"
            style={{
              top: "-10%",
              left: "-5%",
              width: 520,
              height: 520,
              background: "radial-gradient(circle, #5C00E5 0%, transparent 70%)",
            }}
          />
          <div
            className="glow-blob"
            style={{
              top: "20%",
              right: "-10%",
              width: 480,
              height: 480,
              background: "radial-gradient(circle, rgba(89,235,253,0.5) 0%, transparent 70%)",
            }}
          />
          <Container>
            <div className="max-w-3xl relative">
              <div className="kicker mb-4">[ STUDY IN SINGAPORE · BLOCKCHAIN · WEB3 ]</div>
              <h1 className="font-display text-[clamp(2.25rem,5.2vw,3.75rem)] font-extrabold leading-[1.04] mb-5">
                Build on the{" "}
                <span className="gradient-text">blockchain</span> — smart contracts, DApps and Web3.
              </h1>
              <p className="text-(--color-muted) text-lg mb-6">
                The <strong className="text-white">Advanced Certificate in Blockchain</strong> at
                Tertiary Infotech Academy, a Singapore Private Education Institution, is a
                hands-on programme for international students and career switchers. Learn to write
                smart contracts, build decentralised applications and ship to a testnet — in one of
                the world&apos;s leading fintech and Web3 hubs.
              </p>
              <div className="flex flex-wrap items-center gap-3 mb-6">
                <span className="px-3 py-1.5 rounded-full text-xs font-mono bg-(--color-cyan)/10 text-(--color-cyan) border border-(--color-cyan)/30">
                  Hands-on capstone
                </span>
                <span className="px-3 py-1.5 rounded-full text-xs font-mono bg-(--color-purple)/15 text-(--color-purple-light) border border-(--color-purple)/40">
                  For international students
                </span>
                <span className="px-3 py-1.5 rounded-full text-xs font-mono bg-(--color-amber)/10 text-(--color-amber) border border-(--color-amber)/30">
                  Solidity · Ethereum / EVM
                </span>
              </div>
              <div className="flex flex-wrap gap-3">
                <Link href="/contact" className="btn-primary">
                  Talk to a course advisor →
                </Link>
                <a
                  href="#enquire"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-lg border border-white/15 text-white/85 hover:border-(--color-cyan)/50 hover:text-(--color-cyan) transition"
                >
                  Enquire about intakes
                </a>
              </div>
            </div>
          </Container>
        </section>

        {/* MODULES */}
        <section id="curriculum" className="relative py-10 scroll-mt-20">
          <Container>
            <div className="max-w-3xl mb-10">
              <div className="kicker mb-3">[ THE CURRICULUM ]</div>
              <h2 className="font-display text-[clamp(1.75rem,3.5vw,2.5rem)] font-extrabold leading-tight">
                Five modules from{" "}
                <span className="gradient-text">first block</span> to deployed DApp.
              </h2>
            </div>

            <ol className="relative pl-8 space-y-6 before:absolute before:left-3 before:top-2 before:bottom-2 before:w-px before:bg-gradient-to-b before:from-(--color-cyan)/60 before:via-(--color-purple)/60 before:to-(--color-green)/60">
              {MODULES.map((m, i) => {
                const Icon = m.icon;
                const a = ACCENT[m.accent];
                return (
                  <li key={m.id} className="relative">
                    <div
                      className={`absolute -left-8 top-1 w-7 h-7 rounded-full glass border ${a.ring} flex items-center justify-center`}
                    >
                      <Icon className={`w-3.5 h-3.5 ${a.iconText}`} />
                    </div>
                    <div className="glass p-5">
                      <div className="flex items-center gap-2 mb-2">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono ${a.chip}`}>
                          Module {i + 1}
                        </span>
                      </div>
                      <h3 className="font-display font-bold text-base mb-1.5">{m.title}</h3>
                      <p className="text-sm text-(--color-muted) leading-relaxed">{m.body}</p>
                    </div>
                  </li>
                );
              })}
            </ol>
          </Container>
        </section>

        {/* PROGRAMME OUTCOMES */}
        <section className="relative py-10">
          <Container>
            <div className="grid md:grid-cols-2 gap-8 items-start">
              <div>
                <div className="kicker mb-3">[ PROGRAMME OUTCOMES ]</div>
                <h2 className="font-display text-[clamp(1.75rem,3.5vw,2.5rem)] font-extrabold leading-tight mb-4">
                  What you&apos;ll be able to{" "}
                  <span className="gradient-text-warm">build and ship</span>.
                </h2>
                <p className="text-(--color-muted)">
                  Every module is hands-on. You finish with working code, a deployed project and
                  a portfolio you can show employers.
                </p>
              </div>
              <ul className="space-y-3">
                {OUTCOMES.map((line) => (
                  <li key={line} className="flex gap-3">
                    <span className="text-(--color-green) font-mono mt-0.5">✓</span>
                    <span className="text-white/90">{line}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Container>
        </section>

        {/* WHO SHOULD ENROL */}
        <section className="relative py-10">
          <Container>
            <div className="max-w-3xl mb-8">
              <div className="kicker mb-3">[ WHO SHOULD ENROL ]</div>
              <h2 className="font-display text-[clamp(1.75rem,3.5vw,2.5rem)] font-extrabold leading-tight">
                Built for{" "}
                <span className="gradient-text">international learners</span> entering Web3.
              </h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {AUDIENCE.map((a) => {
                const Icon = a.icon;
                return (
                  <div key={a.title} className="glass card-hover p-6 relative overflow-hidden">
                    <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-(--color-cyan) to-transparent" />
                    <Icon className="w-7 h-7 text-(--color-cyan) mb-3" />
                    <h3 className="font-display font-bold text-base mb-2">{a.title}</h3>
                    <p className="text-sm text-(--color-muted) leading-relaxed">{a.body}</p>
                  </div>
                );
              })}
            </div>
          </Container>
        </section>

        {/* CAREER OUTCOMES */}
        <section className="relative py-10">
          <Container>
            <div className="max-w-3xl mb-8">
              <div className="kicker mb-3">[ CAREER OUTCOMES ]</div>
              <h2 className="font-display text-[clamp(1.75rem,3.5vw,2.5rem)] font-extrabold leading-tight">
                Roles in a global{" "}
                <span className="gradient-text-warm">fintech and Web3</span> hub.
              </h2>
              <p className="text-(--color-muted) mt-4">
                Blockchain and Web3 skills are in demand across software teams worldwide, and
                Singapore is a recognised global fintech and Web3 hub — a strong base from which to
                build a developer career.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-4">
              {CAREERS.map((c) => {
                const Icon = c.icon;
                return (
                  <div key={c.title} className="glass p-5">
                    <Icon className="w-7 h-7 text-(--color-cyan) mb-3" />
                    <h3 className="font-display font-semibold text-base mb-2">{c.title}</h3>
                    <p className="text-sm text-(--color-muted) leading-relaxed">{c.body}</p>
                  </div>
                );
              })}
            </div>
            <p className="mt-5 text-xs text-(--color-muted) font-mono max-w-3xl">
              [ Roles reflect general industry demand. This course is educational and
              vendor-neutral; it does not promise employment, salary outcomes, or offer any
              investment or financial advice. ]
            </p>
          </Container>
        </section>

        {/* TOOLS & SKILLS */}
        <section className="relative py-10">
          <Container>
            <div className="max-w-3xl mb-8">
              <div className="kicker mb-3">[ TOOLS & SKILLS ]</div>
              <h2 className="font-display text-[clamp(1.75rem,3.5vw,2.5rem)] font-extrabold leading-tight">
                The developer stack you&apos;ll work in.
              </h2>
              <p className="text-(--color-muted) mt-4 text-sm">
                Skills are taught in a vendor-neutral, educational way — focused on how to build
                on blockchain technology, not on any token, trading product or financial position.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              {TOOLS.map((t) => (
                <span
                  key={t}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg glass text-sm text-white/90"
                >
                  <HiSparkles className="w-4 h-4 text-(--color-cyan)" />
                  {t}
                </span>
              ))}
            </div>
          </Container>
        </section>

        {/* FAQ */}
        <section className="relative py-10">
          <Container className="max-w-4xl">
            <div className="mb-8">
              <div className="kicker mb-3">[ FAQ ]</div>
              <h2 className="font-display text-[clamp(1.75rem,3.5vw,2.5rem)] font-extrabold leading-tight">
                International student questions, answered.
              </h2>
            </div>
            <div className="space-y-3">
              {FAQ.map((f) => (
                <details
                  key={f.q}
                  className="glass p-5 group [&_summary::-webkit-details-marker]:hidden"
                >
                  <summary className="cursor-pointer flex justify-between items-center gap-4">
                    <span className="font-display font-semibold text-base text-white">{f.q}</span>
                    <span className="text-(--color-cyan) font-mono text-lg transition group-open:rotate-45">
                      +
                    </span>
                  </summary>
                  <p className="text-sm text-(--color-muted) leading-relaxed mt-3">{f.a}</p>
                </details>
              ))}
            </div>
          </Container>
        </section>

        {/* FINAL CTA */}
        <section id="enquire" className="relative py-10 overflow-hidden scroll-mt-20">
          <div
            className="glow-blob"
            style={{
              top: "10%",
              left: "0",
              width: 480,
              height: 480,
              background: "radial-gradient(circle, #5C00E5 0%, transparent 70%)",
            }}
          />
          <Container className="max-w-4xl relative">
            <div className="text-center mb-8">
              <div className="kicker mb-3">[ START HERE ]</div>
              <h2 className="font-display text-[clamp(2rem,4.5vw,3rem)] font-extrabold leading-[1.05] mb-4">
                Ready to build on the blockchain?{" "}
                <span className="gradient-text">Talk to a course advisor.</span>
              </h2>
              <p className="text-(--color-muted) text-lg">
                Get the next intake date, the latest fee schedule and guidance on the right
                Singapore study pathway for you — no obligation.
              </p>
            </div>
            <div className="flex flex-wrap justify-center gap-3">
              <Link href="/contact" className="btn-primary">
                <HiBriefcase className="w-4 h-4" />
                Talk to a course advisor →
              </Link>
              <Link
                href="/courses"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-lg border border-white/15 text-white/85 hover:border-(--color-cyan)/50 hover:text-(--color-cyan) transition"
              >
                <HiAcademicCap className="w-4 h-4" />
                Browse all courses
              </Link>
            </div>
            <p className="mt-6 text-center text-sm text-(--color-muted)">
              <HiCheckBadge className="inline w-4 h-4 text-(--color-green) mr-1.5 align-text-bottom" />
              Prefer AI engineering?{" "}
              <Link
                href="/advanced-certificate-in-agentic-ai-coding"
                className="text-(--color-cyan) hover:underline"
              >
                See the Advanced Certificate in Agentic AI Coding
              </Link>
              .
            </p>
          </Container>
        </section>
      </main>
      <Footer />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(courseLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
    </>
  );
}
