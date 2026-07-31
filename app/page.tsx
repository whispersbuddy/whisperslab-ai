import type { Metadata } from "next";
import { HOME_HTML } from "@/app/_content/home";

export const metadata: Metadata = {
  title: "Whispers Lab — AI Automation for Small Business Owners",
  description:
    "We help small business owners eliminate manual busywork with custom AI automation. Start with a $250 Automation Audit — production-ready builds in 30 days.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Whispers Lab — AI Automation for Small Business Owners",
    description:
      "We help small business owners eliminate manual busywork with custom AI automation. Start with a $250 Automation Audit — production-ready builds in 30 days.",
    url: "/",
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
    title: "Whispers Lab — AI Automation for Small Business Owners",
    description:
      "We help small business owners eliminate manual busywork with custom AI automation. Start with a $250 Automation Audit — production-ready builds in 30 days.",
    images: ["/og-image.png"],
  },
};

export default function Home() {
  return <div dangerouslySetInnerHTML={{ __html: HOME_HTML }} />;
}
