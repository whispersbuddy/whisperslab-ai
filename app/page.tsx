import type { Metadata } from "next";
import { HOME_HTML } from "@/app/_content/home";
import LatestPosts from "@/components/LatestPosts";

export const metadata: Metadata = {
  title: "Whispers Lab — AI Automation for Small Business Owners",
  description:
    "We help small business owners eliminate manual busywork with custom AI automation. Start with a $250 Automation Audit — production-ready builds in 30 days.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: "Whispers Lab",
    locale: "en_US",
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

// The verbatim legacy markup is split so the latest-posts strip can sit between
// the case studies and the book-a-call CTA. The CTA lives inside <main>, so the
// <main> tags are lifted out and rendered as a real element; splitting inside
// an open element would hand the browser two invalid HTML fragments. If the
// legacy markup ever changes shape, fall back to rendering it untouched.
function splitHome(html: string) {
  const mainOpen = html.indexOf("<main>");
  const cta = html.indexOf("<!-- BOOK A CALL CTA -->");
  const mainClose = html.indexOf("</main>");
  if (mainOpen === -1 || cta === -1 || mainClose === -1 || !(mainOpen < cta && cta < mainClose)) {
    return null;
  }
  return {
    beforeMain: html.slice(0, mainOpen),
    beforeCta: html.slice(mainOpen + "<main>".length, cta),
    fromCta: html.slice(cta, mainClose),
    afterMain: html.slice(mainClose + "</main>".length),
  };
}

const HOME_PARTS = splitHome(HOME_HTML);

export default function Home() {
  if (!HOME_PARTS) return <div dangerouslySetInnerHTML={{ __html: HOME_HTML }} />;
  return (
    <>
      <div dangerouslySetInnerHTML={{ __html: HOME_PARTS.beforeMain }} />
      <main>
        <div dangerouslySetInnerHTML={{ __html: HOME_PARTS.beforeCta }} />
        <LatestPosts />
        <div dangerouslySetInnerHTML={{ __html: HOME_PARTS.fromCta }} />
      </main>
      <div dangerouslySetInnerHTML={{ __html: HOME_PARTS.afterMain }} />
    </>
  );
}
