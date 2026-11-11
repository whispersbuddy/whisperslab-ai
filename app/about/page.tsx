import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import AboutPage from "@/components/about/AboutPage";
import { getAllCaseStudies } from "@/lib/content";
import { breadcrumbSchema, buildMetadata, FOUNDER, FOUNDER_TITLE, graph, PROVIDER, requireLive, SITE_URL } from "@/lib/seo";

const PATH = "/about";

export const metadata: Metadata = buildMetadata({
  title: "About Whispers Lab | AI Automation for Small Business",
  description:
    "Whispers Lab builds custom AI and automation for small business owners. Founded in 2025, a US LLC with a 10 to 12 person team based in Karachi, Pakistan.",
  path: PATH,
});

const CRUMBS = [
  { name: "Home", path: "/" },
  { name: "About", path: PATH },
];

export default async function AboutRoute() {
  requireLive(PATH);
  const caseCount = (await getAllCaseStudies()).length;

  return (
    <>
      <JsonLd
        data={graph(
          {
            "@type": "AboutPage",
            "@id": SITE_URL + PATH,
            url: SITE_URL + PATH,
            name: "About Whispers Lab",
            about: PROVIDER,
          },
          FOUNDER,
          breadcrumbSchema(CRUMBS)
        )}
      />
      <AboutPage crumbs={CRUMBS} founderTitle={FOUNDER_TITLE} caseCount={caseCount} />
    </>
  );
}
