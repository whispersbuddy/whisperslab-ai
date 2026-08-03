// Structured case study data, backing both the /case-studies index and
// each /case-studies/[slug] detail page. Card fields (industry, title,
// goal, before/after, metrics) match what was already published verbatim
// -- these are proven, indexed copy, not touched. The `detail` fields are
// expanded, plain-language write-ups sourced from the underlying project
// doc, with client names left out (same anonymization the site has always
// used).
//
// A note on the "hours saved" figures in `metrics`: the source doc these
// case studies are drawn from describes each project in engineering terms
// (what was built, what broke, how it was fixed) and does not state
// measured time-savings for the client. The hours-saved numbers were
// estimated from typical task frequency and time-per-task, not measured
// client data. METRICS_DISCLAIMER below is rendered wherever these
// numbers appear so that isn't overstated. If real client-reported
// numbers become available for any project, replace the relevant
// metric and drop the disclaimer for that card.
export const METRICS_DISCLAIMER =
  "Hours-saved figures are estimates based on typical task frequency and time per task, not measured client data.";

export type CaseStudy = {
  slug: string;
  industry: string;
  buildType: "ai" | "automated";
  title: string;
  goal: string;
  before: string;
  after: string;
  metrics: { num: string; label: string }[];
  detail: {
    clientSnapshot: string;
    tools: string[];
    situation: string[];
    whatWeBuilt: string[];
    howItWorks: string[];
    challenges: string[];
    result: string[];
  };
};

