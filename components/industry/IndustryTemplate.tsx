// Industry page (/industries/[slug]) in the homepage design system.
// Content: app/_content/industries.ts (or Strapi via resolveIndustry).
// Styles: app/styles/industries.css on top of home.css, pricing.css, services.css.
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ExternalLink, ShieldCheck } from "lucide-react";
import type { IndustryPage } from "@/app/_content/industries";
import AuthorByline from "@/components/AuthorByline";
import { resolvePathLinks, resolvePostLinks } from "@/components/pilots/ExpansionPilots";
import type { Crumb } from "@/lib/seo";

type Editorial = NonNullable<IndustryPage["editorial"]>;

const EDITORIAL: Record<string, Editorial> = {
  "law-firms": { image: "/assets/industries/law-firms-editorial.png", alt: "Attorney reviewing an intake packet at her desk", handles: "Intake, routing, document preparation, reminders", humans: "Advice, judgment, approval, client relationships", dayTitle: "The work moves before anyone starts chasing it.", cta: "Map your firm’s workflow", final: "Start with the admin around the law" },
  "real-estate": { image: "/assets/industries/real-estate-editorial.png", alt: "Real estate team reviewing a new lead", handles: "Lead capture, routing, reminders, listing updates", humans: "Advice, negotiation, showings, client trust", dayTitle: "Every lead and listing reaches the next step on time.", cta: "Map your real estate workflow", final: "Start with the handoffs around the deal" },
  "ecommerce-retail": { image: "/assets/industries/ecommerce-editorial.png", alt: "E-commerce team managing products and orders", handles: "Catalog updates, order routing, inventory alerts, reports", humans: "Brand choices, merchandising, customer recovery", dayTitle: "The catalog and orders move without another spreadsheet shift.", cta: "Map your commerce operations", final: "Start with the repetition behind each order" },
  "property-management": { image: "/assets/industries/property-management-editorial.png", alt: "Property manager coordinating maintenance with a technician", handles: "Request intake, vendor routing, reminders, owner updates", humans: "Tenant relationships, approvals, urgent judgment", dayTitle: "Requests reach the right person before the inbox piles up.", cta: "Map your property workflow", final: "Start with the handoffs around each property" },
  "accounting-bookkeeping": { image: "/assets/industries/accounting-editorial.png", alt: "Accounting team reviewing financial documents", handles: "Document collection, extraction, matching, reminders", humans: "Review, tax treatment, advice, final approval", dayTitle: "Clean records arrive before the review work begins.", cta: "Map your accounting workflow", final: "Start with the admin around the numbers" },
};

