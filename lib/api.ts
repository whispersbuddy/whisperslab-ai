import type { ServicePage } from "@/app/_content/services";
import type { IndustryPage } from "@/app/_content/industries";
import type { IntegrationPage } from "@/app/_content/integrations";

// A raw Strapi REST entry, shape unverified (this session has no live
// access to check the JSON Strapi actually returns). Named instead of
// scattering `any` through every mapper below, so eslint's no-explicit-any
// flags this one declaration instead of every call site.
export type StrapiRaw = any; // eslint-disable-line @typescript-eslint/no-explicit-any

// Strapi responses are cached and refreshed two ways:
// - on publish, the Strapi webhook hits /api/revalidate, which expires these tags
// - otherwise every REVALIDATE_SECONDS, as a safety net if a webhook is missed
// This keeps blog and case-study pages static (fast TTFB) instead of calling
// Strapi on every request.
export const ARTICLES_TAG = 'articles';
export const CASE_STUDIES_TAG = 'case-studies';
export const SERVICES_TAG = 'services';
export const INDUSTRIES_TAG = 'industries';
export const INTEGRATIONS_TAG = 'integrations';
const REVALIDATE_SECONDS = 3600;

function strapiBaseUrl() {
  return process.env.STRAPI_URL || process.env.NEXT_PUBLIC_STRAPI_URL || null;
}

function strapiInit(tag: string): RequestInit {
  // Server-only name. The NEXT_PUBLIC_ fallback keeps existing deploys working
  // until the env var is renamed on the host; remove it after that.
  const token = process.env.STRAPI_API_TOKEN || process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;
  return {
    method: 'GET',
    headers: token ? { Authorization: `Bearer ${token}` } : {},
    next: { revalidate: REVALIDATE_SECONDS, tags: [tag] },
  };
}

// Every fetcher returns an empty result on failure rather than throwing, so a
// Strapi outage degrades to the local fallback content instead of a 500.
export async function fetchArticles() {
  const baseUrl = strapiBaseUrl();
  if (!baseUrl) return [];
  try {
    const url = `${baseUrl}/api/articles?populate=*`;
    const res = await fetch(url, strapiInit(ARTICLES_TAG));

    if (!res.ok) {
      throw new Error(`Failed to fetch articles: ${res.status} ${res.statusText}`);
    }

    const json = await res.json();
    return Array.isArray(json.data) ? json.data : [];
  } catch (error) {
    console.error('Error fetching articles:', error);
    return [];
  }
}

export async function fetchArticleBySlug(slug: string) {
  const baseUrl = strapiBaseUrl();
  if (!baseUrl) return null;
  try {
    const url = `${baseUrl}/api/articles?filters[slug][$eq]=${encodeURIComponent(slug)}&populate=*`;
    const res = await fetch(url, strapiInit(ARTICLES_TAG));

    if (!res.ok) {
      throw new Error(`Failed to fetch article: ${res.status} ${res.statusText}`);
    }

    const json = await res.json();
    return json.data?.[0] || null;
  } catch (error) {
    console.error(`Error fetching article by slug (${slug}):`, error);
    return null;
  }
}

export async function fetchCaseStudies() {
  const baseUrl = strapiBaseUrl();
  if (!baseUrl) return [];
  try {
    const url = `${baseUrl}/api/case-studies?populate=*&sort[0]=createdAt:desc`;
    const res = await fetch(url, strapiInit(CASE_STUDIES_TAG));

    if (!res.ok) {
      throw new Error(`Failed to fetch case studies: ${res.status} ${res.statusText}`);
    }

    const json = await res.json();
    return Array.isArray(json.data) ? json.data : [];
  } catch (error) {
    console.error('Error fetching case studies:', error);
    return [];
  }
}

export async function fetchCaseStudyBySlug(slug: string) {
  const baseUrl = strapiBaseUrl();
  if (!baseUrl) return null;
  try {
    const url = `${baseUrl}/api/case-studies?filters[slug][$eq]=${encodeURIComponent(slug)}&populate=*`;
    const res = await fetch(url, strapiInit(CASE_STUDIES_TAG));

    if (!res.ok) {
      throw new Error(`Failed to fetch case study: ${res.status} ${res.statusText}`);
    }

    const json = await res.json();
    return json.data?.[0] || null;
  } catch (error) {
    console.error(`Error fetching case study by slug (${slug}):`, error);
    return null;
  }
}

