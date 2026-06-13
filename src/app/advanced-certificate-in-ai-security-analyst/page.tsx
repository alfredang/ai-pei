import type { Metadata } from "next";
import Link from "next/link";
import {
  HiCpuChip,
  HiShieldCheck,
  HiBugAnt,
  HiBeaker,
  HiSparkles,
  HiGlobeAlt,
  HiAcademicCap,
  HiBriefcase,
  HiUserGroup,
  HiCheckBadge,
  HiCommandLine,
  HiServerStack,
} from "react-icons/hi2";
import { Container } from "@/components/layout/Container";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { InternationalStudentSupport } from "@/components/sections/InternationalStudentSupport";

const SITE_URL = "https://www.tertiaryinfotech.edu.sg";
const PAGE_URL = `${SITE_URL}/advanced-certificate-in-ai-security-analyst`;

export const metadata: Metadata = {
  title: "Advanced Certificate in AI Security Analyst — Study in Singapore",
  description:
    "Become an AI Security Analyst in Singapore. A practical PEI programme blending AI/machine learning with cyber security — AI-powered threat detection, securing LLM systems, and a hands-on capstone. Built for international students and career switchers.",
  keywords:
    "AI Security Analyst course Singapore, study AI cyber security Singapore, advanced certificate AI security, international students cyber security Singapore, SOC analyst training, securing LLM systems, OWASP LLM Top 10, AI threat detection course",
  // The full course (curriculum + enrolment) lives in the catalog; point canonical there.
  alternates: { canonical: `${SITE_URL}/courses/advanced-certificate-in-ai-security-analyst` },
  openGraph: {
    type: "website",
    locale: "en_SG",
    url: PAGE_URL,
    title:
      "Advanced Certificate in AI Security Analyst — Study in Singapore | Tertiary Infotech Academy",
    description:
      "A practical PEI programme blending AI/machine learning with cyber security — AI-powered threat detection, securing LLM systems, and a hands-on capstone. Built for international students and career switchers.",
    siteName: "Tertiary Infotech Academy",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Advanced Certificate in AI Security Analyst — Tertiary Infotech Academy",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Advanced Certificate in AI Security Analyst — Study in Singapore",
    description:
      "Blend AI and cyber security. Defend systems with AI and secure AI/LLM systems themselves. A Singapore PEI programme for international students and career switchers.",
    images: ["/opengraph-image"],
  },
};

const MODULES = [
  {
    id: "foundations",
    title: "AI & Machine Learning Foundations for Security",
    icon: HiCpuChip,
    accent: "cyan" as const,
    body:
      "Build the AI fundamentals every security analyst now needs — supervised and unsupervised learning, feature engineering, and model evaluation — applied to security data such as logs, network flows and alerts. Hands-on with Python and common ML libraries.",
  },
  {
    id: "detection",
    title: "AI-Powered Threat Detection & SOC Automation",
    icon: HiShieldCheck,
    accent: "blue" as const,
    body:
      "Use machine learning inside a Security Operations Centre — SIEM integration, anomaly and outlier detection, alert triage, and automating repetitive SOC workflows so analysts can focus on real threats. Vendor-neutral tooling throughout.",
  },
  {
    id: "securing-ai",
    title: "Securing AI & LLM Systems",
    icon: HiBugAnt,
    accent: "purple" as const,
    body:
      "Attack and defend AI systems themselves — prompt injection, model and data poisoning, model theft and the OWASP LLM Top 10. Learn to threat-model AI pipelines and put guardrails around large language model deployments.",
  },
  {
    id: "capstone",
    title: "Hands-on Capstone — AI-Assisted Detection Pipeline",
    icon: HiBeaker,
    accent: "amber" as const,
    body:
      "Bring it together by building an AI-assisted detection pipeline end to end — ingest security data, train or apply a model, surface anomalies, and harden the pipeline against adversarial input. A portfolio project you can show employers.",
  },
];

const ACCENT: Record<
  string,
  { ring: string; iconText: string; chip: string; line: string }
> = {
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
  "Apply machine learning to real security data — logs, network traffic and alerts",
  "Build and tune anomaly-detection models for a SOC environment",
  "Integrate AI workflows with SIEM and automate alert triage",
  "Threat-model AI and LLM systems against the OWASP LLM Top 10",
  "Defend against prompt injection, model theft and data poisoning",
  "Ship an end-to-end, AI-assisted detection pipeline as a portfolio capstone",
];