export default function IndustryTemplate({ page, crumbs, updated }: { page: IndustryPage; crumbs: Crumb[]; updated?: string }) {
  const ed = page.editorial ?? EDITORIAL[page.slug] ?? EDITORIAL["law-firms"];
  const services = resolvePathLinks(page.related.services);
  const posts = resolvePostLinks(page.related.posts);
  const proof = page.proof;

  return (
    <main className={`industry-page hm industry-${page.slug}`}>
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
            <p className="hm-eyebrow hm-eyebrow-light">{page.hero.eyebrow}</p>
            <h1>
              {page.hero.title} <span className="hm-grad-text">{page.hero.highlight}</span>
            </h1>
            <p className="hm-lead">{page.hero.answer}</p>
            <div className="hm-actions">
              <Link href="/book" className="hm-btn">
                <span>Book a free discovery call</span>
                <ArrowRight size={16} aria-hidden="true" />
              </Link>
              <Link href="#day" className="hm-btn hm-btn-ghost">
                <span>See a day after automation</span>
                <ArrowRight size={16} aria-hidden="true" />
              </Link>
            </div>
            <AuthorByline updated={updated} />
          </div>
          <div className="hm-ifig">
            <div className="hm-ifig-img">
              <Image src={ed.image} alt={ed.alt} fill sizes="(max-width: 1100px) 100vw, 40vw" priority />
            </div>
            <dl className="hm-ifig-split">
              <div>
                <dt>Automation handles</dt>
                <dd>{ed.handles}</dd>
              </div>
              <div>
                <dt>People keep</dt>
                <dd>{ed.humans}</dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      <section className="hm-section hm-white" id="day">
        <div className="container">
          <header className="hm-head">
            <p className="hm-eyebrow">{page.moments.eyebrow}</p>
            <h2>{ed.dayTitle}</h2>
            <p>{page.moments.intro}</p>
          </header>
          <ol className="hm-day">
            {page.moments.items.map((m) => (
              <li key={m.time}>
                <time>{m.time}</time>
                <div>
                  <small>Before</small>
                  <p>{m.before}</p>
                </div>
                <div className="hm-day-after">
                  <small>After</small>
                  <p>{m.after}</p>
                  {m.human ? <b>Human judgment stays here</b> : null}
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="hm-section hm-paper" id="intake">
        <div className="container hm-wf">
          <header className="hm-head hm-wf-copy">
            <p className="hm-eyebrow">From first contact to done</p>
            <h2>{page.intake.title}</h2>
            <div className="hm-ihuman">
              <ShieldCheck size={20} aria-hidden="true" />
              <p>
                <b>The stop points are designed, not improvised.</b> {page.intake.human.join(" · ")}
              </p>
            </div>
          </header>
          <ol className="hm-wf-steps">
            {page.intake.items.map((s, i) => (
              <li key={s.title}>
                <span className="hm-wf-n">{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <h3>{s.title}</h3>
                  <p>{s.body}</p>
                  <small>{s.tools.join(" · ")}</small>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="hm-section hm-dark">
        <div className="hm-dark-bg" aria-hidden="true" />
        <div className="container">
          <header className="hm-head">
            <p className="hm-eyebrow hm-eyebrow-light">Trust architecture</p>
            <h2>{page.trust.title}</h2>
            {page.trust.citation ? (
              <p>
                {page.trust.citation.text}{" "}
                <a href={page.trust.citation.url} target="_blank" rel="noopener" className="hm-ilink">
                  Source <ExternalLink size={13} aria-hidden="true" />
                </a>
              </p>
            ) : null}
          </header>
          <div className="hm-trust">
            {page.trust.layers.map((l, i) => (
              <div key={l.label}>
                <span>{String(i + 1).padStart(2, "0")}</span>
                <h3>{l.label}</h3>
                <p>{l.note}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {proof.mode === "closest" ? (
        <section className="hm-section hm-white" id="proof">
          <div className="container">
            <header className="hm-head">
              <p className="hm-eyebrow">Honest pattern match</p>
              <h2>{proof.title}</h2>
              <p>{proof.intro}</p>
            </header>
            <ul className="hm-closest">
              {proof.rows.map((r) => (
                <li key={r.slug}>
                  <Link href={`/case-studies/${r.slug}`}>
                    <span className="hm-closest-need">{r.need}</span>
                    <strong>{r.big}</strong>
                    <span className="hm-closest-body">
                      <b>{r.title}</b>
                      <small>{r.detail}</small>
                    </span>
                    <ArrowRight size={20} aria-hidden="true" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : (
        <section className="hm-section hm-white" id="proof">
          <div className="container">
            <header className="hm-head">
              <p className="hm-eyebrow">Published result</p>
              <h2>{proof.title}</h2>
            </header>
            <Link className="hm-direct" href={`/case-studies/${proof.featured.slug}`}>
              <div>
                <strong>{proof.featured.big}</strong>
                <small>{proof.featured.bigLabel}</small>
              </div>
              <div>
                <h3>{proof.featured.title}</h3>
                <p>{proof.featured.after}</p>
                <span>
                  Read the full case study <ArrowRight size={16} aria-hidden="true" />
                </span>
              </div>
            </Link>
            {proof.more.length > 0 ? (
              <ul className="hm-closest">
                {proof.more.map((m) => (
                  <li key={m.slug}>
                    <Link href={`/case-studies/${m.slug}`}>
                      <span className="hm-closest-need">More builds</span>
                      <strong>{m.big}</strong>
                      <span className="hm-closest-body">
                        <b>{m.title}</b>
                        <small>{m.detail}</small>
                      </span>
                      <ArrowRight size={20} aria-hidden="true" />
                    </Link>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
        </section>
      )}

      {services.length > 0 || posts.length > 0 ? (
        <section className="hm-section hm-paper hm-related">
          <div className="container hm-related-grid">
            {services.length > 0 ? (
              <div>
                <p className="hm-eyebrow">Related services</p>
                <ul className="hm-rows">
                  {services.map((l) => (
                    <li key={l.href}>
                      <Link href={l.href}>
                        <span>{l.title}</span>
                        <ArrowRight size={20} aria-hidden="true" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
            {posts.length > 0 ? (
              <div>
                <p className="hm-eyebrow">{posts.length > 1 ? "Related guides" : "Related guide"}</p>
                <ul className="hm-rows">
                  {posts.map((l) => (
                    <li key={l.href}>
                      <Link href={l.href}>
                        <span>{l.title}</span>
                        <ArrowRight size={20} aria-hidden="true" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>
        </section>
      ) : null}

      <section className="hm-section hm-white hm-faq-section" id="faq">
        <div className="container hm-split">
          <header className="hm-head">
            <p className="hm-eyebrow">Questions</p>
            <h2>{page.faq.title}</h2>
            <p>Anything else, the discovery call is free.</p>
            <Link href="/book" className="hm-btn hm-btn-outline">
              <span>Book a free discovery call</span>
              <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </header>
          <div className="hm-faq">
            {page.faq.items.map((f, i) => (
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
          <p className="hm-eyebrow">{ed.final}</p>
          <h2>{page.cta.title}</h2>
          <p>{page.cta.body}</p>
          <div className="hm-actions hm-actions-center">
            <Link href="/book" className="hm-btn">
              <span>{ed.cta}</span>
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
