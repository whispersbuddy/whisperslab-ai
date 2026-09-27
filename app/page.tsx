import type { Metadata } from "next";
import { HOME_HTML } from "@/app/_content/home";
import HomeOfferPath from "@/components/HomeOfferPath";
import LatestPosts from "@/components/LatestPosts";

export const metadata: Metadata = {
  title: "AI Automation Agency for Small Businesses | Whispers Lab",
  description:
    "We help small business owners delete busywork with custom AI and automation. Start with a $250 Automation Audit. Builds go live in 30 days.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: "Whispers Lab",
    locale: "en_US",
    title: "AI Automation Agency for Small Businesses | Whispers Lab",
    description:
      "We help small business owners delete busywork with custom AI and automation. Start with a $250 Automation Audit. Builds go live in 30 days.",
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
    title: "AI Automation Agency for Small Businesses | Whispers Lab",
    description:
      "We help small business owners delete busywork with custom AI and automation. Start with a $250 Automation Audit. Builds go live in 30 days.",
    images: ["/og-image.png"],
  },
};

// The legacy homepage markup is split around its old pricing block so the
// clearer Diagnose → Build → Operate path can be rendered as maintainable JSX.
// The main tags are lifted out to keep every fragment valid.
function splitHome(html: string) {
  const mainOpen = html.indexOf("<main>");
  const pricing = html.indexOf("<!-- PRICING -->");
  const cases = html.indexOf("<!-- CASE STUDIES -->");
  const cta = html.indexOf("<!-- BOOK A CALL CTA -->");
  const mainClose = html.indexOf("</main>");
  if (mainOpen === -1 || pricing === -1 || cases === -1 || cta === -1 || mainClose === -1 || !(mainOpen < pricing && pricing < cases && cases < cta && cta < mainClose)) {
    return null;
  }
  return {
    beforeMain: html.slice(0, mainOpen),
    beforeOffers: html.slice(mainOpen + "<main>".length, pricing),
    cases: html.slice(cases, cta),
    fromCta: html.slice(cta, mainClose),
    afterMain: html.slice(mainClose + "</main>".length),
  };
}

const HOME_PAGE_HTML = HOME_HTML
  .replace("What we <span class=\"grad-word\">automate</span> for you.", "Common workflows we <span class=\"grad-word\">automate</span>.")
  .replace(
    "Common, repetitive workflows we take off your team's plate, so the busywork runs itself.",
    "These are examples of the work we deliver across our five service categories—not six separate packages you need to choose between."
  );

const HOME_PARTS = splitHome(HOME_PAGE_HTML);

export default function Home() {
  if (!HOME_PARTS) return <div className="home-page" dangerouslySetInnerHTML={{ __html: HOME_HTML }} />;
  return (
    <>
      <div dangerouslySetInnerHTML={{ __html: HOME_PARTS.beforeMain }} />
      <main className="home-page">
        <div dangerouslySetInnerHTML={{ __html: HOME_PARTS.beforeOffers }} />
        <HomeOfferPath />
        <div dangerouslySetInnerHTML={{ __html: HOME_PARTS.cases }} />
        <LatestPosts />
        <div dangerouslySetInnerHTML={{ __html: HOME_PARTS.fromCta }} />
      </main>
      <div dangerouslySetInnerHTML={{ __html: HOME_PARTS.afterMain }} />
    </>
  );
}
