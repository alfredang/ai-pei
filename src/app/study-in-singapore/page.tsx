import type { Metadata } from "next";
import Link from "next/link";
import {
  HiChatBubbleLeftRight,
  HiClipboardDocumentCheck,
  HiAcademicCap,
  HiUserGroup,
  HiCheckBadge,
  HiBolt,
  HiShieldCheck,
  HiCpuChip,
  HiCube,
  HiSparkles,
  HiComputerDesktop,
} from "react-icons/hi2";
import { Container } from "@/components/layout/Container";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { InternationalStudentSupport } from "@/components/sections/InternationalStudentSupport";
import { ContactForm } from "@/components/sections/ContactForm";
import { htmlPath } from "@/lib/html-url";

const SITE_URL = "https://www.tertiaryinfotech.edu.sg";
const PAGE_URL = `${SITE_URL}/study-in-singapore.html`;
// Primary keyword: "Higher Education in Singapore". Pass/visa wording follows
// ICA's published rules — keep it that way (links below).
const TITLE = "Higher Education in Singapore for International Students";
const DESCRIPTION =
  "Higher education in Singapore, live online: earn an Advanced Certificate in AI, Cyber Security, Blockchain or Quantum from a Singapore PEI. Enquire today.";
const ICA_STUDENT_PASS =
  "https://www.ica.gov.sg/information-and-e-services/long-term-visit-and-study/student-s-pass/student's-pass-application-renewal";
const ICA_VISA = "https://www.ica.gov.sg/information-and-e-services/entry-and-departure/entering-singapore/visa-guidelines";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords:
    "higher education in Singapore, higher education Singapore international students, Singapore private education institution, online advanced certificate Singapore, study in Singapore international students, short certificate course Singapore, study cyber security in Singapore, study AI in Singapore, study blockchain Singapore, 3 month certificate Singapore, PEI Singapore international students",
  alternates: { canonical: PAGE_URL, languages: { "en-SG": PAGE_URL, "x-default": PAGE_URL } },
  openGraph: {
    type: "website",
    locale: "en_SG",
    url: PAGE_URL,
    title: `${TITLE} | Tertiary Infotech Academy`,
    description: DESCRIPTION,
    siteName: "Tertiary Infotech Academy",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Study in Singapore — Tertiary Infotech Academy" }],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: ["/opengraph-image"],
  },
};

const COURSES = [
  {
    icon: HiCpuChip,
    href: "/advanced-certificate-in-artificial-intelligence",
    tag: "Artificial Intelligence",
    title: "Advanced Certificate in Artificial Intelligence",
    body: "Five AI programmes — AI security, agentic AI, audit, risk and governance.",
  },
  {
    icon: HiShieldCheck,
    href: "/courses/advanced-certificate-in-cyber-security",
    tag: "Cyber Security",
    title: "Advanced Certificate in Cyber Security",
    body: "Stackable CompTIA modules — A+, Security+, Linux+, CySA+ / PenTest+.",
  },
  {
    icon: HiCube,
    href: "/advanced-certificate-in-blockchain",
    tag: "Blockchain",
    title: "Advanced Certificate in Blockchain",
    body: "Enterprise blockchain architecture and digital asset compliance.",
  },
  {
    icon: HiSparkles,
    href: "/courses/advanced-certificate-in-applied-quantum-computing-and-qiskit-programming",
    tag: "Quantum Computing",
    title: "Advanced Certificate in Quantum Computing",
    body: "Program quantum circuits in Qiskit and run them on IBM Quantum systems.",
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
    title: "Apply & enrol",
    body: "Submit your application and certificates. Our admissions team confirms your eligibility and your intake date.",
  },
  {
    icon: HiComputerDesktop,
    title: "Join live online classes",
    body: "Log in to live virtual classes in English, three evenings a week (Singapore time), from wherever you are — no relocation needed.",
  },
  {
    icon: HiAcademicCap,
    title: "Graduate in months, not years",
    body: "Complete a hands-on, industry-recognised Advanced Certificate in AI, Cyber Security, Blockchain or Quantum Computing — typically in a few months.",
  },
  {
    icon: HiUserGroup,
    title: "Network & grow",
    body: "Join social and industry-networking activities, build connections, and plan your next step in Singapore's tech sector.",
  },
];

