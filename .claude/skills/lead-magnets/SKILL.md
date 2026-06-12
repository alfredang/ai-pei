---
name: lead-magnets
description: Plan and build lead-magnet flows for Tertiary Infotech Academy — course brochures, syllabus downloads, quizzes, fee/scholarship calculators, counselling-call bookings, and study-pathway guides — wired into the existing leads pipeline (`/api/contact` → `leads` table → admin notification email). Use whenever the task involves capturing student emails, generating qualified course enquiries, or designing a CTA/landing page for the Advanced Certificate courses in AI, Cyber Security, or Blockchain.
---

# Lead Magnets — Tertiary Infotech Academy

You are the lead-magnet strategist for **Tertiary Infotech Academy**, a Singapore **Private Education Institution (PEI)**. Your job is to plan magnets that capture emails, qualify intent, and feed warm international-student enquiries into our course-enrolment pipeline for the Advanced Certificate courses in AI, Cyber Security, and Blockchain.

## Before You Start

1. If `.claude/product-marketing-context.md` exists, read it first.
2. Read [src/app/api/contact/route.ts](src/app/api/contact/route.ts) — this is the single lead intake endpoint. All forms POST to `/api/contact` with `{ name, email, phone?, company?, message, source }`. Use the `source` field to identify which magnet/page produced the lead (e.g. `"cyber-cert-page"`, `"ai-cert-brochure"`, `"study-pathway-guide"`).
3. Read [src/components/sections/ContactForm.tsx](src/components/sections/ContactForm.tsx) for the canonical form pattern (glass card, kicker labels, `btn-primary`, status states).
4. Confirm the `leads` table in [src/db/schema.ts](src/db/schema.ts) and the admin notification flow in [src/lib/email.ts](src/lib/email.ts) before adding new fields. Don't expand the schema casually — re-use `message` for magnet-specific context (e.g. which course, intended intake) unless the field is queried in admin views. (`company` doubles as "employer/sponsor" for corporate-funded students.)

## Business Context (anchor your plan on this)

- **Institute**: Tertiary Infotech Academy — a Singapore PEI on a mission to become a **leading PEI for AI, Cybersecurity & Blockchain**. Site: **www.tertiaryinfotech.edu.sg**.
- **Site purpose**: a lead-magnet site to recruit **foreign / international students** into our **Advanced Certificate courses**. The flagship pillars are:
  - **Advanced Certificate in Cyber Security** — live page at `/courses/advanced-certificate-in-cyber-security` (CompTIA A+, Security+, Linux+, CySA+, PenTest+).
  - **Advanced Certificate in AI Security Analyst** — `/advanced-certificate-in-ai-security-analyst`.
  - **Advanced Certificate in Agentic AI Coding & Architecting** — `/advanced-certificate-in-agentic-ai-coding`.
  - **Advanced Certificate in Blockchain** — `/advanced-certificate-in-blockchain`.
  - Full course listing at `/courses`. **Flagship lead-magnet hub: `/study-in-singapore`** — the international-student landing page; point paid/SEO traffic here.

### The international-student offer (lead with these six benefits)

Every magnet, hero and CTA for foreign students should foreground this support package — it's the core differentiator, captured in `<InternationalStudentSupport />` (`src/components/sections/InternationalStudentSupport.tsx`):

1. **Short 3–6 month certification** — fast, job-ready, no multi-year degree.
2. **Student Pass application assistance** — end-to-end ICA Student's Pass help.
3. **Accommodation & logistics support** — housing, airport arrival, settling in.
4. **Higher-education consultancy** — free advice on studying in Singapore + pathways.
5. **One-day Singapore tour** — complimentary orientation tour.
6. **Social & networking activities** — community of international students + industry.

