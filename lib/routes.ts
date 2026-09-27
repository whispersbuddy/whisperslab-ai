// Single source of truth for which pages exist. The header, footer, sitemap
// and llms.txt all read from here, so a page only shows up in navigation and
// in search engines once its `live` flag is flipped on.
//
// Release workflow: new pages are merged with `live: false` and return 404
// until their release week. Publishing a batch is a one-line change per page.
// Set NEXT_PUBLIC_SHOW_UNRELEASED=1 locally or on a staging deploy to preview
// every page (never set it in production).

export type RouteGroup =
  | "core"
  | "services"
  | "integrations"
  | "industries"
  | "pricing"
  | "resources"
  | "company"
  | "legal"
  | "utility";

export type IconName =
  | "home"
  | "scanText"
  | "calculator"
  | "userPlus"
  | "messageReply"
  | "plug"
  | "table"
  | "workflow"
  | "zap"
  | "scale"
  | "house"
  | "shoppingCart"
  | "building"
  | "receipt"
  | "clipboardCheck"
  | "hammer"
  | "trendingUp"
  | "fileText"
  | "gauge"
  | "briefcase"
  | "info"
  | "mail"
  | "shield"
  | "bookOpen"
  | "layers";

export type SiteRoute = {
  path: string;
  label: string;
  group: RouteGroup;
  /** One-line benefit shown under the label in menus and hub cards. */
  blurb?: string;
  icon?: IconName;
  /** Price label for pricing items in the nav. */
  price?: string;
  live: boolean;
  /** Planned release batch, for reference only. */
  release?: string;
  /** ISO date of the last meaningful content change, for the sitemap. */
  updated?: string;
  priority: number;
  changeFrequency: "weekly" | "monthly" | "yearly";
};

