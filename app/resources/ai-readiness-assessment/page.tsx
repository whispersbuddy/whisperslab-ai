import type { Metadata } from "next";
import PageBanner from "@/components/PageBanner";
import JsonLd from "@/components/JsonLd";
import NewsletterSection from "@/components/NewsletterSection";
import Faq from "@/components/sections/Faq";
import ReadinessQuiz from "@/components/resources/ReadinessQuiz";
import { READINESS_BANDS, READINESS_FAQ, READINESS_MAX_SCORE, READINESS_QUESTIONS, READINESS_SEO } from "@/app/_content/resources";
import { breadcrumbSchema, buildMetadata, faqSchema, graph, requireLive, SITE_URL } from "@/lib/seo";

const PATH = "/resources/ai-readiness-assessment";

export const metadata: Metadata = buildMetadata({
  title: READINESS_SEO.title,
  description: READINESS_SEO.description,
  path: PATH,
});

const CRUMBS = [
  { name: "Home", path: "/" },
  { name: "AI Readiness Assessment", path: PATH },
];

export default function ReadinessAssessmentPage() {
  requireLive(PATH);

  return (
    <>
      <JsonLd
        data={graph(
          {
            "@type": "WebApplication",
            "@id": SITE_URL + PATH + "#tool",
            name: "AI Readiness Assessment",
            applicationCategory: "BusinessApplication",
            url: SITE_URL + PATH,
            offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
            isPartOf: { "@type": "Organization", name: "Whispers Lab", url: SITE_URL },
          },
          faqSchema(READINESS_FAQ.items),
          breadcrumbSchema(CRUMBS)
        )}
      />
      <main>
        <PageBanner
          eyebrow="FREE TOOL · 3 MINUTES"
          title="Is this task ready to"
          highlight="automate?"
          intro="Pick one repetitive task and answer six questions. You'll get a score and an honest read on what to fix first, if anything."
          crumbs={CRUMBS}
        />

        <section className="section">
          <div className="container">
            <ReadinessQuiz questions={READINESS_QUESTIONS} bands={READINESS_BANDS} maxScore={READINESS_MAX_SCORE} />
          </div>
        </section>

        <Faq title={READINESS_FAQ.title} items={READINESS_FAQ.items} />
        <NewsletterSection />
      </main>
    </>
  );
}
