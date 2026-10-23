import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import { RoiPilot } from "@/components/pilots/ExpansionPilots";
import { ROI_CALCULATOR } from "@/app/_content/resources";
import { breadcrumbSchema, buildMetadata, faqSchema, graph, PROVIDER, requireLive, SITE_URL, WEBSITE } from "@/lib/seo";

const PATH = "/resources/automation-roi-calculator";

export const metadata: Metadata = buildMetadata({
  title: ROI_CALCULATOR.seo.title,
  description: ROI_CALCULATOR.seo.description,
  path: PATH,
});

const CRUMBS = [
  { name: "Home", path: "/" },
  { name: "ROI Calculator", path: PATH },
];

export default function RoiCalculatorPage() {
  requireLive(PATH);
  const { faq } = ROI_CALCULATOR;

  return (
    <>
      <JsonLd
        data={graph(
          {
            "@type": "WebApplication",
            "@id": SITE_URL + PATH + "#tool",
            name: "Automation ROI Calculator",
            applicationCategory: "BusinessApplication",
            url: SITE_URL + PATH,
            offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
            isPartOf: WEBSITE,
            provider: PROVIDER,
          },
          faqSchema(faq.items),
          breadcrumbSchema(CRUMBS)
        )}
      />
      <RoiPilot crumbs={CRUMBS} />
    </>
  );
}
