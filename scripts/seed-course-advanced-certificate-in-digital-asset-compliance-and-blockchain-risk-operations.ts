import { eq } from "drizzle-orm";
import { db } from "../src/db";
import { courses, courseModules } from "../src/db/schema";

/**
 * Seeds the "Advanced Certificate in Digital Asset Compliance and Blockchain Risk
 * Operations" into the DB so it renders at
 * /courses/advanced-certificate-in-digital-asset-compliance-and-blockchain-risk-operations.html
 * via the shared [slug] course page. Idempotent: upserts the course by slug, then
 * replaces its modules. Modelled on scripts/seed-courses.ts.
 *
 * Run: set -a; source .env; set +a; npx tsx scripts/seed-course-advanced-certificate-in-digital-asset-compliance-and-blockchain-risk-operations.ts
 */

const SLUG =
  "advanced-certificate-in-digital-asset-compliance-and-blockchain-risk-operations";

const COURSE = {
  slug: SLUG,
  title:
    "Advanced Certificate in Digital Asset Compliance and Blockchain Risk Operations",
  status: "published" as const,
  summary:
    "Train to support digital asset compliance, AML controls and blockchain risk operations across cryptocurrency, fintech and Web3 — from customer due diligence and on-chain monitoring to wallet investigations, sanctions screening and RegTech. A 150-hour, ~4-month live online Advanced Certificate.",
  overview: [
    "The Advanced Certificate in Digital Asset Compliance and Blockchain Risk Operations equips learners with the practical skills to support compliance operations, AML controls, blockchain risk monitoring and investigations across cryptocurrency, fintech and Web3 environments.",
    "Upon completion, learners will be able to analyse digital asset activity, conduct customer and wallet risk reviews, monitor suspicious transaction patterns, support sanctions and regulatory controls, prepare compliance documentation, and apply automation or analytics tools responsibly in operational workflows.",
    "Delivery: 100% live online (synchronous virtual classes), part-time over approximately 4 months. Total course hours: 150 (5 consolidated modules × 10 sessions × 3 hours). Class frequency: 3 days per week, 3 hours per session, 7:00 PM – 10:00 PM (Singapore time). Each module runs 10 sessions (9 teaching/practical + 1 assessment).",
    "Minimum entry requirements: at least 21 years old; at least C6 at GCE 'O' Level in any 3 subjects (or equivalent); or a mature candidate at least 25 years old with at least 4 years of working experience.",
    "This is a stackable modular programme — modular certificates stack towards the full Advanced Certificate.",
  ].join("\n\n"),
  outcomes: [
    "Explain the purpose of compliance controls across cryptocurrency, fintech and Web3 environments, and the blockchain, wallet, token, exchange and custody infrastructure that underpins them",
    "Apply customer due diligence, AML, sanctions screening, escalation and case management workflows to digital asset activity",
    "Monitor on-chain activity and assess wallet risk through clustering, attribution, exposure tracing and counterparty analysis, and prepare defensible investigation summaries that map fund flows",
    "Identify compliance risks across DeFi, token markets, mixers, bridges and smart contracts, and apply RegTech, automation and AI-assisted tools to alert routing, risk scoring and case prioritisation",
    "Apply governance controls for model outputs, human review and auditability, and uphold secure data handling, privacy and professional conduct for customer records, wallet data and evidence",
    "Prepare compliance reports, investigation memos, dashboards and audit trails, and complete applied case projects covering onboarding review, alert triage, wallet investigation and sanctions escalation",
  ].join("\n"),
  whoShouldEnroll: [
    "Compliance, AML and risk professionals extending their practice into cryptocurrency, virtual assets and blockchain-enabled financial services",
    "Fintech, exchange, payments, custody and Web3 operations staff involved in onboarding, monitoring, investigations, sanctions screening or compliance case management",
    "Cybersecurity, fraud, audit and investigation professionals who need to interpret wallet activity, on-chain behaviour and digital asset typologies",
    "Financial services professionals, relationship managers and analysts supporting virtual asset due diligence, governance or regulatory readiness",
    "Fresh graduates and career changers from business, finance, IT, law, criminology or related disciplines entering digital asset compliance roles",
    "Managers, founders, legal, governance and internal audit practitioners supporting compliance policy, assurance or regulatory reporting for virtual asset activities",
  ].join("\n"),
  assessment:
    "Practical case assignments, scenario-based quizzes, compliance documentation exercises and a capstone digital asset compliance project; one assessment per consolidated module (pass required), minimum 75% attendance.",
  certificate:
    "Advanced Certificate in Digital Asset Compliance and Blockchain Risk Operations — awarded by Tertiary Infotech Academy upon achieving at least 75% attendance and passing all module assessments (one per consolidated module). A stackable modular programme; modular certificates stack towards the full Advanced Certificate, to be completed within approximately 4 months.",
  sortOrder: 7,
  seoTitle: "Advanced Certificate in Digital Asset Compliance Singapore",
  seoDescription:
    "Become a digital asset compliance and blockchain risk analyst with a 150-hour live online Advanced Certificate in Singapore — crypto AML, on-chain monitoring, wallet investigations & RegTech. For career switchers and international students.",
};

