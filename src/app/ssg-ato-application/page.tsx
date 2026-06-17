import type { Metadata } from "next";
import Link from "next/link";
import {
  HiMagnifyingGlass,
  HiChatBubbleLeftRight,
  HiDocumentText,
  HiRocketLaunch,
  HiCheckBadge,
  HiBuildingLibrary,
  HiClipboardDocumentList,
  HiBanknotes,
  HiAcademicCap,
  HiShieldCheck,
  HiBookOpen,
  HiUsers,
} from "react-icons/hi2";
import { Container } from "@/components/layout/Container";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SsgAtoLeadForm } from "@/components/sections/SsgAtoLeadForm";

const PAGE_URL = "https://www.tertiaryinfotech.edu.sg/ssg-ato-application.html";

export const metadata: Metadata = {
  title: "SSG ATO Application Singapore — Become a Registered Training Provider",
  description:
    "End-to-end consultancy for the SSG/TPGateway ATO application in Singapore. We prepare your QMS, policies, SOPs, course submission and audit-readiness. Book a free 30-min consultation.",
  keywords:
    "SSG ATO application Singapore, apply ATO Singapore, become accredited training organisation Singapore, TPGateway organisation registration, WSQ training provider registration, RTP registration Singapore",
  alternates: { canonical: PAGE_URL },
  openGraph: {
    type: "website",
    locale: "en_SG",
    url: PAGE_URL,
    title: "SSG ATO Application Singapore — Become a Registered Training Provider",
    description:
      "End-to-end consultancy for the SSG/TPGateway ATO application in Singapore. We prepare your QMS, policies, SOPs, course submission and audit-readiness.",
    siteName: "Tertiary Infotech Academy",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "SSG ATO Application — Tertiary Infotech Academy" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "SSG ATO Application Singapore — Become a Registered Training Provider",
    description:
      "End-to-end consultancy for the SSG/TPGateway ATO application. QMS, SOPs, course submission, audit-readiness — all in one engagement.",
    images: ["/opengraph-image"],
  },
};

const TIMELINE = [
  {
    id: "discovery",
    title: "Discovery",
    duration: "Week 0 · free",
    icon: HiMagnifyingGlass,
    accent: "cyan" as const,
    body:
      "30-minute discovery call. We map your business, target training sector, financial position and existing training track record against SSG eligibility.",
  },
  {
    id: "consultation",
    title: "Consultation",
    duration: "Week 1 · free",
    icon: HiChatBubbleLeftRight,
    accent: "blue" as const,
    body:
      "Gap analysis against the OR + Course Application checklist. We confirm your readiness for Stage 1 (entity, financials, track record) and Stage 2 (premises, policies, learner agreement).",
  },
  {
    id: "quotation",
    title: "Quotation",
    duration: "Week 2",
    icon: HiDocumentText,
    accent: "purple" as const,
    body:
      "Fixed-fee proposal scoped to your gaps — QMS authoring, policy/SOP build, course submission package, audit-readiness coaching. No surprises.",
  },
  {
    id: "start-project",
    title: "Start Project",
    duration: "Weeks 3–10",
    icon: HiRocketLaunch,
    accent: "amber" as const,
    body:
      "We co-author your QMS, policies and SOPs, build your Course Application, prepare your learner agreement, and coach you for the onsite SSG assessment.",
  },
  {
    id: "become-ato",
    title: "Become ATO",
    duration: "Weeks 10–14",
    icon: HiCheckBadge,
    accent: "green" as const,
    body:
      "TPGateway submission, half-day onsite SSG assessment, response handling, and final approval — your organisation goes live as a registered training provider.",
  },
];

const ACCENT: Record<
  string,
  { ring: string; iconText: string; chip: string; glow: string; line: string }
> = {
  cyan: {
    ring: "border-(--color-cyan)/40",
    iconText: "text-(--color-cyan)",
    chip: "bg-(--color-cyan)/10 text-(--color-cyan)",
    glow: "rgba(89,235,253,0.35)",
    line: "from-(--color-cyan)",
  },
  blue: {
    ring: "border-(--color-cyan)/40",
    iconText: "text-(--color-cyan)",
    chip: "bg-(--color-cyan)/10 text-(--color-cyan)",
    glow: "rgba(89,235,253,0.3)",
    line: "from-(--color-cyan)",
  },
  purple: {
    ring: "border-(--color-purple)/50",
    iconText: "text-(--color-purple-light)",
    chip: "bg-(--color-purple)/15 text-(--color-purple-light)",
    glow: "rgba(92,0,229,0.45)",
    line: "from-(--color-purple)",
  },
  amber: {
    ring: "border-(--color-amber)/50",
    iconText: "text-(--color-amber)",
    chip: "bg-(--color-amber)/10 text-(--color-amber)",
    glow: "rgba(246,174,100,0.35)",
    line: "from-(--color-amber)",
  },
  green: {
    ring: "border-(--color-green)/50",
    iconText: "text-(--color-green)",
    chip: "bg-(--color-green)/10 text-(--color-green)",
    glow: "rgba(1,201,130,0.35)",
    line: "from-(--color-green)",
  },
};

