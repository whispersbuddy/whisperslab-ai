// /industries hub in the homepage design system. Styles: app/styles/industries.css.
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { SiteRoute } from "@/lib/routes";
import type { Crumb } from "@/lib/seo";

type FaqItem = { q: string; a: string };

const IMAGES: Record<string, string> = {
  "/industries/law-firms": "/assets/industries/law-firms-editorial.png",
  "/industries/real-estate": "/assets/industries/real-estate-editorial.png",
  "/industries/ecommerce-retail": "/assets/industries/ecommerce-editorial.png",
  "/industries/property-management": "/assets/industries/property-management-editorial.png",
  "/industries/accounting-bookkeeping": "/assets/industries/accounting-editorial.png",
};

const PATTERN = [
  { t: "Automate", d: "Repeatable capture, routing, reminders, and updates." },
  { t: "Keep human", d: "Advice, approval, exceptions, and relationships." },
  { t: "Design controls", d: "Access, retention, errors, and ownership." },
];

export default function IndustriesHub({ routes, crumbs, faq }: { routes: SiteRoute[]; crumbs: Crumb[]; faq: FaqItem[] }) {
  return (
    <main className="industries-hub hm">
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
          <p className="hm-eyebrow hm-eyebrow-light">Industries · Operations in context</p>
          <h1>
            The busywork changes names. <span className="hm-grad-text">The pattern stays familiar.</span>
          </h1>
          <p className="hm-lead">
            Every industry has its own judgment, risk, and relationships. We automate the repeated handoffs around that
            human work.
          </p>
          <div className="hm-actions">
            <Link href="/book" className="hm-btn">
              <span>Book a free discovery call</span>
              <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      <section className="hm-section hm-white">
        <div className="container">
          <header className="hm-head">
            <p className="hm-eyebrow">Choose your operating context</p>
            <h2>See where automation stops and professional judgment begins.</h2>
          </header>
          <div className="hm-igrid">
            {routes.map((r) => (
              <Link href={r.path} key={r.path} className="hm-icard">
                <div className="hm-icard-img">
                  {IMAGES[r.path] ? <Image src={IMAGES[r.path]} alt="" fill sizes="(max-width: 720px) 100vw, 40vw" /> : null}
                </div>
                <div className="hm-icard-body">
                  <h3>{r.label}</h3>
                  <p>{r.blurb}</p>
                  <b>
                    Explore the workflow <ArrowRight size={16} aria-hidden="true" />
                  </b>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="hm-section hm-dark">
        <div className="hm-dark-bg" aria-hidden="true" />
        <div className="container">
          <header className="hm-head hm-head-center">
            <p className="hm-eyebrow hm-eyebrow-light">The shared pattern</p>
            <h2>Intake. Decisions. Handoffs. Follow-up.</h2>
          </header>
          <div className="hm-rules hm-rules-3">
            {PATTERN.map((p) => (
              <div key={p.t}>
                <h3>{p.t}</h3>
                <p>{p.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="hm-section hm-white hm-faq-section">
        <div className="container hm-split">
          <header className="hm-head">
            <p className="hm-eyebrow">Questions</p>
            <h2>Questions about industry fit.</h2>
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
          <p className="hm-eyebrow">Don’t see your industry?</p>
          <h2>Start with the workflow, not the label.</h2>
          <p>Show us the repeated work. We will tell you whether the pattern is ready to automate.</p>
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
