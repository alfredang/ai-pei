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
  },
  {
    title: "Module 2: CompTIA Security+ — Core Cyber Security Principles",
    kind: "foundation",
    details:
      "Introduces essential cybersecurity concepts including threat intelligence, security controls, risk management, and incident response. Learners develop the ability to secure networks, apply cryptographic principles, and implement access management strategies.",
  },
  {
    title: "Module 3: CompTIA Linux+ — Linux Systems & Security Administration",
    kind: "foundation",
    details:
      "Trains learners to configure, maintain, and secure Linux environments through command-line operations, file permissions, scripting, and network configuration. Essential for system administration, security operations, and cloud security roles.",
  },
  {
    title: "Module 4A (Elective): CompTIA CySA+ — Cybersecurity Analyst",
    kind: "elective",
    details:
      "Focuses on security analytics, threat detection, SIEM monitoring, and behavioral analysis. Learners gain practical experience in incident response, vulnerability management, and security automation. Prepares for SOC and defensive security roles.",
  },
  {
    title: "Module 4B (Elective): CompTIA PenTest+ — Penetration Testing & Ethical Hacking",
    kind: "elective",
    details:
      "Hands-on training in offensive security. Learners conduct vulnerability assessments, exploit network and application weaknesses, and perform post-exploitation activities using industry-standard tools. Prepares for penetration testing and red teaming roles.",
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
