# Whispers Lab topical map (Nov 7, 2026)

Week 3 of `topical-authority-plan-2026-10.md`. One rule drives this document: **every URL owns one query group, and no two URLs own the same one.** When two pages compete for a group, one of them wins it and the other links to it.

Data: Search Console page and query pairs for Aug 12 to Nov 5, 2026 (252 pairs across 45 pages, 2,862 impressions, 6 clicks), the 77 URLs in the live sitemap, the Oct 28 Keyword Planner volumes (`keyword-planner-2026-10-28.md`) and the Oct 29 search-result check. "Impr." means Google impressions in that window. Positions are averages. Nothing here is a ranking promise.

## 1. Source context and central entity

**Source context (approved Oct 24):** Whispers Lab is a US automation agency (Whispers Lab LLC, build team in Karachi) that builds and maintains done-for-you automations for small businesses on n8n, Zapier, Make and Airtable, sold as a $250 Automation Audit, a Core Build from $2,500, Automation Care at $500 a month and AI Growth Partner from $1,250 a month.

**Central entity:** small business automation.

**Central search intent:** "get a repetitive task in my business automated: what, how, with which tool, at what cost, and by whom."

## 2. Ownership rules (how the groups are kept apart)

| Where the overlap is | Rule |
|---|---|
| Industry page vs department page | The industry page owns "[industry] automation" (law firm, real estate, ecommerce). The department page owns the function ("inventory automation", "customer service automation"). |
| Service page vs blog post on the same task | The service page owns "[task] automation services, consultant, done for you". The blog post owns the "how to" and "what is" questions and links to the service page in its first screen. Example: `/blog/automate-client-onboarding` owns "how to automate client onboarding"; `/services/client-onboarding-automation` owns "client onboarding automation services". |
| Platform page vs consultant page | `/integrations/[tool]` owns "[tool] consultant, consulting, expert, specialist, agency". `/services/automation-consulting` owns the tool-neutral "automation consultant" group. |
| Bookkeeping | `/services/bookkeeping-automation` owns "bookkeeping automation". `/industries/accounting-bookkeeping` owns "accounting firm automation". `/use-cases/finance-accounting` owns the general "accounting and invoice automation" group. |
| Blog vs case study | The case study proves one build and owns no generic query. It links up to the service, platform and industry it proves. |

## 3. Core section: one query group per page

### Offers
| URL | Owns | Notes |
|---|---|---|
| `/audit` | automation audit, workflow audit | 12 impr. in the Jul to Oct pull (pos 7), no query data in the latest pull. |
| `/core-build` | fixed-price automation build, automation implementation | No real query data yet. |
| `/automation-care` | automation maintenance, workflow monitoring | |
| `/growth-partner` | monthly automation partner, automation retainer | |
| `/pricing` | automation pricing, how much does automation cost, automation agency pricing | Gets only brand queries now. The planned cost guide feeds this page. |

### Services
| URL | Owns | Search Console proof |
|---|---|---|
| `/services/automation-consulting` | automation consultant, automation consulting services, ai automation consultant, business automation consultant | No query data yet. The buyer terms here are winnable (see keyword research). |
| `/services/data-entry-automation` | data entry automation, automated data entry services | 21 impr., best pos 7 for a long-tail query. |
| `/services/bookkeeping-automation` | bookkeeping automation, automated workflows for bookkeepers | 75 impr., "bookkeeping automation" pos 64. |
| `/services/client-onboarding-automation` | client onboarding automation services, done-for-you client onboarding | 4 impr. The blog holds the informational group. |
| `/services/lead-follow-up-automation` | lead follow-up automation, lead follow-up audit | 18 impr., pos 76 to 96. |
| `/services/software-integration-services` | software integration services, api integration services, custom api integration | 47 impr., but all of them are searches for OpenAI Whisper ("whisper integration services"). Not our audience. |

