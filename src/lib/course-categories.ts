// Course → discipline grouping, shared by the /courses hub and the
// per-discipline landing pages.

// Display order of the course categories.
export const CATEGORY_ORDER = [
  "Artificial Intelligence",
  "Cyber Security",
  "Blockchain",
  "Quantum Computing",
] as const;

export type CourseCategory = (typeof CATEGORY_ORDER)[number];

// Stable anchor slug per category — lets the homepage hero deep-link to a
// discipline's section (e.g. /courses.html#artificial-intelligence).
export const catSlug = (c: string) => c.toLowerCase().replace(/\s+/g, "-");

// Explicit slug → category map for the current catalogue.
export const COURSE_CATEGORY: Record<string, CourseCategory> = {
  "advanced-certificate-in-ai-security-analyst": "Artificial Intelligence",
  "advanced-certificate-in-agentic-ai-coding": "Artificial Intelligence",
  "advanced-certificate-in-ai-audit-and-assurance": "Artificial Intelligence",
  "advanced-certificate-in-ai-risk-management": "Artificial Intelligence",
  "advanced-certificate-in-ai-security-and-governance-management": "Artificial Intelligence",
  "advanced-certificate-in-cyber-security": "Cyber Security",
  "advanced-certificate-in-cybersecurity-operations-analyst": "Cyber Security",
  "advanced-certificate-in-enterprise-information-security-leadership": "Cyber Security",
  "advanced-certificate-in-enterprise-blockchain-solution-architecture": "Blockchain",
  "advanced-certificate-in-digital-asset-compliance-and-blockchain-risk-operations": "Blockchain",
  "advanced-certificate-in-applied-quantum-computing-and-qiskit-programming": "Quantum Computing",
};

// Categorize a course: explicit map first, then a keyword fallback so future
// courses still land in a sensible group. Order matters — AI wins over Cyber
// for "AI Security" titles, which is the intended placement.
export function categoryFor(c: { slug: string; title: string }): CourseCategory {
  const mapped = COURSE_CATEGORY[c.slug];
  if (mapped) return mapped;
  const t = `${c.slug} ${c.title}`.toLowerCase();
  if (t.includes("quantum")) return "Quantum Computing";
  if (t.includes("blockchain") || t.includes("digital asset") || t.includes("web3"))
    return "Blockchain";
  if (t.includes("ai") || t.includes("artificial intelligence") || t.includes("agentic"))
    return "Artificial Intelligence";
  if (t.includes("security") || t.includes("cyber")) return "Cyber Security";
  return "Artificial Intelligence";
}

// Keyword landing page per discipline — the internal-link target for
// "Advanced Certificate in <discipline> in Singapore".
export const DISCIPLINE_PAGES: Record<CourseCategory, { href: string; keyword: string }> = {
  "Artificial Intelligence": {
    href: "/advanced-certificate-in-artificial-intelligence",
    keyword: "Advanced Certificate in Artificial Intelligence in Singapore",
  },
  "Cyber Security": {
    href: "/courses/advanced-certificate-in-cyber-security",
    keyword: "Advanced Certificate in Cyber Security in Singapore",
  },
  Blockchain: {
    href: "/advanced-certificate-in-blockchain",
    keyword: "Advanced Certificate in Blockchain in Singapore",
  },
  "Quantum Computing": {
    href: "/courses/advanced-certificate-in-applied-quantum-computing-and-qiskit-programming",
    keyword: "Advanced Certificate in Quantum Computing in Singapore",
  },
};
