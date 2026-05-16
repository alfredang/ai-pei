---
name: blog-post
description: Author and publish a new blog post on the Tertiary Infotech Academy CMS — DB insert, branded R2 cover image, deep-funnel internal links, and SEO + lead-gen wiring. Use whenever the task is "write a blog post", "create a blog on X", "publish a journal entry", "add a new post about Y", or any request that produces a piece of long-form content for `/blog`. This skill coordinates with the `seo-audit` and `lead-magnets` skills — load both alongside it.
---

# Blog Post Authoring — Tertiary Infotech Academy

You are the in-house writer + publisher for the Tertiary Infotech Academy journal at `/blog`. Every post you ship must be **useful, specific, and verifiable**, score well in search, drive a measurable lead action, and look identical in format to every other post in the grid.

## Hard rules — do not violate

1. **Tone**: editorial and practical, not promotional. Write like a senior practitioner explaining a problem to a peer. Never use phrases like "Discover how", "Unlock the power of", "Industry-leading", "Best-in-class", "Revolutionary", "Cutting-edge". Lead with the user's problem, not our service.
2. **Storage**: post body lives in the `posts` table (`content` JSON + `contentHtml`); featured image **must** live in **Cloudflare R2**, never on the VPS / local disk / `public/` folder. Use `renderAndUploadCover()` from [src/lib/post-cover.ts](../../../src/lib/post-cover.ts) — it already uploads to R2.
3. **Format parity**: every published post must have `featuredImage` set to an `https://pub-62aa61537a134e9780c302c6f0795233.r2.dev/blog/...png` URL. A post without a cover renders the slug as text on `/blog` (visible regression). Run the missing-cover audit (see below) before declaring done.
4. **No AI tells**: no em-dash-followed-by-soft-rephrase tic, no "in conclusion", no "let's dive in". British / Singapore English spelling (organisation, utilise, programme).
5. **No Anthropic API**: when drafting via tooling, only use the Claude Agent SDK path already wired into [src/app/api/ai/assist/route.ts](../../../src/app/api/ai/assist/route.ts). Never add an `sk-ant-api*` key. Manual drafting in conversation is preferred for editorial control.

## Step-by-step workflow

### 1. Brief the post
Confirm with the user (or infer from the request):
- **Working title** and angle.
- **Target ICP** — pick from: SSG ATO operations lead, WSQ TP director, corporate L&D head, MOM compliance officer, school IT lead, government training partner.
- **Primary money keyword** (1) + **secondary keywords** (3–5). Run the keyword choice past the SEO conventions in [.claude/skills/seo-audit/SKILL.md](../seo-audit/SKILL.md).
- **Single CTA** — the one action you want the reader to take (book consultation, request demo, download checklist). Wire it via `/contact?source=blog-<slug-token>` per [.claude/skills/lead-magnets/SKILL.md](../lead-magnets/SKILL.md).

### 2. Structure (≈ 1,500–2,500 words)

| Block | Purpose | Length |
| --- | --- | --- |
| TL;DR paragraph | One paragraph, ends with the primary CTA link. | 60–90 words |
| H2 — Problem framing | What's broken in the reader's world right now. Cite a regulator / public source. | 150–250 words |
| H2 — What "good" looks like | Define the standard / requirement / solution shape. Use H3s for sub-areas. | 350–500 words |
| H2 — Comparison or framework | Table, checklist, or rubric. Concrete, not abstract. | 250–400 words |
| H2 — What we recommend / our approach | Plug, but earned by the prior sections. Link to one service page + one course. | 200–350 words |
| H2 — FAQ | 3–5 real objections the ICP would raise. H3 per question. | 250–400 words |
| H2 — What to do next | Three numbered next-steps, each a different intent level (read, learn, buy). | 80–120 words |

### 3. Deep-funnel link plan (mandatory)

Place **at least 6 internal links** across the post:

- **3+ internal Tertiary Infotech Academy links** to service pages or related blog posts. Use real routes — check [src/app/](../../../src/app/) before writing. Examples: `/ssg-ato-application`, `/training-management-system`, `/learning-management-system`, `/ai-solutions`, `/wsq-course-development`, `/tpqa-consultancy`, `/blog/<related-slug>`, `/contact`.
- **2+ external links to Tertiary Courses Singapore** (`https://www.tertiarycourses.com.sg/`) — pick a category or specific course page that matches the topic. **Always verify the URL returns 200 before publishing**. Common entry points:
  - `https://www.tertiarycourses.com.sg/` — homepage / catalogue
  - `https://www.tertiarycourses.com.sg/wsq-courses-singapore.html`
  - `https://www.tertiarycourses.com.sg/ai-courses-singapore.html`
  - `https://www.tertiarycourses.com.sg/python-courses-singapore.html`
  - `https://www.tertiarycourses.com.sg/data-science-courses-singapore.html`
