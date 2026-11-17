import type { Metadata } from "next";
import HomePage from "@/components/home/HomePage";

export const metadata: Metadata = {
  title: "Small Business Automation Agency | Whispers Lab",
  description:
    "We build and maintain automations for small business owners: lead replies, follow-ups, paperwork and reporting. Fixed price. Book a free discovery call.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: "Whispers Lab",
    locale: "en_US",
    title: "Small Business Automation Agency | Whispers Lab",
    description:
      "We build and maintain automations for small business owners: lead replies, follow-ups, paperwork and reporting. Fixed price. Book a free discovery call.",
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
      "We build and maintain automations for small business owners: lead replies, follow-ups, paperwork and reporting. Fixed price. Book a free discovery call.",
    images: ["/og-image.png"],
  },
};

export default function Home() {
  return <HomePage />;
}
