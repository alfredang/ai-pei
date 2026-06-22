import { eq } from "drizzle-orm";
import { db } from "../src/db";
import { courses, courseModules } from "../src/db/schema";

/**
 * Seeds the "Advanced Certificate in AI Security and Governance Management" into
 * the DB so it renders at
 * /courses/advanced-certificate-in-ai-security-and-governance-management.html
 * via the shared [slug] course page. Idempotent: upserts the course by slug, then
 * replaces its modules. Modelled on scripts/seed-courses.ts.
 *
 * Run: set -a; source .env; set +a; npx tsx scripts/seed-course-advanced-certificate-in-ai-security-and-governance-management.ts
 */

const SLUG = "advanced-certificate-in-ai-security-and-governance-management";

const COURSE = {
  slug: SLUG,
  title: "Advanced Certificate in AI Security and Governance Management",
  status: "published" as const,
  summary:
    "Build and lead enterprise AI security governance — develop AI policies and programmes, manage AI-related risks, threats and supply chains, and architect security controls and monitoring for AI systems. A 117-hour, ~3.25-month live online Advanced Certificate.",
  overview: [
    "The Advanced Certificate in AI Security and Governance Management equips professionals with the specialised skills to govern, manage and secure artificial intelligence and machine-learning systems across the enterprise. Learners gain the practical capability to build and lead AI security governance and programmes, evaluate and mitigate AI-related risks, threats, vulnerabilities and supply chain exposures, and architect, implement and monitor security controls purpose-built for AI systems.",
    "Upon completion, learners will be able to advise stakeholders on AI security solutions through effective policy, data governance, programme management and incident response; develop AI-related strategies, policies and procedures aligned with industry frameworks and regulatory requirements; manage the AI asset and data life cycle; assess and treat AI-related risks, threats, vulnerabilities and supply chain issues; and apply security architecture, controls and monitoring tailored to AI systems across the AI life cycle.",
    "Delivery: 100% live online (synchronous virtual classes), part-time over approximately 3.25 months. Total course hours: 117. Class frequency: 3 days per week, 3 hours per session, 7:00 PM – 10:00 PM (Singapore time). Each module runs 13 sessions (12 teaching + 1 assessment).",
    "Minimum entry requirements: at least 21 years old; at least C6 at GCE 'O' Level in any 3 subjects, or equivalent; or a mature candidate who is at least 25 years old with at least 4 years of working experience.",
    "This is a stackable modular programme — modular certificates stack towards the full Advanced Certificate.",
  ].join("\n\n"),
  outcomes: [
    "Advise stakeholders on AI security solutions through effective policy, data governance, programme management and incident response, addressing industry frameworks and regulatory requirements",
    "Develop AI-related strategies, policies and procedures and manage the AI asset and data life cycle",
    "Build and manage an enterprise AI security programme and establish business continuity and incident response capabilities",
    "Assess and manage AI-related risks, threats, vulnerabilities and supply chain exposures across enterprise-wide AI adoption",
    "Apply security architecture, technologies, techniques and controls tailored to AI systems across the AI life cycle, including model selection, training and validation",
    "Implement data management, privacy, ethical, trust and safety controls, and establish security controls and continuous monitoring for AI systems",
  ].join("\n"),
  whoShouldEnroll: [
    "Cybersecurity and information security professionals who want to specialise in securing and governing AI and machine-learning systems",
    "Security managers, CISOs and security architects responsible for enterprise-wide AI security programmes",
    "IT, risk, governance and compliance professionals responsible for AI oversight, controls and regulatory compliance",
    "Fresh graduates from IT, computer science, data science, cybersecurity or business programmes seeking career-ready AI security management skills",
    "Mid-career professionals seeking a career switch into AI security management, AI governance or AI risk roles",
    "Data and ML practitioners, technical managers and team leads who need to understand security, control and governance expectations for the systems they build",
  ].join("\n"),
  assessment: "One assessment per module (pass required); minimum 75% attendance.",
  certificate:
    "Advanced Certificate in AI Security and Governance Management — awarded by Tertiary Infotech Academy upon achieving at least 75% attendance and passing all module assessments. A stackable modular programme; modular certificates stack towards the full Advanced Certificate.",
  sortOrder: 6,
  seoTitle: "Advanced Certificate in AI Security & Governance Singapore",
  seoDescription:
    "Govern and secure enterprise AI with a 117-hour live online Advanced Certificate in AI Security & Governance Management in Singapore — for career switchers & international students.",
};

const MODULES = [
  {
    title: "Module 1: AI Governance, Policy and Program Leadership",
    kind: "foundation",
    details:
      "Advise stakeholders on implementing AI security solutions through effective policy, data governance, programme management and incident response; address stakeholder considerations, industry frameworks and regulatory requirements; develop AI-related strategies, policies and procedures; manage the AI asset and data life cycle; build and manage an AI security programme; and establish business continuity and incident response.",
    sessions: "13 sessions (12 teaching + 1 assessment)",
    duration: "39 hours",
  },
  {
    title: "Module 2: Managing AI Risks, Threats and Supply Chains",
    kind: "foundation",
    details:
      "Assess and manage risks, threats, vulnerabilities and supply chain issues related to enterprise-wide AI adoption, including AI risk assessment, thresholds and treatment; AI threat and vulnerability management; and AI vendor and supply chain management.",
    sessions: "13 sessions (12 teaching + 1 assessment)",
    duration: "39 hours",
  },
  {
    title: "Module 3: AI Security Architecture, Controls and Monitoring",
    kind: "foundation",
    details:
      "Apply security technologies, techniques and controls tailored to AI systems, including AI security architecture and design; the AI life cycle (model selection, training and validation); data management controls; privacy, ethical, trust and safety controls; and security controls and monitoring.",
    sessions: "13 sessions (12 teaching + 1 assessment)",
    duration: "39 hours",
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
