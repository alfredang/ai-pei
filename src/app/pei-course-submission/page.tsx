import type { Metadata } from "next";
import Link from "next/link";
import {
  HiClipboardDocumentList,
  HiArrowRightOnRectangle,
  HiCursorArrowRays,
  HiPencilSquare,
  HiPaperAirplane,
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
const PAGE_URL = `${SITE_URL}/pei-course-submission.html`;

export const metadata: Metadata = {
  title: "PEI Course Submission Singapore — How to Register a New Course with SSG",
  description:
    "Step-by-step guide for registered Private Education Institutions (PEIs) to add a new course via GoBusiness — My Licences → Amend → Amendment on Courses → Add new courses and modules. Includes Academic Level and Language Proficiency wording, the document checklist, and SSG course permission.",
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
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "PEI Course Submission — Tertiary Infotech Academy" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "PEI Course Submission Singapore — How to Register a New Course with SSG",
    description:
      "Step-by-step guide for PEIs to submit a new course via GoBusiness Licensing — application type, documents, and SSG course permission.",
    images: ["/opengraph-image"],
  },
};

const STEPS = [
  {
    id: "my-licences",
    title: "Open “My Licences” in GoBusiness",
    icon: HiArrowRightOnRectangle,
    accent: "cyan" as const,
    body:
      "Log in to GoBusiness with your PEI's CorpPass and go to My Licences. Find your active “Registration of Private Education Institutions” licence (Agency: SSG).",
  },
  {
    id: "amend",
    title: "Select Action → Amend",
    icon: HiCursorArrowRays,
    accent: "blue" as const,
    body:
      "On the licence row, open the “Select Action” menu and choose “Amend”. New courses are added by amending your existing PEI registration — there is no separate licence application.",
  },
  {
    id: "add-course",
    title: "Amendment on Courses → Add new courses and modules",
    icon: HiPencilSquare,
    accent: "purple" as const,
    body:
      "In Application Details, choose “Amendment on Courses”, then under “I want to” select “Add new courses and modules”. This opens the New Courses and Modules form.",
  },
  {
    id: "course-details",
    title: "Fill in the course details",
    icon: HiClipboardDocumentList,
    accent: "amber" as const,
    body:
      "Enter the Course Title, Course Level (e.g. Certificate) and Minimum Age (e.g. 21), then complete the entry-requirement fields — Academic Level and Language Proficiency.",
  },
  {
    id: "entry-requirements",
    title: "State Academic Level & Language Proficiency",
    icon: HiAcademicCap,
    accent: "cyan" as const,
    body:
      "Give the minimum academic entry requirement and the English-language proficiency a student needs to enrol. Recommended wording is below — keep both consistent with your Minimum Age.",
  },
  {
    id: "documents",
    title: "Upload supporting documents",
    icon: HiDocumentText,
    accent: "blue" as const,
    body:
      "Attach the course write-up, sample certificate and academic-board approval. Each file must be 7 MB or less; filenames may use only letters, numbers, underscores and hyphens.",
  },
  {
    id: "declaration",
    title: "Review, declare & make payment",
    icon: HiPaperAirplane,
    accent: "green" as const,
    body:
      "Complete the Review Form and Declaration steps, then make payment if a fee is shown. The application moves to Processing while SSG reviews it; on approval you receive a Course Permission Letter.",
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
    title: "Course Write-up",
    body:
      "The full course synopsis using SSG's template. There is a specific template for External Degree Programmes (EDPs) and another for other courses.",
  },
  {
    icon: HiAcademicCap,
    title: "Sample Certificate",
    body: "A sample of the certificate or award issued to students on completion of the course.",
  },
  {
    icon: HiUserGroup,
    title: "Approval from Academic Board",
    body: "Your PEI Academic Board's approval to offer the new course.",
  },
  {
    icon: HiDocumentText,
    title: "Course Developer's Permissions",
    body:
      "Proof that the course developer or proprietor allows the PEI to offer the course, where the course is not developed in-house.",
  },
  {
    icon: HiBookOpen,
    title: "Validation Agreement",
    body:
      "Proof that the course has been validated, accredited, or offered an articulation pathway, if applicable.",
  },
  {
    icon: HiAcademicCap,
    title: "Highest Academic & Language Certificates",
    body:
      "Highest Academic Qualifications and Highest Language Qualifications certificates supporting your stated entry requirements.",
  },
  {
    icon: HiBookOpen,
    title: "Vice-Chancellor's Letter (EDPs)",
    body:
      "For External Degree Programmes — a letter from the Vice-Chancellor / President (or equivalent) of the foreign institution.",
  },
  {
    icon: HiGlobeAlt,
    title: "Other Documents",
    body:
      "Any other supporting documents if necessary. Each upload is 1 file at 7 MB or less; filenames allow only letters, numbers, underscores (_) and hyphens (-).",
  },
];