### Platforms
| URL | Owns | Search Console proof |
|---|---|---|
| `/integrations/airtable` | airtable consultant, expert, specialist, consulting, agency | 644 impr. (top page), "airtable consultant" 238 impr. at pos 77. |
| `/integrations/zapier` | zapier consultant, consulting, consultancy, agency | 503 impr., "zapier consultant" 237 at pos 70. |
| `/integrations/n8n` | n8n consultant, consulting, expert | 298 impr., "n8n consultant" 237 at pos 65. |
| `/integrations` (hub) | integration consultant, workflow platform consultant | Brand noise only. |

### Industries
| URL | Owns | Search Console proof |
|---|---|---|
| `/industries/accounting-bookkeeping` | accounting firm automation, how to automate bookkeeping firms | 104 impr., "print automation for accounting firms" 82 at pos 89. |
| `/industries/law-firms` | law firm automation, automation for lawyers, legal workflow automation | 51 impr., best pos 38. |
| `/industries/real-estate` | real estate automation, estate agent automation | 7 impr. |
| `/industries/ecommerce-retail` | ecommerce automation, ecommerce merchandising automation | 26 impr., "ecommerce merchandising automation" 19 at pos 66. |
| `/industries/property-management` | property management automation | 1 impr. Maintenance mode per the Nov 4 audit. |

### Use cases (department pages)
| URL | Owns |
|---|---|
| `/use-cases` (hub) | small business automation, workflow automation examples, business automation examples |
| `/use-cases/finance-accounting` | accounting automation, invoice automation (vendor results dominate) |
| `/use-cases/ecommerce-inventory` | inventory automation, order processing automation |
| `/use-cases/sales-leads` | lead automation |
| `/use-cases/customer-support` | customer service automation |
| `/use-cases/operations` | operations automation, approval workflow automation |
| `/use-cases/crm-marketing` | CRM automation (3 impr. so far) |

### Tools and company
| URL | Owns |
|---|---|
| `/resources/automation-roi-calculator` | automation roi calculator, reporting automation roi (14 impr.) |
| `/resources/ai-readiness-assessment` | ai readiness assessment |
| `/` | brand queries (whisper labs, whisperlabs, whispers lab llc) and "business automation services for small businesses" |
| `/about` | whispers lab llc, company and founder queries |
| `/case-studies` (hub) | whispers lab case studies, automation case studies |

Brand note: "whisper lab" ranks 28.7, "whisper labs" 6.8, "whisperlabs" 5.8 and "whispering labs llc" 5.2 (Search Console). The weak one is the singular "whisper lab".

## 4. Outer section: each post feeds one core page

| Post | Owns | Feeds | Search Console proof |
|---|---|---|---|
| `/blog/crm-data-hygiene` | crm data hygiene, crm hygiene, automatic crm updates | `/integrations/airtable`, `/integrations/n8n` | 443 impr., "automatic crm updates data hygiene" 123 at pos 2.6, "crm hygiene" 143 at pos 67. |
| `/blog/automate-client-onboarding` | how to automate client onboarding | `/services/client-onboarding-automation` | 191 impr., pos 85 to 93. |
| `/blog/double-data-entry` | double data entry | `/services/data-entry-automation` | pos 4 to 7 (3 impr.). |
| `/blog/document-processing-automation` | document processing automation | `/services/data-entry-automation` | no data yet. |
| `/blog/accounting-workflow-automation-tasks-to-fix-first` | best bookkeeping tasks to automate first | `/services/bookkeeping-automation` | 63 impr., "best bookkeeping tasks to automate first" 46 at pos 4.5. |
| `/blog/invoice-follow-up-automation-get-paid-faster` | invoice follow-up automation | `/services/bookkeeping-automation` | |
| `/blog/failed-payment-recovery` | failed payment recovery | `/services/bookkeeping-automation` | 16 impr., pos 80. |
| `/blog/speed-to-lead` | speed to lead | `/services/lead-follow-up-automation` | 6 impr. |
| `/blog/real-estate-lead-follow-up-automation` | real estate lead follow-up | `/industries/real-estate` | earlier 64 impr. at pos 17. |
| `/blog/lease-renewal-automation-for-property-managers` | lease renewal automation | `/industries/property-management` | 19 impr., "lease renewal automation" pos 25. |
| `/blog/tenant-maintenance-request-alerts-automation` | tenant maintenance request automation | `/industries/property-management` | |
| `/blog/ecommerce-product-listing-automation-supplier-feeds` | product listing automation | `/industries/ecommerce-retail` | |
| `/blog/black-friday-order-surge-small-online-stores` | black friday order processing | `/industries/ecommerce-retail` | published Nov 2. |
| `/blog/how-to-choose-an-ai-automation-agency-for-a-small-business` | how to choose an ai automation agency | `/services/automation-consulting`, `/pricing` | 13 impr. |
| `/blog/business-automation-examples` | business automation examples | `/use-cases` | no data yet. |
| `/blog/5-signs-your-business-is-losing-hours-to-busywork` | signs of busywork | `/audit` | |
| `/blog/insurance-agency-automation` | insurance agency automation | **no core page** | Published without a matching core node. See decision 3 below. |

