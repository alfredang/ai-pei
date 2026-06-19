import { notFound } from "next/navigation";
import { db } from "@/db";
import { courses, courseModules } from "@/db/schema";
import { and, asc, eq } from "drizzle-orm";
import { Container } from "@/components/layout/Container";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CourseRegisterForm } from "@/components/sections/CourseRegisterForm";
import { InternationalStudentSupport } from "@/components/sections/InternationalStudentSupport";
import { fundingColor } from "@/lib/funding";
import { absoluteHtmlUrl, htmlPath } from "@/lib/html-url";
import {
  HiAcademicCap,
  HiCheckBadge,
  HiClipboardDocumentCheck,
  HiMapPin,
} from "react-icons/hi2";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.tertiaryinfotech.edu.sg";

// Shared boilerplate — identical for every course, edited here once.
const VENUE =
  "12 Woodlands Square #07-85/86/87 Woods Square Tower 1, Singapore 737715. 5 mins walk from Woodlands (NS9) MRT station. The venue is disabled-friendly.";
const CERTIFICATION_STATEMENTS = [
  "Certificate of Completion from Tertiary Infotech — upon meeting at least 75% attendance and passing the assessment(s).",
  "OpenCerts (Statement of Achievement) from SkillsFuture Singapore — after passing the assessment(s) and achieving at least 75% attendance.",
];
const POST_COURSE_SUPPORT =
  "We provide free consultation related to the subject matter after the course. Email your queries to enquiry@tertiaryinfotech.com and we will forward them to the subject matter experts.";
const CANCELLATION_POLICY =
  "You can register your interest without upfront payment. There is no penalty for withdrawal before the class commences. We reserve the right to cancel or re-schedule the course due to unforeseen circumstances; if cancelled, we refund 100% of any paid amount. The training venue is subject to change due to classroom availability.";

const CYBER_SECURITY_SLUG = "advanced-certificate-in-cyber-security";
const CYBERSECURITY_OPERATIONS_SLUG =
  "advanced-certificate-in-cybersecurity-operations-analyst";
const AI_AUDIT_ASSURANCE_SLUG = "advanced-certificate-in-ai-audit-and-assurance";

const CYBER_SECURITY_JOB_ROLES = [
  "IT Support Technician",
  "IT Helpdesk Specialist",
  "Desktop Support Engineer",
  "System Support Engineer",
  "Network Support Technician",
  "Junior System Administrator",
  "Linux System Administrator (Junior)",
  "Cybersecurity Technician",
  "Cybersecurity Executive",
  "Security Operations Center (SOC) Analyst - Level 1",
  "Cybersecurity Analyst (Junior)",
  "Threat Intelligence Assistant",
  "Incident Response Technician",
  "Vulnerability Assessment Assistant",
  "Penetration Testing Assistant (Junior Pen Tester)",
  "IT Security Compliance Assistant",
  "Information Security Administrator",
  "Network Security Technician",
  "Junior DevSecOps Support Engineer",
  "Cloud Security Support Technician",
];

const CYBER_SECURITY_MODULE_REGISTRATION_LINKS = [
  "https://www.tertiarycourses.com.sg/wsq-comptia-a-training.html",
  "https://www.tertiarycourses.com.sg/wsq-comptia-security-certification-prep.html",
  "https://www.tertiarycourses.com.sg/wsq-comptia-linux-training.html",
  "https://www.tertiarycourses.com.sg/wsq-comptia-cybersecurity-analyst-cysa-training.html",
  "https://www.tertiarycourses.com.sg/wsq-comptia-pentest-exam-prep.html",
];

const CYBER_SECURITY_TRAINERS = [
  {
    name: "Dr. Alfred Ang",
    qualification: "PhD in Electrical Engineering",
    conferredBy: "National University of Singapore",
    appointment: "Full-Time",
    programme: "Advanced Certificate in Cyber Security (E-Learning)",
    modules: ["CompTIA A+", "CompTIA Security+", "CompTIA Linux+", "CompTIA CySA+ / PenTest+"],
  },
  {
    name: "Dr. Sivanesan Sivakaruniam",
    qualification: "Graduate Diploma in Business Systems",
    conferredBy: "Monash University",
    appointment: "Part-Time",
    programme: "Advanced Certificate in Cyber Security (E-Learning)",
    modules: ["CompTIA Security+", "CompTIA CySA+ / PenTest+"],
  },
];