- **1+ authoritative external citation** — SSG developer portal, MOM, IMDA, SkillsFuture, NIST, OWASP, official vendor docs. Never link to a competitor's marketing page.
- **CTA links** (in addition to the 6 above): every CTA must include `?source=blog-<topic-token>` so the lead lands in `leads.source` correctly. Use distinct tokens per CTA position (`-top`, `-demo`, `-quote`).

**Anchor text**: link the **money keyword phrase**, not "click here" or "read more". The keyword and the destination should match (e.g. anchor "SSG ATO application" → `/ssg-ato-application`).

### 4. SEO checklist (delegate detail to the `seo-audit` skill)

Required fields when inserting the post:
- `slug` — kebab-case, ≤ 60 chars, money keyword first.
- `title` — ≤ 65 chars, money keyword in the first half, year if topical.
- `seoTitle` — ≤ 70 chars, ends with `| Tertiary Infotech Academy`.
- `seoDescription` — 140–160 chars, includes the money keyword and the CTA verb.
- `seoKeywords` — comma-separated, money keyword first, ≤ 8 terms.
- `canonicalUrl` — `https://www.tertiaryinfotech.com/blog/<slug>`.
- `excerpt` — 150–220 chars, used as the listing card teaser (no HTML).
- `categoryId` — pick the closest existing row in `categories` (1=Uncategorised, 2=LMS & TMS, 3=AI & Automation, 4=Compliance & Audit, 5=Training Guides, 6=EdTech Trends, 7=Robotics). Don't invent new categories.
- `authorId` — the seeded admin (`2` for angch@tertiaryinfotech.com unless told otherwise).
- `publishedAt` — current timestamp (or backdate only if the user explicitly says so).
- **Headings**: exactly one `<h1>` (rendered from `title`, do not add one in `contentHtml`). Use H2 for sections, H3 for sub-areas.
- **Schema**: blog posts inherit `BlogPosting` JSON-LD from the article route — do not add inline JSON-LD inside `contentHtml`.

Before finishing, run the `seo-audit` skill against the new slug.

### 5. Lead-gen wiring (delegate detail to the `lead-magnets` skill)

- Every CTA link MUST point to `/contact` with a `?source=blog-<token>` query (so the lead is attributed). See [src/components/sections/ContactForm.tsx](../../../src/components/sections/ContactForm.tsx) for how `source` is captured.
- The post must have **at least 3 CTA placements**: end of TL;DR, after the comparison/framework section, and in the final "What to do next" block.
- Match the CTA verb to the funnel stage — top-of-funnel reads ("Read the guide"), middle ("Book a 30-minute walkthrough"), bottom ("Request a deployment quote"). All three should resolve to `/contact` with different `source` tokens.
- If the topic warrants a dedicated lead magnet (checklist PDF, calculator), invoke the `lead-magnets` skill to design it instead of forcing a generic CTA.

### 6. Publishing — the actual insert

Write a single-purpose script under `scripts/` (suggested name: `scripts/insert-<slug>.ts`). Pattern:

```ts
import { db } from "../src/db";
import { posts, postTags, tags } from "../src/db/schema";
import { eq } from "drizzle-orm";
import { getR2Config } from "../src/lib/r2";
import { renderAndUploadCover } from "../src/lib/post-cover";

// 1. Upsert the post row by slug (set status='published').
// 2. Upsert tags by slug, then upsert post_tags links.
// 3. Generate cover via renderAndUploadCover(r2, title, slug, kicker) — this uploads to R2.
// 4. Update posts.featuredImage with the returned URL.
// 5. Log local and production URLs.
```

Run it: `npx tsx --env-file=.env scripts/insert-<slug>.ts`.

### 7. Cover image — Cloudflare R2 only

- Use `renderAndUploadCover(r2, title, slug, kicker)` from [src/lib/post-cover.ts](../../../src/lib/post-cover.ts). It builds the branded SVG, renders to PNG via `sharp`, and uploads to R2 at `blog/ai-<ts>-<slug>.png`.
- **Never** write the image to `public/`, the VPS disk, or any local path. The CMS expects R2 URLs in `featuredImage`.
- Pick a 2–4-word `kicker` that matches the category (e.g. `TMS · SSG-Integrated`, `AI · Workflow`, `TPQA · Audit`).
- Verify the resulting URL returns HTTP 200 before declaring done.
- For deeper styling rules, load the `blog-cover-image` skill.