## 5. Proof: what each case study backs up

Proposed mapping from each case study's industry tag and title. Each case study should link up to these pages in its "Built for / Built with" block.

| Case study | Proves (service, platform, industry) |
|---|---|
| financial-document-reader | data entry automation; accounting and bookkeeping |
| zero-double-entry-financial-pipeline | software integration; bookkeeping automation; Zapier |
| back-office-without-a-back-office | client onboarding; bookkeeping automation |
| onboarding-pipeline-autopilot | client onboarding automation |
| lead-sales-engine | lead follow-up; real estate; n8n |
| lead-list-builds-itself | real estate; n8n; Airtable |
| crm-that-fills-itself-in | software integration; Airtable; n8n; CRM use case |
| instagram-comment-becomes-a-subscriber | CRM and marketing use case |
| team-portal-cuts-software-costs | Airtable; software integration |
| ai-catalog-content-engine | ecommerce and retail; software integration |
| catalog-publishes-itself | ecommerce and retail; n8n |
| product-listing-builds-itself | ecommerce and retail |
| store-and-shipping-tool-stay-in-step | ecommerce and retail; software integration; n8n |
| storefront-and-warehouse-agree | ecommerce and retail; software integration |
| inventory-cost-corrects-itself | ecommerce and retail; software integration |
| self-cleaning-warehouse-system | operations use case; ecommerce and retail |
| law-practice-never-misses-a-deadline | law firms |
| inspection-report-writes-itself | operations use case |
| project-board-chases-its-own-deadlines | operations use case |
| video-pipeline-collects-approvals | operations use case |
| appraisal-case-moves-itself-forward | operations use case (insurance case management) |

## 6. Query networks: headings and questions to add

The words real searchers use around a page become its H2s, H3s and FAQ questions. These are suggestions to write with real answers, using only facts and case study numbers we can prove. Questions marked (PAA) come from Google's "People also ask" on Oct 29.

### `/integrations/airtable`, `/integrations/zapier`, `/integrations/n8n`
- **Network from Search Console:** consultant, consultants, consulting, consultancy, expert, specialist, agency, freelancer, partner (also "spezialist" and "berater" from German searchers, and "expert comptable zapier" from French).
- **H2 ideas:** "What does a [tool] consultant do?", "How much does a [tool] consultant cost?" (already on the Airtable and Zapier pages, keep), "When you need a [tool] expert and when you do not", "Hiring a [tool] consultant, specialist or agency".
- **n8n FAQ (PAA):** "Where can I hire n8n developers?", "Are people making money with n8n?" Answer the first by saying how we work and what a build costs, and be honest that n8n also lists its own experts.
- **Zapier and Airtable PAA:** not collected yet. Re-run the search check for these two terms.
- **Authority note:** for n8n and Zapier the top results are n8n's own site and expert directory, zapier.com and Reddit. Your Zapier listing is now linked. As of Oct 14 the n8n, Make and Airtable partner applications were still pending, so check their status.

