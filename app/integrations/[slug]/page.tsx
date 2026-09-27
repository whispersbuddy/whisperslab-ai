import type { Metadata } from "next";
import { notFound } from "next/navigation";
import JsonLd from "@/components/JsonLd";
import { IntegrationPilot } from "@/components/pilots/ExpansionPilots";
import { getRoute, isPathLive } from "@/lib/routes";
import { allIntegrationSlugs, resolveIntegration } from "@/lib/pageContent";
import { breadcrumbSchema, buildMetadata, faqSchema, graph, PROVIDER, requireLive, SITE_URL } from "@/lib/seo";

const TOOL_FIT: Record<string, { good: string[]; caution: string[] }> = {
  airtable: {
    good: ["Your team needs a shared operational database", "Views and lightweight interfaces matter", "Structured records are replacing scattered spreadsheets"],
    caution: ["You only need a single app-to-app trigger", "The data model is highly relational at enterprise scale", "You need an invisible back-end workflow engine only"],
  },
  n8n: {
    good: ["The workflow has several branches or APIs", "Self-hosting or deeper control matters", "You need reusable logic across multiple systems"],
    caution: ["A non-technical owner must maintain every step", "The workflow is a single simple trigger", "You need a database or team-facing interface"],
  },
  zapier: {
    good: ["You want a fast, simple app-to-app workflow", "Your apps have mature Zapier connectors", "A business user may maintain it later"],
    caution: ["The flow has complex branching at high volume", "You need deep custom API control", "Per-task pricing would grow faster than the value"],
  },
};

// An integration published only in Strapi (not yet in this list, built
// before the last deploy) still renders on request instead of 404ing:
// dynamicParams defaults to true, so this is intentionally NOT set to false.
export async function generateStaticParams() {
  return (await allIntegrationSlugs()).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const integration = await resolveIntegration(slug);
  if (!integration) return {};
  return buildMetadata({ title: integration.seo.title, description: integration.seo.description, path: `/integrations/${slug}` });
}

export default async function IntegrationPageRoute({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const integration = await resolveIntegration(slug);
  if (!integration) notFound();
  const path = `/integrations/${slug}`;
  requireLive(path);

  const route = getRoute(path);
  const crumbs = [
    { name: "Home", path: "/" },
    ...(isPathLive("/integrations") ? [{ name: "Integrations", path: "/integrations" }] : []),
    { name: route?.label ?? integration.seo.keyword, path },
  ];
  const fit = TOOL_FIT[slug] ?? { good: ["The workflow is repeatable", "The required apps can connect", "Your team owns the source accounts"], caution: ["The process is still changing", "Critical data has no clear owner", "The tool is being chosen before the workflow"] };
  const structuredData = graph(
    {
      "@type": "Service",
      "@id": SITE_URL + path + "#service",
      name: route?.label,
      serviceType: integration.seo.keyword,
      description: integration.hero.answer,
      url: SITE_URL + path,
      provider: PROVIDER,
      areaServed: { "@type": "Country", name: "United States" },
      audience: { "@type": "BusinessAudience", audienceType: "Small businesses" },
      mentions: { "@type": "SoftwareApplication", name: integration.tool.name, applicationCategory: "BusinessApplication", url: integration.tool.url, ...(integration.tool.sameAs ? { sameAs: integration.tool.sameAs } : {}) },
      offers: { "@type": "Offer", name: "Automation Audit", price: 250, priceCurrency: "USD", url: SITE_URL + "/audit" },
    },
    faqSchema(integration.faq.items),
    breadcrumbSchema(crumbs)
  );

  return <><JsonLd data={structuredData} /><IntegrationPilot page={integration} crumbs={crumbs} fit={fit} /></>;
}
