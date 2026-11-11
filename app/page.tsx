import type { Metadata } from "next";
import HomePage from "@/components/home/HomePage";

export const metadata: Metadata = {
  title: "Small Business Automation Agency | Whispers Lab",
  description:
    "Done-for-you automation for US small businesses on n8n, Zapier, Make and Airtable. Start with an Automation Audit, builds from $2,500.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: "Whispers Lab",
    locale: "en_US",
    title: "Small Business Automation Agency | Whispers Lab",
    description:
      "Done-for-you automation for US small businesses on n8n, Zapier, Make and Airtable. Start with an Automation Audit, builds from $2,500.",
    url: "/",
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
    title: "Small Business Automation Agency | Whispers Lab",
    description:
      "Done-for-you automation for US small businesses on n8n, Zapier, Make and Airtable. Start with an Automation Audit, builds from $2,500.",
    images: ["/og-image.png"],
  },
};

export default function Home() {
  return <HomePage />;
}
