import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import { AutomationCarePilot } from "@/components/pilots/CommercialPilots";
import type { FaqItem } from "@/components/sections/Faq";
import { breadcrumbSchema, buildMetadata, faqSchema, graph, PROVIDER, requireLive, SITE_URL } from "@/lib/seo";

const PATH = "/automation-care";

export const metadata: Metadata = buildMetadata({
  title: "Automation Monitoring & Maintenance | Automation Care",
  description:
    "Keep existing business automations healthy for $500 a month with monitoring, repairs, connection checks, monthly reporting, and one small optimization.",
  path: PATH,
});

const CRUMBS = [
  { name: "Home", path: "/" },
  { name: "Pricing", path: "/pricing" },
  { name: "Automation Care", path: PATH },
];

const FAQS: FaqItem[] = [
  {
    q: "What does Automation Care include?",
    a: "Automation Care includes monitoring for the workflows agreed during onboarding, investigation and repair of failures inside that scope, connection and credential checks, one small optimization each month, documentation updates, and a monthly health report.",
  },
  {
    q: "How much does Automation Care cost?",
    a: "Automation Care is $500 a month. The exact workflows covered are confirmed before the plan begins so there is no open-ended maintenance scope or surprise hourly billing.",
  },
  {
    q: "Does Automation Care include a new workflow every month?",
    a: "No. Automation Care maintains the workflows you already rely on and includes one small optimization, such as changing a rule, field, notification, or report. Choose AI Growth Partner if you want one standard new workflow built each month.",
  },
  {
    q: "Can Whispers Lab maintain automations built by someone else?",
    a: "Sometimes. We first review how the workflows were built, where they run, and whether they are documented and supportable. If cleanup is required before they can be monitored responsibly, we scope that work separately.",
  },
  {
    q: "How quickly will you respond when something breaks?",
    a: "Eligible support requests are acknowledged within one business day. Resolution time depends on the cause, especially when a third-party application or API is unavailable, but you receive a clear update on what happened and what happens next.",
  },
  {
    q: "Who owns the workflows and documentation?",
    a: "You do. Supported workflows remain in your own accounts, and the documentation is kept current so you are not locked in to Whispers Lab.",
  },
];

export default function AutomationCarePage() {
  requireLive(PATH);

  return (
    <>
      <JsonLd
        data={graph(
          {
            "@type": "Service",
            "@id": SITE_URL + PATH + "#service",
            name: "Automation Care",
            serviceType: "Automation monitoring and maintenance services",
            description:
              "Monthly monitoring, maintenance, repair, documentation, and small optimization for existing business automation workflows.",
            provider: PROVIDER,
            areaServed: { "@type": "Country", name: "United States" },
            audience: { "@type": "BusinessAudience", audienceType: "Small businesses with existing automations" },
            offers: {
              "@type": "Offer",
              priceCurrency: "USD",
              priceSpecification: { "@type": "UnitPriceSpecification", price: 500, priceCurrency: "USD", unitText: "MONTH" },
            },
          },
          faqSchema(FAQS),
          breadcrumbSchema(CRUMBS)
        )}
      />
      <AutomationCarePilot crumbs={CRUMBS} faq={FAQS} />
    </>
  );
}
