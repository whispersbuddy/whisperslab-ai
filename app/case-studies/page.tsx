import type { Metadata } from "next";
import CaseStudiesIndex from "@/components/case/CaseStudiesIndex";
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
      <CaseStudiesIndex studies={studies} />
    </>
  );
}
