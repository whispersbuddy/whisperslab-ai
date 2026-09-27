import type { Metadata } from "next";
import { AUDIT_HTML } from "@/app/_content/audit";
import LegacyOfferBody, { OfferAssuranceBand } from "@/components/LegacyOfferBody";

const SITE_URL = "https://www.whisperslab.com";

export const metadata: Metadata = {
  title: "The Automation Audit | Whispers Lab",
  description:
    "A $250, 7-day sprint that maps your daily operations and hands you a prioritized automation roadmap, credited toward your Core Build if you move forward.",
  alternates: { canonical: "/audit" },
  openGraph: {
    type: "website",
    siteName: "Whispers Lab",
    locale: "en_US",
    title: "The Automation Audit | Whispers Lab",
    description:
      "A $250, 7-day sprint that maps your daily operations and hands you a prioritized automation roadmap, credited toward your Core Build if you move forward.",
    url: "/audit",
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
    title: "The Automation Audit | Whispers Lab",
    description:
      "A $250, 7-day sprint that maps your daily operations and hands you a prioritized automation roadmap, credited toward your Core Build if you move forward.",
    images: ["/og-image.png"],
  },
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType: "Business Process Automation Audit",
  name: "The Automation Audit",
  description:
    "A $250, 7-day sprint that maps a small business's daily operations and delivers a prioritized automation roadmap: an Automation Readiness Scorecard, Visual Workflow Map, Automation Priority Matrix, and Execution Blueprint.",
  provider: {
    "@type": "Organization",
    name: "Whispers Lab",
    url: SITE_URL,
  },
  areaServed: {
    "@type": "Country",
    name: "United States",
  },
  offers: {
    "@type": "Offer",
    price: "250",
    priceCurrency: "USD",
    url: `${SITE_URL}/audit`,
    availability: "https://schema.org/InStock",
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Is there a catch with the $250 price tag?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No hourly billing and no surprise invoices. The audit is a one-time, flat investment of $250. Better yet, if you decide to have Whispers Lab build out the actual automations for you later, we apply that $250 directly to your build cost as a credit.",
      },
    },
    {
      "@type": "Question",
      name: "When will my blueprint actually be ready?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "We deliver your finalized roadmap exactly 7 days after our initial kickoff call.",
      },
    },
    {
      "@type": "Question",
      name: "Will this disrupt my team's daily operations?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Not at all. We know you are already strapped for time. The entire 7-day sprint only requires roughly 2 to 3 hours of your time for us to conduct our discovery interviews. You keep running your business; we figure out how to automate it.",
      },
    },
    {
      "@type": "Question",
      name: "What exactly are you handing over on Day 7?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "You are not getting a generic, fluffy presentation. You walk away with four distinct assets: your Automation Readiness Scorecard, a Visual Workflow Map highlighting your bottlenecks, an Automation Priority Matrix, and a step-by-step Execution Blueprint.",
      },
    },
    {
      "@type": "Question",
      name: "We already pay for a few AI subscriptions. Do we still need this?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Buying software isn't the same as having an operational strategy. Most small businesses apply AI to the wrong manual tasks, creating more chaos. We audit your existing tech stack to see if your tools are actually talking to each other, and we show you how to connect them the right way.",
      },
    },
    {
      "@type": "Question",
      name: "Are we obligated to hire you for the final build?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Absolutely not. The Execution Blueprint is 100% yours to keep. You can hand it to your internal IT team, take it to an outside developer, or hire Whispers Lab to build it for you. We just want to give you a clear plan so you can stop guessing.",
      },
    },
    {
      "@type": "Question",
      name: "How do we get this started?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Click the button below to book your audit. We will jump on a quick, zero-pressure strategy call to make sure your business is the right fit before we charge you a dime.",
      },
    },
  ],
};

const AUDIT_PAGE_HTML = AUDIT_HTML
  .replace(">ZERO RISK<", ">DELIVERY PROMISE<")
  .replace(
    "The Automation Audit is a one-time, fixed price of $250 with no long-term commitments. If you choose to hire Whispers Lab for your Core Build, we credit this $250 entirely towards your build cost.",
    "The Automation Audit is a one-time, fixed price of $250. Once we receive the agreed access and complete kickoff, we deliver every promised Audit asset within 7 business days or refund the $250. Build with Whispers Lab afterward and the full Audit fee is credited toward your Core Build."
  );

export default function AuditPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <LegacyOfferBody html={AUDIT_PAGE_HTML} insertBefore="<!-- SECTION 8: FAQ -->" className="legacy-offer-page audit-offer-refresh">
        <OfferAssuranceBand
          eyebrow="THE PROMISE, IN PLAIN ENGLISH"
          title="A useful decision asset—even if we never build it."
          intro="The Audit lowers the risk of spending on the wrong workflow and leaves you with a plan another qualified team can execute."
          items={[
            { label: "7-business-day delivery", body: "After kickoff and the agreed access are complete, every promised Audit asset is delivered within seven business days—or the $250 is refunded." },
            { label: "$250 build credit", body: "Move into a Core Build with Whispers Lab and the full Audit fee is credited toward the fixed build price." },
            { label: "Your blueprint", body: "The maps, priority matrix, estimates, and execution plan are yours to keep with no obligation to hire us." },
          ]}
        />
      </LegacyOfferBody>
    </>
  );
}
