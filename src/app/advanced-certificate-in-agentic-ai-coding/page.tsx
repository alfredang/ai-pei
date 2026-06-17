import type { Metadata } from "next";
import Link from "next/link";
import {
  HiCpuChip,
  HiCommandLine,
  HiRectangleGroup,
  HiCircleStack,
  HiCubeTransparent,
  HiRocketLaunch,
  HiSparkles,
  HiBriefcase,
  HiGlobeAlt,
  HiAcademicCap,
  HiUserGroup,
  HiCheckBadge,
} from "react-icons/hi2";
import { Container } from "@/components/layout/Container";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { InternationalStudentSupport } from "@/components/sections/InternationalStudentSupport";

const SITE_URL = "https://www.tertiaryinfotech.edu.sg";
const PAGE_URL = `${SITE_URL}/advanced-certificate-in-agentic-ai-coding.html`;

const ADDRESS = "12 Woodlands Square #07-85/86/87 Woods Square Tower 1, Singapore 737715";

export const metadata: Metadata = {
  title:
    "Advanced Certificate in Agentic AI Coding & Architecting — Study in Singapore",
  description:
    "Go beyond chatbots. Design, build and deploy autonomous AI agents and agentic systems on this Advanced Certificate at Tertiary Infotech Academy, a Singapore Private Education Institution. Open to international students and career switchers.",
  keywords:
    "Advanced Certificate Agentic AI, AI agents course Singapore, agentic AI coding course, study AI in Singapore, AI engineer course international students, RAG course, multi-agent orchestration course, AI solutions architect training",
  // The full course (curriculum + enrolment) lives in the catalog; point canonical there.
  alternates: { canonical: `${SITE_URL}/courses/advanced-certificate-in-agentic-ai-coding.html` },
  openGraph: {
    type: "website",
    locale: "en_SG",
    url: PAGE_URL,
    title:
      "Advanced Certificate in Agentic AI Coding & Architecting — Study in Singapore",
    description:
      "Design, build and deploy autonomous AI agents. An Advanced Certificate at Tertiary Infotech Academy — open to international students and career switchers seeking a Singapore study pathway.",
    siteName: "Tertiary Infotech Academy",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Advanced Certificate in Agentic AI Coding — Tertiary Infotech Academy",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Advanced Certificate in Agentic AI Coding & Architecting — Study in Singapore",
    description:
      "Go beyond chatbots — build and architect autonomous AI agents. Open to international students at Tertiary Infotech Academy, Singapore.",
    images: ["/opengraph-image"],
  },
};

const MODULES = [
  {
    id: "foundations",
    title: "LLM & Prompt Engineering Foundations",
    icon: HiSparkles,
    accent: "cyan" as const,
    body:
      "Understand how large language models work, their strengths and failure modes, and how to steer them. Master structured prompting, system instructions, output formatting and reasoning patterns — the groundwork every agent builds on.",
  },
  {
    id: "patterns",
    title: "Agentic Patterns — Tool Use & Orchestration",
    icon: HiRectangleGroup,
    accent: "blue" as const,
    body:
      "Move from single prompts to autonomous behaviour: tool use, function calling, planning-and-acting loops, and multi-agent orchestration where specialised agents collaborate to complete complex, multi-step tasks.",
  },
  {
    id: "rag",
    title: "Retrieval-Augmented Generation (RAG) & Context Engineering",
    icon: HiCircleStack,
    accent: "purple" as const,
    body:
      "Ground agents in real knowledge. Build retrieval pipelines with vector databases, design effective chunking and embeddings, and engineer context windows so your agents answer from authoritative sources rather than guessing.",
  },
  {
    id: "architecting",
    title: "Architecting & Deploying Production AI Agents",
    icon: HiCubeTransparent,
    accent: "amber" as const,
    body:
      "Take agents from notebook to production — evaluation harnesses, guardrails and safety, observability, and standardised tool integration (including the Model Context Protocol, MCP). Learn the architecture decisions that keep agentic systems reliable at scale.",
  },
  {
    id: "capstone",
    title: "Hands-on Capstone — Ship a Working Agent",
    icon: HiRocketLaunch,
    accent: "green" as const,
    body:
      "Apply everything end-to-end. You scope, build, evaluate and demo a working multi-step AI agent that uses tools and retrieval to solve a real problem — a portfolio piece you can show employers.",
  },
];

