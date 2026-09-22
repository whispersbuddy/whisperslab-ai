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
        "Whispers Lab builds Airtable bases and automations for small businesses: CRMs, project trackers, and client databases, used in many of our builds. No certification claimed, just real bases.",
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
            head: ["Lead", "Source", "Status"],
            rows: [
              { cells: ["Jordan Price", "Website form", "New"], status: "New", ok: false },
              { cells: ["Priya Shah", "Referral", "Assigned"], status: "Assigned", ok: true },
              { cells: ["Sam Torres", "Website form", "Assigned"], status: "Assigned", ok: true },
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
];

export function getIntegration(slug: string): IntegrationPage | undefined {
  return INTEGRATIONS.find((i) => i.slug === slug);
}
