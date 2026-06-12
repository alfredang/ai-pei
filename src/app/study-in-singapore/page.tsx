import type { Metadata } from "next";
import Link from "next/link";
import {
  HiChatBubbleLeftRight,
  HiClipboardDocumentCheck,
  HiPaperAirplane,
  HiAcademicCap,
  HiUserGroup,
  HiCheckBadge,
  HiBolt,
  HiShieldCheck,
  HiCpuChip,
  HiCube,
} from "react-icons/hi2";
import { Container } from "@/components/layout/Container";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { InternationalStudentSupport } from "@/components/sections/InternationalStudentSupport";
import { ContactForm } from "@/components/sections/ContactForm";

const SITE_URL = "https://www.tertiaryinfotech.edu.sg";
const PAGE_URL = `${SITE_URL}/study-in-singapore`;

export const metadata: Metadata = {
  title: "Study AI, Cyber Security & Blockchain in Singapore — International Students",
  description:
    "Study in Singapore as an international student: short 3–6 month Advanced Certificate courses in AI, Cyber Security and Blockchain at Tertiary Infotech Academy. We assist with Student Pass, accommodation, a Singapore tour and networking.",
  keywords:
    "study in Singapore international students, Student Pass Singapore course, short certificate course Singapore, study cyber security in Singapore, study AI in Singapore, study blockchain Singapore, 3 month certificate Singapore, PEI Singapore international students",
  alternates: { canonical: PAGE_URL },
  openGraph: {
    type: "website",
    locale: "en_SG",
    url: PAGE_URL,
    title: "Study AI, Cyber Security & Blockchain in Singapore — International Students",
    description:
      "Short 3–6 month Advanced Certificate courses in AI, Cyber Security and Blockchain — with Student Pass, accommodation, Singapore tour and networking support for foreign students.",
    siteName: "Tertiary Infotech Academy",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Study in Singapore — Tertiary Infotech Academy" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Study AI, Cyber Security & Blockchain in Singapore — International Students",
    description:
      "Short 3–6 month Advanced Certificate courses for international students — full Student Pass, accommodation and settling-in support.",
    images: ["/opengraph-image"],
  },
};

const COURSES = [
  {
    icon: HiShieldCheck,
    href: "/courses/advanced-certificate-in-cyber-security",
    tag: "Cyber Security",
    title: "Advanced Certificate in Cyber Security",
    body: "Stackable CompTIA modules — A+, Security+, Linux+, CySA+ / PenTest+.",
  },
  {
    icon: HiCpuChip,
    href: "/advanced-certificate-in-ai-security-analyst",
    tag: "AI + Security",
    title: "Advanced Certificate in AI Security Analyst",
    body: "Defend systems with AI and secure AI/LLM systems themselves.",
  },
  {
    icon: HiCpuChip,
    href: "/advanced-certificate-in-agentic-ai-coding",
    tag: "AI Engineering",
    title: "Advanced Certificate in Agentic AI Coding & Architecting",
    body: "Design, build and deploy autonomous AI agents and agentic systems.",
  },
  {
    icon: HiCube,
    href: "/advanced-certificate-in-blockchain",
    tag: "Blockchain / Web3",
    title: "Advanced Certificate in Blockchain",
    body: "Smart contracts, DApps and Web3 — Solidity, Ethereum/EVM and security.",
  },
];

const STEPS = [
  {
    icon: HiChatBubbleLeftRight,
    title: "Enquire & get advice",
    body: "Tell us your background and goals. Our higher-education consultants recommend the right Advanced Certificate and pathway — free.",
  },
  {
    icon: HiClipboardDocumentCheck,
    title: "Apply for your Student Pass",
    body: "We guide your ICA Student's Pass application end-to-end — eligibility, documents and submission.",
  },
  {
    icon: HiPaperAirplane,
    title: "Arrive & settle in",
    body: "We help with accommodation, airport arrival and logistics — plus a complimentary one-day tour of Singapore to get you oriented.",
  },
  {
    icon: HiAcademicCap,
    title: "Study in 3–6 months",
    body: "Complete a hands-on, industry-recognised Advanced Certificate in AI, Cyber Security or Blockchain — fast.",
  },
  {
    icon: HiUserGroup,
    title: "Network & grow",
    body: "Join social and industry-networking activities, build connections, and plan your next step in Singapore's tech sector.",
  },
];

