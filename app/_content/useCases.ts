// Content for /use-cases and /use-cases/[slug]. One department per page, each a
// list of reusable automation examples. House rules: plain words, no em dashes, no
// hype, no "AI agents", and numbers only where a published case study states them.
// Keyword targets live in docs/seo/use-case-keyword-research.md.

export type UseCaseIdea = {
  title: string;
  /** The repeated work, in one plain sentence. */
  problem: string;
  /** Trigger, what runs on its own, and the point where a person steps in. */
  flow: [string, string, string];
  staysHuman: string;
  tools: string[];
  proof?: { slug: string; label: string };
};

export type DepartmentProof = {
  slug: string;
  big: string;
  bigLabel: string;
  title: string;
  summary: string;
  /** True when no published case study is in this department. */
  closest?: boolean;
};

export type Department = {
  slug: string;
  name: string;
  /** Short line shown on hub cards. */
  blurb: string;
  icon: "calculator" | "shoppingCart" | "trendingUp" | "messageReply" | "workflow" | "table";
  seo: { title: string; description: string; keyword: string };
  hero: { eyebrow: string; title: string; highlight: string; answer: string };
  ideas: UseCaseIdea[];
  start: { title: string; body: string };
  proof: DepartmentProof;
  faq: { q: string; a: string }[];
  related: { services: string[]; industries: string[]; posts: string[] };
};