const ACCENT: Record<string, { ring: string; iconText: string; chip: string }> = {
  cyan: {
    ring: "border-(--color-cyan)/40",
    iconText: "text-(--color-cyan)",
    chip: "bg-(--color-cyan)/10 text-(--color-cyan)",
  },
  blue: {
    ring: "border-(--color-cyan)/40",
    iconText: "text-(--color-cyan)",
    chip: "bg-(--color-cyan)/10 text-(--color-cyan)",
  },
  purple: {
    ring: "border-(--color-purple)/50",
    iconText: "text-(--color-purple-light)",
    chip: "bg-(--color-purple)/15 text-(--color-purple-light)",
  },
  amber: {
    ring: "border-(--color-amber)/50",
    iconText: "text-(--color-amber)",
    chip: "bg-(--color-amber)/10 text-(--color-amber)",
  },
  green: {
    ring: "border-(--color-green)/50",
    iconText: "text-(--color-green)",
    chip: "bg-(--color-green)/10 text-(--color-green)",
  },
};

const OUTCOMES = [
  "Explain how LLMs and agentic systems work — and where each is the right tool",
  "Design agentic workflows using tool use, function calling and planning loops",
  "Orchestrate multiple agents to tackle complex, multi-step problems",
  "Build retrieval pipelines with vector databases and RAG for grounded answers",
  "Apply evaluation, guardrails and observability to keep agents safe and reliable",
  "Architect and deploy a production-ready AI agent, end-to-end",
];

const WHO = [
  {
    icon: HiAcademicCap,
    title: "Fresh international graduates",
    body:
      "Recent computing, engineering or science graduates who want a focused, job-relevant specialisation in building AI agents — and a recognised Singapore credential.",
  },
  {
    icon: HiGlobeAlt,
    title: "Career switchers abroad",
    body:
      "Working professionals overseas pivoting into AI engineering. If you have some coding exposure and want a structured, hands-on path into agentic AI, this is for you.",
  },
  {
    icon: HiUserGroup,
    title: "Students seeking a Singapore pathway",
    body:
      "International students who want to study in Singapore — a leading Asian tech hub — and build a portfolio while exploring post-study and stay options.",
  },
  {
    icon: HiBriefcase,
    title: "Employer-sponsored staff",
    body:
      "Teams upskilling engineers to design and deploy AI agents in-house. Sponsorship and group enrolment are welcome — speak to a course advisor.",
  },
];

const CAREERS = [
  {
    icon: HiCpuChip,
    title: "AI Engineer",
    body:
      "Build LLM-powered features and pipelines — prompting, retrieval, tool integration and evaluation — across products and platforms.",
  },
  {
    icon: HiCommandLine,
    title: "Agentic AI Developer",
    body:
      "Specialise in autonomous agents: planning loops, multi-agent orchestration and tool-using systems that automate complex workflows.",
  },
  {
    icon: HiCubeTransparent,
    title: "AI Solutions Architect",
    body:
      "Design end-to-end agentic systems — architecture, guardrails, integration and deployment — that organisations can trust in production.",
  },
];

const TOOLS = [
  "Python",
  "Large Language Models (LLMs)",
  "Agent frameworks",
  "Tool use & function calling",
  "Vector databases",
  "Retrieval-Augmented Generation (RAG)",
  "Evaluation & guardrails",
  "Model Context Protocol (MCP)",
];

const FAQ = [
  {
    q: "What are the prerequisites — do I need to be a strong programmer?",
    a: "Some coding experience is helpful, particularly basic Python, as the hands-on work involves writing code. You do not need to be an expert or to have built AI systems before. If you're unsure whether your background is a good fit, talk to a course advisor and we'll guide you honestly.",
  },
  {
    q: "When are the intakes and how long is the programme?",
    a: "We run intakes periodically across the year, with both shorter intensive and part-time study options. Exact intake dates and duration depend on the schedule you choose — request the latest intake calendar from a course advisor and we'll match you to the next suitable start date.",
  },
  {
    q: "How much are the fees?",
    a: "Fees vary by intake, study mode and your eligibility for any applicable support. We don't publish a single fixed figure here — please request the latest fee schedule from a course advisor and we'll send you the current pricing and payment options.",
  },
  {
    q: "What are the career outcomes and is there a Singapore post-study pathway?",
    a: "Graduates target roles such as AI Engineer, Agentic AI Developer and AI Solutions Architect, where demand for people who can build and deploy AI agents continues to grow. As a Singapore Private Education Institution, we can explain the study experience and outline the relevant post-study and stay considerations during your enquiry — actual immigration outcomes are determined by the Singapore authorities.",
  },
  {
    q: "Is the course online or onsite?",
    a: "We offer onsite delivery at our Woods Square campus in Singapore, and we can advise on flexible and online options for international learners depending on the intake. Tell a course advisor your situation and we'll recommend the best mode for you.",
  },
];

