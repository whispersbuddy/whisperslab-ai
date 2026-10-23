// Shared metadata, release gating, and JSON-LD helpers for the pages added in
// the site expansion. Older pages still declare their metadata inline.
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getRoute, isLive } from "@/lib/routes";

export const SITE_URL = "https://www.whisperslab.com";
export const DEFAULT_OG = { url: "/og-image.png", width: 1200, height: 630, alt: "Whispers Lab. We delete busywork." };

type MetaInput = {
  title: string;
  description: string;
  path: string;
  image?: { url: string; width: number; height: number; alt: string };
  type?: "website" | "article";
};

export function buildMetadata({ title, description, path, image = DEFAULT_OG, type = "website" }: MetaInput): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: { type, siteName: "Whispers Lab", locale: "en_US", title, description, url: path, images: [image] },
    twitter: { card: "summary_large_image", title, description, images: [image.url] },
  };
}

/** 404s a registered page until its `live` flag is on (see lib/routes.ts). */
export function requireLive(path: string): void {
  const route = getRoute(path);
  if (route && !isLive(route)) notFound();
}

export type Crumb = { name: string; path: string };

export function breadcrumbSchema(crumbs: Crumb[]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((c, i) => ({ "@type": "ListItem", position: i + 1, name: c.name, item: SITE_URL + (c.path === "/" ? "" : c.path) })),
  };
}

export function faqSchema(items: { q: string; a: string }[]) {
  return {
    "@type": "FAQPage",
    mainEntity: items.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };
}

// Stable entity ids. Every schema node that names the company, the site or
// the founder carries one of these, so search engines merge them into one
// entity each instead of reading a new anonymous Organization on every page.
// The full Organization and WebSite nodes are rendered once, in app/layout.tsx.
export const ORG_ID = `${SITE_URL}/#organization`;
export const WEBSITE_ID = `${SITE_URL}/#website`;
export const FOUNDER_ID = `${SITE_URL}/about#haris-ali`;

// The one job title for Haris Ali, in schema and on the page. Use it the same
// way on LinkedIn and every profile so all of them describe one person.
export const FOUNDER_TITLE = "Co-Founder and Automation Consultant";

// One sentence that says what Whispers Lab is and how it earns (the source
// context). Reused in the Organization schema and llms.txt; profiles copy it.
export const SOURCE_CONTEXT =
  "Whispers Lab is a US automation agency (Whispers Lab LLC, build team in Karachi) that builds and maintains done-for-you automations for small businesses on n8n, Zapier, Make and Airtable, sold as a $250 Automation Audit, a Core Build from $2,500, Automation Care at $500 a month and AI Growth Partner from $1,250 a month.";

export const PROVIDER = { "@type": "Organization", "@id": ORG_ID, name: "Whispers Lab", url: SITE_URL };

/** The Organization as an article publisher (Google wants a logo there). */
export const PUBLISHER = {
  ...PROVIDER,
  logo: { "@type": "ImageObject", url: `${SITE_URL}/assets/logo-trim.png` },
};

export const WEBSITE = { "@type": "WebSite", "@id": WEBSITE_ID, name: "Whispers Lab", url: SITE_URL };

export const FOUNDER = {
  "@type": "Person",
  "@id": FOUNDER_ID,
  name: "Haris Ali",
  jobTitle: FOUNDER_TITLE,
  url: `${SITE_URL}/about`,
  image: `${SITE_URL}/assets/haris-ali.jpg`,
  worksFor: { "@id": ORG_ID },
  sameAs: ["https://www.linkedin.com/in/haris-ali-956907169/"],
};

/** Wraps one or more schema nodes into a single @graph document. */
export function graph(...nodes: object[]) {
  return { "@context": "https://schema.org", "@graph": nodes };
}
