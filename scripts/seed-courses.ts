import { eq } from "drizzle-orm";
import { db } from "../src/db";
import { courses, courseModules } from "../src/db/schema";

/**
 * Seeds the flagship "Advanced Certificate in Cyber Security" into the DB so it
 * appears in the /courses listing. Its slug matches the existing hardcoded route
 * at /courses/advanced-certificate-in-cyber-security, so the listing card links
 * to that polished page (static routes win over the dynamic [slug]). This record
 * also serves as a fully-filled worked example for every field.
 *
 * Run: set -a; source .env; set +a; npx tsx scripts/seed-courses.ts
 */

const SLUG = "advanced-certificate-in-cyber-security";
const CYBERSECURITY_OPERATIONS_SLUG =
  "advanced-certificate-in-cybersecurity-operations-analyst";
const AI_AUDIT_ASSURANCE_SLUG = "advanced-certificate-in-ai-audit-and-assurance";

const COURSE = {
  slug: SLUG,
  title: "Advanced Certificate in Cyber Security",
  courseCode: "TGS-2025060519",
  status: "published" as const,
  summary:
    "A stackable WSQ training pathway — three foundation CompTIA modules (A+, Security+, Linux+) plus one elective (CySA+ or PenTest+). Up to 70% WSQ funding, SkillsFuture Credit claimable.",
  overview: [
    "The Advanced Certificate in Cyber Security is a comprehensive training pathway consisting of four stackable WSQ modules—three foundation modules (CompTIA A+, Security+, Linux+) and one elective module (CompTIA CySA+ or PenTest+). These modules are designed to build progressively from fundamental IT skills to specialized cybersecurity competencies.",
    "Each module follows the official CompTIA syllabus, ensuring strong industry alignment and relevance to the cybersecurity job market. Learners will gain practical, hands-on experience in IT support, system administration, network security, threat detection, and vulnerability assessment.",
    "All four modules are eligible for WSQ funding of up to 70%, significantly reducing the out-of-pocket cost for Singaporeans and Permanent Residents. The remaining net course fees can also be claimed using SkillsFuture Credit, making the program highly accessible.",
    "Upon completion of the required modules, participants will be well-prepared for globally recognized CompTIA certification exams and equipped for roles such as IT Support Technician, Security Analyst, SOC Analyst, Cybersecurity Technician, or Penetration Tester.",
  ].join("\n\n"),
  outcomes: [
    "Develop a solid foundation in IT support, networking, system administration, and security principles.",
    "Acquire job-ready cybersecurity skills aligned with CompTIA industry standards.",
    "Gain hands-on experience through practical labs and real-world case scenarios.",
    "Be prepared to sit for globally recognized CompTIA certification exams (A+, Security+, Linux+, CySA+, PenTest+).",
    "Qualify for roles such as IT Support Technician, Security Analyst, SOC Analyst, Cybersecurity Technician, Penetration Tester, or Vulnerability Assessor.",
  ].join("\n"),
  whoShouldEnroll: [
    "Aspiring cybersecurity professionals",
    "Career switchers entering the IT or cybersecurity field",
    "Technical staff seeking skills upgrading",
    "Individuals aiming for CompTIA certifications",
  ].join("\n"),
  assessment: "Written Exam, Practical Exam (2 hrs)",
  priceExclGst: "$9,000.00",
  priceInclGst: "$9,810.00",
  fundingTags: [
    "WSQ",
    "SkillsFuture Credit",
    "PSEA",
    "UTAP",
    "SFEC",
    "Absentee Payroll",
    "MCES",
  ],
  certificate: [
    "Certificate of Completion from Tertiary Infotech — upon meeting at least 75% attendance and passing the assessment(s).",
    "OpenCerts (Statement of Achievement) from SkillsFuture Singapore — after passing the assessment(s) and achieving at least 75% attendance, certifying the Competency Standard(s) in the Skills Framework.",
  ].join("\n\n"),
  sortOrder: 0,
  seoTitle: "Advanced Certificate in Cyber Security | WSQ Funded",
  seoDescription:
    "Earn the WSQ Advanced Certificate in Cyber Security with 4 stackable CompTIA modules — A+, Security+, Linux+, CySA+/PenTest+. Up to 70% WSQ funding. SkillsFuture Credit claimable.",
};

