# WhispersLab Marketing Site

Marketing site for **Whispers Lab** — an AI/automation agency for small business owners ("We delete busywork."). **Migrated to Next.js (App Router) with Resend wired up for the contact form + newsletter form.** The original static prototype is preserved under [`legacy-static/`](legacy-static/) for reference.

@AGENTS.md

## Current stack (as of the Next.js migration)

- Next.js 16 (App Router, Turbopack), TypeScript, no Tailwind — plain global CSS ported verbatim from the legacy `styles.css` into `app/globals.css`.
- Run locally with `npm run dev` (port 3000, launch config in `.claude/launch.json`).
- `npm run build` / `npm run start` for production.

## How the migration was done

To guarantee **zero design drift**, each legacy page's `<body>` markup (header + main + footer) was extracted **verbatim** into a string constant under `app/_content/*.ts` (see `scripts/extract.js`, a one-off conversion script kept for reference/re-running if the legacy HTML changes). Each route's `page.tsx` renders that string via `dangerouslySetInnerHTML`, so the shipped HTML is byte-identical to the original except for the path rewrites below. This avoids any risk of subtle JSX/attribute-conversion bugs changing the design.

Path rewrites applied during extraction:
- `assets/...` → `/assets/...` (assets now live in `public/assets/`)
- `index.html`, `audit.html`, `core-build.html`, `contact.html` (and their `#fragment` variants) → Next.js routes `/`, `/audit`, `/core-build`, `/contact`
- `<script src="script.js">` removed — its behavior (mobile nav toggle, toolkit marquee) is re-implemented in [`components/ClientEffects.tsx`](components/ClientEffects.tsx), a client component mounted in the root layout that re-runs on every route change and also wires the newsletter/contact forms to the new API routes.
- The inert `onsubmit="return false;"` on both forms was stripped so real submission (via `ClientEffects.tsx` → `fetch`) can happen.

## Pages (4 routes, same as before)

| Route | Legacy file | Purpose |
|---|---|---|
| `/` | `index.html` | Homepage — hero, problem/solution narrative, pricing (3 tiers), features, case studies, newsletter |
| `/audit` | `audit.html` | Offer page for the **$250 Automation Audit** (low-ticket entry offer) |
| `/core-build` | `core-build.html` | Offer page for **The Core Build** (starts at $2,500, the main build service) |
| `/contact` | `contact.html` | Contact page — banner, two-column (details + smart form), newsletter footer |

Section order, design system (colors, typography, `.grad-word`, `.textured-section`, the toolkit marquee, etc.), and all copy/business facts are unchanged from the static prototype — see `legacy-static/` for the original source if you need to diff.

## Site expansion (branch `feature/site-expansion`)

Approved plan: new service, industry, integration, pricing and resource pages, a redesigned nav, and weekly releases. Key pieces:

- **`lib/routes.ts`** is the single list of pages. Each has a `live` flag. The header, footer, sitemap (`app/sitemap.ts`) and `/llms.txt` (`app/llms.txt/route.ts` + `lib/llms.ts`) only show live pages, and unreleased pages 404 via `requireLive()` from `lib/seo.ts`. Publishing a weekly batch = flipping `live: true`. Set `NEXT_PUBLIC_SHOW_UNRELEASED=1` in `.env.development.local` (dev only) to preview everything. Never set it in production.
- **Header/footer**: `components/SiteHeader.tsx` (mega menu, lucide-react icons, mobile sheet) and `components/SiteFooter.tsx`, rendered once in `app/layout.tsx`. Legacy HTML strings no longer contain header/footer (`scripts/strip-legacy-chrome.js`).
- **Service pages**: typed content in `app/_content/services.ts`, rendered by `app/services/[slug]/page.tsx` using `components/service/*` and `app/styles/sections.css` (ported from the approved mockups in `docs/mockups/`). Offers/prices live in `lib/offers.ts`.
- **Copy rules**: plain words, no em dashes, no hype, no "AI agents", only case-study numbers. AI-generated illustrations are allowed (prompts in `docs/visuals/image-prompts.md`) but never as fake screenshots or results.
- **Keywords**: `docs/seo/keyword-map.csv` (Semrush US data, page decisions).
- Strapi token is read from server-only `STRAPI_API_TOKEN` (old `NEXT_PUBLIC_` name is a temporary fallback).