const AUDIENCE = [
  {
    icon: HiAcademicCap,
    title: "Fresh international graduates",
    body:
      "Recent graduates in computing, engineering, mathematics or science who want a focused, job-ready specialisation that combines two of the most in-demand fields — AI and cyber security.",
  },
  {
    icon: HiGlobeAlt,
    title: "Career switchers abroad",
    body:
      "Professionals overseas looking to pivot into security or AI. The programme is practical and project-led, so you finish with demonstrable skills rather than theory alone.",
  },
  {
    icon: HiUserGroup,
    title: "Students seeking a Singapore pathway",
    body:
      "International students who want to study in Singapore — a recognised regional cyber security and technology hub — as part of their study and career journey.",
  },
  {
    icon: HiBriefcase,
    title: "Employer-sponsored staff",
    body:
      "IT, infrastructure or operations staff whose employers want to upskill them into AI-augmented security roles. Group and corporate sponsorships are welcome.",
  },
];

const CAREERS = [
  {
    icon: HiShieldCheck,
    title: "AI Security Analyst",
    body:
      "Use AI and machine learning to detect, triage and investigate threats — the core role this programme is built around.",
  },
  {
    icon: HiServerStack,
    title: "SOC Analyst",
    body:
      "Work in a Security Operations Centre monitoring, detecting and responding to incidents, increasingly with AI-assisted tooling.",
  },
  {
    icon: HiCpuChip,
    title: "AI Security Engineer",
    body:
      "Secure the AI and LLM systems organisations are deploying — building guardrails, testing for prompt injection, and hardening model pipelines.",
  },
];

const TOOLS = [
  "Python",
  "Machine learning",
  "SIEM platforms",
  "Anomaly detection",
  "Large language models (LLMs)",
  "OWASP LLM Top 10",
  "SOC automation",
  "Threat modelling",
];

const FAQ = [
  {
    q: "What are the eligibility requirements and prerequisites?",
    a: "The programme suits graduates and professionals with a basic computing or technical background. Prior programming exposure is helpful but not essential — the foundations module brings you up to speed on Python and machine learning before the security material. International applicants should contact us to confirm academic and entry requirements for their country.",
  },
  {
    q: "What language is the course taught in?",
    a: "All teaching, materials and assessment are in English. International students should be comfortable studying in English; if you are unsure whether your level is sufficient, talk to a course advisor and we will guide you.",
  },
  {
    q: "When are the intakes and how long is the programme?",
    a: "We run multiple intakes through the year. Because the exact intake calendar and duration are reviewed each term, please request the latest schedule from a course advisor so you receive current dates and the study format that applies to your intake.",
  },
  {
    q: "What are the fees and what is included?",
    a: "Fees cover tuition, course materials and the hands-on capstone. We don't publish a fixed price here because fee schedules are updated periodically and may vary by intake and applicant category — request the latest fee schedule from a course advisor and we will send current figures and what's included.",
  },
  {
    q: "What are the career and post-study pathways in Singapore?",
    a: "Graduates target roles such as AI Security Analyst, SOC Analyst and AI Security Engineer. Singapore is a regional hub for cyber security and technology, so demand for these skills is strong. We can talk you through realistic career options and the study-and-stay considerations relevant to international students — speak to a course advisor for guidance specific to your situation.",
  },
];

const courseLd = {
  "@context": "https://schema.org",
  "@type": "Course",
  name: "Advanced Certificate in AI Security Analyst",
  description:
    "A practical programme blending AI/machine learning with cyber security. Students learn AI-powered threat detection and SOC automation, how to secure AI and LLM systems against the OWASP LLM Top 10, and build an AI-assisted detection pipeline as a hands-on capstone. Designed for international students and career switchers.",
  provider: {
    "@type": "EducationalOrganization",
    name: "Tertiary Infotech Academy",
    url: SITE_URL,
  },
  educationalCredentialAwarded: "Advanced Certificate",
  inLanguage: "en",
  url: PAGE_URL,
  hasCourseInstance: {
    "@type": "CourseInstance",
    courseMode: "Onsite",
    location: {
      "@type": "Place",
      name: "Tertiary Infotech Academy",
      address: {
        "@type": "PostalAddress",
        streetAddress:
          "12 Woodlands Square #07-85/86/87 Woods Square Tower 1",
        postalCode: "737715",
        addressCountry: "SG",
      },
    },
  },
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
    {
      "@type": "ListItem",
      position: 3,
      name: "Advanced Certificate in AI Security Analyst",
      item: PAGE_URL,
    },
  ],
};

