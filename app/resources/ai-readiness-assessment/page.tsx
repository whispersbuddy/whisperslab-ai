import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import { ReadinessPilot } from "@/components/pilots/ExpansionPilots";
import { READINESS_FAQ, READINESS_SEO } from "@/app/_content/resources";
import { breadcrumbSchema, buildMetadata, faqSchema, graph, requireLive, SITE_URL } from "@/lib/seo";

const PATH = "/resources/ai-readiness-assessment";

export const metadata: Metadata = buildMetadata({
  title: READINESS_SEO.title,
  description: READINESS_SEO.description,
  path: PATH,
});

const CRUMBS = [
  { name: "Home", path: "/" },
  { name: "AI Readiness Assessment", path: PATH },
];

export default function ReadinessAssessmentPage() {
  requireLive(PATH);

  return (
    <>
      <JsonLd
        data={graph(
          {
            "@type": "WebApplication",
            "@id": SITE_URL + PATH + "#tool",
            name: "AI Readiness Assessment",
            applicationCategory: "BusinessApplication",
            url: SITE_URL + PATH,
            offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
            isPartOf: { "@type": "Organization", name: "Whispers Lab", url: SITE_URL },
          },
          faqSchema(READINESS_FAQ.items),
          breadcrumbSchema(CRUMBS)
        )}
      />
      <ReadinessPilot crumbs={CRUMBS} />
    </>
  );
}
