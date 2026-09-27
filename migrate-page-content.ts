// One-off: pushes the local services/industries/integrations content
// (app/_content/{services,industries,integrations}.ts) into Strapi, matching
// the pragmatic schema created there (see CLAUDE.md / the site-expansion
// notes for the field list). Idempotent: matches existing Strapi entries by
// slug and PUTs instead of duplicating, same pattern as migrate-blogs.ts.
//
// This has NOT been run or tested against a live Strapi instance before this
// pass - verify the console output for per-entry errors, especially around
// the case-study relation lookups, rather than assuming a clean exit means
// every field landed correctly.
//
// Usage: npx tsx migrate-page-content.ts
// Requires NEXT_PUBLIC_STRAPI_URL and NEXT_PUBLIC_STRAPI_API_TOKEN, with a
// token that can create/update the service, industry, integration and
// upload (media library) endpoints. Reads .env.local first (same file the
// app's other real secrets live in), then .env, matching Next.js's own
// precedence (same as migrate-blogs.ts, extended to also check .env.local).
import fs from "fs";
import path from "path";
import { SERVICES, type ServicePage } from "./app/_content/services";
import { INDUSTRIES } from "./app/_content/industries";
import { INTEGRATIONS } from "./app/_content/integrations";
import type { StrapiRaw } from "./lib/api";
import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });
dotenv.config({ path: ".env" });

// Copied from the INDUSTRY_EDITORIAL map in components/pilots/ExpansionPilots.tsx
// (not part of app/_content/industries.ts, so SERVICES/INDUSTRIES don't have
// it). These become real Strapi fields on the industry content type -
// heroImage/heroImageAlt/heroCtaLabel/automationHandles/peopleKeep/
// finalBannerLabel - instead of that hardcoded lookup table.
const INDUSTRY_EDITORIAL: Record<string, { image: string; alt: string; handles: string; humans: string; dayTitle: string; cta: string; final: string }> = {
  "law-firms": { image: "public/assets/industries/law-firms-editorial.png", alt: "Attorney reviewing an intake packet at her desk", handles: "Intake, routing, document preparation, reminders", humans: "Advice, judgment, approval, client relationships", dayTitle: "The work moves before anyone starts chasing it.", cta: "Map your firm's workflow", final: "START WITH THE ADMIN AROUND THE LAW" },
  "real-estate": { image: "public/assets/industries/real-estate-editorial.png", alt: "Real estate team reviewing a new lead", handles: "Lead capture, routing, reminders, listing updates", humans: "Advice, negotiation, showings, client trust", dayTitle: "Every lead and listing reaches the next step on time.", cta: "Map your real estate workflow", final: "START WITH THE HANDOFFS AROUND THE DEAL" },
  "ecommerce-retail": { image: "public/assets/industries/ecommerce-editorial.png", alt: "E-commerce team managing products and orders", handles: "Catalog updates, order routing, inventory alerts, reports", humans: "Brand choices, merchandising, customer recovery", dayTitle: "The catalog and orders move without another spreadsheet shift.", cta: "Map your commerce operations", final: "START WITH THE REPETITION BEHIND EACH ORDER" },
  "property-management": { image: "public/assets/industries/property-management-editorial.png", alt: "Property manager coordinating maintenance with a technician", handles: "Request intake, vendor routing, reminders, owner updates", humans: "Tenant relationships, approvals, urgent judgment", dayTitle: "Requests reach the right person before the inbox piles up.", cta: "Map your property workflow", final: "START WITH THE HANDOFFS AROUND EACH PROPERTY" },
  "accounting-bookkeeping": { image: "public/assets/industries/accounting-editorial.png", alt: "Accounting team reviewing financial documents", handles: "Document collection, extraction, matching, reminders", humans: "Review, tax treatment, advice, final approval", dayTitle: "Clean records arrive before the review work begins.", cta: "Map your accounting workflow", final: "START WITH THE ADMIN AROUND THE NUMBERS" },
};

const url = process.env.NEXT_PUBLIC_STRAPI_URL;
const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;

if (!url || !token) {
  console.error("Missing NEXT_PUBLIC_STRAPI_URL or NEXT_PUBLIC_STRAPI_API_TOKEN");
  process.exit(1);
}

const headers = { "Content-Type": "application/json", Authorization: `Bearer ${token}` };