const FAQ = [
  {
    q: "Can international students study at Tertiary Infotech Academy?",
    a: "Yes. We are a registered Private Education Institution (PEI) in Singapore and welcome international students. Our Advanced Certificate courses in AI, Cyber Security and Blockchain are open to foreign students, and we assist with the Student Pass application.",
  },
  {
    q: "How long are the courses?",
    a: "Our Advanced Certificate courses are short and focused — typically completed in 3 to 6 months. That makes them a fast, affordable way to gain industry-recognised tech skills compared with a multi-year degree.",
  },
  {
    q: "Do you help with the Student Pass?",
    a: "Yes. We guide you through the Immigration & Checkpoints Authority (ICA) Student's Pass application — checking eligibility, preparing documents and submitting the application — so you can study in Singapore legally and smoothly.",
  },
  {
    q: "Do you help with accommodation and arrival?",
    a: "Yes. We assist with accommodation options and arrival logistics, and we run a complimentary one-day Singapore tour to help you settle in before classes start.",
  },
  {
    q: "What are the fees and entry requirements?",
    a: "Entry requirements and fees vary by course and intake. Enquire and our consultants will send you the latest fee schedule, intake dates and eligibility details for your chosen Advanced Certificate.",
  },
  {
    q: "What can I do after the course?",
    a: "Graduates pursue roles such as Cyber Security Analyst, AI Engineer, AI Security Analyst, Blockchain Developer and more. Our consultants advise on career and further-study pathways in Singapore.",
  },
];

const webPageLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Study AI, Cyber Security & Blockchain in Singapore — International Students",
  url: PAGE_URL,
  inLanguage: "en",
  description:
    "Short 3–6 month Advanced Certificate courses in AI, Cyber Security and Blockchain for international students, with Student Pass, accommodation, Singapore tour and networking support.",
  publisher: {
    "@type": "EducationalOrganization",
    name: "Tertiary Infotech Academy",
    url: SITE_URL,
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
    { "@type": "ListItem", position: 3, name: "Study in Singapore", item: PAGE_URL },
  ],
};

