import Link from "next/link";
import {
  Activity,
  ArrowRight,
  Check,
  CircleGauge,
  FileCheck2,
  LifeBuoy,
  PlusCircle,
  RefreshCw,
  ShieldCheck,
  Sparkles,
  TriangleAlert,
  Unplug,
  Wrench,
} from "lucide-react";
import type { Crumb } from "@/lib/seo";
import { OFFERS } from "@/lib/offers";
import NewsletterSection from "@/components/NewsletterSection";
import { PilotFaq } from "@/components/pilots/ExpansionPilots";

type FaqItem = { q: string; a: string };

function CommercialCrumbs({ crumbs }: { crumbs: Crumb[] }) {
  return (
    <nav className="pilot-crumbs is-dark" aria-label="Breadcrumb">
      {crumbs.map((crumb, index) => (
        <span key={crumb.path}>
          {index < crumbs.length - 1 ? <Link href={crumb.path}>{crumb.name}</Link> : <span aria-current="page">{crumb.name}</span>}
          {index < crumbs.length - 1 ? <i aria-hidden="true">/</i> : null}
        </span>
      ))}
    </nav>
  );
}

const STAGES = [
  { number: "01", cue: "I need clarity", title: "Diagnose", detail: "A 7-day decision sprint", href: "/audit" },
  { number: "02", cue: "I know the problem", title: "Build", detail: "One agreed workflow in under 30 days", href: "/core-build" },
];

const OFFER_ACTION = {
  audit: "DECIDE",
  "core-build": "DEPLOY",
  "automation-care": "PROTECT",
  "growth-partner": "COMPOUND",
} as const;