const CYBER_SECURITY_RECOMMENDED_COURSES = [
  {
    title: "WSQ - CompTIA Certified A+ Training (Core 1 and Core 2)",
    href: "https://www.tertiarycourses.com.sg/wsq-comptia-certified-a-training-core-1-and-core-2.html",
    reviews: "13 Review(s)",
    priceExclGst: "$2,000.00",
    priceInclGst: "$2,180.00",
  },
  {
    title: "WSQ - CompTIA Certified Linux+ Training",
    href: "https://www.tertiarycourses.com.sg/wsq-comptia-certified-linux-training.html",
    reviews: "2 Review(s)",
    priceExclGst: "$2,000.00",
    priceInclGst: "$2,180.00",
  },
  {
    title: "WSQ - CompTIA Cybersecurity Analyst (CySA+) Training",
    href: "https://www.tertiarycourses.com.sg/wsq-comptia-cybersecurity-analyst-cysa-training.html",
    priceExclGst: "$2,500.00",
    priceInclGst: "$2,725.00",
  },
  {
    title: "WSQ - CompTIA Certified SecurityX Training",
    href: "https://www.tertiarycourses.com.sg/wsq-comptia-certified-securityx-training.html",
    reviews: "10 Review(s)",
    priceExclGst: "$2,000.00",
    priceInclGst: "$2,180.00",
  },
  {
    title: "WSQ - CompTIA PenTest+ Training",
    href: "https://www.tertiarycourses.com.sg/wsq-comptia-pentest-training.html",
    priceExclGst: "$3,000.00",
    priceInclGst: "$3,270.00",
  },
  {
    title: "WSQ - CompTIA Certified Security+ Training",
    href: "https://www.tertiarycourses.com.sg/wsq-comptia-certified-security-training.html",
    reviews: "4 Review(s)",
    priceExclGst: "$2,000.00",
    priceInclGst: "$2,180.00",
  },
];

const CYBER_SECURITY_REVIEW_QUESTIONS = [
  "Do you find the course meet your expectation?",
  "Do you find the trainer knowledgeable in this subject?",
  "How do you find the training environment?",
];

type CourseTrainer = {
  name: string;
  qualification: string;
  conferredBy: string;
  appointment: string;
  programme: string;
  modules: string[];
};

type RecommendedCourse = {
  title: string;
  href: string;
  reviews?: string;
  priceExclGst?: string;
  priceInclGst?: string;
  note?: string;
};

type CoursePageExtras = {
  jobRoles: string[];
  moduleRegistrationLinks?: string[];
  trainers: CourseTrainer[];
  reviewCourseName: string;
  reviewQuestions: string[];
  recommendedCourses: RecommendedCourse[];
};

type CourseRecord = typeof courses.$inferSelect;
type CourseModuleRecord = typeof courseModules.$inferSelect;
type CourseData = {
  course: CourseRecord;
  modules: CourseModuleRecord[];
};

const CYBERSECURITY_OPERATIONS_JOB_ROLES = [
  "Cybersecurity Operations Analyst",
  "Security Operations Center (SOC) Analyst (Tier 1 / Tier 2)",
  "Incident Detection and Response Analyst",
  "Threat Detection / Threat Monitoring Analyst",
  "Cyber Threat Intelligence Analyst",
  "Incident Response Analyst",
  "Vulnerability Management Analyst",
  "Cybersecurity Analyst / Engineer",
  "Security Monitoring Specialist",
  "Cybersecurity Governance, Risk & Compliance (GRC) Analyst",
];

const CYBERSECURITY_OPERATIONS_TRAINERS = [
  {
    name: "Dr Ang Chew Hoe",
    qualification: "PhD in Electrical Engineering",
    conferredBy: "National University of Singapore",
    appointment: "Full-Time",
    programme: "Advanced Certificate in Cybersecurity Operations Analyst (E-Learning)",
    modules: [
      "Foundations of IT and Cloud Infrastructure",
      "Security Monitoring and Incident Handling",
      "Governance, Risk and Compliance Fundamentals",
      "Protective Controls and Vulnerability Management",
      "Threat Intelligence and Adversary Analysis",
    ],
  },
];

const CYBERSECURITY_OPERATIONS_RECOMMENDED_COURSES = [
  {
    title: "Advanced Certificate in Cyber Security",
    href: "/courses/advanced-certificate-in-cyber-security.html",
    note: "Build a broader CompTIA-aligned cyber security foundation before or after this operations pathway.",
  },
  {
    title: "Advanced Certificate in AI Security Analyst",
    href: "/courses/advanced-certificate-in-ai-security-analyst.html",
    note: "Extend blue-team skills into securing AI/ML systems and AI-assisted security operations.",
  },
  {
    title: "WSQ - CompTIA Cybersecurity Analyst (CySA+) Training",
    href: "https://www.tertiarycourses.com.sg/wsq-comptia-cybersecurity-analyst-cysa-training.html",
    priceExclGst: "$2,500.00",
    priceInclGst: "$2,725.00",
  },
  {
    title: "WSQ - CompTIA Certified Security+ Training",
    href: "https://www.tertiarycourses.com.sg/wsq-comptia-certified-security-training.html",
    reviews: "4 Review(s)",
    priceExclGst: "$2,000.00",
    priceInclGst: "$2,180.00",
  },
];

const AI_AUDIT_ASSURANCE_JOB_ROLES = [
  "AI Auditor / AI Audit Specialist",
  "AI Assurance Analyst",
  "IT Auditor (AI-focused)",
  "AI Governance, Risk & Compliance (GRC) Analyst",
  "AI Risk & Assurance Specialist",
  "Responsible AI / AI Compliance Officer",
  "AI Governance Analyst",
  "Internal Auditor (Technology / AI)",
  "Data & AI Risk Analyst",
  "Technology Risk Consultant",
];