export default function StudyInSingaporePage() {
  return (
    <>
      <Navbar />
      <main>
        {/* HERO */}
        <section className="relative py-10 md:py-14 overflow-hidden">
          <div
            className="glow-blob"
            style={{ top: "-10%", left: "-5%", width: 520, height: 520, background: "radial-gradient(circle, #5C00E5 0%, transparent 70%)" }}
          />
          <div
            className="glow-blob"
            style={{ top: "20%", right: "-10%", width: 480, height: 480, background: "radial-gradient(circle, rgba(89,235,253,0.5) 0%, transparent 70%)" }}
          />
          <Container>
            <div className="grid lg:grid-cols-12 gap-8 items-start relative">
              <div className="lg:col-span-7">
                <div className="kicker mb-4">[ INTERNATIONAL STUDENTS · SINGAPORE ]</div>
                <h1 className="font-display text-[clamp(2.25rem,5.2vw,3.75rem)] font-extrabold leading-[1.04] mb-5">
                  Study <span className="gradient-text">AI, Cyber Security &amp; Blockchain</span> in Singapore.
                </h1>
                <p className="text-(--color-muted) text-lg max-w-2xl mb-6">
                  Short <strong className="text-white">3–6 month Advanced Certificate</strong> courses
                  at Tertiary Infotech Academy — a registered Singapore Private Education Institution.
                  We assist foreign students with the <strong className="text-white">Student Pass</strong>,
                  accommodation, a one-day Singapore tour and networking. Study fast, settle in easy.
                </p>
                <div className="flex flex-wrap items-center gap-3 mb-6">
                  <span className="px-3 py-1.5 rounded-full text-xs font-mono bg-(--color-cyan)/10 text-(--color-cyan) border border-(--color-cyan)/30">
                    <HiBolt className="inline w-3.5 h-3.5 mr-1 -mt-0.5" />3–6 months
                  </span>
                  <span className="px-3 py-1.5 rounded-full text-xs font-mono bg-(--color-purple)/15 text-(--color-purple-light) border border-(--color-purple)/40">
                    Student Pass assistance
                  </span>
                  <span className="px-3 py-1.5 rounded-full text-xs font-mono bg-(--color-amber)/10 text-(--color-amber) border border-(--color-amber)/30">
                    Accommodation &amp; tour
                  </span>
                </div>
                <div className="flex flex-wrap gap-3">
                  <a href="#enquire" className="btn-primary">
                    Talk to a course advisor →
                  </a>
                  <Link
                    href="#courses"
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-lg border border-white/15 text-white/85 hover:border-(--color-cyan)/50 hover:text-(--color-cyan) transition"
                  >
                    See the courses
                  </Link>
                </div>
              </div>
              <div className="lg:col-span-5 lg:sticky lg:top-24">
                <div id="enquire" className="scroll-mt-24">
                  <div className="kicker mb-3">[ START HERE ]</div>
                  <ContactForm
                    source="study-in-singapore"
                    courseName="Study in Singapore enquiry"
                    heading={
                      <>
                        Get your <span className="gradient-text">free study-in-Singapore</span> consultation
                      </>
                    }
                  />
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* INTERNATIONAL STUDENT SUPPORT — the 6 benefits */}
        <InternationalStudentSupport />

        {/* COURSES */}
        <section id="courses" className="relative py-12 scroll-mt-20">
          <Container>
            <div className="max-w-3xl mb-8">
              <div className="kicker mb-3">[ CHOOSE YOUR ADVANCED CERTIFICATE ]</div>
              <h2 className="font-display text-[clamp(1.75rem,3.5vw,2.5rem)] font-extrabold leading-tight">
                Three high-demand fields. One <span className="gradient-text-warm">fast pathway</span>.
              </h2>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              {COURSES.map((c) => {
                const Icon = c.icon;
                return (
                  <Link key={c.href} href={c.href} className="glass card-hover p-6 group flex gap-4">
                    <Icon className="w-8 h-8 text-(--color-cyan) shrink-0" />
                    <div>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold text-(--color-cyan) border border-(--color-cyan)/40 bg-(--color-cyan)/10">
                        {c.tag}
                      </span>
                      <h3 className="font-display font-bold text-lg mt-2 mb-1.5 group-hover:text-(--color-cyan) transition">
                        {c.title}
                      </h3>
                      <p className="text-sm text-(--color-muted) leading-relaxed">{c.body}</p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </Container>
        </section>

        {/* HOW IT WORKS */}
        <section className="relative py-12">
          <Container>
            <div className="max-w-3xl mb-10">
              <div className="kicker mb-3">[ HOW IT WORKS ]</div>
              <h2 className="font-display text-[clamp(1.75rem,3.5vw,2.5rem)] font-extrabold leading-tight">
                From enquiry to graduation — <span className="gradient-text">we&apos;re with you</span>.
              </h2>
            </div>
            <ol className="relative pl-8 space-y-6 before:absolute before:left-3 before:top-2 before:bottom-2 before:w-px before:bg-gradient-to-b before:from-(--color-cyan)/60 before:via-(--color-purple)/60 before:to-(--color-green)/60">
              {STEPS.map((s, i) => {
                const Icon = s.icon;
                return (
                  <li key={s.title} className="relative">
                    <div className="absolute -left-8 top-1 w-7 h-7 rounded-full glass border border-(--color-cyan)/40 flex items-center justify-center">
                      <Icon className="w-3.5 h-3.5 text-(--color-cyan)" />
                    </div>
                    <div className="glass p-5">
                      <div className="flex items-center gap-2 mb-1.5">
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-(--color-cyan)/10 text-(--color-cyan)">
                          Step {i + 1}
                        </span>
                      </div>
                      <h3 className="font-display font-bold text-base mb-1.5">{s.title}</h3>
                      <p className="text-sm text-(--color-muted) leading-relaxed">{s.body}</p>
                    </div>
                  </li>
                );
              })}
            </ol>
          </Container>
        </section>

        {/* FAQ */}
        <section className="relative py-12">
          <Container className="max-w-4xl">
            <div className="mb-8">
              <div className="kicker mb-3">[ FAQ ]</div>
              <h2 className="font-display text-[clamp(1.75rem,3.5vw,2.5rem)] font-extrabold leading-tight">
                Studying in Singapore — your questions answered.
              </h2>
            </div>
            <div className="space-y-3">
              {FAQ.map((f) => (
                <details key={f.q} className="glass p-5 group [&_summary::-webkit-details-marker]:hidden">
                  <summary className="cursor-pointer flex justify-between items-center gap-4">
                    <span className="font-display font-semibold text-base text-white">{f.q}</span>
                    <span className="text-(--color-cyan) font-mono text-lg transition group-open:rotate-45">+</span>
                  </summary>
                  <p className="text-sm text-(--color-muted) leading-relaxed mt-3">{f.a}</p>
                </details>
              ))}
            </div>
          </Container>
        </section>

        {/* FINAL CTA FORM */}
        <ContactForm
          source="study-in-singapore-footer"
          courseName="Study in Singapore enquiry"
          heading={
            <>
              Ready to <span className="gradient-text">study in Singapore</span>?
            </>
          }
        />
      </main>
      <Footer />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
    </>
  );
}