const MODULES = [
  {
    title:
      "Module 1: Digital Asset Ecosystem, Market Infrastructure and Regulation",
    kind: "foundation",
    details:
      "Explain the purpose of compliance controls across cryptocurrency, fintech and Web3 environments; map blockchain, wallet, token, exchange and custody infrastructure; and compare regulatory expectations for virtual asset service providers, including licensing, the Travel Rule, custody, market conduct and consumer protection obligations.",
    sessions: "10 sessions (9 teaching + 1 assessment)",
    duration: "30 hours",
  },
  {
    title: "Module 2: Customer Due Diligence, AML and Sanctions Controls",
    kind: "foundation",
    details:
      "Apply customer identification, verification, enhanced due diligence and ongoing review to digital asset activity; recognise money laundering, fraud, scam, sanctions and high-risk exposure indicators; and operate screening, escalation, case management and quality assurance workflows for compliance alerts.",
    sessions: "10 sessions (9 teaching + 1 assessment)",
    duration: "30 hours",
  },
  {
    title:
      "Module 3: On-Chain Monitoring, Wallet Exposure Review and Investigations",
    kind: "foundation",
    details:
      "Set up and triage monitoring scenarios for deposits, withdrawals, swaps, bridges and high-risk transaction patterns; assess wallet risk using clustering, attribution, exposure tracing and counterparty analysis; and prepare defensible investigation summaries that map fund flows for compliance, fraud and enforcement decisions.",
    sessions: "10 sessions (9 teaching + 1 assessment)",
    duration: "30 hours",
  },
  {
    title: "Module 4: DeFi, Token Risk, RegTech and AI-Assisted Monitoring",
    kind: "foundation",
    details:
      "Identify compliance risks across decentralised exchanges, lending protocols, mixers, bridges, smart contracts and collectible token marketplaces; use analytics, automation and AI-assisted tools for alert routing, risk scoring and case prioritisation; and define governance controls for model outputs, human review, limitations and auditability.",
    sessions: "10 sessions (9 teaching + 1 assessment)",
    duration: "30 hours",
  },
  {
    title: "Module 5: Governance, Reporting and Applied Compliance Projects",
    kind: "foundation",
    details:
      "Apply secure handling, privacy, confidentiality and professional conduct practices for customer records, wallet data and evidence files; prepare compliance reports, investigation memos, dashboards, management summaries and audit trails; and complete applied case projects covering onboarding review, alert triage, wallet investigation, sanctions escalation and final recommendations.",
    sessions: "10 sessions (9 teaching + 1 assessment)",
    duration: "30 hours",
  },
];

async function main() {
  const [existing] = await db
    .select()
    .from(courses)
    .where(eq(courses.slug, SLUG))
    .limit(1);

  let courseId: number;
  if (existing) {
    await db
      .update(courses)
      .set({ ...COURSE, updatedAt: new Date() })
      .where(eq(courses.id, existing.id));
    courseId = existing.id;
    console.log(`Updated course #${courseId} (${SLUG})`);
  } else {
    const [created] = await db.insert(courses).values(COURSE).returning();
    courseId = created.id;
    console.log(`Created course #${courseId} (${SLUG})`);
  }

  await db.delete(courseModules).where(eq(courseModules.courseId, courseId));
  await db.insert(courseModules).values(
    MODULES.map((m, i) => ({
      courseId,
      title: m.title,
      kind: m.kind,
      details: m.details,
      sessions: m.sessions,
      duration: m.duration,
      sortOrder: i,
    })),
  );
  console.log(`Seeded ${MODULES.length} modules.`);
  process.exit(0);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
