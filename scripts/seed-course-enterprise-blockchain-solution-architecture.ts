import { eq } from "drizzle-orm";
import { db } from "../src/db";
import { courses, courseModules } from "../src/db/schema";

/**
 * Seeds the "Advanced Certificate in Enterprise Blockchain Solution Architecture"
 * into the DB so it appears in the /courses listing and renders at
 * /courses/advanced-certificate-in-enterprise-blockchain-solution-architecture.html
 * via the shared dynamic [slug] page. Data only — no page/component changes.
 *
 * Run: set -a; source .env; set +a; npx tsx scripts/seed-course-enterprise-blockchain-solution-architecture.ts
 */

const SLUG = "advanced-certificate-in-enterprise-blockchain-solution-architecture";

const COURSE = {
  slug: SLUG,
  title: "Advanced Certificate in Enterprise Blockchain Solution Architecture",
  status: "published" as const,
  summary:
    "Design enterprise-grade blockchain and distributed ledger solutions — from architecture and node operations to governance, security and platform selection across Ethereum, Hyperledger Fabric, Corda, Cardano and Quorum. A 150-hour, ~4-month live online Advanced Certificate.",
  overview: [
    "The Advanced Certificate in Enterprise Blockchain Solution Architecture equips learners with the practical skills to analyse business requirements, design decentralised and permissioned ledger solutions, operate blockchain network components, and evaluate platform choices for enterprise use cases.",
    "Upon completion, learners will be able to explain distributed ledger concepts; design secure, scalable blockchain architectures; select suitable development tools, node infrastructure, consensus models and storage patterns; compare major enterprise blockchain platforms; apply governance and risk controls; and produce an implementation-ready blockchain solution blueprint.",
    "Delivery: 100% live online (synchronous virtual classes), part-time over approximately 4 months (~17 weeks). Total course hours: 150. Class frequency: 3 days per week, 3 hours per session, 7:00 PM – 10:00 PM (Singapore time). The programme comprises five modules; each module runs 10 sessions (9 teaching + 1 assessment).",
    "Minimum entry requirements: at least 21 years old; at least C6 at GCE 'O' Level in any 3 subjects (or equivalent); or a mature candidate at least 25 years old with at least 4 years of working experience.",
    "This is a stackable modular programme — modular certificates stack towards the full Advanced Certificate.",
  ].join("\n\n"),
  outcomes: [
    "Explain distributed ledger, blockchain and smart contract concepts for enterprise environments",
    "Design secure, scalable and implementation-ready enterprise blockchain architectures",
    "Select suitable development tools, node infrastructure, consensus models and storage patterns",
    "Set up, configure and operate blockchain network nodes and supporting infrastructure",
    "Apply governance, security, risk and compliance controls to blockchain deployments",
    "Evaluate and recommend enterprise blockchain platforms — Ethereum, Hyperledger Fabric, Corda, Cardano and Quorum",
  ].join("\n"),
  whoShouldEnroll: [
    "IT professionals, software engineers and solution architects designing blockchain-enabled enterprise systems",
    "Developers moving from application development into blockchain architecture, decentralised applications or smart contract design",
    "System, cloud, DevOps and network engineers supporting node infrastructure and distributed ledger operations",
    "Business analysts, product managers and digital transformation professionals evaluating blockchain use cases",
    "Risk, compliance, audit and governance professionals needing a practical grasp of blockchain architecture and controls",
    "Fresh graduates and career switchers seeking career-ready blockchain solution architecture skills",
  ].join("\n"),
  assessment: "One assessment per module (pass required); minimum 75% attendance.",
  certificate:
    "Advanced Certificate in Enterprise Blockchain Solution Architecture — awarded by Tertiary Infotech Academy upon achieving at least 75% attendance and passing all module assessments. A stackable modular programme; modular certificates stack towards the full Advanced Certificate.",
  sortOrder: 4,
  seoTitle: "Enterprise Blockchain Solution Architecture Certificate Singapore",
  seoDescription:
    "Design secure enterprise blockchain and distributed ledger solutions across Ethereum, Hyperledger, Corda & Quorum. A 150-hour live online Advanced Certificate in Singapore — for international students and career switchers.",
};

const MODULES = [
  {
    title: "Module 1: Distributed Ledger and Blockchain Core Concepts",
    kind: "foundation",
    details:
      "Explain the purpose of distributed ledgers in enterprise environments; understand blocks, transactions, hashing, consensus, wallets, tokens and smart contracts; and compare public, private and consortium network models across finance, supply chain, identity and digital-asset use cases.",
    sessions: "10 sessions (9 teaching + 1 assessment)",
    duration: "30 hours",
  },
  {
    title: "Module 2: Blockchain Architecture and Enterprise Solution Design",
    kind: "foundation",
    details:
      "Take on the blockchain solution architect role — gather business, technical and governance requirements; design network topology, identity, access control, consensus, data flow and integration patterns; evaluate scalability and performance; and produce an implementation-ready enterprise blockchain blueprint.",
    sessions: "10 sessions (9 teaching + 1 assessment)",
    duration: "30 hours",
  },
  {
    title: "Module 3: Blockchain Development Infrastructure and Node Operations",
    kind: "foundation",
    details:
      "Identify suitable blockchain tools, frameworks, wallets, explorers, APIs, SDKs and deployment utilities; set up and configure network nodes; and apply operational practices for node synchronisation, connectivity, monitoring and resilience of distributed ledger infrastructure.",
    sessions: "10 sessions (9 teaching + 1 assessment)",
    duration: "30 hours",
  },
  {
    title: "Module 4: Governance, Security, Risk and Decentralised Data Controls",
    kind: "foundation",
    details:
      "Identify technical, operational, regulatory and project risks; define security and governance controls; compare off-chain, decentralised and hybrid storage approaches; weigh data integrity, privacy, retrieval and cost; and recommend mitigation measures for responsible enterprise blockchain implementation.",
    sessions: "10 sessions (9 teaching + 1 assessment)",
    duration: "30 hours",
  },
  {
    title: "Module 5: Enterprise Blockchain Platform Architectures",
    kind: "foundation",
    details:
      "Evaluate Ethereum, Hyperledger Fabric, Corda, Cardano and Quorum architectures; compare platform-specific identity, permissioning, privacy, consensus, smart contract and workflow models; assess design trade-offs; and recommend suitable platforms and integration approaches for enterprise use cases.",
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
