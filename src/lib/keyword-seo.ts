// Keyword-targeted SEO copy for the course hub and selected course pages.
// `**text**` marks a target keyword — rendered bold by <Emph> and stripped for
// JSON-LD by plain(). Keyword → page map:
//   "AI certifications", "advanced AI certifications"  → /courses
//   "advanced AI audit certification(s)"               → /courses/advanced-certificate-in-ai-audit-and-assurance
//   "Advanced Certificate in Cyber Security in Singapore",
//   "advanced cyber security certification"            → /courses/advanced-certificate-in-cyber-security
//   "Advanced Certificate in Quantum Computing in Singapore"
//                → /courses/advanced-certificate-in-applied-quantum-computing-and-qiskit-programming
// (AI, Blockchain and "Higher Education in Singapore" have their own routes —
// see DISCIPLINE_PAGES in src/lib/course-categories.ts.)
// Lives in code (not the courses table) because course copy is plain text and
// can't carry bold markup. Title/description here override the DB seo fields.

export type KeywordFaq = { q: string; a: string };

export type KeywordIntro = {
  kicker: string;
  heading: string;
  paragraphs: string[];
  link?: { href: string; label: string };
};

export type CourseKeywordSeo = {
  title: string;
  description: string;
  keywords: string;
  /** Rendered as a second line inside the course <h1>. */
  h1Tagline: string;
  intro: KeywordIntro;
  faqHeading: string;
  faqs: KeywordFaq[];
};

export const COURSES_HUB_SEO = {
  title: "Advanced AI Certifications & Cyber Security Certification",
  description:
    "Compare advanced AI certifications in AI security, AI audit, AI risk and agentic AI, plus an advanced cyber security certification in Singapore. Enquire today.",
  keywords:
    "AI certifications, advanced AI certifications, AI certification Singapore, advanced AI audit certification, advanced cyber security certification, cyber security certification Singapore, advanced certificate courses Singapore, courses for international students Singapore, Tertiary Infotech Academy courses",
  intro:
    "Earn **advanced AI certifications** and an **advanced cyber security certification** from Tertiary Infotech Academy, a Singapore Private Education Institution. Hands-on, industry-recognised Advanced Certificates in AI, Cyber Security, Blockchain and Quantum Computing — built for international students and career switchers. WSQ funding available for eligible Singaporeans.",
  /** Keyword-led H2 + intro per catalogue category (others keep their plain name). */
  categories: {
    "Artificial Intelligence": {
      heading: "Advanced AI Certifications",
      intro:
        "Our **AI certifications** range from 90 to 150 hours of live online training. Choose AI Security Analyst or Agentic AI Coding and Architecting for hands-on technical roles, or AI Audit and Assurance, AI Risk Management and AI Security and Governance Management for governance, risk and assurance careers. Each **advanced AI certification** is a stackable modular programme.",
    },
    "Cyber Security": {
      heading: "Advanced Cyber Security Certifications",
      intro:
        "Start with the CompTIA-based Advanced Certificate in Cyber Security, move into security operations with Cybersecurity Operations Analyst, or step up to leadership with Enterprise Information Security Leadership. Each **advanced cyber security certification** is built around hands-on labs and real-world security operations.",
    },
  } as Record<string, { heading: string; intro: string }>,
  faqHeading: "**AI Certifications** — Frequently Asked Questions",
  faqs: [
    {
      q: "Which AI certifications does Tertiary Infotech Academy offer?",
      a: "Five **advanced AI certifications**: AI Security Analyst, Agentic AI Coding and Architecting, AI Audit and Assurance, AI Risk Management, and AI Security and Governance Management. Each is an Advanced Certificate awarded by a Singapore Private Education Institution.",
    },
    {
      q: "How long does an advanced AI certification take?",
      a: "Between 90 and 150 hours of live online classes, completed part-time over roughly 2.5 to 4 months. You need at least 75% attendance and a pass in every module assessment.",
    },
    {
      q: "Which AI certification suits an audit, risk or governance career?",
      a: "Choose the Advanced Certificate in AI Audit and Assurance if you want an **advanced AI audit certification**. AI Risk Management and AI Security and Governance Management suit AI risk, compliance and governance roles.",
    },
    {
      q: "Do you offer an advanced cyber security certification?",
      a: "Yes. The Advanced Certificate in Cyber Security stacks CompTIA A+, Security+, Linux+ and CySA+ or PenTest+. The Cybersecurity Operations Analyst and Enterprise Information Security Leadership certificates go deeper into SOC operations and security leadership.",
    },
    {
      q: "Can international students enrol?",
      a: "Yes. Every programme is taught in English and designed for international students and career switchers. Register your interest on any course page and our team will advise you on the next intake.",
    },
  ] as KeywordFaq[],
};

