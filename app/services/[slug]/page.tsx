import type { Metadata } from "next";
import { notFound } from "next/navigation";
import JsonLd from "@/components/JsonLd";
import { ServicePilot } from "@/components/pilots/ExpansionPilots";
import { getRoute, isPathLive } from "@/lib/routes";
import { allServiceSlugs, resolveService } from "@/lib/pageContent";
import { breadcrumbSchema, buildMetadata, faqSchema, graph, PROVIDER, requireLive, SITE_URL } from "@/lib/seo";

// A service published only in Strapi (not yet in this list, built before the
// last deploy) still renders on request instead of 404ing: dynamicParams
// defaults to true, so this is intentionally NOT set to false here.
export async function generateStaticParams() {
  return (await allServiceSlugs()).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const service = await resolveService(slug);
  if (!service) return {};
  return buildMetadata({ title: service.seo.title, description: service.seo.description, path: `/services/${slug}` });
}

export default async function ServicePageRoute({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = await resolveService(slug);
  if (!service) notFound();
  const path = `/services/${slug}`;
  requireLive(path);

  const route = getRoute(path);
  const crumbs = [
    { name: "Home", path: "/" },
    ...(isPathLive("/services") ? [{ name: "Services", path: "/services" }] : []),
    { name: route?.label ?? service.seo.keyword, path },
  ];
  const structuredData = graph(
    {
      "@type": "Service",
      "@id": SITE_URL + path + "#service",
      name: route?.label,
      serviceType: service.seo.keyword,
      description: service.hero.answer,
      url: SITE_URL + path,
      provider: PROVIDER,
      areaServed: { "@type": "Country", name: "United States" },
      audience: { "@type": "BusinessAudience", audienceType: "Small businesses" },
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: `${route?.label} workflows`,
        itemListElement: service.bento.tiles.map((tile) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name: tile.title } })),
      },
      offers: { "@type": "Offer", name: "Automation Audit", price: 250, priceCurrency: "USD", url: SITE_URL + "/audit" },
    },
    faqSchema(service.faq.items),
    breadcrumbSchema(crumbs)
  );

  return <><JsonLd data={structuredData} /><ServicePilot page={service} crumbs={crumbs} /></>;
}
