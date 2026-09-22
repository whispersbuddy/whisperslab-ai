import type { Metadata } from "next";
import PageBanner from "@/components/PageBanner";
import JsonLd from "@/components/JsonLd";
import NewsletterSection from "@/components/NewsletterSection";
import CtaBand from "@/components/sections/CtaBand";
import Faq from "@/components/sections/Faq";
import Estimator from "@/components/service/Estimator";
import { ROI_CALCULATOR } from "@/app/_content/resources";
import { breadcrumbSchema, buildMetadata, faqSchema, graph, requireLive, SITE_URL } from "@/lib/seo";

const PATH = "/resources/automation-roi-calculator";

export const metadata: Metadata = buildMetadata({
  title: ROI_CALCULATOR.seo.title,
  description: ROI_CALCULATOR.seo.description,
  path: PATH,
});

const CRUMBS = [
  { name: "Home", path: "/" },
  { name: "ROI Calculator", path: PATH },
];

export default function RoiCalculatorPage() {
  requireLive(PATH);
  const { hero, estimator, benchmarks, faq, cta } = ROI_CALCULATOR;

  return (
    <>
      <JsonLd
        data={graph(
          {
            "@type": "WebApplication",
            "@id": SITE_URL + PATH + "#tool",
            name: "Automation ROI Calculator",
            applicationCategory: "BusinessApplication",
            url: SITE_URL + PATH,
            offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
            isPartOf: { "@type": "Organization", name: "Whispers Lab", url: SITE_URL },
          },
          faqSchema(faq.items),
          breadcrumbSchema(CRUMBS)
        )}
      />
      <main>
        <PageBanner eyebrow={hero.eyebrow} title={hero.title} highlight={hero.highlight} intro={hero.intro} crumbs={CRUMBS} />

        <section className="section sv-section sv-dark" id="estimate">
          <div className="container">
            <div className="sv-head">
              <span className="eyebrow eyebrow-light">{estimator.eyebrow}</span>
              <h2>{estimator.title}</h2>
              <p className="sv-intro">{estimator.intro}</p>
            </div>
            <Estimator inputs={estimator.inputs} unit={estimator.unit} />
            <div className="sv-worth">
              {estimator.worth.map((w) => (
                <span key={w}>{w}</span>
              ))}
            </div>
          </div>
        </section>

        <section className="section">
          <div className="container">
            <div className="section-head-center">
              <span className="eyebrow">{benchmarks.eyebrow}</span>
              <h2>{benchmarks.title}</h2>
              <p>{benchmarks.intro}</p>
            </div>
            <div className="sv-more" style={{ marginTop: 36 }}>
              {benchmarks.rows.map((r) => (
                <a key={r.slug} className="sv-mr" href={`/case-studies/${r.slug}`}>
                  <span className="sv-mr-n">{r.big}</span>
                  <span>
                    <b>{r.title}</b>
                    <span>{r.detail}</span>
                  </span>
                </a>
              ))}
            </div>
          </div>
        </section>

        <Faq title={faq.title} items={faq.items} />
        <CtaBand
          title={cta.title}
          body={cta.body}
          primary={{ href: "/audit", label: "See the $250 Automation Audit" }}
          secondary={{ href: "/book", label: "Book a free discovery call" }}
        />
        <NewsletterSection />
      </main>
    </>
  );
}