export default function AiSecurityAnalystPage() {
  return (
    <>
      <Navbar />
      <main>
        {/* HERO */}
        <section className="relative py-6 md:py-9 overflow-hidden">
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
              background:
                "radial-gradient(circle, rgba(89,235,253,0.5) 0%, transparent 70%)",
            }}
          />
          <Container>
            <div className="max-w-3xl relative">
              <div className="kicker mb-4">[ PEI · STUDY IN SINGAPORE · AI + CYBER SECURITY ]</div>
              <h1 className="font-display text-[clamp(2.25rem,5.2vw,3.75rem)] font-extrabold leading-[1.04] mb-5">
                Become an{" "}
                <span className="gradient-text">AI Security Analyst</span> in Singapore.
              </h1>
              <p className="text-(--color-muted) text-lg mb-6">
                The <strong className="text-white">Advanced Certificate in AI Security
                Analyst</strong> is a practical programme that blends artificial
                intelligence with cyber security — so you can defend systems{" "}
                <em>using</em> AI, and secure the AI and large language model (LLM)
                systems themselves. Built for international students and career
                switchers ready to enter one of technology&apos;s fastest-growing fields.
              </p>
              <div className="flex flex-wrap items-center gap-3 mb-6">
                <span className="px-3 py-1.5 rounded-full text-xs font-mono bg-(--color-cyan)/10 text-(--color-cyan) border border-(--color-cyan)/30">
                  Advanced Certificate
                </span>
                <span className="px-3 py-1.5 rounded-full text-xs font-mono bg-(--color-purple)/15 text-(--color-purple-light) border border-(--color-purple)/40">
                  Hands-on capstone
                </span>
                <span className="px-3 py-1.5 rounded-full text-xs font-mono bg-(--color-amber)/10 text-(--color-amber) border border-(--color-amber)/30">
                  Open to international students
                </span>
              </div>
              <div className="flex flex-wrap gap-3">
                <Link href="/contact" className="btn-primary">
                  Talk to a course advisor →
                </Link>
                <a
                  href="#curriculum"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-lg border border-white/15 text-white/85 hover:border-(--color-cyan)/50 hover:text-(--color-cyan) transition"
                >
                  See the curriculum
                </a>
              </div>
            </div>
          </Container>
        </section>

        {/* CURRICULUM */}
        <section id="curriculum" className="relative py-10 scroll-mt-20">
          <Container>
            <div className="max-w-3xl mb-10">
              <div className="kicker mb-3">[ CURRICULUM ]</div>
              <h2 className="font-display text-[clamp(1.75rem,3.5vw,2.5rem)] font-extrabold leading-tight">
                Four modules, from AI foundations to a{" "}
                <span className="gradient-text">live detection pipeline</span>.
              </h2>
              <p className="text-(--color-muted) mt-4">
                The programme moves from machine-learning fundamentals into applied
                SOC work, then into securing AI systems themselves, and finishes with a
                build-it-yourself capstone.
              </p>
            </div>

            <ol className="relative pl-8 space-y-6 before:absolute before:left-3 before:top-2 before:bottom-2 before:w-px before:bg-gradient-to-b before:from-(--color-cyan)/60 before:via-(--color-purple)/60 before:to-(--color-amber)/60">
              {MODULES.map((s, i) => {
                const Icon = s.icon;
                const a = ACCENT[s.accent];
                return (
                  <li key={s.id} className="relative">
                    <div
                      className={`absolute -left-8 top-1 w-7 h-7 rounded-full glass border ${a.ring} flex items-center justify-center`}
                    >
                      <Icon className={`w-3.5 h-3.5 ${a.iconText}`} />
                    </div>
                    <div className="glass p-5">
                      <div className="flex items-center gap-2 mb-2">
                        <span
                          className={`px-2 py-0.5 rounded-full text-[10px] font-mono ${a.chip}`}
                        >
                          Module {i + 1}
                        </span>
                      </div>
                      <h3 className="font-display font-bold text-base mb-1.5">
                        {s.title}
                      </h3>
                      <p className="text-sm text-(--color-muted) leading-relaxed">
                        {s.body}
                      </p>
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
                <div className="kicker mb-3">[ WHAT YOU&apos;LL BE ABLE TO DO ]</div>
                <h2 className="font-display text-[clamp(1.75rem,3.5vw,2.5rem)] font-extrabold leading-tight mb-4">
                  Graduate with skills you can{" "}
                  <span className="gradient-text">demonstrate</span>, not just describe.
                </h2>
                <p className="text-(--color-muted)">
                  Every module is hands-on. By the end you will have built and defended
                  real AI-assisted security workflows.
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
                Built for learners coming to Singapore to{" "}
                <span className="gradient-text-warm">launch a security career</span>.
              </h2>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              {AUDIENCE.map((d) => {
                const Icon = d.icon;
                return (
                  <div key={d.title} className="glass p-5">
                    <Icon className="w-7 h-7 text-(--color-cyan) mb-3" />
                    <h3 className="font-display font-semibold text-base mb-2">
                      {d.title}
                    </h3>
                    <p className="text-sm text-(--color-muted) leading-relaxed">
                      {d.body}
                    </p>
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
                Roles this programme prepares you for.
              </h2>
              <p className="text-(--color-muted) mt-4">
                Singapore is a recognised regional hub for cyber security and
                technology, and AI-augmented security skills are in growing demand
                across the sector.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-4">
              {CAREERS.map((c) => {
                const Icon = c.icon;
                return (
                  <div
                    key={c.title}
                    className="glass card-hover p-6 relative overflow-hidden"
                  >
                    <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-(--color-cyan) to-transparent" />
                    <Icon className="w-7 h-7 text-(--color-cyan) mb-3" />
                    <h3 className="font-display font-bold text-lg mb-2">{c.title}</h3>
                    <p className="text-sm text-(--color-muted) leading-relaxed">
                      {c.body}
                    </p>
                  </div>
                );
              })}
            </div>
          </Container>
        </section>

        {/* TOOLS & SKILLS */}
        <section className="relative py-10">
          <Container>
            <div className="max-w-3xl mb-8">
              <div className="kicker mb-3">[ TOOLS & SKILLS ]</div>
              <h2 className="font-display text-[clamp(1.75rem,3.5vw,2.5rem)] font-extrabold leading-tight">
                Practical, vendor-neutral{" "}
                <span className="gradient-text">tooling</span>.
              </h2>
              <p className="text-(--color-muted) mt-4">
                You will work with widely-used, transferable tools and concepts rather
                than being locked into any single vendor or paid platform.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              {TOOLS.map((t) => (
                <span
                  key={t}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg glass text-sm text-white/85"
                >
                  <HiCommandLine className="w-4 h-4 text-(--color-cyan)" />
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
              <div className="kicker mb-3">[ FAQ FOR INTERNATIONAL STUDENTS ]</div>
              <h2 className="font-display text-[clamp(1.75rem,3.5vw,2.5rem)] font-extrabold leading-tight">
                Common questions before you apply.
              </h2>
            </div>
            <div className="space-y-3">
              {FAQ.map((f) => (
                <details
                  key={f.q}
                  className="glass p-5 group [&_summary::-webkit-details-marker]:hidden"
                >
                  <summary className="cursor-pointer flex justify-between items-center gap-4">
                    <span className="font-display font-semibold text-base text-white">
                      {f.q}
                    </span>
                    <span className="text-(--color-cyan) font-mono text-lg transition group-open:rotate-45">
                      +
                    </span>
                  </summary>
                  <p className="text-sm text-(--color-muted) leading-relaxed mt-3">
                    {f.a}
                  </p>
                </details>
              ))}
            </div>
          </Container>
        </section>

        {/* FINAL CTA / ENQUIRE */}
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
              <div className="kicker mb-3">[ ENQUIRE NOW ]</div>
              <h2 className="font-display text-[clamp(2rem,4.5vw,3rem)] font-extrabold leading-[1.05] mb-4">
                Ready to start?{" "}
                <span className="gradient-text">Talk to a course advisor.</span>
              </h2>
              <p className="text-(--color-muted) text-lg">
                Tell us your background and what you want to achieve. We&apos;ll send the
                latest intake dates, the current fee schedule, and guidance on entry
                requirements and study pathways for international students.
              </p>
            </div>
            <div className="flex flex-wrap justify-center gap-3">
              <Link href="/contact" className="btn-primary">
                Talk to a course advisor →
              </Link>
              <Link
                href="/courses"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-lg border border-white/15 text-white/85 hover:border-(--color-cyan)/50 hover:text-(--color-cyan) transition"
              >
                See all courses
              </Link>
              <Link
                href="/courses/advanced-certificate-in-cyber-security"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-lg border border-white/15 text-white/85 hover:border-(--color-cyan)/50 hover:text-(--color-cyan) transition"
              >
                Prefer pure cyber security?
              </Link>
            </div>
            <p className="mt-6 flex items-center justify-center gap-2 text-center text-xs text-(--color-muted) font-mono">
              <HiCheckBadge className="w-4 h-4 text-(--color-green)" />
              Advanced Certificate · awarded by Tertiary Infotech Academy, a Singapore
              Private Education Institution
            </p>
            <p className="mt-2 flex items-center justify-center gap-2 text-center text-xs text-(--color-muted) font-mono">
              <HiSparkles className="w-4 h-4 text-(--color-cyan)" />
              Onsite at Woods Square Tower 1, Woodlands, Singapore
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