const MODULES = [
  {
    title: "Module 1: CompTIA A+ — IT Support & Infrastructure Fundamentals",
    kind: "foundation",
    details:
      "Builds a strong foundation in IT support, covering hardware, operating systems, networking basics, and essential troubleshooting skills. Prepares learners to manage IT infrastructure, perform system diagnostics, and maintain secure device configurations.",
    registrationLink: "https://www.tertiarycourses.com.sg/wsq-comptia-a-training.html",
  },
  {
    title: "Module 2: CompTIA Security+ — Core Cyber Security Principles",
    kind: "foundation",
    details:
      "Introduces essential cybersecurity concepts including threat intelligence, security controls, risk management, and incident response. Learners develop the ability to secure networks, apply cryptographic principles, and implement access management strategies.",
    registrationLink:
      "https://www.tertiarycourses.com.sg/wsq-comptia-security-certification-prep.html",
  },
  {
    title: "Module 3: CompTIA Linux+ — Linux Systems & Security Administration",
    kind: "foundation",
    details:
      "Trains learners to configure, maintain, and secure Linux environments through command-line operations, file permissions, scripting, and network configuration. Essential for system administration, security operations, and cloud security roles.",
    registrationLink: "https://www.tertiarycourses.com.sg/wsq-comptia-linux-training.html",
  },
  {
    title: "Module 4A (Elective): CompTIA CySA+ — Cybersecurity Analyst",
    kind: "elective",
    details:
      "Focuses on security analytics, threat detection, SIEM monitoring, and behavioral analysis. Learners gain practical experience in incident response, vulnerability management, and security automation. Prepares for SOC and defensive security roles.",
    registrationLink:
      "https://www.tertiarycourses.com.sg/wsq-comptia-cybersecurity-analyst-cysa-training.html",
  },
  {
    title: "Module 4B (Elective): CompTIA PenTest+ — Penetration Testing & Ethical Hacking",
    kind: "elective",
    details:
      "Hands-on training in offensive security. Learners conduct vulnerability assessments, exploit network and application weaknesses, and perform post-exploitation activities using industry-standard tools. Prepares for penetration testing and red teaming roles.",
    registrationLink: "https://www.tertiarycourses.com.sg/wsq-comptia-pentest-exam-prep.html",
  },
];

