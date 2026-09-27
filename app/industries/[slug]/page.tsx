import type { Metadata } from "next";
import { notFound } from "next/navigation";
import JsonLd from "@/components/JsonLd";
import { IndustryPilot } from "@/components/pilots/ExpansionPilots";
import { getRoute, isPathLive } from "@/lib/routes";
import { allIndustrySlugs, resolveIndustry } from "@/lib/pageContent";
import { breadcrumbSchema, buildMetadata, faqSchema, graph, PROVIDER, requireLive, SITE_URL } from "@/lib/seo";

// An industry published only in Strapi (not yet in this list, built before
// the last deploy) still renders on request instead of 404ing: dynamicParams
// defaults to true, so this is intentionally NOT set to false here.
export async function generateStaticParams() {
  return (await allIndustrySlugs()).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const industry = await resolveIndustry(slug);
  if (!industry) return {};
  return buildMetadata({ title: industry.seo.title, description: industry.seo.description, path: `/industries/${slug}` });
}

export default async function IndustryPageRoute({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const industry = await resolveIndustry(slug);
  if (!industry) notFound();
  const path = `/industries/${slug}`;
  requireLive(path);

  const route = getRoute(path);
  const crumbs = [
    { name: "Home", path: "/" },
    ...(isPathLive("/industries") ? [{ name: "Industries", path: "/industries" }] : []),
    { name: route?.label ?? industry.seo.keyword, path },
  ];
  const structuredData = graph(
    {
      "@type": "Service",
      "@id": SITE_URL + path + "#service",
      name: route?.label,
      serviceType: industry.seo.keyword,
      description: industry.hero.answer,
      url: SITE_URL + path,
      provider: PROVIDER,
      areaServed: { "@type": "Country", name: "United States" },
      audience: { "@type": "BusinessAudience", audienceType: route?.label },
      offers: { "@type": "Offer", name: "Automation Audit", price: 250, priceCurrency: "USD", url: SITE_URL + "/audit" },
    },
    faqSchema(industry.faq.items),
    breadcrumbSchema(crumbs)
  );

  return <><JsonLd data={structuredData} /><IndustryPilot page={industry} crumbs={crumbs} /></>;
}
