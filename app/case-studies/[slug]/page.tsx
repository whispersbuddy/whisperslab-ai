import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import NewsletterSection from "@/components/NewsletterSection";
import {
  CASE_STUDIES,
  getCaseStudyBySlug,
  METRICS_DISCLAIMER,
} from "@/app/_content/caseStudiesData";
import { fetchCaseStudies, fetchCaseStudyBySlug } from "@/lib/api";

export async function generateStaticParams() {
  const strapiStudies = await fetchCaseStudies();
  const allSlugs = new Set([...CASE_STUDIES.map(cs => cs.slug)]);
  if (Array.isArray(strapiStudies)) {
    strapiStudies.forEach((cs: any) => allSlugs.add(cs.slug));
  }
  return Array.from(allSlugs).map(slug => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const staticCs = getCaseStudyBySlug(slug);
  const strapiCs = await fetchCaseStudyBySlug(slug);
  
  if (!staticCs && !strapiCs) return {};
  
  const cs = { ...staticCs, ...strapiCs };
  if (!cs || !cs.title) return {};

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
  const staticCs = getCaseStudyBySlug(slug);
  const strapiCs = await fetchCaseStudyBySlug(slug);
  
  if (!staticCs && !strapiCs) notFound();

  const cs = {
    ...staticCs,
    ...strapiCs,
  };
  
  if (staticCs && strapiCs && strapiCs.detail) {
    cs.detail = { ...staticCs.detail, ...strapiCs.detail };
  } else if (!cs.detail && staticCs) {
    cs.detail = staticCs.detail;
  }

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
              <div className="case-detail-tools">
                {cs.detail.tools?.map((tool: string) => (
                  <span className="case-detail-tool" key={tool}>
                    {tool}
                  </span>
                ))}
              </div>

              {cs.detail.media && Array.isArray(cs.detail.media) && cs.detail.media.length > 0 && (
                <div className="case-detail-section case-detail-media" style={{ marginTop: '2.5rem' }}>
                  {cs.detail.media.map((item: any, i: number) => {
                    const isUrl = typeof item === 'string';
                    const url = isUrl ? item : item.url;
                    const isVideo = url.match(/\.(mp4|webm|ogg)$/i) || (!isUrl && item.type === 'video');
                    
                    if (isVideo) {
                      return (
                        <video key={i} src={url} controls style={{ width: '100%', marginBottom: '1.5rem', borderRadius: '8px' }} />
                      );
                    }
                    return (
                      <img key={i} src={url} alt={!isUrl && item.alt ? item.alt : ''} style={{ width: '100%', marginBottom: '1.5rem', borderRadius: '8px' }} />
                    );
                  })}
                </div>
              )}

              <div className="case-detail-section">
                <h2>The situation</h2>
                {cs.detail.situation?.map((p: string, i: number) => (
                  <p key={i}>{p}</p>
                ))}
              </div>

              <div className="case-detail-section">
                <h2>What we built</h2>
                {cs.detail.whatWeBuilt?.map((p: string, i: number) => (
                  <p key={i}>{p}</p>
                ))}
              </div>

              <div className="case-detail-section">
                <h2>How it works</h2>
                <ol className="case-detail-steps">
                  {cs.detail.howItWorks?.map((step: string, i: number) => (
                    <li key={i}>
                      <span className="case-detail-step-index">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ol>
              </div>

              <div className="case-detail-section">
                <h2>The challenges we solved</h2>
                <ul className="case-detail-challenges">
                  {cs.detail.challenges?.map((c: string, i: number) => (
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
                {cs.detail.result?.map((p: string, i: number) => (
                  <p key={i}>{p}</p>
                ))}
              </div>

              <div className="case-detail-numbers case-numbers">
                {cs.metrics?.map((m: any) => (
                  <div className="case-metric" key={m.label}>
                    <span className="case-metric-num">{m.num}</span>
                    <span className="case-metric-label">{m.label}</span>
                  </div>
                ))}
              </div>
              <span className="case-metrics-disclaimer">
                * {METRICS_DISCLAIMER}
              </span>

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
