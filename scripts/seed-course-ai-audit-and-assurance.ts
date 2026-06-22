import { eq } from "drizzle-orm";
import { db } from "../src/db";
import { courses, courseModules } from "../src/db/schema";

/**
 * Seeds the "Advanced Certificate in AI Audit and Assurance" into the
 * DB so it renders at /courses/advanced-certificate-in-ai-audit-and-assurance.html
 * via the shared [slug] course page. Idempotent: upserts the course by slug, then
 * replaces its modules. Modelled on scripts/seed-courses.ts.
 *
 * Run: set -a; source .env; set +a; npx tsx scripts/seed-course-ai-audit-and-assurance.ts
 */

const SLUG = "advanced-certificate-in-ai-audit-and-assurance";

const COURSE = {
  slug: SLUG,
  title: "Advanced Certificate in AI Audit and Assurance",
  status: "published" as const,
  summary:
    "Specialise in governing, assessing and auditing AI and machine-learning systems — AI governance and risk, AI operations and lifecycle management, and planning and conducting AI audits. A 90-hour, ~2.5-month live online Advanced Certificate.",
  overview: [
    "The Advanced Certificate in AI Audit and Assurance equips professionals with the specialised skills to govern, assess and audit artificial intelligence and machine-learning systems. Learners gain the practical capability to guide responsible AI governance, manage AI-related risk and privacy, oversee AI operations throughout the solution lifecycle, and plan and conduct audits of AI systems using AI-specific techniques.",
    "Upon completion, learners will be able to establish AI governance and programme management practices, manage AI risk and implement privacy and data governance, assess organisational AI readiness and oversee AI operations across the solution lifecycle, plan and conduct audits of AI systems, and produce effective AI audit outputs and reports.",
    "Delivery: 100% live online (synchronous virtual classes), part-time over approximately 2.5 months. Total course hours: 90. Class frequency: 3 days per week, 3 hours per session, 7:00 PM – 10:00 PM (Singapore time). Each module runs 10 sessions (9 teaching + 1 assessment).",
    "Minimum entry requirements: at least 21 years old; at least C6 for GCE 'O' Level English; at least C6 for GCE 'O' Level in any 3 subjects. Recommended (not mandatory): basic IT and audit/governance knowledge (e.g. familiarity with internal audit, IT governance or risk frameworks) and a basic understanding of AI/ML concepts.",
    "This is a stackable modular programme — modular certificates stack towards the full Advanced Certificate.",
  ].join("\n\n"),
  outcomes: [
    "Establish AI governance and programme management practices and apply ethics, regulations and standards for responsible and ethical AI",
    "Manage AI-related risk and implement privacy and data governance programmes",
    "Assess organisational AI risk profile and readiness and oversee AI operations across the solution lifecycle",
    "Govern change management and supervise AI outputs, impacts and decisions, applying AI-specific testing techniques",
    "Plan, design and conduct audits of AI systems using audit testing, sampling and evidence-collection techniques",
    "Assure audit data quality with data analytics and produce effective AI audit outputs and reports",
  ].join("\n"),
  whoShouldEnroll: [
    "IT auditors, internal auditors and assurance professionals specialising in auditing AI and machine-learning systems",
    "Risk, governance and compliance professionals responsible for AI oversight and AI regulatory requirements",
    "Cybersecurity and IT professionals moving into AI audit, assurance or governance roles",
    "Fresh graduates from accountancy, IT, computer science, data science or business programmes seeking career-ready AI audit and assurance skills",
    "Mid-career professionals seeking a career switch into AI audit, AI assurance or AI governance roles",
    "Data and ML practitioners, technical managers and team leads who need to understand audit, control and governance expectations for AI systems",
  ].join("\n"),
  assessment: "One assessment per module (pass required); minimum 75% attendance.",
  certificate:
    "Advanced Certificate in AI Audit and Assurance — awarded by Tertiary Infotech Academy upon achieving at least 75% attendance and passing all module assessments. A stackable modular programme; modular certificates stack towards the full Advanced Certificate.",
  sortOrder: 4,
  seoTitle: "Advanced Certificate in AI Audit and Assurance Singapore",
  seoDescription:
    "Govern, assess and audit AI systems with a 90-hour live online Advanced Certificate in AI Audit and Assurance in Singapore — for career switchers & international students.",
};

const MODULES = [
  {
    title: "Module 1: AI Governance, Risk and Responsible AI",
    kind: "foundation",
    details:
      "Advise stakeholders on implementing AI solutions that meet organisational strategic goals; evaluate AI models, considerations and requirements; establish AI governance and programme management practices; manage AI risk; implement privacy and data governance programmes; and apply leading practices, ethics, regulations and standards for responsible and ethical AI.",
    sessions: "10 sessions (9 teaching + 1 assessment)",
    duration: "30 hours",
  },
  {
    title: "Module 2: AI Operations and Solution Lifecycle Management",
    kind: "foundation",
    details:
      "Assess an organisation's AI risk profile and readiness; manage data, development methodologies and the AI solution lifecycle; govern change management and the supervision of AI outputs, impacts and decisions; apply testing techniques for AI solutions; and identify threats, vulnerabilities and incident response practices specific to AI.",
    sessions: "10 sessions (9 teaching + 1 assessment)",
    duration: "30 hours",
  },
  {
    title: "Module 3: Auditing AI Systems – Tools and Techniques",
    kind: "foundation",
    details:
      "Optimise audit outcomes for AI systems through innovation; plan and design AI audits; apply audit testing, sampling and evidence-collection techniques; assure audit data quality using data analytics; and produce effective AI audit outputs and reports.",
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
