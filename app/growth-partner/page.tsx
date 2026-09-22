import type { Metadata } from "next";
import { Activity, LifeBuoy, PlusCircle, Sparkles, TriangleAlert, Unplug, RefreshCw } from "lucide-react";
import PageBanner from "@/components/PageBanner";
import JsonLd from "@/components/JsonLd";
import NewsletterSection from "@/components/NewsletterSection";
import Faq, { type FaqItem } from "@/components/sections/Faq";
import CtaBand from "@/components/sections/CtaBand";
import { breadcrumbSchema, buildMetadata, faqSchema, graph, PROVIDER, requireLive, SITE_URL } from "@/lib/seo";

const PATH = "/growth-partner";

export const metadata: Metadata = buildMetadata({
  title: "Automation Maintenance Services | AI Growth Partner",
  description:
    "Keep your automations running and growing. For $500 a month we monitor, fix, and improve your workflows, and build a new one every month.",
  path: PATH,
});

const CRUMBS = [
  { name: "Home", path: "/" },
  { name: "Pricing", path: "/pricing" },
  { name: "AI Growth Partner", path: PATH },
];

const BREAKS = [
  { icon: RefreshCw, title: "An app updates", body: "A tool you use changes a field or a setting, and a step that worked for months quietly stops." },
  { icon: Unplug, title: "A connection expires", body: "A login or access key runs out. Nothing looks wrong until invoices or leads stop showing up." },
  { icon: TriangleAlert, title: "Your process changes", body: "You add a new service or price. The automation still follows last quarter's rules." },
];

const INCLUDED = [
  { icon: Activity, title: "Monitoring and maintenance", body: "We watch your workflows and fix problems when they come up, usually before your team notices." },
  { icon: PlusCircle, title: "A new workflow every month", body: "Each month we build and launch one more automation from your list, so the time savings keep adding up." },
  { icon: LifeBuoy, title: "Priority support", body: "When something needs attention, you are at the front of the line. Talk to us in your private Slack channel." },
  { icon: Sparkles, title: "Ongoing improvements", body: "As your business grows, we tune what is already running so it keeps up with more volume and new tools." },
];

const MONTH = [
  { n: "1", title: "Check", body: "We review how every workflow ran last month and fix anything that needs it." },
  { n: "2", title: "Pick", body: "Together we choose the next workflow from your list, based on the time it will save." },
  { n: "3", title: "Build", body: "We build it, test it safely, and launch it with a short video walkthrough for your team." },
  { n: "4", title: "Report", body: "You get a short summary: what ran, what we fixed, and what we built." },
];

const FAQS: FaqItem[] = [
  {
    q: "What are automation maintenance services?",
    a: "Automation maintenance services keep your business workflows running after they are built. That means watching for errors, fixing steps that break when apps change, keeping connections to your tools working, and improving workflows as your business changes. Whispers Lab includes all of this in the AI Growth Partner plan.",
  },
  {
    q: "How much does the AI Growth Partner plan cost?",
    a: "The AI Growth Partner plan is $500 a month. It covers ongoing monitoring and maintenance, priority support, ongoing improvements, and one new workflow built for you every month.",
  },
  {
    q: "Do I need a Core Build first?",
    a: "Most Growth Partner clients start with a Core Build, so everything is already documented and set up to be monitored. If you already have automations that someone else built, book a free call and we will tell you honestly whether we can look after them.",
  },
  {
    q: "What happens when an automation breaks?",
    a: "Workflows we build send an alert when a run fails. On the Growth Partner plan, fixing that failure is priority work, and we tell you in your Slack channel what went wrong and what we changed.",
  },
  {
    q: "How big is the new workflow each month?",
    a: "Each monthly workflow is sized so it can be built, tested, and launched within the month, such as a new reminder sequence, a report, or a connection between two tools. Larger projects are scoped and quoted separately so they never crowd out your maintenance.",
  },
  {
    q: "Who owns the automations?",
    a: "You do. Your workflows live in your own accounts, with documentation and video walkthroughs, so you are never locked in to Whispers Lab.",
  },
];