const AI_AUDIT_ASSURANCE_TRAINERS = [
  {
    name: "Dr Ang Chew Hoe",
    qualification: "PhD in Electrical Engineering",
    conferredBy: "National University of Singapore",
    appointment: "Full-Time",
    programme: "Advanced Certificate in AI Audit and Assurance (E-Learning)",
    modules: [
      "AI Governance, Risk and Responsible AI",
      "AI Operations and Solution Lifecycle Management",
      "Auditing AI Systems - Tools and Techniques",
    ],
  },
];

const AI_AUDIT_ASSURANCE_RECOMMENDED_COURSES = [
  {
    title: "Advanced Certificate in AI Security Analyst",
    href: "/courses/advanced-certificate-in-ai-security-analyst.html",
    note: "Build adjacent skills in securing AI and machine-learning systems before or after this audit pathway.",
  },
  {
    title: "Advanced Certificate in Cybersecurity Operations Analyst",
    href: "/courses/advanced-certificate-in-cybersecurity-operations-analyst.html",
    note: "Strengthen operational security context for audit, assurance and technology-risk work.",
  },
  {
    title: "Advanced Certificate in Cyber Security",
    href: "/courses/advanced-certificate-in-cyber-security.html",
    note: "Develop a broader CompTIA-aligned cyber security foundation for technology audit roles.",
  },
  {
    title: "Advanced Certificate in Agentic AI Coding & Architecting",
    href: "/courses/advanced-certificate-in-agentic-ai-coding.html",
    note: "Understand how modern AI agent systems are built so audit planning and assurance work can go deeper.",
  },
];

const FALLBACK_DATE = new Date("2026-06-18T00:00:00.000+08:00");

const CYBERSECURITY_OPERATIONS_FALLBACK_COURSE: CourseRecord = {
  id: -3001,
  slug: CYBERSECURITY_OPERATIONS_SLUG,
  title: "Advanced Certificate in Cybersecurity Operations Analyst",
  courseCode: null,
  certificate:
    "Advanced Certificate in Cybersecurity Operations Analyst - awarded by Tertiary Infotech Academy. To be awarded the certificate, participants must achieve a pass in all required assessments and maintain a minimum attendance of 75% throughout the course.",
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
  priceExclGst: null,
  priceInclGst: null,
  fundingTags: [],
  brochureUrl: null,
  heroImage: null,
  status: "published",
  sortOrder: 3,
  seoTitle: "Advanced Certificate in Cybersecurity Operations Analyst in Singapore",
  seoDescription:
    "Train for front-line cybersecurity operations roles with a 150-hour synchronous e-learning Advanced Certificate covering SOC monitoring, incident handling, GRC, protective controls, vulnerability management and threat intelligence.",
  createdAt: FALLBACK_DATE,
  updatedAt: FALLBACK_DATE,
};

const CYBERSECURITY_OPERATIONS_FALLBACK_MODULES: CourseModuleRecord[] = [
  {
    id: -30011,
    courseId: CYBERSECURITY_OPERATIONS_FALLBACK_COURSE.id,
    title: "Module 1: Foundations of IT and Cloud Infrastructure",
    kind: "foundation",
    details:
      "Build the technical foundation for security operations: computer and cloud networking, devices, ports and protocols, network segmentation and tooling; operating systems, databases, command line, virtualisation/containerisation and middleware; and applications, APIs, automated deployment, cloud applications and scripting/coding.",
    sessions: "10 sessions (9 teaching + 1 assessment)",
    duration: "30 hours",
    registrationLink: null,
    sortOrder: 0,
  },
  {
    id: -30012,
    courseId: CYBERSECURITY_OPERATIONS_FALLBACK_COURSE.id,
    title: "Module 2: Security Monitoring and Incident Handling",
    kind: "foundation",
    details:
      "Detect incidents using data analytics, detection use cases, indicators of compromise and attack, logs, alerts and monitoring tools. Respond through incident handling and containment, forensic analysis, malware analysis, network traffic and packet analysis, and threat analysis.",
    sessions: "10 sessions (9 teaching + 1 assessment)",
    duration: "30 hours",
    registrationLink: null,
    sortOrder: 1,
  },
  {
    id: -30013,
    courseId: CYBERSECURITY_OPERATIONS_FALLBACK_COURSE.id,
    title: "Module 3: Governance, Risk and Compliance Fundamentals",
    kind: "foundation",
    details:
      "Apply cybersecurity principles including compliance, objectives, governance, risk management, roles and responsibilities and cybersecurity models. Assess cybersecurity risk across applications, cloud technology, data, networks, supply chain, systems/endpoints and web applications.",
    sessions: "10 sessions (9 teaching + 1 assessment)",
    duration: "30 hours",
    registrationLink: null,
    sortOrder: 2,
  },
  {
    id: -30014,
    courseId: CYBERSECURITY_OPERATIONS_FALLBACK_COURSE.id,
    title: "Module 4: Protective Controls and Vulnerability Management",
    kind: "foundation",
    details:
      "Implement protective controls including contingency planning, identity and access management, and industry best-practice frameworks and standards. Perform vulnerability management through assessment, identification, remediation and tracking.",
    sessions: "10 sessions (9 teaching + 1 assessment)",
    duration: "30 hours",
    registrationLink: null,
    sortOrder: 3,
  },
  {
    id: -30015,
    courseId: CYBERSECURITY_OPERATIONS_FALLBACK_COURSE.id,
    title: "Module 5: Threat Intelligence and Adversary Analysis",
    kind: "foundation",
    details:
      "Analyse the threat landscape including attack vectors, threat actors and threat intelligence sources. Understand adversary means and methods including attack types, cyber attack stages, exploit techniques and penetration testing.",
    sessions: "10 sessions (9 teaching + 1 assessment)",
    duration: "30 hours",
    registrationLink: null,
    sortOrder: 4,
  },
];

