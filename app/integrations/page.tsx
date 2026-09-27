import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import { IntegrationsHubPilot } from "@/components/pilots/ExpansionHubs";
import type { FaqItem } from "@/components/sections/Faq";
import { liveRoutes } from "@/lib/routes";
import { breadcrumbSchema, buildMetadata, faqSchema, graph, requireLive, SITE_URL } from "@/lib/seo";

const PATH = "/integrations";

export const metadata: Metadata = buildMetadata({
  title: "Automation Tools We Work In | Whispers Lab",
  description:
    "Whispers Lab builds automations inside the tools you already use: Airtable, n8n, and Zapier. See how each one fits, honestly, before you commit to it.",
  path: PATH,
});

const CRUMBS = [
  { name: "Home", path: "/" },
  { name: "Integrations", path: PATH },
];

const FAQS: FaqItem[] = [
  {
    q: "Do I need to already have one of these tools?",
    a: "No. Most clients don't know which platform fits until the Automation Audit maps their workflows. We recommend the tool, not the other way around.",
  },
  {
    q: "What if the tool we use isn't listed here?",
    a: "These are the platforms we work in most often, not a fixed list. If your business runs on something else, book a free discovery call and tell us. If it has an API, we can usually work with it.",
  },
  {
    q: "Do you specialize in one platform?",
    a: "No, on purpose. Recommending one tool for every business would mean fitting your problem to our favorite software instead of the other way around. We pick the platform that matches your workflow.",
  },
  {
    q: "Can these tools work together?",
    a: "Yes, often in the same build. Airtable might hold your data while n8n or Zapier moves it between apps and fires alerts. The Automation Audit maps out which tools your workflow actually needs.",
  },
  {
    q: "Are you a certified partner for these tools?",
    a: "No. We don't hold or claim official certifications. These tools show up in many of our builds, and we tell you honestly which one fits, without steering you toward a partnership we get paid for.",
  },
  {
    q: "What does it cost to build on one of these tools?",
    a: "The Automation Audit is a flat $250 and maps which tool and workflows are worth building. Builds are quoted as a fixed price starting from $2,500, with the $250 credited toward it. Any subscription cost for the tool itself is separate and estimated during the Audit.",
  },
];

export default function IntegrationsHubPage() {
  requireLive(PATH);

  const integrations = liveRoutes("integrations");
  return (
    <>
      <JsonLd
        data={graph(
          {
            "@type": "ItemList",
            "@id": SITE_URL + PATH + "#integrations",
            itemListElement: integrations.map((r, idx) => ({
              "@type": "ListItem",
              position: idx + 1,
              url: SITE_URL + r.path,
              name: r.label,
            })),
          },
          faqSchema(FAQS),
          breadcrumbSchema(CRUMBS)
        )}
      />
      <IntegrationsHubPilot routes={integrations} crumbs={CRUMBS} faq={FAQS} />
    </>
  );
}
