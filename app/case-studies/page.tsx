import type { Metadata } from "next";
import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import NewsletterSection from "@/components/NewsletterSection";
import { CASE_STUDIES, getCaseStudyBySlug } from "@/app/_content/caseStudiesData";
import { fetchCaseStudies } from "@/lib/api";

export const metadata: Metadata = {
  title: "Case Studies — Whispers Lab",
  description:
    "Real systems we've built for real small businesses, rebuilt from manual chaos into quiet automation.",
  alternates: { canonical: "/case-studies" },
  openGraph: {
    type: "website",
    siteName: "Whispers Lab",
    locale: "en_US",
    title: "Case Studies — Whispers Lab",
    description:
      "Real systems we've built for real small businesses, rebuilt from manual chaos into quiet automation.",
    url: "/case-studies",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Whispers Lab — We delete busywork.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Case Studies — Whispers Lab",
    description:
      "Real systems we've built for real small businesses, rebuilt from manual chaos into quiet automation.",
    images: ["/og-image.png"],
  },
};

const SITE_URL = "https://www.whisperslab.com";

export default async function CaseStudiesPage() {
  const strapiData = await fetchCaseStudies();
  const strapiStudies = Array.isArray(strapiData) && strapiData.length > 0 ? strapiData : CASE_STUDIES;

  const studies = strapiStudies.map((study: any) => {
    const staticData = getCaseStudyBySlug(study.slug) || CASE_STUDIES.find(c => c.title === study.title);
    return {
      ...staticData,
      ...study, // Strapi overwrites static
    };
  });

  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Case Studies",
    description:
      "Real systems Whispers Lab has built for real small businesses, rebuilt from manual chaos into quiet automation.",
    url: `${SITE_URL}/case-studies`,
    mainEntity: {
      "@type": "ItemList",
      itemListElement: studies.map((cs: any, index: number) => ({
        "@type": "ListItem",
        position: index + 1,
        url: `${SITE_URL}/case-studies/${cs.slug}`,
        name: cs.title,
      })),
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
      />
      <SiteHeader />
      <main>
        <section className="contact-banner">
          <div className="container">
            <span className="eyebrow eyebrow-light">
              REAL RESULTS · CASE STUDIES
            </span>
            <h1>Every system we&apos;ve built, in one place.</h1>
          </div>
        </section>

        <section className="section case-section">
          <div className="container">
            <div className="cases-list">
              {studies.map((cs: any) => (
                <article className="case-study" key={cs.slug}>
                  <div className="case-study-head">
                    <div className="case-tags">
                      <span className="case-industry">{cs.industry}</span>
                      <span
                        className={
                          cs.buildType === "ai"
                            ? "case-build case-build-ai"
                            : "case-build case-build-auto"
                        }
                      >
                        {cs.buildType === "ai" ? "AI-POWERED" : "AUTOMATED"}
                      </span>
                    </div>
                    <h3>{cs.title}</h3>
                    <p className="case-goal">
                      <strong>The goal:</strong> {cs.goal}
                    </p>
                  </div>
                  <div className="case-study-body">
                    <div className="case-block case-before">
                      <span className="case-label case-label-before">
                        BEFORE · THE PAIN
                      </span>
                      <p>{cs.before}</p>
                    </div>
                    <div className="case-block case-after">
                      <span className="case-label case-label-after">
                        AFTER · THE OUTPUT
                      </span>
                      <p>{cs.after}</p>
                    </div>
                  </div>
                  <div className="case-numbers">
                    {cs.metrics.map((m: any) => (
                      <div className="case-metric" key={m.label}>
                        <span className="case-metric-num">{m.num}</span>
                        <span className="case-metric-label">{m.label}</span>
                      </div>
                    ))}
                  </div>
                  <div className="case-study-more">
                    <Link href={`/case-studies/${cs.slug}`}>
                      Read the full case study →
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <NewsletterSection />
      </main>
      <SiteFooter />
    </>
  );
}
