// Homepage (Nov 2026). Built from docs/seo/homepage-brief.md: the H1 names the
// entity, the H2s are plain questions, and every priority page is linked with
// descriptive link text. Copy rules: plain words, no em dashes, no hype, and
// only numbers that come from a published case study or lib/offers.ts.
// Look: consulting firm, not software. Flat navy and paper, serif headlines,
// hairline rules, square corners, one accent colour (see app/styles/home.css).
import Image from "next/image";
import Link from "next/link";
import { Fragment } from "react";
import { ArrowRight, ClipboardCheck, KeyRound, ShieldCheck, Workflow } from "lucide-react";
import HomeOfferPath from "@/components/HomeOfferPath";
import LatestPosts from "@/components/LatestPosts";
import NewsletterSection from "@/components/NewsletterSection";
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

const STEPS = [
  { icon: ClipboardCheck, name: "Automation Audit", price: "$250", note: "One-time, credited toward a build", href: "/audit", path: "M0,96 C50,96 50,70 100,70" },
  { icon: Workflow, name: "Core Build", price: "From $2,500", note: "Fixed price, built in 30 days", href: "/core-build", path: "M0,70 C50,70 50,44 100,44" },
  { icon: ShieldCheck, name: "Automation Care", price: "$500/mo", note: "We maintain it after launch", href: "/automation-care", path: "M0,44 C50,44 50,26 100,26" },
];

const SERVICES = [
  { name: "Automation Consulting", blurb: "Find what to automate first, then build it.", href: "/services/automation-consulting" },
  { name: "Data Entry Automation", blurb: "Invoices, statements, and forms read and filed for you.", href: "/services/data-entry-automation" },
  { name: "Client Onboarding Automation", blurb: "New clients booked, set up, and welcomed on autopilot.", href: "/services/client-onboarding-automation" },
  { name: "Lead Follow-Up Automation", blurb: "Every lead answered fast and followed up.", href: "/services/lead-follow-up-automation" },
  { name: "Bookkeeping Automation", blurb: "Invoices, reminders, and your books kept in sync.", href: "/services/bookkeeping-automation" },
  { name: "Software Integration Services", blurb: "Your apps sharing one set of data.", href: "/services/software-integration-services" },
];

const INDUSTRIES = [
  { name: "Law firms", href: "/industries/law-firms" },
  { name: "Real estate", href: "/industries/real-estate" },
  { name: "E-commerce and retail", href: "/industries/ecommerce-retail" },
  { name: "Property management", href: "/industries/property-management" },
  { name: "Accounting and bookkeeping", href: "/industries/accounting-bookkeeping" },
];

