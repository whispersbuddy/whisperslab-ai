import type { Metadata } from "next";
import { CASE_STUDIES_HTML } from "@/app/_content/caseStudies";

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
  return <div dangerouslySetInnerHTML={{ __html: CASE_STUDIES_HTML }} />;
}