async function fetchAll(kind: string): Promise<StrapiRaw[]> {
  const res = await fetch(`${url}/api/${kind}?pagination[pageSize]=100`, { headers });
  if (!res.ok) {
    console.error(`Failed to list ${kind}: ${res.status} ${res.statusText}`);
    return [];
  }
  const json = await res.json();
  return Array.isArray(json.data) ? json.data : [];
}

// slug -> Strapi documentId, so proof/proof-story relations can reference
// the case study by documentId (the id REST relations expect in Strapi 5).
async function buildCaseStudySlugMap(): Promise<Map<string, string>> {
  const rows = await fetchAll("case-studies");
  const map = new Map<string, string>();
  for (const row of rows) if (row.slug) map.set(row.slug, row.documentId);
  return map;
}

function caseStudyRelation(slug: string, map: Map<string, string>): { connect: string[] } | undefined {
  const documentId = map.get(slug);
  if (!documentId) {
    console.warn(`  ! no Strapi case study found for slug "${slug}" - proof link will be empty until this is fixed`);
    return undefined;
  }
  return { connect: [documentId] };
}

function proofStoryPayload(featured: ServicePage["proof"]["featured"], csMap: Map<string, string>) {
  return {
    caseStudy: caseStudyRelation(featured.slug, csMap),
    big: featured.big,
    bigLabel: featured.bigLabel,
    title: featured.title,
    before: featured.before,
    after: featured.after,
    chips: featured.chips,
  };
}

function stepsPayload(steps: { items: { title: string; body: string; tools: string[] }[]; human: string[] }, title?: string) {
  return {
    title,
    items: steps.items.map((i) => ({ title: i.title, body: i.body, tools: i.tools })),
    human: steps.human,
  };
}

function bentoPayload(bento: ServicePage["bento"]) {
  return {
    eyebrow: bento.eyebrow,
    title: bento.title,
    intro: bento.intro,
    // tile.preview is intentionally NOT sent - it's a code-side template
    // (components/pilots/ExpansionPilots.tsx), not Strapi content.
    tiles: bento.tiles.map((t) => ({ verb: t.verb, title: t.title, body: t.body })),
  };
}

function faqPayload(faq: ServicePage["faq"]) {
  return { title: faq.title, items: faq.items.map((f) => ({ q: f.q, a: f.a })) };
}

// Only uploads on first create (no existing Strapi entry for the slug), to
// avoid piling up duplicate Media Library files on every re-run. Re-running
// against an entry that already exists leaves its current heroImage alone.
async function uploadImage(filePath: string): Promise<number | null> {
  const absolute = path.resolve(__dirname, filePath);
  if (!fs.existsSync(absolute)) {
    console.error(`  ! image not found: ${absolute}`);
    return null;
  }
  const buffer = fs.readFileSync(absolute);
  const form = new FormData();
  form.append("files", new Blob([buffer]), path.basename(absolute));
  const res = await fetch(`${url}/api/upload`, { method: "POST", headers: { Authorization: `Bearer ${token}` }, body: form });
  if (!res.ok) {
    console.error(`  Failed to upload ${filePath}: ${res.status} ${res.statusText}`);
    return null;
  }
  const json = await res.json();
  return json?.[0]?.id ?? null;
}

async function upsert(kind: string, slug: string, existing: StrapiRaw[], payload: Record<string, unknown>) {
  const match = existing.find((e) => e.slug === slug);
  const endpoint = match ? `${url}/api/${kind}/${match.documentId}` : `${url}/api/${kind}`;
  const method = match ? "PUT" : "POST";
  const res = await fetch(endpoint, { method, headers, body: JSON.stringify({ data: payload }) });
  if (!res.ok) {
    console.error(`  Failed (${method} ${kind} ${slug}): ${res.status} ${res.statusText}`);
    console.error(`  ${await res.text()}`);
    return false;
  }
  console.log(`  OK (${method}) ${kind}/${slug}`);
  return true;
}