const PLATFORMS = [
  { name: "n8n", logo: "/assets/n8n.png", w: 764, h: 402, blurb: "Multi-step workflows with branching, built and looked after for you.", href: "/integrations/n8n" },
  { name: "Zapier", logo: "/assets/zapier_icon_146029.webp", w: 512, h: 512, blurb: "App-to-app workflows with the widest range of ready-made connections.", href: "/integrations/zapier" },
  { name: "Airtable", logo: "/assets/airtable.png", w: 286, h: 239, blurb: "Bases your team trusts, with automations that post updates for you.", href: "/integrations/airtable" },
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

export default function HomePage() {
  return (
    <main className="home-page hm">
      {/* HERO */}
      <section className="hm-hero" id="home">
        <div className="container">
          <div className="hm-hero-copy">
            <p className="hm-kicker">We delete busywork.</p>
            <h1>
              Small business automation, <span className="hm-grad-text">built and maintained for you.</span>
            </h1>
            <div className="hm-hero-row">
              <p className="hm-lead">
                Whispers Lab is a US automation agency that builds and maintains done-for-you automations for small
                businesses on n8n, Zapier, Make and Airtable.
              </p>
              <div className="hm-hero-cta">
                <div className="hm-actions">
                  <Link href="/audit" className="hm-btn">Start with the $250 Audit <ArrowRight size={16} aria-hidden="true" /></Link>
                  <Link href="/services" className="hm-link-light">See the services <ArrowRight size={16} aria-hidden="true" /></Link>
                </div>
                <p className="hm-promise">Fixed prices. You own every account.</p>
                <ReviewLinks tone="dark" compact />
              </div>
            </div>
          </div>

          <div className="hm-eq" role="group" aria-label="How an engagement fits together">
            {STEPS.map((s, i) => {
              const Icon = s.icon;
              return (
                <Fragment key={s.href}>
                  <Link href={s.href} className={`hm-step hm-step-${i + 1}`}>
                    <span className="hm-cube"><Icon size={34} strokeWidth={1.5} aria-hidden="true" /></span>
                    <span className="hm-step-name">{s.name}</span>
                    <span className="hm-step-price">{s.price}</span>
                    <span className="hm-step-note">{s.note}</span>
                    <span className="hm-drop" aria-hidden="true" />
                    <svg className="hm-seg" viewBox="0 0 100 150" preserveAspectRatio="none" aria-hidden="true"><path d={s.path} vectorEffect="non-scaling-stroke" /></svg>
                    <span className="hm-dot" aria-hidden="true" />
                  </Link>
                  <span className="hm-op" aria-hidden="true">{i < STEPS.length - 1 ? "+" : "="}</span>
                </Fragment>
              );
            })}
            <div className="hm-step hm-result">
              <span className="hm-cube hm-cube-result"><KeyRound size={34} strokeWidth={1.5} aria-hidden="true" /></span>
              <span className="hm-step-name">A workflow you own</span>
              <span className="hm-step-price">30 days</span>
              <span className="hm-step-note">From kickoff to live. Every account stays in your name.</span>
            </div>
          </div>
        </div>
        <div className="hm-grain" aria-hidden="true" />
      </section>

      {/* START HERE */}
      <section className="hm-start hm-white" aria-labelledby="hm-start-title">
        <div className="container hm-start-grid">
          <p className="hm-start-title" id="hm-start-title">Start here</p>
          <ol>
            {START_HERE.map((l, i) => (
              <li key={l.href}>
                <Link href={l.href}>
                  <span className="hm-index-num">{pad(i)}</span>
                  <span className="hm-index-label">{l.label}</span>
                  <ArrowRight size={15} aria-hidden="true" />
                </Link>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* SERVICES */}
      <section className="hm-section hm-white" id="services-list">
        <div className="container">
          <header className="hm-head">
            <span className="hm-label">Services</span>
            <h2>What does Whispers Lab automate?</h2>
            <p>Six service areas, all built the same way: a plan first, a fixed price, and a workflow you own.</p>
          </header>
          <div className="hm-table hm-table-3">
            {SERVICES.map((s, i) => (
              <Link href={s.href} className="hm-cell" key={s.href}>
                <span className="hm-cell-num">{pad(i)}</span>
                <h3>{s.name}</h3>
                <p>{s.blurb}</p>
                <span className="hm-more">Learn more <ArrowRight size={15} aria-hidden="true" /></span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* INDUSTRIES */}
      <section className="hm-section hm-paper">
        <div className="container hm-split">
          <header className="hm-head">
            <span className="hm-label">Industries</span>
            <h2>Who do we do it for?</h2>
            <p>Small businesses where the same paperwork, follow-up, and data entry repeat every day.</p>
            <Link href="/industries" className="hm-text-link">All industries <ArrowRight size={15} aria-hidden="true" /></Link>
          </header>
          <ul className="hm-rows">
            {INDUSTRIES.map((i) => (
              <li key={i.href}>
                <Link href={i.href}><span>{i.name}</span><ArrowRight size={15} aria-hidden="true" /></Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* TOOLS */}
      <section className="hm-section hm-white">
        <div className="container">
          <header className="hm-head">
            <span className="hm-label">Platforms</span>
            <h2>Which tools do we build on?</h2>
            <p>We recommend one during the Audit based on your workflow, not a fixed preference. You own the account either way.</p>
          </header>
          <div className="hm-table hm-table-3">
            {PLATFORMS.map((p) => (
              <Link href={p.href} className="hm-cell hm-platform" key={p.href}>
                <span className="hm-logo"><Image src={p.logo} alt="" width={p.w} height={p.h} /></span>
                <h3>{p.name} consultants</h3>
                <p>{p.blurb}</p>
                <span className="hm-more">See how we build on {p.name} <ArrowRight size={15} aria-hidden="true" /></span>
              </Link>
            ))}
          </div>
          <p className="hm-foot">We also connect HubSpot, Slack, Gmail, OpenAI and Claude where a workflow needs them.</p>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <HomeOfferPath />

      {/* RESULTS */}
      <section className="hm-section hm-white">
        <div className="container">
          <header className="hm-head">
            <span className="hm-label">Results</span>
            <h2>What results have clients seen?</h2>
            <p>Real systems built for real businesses. Every number comes from a published case study.</p>
          </header>
          <div className="hm-table hm-table-3">
            {RESULTS.map((r) => (
              <Link href={r.href} className="hm-cell hm-result" key={r.href}>
                <span className="hm-tag">{r.tag}</span>
                <strong className="hm-num">{r.num}</strong>
                <span className="hm-unit">{r.unit}</span>
                <h3>{r.title}</h3>
                <p>{r.body}</p>
                <span className="hm-more">Read the case study <ArrowRight size={15} aria-hidden="true" /></span>
              </Link>
            ))}
          </div>
          <Link href="/case-studies" className="hm-text-link hm-center-link">See all case studies <ArrowRight size={15} aria-hidden="true" /></Link>
        </div>
      </section>

      {/* COST OF MANUAL WORK */}
      <section className="hm-section hm-dark">
        <div className="container hm-split">
          <header className="hm-head">
            <span className="hm-label hm-label-light">The cost of manual work</span>
            <h2>What does manual work cost you?</h2>
            <p>The problem is rarely effort. It is disconnected tools and handoffs that quietly drain your team every day. Put a number on it before you spend anything.</p>
            <div className="hm-actions">
              <Link href="/resources/automation-roi-calculator" className="hm-btn">Calculate your automation ROI <ArrowRight size={16} aria-hidden="true" /></Link>
              <Link href="/resources/ai-readiness-assessment" className="hm-link-light">Check AI readiness <ArrowRight size={16} aria-hidden="true" /></Link>
            </div>
          </header>
          <ol className="hm-cost-list">
            {COSTS.map((c, i) => (
              <li key={c.title}><span>{pad(i)}</span><div><h3>{c.title}</h3><p>{c.body}</p></div></li>
            ))}
          </ol>
        </div>
      </section>

      {/* FOUNDER NOTE */}
      <section className="hm-section hm-paper">
        <div className="container hm-note">
          <Image src="/assets/haris-ali.jpg" alt="Haris Ali" width={160} height={160} className="hm-avatar" />
          <div>
            <span className="hm-label">A note from the lab</span>
            <p className="hm-quote">
              We saw capable small business owners drowning in data entry, reporting, and scheduling. Automation is not
              about replacing your team. It is about removing the robotic work people were never meant to do.
            </p>
            <p className="hm-by"><b>Haris Ali</b>, {FOUNDER_TITLE}, Whispers Lab</p>
          </div>
        </div>
      </section>

      {/* START */}
      <section className="hm-section hm-white">
        <div className="container">
          <div className="hm-cta">
            <div>
              <span className="hm-label hm-label-light">Next step</span>
              <h2>How do you start?</h2>
              <p>Book a free discovery call, or go straight to the $250 Automation Audit. It is credited toward a build, and you keep the plan either way.</p>
            </div>
            <div className="hm-actions">
              <Link href="/book" className="hm-btn">Book a free discovery call <ArrowRight size={16} aria-hidden="true" /></Link>
              <Link href="/audit" className="hm-link-light">See the Automation Audit <ArrowRight size={16} aria-hidden="true" /></Link>
            </div>
          </div>
        </div>
      </section>

      <LatestPosts />
      <NewsletterSection />
    </main>
  );
}
