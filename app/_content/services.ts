// Content for /services/[slug] pages. Each page is a list of typed sections
// rendered by app/services/[slug]/page.tsx. Shapes mirror the planned Strapi
// schema so this can move to the CMS later without redesigning pages.
//
// House rules for copy: plain words (grade 6 to 8), no em dashes, no hype,
// no "AI agents", and only numbers that come from published case studies.

export type SimStep = { t: string; text: string; flag?: boolean };
export type SimMode = {
  key: string;
  tab: string;
  source: string;
  sourceIcon: string;
  doc: { title: string; rows: [string, string][]; photos?: number; lines?: number };
  steps: SimStep[];
  out: { k: string; v: string; s: string };
};

export type BaRow = { cells: string[]; status?: "bad" | "ok" };
export type BaSide = {
  time: string;
  pills: string[];
  table: { title: string; head: string[]; rows: BaRow[]; footer?: BaRow };
  aside: { kind: "mail"; title: string; items: { from: string; subject: string }[] } | { kind: "note"; text: string } | { kind: "message"; channel: string; text: string; actions: string[] };
};

export type BentoPreview =
  | { type: "table"; head: string[]; rows: { cells: string[]; status: string; ok: boolean }[]; note?: string }
  | { type: "txns"; rows: [string, string][] }
  | { type: "receipt"; amount: string; label: string }
  | { type: "pdf"; title: string; pages: string }
  | { type: "calendar"; highlight: number; reminder: string }
  | { type: "counter"; from: number; label: string };
export type BentoTile = { verb: string; title: string; body?: string; preview: BentoPreview };

export type EstimatorInput = { id: string; label: string; min: number; max: number; step: number; value: number; hint?: string; format?: "money" | "percent" };

export type ServicePage = {
  slug: string;
  seo: { title: string; description: string; keyword: string };
  hero: { eyebrow: string; title: string; highlight: string; answer: string; secondaryCta: { label: string; href: string } };
  simulator: SimMode[];
  values: { big: string; what: string; from: string; href: string; hrefLabel: string }[];
  beforeAfter: { eyebrow: string; title: string; intro: string; before: BaSide; after: BaSide; table: { row: string; before: string; after: string }[] };
  steps: { eyebrow: string; title: string; items: { title: string; body: string; tools: string[]; ai?: boolean }[]; checkpointAfter: number; checkpointLabel: string; human: string[] };
  bento: { eyebrow: string; title: string; intro: string; tiles: BentoTile[] };
  estimator: {
    eyebrow: string;
    title: string;
    intro: string;
    inputs: EstimatorInput[];
    worth: string[];
  };
  proof: {
    featured: { slug: string; big: string; bigLabel: string; title: string; before: string; after: string; chips: string[]; caption: string };
    more: { slug: string; big: string; title: string; detail: string }[];
  };
  stack: { title: string; intro: string; center: string; tools: string[]; links: { label: string; href: string }[] };
  faq: { title: string; items: { q: string; a: string }[] };
  cta: { title: string; body: string };
  related: { industries: string[]; posts: string[] };
};