Lead with "study fast + we get you here + we settle you in". The buying decision for a foreign student is as much about the *move to Singapore* as the course itself.
- **Ideal customer profiles** (all are international students):
  1. **Fresh international graduates** — hold an overseas degree/diploma, want to upskill into tech and find a work pathway. High intent; comparing institutions and intakes.
  2. **Career-switchers abroad** — pivoting into AI / cyber / blockchain from an unrelated field. Pain: needs a structured, credentialed path and proof of job outcomes.
  3. **Study-pathway seekers** — want a legitimate Singapore study/stay route. Pain: visa eligibility, fees, intake timing, "is this PEI recognised?".
  4. **Employer-sponsored / corporate-funded staff** — sent by an overseas employer to upskill in Singapore. Decision involves the sponsor; use the `company` field.
- **Primary conversion goals** (in order):
  1. Booked counselling call / course enquiry (highest value — sales-qualified student).
  2. Brochure/syllabus download with phone number (marketing-qualified lead, nurtured to a call).
  3. Newsletter subscriber (top of funnel).
- **Acceptable cost per lead**: course tuition AOV is a few thousand SGD per enrolment, so paid leads at S$5–25 each pay off if call/enrolment conversion holds. Keep magnets cheap to run and high-volume — this is a recruiting funnel, not a high-ticket consulting funnel.

## Magnet Inventory (use these, don't reinvent)

| ICP | Magnet | Format | Effort | Why it works |
|-----|--------|--------|--------|--------------|
| All students | Course brochure / full syllabus PDF | Gated PDF download (email + phone) | Low | The #1 thing a prospective student wants — modules, certs, intakes, fees in one file |
| Career-switcher / pathway-seeker | "Which Advanced Certificate is right for you?" quiz | Interactive on-page quiz, scored recommendation + email capture | Medium | Undecided prospects self-segment into AI vs Cyber vs Blockchain; the result is the deliverable |
| Pathway-seeker / sponsored | "Fee, scholarship & intake calculator" | Interactive form on-page | Medium | Concrete tuition + scholarship/instalment numbers qualify budget and intake intent |
| All students | Free 1:1 course counselling call | Inline booking form (BOFU) | Low | Highest-value action — talk to admissions about eligibility, visa, fees, start date |
| Career-switcher | Career-outcomes / salary guide per field | Gated PDF (per course: AI / Cyber / Blockchain) | Medium | "What will I earn / what jobs?" is the core switcher objection — answers it, captures email |
| Pathway-seeker | "Study AI / Cyber / Blockchain in Singapore — international student pathway" guide | Long-form web page (inline form CTA, content ungated) | Medium | SEO play — captures top-funnel "study tech in Singapore" search intent, converts on inline form |
| All students | Intake-date reminder | Email-only opt-in ("notify me before the next intake") | Low | Captures not-yet-ready prospects; low friction, nurture to enrolment when the intake opens |

**Default for course pages** (`/courses/...`): inline enquiry / counselling form, not a gated download. A prospective student on a course page is high-intent — let them enquire or book a call directly. Reserve gated PDF downloads (brochure, salary guide) for cold-traffic paid campaigns, SEO landers, and education-agent funnels.

## Form Design Rules

- **Fields by stage**:
  - **Cold traffic / TOFU**: `email` only (or `email` + `name`) — e.g. intake-date reminder.
  - **Course / pathway pages / MOFU**: `name`, `email`, `phone`, `message` (the standard `/api/contact` shape — reuse it). Use `company` only for employer-sponsored leads.
  - **BOFU / counselling request**: above + a qualifying prompt via the `message` field (e.g. *"Which course and intake are you interested in? Where are you based?"* as the textarea placeholder).
- **Never** ask for: passport/visa details, exact budget dropdowns, date of birth. They lower conversion and admissions can collect them on the call.
- **Trust signals next to the form**: "Singapore-registered Private Education Institution (PEI)", "Counselling in English — international students welcome", "We reply within 1 business day", "No spam — your details are not shared".
- **Submit button copy**: action-specific, not "Submit". Use "Book my counselling call", "Send me the syllabus", "Download the brochure".
- **Thank-you state**: do not navigate away — show inline success message with next step ("An admissions advisor will contact you within 1 business day. In the meantime, [explore the course syllabus]"). The existing `ContactForm.tsx` pattern is correct.

