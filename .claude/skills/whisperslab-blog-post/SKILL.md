---
name: whisperslab-blog-post
description: Write or revise a blog post for the Whispers Lab site (whisperslab.com/blog) in the established house voice and data schema. Covers the exact BlogPost shape that ships to app/_content/blogData.ts, the two-axis Angle/Category taxonomy, the hard voice rules (no em dashes, no hype vocabulary, no unverified statistics), the AEO/GEO structure that gets posts cited by AI answer engines, statistic-sourcing discipline, internal linking, and image sourcing. Use whenever writing, drafting, revising, or finalizing a Whispers Lab blog post, converting a draft into the site's data format, or generating post content programmatically from a topic brief.
---

# Whispers Lab blog posts

Whispers Lab is an AI and automation build agency for US small businesses.
The blog exists to do two jobs at once: get found by an owner searching for
a specific operational problem, and get quoted by AI answer engines
(ChatGPT, Perplexity, Google AI Overviews, Claude) when someone asks that
question conversationally.

Every post must be publishable as-is. It carries a real byline (Haris Ali),
so a fabricated statistic or an overclaimed result is a credibility problem,
not a copy problem.

Read this whole file before writing. The voice section matters more than
the schema section, because the schema is mechanical and the voice is not.

---

## 1. Voice

The voice is already set by the four posts live at whisperslab.com/blog.
Match it. The patterns below are extracted from those posts, not invented.

### Open by reframing, not by warming up

Never open with a definition, a throat-clear, or "In today's fast-paced
business environment." Open with a claim that corrects an assumption.

Shipped example:

> Bookkeeping and accounting firms don't lose margin because they're bad at
> accounting. They lose it re-typing numbers that already exist somewhere
> else, a PDF invoice, a bank statement, a client's spreadsheet, into the
> system of record.

The structure is: negate the assumed cause, then name the real one. It
works because it earns attention before asking for any.

### Write to one owner, in second person

"You" and "your team", not "businesses" or "organizations". The reader is a
specific person who is tired, busy, and has heard a lot of AI hype.

> don't start with the task that annoys your team the most, start with the
> one that repeats most often and requires the least judgment

### Be concrete to the point of being slightly funny

Generic pain is skimmable. Specific pain is recognizable.

> the underlying documents, invoices, receipts, bank statements, the
> client's half-remembered "I think I sent that already."

> Clients ask "where are we on my books?" more often than most firms would
> like

### Name the mechanism, then name its limit

Whispers Lab sells "boring AI that actually works". Overclaiming breaks
that positioning faster than underclaiming does. Every post that describes
an automation also says what stays human.

> That's not a promise that automation replaces bookkeepers, it's a
> redirection of their time from re-typing numbers to reviewing exceptions
> and advising clients, which is the part of the job that actually needed a
> professional in the first place.

Industry posts should carry an explicit "what stays manual" or "what
doesn't get automated" section. It preempts the "will this replace me"
objection, which is the real objection.

### Use short declaratives to land a point

After a long explanatory sentence, cut hard.

> Much of it is checking that two numbers that should match, do.

### Bold lead-ins for prescriptive content

In list-shaped posts, each section's actionable part starts with a bolded
label:

> **What to automate:** rule-based coding for recurring, predictable
> transactions (the same SaaS subscription, the same recurring vendor),
> with human review reserved for anything that doesn't match a pattern.

Other shipped variants: `**Pull.**` `**Enrich.**` `**Push.**` `**Sync.**`
for pipeline-shaped posts. Pick one label pattern per post and hold it.

### Register

Plainspoken but not dumbed down. Assume the reader runs a business and is
competent, just not technical. Explain mechanisms in operational terms
("the data is already where it needs to be"), never in stack terms
("a webhook fires an idempotent upsert").

---

## 2. Hard rules

These are non-negotiable. Violating any one of them makes a draft
unpublishable.

### No em dashes. Ever.

The entire site was scrubbed of em dashes (`—`) as a deliberate house style
decision. `app/_content/blogData.ts` currently contains zero.

Do not "fix" this by swapping in an en dash or a hyphen-with-spaces. Restructure
the sentence properly. The house solution is usually a comma-spliced
appositive, a colon, or a full stop:

- Instead of: `the intake layer — the part nobody thinks about — is where it breaks`
- Write: `the intake layer, the part nobody thinks about, is where it breaks`
- Or: `the intake layer is where it breaks. Nobody thinks about it.`

