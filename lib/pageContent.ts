// Resolves a service/industry/integration page from Strapi first, falling
// back to the local app/_content/*.ts entry if Strapi has nothing for that
// slug (matching the fallback pattern lib/api.ts already uses for
// blog/case-study content). This is what makes a new entry created only in
// Strapi show up immediately, without a code deploy.
import { getIndustry, INDUSTRIES, type IndustryPage } from "@/app/_content/industries";
import { getIntegration, INTEGRATIONS, type IntegrationPage } from "@/app/_content/integrations";
import { getService, SERVICES, type ServicePage } from "@/app/_content/services";
import {
  fetchIndustries,
  fetchIndustryBySlug,
  fetchIntegrationBySlug,
  fetchIntegrations,
  fetchServiceBySlug,
  fetchServices,
} from "@/lib/api";

export async function resolveService(slug: string): Promise<ServicePage | undefined> {
  return (await fetchServiceBySlug(slug)) ?? getService(slug);
}

export async function resolveIndustry(slug: string): Promise<IndustryPage | undefined> {
  return (await fetchIndustryBySlug(slug)) ?? getIndustry(slug);
}

export async function resolveIntegration(slug: string): Promise<IntegrationPage | undefined> {
  return (await fetchIntegrationBySlug(slug)) ?? getIntegration(slug);
}

// Slugs to pre-render at build time: the union of what's in Strapi today and
// what's still only local. A slug published to Strapi *after* the last
// deploy isn't in this list, but still renders on request (see
// `dynamicParams` staying at its default of true on each [slug]/page.tsx),
// so it doesn't need a redeploy to go live.
export async function allServiceSlugs(): Promise<string[]> {
  const strapiSlugs = (await fetchServices()).map((s) => s.slug);
  return Array.from(new Set([...SERVICES.map((s) => s.slug), ...strapiSlugs]));
}

export async function allIndustrySlugs(): Promise<string[]> {
  const strapiSlugs = (await fetchIndustries()).map((i) => i.slug);
  return Array.from(new Set([...INDUSTRIES.map((i) => i.slug), ...strapiSlugs]));
}

export async function allIntegrationSlugs(): Promise<string[]> {
  const strapiSlugs = (await fetchIntegrations()).map((i) => i.slug);
  return Array.from(new Set([...INTEGRATIONS.map((i) => i.slug), ...strapiSlugs]));
}
