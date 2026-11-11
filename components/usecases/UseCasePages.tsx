// /use-cases hub and /use-cases/[slug] department pages in the homepage design
// system. Content: app/_content/useCases.ts. Styles: app/styles/use-cases.css.
import Link from "next/link";
import { ArrowRight, Check, CornerDownRight, UserRound, Zap } from "lucide-react";
import { getBlogPostBySlug } from "@/app/_content/blogData";
import { DEPARTMENTS, type Department } from "@/app/_content/useCases";
import { CMS_ONLY_POST_TITLES } from "@/lib/blogLinks";
import { getRoute } from "@/lib/routes";
import type { Crumb } from "@/lib/seo";
import SiteIcon from "@/components/SiteIcon";

type FaqItem = { q: string; a: string };

const pad = (n: number) => String(n).padStart(2, "0");

function Crumbs({ crumbs }: { crumbs: Crumb[] }) {
  return (
    <nav className="hm-crumbs" aria-label="Breadcrumb">
      {crumbs.map((c, i) => (
        <span key={c.path}>
          {i < crumbs.length - 1 ? <Link href={c.path}>{c.name}</Link> : <span aria-current="page">{c.name}</span>}
          {i < crumbs.length - 1 ? <i aria-hidden="true">/</i> : null}
        </span>
      ))}
    </nav>
  );
}

function pathLinks(paths: string[]) {
  return paths.flatMap((path) => {
    const label = getRoute(path)?.label;
    return label ? [{ href: path, title: label }] : [];
  });
}

function postLinks(slugs: string[]) {
  return slugs.flatMap((slug) => {
    const title = getBlogPostBySlug(slug)?.title ?? CMS_ONLY_POST_TITLES[slug];
    return title ? [{ href: `/blog/${slug}`, title }] : [];
  });
}