Verify before shipping: `grep -c "—" app/_content/blogData.ts` must return `0`.

### No unverified statistics

A number goes in a post only if its source page was opened and read, and
that page actually contains the claim. Not "a research doc said so", not
"multiple sites report", not a number lifted from an AI search summary.

This rule exists because it already went wrong once. See section 5.

### No hype vocabulary

Banned: revolutionize, game-changing, unlock, supercharge, seamless,
cutting-edge, leverage (as a verb), transform your business, take it to the
next level, in today's fast-paced world, AI-powered solution.

Also avoid: "AI agents", "AI employees", "digital workforce". Whispers Lab
deliberately positions against that framing.

### No software-comparison content

Never write "best X software", "X vs Y", or tool roundups. Those SERPs are
owned by vendors with large content teams, they are unwinnable, and they
attract people shopping for software rather than people who want a system
built. Target problem, process, and outcome intent only.

### No AI-generated images

Source a real photograph. See section 8.

### No claiming a case study did something it didn't

If a post cites a case study, read the case study first. The build has to
actually match the mechanism being described. If the closest available case
study is from a different context, say so plainly in the copy rather than
implying a match. Honest framing outperforms a stretch.

---

## 3. Post structure

In this order:

1. **Key Takeaways** (`takeaways`): 4 to 5 bullets. This is the single
   highest-leverage block in the post. Retrieval-based AI systems weight the
   top of a page heavily when deciding what to quote, so this block has to
   stand alone as a complete answer. Every bullet needs a number, a named
   mechanism, or a falsifiable claim. No bullet may be generic.

2. **Intro**: 2 to 3 paragraphs. Reframing opener, then the sharpest
   sourced number, then what the post covers.

3. **Body**: `h2` sections. Three shapes work, pick per post type:
   - Numbered task or signal list (problem posts, industry posts)
   - Named pipeline broken into stages (mechanism posts)
   - What changes / what stays the same (industry posts)

4. **Closing section**: an `h2` that answers "so what do I do Monday
   morning". Usually titled something like "Where to actually start".

5. **CTA callout** (`type: "callout"`): one per post, at the end of the
   body, linking to `/audit`. Written as a helpful next step, not a pitch.

   > Not sure which of these is actually costing your firm the most? Our
   > [$250 Automation Audit](/audit) maps every process on volume and cost
   > so you fix what's actually bleeding hours, not just what feels most
   > annoying.

6. **FAQ** (`faq`): exactly 4 questions.

### FAQ rules

Phrase each question the way a person would actually type or say it, not
like a heading. Answer each as a fully self-contained paragraph. Never write
"as covered above" or "as we mentioned". AI answer engines quote single FAQ
answers out of context, so an answer that depends on the paragraph before it
will be misquoted or skipped.

Cover this mix:
1. A definitional "what is / what does X actually mean" question
2. A scope or cost question, backed by a number where one exists
3. A misconception, usually "does this replace [the human]"
4. A limit question, "what stays manual" or "will this work for my size"

---

## 4. Data schema

Posts ship as objects in the `BLOG_POSTS` array in
`app/_content/blogData.ts`. This is the authoritative shape:

```ts
export type BlogPost = {
  slug: string;                    // kebab-case, matches the target phrase
  angle: AngleSlug;                // internal planning only, never rendered
  category: CategorySlug;          // becomes articleSection in schema.org
  industry?: IndustrySlug;         // only when angle is "industry"
  title: string;
  excerpt: string;                 // card copy + meta description
  publishedAt: string;             // "YYYY-MM-DD", never backdated
  readTime: string;                // e.g. "6 min read"
  heroImage: string;               // absolute Unsplash URL or /assets path
  heroImageAlt: string;
  heroImageCredit?: ImageCredit;   // { text, url }
  takeaways: string[];
  content: BlogBlock[];
  faq: FaqItem[];
  relatedCaseStudySlugs?: string[];
  relatedPosts?: string[];
};

export type BlogBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "list"; items: string[] }
  | { type: "callout"; text: string };

export type FaqItem = { question: string; answer: string };
export type ImageCredit = { text: string; url: string };
```

### Inline formatting inside text fields

`p`, `list` items, `callout`, `takeaways`, and FAQ `answer` fields support
exactly two inline markdown forms, rendered by `components/BlogInline.tsx`:

- `**bold**`
- `[anchor text](/path)` or `[anchor text](https://external.com)`

