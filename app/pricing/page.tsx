import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import PricingPage from "@/components/pricing/PricingPage";
import type { FaqItem } from "@/components/sections/Faq";
import { OFFERS } from "@/lib/offers";
import { breadcrumbSchema, buildMetadata, faqSchema, graph, PROVIDER, requireLive, SITE_URL } from "@/lib/seo";

const PATH = "/pricing";

export const metadata: Metadata = buildMetadata({
  title: "AI Automation Agency Pricing | Whispers Lab",
  description:
    "Clear AI automation pricing: a $250 Automation Audit, Core Builds from $2,500, $500/month Automation Care, and Growth Partner plans from $1,250/month. Start with a free discovery call.",
  path: PATH,
});

const CRUMBS = [
  { name: "Home", path: "/" },
  { name: "Pricing", path: PATH },
];

const FAQS: FaqItem[] = [
  {
    q: "How much does AI automation cost for a small business?",
    a: "With Whispers Lab, you can start with a $250 Automation Audit. A standard Core Build starts from $2,500 for one agreed workflow. Automation Care is $500 a month, while AI Growth Partner plans start from $1,250 a month and include one standard new workflow each month. Every project begins with a free discovery call.",
  },
  {
    q: "Is the $250 Audit credited toward a build?",
    a: "Yes. If you hire Whispers Lab for a Core Build after your Audit, the full $250 is credited toward the build price.",
  },
  {
    q: "Do I have to buy the Audit before a build?",
    a: "No. The Audit is the easiest place to start, but if you already know which process you want automated, you can book a free call and go straight to a Core Build.",
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
    q: "What does Automation Care include?",
    a: "Automation Care includes monitoring for the workflows agreed during onboarding, investigation and repair of failures inside that scope, connection and credential checks, one small optimization each month, documentation updates, and a monthly health report. It is $500 a month.",
  },
  {
    q: "What are automation maintenance services?",
    a: "Automation maintenance services keep your business workflows running after they are built. That means watching for errors, fixing steps that break when apps change, keeping connections to your tools working, and improving workflows as your business changes. Whispers Lab offers this as Automation Care, and as part of the AI Growth Partner plan.",
  },
  {
    q: "What is the difference between Automation Care and AI Growth Partner?",
    a: "Automation Care maintains and improves workflows you already have. AI Growth Partner includes that operating layer plus one standard new workflow each month, priority support, backlog management, and a quarterly ROI and capacity review.",
  },
  {
    q: "How big is the new workflow each month on Growth Partner?",
    a: "A standard monthly workflow is a focused automation that can be designed, tested, launched, and documented inside the monthly cycle, such as a reminder sequence, scheduled report, or connection between two or three existing tools. Major migrations, custom applications, and large rebuilds are scoped separately.",
  },
  {
    q: "What happens when an automation breaks?",
    a: "Workflows we support send an alert when a run fails. On Automation Care, eligible requests are acknowledged within one business day. On AI Growth Partner, eligible production issues are acknowledged within four business hours during the support window. Either way, we tell you what happened, what is affected, and what happens next. Resolution time can depend on third-party software and APIs.",
  },
  {
    q: "Who owns the workflows and documentation?",
    a: "You do. Your workflows live in your own accounts, with documentation and walkthroughs, so you are never locked in to Whispers Lab.",
  },
];

export default function PricingRoute() {
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
      <PricingPage crumbs={CRUMBS} faq={FAQS} />
    </>
  );
}
