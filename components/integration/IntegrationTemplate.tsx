// Integration page (/integrations/[slug]) in the homepage design system.
// Content: app/_content/integrations.ts. Styles: app/styles/industries.css.
import Link from "next/link";
import { ArrowRight, Check, ExternalLink, Minus } from "lucide-react";
import type { IntegrationPage } from "@/app/_content/integrations";
import AuthorByline from "@/components/AuthorByline";
import PlatformLogo from "@/components/PlatformLogo";
import { resolvePathLinks, resolvePostLinks } from "@/components/pilots/ExpansionPilots";
import { ZAPIER_PARTNER_URL } from "@/lib/social";
import type { Crumb } from "@/lib/seo";

type Blueprint = { sourceLabel: string; sources: [string, string][]; core: string; coreSub: string; outputLabel: string; outputs: [string, string][] };

const BLUEPRINTS: Record<string, Blueprint> = {
  airtable: { sourceLabel: "Your operating data", sources: [["Companies", "Name · Domain · Owner"], ["Contacts", "Email · Role · Company"], ["Deals", "Stage · Value · Contact"]], core: "One source of truth", coreSub: "Linked, permissioned, visible", outputLabel: "The work moves", outputs: [["Form", "Create record"], ["Stage changed", "Notify owner"], ["No reply", "Schedule follow-up"]] },
  n8n: { sourceLabel: "Events in", sources: [["Webhook", "Website · CRM · payment"], ["Schedule", "Hourly · nightly · monthly"], ["API", "Custom systems · databases"]], core: "Workflow orchestration", coreSub: "Branching, logged, controllable", outputLabel: "Actions out", outputs: [["Valid record", "Update systems"], ["Exception", "Route for review"], ["Failure", "Retry and alert"]] },
  zapier: { sourceLabel: "Triggers", sources: [["New form", "Lead or client intake"], ["New sale", "Payment or order event"], ["Row updated", "Spreadsheet or database"]], core: "Trigger to action", coreSub: "Fast, familiar, maintainable", outputLabel: "Automated actions", outputs: [["Lead arrives", "Create CRM record"], ["Sale closes", "Send receipt"], ["Booking made", "Schedule reminder"]] },
};

