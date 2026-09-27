import type { Metadata } from "next";
import { CORE_BUILD_HTML } from "@/app/_content/coreBuild";
import LegacyOfferBody, { OfferAssuranceBand } from "@/components/LegacyOfferBody";

const SITE_URL = "https://www.whisperslab.com";

export const metadata: Metadata = {
  title: "The Core Build | Whispers Lab",
  description:
    "We build, test, and launch your highest-value workflow in under 30 days, with fixed scope, acceptance testing, documentation, training, and stabilization.",
  alternates: { canonical: "/core-build" },
  openGraph: {
    type: "website",
    siteName: "Whispers Lab",
    locale: "en_US",
    title: "The Core Build | Whispers Lab",
    description:
      "We build, test, and launch your highest-value workflow in under 30 days, with fixed scope, acceptance testing, documentation, training, and stabilization.",
    url: "/core-build",
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
    title: "The Core Build | Whispers Lab",
    description:
      "We build, test, and launch your highest-value agreed workflow in under 30 days, starting at $2,500.",
    images: ["/og-image.png"],
  },
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType: "Business Process Automation Development",
  name: "The Core Build",
  description:
    "A fixed-price build that designs, develops, tests, and deploys an agreed business automation workflow within 30 days, with documentation, training, acceptance testing, and post-launch stabilization.",
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
    priceSpecification: {
      "@type": "UnitPriceSpecification",
      minPrice: "2500",
      priceCurrency: "USD",
    },
    url: `${SITE_URL}/core-build`,
    availability: "https://schema.org/InStock",
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
        text: "One standard Core Build workflow starts at $2,500. Connected workflows, custom code, and additional systems receive a fixed quote based on the scope agreed before work begins. There is no hidden hourly billing or mid-project price drift.",
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
        text: "We use agreed access controls and secure integration practices, document where data moves, and flag third-party platform limitations before launch. Specific compliance or security requirements are confirmed during scoping.",
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

const CORE_BUILD_PAGE_HTML = CORE_BUILD_HTML
  .replace(
    "We take your automation blueprint and build the 2–3 custom systems that pay for themselves the fastest. Production-ready and fully handed off to your team in under 30 days.",
    "We take your automation blueprint and build the highest-value agreed workflow first. It is tested, production-ready, documented, and handed off to your team in under 30 days."
  )
  .replace("builds your 2–3 core automations", "builds your agreed workflow scope")
  .replace("2–3 fully functioning, production-ready automations", "The agreed production-ready workflow scope")
  .replace("the 2-3 specific automations we isolate", "the specific workflow scope we agree")
  .replace("Workflows we take off your plate <span class=\"grad-word\">permanently.</span>", "Examples of workflows inside a <span class=\"grad-word\">Core Build.</span>")
  .replace(
    "We don't just sell \"AI.\" We build specific, micro-level automations that connect the tools your team already uses (CRM, Email, Billing) so the busywork runs itself.",
    "These are workflow examples, not a second service menu. Your Core Build scopes one agreed workflow from our broader service categories, using AI only where it earns its place."
  )
  .replace("to guarantee data integrity and ensure zero human routing errors before going live", "to verify the agreed routing, exception handling, and data checks before going live")
  .replace("Your sensitive client and financial data is routed securely behind the scenes and is never exposed or leaked across your software stack.", "Your sensitive client and financial data is routed using agreed access controls and secure integration practices. We document where data moves and flag any third-party platform limitations before launch.")
  .replace(">OUR GUARANTEE<", ">DEFINITION OF DONE<")
  .replace(
    "The Core Build starts at $2,500. For less than what your business silently leaks every month through manual bottlenecks and human error, you get a permanent, production-ready AI Automation system, engineered with real AI wherever it moves the needle, and clean, dependable automation everywhere else. We build it securely behind the scenes and guarantee it will be fully deployed in under 30 days, targeting 10–20+ hours saved for your team every single week.",
    "One standard workflow starts at $2,500. Before work begins, we agree the scope, acceptance tests, access requirements, and fixed price. The build is not complete until the agreed tests pass, documentation and training are delivered, and the workflow is ready for production. Defects inside that agreed scope are covered during a 30-day stabilization period."
  );

export default function CoreBuildPage() {
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
      <LegacyOfferBody html={CORE_BUILD_PAGE_HTML} insertBefore="<!-- SECTION 7: FAQ -->" className="legacy-offer-page core-offer-refresh">
        <OfferAssuranceBand
          eyebrow="A CLEAR DEFINITION OF DONE"
          title="Tested, handed over, and supported after launch."
          intro="The outcome is not a demo or an unfinished workflow. Completion is tied to the scope and tests agreed before the build starts."
          items={[
            { label: "Acceptance before completion", body: "The agreed routing, error handling, permissions, and expected outputs must pass documented acceptance tests." },
            { label: "Human-ready handoff", body: "Your team receives current documentation, recorded training, and workflows that live in the agreed client-owned accounts." },
            { label: "30-day stabilization", body: "Defects inside the agreed scope found during the first 30 days after launch are corrected without an additional build fee." },
          ]}
        />
      </LegacyOfferBody>
    </>
  );
}
