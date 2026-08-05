# Blog post editorial rules

Rules for anyone (human or AI) drafting a blog post or wiring a drafted post into
`app/_content/blogData.ts`. Written after a real incident (2026-08-05): a post shipped
with statistics whose citations, on direct inspection, didn't say what the post
claimed they said. See "The citogenesis problem" below for what actually happened.

## The core rule: verify the citation, not just its existence

**Every specific statistic in a blog post must carry an inline citation to a source
that has been directly fetched and read, with the exact claim confirmed present on
that page.**

This is stricter than "has a link." A citation only counts if:

1. The URL was actually opened and read (by a human, or by an AI tool with page-fetch
   access) at the time the post was finalized, not copied from an earlier research
   document without re-checking.
2. The page states the claim being attributed to it, in substance, not just something
   adjacent or similar-sounding.
3. The claim is scoped to what the source actually measures. If a source says "56% of
   AP professionals spend 10+ hours/week on invoice processing," the post can say
   that; it cannot generalize it to "bookkeeping is a major challenge for 65% of small
   businesses" just because both numbers gesture at the same underlying pain point.

If a source page can't be fetched (403, 404, paywalled, changed since it was
originally found), the stat doesn't go in the post, no matter how solid the original
research felt. Rewrite the sentence to make the point directionally, without the
specific number, instead.

## The citogenesis problem

Stat-roundup listicle sites ("67 Data Entry Statistics for 2025", "65+ Key Accounting
Statistics for 2026") frequently cite each other in a loop with no traceable primary
source. A number can appear on a dozen sites and still not trace back to a real
survey, study, or dataset. Treat repetition across multiple sites as *zero* additional
evidence of accuracy on its own — the sites may all be quoting each other, not an
underlying source. The only thing that counts is whether the specific page you're
citing, read directly, actually contains and substantiates the claim.

AI-generated search summaries are especially prone to surfacing numbers this way,
sometimes with the wrong figure entirely (a search summary once reported "52% of AP
professionals," when the actual page said 56%) or a figure that isn't on the page at
all. Never cite a stat from a search-result summary without opening the underlying
page and confirming the sentence yourself.

## Source quality tiers

Not every citable source is equally trustworthy. Roughly, in order:

1. **Primary research**: named surveys with disclosed methodology and sample size
   (e.g. "survey of 500 US professionals, July 2025, commissioned by Parseur and
   QuestionPro"), academic studies, trade-association reports.
2. **A company's own reported data**, uncited beyond itself (e.g. a SaaS vendor's
   blog stating "56% of respondents..." without naming who ran the survey). Usable,
   but weigh it lower and consider naming the source explicitly in the post copy
   ("DocuClipper reports...") rather than presenting it as independent research.
3. **Vendor/competitor content marketing with no data of its own** — blogs from
   companies selling automation software or services making claims to support their
   own pitch. Whispers Lab is trying to out-rank exactly this category of content;
   leaning on it as a source undermines that positioning. Avoid, especially for
   competitor products in the same category Whispers Lab sells into.
4. **Stat-roundup listicles with no visible primary source** — see citogenesis above.
   Do not cite, even if the number "sounds right."

## Practical checklist before a post goes live

- [ ] Every specific number has an inline `[source](url)` link.
- [ ] Each cited URL was fetched and the claim confirmed present, this session, not
      assumed from a prior research doc.
- [ ] No claim is generalized beyond what its source actually measured.
- [ ] No citation points to a direct competitor's marketing content.
- [ ] If a stat couldn't be verified, the sentence was rewritten to make the point
      without a specific number, rather than left in with a placeholder or dropped
      citation.