const ENTRY_REQUIREMENTS = [
  {
    icon: HiAcademicCap,
    field: "Academic Level",
    heading: "Minimum Academic Entry Requirement",
    intro: "Applicants should possess at least one of the following:",
    items: [
      "GCE 'A' Level with a minimum of 1 H2 pass; or",
      "Local Polytechnic Diploma; or",
      "NITEC / Higher NITEC from ITE; or",
      "GCE 'O' Level with a minimum of 3 passes; or",
      "Equivalent academic qualifications recognised in the applicant's home country.",
    ],
    note: "Mature-candidate route: applicants aged 21+ who do not meet the above may be admitted on relevant work experience, subject to interview and Academic Board approval.",
  },
  {
    icon: HiGlobeAlt,
    field: "Language Proficiency",
    heading: "Medium of Instruction: English",
    intro: "Applicants should meet one of the following:",
    items: [
      "GCE 'O' Level English (Grade C6 or better); or",
      "Completed prior education with English as the medium of instruction; or",
      "IELTS 5.5 / TOEFL iBT 46 / equivalent for applicants from non-English-medium backgrounds.",
    ],
    note: "Applicants who do not meet the above may be admitted upon passing an internal English proficiency assessment conducted by the institution.",
  },
];

const FAQ = [
  {
    q: "Who can submit a new course application?",
    a: "The application must be submitted by the PEI Manager, or a CorpPass user authorised to transact on behalf of the PEI, through GoBusiness Licensing. It is tied to your registered PEI entity.",
  },
  {
    q: "Where do I start the application in GoBusiness?",
    a: "Go to My Licences, find your active 'Registration of Private Education Institutions' licence, and use Select Action → Amend. Under Application Details choose 'Amendment on Courses', then 'Add new courses and modules'. There is no separate licence — a new course is an amendment to your existing PEI registration.",
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
    "Seven-step process for a registered Private Education Institution to add a new course with SSG by amending its registration on GoBusiness — My Licences → Amend → Amendment on Courses → Add new courses and modules.",
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
    { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
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
                  My Licences → Amend → Courses
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
                    href="/contact.html"
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
                  body: "Course permission is per-course. Adding a new programme means amending your existing PEI registration via 'Amendment on Courses' → 'Add new courses and modules'.",
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

        {/* ENTRY REQUIREMENTS */}
        <section id="entry-requirements" className="relative py-10 scroll-mt-20">
          <Container>
            <div className="max-w-3xl mb-8">
              <div className="kicker mb-3">[ KEY FORM FIELDS ]</div>
              <h2 className="font-display text-[clamp(1.75rem,3.5vw,2.5rem)] font-extrabold leading-tight">
                Two fields applicants get stuck on:{" "}
                <span className="gradient-text">Academic Level</span> &amp; Language Proficiency.
              </h2>
              <p className="text-(--color-muted) mt-4 text-sm">
                Both are mandatory free-text fields in the New Courses and Modules form. Reviewers
                expect a clear, verifiable threshold with an international-equivalence route.
                Below is ready-to-use wording for an Advanced Certificate (Minimum Age 21) — adapt
                the qualification floor to your course level.
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              {ENTRY_REQUIREMENTS.map((r) => {
                const Icon = r.icon;
                return (
                  <div key={r.field} className="glass p-6 relative overflow-hidden">
                    <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-(--color-cyan) to-transparent" />
                    <div className="flex items-center gap-2 mb-3">
                      <Icon className="w-6 h-6 text-(--color-cyan)" />
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-(--color-cyan)/10 text-(--color-cyan)">
                        {r.field}
                      </span>
                    </div>
                    <h3 className="font-display font-bold text-base mb-2">{r.heading}</h3>
                    <p className="text-sm text-(--color-muted) mb-2">{r.intro}</p>
                    <ul className="space-y-1.5 mb-4">
                      {r.items.map((it) => (
                        <li
                          key={it}
                          className="text-sm text-white/85 leading-relaxed pl-4 relative before:absolute before:left-0 before:top-2 before:w-1.5 before:h-1.5 before:rounded-full before:bg-(--color-cyan)/70"
                        >
                          {it}
                        </li>
                      ))}
                    </ul>
                    <p className="text-xs text-(--color-muted) leading-relaxed border-t border-white/10 pt-3">
                      {r.note}
                    </p>
                  </div>
                );
              })}
            </div>
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
              <Link href="/contact.html" className="btn-primary">
                Talk to a consultant →
              </Link>
              <Link
                href="/ssg-ato-application.html"
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
