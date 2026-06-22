import { eq } from "drizzle-orm";
import { db } from "../src/db";
import { courses, courseModules } from "../src/db/schema";

/**
 * Seeds the "Advanced Certificate in Cybersecurity Operations Analyst" into the
 * DB so it renders at /courses/advanced-certificate-in-cybersecurity-operations-analyst.html
 * via the shared [slug] course page. Idempotent: upserts the course by slug, then
 * replaces its modules. Modelled on scripts/seed-courses.ts.
 *
 * Run: set -a; source .env; set +a; npx tsx scripts/seed-course-cybersecurity-operations-analyst.ts
 */

const SLUG = "advanced-certificate-in-cybersecurity-operations-analyst";

const COURSE = {
  slug: SLUG,
  title: "Advanced Certificate in Cybersecurity Operations Analyst",
  status: "published" as const,
  summary:
    "Train as a front-line security operations analyst — monitor environments, detect and respond to incidents, manage vulnerabilities, and analyse adversary behaviour. A 150-hour, ~4-month live online Advanced Certificate.",
  overview: [
    "The Advanced Certificate in Cybersecurity Operations Analyst equips learners with the practical, hands-on skills required to operate as front-line cybersecurity operations analysts — assessing and safeguarding networks, systems and applications; detecting, analysing and responding to security incidents; applying cybersecurity governance, risk and compliance; establishing protective controls and managing vulnerabilities; and understanding adversary behaviour in order to anticipate and counter attacks.",
    "Upon completion, learners will be able to analyse IT and cloud infrastructure for security operations, monitor environments and handle incidents end to end, apply governance, risk and compliance principles, implement protective controls and vulnerability management, and assess the threat landscape and adversary techniques.",
    "Delivery: 100% live online (synchronous virtual classes), part-time over approximately 4 months. Total course hours: 150. Class frequency: 3 days per week, 3 hours per session, 7:00 PM – 10:00 PM (Singapore time). Each module runs 10 sessions (9 teaching + 1 assessment).",
    "Minimum entry requirements: at least 21 years old; at least C6 at GCE 'O' Level in any 3 subjects (or equivalent); or a mature candidate at least 25 years old with at least 4 years of working experience.",
    "This is a stackable modular programme — modular certificates stack towards the full Advanced Certificate.",
  ].join("\n\n"),
  outcomes: [
    "Analyse IT and cloud infrastructure — networking, operating systems, virtualisation, containerisation, applications and APIs — as the foundation for security operations",
    "Detect security incidents using data analytics, indicators of compromise/attack, logs, alerts and monitoring tools",
    "Respond to incidents through containment, forensic and malware analysis, and network traffic, packet and threat analysis",
    "Apply cybersecurity governance, risk and compliance principles and assess cyber risk across the enterprise",
    "Implement protective controls and manage vulnerabilities through assessment, identification, remediation and tracking",
    "Analyse the threat landscape and adversary means and methods to anticipate and counter attacks",
  ].join("\n"),
  whoShouldEnroll: [
    "IT and cyber security professionals specialising in security operations and incident detection and response (SOC analysts, security engineers, system/network administrators)",
    "Cyber security practitioners strengthening their threat detection, monitoring and response capabilities",
    "Fresh graduates in IT, computer science, data science or engineering seeking career-ready cybersecurity operations skills",
    "Mid-career professionals switching into cybersecurity operations or blue-team roles",
    "GRC analysts, auditors and compliance officers who need an operational understanding of cybersecurity and risk",
    "IT support and infrastructure staff moving into security-focused monitoring, detection and response roles",
  ].join("\n"),
  assessment: "One assessment per module (pass required); minimum 75% attendance.",
  certificate:
    "Advanced Certificate in Cybersecurity Operations Analyst — awarded by Tertiary Infotech Academy upon achieving at least 75% attendance and passing all module assessments. A stackable modular programme; modular certificates stack towards the full Advanced Certificate.",
  sortOrder: 3,
  seoTitle: "Advanced Certificate in Cybersecurity Operations Analyst Singapore",
  seoDescription:
    "Become a Cybersecurity Operations Analyst with a 150-hour live online Advanced Certificate in Singapore — SOC monitoring, incident response, threat intelligence & GRC. For career switchers and international students.",
};

const MODULES = [
  {
    title: "Module 1: Foundations of IT and Cloud Infrastructure",
    kind: "foundation",
    details:
      "Build the technical foundation for security operations — computer and cloud networking, devices, ports and protocols, network segmentation and tooling; operating systems, databases, the command line, virtualisation, containerisation and middleware; and applications, APIs, automated deployment, cloud applications and scripting.",
    sessions: "10 sessions (9 teaching + 1 assessment)",
    duration: "30 hours",
  },
  {
    title: "Module 2: Security Monitoring and Incident Handling",
    kind: "foundation",
    details:
      "Detect incidents using data analytics, detection use cases, indicators of compromise/attack, logs, alerts and monitoring tools; and respond through incident handling and containment, forensic analysis, malware analysis, network traffic and packet analysis, and threat analysis.",
    sessions: "10 sessions (9 teaching + 1 assessment)",
    duration: "30 hours",
  },
  {
    title: "Module 3: Governance, Risk and Compliance Fundamentals",
    kind: "foundation",
    details:
      "Apply cybersecurity principles — compliance, objectives, governance, risk management, roles and responsibilities and cybersecurity models; and assess cyber risk across applications, cloud technology, data, networks, supply chain, systems/endpoints and web applications.",
    sessions: "10 sessions (9 teaching + 1 assessment)",
    duration: "30 hours",
  },
  {
    title: "Module 4: Protective Controls and Vulnerability Management",
    kind: "foundation",
    details:
      "Implement protective controls — contingency planning, identity and access management, and industry best-practice frameworks and standards; and perform vulnerability management through assessment, identification, remediation and tracking.",
    sessions: "10 sessions (9 teaching + 1 assessment)",
    duration: "30 hours",
  },
  {
    title: "Module 5: Threat Intelligence and Adversary Analysis",
    kind: "foundation",
    details:
      "Analyse the threat landscape — attack vectors, threat actors and threat intelligence sources; and understand adversary means and methods including attack types, cyber attack stages, exploit techniques and penetration testing.",
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
