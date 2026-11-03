import type { Metadata } from "next";
import Link from "next/link";
import { HiBolt, HiClock, HiSquares2X2, HiArrowRight } from "react-icons/hi2";
import { Container } from "@/components/layout/Container";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ContactForm } from "@/components/sections/ContactForm";
import { KeywordFaqSection } from "@/components/sections/KeywordContent";
import { courseFee } from "@/lib/course-fee";
import { htmlPath } from "@/lib/html-url";
import type { KeywordFaq } from "@/lib/keyword-seo";

// Primary keyword: "Advanced Certificate in Artificial Intelligence in Singapore".
// There is no single AI course of that name — this page is the discipline hub
// for the five AI Advanced Certificates in the catalogue.

const SITE_URL = "https://www.tertiaryinfotech.edu.sg";
const PAGE_URL = `${SITE_URL}/advanced-certificate-in-artificial-intelligence.html`;
const TITLE = "Advanced Certificate in Artificial Intelligence in Singapore";
const DESCRIPTION =
  "Advanced Certificate in Artificial Intelligence in Singapore: five live online AI programmes in security, agentic AI, audit, risk and governance. Enquire today.";
const LAST_UPDATED = "3 November 2026";
const ICA_STUDENT_PASS =
  "https://www.ica.gov.sg/information-and-e-services/long-term-visit-and-study/student-s-pass/student's-pass-application-renewal";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords:
    "Advanced Certificate in Artificial Intelligence in Singapore, advanced certificate in AI Singapore, AI course Singapore, study AI in Singapore, AI certification Singapore, AI course for international students, AI security course, agentic AI course, AI audit certification, AI risk management course",
  alternates: { canonical: PAGE_URL, languages: { "en-SG": PAGE_URL, "x-default": PAGE_URL } },
  openGraph: {
    type: "website",
    locale: "en_SG",
    url: PAGE_URL,
    title: `${TITLE} | Tertiary Infotech Academy`,
    description: DESCRIPTION,
    siteName: "Tertiary Infotech Academy",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: TITLE }],
  },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION, images: ["/opengraph-image"] },
};

// Verified against each course page (Nov 2026). Hours/duration change rarely;
// update here if a course's module plan changes.
const PROGRAMMES = [
  {
    slug: "advanced-certificate-in-ai-security-analyst",
    name: "Advanced Certificate in AI Security Analyst",
    hours: 120,
    duration: "≈ 3.5 months",
    bestFor: "Defending systems with AI and securing AI/LLM systems themselves",
    roles: "AI Security Analyst, AI/ML Security Engineer, SOC Analyst (AI-augmented)",
  },
  {
    slug: "advanced-certificate-in-agentic-ai-coding",
    name: "Advanced Certificate in Agentic AI Coding and Architecting",
    hours: 150,
    duration: "≈ 4 months",
    bestFor: "Designing, building and deploying autonomous AI agents",
    roles: "AI Engineer / AI Agent Developer, AI Solutions Architect, LLM Application Engineer",
  },
  {
    slug: "advanced-certificate-in-ai-audit-and-assurance",
    name: "Advanced Certificate in AI Audit and Assurance",
    hours: 90,
    duration: "≈ 2.5 months",
    bestFor: "Auditing how AI systems are governed, operated and controlled",
    roles: "AI Auditor, AI Assurance Analyst, IT Auditor (AI-focused)",
  },
  {
    slug: "advanced-certificate-in-ai-risk-management",
    name: "Advanced Certificate in AI Risk Management",
    hours: 90,
    duration: "≈ 2.5 months",
    bestFor: "Identifying, assessing and treating risk across the AI life cycle",
    roles: "AI Risk Analyst, AI Risk & Compliance Specialist",
  },
  {
    slug: "advanced-certificate-in-ai-security-and-governance-management",
    name: "Advanced Certificate in AI Security and Governance Management",
    hours: 117,
    duration: "≈ 3.25 months",
    bestFor: "Governing and securing enterprise AI programmes",
    roles: "AI Governance Manager, AI Security Manager",
  },
];

const FROM_FEE = `S${courseFee(3).exclText}`; // shortest programmes run three modules

