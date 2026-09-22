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
  aside:
    | { kind: "mail"; title: string; items: { from: string; subject: string }[] }
    | { kind: "note"; text: string }
    /** `topic` is the small label after the channel name, e.g. "Data entry workflow". Defaults to that for pages that don't set it. */
    | { kind: "message"; channel: string; topic?: string; text: string; actions: string[] };
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
    /** Noun for the first input in the formula sentence, e.g. "docs" or "updates". Defaults to "docs". */
    unit?: string;
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
  {
    slug: "bookkeeping-automation",
    seo: {
      title: "Bookkeeping Automation for Small Businesses | Whispers Lab",
      description:
        "Whispers Lab builds bookkeeping automation: invoices synced, reminders sent, and books that match your bank without anyone retyping a number.",
      keyword: "bookkeeping automation",
    },
    hero: {
      eyebrow: "Service · Bookkeeping automation",
      title: "Bookkeeping automation for books that are",
      highlight: "never behind.",
      answer:
        "Bookkeeping automation keeps your invoices, payments, and bank feed in sync without anyone retyping a number. Customers and invoices mirror between your operations tools and your accounting software automatically, reminders go out on schedule, and a safeguard stops two systems from endlessly correcting each other. We build it around the tools you already use in under 30 days.",
      secondaryCta: { label: "Estimate your hours", href: "#estimate" },
    },
    simulator: [
      {
        key: "sync",
        tab: "Invoice syncs to Xero",
        source: "ops@yourbusiness.com",
        sourceIcon: "@",
        doc: { title: "NEW INVOICE", rows: [["Client", "Ridge Supply Co"], ["Amount", "$1,284.50"]], lines: 2 },
        steps: [
          { t: "0.0s", text: "<b>Created</b> in your operations tool" },
          { t: "0.4s", text: "<b>Mirrored</b> into Xero automatically" },
          { t: "0.8s", text: "<b>Checked</b>: matches the client record already on file" },
          { t: "1.1s", text: "<b>Synced</b>, both systems now match" },
        ],
        out: { k: "Invoice synced", v: "$1,284.50 · Xero updated", s: "0 records typed twice" },
      },
      {
        key: "reminder",
        tab: "Payment reminder goes out",
        source: "Bank feed",
        sourceIcon: "$",
        doc: { title: "INVOICE DUE", rows: [["Client", "Metro Fuel"], ["Due", "3 days"]], lines: 2 },
        steps: [
          { t: "0.0s", text: "<b>Due date approaching</b>, no payment logged yet" },
          { t: "0.5s", text: "<b>Reminder email</b> sent automatically" },
          { t: "0.9s", text: "<b>Bank feed checked</b> the next morning for a match" },
          { t: "1.2s", text: "<b>Marked paid</b> the moment the deposit clears" },
        ],
        out: { k: "Reminder sent", v: "Metro Fuel · $612.00", s: "No one had to remember to chase it" },
      },
    ],
    values: [
      { big: "~10 hrs", what: "saved every week on manual entry", from: "Customers and invoices stay in sync without anyone retyping them", href: "/case-studies/zero-double-entry-financial-pipeline", hrefLabel: "the Zero Double-Entry Financial Pipeline" },
      { big: "~15 hrs", what: "saved every week reading statements", from: "Bank statement transactions come out in the same format every time", href: "/case-studies/financial-document-reader", hrefLabel: "the Financial Document Reader" },
      { big: "0", what: "records typed twice", from: "A safeguard stops the two systems from endlessly correcting each other", href: "/case-studies/zero-double-entry-financial-pipeline", hrefLabel: "see how" },
    ],
    beforeAfter: {
      eyebrow: "Month end, two ways",
      title: "What changes when your books close themselves?",
      intro: "Drag the handle. Same invoices, same month end.",
      before: {
        time: "Month end, 5:45 PM",
        pills: ["23 invoices to reconcile", "2 payments nobody logged"],
        table: {
          title: "Reconciliation (working copy).xlsx",
          head: ["Invoice", "Client", "Status"],
          rows: [
            { cells: ["INV-2041", "Ridge Supply Co", "??"], status: "bad" },
            { cells: ["INV-2039", "Metro Fuel", "Paid"] },
            { cells: ["INV-2037", "Harbor Electric", "??"], status: "bad" },
            { cells: ["INV-2035", "Northside Plumbing", "Paid"] },
          ],
          footer: { cells: ["23 invoices", "2 unmatched", ""], status: "bad" },
        },
        aside: { kind: "note", text: "Did Harbor Electric actually pay this one?" },
      },
      after: {
        time: "Month end, 5:45 PM",
        pills: ["0 invoices to reconcile", "Payments matched to the bank feed automatically"],
        table: {
          title: "Today: books closed",
          head: ["Invoice", "Client", "Status"],
          rows: [
            { cells: ["INV-2041", "Ridge Supply Co", "Paid"], status: "ok" },
            { cells: ["INV-2039", "Metro Fuel", "Paid"], status: "ok" },
            { cells: ["INV-2037", "Harbor Electric", "Paid"], status: "ok" },
            { cells: ["INV-2035", "Northside Plumbing", "Paid"], status: "ok" },
          ],
        },
        aside: { kind: "message", channel: "#finance", topic: "Reconciliation", text: "All 23 invoices matched to the bank feed. Books are closed.", actions: ["Open report", "Review"] },
      },
      table: [
        { row: "Invoices", before: "Built once, then rebuilt by hand in accounting", after: "Mirrored automatically, both systems match" },
        { row: "Payment reminders", before: "Sent when someone remembers", after: "Sent on schedule, every time" },
        { row: "Reconciling the bank feed", before: "Matched by eye at month end", after: "Matched automatically as payments clear" },
        { row: "Your team's time", before: "Retyping and chasing payments", after: "Checking the few invoices that need a person" },
      ],
    },
    steps: {
      eyebrow: "How it works",
      title: "How does bookkeeping automation work?",
      items: [
        { title: "Connect", body: "We connect your operations tools, bank feed, and accounting software so they all read from the same numbers.", tools: ["Xero", "QuickBooks", "Zapier"] },
        { title: "Sync", body: "Invoices and customers mirror between systems automatically, with a safeguard so they never loop on each other.", tools: ["Your accounting software"] },
        { title: "Remind", body: "Payment reminders go out on the schedule you set, and the bank feed is checked for matching deposits.", tools: ["Rules you approve"] },
        { title: "Reconcile", body: "Matched payments close themselves. Anything unsure waits for a person to check.", tools: ["Xero", "QuickBooks"] },
      ],
      checkpointAfter: 3,
      checkpointLabel: "Only unmatched payments stop here",
      human: ["Approving unusual payments", "Anything flagged as unsure", "Client disputes", "Tax treatment of odd items", "Deciding when a number looks wrong"],
    },
    bento: {
      eyebrow: "What it handles",
      title: "Which bookkeeping tasks can be automated?",
      intro: "If the same numbers move between your tools every week, it can usually be automated.",
      tiles: [
        {
          verb: "Sync",
          title: "Invoices and customers",
          body: "Created once, mirrored everywhere, with a safeguard so nothing loops.",
          preview: {
            type: "table",
            head: ["Invoice", "Client", "Amount", "Status"],
            rows: [
              { cells: ["INV-2041", "Ridge Supply Co", "$1,284.50"], status: "Synced", ok: true },
              { cells: ["INV-2039", "Metro Fuel", "$612.00"], status: "Synced", ok: true },
              { cells: ["INV-2037", "Harbor Electric", "$1,971.00"], status: "Review", ok: false },
            ],
            note: "Example · lands in Xero or QuickBooks",
          },
        },
        { verb: "Match", title: "Bank feed reconciliation", preview: { type: "txns", rows: [["Metro Fuel payment", "+$612.00"], ["Office lease", "-$3,200.00"], ["Stripe payout", "+$2,410.00"]] } },
        { verb: "Remind", title: "Payment reminders", preview: { type: "receipt", amount: "$1,284.50", label: "Ridge Supply Co · reminder sent Day 3" } },
        { verb: "Report", title: "Monthly close summary", preview: { type: "pdf", title: "MONTH END REPORT", pages: "Built the moment the books balance" } },
        { verb: "Track", title: "Renewal and due-date reminders", preview: { type: "calendar", highlight: 3, reminder: "Reminder: INV-2041 due in 3 days" } },
        { verb: "Tidy", title: "Backlog cleanup", preview: { type: "counter", from: 412, label: "unmatched transactions cleared, one time" } },
      ],
    },
    estimator: {
      eyebrow: "Your numbers",
      title: "What is manual reconciliation costing you?",
      intro: "Move the sliders to match your month.",
      unit: "invoices",
      inputs: [
        { id: "docs", label: "Invoices or payments handled by hand per day", min: 5, max: 100, step: 5, value: 20 },
        { id: "min", label: "Minutes to enter or match each one", min: 1, max: 15, step: 1, value: 4 },
        { id: "days", label: "Working days per week", min: 1, max: 7, step: 1, value: 5 },
        { id: "rate", label: "Hourly cost of that time", min: 15, max: 150, step: 5, value: 35, hint: "Wages plus overhead, or your own hourly value", format: "money" },
        { id: "flag", label: "Share still needing a person to double check", min: 0, max: 50, step: 5, value: 10, format: "percent" },
        { id: "rev", label: "Minutes to check one of those", min: 1, max: 10, step: 1, value: 3 },
      ],
      worth: ["Worth it once invoices live in more than one system", "When payment reminders get forgotten some weeks", "When month end means reconciling by eye"],
    },
    proof: {
      featured: {
        slug: "zero-double-entry-financial-pipeline",
        big: "~10 hrs",
        bigLabel: "saved every week, with zero records typed twice",
        title: "The Zero Double-Entry Financial Pipeline",
        before: "Every customer and invoice was built once, then rebuilt by hand in the accounting system.",
        after: "Customers and invoices sync both ways automatically, with a safeguard so the two systems never loop on each other.",
        chips: ["Professional services", "Xero", "Zapier"],
        caption: "Illustration of the synced invoice view",
      },
      more: [{ slug: "financial-document-reader", big: "~15 hrs", title: "The Financial Document Reader", detail: "saved weekly · OpenAI, Supabase" }],
    },
    stack: {
      title: "Built on the tools you already pay for",
      intro: "We connect what you already have instead of adding another subscription.",
      center: "Your books",
      tools: ["Xero", "QuickBooks", "Zapier", "Stripe", "Gmail", "Google Sheets", "Airtable"],
      links: [
        { label: "Zapier", href: "/integrations/zapier" },
        { label: "Airtable", href: "/integrations/airtable" },
        { label: "Data Entry Automation", href: "/services/data-entry-automation" },
      ],
    },
    faq: {
      title: "Questions owners ask first",
      items: [
        {
          q: "What is bookkeeping automation?",
          a: "Bookkeeping automation is software that keeps your invoices, customers, and payments in sync across the tools you use, so nobody retypes the same number twice. It mirrors records between your operations tools and your accounting software, sends payment reminders on schedule, and matches payments against your bank feed. Anything unsure waits for a person to check.",
        },
        {
          q: "How much does bookkeeping automation cost for a small business?",
          a: "At Whispers Lab it starts with a $250 Automation Audit that maps which bookkeeping tasks take your team the most time. If you go ahead, the build is quoted as a fixed price starting from $2,500, with no hourly billing, and the $250 is credited toward it. Ongoing support and a new workflow each month is available for $500 a month.",
        },
        {
          q: "Will bookkeeping automation replace my bookkeeper or accountant?",
          a: "No. It removes the retyping and matching, not the judgment. The time that used to go into manual entry and reconciliation goes into checking flagged items, handling client disputes, and decisions that need a person, like how to treat an unusual payment.",
        },
        {
          q: "Does it work with QuickBooks and Xero?",
          a: "Yes. Bookkeeping automation at Whispers Lab is usually built around Xero or QuickBooks, syncing invoices and customers from your other tools and matching payments against your bank feed. The $250 Automation Audit confirms the exact connections before anything is built.",
        },
        {
          q: "How accurate is automated reconciliation?",
          a: "It is as accurate as the rules it checks against. Payments are matched to invoices by simple rules you approve, like amount and date, and anything that does not match cleanly is flagged for a person instead of being marked paid automatically. In the Zero Double-Entry Financial Pipeline that Whispers Lab built, records stopped being typed twice entirely.",
        },
        {
          q: "How long does it take to set up?",
          a: "A bookkeeping automation built in the Whispers Lab Core Build goes live in under 30 days. That includes mapping how your invoices and payments should flow, building and connecting it, testing it against your real bank feed, and showing your team how to check flagged items.",
        },
      ],
    },
    cta: {
      title: "Find out what's costing your books the most time.",
      body: "In 7 days, the Automation Audit maps your bookkeeping work and hands you a build plan you keep either way. Build it with us and the $250 is credited.",
    },
    related: {
      industries: ["/industries/accounting-bookkeeping", "/industries/real-estate", "/industries/property-management"],
      posts: ["accounting-workflow-automation-tasks-to-fix-first"],
    },
  },
  {
    slug: "client-onboarding-automation",
    seo: {
      title: "Client Onboarding Automation | Whispers Lab",
      description:
        "Whispers Lab builds client onboarding automation: self-serve booking, intake forms done on time, and a CRM that updates itself.",
      keyword: "client onboarding automation",
    },
    hero: {
      eyebrow: "Service · Client onboarding automation",
      title: "Client onboarding automation for clients who arrive",
      highlight: "ready, not confused.",
      answer:
        "Client onboarding automation, sometimes called customer onboarding automation, lets new clients book themselves, gets them a meeting link and reminders without anyone touching a keyboard, and updates your CRM the moment they book. A quiet minimum-notice rule gives them time to finish intake forms before the first call. We build it around the tools you already use in under 30 days.",
      secondaryCta: { label: "Estimate your hours", href: "#estimate" },
    },
    simulator: [
      {
        key: "booking",
        tab: "Client books themselves",
        source: "Booking page",
        sourceIcon: "C",
        doc: { title: "NEW BOOKING", rows: [["Client", "Jordan Price"], ["Time", "Thu 2:00 PM"]], lines: 2 },
        steps: [
          { t: "0.0s", text: "<b>Time slot picked</b> from the booking page" },
          { t: "0.4s", text: "<b>Video link created</b> automatically" },
          { t: "0.7s", text: "<b>Minimum-notice rule checked</b>: enough time to finish intake forms" },
          { t: "1.0s", text: "<b>Reminders scheduled</b> ahead of the session" },
          { t: "1.3s", text: "<b>CRM updated</b>, client tagged and session logged" },
        ],
        out: { k: "Client booked", v: "Jordan Price · Thu 2:00 PM", s: "0 emails needed to book" },
      },
      {
        key: "intake",
        tab: "Intake form arrives",
        source: "Intake form",
        sourceIcon: "F",
        doc: { title: "INTAKE FORM", rows: [["Client", "Priya Shah"], ["Submitted", "2 days before session"]], lines: 2 },
        steps: [
          { t: "0.0s", text: "<b>Reminder sent</b> to finish the intake form" },
          { t: "0.5s", text: "<b>Form submitted</b> with 2 days to spare" },
          { t: "0.9s", text: "<b>Answers logged</b> to the client's CRM record" },
          { t: "1.2s", text: "<b>Team notified</b> the client is ready for their session" },
        ],
        out: { k: "Client ready", v: "Priya Shah · forms done", s: "No one chased a missing form" },
      },
    ],
    values: [
      { big: "~5 hrs", what: "saved every week on scheduling", from: "Clients book themselves, no back-and-forth emails", href: "/case-studies/onboarding-pipeline-autopilot", hrefLabel: "the Onboarding Pipeline That Runs on Autopilot" },
      { big: "100%", what: "of clients arrive with intake done", from: "A quiet minimum-notice rule gives them time to finish first", href: "/case-studies/onboarding-pipeline-autopilot", hrefLabel: "see how" },
      { big: "$0", what: "extra software needed", from: "Built on tools the business already paid for", href: "/case-studies/onboarding-pipeline-autopilot", hrefLabel: "the details" },
    ],
    beforeAfter: {
      eyebrow: "New client, two ways",
      title: "What changes when clients book themselves?",
      intro: "Drag the handle. Same new client, same week.",
      before: {
        time: "Tuesday 10:20 AM",
        pills: ["6 emails to find a time", "Client showed up without the intake form"],
        table: {
          title: "Email thread: Ridge Supply intro call",
          head: ["From", "Subject"],
          rows: [
            { cells: ["You", "Does Tuesday work?"] },
            { cells: ["Client", "Can we do Thursday instead?"], status: "bad" },
            { cells: ["You", "Sure, sending a new link"] },
            { cells: ["Client", "What form?"], status: "bad" },
          ],
        },
        aside: { kind: "note", text: "Still waiting on the intake form..." },
      },
      after: {
        time: "Tuesday 10:20 AM",
        pills: ["0 emails needed to book", "Intake form done 2 days early"],
        table: {
          title: "Today: booked in one visit",
          head: ["Step", "Status"],
          rows: [
            { cells: ["Time picked", "Done"], status: "ok" },
            { cells: ["Video link", "Sent"], status: "ok" },
            { cells: ["Reminders", "Scheduled"], status: "ok" },
            { cells: ["Intake form", "Done"], status: "ok" },
          ],
        },
        aside: { kind: "message", channel: "#onboarding", topic: "New client", text: "Jordan Price booked Thursday 2:00 PM. CRM updated automatically.", actions: ["View record", "Open calendar"] },
      },
      table: [
        { row: "Booking a time", before: "A run of emails back and forth", after: "Client picks their own slot" },
        { row: "Video link and reminders", before: "Built and sent by hand", after: "Sent automatically the moment they book" },
        { row: "Intake forms", before: "Often missing when the client shows up", after: "A quiet notice rule gives time to finish them first" },
        { row: "Your team's time", before: "Chasing times, links, and forms", after: "Meeting a client who's already ready" },
      ],
    },
    steps: {
      eyebrow: "How it works",
      title: "How does client onboarding automation work?",
      items: [
        { title: "Book", body: "New clients pick their own time slot from a booking page, no emails needed.", tools: ["Calendly"] },
        { title: "Prepare", body: "A video link and reminders go out automatically, with enough notice built in to finish intake forms first.", tools: ["Zoom", "Reminders"] },
        { title: "Log", body: "The moment a booking is confirmed, the CRM updates itself with the client tagged and the session logged.", tools: ["Your CRM"] },
        { title: "Welcome", body: "A welcome sequence and any next steps go out on schedule, matched to how your team already works.", tools: ["Email"] },
      ],
      checkpointAfter: 3,
      checkpointLabel: "Only unusual bookings stop here",
      human: ["Approving exceptions to the booking rules", "Anything flagged as unusual", "Client-specific requests", "Changing the intake questions", "Deciding when a client needs a person, not an email"],
    },
    bento: {
      eyebrow: "What it handles",
      title: "What can client onboarding automation cover?",
      intro: "If a new client goes through the same steps every time, it can usually be automated.",
      tiles: [
        {
          verb: "Book",
          title: "Self-serve scheduling",
          body: "Clients pick their own slot, with a minimum-notice rule built in.",
          preview: {
            type: "table",
            head: ["Client", "Slot", "Notice", "Status"],
            rows: [
              { cells: ["Jordan Price", "Thu 2:00 PM", "3 days"], status: "Booked", ok: true },
              { cells: ["Priya Shah", "Fri 10:00 AM", "2 days"], status: "Booked", ok: true },
              { cells: ["Sam Torres", "Same day", "0 days"], status: "Blocked", ok: false },
            ],
            note: "Example · same-day bookings need a person",
          },
        },
        { verb: "Automate", title: "Reminders and video links", preview: { type: "txns", rows: [["Video link sent", "Jordan Price"], ["Reminder, 1 day out", "Priya Shah"], ["Reminder, 1 hour out", "Sam Torres"]] } },
        { verb: "Track", title: "Intake completion", preview: { type: "receipt", amount: "100%", label: "of clients arrive with forms done" } },
        { verb: "Welcome", title: "Welcome packets, sent on schedule", preview: { type: "pdf", title: "WELCOME PACKET", pages: "Sent the moment a booking is confirmed" } },
        { verb: "Remind", title: "Session and follow-up reminders", preview: { type: "calendar", highlight: 2, reminder: "Reminder: intake form due in 2 days" } },
        { verb: "Tidy", title: "Backlog cleanup", preview: { type: "counter", from: 184, label: "stalled onboarding threads cleared, one time" } },
      ],
    },
    estimator: {
      eyebrow: "Your numbers",
      title: "What is manual onboarding costing you?",
      intro: "Move the sliders to match your week.",
      unit: "tasks",
      inputs: [
        { id: "docs", label: "Onboarding tasks handled by hand per day", min: 1, max: 20, step: 1, value: 4 },
        { id: "min", label: "Minutes per task: emails, links, reminders", min: 5, max: 60, step: 5, value: 15 },
        { id: "days", label: "Working days per week", min: 1, max: 7, step: 1, value: 5 },
        { id: "rate", label: "Hourly cost of that time", min: 15, max: 150, step: 5, value: 35, hint: "Wages plus overhead, or your own hourly value", format: "money" },
        { id: "flag", label: "Share still needing a person to double check", min: 0, max: 50, step: 5, value: 10, format: "percent" },
        { id: "rev", label: "Minutes to check one of those", min: 1, max: 10, step: 1, value: 3 },
      ],
      worth: ["Worth it once new clients arrive every week", "When intake forms are often missing at the first session", "When scheduling means a run of emails back and forth"],
    },
    proof: {
      featured: {
        slug: "onboarding-pipeline-autopilot",
        big: "~5 hrs",
        bigLabel: "saved every week, with every client arriving ready",
        title: "The Onboarding Pipeline That Runs on Autopilot",
        before: "Booking one client meant a run of emails to find a time, a meeting link built by hand, and clients often showing up before finishing intake forms.",
        after: "Clients book themselves, get a video link and reminders automatically, and the CRM updates itself the moment they book.",
        chips: ["Coaching", "Calendly", "Zoom"],
        caption: "Illustration of the self-serve booking page",
      },
      more: [{ slug: "crm-that-fills-itself-in", big: "~6 hrs", title: "The CRM That Fills Itself In", detail: "saved weekly · n8n, Airtable, Gmail" }],
    },
    stack: {
      title: "Built on the tools you already pay for",
      intro: "Most onboarding automation runs on tools you already have. We rarely need to add a new subscription.",
      center: "Your clients",
      tools: ["Calendly", "Zoom", "HubSpot", "Gmail", "Airtable", "Slack"],
      links: [
        { label: "Airtable", href: "/integrations/airtable" },
        { label: "n8n", href: "/integrations/n8n" },
        { label: "Lead Follow-Up Automation", href: "/services/lead-follow-up-automation" },
      ],
    },
    faq: {
      title: "Questions owners ask first",
      items: [
        {
          q: "What is client onboarding automation?",
          a: "Client onboarding automation is software that handles the repeatable steps of bringing on a new client: booking a time, sending a video link and reminders, collecting intake forms, and updating your CRM. It runs the same way every time, so nothing gets missed when your team is busy.",
        },
        {
          q: "How much does client onboarding automation cost for a small business?",
          a: "At Whispers Lab it starts with a $250 Automation Audit that maps your current onboarding steps and where they break down. If you go ahead, the build is quoted as a fixed price starting from $2,500, with no hourly billing, and the $250 is credited toward it. Ongoing support and a new workflow each month is available for $500 a month.",
        },
        {
          q: "Will automated onboarding feel impersonal to new clients?",
          a: "No, when it is built around your voice. The booking, reminders, and welcome messages are written the way your business already talks to clients. What disappears is the delay and the missed steps, not the personal touch. Anything that needs a real conversation still goes to a person.",
        },
        {
          q: "Does it work with our existing CRM?",
          a: "Usually, yes. The Onboarding Pipeline That Runs on Autopilot was built entirely on the client's existing CRM, with no new software added. Whispers Lab connects to the CRM, calendar, and video tools you already use where possible, and confirms the exact connections during the $250 Automation Audit.",
        },
        {
          q: "What if a client needs something outside the normal process?",
          a: "It goes to a person. Automated onboarding handles the repeatable steps, like booking and reminders, and flags anything unusual, such as a same-day booking or a special request, for your team to handle directly.",
        },
        {
          q: "How long does it take to set up?",
          a: "A client onboarding automation built in the Whispers Lab Core Build goes live in under 30 days. That includes mapping your current steps, building and connecting the booking and CRM logic, testing it end to end, and showing your team how to handle flagged exceptions.",
        },
      ],
    },
    cta: {
      title: "Find out what's slowing your onboarding down.",
      body: "In 7 days, the Automation Audit maps your onboarding steps and hands you a build plan you keep either way. Build it with us and the $250 is credited.",
    },
    related: {
      industries: ["/industries/law-firms", "/industries/real-estate", "/industries/accounting-bookkeeping"],
      posts: [],
    },
  },
  {
    slug: "lead-follow-up-automation",
    seo: {
      title: "Lead Follow-Up Automation | Whispers Lab",
      description:
        "Whispers Lab builds automated lead follow-up: every lead answered fast, routed to the right person, and never left waiting.",
      keyword: "automated lead follow up",
    },
    hero: {
      eyebrow: "Service · Lead follow-up automation",
      title: "Lead follow-up automation for leads that never",
      highlight: "wait on you.",
      answer:
        "Lead follow-up automation answers new leads the moment they come in, routes them to the right person, and keeps following up until someone replies. Real conversations get logged automatically, so nothing sits in an inbox waiting to go cold. We build it around the tools you already use in under 30 days.",
      secondaryCta: { label: "Estimate your hours", href: "#estimate" },
    },
    simulator: [
      {
        key: "route",
        tab: "New lead gets routed",
        source: "Website form",
        sourceIcon: "F",
        doc: { title: "NEW LEAD", rows: [["Name", "Jordan Price"], ["Source", "Website form"]], lines: 2 },
        steps: [
          { t: "0.0s", text: "<b>New lead</b> comes in" },
          { t: "0.4s", text: "<b>Qualified</b> against your criteria" },
          { t: "0.7s", text: "<b>Routed</b> to the right person by territory" },
          { t: "1.0s", text: "<b>First reply sent</b> within minutes" },
          { t: "1.3s", text: "<b>Logged</b> to the CRM automatically" },
        ],
        out: { k: "Lead routed", v: "Jordan Price → Priya", s: "Replied in under 5 minutes" },
      },
      {
        key: "followup",
        tab: "Lead goes quiet",
        source: "CRM",
        sourceIcon: "@",
        doc: { title: "NO REPLY", rows: [["Lead", "Metro Fuel"], ["Last contact", "3 days ago"]], lines: 2 },
        steps: [
          { t: "0.0s", text: "<b>3 days, no reply</b> detected" },
          { t: "0.4s", text: "<b>Follow-up sent</b> automatically" },
          { t: "0.8s", text: "<b>Still no reply after 7 days?</b> flagged for a person", flag: true },
          { t: "1.1s", text: "<b>Logged</b>, so nothing falls through twice" },
        ],
        out: { k: "Lead followed up", v: "Metro Fuel · 2 touches", s: "Never left waiting on its own" },
      },
    ],
    values: [
      { big: "~15 hrs", what: "back every week", from: "About 30 leads a week, no longer chased by hand", href: "/case-studies/lead-sales-engine", hrefLabel: "the Lead Sales Engine" },
      { big: "0", what: "leads sold twice since launch", from: "Status kept in lockstep across every tool", href: "/case-studies/lead-sales-engine", hrefLabel: "see how" },
      { big: "~6 hrs", what: "of CRM logging gone every week", from: "Real conversations log themselves, matched to the right contact", href: "/case-studies/crm-that-fills-itself-in", hrefLabel: "the CRM That Fills Itself In" },
    ],
    beforeAfter: {
      eyebrow: "New lead, two ways",
      title: "What changes when leads never wait?",
      intro: "Drag the handle. Same lead, same morning.",
      before: {
        time: "9:05 AM",
        pills: ["7 leads waiting in the inbox", "Oldest lead: 2 days, no reply"],
        table: {
          title: "Leads inbox (unsorted)",
          head: ["Lead", "Received", "Status"],
          rows: [
            { cells: ["Jordan Price", "2 days ago", "No reply"], status: "bad" },
            { cells: ["Metro Fuel", "1 day ago", "No reply"], status: "bad" },
            { cells: ["Ridge Supply Co", "Today", "Replied"] },
            { cells: ["Harbor Electric", "2 days ago", "No reply"], status: "bad" },
          ],
          footer: { cells: ["7 leads", "3 gone cold", ""], status: "bad" },
        },
        aside: { kind: "note", text: "Who was supposed to answer Jordan Price?" },
      },
      after: {
        time: "9:05 AM",
        pills: ["0 leads waiting", "Every lead answered within minutes"],
        table: {
          title: "Today: routed automatically",
          head: ["Lead", "Received", "Status"],
          rows: [
            { cells: ["Jordan Price", "2 min ago", "Replied"], status: "ok" },
            { cells: ["Metro Fuel", "5 min ago", "Replied"], status: "ok" },
            { cells: ["Ridge Supply Co", "Today", "Replied"], status: "ok" },
            { cells: ["Harbor Electric", "1 min ago", "Replied"], status: "ok" },
          ],
        },
        aside: { kind: "message", channel: "#sales", topic: "Lead routing", text: "Jordan Price routed to Priya and replied to in 3 minutes.", actions: ["View lead", "Open CRM"] },
      },
      table: [
        { row: "First reply", before: "Whenever someone checks the inbox", after: "Sent within minutes, every time" },
        { row: "Routing", before: "Whoever notices it first", after: "Matched to the right person automatically" },
        { row: "Follow-up", before: "Happens if someone remembers", after: "Continues on schedule until someone replies" },
        { row: "Your team's time", before: "Sorting and chasing leads", after: "Talking to leads who are already warm" },
      ],
    },
    steps: {
      eyebrow: "How it works",
      title: "How does lead follow-up automation work?",
      items: [
        { title: "Capture", body: "New leads come in from your forms, calls, or ads and are qualified against the criteria you set.", tools: ["Web forms", "Phone", "Ads"] },
        { title: "Route", body: "Each lead is matched to the right person or team by rules like territory or deal size.", tools: ["Your CRM"] },
        { title: "Follow up", body: "A first reply goes out fast, and follow-ups continue on a schedule until someone responds.", tools: ["Email", "SMS"] },
        { title: "Log", body: "Every touch is logged to the CRM automatically, so nothing falls through twice.", tools: ["Your CRM"] },
      ],
      checkpointAfter: 3,
      checkpointLabel: "Only quiet leads stop here",
      human: ["Approving unusual follow-up messages", "Leads unresponsive after repeated tries", "Pricing or contract questions", "Deciding when a lead needs a phone call, not an email", "Anything client-facing that reads oddly"],
    },
    bento: {
      eyebrow: "What it handles",
      title: "What can lead follow-up automation cover?",
      intro: "If a lead goes through the same steps every time, it can usually be automated.",
      tiles: [
        {
          verb: "Route",
          title: "Lead routing by rule",
          body: "New leads matched to the right person by territory, deal size, or source.",
          preview: {
            type: "table",
            head: ["Lead", "Routed to", "Reply time", "Status"],
            rows: [
              { cells: ["Jordan Price", "Priya", "3 min"], status: "Replied", ok: true },
              { cells: ["Metro Fuel", "Sam", "4 min"], status: "Replied", ok: true },
              { cells: ["Unclear source", "Needs review", "n/a"], status: "Pending", ok: false },
            ],
            note: "Example · unclear leads wait for a person",
          },
        },
        { verb: "Automate", title: "Follow-up sequence", preview: { type: "txns", rows: [["First reply", "Under 5 min"], ["Follow-up 1", "Day 3"], ["Follow-up 2", "Day 7"]] } },
        { verb: "Track", title: "Reply speed", preview: { type: "receipt", amount: "<5 min", label: "average time to first reply" } },
        { verb: "Brief", title: "Lead summary for the sales call", preview: { type: "pdf", title: "LEAD BRIEF", pages: "Built the moment a call is booked" } },
        { verb: "Remind", title: "Follow-up schedule", preview: { type: "calendar", highlight: 7, reminder: "Reminder: no reply after 7 days, escalate" } },
        { verb: "Backfill", title: "Stale leads, revisited once", preview: { type: "counter", from: 340, label: "cold leads re-contacted, one time" } },
      ],
    },
    estimator: {
      eyebrow: "Your numbers",
      title: "What are slow replies costing you?",
      intro: "Move the sliders to match your week.",
      unit: "leads",
      inputs: [
        { id: "docs", label: "New leads per day", min: 1, max: 60, step: 1, value: 10 },
        { id: "min", label: "Minutes to route and reply to each one", min: 1, max: 20, step: 1, value: 6 },
        { id: "days", label: "Working days per week", min: 1, max: 7, step: 1, value: 5 },
        { id: "rate", label: "Hourly cost of that time", min: 15, max: 150, step: 5, value: 35, hint: "Wages plus overhead, or your own hourly value", format: "money" },
        { id: "flag", label: "Share still needing a person to double check", min: 0, max: 50, step: 5, value: 15, format: "percent" },
        { id: "rev", label: "Minutes to check one of those", min: 1, max: 10, step: 1, value: 3 },
      ],
      worth: ["Worth it once leads sit for hours before a reply", "When routing depends on who happens to see it first", "When follow-up stops after one try"],
    },
    proof: {
      featured: {
        slug: "lead-sales-engine",
        big: "~15 hrs",
        bigLabel: "saved every week, with leads never sold twice since launch",
        title: "The Lead Sales Engine That Runs Itself",
        before: "Every lead meant looking up the contact by hand and reaching out one at a time, with leads occasionally handled twice.",
        after: "New leads are found, contacted, and marked handled the instant the process completes, so nothing goes out twice.",
        chips: ["Real estate", "n8n", "Twilio"],
        caption: "Illustration of the lead routing view",
      },
      more: [{ slug: "crm-that-fills-itself-in", big: "~6 hrs", title: "The CRM That Fills Itself In", detail: "saved weekly · n8n, Airtable, Gmail" }],
    },
    stack: {
      title: "Built on the tools you already pay for",
      intro: "We connect what you already have instead of adding another subscription.",
      center: "Your leads",
      tools: ["HubSpot", "Twilio", "Gmail", "Airtable", "n8n", "Google Sheets"],
      links: [
        { label: "n8n", href: "/integrations/n8n" },
        { label: "Zapier", href: "/integrations/zapier" },
        { label: "Client Onboarding Automation", href: "/services/client-onboarding-automation" },
      ],
    },
    faq: {
      title: "Questions owners ask first",
      items: [
        {
          q: "What is lead follow-up automation?",
          a: "Lead follow-up automation is software that replies to new leads right away, routes each one to the right person, and keeps following up on a schedule until someone responds. Every touch gets logged to your CRM automatically, so no lead sits forgotten in an inbox.",
        },
        {
          q: "How fast should you respond to a new lead?",
          a: "As fast as you can, ideally within minutes. Leads that wait hours for a reply are far more likely to go with whoever answers first. Automated follow-up sends a first reply within minutes of a lead coming in, then keeps following up on a schedule if there's no response.",
        },
        {
          q: "How much does lead follow-up automation cost for a small business?",
          a: "At Whispers Lab it starts with a $250 Automation Audit that maps how leads move through your business today. If you go ahead, the build is quoted as a fixed price starting from $2,500, with no hourly billing, and the $250 is credited toward it. Ongoing support and a new workflow each month is available for $500 a month.",
        },
        {
          q: "Will leads know they're talking to automation?",
          a: "The first reply and follow-ups are written in your business's own voice, so they read like a normal message, not a robotic one. What changes is the speed and consistency, not the tone. Anything that needs a real conversation, like pricing questions, still goes to a person.",
        },
        {
          q: "Does it work with our CRM?",
          a: "Usually, yes. Lead follow-up automation connects to CRMs like HubSpot or Airtable, along with your phone and email tools. The $250 Automation Audit confirms the exact connections and routing rules before anything is built.",
        },
        {
          q: "How long does it take to set up?",
          a: "A lead follow-up automation built in the Whispers Lab Core Build goes live in under 30 days. That includes mapping your routing rules, building the follow-up sequence, testing it against real lead data, and showing your team how to handle flagged leads.",
        },
      ],
    },
    cta: {
      title: "Find out how many leads are going cold.",
      body: "In 7 days, the Automation Audit maps how your leads move today and hands you a build plan you keep either way. Build it with us and the $250 is credited.",
    },
    related: {
      industries: ["/industries/real-estate", "/industries/law-firms", "/industries/ecommerce-retail"],
      posts: ["real-estate-lead-follow-up-automation"],
    },
  },
  {
    slug: "software-integration-services",
    seo: {
      title: "Software Integration Services | Whispers Lab",
      description:
        "Whispers Lab connects the software you already pay for, so the same data does not get typed twice or drift out of sync.",
      keyword: "software integration services",
    },
    hero: {
      eyebrow: "Service · Software integration services",
      title: "Software integration services for apps that finally",
      highlight: "talk to each other.",
      answer:
        "Software integration services connect the tools you already pay for, so the same record never gets typed into two systems by hand. We build the sync, add a safeguard so systems never loop on each other, and push clean data wherever it needs to go, from a supplier feed to your storefront. We build it around the tools you already use in under 30 days.",
      secondaryCta: { label: "Estimate your hours", href: "#estimate" },
    },
    simulator: [
      {
        key: "feed",
        tab: "Supplier feed syncs",
        source: "Supplier feed",
        sourceIcon: "S",
        doc: { title: "NEW PRODUCT", rows: [["Item", "Steel Hinge 40mm"], ["Source", "Supplier catalog"]], lines: 2 },
        steps: [
          { t: "0.0s", text: "<b>Raw listing pulled</b> from the supplier feed" },
          { t: "0.4s", text: "<b>Cleaned</b>: title and description rewritten" },
          { t: "0.8s", text: "<b>Checked</b> against existing products by reference number" },
          { t: "1.1s", text: "<b>Pushed live</b> to the store automatically" },
        ],
        out: { k: "Product live", v: "Steel Hinge 40mm", s: "0 duplicate entries" },
      },
      {
        key: "sync",
        tab: "Two systems sync",
        source: "Operations app",
        sourceIcon: "O",
        doc: { title: "RECORD UPDATED", rows: [["Customer", "Ridge Supply Co"], ["Field", "Address"]], lines: 2 },
        steps: [
          { t: "0.0s", text: "<b>Field changed</b> in the operations app" },
          { t: "0.4s", text: "<b>Mirrored</b> into the connected system" },
          { t: "0.7s", text: "<b>Circuit breaker checked</b>: this won't bounce back and forth" },
          { t: "1.0s", text: "<b>Both systems match</b>" },
        ],
        out: { k: "Systems synced", v: "Ridge Supply Co · address updated", s: "Nothing re-triggers the other" },
      },
    ],
    values: [
      { big: "~22 hrs", what: "saved every week", from: "About 500 products a sync, no longer rewritten by hand", href: "/case-studies/ai-catalog-content-engine", hrefLabel: "the AI Catalog & Content Engine" },
      { big: "0", what: "duplicate entries or catalog errors", from: "Every listing checked against what's already live before it pushes", href: "/case-studies/ai-catalog-content-engine", hrefLabel: "see how" },
      { big: "0", what: "records typed twice", from: "A safeguard stops two systems from endlessly correcting each other", href: "/case-studies/zero-double-entry-financial-pipeline", hrefLabel: "the Zero Double-Entry Financial Pipeline" },
    ],
    beforeAfter: {
      eyebrow: "New stock, two ways",
      title: "What changes when your systems share one truth?",
      intro: "Drag the handle. Same catalog, same delivery day.",
      before: {
        time: "Delivery day, 11:15 AM",
        pills: ["500 new listings to clean up", "Store showing 2 different prices for the same item"],
        table: {
          title: "Supplier feed (raw).csv",
          head: ["Item", "Title", "Price"],
          rows: [
            { cells: ["Item 4471", "hinge steel 40mm cheap!!", "??"], status: "bad" },
            { cells: ["Item 4472", "Cabinet Handle", "$4.20"] },
            { cells: ["Item 4473", "door hinge black", "??"], status: "bad" },
            { cells: ["Item 4474", "Drawer Slide", "$9.80"] },
          ],
          footer: { cells: ["500 items", "2 pricing conflicts", ""], status: "bad" },
        },
        aside: { kind: "note", text: "Which price is actually live on the site?" },
      },
      after: {
        time: "Delivery day, 11:15 AM",
        pills: ["0 listings to clean up by hand", "One price, everywhere it shows up"],
        table: {
          title: "Today: catalog synced live",
          head: ["Item", "Title", "Price"],
          rows: [
            { cells: ["Item 4471", "Steel Hinge, 40mm", "$3.60"], status: "ok" },
            { cells: ["Item 4472", "Cabinet Handle", "$4.20"], status: "ok" },
            { cells: ["Item 4473", "Door Hinge, Black", "$5.10"], status: "ok" },
            { cells: ["Item 4474", "Drawer Slide", "$9.80"], status: "ok" },
          ],
        },
        aside: { kind: "message", channel: "#ops", topic: "Catalog sync", text: "500 items synced. 0 duplicates, 0 pricing conflicts.", actions: ["View log", "Open store"] },
      },
      table: [
        { row: "New listings", before: "Rewritten and priced by hand, one at a time", after: "Cleaned and pushed live automatically" },
        { row: "Duplicate records", before: "Show up most syncs", after: "Checked against what's already live before anything pushes" },
        { row: "Two systems, one fact", before: "Whoever updates first, the other catches up eventually", after: "Mirrored instantly, with a safeguard against loops" },
        { row: "Your team's time", before: "Copying data between tabs", after: "Checking the rare item that needs a person" },
      ],
    },
    steps: {
      eyebrow: "How it works",
      title: "How does a software integration build work?",
      items: [
        { title: "Map", body: "We find every place the same data lives twice, and where a person currently bridges the gap between systems.", tools: ["Your current tools", "Interviews"] },
        { title: "Connect", body: "We build the sync between your systems, with a safeguard so two connected tools never loop on each other.", tools: ["APIs", "Zapier", "n8n"] },
        { title: "Check", body: "Every record is checked against what's already there before anything pushes, so nothing duplicates.", tools: ["Rules you approve"] },
        { title: "Hand off", body: "You get documentation, error alerts, and a video walkthrough, so the connection isn't a mystery.", tools: ["Docs", "Video walkthroughs"] },
      ],
      checkpointAfter: 3,
      checkpointLabel: "Only unmatched records stop here",
      human: ["Approving pricing or catalog conflicts", "Anything flagged as unsure", "Deciding which system is the source of truth", "Changing how two systems map to each other", "Anything client-facing"],
    },
    bento: {
      eyebrow: "What it handles",
      title: "Which systems can be connected?",
      intro: "If two tools should already agree and don't, it can usually be connected.",
      tiles: [
        {
          verb: "Sync",
          title: "Two-way record sync",
          body: "A record created in one system mirrors into the other, with a safeguard so they never loop.",
          preview: {
            type: "table",
            head: ["Record", "System A", "System B", "Status"],
            rows: [
              { cells: ["Ridge Supply Co", "Synced", "Synced"], status: "Live", ok: true },
              { cells: ["Metro Fuel", "Synced", "Synced"], status: "Live", ok: true },
              { cells: ["New signup", "Synced", "Pending"], status: "Syncing", ok: false },
            ],
            note: "Example · both systems match within seconds",
          },
        },
        { verb: "Push", title: "Feed to storefront", preview: { type: "txns", rows: [["Supplier feed pulled", "500 items"], ["Cleaned and translated", "500 items"], ["Pushed live", "500 items"]] } },
        { verb: "Prevent", title: "Duplicate protection", preview: { type: "receipt", amount: "0", label: "duplicate records created, checked before every push" } },
        { verb: "Report", title: "Sync summary", preview: { type: "pdf", title: "SYNC REPORT", pages: "Built after every scheduled run" } },
        { verb: "Schedule", title: "Recurring syncs", preview: { type: "calendar", highlight: 1, reminder: "Reminder: next supplier sync runs tomorrow" } },
        { verb: "Untangle", title: "Legacy backlog, cleared once", preview: { type: "counter", from: 1840, label: "mismatched records reconciled, one time" } },
      ],
    },
    estimator: {
      eyebrow: "Your numbers",
      title: "What is manual syncing costing you?",
      intro: "Move the sliders to match your week.",
      unit: "records",
      inputs: [
        { id: "docs", label: "Records copied between systems per day", min: 5, max: 150, step: 5, value: 35 },
        { id: "min", label: "Minutes per record, copying or checking", min: 1, max: 15, step: 1, value: 3 },
        { id: "days", label: "Working days per week", min: 1, max: 7, step: 1, value: 5 },
        { id: "rate", label: "Hourly cost of that time", min: 15, max: 150, step: 5, value: 35, hint: "Wages plus overhead, or your own hourly value", format: "money" },
        { id: "flag", label: "Share still needing a person to double check", min: 0, max: 50, step: 5, value: 10, format: "percent" },
        { id: "rev", label: "Minutes to check one of those", min: 1, max: 10, step: 1, value: 2 },
      ],
      worth: ["Worth it once the same record lives in two or more systems", "When a supplier feed or catalog needs cleaning before it can go live", "When two tools should already agree and don't"],
    },
    proof: {
      featured: {
        slug: "ai-catalog-content-engine",
        big: "~22 hrs",
        bigLabel: "saved every week, with zero duplicate entries or catalog errors",
        title: "The AI Catalog & Content Engine",
        before: "Supplier catalogs arrived messy and in raw foreign languages, so the team spent hours manually rewriting titles and fixing pricing before anything could go live.",
        after: "A one-click system fetches the raw feed, cleans and translates the text, and pushes every listing live to the store automatically.",
        chips: ["E-commerce", "Python", "OpenAI"],
        caption: "Illustration of the synced product catalog",
      },
      more: [{ slug: "zero-double-entry-financial-pipeline", big: "0", title: "The Zero Double-Entry Financial Pipeline", detail: "records typed twice · Xero, Zapier, Resend" }],
    },
    stack: {
      title: "Built on the tools you already pay for",
      intro: "We connect what you already have. If a tool has an API, it can usually join.",
      center: "Your systems",
      tools: ["Zapier", "n8n", "Xero", "QuickBooks", "PrestaShop", "HubSpot", "Airtable", "OpenAI"],
      links: [
        { label: "Zapier", href: "/integrations/zapier" },
        { label: "n8n", href: "/integrations/n8n" },
        { label: "Bookkeeping Automation", href: "/services/bookkeeping-automation" },
      ],
    },
    faq: {
      title: "Questions owners ask first",
      items: [
        {
          q: "What are software integration services?",
          a: "Software integration services connect two or more apps so information moves between them automatically, instead of someone copying it by hand. A change in one system mirrors into the other, with checks in place so records don't duplicate and the two systems don't end up endlessly correcting each other.",
        },
        {
          q: "How much do software integration services cost for a small business?",
          a: "At Whispers Lab it starts with a $250 Automation Audit that maps which of your systems should be talking and aren't. If you go ahead, the build is quoted as a fixed price starting from $2,500, with no hourly billing, and the $250 is credited toward it. Ongoing support and a new workflow each month is available for $500 a month.",
        },
        {
          q: "What if the standard connector between our tools has a bug?",
          a: "It happens more than people expect. In the AI Catalog & Content Engine that Whispers Lab built, the off-the-shelf connector between two systems had a bug that kept creating duplicate records, so it was replaced with a custom-built connection. We test against your real data before anything goes live, not just the connector's default setup.",
        },
        {
          q: "Can two connected systems get stuck endlessly correcting each other?",
          a: "It can happen when both systems try to sync the same change back and forth, called a sync loop. Whispers Lab builds a safeguard, sometimes called a circuit breaker, into every two-way sync so an update in one direction doesn't trigger an endless chain of updates in the other.",
        },
        {
          q: "Does it work with the specific software we use?",
          a: "Usually, yes. If a tool has an API, it can typically be connected, either directly or through a platform like Zapier or n8n. The $250 Automation Audit confirms the exact connections and checks the standard integration for known issues before anything is built.",
        },
        {
          q: "How long does it take to set up?",
          a: "A software integration built in the Whispers Lab Core Build goes live in under 30 days. That includes mapping where data lives twice, building and testing the sync against a copy of your real data, and showing your team how to check anything flagged.",
        },
      ],
    },
    cta: {
      title: "Find out which of your systems should be talking.",
      body: "In 7 days, the Automation Audit maps where your data lives twice and hands you a build plan you keep either way. Build it with us and the $250 is credited.",
    },
    related: {
      industries: ["/industries/ecommerce-retail", "/industries/accounting-bookkeeping", "/industries/property-management"],
      posts: ["ecommerce-product-listing-automation-supplier-feeds"],
    },
  },
];

export function getService(slug: string): ServicePage | undefined {
  return SERVICES.find((s) => s.slug === slug);
}
