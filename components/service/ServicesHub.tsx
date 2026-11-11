// /services hub in the homepage design system. Styles: app/styles/services.css.
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import SiteIcon from "@/components/SiteIcon";
import type { SiteRoute } from "@/lib/routes";
import type { Crumb } from "@/lib/seo";

type FaqItem = { q: string; a: string };

const DIAGNOSTIC = [
  { label: "We keep retyping information", href: "/services/data-entry-automation" },
  { label: "People wait for the next step", href: "/services/client-onboarding-automation" },
  { label: "Our systems disagree", href: "/services/software-integration-services" },
];

const PATTERNS = ["Document processing", "Lead capture and routing", "Client scheduling", "Invoices and reminders", "CRM and data sync", "Reports and alerts"];

const METHOD = [
  { t: "Mapped before it is built", d: "Triggers, decisions, exceptions, and owners are documented first." },
  { t: "Tested away from live work", d: "Your real process keeps running while the new one is proven safely." },
  { t: "Handed over visibly", d: "You receive alerts, documentation, walkthroughs, and control." },
];

export default function ServicesHub({ routes, crumbs, faq }: { routes: SiteRoute[]; crumbs: Crumb[]; faq: FaqItem[] }) {
  return (
    <main className="service-page hub-page hm">
      <section className="hm-section hm-dark hm-phero hm-shero">
        <div className="hm-dark-bg" aria-hidden="true" />
        <div className="container hm-shero-grid">
          <div>
            <nav className="hm-crumbs" aria-label="Breadcrumb">
              {crumbs.map((c, i) => (
                <span key={c.path}>
                  {i < crumbs.length - 1 ? <Link href={c.path}>{c.name}</Link> : <span aria-current="page">{c.name}</span>}
                  {i < crumbs.length - 1 ? <i aria-hidden="true">/</i> : null}
                </span>
              ))}
            </nav>
            <p className="hm-eyebrow hm-eyebrow-light">Services · Choose by bottleneck</p>
            <h1>
              Start with the work that keeps <span className="hm-grad-text">coming back.</span>
            </h1>
            <p className="hm-lead">
              You do not need to choose a tool. Choose the repeated task, handoff, or broken connection that costs your
              team the most attention.
            </p>
            <div className="hm-actions">
              <Link href="/book" className="hm-btn">
                <span>Book a free discovery call</span>
                <ArrowRight size={16} aria-hidden="true" />
              </Link>
            </div>
          </div>
          <div className="hm-flow">
            <div className="hm-flow-head">
              <small>What is eating the week?</small>
              <strong>Pick the sentence that sounds like you.</strong>
            </div>
            <ol className="hm-diag">
              {DIAGNOSTIC.map((d, i) => (
                <li key={d.href}>
                  <Link href={d.href}>
                    <i>{String(i + 1).padStart(2, "0")}</i>
                    <b>{d.label}</b>
                    <ArrowRight size={18} aria-hidden="true" />
                  </Link>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="hm-section hm-white">
        <div className="container">
          <header className="hm-head">
            <p className="hm-eyebrow">The service index</p>
            <h2>Pick the service that matches the bottleneck.</h2>
            <p>
              These pages group related problems so the site stays easy to navigate. A build scopes one agreed workflow
              from whichever category fits.
            </p>
          </header>
          <ol className="hm-index">
            {routes.map((r, i) => (
              <li key={r.path}>
                <Link href={r.path}>
                  <span className="hm-index-n">{String(i + 1).padStart(2, "0")}</span>
                  <i>
                    <SiteIcon name={r.icon} size={24} />
                  </i>
                  <span className="hm-index-text">
                    <b>{r.label}</b>
                    <small>{r.blurb}</small>
                  </span>
                  <ArrowRight size={20} aria-hidden="true" />
                </Link>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="hm-section hm-paper">
        <div className="container hm-split">
          <header className="hm-head">
            <p className="hm-eyebrow">Workflows inside those services</p>
            <h2>Not every workflow needs its own service page.</h2>
            <p>
              Scheduling, document processing, CRM updates, reporting, alerts, invoicing, and reminders are delivery
              patterns inside the categories, not extra packages to choose between.
            </p>
          </header>
          <ul className="hm-rows">
            {PATTERNS.map((p) => (
              <li key={p}>
                <span className="hm-pattern">{p}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="hm-section hm-dark">
        <div className="hm-dark-bg" aria-hidden="true" />
        <div className="container">
          <header className="hm-head hm-head-center">
            <p className="hm-eyebrow hm-eyebrow-light">One delivery standard</p>
            <h2>Different workflow. Same ownership.</h2>
          </header>
          <div className="hm-rules hm-rules-3">
            {METHOD.map((m) => (
              <div key={m.t}>
                <h3>{m.t}</h3>
                <p>{m.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="hm-section hm-white hm-faq-section">
        <div className="container hm-split">
          <header className="hm-head">
            <p className="hm-eyebrow">Questions</p>
            <h2>Questions about our services.</h2>
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

      <section className="hm-final">
        <div className="hm-final-bg" aria-hidden="true" />
        <div className="container hm-final-inner">
          <p className="hm-eyebrow">Not sure which problem is first?</p>
          <h2>Let us help you rank the work.</h2>
          <p>Book a free discovery call. We will tell you which workflow to automate first, or whether it is too early to spend anything.</p>
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
    </main>
  );
}
