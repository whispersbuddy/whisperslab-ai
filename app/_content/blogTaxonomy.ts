// Blog taxonomy, split across two independent axes:
//
// - ANGLE: the editorial lens a post is written through (Saad's 5-pillar
//   framework: Problems / Solutions / Industry / Customers / Events).
//   Internal planning metadata only -- never rendered on the site. Its job
//   is to keep the editorial calendar balanced across the funnel.
//
// - CATEGORY: the subject a post is about. This is the axis that's surfaced
//   to readers and to schema.org (articleSection), because search engines
//   and AI answer engines cluster content by subject, not by editorial
//   angle. Each category is backed by at least one real case study.
//
// Category route pages (/blog/category/[slug]) are intentionally not built
// yet -- a hub page with 1-2 posts under it is the same thin-content problem
// as the old format-pillar hub pages. Add them once a category reaches 4+
// posts. See docs/content-strategy.md for the full editorial calendar.
export type AngleSlug = "problems" | "solutions" | "industry" | "customers" | "events";

export type Angle = {
  slug: AngleSlug;
  name: string;
  description: string;
};

export const ANGLES: Angle[] = [
  {
    slug: "problems",
    name: "Problems",
    description:
      "The specific pain points, frustrations, and costs small business owners experience before fixing a process.",
  },
  {
    slug: "solutions",
    name: "Solutions",
    description:
      "How a specific automation actually works and what it produces, explained in plain language.",
  },
  {
    slug: "industry",
    name: "Industry",
    description:
      "Automation guidance tailored to a specific sector, grounded in a real build we've delivered in that industry.",
  },
  {
    slug: "customers",
    name: "Customers",
    description:
      "What real client work has taught us, told across the case studies rather than any single one.",
  },
  {
    slug: "events",
    name: "Events",
    description:
      "Lessons from conferences, webinars, or business milestones. Dormant until we have real events to document.",
  },
];

// A post belongs in "getting-started-roi" ONLY if its subject is the
// decision to automate (what to automate first, ROI, cost, how to begin).
// A post about a specific workflow or data type goes in that subject
// category even if the post is introductory in tone. This guardrail exists
// because a "fundamentals" bucket silently absorbs everything that isn't
// obviously industry-specific, becoming a dumping ground that dilutes
// topical authority instead of building it.
export type CategorySlug =
  | "getting-started-roi"
  | "document-data"
  | "crm-leads-clients"
  | "finance-invoicing";

export type Category = {
  slug: CategorySlug;
  name: string;
  description: string;
};

export const CATEGORIES: Category[] = [
  {
    slug: "getting-started-roi",
    name: "Getting Started & ROI",
    description:
      "What to automate first, how to think about cost and payback, and how to begin, for businesses that haven't automated anything yet.",
  },
  {
    slug: "document-data",
    name: "Document & Data Automation",
    description:
      "Automating the movement and processing of documents, records, and product or transaction data.",
  },
  {
    slug: "crm-leads-clients",
    name: "CRM, Leads & Client Workflow",
    description:
      "Automating lead follow-up, client onboarding, scheduling, and the relationship-management work around them.",
  },
  {
    slug: "finance-invoicing",
    name: "Finance & Invoicing Automation",
    description:
      "Automating invoicing, reconciliation, and the sync between operational and accounting systems.",
  },
];

export function getCategoryBySlug(slug: string): Category | undefined {
  return CATEGORIES.find((c) => c.slug === slug);
}

// Phase 1 industries only -- the three where a real case study exists to
// back the claims. See docs/content-strategy.md for the full target list
// (law, insurance, marketing services, medical, construction, financial
// advisory, transport/logistics) to add once these three have depth.
export type IndustrySlug = "accounting-bookkeeping" | "real-estate" | "ecommerce-retail";

export type Industry = {
  slug: IndustrySlug;
  name: string;
};

export const INDUSTRIES: Industry[] = [
  { slug: "accounting-bookkeeping", name: "Accounting & Bookkeeping" },
  { slug: "real-estate", name: "Real Estate" },
  { slug: "ecommerce-retail", name: "E-commerce & Retail" },
];

export function getIndustryBySlug(slug: string): Industry | undefined {
  return INDUSTRIES.find((i) => i.slug === slug);
}