const courseLd = {
  "@context": "https://schema.org",
  "@type": "Course",
  name: "Advanced Certificate in Agentic AI Coding & Architecting",
  description:
    "An Advanced Certificate that takes learners beyond chatbots to design, build, architect and deploy autonomous AI agents and agentic systems — covering LLM foundations, agentic patterns, RAG, production architecture and a hands-on capstone.",
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
    inLanguage: "en",
    location: {
      "@type": "Place",
      name: "Tertiary Infotech Academy",
      address: {
        "@type": "PostalAddress",
        streetAddress: "12 Woodlands Square #07-85/86/87 Woods Square Tower 1",
        addressLocality: "Singapore",
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
    { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/index.html` },
    { "@type": "ListItem", position: 2, name: "Courses", item: `${SITE_URL}/courses.html` },
    {
      "@type": "ListItem",
      position: 3,
      name: "Advanced Certificate in Agentic AI Coding & Architecting",
      item: PAGE_URL,
    },
  ],
};

export default function AgenticAiCodingPage() {
  return (
    <>
      <Navbar />
      <main>
        {/* HERO */}
        <section className="relative pt-6 pb-10 md:pt-8 md:pb-14 overflow-hidden">
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
              <div className="kicker mb-4">[ ADVANCED CERTIFICATE · STUDY IN SINGAPORE ]</div>
              <h1 className="font-display text-[clamp(2.25rem,5.2vw,3.75rem)] font-extrabold leading-[1.04] mb-5">
                Go beyond chatbots. Build{" "}
                <span className="gradient-text">autonomous AI agents</span>.
              </h1>
              <p className="text-(--color-muted) text-lg mb-6">
                The <strong className="text-white">Advanced Certificate in Agentic AI
                Coding &amp; Architecting</strong> teaches you to design, build and deploy
                AI agents and agentic systems — not just prompts. Hands-on, project-led,
                and delivered at{" "}
                <span className="text-(--color-cyan)">Tertiary Infotech Academy</span>, a
                Singapore Private Education Institution. Open to international students and
                career switchers.
              </p>
              <div className="flex flex-wrap items-center gap-3 mb-6">
                <span className="px-3 py-1.5 rounded-full text-xs font-mono bg-(--color-cyan)/10 text-(--color-cyan) border border-(--color-cyan)/30">
                  Build &amp; architect AI agents
                </span>
                <span className="px-3 py-1.5 rounded-full text-xs font-mono bg-(--color-purple)/15 text-(--color-purple-light) border border-(--color-purple)/40">
                  International students welcome
                </span>
                <span className="px-3 py-1.5 rounded-full text-xs font-mono bg-(--color-amber)/10 text-(--color-amber) border border-(--color-amber)/30">
                  Hands-on capstone
                </span>
              </div>
              <div className="flex flex-wrap gap-3">
                <Link href="/contact.html" className="btn-primary">
                  Talk to a course advisor →
                </Link>
                <a
                  href="#modules"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-lg border border-white/15 text-white/85 hover:border-(--color-cyan)/50 hover:text-(--color-cyan) transition"
                >
                  See the curriculum
                </a>
              </div>
            </div>
          </Container>
        </section>

        {/* MODULES */}
        <section id="modules" className="relative py-10 scroll-mt-20">
          <Container>
            <div className="max-w-3xl mb-10">
              <div className="kicker mb-3">[ CURRICULUM · 5 MODULES ]</div>
              <h2 className="font-display text-[clamp(1.75rem,3.5vw,2.5rem)] font-extrabold leading-tight">
                From first prompt to a{" "}
                <span className="gradient-text">production AI agent</span>.
              </h2>
              <p className="text-(--color-muted) mt-4">
                Five modules build on each other — foundations, agentic patterns,
                retrieval, production architecture, and a capstone you ship and demo.
              </p>
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

        {/* OUTCOMES */}
        <section className="relative py-10">
          <Container>
            <div className="grid md:grid-cols-2 gap-8 items-start">
              <div>
                <div className="kicker mb-3">[ WHAT YOU&apos;LL BE ABLE TO DO ]</div>
                <h2 className="font-display text-[clamp(1.75rem,3.5vw,2.5rem)] font-extrabold leading-tight mb-4">
                  Programme{" "}
                  <span className="gradient-text-warm">outcomes</span>.
                </h2>
                <p className="text-(--color-muted)">
                  By the end of the Advanced Certificate, you won&apos;t just understand AI
                  agents — you&apos;ll have built and deployed one.
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
                Built for ambitious learners — from anywhere.
              </h2>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              {WHO.map((w) => {
                const Icon = w.icon;
                return (
                  <div key={w.title} className="glass card-hover p-6 relative overflow-hidden">
                    <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-(--color-cyan) to-transparent" />
                    <Icon className="w-7 h-7 text-(--color-cyan) mb-3" />
                    <h3 className="font-display font-bold text-lg mb-2">{w.title}</h3>
                    <p className="text-sm text-(--color-muted) leading-relaxed">{w.body}</p>
                  </div>
                );
              })}
            </div>
          </Container>
        </section>

        {/* TOOLS & SKILLS */}
        <section className="relative py-10">
          <Container>
            <div className="max-w-3xl mb-6">
              <div className="kicker mb-3">[ TOOLS &amp; SKILLS ]</div>
              <h2 className="font-display text-[clamp(1.75rem,3.5vw,2.5rem)] font-extrabold leading-tight">
                The agentic AI{" "}
                <span className="gradient-text">toolkit</span>.
              </h2>
              <p className="text-(--color-muted) mt-4 text-sm">
                The course is vendor-neutral and concept-first. You learn transferable
                skills and patterns that apply across the agentic AI ecosystem, so your
                knowledge isn&apos;t tied to any single platform.
              </p>
            </div>
            <div className="flex flex-wrap gap-2.5">
              {TOOLS.map((t) => (
                <span
                  key={t}
                  className="px-3.5 py-2 rounded-lg text-sm font-mono glass border border-white/10 text-white/85"
                >
                  {t}
                </span>
              ))}
            </div>
          </Container>
        </section>

        {/* CAREER OUTCOMES */}
        <section className="relative py-10">
          <Container>
            <div className="max-w-3xl mb-8">
              <div className="kicker mb-3">[ CAREER OUTCOMES ]</div>
              <h2 className="font-display text-[clamp(1.75rem,3.5vw,2.5rem)] font-extrabold leading-tight">
                Roles that need people who can{" "}
                <span className="gradient-text-warm">build agents</span>.
              </h2>
              <p className="text-(--color-muted) mt-4">
                Organisations everywhere are racing to put AI agents into production — and
                they need engineers who can design, build and deploy them responsibly.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-4">
              {CAREERS.map((c) => {
                const Icon = c.icon;
                return (
                  <div key={c.title} className="glass p-6">
                    <Icon className="w-7 h-7 text-(--color-cyan) mb-3" />
                    <h3 className="font-display font-bold text-lg mb-2">{c.title}</h3>
                    <p className="text-sm text-(--color-muted) leading-relaxed">{c.body}</p>
                  </div>
                );
              })}
            </div>
            <p className="mt-6 text-xs text-(--color-muted) font-mono max-w-3xl">
              [ Roles reflect general industry demand for agentic AI skills. We do not
              guarantee employment, salary or specific outcomes. ]
            </p>
          </Container>
        </section>

        {/* FAQ */}
        <section className="relative py-10">
          <Container className="max-w-4xl">
            <div className="mb-8">
              <div className="kicker mb-3">[ FAQ FOR INTERNATIONAL STUDENTS ]</div>
              <h2 className="font-display text-[clamp(1.75rem,3.5vw,2.5rem)] font-extrabold leading-tight">
                Common questions before you enrol.
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
              <div className="kicker mb-3">[ START YOUR ENQUIRY ]</div>
              <h2 className="font-display text-[clamp(2rem,4.5vw,3rem)] font-extrabold leading-[1.05] mb-4">
                Ready to build AI agents?{" "}
                <span className="gradient-text">Talk to an advisor.</span>
              </h2>
              <p className="text-(--color-muted) text-lg">
                Tell us your background and goals. We&apos;ll send the latest intake
                calendar and fee schedule, and advise on the right study pathway for you —
                including options for international learners.
              </p>
            </div>
            <div className="flex flex-wrap justify-center gap-3">
              <Link href="/contact.html" className="btn-primary">
                Talk to a course advisor →
              </Link>
              <Link
                href="/advanced-certificate-in-ai-security-analyst.html"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-lg border border-white/15 text-white/85 hover:border-(--color-cyan)/50 hover:text-(--color-cyan) transition"
              >
                Interested in AI security instead?
              </Link>
            </div>
            <div className="glass p-5 mt-8 flex gap-3 items-start max-w-2xl mx-auto">
              <HiCheckBadge className="w-5 h-5 text-(--color-green) shrink-0 mt-0.5" />
              <p className="text-sm text-white/85 leading-relaxed">
                Onsite delivery at{" "}
                <strong className="text-white">{ADDRESS}</strong>. Flexible and online
                options may be available depending on the intake — ask a course advisor.
              </p>
            </div>
            <p className="mt-6 text-center text-xs text-(--color-muted) font-mono">
              [ Browse the full catalogue?{" "}
              <Link href="/courses.html" className="hover:text-(--color-cyan)">
                See all courses
              </Link>{" "}
              ]
            </p>
          </Container>
        </section>
        <InternationalStudentSupport />
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
