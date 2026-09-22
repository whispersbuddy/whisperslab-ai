// Content for /integrations/[slug] pages. Reuses the exact section shape
// built for /services/[slug] (see app/_content/services.ts and
// components/service/*) so the same components render both templates.
//
// House rules for copy: plain words (grade 6 to 8), no em dashes, no hype,
// no "AI agents", and only numbers that come from published case studies or
// from the tool's own docs (cited in the FAQ, never invented).
//
// Airtable facts below (automation run caps, automations-per-base limit,
// actions-per-automation limit) are sourced from Airtable's own support
// docs, verified 2026-09-22: support.airtable.com/docs/getting-started-with-airtable-automations
// and airtable.com/pricing.

import type { ServicePage } from "@/app/_content/services";

export type IntegrationPage = ServicePage & {
  /** For JSON-LD `mentions: SoftwareApplication`. */
  tool: { name: string; url: string; sameAs?: string[] };
};

export const INTEGRATIONS: IntegrationPage[] = [
  {
    slug: "airtable",
    tool: { name: "Airtable", url: "https://www.airtable.com" },
    seo: {
      title: "Airtable Consultant for Small Businesses | Whispers Lab",
      description:
        "Whispers Lab builds Airtable bases and automations for small businesses: CRMs, trackers, client databases. Used in many builds, no certification claimed.",
      keyword: "airtable consultant",
    },
    hero: {
      eyebrow: "Integration · Airtable",
      title: "Airtable consultants for teams",
      highlight: "done juggling spreadsheets.",
      answer:
        "Whispers Lab designs and builds Airtable bases for small businesses: CRMs, project trackers, and client databases, with linked tables, views built for each role, and automations that post updates without anyone checking a spreadsheet. Airtable shows up in many of our builds. We don't claim a certification, just bases that work.",
      secondaryCta: { label: "See what an Airtable build includes", href: "#includes" },
    },
    simulator: [
      {
        key: "lead",
        tab: "New lead comes in",
        source: "Website contact form",
        sourceIcon: "F",
        doc: { title: "NEW LEAD", rows: [["Name", "Jordan Price"], ["Company", "Ridge Supply Co"]], lines: 2 },
        steps: [
          { t: "0.0s", text: "<b>Form submitted</b> on the website" },
          { t: "0.4s", text: "<b>Record created</b> in the Leads table" },
          { t: "0.6s", text: "<b>Matched</b> to Ridge Supply Co in the Companies table by domain" },
          { t: "0.9s", text: "<b>Owner assigned</b> by territory rule" },
          { t: "1.1s", text: "<b>Posted to #sales</b> on Slack, tagging the owner" },
        ],
        out: { k: "Lead routed", v: "Jordan Price → Priya", s: "No one had to check the form inbox" },
      },
      {
        key: "stage",
        tab: "Deal changes stage",
        source: "Airtable automation",
        sourceIcon: "A",
        doc: { title: "DEAL UPDATED", rows: [["Deal", "Ridge Supply Co"], ["Stage", "Contract sent"]], lines: 2 },
        steps: [
          { t: "0.0s", text: "<b>Stage field changed</b> to \"Contract sent\"" },
          { t: "0.3s", text: "<b>Reminder set</b> for 7 days out if no reply" },
          { t: "0.5s", text: "<b>Linked record updated</b> on the Company's own view" },
          { t: "0.7s", text: "<b>Email sent</b> to the deal owner with the contract link" },
        ],
        out: { k: "Team notified", v: "#sales · Ridge Supply Co", s: "Nobody had to check the base by hand" },
      },
    ],
    values: [
      {
        big: "~6 hrs",
        what: "of CRM logging gone every week",
        from: "Real emails and meetings log themselves, matched to the right company automatically",
        href: "/case-studies/crm-that-fills-itself-in",
        hrefLabel: "the CRM That Fills Itself In",
      },
      {
        big: "50",
        what: "automations built into every base",
        from: "No extra subscription. Airtable's own automation limit",
        href: "#faq",
        hrefLabel: "how the limits work",
      },
      {
        big: "1 base",
        what: "your team actually trusts",
        from: "Every table linked, one place to check status instead of five",
        href: "/case-studies/crm-that-fills-itself-in",
        hrefLabel: "see how",
      },
    ],
    beforeAfter: {
      eyebrow: "Tuesday morning, two ways",
      title: "What changes when your data has one home?",
      intro: "Drag the handle. Same team, same Tuesday.",
      before: {
        time: "Tuesday 9:10 AM",
        pills: ["3 spreadsheets open", "\"Which version is current?\" in the group chat"],
        table: {
          title: "Deals (v14, FINAL, use this one).xlsx",
          head: ["Deal", "Stage", "Owner"],
          rows: [
            { cells: ["Ridge Supply Co", "??", "Sam"], status: "bad" },
            { cells: ["Metro Fuel", "Contract sent", "Priya"] },
            { cells: ["Harbor Electric", "Closed", "Sam"], status: "bad" },
            { cells: ["Northside Plumbing", "Discovery", "Priya"] },
          ],
          footer: { cells: ["4 deals", "2 out of date", ""], status: "bad" },
        },
        aside: { kind: "note", text: "Is this the version Sam sent Friday or the one Priya fixed?" },
      },
      after: {
        time: "Tuesday 9:10 AM",
        pills: ["1 base, always current", "A view built for each person"],
        table: {
          title: "Today: Deals base, live",
          head: ["Deal", "Stage", "Owner"],
          rows: [
            { cells: ["Ridge Supply Co", "Contract sent", "Sam"], status: "ok" },
            { cells: ["Metro Fuel", "Contract sent", "Priya"], status: "ok" },
            { cells: ["Harbor Electric", "Closed", "Sam"], status: "ok" },
            { cells: ["Northside Plumbing", "Discovery", "Priya"], status: "ok" },
          ],
        },
        aside: { kind: "message", channel: "#sales", topic: "Deals base", text: "Ridge Supply Co moved to Contract sent. Reminder set for next Tuesday.", actions: ["Open deal", "Snooze"] },
      },
      table: [
        { row: "Where the data lives", before: "Copies in email, spreadsheets, and someone's notes", after: "One base, with a view built for each person" },
        { row: "Updates", before: "Whoever remembers to copy the change", after: "Linked records update everywhere at once" },
        { row: "Who gets pinged", before: "Nobody, until someone asks", after: "Automations post to Slack or email on the rules you set" },
        { row: "Your team's time", before: "Copying between tools and asking which version is right", after: "Working from the one base that's always current" },
      ],
    },
    steps: {
      eyebrow: "How it works",
      title: "How does an Airtable build actually happen?",
      items: [
        { title: "Map", body: "We look at where your data lives now, spreadsheets, inboxes, other tools, and how each person on your team actually wants to see it.", tools: ["Your current sheets", "Interviews"] },
        { title: "Build the base", body: "Tables, linked records, and views go in, matched to how each role on your team works: sales, ops, leadership.", tools: ["Airtable"] },
        { title: "Automate", body: "Native automations handle the busywork: new record alerts, status changes, reminders, and syncing with tools you already use.", tools: ["Airtable automations"] },
        { title: "Add AI where it earns its place", body: "Where a plain rule can't do the job, like summarizing a note, we add AI to a single field. Never the whole base.", tools: ["OpenAI", "Claude"], ai: true },
        { title: "Hand off", body: "You get the account, written docs, and a video walkthrough. Nothing lives only in our heads.", tools: ["Docs", "Video walkthroughs"] },
      ],
      checkpointAfter: 4,
      checkpointLabel: "You approve the base before automations go live",
      human: ["Approving the base structure before automations turn on", "Deciding what needs a human review", "Any client-facing message", "Changing table structure later", "Who gets edit access"],
    },
    bento: {
      eyebrow: "What we build",
      title: "What does an Airtable build usually include?",
      intro: "Most builds combine a few of these pieces, matched to how your team already works.",
      tiles: [
        {
          verb: "Build",
          title: "CRM and pipeline bases",
          body: "Contacts, companies, and deals linked together, with a view built for sales and a different one for leadership.",
          preview: {
            type: "table",
            head: ["Lead", "Source", "Owner", "Status"],
            rows: [
              { cells: ["Jordan Price", "Website form", "Unassigned"], status: "New", ok: false },
              { cells: ["Priya Shah", "Referral", "Priya"], status: "Assigned", ok: true },
              { cells: ["Sam Torres", "Website form", "Sam"], status: "Assigned", ok: true },
            ],
            note: "Example · new leads route to the right owner automatically",
          },
        },
        {
          verb: "Automate",
          title: "Change alerts",
          body: "Every important update posts to Slack or email the moment it happens, not whenever someone remembers to check.",
          preview: { type: "txns", rows: [["Stage → Contract sent", "Ridge Supply Co"], ["Deal won", "Metro Fuel"], ["Renewal in 14 days", "Harbor Electric"]] },
        },
        {
          verb: "Know your limits",
          title: "No surprise automation caps",
          preview: { type: "receipt", amount: "50", label: "automations per base, Airtable's own limit" },
        },
        {
          verb: "Document",
          title: "A base guide you can hand to anyone",
          preview: { type: "pdf", title: "BASE GUIDE", pages: "Every table and automation written down" },
        },
        {
          verb: "Remind",
          title: "Renewals and deadlines",
          preview: { type: "calendar", highlight: 14, reminder: "Reminder: contract renews in 14 days" },
        },
        {
          verb: "Tidy",
          title: "One-time cleanup",
          preview: { type: "counter", from: 812, label: "duplicate contacts merged, one time" },
        },
      ],
    },
    estimator: {
      eyebrow: "Your numbers",
      title: "What is spreadsheet chaos costing you?",
      intro: "Move the sliders to match your week.",
      unit: "updates",
      inputs: [
        { id: "docs", label: "Updates copied between tools per day", min: 5, max: 100, step: 5, value: 25 },
        { id: "min", label: "Minutes lost per update, copying or double checking", min: 1, max: 15, step: 1, value: 3 },
        { id: "days", label: "Working days per week", min: 1, max: 7, step: 1, value: 5 },
        { id: "rate", label: "Hourly cost of that time", min: 15, max: 150, step: 5, value: 35, hint: "Wages plus overhead, or your own hourly value", format: "money" },
        { id: "flag", label: "Share still needing a person to double check", min: 0, max: 50, step: 5, value: 10, format: "percent" },
        { id: "rev", label: "Minutes to check one of those", min: 1, max: 10, step: 1, value: 2 },
      ],
      worth: ["Worth it when the same data gets copied between tools every week", "When two or more people update the same list", "When \"which version is current\" comes up more than once a month"],
    },
    proof: {
      featured: {
        slug: "crm-that-fills-itself-in",
        big: "~6 hrs",
        bigLabel: "saved every week, with no manual CRM logging left",
        title: "The CRM That Fills Itself In",
        before: "Years of conversations with schools and educators sat scattered across one founder's inbox.",
        after: "Real emails and meetings log themselves to Airtable, matched to the right contact by email domain even for people not yet saved.",
        chips: ["Education", "Airtable", "n8n"],
        caption: "Illustration of the linked contacts view",
      },
      more: [],
    },
    stack: {
      title: "Built alongside the tools you already pay for",
      intro: "Airtable rarely runs alone. We connect it to email, calendars, payment tools, and workflow platforms so it stays the one place your team checks.",
      center: "Your base",
      tools: ["Gmail", "Google Calendar", "n8n", "Zapier", "Slack", "Stripe", "HubSpot", "OpenAI"],
      links: [
        { label: "n8n", href: "/integrations/n8n" },
        { label: "Zapier", href: "/integrations/zapier" },
        { label: "Data Entry Automation", href: "/services/data-entry-automation" },
      ],
    },
    faq: {
      title: "Questions owners ask about Airtable",
      items: [
        {
          q: "Is Airtable free?",
          a: "Airtable has a free plan for individuals and very small teams. Paid plans (Team, Business, and Enterprise Scale) add more automation runs, higher record limits, and more admin controls. Whispers Lab recommends a plan during the Automation Audit based on your team size and how many automations you need.",
        },
        {
          q: "How many automations can one Airtable base run?",
          a: "A base can hold up to 50 automations, including disabled ones, and each automation can have up to 25 actions. Monthly automation runs are capped by plan: 100 on the Free plan, 25,000 on Team, 100,000 on Business, and 500,000 on Enterprise Scale, resetting on the first of each month. We size the plan to match your actual run volume during the Audit.",
        },
        {
          q: "Is Whispers Lab a certified Airtable partner?",
          a: "No. Airtable shows up in many of our builds, including CRMs, project trackers, and client databases, but we don't hold or claim an official Airtable certification.",
        },
        {
          q: "Should I use Airtable or a spreadsheet?",
          a: "A spreadsheet works while one or two people update it and nothing needs to link together. Airtable earns its place once you need linked records across lists (contacts, deals, projects), different views for different people, or automations that fire when something changes. The Automation Audit will tell you honestly if a spreadsheet is still enough.",
        },
        {
          q: "Can Airtable connect to the tools we already use?",
          a: "Usually, yes. Airtable connects directly to many apps, and anything else can usually be linked through n8n or Zapier. We map the exact connections you need during the $250 Automation Audit before anything is built.",
        },
        {
          q: "What do we own after the build?",
          a: "Your own Airtable account, a written guide to every table and automation, and a video walkthrough. Nothing about the base depends on Whispers Lab staying involved, though the AI Growth Partner plan is available for $500 a month if you want ongoing changes and monitoring.",
        },
      ],
    },
    cta: {
      title: "Find out if Airtable is the right home for your data.",
      body: "In 7 days, the Automation Audit maps where your data actually lives and hands you a build plan you keep either way. Build it with us and the $250 is credited.",
    },
    related: {
      industries: ["/industries/real-estate", "/industries/property-management", "/industries/accounting-bookkeeping"],
      posts: ["accounting-workflow-automation-tasks-to-fix-first"],
    },
  },
  {
    slug: "n8n",
    tool: { name: "n8n", url: "https://n8n.io", sameAs: ["https://github.com/n8n-io/n8n"] },
    seo: {
      title: "n8n Consultant for Small Businesses | Whispers Lab",
      description:
        "Whispers Lab designs, builds, and maintains n8n workflows for small businesses, on n8n Cloud or your own server. Two real builds, honestly explained.",
      keyword: "n8n consultant",
    },
    hero: {
      eyebrow: "Integration · n8n",
      title: "n8n consultants for teams",
      highlight: "done bridging apps by hand.",
      answer:
        "Whispers Lab designs, builds, and maintains n8n workflows for small businesses. n8n is a workflow automation platform that connects your apps, runs multi-step logic, and can call AI where it helps. We set it up on n8n Cloud or your own server, document everything, and hand over workflows your team owns.",
      secondaryCta: { label: "See what an n8n build includes", href: "#includes" },
    },
    simulator: [
      {
        key: "crm",
        tab: "Email logs itself",
        source: "Gmail + Calendar",
        sourceIcon: "@",
        doc: { title: "NEW EMAIL", rows: [["From", "ops@riverside.edu"], ["Subject", "Meeting recap"]], lines: 2 },
        steps: [
          { t: "0.0s", text: "<b>New email or meeting</b> picked up as it arrives" },
          { t: "0.5s", text: "<b>Filtered</b>: internal chatter, newsletters, and meeting-bot invites thrown out" },
          { t: "0.9s", text: "<b>Checked</b> against the saved contact list" },
          { t: "1.2s", text: "<b>Not saved yet?</b> matched to the right organization by email domain instead" },
          { t: "1.5s", text: "<b>Logged</b>, linked to both the person and their organization" },
        ],
        out: { k: "Contact logged", v: "Auto-matched by domain", s: "0 spam or internal noise reached the CRM" },
      },
      {
        key: "leads",
        tab: "Lead gets sold",
        source: "Property lead feed",
        sourceIcon: "$",
        doc: { title: "NEW LEAD", rows: [["Type", "Property violation"], ["Homeowner", "Lookup pending"]], lines: 2 },
        steps: [
          { t: "0.0s", text: "<b>New lead</b> comes in" },
          { t: "0.4s", text: "<b>Homeowner contact found</b> by a lookup service" },
          { t: "0.8s", text: "<b>Teaser built</b>, contact details blacked out" },
          { t: "1.1s", text: "<b>Texted to local contractors</b> with a payment link" },
          { t: "1.5s", text: "<b>Payment clears</b>, full lead delivered and marked sold everywhere" },
        ],
        out: { k: "Lead sold", v: "0 leads sold twice", s: "Marked sold across every tool the instant payment clears" },
      },
    ],
    values: [
      { big: "~15 hrs", what: "back every week", from: "About 30 leads a week, no longer handled by hand", href: "/case-studies/lead-sales-engine", hrefLabel: "the Lead Sales Engine" },
      { big: "~6 hrs", what: "of CRM updates, gone", from: "Every real email and meeting logs itself", href: "/case-studies/crm-that-fills-itself-in", hrefLabel: "the CRM That Fills Itself In" },
      { big: "0", what: "leads sold twice since launch", from: "Payment, delivery, and \"sold\" status kept in lockstep across five tools", href: "/case-studies/lead-sales-engine", hrefLabel: "see how" },
    ],
    beforeAfter: {
      eyebrow: "Monday morning, two ways",
      title: "What changes when the handoffs run themselves?",
      intro: "Drag the handle. Same leads, same Monday.",
      before: {
        time: "Monday 8:15 AM",
        pills: ["12 leads waiting", "3 contractors asking \"is this one still available?\""],
        table: {
          title: "Leads tracker (shared).xlsx",
          head: ["Lead", "Contractor", "Status"],
          rows: [
            { cells: ["123 Oak St", "Rivera Roofing", "Pitched?"], status: "bad" },
            { cells: ["47 Elm Ave", "Tri-County LLC", "Paid"] },
            { cells: ["9 Birch Rd", "Rivera Roofing", "??"], status: "bad" },
            { cells: ["210 Maple Dr", "Tri-County LLC", "Sold"] },
          ],
          footer: { cells: ["12 leads", "2 unclear", ""], status: "bad" },
        },
        aside: { kind: "note", text: "Did we already text this one to Rivera?" },
      },
      after: {
        time: "Monday 8:15 AM",
        pills: ["0 leads waiting on a person", "Contractors get a text the moment a lead is ready"],
        table: {
          title: "Today: pipeline running live",
          head: ["Lead", "Contractor", "Status"],
          rows: [
            { cells: ["123 Oak St", "Rivera Roofing", "Pitched"], status: "ok" },
            { cells: ["47 Elm Ave", "Tri-County LLC", "Sold"], status: "ok" },
            { cells: ["9 Birch Rd", "Rivera Roofing", "Pitched"], status: "ok" },
            { cells: ["210 Maple Dr", "Tri-County LLC", "Sold"], status: "ok" },
          ],
        },
        aside: { kind: "message", channel: "#leads", topic: "Lead pipeline", text: "210 Maple Dr sold to Tri-County LLC. Marked sold everywhere.", actions: ["View receipt", "Open lead"] },
      },
      table: [
        { row: "Who tracks status", before: "Whoever remembers to update the spreadsheet", after: "n8n updates every tool the moment something changes" },
        { row: "Selling a lead twice", before: "Happens, then someone issues a refund", after: "Marked sold everywhere the instant payment clears" },
        { row: "Contractors waiting", before: "Text, email, or a phone call, whenever someone gets to it", after: "A text goes out the second a lead is ready" },
        { row: "Your team's time", before: "Chasing status across a spreadsheet and three group chats", after: "Checking the alerts n8n sends when something needs a person" },
      ],
    },
    steps: {
      eyebrow: "How it works",
      title: "How does an n8n build actually happen?",
      items: [
        { title: "Map", body: "We look at every app your process touches and where a person currently has to bridge the gap between them.", tools: ["Your current tools", "Interviews"] },
        { title: "Build the workflow", body: "Triggers, branches, and actions go in n8n, tested step by step against your real data before anything goes live.", tools: ["n8n"] },
        { title: "Add AI where it earns its place", body: "Where a plain rule can't do the job, like reading a messy note, we call an AI model for that one step. Neither of our two published n8n builds needed it.", tools: ["OpenAI", "Claude"], ai: true },
        { title: "Test in a safe copy", body: "The workflow runs against a copy of your real data first, so the first live run isn't the first real test.", tools: ["Staging data"] },
        { title: "Hand off", body: "You get the n8n account, workflow files, error alerts, docs, and a video walkthrough.", tools: ["Docs", "Video walkthroughs"] },
      ],
      checkpointAfter: 4,
      checkpointLabel: "You approve the workflow before it touches real data",
      human: ["Approving what a workflow flags", "Reading failure alerts", "App logins and access", "Saying when a process changed", "Anything client-facing"],
    },
    bento: {
      eyebrow: "What we build",
      title: "What does an n8n workflow usually handle?",
      intro: "Most builds combine a few of these pieces, wired to the apps you already use.",
      tiles: [
        {
          verb: "Route",
          title: "Lead routing and CRM updates",
          body: "New leads and contacts get logged, matched, and routed without anyone opening a spreadsheet.",
          preview: {
            type: "table",
            head: ["Lead", "Matched to", "Logged at", "Status"],
            rows: [
              { cells: ["Jordan Price", "Ridge Supply Co", "0.4s"], status: "Logged", ok: true },
              { cells: ["Unknown sender", "Matched by domain", "0.6s"], status: "Logged", ok: true },
              { cells: ["Newsletter", "Filtered out", "n/a"], status: "Ignored", ok: false },
            ],
            note: "Example · noise filtered before it reaches the CRM",
          },
        },
        { verb: "Automate", title: "Payment-triggered delivery", body: "The moment payment clears, the rest of the workflow runs on its own.", preview: { type: "txns", rows: [["Payment received", "Lead #4471"], ["Marked sold", "Everywhere"], ["Contractor notified", "Instant"]] } },
        { verb: "Prove it", title: "Locked previews", preview: { type: "receipt", amount: "Blacked out", label: "contact details hidden until payment clears" } },
        { verb: "Generate", title: "Documents built on the fly", preview: { type: "pdf", title: "LEAD TEASER", pages: "Built and sent the moment a lead is ready" } },
        { verb: "Remind", title: "Scheduled follow-ups", preview: { type: "calendar", highlight: 7, reminder: "Reminder: no reply after 7 days, escalate" } },
        { verb: "Backfill", title: "Years of history, synced once", preview: { type: "counter", from: 4218, label: "old emails and meetings synced, no duplicates" } },
      ],
    },
    estimator: {
      eyebrow: "Your numbers",
      title: "What are manual handoffs costing you?",
      intro: "Move the sliders to match your week.",
      unit: "handoffs",
      inputs: [
        { id: "docs", label: "Handoffs between apps per day", min: 5, max: 150, step: 5, value: 30 },
        { id: "min", label: "Minutes lost per handoff, checking or re-entering", min: 1, max: 15, step: 1, value: 4 },
        { id: "days", label: "Working days per week", min: 1, max: 7, step: 1, value: 5 },
        { id: "rate", label: "Hourly cost of that time", min: 15, max: 150, step: 5, value: 35, hint: "Wages plus overhead, or your own hourly value", format: "money" },
        { id: "flag", label: "Share still needing a person to double check", min: 0, max: 50, step: 5, value: 10, format: "percent" },
        { id: "rev", label: "Minutes to check one of those", min: 1, max: 10, step: 1, value: 2 },
      ],
      worth: ["Worth it once three or more apps are involved", "When the process needs real branching logic, not just a straight line", "When it runs often enough that a person checking in is the bottleneck"],
    },
    proof: {
      featured: {
        slug: "lead-sales-engine",
        big: "~15 hrs",
        bigLabel: "saved every week, with leads never sold twice since launch",
        title: "The Lead Sales Engine That Runs Itself",
        before: "Every lead meant looking up the homeowner by hand, texting contractors one at a time, and occasionally selling the same lead twice.",
        after: "New leads are found, pitched to contractors automatically, and marked sold the instant payment clears, so it can never go out twice.",
        chips: ["Real estate", "n8n", "Twilio", "Stripe"],
        caption: "Illustration of the locked lead preview",
      },
      more: [{ slug: "crm-that-fills-itself-in", big: "~6 hrs", title: "The CRM That Fills Itself In", detail: "saved weekly · n8n, Airtable, Gmail" }],
    },
    stack: {
      title: "Built on the tools you already pay for",
      intro: "n8n connects to almost anything with an API. Here's what shows up most in our builds.",
      center: "Your workflows",
      tools: ["Airtable", "Gmail", "Google Calendar", "Google Sheets", "Twilio", "Stripe", "PDFMonkey", "HubSpot", "Slack", "OpenAI", "Claude"],
      links: [
        { label: "Airtable", href: "/integrations/airtable" },
        { label: "Zapier", href: "/integrations/zapier" },
        { label: "Data Entry Automation", href: "/services/data-entry-automation" },
      ],
    },
    faq: {
      title: "Questions owners ask about n8n",
      items: [
        {
          q: "What is n8n used for?",
          a: "n8n is a workflow automation platform used to connect business apps and run multi-step processes without manual work, things like logging emails to a CRM, routing new leads, generating documents, or sending alerts. Workflows can branch on conditions, run custom code, and call AI models where a step needs it.",
        },
        {
          q: "Is n8n free?",
          a: "n8n has a free, self-hosted Community edition that includes most features, but your business provides and maintains the server. n8n Cloud is a paid, fully managed service billed by workflow execution, where one execution is a single run of a whole workflow no matter how many steps it has. Current prices are on n8n's pricing page.",
        },
        {
          q: "Should a small business use n8n Cloud or self-host n8n?",
          a: "n8n Cloud suits most small businesses because n8n handles hosting, updates, and scaling. Self-hosting suits businesses that need full control over where their data lives and have someone to handle updates, backups, and security. Whispers Lab recommends one during the Automation Audit based on the data involved, the budget, and who will maintain it.",
        },
        {
          q: "Can n8n workflows use AI like OpenAI or Claude?",
          a: "Yes. An n8n workflow can send text or documents to an AI model to classify, extract, or summarize, then use the result in later steps. Whispers Lab adds AI only where a plain rule can't do the job, because rules are cheaper and more predictable. Neither of our two published n8n builds needed AI.",
        },
        {
          q: "Who maintains n8n workflows after they're built?",
          a: "After a Whispers Lab build, you get documentation, video walkthroughs, and an error workflow that alerts a named person when a run fails. Businesses that want ongoing monitoring, fixes, and a new workflow added each month can use the AI Growth Partner plan at $500 a month.",
        },
        {
          q: "How much does it cost to have n8n workflows built?",
          a: "Whispers Lab starts with a $250 Automation Audit that maps which workflows are worth building. Builds are quoted as a fixed price with no hourly billing, and the $250 is credited toward the build. n8n's own subscription or server costs are separate and estimated during the Audit.",
        },
      ],
    },
    cta: {
      title: "Find out which of your workflows belong in n8n.",
      body: "In 7 days, the Automation Audit maps your processes and hands you a build plan you keep either way. Build it with us and the $250 is credited.",
    },
    related: {
      industries: ["/industries/real-estate", "/industries/property-management", "/industries/accounting-bookkeeping"],
      posts: ["real-estate-lead-follow-up-automation"],
    },
  },
  {
    slug: "zapier",
    tool: { name: "Zapier", url: "https://zapier.com" },
    seo: {
      title: "Zapier Consultant for Small Businesses | Whispers Lab",
      description:
        "Whispers Lab builds Zapier workflows for small businesses: two-way syncs, branded quotes, and clean handoffs between the apps you already pay for.",
      keyword: "zapier consultant",
    },
    hero: {
      eyebrow: "Integration · Zapier",
      title: "Zapier consultants for teams",
      highlight: "done retyping the same record twice.",
      answer:
        "Whispers Lab builds Zapier workflows, called Zaps, that keep your apps in sync: a new customer in one tool becomes a new customer everywhere else, without anyone copying a field by hand. We build multi-step Zaps, add safeguards so two systems never loop on each other, and hand over workflows your team owns.",
      secondaryCta: { label: "See what a Zapier build includes", href: "#includes" },
    },
    simulator: [
      {
        key: "sync",
        tab: "New customer syncs",
        source: "Operations app",
        sourceIcon: "O",
        doc: { title: "NEW CUSTOMER", rows: [["Name", "Ridge Supply Co"], ["Email", "ap@ridgesupply.com"]], lines: 2 },
        steps: [
          { t: "0.0s", text: "<b>New customer created</b> in the operations app" },
          { t: "0.4s", text: "<b>Mirrored</b> into Xero automatically" },
          { t: "0.7s", text: "<b>Circuit breaker checked</b>: this update won't bounce back and forth" },
          { t: "1.0s", text: "<b>Synced</b>, both systems now match" },
        ],
        out: { k: "Customer synced", v: "0 records typed twice", s: "Both systems match, nothing re-triggers the other" },
      },
      {
        key: "quote",
        tab: "Quote gets accepted",
        source: "Operations app",
        sourceIcon: "Q",
        doc: { title: "NEW QUOTE", rows: [["Client", "Metro Fuel"], ["Amount", "$4,200"]], lines: 2 },
        steps: [
          { t: "0.0s", text: "<b>Quote ready</b> to send" },
          { t: "0.3s", text: "<b>Branded PDF built</b>, no login wall" },
          { t: "0.6s", text: "<b>Emailed</b> straight to the client's inbox" },
          { t: "1.0s", text: "<b>Client clicks Accept</b>" },
          { t: "1.3s", text: "<b>Both systems update</b> at the same instant" },
        ],
        out: { k: "Quote accepted", v: "1 click, 2 systems updated", s: "No login and no separate follow-up needed" },
      },
    ],
    values: [
      { big: "~10 hrs", what: "saved every week on manual entry", from: "Customers and invoices stay in sync without anyone retyping them", href: "/case-studies/zero-double-entry-financial-pipeline", hrefLabel: "the Zero Double-Entry Financial Pipeline" },
      { big: "0", what: "records typed twice", from: "A safeguard stops the two systems from endlessly correcting each other", href: "/case-studies/zero-double-entry-financial-pipeline", hrefLabel: "see how" },
      { big: "100", what: "tasks a month, free", from: "Zapier's own Free plan, no subscription needed to start", href: "#faq", hrefLabel: "how task billing works" },
    ],
    beforeAfter: {
      eyebrow: "End of month, two ways",
      title: "What changes when your apps stop needing a translator?",
      intro: "Drag the handle. Same invoices, same closing day.",
      before: {
        time: "Friday 4:50 PM",
        pills: ["18 customers to re-enter", "Quotes sitting unopened behind a login wall"],
        table: {
          title: "New customers (ops app export).csv",
          head: ["Customer", "In Xero?", "Quote"],
          rows: [
            { cells: ["Ridge Supply Co", "No", "Sent, unopened"], status: "bad" },
            { cells: ["Metro Fuel", "Yes", "Accepted"] },
            { cells: ["Harbor Electric", "No", "Sent, unopened"], status: "bad" },
            { cells: ["Northside Plumbing", "Yes", "Accepted"] },
          ],
          footer: { cells: ["18 customers", "2 still missing", ""], status: "bad" },
        },
        aside: { kind: "note", text: "Did anyone add Ridge Supply to Xero yet?" },
      },
      after: {
        time: "Friday 4:50 PM",
        pills: ["0 customers to re-enter", "Quotes accepted with one click, no login"],
        table: {
          title: "Today: synced automatically",
          head: ["Customer", "In Xero?", "Quote"],
          rows: [
            { cells: ["Ridge Supply Co", "Yes", "Accepted"], status: "ok" },
            { cells: ["Metro Fuel", "Yes", "Accepted"], status: "ok" },
            { cells: ["Harbor Electric", "Yes", "Accepted"], status: "ok" },
            { cells: ["Northside Plumbing", "Yes", "Accepted"], status: "ok" },
          ],
        },
        aside: { kind: "message", channel: "#finance", topic: "Customer sync", text: "Ridge Supply Co synced to Xero and accepted their quote. Nothing to check.", actions: ["View record", "Open in Xero"] },
      },
      table: [
        { row: "New customers", before: "Built once, then rebuilt by hand in accounting", after: "Mirrored automatically, both systems match" },
        { row: "Quotes", before: "Behind a login wall, plenty never opened", after: "A branded PDF straight to the inbox, one click to accept" },
        { row: "Risk of double entry", before: "Happens most weeks", after: "A safeguard stops the two systems looping on each other" },
        { row: "Your team's time", before: "Retyping the same record in two places", after: "Checking the rare Zap that needs a person" },
      ],
    },
    steps: {
      eyebrow: "How it works",
      title: "How does a Zapier build actually happen?",
      items: [
        { title: "Map", body: "We look at which apps hold the same information twice, and where a person currently has to copy it by hand.", tools: ["Your current tools", "Interviews"] },
        { title: "Build the Zap", body: "Triggers and multi-step actions go in Zapier, with a safeguard so two connected systems never loop on each other.", tools: ["Zapier"] },
        { title: "Test in a safe copy", body: "The Zap runs against a copy of your real data first, so the first live run isn't the first real test.", tools: ["Staging data"] },
        { title: "Hand off", body: "You get the Zapier account, documentation, error alerts, and a video walkthrough.", tools: ["Docs", "Video walkthroughs"] },
      ],
      checkpointAfter: 3,
      checkpointLabel: "You approve the Zap before it touches real data",
      human: ["Approving what a Zap flags", "Reading failure alerts", "App logins and access", "Saying when a process changed", "Anything client-facing"],
    },
    bento: {
      eyebrow: "What we build",
      title: "What does a Zapier workflow usually handle?",
      intro: "Most builds combine a few of these pieces, wired to the apps you already use.",
      tiles: [
        {
          verb: "Sync",
          title: "Two-way customer and invoice sync",
          body: "A record created in one app mirrors into the other, with a safeguard so they never loop.",
          preview: {
            type: "table",
            head: ["Customer", "In Xero?", "Quote", "Status"],
            rows: [
              { cells: ["Ridge Supply Co", "Yes", "Accepted"], status: "Synced", ok: true },
              { cells: ["Metro Fuel", "Yes", "Accepted"], status: "Synced", ok: true },
              { cells: ["New signup", "Pending", "Sent"], status: "Syncing", ok: false },
            ],
            note: "Example · both systems match within seconds",
          },
        },
        { verb: "Automate", title: "Quote to accept, in one click", body: "A branded PDF goes out, and one click updates every connected system.", preview: { type: "txns", rows: [["Quote sent", "Metro Fuel"], ["Quote accepted", "1 click"], ["Xero updated", "Instant"]] } },
        { verb: "Bill by task", title: "No surprise per-Zap pricing", preview: { type: "receipt", amount: "100/mo", label: "tasks included on Zapier's Free plan" } },
        { verb: "Generate", title: "Branded documents, no login wall", preview: { type: "pdf", title: "QUOTE #4471", pages: "Built and emailed the moment it's ready" } },
        { verb: "Remind", title: "Follow-ups that don't rely on memory", preview: { type: "calendar", highlight: 5, reminder: "Reminder: quote unopened after 5 days" } },
        { verb: "Untangle", title: "Duplicate records, cleared once", preview: { type: "counter", from: 246, label: "duplicate customer records merged, one time" } },
      ],
    },
    estimator: {
      eyebrow: "Your numbers",
      title: "What is double entry costing you?",
      intro: "Move the sliders to match your week.",
      unit: "records",
      inputs: [
        { id: "docs", label: "Records typed into a second system per day", min: 5, max: 100, step: 5, value: 20 },
        { id: "min", label: "Minutes to retype each one", min: 1, max: 15, step: 1, value: 4 },
        { id: "days", label: "Working days per week", min: 1, max: 7, step: 1, value: 5 },
        { id: "rate", label: "Hourly cost of that time", min: 15, max: 150, step: 5, value: 35, hint: "Wages plus overhead, or your own hourly value", format: "money" },
        { id: "flag", label: "Share still needing a person to double check", min: 0, max: 50, step: 5, value: 10, format: "percent" },
        { id: "rev", label: "Minutes to check one of those", min: 1, max: 10, step: 1, value: 2 },
      ],
      worth: ["Worth it once the same record lives in two systems", "When quotes or invoices sit behind a login wall customers skip", "When a Zap replaces a person copying fields between tabs"],
    },
    proof: {
      featured: {
        slug: "zero-double-entry-financial-pipeline",
        big: "~10 hrs",
        bigLabel: "saved every week, with zero records typed twice",
        title: "The Zero Double-Entry Financial Pipeline",
        before: "Every customer and invoice was built once, then rebuilt by hand in the accounting system. Quotes hit a login wall, so plenty went unread.",
        after: "Customers and invoices sync both ways automatically, and quotes go out as branded PDFs with a one-click Accept button.",
        chips: ["Professional services", "Zapier", "Xero"],
        caption: "Illustration of the one-click quote acceptance",
      },
      more: [],
    },
    stack: {
      title: "Built on the tools you already pay for",
      intro: "Zapier connects to thousands of apps. Here's what shows up most in our builds.",
      center: "Your Zaps",
      tools: ["Xero", "QuickBooks", "Resend", "Gmail", "Google Sheets", "HubSpot", "Slack", "Stripe"],
      links: [
        { label: "Airtable", href: "/integrations/airtable" },
        { label: "n8n", href: "/integrations/n8n" },
        { label: "Software Integration Services", href: "/services/software-integration-services" },
      ],
    },
    faq: {
      title: "Questions owners ask about Zapier",
      items: [
        {
          q: "What is Zapier used for?",
          a: "Zapier connects business apps so information moves between them without anyone copying it by hand. A workflow, called a Zap, starts with a trigger in one app and runs one or more actions in others, like creating a record, sending an email, or updating a spreadsheet. Most Zaps need no code to build.",
        },
        {
          q: "Is Zapier free?",
          a: "Zapier has a free plan that includes 100 tasks a month and unlimited Zaps, but each Zap on the free plan is limited to one trigger and one action. Multi-step Zaps, more tasks, and faster checks for new triggers need a paid plan. Whispers Lab sizes the right plan during the Automation Audit.",
        },
        {
          q: "How does Zapier pricing work?",
          a: "Zapier bills by task, not by Zap. A task is counted each time Zapier completes one unit of work, so a single Zap can use several tasks depending on how many actions it runs. You choose a monthly task allowance and pay monthly or annually.",
        },
        {
          q: "Should I use Zapier or n8n?",
          a: "Zapier is usually faster to set up for simpler, app-to-app workflows and has the widest range of ready-made app connections. n8n handles more complex branching logic and can run on your own server if your data needs to stay there. Whispers Lab recommends one during the Automation Audit based on the actual workflow, not a fixed preference.",
        },
        {
          q: "Who maintains Zaps after they're built?",
          a: "After a Whispers Lab build, you get documentation, a video walkthrough, and alerts sent to a named person when a Zap fails. Businesses that want ongoing monitoring, fixes, and a new workflow added each month can use the AI Growth Partner plan at $500 a month.",
        },
        {
          q: "How much does it cost to have Zapier workflows built?",
          a: "Whispers Lab starts with a $250 Automation Audit that maps which workflows are worth building. Builds are quoted as a fixed price with no hourly billing, and the $250 is credited toward the build. Zapier's own subscription cost is separate and estimated during the Audit.",
        },
      ],
    },
    cta: {
      title: "Find out which of your apps should be talking to each other.",
      body: "In 7 days, the Automation Audit maps your processes and hands you a build plan you keep either way. Build it with us and the $250 is credited.",
    },
    related: {
      industries: ["/industries/accounting-bookkeeping", "/industries/real-estate", "/industries/ecommerce-retail"],
      posts: ["accounting-workflow-automation-tasks-to-fix-first"],
    },
  },
];

export function getIntegration(slug: string): IntegrationPage | undefined {
  return INTEGRATIONS.find((i) => i.slug === slug);
}
