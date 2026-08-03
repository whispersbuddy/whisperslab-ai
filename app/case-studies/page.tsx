import type { Metadata } from "next";
import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import NewsletterSection from "@/components/NewsletterSection";
import { CASE_STUDIES } from "@/app/_content/caseStudiesData";

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

export default function CaseStudiesPage() {
  return (
    <>
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
              {CASE_STUDIES.map((cs) => (
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
                    {cs.metrics.map((m) => (
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