export const DEPARTMENTS: Department[] = [
  {
    slug: "finance-accounting",
    name: "Finance and accounting",
    blurb: "Invoices, statements and reminders handled before month end",
    icon: "calculator",
    seo: {
      title: "Accounting Automation Examples for Small Businesses | Whispers Lab",
      description:
        "Practical accounting automation examples for small businesses: invoice reading, bank statement entry, payment reminders and books that match without retyping.",
      keyword: "accounting automation",
    },
    hero: {
      eyebrow: "Use cases · Finance and accounting",
      title: "Accounting automation examples",
      highlight: "that end the retyping.",
      answer:
        "Accounting automation means the numbers that already exist in an invoice, a bank statement or a billing tool reach your books without someone typing them again. These are the reusable examples we build for small businesses, with what each one handles on its own and where a person still decides.",
    },
    ideas: [
      {
        title: "Invoices read into your books",
        problem: "Supplier invoices arrive as PDFs and someone keys each line into the accounting tool.",
        flow: ["An invoice lands in a shared inbox or folder", "Fields are read, checked and filed as a draft bill", "Anything unclear waits for a person to approve"],
        staysHuman: "Approving unusual amounts and new suppliers.",
        tools: ["Email", "OpenAI", "Xero", "QuickBooks"],
        proof: { slug: "financial-document-reader", label: "The Financial Document Reader" },
      },
      {
        title: "Bank statements turned into transactions",
        problem: "Client statements are typed or pasted into a spreadsheet before bookkeeping can start.",
        flow: ["A statement is uploaded", "Every transaction is pulled into a fixed format", "Rows that do not match are flagged for review"],
        staysHuman: "Coding unusual transactions and approving the final set.",
        tools: ["OpenAI", "Supabase", "Google Sheets"],
        proof: { slug: "financial-document-reader", label: "The Financial Document Reader" },
      },
      {
        title: "Billing and accounting kept in sync",
        problem: "A sale is recorded in one tool and entered again in another, so the two disagree.",
        flow: ["A payment or invoice is created in one system", "The record is mirrored into the other with a loop safeguard", "Mismatches are listed for a person to fix"],
        staysHuman: "Deciding which system is the source of truth.",
        tools: ["Zapier", "Xero", "Resend"],
        proof: { slug: "zero-double-entry-financial-pipeline", label: "The Zero Double-Entry Financial Pipeline" },
      },
      {
        title: "Overdue invoice reminders in stages",
        problem: "Chasing late payers depends on someone remembering to send the next email.",
        flow: ["An invoice passes its due date", "A polite reminder goes out, then a firmer one on a schedule", "Reminders stop the moment payment lands"],
        staysHuman: "Phone calls and any dispute about the amount.",
        tools: ["Zapier", "Xero", "Email"],
      },
      {
        title: "Receipts captured and coded for review",
        problem: "Expense receipts pile up in photos and inboxes until month end.",
        flow: ["A receipt is photographed or forwarded", "Vendor, date and amount are read and suggested a category", "A person confirms the batch once a week"],
        staysHuman: "Confirming categories and anything personal or unclear.",
        tools: ["OpenAI", "Google Drive", "Airtable"],
      },
      {
        title: "A month-end summary that builds itself",
        problem: "The owner asks for numbers and someone pulls them from three tools by hand.",
        flow: ["The month closes", "Figures are collected from your tools into one report", "The summary is sent for a quick review before it goes out"],
        staysHuman: "Explaining what the numbers mean.",
        tools: ["Google Sheets", "Xero", "Email"],
      },
    ],
    start: {
      title: "Start with the task that repeats most and needs the least judgment.",
      body: "For most small firms that is invoice or statement entry. It happens often, follows the same shape, and has a clear before and after, so the hours saved are easy to count.",
    },
    proof: {
      slug: "financial-document-reader",
      big: "~15 hrs",
      bigLabel: "saved every week, with no manual data entry left",
      title: "The Financial Document Reader",
      summary: "An AI reader pulls every transaction out of bank statements in a fixed format, and each client's data stays walled off from the others.",
    },
    faq: [
      {
        q: "What accounting tasks can a small business automate?",
        a: "A small business can automate reading invoices and statements into the books, syncing billing and accounting tools, sending staged payment reminders, capturing receipts for review and building month-end summaries. Judgment calls such as coding unusual transactions, approving new suppliers and advising clients stay with a person.",
      },
      {
        q: "How much does accounting automation cost for a small business?",
        a: "At Whispers Lab it starts with a $250 Automation Audit that ranks your repeating accounting tasks and prices the first build. One standard workflow then starts from $2,500 at a fixed price, with the $250 credited if you build with us. Monthly upkeep starts from $500 a month and is optional.",
      },
      {
        q: "Will accounting automation replace my bookkeeper?",
        a: "No. It removes retyping and chasing so a bookkeeper spends time reviewing exceptions and advising clients. Every build we make sends unsure cases to a person instead of guessing, and the person approves anything that affects the books.",
      },
      {
        q: "Do I need to switch accounting software to automate?",
        a: "Usually not. The automation connects the tools you already use, such as Xero, QuickBooks, Zapier or n8n. The Automation Audit checks which of your tools can connect before anything is built.",
      },
    ],
    related: {
      services: ["/services/bookkeeping-automation", "/services/data-entry-automation"],
      industries: ["/industries/accounting-bookkeeping"],
      posts: ["accounting-workflow-automation-tasks-to-fix-first"],
    },
  },
  {
    slug: "ecommerce-inventory",
    name: "E-commerce and inventory",
    blurb: "Catalogs, orders and stock kept in step across systems",
    icon: "shoppingCart",
    seo: {
      title: "Ecommerce Automation Examples for Small Stores | Whispers Lab",
      description:
        "Ecommerce automation examples for small stores: supplier feeds, order and shipping sync, inventory alerts and cost tracking, with real builds behind them.",
      keyword: "ecommerce automation",
    },
    hero: {
      eyebrow: "Use cases · E-commerce and inventory",
      title: "Ecommerce automation examples",
      highlight: "your store can reuse.",
      answer:
        "Ecommerce automation keeps products, orders and stock agreeing across your store, warehouse and shipping tools without someone copying data between them. These are the reusable examples we have built for online sellers, with the real builds behind them and the checks that keep them safe.",
    },
    ideas: [
      {
        title: "Supplier feed cleaned and published",
        problem: "A raw supplier catalog needs titles, descriptions and categories fixed before anything can go live.",
        flow: ["A new feed or file arrives", "Text is cleaned, translated and matched to categories", "Products are checked against what is live, then published"],
        staysHuman: "Approving pricing rules and odd products.",
        tools: ["n8n", "OpenAI", "Supabase", "WooCommerce"],
        proof: { slug: "catalog-publishes-itself", label: "The 35,000-Product Catalog That Publishes Itself" },
      },
      {
        title: "Store orders sent to the shipping tool",
        problem: "Orders arrive in the store and someone moves each one into the shipping tool by hand.",
        flow: ["A new order is placed", "It is mapped and created in the shipping tool within moments", "Shipped or cancelled status is written back to the store"],
        staysHuman: "Orders with unusual shipping needs.",
        tools: ["BigCommerce", "ShipStation", "n8n"],
        proof: { slug: "store-and-shipping-tool-stay-in-step", label: "The Online Store and the Shipping Tool That Stay in Step" },
      },
      {
        title: "Storefront and warehouse in agreement",
        problem: "Stock and prices differ between the store and the warehouse system.",
        flow: ["A product or stock level changes", "The change is mirrored both ways", "Conflicts are listed so a person can settle them"],
        staysHuman: "Choosing which system wins in a conflict.",
        tools: ["Shopify", "Neto", "Custom code"],
        proof: { slug: "storefront-and-warehouse-agree", label: "The Storefront and Warehouse That Agree" },
      },
      {
        title: "Inventory cost kept accurate",
        problem: "A tool overwrites the cost of existing stock whenever new stock arrives at a different price.",
        flow: ["New stock is received", "A rolling average cost is recalculated", "The corrected cost is written back to each item"],
        staysHuman: "Reviewing items where a cost looks wrong.",
        tools: ["Make", "ShipHero"],
        proof: { slug: "inventory-cost-corrects-itself", label: "The Inventory Cost That Corrects Itself" },
      },
      {
        title: "Packing slips made on order",
        problem: "Packing slips are built by hand, so formats and details drift between orders.",
        flow: ["An order is created or changed", "A branded packing slip is generated from the order", "It is attached to the order for the warehouse"],
        staysHuman: "Anything special added to a gift or custom order.",
        tools: ["Make", "ShipHero", "Google Docs"],
      },
      {
        title: "Low stock and sync error alerts",
        problem: "Stock runs out or a sync fails and nobody notices until a customer does.",
        flow: ["A stock level falls below your limit, or a sync fails", "An alert goes to the right person with the item and detail", "The alert closes when the problem is resolved"],
        staysHuman: "Deciding when and how much to reorder.",
        tools: ["n8n", "Slack", "Email"],
      },
    ],
    start: {
      title: "Start where data gets typed twice.",
      body: "For most online stores that is moving orders between the store and the shipping tool, or cleaning a supplier feed. Both repeat daily, so the saving shows up in the first week.",
    },
    proof: {
      slug: "ai-catalog-content-engine",
      big: "~22 hrs",
      bigLabel: "saved every week, with zero duplicate entries or catalog errors",
      title: "The AI Catalog & Content Engine",
      summary: "A one-click system fetches the raw supplier feed, cleans and translates the text, and pushes every listing live to the store automatically.",
    },
    faq: [
      {
        q: "What is ecommerce automation?",
        a: "Ecommerce automation is software that moves product, order and stock information between your store, warehouse and shipping tools without manual copying. Typical examples are publishing a supplier catalog, sending orders to a shipping tool and alerting you when stock runs low.",
      },
      {
        q: "How can a small online store start with automation?",
        a: "Start with the task where data is typed twice, usually orders into a shipping tool or a supplier feed into the store. At Whispers Lab a $250 Automation Audit ranks these tasks by hours saved and prices the first build, and one workflow starts from $2,500.",
      },
      {
        q: "Can automation connect my store to my warehouse or shipping tool?",
        a: "Usually, yes, if both tools have an API. We have built a BigCommerce to ShipStation order sync and a Shopify to Neto inventory sync. The audit confirms the exact connections and checks for known connector issues first.",
      },
      {
        q: "What stays manual in an automated store?",
        a: "Pricing strategy, supplier decisions, reorder amounts, unusual orders and customer conversations. The automation handles the repeated moves of data and flags anything it cannot match.",
      },
    ],
    related: {
      services: ["/services/software-integration-services", "/services/data-entry-automation"],
      industries: ["/industries/ecommerce-retail"],
      posts: ["ecommerce-product-listing-automation-supplier-feeds"],
    },
  },
  {
    slug: "sales-leads",
    name: "Sales and leads",
    blurb: "Every lead found, answered and followed up on time",
    icon: "trendingUp",
    seo: {
      title: "Lead Generation and Follow-Up Automation Examples | Whispers Lab",
      description:
        "Lead generation and follow-up automation examples for small businesses: capture, routing, fast replies, nudges and outreach that never contacts anyone twice.",
      keyword: "automate lead generation",
    },
    hero: {
      eyebrow: "Use cases · Sales and leads",
      title: "Lead and sales automation examples",
      highlight: "that follow up on time.",
      answer:
        "Lead automation finds or captures leads, routes them to the right person and keeps follow-up on schedule, so no inquiry waits because someone was busy. These are the reusable sales examples we build, with the points where a salesperson still takes over.",
    },
    ideas: [
      {
        title: "Lead capture straight into the CRM",
        problem: "Leads arrive by form, email and ads, then wait for someone to copy them into the CRM.",
        flow: ["A form or message comes in", "The contact is created, matched to the source and assigned", "The owner is notified with the details"],
        staysHuman: "Qualifying the lead and deciding next steps.",
        tools: ["n8n", "Airtable", "HubSpot"],
        proof: { slug: "crm-that-fills-itself-in", label: "The CRM That Fills Itself In" },
      },
      {
        title: "A reply the moment a lead comes in",
        problem: "The first response happens hours later, after the lead has contacted someone else.",
        flow: ["A new lead arrives", "A text or email draft goes to the owner, or out automatically for simple cases", "A reminder fires if nobody has replied"],
        staysHuman: "Tone and any pricing conversation.",
        tools: ["Twilio", "Gmail", "n8n"],
        proof: { slug: "lead-sales-engine", label: "The Lead Sales Engine That Runs Itself" },
      },
      {
        title: "A weekly lead list built from public records",
        problem: "Good leads sit inside thousands of raw rows and nobody has time to filter them.",
        flow: ["A schedule runs every Monday", "Records are pulled, enriched and filtered by your rules", "Anyone already contacted is removed before outreach starts"],
        staysHuman: "Setting the rules and reviewing the campaign.",
        tools: ["n8n", "Airtable", "Lob"],
        proof: { slug: "lead-list-builds-itself", label: "The Lead List That Builds Itself Every Monday" },
      },
      {
        title: "No lead handled twice",
        problem: "Two people contact the same lead, or a lead is sold or messaged again.",
        flow: ["A lead is acted on", "It is marked as handled the instant the action completes", "Every later step checks that mark first"],
        staysHuman: "Deciding when a handled lead can be reopened.",
        tools: ["n8n", "Stripe", "Airtable"],
        proof: { slug: "lead-sales-engine", label: "The Lead Sales Engine That Runs Itself" },
      },
      {
        title: "Nudges for stalled deals",
        problem: "A deal sits in one stage and nobody notices until it has gone cold.",
        flow: ["A deal stays in a stage past your limit", "The owner gets a prompt with the deal history", "A follow-up task is created if they approve"],
        staysHuman: "Choosing whether and how to follow up.",
        tools: ["HubSpot", "Zapier", "Slack"],
      },
      {
        title: "Quotes and proposals drafted from a form",
        problem: "Every quote is built from scratch even when most of it repeats.",
        flow: ["A request form is submitted", "A draft quote is built from your price list", "The draft goes to you for approval before it is sent"],
        staysHuman: "Pricing, scope and sending.",
        tools: ["Google Docs", "Airtable", "Zapier"],
      },
    ],
    start: {
      title: "Start with speed to first reply.",
      body: "It is the cheapest fix with the clearest effect. Capture every lead in one place, tell the right person at once, and remind them if they have not answered.",
    },
    proof: {
      slug: "lead-sales-engine",
      big: "~15 hrs",
      bigLabel: "saved every week, with leads never sold twice since launch",
      title: "The Lead Sales Engine That Runs Itself",
      summary: "New leads are found, contacted and marked handled the instant the process completes, so nothing goes out twice.",
    },
    faq: [
      {
        q: "How do I automate lead generation for a small business?",
        a: "Automate the repeatable parts: pulling leads from a source such as public records or a form, enriching and filtering them by your rules, removing anyone already contacted and starting outreach. Your team handles the conversations. The Whispers Lab Automation Audit ranks which of these steps saves the most hours first.",
      },
      {
        q: "What is lead follow-up automation?",
        a: "Lead follow-up automation sends or drafts a reply as soon as a lead arrives, reminds you if nobody has answered and nudges deals that have stalled. It keeps response times short without adding staff.",
      },
      {
        q: "Will automated follow-up feel impersonal?",
        a: "It can feel personal if a person approves the message that matters. Many builds draft the reply and send it to the salesperson first. Simple acknowledgements can go out on their own, and anything involving price or tone is approved by a person.",
      },
      {
        q: "How much does a lead automation build cost?",
        a: "A $250 Automation Audit comes first and is credited toward a build. One standard workflow starts from $2,500 at a fixed price and goes live in under 30 days.",
      },
    ],
    related: {
      services: ["/services/lead-follow-up-automation", "/integrations/n8n"],
      industries: ["/industries/real-estate"],
      posts: ["real-estate-lead-follow-up-automation", "crm-data-hygiene"],
    },
  },
  {
    slug: "customer-support",
    name: "Customer support",
    blurb: "Fast answers and status updates without a bigger team",
    icon: "messageReply",
    seo: {
      title: "Customer Service Automation Examples for Small Teams | Whispers Lab",
      description:
        "Customer service automation examples for small teams: status updates, request triage, drafted answers and follow-ups, with a person on every judgment call.",
      keyword: "customer service automation",
    },
    hero: {
      eyebrow: "Use cases · Customer support",
      title: "Customer service automation examples",
      highlight: "for small teams.",
      answer:
        "Customer service automation answers the questions that repeat, routes the ones that do not, and keeps customers told about where things stand, so your team spends its time on the problems that need a person. These are the reusable examples, with the limits stated.",
    },
    ideas: [
      {
        title: "Status updates sent without asking",
        problem: "Customers email to ask where their order or booking is.",
        flow: ["A status changes in your system", "The customer gets a short message", "Replies go to a person if they ask something new"],
        staysHuman: "Replying to anything that is not a plain status question.",
        tools: ["n8n", "Email", "Twilio"],
      },
      {
        title: "Requests sorted by type and urgency",
        problem: "Every message lands in one inbox and someone reads each one to decide who should handle it.",
        flow: ["A request arrives", "It is tagged by topic and urgency using rules you wrote", "It is assigned to the right person with the key details"],
        staysHuman: "Anything the rules do not clearly cover, and every safety issue.",
        tools: ["Zapier", "Airtable", "Slack"],
      },
      {
        title: "Drafted answers from your own documents",
        problem: "The same questions are answered by hand again and again.",
        flow: ["A common question comes in", "A draft answer is written from your help documents", "A person approves before it is sent, until you trust a topic"],
        staysHuman: "Approving answers and handling anything unusual.",
        tools: ["OpenAI", "Email", "Google Drive"],
      },
      {
        title: "Follow-up after a ticket is closed",
        problem: "Nobody checks whether the problem was actually solved.",
        flow: ["A ticket is marked resolved", "A short check-in goes out after a set time", "Negative replies reopen the ticket for a person"],
        staysHuman: "Making it right with an unhappy customer.",
        tools: ["n8n", "Email"],
      },
      {
        title: "Handover to a person at the right moment",
        problem: "Automated replies keep going when the customer needs a human.",
        flow: ["A message contains a flagged topic or frustration", "Automatic replies stop", "The thread is passed to a person with the history"],
        staysHuman: "The whole conversation from that point.",
        tools: ["Zapier", "Slack"],
      },
    ],
    start: {
      title: "Start with status questions.",
      body: "They are the easiest to answer automatically and the least risky. Once those run well, add sorting and drafted answers, one topic at a time.",
    },
    proof: {
      slug: "onboarding-pipeline-autopilot",
      big: "~5 hrs",
      bigLabel: "saved every week, with every client arriving ready",
      title: "The Onboarding Pipeline That Runs on Autopilot",
      summary: "Clients book themselves, get a video link and reminders automatically, and the CRM updates the moment they book. This is a coaching business, not a support desk, but it uses the same trigger, message and record pattern.",
      closest: true,
    },
    faq: [
      {
        q: "What is customer service automation?",
        a: "Customer service automation uses rules and software to handle the repeated parts of support: status updates, sorting requests, drafting common answers and following up after a ticket closes. A person still handles judgment calls and anything a customer is upset about.",
      },
      {
        q: "What are good ways to automate customer service?",
        a: "The safest first steps are automatic status updates and request sorting by topic and urgency. After that, drafted answers from your own help documents with a person approving, and follow-ups after tickets close. We would not start with fully automatic answers to complex questions.",
      },
      {
        q: "Will customers know they are talking to automation?",
        a: "Status messages and acknowledgements are clearly automatic. For real answers, most of our builds draft the reply and send it to a person first. We recommend telling customers when a message is automated.",
      },
      {
        q: "Do you have a customer support case study?",
        a: "Not yet. Our closest published build is a booking and reminder flow that saves about 5 hours a week. The pattern is the same, but the industry is different, and the Automation Audit would map your own support workflow first.",
      },
    ],
    related: {
      services: ["/services/automation-consulting", "/services/client-onboarding-automation"],
      industries: ["/industries/ecommerce-retail"],
      posts: ["5-signs-your-business-is-losing-hours-to-busywork"],
    },
  },
  {
    slug: "operations",
    name: "Operations and delivery",
    blurb: "Onboarding, reports, deadlines and approvals that run themselves",
    icon: "workflow",
    seo: {
      title: "Business Process Automation Examples for Operations | Whispers Lab",
      description:
        "Operations automation examples for small businesses: client onboarding, data entry, reports, deadline reminders and project follow-ups, backed by real builds.",
      keyword: "automate client onboarding",
    },
    hero: {
      eyebrow: "Use cases · Operations and delivery",
      title: "Operations automation examples",
      highlight: "for work that repeats.",
      answer:
        "Operations automation handles the steps between a client saying yes and the work being delivered: onboarding, reminders, reports and approvals. These are the reusable examples we have built, from client onboarding to deadline tracking, with the human checkpoints marked.",
    },
    ideas: [
      {
        title: "Client onboarding that runs itself",
        problem: "Booking a new client means a run of emails, a hand-built meeting link and intake forms that arrive late.",
        flow: ["A client books a time", "A link, reminders and intake forms go out automatically", "The CRM updates the moment they book"],
        staysHuman: "The first conversation and anything custom to the client.",
        tools: ["Calendly", "Zoom", "Your CRM"],
        proof: { slug: "onboarding-pipeline-autopilot", label: "The Onboarding Pipeline That Runs on Autopilot" },
      },
      {
        title: "Reports written from field notes and photos",
        problem: "Inspectors finish the visit, then spend hours writing the report.",
        flow: ["Photos and notes are submitted from the field", "A structured report is built and formatted", "A person reviews and sends it"],
        staysHuman: "Reviewing findings and signing off.",
        tools: ["Jotform", "Make", "Documint"],
        proof: { slug: "inspection-report-writes-itself", label: "The Inspection Report That Writes Itself" },
      },
      {
        title: "Project boards that chase deadlines",
        problem: "The owner follows up on payments and stalled projects by memory.",
        flow: ["A card passes a due date or sits too long", "A reminder or follow-up goes out on a schedule", "The right person is assigned the next step"],
        staysHuman: "Conversations with clients about delays.",
        tools: ["Trello", "Butler"],
        proof: { slug: "project-board-chases-its-own-deadlines", label: "The Project Board That Chases Its Own Deadlines" },
      },
      {
        title: "Case and matter tracking with date reminders",
        problem: "Case details live in many places and dates are missed.",
        flow: ["A case record changes or a date approaches", "The right person is reminded by rule", "Documents and invoices are tracked against the stage"],
        staysHuman: "Professional judgment on every case.",
        tools: ["Zoho CRM"],
        proof: { slug: "law-practice-never-misses-a-deadline", label: "The Law Practice That Never Misses a Deadline" },
      },
      {
        title: "Data entry replaced by reading",
        problem: "Forms, emails and PDFs are retyped into another system.",
        flow: ["A document or form arrives", "The fields are read and checked", "Unclear entries wait for a person to confirm"],
        staysHuman: "Confirming anything the system is unsure about.",
        tools: ["OpenAI", "Make", "Google Sheets"],
        proof: { slug: "financial-document-reader", label: "The Financial Document Reader" },
      },
      {
        title: "Cleanup of a large file backlog, once",
        problem: "Thousands of old files and duplicates make everything harder to find.",
        flow: ["A cleanup rule is agreed and tested on a copy", "Files are sorted, merged or archived in safe batches", "A log shows exactly what was changed"],
        staysHuman: "Approving the rules and spot-checking the result.",
        tools: ["Make", "Google Drive"],
        proof: { slug: "self-cleaning-warehouse-system", label: "The Self-Cleaning Warehouse System" },
      },
    ],
    start: {
      title: "Start with the handoff people complain about.",
      body: "If a task keeps waiting on someone to remember it, that is usually the best first build. Count the hours it costs each week and compare that to the effort to build it.",
    },
    proof: {
      slug: "onboarding-pipeline-autopilot",
      big: "~5 hrs",
      bigLabel: "saved every week, with every client arriving ready",
      title: "The Onboarding Pipeline That Runs on Autopilot",
      summary: "Clients book themselves, get a video link and reminders automatically, and the CRM updates the moment they book.",
    },
    faq: [
      {
        q: "How do I automate client onboarding?",
        a: "Let clients book themselves, then trigger a meeting link, reminders and intake forms automatically and update your CRM when they book. In one Whispers Lab build this saves about 5 hours a week. The first conversation and anything custom to the client stay with a person.",
      },
      {
        q: "How do I automate data entry?",
        a: "Replace retyping with reading: the system pulls the fields from a form, email or PDF, checks them and files them in the right place, and sends anything unclear to a person. Our Financial Document Reader removed manual data entry and saves about 15 hours a week.",
      },
      {
        q: "What operations tasks are best to automate first?",
        a: "Start with tasks that repeat often, follow the same steps and wait on someone remembering them, such as onboarding, reminders and recurring reports. Judgment tasks stay with your team.",
      },
      {
        q: "Can I automate with tools I already have?",
        a: "Usually. Many of our builds run on Zapier, n8n, Make, Airtable or the CRM you already pay for. The Automation Audit checks that before a build is priced.",
      },
    ],
    related: {
      services: ["/services/client-onboarding-automation", "/services/data-entry-automation"],
      industries: ["/industries/property-management", "/industries/law-firms"],
      posts: ["5-signs-your-business-is-losing-hours-to-busywork"],
    },
  },
  {
    slug: "crm-marketing",
    name: "CRM and marketing",
    blurb: "Contacts logged, campaigns tracked, subscribers converted",
    icon: "table",
    seo: {
      title: "CRM Workflow Automation Examples for Small Teams | Whispers Lab",
      description:
        "CRM workflow automation examples for small teams: self-filling contact records, social lead conversion, review requests and campaign tracking.",
      keyword: "crm workflow automation",
    },
    hero: {
      eyebrow: "Use cases · CRM and marketing",
      title: "CRM workflow automation examples",
      highlight: "that keep records true.",
      answer:
        "CRM automation keeps contact records current without anyone logging calls and emails by hand, and marketing automation turns interest into the next step. These are the reusable examples we build, with the points where your team stays in charge of the relationship.",
    },
    ideas: [
      {
        title: "A CRM that fills itself in",
        problem: "Emails and meetings with contacts are never logged, so the history lives in one person's inbox.",
        flow: ["An email or meeting happens", "It is matched to the right contact, even if they are new", "The activity is logged on their record"],
        staysHuman: "Deciding what matters on a relationship.",
        tools: ["n8n", "Airtable", "Gmail"],
        proof: { slug: "crm-that-fills-itself-in", label: "The CRM That Fills Itself In" },
      },
      {
        title: "Social comments turned into subscribers",
        problem: "People comment on posts or ads but nothing connects the comment to a signup.",
        flow: ["Someone comments on a post or ad", "A personal message goes out with a link to your offer", "Interested people move into your funnel and CRM"],
        staysHuman: "Replies to anyone who asks a real question.",
        tools: ["ManyChat", "GoHighLevel", "Stripe"],
        proof: { slug: "instagram-comment-becomes-a-subscriber", label: "The Instagram Comment That Becomes a Subscriber" },
      },
      {
        title: "Duplicate and stale record cleanup",
        problem: "The CRM fills with duplicates and out-of-date contacts, so nobody trusts it.",
        flow: ["A new record is created or a schedule runs", "It is checked against existing contacts", "Likely duplicates are merged or listed for review"],
        staysHuman: "Approving merges on high-value accounts.",
        tools: ["Airtable", "HubSpot", "n8n"],
      },
      {
        title: "Review requests after a job is done",
        problem: "Happy customers are never asked for a review.",
        flow: ["A job or order is marked complete", "A short request goes out after a set time", "Unhappy replies come to you before they go public"],
        staysHuman: "Handling any complaint personally.",
        tools: ["Zapier", "Email", "Twilio"],
      },
      {
        title: "Lead source written back to the CRM",
        problem: "You cannot tell which ads or posts produce customers.",
        flow: ["A lead is captured with its source", "The source is stored on the contact record", "A weekly summary shows leads by source"],
        staysHuman: "Choosing where to spend your budget.",
        tools: ["GoHighLevel", "Airtable", "Google Sheets"],
      },
      {
        title: "One post turned into drafts for other channels",
        problem: "Content is written once and never reused.",
        flow: ["A post is published", "Drafts for other channels are produced", "You review and schedule the ones you like"],
        staysHuman: "Every word that is published.",
        tools: ["OpenAI", "Make", "Google Docs"],
      },
    ],
    start: {
      title: "Start by making the CRM trustworthy.",
      body: "Automation built on bad records makes bad decisions faster. Get contacts and activity logging correct first, then add follow-up and campaigns on top.",
    },
    proof: {
      slug: "crm-that-fills-itself-in",
      big: "~6 hrs",
      bigLabel: "saved every week, with no manual CRM logging left",
      title: "The CRM That Fills Itself In",
      summary: "Real emails and meetings log themselves to Airtable, matched to the right contact by email domain even for people not yet saved.",
    },
    faq: [
      {
        q: "What is CRM automation?",
        a: "CRM automation is software that keeps your contact records current without manual logging: it matches emails and meetings to the right contact, creates records for new people and triggers follow-up tasks. It frees your team from data entry so they spend time on the relationships.",
      },
      {
        q: "What are examples of CRM workflow automation?",
        a: "Common examples are logging emails and meetings to the right contact automatically, flagging stalled deals, merging duplicate records, writing lead source back to the record and asking for a review after a job is complete. Our CRM That Fills Itself In saves about 6 hours a week.",
      },
      {
        q: "Do I need a particular CRM to automate it?",
        a: "No. We have built on Airtable, Zoho CRM and GoHighLevel. If your CRM has an API or a Zapier connection, it can usually be automated, and the audit confirms that first.",
      },
      {
        q: "Can marketing automation make decisions for me?",
        a: "It can run steps you have defined, such as sending a message after a comment or logging a lead source. Decisions about offers, budget and what you publish stay with you.",
      },
    ],
    related: {
      services: ["/integrations/airtable", "/services/lead-follow-up-automation"],
      industries: ["/industries/real-estate"],
      posts: ["crm-data-hygiene"],
    },
  },
];

export function getDepartment(slug: string): Department | undefined {
  return DEPARTMENTS.find((d) => d.slug === slug);
}
