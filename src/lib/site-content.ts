import {
  HiShieldCheck,
  HiCpuChip,
  HiBuildingOffice2,
  HiCodeBracket,
  HiChartBar,
  HiRocketLaunch,
} from "react-icons/hi2";

/**
 * Internal pages the AI blog writer may deep-link to. Tertiary Infotech Academy
 * is a Private Education Institution (PEI) — these are the student-facing
 * Advanced Certificate courses and PEI pages, not IT services.
 */
export const SERVICES = [
  {
    title: "Advanced Certificate in AI Security Analyst",
    href: "/advanced-certificate-in-ai-security-analyst",
    description:
      "PEI Advanced Certificate training international students as AI-era security analysts — SOC operations, threat detection and securing AI systems.",
  },
  {
    title: "Advanced Certificate in Agentic AI Coding",
    href: "/advanced-certificate-in-agentic-ai-coding",
    description:
      "PEI Advanced Certificate in building and shipping agentic-AI applications — Claude, multi-agent workflows and production deployment.",
  },
  {
    title: "Advanced Certificate in Blockchain",
    href: "/advanced-certificate-in-blockchain",
    description:
      "PEI Advanced Certificate in blockchain and Web3 development — smart contracts, distributed ledgers and decentralised apps.",
  },
  {
    title: "Study in Singapore",
    href: "/study-in-singapore",
    description:
      "Guide for international students on studying future-tech in Singapore — admissions, Student Pass and living in Asia's leading tech hub.",
  },
  {
    title: "All Courses",
    href: "/courses",
    description:
      "Browse all Advanced Certificate courses in AI, Cyber Security, Quantum and Blockchain at Tertiary Infotech Academy.",
  },
  {
    title: "PEI Course Submission",
    href: "/pei-course-submission",
    description:
      "How a registered Private Education Institution submits a new course to SSG via GoBusiness Licensing.",
  },
  {
    title: "PEI Add Teachers",
    href: "/pei-add-teachers",
    description:
      "How a Private Education Institution notifies SSG and adds a teacher to its registration.",
  },
] as const;

export const WHY_CHOOSE_US = [
  { icon: HiShieldCheck, title: "Secure & Scalable", description: "Enterprise-grade security with infrastructure that scales alongside your growth.", accent: "blue" as const },
  { icon: HiCpuChip, title: "AI Integration", description: "Cutting-edge AI capabilities woven seamlessly into every solution we deliver.", accent: "purple" as const },
  { icon: HiBuildingOffice2, title: "Enterprise Ready", description: "Robust architecture built for organizations of any size, from startups to enterprises.", accent: "cyan" as const },
  { icon: HiCodeBracket, title: "Custom Development", description: "Tailored solutions engineered to fit your unique business requirements.", accent: "blue" as const },
  { icon: HiChartBar, title: "Data-Driven Insights", description: "Actionable analytics and intelligent reporting to power smarter decisions.", accent: "purple" as const },
  { icon: HiRocketLaunch, title: "Fast Deployment", description: "Rapid implementation with agile methodology. Go live faster without compromising quality.", accent: "cyan" as const },
];