function Faq({ title, items }: { title: string; items: FaqItem[] }) {
  return (
    <section className="hm-section hm-white hm-faq-section" id="faq">
      <div className="container hm-split">
        <header className="hm-head">
          <p className="hm-eyebrow">Questions</p>
          <h2>{title}</h2>
          <p>Anything else, the discovery call is free.</p>
          <Link href="/book" className="hm-btn hm-btn-outline">
            <span>Book a free discovery call</span>
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </header>
        <div className="hm-faq">
          {items.map((f, i) => (
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
  );
}

function Final({ eyebrow, title, body }: { eyebrow: string; title: string; body: string }) {
  return (
    <section className="hm-final">
      <div className="hm-final-bg" aria-hidden="true" />
      <div className="container hm-final-inner">
        <p className="hm-eyebrow">{eyebrow}</p>
        <h2>{title}</h2>
        <p>{body}</p>
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
  );
}

const HUB_PROOF = [
  { slug: "ai-catalog-content-engine", big: "~22 hrs", label: "saved every week", title: "The AI Catalog & Content Engine", tag: "E-commerce" },
  { slug: "financial-document-reader", big: "~15 hrs", label: "saved every week", title: "The Financial Document Reader", tag: "Finance" },
  { slug: "lead-sales-engine", big: "~15 hrs", label: "saved every week", title: "The Lead Sales Engine That Runs Itself", tag: "Sales" },
  { slug: "crm-that-fills-itself-in", big: "~6 hrs", label: "saved every week", title: "The CRM That Fills Itself In", tag: "CRM" },
];

const PICK = [
  { t: "Count", d: "List the tasks your team repeats and put real hours beside each one." },
  { t: "Rank", d: "Order them by hours saved against the effort to build." },
  { t: "Build one", d: "Automate the top task first, prove it works, then add the next." },
];

export function UseCasesHub({ crumbs, faq }: { crumbs: Crumb[]; faq: FaqItem[] }) {
  const totalIdeas = DEPARTMENTS.reduce((sum, d) => sum + d.ideas.length, 0);
  return (
    <main className="uc-page uc-hub hm">
      <section className="hm-section hm-dark hm-phero hm-shero">
        <div className="hm-dark-bg" aria-hidden="true" />
        <div className="container hm-shero-grid">
          <div>
            <Crumbs crumbs={crumbs} />
            <p className="hm-eyebrow hm-eyebrow-light">
              Use cases · {totalIdeas} examples · {DEPARTMENTS.length} departments
            </p>
            <h1>
              Small business automation examples <span className="hm-grad-text">for every department.</span>
            </h1>
            <p className="hm-lead">
              Pick the department that loses the most hours. Each page lists reusable automations, what runs on its own,
              what stays with a person, and a real build where we have one.
            </p>
            <div className="hm-actions">
              <Link href="/book" className="hm-btn">
                <span>Book a free discovery call</span>
                <ArrowRight size={16} aria-hidden="true" />
              </Link>
              <Link href="#departments" className="hm-btn hm-btn-ghost">
                <span>Browse departments</span>
                <ArrowRight size={16} aria-hidden="true" />
              </Link>
            </div>
          </div>
          <div className="hm-flow">
            <div className="hm-flow-head">
              <small>Where does the week go?</small>
              <strong>Jump to the department.</strong>
            </div>
            <ol className="hm-diag">
              {DEPARTMENTS.map((d, i) => (
                <li key={d.slug}>
                  <Link href={`/use-cases/${d.slug}`}>
                    <i>{pad(i + 1)}</i>
                    <b>{d.name}</b>
                    <ArrowRight size={18} aria-hidden="true" />
                  </Link>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="hm-section hm-white" id="departments">
        <div className="container">
          <header className="hm-head">
            <p className="hm-eyebrow">By department</p>
            <h2>Find the automation that fits the work.</h2>
            <p>
              Each example is a pattern we have built or can build on the tools you already pay for. Open a department to
              see how it runs, step by step.
            </p>
          </header>
          <ol className="hm-index">
            {DEPARTMENTS.map((d, i) => (
              <li key={d.slug}>
                <Link href={`/use-cases/${d.slug}`}>
                  <span className="hm-index-n">{pad(i + 1)}</span>
                  <i>
                    <SiteIcon name={d.icon} size={24} />
                  </i>
                  <span className="hm-index-text">
                    <b>{d.name}</b>
                    <small>
                      {d.blurb} · {d.ideas.length} examples
                    </small>
                  </span>
                  <ArrowRight size={20} aria-hidden="true" />
                </Link>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="hm-section hm-dark">
        <div className="hm-dark-bg" aria-hidden="true" />
        <div className="container">
          <header className="hm-head hm-head-center">
            <p className="hm-eyebrow hm-eyebrow-light">How to pick the first one</p>
            <h2>Count the hours before you choose.</h2>
            <p>
              The best first automation is not the most exciting one. It is the task that repeats most, follows the same
              steps, and costs the most hours a week.
            </p>
          </header>
          <div className="hm-rules hm-rules-3">
            {PICK.map((p, i) => (
              <div key={p.t}>
                <h3>
                  {pad(i + 1)} · {p.t}
                </h3>
                <p>{p.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="hm-section hm-white">
        <div className="container">
          <header className="hm-head">
            <p className="hm-eyebrow">Built, not imagined</p>
            <h2>Real systems behind the examples.</h2>
          </header>
          <ul className="hm-closest">
            {HUB_PROOF.map((p) => (
              <li key={p.slug}>
                <Link href={`/case-studies/${p.slug}`}>
                  <span className="hm-closest-need">{p.tag}</span>
                  <strong>{p.big}</strong>
                  <span className="hm-closest-body">
                    <b>{p.title}</b>
                    <small>{p.label}</small>
                  </span>
                  <ArrowRight size={20} aria-hidden="true" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <Faq title="Questions about automation examples." items={faq} />
      <Final
        eyebrow="Not sure which example comes first?"
        title="Let us help you rank your work."
        body="Book a free discovery call. We will name the first build worth doing, and tell you honestly if nothing is yet."
      />
    </main>
  );
}

const FLOW_LABELS = ["Trigger", "Runs on its own", "Then a person"] as const;

export function DepartmentPage({ dept, crumbs }: { dept: Department; crumbs: Crumb[] }) {
  const others = DEPARTMENTS.filter((d) => d.slug !== dept.slug);
  const services = pathLinks(dept.related.services);
  const industries = pathLinks(dept.related.industries);
  const posts = postLinks(dept.related.posts);
  const groups = [
    { label: "Build it with", links: services },
    { label: "Who else uses this", links: industries },
    { label: posts.length > 1 ? "Related guides" : "Related guide", links: posts },
  ].filter((g) => g.links.length > 0);

  return (
    <main className="uc-page uc-dept hm" data-dept={dept.slug}>
      <section className="hm-section hm-dark hm-phero hm-shero">
        <div className="hm-dark-bg" aria-hidden="true" />
        <div className="container hm-shero-grid">
          <div>
            <Crumbs crumbs={crumbs} />
            <p className="hm-eyebrow hm-eyebrow-light">{dept.hero.eyebrow}</p>
            <h1>
              {dept.hero.title} <span className="hm-grad-text">{dept.hero.highlight}</span>
            </h1>
            <p className="hm-lead">{dept.hero.answer}</p>
            <div className="hm-actions">
              <Link href="/book" className="hm-btn">
                <span>Book a free discovery call</span>
                <ArrowRight size={16} aria-hidden="true" />
              </Link>
              <Link href="#ideas" className="hm-btn hm-btn-ghost">
                <span>See the examples</span>
                <ArrowRight size={16} aria-hidden="true" />
              </Link>
            </div>
          </div>
          <div className="hm-flow">
            <div className="hm-flow-head">
              <small>{dept.ideas.length} examples on this page</small>
              <strong>Jump to the one that sounds like you.</strong>
            </div>
            <ol className="hm-diag">
              {dept.ideas.map((idea, i) => (
                <li key={idea.title}>
                  <a href={`#idea-${i + 1}`}>
                    <i>{pad(i + 1)}</i>
                    <b>{idea.title}</b>
                    <ArrowRight size={18} aria-hidden="true" />
                  </a>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="hm-section hm-white" id="ideas">
        <div className="container">
          <header className="hm-head">
            <p className="hm-eyebrow">Reusable examples</p>
            <h2>{dept.ideas.length} automation examples you can reuse in this department.</h2>
          </header>
          <div className="hm-ideas">
            {dept.ideas.map((idea, i) => (
              <article key={idea.title} id={`idea-${i + 1}`} className="hm-idea">
                <div className="hm-idea-main">
                  <span className="hm-idea-n">{pad(i + 1)}</span>
                  <h3>{idea.title}</h3>
                  <p>{idea.problem}</p>
                  <ul className="hm-cd-tools">
                    {idea.tools.map((t) => (
                      <li key={t}>{t}</li>
                    ))}
                  </ul>
                  {idea.proof ? (
                    <Link className="hm-cl-link" href={`/case-studies/${idea.proof.slug}`}>
                      <Check size={16} aria-hidden="true" />
                      <span>Built: {idea.proof.label}</span>
                      <ArrowRight size={16} aria-hidden="true" />
                    </Link>
                  ) : null}
                </div>
                <div className="hm-idea-flow">
                  <ol>
                    {idea.flow.map((step, s) => (
                      <li key={FLOW_LABELS[s]} className={s === 2 ? "is-human" : s === 1 ? "is-auto" : undefined}>
                        <i>{s === 2 ? <UserRound size={16} /> : s === 1 ? <Zap size={16} /> : <CornerDownRight size={16} />}</i>
                        <span>
                          <small>{FLOW_LABELS[s]}</small>
                          {step}
                        </span>
                      </li>
                    ))}
                  </ol>
                  <p>
                    <b>Stays with a person:</b> {idea.staysHuman}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="hm-section hm-paper">
        <div className="container hm-split">
          <header className="hm-head">
            <p className="hm-eyebrow">Where to start</p>
            <h2>{dept.start.title}</h2>
          </header>
          <div className="hm-astory">
            <p>{dept.start.body}</p>
            <Link href="/book" className="hm-btn hm-btn-outline">
              <span>Rank these for my business</span>
              <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      <section className="hm-section hm-dark" id="proof">
        <div className="hm-dark-bg" aria-hidden="true" />
        <div className="container">
          <div className="hm-proof">
            <div className="hm-proof-num">
              <p className="hm-eyebrow hm-eyebrow-light">{dept.proof.closest ? "Closest published build" : "Published result"}</p>
              <strong>{dept.proof.big}</strong>
              <span>{dept.proof.bigLabel}</span>
            </div>
            <div className="hm-proof-body">
              <h2>{dept.proof.title}</h2>
              <p className="hm-xafter">{dept.proof.summary}</p>
              <Link href={`/case-studies/${dept.proof.slug}`} className="hm-btn hm-btn-light">
                <span>Read the full case study</span>
                <ArrowRight size={16} aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {groups.length > 0 ? (
        <section className="hm-section hm-paper hm-related">
          <div className="container hm-related-grid">
            {groups.map((g) => (
              <div key={g.label}>
                <p className="hm-eyebrow">{g.label}</p>
                <ul className="hm-rows">
                  {g.links.map((l) => (
                    <li key={l.href}>
                      <Link href={l.href}>
                        <span>{l.title}</span>
                        <ArrowRight size={20} aria-hidden="true" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      ) : null}

      <section className="hm-section hm-white hm-others">
        <div className="container">
          <p className="hm-eyebrow">Other departments</p>
          <div className="hm-chips">
            {others.map((d) => (
              <Link key={d.slug} href={`/use-cases/${d.slug}`}>
                {d.name} <ArrowRight size={14} aria-hidden="true" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Faq title={`Questions about ${dept.name.toLowerCase()} automation.`} items={dept.faq} />
      <Final
        eyebrow="Ready to pick the first one?"
        title="Find out which example pays back fastest."
        body="Book a free discovery call. We will rank your repeating work and tell you which example to build first."
      />
    </main>
  );
}