const CYBERSECURITY_OPERATIONS_COURSE = {
  slug: CYBERSECURITY_OPERATIONS_SLUG,
  title: "Advanced Certificate in Cybersecurity Operations Analyst",
  status: "published" as const,
  summary:
    "A 150-hour, 100% synchronous e-learning programme for front-line cybersecurity operations analysts. Build practical skills in infrastructure, monitoring, incident handling, GRC, protective controls, vulnerability management and threat intelligence.",
  overview: [
    "The Advanced Certificate in Cybersecurity Operations Analyst equips learners with the practical, hands-on skills required to operate as front-line cybersecurity operations analysts.",
    "Upon successful completion, learners will demonstrate the ability to assess and safeguard networks, systems and applications; detect, analyse and respond to security incidents; apply principles of cybersecurity governance, risk and compliance; establish protective controls and manage vulnerabilities; and comprehend adversary behaviour in order to anticipate and counter attacks.",
    "Delivery: 100% synchronous e-learning through live virtual classes. The course is delivered part-time over about 4 months, 3 days per week, from 7:00 PM to 10:00 PM. Total course hours: 150 hours, comprising 69 hours of online practical labs, 66 hours of live instructor-led virtual lectures and demonstrations, and 15 hours of assessment.",
    "Each module consists of 10 sessions: 9 teaching/practical sessions and 1 assessment session. Practical work is delivered through online lab environments such as cloud sandbox, SIEM, network analysis and forensic analysis tools.",
    "Minimum entry requirements: at least 21 years old; at least C6 at GCE O-Level in any 3 subjects, or equivalent; or mature candidate who is at least 25 years old with at least 4 years of working experience.",
    "This is a stackable modular programme. Modular certificates stack towards the award of the Advanced Certificate in Cybersecurity Operations Analyst.",
  ].join("\n\n"),
  outcomes: [
    "Assess and safeguard networks, systems and applications.",
    "Detect, analyse and respond to security incidents using logs, alerts, monitoring tools and incident handling methods.",
    "Apply cybersecurity governance, risk and compliance fundamentals across applications, cloud technology, data, networks, supply chain, systems, endpoints and web applications.",
    "Establish protective controls and perform vulnerability assessment, identification, remediation and tracking.",
    "Analyse threat landscapes, attack vectors, threat actors, threat intelligence sources and adversary methods.",
  ].join("\n"),
  whoShouldEnroll: [
    "IT and cybersecurity professionals who want to specialise in security operations and incident detection and response, including SOC analysts, security engineers, system administrators and network administrators.",
    "Cybersecurity practitioners seeking to strengthen their threat detection, monitoring and response capabilities.",
    "Fresh graduates from IT, computer science, data science or engineering programmes who want career-ready cybersecurity operations skills.",
    "Mid-career professionals seeking a career switch into cybersecurity operations or blue-team roles.",
    "GRC analysts, auditors and compliance officers who need an operational understanding of cybersecurity principles and risk.",
    "IT support and infrastructure staff moving into security-focused roles who need to monitor, detect and respond to threats.",
    "Technical managers or team leads who need a strong cybersecurity operations foundation to guide teams or projects.",
  ].join("\n"),
  assessment:
    "Five 3-hour online assessments, one after each module. Participants must pass all required assessments and maintain at least 75% attendance.",
  fundingTags: [],
  certificate:
    "Advanced Certificate in Cybersecurity Operations Analyst - awarded by Tertiary Infotech Academy. To be awarded the certificate, participants must achieve a pass in all required assessments and maintain a minimum attendance of 75% throughout the course.",
  sortOrder: 3,
  seoTitle: "Advanced Certificate in Cybersecurity Operations Analyst in Singapore",
  seoDescription:
    "Train for front-line cybersecurity operations roles with a 150-hour synchronous e-learning Advanced Certificate covering SOC monitoring, incident handling, GRC, protective controls, vulnerability management and threat intelligence.",
};

const CYBERSECURITY_OPERATIONS_MODULES = [
  {
    title: "Module 1: Foundations of IT and Cloud Infrastructure",
    kind: "foundation",
    details:
      "Build the technical foundation for security operations: computer and cloud networking, devices, ports and protocols, network segmentation and tooling; operating systems, databases, command line, virtualisation/containerisation and middleware; and applications, APIs, automated deployment, cloud applications and scripting/coding.",
    sessions: "10 sessions (9 teaching + 1 assessment)",
    duration: "30 hours",
  },
  {
    title: "Module 2: Security Monitoring and Incident Handling",
    kind: "foundation",
    details:
      "Detect incidents using data analytics, detection use cases, indicators of compromise and attack, logs, alerts and monitoring tools. Respond through incident handling and containment, forensic analysis, malware analysis, network traffic and packet analysis, and threat analysis.",
    sessions: "10 sessions (9 teaching + 1 assessment)",
    duration: "30 hours",
  },
  {
    title: "Module 3: Governance, Risk and Compliance Fundamentals",
    kind: "foundation",
    details:
      "Apply cybersecurity principles including compliance, objectives, governance, risk management, roles and responsibilities and cybersecurity models. Assess cybersecurity risk across applications, cloud technology, data, networks, supply chain, systems/endpoints and web applications.",
    sessions: "10 sessions (9 teaching + 1 assessment)",
    duration: "30 hours",
  },
  {
    title: "Module 4: Protective Controls and Vulnerability Management",
    kind: "foundation",
    details:
      "Implement protective controls including contingency planning, identity and access management, and industry best-practice frameworks and standards. Perform vulnerability management through assessment, identification, remediation and tracking.",
    sessions: "10 sessions (9 teaching + 1 assessment)",
    duration: "30 hours",
  },
  {
    title: "Module 5: Threat Intelligence and Adversary Analysis",
    kind: "foundation",
    details:
      "Analyse the threat landscape including attack vectors, threat actors and threat intelligence sources. Understand adversary means and methods including attack types, cyber attack stages, exploit techniques and penetration testing.",
    sessions: "10 sessions (9 teaching + 1 assessment)",
    duration: "30 hours",
  },
];

