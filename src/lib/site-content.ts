import {
  HiAcademicCap,
  HiBookOpen,
  HiSparkles,
  HiShieldCheck,
  HiCpuChip,
  HiBuildingOffice2,
  HiCodeBracket,
  HiChartBar,
  HiRocketLaunch,
} from "react-icons/hi2";

export const SERVICES = [
  {
    id: "tms",
    icon: HiAcademicCap,
    title: "Training Management System",
    description:
      "Streamline your entire training lifecycle with our comprehensive TMS platform. From scheduling to certification, manage it all in one place.",
    features: [
      "Course scheduling & management",
      "Enrollment & registration workflows",
      "Reporting & analytics dashboards",
      "Scalable for institutions of any size",
    ],
    accent: "blue" as const,
  },
  {
    id: "lms",
    icon: HiBookOpen,
    title: "Learning Management System",
    description:
      "Deliver engaging, interactive learning experiences with our AI-enhanced LMS. Built for modern learners and educators alike.",
    features: [
      "Interactive eLearning delivery",
      "Assessment & progress tracking",
      "Instructor dashboards & analytics",
      "Cloud-based multi-tenant platform",
    ],
    accent: "cyan" as const,
  },
  {
    id: "ai",
    icon: HiSparkles,
    title: "AI-Powered Solutions",
    description:
      "Transform your business with intelligent automation. From AI-powered websites to custom workflow automation, we build the future.",
    features: [
      "Smart chatbots & virtual assistants",
      "AI content automation",
      "Intelligent lead generation",
      "Custom workflow automation",
    ],
    accent: "purple" as const,
  },
];

export const WHY_CHOOSE_US = [
  { icon: HiShieldCheck, title: "Secure & Scalable", description: "Enterprise-grade security with infrastructure that scales alongside your growth.", accent: "blue" as const },
  { icon: HiCpuChip, title: "AI Integration", description: "Cutting-edge AI capabilities woven seamlessly into every solution we deliver.", accent: "purple" as const },
  { icon: HiBuildingOffice2, title: "Enterprise Ready", description: "Robust architecture built for organizations of any size, from startups to enterprises.", accent: "cyan" as const },
  { icon: HiCodeBracket, title: "Custom Development", description: "Tailored solutions engineered to fit your unique business requirements.", accent: "blue" as const },
  { icon: HiChartBar, title: "Data-Driven Insights", description: "Actionable analytics and intelligent reporting to power smarter decisions.", accent: "purple" as const },
  { icon: HiRocketLaunch, title: "Fast Deployment", description: "Rapid implementation with agile methodology. Go live faster without compromising quality.", accent: "cyan" as const },
];

export const AI_LMS_TMS_FEATURES = [
  "WSQ and TPQA compliant out of the box",
  "Fully SSG API integrated — TPGateway, MySkillsFuture, attendance & enrolment",
  "50+ EdTools for trainers — quizzes, polls, breakouts, AI tutor, code sandbox",
  "Native integration with Google Meet, Zoom, and Microsoft Teams",
  "Auto enrolment, invoicing, and SkillsFuture claim workflows",
  "CP & Courseware Generator — agent-built lesson plans, decks, and assessments",
  "Claude Code-powered AI agent — content authoring, marking, and learner support",
];
