import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import { PricingPilot } from "@/components/pilots/CommercialPilots";
import type { FaqItem } from "@/components/sections/Faq";
import { OFFERS } from "@/lib/offers";
import { breadcrumbSchema, buildMetadata, faqSchema, graph, PROVIDER, requireLive, SITE_URL } from "@/lib/seo";

const PATH = "/pricing";

export const metadata: Metadata = buildMetadata({
  title: "AI Automation Agency Pricing | Whispers Lab",
  description:
    "Clear AI automation pricing: a $250 Automation Audit, Core Builds from $2,500, $500/month Automation Care, and Growth Partner plans from $1,250/month.",
  path: PATH,
});

const CRUMBS = [
  { name: "Home", path: "/" },
  { name: "Pricing", path: PATH },
];

const FAQS: FaqItem[] = [
  {
    q: "How much does AI automation cost for a small business?",
    a: "With Whispers Lab, you can start with a $250 Automation Audit. A standard Core Build starts from $2,500 for one agreed workflow. Automation Care is $500 a month, while AI Growth Partner plans start from $1,250 a month and include one standard new workflow each month.",
  },
  {
    q: "Is the $250 Audit credited toward a build?",
    a: "Yes. If you hire Whispers Lab for a Core Build after your Audit, the full $250 is credited toward the build price.",
  },
  {
    q: "Do you charge by the hour?",
    a: "No. The Audit is a flat $250, builds receive a fixed quote for the agreed scope, and the recurring plans have clear monthly prices. Software subscriptions and any work outside the agreed scope are identified before they are charged.",
  },
  {
    q: "What decides the final price of a Core Build?",
    a: "The number, size, and complexity of the agreed workflows. One standard workflow starts from $2,500. Connected systems, custom code, or additional workflows receive a fixed quote before work begins, so the price does not drift halfway through.",
  },
  {
    q: "Are software subscriptions included in the price?",
    a: "No. Tools such as your CRM, accounting software, or an automation platform are billed by those companies. We build on the tools you already pay for where we can, and we tell you about any new costs before the build starts.",
  },
  {
    q: "Do I have to buy the Audit before a build?",
    a: "No. The Audit is the easiest place to start, but if you already know which process you want automated, you can book a free call and go straight to a Core Build.",
  },
  {
    q: "What is the difference between Automation Care and AI Growth Partner?",
    a: "Automation Care maintains and improves workflows you already have. AI Growth Partner includes that operating layer plus one standard new workflow each month, priority support, and a quarterly ROI and capacity review.",
  },
];

export default function PricingPage() {
  requireLive(PATH);

  return (
    <>
      <JsonLd
        data={graph(
          {
            "@type": "OfferCatalog",
            "@id": SITE_URL + PATH + "#offers",
            name: "Whispers Lab automation services",
            itemListElement: OFFERS.map((o) => ({
              "@type": "Offer",
              name: o.name,
              description: o.pitch,
              url: SITE_URL + o.href,
              priceCurrency: "USD",
              ...(o.priceUnit
                ? { priceSpecification: { "@type": "UnitPriceSpecification", price: o.priceValue, priceCurrency: "USD", unitText: "MONTH" } }
                : o.key === "core-build"
                  ? { priceSpecification: { "@type": "PriceSpecification", minPrice: o.priceValue, priceCurrency: "USD" } }
                  : { price: o.priceValue }),
              seller: PROVIDER,
            })),
          },
          faqSchema(FAQS),
          breadcrumbSchema(CRUMBS)
        )}
      />
      <PricingPilot crumbs={CRUMBS} faq={FAQS} />
    </>
  );
}
