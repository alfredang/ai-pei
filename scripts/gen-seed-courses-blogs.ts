/**
 * Generates idempotent SQL to seed 2 new courses (+ modules) and 3 blog posts
 * into the production DB. Pure generation — does NOT connect to a database.
 * Reads article bodies from /tmp/blog{1,2,3}.{html,meta.json}.
 *
 * Run:  npx tsx scripts/gen-seed-courses-blogs.ts > /tmp/seed.sql
 */
import fs from "node:fs";
import { htmlToTipTap } from "../src/lib/tiptap-from-html";

const TAG = "$tia$";
const q = (s: string | null | undefined) => (s == null ? "NULL" : `${TAG}${s}${TAG}`);
const jsonb = (v: unknown) => `${TAG}${JSON.stringify(v)}${TAG}::jsonb`;

// ----------------------------- COURSES -----------------------------
type Mod = { title: string; kind: string; details: string; sessions: string; duration: string };
type Course = {
  slug: string; title: string; summary: string; overview: string; outcomes: string[];
  who: string[]; assessment: string; certificate: string; seoTitle: string; seoDescription: string;
  sortOrder: number; modules: Mod[];
};

const COURSES: Course[] = [
  {
    slug: "advanced-certificate-in-ai-security-analyst",
    title: "Advanced Certificate in AI Security Analyst",
    summary:
      "Specialise in securing AI and machine-learning systems, defending against AI-driven threats, using AI to strengthen security operations, and governing AI responsibly. A 120-hour, ~3.5-month live online Advanced Certificate.",
    overview:
      "The Advanced Certificate in AI Security Analyst equips cybersecurity practitioners with the specialised skills to secure AI and machine learning (ML) systems, defend against AI-driven threats, leverage AI to enhance security operations, and govern AI responsibly in line with global regulatory frameworks.\n\nUpon completion, learners will be able to identify and analyse AI-specific threats, implement security controls across the AI lifecycle, automate and augment security operations using AI tooling, and apply AI governance, risk and compliance (GRC) practices.\n\nDelivery: 100% live online (synchronous virtual classes), part-time over approximately 3.5 months. Total course hours: 120. Class frequency: 3 days per week, 3 hours per session, 7:00 PM – 10:00 PM (Singapore time). Each module runs 10 sessions (9 teaching + 1 assessment).\n\nMinimum entry requirements: at least 21 years old; at least C6 for GCE 'O' Level English; at least C6 for GCE 'O' Level in any 3 subjects. Recommended (not mandatory): basic IT/cyber security knowledge (e.g. CompTIA Security+ or equivalent) and basic Python/scripting familiarity.\n\nThis is a stackable modular programme — modular certificates stack towards the full Advanced Certificate.",
    outcomes: [
      "Identify and analyse AI/ML-specific threats across the AI lifecycle",
      "Implement security controls to protect AI and machine-learning systems",
      "Defend against adversarial ML, data poisoning, model theft and prompt injection",
      "Use AI tooling to automate and augment security operations and incident response",
      "Apply AI governance, risk and compliance (GRC) aligned to global frameworks",
    ],
    who: [
      "IT and cyber security professionals specialising in securing AI/ML systems (SOC analysts, security/system/network engineers)",
      "Cyber security practitioners using AI to enhance detection, response and operations",
      "Fresh graduates in IT, computer science, data science or engineering seeking career-ready AI security skills",
      "Mid-career professionals switching into AI security or AI-focused cyber security roles",
      "GRC analysts, auditors and compliance officers who need to govern AI systems",
      "ML/data practitioners moving into security-focused roles",
    ],
    assessment: "One assessment per module (pass required); minimum 75% attendance.",
    certificate:
      "Advanced Certificate in AI Security Analyst — awarded by Tertiary Infotech Academy upon achieving at least 75% attendance and passing all module assessments. A stackable modular programme; modular certificates stack towards the full Advanced Certificate.",
    seoTitle: "Advanced Certificate in AI Security Analyst in Singapore",
    seoDescription:
      "Secure AI/ML systems and defend against AI-driven threats. A 120-hour live online Advanced Certificate in AI Security Analyst in Singapore — for international students and career switchers.",
    sortOrder: 1,
    modules: [
      { title: "Module 1: AI Threats & the AI Attack Surface", kind: "foundation", details: "Identify and analyse AI/ML-specific threats — adversarial machine learning, data poisoning, model theft, prompt injection and the OWASP LLM Top 10. Map the AI attack surface across data, models and pipelines.", sessions: "10 sessions (9 teaching + 1 assessment)", duration: "30 hours" },
      { title: "Module 2: Securing the AI & Machine Learning Lifecycle", kind: "foundation", details: "Implement security controls across the AI lifecycle — secure data handling, model training, deployment and monitoring — and harden models and MLOps pipelines.", sessions: "10 sessions (9 teaching + 1 assessment)", duration: "30 hours" },
      { title: "Module 3: AI for Security Operations", kind: "foundation", details: "Use AI to enhance detection, triage and response — AI-augmented SOC workflows, anomaly detection and security automation.", sessions: "10 sessions (9 teaching + 1 assessment)", duration: "30 hours" },
      { title: "Module 4: AI Governance, Risk & Compliance (GRC)", kind: "foundation", details: "Govern AI responsibly — AI risk and assurance, responsible-AI practices, and alignment to global AI regulatory frameworks.", sessions: "10 sessions (9 teaching + 1 assessment)", duration: "30 hours" },
    ],
  },
  {
    slug: "advanced-certificate-in-agentic-ai-coding",
    title: "Advanced Certificate in Agentic AI Coding and Architecting",
    summary:
      "Build architect-level competency in designing, building and operating reliable AI agent systems with modern agentic tooling (including Claude Code). A 150-hour, ~4-month live online Advanced Certificate.",
    overview:
      "This Advanced Certificate develops architect-level competency in designing, building and operating reliable AI agent systems using modern agentic tooling, including Claude Code.\n\nUpon completion, learners will be able to architect production-grade agent systems, build agents with tool use, memory and multi-step reasoning, apply retrieval-augmented generation (RAG), orchestrate multi-agent systems, and operate agents reliably in production.\n\nDelivery: 100% live online (synchronous virtual classes), part-time over approximately 4 months. Total course hours: 150. Class frequency: 3 days per week (Mon, Wed, Fri), 3 hours per session, 7:00 PM – 10:00 PM (Singapore time). Each module runs 10 sessions (9 teaching + 1 assessment), plus a capstone.\n\nMinimum entry requirements: at least 21 years old; at least C6 for GCE 'O' Level English (or equivalent); a Diploma in IT/Computer Science/Engineering, OR GCE 'A' Level, OR relevant work experience. Basic programming and command-line literacy are required.\n\nThis is a stackable modular programme — modular certificates stack towards the full Advanced Certificate.",
    outcomes: [
      "Design and architect reliable, production-grade AI agent systems",
      "Build agents with tool use, memory and multi-step reasoning",
      "Apply retrieval-augmented generation (RAG) and context engineering",
      "Orchestrate multi-agent systems and tool integration",
      "Operate agents in production — evaluation, guardrails, observability and LLMOps",
      "Deliver an end-to-end agentic AI capstone project",
    ],
    who: [
      "Software engineers and developers building AI-powered applications who want to architect agentic systems",
      "Solutions architects and technical leads designing AI/LLM integrations",
      "DevOps / platform engineers integrating AI agents into CI/CD and automation pipelines",
      "Data scientists and ML practitioners moving into production agent design",
      "Technical product managers needing a working command of agent architecture",
      "IT professionals and consultants seeking a career-ready AI architecture credential",
    ],
    assessment: "One assessment per module plus a capstone project (pass required); minimum 75% attendance.",
    certificate:
      "Advanced Certificate in Agentic AI Coding and Architecting — awarded by Tertiary Infotech Academy upon achieving at least 75% attendance and passing all module assessments and the capstone. A stackable modular programme; modular certificates stack towards the full Advanced Certificate.",
    seoTitle: "Advanced Certificate in Agentic AI Coding & Architecting Singapore",
    seoDescription:
      "Design, build and operate reliable AI agent systems with modern agentic tooling. A 150-hour live online Advanced Certificate in Agentic AI Coding & Architecting in Singapore.",
    sortOrder: 2,
    modules: [
      { title: "Module 1: Foundations of LLMs & Agentic AI", kind: "foundation", details: "Large language model fundamentals, prompt engineering, the agent loop and tool use. Introduction to modern agentic tooling, including Claude Code.", sessions: "10 sessions (9 teaching + 1 assessment)", duration: "30 hours" },
      { title: "Module 2: Building AI Agents", kind: "foundation", details: "Function/tool calling, memory, multi-step reasoning and agent frameworks — build agents that plan and act reliably.", sessions: "10 sessions (9 teaching + 1 assessment)", duration: "30 hours" },
      { title: "Module 3: Retrieval-Augmented Generation (RAG) & Context Engineering", kind: "foundation", details: "Embeddings, vector stores, retrieval pipelines and context management to ground agents in your own knowledge.", sessions: "10 sessions (9 teaching + 1 assessment)", duration: "30 hours" },
      { title: "Module 4: Multi-Agent Systems & Orchestration", kind: "foundation", details: "Coordinate multiple agents — planning, delegation and tool integration (e.g. Model Context Protocol) — for complex workflows.", sessions: "10 sessions (9 teaching + 1 assessment)", duration: "30 hours" },
      { title: "Module 5: Architecting & Operating Production Agents", kind: "foundation", details: "Evaluation, guardrails, observability, LLMOps, deployment and reliability for agents running in production.", sessions: "10 sessions (9 teaching + 1 assessment)", duration: "30 hours" },
      { title: "Capstone Project", kind: "elective", details: "Design, build and ship an end-to-end agentic AI system, demonstrating architecture, reliability and production-readiness.", sessions: "Capstone", duration: "Project" },
    ],
  },
];

