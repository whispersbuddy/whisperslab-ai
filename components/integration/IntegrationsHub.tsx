// /integrations hub in the homepage design system. Styles: app/styles/industries.css.
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import PlatformLogo from "@/components/PlatformLogo";
import type { SiteRoute } from "@/lib/routes";
import type { Crumb } from "@/lib/seo";

type FaqItem = { q: string; a: string };

const COMPARE = [
  { name: "Airtable", best: "Shared operational data and lightweight interfaces", watch: "Record limits and complex relational scale", href: "/integrations/airtable" },
  { name: "n8n", best: "Branching workflows, APIs, and deeper control", watch: "Technical ownership and maintenance", href: "/integrations/n8n" },
  { name: "Zapier", best: "Fast, familiar app-to-app automation", watch: "Task volume and complex branching cost", href: "/integrations/zapier" },
];

export default function IntegrationsHub({ routes, crumbs, faq }: { routes: SiteRoute[]; crumbs: Crumb[]; faq: FaqItem[] }) {
  return (
    <main className="integrations-hub hm">
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
            <p className="hm-eyebrow hm-eyebrow-light">Integrations · Architecture before software</p>
            <h1>
              Pick the tool after you understand <span className="hm-grad-text">the work.</span>
            </h1>
            <p className="hm-lead">
              Airtable, n8n, and Zapier solve different parts of an automation system. We map the workflow first, then
              choose the smallest platform that fits it.
            </p>
            <div className="hm-actions">
              <Link href="/book" className="hm-btn">
                <span>Book a free discovery call</span>
                <ArrowRight size={16} aria-hidden="true" />
              </Link>
            </div>
          </div>
          <div className="hm-flow hm-xmap">
            <div className="hm-flow-head">
              <small>The shape of every build</small>
              <strong>Your apps, a workflow, a reliable result.</strong>
            </div>
            <ol>
              <li>
                <i>01</i>
                <span>
                  <b>Your apps</b>
                  <small>Where the work starts</small>
                </span>
                <em>Source</em>
              </li>
              <li>
                <i>02</i>
                <span>
                  <b>The workflow</b>
                  <small>Built on the smallest tool that fits</small>
                </span>
                <em>Logic</em>
              </li>
              <li>
                <i>03</i>
                <span>
                  <b>Reliable result</b>
                  <small>Logged, alerted, owned by you</small>
                </span>
                <em>Output</em>
              </li>
            </ol>
          </div>
        </div>
      </section>

      <section className="hm-section hm-white">
        <div className="container">
          <header className="hm-head">
            <p className="hm-eyebrow">Platform selector</p>
            <h2>Three tools. Three different jobs.</h2>
          </header>
          <div className="hm-table-wrap hm-ba">
            <table className="hm-table">
              <thead>
                <tr>
                  <th scope="col">Platform</th>
                  <th scope="col">Best at</th>
                  <th scope="col">Watch for</th>
                  <th scope="col">Explore</th>
                </tr>
              </thead>
              <tbody>
                {COMPARE.map((c) => (
                  <tr key={c.name}>
                    <th scope="row">
                      <PlatformLogo name={c.name} />
                    </th>
                    <td className="hm-ba-after">{c.best}</td>
                    <td>{c.watch}</td>
                    <td>
                      <Link href={c.href} className="hm-xlink">
                        Architecture <ArrowRight size={14} aria-hidden="true" />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="hm-section hm-paper">
        <div className="container">
          <ol className="hm-index hm-index-flat">
            {routes.map((r, i) => (
              <li key={r.path}>
                <Link href={r.path}>
                  <span className="hm-index-n">{String(i + 1).padStart(2, "0")}</span>
                  <i className="hm-xi">
                    <PlatformLogo name={r.label} showName={false} />
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

      <section className="hm-section hm-white hm-faq-section">
        <div className="container hm-split">
          <header className="hm-head">
            <p className="hm-eyebrow">Questions</p>
            <h2>Questions about the tools we use.</h2>
            <p>Anything else, the discovery call is free.</p>
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
          <p className="hm-eyebrow">Tool-neutral by design</p>
          <h2>Recommend the platform after the process.</h2>
          <p>We map the workflow, cost, ownership, and failure handling before a subscription is added.</p>
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
