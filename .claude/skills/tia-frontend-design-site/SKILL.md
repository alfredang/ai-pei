---
name: tia-frontend-design-site
description: This site's own design system for Tertiary Infotech Academy (tertiaryinfotech.edu.sg) — light mint public pages, a dark animated matrix-green hero with the fibre-optic globe, generated artwork, Exo 2 + Inter, compact non-template layouts, live-online copy. Load with the user-level tia-frontend-design skill whenever building, restyling or reviewing ANY UI in this repo.
---

# Tertiary Infotech Academy — Site Design System

**Load the user-level `tia-frontend-design` skill as well.** It owns the rules for dead space, gaps, chips, template layouts, the animated hero, generated images, the chat widget and UX. This file records how those rules apply on this site, and it wins on theme and look.

## Direction

A recruitment site for international learners choosing Advanced Certificates from a Singapore Private Education Institution. It should feel light, credible and pleasing to read, with one futuristic moment: the hero.

What the owner has asked for on this site:

| Request | What it means here |
|---|---|
| Lighter theme, still professional | Light mint public pages. Do not return to an all-dark site |
| Green that blends with the matrix design | Emerald and teal accents throughout |
| Reduce dead space and gaps; compact | Tight sections and no empty bands, as set out in `tia-frontend-design` |
| Non-template look | Asymmetric, varied sections; no repeated card grids |
| Animated, futuristic hero | Matrix rain plus the fibre-optic globe, in place of the old 2×2 grid |
| Generated images, not library images | The generated set under `public/images/` |
| Cute course-assistant avatar | The WhatsApp widget's female assistant with headset |
| Readable buttons | Register Now was darkened for contrast; check text on solid fills |
| Online clearly stated; ICA-compliant | See [Copy rules](#copy-rules) |

## Theme

Why light: the audience is adult learners and families comparing education providers, and a lighter theme is more pleasing to them. Dark is only an accent here, for contrast.

- **Light (default):** the root `@theme` in [globals.css](../../../src/app/globals.css).
- **Dark scope (`data-theme="dark"`):** the hero, the `#why-us` band (`.home-singapore`) and `/admin`. Everything else is light.
- Token names are legacy: `--color-cyan` holds the primary green and `--color-purple` holds emerald.

| Token | Light | Dark scope |
|---|---|---|
| `--color-bg` | `#F3F8F5` | `#04120B` |
| `--color-bg-elevated` | `#FFFFFF` | `#082016` |
| `--color-bg-deeper` | `#E6F0EA` | `#020B06` |
| `--color-border` | `rgba(6,78,59,0.12)` | `rgba(60,224,124,0.12)` |
| `--color-text` | `#0B1F17` | `#FFFFFF` |
| `--color-muted` | `#4F6358` | `#A3BDAE` |
| `--color-cyan` | `#047857` | `#3CE07C` |
| `--color-purple` | `#065F46` | `#10B981` |
| `--color-purple-light` | `#0D9488` | `#2DD4BF` |
| `--color-amber` | `#B45309` | `#F6AE64` |
| `--color-green` | `#059669` | `#01C982` |

**`text-white` is a trap.** In the light scope `--color-white` is deliberately ink (`#0B1F17`), so `text-white` and `bg-white/10` render dark. On a solid colour fill, use a literal such as `text-[#FFFFFF]`, as the Register Now button does.

Do not add colours outside this palette. Canvas code needs hex values, so copy them from the table.

## Type

Fonts are loaded once in [layout.tsx](../../../src/app/layout.tsx) with `next/font`. Do not import others.

- **Headings:** Exo 2 (`font-display`). Section `h2` is `clamp(1.75rem, 3vw, 2.5rem)`; the hero `h1` is `clamp(2.3rem, 4.6vw, 4rem)`.
- **Body and UI:** Inter.
- **Labels and readouts:** JetBrains Mono. `.kicker` is plain uppercase text such as `[ ADMISSIONS ]`, never in a pill.

## Reusable classes and components

| Item | Where | Use for |
|---|---|---|
| `.kicker`, `.gradient-text`, `.gradient-text-warm` | `globals.css` | Section labels; one highlighted phrase in a heading |
| `.meta-line`, `.meta-label` | `globals.css` | **Use these instead of chips.** `.meta-line` is a row of labels with `·` separators; `.meta-label` is one label, coloured where it is used |
| `.grid-fill`, `.grid-fill-2` | `globals.css` | Card grids with a variable count; the last card spans empty cells so there is no orphan row |
| `.glass`, `.card-hover` | `globals.css` | Cards |
| `.btn-primary`, `.btn-secondary` | `globals.css` | Buttons |
| `.grid-bg`, `.glow-blob` | `globals.css` | Optional texture, clipped by `overflow-hidden`. Not required on every section |
| `.reveal`, `.reveal-d1`–`d4` | `globals.css` | Staggered entrance |
| `.home-page …` | `globals.css` | Homepage spacing and layout |
| `.programme-*`, `.admissions-*`, `.enquiry-*` | `globals.css` | Homepage programme cards, admissions and enquiry form |
| `Container` | `src/components/layout/Container.tsx` | Page width. Defaults to `wide` (1600px) |
| `Emph`, `KeywordFaqSection` | `src/components/sections/KeywordContent.tsx` | Bold SEO keywords and FAQ with schema |
| `PostCover` | `src/components/blog/PostCover.tsx` | Every blog image |

The homepage runs in this order in [page.tsx](../../../src/app/page.tsx): `HomeHero`, `ValueProps`, `Programs`, `WhyChooseInstitute`, `CareersOutcomes`, `AdmissionsSection`, `ContactForm enquiry`, `FeaturedPosts`, `FaqSection`.

## Hero

[HomeHero.tsx](../../../src/components/sections/HomeHero.tsx) is the benchmark for this site. It is a dark scope on a light site.

- **Background:** `MatrixRain`, a canvas of falling characters, with a green gradient and a scrim that keeps the copy readable.
- **Visual:** [FiberGlobe.tsx](../../../src/components/sections/FiberGlobe.tsx), a rotating Earth centred on Singapore. Light pulses race between cities, one colour per discipline, representing the speed of AI, cyber security, blockchain and quantum computing. HUD rings, satellites, a scan sweep and a live counter give it the futuristic look.
- **Data:** the continents come from [globe-land.ts](../../../src/lib/globe-land.ts). Spin, tilt and pulse speed are constants at the top of `FiberGlobe.tsx`.
- **Discipline colours** are in `DISCIPLINES` in `HomeHero.tsx`: AI teal, Cyber Security green, Blockchain amber, Quantum pale phosphor.
- **Do not** bring back the 2×2 card grid or a static hero image, or copy this globe to another site.

## Images

The site uses a generated set, delivered as WebP. Do not add stock or library images.

| Folder | Art direction | Used by |
|---|---|---|
| `public/images/programmes/` | Dark green 3D technology scenes with glowing light, one per discipline | `Programs` |
| `public/images/journal/` | Warm, natural editorial scenes of adult learners with plants and green accents, often in Singapore | `PostCover`, `ContactForm` |
| `public/images/admissions/` | The same editorial style, showing learners studying online from home | `AdmissionsSection` |
| `public/images/features/` | Glossy green-and-gold 3D objects on a transparent background | `ValueProps` |

To add a blog image, save it as `public/images/journal/<post-slug>.webp` and map the slug in [post-hero-images.ts](../../../src/lib/post-hero-images.ts). The SVG title cards from the `blog-cover-image` skill are only a fallback.

Show learners studying **online from their home country**, not arriving in Singapore or sitting in one of our classrooms, and describe them as illustrations in the `alt` text.

## Copy rules

- **State the mode.** Say "live online" and "study from anywhere" on any page that sells a programme. Classes run part-time, three evenings a week, 7–10 PM Singapore time.
- **Follow ICA's rules.** Never promise Student's Pass, visa, relocation or arrival help. Approved wording is on [study-in-singapore](../../../src/app/study-in-singapore/page.tsx): a Student's Pass is only issued for approved full-time courses, and a Short-Term Visit Pass does not cover a multi-module course. Link to ICA and re-check its pages when changing this copy.
- **Internal links.** Discipline links go to `DISCIPLINE_PAGES` in [course-categories.ts](../../../src/lib/course-categories.ts), using the keyword as the link text.

## Navbar, footer and chat widget

- **Navbar:** [Navbar.tsx](../../../src/components/layout/Navbar.tsx) and `MobileMenu.tsx`. Items come from the DB, with `FALLBACK` in the file. Renaming an item means changing the DB row, `FALLBACK` and `scripts/reset-header-menu.ts`.
- **Footer:** [Footer.tsx](../../../src/components/layout/Footer.tsx). Compact three columns, with contact details from settings and a DB-driven menu. The Powered by credit is already there.
- **Chat widget:** [WhatsAppWidget.tsx](../../../src/components/ui/WhatsAppWidget.tsx), using `/images/chat-avatar.svg`, the female course assistant with a headset and a WhatsApp badge. Hidden on `/admin`.

## Site exceptions

- The hero and the `#why-us` band are dark on an otherwise light site, for contrast.
- `/admin` stays dark.

## Known violations

Do not copy these. Fix them when you touch the file.

- **Older section spacing:** sections in the IT-service routes and some `py-12`/`gap-12` classes outside the keyword pages have not been tightened.
- **Hero spacing:** `HomeHero.tsx` still has `lg:gap-14 min-h-[70vh] py-16`, which only `.home-page #hero` overrides in `globals.css`.
- **Reduced motion:** `MatrixRain` keeps animating under `prefers-reduced-motion`, and `.reveal` has no reduced-motion rule. `FiberGlobe` is correct.
- **Chat widget:** it has only a pulse ring. It lacks the idle animation and pop-up messages `tia-frontend-design` requires.
- **Old image:** `public/images/hero-classroom.png` is the homepage's social share image. It shows a classroom, has a generator mark in the corner, and is 1024×559 although `page.tsx` declares 1200×630. Replace it.
- **Blog covers:** new posts get an SVG title card until artwork is added by hand.
- **Outside this site's purpose:** the IT-service routes (`ai-solutions`, `learning-management-system`, `tpqa-consultancy` and others using `ServicePageTemplate`) are not a pattern for new pages.
- **Unused sections:** `Hero`, `HeroBanner`, `Services`, `WhyChooseUs`, `CoursesCarousel`, `AILmsTmsShowcase`, `ELearningShowcase` and `CMSShowcase`, `CTABanner`, `CourseDetails`, `JobRoles` and `FundingCalculator` are not imported anywhere and contain old spacing and chips.

## Before you finish

Run the `tia-frontend-design` checks. The dev server is on port **3068**, and `npm run build` is the type-check, as there is no test suite.
