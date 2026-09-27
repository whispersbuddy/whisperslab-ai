import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import { GrowthPartnerPilot } from "@/components/pilots/CommercialPilots";
import type { FaqItem } from "@/components/sections/Faq";
import { breadcrumbSchema, buildMetadata, faqSchema, graph, PROVIDER, requireLive, SITE_URL } from "@/lib/seo";

const PATH = "/growth-partner";

export const metadata: Metadata = buildMetadata({
  title: "Automation Maintenance Services | AI Growth Partner",
  description:
    "Keep your automations healthy and add one standard workflow every month. AI Growth Partner plans start from $1,250 a month with priority support.",
  path: PATH,
});

const CRUMBS = [
  { name: "Home", path: "/" },
  { name: "Pricing", path: "/pricing" },
  { name: "AI Growth Partner", path: PATH },
];

const FAQS: FaqItem[] = [
  {
    q: "What are automation maintenance services?",
    a: "Automation maintenance services keep your business workflows running after they are built. That means watching for errors, fixing steps that break when apps change, keeping connections to your tools working, and improving workflows as your business changes. Whispers Lab includes all of this in the AI Growth Partner plan.",
  },
  {
    q: "How much does the AI Growth Partner plan cost?",
    a: "AI Growth Partner plans start from $1,250 a month. The plan includes Automation Care, priority support, automation backlog management, one standard new workflow each month, and a quarterly ROI and capacity review.",
  },
  {
    q: "Do I need a Core Build first?",
    a: "Most Growth Partner clients start with a Core Build, so everything is already documented and set up to be monitored. If you already have automations that someone else built, book a free call and we will tell you honestly whether we can look after them.",
  },
  {
    q: "What happens when an automation breaks?",
    a: "Workflows we support send an alert when a run fails. Eligible production issues are acknowledged within four business hours during the support window, and we tell you what happened, what is affected, and what happens next. Resolution time can depend on third-party software and APIs.",
  },
  {
    q: "How big is the new workflow each month?",
    a: "A standard monthly workflow is a focused automation that can be designed, tested, launched, and documented inside the monthly cycle, such as a reminder sequence, scheduled report, or connection between two or three existing tools. Major migrations, custom applications, and large rebuilds are scoped separately.",
  },
  {
    q: "Who owns the automations?",
    a: "You do. Your workflows live in your own accounts, with documentation and video walkthroughs, so you are never locked in to Whispers Lab.",
  },
  {
    q: "How is AI Growth Partner different from Automation Care?",
    a: "Automation Care is for monitoring and maintaining workflows that already exist. AI Growth Partner includes that operating layer plus priority support, one standard new workflow each month, backlog management, and a quarterly ROI and capacity review.",
  },
];

export default function GrowthPartnerPage() {
  requireLive(PATH);

  return (
    <>
      <JsonLd
        data={graph(
          {
            "@type": "Service",
            "@id": SITE_URL + PATH + "#service",
            name: "AI Growth Partner",
            serviceType: "Automation maintenance services",
            description:
              "Monthly monitoring, maintenance, and improvement of business automations, plus one new workflow built every month.",
            provider: PROVIDER,
            areaServed: { "@type": "Country", name: "United States" },
            audience: { "@type": "BusinessAudience", audienceType: "Small businesses" },
            offers: {
              "@type": "Offer",
              priceCurrency: "USD",
              priceSpecification: { "@type": "UnitPriceSpecification", minPrice: 1250, priceCurrency: "USD", unitText: "MONTH" },
            },
          },
          faqSchema(FAQS),
          breadcrumbSchema(CRUMBS)
        )}
      />
      <GrowthPartnerPilot crumbs={CRUMBS} faq={FAQS} />
    </>
  );
}