const AI_AUDIT_ASSURANCE_FALLBACK_COURSE: CourseRecord = {
  id: -4001,
  slug: AI_AUDIT_ASSURANCE_SLUG,
  title: "Advanced Certificate in AI Audit and Assurance",
  courseCode: null,
  certificate:
    "Advanced Certificate in AI Audit and Assurance - awarded by Tertiary Infotech Academy. To be awarded the certificate, participants must achieve a pass in all required assessments and maintain a minimum attendance of 75% throughout the course.",
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
  priceExclGst: null,
  priceInclGst: null,
  fundingTags: [],
  brochureUrl: null,
  heroImage: null,
  status: "published",
  sortOrder: 4,
  seoTitle: "Advanced Certificate in AI Audit and Assurance in Singapore",
  seoDescription:
    "Train to govern, assess and audit AI/ML systems with a 117-hour synchronous e-learning Advanced Certificate covering responsible AI, AI risk, AI operations, audit planning, evidence collection and assurance reporting.",
  createdAt: FALLBACK_DATE,
  updatedAt: FALLBACK_DATE,
};

const AI_AUDIT_ASSURANCE_FALLBACK_MODULES: CourseModuleRecord[] = [
  {
    id: -40011,
    courseId: AI_AUDIT_ASSURANCE_FALLBACK_COURSE.id,
    title: "Module 1: AI Governance, Risk and Responsible AI",
    kind: "foundation",
    details:
      "Advise stakeholders on implementing AI solutions that meet organisational strategic goals; evaluate AI models, considerations and requirements; establish AI governance and program management practices; manage AI risk; implement privacy and data governance programs; and apply leading practices, ethics, regulations and standards for responsible and ethical AI.",
    sessions: "13 sessions (12 teaching + 1 assessment)",
    duration: "39 hours",
    registrationLink: null,
    sortOrder: 0,
  },
  {
    id: -40012,
    courseId: AI_AUDIT_ASSURANCE_FALLBACK_COURSE.id,
    title: "Module 2: AI Operations and Solution Lifecycle Management",
    kind: "foundation",
    details:
      "Assess an organisation's AI risk profile and readiness; manage data, development methodologies and the AI solution lifecycle; govern change management and the supervision of AI outputs, impacts and decisions; apply testing techniques for AI solutions; and identify threats, vulnerabilities and incident response practices specific to AI.",
    sessions: "13 sessions (12 teaching + 1 assessment)",
    duration: "39 hours",
    registrationLink: null,
    sortOrder: 1,
  },
  {
    id: -40013,
    courseId: AI_AUDIT_ASSURANCE_FALLBACK_COURSE.id,
    title: "Module 3: Auditing AI Systems - Tools and Techniques",
    kind: "foundation",
    details:
      "Optimise audit outcomes for AI systems through innovation; plan and design AI audits; apply audit testing, sampling and evidence-collection techniques; assure audit data quality using data analytics; and produce effective AI audit outputs and reports.",
    sessions: "13 sessions (12 teaching + 1 assessment)",
    duration: "39 hours",
    registrationLink: null,
    sortOrder: 2,
  },
];

function coursePageExtras(slug: string): CoursePageExtras | null {
  if (slug === CYBER_SECURITY_SLUG) {
    return {
      jobRoles: CYBER_SECURITY_JOB_ROLES,
      moduleRegistrationLinks: CYBER_SECURITY_MODULE_REGISTRATION_LINKS,
      trainers: CYBER_SECURITY_TRAINERS,
      reviewCourseName: "[MC] Advanced Certificate in Cyber Security (E-Learning)",
      reviewQuestions: CYBER_SECURITY_REVIEW_QUESTIONS,
      recommendedCourses: CYBER_SECURITY_RECOMMENDED_COURSES,
    };
  }

  if (slug === CYBERSECURITY_OPERATIONS_SLUG) {
    return {
      jobRoles: CYBERSECURITY_OPERATIONS_JOB_ROLES,
      trainers: CYBERSECURITY_OPERATIONS_TRAINERS,
      reviewCourseName:
        "[MC] Advanced Certificate in Cybersecurity Operations Analyst (E-Learning)",
      reviewQuestions: CYBER_SECURITY_REVIEW_QUESTIONS,
      recommendedCourses: CYBERSECURITY_OPERATIONS_RECOMMENDED_COURSES,
    };
  }

  if (slug === AI_AUDIT_ASSURANCE_SLUG) {
    return {
      jobRoles: AI_AUDIT_ASSURANCE_JOB_ROLES,
      trainers: AI_AUDIT_ASSURANCE_TRAINERS,
      reviewCourseName: "[MC] Advanced Certificate in AI Audit and Assurance (E-Learning)",
      reviewQuestions: CYBER_SECURITY_REVIEW_QUESTIONS,
      recommendedCourses: AI_AUDIT_ASSURANCE_RECOMMENDED_COURSES,
    };
  }

  return null;
}