const FAQS: KeywordFaq[] = [
  {
    q: "What is an Advanced Certificate in Artificial Intelligence in Singapore?",
    a: "It is a career-focused qualification below degree level, awarded by a Singapore Private Education Institution. At Tertiary Infotech Academy, each **Advanced Certificate in Artificial Intelligence** is a stackable programme of 90 to 150 hours, built from modules that each end in an assessment.",
  },
  {
    q: "Which AI programme should I choose?",
    a: "Pick by the role you want. AI Security Analyst and Agentic AI Coding and Architecting suit hands-on technical careers; AI Audit and Assurance, AI Risk Management and AI Security and Governance Management suit audit, risk, compliance and governance careers. Our advisors can help you compare them for free.",
  },
  {
    q: "How long does it take and when are classes?",
    a: "Between about 2.5 and 4 months, part-time. Classes are live online, three evenings a week, 7:00 PM to 10:00 PM Singapore time. You need at least 75% attendance and a pass in every module assessment.",
  },
  {
    q: "What are the entry requirements?",
    a: "Typically you must be at least 21 years old with at least C6 in GCE 'O' Level English and in any three GCE 'O' Level subjects, or equivalent. The Agentic AI programme also asks for a diploma, GCE 'A' Level or relevant work experience, plus basic programming skills. Each course page lists its exact requirements.",
  },
  {
    q: "Can international students take these AI courses?",
    a: "Yes. Every programme is taught in English and delivered live online, so you can study from your home country. Because the courses are part-time, they are not eligible for a Student's Pass — under ICA rules a Student's Pass is only issued for approved full-time courses — and you do not need one to study online from overseas.",
  },
  {
    q: "How much does an Advanced Certificate in AI cost?",
    a: `Fees are charged per module at S$1,800 before GST, so programmes start from ${FROM_FEE} (excl. GST) for three modules. Each course page shows the full fee.`,
  },
];

const breadcrumbLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
    { "@type": "ListItem", position: 2, name: "Courses", item: `${SITE_URL}/courses.html` },
    { "@type": "ListItem", position: 3, name: TITLE, item: PAGE_URL },
  ],
};

const collectionLd = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: TITLE,
  url: PAGE_URL,
  inLanguage: "en-SG",
  description: DESCRIPTION,
  dateModified: "2026-11-03",
  mainEntity: {
    "@type": "ItemList",
    itemListElement: PROGRAMMES.map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "Course",
        name: p.name,
        description: `${p.bestFor}. ${p.hours} hours of live online training.`,
        url: `${SITE_URL}/courses/${p.slug}.html`,
        educationalCredentialAwarded: {
          "@type": "EducationalOccupationalCredential",
          credentialCategory: "Advanced Certificate",
        },
        provider: { "@type": "EducationalOrganization", name: "Tertiary Infotech Academy", url: SITE_URL },
      },
    })),
  },
};

const H2 = "font-display text-[clamp(1.75rem,3.5vw,2.5rem)] font-extrabold leading-tight";