export default function GrowthPartnerPage() {
  requireLive(PATH);

  return (
    <>
      <JsonLd
        data={graph(
          {
            "@type": "Service",
            "@id": SITE_URL + PATH + "#service",
            name: "AI Growth Partner",
            serviceType: "Automation maintenance services",
            description:
              "Monthly monitoring, maintenance, and improvement of business automations, plus one new workflow built every month.",
            provider: PROVIDER,
            areaServed: { "@type": "Country", name: "United States" },
            audience: { "@type": "BusinessAudience", audienceType: "Small businesses" },
            offers: {
              "@type": "Offer",
              priceCurrency: "USD",
              priceSpecification: { "@type": "UnitPriceSpecification", price: 500, priceCurrency: "USD", unitText: "MONTH" },
            },
          },
          faqSchema(FAQS),
          breadcrumbSchema(CRUMBS)
        )}
      />
      <main>
        <PageBanner
          eyebrow="AI GROWTH PARTNER · $500/MONTH"
          title="Automation maintenance, plus"
          highlight="a new workflow every month."
          intro="Automations are not set-and-forget. We keep yours healthy, fix what breaks, and keep adding new ones so you save more time every month."
          crumbs={CRUMBS}
        />

        <section className="section">
          <div className="container">
            <div className="section-head-center">
              <span className="eyebrow">WHY IT MATTERS</span>
              <h2>Automations break quietly.</h2>
              <p className="section-copy center">Nobody gets an error message. Work just stops happening, and you find out weeks later.</p>
            </div>
            <div className="gp-breaks">
              {BREAKS.map((b) => (
                <article key={b.title} className="gp-break">
                  <span className="gp-icon warn">
                    <b.icon size={20} strokeWidth={1.8} aria-hidden="true" />
                  </span>
                  <h3>{b.title}</h3>
                  <p>{b.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section textured-section gp-included">
          <div className="texture-overlay" />
          <div className="container">
            <div className="section-head-center">
              <span className="eyebrow eyebrow-light">WHAT YOU GET FOR $500/MONTH</span>
              <h2>Your automations, looked after.</h2>
            </div>
            <div className="gp-grid">
              {INCLUDED.map((i) => (
                <article key={i.title} className="feature-card">
                  <span className="feature-icon">
                    <i.icon size={22} strokeWidth={1.8} aria-hidden="true" />
                  </span>
                  <h3>{i.title}</h3>
                  <p>{i.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section">
          <div className="container">
            <div className="section-head-center">
              <span className="eyebrow">HOW A MONTH WORKS</span>
              <h2>Four simple steps, every month.</h2>
            </div>
            <ol className="gp-month">
              {MONTH.map((m) => (
                <li key={m.n}>
                  <span className="gp-num">{m.n}</span>
                  <h3>{m.title}</h3>
                  <p>{m.body}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="section">
          <div className="container gp-fit">
            <div className="gp-fit-col yes">
              <span className="gp-fit-k">A great fit if</span>
              <ul>
                <li>You already run automations and rely on them every day</li>
                <li>You have a list of other tasks you want automated over time</li>
                <li>You don&rsquo;t have a technical person in-house to look after them</li>
              </ul>
            </div>
            <div className="gp-fit-col no">
              <span className="gp-fit-k">Not the right fit if</span>
              <ul>
                <li>You want a single project and nothing after it. The Core Build is better for that.</li>
                <li>You are still working out which tasks to automate. Start with the $250 Audit.</li>
              </ul>
            </div>
          </div>
        </section>

        <Faq title="Questions about the Growth Partner plan." items={FAQS} />
        <CtaBand
          title="Keep your automations working for you."
          body="Tell us what you run today and what you want next. We'll reply within 24 hours with how the plan would work for you."
          primary={{ href: "/contact", label: "Apply for Growth Partnership" }}
          secondary={{ href: "/pricing", label: "Compare all plans" }}
        />
        <NewsletterSection />
      </main>
    </>
  );
}
