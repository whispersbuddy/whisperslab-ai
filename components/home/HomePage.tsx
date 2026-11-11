// Homepage (Nov 2026). Built from docs/seo/homepage-brief.md: the H1 names the
// entity, the H2s are plain questions, and every priority page is linked with
// descriptive link text. Copy rules: plain words, no em dashes, no hype, and
// only numbers that come from a published case study or lib/offers.ts.
//
// Design: Faculty's calm editorial pacing (big type, one idea per screen,
// grain-gradient bands) on Quantiphi's section rhythm (an
// eyebrow plus a plain headline, alternating light and dark bands, a tabbed
// showcase, soft stat cards, a closing call to action). Brand colours and
// fonts are Whispers Lab's own. Styles: app/styles/home.css, all under .hm.
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight, Calculator, Check, ClipboardCheck, Compass, FileText, Mail, Plug, Phone, UserPlus, Workflow,
} from "lucide-react";
import LatestPosts from "@/components/LatestPosts";
import NewsletterSection from "@/components/NewsletterSection";
import PlatformTabs, { type Platform } from "@/components/home/PlatformTabs";
import ReviewLinks from "@/components/ReviewLinks";
import { FOUNDER_TITLE } from "@/lib/seo";

const START_HERE = [
  { label: "Automation consulting for small businesses", href: "/services/automation-consulting" },
  { label: "n8n consultants", href: "/integrations/n8n" },
  { label: "Zapier consultants", href: "/integrations/zapier" },
  { label: "Airtable consultants", href: "/integrations/airtable" },
  { label: "Data entry automation", href: "/services/data-entry-automation" },
  { label: "Client onboarding automation", href: "/services/client-onboarding-automation" },
  { label: "What automation costs", href: "/pricing" },
  { label: "Automation examples by department", href: "/use-cases" },
];

const FACTS = [
  { big: "Free", label: "Discovery call", note: "Where every project starts" },
  { big: "7 days", label: "Automation Audit", note: "Plan delivered" },
  { big: "30 days", label: "Kickoff to live", note: "One workflow, tested" },
  { big: "Fixed", label: "Scope and price", note: "Agreed before we start" },
];

const TOOLS = [
  { name: "n8n", src: "/assets/n8n.png" },
  { name: "Zapier", src: "/assets/zapier_icon_146029.webp" },
  { name: "Airtable", src: "/assets/airtable.png" },
  { name: "HubSpot", src: "/assets/hubspot-logo.png" },
  { name: "Slack", src: "/assets/slack-outline-logo-minimal-line-art-editable-and-transparent-free-png.webp" },
  { name: "Claude", src: "/assets/Claude-ai-logo.png" },
];

const SERVICES = [
  { icon: Compass, name: "Automation Consulting", blurb: "Find what to automate first, then build it.", href: "/services/automation-consulting" },
  { icon: FileText, name: "Data Entry Automation", blurb: "Invoices, statements, and forms read and filed for you.", href: "/services/data-entry-automation" },
  { icon: UserPlus, name: "Client Onboarding Automation", blurb: "New clients booked, set up, and welcomed on autopilot.", href: "/services/client-onboarding-automation" },
  { icon: Mail, name: "Lead Follow-Up Automation", blurb: "Every lead answered fast and followed up.", href: "/services/lead-follow-up-automation" },
  { icon: Calculator, name: "Bookkeeping Automation", blurb: "Invoices, reminders, and your books kept in sync.", href: "/services/bookkeeping-automation" },
  { icon: Plug, name: "Software Integration Services", blurb: "Your apps sharing one set of data.", href: "/services/software-integration-services" },
];

const PLATFORMS: Platform[] = [
  { name: "n8n", logo: "/assets/n8n.png", w: 764, h: 402, blurb: "Multi-step workflows with branching, built and looked after for you.", href: "/integrations/n8n" },
  { name: "Zapier", logo: "/assets/zapier_icon_146029.webp", w: 512, h: 512, blurb: "App-to-app workflows with the widest range of ready-made connections.", href: "/integrations/zapier" },
  { name: "Airtable", logo: "/assets/airtable.png", w: 286, h: 239, blurb: "Bases your team trusts, with automations that post updates for you.", href: "/integrations/airtable" },
];