function normalizeCourseSlug(slug: string) {
  return slug.endsWith(".html") ? slug.slice(0, -5) : slug;
}

function fallbackCourse(slug: string): CourseData | null {
  if (slug === CYBERSECURITY_OPERATIONS_SLUG) {
    return {
      course: CYBERSECURITY_OPERATIONS_FALLBACK_COURSE,
      modules: CYBERSECURITY_OPERATIONS_FALLBACK_MODULES,
    };
  }

  if (slug === AI_AUDIT_ASSURANCE_SLUG) {
    return {
      course: AI_AUDIT_ASSURANCE_FALLBACK_COURSE,
      modules: AI_AUDIT_ASSURANCE_FALLBACK_MODULES,
    };
  }

  return null;
}

async function getCourse(slug: string): Promise<CourseData | null> {
  const courseSlug = normalizeCourseSlug(slug);

  try {
    const [c] = await db
      .select()
      .from(courses)
      .where(and(eq(courses.slug, courseSlug), eq(courses.status, "published")))
      .limit(1);
    if (!c) return fallbackCourse(courseSlug);
    const mods = await db
      .select()
      .from(courseModules)
      .where(eq(courseModules.courseId, c.id))
      .orderBy(asc(courseModules.sortOrder));
    return { course: c, modules: mods };
  } catch (error) {
    const fallback = fallbackCourse(courseSlug);
    if (fallback) return fallback;
    throw error;
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const data = await getCourse(slug);
  if (!data) return { title: "Course not found" };
  const { course: c } = data;
  const title = c.seoTitle || `${c.title} in Singapore`;
  const description =
    c.seoDescription ||
    c.summary ||
    `${c.title} at Tertiary Infotech Academy — a hands-on Advanced Certificate in Singapore for international students and career switchers.`;
  return {
    title,
    description,
    alternates: { canonical: htmlPath(`/courses/${c.slug}`) },
    openGraph: {
      type: "website",
      url: htmlPath(`/courses/${c.slug}`),
      title: `${c.title} | Tertiary Infotech Academy`,
      description,
      locale: "en_SG",
      siteName: "Tertiary Infotech Academy",
      ...(c.heroImage ? { images: [{ url: c.heroImage }] } : {}),
    },
  };
}

/** Split a textarea value into bullet lines. */
function lines(text: string | null | undefined): string[] {
  if (!text) return [];
  return text
    .split("\n")
    .map((l) => l.replace(/^[-•*]\s*/, "").trim())
    .filter(Boolean);
}

function moduleRegistrationLink(
  savedLink: string | null,
  extras: CoursePageExtras | null,
  index: number,
) {
  return savedLink || extras?.moduleRegistrationLinks?.[index] || null;
}

function courseDeliveryInfo(slug: string) {
  if (slug === CYBERSECURITY_OPERATIONS_SLUG) {
    return {
      heading: "Delivery Mode",
      text: "100% synchronous e-learning through live virtual classes. Classes run 3 days per week, 7:00 PM to 10:00 PM Singapore time, with online practical labs in cloud sandbox, SIEM, network analysis and forensic analysis environments.",
      courseMode: "Online",
    };
  }

  if (slug === AI_AUDIT_ASSURANCE_SLUG) {
    return {
      heading: "Delivery Mode",
      text: "100% synchronous e-learning through live virtual classes. Classes run 3 days per week, 7:00 PM to 10:00 PM Singapore time, with online practical labs in cloud sandbox, AI audit tooling and data analytics environments.",
      courseMode: "Online",
    };
  }

  return { heading: "Venue", text: VENUE, courseMode: "Onsite" };
}

export default async function CourseDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const data = await getCourse(slug);
  if (!data) notFound();
  const { course: c, modules } = data;

  const outcomeItems = lines(c.outcomes);
  const enrollItems = lines(c.whoShouldEnroll);
  const extras = coursePageExtras(c.slug);
  const deliveryInfo = courseDeliveryInfo(c.slug);
  const isOnlineCourse = deliveryInfo.courseMode === "Online";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Course",
    name: c.title,
    url: absoluteHtmlUrl(BASE, `/courses/${c.slug}`),
    ...(c.summary || c.seoDescription
      ? { description: c.seoDescription || c.summary }
      : {}),
    ...(c.courseCode ? { courseCode: c.courseCode } : {}),
    inLanguage: "en",
    ...(c.certificate ? { educationalCredentialAwarded: "Advanced Certificate" } : {}),
    provider: {
      "@type": "EducationalOrganization",
      name: "Tertiary Infotech Academy",
      url: BASE,
      sameAs: BASE,
    },
    hasCourseInstance: {
      "@type": "CourseInstance",
      courseMode: deliveryInfo.courseMode,
      ...(!isOnlineCourse
        ? {
            location: {
              "@type": "Place",
              name: "Tertiary Infotech Academy",
              address: {
                "@type": "PostalAddress",
                streetAddress: "12 Woodlands Square #07-85/86/87 Woods Square Tower 1",
                addressLocality: "Singapore",
                postalCode: "737715",
                addressCountry: "SG",
              },
            },
          }
        : {}),
    },
  };

  return (
    <>
      <Navbar />
      <main>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        {/* Hero */}
        <section className="relative pt-10 pb-12 overflow-hidden">
          <div className="grid-bg opacity-50" />
          <div
            className="glow-blob"
            style={{
              top: "-20%",
              right: "5%",
              width: 520,
              height: 520,
              background: "radial-gradient(circle, #59EBFD 0%, transparent 65%)",
              opacity: 0.1,
            }}
          />
          <Container className="relative">
            <div className="kicker mb-4">[ WSQ ADVANCED CERTIFICATE ]</div>
            <h1 className="font-display text-[clamp(2rem,5vw,3.5rem)] font-extrabold leading-[1.05] max-w-4xl">
              {c.title}
            </h1>
            {c.summary && (
              <p className="mt-5 text-(--color-muted) text-lg max-w-2xl">{c.summary}</p>
            )}

            <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm">
              {c.courseCode && (
                <span className="font-mono text-white/60">
                  Course Code: <span className="text-white">{c.courseCode}</span>
                </span>
              )}
              {c.priceExclGst && (
                <span className="text-white">
                  <span className="font-semibold">{c.priceExclGst}</span>{" "}
                  <span className="text-white/50">excl. GST</span>
                  {c.priceInclGst && (
                    <span className="text-white/50">
                      {" "}
                      · {c.priceInclGst} incl. GST
                    </span>
                  )}
                </span>
              )}
            </div>

            {(c.fundingTags ?? []).length > 0 && (
              <div className="mt-5 flex flex-wrap gap-2">
                {(c.fundingTags ?? []).map((t) => (
                  <span
                    key={t}
                    style={{ backgroundColor: fundingColor(t) }}
                    className="px-3 py-1 rounded-full text-xs font-semibold text-white"
                  >
                    {t}
                  </span>
                ))}
              </div>
            )}

            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#register" className="btn-primary">
                Register Your Interest →
              </a>
              {c.brochureUrl && (
                <a
                  href={c.brochureUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-5 py-2.5 rounded-lg border border-(--color-cyan)/40 text-(--color-cyan) hover:bg-(--color-cyan)/10 transition text-sm"
                >
                  Download Brochure
                </a>
              )}
            </div>
          </Container>
        </section>

        {/* Overview */}
        {c.overview && (
          <section className="py-12">
            <Container className="max-w-3xl">
              <div className="kicker mb-4">[ COURSE OVERVIEW ]</div>
              <h2 className="font-display text-2xl md:text-3xl font-extrabold mb-5">
                What’s This Course About
              </h2>
              <div className="space-y-4 text-(--color-muted) leading-relaxed whitespace-pre-line">
                {c.overview}
              </div>
            </Container>
          </section>
        )}

        {/* Modules */}
        {modules.length > 0 && (
          <section className="py-12">
            <Container>
              <div className="text-center mb-10">
                <div className="kicker mb-4">[ MODULES ]</div>
                <h2 className="font-display text-2xl md:text-3xl font-extrabold">
                  Course <span className="gradient-text">Modules</span>
                </h2>
              </div>
              <div className="grid md:grid-cols-2 gap-5">
                {modules.map((m, i) => (
                  <div key={m.id} className="glass p-6 flex flex-col">
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-mono text-xs text-(--color-cyan)">
                        Module {String(i + 1).padStart(2, "0")}
                      </span>
                      {m.kind && (
                        <span
                          className={`px-2 py-0.5 rounded-full text-[10px] uppercase tracking-wide border ${
                            m.kind === "elective"
                              ? "text-(--color-amber) border-(--color-amber)/40 bg-(--color-amber)/10"
                              : "text-(--color-cyan) border-(--color-cyan)/40 bg-(--color-cyan)/10"
                          }`}
                        >
                          {m.kind}
                        </span>
                      )}
                    </div>
                    <h3 className="font-display font-bold text-lg text-white mb-2">
                      {m.title}
                    </h3>
                    {m.details && (
                      <p className="text-sm text-(--color-muted) leading-relaxed whitespace-pre-line flex-1">
                        {m.details}
                      </p>
                    )}
                    {(m.sessions || m.duration) && (
                      <div className="mt-4 flex flex-wrap gap-x-5 gap-y-1 text-xs font-mono text-white/55">
                        {m.sessions && <span>◷ {m.sessions}</span>}
                        {m.duration && <span>⏱ {m.duration}</span>}
                      </div>
                    )}
                    {moduleRegistrationLink(
                      m.registrationLink,
                      extras,
                      i,
                    ) && (
                      <a
                        href={
                          moduleRegistrationLink(
                            m.registrationLink,
                            extras,
                            i,
                          ) ?? undefined
                        }
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-4 text-xs text-(--color-cyan) hover:underline font-mono"
                      >
                        Register for this module →
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </Container>
          </section>
        )}

        {/* Outcomes + Who should enroll */}
        {(outcomeItems.length > 0 || enrollItems.length > 0) && (
          <section className="py-12">
            <Container className="grid md:grid-cols-2 gap-6">
              {outcomeItems.length > 0 && (
                <div className="glass p-7">
                  <div className="flex items-center gap-2 mb-4">
                    <HiAcademicCap className="w-5 h-5 text-(--color-cyan)" />
                    <h2 className="font-display font-bold text-xl">Program Outcomes</h2>
                  </div>
                  <ul className="space-y-2.5">
                    {outcomeItems.map((o, i) => (
                      <li key={i} className="flex gap-3 text-sm text-(--color-muted)">
                        <HiCheckBadge className="w-5 h-5 text-(--color-green) shrink-0 mt-0.5" />
                        <span>{o}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {enrollItems.length > 0 && (
                <div className="glass p-7">
                  <div className="flex items-center gap-2 mb-4">
                    <HiClipboardDocumentCheck className="w-5 h-5 text-(--color-purple-light)" />
                    <h2 className="font-display font-bold text-xl">Who Should Enroll</h2>
                  </div>
                  <ul className="space-y-2.5">
                    {enrollItems.map((o, i) => (
                      <li key={i} className="flex gap-3 text-sm text-(--color-muted)">
                        <span className="text-(--color-cyan) shrink-0">→</span>
                        <span>{o}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </Container>
          </section>
        )}

        {extras && (
          <>
            <section className="py-12">
              <Container>
                <div className="text-center mb-10">
                  <div className="kicker mb-4">[ CAREER PATHWAYS ]</div>
                  <h2 className="font-display text-2xl md:text-3xl font-extrabold">
                    Job <span className="gradient-text">Roles</span>
                  </h2>
                </div>
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  {extras.jobRoles.map((role, i) => (
                    <div
                      key={role}
                      className="glass-soft p-4 flex gap-3 items-start min-h-20"
                    >
                      <span className="font-mono text-xs text-(--color-cyan) shrink-0">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="text-sm text-white/85 leading-snug">{role}</span>
                    </div>
                  ))}
                </div>
              </Container>
            </section>

            <section className="py-12">
              <Container>
                <div className="text-center mb-10">
                  <div className="kicker mb-4">[ TRAINERS ]</div>
                  <h2 className="font-display text-2xl md:text-3xl font-extrabold">
                    Programme <span className="gradient-text">Trainers</span>
                  </h2>
                </div>
                <div className="overflow-x-auto rounded-lg border border-white/8">
                  <table className="w-full min-w-[860px] text-sm">
                    <thead className="bg-white/5 text-white">
                      <tr>
                        <th className="px-4 py-3 text-left font-display">SN</th>
                        <th className="px-4 py-3 text-left font-display">Name</th>
                        <th className="px-4 py-3 text-left font-display">
                          Highest Education Qualification
                        </th>
                        <th className="px-4 py-3 text-left font-display">Conferred By</th>
                        <th className="px-4 py-3 text-left font-display">
                          Full-/Part-Time
                        </th>
                        <th className="px-4 py-3 text-left font-display">
                          Programme Taught
                        </th>
                        <th className="px-4 py-3 text-left font-display">Modules</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/8">
                      {extras.trainers.map((trainer, i) => (
                        <tr key={trainer.name} className="bg-white/[0.02]">
                          <td className="px-4 py-4 text-white/60 font-mono">{i + 1}</td>
                          <td className="px-4 py-4 text-white font-semibold">
                            {trainer.name}
                          </td>
                          <td className="px-4 py-4 text-(--color-muted)">
                            {trainer.qualification}
                          </td>
                          <td className="px-4 py-4 text-(--color-muted)">
                            {trainer.conferredBy}
                          </td>
                          <td className="px-4 py-4 text-(--color-muted)">
                            {trainer.appointment}
                          </td>
                          <td className="px-4 py-4 text-(--color-muted)">
                            {trainer.programme}
                          </td>
                          <td className="px-4 py-4">
                            <div className="flex flex-wrap gap-1.5">
                              {trainer.modules.map((module) => (
                                <span
                                  key={module}
                                  className="px-2 py-1 rounded-full text-xs text-(--color-cyan) bg-(--color-cyan)/10 border border-(--color-cyan)/25"
                                >
                                  {module}
                                </span>
                              ))}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Container>
            </section>
          </>
        )}

        {/* Certification + course info */}
        <section className="py-12">
          <Container className="grid md:grid-cols-2 gap-6">
            <div className="glass p-7">
              <div className="flex items-center gap-2 mb-4">
                <HiCheckBadge className="w-5 h-5 text-(--color-green)" />
                <h2 className="font-display font-bold text-xl">Certification</h2>
              </div>
              {c.certificate ? (
                <div className="text-sm text-(--color-muted) leading-relaxed whitespace-pre-line">
                  {c.certificate}
                </div>
              ) : (
                <ul className="space-y-2.5">
                  {CERTIFICATION_STATEMENTS.map((s, i) => (
                    <li key={i} className="flex gap-3 text-sm text-(--color-muted)">
                      <HiCheckBadge className="w-5 h-5 text-(--color-green) shrink-0 mt-0.5" />
                      <span>{s}</span>
                    </li>
                  ))}
                </ul>
              )}
              {c.assessment && (
                <p className="mt-4 text-sm text-white/70">
                  <span className="text-white/50">Assessment:</span> {c.assessment}
                </p>
              )}
            </div>
            <div className="glass p-7">
              <div className="flex items-center gap-2 mb-4">
                <HiMapPin className="w-5 h-5 text-(--color-cyan)" />
                <h2 className="font-display font-bold text-xl">
                  {deliveryInfo.heading}
                </h2>
              </div>
              <p className="text-sm text-(--color-muted) leading-relaxed">
                {deliveryInfo.text}
              </p>
            </div>
          </Container>
        </section>

        {/* Support + policy */}
        <section className="pb-12">
          <Container className="grid md:grid-cols-2 gap-6">
            <div className="glass p-7">
              <h2 className="font-display font-bold text-lg mb-3">Post-Course Support</h2>
              <p className="text-sm text-(--color-muted) leading-relaxed">
                {POST_COURSE_SUPPORT}
              </p>
            </div>
            <div className="glass p-7">
              <h2 className="font-display font-bold text-lg mb-3">
                Cancellation &amp; Reschedule Policy
              </h2>
              <p className="text-sm text-(--color-muted) leading-relaxed">
                {CANCELLATION_POLICY}
              </p>
            </div>
          </Container>
        </section>

        {extras && (
          <>
            <section className="py-12">
              <Container>
                <div className="text-center mb-10">
                  <div className="kicker mb-4">[ REVIEW ]</div>
                  <h2 className="font-display text-2xl md:text-3xl font-extrabold">
                    Course <span className="gradient-text">Review</span>
                  </h2>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="glass p-7">
                    <h3 className="font-display font-bold text-lg mb-3">
                      Write Your Own Review
                    </h3>
                    <p className="text-sm text-(--color-muted) leading-relaxed mb-5">
                      You are reviewing: {extras.reviewCourseName}
                    </p>
                    <div className="space-y-3">
                      {extras.reviewQuestions.map((question, i) => (
                        <div
                          key={question}
                          className="p-4 rounded-lg bg-white/3 border border-white/6"
                        >
                          <div className="text-xs font-mono text-(--color-cyan) mb-1">
                            Question {i + 1}
                          </div>
                          <p className="text-sm text-white/85">{question}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="glass p-7">
                    <h3 className="font-display font-bold text-lg mb-3">
                      Review Information
                    </h3>
                    <ul className="space-y-2.5 text-sm text-(--color-muted)">
                      <li className="flex gap-3">
                        <HiCheckBadge className="w-5 h-5 text-(--color-green) shrink-0 mt-0.5" />
                        <span>Ratings use a 1-star to 5-star scale.</span>
                      </li>
                      <li className="flex gap-3">
                        <HiCheckBadge className="w-5 h-5 text-(--color-green) shrink-0 mt-0.5" />
                        <span>Reviews include nickname, summary, and detailed feedback.</span>
                      </li>
                      <li className="flex gap-3">
                        <HiCheckBadge className="w-5 h-5 text-(--color-green) shrink-0 mt-0.5" />
                        <span>
                          Review submissions are moderated before publication.
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              </Container>
            </section>

            <section className="py-12">
              <Container>
                <div className="text-center mb-10">
                  <div className="kicker mb-4">[ RECOMMENDED COURSES ]</div>
                  <h2 className="font-display text-2xl md:text-3xl font-extrabold">
                    Related <span className="gradient-text">Courses</span>
                  </h2>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {extras.recommendedCourses.map((course) => {
                    const external = course.href.startsWith("http");

                    return (
                      <a
                        key={course.href}
                        href={course.href}
                        target={external ? "_blank" : undefined}
                        rel={external ? "noopener noreferrer" : undefined}
                        className="glass p-5 hover:border-(--color-cyan)/35 transition-colors"
                      >
                        <h3 className="font-display font-bold text-white leading-snug mb-3">
                          {course.title}
                        </h3>
                        {course.reviews && (
                          <p className="text-xs text-(--color-amber) mb-3">
                            {course.reviews}
                          </p>
                        )}
                        {course.note && (
                          <p className="text-sm text-(--color-muted) leading-relaxed mb-3">
                            {course.note}
                          </p>
                        )}
                        {course.priceExclGst && (
                          <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1 text-sm">
                            <span className="font-semibold text-white">
                              {course.priceExclGst}
                            </span>
                            <span className="text-white/45">GST-exclusive</span>
                          </div>
                        )}
                        {course.priceInclGst && (
                          <p className="mt-1 text-xs text-white/45">
                            {course.priceInclGst} GST-inclusive
                          </p>
                        )}
                      </a>
                    );
                  })}
                </div>
              </Container>
            </section>
          </>
        )}

        {/* International student support */}
        <InternationalStudentSupport />

        {/* Register */}
        <CourseRegisterForm
          courseTitle={c.title}
          courseSlug={c.slug}
          modules={modules.map((m) => m.title)}
        />
      </main>
      <Footer />
    </>
  );
}