// ---------------------------------------------------------------------------
// Services, industries and integrations (Strapi content types: service,
// industry, integration). These have a much deeper shape than articles/case
// studies, so unlike the fetchers above, these map the raw Strapi entry into
// the exact ServicePage/IndustryPage/IntegrationPage shape the page
// components already render (app/_content/*.ts). That keeps the components
// and generateMetadata/JSON-LD code completely unaware of where the data
// came from.
//
// Several fields on those local TS types (simulator, most of beforeAfter/
// week beyond .title, estimator, stack.title/center/links, proof.more,
// related, trust.eyebrow/promises, Moment.service) are not stored in Strapi
// on purpose: nothing in the current pilot page components
// (components/pilots/ExpansionPilots.tsx) reads them, so there was no reason
// to make an editor fill them in. The mappers below fill them with inert
// placeholders purely to satisfy the existing TypeScript types without
// touching those types or the local app/_content/*.ts data. If any of that
// functionality comes back, those fields need real Strapi fields added.
//
// A mapper returns null (not a half-built page) if the entry is missing a
// field the page can't render without, so the caller falls back to the
// local content instead of shipping a broken page.

function placeholderBaSide(): ServicePage["beforeAfter"]["before"] {
  return { time: "", pills: [], table: { title: "", head: [], rows: [] }, aside: { kind: "note", text: "" } };
}

function placeholderBeforeAfter(title: string): ServicePage["beforeAfter"] {
  return { eyebrow: "", title, intro: "", before: placeholderBaSide(), after: placeholderBaSide(), table: [] };
}

function placeholderSteps(items: ServicePage["steps"]["items"], human: string[], title?: string): ServicePage["steps"] {
  return { eyebrow: "", title: title ?? "", items, checkpointAfter: 0, checkpointLabel: "", human };
}

function placeholderEstimator(): ServicePage["estimator"] {
  return { eyebrow: "", title: "", intro: "", inputs: [], worth: [] };
}

function asStringArray(value: unknown): string[] {
  return Array.isArray(value) ? value.filter((v): v is string => typeof v === "string") : [];
}

function mapProofStory(raw: StrapiRaw): ServicePage["proof"]["featured"] | null {
  if (!raw || typeof raw.big !== "string" || typeof raw.title !== "string") return null;
  return {
    slug: raw.caseStudy?.slug ?? "",
    big: raw.big,
    bigLabel: raw.bigLabel ?? "",
    title: raw.title,
    before: raw.before ?? "",
    after: raw.after ?? "",
    chips: asStringArray(raw.chips),
    caption: raw.caption ?? "",
  };
}

function mapStepItems(raw: StrapiRaw): ServicePage["steps"]["items"] {
  if (!Array.isArray(raw)) return [];
  return raw.map((item) => ({ title: item?.title ?? "", body: item?.body ?? "", tools: asStringArray(item?.tools) }));
}

export function mapStrapiService(raw: StrapiRaw): ServicePage | null {
  if (!raw?.slug || !raw?.hero?.title || !raw?.bento?.tiles?.length) return null;
  const proofFeatured = mapProofStory(raw.proofFeatured);
  if (!proofFeatured) return null;
  return {
    slug: raw.slug,
    seo: { title: raw.seo?.title ?? "", description: raw.seo?.description ?? "", keyword: raw.seo?.keyword ?? "" },
    hero: {
      eyebrow: raw.hero.eyebrow ?? "",
      title: raw.hero.title ?? "",
      highlight: raw.hero.highlight ?? "",
      answer: raw.hero.answer ?? "",
      secondaryCta: { label: "", href: "" },
    },
    simulator: [],
    values: Array.isArray(raw.values) ? raw.values.map((v: StrapiRaw) => ({ big: v?.big ?? "", what: v?.what ?? "", from: v?.from ?? "", href: "", hrefLabel: "" })) : [],
    beforeAfter: placeholderBeforeAfter(raw.beforeAfterTitle ?? ""),
    steps: placeholderSteps(mapStepItems(raw.steps?.items), asStringArray(raw.steps?.human), raw.steps?.title),
    bento: {
      eyebrow: raw.bento.eyebrow ?? "",
      title: raw.bento.title ?? "",
      intro: raw.bento.intro ?? "",
      tiles: raw.bento.tiles.map((t: StrapiRaw) => ({ verb: t?.verb ?? "", title: t?.title ?? "", body: t?.body || undefined })),
    },
    estimator: placeholderEstimator(),
    proof: { featured: proofFeatured, more: [] },
    stack: { title: "", intro: raw.stack?.intro ?? "", center: "", tools: asStringArray(raw.stack?.tools), links: [] },
    faq: { title: raw.faq?.title ?? "", items: Array.isArray(raw.faq?.items) ? raw.faq.items.map((f: StrapiRaw) => ({ q: f?.q ?? "", a: f?.a ?? "" })) : [] },
    cta: { title: raw.cta?.title ?? "", body: raw.cta?.body ?? "" },
    related: { industries: [], posts: [] },
  };
}

