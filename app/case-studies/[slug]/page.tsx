import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import NewsletterSection from "@/components/NewsletterSection";
import { CASE_STUDIES, getCaseStudyBySlug } from "@/app/_content/caseStudiesData";

export function generateStaticParams() {
  return CASE_STUDIES.map((cs) => ({ slug: cs.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const cs = getCaseStudyBySlug(slug);
  if (!cs) return {};

  const title = `${cs.title} — Whispers Lab Case Study`;
  const description = cs.goal;
  const url = `/case-studies/${cs.slug}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      siteName: "Whispers Lab",
      locale: "en_US",
      title,
      description,
      url,
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
      title,
      description,
      images: ["/og-image.png"],
    },
  };
}

export default async function CaseStudyDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const cs = getCaseStudyBySlug(slug);
  if (!cs) notFound();

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: cs.title,
    description: cs.goal,
    about: cs.industry,
    author: {
      "@type": "Organization",
      name: "Whispers Lab",
    },
    publisher: {
      "@type": "Organization",
      name: "Whispers Lab",
      logo: {
        "@type": "ImageObject",
        url: "https://www.whisperslab.com/assets/logo-trim.png",
      },
    },
    mainEntityOfPage: `https://www.whisperslab.com/case-studies/${cs.slug}`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <SiteHeader />
      <main>
        <section className="case-detail-banner">
          <div className="container">
            <a href="/case-studies" className="case-detail-back">
              ← All case studies
            </a>
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
            <h1>{cs.title}</h1>
            <p className="case-goal">
              <strong>The goal:</strong> {cs.goal}
            </p>
          </div>
        </section>

        <section className="section">
          <div className="container">
            <div className="case-detail-body">
              <p className="case-detail-snapshot">WHO THIS WAS FOR</p>
              <p style={{ color: "#475569", fontSize: "15.5px", lineHeight: 1.7 }}>
                {cs.detail.clientSnapshot}
              </p>

              <div className="case-detail-section">
                <h2>The situation</h2>
                {cs.detail.situation.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>

              <div className="case-detail-section">
                <h2>What we built</h2>
                {cs.detail.whatWeBuilt.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>

              <div className="case-detail-section">
                <h2>The challenges we solved</h2>
                <ul className="case-detail-challenges">
                  {cs.detail.challenges.map((c, i) => (
                    <li key={i}>
                      <span className="promise-check">
                        <svg viewBox="0 0 24 24" fill="none">
                          <path
                            d="M6 12.5l4 4 8-9"
                            stroke="#fff"
                            strokeWidth="2.4"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </span>
                      <span>{c}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="case-detail-section">
                <h2>The result</h2>
                {cs.detail.result.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>

              <div className="case-detail-numbers case-numbers">
                {cs.metrics.map((m) => (
                  <div className="case-metric" key={m.label}>
                    <span className="case-metric-num">{m.num}</span>
                    <span className="case-metric-label">{m.label}</span>
                  </div>
                ))}
              </div>

              <div className="case-detail-cta">
                <p>Want a system like this built for your business?</p>
                <a href="/book" className="btn btn-primary">
                  Book Free Discovery Call
                </a>
              </div>
            </div>
          </div>
        </section>

        <NewsletterSection />
      </main>
      <SiteFooter />
    </>
  );
}