async function migrateServices(csMap: Map<string, string>) {
  console.log("Services:");
  const existing = await fetchAll("services");
  for (const s of SERVICES) {
    const payload: Record<string, unknown> = {
      slug: s.slug,
      seo: s.seo,
      hero: { eyebrow: s.hero.eyebrow, title: s.hero.title, highlight: s.hero.highlight, answer: s.hero.answer },
      beforeAfterTitle: s.beforeAfter.title,
      values: s.values.map((v) => ({ big: v.big, what: v.what, from: v.from })),
      steps: stepsPayload(s.steps, s.steps.title),
      bento: bentoPayload(s.bento),
      proofFeatured: proofStoryPayload(s.proof.featured, csMap),
      stack: { intro: s.stack.intro, tools: s.stack.tools },
      faq: faqPayload(s.faq),
      cta: s.cta,
    };
    await upsert("services", s.slug, existing, payload);
    await new Promise((r) => setTimeout(r, 300));
  }
}

async function migrateIntegrations(csMap: Map<string, string>) {
  console.log("Integrations:");
  const existing = await fetchAll("integrations");
  for (const i of INTEGRATIONS) {
    const payload: Record<string, unknown> = {
      slug: i.slug,
      seo: i.seo,
      hero: { eyebrow: i.hero.eyebrow, title: i.hero.title, highlight: i.hero.highlight, answer: i.hero.answer },
      tool: { name: i.tool.name, url: i.tool.url, sameAs: i.tool.sameAs ?? [] },
      bento: bentoPayload(i.bento),
      stack: { intro: i.stack.intro, tools: i.stack.tools },
      proofFeatured: proofStoryPayload(i.proof.featured, csMap),
      faq: faqPayload(i.faq),
      cta: i.cta,
    };
    await upsert("integrations", i.slug, existing, payload);
    await new Promise((r) => setTimeout(r, 300));
  }
}

async function migrateIndustries(csMap: Map<string, string>) {
  console.log("Industries:");
  const existing = await fetchAll("industries");
  for (const ind of INDUSTRIES) {
    const proof =
      ind.proof.mode === "direct"
        ? { mode: "direct", title: ind.proof.title, featured: proofStoryPayload(ind.proof.featured, csMap) }
        : {
            mode: "closest",
            title: ind.proof.title,
            intro: ind.proof.intro,
            closestRows: ind.proof.rows.map((r) => ({
              needLabel: r.needLabel,
              need: r.need,
              caseStudy: caseStudyRelation(r.slug, csMap),
              title: r.title,
              detail: r.detail,
              big: r.big,
              bigLabel: r.bigLabel,
            })),
          };

    const isNew = !existing.find((e) => e.slug === ind.slug);
    const editorial = INDUSTRY_EDITORIAL[ind.slug];
    if (!editorial) console.warn(`  ! no INDUSTRY_EDITORIAL entry for "${ind.slug}" - heroImage/handles/etc will be missing`);

    const payload: Record<string, unknown> = {
      slug: ind.slug,
      seo: ind.seo,
      hero: { eyebrow: ind.hero.eyebrow, title: ind.hero.title, highlight: ind.hero.highlight, answer: ind.hero.answer },
      ...(editorial
        ? {
            heroImageAlt: editorial.alt,
            heroCtaLabel: editorial.cta,
            automationHandles: editorial.handles,
            peopleKeep: editorial.humans,
            finalBannerLabel: editorial.final,
            ...(isNew ? { heroImage: await uploadImage(editorial.image) } : {}),
          }
        : {}),
      // dayTitle comes from INDUSTRY_EDITORIAL, not ind.moments.title: the
      // rendered <h2> in the day-timeline section uses editorial.dayTitle,
      // and ind.moments.title is a different, unused string (dead field).
      moments: {
        eyebrow: ind.moments.eyebrow,
        dayTitle: editorial?.dayTitle ?? ind.moments.title,
        intro: ind.moments.intro,
        items: ind.moments.items.map((m) => ({ time: m.time, before: m.before, after: m.after, human: m.human })),
      },
      intake: stepsPayload(ind.intake, ind.intake.title),
      trust: {
        title: ind.trust.title,
        layers: ind.trust.layers,
        citation: ind.trust.citation,
      },
      proof,
      faq: faqPayload(ind.faq),
      cta: ind.cta,
    };
    await upsert("industries", ind.slug, existing, payload);
    await new Promise((r) => setTimeout(r, 300));
  }
}

async function migrate() {
  const csMap = await buildCaseStudySlugMap();
  console.log(`Loaded ${csMap.size} case studies for relation lookups.\n`);
  await migrateServices(csMap);
  await migrateIntegrations(csMap);
  await migrateIndustries(csMap);
}

migrate();
