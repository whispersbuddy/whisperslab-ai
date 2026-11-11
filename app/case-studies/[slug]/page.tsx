import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CaseStudyDetail from "@/components/case/CaseStudyDetail";
import { CASE_STUDIES, getCaseStudyBySlug } from "@/app/_content/caseStudiesData";
import { fetchCaseStudies, fetchCaseStudyBySlug } from "@/lib/api";
import { getPostsForCaseStudy, getRelatedCaseStudies } from "@/lib/content";
import { FOUNDER, PUBLISHER, WEBSITE_ID } from "@/lib/seo";

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

  const title = `${cs.title} | Whispers Lab Case Study`;
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
          alt: "Whispers Lab. We delete busywork.",
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

  // Last edit in Strapi, when the case study lives there. Local-only studies have no date.
  const updatedAt = (strapiCs as { updatedAt?: string } | null)?.updatedAt;
  const updated = updatedAt ? updatedAt.slice(0, 10) : undefined;

  const [relatedGuides, moreCaseStudies] = await Promise.all([
    getPostsForCaseStudy(slug),
    getRelatedCaseStudies(slug),
  ]);

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: cs.title,
    description: cs.goal,
    about: cs.industry,
    author: FOUNDER,
    ...(updated ? { dateModified: updated } : {}),
    publisher: PUBLISHER,
    isPartOf: { "@id": WEBSITE_ID },
    mainEntityOfPage: `https://www.whisperslab.com/case-studies/${cs.slug}`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <CaseStudyDetail
        cs={cs}
        slug={slug}
        updated={updated}
        guides={relatedGuides.map((p) => ({ href: `/blog/${p.slug}`, title: p.title }))}
        more={moreCaseStudies.map((c) => ({ href: `/case-studies/${c.slug}`, title: c.title }))}
      />
    </>
  );
}
