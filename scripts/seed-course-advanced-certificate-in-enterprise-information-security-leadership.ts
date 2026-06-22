import { eq } from "drizzle-orm";
import { db } from "../src/db";
import { courses, courseModules } from "../src/db/schema";

/**
 * Seeds the "Advanced Certificate in Enterprise Information Security Leadership"
 * into the DB so it appears in the /courses listing and renders at
 * /courses/advanced-certificate-in-enterprise-information-security-leadership.html
 * via the shared [slug] page. Data-only; idempotent upsert by slug.
 *
 * Run: set -a; source .env; set +a; npx tsx scripts/seed-course-advanced-certificate-in-enterprise-information-security-leadership.ts
 */

const SLUG = "advanced-certificate-in-enterprise-information-security-leadership";

const COURSE = {
  slug: SLUG,
  title: "Advanced Certificate in Enterprise Information Security Leadership",
  status: "published" as const,
  summary:
    "Develop enterprise-level competency to govern, design, validate and operate secure information systems — across eight stackable modules spanning governance, architecture, identity, assurance, cyber defence and secure software. A 240-hour, ~6-month live online Advanced Certificate.",
  overview: [
    "The Advanced Certificate in Enterprise Information Security Leadership develops enterprise-level competency in governing, designing, validating and operating secure information systems. Across eight stackable modules, learners progress from security governance, risk and asset protection through secure architecture, networks and identity, to security validation, cyber defence operations and secure software delivery.",
    "Upon completion, learners will be able to interpret ethical, legal, regulatory and organisational obligations; classify, manage and protect information assets; evaluate secure architecture, cryptographic controls and resilient engineering practices; design identity, authentication, authorisation and access lifecycle controls; plan security validation and remediation; coordinate operational security, incident response, continuity and recovery; and embed secure development and software supply chain practices into delivery workflows.",
    "Delivery: 100% live online (synchronous virtual classes), part-time over approximately 6 months. Total course hours: 240. Class frequency: 3 days per week (Mon, Wed, Fri), 3 hours per session, 7:00 PM – 10:00 PM (Singapore time). Each module runs 10 sessions (9 teaching + 1 assessment).",
    "Minimum entry requirements: at least 21 years old; at least C6 for GCE 'O' Level English; at least C6 for GCE 'O' Level in any 3 subjects. Recommended (not mandatory): basic IT/networking knowledge (e.g. CompTIA Network+ or Security+ or equivalent) and basic command-line/scripting familiarity.",
    "This is a stackable modular programme — modular certificates stack towards the full Advanced Certificate in Enterprise Information Security Leadership.",
  ].join("\n\n"),
  outcomes: [
    "Interpret ethical, legal, regulatory and organisational obligations governing enterprise information security",
    "Classify, manage and protect information assets across their lifecycle — in use, in transit and at rest",
    "Evaluate secure architecture, cryptography, protected networks and resilient engineering practices",
    "Design identity, authentication, authorisation and access lifecycle controls",
    "Plan security validation, testing and audit, and coordinate cyber defence operations, incident response and recovery",
    "Embed secure development and software supply chain practices into delivery workflows",
  ].join("\n"),
  whoShouldEnroll: [
    "IT, cyber security, risk and governance professionals broadening from technical security work into enterprise-level information security leadership",
    "Security analysts, security engineers, system/network administrators and application security practitioners seeking structured coverage of governance, architecture, operations, assurance and software security",
    "IT managers and team leads responsible for enterprise security decisions",
    "Fresh graduates in IT, computer science, cyber security, data science or engineering seeking a career-ready foundation in enterprise security practice",
    "Mid-career professionals transitioning into information security, cyber risk, security assurance or security management roles",
    "GRC, audit and compliance practitioners who need a broad command of enterprise security domains",
  ].join("\n"),
  assessment: "One assessment per module (pass required); minimum 75% attendance.",
  certificate:
    "Advanced Certificate in Enterprise Information Security Leadership — awarded by Tertiary Infotech Academy upon achieving at least 75% attendance and passing all module assessments. A stackable modular programme; modular certificates stack towards the full Advanced Certificate.",
  sortOrder: 4,
  seoTitle:
    "Advanced Certificate in Enterprise Information Security Leadership Singapore",
  seoDescription:
    "Govern, design, validate and operate secure enterprise information systems across 8 stackable modules. A 240-hour live online Advanced Certificate in Information Security Leadership in Singapore.",
};

const MODULES = [
  {
    title: "Module 1: Enterprise Security Governance and Risk Stewardship",
    kind: "foundation",
    details:
      "Apply professional ethics, governance structures, policy frameworks and accountability models. Analyse legal, privacy, compliance, investigation and third-party risk, and use continuity, personnel security, threat modelling and awareness planning to support risk-informed decisions.",
    sessions: "10 sessions (9 teaching + 1 assessment)",
    duration: "30 hours",
  },
  {
    title: "Module 2: Information Asset Classification and Protection",
    kind: "foundation",
    details:
      "Identify information and system assets, owners, custodians and usage requirements. Apply classification, handling, retention, disposal and lifecycle protection, and select data protection controls for information in use, in transit and at rest.",
    sessions: "10 sessions (9 teaching + 1 assessment)",
    duration: "30 hours",
  },
  {
    title: "Module 3: Secure Architecture, Engineering and Cryptography",
    kind: "foundation",
    details:
      "Apply secure design principles — least privilege, defence in depth, secure defaults and zero-trust thinking. Evaluate system, cloud, container, embedded, IoT and virtualisation risks, and select suitable cryptographic and lifecycle controls.",
    sessions: "10 sessions (9 teaching + 1 assessment)",
    duration: "30 hours",
  },
  {
    title: "Module 4: Protected Networks and Communications",
    kind: "foundation",
    details:
      "Interpret network models, secure protocols, segmentation, wireless/mobile, SDN and cloud networking. Assess infrastructure components, transmission media, endpoint safeguards and network access controls, and recommend secure channels for remote, collaborative and third-party connectivity.",
    sessions: "10 sessions (9 teaching + 1 assessment)",
    duration: "30 hours",
  },
  {
    title: "Module 5: Digital Identity and Access Control",
    kind: "foundation",
    details:
      "Control access to information, systems, devices, facilities, applications and services. Design identification, authentication, federation, credential and single sign-on approaches, and apply suitable access models across the account lifecycle.",
    sessions: "10 sessions (9 teaching + 1 assessment)",
    duration: "30 hours",
  },
  {
    title: "Module 6: Security Validation, Audit and Assurance",
    kind: "foundation",
    details:
      "Plan internal, external and third-party assessment, testing and audit strategies. Conduct vulnerability assessment, penetration testing, log review, code review and compliance validation, and analyse evidence to report remediation priorities.",
    sessions: "10 sessions (9 teaching + 1 assessment)",
    duration: "30 hours",
  },
  {
    title: "Module 7: Cyber Defence Operations and Resilience",
    kind: "foundation",
    details:
      "Support investigations, evidence handling, monitoring, threat intelligence and SIEM/IDPS operations. Apply configuration, patch, vulnerability, incident, change and resource protection practices, and coordinate recovery, continuity and safety activities.",
    sessions: "10 sessions (9 teaching + 1 assessment)",
    duration: "30 hours",
  },
  {
    title: "Module 8: Secure Software Lifecycle and Application Protection",
    kind: "foundation",
    details:
      "Integrate security into development methodologies, DevOps/DevSecOps and operational maintenance. Assess development ecosystems, CI/CD pipelines, repositories and application testing, and evaluate acquired software, open-source components and secure coding standards.",
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
