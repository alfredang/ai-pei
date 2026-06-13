import type { Metadata } from "next";
import Link from "next/link";
import {
  HiClipboardDocumentList,
  HiArrowRightOnRectangle,
  HiCursorArrowRays,
  HiUserPlus,
  HiPaperAirplane,
  HiDocumentText,
  HiAcademicCap,
  HiIdentification,
  HiUserGroup,
  HiShieldCheck,
  HiClock,
  HiExclamationTriangle,
} from "react-icons/hi2";
import { Container } from "@/components/layout/Container";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

const SITE_URL = "https://www.tertiaryinfotech.edu.sg";
const PAGE_URL = `${SITE_URL}/pei-add-teachers`;

export const metadata: Metadata = {
  title: "How to Add Teachers to a PEI in Singapore — Notify SSG via GoBusiness",
  description:
    "Step-by-step guide for registered Private Education Institutions (PEIs) to add a teacher via GoBusiness — My Licences → Amend → Amendment on Teachers → Add new teachers. Includes the 7-day notice rule, Regulation 26 eligibility, and the supporting documents to keep on file.",
  keywords:
    "add teacher PEI Singapore, notify SSG new teacher, PEI teacher registration GoBusiness, Amendment on Teachers, Regulation 26 teacher qualifications, CPE teacher deployment, Private Education Institution add teaching staff",
  alternates: { canonical: PAGE_URL },
  openGraph: {
    type: "article",
    locale: "en_SG",
    url: PAGE_URL,
    title: "How to Add Teachers to a PEI in Singapore — Notify SSG via GoBusiness",
    description:
      "A practical, step-by-step guide for PEIs to add a teacher via GoBusiness Licensing — the 'Amendment on Teachers' application, the 7-day notice rule, Regulation 26 eligibility, and supporting documents.",
    siteName: "Tertiary Infotech Academy",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Add Teachers to a PEI — Tertiary Infotech Academy" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "How to Add Teachers to a PEI in Singapore — Notify SSG via GoBusiness",
    description:
      "Step-by-step guide for PEIs to add a teacher via GoBusiness Licensing — application type, the 7-day notice rule, and supporting documents to keep on file.",
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
      "On the licence row, open the “Select Action” menu and choose “Amend”. Teachers are added by amending your existing PEI registration — there is no separate licence application.",
  },
  {
    id: "add-teacher",
    title: "Amendment on Teachers → Add new teachers",
    icon: HiUserPlus,
    accent: "purple" as const,
    body:
      "In Application Details, choose “Amendment on Teachers”, then under “I want to” select “Add new teachers”. This opens the teacher-particulars form.",
  },
  {
    id: "teacher-details",
    title: "Fill in the teacher's particulars",
    icon: HiClipboardDocumentList,
    accent: "amber" as const,
    body:
      "Enter the teacher's full name, NRIC or passport number and nationality, and the course(s) or module(s) the teacher will be deployed to teach.",
  },
  {
    id: "eligibility",
    title: "Confirm the teacher meets Regulation 26",
    icon: HiShieldCheck,
    accent: "cyan" as const,
    body:
      "Before deployment, satisfy yourself that the teacher meets the minimum qualifications and experience stipulated under Regulation 26(3) of the Private Education Regulations, and complete the Regulation 26(2) self-declaration.",
  },
  {
    id: "documents",
    title: "Keep the supporting documents on file",
    icon: HiDocumentText,
    accent: "blue" as const,
    body:
      "These records are not uploaded to GoBusiness, but your PEI must maintain them and produce them if SSG requests: CV, highest academic qualification, Letters of Permission and the self-declaration.",
  },
  {
    id: "notice",
    title: "Submit at least 7 days before deployment",
    icon: HiClock,
    accent: "green" as const,
    body:
      "Notify SSG via GoBusiness at least 7 days before the teacher's actual deployment. Do not deploy a teacher to teach until the notification has been submitted and the 7-day notice period has elapsed.",
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
    icon: HiIdentification,
    title: "NRIC / Passport & Nationality",
    body: "The teacher's NRIC or passport number and nationality information.",
  },
  {
    icon: HiDocumentText,
    title: "Curriculum Vitae / Resume",
    body: "A CV or resume setting out the teacher's relevant work and teaching experience.",
  },
  {
    icon: HiAcademicCap,
    title: "Highest Academic Qualification",
    body: "The certificate or transcript evidencing the teacher's highest academic qualification.",
  },
  {
    icon: HiUserGroup,
    title: "Letter of Permission — Academic Board",
    body: "A Letter of Permission from your PEI's Academic Board authorising the teacher to teach.",
  },
  {
    icon: HiUserGroup,
    title: "Letter of Permission — Course Developer",
    body: "A Letter of Permission from the external course developer, where the course is not developed in-house.",
  },
  {
    icon: HiShieldCheck,
    title: "Self-Declaration (Regulation 26(2))",
    body: "A signed self-declaration confirming the teacher's compliance with Regulation 26(2) of the Private Education Regulations.",
  },
];

