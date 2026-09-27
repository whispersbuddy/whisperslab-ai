import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Clock, FileCheck2, Hammer, KeyRound, ShieldCheck, Users } from "lucide-react";
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
      <main className="pilot-page about-new">
        <section className="about-new-hero"><div className="container"><nav className="pilot-crumbs is-dark" aria-label="Breadcrumb"><span><Link href="/">Home</Link><i aria-hidden="true">/</i></span><span aria-current="page">About</span></nav><div className="about-new-hero-grid"><div><span className="pilot-label pilot-label-light">ABOUT WHISPERS LAB · EST. 2025</span><h1>We build the systems that make work feel <span>quieter.</span></h1><p>Custom AI and automation for small businesses—designed so the robotic work disappears while people keep the judgment.</p></div><figure><div><Image src="/assets/haris-ali.jpg" alt="Haris Ali, Co-Founder of Whispers Lab" fill sizes="(max-width: 720px) 100vw, 42vw" /></div><figcaption><span>CO-FOUNDER</span><b>Haris Ali</b><small>Karachi, Pakistan · Working with US businesses</small></figcaption></figure></div></div></section>

        <section className="about-manifesto"><div className="container"><span className="pilot-label">WHY WE EXIST</span><div><h2>Good businesses were drowning in admin.</h2><p>We kept meeting owners who were great at their work and buried in data entry, status updates, and reports. The problem was never effort. It was tools that do not talk to each other, so people copy information from one screen to another all day.</p><p>So in 2025 we started Whispers Lab with one goal: take that robotic work away. Not by replacing the team, but by building quiet systems that do the busywork behind the scenes.</p></div></div></section>

        <section className="about-new-facts"><div className="container"><dl>{FACTS.map((fact) => <div key={fact.label}><dd>{fact.value}</dd><dt>{fact.label}</dt></div>)}</dl></div></section>

        <section className="about-new-principles"><div className="container"><div className="pilot-section-head"><span className="pilot-label pilot-label-light">OUR BUILD STANDARD</span><h2>Six promises, applied to every workflow.</h2></div><div>{PRINCIPLES.map((principle, index) => <article key={principle.title}><span>{String(index + 1).padStart(2, "0")}</span><principle.icon aria-hidden="true" /><h3>{principle.title}</h3><p>{principle.body}</p></article>)}</div></div></section>

        <section className="about-new-location"><div className="container"><div><span className="pilot-label">ONE COMPANY · TWO OPERATING CONTEXTS</span><h2>A US company with a build team in Karachi.</h2><p>Whispers Lab LLC is registered in Sheridan, Wyoming. Our build team works from Karachi, Pakistan, and we work with small businesses across the United States remotely. Calls happen during US business hours, and every project gets a private Slack channel so you always know where things stand.</p></div><address><span>REGISTERED OFFICE</span><b>Whispers Lab LLC</b><p>30 N Gould St, Ste R<br />Sheridan, WY 82801, USA</p><a href="mailto:hello@whisperslab.com">hello@whisperslab.com</a></address></div></section>

        <section className="pilot-final pilot-final-about"><div className="container"><span className="pilot-label pilot-label-light">SHOW US THE BUSYWORK</span><h2>Want to see what we would automate for you?</h2><p>Start with the $250 Automation Audit. In 7 days you get a clear plan. Build it with us and the $250 is credited.</p><div className="pilot-actions"><Link href="/audit" className="btn btn-primary">See the Automation Audit</Link><Link href="/book" className="btn btn-ghost-light">Book a free discovery call</Link></div></div></section>
        <NewsletterSection />
      </main>
    </>
  );
}
