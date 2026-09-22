# Whispers Lab image prompts (for ChatGPT image generation)

Generate each image in ChatGPT, then send the files back with the **exact filename** listed. I will convert them to WebP/AVIF, add alt text, and place them.

## How to use

1. Start every ChatGPT request by pasting the **style block** below, then the image prompt.
2. Use the size listed for each image (ChatGPT: say "landscape 16:9", "wide 1.91:1", or "square").
3. If a result contains any text, letters, numbers, logos, or a human face, regenerate it. Those are the most common problems.
4. Keep the version you like best and name it exactly as listed.

## Style block (paste first, every time)

> Clean editorial 3D illustration for a B2B software agency website. Deep navy background (#0B0D14 to #0F172A) with a soft blue-to-violet glow (#3691FF to #8041FF). Matte white and frosted glass objects, rounded shapes, soft studio lighting, gentle shadows, subtle film grain. Calm, premium, uncluttered, lots of empty space. **No text, no letters, no numbers, no logos, no brand marks, no human faces, no screens with readable content.**

## Rules (so images stay honest)

- AI images are illustrations. Never make one look like a real client screenshot, a real dashboard with data, or a real result.
- No tool logos (Airtable, n8n, Zapier, Xero, and so on). Official logos come from each vendor's press kit, not AI.
- Real people (Haris, the team) are **real photos only**. Send those separately.

---

## 1. Social preview images (1200 × 630, wide 1.91:1)

These appear when a page is shared on LinkedIn, Slack, WhatsApp, or iMessage. Leave the **left half empty** so I can add the page title in code.

| Filename | Page | Prompt (after the style block) |
|---|---|---|
| `og-default.png` | Whole site fallback | A tidy stack of paper documents on the right dissolving into small glowing blue and violet cubes that float away and neatly line up. Left half empty. |
| `og-pricing.png` | /pricing | Three frosted glass pillars of increasing height on the right, each topped with a small glowing cube (blue, indigo, violet). Left half empty. |
| `og-growth-partner.png` | /growth-partner | A small glass greenhouse on the right with softly glowing gear shapes growing like plants inside, one new gear sprouting. Left half empty. |
| `og-about.png` | /about | A calm, empty modern desk on the right with a single glowing violet cube resting on it and a neat pile of paper being filed away into a glass drawer. Left half empty. |
| `og-data-entry.png` | /services/data-entry-automation | An invoice-shaped white card on the right passing through a thin glowing blue scanning beam and coming out as neat rows of small glowing tiles. Left half empty. |
| `og-bookkeeping.png` | /services/bookkeeping-automation | A white ledger book on the right, its pages turning into tidy glowing columns that stack into balanced piles. Left half empty. |
| `og-client-onboarding.png` | /services/client-onboarding-automation | A glowing doorway on the right with a soft path of small tiles leading through it into a bright, organized room of neatly placed folders. Left half empty. |
| `og-lead-follow-up.png` | /services/lead-follow-up-automation | Small paper-plane shapes on the right flying along smooth glowing curved paths into a neat inbox tray, none of them falling. Left half empty. |
| `og-software-integration.png` | /services/software-integration-services | Several different rounded app-shaped blocks on the right connected by smooth glowing cables into one central glass hub. Left half empty. |
| `og-airtable.png` | /integrations/airtable | A colorful grid of rounded glass blocks on the right, arranged like a tidy spreadsheet, with glowing lines linking some cells. No logo. Left half empty. |
| `og-n8n.png` | /integrations/n8n | A node-and-wire flow diagram made of glass nodes on the right, one branch splitting into two paths that rejoin. No logo. Left half empty. |
| `og-zapier.png` | /integrations/zapier | A chain of small glowing rounded blocks on the right linked in a line, with a spark of light traveling from one to the next. No logo. Left half empty. |
| `og-law-firms.png` | /industries/law-firms | A classic brass scale of justice on the right rendered in frosted glass, with neat document folders on each side, perfectly balanced. Left half empty. |
| `og-real-estate.png` | /industries/real-estate | A small glass model house on the right with a soft glowing path of message bubbles flowing toward its door. Left half empty. |
| `og-ecommerce.png` | /industries/ecommerce-retail | Neat rows of small product boxes on shelves on the right, some glowing as they are sorted automatically along a smooth track. Left half empty. |
| `og-property-management.png` | /industries/property-management | A small glass apartment building on the right with softly glowing windows and a tidy key ring floating beside it. Left half empty. |
| `og-accounting.png` | /industries/accounting-bookkeeping | A calculator-shaped glass object on the right with receipts flowing into it and coming out as neat stacked cards. Left half empty. |
| `og-roi-calculator.png` | /resources/automation-roi-calculator | A glass hourglass on the right with glowing sand, and small clock shapes returning upward out of it. Left half empty. |
| `og-ai-readiness.png` | /resources/ai-readiness-assessment | A glass checklist clipboard on the right with glowing check marks lighting up one by one. Left half empty. |

## 2. Page illustrations (1600 × 900, landscape 16:9)

Used inside the page, next to text. Keep the subject **centered** with space around it.

| Filename | Page and spot | Prompt (after the style block) |
|---|---|---|
| `about-story.png` | /about, "Why we exist" section | An overwhelmed desk covered in paper stacks on the left gradually becoming a clean, calm desk on the right, with the papers turning into small glowing cubes filed neatly away. |
| `growth-partner-month.png` | /growth-partner, "How a month works" | A circular track with four glass stations (a magnifying glass, a checklist, a wrench, a small report sheet) and a glowing orb moving around it. |
| `pricing-paths.png` | /pricing, "Which one fits you?" | Three glass paths starting from one point: a short path to a small cube, a medium path to a stack of cubes, and a long gently rising path to a growing tower of cubes. |
| `industry-law-hero.png` | /industries/law-firms hero | A tidy modern law office desk seen from above: leather folder, fountain pen, stacked case files, a small glass scale, soft lamp light. Objects only, no people, no readable text on papers. |
| `industry-real-estate-hero.png` | /industries/real-estate hero | A neat real estate agent's desk with a small architectural house model, a set of keys, and a phone glowing softly, seen from above. No readable text. |
| `industry-ecommerce-hero.png` | /industries/ecommerce-retail hero | A clean small-business warehouse corner with labeled-looking (but blank) boxes on shelves and a packing table, softly lit. No readable labels. |
| `industry-property-hero.png` | /industries/property-management hero | A property manager's desk with a small apartment building model, a key board with rows of hooks, and a tidy toolbox, seen from above. No readable text. |
| `industry-accounting-hero.png` | /industries/accounting-bookkeeping hero | An accountant's desk from above: neat receipt stacks, a calculator, a closed ledger, a coffee cup, soft morning light. No readable numbers. |

## 3. Case study hero replacement (1600 × 900)

| Filename | Page | Prompt (after the style block) |
|---|---|---|
| `case-financial-document-reader.png` | /case-studies/financial-document-reader | Bank-statement-shaped white sheets on the left entering a glowing glass reading frame in the center, and on the right the same information appearing as tidy rows of glowing tiles stored in a secure glass vault with a small lock. No readable text or numbers. |

This replaces `public/assets/case-studies/automate-financial-document.jpg`, which looks AI-generated with garbled screen text.

## 4. Blog post heroes (1600 × 900)

| Filename | Planned post | Prompt (after the style block) |
|---|---|---|
| `blog-is-n8n-free.png` | Is n8n free? | A glass flowchart of connected nodes resting on an open palm-shaped glass tray, with a small price-tag shape beside it that is blank. |
| `blog-ai-receptionists.png` | How do AI receptionists work? | A vintage desk phone rendered in frosted glass, with soft glowing sound waves flowing into a tidy calendar card. |
| `blog-bank-statements-excel.png` | Bank statements into Excel automatically | A bank-statement-shaped sheet sliding into a glowing grid of spreadsheet-like cells that fill in automatically. No readable numbers. |
| `blog-client-onboarding-workflow.png` | Client onboarding workflow template | A sequence of five glass cards laid out in a gentle curve, like steps on a path, each with a simple icon shape (hand wave, form, calendar, folder, check). |
| `blog-invoice-processing.png` | How to automate invoice processing | A stack of invoice-shaped cards on a conveyor passing a soft blue light, then landing sorted into two trays: a large "done" tray and a small "check" tray. |

---

## After you generate

Send the files in one batch (or by section). For each file I will:

1. Convert to WebP or AVIF and keep the file small.
2. Place it on the right page with `next/image`, correct width and height, and lazy loading below the fold.
3. Write alt text that describes what is actually in the picture.
4. Use the social preview images in each page's metadata, adding the page title on the left in code.
