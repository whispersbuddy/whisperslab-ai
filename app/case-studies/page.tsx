import type { Metadata } from "next";
import { CASE_STUDIES_HTML } from "@/app/_content/caseStudies";

export const metadata: Metadata = {
  title: "Case Studies — Whispers Lab",
  description:
    "Real systems we've built for real small businesses, rebuilt from manual chaos into quiet automation.",
};

export default function CaseStudiesPage() {
  return <div dangerouslySetInnerHTML={{ __html: CASE_STUDIES_HTML }} />;
}