const FAQ = [
  {
    q: "What are the options for higher education in Singapore?",
    a: "Singapore's higher education system includes autonomous universities such as NUS and NTU, polytechnics, the Institute of Technical Education (ITE) and Private Education Institutions (PEIs) registered with the Skills and Workforce Development Agency (SWDA). PEIs like Tertiary Infotech Academy offer shorter, career-focused qualifications such as Advanced Certificates.",
  },
  {
    q: "Can international students study at Tertiary Infotech Academy?",
    a: "Yes. We are a registered Private Education Institution in Singapore and welcome learners from any country. Our Advanced Certificates in AI, Cyber Security, Blockchain and Quantum Computing are delivered primarily as live online classes in English, so you can study from your home country.",
  },
  {
    q: "Are the courses online?",
    a: "Yes. Our programmes are delivered primarily as live online classes — real trainers, real time — three evenings a week, 7:00 PM to 10:00 PM Singapore time. You need a reliable internet connection and a computer.",
  },
  {
    q: "Do I need a Student's Pass?",
    a: "No. Under ICA rules, a Student's Pass is only issued for approved full-time courses — not part-time, evening or weekend courses. Our programmes are part-time and delivered live online, so they do not lead to a Student's Pass, and you do not need one to study online from overseas.",
  },
  {
    q: "Can I study in Singapore on a Short-Term Visit Pass or a visa?",
    a: "An entry visa is only pre-entry permission, needed by nationals of certain countries; at the checkpoint, visitors are given a Short-Term Visit Pass. ICA allows study on a Short-Term Visit Pass only for a complete, stand-alone course finished within 30 days (or the pass validity, if shorter) — courses with multiple modules require a Student's Pass. Our Advanced Certificates have several modules, so take them live online from home instead.",
  },
  {
    q: "How long are the courses?",
    a: "Most Advanced Certificates take about 2.5 to 4 months part-time. That makes them a fast, affordable way to gain industry-recognised tech skills compared with a multi-year degree.",
  },
  {
    q: "What are the fees and entry requirements?",
    a: "Fees are charged per module and are shown on each course page. Most programmes need you to be at least 21 with GCE 'O' Level passes (or equivalent); some ask for a diploma or work experience. Enquire and our consultants will confirm the details for your chosen Advanced Certificate.",
  },
  {
    q: "What can I do after the course?",
    a: "Graduates pursue roles such as Cyber Security Analyst, AI Engineer, AI Security Analyst, AI Auditor, Blockchain Compliance Analyst and Quantum Software Developer. Our consultants advise on career and further-study pathways.",
  },
];

const webPageLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: TITLE,
  url: PAGE_URL,
  inLanguage: "en-SG",
  description: DESCRIPTION,
  about: { "@type": "Thing", name: "Higher education in Singapore" },
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
    { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
    { "@type": "ListItem", position: 2, name: "Courses", item: `${SITE_URL}/courses.html` },
    { "@type": "ListItem", position: 3, name: "Higher Education in Singapore", item: PAGE_URL },
  ],
};

