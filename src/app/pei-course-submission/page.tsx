import type { Metadata } from "next";
import Link from "next/link";
import {
  HiClipboardDocumentList,
  HiArrowRightOnRectangle,
  HiCursorArrowRays,
  HiPencilSquare,
  HiPaperAirplane,
  HiClock,
  HiCheckBadge,
  HiDocumentText,
  HiAcademicCap,
  HiGlobeAlt,
  HiUserGroup,
  HiBookOpen,
  HiExclamationTriangle,
} from "react-icons/hi2";
import { Container } from "@/components/layout/Container";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

const SITE_URL = "https://www.tertiaryinfotech.edu.sg";
const PAGE_URL = `${SITE_URL}/pei-course-submission`;

export const metadata: Metadata = {
  title: "PEI Course Submission Singapore — How to Register a New Course with SSG",
  description:
    "Step-by-step guide for registered Private Education Institutions (PEIs) to submit a new course via GoBusiness Licensing. Learn the 'Offer a New Course' process, required documents, who submits, and SSG course permission.",
  keywords:
    "PEI course submission, register new PEI course Singapore, offer a new course GoBusiness, SSG course permission, CPE course registration, Private Education Institution new course, course permission letter SSG",
  alternates: { canonical: PAGE_URL },
  openGraph: {
    type: "article",
    locale: "en_SG",
    url: PAGE_URL,
    title: "PEI Course Submission Singapore — How to Register a New Course with SSG",
    description:
      "A practical, step-by-step guide for PEIs to register a new course via GoBusiness Licensing — the 'Offer a New Course' application, required documents, and SSG course permission.",
    siteName: "Tertiary Infotech Academy",
    images: [{ url: "/icon-192.png", width: 192, height: 192, alt: "PEI Course Submission — Tertiary Infotech Academy" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "PEI Course Submission Singapore — How to Register a New Course with SSG",
    description:
      "Step-by-step guide for PEIs to submit a new course via GoBusiness Licensing — application type, documents, and SSG course permission.",
    images: ["/icon-192.png"],
  },
};

const STEPS = [
  {
    id: "prepare",
    title: "Prepare your documents",
    icon: HiClipboardDocumentList,
    accent: "cyan" as const,
    body:
      "Compile every supporting document before you start — course write-up, sample certificate, and any developer or university approvals. The submission form expects these as uploads.",
  },
  {
    id: "login",
    title: "Log in to GoBusiness Licensing",
    icon: HiArrowRightOnRectangle,
    accent: "blue" as const,
    body:
      "Sign in to GoBusiness Licensing with your PEI's CorpPass. The submission must be made by the PEI Manager (or a CorpPass user authorised for the PEI), tied to your registered entity.",
  },
  {
    id: "select",
    title: "Select “Offer a New Course”",
    icon: HiCursorArrowRays,
    accent: "purple" as const,
    body:
      "Open your existing Registration of Private Education Institutions and start an update/notification application. Choose the “Offer a New Course” application type to seek SSG's permission.",
  },
  {
    id: "complete",
    title: "Complete the course form",
    icon: HiPencilSquare,
    accent: "amber" as const,
    body:
      "Fill in the course details — title, level, duration, mode of delivery, learning outcomes and assessment — and upload the required documents using SSG's templates.",
  },
  {
    id: "submit",
    title: "Submit the application",
    icon: HiPaperAirplane,
    accent: "cyan" as const,
    body:
      "Submit through GoBusiness. The application moves to Processing while SSG reviews it. Confirm any fee shown at the submission step before you pay.",
  },
  {
    id: "review",
    title: "Await SSG review",
    icon: HiClock,
    accent: "blue" as const,
    body:
      "SSG evaluates the course against the Enhanced Registration Framework. They may raise queries — respond promptly to avoid delays.",
  },
  {
    id: "permission",
    title: "Receive Course Permission Letter",
    icon: HiCheckBadge,
    accent: "green" as const,
    body:
      "Once permitted, you receive a Course Permission Letter. Only then may you advertise, offer or deliver the course. A PEI must have at least one SSG-permitted course at all times.",
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

const DOCUMENTS = [
  {
    icon: HiDocumentText,
    title: "Course write-up",
    body:
      "Using SSG's template. There is a specific template for External Degree Programmes (EDPs) and another for other courses.",
  },
  {
    icon: HiAcademicCap,
    title: "Sample certificate",
    body: "A sample of the certificate or award the learner receives on completion of the course.",
  },
  {
    icon: HiUserGroup,
    title: "External course developer approval",
    body: "If the course is not developed in-house, the developer's approval to deliver it.",
  },
  {
    icon: HiBookOpen,
    title: "University approval (EDPs)",
    body:
      "For External Degree Programmes — the university approval letter plus the university website link or course handbook.",
  },
  {
    icon: HiDocumentText,
    title: "Articulation agreement",
    body: "Where the course articulates into a further qualification, the relevant articulation agreement.",
  },
  {
    icon: HiGlobeAlt,
    title: "E-learning checklist",
    body:
      "For online courses, SSG's e-learning information checklist. Industrial attachment documentation is required where applicable.",
  },
];

const FAQ = [
  {
    q: "Who can submit a new course application?",
    a: "The application must be submitted by the PEI Manager, or a CorpPass user authorised to transact on behalf of the PEI, through GoBusiness Licensing. It is tied to your registered PEI entity.",
  },
  {
    q: "Which application type do I select?",
    a: "Open your existing 'Registration of Private Education Institutions' and start an update/notification application, then choose 'Offer a New Course'. This is the application that seeks SSG's permission for a new course.",
  },
  {
    q: "Can I advertise the course once I submit?",
    a: "No. You must not advertise, offer or deliver the new course until SSG has permitted it and issued a Course Permission Letter. A PEI must have at least one SSG-permitted course at all times.",
  },
  {
    q: "How long does approval take and what does it cost?",
    a: "SSG does not publish a fixed processing time or fee for a new-course application — the fee, if any, is shown at the submission step in GoBusiness. Responding quickly to SSG's queries is the biggest factor in avoiding delays.",
  },
  {
    q: "Do courses delivered overseas need separate permission?",
    a: "Yes. SSG-permitted courses may only be delivered in Singapore by default. To offer or deliver a course overseas — by yourself or with a partner — you must obtain SSG's separate permission.",
  },
];

const howToLd = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to submit a new PEI course via GoBusiness Licensing in Singapore",
  description:
    "Seven-step process for a registered Private Education Institution to register a new course with SSG through the 'Offer a New Course' application on GoBusiness Licensing.",
  step: STEPS.map((s, i) => ({
    "@type": "HowToStep",
    position: i + 1,
    name: s.title,
    text: s.body,
  })),
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
    { "@type": "ListItem", position: 2, name: "Services", item: `${SITE_URL}/#services` },
    { "@type": "ListItem", position: 3, name: "PEI Course Submission", item: PAGE_URL },
  ],
};

export default function PeiCourseSubmissionPage() {
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
              <div className="kicker mb-4">[ SSG · CPE · GOBUSINESS LICENSING ]</div>
              <h1 className="font-display text-[clamp(2.25rem,5.2vw,3.75rem)] font-extrabold leading-[1.04] mb-5">
                How to submit a{" "}
                <span className="gradient-text">new PEI course</span> in Singapore.
              </h1>
              <p className="text-(--color-muted) text-lg mb-6">
                A practical guide for registered Private Education Institutions (PEIs).
                Every new course needs SSG&apos;s permission before you can advertise or
                deliver it — submitted through the{" "}
                <a
                  href="https://licensing.gobusiness.gov.sg/licence-directory/ssg/registration-of-private-education-institutions"
                  target="_blank"
                  rel="noopener"
                  className="text-(--color-cyan) hover:underline"
                >
                  GoBusiness Licensing
                </a>{" "}
                portal with your PEI&apos;s CorpPass.
              </p>
              <div className="flex flex-wrap items-center gap-3 mb-6">
                <span className="px-3 py-1.5 rounded-full text-xs font-mono bg-(--color-cyan)/10 text-(--color-cyan) border border-(--color-cyan)/30">
                  &ldquo;Offer a New Course&rdquo; application
                </span>
                <span className="px-3 py-1.5 rounded-full text-xs font-mono bg-(--color-purple)/15 text-(--color-purple-light) border border-(--color-purple)/40">
                  Submitted by PEI Manager
                </span>
                <span className="px-3 py-1.5 rounded-full text-xs font-mono bg-(--color-amber)/10 text-(--color-amber) border border-(--color-amber)/30">
                  CorpPass required
                </span>
              </div>
              <div className="flex flex-wrap gap-3">
                <a href="#steps" className="btn-primary">
                  See the 7 steps →
                </a>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-lg border border-white/15 text-white/85 hover:border-(--color-cyan)/50 hover:text-(--color-cyan) transition"
                >
                  Get help with your submission
                </Link>
              </div>
            </div>
          </Container>
        </section>

        {/* WHEN YOU NEED IT */}
        <section className="relative py-10">
          <Container>
            <div className="max-w-3xl mb-8">
              <div className="kicker mb-3">[ WHEN COURSE PERMISSION IS NEEDED ]</div>
              <h2 className="font-display text-[clamp(1.75rem,3.5vw,2.5rem)] font-extrabold leading-tight">
                A registered PEI still needs SSG permission for{" "}
                <span className="gradient-text-warm">each new course</span>.
              </h2>
            </div>
            <div className="grid md:grid-cols-3 gap-4">
              {[
                {
                  title: "Before you advertise",
                  body: "You must not market, advertise or open enrolment for a course until SSG has permitted it and issued a Course Permission Letter.",
                },
                {
                  title: "Every new programme",
                  body: "Course permission is per-course. Adding a new programme to your existing PEI registration always requires a fresh 'Offer a New Course' submission.",
                },
                {
                  title: "Overseas delivery",
                  body: "Permitted courses may only be delivered in Singapore by default. Delivering a course overseas requires SSG's separate permission.",
                },
              ].map((b) => (
                <div key={b.title} className="glass card-hover p-6 relative overflow-hidden">
                  <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-(--color-cyan) to-transparent" />
                  <h3 className="font-display font-bold text-lg mb-2">{b.title}</h3>
                  <p className="text-sm text-(--color-muted) leading-relaxed">{b.body}</p>
                </div>
              ))}
            </div>
          </Container>
        </section>

        {/* STEPS */}
        <section id="steps" className="relative py-10 scroll-mt-20">
          <Container>
            <div className="max-w-3xl mb-10">
              <div className="kicker mb-3">[ THE PROCESS ]</div>
              <h2 className="font-display text-[clamp(1.75rem,3.5vw,2.5rem)] font-extrabold leading-tight">
                Seven steps from draft to{" "}
                <span className="gradient-text">Course Permission Letter</span>.
              </h2>
            </div>

            <ol className="relative pl-8 space-y-6 before:absolute before:left-3 before:top-2 before:bottom-2 before:w-px before:bg-gradient-to-b before:from-(--color-cyan)/60 before:via-(--color-purple)/60 before:to-(--color-green)/60">
              {STEPS.map((s, i) => {
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
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono ${a.chip}`}>
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

        {/* DOCUMENTS */}
        <section className="relative py-10">
          <Container>
            <div className="max-w-3xl mb-8">
              <div className="kicker mb-3">[ DOCUMENTS TO PREPARE ]</div>
              <h2 className="font-display text-[clamp(1.75rem,3.5vw,2.5rem)] font-extrabold leading-tight">
                Have these ready before you open the form.
              </h2>
              <p className="text-(--color-muted) mt-4 text-sm">
                Exact requirements depend on the course type (e.g. External Degree Programmes
                have additional university requirements). Use SSG&apos;s templates from
                TPGateway.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {DOCUMENTS.map((d) => {
                const Icon = d.icon;
                return (
                  <div key={d.title} className="glass p-5">
                    <Icon className="w-7 h-7 text-(--color-cyan) mb-3" />
                    <h3 className="font-display font-semibold text-base mb-2">{d.title}</h3>
                    <p className="text-sm text-(--color-muted) leading-relaxed">{d.body}</p>
                  </div>
                );
              })}
            </div>

            <div className="glass p-5 mt-6 flex gap-3 items-start border border-(--color-amber)/30">
              <HiExclamationTriangle className="w-5 h-5 text-(--color-amber) shrink-0 mt-0.5" />
              <p className="text-sm text-white/85 leading-relaxed">
                Submitting an application does not constitute approval. Wait for the{" "}
                <strong className="text-white">Course Permission Letter</strong> before you
                advertise, enrol learners or deliver the course.
              </p>
            </div>

            <p className="mt-8 text-xs text-(--color-muted) font-mono max-w-3xl">
              [ Sources: GoBusiness Licensing &mdash;{" "}
              <a
                href="https://licensing.gobusiness.gov.sg/licence-directory/ssg/registration-of-private-education-institutions"
                target="_blank"
                rel="noopener"
                className="hover:text-(--color-cyan)"
              >
                Registration of Private Education Institutions
              </a>{" "}
              · TPGateway &mdash;{" "}
              <a
                href="https://www.tpgateway.gov.sg/resources/information-for-private-education-institutions-(peis)/enhanced-registration-framework-(erf)/update-registration-details"
                target="_blank"
                rel="noopener"
                className="hover:text-(--color-cyan)"
              >
                Update Registration Details
              </a>{" "}
              ]
            </p>
          </Container>
        </section>

        {/* FAQ */}
        <section className="relative py-10">
          <Container className="max-w-4xl">
            <div className="mb-8">
              <div className="kicker mb-3">[ FAQ ]</div>
              <h2 className="font-display text-[clamp(1.75rem,3.5vw,2.5rem)] font-extrabold leading-tight">
                Common questions about PEI course submission.
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
        <section className="relative py-10 overflow-hidden">
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
              <div className="kicker mb-3">[ NEED A HAND? ]</div>
              <h2 className="font-display text-[clamp(2rem,4.5vw,3rem)] font-extrabold leading-[1.05] mb-4">
                We help PEIs prepare{" "}
                <span className="gradient-text">course submissions</span>.
              </h2>
              <p className="text-(--color-muted) text-lg">
                From course write-ups to the GoBusiness submission, we&apos;ll get your new
                course ready for SSG permission.
              </p>
            </div>
            <div className="flex flex-wrap justify-center gap-3">
              <Link href="/contact" className="btn-primary">
                Talk to a consultant →
              </Link>
              <Link
                href="/ssg-ato-application"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-lg border border-white/15 text-white/85 hover:border-(--color-cyan)/50 hover:text-(--color-cyan) transition"
              >
                Not yet an ATO? Start here
              </Link>
            </div>
            <p className="mt-5 text-center text-xs text-(--color-muted) font-mono">
              [ Looking at our other services?{" "}
              <Link href="/#services" className="hover:text-(--color-cyan)">
                See all SSG services
              </Link>{" "}
              ]
            </p>
          </Container>
        </section>
      </main>
      <Footer />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToLd) }}
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
