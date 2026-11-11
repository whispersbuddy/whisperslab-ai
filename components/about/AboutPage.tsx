// /about in the homepage design system. Styles: app/styles/about.css.
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Clock, FileCheck2, Hammer, KeyRound, ShieldCheck, Users } from "lucide-react";
import NewsletterSection from "@/components/NewsletterSection";
import type { Crumb } from "@/lib/seo";

const PRINCIPLES = [
  { icon: Hammer, title: "Boring AI that works", body: "No flashy demos. We build the plain systems that take repetitive work off your plate, and we only add AI where a simple rule can't do the job." },
  { icon: Users, title: "People keep the judgment", body: "Automation handles the copying, chasing, and filing. Anything that needs a decision, like approving a payment, still goes to a person." },
  { icon: KeyRound, title: "You own what we build", body: "Your workflows live in your own accounts, with written docs and video walkthroughs. You are never locked in to us." },
  { icon: FileCheck2, title: "Fixed prices, no surprises", body: "Builds get a fixed quote before we start. No hourly billing, no scope creep." },
  { icon: ShieldCheck, title: "Careful with your data", body: "Each workflow gets only the access it needs, every automated action is logged, and client-facing messages wait for your approval." },
  { icon: Clock, title: "Fast, but tested", body: "Most builds go live in under 30 days, after they have been tested in a safe copy of your setup first." },
];

export default function AboutPage({ crumbs, founderTitle, caseCount }: { crumbs: Crumb[]; founderTitle: string; caseCount: number }) {
  const facts = [
    { value: "2025", label: "Founded" },
    { value: "4", label: "Automation builders" },
    { value: "10 to 12", label: "People on the team" },
    { value: String(caseCount), label: "Published case studies" },
  ];

  return (
    <main className="about-page hm">
      <section className="hm-section hm-dark hm-phero hm-ahero">
        <div className="hm-dark-bg" aria-hidden="true" />
        <div className="container hm-ahero-grid">
          <div>
            <nav className="hm-crumbs" aria-label="Breadcrumb">
              {crumbs.map((c, i) => (
                <span key={c.path}>
                  {i < crumbs.length - 1 ? <Link href={c.path}>{c.name}</Link> : <span aria-current="page">{c.name}</span>}
                  {i < crumbs.length - 1 ? <i aria-hidden="true">/</i> : null}
                </span>
              ))}
            </nav>
            <p className="hm-eyebrow hm-eyebrow-light">About Whispers Lab · Est. 2025</p>
            <h1>
              We build the systems that make work feel <span className="hm-grad-text">quieter.</span>
            </h1>
            <p className="hm-lead">
              Whispers Lab is a US automation agency that builds and maintains done-for-you automations for small
              businesses on n8n, Zapier, Make and Airtable, so the robotic work disappears while people keep the judgment.
            </p>
            <div className="hm-actions">
              <Link href="/book" className="hm-btn">
                <span>Book a free discovery call</span>
                <ArrowRight size={16} aria-hidden="true" />
              </Link>
              <Link href="/case-studies" className="hm-btn hm-btn-ghost">
                <span>See our work</span>
                <ArrowRight size={16} aria-hidden="true" />
              </Link>
            </div>
          </div>
          <figure className="hm-aperson" id="haris-ali">
            <div className="hm-aphoto">
              <Image src="/assets/haris-ali.jpg" alt={`Haris Ali, ${founderTitle} at Whispers Lab`} fill sizes="(max-width: 980px) 100vw, 40vw" />
            </div>
            <figcaption>
              <small>{founderTitle}</small>
              <b>Haris Ali</b>
              <span>Karachi, Pakistan · Working with US businesses</span>
            </figcaption>
          </figure>
        </div>
      </section>

      <section className="hm-section hm-white">
        <div className="container hm-split">
          <header className="hm-head">
            <p className="hm-eyebrow">Why we exist</p>
            <h2>Good businesses were drowning in admin.</h2>
          </header>
          <div className="hm-astory">
            <p>
              We kept meeting owners who were great at their work and buried in data entry, status updates, and reports.
              The problem was never effort. It was tools that do not talk to each other, so people copy information from
              one screen to another all day.
            </p>
            <p>
              So in 2025 we started Whispers Lab with one goal: take that robotic work away. Not by replacing the team,
              but by building quiet systems that do the busywork behind the scenes.
            </p>
          </div>
        </div>
        <div className="container">
          <dl className="hm-stats hm-afacts">
            {facts.map((f) => (
              <div key={f.label}>
                <dd>{f.value}</dd>
                <dt>{f.label}</dt>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="hm-section hm-dark">
        <div className="hm-dark-bg" aria-hidden="true" />
        <div className="container">
          <header className="hm-head">
            <p className="hm-eyebrow hm-eyebrow-light">Our build standard</p>
            <h2>Six promises, applied to every workflow.</h2>
          </header>
          <div className="hm-aprin">
            {PRINCIPLES.map((p, i) => (
              <article key={p.title}>
                <span>{String(i + 1).padStart(2, "0")}</span>
                <p.icon size={24} aria-hidden="true" />
                <h3>{p.title}</h3>
                <p>{p.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="hm-section hm-paper">
        <div className="container hm-split">
          <header className="hm-head">
            <p className="hm-eyebrow">One company, two places</p>
            <h2>A US company with a build team in Karachi.</h2>
            <p>
              Whispers Lab LLC is registered in Sheridan, Wyoming. Our build team works from Karachi, Pakistan, and we
              work with small businesses across the United States remotely. Calls happen during US business hours, and
              every project gets a private Slack channel so you always know where things stand.
            </p>
          </header>
          <address className="hm-aaddr">
            <small>Registered office</small>
            <b>Whispers Lab LLC</b>
            <p>
              30 N Gould St, Ste R
              <br />
              Sheridan, WY 82801, USA
            </p>
            <a href="mailto:hello@whisperslab.com">hello@whisperslab.com</a>
          </address>
        </div>
      </section>

      <section className="hm-final">
        <div className="hm-final-bg" aria-hidden="true" />
        <div className="container hm-final-inner">
          <p className="hm-eyebrow">Show us the busywork</p>
          <h2>Want to see what we would automate for you?</h2>
          <p>Book a free discovery call. We will tell you what is worth automating first, and what is not.</p>
          <div className="hm-actions hm-actions-center">
            <Link href="/book" className="hm-btn">
              <span>Book a free discovery call</span>
              <ArrowRight size={16} aria-hidden="true" />
            </Link>
            <Link href="/pricing" className="hm-btn hm-btn-outline">
              <span>See pricing</span>
              <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
      <NewsletterSection variant="home" />
    </main>
  );
}