export function PricingPilot({ crumbs, faq }: { crumbs: Crumb[]; faq: FaqItem[] }) {
  return (
    <main className="pilot-page price-page">
      <section className="price-hero">
        <div className="container">
          <CommercialCrumbs crumbs={crumbs} />
          <div className="price-hero-grid">
            <div>
              <span className="pilot-label pilot-label-light">FIXED SCOPE · CLEAR NEXT STEP</span>
              <h1>Buy the next <span>decision.</span> Not an open tab.</h1>
              <p>Start with clarity, move into a fixed-scope build, then choose maintenance or continuous improvement only when the systems are worth protecting.</p>
            </div>
            <div className="price-path" aria-label="Whispers Lab offer path">
              {STAGES.map((stage) => (
                <Link href={stage.href} key={stage.href}>
                  <span>{stage.number}</span>
                  <div><small>{stage.cue}</small><b>{stage.title}</b><em>{stage.detail}</em></div>
                  <ArrowRight size={18} />
                </Link>
              ))}
              <div className="price-path-operate">
                <span>03</span>
                <div className="price-path-operate-main"><small>I already use automation</small><b>Operate</b><em>Choose protection or continuous expansion</em></div>
                <div className="price-path-choices">
                  <Link href="/automation-care"><b>Care</b><small>Maintain what exists</small><ArrowRight size={15} /></Link>
                  <Link href="/growth-partner"><b>Growth</b><small>Maintain and expand</small><ArrowRight size={15} /></Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="price-offers">
        <div className="container">
          <header><span className="pilot-label">THE COMMERCIAL PATH</span><h2>Four offers. One understandable progression.</h2></header>
          <div className="price-offer-list">
            {OFFERS.map((offer, index) => (
              <article key={offer.key} className={offer.key === "core-build" ? "is-core" : ""}>
                <div className="price-offer-index"><span>{String(index + 1).padStart(2, "0")}</span><small>{offer.timeline}</small></div>
                <div className="price-offer-main"><small>{OFFER_ACTION[offer.key]}</small><h3>{offer.name}</h3><p>{offer.pitch}</p><div>{offer.includes.map((item) => <span key={item}><Check size={14} />{item}</span>)}</div></div>
                <div className="price-offer-buy"><strong>{offer.price}</strong><p>{offer.bestFor}</p><Link className={offer.key === "core-build" ? "btn btn-primary" : "btn btn-dark"} href={offer.href}>{offer.cta}</Link></div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="price-compare"><div className="container"><div className="pilot-section-head"><span className="pilot-label pilot-label-light">SIDE BY SIDE</span><h2>Compare the job each offer does.</h2></div><div className="price-table"><div className="head"><span>Offer</span><span>Investment</span><span>Time to outcome</span><span>Best next move</span></div>{OFFERS.map((offer) => <div key={offer.key}><b>{offer.name}</b><strong>{offer.price}</strong><span>{offer.timeline}</span><Link href={offer.href}>See exact scope <ArrowRight size={14} /></Link></div>)}</div><p className="price-note"><b>$250 credit:</b> complete the Automation Audit, then build with us, and the entire Audit fee is credited toward the Core Build.</p></div></section>
      <PilotFaq title="Pricing questions, answered" items={faq} />
      <section className="pilot-final pilot-final-price"><div className="container"><span className="pilot-label pilot-label-light">NO FORCED UPSELL</span><h2>Unsure where to enter the path?</h2><p>Book a free discovery call. We will tell you which step fits—or whether it is too early to spend anything.</p><div className="pilot-actions"><Link href="/book" className="btn btn-primary">Book a free discovery call</Link><Link href="/audit" className="btn btn-ghost-light">See the $250 Audit</Link></div></div></section>
      <NewsletterSection />
    </main>
  );
}

const BREAKS = [
  { icon: RefreshCw, title: "An app updates", body: "A field or setting changes, and a step that worked for months quietly stops." },
  { icon: Unplug, title: "A connection expires", body: "A login or access key runs out, so data stops moving without an obvious warning." },
  { icon: TriangleAlert, title: "Your process changes", body: "A new service or price arrives, while the workflow still follows last quarter's rules." },
];

const GROWTH_INCLUDED = [
  { icon: ShieldCheck, title: "Everything in Automation Care", body: "Monitoring, repairs, connection checks, reporting, and documentation stay covered." },
  { icon: PlusCircle, title: "One standard workflow monthly", body: "A reminder sequence, scheduled report, or focused connection is built, tested, and launched." },
  { icon: LifeBuoy, title: "Priority support", body: "Production issues are acknowledged within four business hours during the support window." },
  { icon: CircleGauge, title: "Quarterly ROI review", body: "We compare the backlog, run data, and capacity so the next workflow earns its place." },
];

const MONTH = [
  ["01", "Observe", "Review runs, failures, volume, and exceptions."],
  ["02", "Repair", "Fix anything that drifted or broke."],
  ["03", "Choose", "Rank the next standard workflow by value and effort."],
  ["04", "Ship", "Build, test, launch, document, and report."],
];

export function GrowthPartnerPilot({ crumbs, faq }: { crumbs: Crumb[]; faq: FaqItem[] }) {
  return (
    <main className="pilot-page growth-page">
      <section className="growth-hero"><div className="container growth-hero-grid"><div><CommercialCrumbs crumbs={crumbs} /><span className="pilot-label pilot-label-light">AI GROWTH PARTNER · FROM $1,250/MONTH</span><h1>Your automation needs an <span>operator.</span></h1><p>Protect the workflows you already use and ship one standard new workflow every month—without hiring an internal automation team.</p><div className="pilot-actions"><Link href="/contact" className="btn btn-primary">Apply for Growth Partnership</Link><Link href="/automation-care" className="btn btn-ghost-light">Need maintenance only?</Link></div></div><div className="growth-monitor"><div className="growth-monitor-example">EXAMPLE MONITORING VIEW</div><div className="growth-monitor-head"><span>WORKFLOW HEALTH</span><b><i /> SYSTEMS OPERATIONAL</b></div><div className="growth-chart"><span>Recent workflow runs</span><strong>Healthy</strong><svg viewBox="0 0 440 120" role="img" aria-label="An illustrative stable workflow activity chart"><path d="M4 96 C40 92 54 74 82 78 S132 94 160 64 S212 72 242 50 S296 62 324 35 S378 48 436 16" fill="none" stroke="currentColor" strokeWidth="3" /><path d="M4 96 C40 92 54 74 82 78 S132 94 160 64 S212 72 242 50 S296 62 324 35 S378 48 436 16 L436 120 L4 120Z" fill="url(#growth-fill)" /><defs><linearGradient id="growth-fill" x1="0" y1="0" x2="0" y2="1"><stop stopColor="#67e3b1" stopOpacity=".3"/><stop offset="1" stopColor="#67e3b1" stopOpacity="0"/></linearGradient></defs></svg></div><div className="growth-stats"><div><small>Monitoring</small><b>Active</b></div><div><small>Exceptions</small><b>Flagged</b></div><div><small>Documentation</small><b>Current</b></div></div><div className="growth-run"><i /><span><b>Invoice routing</b><small>Latest run completed</small></span><em>Healthy</em></div></div></div></section>
      <section className="growth-breaks"><div className="container"><header><span className="pilot-label">THE QUIET FAILURE PROBLEM</span><h2>Automations rarely announce that they are aging.</h2></header><div>{BREAKS.map((item) => <article key={item.title}><item.icon aria-hidden="true" /><h3>{item.title}</h3><p>{item.body}</p></article>)}</div></div></section>
      <section className="growth-included"><div className="container"><div className="pilot-section-head"><span className="pilot-label pilot-label-light">THE MONTHLY OPERATING LAYER</span><h2>Maintenance protects today. One new workflow improves tomorrow.</h2></div><div className="growth-included-grid">{GROWTH_INCLUDED.map((item, index) => <article key={item.title}><span>{String(index + 1).padStart(2, "0")}</span><item.icon aria-hidden="true" /><h3>{item.title}</h3><p>{item.body}</p></article>)}</div></div></section>
      <section className="growth-month"><div className="container growth-month-grid"><header><span className="pilot-label">ONE OPERATING LOOP</span><h2>Every month closes with something healthier or newly live.</h2><p>You receive a concise report showing what ran, what changed, and what shipped. No opaque retainer activity.</p></header><ol>{MONTH.map(([number, title, body]) => <li key={number}><span>{number}</span><div><h3>{title}</h3><p>{body}</p></div></li>)}</ol></div></section>
      <section className="growth-boundary"><div className="container"><div><span className="pilot-label">CLEAR SCOPE</span><h2>What counts as the monthly workflow?</h2><p>A focused automation that can be designed, tested, launched, and documented inside the monthly cycle.</p></div><ul><li><Check size={16} />Reminder or follow-up sequence</li><li><Check size={16} />Scheduled report or alert</li><li><Check size={16} />Connection between two or three existing tools</li><li className="not"><TriangleAlert size={16} />Major migrations, custom apps, and large rebuilds are quoted separately</li></ul></div></section>
      <section className="growth-fit"><div className="container"><article><small>STRONG FIT</small><h2>You already rely on automation.</h2><ul><li>Critical workflows run every day</li><li>A backlog of useful improvements exists</li><li>No technical owner is available in-house</li></ul></article><article><small>CHOOSE ANOTHER PATH</small><h2>You only need maintenance.</h2><p>Choose Automation Care if the priority is keeping existing workflows healthy without commissioning something new every month.</p><div><Link href="/automation-care">See Automation Care <ArrowRight size={15} /></Link><Link href="/core-build">See the Core Build <ArrowRight size={15} /></Link></div></article></div></section>
      <PilotFaq title="Questions about the Growth Partner plan" items={faq} />
      <section className="pilot-final pilot-final-growth"><div className="container"><span className="pilot-label pilot-label-light">KEEP THE SYSTEM EARNING</span><h2>Healthy automations. One useful addition every month.</h2><p>Tell us what you run today and what needs to happen next. We will reply within one business day with how the plan would work for you.</p><Link href="/contact" className="btn btn-primary">Apply for Growth Partnership</Link></div></section>
      <NewsletterSection />
    </main>
  );
}

const CARE_INCLUDED = [
  { icon: Activity, title: "Workflow monitoring", body: "We watch the agreed workflows for failures, unusual exceptions, and broken connections." },
  { icon: Wrench, title: "Maintenance and repairs", body: "When an existing step breaks, we investigate and repair the agreed workflow scope." },
  { icon: Sparkles, title: "One small optimization", body: "Each month includes one focused improvement such as a rule, field, notification, or report change." },
  { icon: FileCheck2, title: "Monthly health report", body: "See what ran, what failed, what changed, and what should be considered next." },
];

export function AutomationCarePilot({ crumbs, faq }: { crumbs: Crumb[]; faq: FaqItem[] }) {
  return (
    <main className="pilot-page care-page">
      <section className="care-hero"><div className="container care-hero-grid"><div><CommercialCrumbs crumbs={crumbs} /><span className="pilot-label pilot-label-light">AUTOMATION CARE · $500/MONTH</span><h1>Keep the workflows you depend on <span>healthy.</span></h1><p>Monitoring, maintenance, repairs, and one small optimization each month—without paying for ongoing new development you do not need.</p><div className="pilot-actions"><Link href="/contact" className="btn btn-primary">Ask about Automation Care</Link><Link href="/growth-partner" className="btn btn-ghost-light">Need monthly builds?</Link></div></div><div className="care-status"><span>CARE PLAN STATUS</span><strong><i /> Monitoring active</strong><div><ShieldCheck size={46} /><h2>Protected, documented, visible.</h2><p>A practical operating layer for workflows that are already live.</p></div><dl><div><dt>Support</dt><dd>1 business day</dd></div><div><dt>Reporting</dt><dd>Monthly</dd></div><div><dt>Optimization</dt><dd>1 small change</dd></div></dl></div></div></section>
      <section className="care-included"><div className="container"><div className="pilot-section-head"><span className="pilot-label">WHAT $500/MONTH COVERS</span><h2>Reliability without an open-ended retainer.</h2></div><div className="care-included-grid">{CARE_INCLUDED.map((item, index) => <article key={item.title}><span>{String(index + 1).padStart(2, "0")}</span><item.icon aria-hidden="true" /><h3>{item.title}</h3><p>{item.body}</p></article>)}</div></div></section>
      <section className="care-scope"><div className="container care-scope-grid"><div><span className="pilot-label pilot-label-light">THE BOUNDARY</span><h2>Care maintains. Growth builds.</h2><p>Automation Care is deliberately narrow so the promise stays reliable and the monthly price stays sensible.</p></div><div className="care-compare"><article><small>INCLUDED IN CARE</small><ul><li><Check size={15} />Agreed existing workflows</li><li><Check size={15} />Failure investigation and fixes</li><li><Check size={15} />Connection and credential checks</li><li><Check size={15} />One small optimization</li></ul></article><article><small>MOVE TO GROWTH FOR</small><ul><li><PlusCircle size={15} />One new standard workflow monthly</li><li><PlusCircle size={15} />Priority support</li><li><PlusCircle size={15} />Quarterly ROI and capacity review</li><li><PlusCircle size={15} />Automation backlog management</li></ul><Link href="/growth-partner">Compare AI Growth Partner <ArrowRight size={15} /></Link></article></div></div></section>
      <section className="care-fit"><div className="container"><div><span className="pilot-label">STRONG FIT</span><h2>You have working automations but no one responsible for their health.</h2></div><ul><li>Important workflows already run in production</li><li>Small failures can create operational backlog</li><li>You need maintenance, not a new build every month</li><li>Your team wants a clear support route and monthly visibility</li></ul></div></section>
      <PilotFaq title="Questions about Automation Care" items={faq} />
      <section className="pilot-final pilot-final-care"><div className="container"><span className="pilot-label pilot-label-light">PROTECT WHAT ALREADY WORKS</span><h2>A calmer operating layer for your automations.</h2><p>Tell us what is live today. We will confirm what can be covered and where a separate cleanup or build is needed.</p><div className="pilot-actions"><Link href="/contact" className="btn btn-primary">Ask about Automation Care</Link><Link href="/pricing" className="btn btn-ghost-light">Compare all plans</Link></div></div></section>
      <NewsletterSection />
    </main>
  );
}