export const SERVICES: ServicePage[] = [
  {
    slug: "data-entry-automation",
    seo: {
      title: "Data Entry Automation for Small Businesses | Whispers Lab",
      description:
        "Stop retyping invoices, statements, and forms. We build data entry automation that reads your documents, files the data in your tools, and flags what needs a person.",
      keyword: "data entry automation",
    },
    hero: {
      eyebrow: "Service · Data entry automation",
      title: "Data entry automation for teams that are",
      highlight: "done retyping.",
      answer:
        "Data entry automation reads the invoices, bank statements, and forms your team types in by hand, pulls out the details you need, and files them in the tools you already use. A person only checks the few items the system flags. We build it around your documents in under 30 days.",
      secondaryCta: { label: "Estimate your hours", href: "#estimate" },
    },
    simulator: [
      {
        key: "read",
        tab: "Read an invoice",
        source: "ap@yourbusiness.com",
        sourceIcon: "@",
        doc: { title: "INVOICE", rows: [["Northside Plumbing Supply", "INV-20417"], ["Total", "$1,284.50"]], lines: 3 },
        steps: [
          { t: "0.0s", text: "<b>Received</b> from the accounts inbox" },
          { t: "0.9s", text: "<b>Read 9 fields</b>: vendor, dates, 4 line items, tax, total" },
          { t: "1.3s", text: "<b>Checked</b>: line items match the total, vendor is on file" },
          { t: "1.4s", text: "<b>PO number missing</b>, sent to Dana to confirm", flag: true },
          { t: "1.6s", text: "<b>Filed</b> in Xero as a draft bill, PDF attached" },
        ],
        out: { k: "Draft bill created", v: "$1,284.50 · due Oct 3", s: "1 field waiting for review" },
      },
      {
        key: "create",
        tab: "Build a report",
        source: "Mobile inspection form",
        sourceIcon: "F",
        doc: { title: "SITE VISIT", rows: [["38 photos", "12 notes"]], photos: 8, lines: 1 },
        steps: [
          { t: "0.0s", text: "<b>Form submitted</b> on site" },
          { t: "0.6s", text: "<b>Collected</b> 38 photos and 12 notes" },
          { t: "1.9s", text: "<b>Built the report</b> from your template, photos in a grid" },
          { t: "2.4s", text: "<b>Saved</b> a 7-page PDF to the client folder" },
          { t: "2.5s", text: "<b>Emailed</b> the report to the client" },
        ],
        out: { k: "Report ready", v: "7 pages · 38 photos placed", s: "Nobody touched a layout tool" },
      },
    ],
    values: [
      { big: "~15 hrs", what: "back every week", from: "About 40 statements a day, no longer typed by hand", href: "/case-studies/financial-document-reader", hrefLabel: "Financial Document Reader" },
      { big: "~4 hrs", what: "saved on every report", from: "38+ photos laid out automatically, every time", href: "/case-studies/inspection-report-writes-itself", hrefLabel: "Inspection Report build" },
      { big: "1 upload", what: "clears every empty location", from: "No more removing records one at a time", href: "/case-studies/self-cleaning-warehouse-system", hrefLabel: "Self-Cleaning Warehouse" },
    ],
    beforeAfter: {
      eyebrow: "Friday afternoon, two ways",
      title: "What changes when your data enters itself?",
      intro: "Drag the handle. Same documents, same people, same Friday.",
      before: {
        time: "Friday 6:40 PM",
        pills: ["To enter: 47 files", "3 emails asking \"did you get my invoice?\""],
        table: {
          title: "AP spreadsheet (v7 FINAL)",
          head: ["Vendor", "Due", "Total"],
          rows: [
            { cells: ["Northside Plumbing", "10/03", "1,284.50"] },
            { cells: ["Harbor Electric", "??", "612.00"], status: "bad" },
            { cells: ["Ridge Supply Co", "09/28", "1,971.00"], status: "bad" },
            { cells: ["Metro Fuel", "09/30", "418.75"] },
          ],
          footer: { cells: ["Sum", "", "off by $90"], status: "bad" },
        },
        aside: { kind: "note", text: "Ask Sam which total is right??" },
      },
      after: {
        time: "Friday 3:05 PM",
        pills: ["To enter: 0", "Vendors get a receipt automatically"],
        table: {
          title: "Today: 46 filed automatically",
          head: ["Vendor", "Due", "Status"],
          rows: [
            { cells: ["Northside Plumbing", "10/03", "Review"], status: "bad" },
            { cells: ["Harbor Electric", "10/06", "Filed"], status: "ok" },
            { cells: ["Ridge Supply Co", "09/28", "Filed"], status: "ok" },
            { cells: ["Metro Fuel", "09/30", "Filed"], status: "ok" },
          ],
        },
        aside: { kind: "message", channel: "#finance", text: "INV-20417 is missing a PO number. Everything else checked out.", actions: ["Approve", "Fix"] },
      },
      table: [
        { row: "Typing", before: "Someone retypes every field", after: "Fields are read and filed for you" },
        { row: "Mistakes", before: "Found at month end, if at all", after: "Checked as soon as the document arrives" },
        { row: "Reports and letters", before: "Built by hand from a template", after: "Created the moment the form is sent" },
        { row: "Your team's time", before: "Typing and chasing", after: "Checking the few flagged items" },
      ],
    },
    steps: {
      eyebrow: "How it works",
      title: "How does data entry automation work?",
      items: [
        { title: "Collect", body: "Documents arrive the way they do now: email, a shared folder, a phone photo, or a form.", tools: ["Gmail", "Google Drive", "Forms"] },
        { title: "Read", body: "AI pulls out the exact details you use, in the same format every time. It reads. It doesn't guess.", tools: ["OpenAI", "Claude"], ai: true },
        { title: "Check", body: "Simple rules test the result: totals add up, the vendor is known, the date makes sense.", tools: ["Rules you approve"] },
        { title: "File", body: "Clean data lands in your system with a link to the original. Anything unsure waits for a person.", tools: ["Xero", "QuickBooks", "Airtable"] },
      ],
      checkpointAfter: 3,
      checkpointLabel: "Only flagged items stop here",
      human: ["Approving payments", "Anything flagged as unsure", "Vendor disputes", "Tax treatment of odd items", "Deciding when a number looks wrong"],
    },
    bento: {
      eyebrow: "What it handles",
      title: "Which documents can be automated?",
      intro: "If your team reads the same kind of document the same way every week, it can usually be automated.",
      tiles: [
        {
          verb: "Read",
          title: "Invoices and bills",
          body: "Vendor, dates, line items, tax, and total, checked and filed as draft bills.",
          preview: {
            type: "table",
            head: ["Vendor", "Due", "Total", "Status"],
            rows: [
              { cells: ["Northside Plumbing", "Oct 3", "$1,284.50"], status: "Review", ok: false },
              { cells: ["Harbor Electric", "Oct 6", "$612.00"], status: "Filed", ok: true },
              { cells: ["Ridge Supply Co", "Sep 28", "$1,971.00"], status: "Filed", ok: true },
            ],
            note: "Example · lands in Xero or QuickBooks",
          },
        },
        { verb: "Read", title: "Bank statements", preview: { type: "txns", rows: [["Metro Fuel", "-64.20"], ["Stripe payout", "+2,410.00"], ["Office lease", "-3,200.00"]] } },
        { verb: "Read", title: "Receipts", preview: { type: "receipt", amount: "$42.18", label: "Fuel · Truck 2" } },
        { verb: "Create", title: "Reports from forms", body: "A form with notes and photos becomes a finished PDF in your layout.", preview: { type: "pdf", title: "Site Inspection Report", pages: "Page 1 of 7 · built on submit" } },
        { verb: "Read + remind", title: "Contracts and renewals", body: "Names, dates, and terms pulled out, with a reminder before anything renews.", preview: { type: "calendar", highlight: 12, reminder: "Reminder: office lease renews in 30 days" } },
        { verb: "Tidy", title: "File cleanup", preview: { type: "counter", from: 3214, label: "leftover files, cleared in batches" } },
      ],
    },
    estimator: {
      eyebrow: "Your numbers",
      title: "What is retyping costing you?",
      intro: "Move the sliders to match your week. The starting numbers come from one of our real builds.",
      inputs: [
        { id: "docs", label: "Documents per day", min: 5, max: 200, step: 5, value: 40 },
        { id: "min", label: "Minutes to type each one", min: 1, max: 15, step: 1, value: 4 },
        { id: "days", label: "Working days per week", min: 1, max: 7, step: 1, value: 5 },
        { id: "rate", label: "Hourly cost of that time", min: 15, max: 150, step: 5, value: 35, hint: "Wages plus overhead, or your own hourly value", format: "money" },
        { id: "flag", label: "Share flagged for a person to check", min: 0, max: 50, step: 5, value: 10, format: "percent" },
        { id: "rev", label: "Minutes to check a flagged item", min: 1, max: 10, step: 1, value: 3 },
      ],
      worth: ["Worth it when the same documents show up every week", "When the data already ends up in a tool", "When checking beats typing"],
    },
    proof: {
      featured: {
        slug: "financial-document-reader",
        big: "~15 hrs",
        bigLabel: "saved every week, with no manual data entry left",
        title: "The Financial Document Reader",
        before: "An old scanner pulled numbers from bank statements, and someone still checked its work by hand.",
        after: "An AI reader pulls out every transaction in a fixed format, and each client's data stays walled off.",
        chips: ["Financial services SaaS", "OpenAI", "Supabase"],
        caption: "Illustration of the extracted transactions view",
      },
      more: [
        { slug: "inspection-report-writes-itself", big: "~4 hrs", title: "The Inspection Report That Writes Itself", detail: "saved per report · Make.com, Documint, Jotform" },
        { slug: "self-cleaning-warehouse-system", big: "~3 hrs", title: "The Self-Cleaning Warehouse System", detail: "saved weekly on cleanup · Make.com, Google Drive" },
      ],
    },
    stack: {
      title: "Built on the tools you already pay for",
      intro: "We connect what you already have instead of adding another subscription. If a tool can connect to other apps, it can usually join the workflow.",
      center: "Your documents",
      tools: ["Gmail", "Google Drive", "Jotform", "Xero", "QuickBooks", "Airtable", "Supabase", "OpenAI", "Claude", "n8n", "Make.com", "HubSpot"],
      links: [
        { label: "Airtable", href: "/integrations/airtable" },
        { label: "n8n", href: "/integrations/n8n" },
        { label: "Zapier", href: "/integrations/zapier" },
      ],
    },
    faq: {
      title: "Questions owners ask first",
      items: [
        {
          q: "What is data entry automation?",
          a: "Data entry automation is software that moves information from documents into your systems without anyone typing it. It reads invoices, bank statements, receipts, and forms, pulls out details like names, dates, and amounts, and files them in tools such as Xero, QuickBooks, or Airtable. A good setup checks its own work and sends anything unsure to a person.",
        },
        {
          q: "How much does data entry automation cost for a small business?",
          a: "At Whispers Lab it starts with a $250 Automation Audit that measures which documents take your team the most time. If you go ahead, the build is quoted as a fixed price starting from $2,500, with no hourly billing, and the $250 is credited toward it. Ongoing support and a new workflow each month is available for $500 a month.",
        },
        {
          q: "How long does it take to set up?",
          a: "A data entry automation built in the Whispers Lab Core Build goes live in under 30 days. That includes planning how the data should flow, building and connecting it, testing it on your real documents, and showing your team how to check flagged items.",
        },
        {
          q: "Is it accurate enough for financial documents?",
          a: "Yes, when it is built to be checked. The AI is told exactly which details to return and in what format, simple rules confirm totals and dates, and anything that fails a check goes to a person instead of being filed. In the Financial Document Reader that Whispers Lab built, bank statement transactions come out in the same format every time, which removed manual data entry completely.",
        },
        {
          q: "Will it work with the software we already use?",
          a: "Usually, yes. Data can go into accounting tools like Xero and QuickBooks, into Airtable or Google Sheets, into a CRM like HubSpot, or into your own database. Documents can come from email, shared folders, or forms. The $250 Automation Audit confirms the exact connections before anything is built.",
        },
        {
          q: "Does data entry automation replace admin staff?",
          a: "No. It removes the typing, not the judgment. The people who used to type data spend that time checking flagged items, fixing real problems, and doing work that needs a person, such as approving payments or answering a client's question about a number.",
        },
      ],
    },
    cta: {
      title: "Find out which documents are costing you the most.",
      body: "In 7 days, the Automation Audit maps your document work and hands you a build plan you keep either way. Build it with us and the $250 is credited.",
    },
    related: {
      industries: ["/industries/accounting-bookkeeping", "/industries/law-firms", "/industries/property-management"],
      posts: ["accounting-workflow-automation-tasks-to-fix-first", "ecommerce-product-listing-automation-supplier-feeds"],
    },
  },
];

export function getService(slug: string): ServicePage | undefined {
  return SERVICES.find((s) => s.slug === slug);
}