export default function AdvancedCertificateInAIPage() {
  return (
    <>
      <Navbar />
      <main>
        {/* HERO */}
        <section className="relative pt-6 pb-10 md:pt-8 md:pb-14 overflow-hidden">
          <div
            className="glow-blob"
            style={{ top: "-10%", left: "-5%", width: 520, height: 520, background: "radial-gradient(circle, #10B981 0%, transparent 70%)" }}
          />
          <Container>
            <div className="grid lg:grid-cols-12 gap-8 items-start relative">
              <div className="lg:col-span-7">
                <div className="kicker mb-4">[ ARTIFICIAL INTELLIGENCE · SINGAPORE PEI ]</div>
                <h1 className="font-display text-[clamp(2.1rem,4.8vw,3.5rem)] font-extrabold leading-[1.05] mb-5">
                  Advanced Certificate in <span className="gradient-text">Artificial Intelligence</span> in Singapore
                </h1>
                <p className="text-(--color-muted) text-lg max-w-2xl mb-6">
                  Choose from five <strong className="text-white">AI Advanced Certificates</strong> at
                  Tertiary Infotech Academy, a registered Singapore Private Education Institution — from
                  securing AI systems and building AI agents to auditing, risk and governance. Taught in
                  English, live online, three evenings a week.
                </p>
                <div className="flex flex-wrap items-center gap-3 mb-6">
                  <span className="px-3 py-1.5 rounded-full text-xs font-mono bg-(--color-cyan)/10 text-(--color-cyan) border border-(--color-cyan)/30">
                    <HiClock className="inline w-3.5 h-3.5 mr-1 -mt-0.5" />90–150 hours
                  </span>
                  <span className="px-3 py-1.5 rounded-full text-xs font-mono bg-(--color-purple)/15 text-(--color-purple-light) border border-(--color-purple)/40">
                    <HiBolt className="inline w-3.5 h-3.5 mr-1 -mt-0.5" />Live online · 7–10 PM SGT
                  </span>
                  <span className="px-3 py-1.5 rounded-full text-xs font-mono bg-(--color-amber)/10 text-(--color-amber) border border-(--color-amber)/30">
                    <HiSquares2X2 className="inline w-3.5 h-3.5 mr-1 -mt-0.5" />Stackable modules
                  </span>
                </div>
                <div className="flex flex-wrap gap-3">
                  <a href="#enquire" className="btn-primary">
                    Book a free course consultation →
                  </a>
                  <a
                    href="#programmes"
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-lg border border-white/15 text-white/85 hover:border-(--color-cyan)/50 hover:text-(--color-cyan) transition"
                  >
                    Compare the AI programmes
                  </a>
                </div>
                <p className="mt-6 text-xs font-mono text-white/45">Last updated {LAST_UPDATED}</p>
              </div>
              <div className="lg:col-span-5 lg:sticky lg:top-24">
                <div id="enquire" className="scroll-mt-24">
                  <ContactForm
                    source="ai-advanced-certificate-page"
                    heading={
                      <>
                        Find your <span className="gradient-text">AI programme</span>
                      </>
                    }
                  />
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* PROGRAMMES */}
        <section id="programmes" className="relative py-12 scroll-mt-20">
          <Container>
            <div className="max-w-3xl mb-8">
              <div className="kicker mb-3">[ CHOOSE YOUR SPECIALISATION ]</div>
              <h2 className={H2}>
                Five ways to earn an <span className="gradient-text">Advanced Certificate in AI</span>
              </h2>
              <p className="mt-4 text-(--color-muted) leading-relaxed">
                Every programme leads to an Advanced Certificate awarded by Tertiary Infotech Academy.
                Modules stack, so you earn a modular certificate for each one you complete.
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-5">
              {PROGRAMMES.map((p) => (
                <Link
                  key={p.slug}
                  href={htmlPath(`/courses/${p.slug}`)}
                  className="glass card-hover p-6 group flex flex-col"
                >
                  <h3 className="font-display font-bold text-lg leading-snug group-hover:text-(--color-cyan) transition">
                    {p.name}
                  </h3>
                  <p className="mt-2 text-sm text-(--color-muted) leading-relaxed">{p.bestFor}.</p>
                  <dl className="mt-4 grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <dt className="text-[10px] font-mono uppercase tracking-wider text-white/45">Hours</dt>
                      <dd className="text-white">{p.hours} hours</dd>
                    </div>
                    <div>
                      <dt className="text-[10px] font-mono uppercase tracking-wider text-white/45">Duration</dt>
                      <dd className="text-white">{p.duration}</dd>
                    </div>
                  </dl>
                  <p className="mt-4 text-xs text-white/60 leading-relaxed flex-1">
                    <span className="font-mono uppercase tracking-wider text-white/45">Roles · </span>
                    {p.roles}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-(--color-cyan)">
                    View course, fees &amp; modules <HiArrowRight className="w-4 h-4" />
                  </span>
                </Link>
              ))}
            </div>
          </Container>
        </section>

        {/* WHY SINGAPORE */}
        <section className="relative py-12">
          <Container className="max-w-4xl">
            <div className="kicker mb-3">[ WHY SINGAPORE ]</div>
            <h2 className={H2}>Why study artificial intelligence in Singapore</h2>
            <div className="mt-5 space-y-4 text-(--color-muted) leading-relaxed">
              <p>
                Singapore treats AI as a national priority. Since launching its{" "}
                <a
                  href="https://www.smartnation.gov.sg/initiatives/national-ai-strategy/"
                  target="_blank"
                  rel="noopener"
                  className="text-(--color-cyan) hover:underline"
                >
                  National AI Strategy 2.0
                </a>{" "}
                in December 2023, the government has invested in AI talent, research and adoption across
                finance, healthcare, logistics and the public sector.
              </p>
              <p>
                An <strong className="text-white">Advanced Certificate in Artificial Intelligence</strong>{" "}
                from a Singapore institution gives you focused, applied skills in months rather than
                years — and a credential from one of Asia&apos;s leading technology hubs, taught entirely in
                English.
              </p>
            </div>
          </Container>
        </section>

        {/* HOW IT WORKS + ADMISSION */}
        <section className="relative py-12">
          <Container>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="glass p-6">
                <h2 className="font-display font-extrabold text-xl mb-4">How the programmes run</h2>
                <ul className="space-y-3 text-sm text-white/80 leading-relaxed list-disc pl-5">
                  <li>Live online virtual classes — 3 evenings a week, 7:00 PM to 10:00 PM Singapore time</li>
                  <li>Part-time over about 2.5 to 4 months (90–150 hours)</li>
                  <li>Each module runs 10 sessions and ends with an assessment</li>
                  <li>At least 75% attendance and a pass in every module assessment to graduate</li>
                  <li>Fees from {FROM_FEE} (excl. GST), charged per module</li>
                </ul>
              </div>
              <div className="glass p-6">
                <h2 className="font-display font-extrabold text-xl mb-4">Admission &amp; eligibility</h2>
                <ul className="space-y-3 text-sm text-white/80 leading-relaxed list-disc pl-5">
                  <li>At least 21 years old</li>
                  <li>At least C6 in GCE &apos;O&apos; Level English and in any three subjects, or equivalent</li>
                  <li>Agentic AI also requires a diploma, &apos;A&apos; Level or relevant work experience, and basic programming</li>
                  <li>Open to applicants from any country — all teaching is in English</li>
                </ul>
              </div>
            </div>
          </Container>
        </section>

        {/* STUDYING FROM OVERSEAS — kept in line with ICA rules */}
        <section className="relative py-12">
          <Container className="max-w-4xl">
            <div className="kicker mb-3">[ INTERNATIONAL STUDENTS ]</div>
            <h2 className={H2}>Studying from overseas</h2>
            <div className="mt-5 space-y-4 text-(--color-muted) leading-relaxed">
              <p>
                Our AI programmes are part-time and delivered live online, so you can complete them from
                your home country without relocating. Under the rules of Singapore&apos;s Immigration &amp;
                Checkpoints Authority (ICA), a{" "}
                <a href={ICA_STUDENT_PASS} target="_blank" rel="noopener" className="text-(--color-cyan) hover:underline">
                  Student&apos;s Pass
                </a>{" "}
                is only issued for approved full-time courses — not part-time, evening or weekend courses —
                so these programmes do not lead to a Student&apos;s Pass, and you do not need one to study
                online.
              </p>
              <p>
                Already living in Singapore on a valid pass? Talk to our admissions team about joining
                classes in person; whether you may study depends on the conditions of your pass.
              </p>
            </div>
          </Container>
        </section>

        <KeywordFaqSection heading="**Advanced Certificate in AI** — Frequently Asked Questions" faqs={FAQS} />

        {/* RELATED */}
        <section className="relative py-12">
          <Container className="max-w-4xl text-center">
            <h2 className="font-display font-extrabold text-xl mb-5">Explore other future-tech pathways</h2>
            <div className="flex flex-wrap justify-center gap-3 text-sm">
              <Link href={htmlPath("/courses/advanced-certificate-in-cyber-security")} className="px-4 py-2 rounded-full border border-white/15 hover:border-(--color-cyan)/50 hover:text-(--color-cyan) transition">
                Advanced Certificate in Cyber Security
              </Link>
              <Link href={htmlPath("/advanced-certificate-in-blockchain")} className="px-4 py-2 rounded-full border border-white/15 hover:border-(--color-cyan)/50 hover:text-(--color-cyan) transition">
                Advanced Certificate in Blockchain
              </Link>
              <Link href={htmlPath("/courses/advanced-certificate-in-applied-quantum-computing-and-qiskit-programming")} className="px-4 py-2 rounded-full border border-white/15 hover:border-(--color-cyan)/50 hover:text-(--color-cyan) transition">
                Advanced Certificate in Quantum Computing
              </Link>
              <Link href={htmlPath("/study-in-singapore")} className="px-4 py-2 rounded-full border border-white/15 hover:border-(--color-cyan)/50 hover:text-(--color-cyan) transition">
                Higher education in Singapore
              </Link>
            </div>
          </Container>
        </section>
      </main>
      <Footer />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
    </>
  );
}
