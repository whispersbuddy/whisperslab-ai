import type { Metadata } from "next";
import PageBanner from "@/components/PageBanner";
import JsonLd from "@/components/JsonLd";
import NewsletterSection from "@/components/NewsletterSection";
import CtaBand from "@/components/sections/CtaBand";
import Faq, { type FaqItem } from "@/components/sections/Faq";
import SiteIcon from "@/components/SiteIcon";
import { liveRoutes } from "@/lib/routes";
import { breadcrumbSchema, buildMetadata, faqSchema, graph, requireLive, SITE_URL } from "@/lib/seo";

const PATH = "/services";

export const metadata: Metadata = buildMetadata({
  title: "AI Automation Services for Small Businesses | Whispers Lab",
  description:
    "Business automation services built around the busywork that eats your week: data entry, bookkeeping, client onboarding, lead follow-up, and software integration.",
  path: PATH,
});

const CRUMBS = [
  { name: "Home", path: "/" },
  { name: "Services", path: PATH },
];

const FAQS: FaqItem[] = [
  {
    q: "Which automation service should I start with?",
    a: "Start with whichever manual task costs your team the most hours each week. If you are not sure, the $250 Automation Audit maps your workflows and ranks them for you, so you don't have to guess.",
  },
  {
    q: "Do you build more than one automation at a time?",
    a: "Yes. Most Core Build projects cover 2 to 3 workflows across one or more of these services, scoped together so the tools stay in sync instead of being automated one at a time.",
  },
  {
    q: "What if my process doesn't match one of these services?",
    a: "These are the automations we build most often, not a fixed menu. Book a free discovery call and describe the manual work you want gone. If it can be automated, we'll tell you honestly.",
  },
  {
    q: "Do the automations run in my own accounts?",
    a: "Yes. Every workflow runs in your own software accounts, not ours. You get error alerts, written docs, and a video walkthrough, and you keep full access if you ever want to bring the work in-house.",
  },
  {
    q: "How fast can a service go live?",
    a: "Most Core Build projects go live in under 30 days, including testing in a safe copy of your setup before it touches real data.",
  },
  {
    q: "What does an automation service cost?",
    a: "The Automation Audit is a flat $250. A Core Build covering one or more of these services starts from $2,500, quoted as a fixed price before we start. There is no hourly billing.",
  },
];

export default function ServicesHubPage() {
  requireLive(PATH);

  const services = liveRoutes("services");
  const integrations = liveRoutes("integrations");

  return (
    <>
      <JsonLd
        data={graph(
          {
            "@type": "ItemList",
            "@id": SITE_URL + PATH + "#services",
            itemListElement: services.map((s, i) => ({
              "@type": "ListItem",
              position: i + 1,
              url: SITE_URL + s.path,
              name: s.label,
            })),
          },
          faqSchema(FAQS),
          breadcrumbSchema(CRUMBS)
        )}
      />
      <main>
        <PageBanner
          eyebrow="SERVICES"
          title="Automation services built around"
          highlight="your busywork."
          intro="Five ways we take repetitive work off your team's plate. Every build runs in your own accounts, with error alerts, docs, and a video walkthrough."
          crumbs={CRUMBS}
        />

        <section className="section">
          <div className="container">
            <div className="sv-ind-grid services-hub-grid">
              {services.map((s) => (
                <a key={s.path} href={s.path} className="sv-ind">
                  <span className="sv-ind-icon">
                    <SiteIcon name={s.icon} size={20} />
                  </span>
                  <span>
                    <b>{s.label}</b>
                    <span>{s.blurb}</span>
                  </span>
                </a>
              ))}
            </div>
          </div>
        </section>

        {integrations.length ? (
          <section className="section sv-section sv-white">
            <div className="container">
              <div className="section-head-center">
                <span className="eyebrow">BUILT ON THE TOOLS YOU USE</span>
                <h2>We work inside the software you already pay for.</h2>
              </div>
              <div className="sv-ind-grid">
                {integrations.map((s) => (
                  <a key={s.path} href={s.path} className="sv-ind">
                    <span className="sv-ind-icon">
                      <SiteIcon name={s.icon} size={20} />
                    </span>
                    <span>
                      <b>{s.label}</b>
                      <span>{s.blurb}</span>
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </section>
        ) : null}

        <Faq title="Questions about our services." items={FAQS} />
        <CtaBand
          title="Not sure which service fits?"
          body="Start with the $250 Automation Audit. In 7 days you get a clear, ranked plan of what to automate first, credited toward a build if you go ahead."
          primary={{ href: "/audit", label: "See the $250 Automation Audit" }}
          secondary={{ href: "/book", label: "Book a free discovery call" }}
        />
        <NewsletterSection />
      </main>
    </>
  );
}