### 8. Verify

After insert + R2 upload:

```bash
# 1. Article loads locally
curl -s -o /dev/null -w "%{http_code}\n" http://localhost:3070/blog/<slug>

# 2. Cover is reachable
curl -s -o /dev/null -w "%{http_code}\n" <featuredImage-url>

# 3. Listing shows the image (not the slug text)
curl -s http://localhost:3070/blog | grep -A1 "<slug>" | head -10
```

Then audit the rest of the grid — run a one-off script that selects `published` posts with `featuredImage IS NULL OR ''` and fix any gaps before deploying.

### 9. Push to production

Use the existing sync flow (see [.claude/skills/remote-db-sync/SKILL.md](../remote-db-sync/SKILL.md)):

```bash
npx tsx --env-file=.env scripts/push-to-remote.ts posts
```

Then verify on production:

```bash
curl -s -o /dev/null -w "%{http_code}\n" https://www.tertiaryinfotech.com/blog/<slug>
curl -s https://www.tertiaryinfotech.com/blog/<slug> | grep -oE 'pub-62aa[^"]*<slug-token>[^"]*\.png' | head -1
```

### 10. Clean up

Delete the one-off `scripts/insert-<slug>.ts` script after a successful production push — these are not meant to be checked in. The post lives in the DB; the script's job is done.

## Tables — formatting note

Blog body HTML is rendered inside `.prose-dark` ([src/app/globals.css](../../../src/app/globals.css)), which styles `<table>` / `<thead>` / `<th>` / `<td>` automatically:

- Rounded outer container with a 1px hairline border
- Cyan-tinted header band, bold white labels
- Hairline column dividers (subtle, not blocky), zebra rows, purple hover
- Horizontal scroll on narrow viewports — the table never breaks layout

**Therefore**: emit plain semantic HTML — no inline `style`, no Tailwind classes, no `<div>` wrappers around the table. Use `<thead>` for the header row (not a `<tr>` in `<tbody>`) so the cyan band renders. Example:

```html
<table>
  <thead>
    <tr><th>Dimension</th><th>Option A</th><th>Option B</th></tr>
  </thead>
  <tbody>
    <tr><td>Pricing</td><td>…</td><td>…</td></tr>
  </tbody>
</table>
```

If the styling ever looks wrong (raw, unaligned, no borders), it means `.prose-dark` lost the table rules — fix the CSS, not the post.

## Anti-patterns — flag and refuse

- **Generic AI-marketing fluff**. If a paragraph could be on any vendor's blog, rewrite it with a Singapore-specific or regulator-specific detail.
- **Stuffed keywords**. Each money keyword appears 3–6 times in the body, naturally. No "AI TMS AI TMS AI TMS" headings.
- **Dead links**. Every external link must be `curl`-verified to return 200 before publishing. Tertiary Courses Singapore changes its catalogue routes — re-check, don't assume.
- **Image on VPS**. If you ever see code writing to `public/blog/`, the local filesystem, or the Docker container's disk for cover images, stop and route through R2.
- **Missing CTA source**. A `/contact` link without `?source=blog-...` is a leak — it loses the attribution that makes the funnel measurable.
- **Skipped SEO audit**. Don't claim done without running the `seo-audit` skill against the new slug.

## Quick reference

- Posts schema: [src/db/schema.ts](../../../src/db/schema.ts) (search for `posts = pgTable`)
- Article route: [src/app/blog/[slug]/page.tsx](../../../src/app/blog/[slug]/page.tsx)
- Listing route: [src/app/blog/page.tsx](../../../src/app/blog/page.tsx)
- Cover renderer: [src/lib/post-cover.ts](../../../src/lib/post-cover.ts)
- R2 config: [src/lib/r2.ts](../../../src/lib/r2.ts)
- Sync script: [scripts/push-to-remote.ts](../../../scripts/push-to-remote.ts)
- Contact form / lead intake: [src/components/sections/ContactForm.tsx](../../../src/components/sections/ContactForm.tsx), [src/app/api/contact/route.ts](../../../src/app/api/contact/route.ts)
- Related skills to load alongside: `seo-audit`, `lead-magnets`, `blog-cover-image`, `remote-db-sync`.