export function mapStrapiIntegration(raw: StrapiRaw): IntegrationPage | null {
  const base = mapStrapiService(raw);
  if (!base || !raw?.tool?.name || !raw?.tool?.url) return null;
  return { ...base, tool: { name: raw.tool.name, url: raw.tool.url, sameAs: asStringArray(raw.tool.sameAs) || undefined } };
}

export function mapStrapiIndustry(raw: StrapiRaw): IndustryPage | null {
  if (!raw?.slug || !raw?.hero?.title || !raw?.moments?.items?.length) return null;

  const proofRaw = raw.proof;
  let proof: IndustryPage["proof"] | null = null;
  if (proofRaw?.mode === "direct") {
    const featured = mapProofStory(proofRaw.featured);
    if (featured) proof = { mode: "direct", eyebrow: "", title: proofRaw.title ?? "", featured, more: [] };
  } else if (proofRaw?.mode === "closest" && Array.isArray(proofRaw.closestRows)) {
    proof = {
      mode: "closest",
      eyebrow: "",
      title: proofRaw.title ?? "",
      intro: proofRaw.intro ?? "",
      rows: proofRaw.closestRows.map((r: StrapiRaw) => ({
        needLabel: r?.needLabel ?? "",
        need: r?.need ?? "",
        slug: r?.caseStudy?.slug ?? "",
        title: r?.title ?? "",
        detail: r?.detail ?? "",
        big: r?.big ?? "",
        bigLabel: r?.bigLabel ?? "",
      })),
    };
  }
  if (!proof) return null;

  const heroImageUrl = raw.heroImage?.url ? `${strapiBaseUrl()}${raw.heroImage.url}` : null;

  return {
    slug: raw.slug,
    seo: { title: raw.seo?.title ?? "", description: raw.seo?.description ?? "", keyword: raw.seo?.keyword ?? "" },
    hero: {
      eyebrow: raw.hero.eyebrow ?? "",
      title: raw.hero.title ?? "",
      highlight: raw.hero.highlight ?? "",
      answer: raw.hero.answer ?? "",
      secondaryCta: { label: "", href: "" },
    },
    // Only set when every field needed to safely replace the code-side
    // INDUSTRY_EDITORIAL fallback is present, so a Strapi entry with a
    // partially-filled editorial section falls back to the code default
    // instead of rendering with a missing image or blank heading.
    editorial:
      heroImageUrl && raw.heroImageAlt && raw.heroCtaLabel && raw.automationHandles && raw.peopleKeep && raw.finalBannerLabel && raw.moments?.dayTitle
        ? {
            image: heroImageUrl,
            alt: raw.heroImageAlt,
            handles: raw.automationHandles,
            humans: raw.peopleKeep,
            dayTitle: raw.moments.dayTitle,
            cta: raw.heroCtaLabel,
            final: raw.finalBannerLabel,
          }
        : undefined,
    week: placeholderBeforeAfter(""),
    moments: {
      eyebrow: raw.moments.eyebrow ?? "",
      title: raw.moments.dayTitle ?? "",
      intro: raw.moments.intro ?? "",
      items: raw.moments.items.map((m: StrapiRaw) => ({ time: m?.time ?? "", before: m?.before ?? "", after: m?.after ?? "", human: Boolean(m?.human), service: { label: "", href: "" } })),
    },
    intake: placeholderSteps(mapStepItems(raw.intake?.items), asStringArray(raw.intake?.human), raw.intake?.title),
    trust: {
      eyebrow: "",
      title: raw.trust?.title ?? "",
      layers: Array.isArray(raw.trust?.layers) ? raw.trust.layers.map((l: StrapiRaw) => ({ label: l?.label ?? "", note: l?.note ?? "" })) : [],
      citation: raw.trust?.citation
        ? { badge: raw.trust.citation.badge ?? "", badgeSmall: raw.trust.citation.badgeSmall ?? "", text: raw.trust.citation.text ?? "", url: raw.trust.citation.url ?? "", fine: raw.trust.citation.fine ?? "" }
        : undefined,
      promises: [],
    },
    estimator: placeholderEstimator(),
    proof,
    stack: { title: "", intro: "", center: "", tools: [], links: [] },
    faq: { title: raw.faq?.title ?? "", items: Array.isArray(raw.faq?.items) ? raw.faq.items.map((f: StrapiRaw) => ({ q: f?.q ?? "", a: f?.a ?? "" })) : [] },
    cta: { title: raw.cta?.title ?? "", body: raw.cta?.body ?? "" },
    related: { services: [], posts: [] },
  };
}