Nothing else. No headings, images, tables, or code fences inside a text
field. Internal links use root-relative paths. External links render with
`target="_blank" rel="noopener"` automatically.

FAQ answers are run through `toPlainText()` before going into `FAQPage`
schema, so markdown in an answer is safe and will not leak into JSON-LD.

### Field notes

- `readTime` is currently 6 to 7 minutes across shipped posts. Roughly
  1,300 to 1,800 words. Longer is fine if the content earns it.
- `excerpt` is two sentences max. It is the card copy and the meta
  description, so it must make sense with no surrounding context.
- `publishedAt` is the real publish date. Do not backdate to look
  established.

---

## 5. Statistics and citations

Whispers Lab shipped a post containing four statistics that traced back to
nothing. The cited pages, when actually fetched, did not contain the claims.
The numbers had been carried from a research document that had itself
inherited them from stat-roundup listicles that cite each other in a loop
with no primary source at the bottom.

The rule that came out of that:

> Every specific statistic must carry an inline citation to a page that has
> been directly fetched and confirmed to contain that exact claim.

Not a citation copied from a research doc. Not a number that "sounds
sourced" because similar figures appear elsewhere. If the source page cannot
be fetched and read, the statistic does not go in. Rewrite the sentence to
make the point directionally instead.

### Watch for these failure modes

- **AI search summaries misreport numbers.** During the incident above, a
  search summary reported "52% of AP professionals" when the actual page
  said 56%. Always open the page.
- **Repetition is not evidence.** A number appearing on ten sites usually
  means those ten sites are quoting each other.
- **Competitor blogs are not sources.** Citing a rival automation vendor's
  marketing content both weakens the claim and links to a competitor. If a
  number exists only on competitor blogs, drop the precision and keep the
  direction: "convert several times better than" rather than "convert at
  23.4%".

### Source quality, best to worst

1. Named surveys with disclosed methodology and sample size, academic
   studies, trade-association reports
2. A company's own reported data, uncited beyond itself. Usable, but name
   the source in the copy ("DocuClipper reports...") rather than
   presenting it as independent research
3. Vendor content marketing with no data of its own. Avoid
4. Stat-roundup listicles with no primary source. Never cite

Shipped example of tier 2 handled correctly:

