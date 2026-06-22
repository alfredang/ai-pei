import { eq } from "drizzle-orm";
import { db } from "../src/db";
import { courses, courseModules } from "../src/db/schema";

/**
 * Seeds the "Advanced Certificate in Applied Quantum Computing and Qiskit
 * Programming" into the DB so it renders at
 * /courses/advanced-certificate-in-applied-quantum-computing-and-qiskit-programming.html
 * via the shared [slug] course page. Idempotent: upserts the course by slug, then
 * replaces its modules. Modelled on scripts/seed-courses.ts.
 *
 * Run: set -a; source .env; set +a; npx tsx scripts/seed-course-advanced-certificate-in-applied-quantum-computing-and-qiskit-programming.ts
 */

const SLUG =
  "advanced-certificate-in-applied-quantum-computing-and-qiskit-programming";

const COURSE = {
  slug: SLUG,
  title: "Advanced Certificate in Applied Quantum Computing and Qiskit Programming",
  status: "published" as const,
  summary:
    "A hands-on, 150-hour live online Advanced Certificate in quantum computing and Qiskit programming — build quantum circuits in Python, run them on IBM Quantum hardware, and master gates, entanglement, the Deutsch-Jozsa algorithm and quantum communication across five stackable modules.",
  overview: [
    "The Advanced Certificate in Applied Quantum Computing and Qiskit Programming equips learners with practical, hands-on capability to understand quantum computing concepts, build quantum circuits in Python using Qiskit, execute circuits on IBM Quantum systems, and interpret circuit behaviour across simulation and real hardware. Upon completion, learners will be able to explain qubits and quantum states, configure a Qiskit development environment, implement single-qubit and multi-qubit gates, analyse circuit identities and equivalences, apply the Deutsch-Jozsa algorithm, and describe quantum key distribution and quantum teleportation concepts.",
    "Delivery: 100% live online (synchronous virtual classes), part-time over approximately 4 months (~17 weeks). Total course hours: 150. Class frequency: 3 sessions per week, 3 hours per session, 7:00 PM – 10:00 PM (Singapore time). The programme comprises five modules, each running 10 sessions (9 teaching + 1 assessment).",
    "Minimum entry requirements: at least 21 years old; at least a C6 pass at GCE 'O' Level in any 3 subjects, or equivalent; or a mature candidate at least 25 years old with at least 4 years of working experience. Basic programming knowledge is recommended to get the most from the hands-on Qiskit labs.",
    "This is a stackable modular programme — modular certificates stack towards the full Advanced Certificate in Applied Quantum Computing and Qiskit Programming, which learners have up to approximately 4 months to complete.",
  ].join("\n\n"),
  outcomes: [
    "Explain core quantum phenomena, bits and qubits, measurement and state vectors, and the linear algebra and classical-logic foundations underpinning quantum circuits",
    "Configure a Python, Anaconda and Qiskit development environment and build, test and interpret single-qubit circuits using X, Y, Z, Hadamard, phase and parameterised gates",
    "Construct multi-qubit circuits — CNOT, controlled gates, SWAP and Toffoli — and analyse entanglement, control-target behaviour and equivalent circuit transformations",
    "Design and implement the Deutsch-Jozsa algorithm, prepare suitable oracles, and execute circuits on IBM Quantum hardware, comparing ideal, simulated and hardware results",
    "Describe quantum key distribution and quantum teleportation principles and their relevance to secure quantum communication",
    "Consolidate applied Qiskit practice through assessment and portfolio work and plan further development in quantum computing",
  ].join("\n"),
  whoShouldEnroll: [
    "Software developers, data professionals and IT practitioners seeking a practical introduction to quantum computing with Python",
    "Learners with basic programming knowledge who want to build and simulate quantum circuits using Qiskit",
    "Engineers, analysts, researchers and technical graduates needing a structured foundation in qubits, gates, circuits and quantum algorithms",
    "Cybersecurity, cryptography and risk professionals wanting to understand quantum key distribution and the impact of quantum computing on secure communication",
    "AI, analytics and emerging-technology practitioners exploring quantum computing as a future-facing technical capability",
    "Technical managers, consultants and educators who need applied knowledge to evaluate quantum computing opportunities and guide teams",
  ].join("\n"),
  assessment:
    "One assessment per module (pass required); minimum 75% attendance.",
  certificate:
    "Advanced Certificate in Applied Quantum Computing and Qiskit Programming — awarded by Tertiary Infotech Academy upon achieving at least 75% attendance and passing all module assessments. A stackable modular programme; modular certificates stack towards the full Advanced Certificate.",
  sortOrder: 8,
  seoTitle: "Applied Quantum Computing & Qiskit Programming Singapore",
  seoDescription:
    "Applied quantum computing & Qiskit programming — a 150-hour online Advanced Certificate in Singapore. Build quantum circuits on IBM Quantum. International students welcome.",
};

const MODULES = [
  {
    title: "Module 1: Quantum Computing Foundations and Mathematical Models",
    kind: "foundation",
    details:
      "Introduces programme expectations, core quantum phenomena, bits and qubits, measurement behaviour and state vectors, alongside the linear algebra and classical logic foundations needed to study quantum circuits.",
    sessions: "10 sessions (9 teaching + 1 assessment)",
    duration: "30 hours",
  },
  {
    title: "Module 2: Qiskit Development and Single-Qubit Circuit Programming",
    kind: "foundation",
    details:
      "Configure Python, Anaconda and Qiskit environments and build, test and interpret X, Y, Z, Hadamard, phase and parameterised single-qubit circuits, reading simulation and measurement outputs.",
    sessions: "10 sessions (9 teaching + 1 assessment)",
    duration: "30 hours",
  },
  {
    title: "Module 3: Multi-Qubit Circuits, Entanglement and Gate Equivalences",
    kind: "foundation",
    details:
      "Represent multi-qubit states and construct CNOT, controlled-gate, SWAP and Toffoli circuits; analyse entanglement and control-target behaviour; and verify equivalent circuit transformations in Qiskit.",
    sessions: "10 sessions (9 teaching + 1 assessment)",
    duration: "30 hours",
  },
  {
    title: "Module 4: Quantum Algorithms and IBM Quantum Hardware Execution",
    kind: "foundation",
    details:
      "Design and implement the Deutsch-Jozsa algorithm, prepare suitable oracles and circuit structures, run selected circuits on IBM Quantum systems, and compare ideal, simulated and hardware results.",
    sessions: "10 sessions (9 teaching + 1 assessment)",
    duration: "30 hours",
  },
  {
    title:
      "Module 5: Quantum Communication Protocols and Applied Practice Portfolio",
    kind: "foundation",
    details:
      "Describe quantum key distribution and quantum teleportation principles, consolidate applied Qiskit practice through assessment and portfolio work, and plan further development in quantum computing.",
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
