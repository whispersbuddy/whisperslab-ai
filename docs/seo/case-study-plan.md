# Case study plan (portfolio pass, 2026-10-14)

Source: `Client's Portfolio List (3).xlsx` (51 rows) checked against the 14 case studies live on whisperslab.com.
Rule used: only facts that are in the spreadsheet. Anything not in it is marked [CONFIRM]. No client names. No numbers invented.

## Already live (14), mapped to portfolio rows
| Live case study | Portfolio row |
|---|---|
| financial-document-reader | #1 Palm (Base44 to Supabase, document reader) |
| ai-catalog-content-engine | #6 PrestaShop scraper and translation |
| lead-sales-engine | #10 and #42 NYC violation leads (n8n) |
| zero-double-entry-financial-pipeline | #23 Zapier, Base44, Xero |
| onboarding-pipeline-autopilot | coaching onboarding (not clearly one row) |
| appraisal-case-moves-itself-forward | #12 ClickUp appraisal cases |
| back-office-without-a-back-office | #30 Airtable, Make, notary onboarding and payouts |
| inspection-report-writes-itself | #21 EV inspection reports |
| inventory-cost-corrects-itself | #37 ShipHero weighted average cost |
| product-listing-builds-itself | #33 Collectr to Shopify |
| storefront-and-warehouse-agree | #5 Shopify and Neto sync |
| video-pipeline-collects-approvals | #40 and #41 Frame.io |
| crm-that-fills-itself-in, self-cleaning-warehouse-system | no matching row in this sheet, keep as is |

## Already drafted in Strapi, waiting to be published
The code already has diagrams for `team-portal-cuts-software-costs` (row 8), `catalog-publishes-itself` (row 43) and `lead-list-builds-itself` (row 42). They return 404 live, so they are drafts. Publish these before writing anything new.

## New case studies to add (drafts in `case-study-drafts.md`)
Rows 8 and 43 are removed from this list for that reason.
Ranked by fit with the keyword plan, how clear the story is, and how safe it is to publish.

| Rank | Row | Working title | Why it matters for search |
|---|---|---|---|
| 2 | #45 | The Online Store and the Shipping Tool That Stay in Step | Ecommerce niche (ecommerce automation, 1,900 searches). n8n. |
| 4 | #28 | The Law Practice That Never Misses a Deadline | Law firm niche. Zoho CRM. Specific: 40+ custom fields, reminders on due dates. |
| 5 | #47 | The Project Board That Chases Its Own Deadlines | Pairs with a real Trustpilot review (Trello system, graphic design business). Confirm it is the same client. |
| 6 | #7 | The Instagram Comment That Becomes a Subscriber | Social lead conversion, GoHighLevel, Make. No result numbers in the sheet. |

## Hold (needs a decision or is not finished)
| Row | Reason |
|---|---|
| #50, #51 Telegram join tracking and CAC reporting | Strong build (GoHighLevel, n8n, Meta Conversions API), but the client is a copy-trading business. Decide whether you are comfortable showing it, and how to describe the client honestly. |
| #49 Zoho Desk AI support | Still in final QA, not live. Write it after launch. |
| #11 Airtable coaching dashboard | Good story (program week calculation, Slack inactivity alerts), but overlaps the coaching onboarding case study. Reserve. |
| #15 ShipHero packing slips (Make) | Small. Better as a short blog example than a full case study. |
| #31 Softr and Airtable favorites | Small. Fold into an Airtable post. |
| #38 Vanguard TEFL LMS | Custom build with a Trustpilot review. Use on `/core-build` as a custom-build proof, not as an automation case study. |
| #19 ActiveCampaign and ClickFunnels | Client is a political news site. Hold. |

## Do not publish
| Row | Reason |
|---|---|
| #14 Lawyer and doctor lead scraping with 2Captcha | Bypasses anti-bot protection. Already flagged earlier. |
| #4 Discord crypto subscription bot, #39 Telegram bot | Crypto payments and no description. Off brand. |
| #2 AskBlake, #3 DardaMall, #1 (as a platform build) | Product builds, not automation. Use only as "custom builds" mentions. |
| #9, #16 to #20, #22, #24 to #27, #29, #34 to #36, #44 | Websites, migrations and front-end work. Not automation. |
| #32, #46 | No description in the sheet. |

## Checks before any of these go live
- Client permission for each, even anonymised.
- Confirm every number marked [CONFIRM] with the team.
- Check each Loom for client emails, phone numbers and screens before linking it.
- Keep house voice: plain words, no em dashes, no hype.
- Status: all drafts below are drafts only. Nothing was published or added to Strapi.
