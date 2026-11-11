// The single pricing page. Every price on the site lives here; other pages
// link to it. Built from the homepage design system (app/styles/home.css) plus
// app/styles/pricing.css.
import Link from "next/link";
import { ArrowRight, Check, X } from "lucide-react";
import { OFFERS, type Offer } from "@/lib/offers";
import type { FaqItem } from "@/components/sections/Faq";

type Crumb = { name: string; path: string };

const ANCHOR: Record<Offer["key"], string> = {
  audit: "audit",
  "core-build": "core-build",
  "automation-care": "care",
  "growth-partner": "growth",
};

const DETAIL: Record<Offer["key"], { stage: string; note: string; notIncluded: string[]; cta: string }> = {
  audit: {
    stage: "Step 1 · Plan",
    note: "A flat $250. If you build with us afterwards, the full $250 is credited toward the Core Build.",
    notIncluded: ["Building the automations (that is the Core Build)", "Software subscriptions"],
    cta: "Talk about an Audit",
  },
  "core-build": {
    stage: "Step 2 · Build",
    note: "One standard workflow starts from $2,500. More workflows, connected systems or custom code get a fixed quote before work begins, so the price does not drift.",
    notIncluded: ["Software subscriptions billed by your tools", "Work outside the agreed scope (quoted first)"],
    cta: "Talk about a build",
  },
  "automation-care": {
    stage: "Step 3 · Operate",
    note: "We confirm which workflows are covered before the plan starts, so there is no open-ended scope and no hourly billing.",
    notIncluded: ["A new workflow each month (see Growth Partner)", "Work outside the agreed workflows"],
    cta: "Talk about Care",
  },
  "growth-partner": {
    stage: "Step 3 · Operate and grow",
    note: "Most Growth Partner clients start with a Core Build so everything is documented and ready to be monitored. Larger migrations and custom apps are scoped separately.",
    notIncluded: ["Major migrations or custom applications (scoped separately)", "Software subscriptions"],
    cta: "Talk about Growth Partner",
  },
};

const CHOOSE = [
  { cue: "I am not sure what to automate first", pick: "Automation Audit", price: "$250", anchor: "audit" },
  { cue: "I know the process I want gone", pick: "Core Build", price: "From $2,500", anchor: "core-build" },
  { cue: "I already run automations and need them kept healthy", pick: "Automation Care", price: "$500/mo", anchor: "care" },
  { cue: "I want them kept healthy and a new one built every month", pick: "AI Growth Partner", price: "From $1,250/mo", anchor: "growth" },
];

const RULES = [
  { t: "Fixed scope, fixed quote", d: "Every project is agreed in writing before work starts. The Audit is a flat fee, builds get a fixed quote, and monthly plans have a fixed monthly price." },
  { t: "No hourly billing", d: "You never get a bill that grew because it took longer. Work outside the agreed scope is identified and quoted before we do it." },
  { t: "Software is separate", d: "Your CRM, accounting tool or automation platform is billed by those companies. We build on what you already pay for where we can, and tell you about any new cost before the build starts." },
  { t: "You own everything", d: "Workflows live in your own accounts, with documentation and walkthroughs, so you are never locked in to Whispers Lab." },
];