const AI_AUDIT_ASSURANCE_COURSE = {
  slug: AI_AUDIT_ASSURANCE_SLUG,
  title: "Advanced Certificate in AI Audit and Assurance",
  status: "published" as const,
  summary:
    "A 117-hour, 100% synchronous e-learning programme for professionals who need to govern, assess and audit artificial intelligence and machine-learning systems.",
  overview: [
    "The Advanced Certificate in AI Audit and Assurance equips professionals with the specialised skills to govern, assess and audit artificial intelligence and machine-learning systems.",
    "On completing the course, learners will be equipped to guide responsible AI governance, manage AI-related risk and privacy, oversee AI operations throughout the solution lifecycle, and plan and conduct audits of AI systems using AI-specific techniques.",
    "Delivery: 100% synchronous e-learning through live virtual classes. The course is delivered part-time over about 3.25 months, 3 days per week, from 7:00 PM to 10:00 PM. Total course hours: 117 hours, comprising 54 hours of hands-on online practical labs, 54 hours of live instructor-led virtual lectures and demonstrations, and 9 hours of assessment.",
    "Each module consists of 13 sessions: 12 teaching/practical sessions and 1 assessment session. Practical work is delivered through online lab environments such as cloud sandbox, AI audit tooling and data analytics environments.",
    "Minimum entry requirements: at least 21 years old; at least C6 at GCE O-Level in any 3 subjects, or equivalent; or mature candidate who is at least 25 years old with at least 4 years of working experience.",
    "This is a stackable modular programme. Modular certificates stack towards the award of the Advanced Certificate in AI Audit and Assurance.",
  ].join("\n\n"),
  outcomes: [
    "Advise stakeholders on AI governance, responsible AI practices, ethics, regulations and standards.",
    "Assess AI models, organisational AI readiness, AI risk profiles and privacy/data governance requirements.",
    "Oversee AI operations, change management and the AI solution lifecycle.",
    "Apply testing techniques, audit planning, sampling, evidence collection and data analytics to AI audits.",
    "Produce effective AI audit outputs and assurance reports for stakeholders.",
  ].join("\n"),
  whoShouldEnroll: [
    "IT auditors, internal auditors and assurance professionals who want to specialise in auditing AI and machine-learning systems.",
    "Risk, governance and compliance professionals responsible for AI oversight and AI regulatory requirements.",
    "Cybersecurity and IT professionals moving into AI audit, assurance or governance roles.",
    "Fresh graduates from accountancy, IT, computer science, data science or business programmes seeking career-ready AI audit and assurance skills.",
    "Mid-career professionals seeking a career switch into AI audit, AI assurance or AI governance roles.",
    "Data and ML practitioners who need to understand audit, control and governance expectations for the systems they build.",
    "Technical managers or team leads who need a strong AI audit and governance foundation to guide their teams or projects.",
  ].join("\n"),
  assessment:
    "Three 3-hour online assessments, one after each module. Participants must pass all required assessments and maintain at least 75% attendance.",
  fundingTags: [],
  certificate:
    "Advanced Certificate in AI Audit and Assurance - awarded by Tertiary Infotech Academy. To be awarded the certificate, participants must achieve a pass in all required assessments and maintain a minimum attendance of 75% throughout the course.",
  sortOrder: 4,
  seoTitle: "Advanced Certificate in AI Audit and Assurance in Singapore",
  seoDescription:
    "Train to govern, assess and audit AI/ML systems with a 117-hour synchronous e-learning Advanced Certificate covering responsible AI, AI risk, AI operations, audit planning, evidence collection and assurance reporting.",
};

