import type { Metadata } from "next";
import Link from "next/link";
import NewsletterSection from "@/components/NewsletterSection";
import { CASE_STUDIES, getCaseStudyBySlug, type CaseStudy } from "@/app/_content/caseStudiesData";
import { fetchCaseStudies } from "@/lib/api";

export const metadata: Metadata = {
  title: "Case Studies | Whispers Lab",
  description:
    "Real systems we've built for real small businesses, rebuilt from manual chaos into quiet automation.",
  alternates: { canonical: "/case-studies" },
  openGraph: {
    type: "website",
    siteName: "Whispers Lab",
    locale: "en_US",
    title: "Case Studies | Whispers Lab",
    description:
      "Real systems we've built for real small businesses, rebuilt from manual chaos into quiet automation.",
    url: "/case-studies",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Whispers Lab. We delete busywork.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Case Studies | Whispers Lab",
    description:
      "Real systems we've built for real small businesses, rebuilt from manual chaos into quiet automation.",
    images: ["/og-image.png"],
  },
};

const SITE_URL = "https://www.whisperslab.com";

export default async function CaseStudiesPage() {
  const strapiData = await fetchCaseStudies() as CaseStudy[];
  const strapiStudies: CaseStudy[] = Array.isArray(strapiData) && strapiData.length > 0 ? strapiData : CASE_STUDIES;

  const studies: CaseStudy[] = strapiStudies.map((study) => {
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
      itemListElement: studies.map((cs, index) => ({
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
      <main className="pilot-page case-index-new">
        <section className="case-index-hero"><div className="container"><nav className="pilot-crumbs is-dark" aria-label="Breadcrumb"><span><Link href="/">Home</Link><i aria-hidden="true">/</i></span><span aria-current="page">Case Studies</span></nav><div className="case-index-hero-grid"><div><span className="pilot-label pilot-label-light">REAL SYSTEMS · MEASURED OUTCOMES</span><h1>Proof should show the <span>work before the win.</span></h1><p>Every case study names the operational pain, the system we built, and the result. No anonymous percentage floating without context.</p></div><div className="case-index-count"><strong>{String(studies.length).padStart(2, "0")}</strong><span>published builds</span><p>AI extraction · data sync · lead operations · reporting · onboarding</p></div></div></div></section>

        <section className="case-index-list"><div className="container"><header><span className="pilot-label">THE BUILD INDEX</span><h2>From manual bottleneck to working system.</h2></header><div>{studies.map((cs, index) => <article className={index === 0 ? "is-featured" : ""} key={cs.slug}><div className="case-index-top"><span>{String(index + 1).padStart(2, "0")}</span><div><small>{cs.industry}</small><em>{cs.buildType === "ai" ? "AI-POWERED" : "AUTOMATED"}</em></div></div><div className="case-index-title"><h3>{cs.title}</h3><p><b>The goal:</b> {cs.goal}</p></div><div className="case-index-change"><div><small>BEFORE · THE PAIN</small><p>{cs.before}</p></div><div><small>AFTER · THE OUTPUT</small><p>{cs.after}</p></div></div><div className="case-index-metrics">{cs.metrics.map((metric) => <div key={metric.label}><strong>{metric.num}</strong><span>{metric.label}</span></div>)}</div><Link className="case-index-link" href={`/case-studies/${cs.slug}`}>Read the full build story <span aria-hidden="true">→</span></Link></article>)}</div></div></section>

        <section className="case-index-method"><div className="container"><div><span className="pilot-label pilot-label-light">HOW TO READ THESE</span><h2>Outcome first. Architecture second. Hype nowhere.</h2></div><ol><li><span>01</span><b>Context</b><p>What the business and team were dealing with.</p></li><li><span>02</span><b>Constraint</b><p>Where manual effort, risk, or delay accumulated.</p></li><li><span>03</span><b>System</b><p>How the new workflow moves and where people stay involved.</p></li><li><span>04</span><b>Result</b><p>The measured change after the system went live.</p></li></ol></div></section>

        <section className="pilot-final pilot-final-cases"><div className="container"><span className="pilot-label pilot-label-light">YOUR WORKFLOW IS THE NEXT BRIEF</span><h2>Show us what keeps piling up.</h2><p>The $250 Automation Audit turns repeated work into a ranked, priced build plan you keep either way.</p><div className="pilot-actions"><Link href="/audit" className="btn btn-primary">See the Automation Audit</Link><Link href="/book" className="btn btn-ghost-light">Book a free discovery call</Link></div></div></section>
        <NewsletterSection />
      </main>
    </>
  );
}