export default function PricingPage({ crumbs, faq }: { crumbs: Crumb[]; faq: FaqItem[] }) {
  return (
    <main className="pricing-page hm">
      {/* HERO */}
      <section className="hm-section hm-dark hm-phero">
        <div className="hm-dark-bg" aria-hidden="true" />
        <div className="container">
          <nav className="hm-crumbs" aria-label="Breadcrumb">
            {crumbs.map((c, i) => (
              <span key={c.path}>
                {i < crumbs.length - 1 ? <Link href={c.path}>{c.name}</Link> : <span aria-current="page">{c.name}</span>}
                {i < crumbs.length - 1 ? <i aria-hidden="true">/</i> : null}
              </span>
            ))}
          </nav>
          <p className="hm-eyebrow hm-eyebrow-light">Pricing</p>
          <h1>
            Clear prices. Fixed scope. <span className="hm-grad-text">You own everything.</span>
          </h1>
          <p className="hm-lead">
            Every project starts with a free discovery call. We tell you which package fits, or whether it is too early
            to spend anything.
          </p>
          <div className="hm-actions">
            <Link href="/book" className="hm-btn">
              <span>Book a free discovery call</span>
              <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>
          <ul className="hm-jump" aria-label="Jump to a package">
            {OFFERS.map((o) => (
              <li key={o.key}>
                <a href={`#${ANCHOR[o.key]}`}>
                  <b>{o.name}</b>
                  <span>{o.price}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* STEP ZERO: FREE CALL */}
      <section className="hm-section hm-white hm-free">
        <div className="container">
          <div className="hm-free-card">
            <div>
              <p className="hm-eyebrow">Start here · Free</p>
              <h2>Free discovery call</h2>
              <p>
                Tell us where the busywork is. We review your workflows and tools, give you a straight answer on what is
                worth automating, and point you to the right package. No pressure to buy.
              </p>
            </div>
            <Link href="/book" className="hm-btn hm-btn-dark">
              <span>Book a free discovery call</span>
              <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      {/* COMPARISON */}
      <section className="hm-section hm-paper" id="compare">
        <div className="container">
          <header className="hm-head">
            <p className="hm-eyebrow">Compare</p>
            <h2>What does AI automation cost for a small business?</h2>
            <p>Four packages, in the order most clients use them. Prices are in US dollars.</p>
          </header>
          <div className="hm-table-wrap">
            <table className="hm-table">
              <thead>
                <tr>
                  <th scope="col">Package</th>
                  <th scope="col">Price</th>
                  <th scope="col">Time to result</th>
                  <th scope="col">Best for</th>
                </tr>
              </thead>
              <tbody>
                {OFFERS.map((o) => (
                  <tr key={o.key}>
                    <th scope="row">
                      <a href={`#${ANCHOR[o.key]}`}>{o.name}</a>
                    </th>
                    <td className="hm-table-price">{o.price}</td>
                    <td>{o.timeline}</td>
                    <td>{o.bestFor}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <ul className="hm-choose">
            {CHOOSE.map((c) => (
              <li key={c.anchor}>
                <a href={`#${c.anchor}`}>
                  <small>{c.cue}</small>
                  <b>{c.pick}</b>
                  <span>
                    {c.price} <ArrowRight size={15} aria-hidden="true" />
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* PACKAGES */}
      {OFFERS.map((o, i) => {
        const d = DETAIL[o.key];
        return (
          <section className={`hm-section hm-pkg ${i % 2 === 0 ? "hm-white" : "hm-paper"}`} id={ANCHOR[o.key]} key={o.key}>
            <div className="container hm-pkg-grid">
              <div className="hm-pkg-main">
                <p className="hm-eyebrow">{d.stage}</p>
                <h2>{o.name}</h2>
                <p className="hm-pkg-price">
                  <b>{o.price}</b>
                  <span>{o.timeline}</span>
                </p>
                <p className="hm-pkg-pitch">{o.pitch}</p>
                <p className="hm-pkg-fit">
                  <b>Best for:</b> {o.bestFor}
                </p>
                <p className="hm-pkg-note">{d.note}</p>
                <div className="hm-actions">
                  <Link href="/book" className="hm-btn">
                    <span>{d.cta}</span>
                    <ArrowRight size={16} aria-hidden="true" />
                  </Link>
                </div>
              </div>
              <div className="hm-pkg-side">
                <div className="hm-pkg-box hm-chamfer">
                  <p className="hm-pkg-label">What is included</p>
                  <ul>
                    {o.includes.map((item) => (
                      <li key={item}>
                        <Check size={16} aria-hidden="true" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="hm-pkg-box hm-pkg-out hm-chamfer">
                  <p className="hm-pkg-label">Not included</p>
                  <ul>
                    {d.notIncluded.map((item) => (
                      <li key={item}>
                        <X size={16} aria-hidden="true" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </section>
        );
      })}

      {/* HOW PRICING WORKS */}
      <section className="hm-section hm-dark">
        <div className="hm-dark-bg" aria-hidden="true" />
        <div className="container">
          <header className="hm-head hm-head-center">
            <p className="hm-eyebrow hm-eyebrow-light">How pricing works</p>
            <h2>No surprises on the invoice.</h2>
            <p>The rules we price by, whichever package you choose.</p>
          </header>
          <div className="hm-rules">
            {RULES.map((r) => (
              <div key={r.t}>
                <h3>{r.t}</h3>
                <p>{r.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="hm-section hm-white hm-faq-section">
        <div className="container hm-split">
          <header className="hm-head">
            <p className="hm-eyebrow">Pricing questions</p>
            <h2>Pricing questions, answered.</h2>
            <p>Anything else, the discovery call is free.</p>
            <Link href="/book" className="hm-btn hm-btn-outline">
              <span>Book a free discovery call</span>
              <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </header>
          <div className="hm-faq">
            {faq.map((f, i) => (
              <details key={f.q} open={i === 0}>
                <summary>
                  {f.q}
                  <span className="hm-faq-icon" aria-hidden="true" />
                </summary>
                <p>{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CLOSING CTA */}
      <section className="hm-final">
        <div className="hm-final-bg" aria-hidden="true" />
        <div className="container hm-final-inner">
          <p className="hm-eyebrow">No forced upsell</p>
          <h2>Unsure where to start?</h2>
          <p>Book a free discovery call. We will tell you which step fits, or whether it is too early to spend anything.</p>
          <div className="hm-actions hm-actions-center">
            <Link href="/book" className="hm-btn">
              <span>Book a free discovery call</span>
              <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