const ELIGIBILITY = [
  {
    icon: HiBuildingLibrary,
    title: "Legal entity in Singapore",
    body:
      "Registered with ACRA, ROS or equivalent authority. Entity name must not contain proscribed terms (e.g. National, University, Singapore).",
  },
  {
    icon: HiBanknotes,
    title: "Financially sound",
    body:
      "Latest IRAS Notice of Assessment showing positive trade income. ECI assessments are not accepted.",
  },
  {
    icon: HiAcademicCap,
    title: "1-year training track record",
    body:
      "At least one year of training delivery, conducted at least quarterly, with evidence (attendance, invoices, lesson plans, assessment plans, feedback).",
  },
  {
    icon: HiShieldCheck,
    title: "Clean compliance record",
    body:
      "Management and adult educators must be free of SSG-related contractual breaches and relevant criminal offences in the last 5 years.",
  },
  {
    icon: HiUsers,
    title: "Corppass + PayNow",
    body:
      "Corppass for TPGateway transactions and a PayNow account for payment processing — both are mandatory before you can submit.",
  },
  {
    icon: HiBookOpen,
    title: "Curriculum alignment",
    body:
      "Courses must map to WSQ frameworks or Critical Core Skills with clear learning outcomes, structured lesson plans and a formal assessment plan.",
  },
];

const STAGE_1 = [
  "ACRA / ROS registration documents and entity name compliance check",
  "Latest IRAS Notice of Assessment (positive trade income required)",
  "Mandatory declarations — SSG Act 2016, SDL Act 1979, PEA 2009, EduTrust, WSQ",
  "1-year training track record template + supporting evidence",
  "Target training group selection — Public TP, In-House TP, or both",
  "Completed OR Declaration Form (current March 2026 version)",
];

const STAGE_2 = [
  "Website and brochure information disclosure (course, fees, funding, trainers, premises)",
  "Premises write-up + photographs of training and assessment rooms",
  "Rental invoice or lease agreement (no P.O. Box addresses)",
  "Sample learner agreement / registration form with SkillsFuture Credit and SSG funding amounts",
  "Policies & Operations Manual covering Course Administration and Outcomes",
  "Half-day onsite SSG assessment of your policies and operations",
];

const FAQ = [
  {
    q: "How much does the SSG ATO application cost?",
    a: "The TPGateway application fee is S$545 (GST inclusive) and is non-refundable. Our consultancy fee is scoped per engagement after the free Consultation step — typically covering QMS authoring, policy/SOP build, course submission package and audit-readiness coaching.",
  },
  {
    q: "How long does it take to become an SSG ATO?",
    a: "Most engagements run 10–14 weeks from project start to approval, assuming Stage 1 eligibility (entity, financials, 1-year track record) is already in place. We confirm a concrete timeline at the Quotation step.",
  },
  {
    q: "Do I need an existing training track record?",
    a: "Yes. SSG requires at least one year of training and education delivery, conducted regularly (at least quarterly), with documented lesson plans, assessment plans, attendance and learner feedback. We help you compile and present this evidence.",
  },
  {
    q: "What's the difference between Public, In-House and Both?",
    a: "Public TP serves the general public and corporate clients. In-House TP serves only your own employees. Both is a dual model. You must designate one category in your OR application — we'll help you choose based on your commercial strategy.",
  },
  {
    q: "What happens at the onsite SSG assessment?",
    a: "SSG conducts a half-day onsite assessment of your policies, operations, training premises and supporting evidence. We coach you through the entire flow — likely questions, document presentation and gap remediation before the visit.",
  },
  {
    q: "Can a previously terminated TP reapply?",
    a: "Yes, but ex-RTPs must meet all current OR requirements and additionally develop an internal quality assurance manual addressing TPQA Criteria 2.1 and 2.4. We handle the full reapplication scope.",
  },
];

const serviceLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType: "SSG ATO Application Consultancy",
  name: "SSG ATO Application Consultancy — Singapore",
  provider: {
    "@type": "Organization",
    name: "Tertiary Infotech Academy",
    url: "https://www.tertiaryinfotech.edu.sg",
  },
  areaServed: { "@type": "Country", name: "Singapore" },
  description:
    "End-to-end consultancy to help Singapore organisations become an SSG-registered training provider (ATO) via TPGateway — covering Organisation Registration, Course Application, policies and audit-readiness.",
  url: PAGE_URL,
};

const howToLd = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to apply for SSG Registered Training Provider (RTP) in Singapore",
  description:
    "Five-step consultancy process to take a Singapore organisation through the SSG/TPGateway ATO application — Discovery, Consultation, Quotation, Start Project, Become ATO.",
  totalTime: "P14W",
  estimatedCost: { "@type": "MonetaryAmount", currency: "SGD", value: "545" },
  step: TIMELINE.map((s, i) => ({
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

const SITE_URL = "https://www.tertiaryinfotech.edu.sg";
const breadcrumbLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/index.html` },
    { "@type": "ListItem", position: 2, name: "Services", item: `${SITE_URL}/index.html#services` },
    { "@type": "ListItem", position: 3, name: "SSG ATO Application", item: PAGE_URL },
  ],
};

export default function SsgAtoApplicationPage() {
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
            <div className="grid lg:grid-cols-12 gap-8 items-start relative">
              <div className="lg:col-span-7">
                <div className="kicker mb-4">[ SSG · TPGATEWAY · WSQ ]</div>
                <h1 className="font-display text-[clamp(2.25rem,5.2vw,3.75rem)] font-extrabold leading-[1.04] mb-5">
                  Become an{" "}
                  <span className="gradient-text">SSG-registered Training Provider</span>{" "}
                  in Singapore.
                </h1>
                <p className="text-(--color-muted) text-lg max-w-2xl mb-6">
                  We take Singapore organisations end-to-end through the{" "}
                  <a
                    href="https://www.tpgateway.gov.sg/plan-courses/organisation-registration-for-first-time-training-provider/apply-for-organisation-registration"
                    target="_blank"
                    rel="noopener"
                    className="text-(--color-cyan) hover:underline"
                  >
                    SSG/TPGateway Organisation Registration
                  </a>{" "}
                  and Course Application — QMS, policies, SOPs, learner agreement, course
                  submission and the half-day onsite SSG assessment. Fixed-fee. Predictable
                  timeline.
                </p>
                <div className="flex flex-wrap items-center gap-3 mb-6">
                  <span className="px-3 py-1.5 rounded-full text-xs font-mono bg-(--color-cyan)/10 text-(--color-cyan) border border-(--color-cyan)/30">
                    10–14 week typical timeline
                  </span>
                  <span className="px-3 py-1.5 rounded-full text-xs font-mono bg-(--color-purple)/15 text-(--color-purple-light) border border-(--color-purple)/40">
                    Fixed-fee engagement
                  </span>
                  <span className="px-3 py-1.5 rounded-full text-xs font-mono bg-(--color-amber)/10 text-(--color-amber) border border-(--color-amber)/30">
                    Free 30-min consultation
                  </span>
                </div>
                <div className="flex flex-wrap gap-3">
                  <a href="#book" className="btn-primary">
                    Book my ATO consultation →
                  </a>
                  <a
                    href="#timeline"
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-lg border border-white/15 text-white/85 hover:border-(--color-cyan)/50 hover:text-(--color-cyan) transition"
                  >
                    See the 5-step process
                  </a>
                </div>
                <p className="mt-5 text-xs text-(--color-muted) font-mono">
                  [ TPGateway fee: S$545 (GST inclusive, non-refundable). Application is
                  separate from our consultancy. ]
                </p>
              </div>
              <div className="lg:col-span-5 lg:sticky lg:top-24">
                <div id="book" className="scroll-mt-24">
                  <div className="kicker mb-3">[ START HERE ]</div>
                  <SsgAtoLeadForm compact />
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* WHY ATO */}
        <section className="relative py-10">
          <Container>
            <div className="max-w-3xl mb-8">
              <div className="kicker mb-3">[ WHY BECOME AN ATO ]</div>
              <h2 className="font-display text-[clamp(1.75rem,3.5vw,2.5rem)] font-extrabold leading-tight">
                Unlock <span className="gradient-text-warm">SSG funding</span>, public-sector
                contracts and a national audience.
              </h2>
            </div>
            <div className="grid md:grid-cols-3 gap-4">
              {[
                {
                  title: "SkillsFuture Credit access",
                  body: "Learners can apply SSG subsidies and SkillsFuture Credit to your fees, removing a major adoption barrier.",
                },
                {
                  title: "Government & enterprise procurement",
                  body: "Public agencies and large corporates prioritise SSG-accredited TPs in vendor selection.",
                },
                {
                  title: "WSQ programme scale",
                  body: "Develop modular, stackable WSQ qualifications mapped to Singapore's national skills frameworks.",
                },
              ].map((b) => (
                <div
                  key={b.title}
                  className="glass card-hover p-6 relative overflow-hidden"
                >
                  <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-(--color-cyan) to-transparent" />
                  <h3 className="font-display font-bold text-lg mb-2">{b.title}</h3>
                  <p className="text-sm text-(--color-muted) leading-relaxed">{b.body}</p>
                </div>
              ))}
            </div>
          </Container>
        </section>

        {/* TIMELINE */}
        <section id="timeline" className="relative py-10 scroll-mt-20">
          <Container>
            <div className="max-w-3xl mb-10">
              <div className="kicker mb-3">[ OUR 5-STEP PROCESS ]</div>
              <h2 className="font-display text-[clamp(1.75rem,3.5vw,2.5rem)] font-extrabold leading-tight">
                Discovery → Consultation → Quotation → Start Project →{" "}
                <span className="gradient-text">Become ATO</span>
              </h2>
            </div>

            {/* Desktop horizontal timeline */}
            <div className="hidden lg:block relative">
              <div className="absolute top-12 left-0 right-0 h-px bg-gradient-to-r from-(--color-cyan)/60 via-(--color-purple)/60 to-(--color-green)/60" />
              <ol className="grid grid-cols-5 gap-4 relative">
                {TIMELINE.map((s, i) => {
                  const Icon = s.icon;
                  const a = ACCENT[s.accent];
                  return (
                    <li key={s.id} className="relative">
                      <div
                        className={`relative z-10 mx-auto w-24 h-24 rounded-2xl glass border ${a.ring} flex items-center justify-center mb-5`}
                      >
                        <Icon className={`w-10 h-10 ${a.iconText}`} />
                        <span className="absolute -bottom-2 -right-2 w-7 h-7 rounded-full bg-(--color-bg) border border-white/15 text-xs font-mono flex items-center justify-center text-white/80">
                          {i + 1}
                        </span>
                      </div>
                      <div className="text-center">
                        <span
                          className={`inline-block px-2.5 py-1 rounded-full text-[10px] font-mono ${a.chip} mb-2`}
                        >
                          {s.duration}
                        </span>
                        <h3 className="font-display font-bold text-lg mb-2">{s.title}</h3>
                        <p className="text-sm text-(--color-muted) leading-relaxed">
                          {s.body}
                        </p>
                      </div>
                    </li>
                  );
                })}
              </ol>
            </div>

            {/* Mobile vertical timeline */}
            <ol className="lg:hidden relative pl-8 space-y-6 before:absolute before:left-3 before:top-2 before:bottom-2 before:w-px before:bg-gradient-to-b before:from-(--color-cyan)/60 before:via-(--color-purple)/60 before:to-(--color-green)/60">
              {TIMELINE.map((s, i) => {
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
                          Step {i + 1}
                        </span>
                        <span className="text-[11px] font-mono text-(--color-muted)">
                          {s.duration}
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

        {/* HOW TO APPLY — long form content */}
        <section className="relative py-10">
          <Container>
            <div className="max-w-3xl mb-8">
              <div className="kicker mb-3">[ THE OFFICIAL PROCESS ]</div>
              <h2 className="font-display text-[clamp(1.75rem,3.5vw,2.5rem)] font-extrabold leading-tight">
                How to apply for SSG Registered Training Provider (RTP) in Singapore
              </h2>
              <p className="text-(--color-muted) mt-4">
                SSG/TPGateway Organisation Registration (OR) must be submitted together
                with a Course Application (CA). Both must be approved before your
                organisation is listed as an SSG-funded training provider. The fee is{" "}
                <strong className="text-white">S$545 (GST inclusive, non-refundable)</strong>{" "}
                and successful submission does not by itself constitute approval.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-4 mb-10">
              <div className="glass p-6">
                <div className="flex items-center gap-2 mb-3">
                  <HiClipboardDocumentList className="w-5 h-5 text-(--color-cyan)" />
                  <h3 className="font-display font-bold text-lg">Stage 1 — Eligibility & evidence</h3>
                </div>
                <ul className="space-y-2.5">
                  {STAGE_1.map((s) => (
                    <li key={s} className="flex gap-2.5 text-sm text-white/85">
                      <span className="text-(--color-cyan) font-mono mt-0.5">▸</span>
                      <span>{s}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="glass p-6">
                <div className="flex items-center gap-2 mb-3">
                  <HiBuildingLibrary className="w-5 h-5 text-(--color-purple-light)" />
                  <h3 className="font-display font-bold text-lg">Stage 2 — Operations & onsite audit</h3>
                </div>
                <ul className="space-y-2.5">
                  {STAGE_2.map((s) => (
                    <li key={s} className="flex gap-2.5 text-sm text-white/85">
                      <span className="text-(--color-purple-light) font-mono mt-0.5">▸</span>
                      <span>{s}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="max-w-3xl mb-6">
              <h3 className="font-display font-bold text-xl mb-3">
                Eligibility checklist
              </h3>
              <p className="text-(--color-muted) text-sm">
                Before you submit, you'll need to satisfy SSG on all six fronts below. We
                cover each in the free Consultation step.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {ELIGIBILITY.map((e) => {
                const Icon = e.icon;
                return (
                  <div key={e.title} className="glass p-5">
                    <Icon className="w-7 h-7 text-(--color-cyan) mb-3" />
                    <h4 className="font-display font-semibold text-base mb-2">
                      {e.title}
                    </h4>
                    <p className="text-sm text-(--color-muted) leading-relaxed">
                      {e.body}
                    </p>
                  </div>
                );
              })}
            </div>

            <p className="mt-8 text-xs text-(--color-muted) font-mono max-w-3xl">
              [ Sources: TPGateway —{" "}
              <a
                href="https://www.tpgateway.gov.sg/plan-courses/organisation-registration-for-first-time-training-provider/apply-for-organisation-registration"
                target="_blank"
                rel="noopener"
                className="hover:text-(--color-cyan)"
              >
                Organisation Registration for First-Time Training Provider
              </a>{" "}
              · TrainerCentral —{" "}
              <a
                href="https://www.trainercentral.com/blog/accredited-training-organization.html"
                target="_blank"
                rel="noopener"
                className="hover:text-(--color-cyan)"
              >
                Becoming an Accredited Training Organisation
              </a>{" "}
              ]
            </p>
          </Container>
        </section>

        {/* WHAT'S INCLUDED */}
        <section className="relative py-10">
          <Container>
            <div className="grid md:grid-cols-2 gap-8 items-start">
              <div>
                <div className="kicker mb-3">[ WHAT WE DELIVER ]</div>
                <h2 className="font-display text-[clamp(1.75rem,3.5vw,2.5rem)] font-extrabold leading-tight mb-4">
                  A complete, audit-ready{" "}
                  <span className="gradient-text">ATO submission package</span>.
                </h2>
                <p className="text-(--color-muted)">
                  You bring the business, the trainers and the training track record. We
                  build everything SSG asks to see.
                </p>
              </div>
              <ul className="space-y-3">
                {[
                  "QMS, policies and SOPs aligned to Terms for Training Providers",
                  "ATO submission package — OR + Course Application",
                  "Sample learner agreement with SkillsFuture Credit and SSG funding terms",
                  "Training premises write-up and evidence pack",
                  "Pre-audit gap assessment and remediation roadmap",
                  "Audit-readiness coaching for the half-day onsite SSG assessment",
                  "Post-approval support — TPQA readiness and ongoing compliance",
                ].map((line) => (
                  <li key={line} className="flex gap-3">
                    <span className="text-(--color-green) font-mono mt-0.5">✓</span>
                    <span className="text-white/90">{line}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Container>
        </section>

        {/* FAQ */}
        <section className="relative py-10">
          <Container className="max-w-4xl">
            <div className="mb-8">
              <div className="kicker mb-3">[ FAQ ]</div>
              <h2 className="font-display text-[clamp(1.75rem,3.5vw,2.5rem)] font-extrabold leading-tight">
                Common questions about the SSG ATO application.
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
              <div className="kicker mb-3">[ START YOUR ATO JOURNEY ]</div>
              <h2 className="font-display text-[clamp(2rem,4.5vw,3rem)] font-extrabold leading-[1.05] mb-4">
                Ready to apply? <span className="gradient-text">Talk to a consultant.</span>
              </h2>
              <p className="text-(--color-muted) text-lg">
                Free 30-minute consultation. We'll tell you what's realistic for your
                organisation before you spend a dollar.
              </p>
            </div>
            <SsgAtoLeadForm />
            <p className="mt-5 text-center text-xs text-(--color-muted) font-mono">
              [ Looking at our other services?{" "}
              <Link href="/index.html#services" className="hover:text-(--color-cyan)">
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceLd) }}
      />
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