> Invoice processing alone eats a disproportionate share of a bookkeeping
> week: [DocuClipper reports](https://www.docuclipper.com/blog/accounts-payable-statistics/)
> 56% of AP professionals spend more than 10 hours a week on it

The full rule set lives in `whisperslab-blog-posts.md` at the repo root.

---

## 6. Taxonomy

Two independent axes plus one optional tag. Defined in
`app/_content/blogTaxonomy.ts`.

### Angle (internal only, never rendered)

`problems` | `solutions` | `industry` | `customers` | `events`

This is editorial planning metadata that keeps the calendar balanced across
the funnel. It must never appear on the page or in schema. `events` is
dormant until real event content exists.

### Category (rendered, drives `articleSection`)

| slug | name |
|---|---|
| `getting-started-roi` | Getting Started & ROI |
| `document-data` | Document & Data Automation |
| `crm-leads-clients` | CRM, Leads & Client Workflow |
| `finance-invoicing` | Finance & Invoicing Automation |

Category is the axis that builds topical authority, because search engines
and AI answer engines cluster by subject, not by editorial angle.

**Guardrail on `getting-started-roi`:** a post belongs there only if its
subject is the *decision* to automate (what to automate first, ROI, cost,
how to begin). A post about a specific workflow or data type goes in that
subject category even if the post is introductory in tone. Without this
rule, "fundamentals" silently absorbs everything and becomes a dumping
ground that dilutes authority instead of building it.

### Industry (optional, only when `angle: "industry"`)

`accounting-bookkeeping` | `real-estate` | `ecommerce-retail`

Only these three, because each is backed by a real case study. Omit the
field entirely on non-industry posts rather than leaving it empty. Do not
invent a new industry slug without a case study behind it.

---

## 7. Internal linking

Case study slugs that exist (all eight, confirmed against
`app/_content/caseStudiesData.ts`):

```
financial-document-reader
ai-catalog-content-engine
lead-sales-engine
zero-double-entry-financial-pipeline
crm-that-fills-itself-in
onboarding-pipeline-autopilot
inspection-report-writes-itself
self-cleaning-warehouse-system
```

Never invent a slug. Read the case study before citing it, and cite the one
whose actual mechanism matches the section, not just the closest industry.

### Rules

- At least one case study citation per post, woven into a sentence as a
  contextual anchor. Never a bare "see also" list.
- Link to other blog posts by adjacency: same category, same angle, a
  mechanism this post only mentions in passing, or the same case study from
  a different angle.
- **Only link to posts that already exist.** A link to an unpublished post
  is a 404, which is bad UX and a low-quality signal on the exact page you
  are trying to rank.
- `relatedPosts` is the safe exception. It is resolved against
  `BLOG_POSTS` at render time and unresolvable slugs are silently dropped,
  so it can be populated with planned future slugs. Inline prose links have
  no such safety net, so they must point at live pages.
- Sitewide pages are always safe link targets: `/audit`, `/core-build`,
  `/case-studies`, `/contact`, `/book`.

---

## 8. Images

- Free Unsplash only. URLs must start `https://images.unsplash.com/photo-`.
  `plus.unsplash.com/premium_photo-` is the paid tier, never use it.
- Append sizing params: `?w=1200&q=80&fm=jpg&fit=crop`
- No AI-generated images.
- Record `heroImageCredit` with the photographer line and the Unsplash photo
  page URL, even though the Unsplash License does not require attribution.
- Pick a photo that depicts the actual subject. Generic stock-office imagery
  is weaker than a photo of the real task, industry, or tool interaction.
- `heroImageAlt` describes what is literally in the photo, for screen
  readers. It is not a place to stuff keywords.

The hero image doubles as the OpenGraph image, so it needs to read well at
1200x630 as a social card.

---

## 9. Why the structure is shaped this way

Useful when deciding whether a deviation is acceptable:

- **Key Takeaways sits above the fold** because retrieval-based AI systems
  judge relevance heavily on a page's opening content. A post that builds
  slowly to its answer will lose the citation to one that leads with it.
- **FAQ answers are self-contained** because engines quote fragments.
- **Specific sourced numbers get cited, vague claims do not.** "Saves time"
  is unquotable. "56% of AP professionals spend more than 10 hours a week"
  is quotable.
- **Named consistent authorship** (`Haris Ali`) feeds `Article` schema
  trust signals.
- **Dense internal linking** tells search and AI systems these posts form
  one coherent topical cluster rather than disconnected pages.

Each post automatically emits `Article`, `BreadcrumbList`, and `FAQPage`
JSON-LD from the data. Do not hand-author schema in post content. Getting
`category` right is what makes `articleSection` correct.

---

## 10. Research workflow (optional, using claude-seo)

The `claude-seo` toolkit (github.com/AgriciDaniel/claude-seo, installed at
`~/.claude/skills/`) covers the research and validation steps this skill
does not. It answers "what should we write and is the draft good enough".
This skill answers "how does it read and how does it ship". Use both in this
order:

| Step | Tool | What it gives you |
|---|---|---|
| 1. Pick the topic | `seo-cluster` | Groups keywords by real Google SERP overlap rather than text similarity. Use it to validate the content calendar, not to invent topics at random. |
| 2. Build the brief | `seo-content-brief` | Competitor analysis, content gaps, a winning outline, and a forced Information Gain statement. |
| 3. Write it | this skill | Voice, structure, taxonomy, schema, citation discipline. |
| 4. Quality gate | `content_quality.py` | Offline scoring for filler, AI-pattern detection, information density, repetition. |
| 5. Citability check | `seo-geo` | Citability scoring, structural readability, AI crawler accessibility. |

### Information Gain is the part worth stealing

`seo-content-brief` requires every brief to state exactly what new value the
post adds that no currently-ranking page provides, and explicitly rejects
"more detail" or "better formatting" as an answer. Acceptable answers are
proprietary data, a case study with real outcomes, first-hand experience, or
an original framework.

Whispers Lab has a real advantage here: eight delivered builds nobody else
can write about. Lead with that. A post whose only Information Gain is
"covers the same ground more thoroughly" will not get cited, and is not
worth publishing.

### Running the quality gate

Use the bundled `claude-seo` wrapper rather than calling the venv directly.
It resolves the right interpreter on every OS (the venv path differs between
Windows and Unix):

```bash
SEO="$HOME/.claude/skills/seo/bin/claude-seo"
"$SEO" run fetch_page.py <url> -o /tmp/p.html
"$SEO" run content_quality.py /tmp/p.html
```

`content_quality.py` also reads stdin with `-`, so a draft can be scored
before it is ever published.

Targets, calibrated against two shipped posts measured on the live site:

| Metric | Target | "5 Signs" | "Accounting Workflow" |
|---|---|---|---|
| Overall quality | 80+ | 85 | 82 |
| Filler score | under 10 | 0 | 0 |
| AI-pattern score | under 10 | 0 | 0 |
| Information density | 0.65+ | 0.78 | 0.70 |
| Repetition | see below | 66 | 70 |

A filler and AI-pattern score of 0 on both posts is the bar. If a draft
scores above 10 on either, the writing has drifted from the house voice.

### Ignore the `repetitive` flag

Both posts trigger `repetitive`, and that is expected rather than a defect.
The Key Takeaways block and the FAQ deliberately restate the body's key
claims, because that restatement is exactly what makes a post quotable by an
AI answer engine. The tool is a generic content scorer and reads that as
redundancy.

Do not "fix" this by removing the restatement. Doing so would strip out the
single highest-value AEO property of the post to satisfy a metric that does
not understand the format.

(The 5 Signs post has no repeated label pattern at all and still scores 66,
which confirms the flag comes from the structure itself, not from a writing
tic.)

### Do not use `seo-competitor-pages`

That skill generates "X vs Y" and "alternatives to X" pages. This directly
violates the software-comparison ban in section 2. Those SERPs are owned by
vendors with large content teams, they are unwinnable, and they attract
software shoppers rather than people who want a system built. The ban is
based on real SERP research for this site, not preference. Ignore any
recommendation from any tool that suggests writing comparison content.

Also skip `seo-local` and `seo-maps`. The Whispers Lab address is a
registered-agent mailbox in Wyoming, not a staffed office. Google Business
Profile requires a real location with staff, so a listing there would
violate Google's guidelines and risk a penalty. These tools will happily
generate a local SEO plan anyway.

### Known limitation

Without paid API credentials (DataForSEO, Ahrefs), `seo-cluster` and
`seo-content-brief` fall back to WebSearch. That establishes phrasing and
competitive shape but gives **no search volume numbers**. Volume still
requires pasting in Semrush data manually. Never state or imply a volume
figure that came from WebSearch alone.

None of this is required by the automated pipeline in section 12. It is a
human-in-the-loop research layer.

---

## 11. Pre-publish checklist

- [ ] Angle, Category, and (if industry post) Industry are set correctly
- [ ] Zero em dashes anywhere in the post
- [ ] Every statistic has an inline citation to a page that was actually
      fetched and confirmed to contain that claim
- [ ] No claim is generalized beyond what its source measured
- [ ] No citation points to a competitor's marketing content
- [ ] Key Takeaways is 4 to 5 bullets, each with a number or falsifiable claim
- [ ] Exactly 4 FAQ items, each self-contained
- [ ] At least one case study citation, and the build actually matches
- [ ] Every inline link points to a page that exists
- [ ] One CTA callout linking to `/audit`
- [ ] Unsplash image sourced, sized, credited, with descriptive alt text
- [ ] `excerpt`, `readTime`, `publishedAt` all present
- [ ] No hype vocabulary, no software-comparison framing
- [ ] Information Gain is stated and is not "more detail" (see section 10)
- [ ] `content_quality.py` scores 80+ overall, filler and AI-pattern both
      under 10 (see section 10)
- [ ] `npx tsc --noEmit` clean and `npx next build` succeeds

---

## 12. Notes for automated generation

For a pipeline generating posts programmatically (for example from a Google
Sheet row), the useful contract is:

**Input needed per post:** target title or topic, angle, category, industry
(if applicable), and optionally a target keyword phrase and any known
source URLs.

**Output:** one `BlogPost` object matching the schema in section 4.

Things that should fail the run rather than ship silently:

- Any statistic without a resolvable citation URL
- Any `—` character in any text field
- An inline link whose target path does not exist in the built site
- A `relatedCaseStudySlugs` entry not in the known-slugs list in section 7
- `industry` set when `angle` is not `"industry"`
- Fewer or more than 4 FAQ items
- Missing `excerpt`, `readTime`, or `publishedAt`

Statistic verification cannot be skipped by an automated pipeline. If the
pipeline cannot fetch and confirm a source page, it should either drop the
statistic and rephrase directionally, or hold the post for human review.
Publishing an unverified number under a real byline is the failure mode
this entire skill is built to prevent.