const ELIGIBILITY = [
  {
    icon: HiAcademicCap,
    field: "Qualifications",
    heading: "Minimum Academic & Subject-Matter Qualifications",
    intro: "Under Regulation 26(3), a teacher should generally hold:",
    items: [
      "A qualification at least one level above the course being taught (or equivalent); and",
      "A qualification relevant to the subject area of the course; and",
      "Recognised teacher-training or a teaching qualification, where required for the course type.",
    ],
    note: "Where a teacher's qualification is below the stipulated level, the PEI must document the relevant experience relied on and obtain Academic Board approval before deployment.",
  },
  {
    icon: HiShieldCheck,
    field: "Experience & Declaration",
    heading: "Relevant Experience & Self-Declaration",
    intro: "Before deployment, the PEI must be satisfied that the teacher:",
    items: [
      "Has the relevant teaching or industry experience for the course; and",
      "Meets the requirements stipulated under Regulation 26(3); and",
      "Has signed the Regulation 26(2) self-declaration on compliance.",
    ],
    note: "All supporting records must be maintained on file and produced to SSG on request — they are not uploaded through GoBusiness.",
  },
];

const FAQ = [
  {
    q: "How much notice must I give before deploying a teacher?",
    a: "At least 7 days. A PEI must notify SSG via GoBusiness Licensing at least 7 days before the teacher's actual deployment. Do not deploy the teacher to teach before the notification is submitted and the notice period has elapsed.",
  },
  {
    q: "Do I upload the teacher's documents in GoBusiness?",
    a: "No. The teacher's CV, qualification certificates, Letters of Permission and the Regulation 26(2) self-declaration are not uploaded — but your PEI must maintain them on file and produce them to SSG on request.",
  },
  {
    q: "Where do I start the application in GoBusiness?",
    a: "Go to My Licences, find your active 'Registration of Private Education Institutions' licence, and use Select Action → Amend. Under Application Details choose 'Amendment on Teachers', then 'Add new teachers'. Adding a teacher is an amendment to your existing PEI registration, not a separate licence.",
  },
  {
    q: "What qualifications must a teacher have?",
    a: "The teacher must meet the minimum qualifications and experience stipulated under Regulation 26(3) of the Private Education Regulations — generally a qualification at least one level above the course and relevant to the subject. The PEI confirms this and signs the Regulation 26(2) self-declaration before deployment.",
  },
  {
    q: "How do I remove a teacher who has left?",
    a: "Notify SSG through GoBusiness Licensing using the same 'Amendment on Teachers' flow and remove the teacher from your registration. SSG does not stipulate a fixed timeline for removals, but you should keep your teacher list accurate and current.",
  },
];

const howToLd = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to add a teacher to a PEI via GoBusiness Licensing in Singapore",
  description:
    "Seven-step process for a registered Private Education Institution to add a teacher by notifying SSG on GoBusiness — My Licences → Amend → Amendment on Teachers → Add new teachers, at least 7 days before deployment.",
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
    { "@type": "ListItem", position: 3, name: "Add Teachers to a PEI", item: PAGE_URL },
  ],
};

