import { eq } from "drizzle-orm";
import { db } from "../src/db";
import { courses, courseModules } from "../src/db/schema";

/**
 * Seeds the "Advanced Certificate in AI Risk Management" into the
 * DB so it renders at /courses/advanced-certificate-in-ai-risk-management.html
 * via the shared [slug] course page. Idempotent: upserts the course by slug, then
 * replaces its modules. Modelled on scripts/seed-courses.ts.
 *
 * Run: set -a; source .env; set +a; npx tsx scripts/seed-course-advanced-certificate-in-ai-risk-management.ts
 */

const SLUG = "advanced-certificate-in-ai-risk-management";

const COURSE = {
  slug: SLUG,
  title: "Advanced Certificate in AI Risk Management",
  status: "published" as const,
  summary:
    "Specialise in identifying, assessing, treating and governing the risks of AI and machine-learning systems — AI governance and ethics, risk across the AI life cycle, and an end-to-end AI risk program. A 90-hour, ~2.5-month live online Advanced Certificate.",
  overview: [
    "The Advanced Certificate in AI Risk Management equips professionals with the specialised skills to identify, assess, treat and govern the risks arising from artificial intelligence and machine-learning systems. Learners gain the practical capability to embed AI risk governance within existing enterprise frameworks, oversee risk at every stage of the AI life cycle, and deliver a complete AI risk program spanning risk assessment, treatment, controls, monitoring, supply chain risk and incident response.",
    "Upon completion, learners will be able to integrate AI risk governance with organisational frameworks and establish AI ownership, oversight and accountability; address regulatory compliance, legal considerations, trustworthiness and the ethical and societal implications of AI; manage risk across the AI life cycle from design and development through implementation, maintenance and decommissioning; and run an end-to-end AI risk program covering controls, metrics, monitoring, supply chain risk and incident response.",
    "Delivery: 100% live online (synchronous virtual classes), part-time over approximately 2.5 months. Total course hours: 90. Class frequency: 3 days per week, 3 hours per session, 7:00 PM – 10:00 PM (Singapore time). Each module runs 10 sessions (9 teaching + 1 assessment).",
    "Minimum entry requirements: at least 21 years old; at least C6 for GCE 'O' Level English; at least C6 for GCE 'O' Level in any 3 subjects. Recommended (not mandatory): basic IT and risk/governance knowledge (e.g. familiarity with enterprise risk management, IT governance or compliance frameworks) and a basic understanding of AI/ML concepts.",
    "This is a stackable modular programme — modular certificates stack towards the full Advanced Certificate.",
  ].join("\n\n"),
  outcomes: [
    "Integrate AI risk governance with organisational frameworks and establish AI ownership, oversight and accountability",
    "Develop AI policies, procedures and training, and address regulatory compliance, legal considerations and trustworthiness",
    "Evaluate the ethical and societal implications of AI, including ESG, for responsible and ethical adoption",
    "Manage risk across the AI life cycle — from design, development and documentation through training, validation, implementation, maintenance and decommissioning",
    "Identify and assess AI risk scenarios and apply risk treatment strategies, control evaluation, selection and validation",
    "Operate an end-to-end AI risk program with metrics, monitoring and reporting, supply chain and third-party risk management, and AI incident response, business continuity and disaster recovery",
  ].join("\n"),
  whoShouldEnroll: [
    "Risk, governance and compliance professionals who want to specialise in managing AI and machine-learning risk",
    "IT, cybersecurity and audit professionals responsible for AI oversight, controls and regulatory compliance",
    "Enterprise and operational risk managers extending their practice to cover AI systems",
    "Fresh graduates from business, IT, computer science, data science or risk-management programmes seeking career-ready AI risk skills",
    "Mid-career professionals seeking a career switch into AI risk, AI governance or AI assurance roles",
    "Data and ML practitioners, technical managers and team leads who need to understand risk, control and governance expectations for the systems they build",
  ].join("\n"),
  assessment: "One assessment per module (pass required); minimum 75% attendance.",
  certificate:
    "Advanced Certificate in AI Risk Management — awarded by Tertiary Infotech Academy upon achieving at least 75% attendance and passing all module assessments. A stackable modular programme; modular certificates stack towards the full Advanced Certificate.",
  sortOrder: 5,
  seoTitle: "Advanced Certificate in AI Risk Management Singapore",
  seoDescription:
    "Identify, assess, treat and govern AI risk with a 90-hour live online Advanced Certificate in AI Risk Management in Singapore — for career switchers & international students.",
};

const MODULES = [
  {
    title: "Module 1: AI Governance, Compliance and Ethical Risk Foundations",
    kind: "foundation",
    details:
      "Integrate AI risk governance with organisational frameworks; evaluate AI models, frameworks, strategies and use cases; align AI with organisational processes; establish AI ownership, oversight and accountability; develop AI policies, procedures and training; and address regulatory compliance, legal considerations, trustworthiness and the ethical and societal implications of AI (e.g. ESG).",
    sessions: "10 sessions (9 teaching + 1 assessment)",
    duration: "30 hours",
  },
  {
    title: "Module 2: Managing Risk Across the AI Life Cycle",
    kind: "foundation",
    details:
      "Manage risk across the AI life cycle, including AI design, development/procurement and documentation; model training, testing and validation; implementation, maintenance and decommissioning; and AI data and asset management.",
    sessions: "10 sessions (9 teaching + 1 assessment)",
    duration: "30 hours",
  },
  {
    title:
      "Module 3: End-to-End AI Risk Program: Controls, Monitoring and Incident Response",
    kind: "foundation",
    details:
      "Manage an AI risk program end to end, including risk scenario identification and assessment (threats, vulnerabilities and attacks); risk treatment strategies; controls evaluation, selection and validation; risk metrics, monitoring and reporting; AI supply chain and third-party risk; and AI incident response, business impact analysis, business continuity and disaster recovery.",
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
