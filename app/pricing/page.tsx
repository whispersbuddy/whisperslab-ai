import type { Metadata } from "next";
import PageBanner from "@/components/PageBanner";
import JsonLd from "@/components/JsonLd";
import NewsletterSection from "@/components/NewsletterSection";
import PricingCards from "@/components/sections/PricingCards";
import Faq, { type FaqItem } from "@/components/sections/Faq";
import CtaBand from "@/components/sections/CtaBand";
import { OFFERS } from "@/lib/offers";
import { breadcrumbSchema, buildMetadata, faqSchema, graph, PROVIDER, requireLive, SITE_URL } from "@/lib/seo";

const PATH = "/pricing";

export const metadata: Metadata = buildMetadata({
  title: "AI Automation Agency Pricing | Whispers Lab",
  description:
    "Clear, fixed pricing for AI automation: a $250 Automation Audit, builds from $2,500, and a $500/month Growth Partner plan. No hourly billing.",
  path: PATH,
});

const CRUMBS = [
  { name: "Home", path: "/" },
  { name: "Pricing", path: PATH },
];

const ROWS: { label: string; get: (o: (typeof OFFERS)[number]) => string }[] = [
  { label: "Price", get: (o) => o.price },
  { label: "What you get", get: (o) => o.pitch },
  { label: "Timeline", get: (o) => o.timeline },
  { label: "Best for", get: (o) => o.bestFor },
];

const PATHS = [
  {
    step: "Not sure what to automate yet?",
    answer: "Start with the Automation Audit.",
    body: "In 7 days we find your biggest time-wasters and rank them. You keep the plan either way.",
    href: "/audit",
  },
  {
    step: "Already know the problem?",
    answer: "Go straight to the Core Build.",
    body: "We scope it on a free call, give you a fixed price, and have it running in under 30 days.",
    href: "/core-build",
  },
  {
    step: "Already running automations?",
    answer: "Add the AI Growth Partner plan.",
    body: "We keep everything healthy and build one new workflow for you every month.",
    href: "/growth-partner",
  },
];

const FAQS: FaqItem[] = [
  {
    q: "How much does AI automation cost for a small business?",
    a: "With Whispers Lab, you can start with a $250 Automation Audit. Builds start from $2,500 for 2 to 3 automations, quoted as a fixed price before any work begins. Ongoing maintenance with a new workflow every month is $500 a month.",
  },
  {
    q: "Is the $250 Audit credited toward a build?",
    a: "Yes. If you hire Whispers Lab for a Core Build after your Audit, the full $250 is credited toward the build price.",
  },
  {
    q: "Do you charge by the hour?",
    a: "No. Every Whispers Lab price is fixed. The Audit is a flat $250, builds get a fixed quote based on the workflows we agree on, and the Growth Partner plan is a flat $500 a month. There is no hourly billing and no surprise invoices.",
  },
  {
    q: "What decides the final price of a Core Build?",
    a: "The number and size of the automations. A Core Build covers the 2 to 3 workflows that save you the most time, starting from $2,500. We agree the exact scope and price before we start, so it doesn't change halfway through.",
  },
  {
    q: "Are software subscriptions included in the price?",
    a: "No. Tools such as your CRM, accounting software, or an automation platform are billed by those companies. We build on the tools you already pay for where we can, and we tell you about any new costs before the build starts.",
  },
  {
    q: "Do I have to buy the Audit before a build?",
    a: "No. The Audit is the easiest place to start, but if you already know which process you want automated, you can book a free call and go straight to a Core Build.",
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
      <main>
        <PageBanner
          eyebrow="PRICING"
          title="Simple, fixed pricing for"
          highlight="AI automation."
          intro="Three ways to work with us. No hourly billing, no surprise invoices, and the $250 Audit is credited if you build with us."
          crumbs={CRUMBS}
        />

        <section className="section pricing-section pricing-page">
          <div className="container">
            <PricingCards />
          </div>
        </section>

        <section className="section">
          <div className="container">
            <div className="section-head-center">
              <span className="eyebrow">WHICH ONE FITS YOU?</span>
              <h2>Pick the starting point that matches where you are.</h2>
            </div>
            <div className="fit-paths">
              {PATHS.map((p) => (
                <a key={p.href} href={p.href} className="fit-path">
                  <span className="fit-path-step">{p.step}</span>
                  <strong>{p.answer}</strong>
                  <span className="fit-path-body">{p.body}</span>
                  <span className="fit-path-go">Learn more →</span>
                </a>
              ))}
            </div>
          </div>
        </section>

        <section className="section">
          <div className="container">
            <div className="section-head-center">
              <span className="eyebrow">SIDE BY SIDE</span>
              <h2>Compare the plans.</h2>
            </div>
            <div className="compare-scroll">
              <table className="compare-table">
                <caption className="sr-only">Comparison of the Automation Audit, Core Build, and AI Growth Partner plans</caption>
                <thead>
                  <tr>
                    <th scope="col">
                      <span className="sr-only">Plan detail</span>
                    </th>
                    {OFFERS.map((o) => (
                      <th key={o.key} scope="col">
                        {o.name}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {ROWS.map((row) => (
                    <tr key={row.label}>
                      <th scope="row">{row.label}</th>
                      {OFFERS.map((o) => (
                        <td key={o.key}>{row.get(o)}</td>
                      ))}
                    </tr>
                  ))}
                  <tr>
                    <th scope="row">Included</th>
                    {OFFERS.map((o) => (
                      <td key={o.key}>
                        <ul>
                          {o.includes.map((i) => (
                            <li key={i}>{i}</li>
                          ))}
                        </ul>
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <Faq title="Pricing questions, answered." items={FAQS} />
        <CtaBand
          title="Not sure which plan you need?"
          body="Book a free discovery call. We'll look at your week and tell you honestly where to start, even if that's nowhere yet."
          primary={{ href: "/book", label: "Book a free discovery call" }}
          secondary={{ href: "/audit", label: "See the $250 Audit" }}
        />
        <NewsletterSection />
      </main>
    </>
  );
}
