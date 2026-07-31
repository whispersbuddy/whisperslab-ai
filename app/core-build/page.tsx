import type { Metadata } from "next";
import { CORE_BUILD_HTML } from "@/app/_content/coreBuild";

export const metadata: Metadata = {
  title: "The Core Build — Whispers Lab",
  description:
    "We build and deploy the 2–3 automations that pay for themselves fastest, production-ready in 30 days — starting at $2,500.",
  alternates: { canonical: "/core-build" },
  openGraph: {
    type: "website",
    siteName: "Whispers Lab",
    locale: "en_US",
    title: "The Core Build — Whispers Lab",
    description:
      "We build and deploy the 2–3 automations that pay for themselves fastest, production-ready in 30 days — starting at $2,500.",
    url: "/core-build",
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
    title: "The Core Build — Whispers Lab",
    description:
      "We build and deploy the 2–3 automations that pay for themselves fastest, production-ready in 30 days — starting at $2,500.",
    images: ["/og-image.png"],
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How is the final price determined?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The Core Build starts at $2,500. Your final, fixed investment is based strictly on the 2-3 specific automations we isolate during your blueprint phase. You are paying for a finished, production-ready system. We do not do scope creep, and we do not do hidden hourly fees.",
      },
    },
    {
      "@type": "Question",
      name: "Will I have to manage developers or learn to code?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Zero technical jargon and zero coding are required from you. We build your automated pipelines entirely in the background. If you know how to click a button, you know how to use our systems.",
      },
    },
    {
      "@type": "Question",
      name: "Will installing this break the software we already use?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "We never test on your live business. We don't rip out the tools you already trust; we just build secure bridges between them. Everything is built and stress-tested in a secure staging environment. The only change your team will notice is that the manual data entry they hate doing has disappeared.",
      },
    },
    {
      "@type": "Question",
      name: "Is our private company data secure?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. We build using enterprise-grade security practices. Your sensitive client and financial data is routed securely behind the scenes and is never exposed or leaked across your software stack.",
      },
    },
    {
      "@type": "Question",
      name: "What happens when the 30 days are up? Do we just figure it out ourselves?",
      acceptedAnswer: {
        "@type": "Answer",
        text: 'Never. Handing you a complex system without training is useless. We provide a complete "White-Glove" handoff, giving you custom control dashboards, detailed documentation, and recorded video training so your team is fully confident using the system from day one.',
      },
    },
    {
      "@type": "Question",
      name: "How do we kick off the build?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Click below to scope your project. If you have already completed a 7-Day Automation Audit with us, we will instantly credit your $250 and begin architecting your new workflows.",
      },
    },
  ],
};

export default function CoreBuildPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div dangerouslySetInnerHTML={{ __html: CORE_BUILD_HTML }} />
    </>
  );
}
