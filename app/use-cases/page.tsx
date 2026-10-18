import type { Metadata } from "next";
import { DEPARTMENTS } from "@/app/_content/useCases";
import JsonLd from "@/components/JsonLd";
import { UseCasesHub } from "@/components/usecases/UseCasePages";
import { breadcrumbSchema, buildMetadata, faqSchema, graph, requireLive, SITE_URL } from "@/lib/seo";

const PATH = "/use-cases";

export const metadata: Metadata = buildMetadata({
  title: "Small Business Automation Ideas by Department | Whispers Lab",
  description:
    "Reusable automation ideas for small businesses, grouped by department: finance, e-commerce, sales, support, operations and CRM. See what runs on its own and what stays with a person.",
  path: PATH,
});

const CRUMBS = [
  { name: "Home", path: "/" },
  { name: "Use cases", path: PATH },
];

const FAQS = [
  {
    q: "What is small business automation?",
    a: "Small business automation is software that does the repeated parts of your work, such as copying data between tools, sending reminders and building reports, so your team does not have to. It works best on tasks that repeat often, follow the same steps and need little judgment.",
  },
  {
    q: "What are examples of workflow automation?",
    a: "Common examples are reading invoices into your accounting tool, sending orders from your store to a shipping tool, logging emails to the right CRM record, reminding clients of upcoming dates and building a weekly report. Each department page on this site lists the ideas with how they run.",
  },
  {
    q: "Where should a small business start with automation?",
    a: "Start with the task that repeats most, follows the same steps and costs the most hours a week. Counting those hours first is the fastest way to pick. The $250 Whispers Lab Automation Audit does that ranking for you and names the first build.",
  },
  {
    q: "Do I need new software to automate my business?",
    a: "Usually not. Most ideas run on the tools you already pay for, connected through platforms such as Zapier, n8n, Make or Airtable. The audit checks that before anything is built.",
  },
  {
    q: "How much does it cost to automate a workflow?",
    a: "At Whispers Lab the Automation Audit is $250 and is credited toward a build. One standard workflow starts from $2,500 at a fixed price and goes live in under 30 days. Optional upkeep starts from $500 a month.",
  },
];

export default function UseCasesPage() {
  requireLive(PATH);
  return (
    <>
      <JsonLd
        data={graph(
          {
            "@type": "CollectionPage",
            "@id": SITE_URL + PATH + "#page",
            name: "Small business automation ideas by department",
            url: SITE_URL + PATH,
            hasPart: DEPARTMENTS.map((d) => ({ "@type": "WebPage", name: d.name, url: `${SITE_URL}${PATH}/${d.slug}` })),
          },
          faqSchema(FAQS),
          breadcrumbSchema(CRUMBS)
        )}
      />
      <UseCasesHub crumbs={CRUMBS} faq={FAQS} />
    </>
  );
}
