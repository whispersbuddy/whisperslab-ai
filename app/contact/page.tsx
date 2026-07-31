import type { Metadata } from "next";
import { CONTACT_HTML } from "@/app/_content/contact";

export const metadata: Metadata = {
  title: "Contact — Whispers Lab",
  description:
    "Tell us your biggest operational bottleneck. A real person replies within 24 hours — no cold-calling lists, no chatbots.",
  alternates: { canonical: "/contact" },
  openGraph: {
    type: "website",
    siteName: "Whispers Lab",
    locale: "en_US",
    title: "Contact — Whispers Lab",
    description:
      "Tell us your biggest operational bottleneck. A real person replies within 24 hours — no cold-calling lists, no chatbots.",
    url: "/contact",
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
    title: "Contact — Whispers Lab",
    description:
      "Tell us your biggest operational bottleneck. A real person replies within 24 hours — no cold-calling lists, no chatbots.",
    images: ["/og-image.png"],
  },
};

export default function ContactPage() {
  return <div dangerouslySetInnerHTML={{ __html: CONTACT_HTML }} />;
}
