// The three offers, in one place so /pricing, /growth-partner, and future
// pages quote the same prices and inclusions.
export type Offer = {
  key: "audit" | "core-build" | "growth-partner";
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
    name: "The Automation Audit",
    price: "$250",
    priceValue: 250,
    pitch: "We map your daily work and hand you a clear plan showing exactly what to automate first.",
    includes: ["Full operations and workflow mapping", "Prioritized automation roadmap", "Time-savings estimate per workflow", "Delivered in 7 days"],
    bestFor: "Owners who know admin is eating their week but aren't sure what to fix first.",
    timeline: "7 days",
    href: "/audit",
    cta: "See the Automation Audit",
  },
  {
    key: "core-build",
    name: "The Core Build",
    price: "From $2,500",
    priceValue: 2500,
    pitch: "We build and launch the 2 to 3 automations that pay for themselves the fastest.",
    includes: ["2 to 3 fully built automations", "Connected to the tools you already use", "Live in under 30 days", "Docs and video training for your team"],
    bestFor: "Businesses ready to remove their biggest time-wasters now.",
    timeline: "Under 30 days",
    href: "/core-build",
    cta: "See the Core Build",
  },
  {
    key: "growth-partner",
    name: "AI Growth Partner",
    price: "$500/mo",
    priceValue: 500,
    priceUnit: "month",
    pitch: "We look after your automations and add a new workflow every month.",
    includes: ["Ongoing monitoring and maintenance", "A new workflow added every month", "Priority technical support", "Ongoing improvements as you grow"],
    bestFor: "Teams that already run automations and want them kept healthy and growing.",
    timeline: "Monthly",
    href: "/growth-partner",
    cta: "See the Growth Partner plan",
  },
];
