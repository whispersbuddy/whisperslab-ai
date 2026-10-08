// Workflow diagrams for case studies, keyed by slug. Each diagram uses only the
// tools and systems the published case study names, and has one `steps` entry
// per item in the study's "How it works" list (same order). `x`/`y` are
// percentages inside the diagram. Layout rules that keep it readable on phones:
// columns near x = 12, 37, 63, 88; two nodes in one column only at y = 24 and
// y = 80; roles under about 18 characters. A study with no entry here, or whose
// step count no longer matches, falls back to the numbered flow in
// components/CaseFlow.tsx.

export type FlowNode = {
  id: string;
  /** Name as shown. Looked up in lib/toolLogos.ts; no logo means a text badge. */
  tool: string;
  /** Plain-words job of this node in the build. */
  role: string;
  /** Badge text when there is no logo file. Defaults to the name's initials. */
  mono?: string;
  x: number;
  y: number;
  href?: string;
};

export type FlowDef = {
  nodes: FlowNode[];
  /** Node ids the data moves through during this step, in order. */
  steps: { path: string[] }[];
};

export const CASE_FLOWS: Record<string, FlowDef> = {
  "lead-sales-engine": {
    nodes: [
      { id: "sheets", tool: "Google Sheets", role: "Lead list", x: 14, y: 26 },
      { id: "n8n", tool: "n8n", role: "Runs the flow", x: 34, y: 56, href: "/integrations/n8n" },
      { id: "docs", tool: "PDFMonkey", role: "Builds the documents", mono: "PM", x: 64, y: 24 },
      { id: "sms", tool: "Twilio", role: "Sends the texts", x: 86, y: 50 },
      { id: "pay", tool: "Stripe", role: "Takes the payment", x: 64, y: 78 },
    ],
    steps: [
      { path: ["sheets", "n8n"] },
      { path: ["n8n", "docs", "sms"] },
      { path: ["sms", "pay"] },
      { path: ["pay", "n8n", "docs", "sms"] },
    ],
  },

  "ai-catalog-content-engine": {
    nodes: [
      { id: "feed", tool: "Supplier feed", role: "Raw products", mono: "SF", x: 12, y: 52 },
      { id: "py", tool: "Python", role: "Runs the sync", x: 37, y: 52 },
      { id: "ai", tool: "OpenAI", role: "Cleans, translates", x: 63, y: 24 },
      { id: "store", tool: "PrestaShop", role: "Your online store", x: 63, y: 80 },
    ],
    steps: [{ path: ["feed", "py"] }, { path: ["py", "ai", "py"] }, { path: ["py", "store", "py"] }, { path: ["py", "store"] }],
  },

  "appraisal-case-moves-itself-forward": {
    nodes: [
      { id: "intake", tool: "New case", role: "One card per case", mono: "NC", x: 12, y: 52 },
      { id: "board", tool: "ClickUp", role: "The case board", x: 37, y: 52 },
      { id: "mail", tool: "Email", role: "Edit before sending", mono: "EM", x: 63, y: 24 },
      { id: "cal", tool: "Google Calendar", role: "Books the dates", x: 63, y: 80 },
    ],
    steps: [{ path: ["intake", "board"] }, { path: ["board"] }, { path: ["board", "mail"] }, { path: ["board", "cal"] }],
  },

  "back-office-without-a-back-office": {
    nodes: [
      { id: "at", tool: "Airtable", role: "Applicant records", x: 12, y: 52 },
      { id: "stripe", tool: "Stripe", role: "Membership fee", x: 37, y: 24 },
      { id: "plaid", tool: "Plaid", role: "Bank check", mono: "PL", x: 37, y: 80 },
      { id: "sign", tool: "SignWell", role: "E-signatures", mono: "SW", x: 63, y: 56 },
      { id: "relay", tool: "Relay", role: "Pays by ACH", mono: "RL", x: 88, y: 24 },
      { id: "qb", tool: "QuickBooks", role: "Accounting entry", x: 88, y: 80 },
    ],
    steps: [
      { path: ["at"] },
      { path: ["at", "stripe", "at", "plaid", "at"] },
      { path: ["at", "sign", "at"] },
      { path: ["at", "relay", "qb"] },
    ],
  },

  "crm-that-fills-itself-in": {
    nodes: [
      { id: "gmail", tool: "Gmail", role: "New emails", x: 12, y: 24 },
      { id: "cal", tool: "Google Calendar", role: "New invites", x: 12, y: 80 },
      { id: "n8n", tool: "n8n", role: "Filters, matches", x: 37, y: 52, href: "/integrations/n8n" },
      { id: "at", tool: "Airtable", role: "Your CRM", x: 63, y: 52, href: "/integrations/airtable" },
    ],
    steps: [
      { path: ["gmail", "n8n", "cal", "n8n"] },
      { path: ["n8n"] },
      { path: ["n8n", "at", "n8n"] },
      { path: ["n8n", "at"] },
    ],
  },

  "financial-document-reader": {
    nodes: [
      { id: "web", tool: "Next.js", role: "Upload page", x: 12, y: 34 },
      { id: "fn", tool: "Deno", role: "Background job", x: 37, y: 66 },
      { id: "ai", tool: "OpenAI", role: "Reads statements", x: 63, y: 34 },
      { id: "db", tool: "Supabase", role: "Private records", x: 88, y: 66 },
    ],
    steps: [{ path: ["web"] }, { path: ["web", "fn", "ai"] }, { path: ["ai", "fn"] }, { path: ["fn", "db"] }],
  },

  "inspection-report-writes-itself": {
    nodes: [
      { id: "form", tool: "Jotform", role: "Notes and photos", mono: "JF", x: 12, y: 34 },
      { id: "make", tool: "Make.com", role: "Moves the data", x: 37, y: 66 },
      { id: "doc", tool: "Documint", role: "Lays out photos", mono: "DM", x: 63, y: 34 },
      { id: "pdf", tool: "PDF report", role: "Ready instantly", mono: "PDF", x: 88, y: 66 },
    ],
    steps: [{ path: ["form"] }, { path: ["form", "make", "doc"] }, { path: ["doc"] }, { path: ["doc", "pdf"] }],
  },

  "inventory-cost-corrects-itself": {
    nodes: [
      { id: "ship", tool: "ShipHero", role: "Warehouse system", mono: "SH", x: 12, y: 34 },
      { id: "make", tool: "Make.com", role: "Does the math", x: 37, y: 66 },
      { id: "sheet", tool: "Google Sheets", role: "Cost ledger", x: 63, y: 34 },
    ],
    steps: [{ path: ["ship", "make"] }, { path: ["make"] }, { path: ["make", "ship"] }, { path: ["make", "sheet"] }],
  },

  "onboarding-pipeline-autopilot": {
    nodes: [
      { id: "cal", tool: "Calendly", role: "Booking page", x: 12, y: 52 },
      { id: "zoom", tool: "Zoom", role: "Call links", x: 37, y: 24 },
      { id: "crm", tool: "Your CRM", role: "Updates itself", mono: "CRM", x: 88, y: 52 },
    ],
    steps: [{ path: ["cal"] }, { path: ["cal", "zoom"] }, { path: ["cal"] }, { path: ["cal", "crm"] }],
  },

  "product-listing-builds-itself": {
    nodes: [
      { id: "src", tool: "Collectr", role: "Source catalog", mono: "CO", x: 12, y: 34 },
      { id: "pipe", tool: "Custom pipeline", role: "Cleans, structures", mono: "PL", x: 37, y: 66 },
      { id: "shop", tool: "Shopify", role: "Publish-ready", x: 63, y: 34 },
    ],
    steps: [{ path: ["src", "pipe"] }, { path: ["pipe"] }, { path: ["pipe"] }, { path: ["pipe", "shop"] }],
  },

  "self-cleaning-warehouse-system": {
    nodes: [
      { id: "wms", tool: "Warehouse system", role: "Bins, documents", mono: "WH", x: 12, y: 34 },
      { id: "make", tool: "Make.com", role: "Runs the cleanup", x: 37, y: 66 },
      { id: "drive", tool: "Google Drive", role: "Shipping files", x: 63, y: 34 },
    ],
    steps: [{ path: ["wms", "make"] }, { path: ["make", "wms"] }, { path: ["wms", "make", "drive"] }, { path: ["make", "drive"] }],
  },

  "storefront-and-warehouse-agree": {
    nodes: [
      { id: "shop", tool: "Shopify", role: "Online store", x: 14, y: 52 },
      { id: "node", tool: "Node.js", role: "Middleware", x: 50, y: 52 },
      { id: "neto", tool: "Neto", role: "Warehouse system", mono: "NT", x: 86, y: 52 },
    ],
    steps: [
      { path: ["shop", "node", "neto"] },
      { path: ["neto", "node", "shop"] },
      { path: ["shop", "node", "neto"] },
      { path: ["node"] },
    ],
  },

  "video-pipeline-collects-approvals": {
    nodes: [
      { id: "portal", tool: "Project portal", role: "Start from a brief", mono: "PO", x: 12, y: 52 },
      { id: "n8n", tool: "n8n", role: "Runs the pipeline", x: 37, y: 52, href: "/integrations/n8n" },
      { id: "frame", tool: "Frame.io", role: "Client approvals", mono: "FR", x: 63, y: 24 },
      { id: "shot", tool: "Shotstack", role: "Makes the video", mono: "SS", x: 63, y: 80 },
    ],
    steps: [
      { path: ["portal", "n8n"] },
      { path: ["n8n", "frame"] },
      { path: ["frame", "n8n", "frame"] },
      { path: ["frame", "n8n", "shot", "n8n", "frame"] },
    ],
  },

  "zero-double-entry-financial-pipeline": {
    nodes: [
      { id: "app", tool: "Operations app", role: "Your records", mono: "OP", x: 12, y: 52 },
      { id: "zap", tool: "Zapier", role: "Keeps both in sync", x: 37, y: 80, href: "/integrations/zapier" },
      { id: "xero", tool: "Xero", role: "Accounting", x: 63, y: 24 },
      { id: "mail", tool: "Resend", role: "Emails the quote", x: 88, y: 80 },
    ],
    steps: [
      { path: ["app", "zap", "xero"] },
      { path: ["zap"] },
      { path: ["zap", "mail"] },
      { path: ["mail", "xero", "app"] },
    ],
  },

  // The three entries below match drafts that are not published yet. Check the
  // draft's "to confirm" items (for example, how outreach is sent) first.
  "lead-list-builds-itself": {
    nodes: [
      { id: "data", tool: "NYC Open Data", role: "Violation records", mono: "OD", x: 12, y: 52 },
      { id: "n8n", tool: "n8n", role: "Runs every Monday", x: 37, y: 52, href: "/integrations/n8n" },
      { id: "at", tool: "Airtable", role: "Contacted list", x: 63, y: 24, href: "/integrations/airtable" },
      { id: "lob", tool: "Lob", role: "Sends the outreach", mono: "LB", x: 88, y: 52 },
    ],
    steps: [
      { path: ["data", "n8n"] },
      { path: ["n8n"] },
      { path: ["n8n", "at", "n8n"] },
      { path: ["n8n", "lob", "n8n", "at"] },
    ],
  },

  "team-portal-cuts-software-costs": {
    nodes: [
      { id: "at", tool: "Airtable", role: "Your data stays", x: 12, y: 52, href: "/integrations/airtable" },
      { id: "softr", tool: "Softr", role: "The team portal", mono: "SR", x: 37, y: 24 },
      { id: "google", tool: "Google accounts", role: "Email, meetings", mono: "GO", x: 37, y: 80 },
      { id: "n8n", tool: "n8n", role: "Fetches updates", x: 63, y: 80, href: "/integrations/n8n" },
    ],
    steps: [{ path: ["at"] }, { path: ["at", "softr"] }, { path: ["softr", "google"] }, { path: ["google", "n8n", "softr"] }],
  },

  "catalog-publishes-itself": {
    nodes: [
      { id: "csv", tool: "Supplier CSV", role: "Product details", mono: "CSV", x: 12, y: 52 },
      { id: "py", tool: "Python", role: "Reads the file", x: 37, y: 24 },
      { id: "db", tool: "Supabase", role: "Product database", x: 37, y: 80 },
      { id: "n8n", tool: "n8n", role: "Runs on a schedule", x: 63, y: 52, href: "/integrations/n8n" },
      { id: "ai", tool: "OpenAI", role: "Translates, sorts", x: 88, y: 24 },
      { id: "woo", tool: "WooCommerce", role: "Your store", x: 88, y: 80 },
    ],
    steps: [
      { path: ["csv", "py", "db"] },
      { path: ["db", "n8n"] },
      { path: ["n8n", "ai", "n8n"] },
      { path: ["n8n", "woo"] },
    ],
  },
};