export default function PeiAddTeachersPage() {
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
              background: "radial-gradient(circle, rgba(89,235,253,0.5) 0%, transparent 70%)",
            }}
          />
          <Container>
            <div className="max-w-3xl relative">
              <div className="kicker mb-4">[ SSG · CPE · GOBUSINESS LICENSING ]</div>
              <h1 className="font-display text-[clamp(2.25rem,5.2vw,3.75rem)] font-extrabold leading-[1.04] mb-5">
                How to add{" "}
                <span className="gradient-text">teachers to a PEI</span> in Singapore.
              </h1>
              <p className="text-(--color-muted) text-lg mb-6">
                A practical guide for registered Private Education Institutions (PEIs).
                Before a new teacher can be deployed, you must notify SSG at least 7 days in
                advance — submitted through the{" "}
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
                  My Licences → Amend → Teachers
                </span>
                <span className="px-3 py-1.5 rounded-full text-xs font-mono bg-(--color-purple)/15 text-(--color-purple-light) border border-(--color-purple)/40">
                  7 days&apos; notice before deployment
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
              <div className="kicker mb-3">[ WHEN YOU MUST NOTIFY SSG ]</div>
              <h2 className="font-display text-[clamp(1.75rem,3.5vw,2.5rem)] font-extrabold leading-tight">
                A PEI must notify SSG before deploying{" "}
                <span className="gradient-text-warm">any new teacher</span>.
              </h2>
            </div>
            <div className="grid md:grid-cols-3 gap-4">
              {[
                {
                  title: "At least 7 days ahead",
                  body: "Submit the notification via GoBusiness at least 7 days before the teacher's actual deployment. Don't let a teacher start before the notice period elapses.",
                },
                {
                  title: "Every new teacher",
                  body: "Notification is per-teacher. Adding teaching staff means amending your existing PEI registration via 'Amendment on Teachers' → 'Add new teachers'.",
                },
                {
                  title: "Meet Regulation 26",
                  body: "The teacher must meet the minimum qualifications and experience under Regulation 26(3), and you must hold a Regulation 26(2) self-declaration on file.",
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
                Seven steps to add a teacher to your{" "}
                <span className="gradient-text">PEI registration</span>.
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

        {/* ELIGIBILITY */}
        <section id="eligibility" className="relative py-10 scroll-mt-20">
          <Container>
            <div className="max-w-3xl mb-8">
              <div className="kicker mb-3">[ TEACHER ELIGIBILITY ]</div>
              <h2 className="font-display text-[clamp(1.75rem,3.5vw,2.5rem)] font-extrabold leading-tight">
                What a teacher must meet under{" "}
                <span className="gradient-text">Regulation 26</span>.
              </h2>
              <p className="text-(--color-muted) mt-4 text-sm">
                The PEI is responsible for ensuring every teacher meets the minimum
                qualifications and experience before deployment, and for keeping the
                supporting records on file. The guidance below summarises the threshold —
                always check the latest Private Education Regulations for your course type.
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              {ELIGIBILITY.map((r) => {
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
              <div className="kicker mb-3">[ DOCUMENTS TO KEEP ON FILE ]</div>
              <h2 className="font-display text-[clamp(1.75rem,3.5vw,2.5rem)] font-extrabold leading-tight">
                Maintain these records — SSG may ask for them.
              </h2>
              <p className="text-(--color-muted) mt-4 text-sm">
                These documents are <strong className="text-white">not uploaded</strong> through
                GoBusiness when you add a teacher, but the PEI must keep them and produce them
                if SSG requests. Have them ready before the teacher is deployed.
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
                Do not deploy a teacher to teach until you have notified SSG and the{" "}
                <strong className="text-white">7-day notice period</strong> has elapsed, and
                you are satisfied the teacher meets Regulation 26.
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
                Common questions about adding teachers.
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
                We help PEIs manage{" "}
                <span className="gradient-text">teacher deployments</span>.
              </h2>
              <p className="text-(--color-muted) text-lg">
                From Regulation 26 checks to the GoBusiness notification, we&apos;ll get your
                teaching staff registered with SSG on time.
              </p>
            </div>
            <div className="flex flex-wrap justify-center gap-3">
              <Link href="/contact" className="btn-primary">
                Talk to a consultant →
              </Link>
              <Link
                href="/pei-course-submission"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-lg border border-white/15 text-white/85 hover:border-(--color-cyan)/50 hover:text-(--color-cyan) transition"
              >
                Adding a new course? Start here
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
