import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import IndustriesHub from "@/components/industry/IndustriesHub";
import type { FaqItem } from "@/components/sections/Faq";
import { liveRoutes } from "@/lib/routes";
import { breadcrumbSchema, buildMetadata, faqSchema, graph, requireLive, SITE_URL } from "@/lib/seo";

const PATH = "/industries";

export const metadata: Metadata = buildMetadata({
  title: "Industries We Automate For | Whispers Lab",
  description:
    "Whispers Lab builds automation for small businesses across industries: law firms, real estate, e-commerce, property management, and accounting.",
  path: PATH,
});

const CRUMBS = [
  { name: "Home", path: "/" },
  { name: "Industries", path: PATH },
];

const FAQS: FaqItem[] = [
  {
    q: "Do you have experience in my industry?",
    a: "We build for small business owners across many industries. If we haven't published a case study in your exact field yet, we show you the closest real build, honestly labeled as a different industry, and tell you why the same pattern applies.",
  },
  {
    q: "What if my industry isn't listed here?",
    a: "These are the industries we've built dedicated pages for so far. If yours isn't listed, book a free discovery call and describe the manual work you want gone. The busywork behind most small businesses looks more alike than different.",
  },
  {
    q: "Do industry-specific rules and compliance get considered?",
    a: "Yes. Every project starts by mapping your specific compliance needs, such as attorney-client privilege or financial recordkeeping, before anything is built.",
  },
  {
    q: "Will automation replace my staff?",
    a: "No. Automation removes the retyping, chasing, and copying between systems, not the judgment. Your team spends that time on work that needs a person.",
  },
  {
    q: "How much does industry-specific automation cost?",
    a: "Every build is quoted as a fixed price before we start, regardless of industry. See the pricing page for the packages and what each one includes.",
  },
  {
    q: "How long does it take?",
    a: "Most builds go live in under 30 days, including testing in a safe copy of your setup before it touches real data.",
  },
];

export default function IndustriesHubPage() {
  requireLive(PATH);

  const industries = liveRoutes("industries");

  return (
    <>
      <JsonLd
        data={graph(
          {
            "@type": "ItemList",
            "@id": SITE_URL + PATH + "#industries",
            itemListElement: industries.map((r, idx) => ({
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
      <IndustriesHub routes={industries} crumbs={CRUMBS} faq={FAQS} />
    </>
  );
}
