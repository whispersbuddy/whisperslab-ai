import type { Metadata } from "next";
import PageBanner from "@/components/PageBanner";
import JsonLd from "@/components/JsonLd";
import NewsletterSection from "@/components/NewsletterSection";
import CtaBand from "@/components/sections/CtaBand";
import Faq, { type FaqItem } from "@/components/sections/Faq";
import SiteIcon from "@/components/SiteIcon";
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
    a: "Yes. Every build starts with the Automation Audit, where we map your specific compliance needs, such as attorney-client privilege or financial recordkeeping, before anything is built.",
  },
  {
    q: "Will automation replace my staff?",
    a: "No. Automation removes the retyping, chasing, and copying between systems, not the judgment. Your team spends that time on work that needs a person.",
  },
  {
    q: "How much does industry-specific automation cost?",
    a: "The Automation Audit is a flat $250. Builds start from $2,500, quoted as a fixed price before we start, regardless of industry.",
  },
  {
    q: "How long does it take?",
    a: "Most Core Build projects go live in under 30 days, including testing in a safe copy of your setup before it touches real data.",
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
      <main>
        <PageBanner
          eyebrow="INDUSTRIES"
          title="Automation built for"
          highlight="how your industry actually works."
          intro="The busywork looks different in every industry. The fix is usually the same: fewer systems, less retyping, and a person only where judgment is needed."
          crumbs={CRUMBS}
        />

        <section className="section">
          <div className="container">
            <div className="sv-ind-grid">
              {industries.map((r) => (
                <a key={r.path} href={r.path} className="sv-ind">
                  <span className="sv-ind-icon">
                    <SiteIcon name={r.icon} size={20} />
                  </span>
                  <span>
                    <b>{r.label}</b>
                    <span>{r.blurb}</span>
                  </span>
                </a>
              ))}
            </div>
          </div>
        </section>

        <Faq title="Questions about industry fit." items={FAQS} />
        <CtaBand
          title="Don't see your industry?"
          body="Book a free discovery call and tell us what's eating your week. If it can be automated, we'll tell you honestly."
          primary={{ href: "/audit", label: "See the $250 Automation Audit" }}
          secondary={{ href: "/book", label: "Book a free discovery call" }}
        />
        <NewsletterSection />
      </main>
    </>
  );
}