## Forms — now wired to Resend

1. **Newsletter / lead-magnet form** (`.newsletter-form`, all 4 pages) → `POST /api/newsletter` ([`app/api/newsletter/route.ts`](app/api/newsletter/route.ts)) → sends a notification email via Resend (same pattern as the contact form below, no Resend Audience involved).
2. **Contact page smart form** (`.contact-form`, `/contact` only) → `POST /api/contact` ([`app/api/contact/route.ts`](app/api/contact/route.ts)) → sends a notification email via Resend with `replyTo` set to the submitter.

Both routes read config from environment variables (see `.env.local.example`, copy to `.env.local`):
- `RESEND_API_KEY` — required for both.
- `CONTACT_NOTIFY_EMAIL` — recipient for both newsletter-signup and contact-form notifications (defaults to `hello@whisperslab.com`).
- `CONTACT_FROM_EMAIL` — the Resend-verified sender address, must be on a domain verified at resend.com/domains (`whisperslab.com` was verified 2026-07-30; `CONTACT_FROM_EMAIL` should be `Whispers Lab <hello@whisperslab.com>` or similar, not the `onboarding@resend.dev` sandbox sender — sandbox mode only delivers to the Resend account owner's own email).

If `RESEND_API_KEY`/`CONTACT_NOTIFY_EMAIL` are missing, both routes return a 500 with a clear error rather than failing silently — check server logs. **Note:** a `200` from these routes only confirms Resend accepted the email for delivery, not that `CONTACT_NOTIFY_EMAIL`'s inbox actually received it — that also depends on the domain's MX records / mailbox hosting being set up (e.g. Zoho Mail Lite) separately from Resend's sending-side domain verification.

## Known content/business facts to preserve

- Brand voice: direct, no-fluff, "boring AI that works," small-business-owner focused.
- Three offer tiers: Automation Audit ($250, one-time, credited toward Core Build), Core Build (starts at $2,500, 30-day sprint), AI Growth Partner ($500/mo, /growth-partner page added in the site expansion).
- Founder: Haris Ali, Co-Founder, Whispers Lab.
- Footer tagline: "THE LAB REPORT: WEEKLY AI SHORTCUTS TO BUY BACK YOUR TIME."
- Social links: LinkedIn and Instagram point to the real profiles. Clutch link (footer + Organization `sameAs`) uses the shared `CLUTCH_URL` in `lib/social.ts` (`clutch.co/profile/whispers-lab`); the footer icon is still an inline star mark pending a proper Clutch logo asset.
- Analytics: GA4 (`G-DT0L4C5NMQ`) only loads on `whisperslab.com`/`www.whisperslab.com` (never localhost or preview hosts). Custom events via `lib/analytics.ts` `trackEvent`, fired from `components/ClientEffects.tsx`: `generate_lead` (contact form), `newsletter_signup`, `calendly_booking`, `cta_click` (links to /audit, /book, /contact, /core-build, /pricing, /automation-care, /growth-partner). Mark `generate_lead` and `calendly_booking` as key events in the GA4 UI.
- Blog posts link to relevant service/industry/integration pages via `lib/blogLinks.ts` (rendered by `app/blog/[slug]/page.tsx`, independent of whether the post body comes from Strapi or `blogData.ts`).
- Team location: Karachi, Pakistan (confirmed; not Lahore).

## Still open

- Resend API key, audience ID, and contact-notification recipient need to be supplied/confirmed by the user in `.env.local`.
- No email templates/branding for the Resend notification emails have been designed yet (currently plain text).
