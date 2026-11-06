# Homepage brief: name the entity, route to the priority pages (Nov 7, 2026)

Week 3 item of `topical-authority-plan-2026-10.md`. This is a brief for approval, not a design. Nothing in the site changes until you approve it.

**Coordinate first:** the main checkout has uncommitted homepage work on `feature/automation-consulting-redesign` (`app/page.tsx`, `app/layout.tsx`, new consulting components). Build this brief on top of that redesign, not beside it, or the two will conflict.

## What the homepage says today (live, Nov 7)

| Element | Today |
|---|---|
| Title | Business Automation Services for Small Businesses \| Whispers Lab |
| Meta description | Business automation services and AI automation consulting for small businesses. Start with a $250 Automation Audit, then go live in 30 days. |
| H1 | We delete busywork. |
| Line under the H1 | Custom AI and automation for small business owners. |
| H2s | Stop running your business like it's 2010. / You are bottlenecking your own growth. / What is manual work actually costing you? / The Whispers Lab Difference. / Boring AI that actually works. / Production-ready in under 30 days. / Common workflows we automate / Choose the next decision, not a confusing package (written with an em dash) / What happens when the work stops piling up. / Fix the busywork yourself, one guide at a time. / Let's find your 10 to 20+ hours a week. / Not ready to automate yet? |
| Body links | 2 of 21 case studies, none of the 6 use-case pages. Everything else comes from the menu and footer, which link every page equally. |

## The problem

1. **The H1 names nothing.** "We delete busywork." is a good brand line, but it tells a search engine, an AI answer engine and a first-time visitor nothing about what Whispers Lab sells or for whom.
2. **The H2s are slogans.** None of them is a question or states what the section contains.
3. **PageRank is spread flat.** The homepage should hand its authority to the pages that sell, with descriptive link text.
4. **House-rule breaks on the live page:** two em dashes in visible text (one is in an H2), and "10 to 20+ hours a week" in a headline has no source behind it. It needs a case study number or a softer claim.

## Proposal

### First screen
- **Line above the H1 (keep the brand line):** We delete busywork.
- **H1:** Small business automation, built and maintained for you.
- **First sentence (answers the question in the open):** Whispers Lab is a US automation agency that builds and maintains done-for-you automations for small businesses on n8n, Zapier, Make and Airtable.
- **Primary button:** Start with the $250 Audit. **Secondary link:** See the services (goes to `/services`).
- **Client reviews row:** keep as is.

### Title and meta description
- **Title (47 characters):** `Small Business Automation Agency | Whispers Lab` (keeps the entity, adds "agency" which the data shows buyers use; avoid "ai automation agency" as the main term).
- **Meta description (about 140 characters):** `Done-for-you automation for US small businesses on n8n, Zapier, Make and Airtable. Start with a $250 Automation Audit, builds from $2,500.`

### Section order (H2s as questions or plain statements)
1. **What does Whispers Lab automate?** A short list of the six services, each linking to its page with the service name as the link text.
2. **Who do we do it for?** The five industries, linked.
3. **Which tools do we build on?** n8n, Zapier, Airtable, Make, linked to the platform pages that exist.
4. **How does it work?** Audit, build, care: the three-step path with prices.
5. **What results have clients seen?** Three case studies with their real numbers, linking to the case study pages.
6. **What does manual work cost you?** The existing ROI calculator.
7. **How do you start?** The Audit call to action.
8. **Latest guides** (keep), plus a short "Not ready yet?" link to the readiness assessment.

### "Start here" block (the priority pages, with link text that describes the page)
| Link text | Goes to |
|---|---|
| Automation consulting for small businesses | `/services/automation-consulting` |
| n8n consultants | `/integrations/n8n` |
| Zapier consultants | `/integrations/zapier` |
| Airtable consultants | `/integrations/airtable` |
| Data entry automation | `/services/data-entry-automation` |
| Client onboarding automation | `/services/client-onboarding-automation` |
| What automation costs | `/pricing` |
| Automation examples by department | `/use-cases` |

This block gives each of the eight pages a link from the strongest page on the site. It matches the query groups in `topical-map.md`, so each link supports the page that owns that group.

## What stays the same
- The look and feel, the navy hero and the brand voice.
- The prices and the three-step path.
- The footer and the review links.

## Rules for the copy
Plain words, no em dashes, no hype, no "AI agents", only numbers that come from a case study, and the approved source-context sentence reused word for word where a company description is needed.

## Decisions needed
1. **Approve the H1.** "Small business automation, built and maintained for you." with "We delete busywork." kept above it.
2. **Approve the title and meta description.**
3. **Approve the "start here" block** and the eight links.
4. **Decide how the "10 to 20+ hours a week" headline should change.** Options: a real figure from a case study (for example about 15 hours a week for the lead sales build, about 22 for the catalog engine), or a headline without a number.
5. **Say whether the redesign branch should land first.** I'd merge or finish it before editing the homepage.