const STEPS = [
  {
    icon: Phone,
    stage: "Talk",
    title: "Free discovery call",
    price: "Free",
    meta: "Start here",
    body: "Tell us where the busywork is. We tell you which step fits, or whether it is too early to spend anything.",
    points: ["Your workflows and tools reviewed", "A straight answer on what is worth automating", "No pressure to buy"],
    cta: "Book a discovery call",
    href: "/book",
  },
  {
    icon: ClipboardCheck,
    stage: "Plan",
    title: "7-Day Automation Audit",
    price: "7 days",
    meta: "Plan delivered",
    body: "Know which 2 to 3 workflows to automate first, what they cost today, and what building them involves.",
    points: ["Up to three mapped workflows", "Cost and time baseline", "Prioritized build plan"],
    cta: "See the Automation Audit",
    href: "/audit",
  },
  {
    icon: Workflow,
    stage: "Build",
    title: "30-Day Core Build",
    price: "30 days",
    meta: "Fixed scope",
    body: "We build, test, and launch your highest-value workflow with acceptance testing and a clear definition of done. Ongoing care is optional after launch.",
    points: ["One agreed workflow, fixed quote", "Documentation and team training", "30-day launch stabilization"],
    cta: "Explore the Core Build",
    href: "/core-build",
  },
];

const INDUSTRIES = [
  { name: "Law firms", href: "/industries/law-firms" },
  { name: "Real estate", href: "/industries/real-estate" },
  { name: "E-commerce and retail", href: "/industries/ecommerce-retail" },
  { name: "Property management", href: "/industries/property-management" },
  { name: "Accounting and bookkeeping", href: "/industries/accounting-bookkeeping" },
];

const RESULTS = [
  { num: "~15 hrs", unit: "saved every week", tag: "Financial services", title: "The AI-Powered Financial Document Reader", body: "Bank statements and invoices read and filed with no manual data entry.", href: "/case-studies/financial-document-reader" },
  { num: "~22 hrs", unit: "saved every week", tag: "E-commerce and retail", title: "The AI Catalog and Content Engine", body: "Messy supplier catalogs cleaned, translated, and published to the store.", href: "/case-studies/ai-catalog-content-engine" },
  { num: "~6 hrs", unit: "saved every week", tag: "Education", title: "The CRM That Fills Itself In", body: "Emails and meetings logged to the right contact with no typing.", href: "/case-studies/crm-that-fills-itself-in" },
];

const COSTS = [
  { title: "Copying data between tools", body: "Hours lost moving information between disconnected apps by hand." },
  { title: "Chasing status updates", body: "Follow-ups just to find out where a job or a lead stands." },
  { title: "Handoffs that misfire", body: "Tasks that stall or go to the wrong person and cost real revenue." },
];

const pad = (n: number) => String(n + 1).padStart(2, "0");

function Arrow() {
  return <ArrowRight size={16} aria-hidden="true" />;
}