export const CASE_STUDIES: CaseStudy[] = [
  {
    slug: "financial-document-reader",
    industry: "FINANCIAL SERVICES · SAAS",
    buildType: "ai",
    title: "The AI-Powered Financial Document Reader",
    goal: "Stop the manual data entry of bank statements and invoices.",
    before:
      "The client relied on slow, manual data entry and outdated, restrictive scanners to process sensitive accounting and compliance documents. This bottleneck slowed daily operations and made it incredibly hard to scale.",
    after:
      "We built a custom AI system that acts like a digital data-entry clerk. It instantly reads uploaded bank statements, pulls the exact transaction data needed, and securely organizes it into their database, without a single human touch.",
    metrics: [
      { num: "100%", label: "elimination of manual data entry" },
      { num: "~15 hrs", label: "saved weekly (≈40 docs/day × 4 min)" },
      { num: "0", label: "hours wasted copying & pasting" },
      { num: "1", label: "fully automated, secure AI pipeline" },
    ],
    detail: {
      clientSnapshot:
        "A financial services SaaS company that helps other businesses manage accounting, tax, and compliance.",
      tools: ["OpenAI (GPT-4o)", "Supabase (PostgreSQL)", "Next.js", "Deno"],
      situation: [
        "This was part of a bigger move: the client was migrating their entire platform off a proprietary system onto a modern database (Supabase/PostgreSQL). Buried inside the old platform was a built-in document scanner — a \"black box\" nobody could inspect or improve — that manually extracted numbers from uploaded bank statements, alongside a hidden email connector doing something similar. Someone still had to check the scanner's work by hand.",
        "The bigger migration also meant moving years of tax, invoice, and ledger history from a loose, flexible old-style database into a strict one with real relationships between records — every ID, every link between an invoice and a customer, had to survive the move intact.",
      ],
      whatWeBuilt: [
        "A custom AI reader built to replace the old black-box scanner entirely. Every uploaded bank statement gets opened, read, and the exact transaction data — amounts, dates, descriptions — gets pulled out and written straight into the new database.",
      ],
      howItWorks: [
        "A bank statement is uploaded into the platform.",
        "A background function sends the document to the AI, along with strict instructions for exactly what shape of data to hand back — not just \"read this,\" but \"give me these exact fields, every time.\"",
        "The AI extracts the transaction details and returns them in that exact structure, so the numbers always land in the right place instead of needing a human to double-check them.",
        "The structured data is written into a secure database record that only that one client's account can ever see.",
      ],
      challenges: [
        "Legacy documents came in inconsistent formats — the reader had to be told exactly what shape of data to hand back every time, or the results would come back messy.",
        "The company's financial records were moving into a completely rebuilt, relational database at the same time, so the reader had to feed the new structure, not the old freeform one, without losing any historical data in the process.",
        "Every business using the platform needed its own private, walled-off data — one account could never see another account's numbers, including inside the new AI pipeline.",
      ],
      result: [
        "The manual data-entry step disappeared completely. Every bank statement now gets read, structured, and filed automatically with the same accuracy every time — freeing the team from a task that used to eat hours every week, and putting them in full control of a process they used to depend on a black-box vendor for.",
      ],
    },
  },
  {
    slug: "ai-catalog-content-engine",
    industry: "E-COMMERCE · RETAIL",
    buildType: "ai",
    title: "The AI Catalog & Content Engine",
    goal: "Automate the cleanup and translation of massive supplier product catalogs.",
    before:
      "The store owner was losing sales to high cart abandonment. Supplier catalogs were messy and in raw foreign languages, so the team spent countless hours manually rewriting titles, fixing pricing errors, and translating descriptions just to look trustworthy to buyers.",
    after:
      "We built a one-click AI system. It fetches the raw supplier data, then instantly cleans the text, translates it perfectly into the local language, formats descriptions beautifully, and pushes everything live to the store automatically.",
    metrics: [
      { num: "100%", label: "automated translation & formatting" },
      { num: "~22 hrs", label: "saved weekly (≈500 products × 2.5 min)" },
      { num: "0", label: "hours writing product descriptions" },
      { num: "0", label: "duplicate entries or catalog errors" },
    ],
    detail: {
      clientSnapshot:
        "An online retailer selling supplier catalogs sourced from overseas.",
      tools: ["Python", "OpenAI", "Flask (control dashboard)", "PrestaShop"],
      situation: [
        "New products arrived from suppliers with messy listings — often still in the supplier's original language, with clumsy translations, broken pricing, and titles that read like they'd been typed by a machine. Every new arrival meant hours of manual cleanup before it could go live, and the store was losing sales because listings didn't look trustworthy.",
      ],
      whatWeBuilt: [
        "A one-click system that takes the raw supplier feed, cleans up the text, translates it properly into the store's local language, and reformats every listing into clean, readable, on-brand copy — then pushes it straight to the live store. It's controlled through a simple internal dashboard, so staff can trigger a new sync without touching any code.",
        "Along the way, we also fixed a checkout bug in the same pipeline: the store was silently rejecting any price with cents in it, quietly blocking real purchases.",
      ],
      howItWorks: [
        "A script pulls the freshest product data straight from each supplier's feed.",
        "The raw text — often in another language, sometimes with broken formatting — gets sent through an AI cleanup pass that rewrites the title and description in natural, correctly-translated language.",
        "The cleaned listing is checked against existing products by its unique reference number, so nothing gets imported twice.",
        "The finished listing pushes live to the store automatically, with the same formatting and quality every time.",
      ],
      challenges: [
        "Every new listing needed a permanently unique web address, and long AI-written titles kept breaking the store's strict character limit for that address — imports were failing outright until this was fixed.",
        "The store's live product categories didn't match the ones used during testing, so new products were landing in the wrong sections until the mapping was corrected against the real site.",
        "The checkout was silently rejecting any price with cents — unrelated to the catalog work, but actively costing sales, so it was fixed as part of the same project.",
      ],
      result: [
        "The team no longer manually rewrites a single listing. New arrivals are translated, cleaned, and live on the store automatically, and the pricing bug that was quietly blocking checkouts is gone.",
      ],
    },
  },
  {
    slug: "lead-sales-engine",
    industry: "REAL ESTATE · LEAD SALES",
    buildType: "automated",
    title: "The Lead Sales Engine That Runs Itself",
    goal: "Stop manually sourcing, pitching, and selling property leads one at a time.",
    before:
      "Every lead meant looking up the homeowner by hand, texting contractors one at a time, sending a payment link, then emailing the details over. Leads occasionally got sold twice, which meant a refund and an angry contractor.",
    after:
      "New leads are found, enriched with contact details, and pitched to contractors automatically. A locked \"preview\" proves the lead is worth buying without giving it away — the second someone pays, it's marked sold and delivered, so it can never go out twice.",
    metrics: [
      { num: "100%", label: "of lead pitching & delivery automated" },
      { num: "~15 hrs", label: "saved weekly (≈30 leads/wk × 30 min manual cycle)" },
      { num: "0", label: "leads sold twice since launch" },
      { num: "24/7", label: "pipeline runs with nobody at a desk" },
    ],
    detail: {
      clientSnapshot:
        "A real estate compliance lead business selling property violation leads to local contractors.",
      tools: ["n8n", "Twilio", "Stripe", "PDFMonkey", "Google Sheets"],
      situation: [
        "Every lead meant looking up the homeowner by hand, texting contractors one at a time, sending a payment link manually, then emailing over the details. There was no way to prove a lead was worth buying without simply giving away the homeowner's contact info for free — and more than once, the same lead got sold to two different contractors, meaning an awkward refund and a frustrated client.",
      ],
      whatWeBuilt: [
        "A fully automated pipeline that finds new leads, looks up the homeowner's contact details automatically, and texts contractors a locked \"preview\" that proves the lead is real and valuable — without revealing the contact info. The moment a contractor pays, the system unlocks the full details, texts them over instantly, and marks that lead \"sold\" everywhere else so it can never be pitched again.",
      ],
      howItWorks: [
        "New property leads come in and get run through a lookup service that finds the homeowner's phone number and email automatically.",
        "Contractors in the area get a text with a \"teaser\" document — real enough to prove the lead is worth buying, with the actual contact details blacked out.",
        "A contractor who wants the lead pays through a link in that same text message.",
        "The instant payment clears, a second, complete document unlocks with the real contact details, gets texted straight over, and the lead is marked \"sold\" everywhere else so it can never be offered again.",
      ],
      challenges: [
        "The contact lookup didn't always return a phone number or email for every homeowner — the system had to handle those gaps gracefully instead of crashing the pipeline.",
        "Nothing could stop a contractor from getting the homeowner's contact info without paying first — every preview had to prove the lead's value while keeping the actual contact details completely hidden until payment cleared.",
        "Payment and delivery had to stay in perfect sync — the instant a payment came in, the system had to match it to the exact right lead, unlock it, and mark it sold, with zero room for two contractors racing for the same lead.",
      ],
      result: [
        "Leads now get sourced, pitched, sold, and delivered without anyone touching a keyboard — a marketplace that runs 24/7, has never double-sold a lead since launch, and doesn't leak a single contact detail before payment clears.",
      ],
    },
  },
  {
    slug: "zero-double-entry-financial-pipeline",
    industry: "PROFESSIONAL SERVICES · FINANCE & HR",
    buildType: "automated",
    title: "The Zero Double-Entry Financial Pipeline",
    goal: "Stop retyping every customer and invoice into two separate systems.",
    before:
      "Every customer and invoice was built once in the operations app, then rebuilt by hand in the accounting system. Quotes sent to customers hit a login wall, so plenty never got read at all.",
    after:
      "Customers and invoices now sync both ways automatically, with a safeguard that stops the two systems endlessly \"correcting\" each other. Quotes go out as branded PDFs straight to the inbox, no login required, with a one-click Accept button that updates both systems at once.",
    metrics: [
      { num: "0", label: "records typed twice" },
      { num: "~10 hrs", label: "saved weekly on manual invoice & contact entry" },
      { num: "1", label: "click for customers to accept a quote" },
      { num: "100%", label: "of internal data stayed private" },
    ],
    detail: {
      clientSnapshot:
        "A business running its day-to-day operations on a private custom platform, with its accounting handled in a separate system.",
      tools: ["Xero", "Zapier", "Resend"],
      situation: [
        "Every customer and every invoice was manually rebuilt from scratch in the accounting system after being created once in the operations app — full double-entry, every time. On top of that, quotes sent to customers hit a login wall, so plenty of customers never even opened them.",
      ],
      whatWeBuilt: [
        "A two-way sync that keeps customers and invoices identical in both systems automatically, with a safeguard built in so the two systems never get stuck endlessly \"correcting\" each other back and forth. Quotes now go out as clean, branded PDFs straight to the customer's inbox — no login needed — with a one-click \"Accept\" button that instantly updates both the operations app and the accounting system at once.",
        "The same infrastructure was also built to securely extend into payroll and HR data down the line, since that kind of information needs stricter handling than ordinary invoices.",
      ],
      howItWorks: [
        "When a customer or invoice is created in the operations app, it's mirrored into the accounting system automatically.",
        "A one-way \"circuit breaker\" during each sync stops the two systems from endlessly re-triggering updates on each other.",
        "When a quote needs to go out, the system builds a branded PDF — showing or hiding certain pricing details depending on the job — and emails it directly, with no login link or wall in the way.",
        "The customer clicks one \"Accept\" button in that email, and both the operations app and the accounting system update at the same instant.",
      ],
      challenges: [
        "The standard off-the-shelf connector between the two systems had a bug that kept creating duplicate customer records — it had to be replaced with a more careful, custom-built connection.",
        "Syncing changes in both directions risked creating an infinite loop, where each system kept re-triggering an update in the other, forever.",
        "The operations platform was intentionally kept private for security reasons, but customers still needed to view and accept quotes without ever logging in — so documents had to be sent out to them, not the other way around.",
      ],
      result: [
        "Nobody retypes a customer or an invoice twice anymore. Customers get professional, branded quotes straight in their inbox and can accept with one click, and both systems stay perfectly in sync without ever double-updating each other.",
      ],
    },
  },
  {
    slug: "crm-that-fills-itself-in",
    industry: "EDUCATION · RELATIONSHIP MANAGEMENT",
    buildType: "automated",
    title: "The CRM That Fills Itself In",
    goal: "Get the founder's relationships out of his personal inbox and into a system the team can actually use.",
    before:
      "Years of conversations with schools and educators sat in one person's email and calendar. Logging them by hand meant wading through internal chatter, newsletters, and bot invites just to find the real ones.",
    after:
      "Emails and meetings now log themselves automatically, with the noise filtered out before it ever reaches the database. Even conversations with people missing from the contact list still get matched to the right organization, so nothing important is lost to a forgotten record.",
    metrics: [
      { num: "100%", label: "of relevant emails & meetings auto-logged" },
      { num: "~6 hrs", label: "saved weekly on manual CRM updates" },
      { num: "0", label: "spam or internal noise reaching the database" },
      { num: "2", label: "ways every contact gets matched, so none slip through" },
    ],
    detail: {
      clientSnapshot:
        "An education-sector organization managing long-term relationships with schools and individual educators.",
      tools: ["n8n", "Airtable", "Gmail", "Google Calendar"],
      situation: [
        "Years of valuable conversations with schools and educators sat buried in one person's personal email and calendar. Logging them by hand meant wading through internal chatter, newsletters, and random meeting invites just to find the handful of interactions that actually mattered — and it rarely happened consistently.",
      ],
      whatWeBuilt: [
        "An automatic logging system that reads incoming emails and calendar meetings, filters out the noise — internal chatter, spam, bot-generated invites — and only logs the real, meaningful interactions into a shared CRM. Even when a contact isn't already saved in the system, it's smart enough to match them to the right school by looking at their email domain, so nothing gets lost just because someone forgot to add a new contact ahead of time.",
      ],
      howItWorks: [
        "Every new email and calendar invite gets scanned as it comes in.",
        "A filter throws out anything that isn't a real, external conversation — internal team chatter, newsletters, automated meeting-bot invites.",
        "What's left gets matched to the right person. If they're not already saved as a contact, the system checks their email domain against a list of known schools and files it there instead of losing it.",
        "The matched email or meeting gets logged into the CRM automatically, linked to both the individual and their organization.",
      ],
      challenges: [
        "Staff regularly forgot to add new contacts to the master list before those people emailed in — the system needed a second, smarter way to still catch and correctly file those conversations.",
        "Inboxes and calendars were full of noise — internal chatter, marketing emails, automated meeting bots — all of which had to be filtered out before anything reached the CRM.",
        "Historical syncing needed to run through years of old email and calendar history without creating duplicate entries or slowing to a crawl.",
      ],
      result: [
        "Every meaningful conversation and meeting now logs itself, automatically matched to the right school or educator — even when the contact wasn't in the system ahead of time — turning one person's private inbox into a shared, searchable relationship history for the whole team.",
      ],
    },
  },
  {
    slug: "onboarding-pipeline-autopilot",
    industry: "COACHING · CLIENT ONBOARDING",
    buildType: "automated",
    title: "The Onboarding Pipeline That Runs on Autopilot",
    goal: "Get new coaching clients booked, prepped, and logged without a single manual step.",
    before:
      "Booking one client meant a run of emails to find a time, a meeting link built by hand, manual reminders, and clients regularly showing up before finishing their intake forms.",
    after:
      "Clients now book themselves. A quiet minimum-notice rule creates the exact window they need to finish intake forms before the session, meeting links and reminders go out automatically, and the CRM updates itself the moment a booking is made — all inside tools the business already owned.",
    metrics: [
      { num: "0", label: "emails needed to book a session" },
      { num: "~5 hrs", label: "saved weekly on scheduling & reminders" },
      { num: "100%", label: "of clients arrive with intake forms done" },
      { num: "$0", label: "extra software — built on tools already paid for" },
    ],
    detail: {
      clientSnapshot: "A coaching business selling multi-week 1:1 coaching packages.",
      tools: ["Calendly", "Zoom", "the client's existing CRM"],
      situation: [
        "Booking a single new client meant a back-and-forth of emails to find a time, manually creating a video call link, and sending reminders by hand — and clients would often show up to their first session without having filled out the required intake forms.",
      ],
      whatWeBuilt: [
        "A fully self-serve booking system where new clients pick their own time slot, automatically get a video call link and reminder emails, and are quietly required to leave enough notice before their session that they have time to finish their intake forms first. The moment someone books, the CRM updates itself — no one on the team has to touch it.",
      ],
      howItWorks: [
        "A new client picks their own time slot from a booking page.",
        "The booking tool automatically generates the video call link and schedules reminder emails ahead of the session.",
        "A quiet minimum-notice rule stops last-minute, same-day bookings — just enough of a gap for the client to fill out required intake paperwork before showing up.",
        "The moment the booking is confirmed, the CRM is updated automatically — tagging the client and logging the session date — with no one on the team touching a keyboard.",
      ],
      challenges: [
        "The client specifically didn't want to add another paid software subscription — everything had to run on tools they already had.",
        "A booking needed to automatically leave enough of a gap before the session for a client to realistically finish their intake paperwork, without making the booking process feel slow.",
        "Booking data needed to update the CRM in the exact right format, matching fields the CRM already expected.",
      ],
      result: [
        "New clients now book themselves, get their video link and reminders automatically, and consistently show up with their paperwork done — all without adding a single new piece of software to the budget.",
      ],
    },
  },
  {
    slug: "inspection-report-writes-itself",
    industry: "AUTOMOTIVE · FIELD INSPECTIONS",
    buildType: "automated",
    title: "The Inspection Report That Writes Itself",
    goal: "Turn a field inspection form into a finished, premium report with zero manual formatting.",
    before:
      "Every inspection produced a form response with 38+ photos and written notes. Someone then spent an afternoon building it into a polished, multi-page document by hand, matching a premium layout the client insisted on.",
    after:
      "The finished report now builds itself the moment the form is submitted. Photos arrange into a clean grid, notes and images are handled as separate streams so nothing overlaps, and the document grows to however many pages the job needs.",
    metrics: [
      { num: "100%", label: "of report formatting automated" },
      { num: "~4 hrs", label: "saved per inspection report" },
      { num: "0", label: "overlapping text or clipped pages" },
      { num: "38+", label: "photos laid out automatically, every time" },
    ],
    detail: {
      clientSnapshot: "A vehicle inspection service producing detailed condition reports for every job.",
      tools: ["Make.com", "Documint", "Jotform"],
      situation: [
        "Every inspection produced a form full of notes and 38-plus photos, and someone then spent an entire afternoon manually laying that out into a polished, multi-page report matching a premium layout the client insisted on.",
      ],
      whatWeBuilt: [
        "A system that builds the finished report automatically the moment the inspection form is submitted — arranging all the photos into a clean grid, keeping notes and images from overlapping, and letting the report grow to however many pages a particular job needs, without anyone touching a layout tool.",
      ],
      howItWorks: [
        "An inspector fills out a form on-site, uploading their notes and photos.",
        "The moment it's submitted, an automation pulls all the data and photos and feeds them into a report template.",
        "The template automatically arranges however many photos came in — from a handful up to 38+ — into a clean, evenly spaced grid, without anyone laying anything out by hand.",
        "The finished, multi-page PDF is ready instantly, in the same premium format every time.",
      ],
      challenges: [
        "Early versions squeezed everything onto one line, causing photos and text to overlap and become unreadable.",
        "With anywhere from a handful to 38+ photos per job, the report had to expand cleanly to fit — never getting cut off or overflowing the page.",
        "Written notes and photos had to be treated as two separate streams of information so they never collided or printed on top of each other.",
      ],
      result: [
        "A task that used to eat an entire afternoon per inspection now finishes itself the moment the form is submitted — every report matching the same premium layout, regardless of how many photos it contains.",
      ],
    },
  },
  {
    slug: "self-cleaning-warehouse-system",
    industry: "WAREHOUSING · FULFILLMENT OPS",
    buildType: "automated",
    title: "The Self-Cleaning Warehouse System",
    goal: "Clear thousands of empty warehouse slots and stop a document backlog from growing every day.",
    before:
      "Empty warehouse locations had to be removed one at a time. Separately, every shipping slip generated left a leftover file behind in cloud storage — thousands of them, and the browser froze every time anyone tried to bulk-delete them.",
    after:
      "A single report now clears every empty location in one upload. The shipping slip workflow deletes its own leftover files the moment they're no longer needed, and the existing backlog was cleared automatically in batches, with no browser involved.",
    metrics: [
      { num: "1", label: "upload clears every empty location" },
      { num: "~3 hrs", label: "saved weekly on manual cleanup" },
      { num: "0", label: "leftover files generated going forward" },
      { num: "1,000s", label: "of backlogged files cleared without a browser crash" },
    ],
    detail: {
      clientSnapshot: "A warehousing and fulfillment operation managing thousands of storage locations.",
      tools: ["Make.com", "Google Drive"],
      situation: [
        "Empty storage bins had to be removed from the system one at a time by hand. Separately, a document-generation workflow was quietly leaving behind thousands of leftover files in cloud storage — so many that the browser would freeze and crash any time someone tried to manually clean them up.",
      ],
      whatWeBuilt: [
        "A single report upload that clears out every empty storage location in one pass, plus a self-cleaning fix to the document workflow so it automatically deletes its own leftover files the moment they're no longer needed. The existing backlog of thousands of old files was also cleared out safely, in small batches, without ever touching a web browser.",
      ],
      howItWorks: [
        "A report listing every empty storage bin gets generated and uploaded in one batch.",
        "The warehouse system clears all of them out in a single pass instead of one at a time.",
        "Separately, every time the system auto-generates a shipping document, it now deletes that same file the moment it's no longer needed.",
        "The years-old backlog of leftover files was cleaned out safely in small batches behind the scenes, without anyone touching a browser.",
      ],
      challenges: [
        "The system that accepts bulk removals was strict about exact wording — a single lowercase letter in the wrong place caused every upload to be rejected.",
        "The document workflow needed to delete only the exact file it had just created, not accidentally sweep up anything else in the same folder.",
        "Thousands of existing leftover files had already piled up and needed a safe way to clear out without crashing a browser trying to select them all by hand.",
      ],
      result: [
        "Empty warehouse locations now clear out in a single upload instead of one at a time, and the leftover-file problem is gone for good — new files clean up after themselves, and the old backlog is gone.",
      ],
    },
  },
];

export function getCaseStudyBySlug(slug: string): CaseStudy | undefined {
  return CASE_STUDIES.find((c) => c.slug === slug);
}