// ----------------------------- POSTS -----------------------------
const POSTS = [1, 2, 3].map((n) => {
  const html = fs.readFileSync(`/tmp/blog${n}.html`, "utf8");
  const meta = JSON.parse(fs.readFileSync(`/tmp/blog${n}.meta.json`, "utf8"));
  const words = html.replace(/<[^>]+>/g, " ").split(/\s+/).filter(Boolean).length;
  return { ...meta, html, content: htmlToTipTap(html), readingTime: Math.max(1, Math.round(words / 200)) };
});

// ----------------------------- EMIT SQL -----------------------------
const out: string[] = [];
out.push("BEGIN;");

for (const c of COURSES) {
  const values = c.modules
    .map((m, i) => `(${q(m.title)}, ${q(m.kind)}, ${q(m.details)}, ${q(m.sessions)}, ${q(m.duration)}, ${i})`)
    .join(",\n    ");
  out.push(`
WITH up AS (
  INSERT INTO courses (slug, title, certificate, summary, overview, outcomes, who_should_enroll, assessment, funding_tags, status, sort_order, seo_title, seo_description, created_at, updated_at)
  VALUES (${q(c.slug)}, ${q(c.title)}, ${q(c.certificate)}, ${q(c.summary)}, ${q(c.overview)}, ${q(c.outcomes.join("\n"))}, ${q(c.who.join("\n"))}, ${q(c.assessment)}, ${jsonb([])}, 'published', ${c.sortOrder}, ${q(c.seoTitle)}, ${q(c.seoDescription)}, now(), now())
  ON CONFLICT (slug) DO UPDATE SET
    title=EXCLUDED.title, certificate=EXCLUDED.certificate, summary=EXCLUDED.summary, overview=EXCLUDED.overview,
    outcomes=EXCLUDED.outcomes, who_should_enroll=EXCLUDED.who_should_enroll, assessment=EXCLUDED.assessment,
    status='published', sort_order=EXCLUDED.sort_order, seo_title=EXCLUDED.seo_title, seo_description=EXCLUDED.seo_description, updated_at=now()
  RETURNING id
), del AS ( DELETE FROM course_modules WHERE course_id = (SELECT id FROM up) )
INSERT INTO course_modules (course_id, title, kind, details, sessions, duration, sort_order)
SELECT (SELECT id FROM up), m.title, m.kind, m.details, m.sessions, m.duration, m.sort_order
FROM (VALUES
    ${values}
) AS m(title, kind, details, sessions, duration, sort_order);`);
}

for (const p of POSTS) {
  out.push(`
INSERT INTO posts (slug, title, excerpt, content, content_html, status, seo_title, seo_description, seo_keywords, author_id, reading_time, featured, published_at, created_at, updated_at)
VALUES (${q(p.slug)}, ${q(p.title)}, ${q(p.excerpt)}, ${jsonb(p.content)}, ${q(p.html)}, 'published', ${q(p.seoTitle)}, ${q(p.seoDescription)}, ${q(p.seoKeywords)}, 1, ${p.readingTime}, true, now(), now(), now())
ON CONFLICT (slug) DO UPDATE SET
  title=EXCLUDED.title, excerpt=EXCLUDED.excerpt, content=EXCLUDED.content, content_html=EXCLUDED.content_html,
  status='published', seo_title=EXCLUDED.seo_title, seo_description=EXCLUDED.seo_description, seo_keywords=EXCLUDED.seo_keywords,
  reading_time=EXCLUDED.reading_time, featured=true, updated_at=now();`);
}

out.push("COMMIT;");
process.stdout.write(out.join("\n") + "\n");
