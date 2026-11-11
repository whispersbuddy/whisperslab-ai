// Service page template (/services/[slug]) in the homepage design system.
// Content comes from app/_content/services.ts (or Strapi via resolveService);
// styles are in app/styles/services.css on top of home.css and pricing.css.
import Link from "next/link";
import { ArrowRight, Check, LockKeyhole, ShieldCheck } from "lucide-react";
import type { ServicePage } from "@/app/_content/services";
import AuthorByline from "@/components/AuthorByline";
import PlatformLogo from "@/components/PlatformLogo";
import { resolvePathLinks, resolvePostLinks, SERVICE_COPY, SERVICE_VISUALS } from "@/components/pilots/ExpansionPilots";
import type { Crumb } from "@/lib/seo";

export default function ServiceTemplate({ page, crumbs, updated }: { page: ServicePage; crumbs: Crumb[]; updated?: string }) {
  const featured = page.proof.featured;
  const visual = SERVICE_VISUALS[page.slug] ?? SERVICE_VISUALS["data-entry-automation"];
  const copy =
    SERVICE_COPY[page.slug] ?? {
      jump: "Documents",
      modelTitle: "Four stages. One visible exception queue.",
      modelBody: "The automation does not hide uncertainty. It moves clean work forward and stops exactly where a person is needed.",
    };
  const relatedIndustries = resolvePathLinks(page.related.industries);
  const relatedPosts = resolvePostLinks(page.related.posts);

  return (
    <main className={`service-page hm service-${page.slug}`}>
      {/* HERO */}
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
              <Link href="#workflow" className="hm-btn hm-btn-ghost">
                <span>See the workflow</span>
                <ArrowRight size={16} aria-hidden="true" />
              </Link>
            </div>
            <AuthorByline updated={updated} />
          </div>

          <div className="hm-flow" aria-label={`Example ${page.slug.replace(/-/g, " ")} flow`}>
            <div className="hm-flow-head">
              <small>New work item</small>
              <strong>{visual.file}</strong>
              <span>{visual.meta}</span>
            </div>
            <ol>
              {visual.stages.map((stage, i) => (
                <li key={stage.title} className={stage.review ? "is-review" : undefined}>
                  <i>{String(i + 1).padStart(2, "0")}</i>
                  <span>
                    <b>{stage.title}</b>
                    <small>{stage.detail}</small>
                  </span>
                  <em>{stage.state}</em>
                </li>
              ))}
            </ol>
            <div className="hm-flow-foot">
              <span>
                <Check size={14} aria-hidden="true" /> {visual.footer}
              </span>
              <b>{visual.exception}</b>
            </div>
          </div>
        </div>
      </section>

      {/* OUTCOMES + BEFORE/AFTER */}
      <section className="hm-section hm-white" id="outcomes">
        <div className="container">
          <header className="hm-head">
            <p className="hm-eyebrow">What changes</p>
            <h2>{page.beforeAfter.title}</h2>
            {page.beforeAfter.intro ? <p>{page.beforeAfter.intro}</p> : null}
          </header>
          <div className="hm-stats">
            {page.values.map((v) => (
              <div key={v.big + v.what}>
                <strong>{v.big}</strong>
                <h3>{v.what}</h3>
                <p>{v.from}</p>
              </div>
            ))}
          </div>
          {page.beforeAfter.table.length > 0 ? (
            <div className="hm-table-wrap hm-ba">
              <table className="hm-table">
                <thead>
                  <tr>
                    <th scope="col"> </th>
                    <th scope="col">Before</th>
                    <th scope="col">After</th>
                  </tr>
                </thead>
                <tbody>
                  {page.beforeAfter.table.map((r) => (
                    <tr key={r.row}>
                      <th scope="row">{r.row}</th>
                      <td>{r.before}</td>
                      <td className="hm-ba-after">{r.after}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : null}
        </div>
      </section>

      {/* WORKFLOW */}
      <section className="hm-section hm-paper" id="workflow">
        <div className="container hm-wf">
          <header className="hm-head hm-wf-copy">
            <p className="hm-eyebrow">The operating model</p>
            <h2>{copy.modelTitle}</h2>
            <p>{copy.modelBody}</p>
          </header>
          <ol className="hm-wf-steps">
            {page.steps.items.map((step, i) => (
              <li key={step.title}>
                <span className="hm-wf-n">{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <h3>{step.title}</h3>
                  <p>{step.body}</p>
                  <small>{step.tools.join(" · ")}</small>
                </div>
              </li>
            ))}
            <li className="hm-wf-human">
              <span className="hm-wf-n">H</span>
              <div>
                <h3>Judgment stays with your team</h3>
                <p>{page.steps.human.join(" · ")}</p>
              </div>
            </li>
          </ol>
        </div>
      </section>

      {/* SCOPE */}
      <section className="hm-section hm-white" id="scope">
        <div className="container">
          <header className="hm-head">
            <p className="hm-eyebrow">{page.bento.eyebrow}</p>
            <h2>{page.bento.title}</h2>
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
        </div>
      </section>

      {/* PROOF */}
      <section className="hm-section hm-dark" id="proof">
        <div className="hm-dark-bg" aria-hidden="true" />
        <div className="container">
          <div className="hm-proof">
            <div className="hm-proof-num">
              <p className="hm-eyebrow hm-eyebrow-light">Published result</p>
              <strong>{featured.big}</strong>
              <span>{featured.bigLabel}</span>
            </div>
            <div className="hm-proof-body">
              <h2>{featured.title}</h2>
              <div className="hm-proof-ba">
                <div>
                  <b>Before</b>
                  <p>{featured.before}</p>
                </div>
                <div>
                  <b>After</b>
                  <p>{featured.after}</p>
                </div>
              </div>
              <Link href={`/case-studies/${featured.slug}`} className="hm-btn hm-btn-light">
                <span>Read the full case study</span>
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

      {/* OWNERSHIP + STACK */}
      <section className="hm-section hm-paper">
        <div className="container hm-split">
          <header className="hm-head">
            <p className="hm-eyebrow">What you own</p>
            <h2>Built in your accounts. Documented for your team.</h2>
            <p>{page.stack.intro}</p>
          </header>
          <div className="hm-own">
            <div>
              <LockKeyhole size={22} aria-hidden="true" />
              <span>
                <b>Your logins and data</b>
                <small>No dependency on our accounts</small>
              </span>
            </div>
            <div>
              <ShieldCheck size={22} aria-hidden="true" />
              <span>
                <b>Exception and error handling</b>
                <small>Failures are visible, not silent</small>
              </span>
            </div>
            <div className="hm-own-tools">
              {page.stack.tools.slice(0, 8).map((tool) => (
                <PlatformLogo key={tool} name={tool} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
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

      {/* RELATED */}
      {relatedIndustries.length > 0 || relatedPosts.length > 0 ? (
        <section className="hm-section hm-paper hm-related">
          <div className="container hm-related-grid">
            {relatedIndustries.length > 0 ? (
              <div>
                <p className="hm-eyebrow">Who else uses this</p>
                <ul className="hm-rows">
                  {relatedIndustries.map((l) => (
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
            {relatedPosts.length > 0 ? (
              <div>
                <p className="hm-eyebrow">{relatedPosts.length > 1 ? "Related guides" : "Related guide"}</p>
                <ul className="hm-rows">
                  {relatedPosts.map((l) => (
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

      {/* CLOSING CTA */}
      <section className="hm-final">
        <div className="hm-final-bg" aria-hidden="true" />
        <div className="container hm-final-inner">
          <p className="hm-eyebrow">A clear first step</p>
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