export default function StudyInSingaporePage() {
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
          <div
            className="glow-blob"
            style={{ top: "20%", right: "-10%", width: 480, height: 480, background: "radial-gradient(circle, rgba(60,224,124,0.5) 0%, transparent 70%)" }}
          />
          <Container>
            <div className="grid lg:grid-cols-12 gap-8 items-start relative">
              <div className="lg:col-span-7">
                <div className="kicker mb-4">[ INTERNATIONAL STUDENTS · LIVE ONLINE ]</div>
                <h1 className="font-display text-[clamp(2.25rem,5.2vw,3.75rem)] font-extrabold leading-[1.04] mb-5">
                  Higher Education in Singapore — <span className="gradient-text">Live Online</span>
                </h1>
                <p className="text-(--color-muted) text-lg max-w-2xl mb-6">
                  Earn a <strong className="text-white">Singapore Advanced Certificate</strong> in AI,
                  Cyber Security, Blockchain or Quantum Computing from Tertiary Infotech Academy — a
                  registered Singapore Private Education Institution. Classes are{" "}
                  <strong className="text-white">live online</strong> in English, three evenings a week,
                  so you can study from your home country without relocating.
                </p>
                <div className="flex flex-wrap items-center gap-3 mb-6">
                  <span className="px-3 py-1.5 rounded-full text-xs font-mono bg-(--color-cyan)/10 text-(--color-cyan) border border-(--color-cyan)/30">
                    <HiComputerDesktop className="inline w-3.5 h-3.5 mr-1 -mt-0.5" />Live online · study from anywhere
                  </span>
                  <span className="px-3 py-1.5 rounded-full text-xs font-mono bg-(--color-purple)/15 text-(--color-purple-light) border border-(--color-purple)/40">
                    <HiBolt className="inline w-3.5 h-3.5 mr-1 -mt-0.5" />Months, not years
                  </span>
                  <span className="px-3 py-1.5 rounded-full text-xs font-mono bg-(--color-amber)/10 text-(--color-amber) border border-(--color-amber)/30">
                    English-taught
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

        {/* HIGHER EDUCATION OVERVIEW */}
        <section className="relative py-12">
          <Container className="max-w-4xl">
            <div className="kicker mb-3">[ HIGHER EDUCATION IN SINGAPORE ]</div>
            <h2 className="font-display text-[clamp(1.75rem,3.5vw,2.5rem)] font-extrabold leading-tight">
              How higher education in Singapore works
            </h2>
            <div className="mt-5 space-y-4 text-(--color-muted) leading-relaxed">
              <p>
                Singapore&apos;s higher education system spans autonomous universities such as NUS and
                NTU, polytechnics, the Institute of Technical Education (ITE), and Private Education
                Institutions (PEIs) registered with the Skills and Workforce Development Agency (SWDA).
                Universities and polytechnics award degrees and diplomas over several years; PEIs also
                offer shorter, career-focused qualifications.
              </p>
              <p>
                Tertiary Infotech Academy is a registered PEI offering{" "}
                <strong className="text-white">Advanced Certificates</strong> in AI, Cyber Security,
                Blockchain and Quantum Computing — stackable programmes of 90 to 150 hours, built around
                hands-on modules and industry tools. They suit graduates, career switchers and working
                professionals who want job-ready skills in months rather than years.
              </p>
            </div>
            <div className="mt-6 glass p-6">
              <h3 className="font-display font-bold text-lg mb-3">Studying from overseas — what ICA&apos;s rules mean for you</h3>
              <ul className="space-y-2 text-sm text-white/80 leading-relaxed list-disc pl-5">
                <li>
                  Our programmes are delivered <strong className="text-white">primarily live online</strong>, so
                  you can study from your home country.
                </li>
                <li>
                  A{" "}
                  <a href={ICA_STUDENT_PASS} target="_blank" rel="noopener" className="text-(--color-cyan) hover:underline">
                    Student&apos;s Pass
                  </a>{" "}
                  is only issued for approved full-time courses. Our programmes are part-time, so they do
                  not lead to a Student&apos;s Pass — and you do not need one to study online.
                </li>
                <li>
                  Visiting Singapore? Check whether you need an{" "}
                  <a href={ICA_VISA} target="_blank" rel="noopener" className="text-(--color-cyan) hover:underline">
                    entry visa
                  </a>
                  . A Short-Term Visit Pass does not allow you to take a multi-module course in Singapore.
                </li>
              </ul>
            </div>
          </Container>
        </section>

        {/* COURSES */}
        <section id="courses" className="relative py-12 scroll-mt-20">
          <Container>
            <div className="max-w-3xl mb-8">
              <div className="kicker mb-3">[ CHOOSE YOUR ADVANCED CERTIFICATE ]</div>
              <h2 className="font-display text-[clamp(1.75rem,3.5vw,2.5rem)] font-extrabold leading-tight">
                Four high-demand fields. One <span className="gradient-text-warm">fast pathway</span>.
              </h2>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              {COURSES.map((c) => {
                const Icon = c.icon;
                return (
                  <Link key={c.href} href={htmlPath(c.href)} className="glass card-hover p-6 group flex gap-4">
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