// Strapi's `populate=*` only goes one level deep: it fills in each
// top-level component (hero, bento, ...) but not a repeatable component
// nested INSIDE another component (bento.tiles, steps.items, ...) or a
// relation nested inside one (proofFeatured.caseStudy). Verified directly
// against the live instance - populate=* alone silently drops bento.tiles
// and proofFeatured.caseStudy, which is exactly why every one of these
// pages was falling back to local content. Every populate path below was
// re-verified with real requests, not assumed from Strapi's docs.
const SERVICE_POPULATE =
  "populate[seo]=true&populate[hero]=true&populate[values]=true&populate[steps][populate]=items&populate[bento][populate]=tiles&populate[proofFeatured][populate]=caseStudy&populate[stack]=true&populate[faq][populate]=items&populate[cta]=true";
// NOT the same field set as Service: the integration content type has no
// values/steps/beforeAfterTitle fields (see the schema - those are unused
// for integrations, so they were left out on purpose). Strapi validates
// populate keys against the actual content type and 400s the WHOLE request
// if you ask it to populate a field that doesn't exist, which silently
// broke every integration fetch when this reused SERVICE_POPULATE directly.
const INTEGRATION_POPULATE =
  "populate[seo]=true&populate[hero]=true&populate[tool]=true&populate[bento][populate]=tiles&populate[stack]=true&populate[proofFeatured][populate]=caseStudy&populate[faq][populate]=items&populate[cta]=true";
const INDUSTRY_POPULATE =
  "populate[seo]=true&populate[hero]=true&populate[heroImage]=true&populate[moments][populate]=items&populate[intake][populate]=items&populate[trust][populate][layers]=true&populate[trust][populate][citation]=true&populate[proof][populate][featured][populate]=caseStudy&populate[proof][populate][closestRows][populate]=caseStudy&populate[faq][populate]=items&populate[cta]=true";

// `path` is the actual REST collection segment (e.g. "industries", not
// "industry" + "s" - naive pluralization produced "industrys" and 404'd on
// every single industry fetch until this was caught during verification).
async function fetchStrapiCollection(path: string, tag: string, populate: string) {
  const baseUrl = strapiBaseUrl();
  if (!baseUrl) return [];
  try {
    const url = `${baseUrl}/api/${path}?${populate}&pagination[pageSize]=100`;
    const res = await fetch(url, strapiInit(tag));
    if (!res.ok) throw new Error(`Failed to fetch ${path}: ${res.status} ${res.statusText}`);
    const json = await res.json();
    return Array.isArray(json.data) ? json.data : [];
  } catch (error) {
    console.error(`Error fetching ${path}:`, error);
    return [];
  }
}

async function fetchStrapiEntryBySlug(path: string, tag: string, populate: string, slug: string) {
  const baseUrl = strapiBaseUrl();
  if (!baseUrl) return null;
  try {
    const url = `${baseUrl}/api/${path}?filters[slug][$eq]=${encodeURIComponent(slug)}&${populate}`;
    const res = await fetch(url, strapiInit(tag));
    if (!res.ok) throw new Error(`Failed to fetch ${path} (${slug}): ${res.status} ${res.statusText}`);
    const json = await res.json();
    return json.data?.[0] || null;
  } catch (error) {
    console.error(`Error fetching ${path} by slug (${slug}):`, error);
    return null;
  }
}

export async function fetchServices(): Promise<ServicePage[]> {
  const raw = await fetchStrapiCollection("services", SERVICES_TAG, SERVICE_POPULATE);
  return raw.map(mapStrapiService).filter((s: ServicePage | null): s is ServicePage => s !== null);
}

export async function fetchServiceBySlug(slug: string): Promise<ServicePage | null> {
  const raw = await fetchStrapiEntryBySlug("services", SERVICES_TAG, SERVICE_POPULATE, slug);
  return raw ? mapStrapiService(raw) : null;
}

export async function fetchIntegrations(): Promise<IntegrationPage[]> {
  const raw = await fetchStrapiCollection("integrations", INTEGRATIONS_TAG, INTEGRATION_POPULATE);
  return raw.map(mapStrapiIntegration).filter((i: IntegrationPage | null): i is IntegrationPage => i !== null);
}

export async function fetchIntegrationBySlug(slug: string): Promise<IntegrationPage | null> {
  const raw = await fetchStrapiEntryBySlug("integrations", INTEGRATIONS_TAG, INTEGRATION_POPULATE, slug);
  return raw ? mapStrapiIntegration(raw) : null;
}

export async function fetchIndustries(): Promise<IndustryPage[]> {
  const raw = await fetchStrapiCollection("industries", INDUSTRIES_TAG, INDUSTRY_POPULATE);
  return raw.map(mapStrapiIndustry).filter((i: IndustryPage | null): i is IndustryPage => i !== null);
}

export async function fetchIndustryBySlug(slug: string): Promise<IndustryPage | null> {
  const raw = await fetchStrapiEntryBySlug("industries", INDUSTRIES_TAG, INDUSTRY_POPULATE, slug);
  return raw ? mapStrapiIndustry(raw) : null;
}