export const COURSE_KEYWORD_SEO: Record<string, CourseKeywordSeo> = {
  "advanced-certificate-in-applied-quantum-computing-and-qiskit-programming": {
    title: "Advanced Certificate in Quantum Computing in Singapore",
    description:
      "Earn an Advanced Certificate in Quantum Computing in Singapore: 150 hours of live online Qiskit programming on IBM Quantum systems. Enquire for the next intake.",
    keywords:
      "Advanced Certificate in Quantum Computing in Singapore, quantum computing course Singapore, quantum computing certificate, Qiskit course, IBM Quantum training, learn quantum programming, quantum computing for international students, Tertiary Infotech Academy",
    h1Tagline: "Your Advanced Certificate in Quantum Computing in Singapore",
    intro: {
      kicker: "QUANTUM COMPUTING CERTIFICATE",
      heading: "Why Take an **Advanced Certificate in Quantum Computing** in Singapore",
      paragraphs: [
        "Quantum computing is moving from research labs into industry, and employers need people who can actually program quantum circuits. This **Advanced Certificate in Quantum Computing** from Tertiary Infotech Academy, a registered Singapore Private Education Institution, teaches you to build circuits in Python with Qiskit, run them on IBM Quantum systems and interpret the results from both simulators and real hardware.",
        "Across five 30-hour modules you progress from qubits, state vectors and the underlying linear algebra to single- and multi-qubit gates, entanglement, the Deutsch-Jozsa algorithm, and quantum communication concepts such as quantum key distribution and teleportation — finishing with an applied practice portfolio.",
        "Classes are live online, three evenings a week (7:00 PM – 10:00 PM Singapore time), over about four months — so you can earn a **quantum computing certificate** from Singapore while you keep working, wherever you live. Basic programming knowledge is recommended for the hands-on Qiskit labs.",
      ],
      link: {
        href: "/courses#quantum-computing",
        label: "See all Quantum Computing courses",
      },
    },
    faqHeading: "**Advanced Certificate in Quantum Computing** FAQs",
    faqs: [
      {
        q: "What will I learn in the Advanced Certificate in Quantum Computing?",
        a: "You learn quantum computing foundations and the maths behind them, set up a Qiskit development environment, program single- and multi-qubit circuits, implement the Deutsch-Jozsa algorithm on IBM Quantum hardware, and study quantum key distribution and quantum teleportation.",
      },
      {
        q: "Do I need a physics or maths degree?",
        a: "No. You must be at least 21 with at least a C6 pass at GCE 'O' Level in any three subjects (or equivalent), or be a mature candidate aged 25 or above with four years of work experience. Basic programming knowledge is recommended; the linear algebra you need is taught in Module 1.",
      },
      {
        q: "How long does the programme take?",
        a: "150 hours over about four months — five modules of 10 live online sessions each (9 teaching + 1 assessment), three evenings a week from 7:00 PM to 10:00 PM Singapore time.",
      },
      {
        q: "Can international students enrol?",
        a: "Yes. The programme is taught in English and delivered live online, so you can study from your home country. It is a part-time course, so it does not lead to a Student's Pass — under ICA rules those are only issued for approved full-time courses — and you do not need one to study online.",
      },
      {
        q: "What jobs can a quantum computing certificate lead to?",
        a: "Graduates target roles such as Junior Quantum Software Developer, Qiskit Developer, Quantum Computing Associate, Quantum Applications Analyst and Quantum Cryptography Analyst, or apply quantum skills in research, cyber security and emerging-technology consulting.",
      },
    ],
  },
  "advanced-certificate-in-ai-audit-and-assurance": {
    title: "Advanced AI Audit Certification | AI Audit & Assurance",
    description:
      "Earn an advanced AI audit certification in Singapore: 90 hours of live online training in AI governance, risk and AI system audits. Enquire for the next intake.",
    keywords:
      "advanced AI audit certification, advanced AI audit certifications, AI audit certification Singapore, AI audit and assurance course, AI auditor training, AI governance course, AI certifications, advanced AI certifications",
    h1Tagline: "Advanced AI Audit Certification",
    intro: {
      kicker: "AI AUDIT CERTIFICATION",
      heading: "Why Choose This **Advanced AI Audit Certification**",
      paragraphs: [
        "As organisations deploy machine learning and generative AI, regulators and boards want independent assurance that those systems are governed, tested and controlled. The Advanced Certificate in AI Audit and Assurance is an **advanced AI audit certification** from Tertiary Infotech Academy, a Singapore Private Education Institution, built for auditors, risk professionals and career switchers who need to audit AI systems with confidence.",
        "Across three 30-hour modules you learn to govern AI responsibly, oversee AI operations across the solution lifecycle, and plan, conduct and report on AI audits using AI-specific testing, sampling and evidence-collection techniques. Classes run live online in the evening (7:00 PM – 10:00 PM Singapore time), so international students and working professionals can earn this **AI audit certification** without pausing their careers.",
        "Among our **advanced AI certifications**, this programme sits alongside AI Risk Management and AI Security and Governance Management — together they form a stackable pathway into roles such as AI Auditor, AI Assurance Analyst and IT Auditor (AI-focused).",
      ],
      link: {
        href: "/courses#artificial-intelligence",
        label: "Compare all advanced AI certifications",
      },
    },
    faqHeading: "**Advanced AI Audit Certification** FAQs",
    faqs: [
      {
        q: "What is an advanced AI audit certification?",
        a: "An **advanced AI audit certification** shows you can assess how AI and machine-learning systems are governed, operated and controlled, and audit them with AI-specific techniques. This programme covers AI governance and risk, AI operations and lifecycle management, and auditing AI systems with tools and techniques.",
      },
      {
        q: "Is this the same as ISACA's Advanced in AI Audit (AAIA™)?",
        a: "No. AAIA™ is a professional credential administered by ISACA, with its own exam and eligibility requirements. This programme is an Advanced Certificate awarded by Tertiary Infotech Academy. The subject areas overlap — AI governance and risk, AI operations, and AI audit tools and techniques — but the AAIA™ exam is booked separately with ISACA.",
      },
      {
        q: "Who should take this AI audit certification?",
        a: "IT auditors, internal auditors and assurance professionals; risk, governance and compliance staff responsible for AI oversight; cyber security professionals moving into AI assurance; and graduates in accountancy, IT or data science who want a career-ready **AI audit certification**.",
      },
      {
        q: "How long does the programme take?",
        a: "90 hours over about 2.5 months — three modules of 10 live online sessions each, three evenings a week. You need at least 75% attendance and a pass in each module assessment.",
      },
      {
        q: "What are the entry requirements?",
        a: "You must be at least 21 years old, with at least C6 in GCE 'O' Level English and in any three GCE 'O' Level subjects. Basic IT, audit or governance knowledge and a basic understanding of AI/ML are recommended but not mandatory.",
      },
    ],
  },
  "advanced-certificate-in-cyber-security": {
    title: "Advanced Certificate in Cyber Security in Singapore",
    description:
      "Study the Advanced Certificate in Cyber Security in Singapore: CompTIA-aligned modules in A+, Security+, Linux+, then CySA+ or PenTest+. Register today.",
    keywords:
      "Advanced Certificate in Cyber Security in Singapore, advanced certificate in cyber security, cyber security course Singapore, advanced cyber security certification, cyber security certification Singapore, advanced certificate in cyber security Singapore, CompTIA certification Singapore, CompTIA Security+ course, CySA+ course, PenTest+ course, WSQ cyber security course",
    h1Tagline: "in Singapore — an Advanced Cyber Security Certification with CompTIA",
    intro: {
      kicker: "CYBER SECURITY CERTIFICATION",
      heading: "An **Advanced Cyber Security Certification** Built on CompTIA",
      paragraphs: [
        "The **Advanced Certificate in Cyber Security** is an **advanced cyber security certification** pathway in Singapore from Tertiary Infotech Academy, a registered Private Education Institution, that takes you from IT fundamentals to job-ready security operations. You complete three foundation modules — CompTIA A+, Security+ and Linux+ — and one elective, CompTIA CySA+ or PenTest+, each following the official CompTIA syllabus.",
        "Because every module maps to a globally recognised CompTIA exam, this **cyber security certification** is portable across Singapore, Asia and beyond. Hands-on practice covers IT support, system administration, network security, threat detection and vulnerability assessment, preparing you for roles such as SOC Analyst, Cybersecurity Analyst and Junior Penetration Tester.",
        "Singapore Citizens and Permanent Residents can receive up to 70% WSQ funding and use SkillsFuture Credit for the balance. Want to go further? Our Cybersecurity Operations Analyst and Enterprise Information Security Leadership certificates extend this **advanced cyber security certification** into SOC operations and security leadership.",
      ],
      link: {
        href: "/courses#cyber-security",
        label: "Compare all advanced cyber security certifications",
      },
    },
    faqHeading: "**Advanced Cyber Security Certification** FAQs",
    faqs: [
      {
        q: "What is an advanced cyber security certification?",
        a: "An **advanced cyber security certification** goes beyond awareness training to validate practical skills in securing systems, detecting threats and responding to incidents. This programme stacks four CompTIA-aligned modules into one Advanced Certificate in Cyber Security.",
      },
      {
        q: "Which CompTIA certifications does the programme cover?",
        a: "CompTIA A+, Security+ and Linux+ as foundation modules, plus CySA+ (Cybersecurity Analyst) or PenTest+ as your elective. Each module follows the official CompTIA syllabus, preparing you for the matching CompTIA certification exam.",
      },
      {
        q: "Is WSQ funding available for this cyber security certification?",
        a: "Yes. All four modules are eligible for up to 70% WSQ funding for Singapore Citizens and Permanent Residents, and the balance can be paid with SkillsFuture Credit. International students pay the full course fee.",
      },
      {
        q: "Is the Advanced Certificate in Cyber Security available online?",
        a: "Yes. Like all our programmes, it is delivered primarily as live online classes, so you can study from anywhere. All teaching is in English.",
      },
      {
        q: "Can international students take this certification?",
        a: "Yes. Because classes are primarily live online, you can study from your home country without relocating. The programme does not come with a Student's Pass — under ICA rules those are only issued for approved full-time courses — and you do not need one to study online. Register your interest and our team will advise you on schedules and fees.",
      },
      {
        q: "What jobs can I get with this certification?",
        a: "Graduates typically target roles such as IT Support Technician, Cybersecurity Technician, SOC Analyst (Level 1), Junior Cybersecurity Analyst, Vulnerability Assessment Assistant and Junior Penetration Tester.",
      },
    ],
  },
};
