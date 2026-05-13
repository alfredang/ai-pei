# Tertiary Infotech CMS

A self-hosted, full-stack CMS (Next.js 16 + Postgres + Drizzle) replacing the legacy WordPress site at **www.tertiaryinfotech.com**.

- **Landing page**: single-page marketing site showcasing AI-LMS-TMS (WSQ & TPQA compliant) flagship.
- **Blog**: WordPress-style posts with categories, tags, SEO meta, JSON-LD Article schema.
- **CMS pages**: dynamic CMS-managed pages at `/<slug>`.
- **Admin**: `/admin` — TipTap rich editor, media library, lead inbox, menu builder, settings.
- **AI**: public Gemini chatbot widget + admin **Claude Agent SDK** "AI Assist" buttons (authenticated via Anthropic OAuth subscription token — no per-call API billing).

## Stack

| Layer | |
|---|---|
| Framework | Next.js 16 (App Router) + React 19 + TypeScript |
| Styling | Tailwind CSS 4 (dark + neon theme) |
| DB | Postgres 16 |
| ORM | Drizzle ORM + drizzle-kit |
| Auth | Auth.js v5 (credentials provider + bcrypt) |
| Editor | TipTap 2 |
| AI (public) | Google Gemini 2.5 Flash |
| AI (admin) | Claude Agent SDK via `ANTHROPIC_AUTH_TOKEN` (Claude Max subscription) |
| Email | Nodemailer + Gmail OAuth2 |
| Deploy | Coolify (Dockerfile + nixpacks both supported) |

## Quick start

```bash
cp .env.example .env
# Fill DATABASE_URL, AUTH_SECRET, ADMIN_EMAIL, ADMIN_PASSWORD, GMAIL_*, GEMINI_API_KEY, ANTHROPIC_AUTH_TOKEN

npm install
npm run db:push       # create tables from src/db/schema.ts
npm run seed:admin    # creates admin user + default header/footer menus
npm run migrate:wp    # one-time: imports posts/pages from tertiar2_newTIWp2025.sql
npm run dev
```

Visit:
- `http://localhost:3000` — public site
- `http://localhost:3000/admin` — admin (redirects to `/admin/login`)

## Multi-phase migration (executed)

| Phase | Scope |
|---|---|
| **0** — Bootstrap | Next.js 16, TypeScript, Tailwind 4, dark/neon theme. |
| **1** — DB + Auth | Drizzle schema (pages, posts, categories, tags, menus, media, leads, settings, redirects, users). Auth.js credentials provider, admin shell + login. |
| **2** — Editor & SEO | TipTap editor, server-side image upload, per-route `generateMetadata`. |
| **3** — Public site | Hero → **AI-LMS-TMS showcase** (WSQ/TPQA badges) → Services → Why-Us → Featured posts → Lead form. Nav + footer driven by DB. |
| **4** — WP import | `scripts/migrate-wp.ts` parses [tertiar2_newTIWp2025.sql](tertiar2_newTIWp2025.sql), downloads all referenced images from live site into `/public/blog/`, rewrites `<img src>`, preserves Yoast / RankMath SEO meta, writes 301 redirects from old WP slugs to new paths. |
| **5** — AI | Public Gemini chatbot widget (port of legacy `/api/chat`). Admin **Claude Agent SDK** AI Assist — `Draft`, `Summarize`, `Suggest SEO meta`. |
| **6** — Deploy | Standalone Next.js build, Dockerfile + nixpacks.toml for Coolify. |
| **7** — Cutover | See below. |

## Coolify deployment

1. Provision a Postgres service in Coolify. Note the `DATABASE_URL`.
2. Create a new application from this Git repo. Coolify auto-detects nixpacks (or use the `Dockerfile`).
3. Set environment variables (see `.env.example`).
4. First deploy:
   - SSH into the container: `npm run db:push && npm run seed:admin && npm run migrate:wp`
5. Add custom domain `www.tertiaryinfotech.com` once a staging URL is verified.

## Domain cutover (Phase 7)

> Plan a low-traffic window. Keep the old WordPress instance running read-only for 7 days as a fallback.

1. **Pre-flight (24h before)**: lower DNS TTL on `www.tertiaryinfotech.com` A/CNAME to 300s.
2. **Final content sync**: re-run `npm run migrate:wp` so any new WP edits land in Postgres.
3. **Backup**: snapshot Postgres + the WP DB dump + a full mirror of WP `/wp-content/uploads`.
4. **Smoke test on staging subdomain**:
   - All 13 imported posts render at `/blog/<slug>` with images.
   - Old WP URL like `https://staging.tertiaryinfotech.com/<old-slug>/` returns 301 to the new path.
   - Lead form submits → row in `/admin/leads` AND email to `sales@tertiarycourses.com.sg`.
   - Public chatbot responds (Gemini).
   - Admin AI Assist works (Claude subscription token in env).
   - Lighthouse mobile ≥ 90 on `/` and `/blog/<slug>`.
5. **DNS switch**: point `www` to the Coolify ingress IP / CNAME.
6. **Post-cutover**:
   - Submit `https://www.tertiaryinfotech.com/sitemap.xml` in Google Search Console.
   - Monitor `/admin/leads` and server logs for 48h.
   - Raise DNS TTL back to 3600s after a week of stability.

## Folder layout

```
src/
  app/
    page.tsx                  Landing (Hero, AI-LMS-TMS, Services, FeaturedPosts, ContactForm)
    blog/[slug]/page.tsx      Single post
    [slug]/page.tsx           Dynamic CMS page (with redirects lookup)
    admin/                    Authenticated admin (login, dashboard, posts, pages, leads, menus, …)
    api/
      auth/[...nextauth]/     NextAuth handlers
      contact/                Lead form submission + email
      chat/                   Public Gemini chatbot
      ai/assist/              Admin Claude Agent SDK endpoint
      upload/                 Media upload
    sitemap.ts                Generated from DB
    robots.ts
  components/
    layout/                   Navbar, Footer (DB-driven menus), Container
    sections/                 Hero, AILmsTmsShowcase, Services, WhyChooseUs, FeaturedPosts, ContactForm
    admin/                    Editor, PostEditorForm, AIAssistButton, MediaUploader
    ui/                       ChatBot
  db/                         Drizzle schema + connection
  lib/                        auth, email, slugify, ai/claude, site-content
scripts/
  seed-admin.ts               One-shot: admin user + default menus + settings
  migrate-wp.ts               WordPress → Postgres importer (images + SEO + redirects)
legacy/                       Original Vite + Express code, kept for reference
```

## License

UNLICENSED — proprietary © Tertiary Infotech Pte Ltd.
