// The four paid offers, in one place so /pricing, offer pages, and future
// pages quote the same prices and inclusions.
export type Offer = {
  key: "audit" | "core-build" | "automation-care" | "growth-partner";
  name: string;
  price: string;
  /** Machine-readable price for JSON-LD. */
  priceValue: number;
  priceUnit?: "month";
  pitch: string;
  includes: string[];
  bestFor: string;
  timeline: string;
  href: string;
  cta: string;
};

export const OFFERS: Offer[] = [
  {
    key: "audit",
    name: "7-Day Automation Audit",
    price: "$250",
    priceValue: 250,
    pitch: "Know which 2 to 3 workflows to automate first, what they cost today, and what implementation would involve.",
    includes: ["Up to 3 mapped workflows", "Cost and time baseline", "Prioritized execution blueprint", "Delivered in 7 business days"],
    bestFor: "Owners who know admin is eating their week but aren't sure what to fix first.",
    timeline: "7 days",
    href: "/audit",
    cta: "See the Automation Audit",
  },
  {
    key: "core-build",
    name: "30-Day Core Build",
    price: "From $2,500",
    priceValue: 2500,
    pitch: "We build, test, and launch your highest-value workflow with a fixed scope and a clear definition of done.",
    includes: ["One standard workflow from $2,500", "Acceptance testing and alerts", "Live in under 30 days", "Docs, training, and 30-day stabilization"],
    bestFor: "Businesses ready to remove their biggest time-wasters now.",
    timeline: "Under 30 days",
    href: "/core-build",
    cta: "See the Core Build",
  },
  {
    key: "automation-care",
    name: "Automation Care",
    price: "$500/mo",
    priceValue: 500,
    priceUnit: "month",
    pitch: "We monitor and maintain the automations your business already depends on.",
    includes: ["Monitoring for agreed workflows", "Failure fixes and connection checks", "One small optimization monthly", "Monthly health report"],
    bestFor: "Teams that need reliable maintenance without ongoing new development.",
    timeline: "Monthly",
    href: "/automation-care",
    cta: "See Automation Care",
  },
  {
    key: "growth-partner",
    name: "AI Growth Partner",
    price: "From $1,250/mo",
    priceValue: 1250,
    priceUnit: "month",
    pitch: "We protect your existing automations and ship one standard new workflow every month.",
    includes: ["Everything in Automation Care", "One standard workflow monthly", "Priority technical support", "Quarterly ROI and capacity review"],
    bestFor: "Teams that already run automations and want them kept healthy and growing.",
    timeline: "Monthly",
    href: "/growth-partner",
    cta: "See the Growth Partner plan",
  },
];