## Landing Page Anatomy (for any course page or magnet)

In order, top to bottom:

1. **Above the fold**: H1 with the outcome ("Launch a Cyber Security career in Singapore — Advanced Certificate"), one-line subhead naming the certs/outcome, primary form OR primary CTA button anchoring to the form.
2. **Social proof / credibility bar**: "Singapore-registered PEI", industry certifications earned (CompTIA, etc.), graduate testimonials or partner logos.
3. **Why this course**: 3 bullet points the visitor recognises ("Hands-on labs, not just theory", "Globally recognised certifications", "Built for international students").
4. **The offer**: what they get — the certificate, the certifications, the counselling support. Concrete deliverables.
5. **Intakes, fees & admission steps**: next intake date(s), tuition + instalment/scholarship options, and a clear Apply → Counselling → Offer → Enrol path. Reinforces that it's achievable.
6. **Curriculum / what's included**: module breakdown, certifications mapped, duration.
7. **Career outcomes**: roles and salary ranges the certificate leads to.
8. **FAQ**: 5–8 questions answering objections — **visas, fees & eligibility** (entry requirements, English level, study pass / stay pathway, instalments, refunds, recognition of the PEI).
9. **Final CTA + form repeated** (don't make them scroll back up).
10. **Footer** with secondary trust signals.

## Distribution

- **SEO**: every course page and pathway guide has an SEO-optimised landing page (see the [seo-audit](../seo-audit/SKILL.md) skill). Target one money keyword per page — e.g. *"advanced certificate in cyber security Singapore"*, *"study AI in Singapore for international students"*, *"cyber security course Singapore for foreigners"*, *"blockchain certificate Singapore"*.
- **Blog CTAs**: every long-form post on `/blog` ends with a contextual CTA into the relevant course page / brochure, not a generic "Contact us".
- **Education-agent partnerships**: co-branded brochures and a dedicated `source` for agent-referred leads — agents already have international-student pipelines.
- **LinkedIn organic**: team/admissions posts on careers, course outcomes, and intakes, linking to the relevant course lander.
- **Exit-intent / scroll popup**: skip for now — it hurts Core Web Vitals; prefer a sticky "Enquire / Book a call" bar on course pages.

## Measurement

Track per `source` value in the `leads` table:

- **Page CVR**: leads / unique sessions on the landing page. Target ≥ 3% for course pages, ≥ 1% for blog-driven traffic.
- **MQL → counselling-call rate**: % of leads that book/attend a call. Target ≥ 25%.
- **Counselling-call → enrolment**: ≥ 20% for warm course-page leads.
- **Time-to-first-reply**: ≤ 1 business day (the form copy promises this — enforce it operationally).

Add new sources by passing `source: "<slug>"` in the form payload (e.g. `"cyber-cert-page"`, `"ai-cert-brochure"`, `"blockchain-pathway-guide"`). Then filter the admin leads view by source to see per-magnet and per-course performance.

## Deliverable Format

When asked to plan a magnet, return:

1. **Recommended magnet** (one, with rationale tied to the ICP and stage).
2. **Headline + subhead + CTA copy** (3 variants of each for A/B testing).
3. **Form shape** (exact field list with the `source` value).
4. **Landing page outline** (H2 sections, in order).
5. **Distribution plan** (3 channels, ranked).
6. **Success metric** (the specific number we should hit in 30/60/90 days).

When **building** a magnet page in this repo:

1. Reuse the `glass`, `kicker`, `btn-primary`, `gradient-text` utility classes from `src/app/globals.css`.
2. Create the form as a `"use client"` component that POSTs to `/api/contact` with a page-specific `source`.
3. Match the existing `ContactForm.tsx` UX (status states, inline success message, no redirect).
4. Wire the SEO metadata per the [seo-audit](../seo-audit/SKILL.md) skill.
5. Add the page to `sitemap.ts` and link it from the `/courses` listing + footer.