export default function IntegrationTemplate({ page, crumbs, fit, updated }: { page: IntegrationPage; crumbs: Crumb[]; fit: { good: string[]; caution: string[] }; updated?: string }) {
  const bp = BLUEPRINTS[page.slug] ?? BLUEPRINTS.airtable;
  const featured = page.proof.featured;
  const industries = resolvePathLinks(page.related.industries);
  const posts = resolvePostLinks(page.related.posts);

  return (
    <main className={`integration-page hm integration-${page.slug}`}>
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
            <div className="hm-xlogo">
              <PlatformLogo name={page.tool.name} showName={false} />
            </div>
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
              <a href={page.tool.url} target="_blank" rel="noopener" className="hm-btn hm-btn-ghost">
                <span>Visit {page.tool.name}</span>
                <ExternalLink size={15} aria-hidden="true" />
              </a>
            </div>
            <AuthorByline updated={updated} />
            {page.slug === "zapier" ? (
              <a href={ZAPIER_PARTNER_URL} target="_blank" rel="noopener" aria-label="Whispers Lab in the Zapier partner directory" className="hm-xbadge">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/assets/badges/zapier-silver-solution-partner-dark.svg" alt="Zapier Silver Solution Partner badge" width={300} height={115} />
              </a>
            ) : null}
          </div>

          <div className="hm-flow hm-bp" aria-label={`How ${page.tool.name} fits`}>
            <div className="hm-bp-block">
              <small>{bp.sourceLabel}</small>
              {bp.sources.map(([t, d]) => (
                <div key={t}>
                  <b>{t}</b>
                  <span>{d}</span>
                </div>
              ))}
            </div>
            <div className="hm-bp-core">
              <PlatformLogo name={page.tool.name} showName={false} />
              <b>{bp.core}</b>
              <span>{bp.coreSub}</span>
            </div>
            <div className="hm-bp-block">
              <small>{bp.outputLabel}</small>
              {bp.outputs.map(([s, a]) => (
                <div key={s}>
                  <b>{s}</b>
                  <span>{a}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="hm-section hm-white" id="fit">
        <div className="container">
          <header className="hm-head">
            <p className="hm-eyebrow">Platform decision</p>
            <h2>{page.tool.name} is excellent at one specific kind of job.</h2>
            <p>Choose it for the workflow it fits, not because it is the first tool someone recognizes.</p>
          </header>
          <div className="hm-fit">
            <article>
              <small>Use {page.tool.name} when</small>
              <ul>
                {fit.good.map((g) => (
                  <li key={g}>
                    <Check size={18} aria-hidden="true" />
                    <span>{g}</span>
                  </li>
                ))}
              </ul>
            </article>
            <article className="hm-fit-no">
              <small>Choose another approach when</small>
              <ul>
                {fit.caution.map((g) => (
                  <li key={g}>
                    <Minus size={18} aria-hidden="true" />
                    <span>{g}</span>
                  </li>
                ))}
              </ul>
            </article>
          </div>
        </div>
      </section>

      <section className="hm-section hm-paper" id="includes">
        <div className="container">
          <header className="hm-head">
            <p className="hm-eyebrow">What a build includes</p>
            <h2>Workflow first. Platform second.</h2>
            <p>{page.bento.intro}</p>
          </header>
          <div className="hm-grid hm-grid-3 hm-scope">
            {page.bento.tiles.map((tile, i) => (
              <article className="hm-card hm-chamfer" key={tile.title}>
                <div className="hm-scope-top">
                  <span className="hm-tag">{tile.verb}</span>
                  <span className="hm-scope-n">{String(i + 1).padStart(2, "0")}</span>
                </div>
                <h3>{tile.title}</h3>
                {tile.body ? <p>{tile.body}</p> : null}
              </article>
            ))}
          </div>
          <div className="hm-xtools">
            {page.stack.tools.slice(0, 10).map((t) => (
              <PlatformLogo key={t} name={t} />
            ))}
          </div>
        </div>
      </section>

      <section className="hm-section hm-dark" id="proof">
        <div className="hm-dark-bg" aria-hidden="true" />
        <div className="container">
          <div className="hm-proof">
            <div className="hm-proof-num">
              <p className="hm-eyebrow hm-eyebrow-light">A real connected build</p>
              <strong>{featured.big}</strong>
              <span>{featured.bigLabel}</span>
            </div>
            <div className="hm-proof-body">
              <h2>{featured.title}</h2>
              <p className="hm-xafter">{featured.after}</p>
              <Link href={`/case-studies/${featured.slug}`} className="hm-btn hm-btn-light">
                <span>Read the case study</span>
                <ArrowRight size={16} aria-hidden="true" />
              </Link>
            </div>
          </div>
          {page.proof.more.length > 0 ? (
            <ul className="hm-proof-more">
              {page.proof.more.map((m) => (
                <li key={m.slug}>
                  <Link href={`/case-studies/${m.slug}`}>
                    <strong>{m.big}</strong>
                    <span>
                      <b>{m.title}</b>
                      <small>{m.detail}</small>
                    </span>
                    <ArrowRight size={18} aria-hidden="true" />
                  </Link>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      </section>

      {industries.length > 0 || posts.length > 0 ? (
        <section className="hm-section hm-paper hm-related">
          <div className="container hm-related-grid">
            {industries.length > 0 ? (
              <div>
                <p className="hm-eyebrow">Who else uses this</p>
                <ul className="hm-rows">
                  {industries.map((l) => (
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
          <p className="hm-eyebrow">Tool fit starts with the workflow</p>
          <h2>{page.cta.title}</h2>
          <p>{page.cta.body}</p>
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
