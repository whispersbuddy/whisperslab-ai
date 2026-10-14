# Case study drafts (not published)

Four new drafts. Two earlier drafts (the Airtable and Softr team portal, and the 35,000-product store) were removed because Strapi already holds drafts for them (`team-portal-cuts-software-costs`, `catalog-publishes-itself`); their diagrams already exist in `caseFlows.ts`. Publish those from Strapi instead.

Same fields as `app/_content/caseStudiesData.ts` and the Strapi `case-studies` collection. Client names left out. Every number comes from the portfolio sheet; anything else is marked [CONFIRM]. Voice: plain words, no em dashes, no hype.

---

## 1. The Online Store and the Shipping Tool That Stay in Step

- slug: `store-and-shipping-tool-stay-in-step`
- industry: E-COMMERCE · FULFILLMENT
- buildType: automated
- goal: Stop copying orders by hand from the online store into the shipping tool.
- before: Orders arrived correctly in BigCommerce, but someone still had to move each one into ShipStation. That caused delays and extra admin.
- after: n8n workflows now send each new order to ShipStation as soon as it is placed, and write shipped or cancelled status back to the store.
- metrics:
  - 0 | orders moved by hand
  - 2-way | sync between store and shipping tool
  - near real time | order transfer
  - 1 | set of workflows for new orders and status changes

detail:
- clientSnapshot: An online seller using BigCommerce for the store and ShipStation for fulfillment.
- tools: BigCommerce, ShipStation, n8n
- situation:
  - New orders sat in the store until someone transferred them to ShipStation by hand. Each transfer was a chance for delay or error.
- whatWeBuilt:
  - A set of n8n workflows that pass new orders to ShipStation within moments, mapping customer details, products, quantities and shipping information.
  - A second set that watches ShipStation and updates the store order when it ships, is cancelled or changes.
- howItWorks:
  - A new BigCommerce order triggers a workflow.
  - The workflow maps the order into ShipStation's format and creates it there.
  - When the order changes in ShipStation, another workflow updates the matching BigCommerce order.
- challenges:
  - BigCommerce product variants and combo products did not always return their child product details through the API. We added logic to find the right items before sending the order, so fulfillment records held the correct products.
- result:
  - Manual order transfers stopped, shipping delays from that step went away, and the two systems stay consistent through the whole order life cycle.

---

## 2. The Law Practice That Never Misses a Deadline

- slug: `law-practice-never-misses-a-deadline`
- industry: LEGAL SERVICES · CASE MANAGEMENT
- buildType: automated
- goal: Track every case, document and date in one place and get the right person reminded automatically.
- before: A legal practice handled cases, documents, deadlines, invoices and reports across separate records. Important dates and status changes depended on people remembering them.
- after: A custom Zoho CRM now holds every case, and workflows send reminders and notifications when dates, documents, reviews or invoices need action.
- metrics:
  - 40+ | custom fields across the workflow
  - 1 | system for cases, documents, invoices and reports
  - 0 | deadlines tracked by memory
  - 5 | events that trigger reminders (dates, documents, reviews, invoices, receipts)

detail:
- clientSnapshot: A legal practice that manages a large volume of case files and review reports.
- tools: Zoho CRM
- situation:
  - Each case carried a lot of information: firms, attorneys, assistants, valuation dates, report reviews, invoices and milestones.
  - Staff needed it organized and easy to use every day.
- whatWeBuilt:
  - A structured Zoho CRM with modules, grouped fields, validation rules and workflow logic.
  - Automations that trigger reminders, notifications and task updates based on due dates, document requirements, review stages, invoice activity and receipt confirmations.
- howItWorks:
  - Staff enter or update a case in one place.
  - Rules check dates and status and notify the right person when action is due.
  - Invoice and receipt activity updates the case record.
- challenges:
  - With 40+ custom fields, the system had to stay clear for daily use, not become a wall of inputs.
- result:
  - The practice has one place to see case progress, and key legal and admin actions are prompted instead of remembered.

---

## 3. The Project Board That Chases Its Own Deadlines

- slug: `project-board-chases-its-own-deadlines`
- industry: CREATIVE SERVICES · PROJECT MANAGEMENT
- buildType: automated
- goal: Keep every client project moving, paid for and followed up, without the owner chasing it.
- before: A small design business ran client projects in Trello, but deadlines, payments, fulfillment and long-term follow-ups were easy to miss across different service types.
- after: Three redesigned Trello boards now track every stage and send reminders, so overdue work, unpaid invoices and stalled projects get flagged automatically.
- metrics:
  - 3 | boards, one per service type
  - 9 | stages in the main project pipeline
  - 5 days | payment reminder trigger
  - 6 months | follow-up on lost opportunities

detail:
- clientSnapshot: A small business that designs and fulfils wedding albums for clients.
- tools: Trello (Butler automations)
- situation:
  - Projects came in as design only, yearbooks and full concierge work. Each needed deadlines, payments, fulfillment steps and follow-ups.
  - The owner needed visibility across the business, and the team was not technical.
- whatWeBuilt:
  - Three boards (Design Only, Yearbooks, Concierge) with custom fields, labels, checklists, due dates, saved filters and overdue tracking.
  - Butler automations for payment reminders after 5 days, monthly follow-ups for stalled projects, routing to the right photographer for fulfillment, and 6-month follow-ups for lost opportunities.
- howItWorks:
  - Each project is a card that moves through a 9-stage pipeline, with due dates, labels, checklists and saved filters.
  - Butler watches the cards. A payment reminder goes out after 5 days, stalled projects get a monthly follow-up, and finished designs are routed to the right photographer.
  - Lost opportunities get a follow-up after 6 months, and the team is alerted whenever a card is overdue.
- challenges:
  - The system had to stay simple enough for non-technical team members to run daily.
  - Live projects had to be migrated without breaking anything in progress.
- result:
  - The workspace now watches deadlines and payments and alerts the team when something needs action.

---

## 4. The Instagram Comment That Becomes a Subscriber

- slug: `instagram-comment-becomes-a-subscriber`
- industry: MEMBERSHIPS · SOCIAL MEDIA
- buildType: automated
- goal: Turn people who comment on posts and ads into paying subscribers without manual messaging.
- before: The client wanted to convert social media attention into subscribers but had no clear tool stack or funnel.
- after: A comment on a post or ad now triggers a personal direct message with real client reviews. People who respond are guided to a subscription form and plan choice.
- metrics:
  - 1 | comment starts the whole funnel
  - 0 | manual direct messages to send
  - 1 | website built to support the funnel
  - 1 | mobile app now in development for subscribers

detail:
- clientSnapshot: A subscription business that finds customers through Instagram posts and paid ads.
- tools: GoHighLevel, ManyChat, Make, Stripe, Typeform
- situation:
  - The client had a subscription offer and social reach, but nothing connecting a comment to a signup.
- whatWeBuilt:
  - A direct-message workflow that sends personal replies with past client reviews and engagement content.
  - Campaigns, ad analytics tracking, lead forms and subscription funnels, with a website to support lead generation and conversion.
- howItWorks:
  - Someone comments on a post or ad.
  - An automated message goes out with reviews and content.
  - If the person replies positively, they are sent to the subscription form to choose a plan.
- challenges:
  - The client began without a defined tool stack, so we reviewed the business model and recommended GoHighLevel as the base.
- result:
  - Social traffic is handled and moved toward signup automatically. A mobile app for subscribers is now being built on top.

---

## Publishing checklist
- Client permission for each study.
- No unverified numbers remain. Add result figures later only if the team confirms them.
- Check each project's Loom before linking.
- Put each in Strapi as a draft first, as with earlier case studies.
