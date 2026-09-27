import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import { ServicesHubPilot } from "@/components/pilots/ExpansionHubs";
import type { FaqItem } from "@/components/sections/Faq";
import { liveRoutes } from "@/lib/routes";
import { breadcrumbSchema, buildMetadata, faqSchema, graph, requireLive, SITE_URL } from "@/lib/seo";

const PATH = "/services";

export const metadata: Metadata = buildMetadata({
  title: "AI Automation Services for Small Businesses | Whispers Lab",
  description:
    "Business automation services built around the busywork that eats your week: data entry, bookkeeping, client onboarding, lead follow-up, and software integration.",
  path: PATH,
});

const CRUMBS = [
  { name: "Home", path: "/" },
  { name: "Services", path: PATH },
];

const FAQS: FaqItem[] = [
  {
    q: "Which automation service should I start with?",
    a: "Start with whichever manual task costs your team the most hours each week. If you are not sure, the $250 Automation Audit maps your workflows and ranks them for you, so you don't have to guess.",
  },
  {
    q: "Do you build more than one automation at a time?",
    a: "A standard Core Build starts with one agreed workflow so the scope, acceptance tests, and fixed price stay clear. Connected or additional workflows can be quoted together when they genuinely need to launch as one system.",
  },
  {
    q: "What if my process doesn't match one of these services?",
    a: "These are the automations we build most often, not a fixed menu. Book a free discovery call and describe the manual work you want gone. If it can be automated, we'll tell you honestly.",
  },
  {
    q: "Do the automations run in my own accounts?",
    a: "Yes. Every workflow runs in your own software accounts, not ours. You get error alerts, written docs, and a video walkthrough, and you keep full access if you ever want to bring the work in-house.",
  },
  {
    q: "How fast can a service go live?",
    a: "Most Core Build projects go live in under 30 days, including testing in a safe copy of your setup before it touches real data.",
  },
  {
    q: "What does an automation service cost?",
    a: "The Automation Audit is a flat $250. One standard Core Build workflow starts from $2,500, quoted as a fixed price before we start. Connected or additional workflows receive a fixed quote, with no hidden hourly billing.",
  },
];

export default function ServicesHubPage() {
  requireLive(PATH);

  const services = liveRoutes("services");
  return (
    <>
      <JsonLd
        data={graph(
          {
            "@type": "ItemList",
            "@id": SITE_URL + PATH + "#services",
            itemListElement: services.map((s, i) => ({
              "@type": "ListItem",
              position: i + 1,
              url: SITE_URL + s.path,
              name: s.label,
            })),
          },
          faqSchema(FAQS),
          breadcrumbSchema(CRUMBS)
        )}
      />
      <ServicesHubPilot routes={services} crumbs={CRUMBS} faq={FAQS} />
    </>
  );
}