export default function HomePage() {
  return (
    <main className="home-page hm">
      {/* 1. HERO */}
      <section className="hm-hero" id="home">
        <div className="hm-hero-bg" aria-hidden="true" />
        <div className="container hm-hero-inner">
          <p className="hm-eyebrow hm-eyebrow-light">We delete busywork.</p>
          <h1>
            Small business automation, <span className="hm-grad-text">built and maintained for you.</span>
          </h1>
          <p className="hm-lead">
            Whispers Lab is a US automation agency that builds and maintains done-for-you automations for small
            businesses on n8n, Zapier, Make and Airtable.
          </p>
          <div className="hm-actions hm-actions-center">
            <Link href="/book" className="hm-btn"><span>Book a free discovery call</span><Arrow /></Link>
            <Link href="/services" className="hm-btn hm-btn-ghost"><span>See the services</span><Arrow /></Link>
          </div>
          <p className="hm-promise">Fixed scope. You own every account.</p>
        </div>
        <div className="hm-grain" aria-hidden="true" />
        <div className="container hm-facts-wrap">
          <dl className="hm-facts hm-chamfer">
            {FACTS.map((f) => (
              <div key={f.big}>
                <dt>{f.big}</dt>
                <dd><b>{f.label}</b><span>{f.note}</span></dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* 2. TRUST STRIP */}
      <section className="hm-trust">
        <div className="container hm-trust-inner">
          <p className="hm-trust-label">Built on the tools your team already uses</p>
          <ul className="hm-logos">
            {TOOLS.map((t) => (
              <li key={t.name}><Image src={t.src} alt={t.name} width={120} height={32} /></li>
            ))}
          </ul>
          <ReviewLinks tone="light" compact />
        </div>
      </section>

      {/* 3. SERVICES */}
      <section className="hm-section hm-paper" id="services-list">
        <div className="container">
          <header className="hm-head hm-head-center">
            <p className="hm-eyebrow">Services</p>
            <h2>What does Whispers Lab automate?</h2>
            <p>Six service areas, all built the same way: a plan first, a fixed scope, and a workflow you own.</p>
          </header>
          <div className="hm-grid hm-grid-3">
            {SERVICES.map((s) => {
              const Icon = s.icon;
              return (
                <Link href={s.href} className="hm-card hm-chamfer hm-service" key={s.href}>
                  <span className="hm-icon"><Icon size={26} strokeWidth={1.6} aria-hidden="true" /></span>
                  <h3>{s.name}</h3>
                  <p>{s.blurb}</p>
                  <span className="hm-more">Learn more <ArrowRight size={15} aria-hidden="true" /></span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. PLATFORMS (dark, tabbed) */}
      <section className="hm-section hm-dark">
        <div className="hm-dark-bg" aria-hidden="true" />
        <div className="container">
          <header className="hm-head hm-head-center">
            <p className="hm-eyebrow hm-eyebrow-light">Platforms</p>
            <h2>Which tools do we build on?</h2>
            <p>We recommend one after we hear your workflow based on your workflow, not a fixed preference. You own the account either way.</p>
          </header>
          <PlatformTabs platforms={PLATFORMS} />
          <p className="hm-foot">We also connect HubSpot, Slack, Gmail, OpenAI and Claude where a workflow needs them.</p>
        </div>
      </section>

      {/* 5. HOW IT WORKS */}
      <section className="hm-section hm-white" id="how-it-works">
        <div className="container">
          <header className="hm-head hm-head-center">
            <p className="hm-eyebrow">How we work</p>
            <h2>How does it work?</h2>
            <p>Start with a conversation, get a plan, then build the right workflow. Ongoing care is there when you want it.</p>
          </header>
          <ol className="hm-steps">
            {STEPS.map((s, i) => {
              const Icon = s.icon;
              return (
                <li className={`hm-step hm-chamfer${i === 0 ? " is-start" : ""}`} key={s.href}>
                  <div className="hm-step-top">
                    <span className="hm-icon"><Icon size={26} strokeWidth={1.6} aria-hidden="true" /></span>
                    <span className="hm-step-stage">Step {i + 1} · {s.stage}</span>
                  </div>
                  <h3>{s.title}</h3>
                  <p className="hm-step-price"><b>{s.price}</b><span>{s.meta}</span></p>
                  <p>{s.body}</p>
                  <ul>
                    {s.points.map((pt) => (<li key={pt}><Check size={15} aria-hidden="true" />{pt}</li>))}
                  </ul>
                  <Link href={s.href} className="hm-more">{s.cta} <ArrowRight size={15} aria-hidden="true" /></Link>
                </li>
              );
            })}
          </ol>
          <div className="hm-center-row">
            <Link href="/pricing" className="hm-btn hm-btn-outline"><span>See packages and pricing</span><Arrow /></Link>
          </div>
        </div>
      </section>

      {/* 6. RESULTS (grain band) */}
      <section className="hm-section hm-band">
        <div className="hm-band-bg" aria-hidden="true" />
        <div className="container">
          <header className="hm-head hm-head-center hm-head-light">
            <p className="hm-eyebrow hm-eyebrow-light">Results</p>
            <h2>What results have clients seen?</h2>
            <p>Real systems built for real businesses. Every number comes from a published case study.</p>
          </header>
          <div className="hm-grid hm-grid-3">
            {RESULTS.map((r) => (
              <Link href={r.href} className="hm-card hm-chamfer hm-result" key={r.href}>
                <span className="hm-tag">{r.tag}</span>
                <strong className="hm-num">{r.num}</strong>
                <span className="hm-unit">{r.unit}</span>
                <h3>{r.title}</h3>
                <p>{r.body}</p>
                <span className="hm-more">Read the case study <ArrowRight size={15} aria-hidden="true" /></span>
              </Link>
            ))}
          </div>
          <div className="hm-center-row">
            <Link href="/case-studies" className="hm-btn hm-btn-ghost"><span>See all case studies</span><Arrow /></Link>
          </div>
        </div>
      </section>

      {/* 7. INDUSTRIES */}
      <section className="hm-section hm-white">
        <div className="container hm-split">
          <header className="hm-head">
            <p className="hm-eyebrow">Industries</p>
            <h2>Who do we do it for?</h2>
            <p>Small businesses where the same paperwork, follow-up, and data entry repeat every day.</p>
            <Link href="/industries" className="hm-btn hm-btn-outline"><span>All industries</span><Arrow /></Link>
          </header>
          <ul className="hm-rows">
            {INDUSTRIES.map((i) => (
              <li key={i.href}>
                <Link href={i.href}><span>{i.name}</span><ArrowRight size={20} aria-hidden="true" /></Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 8. COST OF MANUAL WORK */}
      <section className="hm-section hm-paper">
        <div className="container">
          <header className="hm-head hm-head-center">
            <p className="hm-eyebrow">The cost of manual work</p>
            <h2>What does manual work cost you?</h2>
            <p>The problem is rarely effort. It is disconnected tools and handoffs that quietly drain your team every day.</p>
          </header>
          <div className="hm-grid hm-grid-3">
            {COSTS.map((c, i) => (
              <div className="hm-card hm-chamfer hm-cost" key={c.title}>
                <span className="hm-cost-n">{pad(i)}</span>
                <h3>{c.title}</h3>
                <p>{c.body}</p>
              </div>
            ))}
          </div>
          <div className="hm-roi hm-chamfer">
            <div>
              <h3>Put a number on it before you spend anything.</h3>
              <p>Two free tools: one for the cost, one for how ready your business is.</p>
            </div>
            <div className="hm-actions">
              <Link href="/resources/automation-roi-calculator" className="hm-btn"><span>Calculate your automation ROI</span><Arrow /></Link>
              <Link href="/resources/ai-readiness-assessment" className="hm-btn hm-btn-ghost"><span>Check AI readiness</span><Arrow /></Link>
            </div>
          </div>
        </div>
      </section>

      {/* 9. FOUNDER NOTE */}
      <section className="hm-section hm-white">
        <div className="container hm-note">
          <Image src="/assets/haris-ali.jpg" alt="Haris Ali" width={440} height={550} className="hm-portrait hm-chamfer" />
          <div>
            <p className="hm-eyebrow">A note from the lab</p>
            <p className="hm-quote">
              We saw capable small business owners drowning in data entry, reporting, and scheduling. Automation is not
              about replacing your team. It is about removing the robotic work people were never meant to do.
            </p>
            <p className="hm-by"><b>Haris Ali</b>{FOUNDER_TITLE}, Whispers Lab</p>
          </div>
        </div>
      </section>

      {/* 10. START HERE */}
      <section className="hm-start hm-paper" aria-labelledby="hm-start-title">
        <div className="container hm-start-grid">
          <p className="hm-eyebrow" id="hm-start-title">Start here</p>
          <ol>
            {START_HERE.map((l, i) => (
              <li key={l.href}>
                <Link href={l.href}>
                  <span className="hm-index-num">{pad(i)}</span>
                  <span className="hm-index-label">{l.label}</span>
                  <ArrowRight size={16} aria-hidden="true" />
                </Link>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 11. CLOSING CALL TO ACTION */}
      <section className="hm-final">
        <div className="hm-final-bg" aria-hidden="true" />
        <div className="container hm-final-inner">
          <p className="hm-eyebrow">Next step</p>
          <h2>How do you start?</h2>
          <p>Book a free discovery call. We will tell you what to automate first and what it would take. Packages and prices are on one page.</p>
          <div className="hm-actions hm-actions-center">
            <Link href="/book" className="hm-btn"><span>Book a free discovery call</span><Arrow /></Link>
            <Link href="/pricing" className="hm-btn hm-btn-outline"><span>See pricing</span><Arrow /></Link>
          </div>
        </div>
      </section>

      <LatestPosts />
      <NewsletterSection />
    </main>
  );
}
