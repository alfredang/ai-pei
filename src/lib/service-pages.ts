// Content + metadata for the 5 dedicated service pages.
// Pages compose this with components/sections/ServicePageTemplate.

export type ServicePageContent = {
  slug: string;
  title: string;
  hero: {
    kicker: string;
    /** HTML allowed for accent spans. */
    headlineHtml: string;
    subhead: string;
  };
  meta: {
    title: string;
    description: string;
  };
  /** "Service type" used in Schema.org Service @type. */
  serviceType: string;
  benefits: { title: string; body: string }[];
  whatsIncluded: string[];
  faq: { q: string; a: string }[];
  /** Source label sent with the lead form POST. */
  leadSource: string;
};

export const SERVICE_PAGES: Record<string, ServicePageContent> = {
  "training-management-system": {
    slug: "training-management-system",
    title: "Training Management System (TMS)",
    leadSource: "tms-page",
    serviceType: "Training Management System",
    hero: {
      kicker: "[ TMS · WSQ · SSG-READY ]",
      headlineHtml:
        '<span class="gradient-text">Training Management System</span> for Singapore training providers.',
      subhead:
        "Streamline your entire training lifecycle — scheduling, enrollment, attendance, e-certificates, SkillsFuture funding claims — in one platform built for WSQ-compliant ATOs.",
    },
    meta: {
      title: "Training Management System (TMS) Singapore — WSQ & SSG-Ready",
      description:
        "End-to-end TMS for Singapore training providers. Course scheduling, enrollment workflows, attendance, e-cert issuance and SSG funding-claim integration. Book a free demo.",
    },
    benefits: [
      {
        title: "SSG / TPGateway integration",
        body: "Submit course runs, claim funding and report attendance directly via the TPGateway API — no manual CSV uploads.",
      },
      {
        title: "End-to-end enrollment",
        body: "Public-facing course catalog, online registration, SkillsFuture Credit acceptance, invoicing, and payment reconciliation in one place.",
      },
      {
        title: "Trainer & resource scheduling",
        body: "Capacity-aware scheduling: trainer availability, room bookings, equipment, conflict detection.",
      },
      {
        title: "Reporting & analytics",
        body: "Per-cohort, per-trainer and per-course P&L. Pre-built reports for TPQA audits and SSG submissions.",
      },
    ],
    whatsIncluded: [
      "Custom-branded TMS deployed on your domain",
      "SSG / TPGateway API integration and course-run submission",
      "Online registration + SkillsFuture Credit + invoice + e-receipt flow",
      "E-attendance via mobile (SSG-compliant) and physical card reader",
      "Trainer / room / equipment scheduling with conflict detection",
      "Self-serve admin: courses, fees, runs, learners, reports",
    ],
    faq: [
      {
        q: "Do you integrate with SSG and SkillsFuture Credit?",
        a: "Yes — course runs are submitted to TPGateway via API; SkillsFuture Credit redemption is handled through the standard SSG learner-facing flow with full audit trail for TPQA.",
      },
      {
        q: "Is the TMS open-source?",
        a: "The core platform is built on our open-source EdTools stack. You own the deployment and the data. We provide professional services for customisation, integration and support.",
      },
      {
        q: "How does the TMS price compare to off-the-shelf SaaS?",
        a: "No per-user, per-transaction or recurring SaaS fees. You pay for build, deployment and optional ongoing support — typically less than 12 months of equivalent SaaS for a mid-size ATO.",
      },
      {
        q: "Can it work alongside our existing accounting / CRM?",
        a: "Yes. Webhooks and REST APIs export invoices, payments and learner records into Xero, QuickBooks, Salesforce, HubSpot and similar systems.",
      },
    ],
  },
  "learning-management-system": {
    slug: "learning-management-system",
    title: "Learning Management System (LMS)",
    leadSource: "lms-page",
    serviceType: "Learning Management System",
    hero: {
      kicker: "[ LMS · WSQ · TPQA ]",
      headlineHtml:
        'AI-enhanced <span class="gradient-text">Learning Management System</span> for WSQ delivery.',
      subhead:
        "Deliver interactive eLearning, run assessments, track competency and stay TPQA-ready — without paying per-seat SaaS fees.",
    },
    meta: {
      title: "Learning Management System (LMS) Singapore — AI-Enhanced, WSQ-Ready",
      description:
        "Cloud-based, multi-tenant LMS for Singapore training providers. Interactive eLearning, assessments, instructor dashboards, AI-assisted content creation. Book a free demo.",
    },
    benefits: [
      {
        title: "Interactive eLearning delivery",
        body: "SCORM, xAPI, HTML5, video, quizzes and discussions — all rendered on a fast, mobile-first learner UI.",
      },
      {
        title: "Assessment & competency tracking",
        body: "Formative + summative assessments mapped to WSQ Competency Units. Auto-grading + manual moderation workflows.",
      },
      {
        title: "Instructor dashboards",
        body: "Per-cohort progress, per-learner risk signals, auto-generated certificates on completion.",
      },
      {
        title: "AI content authoring",
        body: "Built-in Claude Agent SDK assist for outlining modules, drafting quiz items, generating summaries and translations.",
      },
    ],
    whatsIncluded: [
      "Custom-branded LMS on your domain",
      "Course authoring (rich text, video, quizzes, SCORM import)",
      "WSQ Competency mapping + assessment plan",
      "E-certificate issuance (with optional blockchain anchoring)",
      "Instructor + admin dashboards with cohort analytics",
      "Single Sign-On (SSO) integration with your existing identity provider",
    ],
    faq: [
      {
        q: "Does it work for SCORM and existing course packages?",
        a: "Yes — full SCORM 1.2 / 2004 and xAPI support. Import existing packages without re-authoring.",
      },
      {
        q: "Can learners use it on mobile?",
        a: "The learner UI is fully responsive; we also ship an optional PWA mode for offline content review.",
      },
      {
        q: "How is data hosted?",
        a: "Default deployment is on a Coolify-managed Singapore region instance with daily backups. Self-hosted on-prem is available for enterprise.",
      },
      {
        q: "Is it open-source?",
        a: "Built on our open-source EdTools stack. You retain full ownership of code and data on your deployment.",
      },
    ],
  },
  "ai-solutions": {
    slug: "ai-solutions",
    title: "AI Solutions",
    leadSource: "ai-solutions-page",
    serviceType: "AI Software Consultancy",
    hero: {
      kicker: "[ AGENTIC AI · CLAUDE CODE · BESPOKE ]",
      headlineHtml:
        'Production <span class="gradient-text">Agentic AI</span> and bespoke software for organisations.',
      subhead:
        "From AI-powered admin assistants to internal CRMs to public-facing AI tools — built with Claude Code, n8n, and a 12-year track record in Singapore EdTech.",
    },
    meta: {
      title: "AI Solutions Singapore — Agentic AI, n8n, Claude Code, Bespoke Web & Mobile",
      description:
        "Custom AI agents, automations and full-stack web/mobile apps for Singapore SMEs and training providers. Built with Claude Agent SDK, n8n and modern stacks. Book a free scoping call.",
    },
    benefits: [
      {
        title: "Agentic AI workflows",
        body: "Claude-powered agents that perform real work — draft posts, summarise leads, triage support, fill compliance forms.",
      },
      {
        title: "n8n automation",
        body: "Visual workflow automation connecting Gmail, Slack, GSuite, Stripe, Notion, your CRM and your custom APIs.",
      },
      {
        title: "Bespoke web / mobile apps",
        body: "Production-grade Next.js, React Native and Expo apps. AppStore + Play Store deployment included.",
      },
      {
        title: "Harness Systems integration",
        body: "End-to-end CI/CD, observability, secret management for your AI deployments.",
      },
    ],
    whatsIncluded: [
      "Scoping workshop + technical discovery (1–2 weeks)",
      "Architecture proposal with cost + timeline guarantees",
      "Iterative delivery in 2-week sprints with weekly demos",
      "Production deployment on your infra or our Coolify-managed cluster",
      "Documentation, runbooks and 30-day post-launch support",
    ],
    faq: [
      {
        q: "Do you use OpenAI or Claude?",
        a: "Default is Claude (Anthropic) via the Claude Agent SDK — better at long-horizon tasks, transparent reasoning, and works with your OAuth subscription instead of metered API. We can use OpenAI on request.",
      },
      {
        q: "What's the typical project size?",
        a: "Small workflow automations: 1–2 weeks. Internal tools / dashboards: 4–8 weeks. Full bespoke product: 3+ months. We confirm scope after Discovery.",
      },
      {
        q: "Do you do mobile apps?",
        a: "Yes — Expo + React Native, native iOS / Android. We also handle store submission and review.",
      },
      {
        q: "Can you work with our existing dev team?",
        a: "Yes — we routinely embed with internal teams for pair-programming, code review and Claude-Code training.",
      },
    ],
  },
  "wsq-course-development": {
    slug: "wsq-course-development",
    title: "WSQ Course Development",
    leadSource: "course-dev-page",
    serviceType: "Course Development",
    hero: {
      kicker: "[ COURSE DEV · WSQ · IBF-STS · PWM ]",
      headlineHtml:
        '<span class="gradient-text">WSQ Course Development</span> end-to-end.',
      subhead:
        "From competency mapping through lesson plans, assessment plans and SSG submission package — for WSQ, CASL, IBF-STS / FTS and PWM frameworks.",
    },
    meta: {
      title: "WSQ Course Development Singapore — Competency Mapping, Lesson Plans, SSG Submission",
      description:
        "End-to-end accredited course development for Singapore training providers. WSQ, CASL, IBF-STS and PWM frameworks. We handle competency mapping, lesson plans and SSG submission.",
    },
    benefits: [
      {
        title: "Framework alignment",
        body: "Courses mapped to WSQ Competency Units, Critical Core Skills (CCS) or IBF-STS competencies depending on your sector.",
      },
      {
        title: "Lesson + assessment plans",
        body: "Hour-by-hour lesson plans, structured assessment plans (formative + summative) and assessor guides.",
      },
      {
        title: "Industry engagement",
        body: "Documented industry consultation and learner-feedback analysis — required artefacts for SSG approval.",
      },
      {
        title: "Submission-ready",
        body: "Full Course Application package compliant with TPGateway requirements; we walk you through the submission.",
      },
    ],
    whatsIncluded: [
      "Competency mapping to WSQ / CASL / IBF-STS / PWM",
      "Course outline + module breakdown",
      "Hour-by-hour lesson plans",
      "Assessment plan + assessor guides",
      "Trainer guide + slide deck",
      "Industry engagement & learner-feedback evidence pack",
      "TPGateway Course Application submission package",
    ],
    faq: [
      {
        q: "Which frameworks do you cover?",
        a: "WSQ, Critical Core Skills (CCS), IBF-STS / FTS, PWM, and CASL. Other frameworks on request.",
      },
      {
        q: "Do you handle CASL courses?",
        a: "Yes — CASL course development is a frequent engagement, including competency mapping and submission to relevant accreditation bodies.",
      },
      {
        q: "How long does course development take?",
        a: "Typical engagement: 6–10 weeks per course depending on length (in-classroom hours), assessment complexity and SME availability.",
      },
      {
        q: "Can you also deliver the course?",
        a: "We focus on development. Through our network we can recommend qualified ACLP-certified trainers if needed.",
      },
    ],
  },
  "tpqa-consultancy": {
    slug: "tpqa-consultancy",
    title: "TPQA Consultancy",
    leadSource: "tpqa-page",
    serviceType: "TPQA Consultancy",
    hero: {
      kicker: "[ TPQA · MOCK AUDIT · COMPLIANCE ]",
      headlineHtml:
        '<span class="gradient-text">TPQA Consultancy</span> — stay compliant year-round.',
      subhead:
        "Mock TPQA audits, evidence-pack remediation, gap-assessment roadmaps and on-site audit support for SSG-registered training providers in Singapore.",
    },
    meta: {
      title: "TPQA Consultancy Singapore — Mock Audits, Compliance Remediation, On-Site Support",
      description:
        "TPQA mock audits, evidence-pack remediation and on-site audit support for SSG-registered training providers. Stay compliant year-round. Free assessment call.",
    },
    benefits: [
      {
        title: "Mock TPQA audit",
        body: "Full half-day mock audit modelled on SSG's actual TPQA process — across all 4 Criteria and 14 Indicators.",
      },
      {
        title: "Evidence & documentation review",
        body: "We review your QMS, SOPs, course administration evidence, learner-management records and outcomes data — gap-list with priority.",
      },
      {
        title: "Gap remediation roadmap",
        body: "Concrete fixes for every gap, ranked by audit-risk. We help you build the missing evidence, not just identify it.",
      },
      {
        title: "On-site audit support",
        body: "We're on-site during the SSG TPQA audit to support your team — interview coaching, evidence presentation, real-time clarifications.",
      },
    ],
    whatsIncluded: [
      "Pre-audit gap-assessment workshop",
      "Mock TPQA audit (half-day on-site or remote)",
      "Detailed gap report with priority-ranked remediation actions",
      "Evidence-pack templates (Criterion 1–4)",
      "Hands-on remediation support (typically 2–6 weeks)",
      "On-site presence during the live SSG TPQA audit",
    ],
    faq: [
      {
        q: "When should we engage a TPQA consultant?",
        a: "Two ideal windows: (a) 3–6 months before your scheduled TPQA audit, or (b) immediately after receiving a corrective action plan to remediate gaps.",
      },
      {
        q: "What if we've already failed a TPQA audit?",
        a: "We've helped recover ATOs from formal Conditional Approval status. Engagement starts with reviewing the SSG corrective-action letter and building a remediation roadmap.",
      },
      {
        q: "Do you cover all 4 TPQA Criteria?",
        a: "Yes — Governance, Course Administration, Outcomes, and Continuous Improvement. We provide evidence templates for each Indicator.",
      },
      {
        q: "Do you provide TPQA training for our internal team?",
        a: "Yes — half-day or full-day workshops for ATO management and adult educators on TPQA Criteria interpretation.",
      },
    ],
  },
};