const AI_AUDIT_ASSURANCE_MODULES = [
  {
    title: "Module 1: AI Governance, Risk and Responsible AI",
    kind: "foundation",
    details:
      "Advise stakeholders on implementing AI solutions that meet organisational strategic goals; evaluate AI models, considerations and requirements; establish AI governance and program management practices; manage AI risk; implement privacy and data governance programs; and apply leading practices, ethics, regulations and standards for responsible and ethical AI.",
    sessions: "13 sessions (12 teaching + 1 assessment)",
    duration: "39 hours",
  },
  {
    title: "Module 2: AI Operations and Solution Lifecycle Management",
    kind: "foundation",
    details:
      "Assess an organisation's AI risk profile and readiness; manage data, development methodologies and the AI solution lifecycle; govern change management and the supervision of AI outputs, impacts and decisions; apply testing techniques for AI solutions; and identify threats, vulnerabilities and incident response practices specific to AI.",
    sessions: "13 sessions (12 teaching + 1 assessment)",
    duration: "39 hours",
  },
  {
    title: "Module 3: Auditing AI Systems - Tools and Techniques",
    kind: "foundation",
    details:
      "Optimise audit outcomes for AI systems through innovation; plan and design AI audits; apply audit testing, sampling and evidence-collection techniques; assure audit data quality using data analytics; and produce effective AI audit outputs and reports.",
    sessions: "13 sessions (12 teaching + 1 assessment)",
    duration: "39 hours",
  },
];

type CourseSeed = {
  slug: string;
  course: typeof courses.$inferInsert;
  modules: Array<{
    title: string;
    kind: string;
    details: string;
    sessions?: string;
    duration?: string;
    registrationLink?: string;
  }>;
};

const COURSE_SEEDS: CourseSeed[] = [
  { slug: SLUG, course: COURSE, modules: MODULES },
  {
    slug: CYBERSECURITY_OPERATIONS_SLUG,
    course: CYBERSECURITY_OPERATIONS_COURSE,
    modules: CYBERSECURITY_OPERATIONS_MODULES,
  },
  {
    slug: AI_AUDIT_ASSURANCE_SLUG,
    course: AI_AUDIT_ASSURANCE_COURSE,
    modules: AI_AUDIT_ASSURANCE_MODULES,
  },
];

async function main() {
  for (const seed of COURSE_SEEDS) {
  const [existing] = await db
    .select()
    .from(courses)
      .where(eq(courses.slug, seed.slug))
    .limit(1);

  let courseId: number;
  if (existing) {
    await db
      .update(courses)
        .set({ ...seed.course, updatedAt: new Date() })
      .where(eq(courses.id, existing.id));
    courseId = existing.id;
      console.log(`Updated course #${courseId} (${seed.slug})`);
  } else {
      const [created] = await db.insert(courses).values(seed.course).returning();
    courseId = created.id;
      console.log(`Created course #${courseId} (${seed.slug})`);
  }

  await db.delete(courseModules).where(eq(courseModules.courseId, courseId));
  await db.insert(courseModules).values(
      seed.modules.map((m, i) => ({
      courseId,
      title: m.title,
      kind: m.kind,
      details: m.details,
        sessions: m.sessions ?? null,
        duration: m.duration ?? null,
        registrationLink: m.registrationLink ?? null,
      sortOrder: i,
    })),
  );
    console.log(`Seeded ${seed.modules.length} modules for ${seed.slug}.`);
  }
  process.exit(0);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
