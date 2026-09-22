import type { Metadata } from "next";
import { Clock, FileCheck2, Hammer, KeyRound, ShieldCheck, Users } from "lucide-react";
import PageBanner from "@/components/PageBanner";
import JsonLd from "@/components/JsonLd";
import NewsletterSection from "@/components/NewsletterSection";
import { breadcrumbSchema, buildMetadata, graph, PROVIDER, requireLive, SITE_URL } from "@/lib/seo";

const PATH = "/about";

export const metadata: Metadata = buildMetadata({
  title: "About Whispers Lab | AI Automation for Small Business",
  description:
    "Whispers Lab builds custom AI and automation for small business owners. Founded in 2025, a US LLC with a 10 to 12 person team based in Karachi, Pakistan.",
  path: PATH,
});

const CRUMBS = [
  { name: "Home", path: "/" },
  { name: "About", path: PATH },
];

const FACTS = [
  { value: "2025", label: "Founded" },
  { value: "4", label: "Automation builders" },
  { value: "10 to 12", label: "People on the team" },
  { value: "8", label: "Published case studies" },
];

const PRINCIPLES = [
  {
    icon: Hammer,
    title: "Boring AI that works",
    body: "No flashy demos. We build the plain systems that take repetitive work off your plate, and we only add AI where a simple rule can't do the job.",
  },
  {
    icon: Users,
    title: "People keep the judgment",
    body: "Automation handles the copying, chasing, and filing. Anything that needs a decision, like approving a payment, still goes to a person.",
  },
  {
    icon: KeyRound,
    title: "You own what we build",
    body: "Your workflows live in your own accounts, with written docs and video walkthroughs. You are never locked in to us.",
  },
  {
    icon: FileCheck2,
    title: "Fixed prices, no surprises",
    body: "The Audit is $250. Builds get a fixed quote before we start. No hourly billing, no scope creep.",
  },
  {
    icon: ShieldCheck,
    title: "Careful with your data",
    body: "Each workflow gets only the access it needs, every automated action is logged, and client-facing messages wait for your approval.",
  },
  {
    icon: Clock,
    title: "Fast, but tested",
    body: "Most builds go live in under 30 days, after they have been tested in a safe copy of your setup first.",
  },
];

export default function AboutPage() {
  requireLive(PATH);

  return (
    <>
      <JsonLd
        data={graph(
          {
            "@type": "AboutPage",
            "@id": SITE_URL + PATH,
            url: SITE_URL + PATH,
            name: "About Whispers Lab",
            about: PROVIDER,
          },
          {
            "@type": "Person",
            name: "Haris Ali",
            jobTitle: "Co-Founder",
            worksFor: PROVIDER,
            image: SITE_URL + "/assets/haris-ali.jpg",
          },
          breadcrumbSchema(CRUMBS)
        )}
      />
      <main>
        <PageBanner
          eyebrow="ABOUT WHISPERS LAB"
          title="We started Whispers Lab to"
          highlight="delete busywork."
          intro="We build custom AI and automation for small business owners, so your team stops doing robotic work and gets hours back every week."
          crumbs={CRUMBS}
        />

        <section className="section">
          <div className="container about-story">
            <div>
              <span className="eyebrow">WHY WE EXIST</span>
              <h2>Good businesses were drowning in admin.</h2>
              <p>
                We kept meeting owners who were great at their work and buried in data entry, status updates, and
                reports. The problem was never effort. It was tools that don&rsquo;t talk to each other, so people
                end up copying information from one screen to another all day.
              </p>
              <p>
                So in 2025 we started Whispers Lab with one goal: take that robotic work away. Not by replacing your
                team, but by building quiet systems that do the busywork behind the scenes.
              </p>
            </div>
            <figure className="about-founder">
              <img src="/assets/haris-ali.jpg" alt="Haris Ali, Co-Founder of Whispers Lab" width={96} height={96} />
              <figcaption>
                <strong>Haris Ali</strong>
                <span>Co-Founder, Whispers Lab</span>
              </figcaption>
            </figure>
          </div>
        </section>

        <section className="section about-facts-wrap">
          <div className="container">
            <dl className="about-facts">
              {FACTS.map((f) => (
                <div key={f.label}>
                  <dt>{f.label}</dt>
                  <dd>{f.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        <section className="section">
          <div className="container">
            <div className="section-head-center">
              <span className="eyebrow">HOW WE WORK</span>
              <h2>Six promises we keep on every build.</h2>
            </div>
            <div className="about-principles">
              {PRINCIPLES.map((p) => (
                <article key={p.title} className="about-principle">
                  <span className="about-principle-icon">
                    <p.icon size={22} strokeWidth={1.8} aria-hidden="true" />
                  </span>
                  <h3>{p.title}</h3>
                  <p>{p.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section">
          <div className="container about-where">
            <div>
              <span className="eyebrow">WHERE WE ARE</span>
              <h2>A US company with a team in Karachi.</h2>
              <p>
                Whispers Lab LLC is registered in Sheridan, Wyoming. Our build team works from Karachi, Pakistan, and
                we work with small businesses across the United States remotely. Calls happen during US business
                hours, and every project gets a private Slack channel so you always know where things stand.
              </p>
            </div>
            <address className="about-address">
              <strong>Whispers Lab LLC</strong>
              30 N Gould St, Ste R
              <br />
              Sheridan, WY 82801, USA
              <br />
              <a href="mailto:hello@whisperslab.com">hello@whisperslab.com</a>
            </address>
          </div>
        </section>

        <section className="section about-cta">
          <div className="container">
            <h2>Want to see what we would automate for you?</h2>
            <p>Start with the $250 Automation Audit. In 7 days you get a clear plan. Build it with us and the $250 is credited.</p>
            <div className="about-cta-actions">
              <a href="/audit" className="btn btn-primary">
                See the Automation Audit
              </a>
              <a href="/book" className="btn btn-ghost">
                Book a free discovery call
              </a>
            </div>
          </div>
        </section>
        <NewsletterSection />
      </main>
    </>
  );
}