export const ROUTES: SiteRoute[] = [
  // Existing pages
  { path: "/", label: "Home", group: "core", icon: "home", live: true, priority: 1, changeFrequency: "weekly" },
  { path: "/audit", label: "Automation Audit", group: "pricing", icon: "clipboardCheck", price: "$250", blurb: "A 7-day map of what to automate first", live: true, priority: 0.9, changeFrequency: "monthly" },
  { path: "/core-build", label: "Core Build", group: "pricing", icon: "hammer", price: "from $2,500", blurb: "Your highest-value workflow, live in 30 days", live: true, priority: 0.9, changeFrequency: "monthly" },
  { path: "/case-studies", label: "Case Studies", group: "company", icon: "briefcase", live: true, priority: 0.8, changeFrequency: "weekly" },
  { path: "/blog", label: "Blog", group: "resources", icon: "bookOpen", blurb: "Plain-English guides to automating your business", live: true, priority: 0.8, changeFrequency: "weekly" },
  { path: "/contact", label: "Contact", group: "company", icon: "mail", live: true, priority: 0.7, changeFrequency: "monthly" },
  { path: "/book", label: "Book a Call", group: "utility", live: true, priority: 0.6, changeFrequency: "monthly" },

  // R0: foundation
  { path: "/about", label: "About", group: "company", icon: "info", live: false, release: "R0", priority: 0.6, changeFrequency: "monthly" },
  { path: "/privacy-policy", label: "Privacy Policy", group: "legal", live: false, release: "R0", priority: 0.2, changeFrequency: "yearly" },
  { path: "/terms", label: "Terms", group: "legal", live: false, release: "R0", priority: 0.2, changeFrequency: "yearly" },

  // R1: pricing
  { path: "/pricing", label: "Compare all plans", group: "pricing", icon: "layers", blurb: "Audit, Build, Care, and Growth side by side", live: false, release: "R1", priority: 0.8, changeFrequency: "monthly" },
  { path: "/automation-care", label: "Automation Care", group: "pricing", icon: "shield", price: "$500/mo", blurb: "Monitoring and maintenance for existing workflows", live: false, release: "R1", priority: 0.8, changeFrequency: "monthly" },
  { path: "/growth-partner", label: "AI Growth Partner", group: "pricing", icon: "trendingUp", price: "from $1,250/mo", blurb: "Maintenance plus one new workflow each month", live: false, release: "R1", priority: 0.8, changeFrequency: "monthly" },

  // R2+: services
  { path: "/services", label: "All services", group: "core", live: false, release: "R2", priority: 0.8, changeFrequency: "monthly" },
  { path: "/services/data-entry-automation", label: "Data Entry Automation", group: "services", icon: "scanText", blurb: "Invoices, statements, and forms read and filed for you", live: false, release: "R2", priority: 0.9, changeFrequency: "monthly" },
  { path: "/services/bookkeeping-automation", label: "Bookkeeping Automation", group: "services", icon: "calculator", blurb: "Invoices, reminders, and your books kept in sync", live: false, release: "R5", priority: 0.9, changeFrequency: "monthly" },
  { path: "/services/client-onboarding-automation", label: "Client Onboarding Automation", group: "services", icon: "userPlus", blurb: "New clients booked, set up, and welcomed on autopilot", live: false, release: "R6", priority: 0.9, changeFrequency: "monthly" },
  { path: "/services/lead-follow-up-automation", label: "Lead Follow-Up Automation", group: "services", icon: "messageReply", blurb: "Every lead answered fast and followed up", live: false, release: "R6", priority: 0.9, changeFrequency: "monthly" },
  { path: "/services/software-integration-services", label: "Software Integration Services", group: "services", icon: "plug", blurb: "Your apps sharing one set of data", live: false, release: "R7", priority: 0.9, changeFrequency: "monthly" },

  // R3+: integrations
  { path: "/integrations", label: "All integrations", group: "core", live: false, release: "R3", priority: 0.7, changeFrequency: "monthly" },
  { path: "/integrations/airtable", label: "Airtable", group: "integrations", icon: "table", blurb: "Airtable consultants for bases that run themselves", live: false, release: "R3", priority: 0.8, changeFrequency: "monthly" },
  { path: "/integrations/n8n", label: "n8n", group: "integrations", icon: "workflow", blurb: "n8n workflows built and looked after for you", live: false, release: "R3", priority: 0.8, changeFrequency: "monthly" },
  { path: "/integrations/zapier", label: "Zapier", group: "integrations", icon: "zap", blurb: "Zapier experts for multi-step workflows", live: false, release: "R7", priority: 0.7, changeFrequency: "monthly" },

  // R4+: industries
  { path: "/industries", label: "All industries", group: "core", live: false, release: "R4", priority: 0.7, changeFrequency: "monthly" },
  { path: "/industries/law-firms", label: "Law Firms", group: "industries", icon: "scale", blurb: "Intake, conflicts, and letters without the admin", live: false, release: "R4", priority: 0.8, changeFrequency: "monthly" },
  { path: "/industries/real-estate", label: "Real Estate", group: "industries", icon: "house", blurb: "Leads and deals that follow themselves up", live: false, release: "R5", priority: 0.8, changeFrequency: "monthly" },
  { path: "/industries/ecommerce-retail", label: "E-commerce & Retail", group: "industries", icon: "shoppingCart", blurb: "Catalogs, orders, and listings kept up to date", live: false, release: "R6", priority: 0.8, changeFrequency: "monthly" },
  { path: "/industries/property-management", label: "Property Management", group: "industries", icon: "building", blurb: "Tenants, maintenance, and rent handled faster", live: false, release: "R7", priority: 0.8, changeFrequency: "monthly" },
  { path: "/industries/accounting-bookkeeping", label: "Accounting & Bookkeeping", group: "industries", icon: "receipt", blurb: "Client documents in, clean books out", live: false, release: "R8", priority: 0.8, changeFrequency: "monthly" },

  // Resources
  { path: "/resources/automation-roi-calculator", label: "ROI Calculator", group: "resources", icon: "gauge", blurb: "See what manual work costs you each month", live: false, release: "R4", priority: 0.7, changeFrequency: "monthly" },
  { path: "/resources/ai-readiness-assessment", label: "AI Readiness Assessment", group: "resources", icon: "fileText", blurb: "A free 3-minute check of where AI fits", live: false, release: "R8", priority: 0.7, changeFrequency: "monthly" },
];

export function showUnreleased(): boolean {
  return process.env.NEXT_PUBLIC_SHOW_UNRELEASED === "1";
}

export function isLive(route: SiteRoute): boolean {
  return route.live || showUnreleased();
}

export function getRoute(path: string): SiteRoute | undefined {
  return ROUTES.find((r) => r.path === path);
}

/** True if the path is registered and live. Unregistered paths count as live. */
export function isPathLive(path: string): boolean {
  const route = getRoute(path);
  return route ? isLive(route) : true;
}

export function liveRoutes(group?: RouteGroup): SiteRoute[] {
  return ROUTES.filter((r) => isLive(r) && (!group || r.group === group));
}