### `/services/automation-consulting`
- **Network:** ai automation consultant, automation consultant, automation consulting services, business process automation consultant, business automation services, workflow automation consultant.
- **FAQ (PAA):** "What is an AI automation consultant?", "How much does AI consulting cost?", "How much does it cost to hire an AI consultant?", "Which automation is in demand in 2026?" Give honest answers with our real prices ($250 Audit, builds from $2,500, Care $500 a month).

### `/services/software-integration-services`
- **Network from keywords:** software integration services, api integration services, custom api integration, integration consultant.
- **FAQ (PAA):** "What is software integration?" (the page's top definition should answer this in two sentences).
- **Note:** the 47 impressions it gets today are people searching for OpenAI Whisper. Do not chase them.

### `/services/client-onboarding-automation` and `/blog/automate-client-onboarding`
- **Network:** client onboarding automation, automate client onboarding, automated client onboarding, new client onboarding automation, how to automate client onboarding process.
- **FAQ (PAA):** "How to automate the onboarding process?", "What steps in onboarding can be fully automated versus requiring human review?" The blog already covers the second well; the service page should answer the first and link to the blog.

### `/services/lead-follow-up-automation` and `/blog/speed-to-lead`
- **Network:** lead follow-up automation, lead follow-up audit, instant lead follow-up, speed to lead, speed to lead statistics.
- **FAQ (PAA):** "How quickly should you respond to leads?" Answer it directly under its own heading on the blog post.

### `/services/bookkeeping-automation` and `/industries/accounting-bookkeeping`
- **Network:** bookkeeping automation, automated workflows for bookkeepers, how to automate bookkeeping firms, accounting firm automation, bookkeeping workflows.
- **Note:** "print automation for accounting firms" (82 impressions) looks like a mis-typed "PDF" or "intake" search. One heading about turning printed or scanned paper into data covers it honestly.

### `/industries/law-firms`
- **Network:** automation for lawyers, law office automation, law firm automation, law firm follow-up automation, small law firm workflows.
- **Heading idea:** "Law office automation for a small firm" as the first H2 after the hero.

### `/industries/ecommerce-retail`
- **Network:** ecommerce merchandising automation, merchandising automation, ecommerce automation.
- **Heading idea:** a section called "Merchandising automation" that links to the catalog case studies.

### Use-case hub and department pages
- **Network from keywords:** small business automation, workflow automation examples, business automation examples.
- **Hub FAQ (PAA on "business automation services"):** "Why is business automation important?", "What are the best automation tools for business?" Answer the first plainly. For the second, name the work to automate first, not software brands.

## 7. Decisions for the owner

1. **Approve the ownership rules in section 2.** They are what stops pages from competing with each other.
2. **Approve the proposed case study mapping in section 5**, or correct it. I based it on each case study's industry tag and title, not on re-reading every build.
3. **The insurance agency post has no matching core page.** Either add a short insurance industry page (the appraisal case study is its proof), or accept it as a one-off and link it to `/services/automation-consulting`.
4. **"ai consultant for small business"** (720 searches, medium competition, small agencies rank) has no page. Decide whether `/services/automation-consulting` should take it or it gets its own page.

## 8. What was already checked in this pass

- The two "stray" headings from the Oct 23 plan ("n8n" and "6") were a misread. Each is part of a full heading ("n8n is excellent at one specific kind of job...", "6 automation examples you can reuse in this department"), split by markup. Nothing to fix there.
- The real duplicates were the six footer column titles and the newsletter band, repeated as headings on every page. Those are no longer headings (see the PR).
