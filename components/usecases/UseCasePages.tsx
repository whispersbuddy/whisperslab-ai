import Link from "next/link";
import { ArrowRight, Check, CornerDownRight, UserRound, Zap } from "lucide-react";
import { getBlogPostBySlug } from "@/app/_content/blogData";
import { DEPARTMENTS, type Department } from "@/app/_content/useCases";
import { CMS_ONLY_POST_TITLES } from "@/lib/blogLinks";
import { getRoute } from "@/lib/routes";
import type { Crumb } from "@/lib/seo";
import NewsletterSection from "@/components/NewsletterSection";
import { PilotFaq } from "@/components/pilots/ExpansionPilots";
import RelatedLinks from "@/components/RelatedLinks";
import SiteIcon from "@/components/SiteIcon";

type FaqItem = { q: string; a: string };

const pad = (n: number) => String(n).padStart(2, "0");

function Crumbs({ crumbs }: { crumbs: Crumb[] }) {
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

const HUB_PROOF = [
  { slug: "ai-catalog-content-engine", big: "~22 hrs", label: "saved every week", title: "The AI Catalog & Content Engine", tag: "E-commerce" },
  { slug: "financial-document-reader", big: "~15 hrs", label: "saved every week", title: "The Financial Document Reader", tag: "Finance" },
  { slug: "lead-sales-engine", big: "~15 hrs", label: "saved every week", title: "The Lead Sales Engine That Runs Itself", tag: "Sales" },
  { slug: "crm-that-fills-itself-in", big: "~6 hrs", label: "saved every week", title: "The CRM That Fills Itself In", tag: "CRM" },
];

export function UseCasesHub({ crumbs, faq }: { crumbs: Crumb[]; faq: FaqItem[] }) {
  const totalIdeas = DEPARTMENTS.reduce((sum, d) => sum + d.ideas.length, 0);
  return (
    <main className="pilot-page uc-page uc-hub">
      <section className="uc-hero">
        <div className="container uc-hero-grid">
          <div className="uc-hero-copy">
            <Crumbs crumbs={crumbs} />
            <span className="pilot-label pilot-label-light">USE CASES · {totalIdeas} EXAMPLES · {DEPARTMENTS.length} DEPARTMENTS</span>
            <h1>Small business automation examples <span>for every department.</span></h1>
            <p>Pick the department that loses the most hours. Each page lists reusable automations, what runs on its own, what stays with a person, and a real build where we have one.</p>
            <div className="pilot-actions">
              <Link href="/audit" className="btn btn-primary">Rank my busywork for $250 <ArrowRight size={15} /></Link>
              <Link href="#departments" className="pilot-text-link is-light">Browse departments <span>↓</span></Link>
            </div>
          </div>
          <div className="uc-index" aria-label="Departments">
            <small>WHERE DOES THE WEEK GO?</small>
            {DEPARTMENTS.map((d, i) => (
              <Link key={d.slug} href={`/use-cases/${d.slug}`} data-dept={d.slug}>
                <span>{pad(i + 1)}</span>
                <b>{d.name}</b>
                <em>{d.ideas.length} examples</em>
                <ArrowRight size={16} />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="uc-depts" id="departments">
        <div className="container">
          <div className="pilot-section-head">
            <span className="pilot-label">BY DEPARTMENT</span>
            <h2>Find the automation that fits the work.</h2>
            <p>Each example is a pattern we have built or can build on the tools you already pay for. Open a department to see how it runs, step by step.</p>
          </div>
          <div className="uc-dept-grid">
            {DEPARTMENTS.map((d) => (
              <Link key={d.slug} href={`/use-cases/${d.slug}`} className="uc-dept-card" data-dept={d.slug}>
                <i><SiteIcon name={d.icon} size={22} /></i>
                <h3>{d.name}</h3>
                <p>{d.blurb}</p>
                <ul>
                  {d.ideas.slice(0, 3).map((idea) => <li key={idea.title}><Check size={14} />{idea.title}</li>)}
                </ul>
                <b>{d.ideas.length} examples <ArrowRight size={15} /></b>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="uc-method">
        <div className="container">
          <div>
            <span className="pilot-label pilot-label-light">HOW TO PICK THE FIRST ONE</span>
            <h2>Count the hours before you choose.</h2>
            <p>The best first automation is not the most exciting one. It is the task that repeats most, follows the same steps, and costs the most hours a week.</p>
          </div>
          <ol>
            <li><span>01</span><b>Count</b><p>List the tasks your team repeats and put real hours beside each one.</p></li>
            <li><span>02</span><b>Rank</b><p>Order them by hours saved against the effort to build.</p></li>
            <li><span>03</span><b>Build one</b><p>Automate the top task first, prove it works, then add the next.</p></li>
          </ol>
        </div>
      </section>

      <section className="uc-proof">
        <div className="container">
          <div className="pilot-section-head">
            <span className="pilot-label">BUILT, NOT IMAGINED</span>
            <h2>Real systems behind the examples.</h2>
          </div>
          <div className="uc-proof-grid">
            {HUB_PROOF.map((p) => (
              <Link key={p.slug} href={`/case-studies/${p.slug}`}>
                <small>{p.tag}</small>
                <strong>{p.big}</strong>
                <span>{p.label}</span>
                <h3>{p.title}</h3>
                <b>Read the case study <ArrowRight size={14} /></b>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <PilotFaq title="Questions about automation examples" items={faq} />
      <section className="pilot-final pilot-final-service">
        <div className="container">
          <span className="pilot-label pilot-label-light">NOT SURE WHICH EXAMPLE COMES FIRST?</span>
          <h2>Let the Audit rank your work.</h2>
          <p>In seven days you get a ranked plan with the first build named and priced. The plan is yours either way, and the $250 is credited if you build with us.</p>
          <Link href="/audit" className="btn btn-primary">See the $250 Automation Audit</Link>
        </div>
      </section>
      <NewsletterSection />
    </main>
  );
}

const FLOW_LABELS = ["Trigger", "Runs on its own", "Then a person"] as const;

export function DepartmentPage({ dept, crumbs }: { dept: Department; crumbs: Crumb[] }) {
  const others = DEPARTMENTS.filter((d) => d.slug !== dept.slug);
  const services = pathLinks(dept.related.services);
  const industries = pathLinks(dept.related.industries);
  const posts = postLinks(dept.related.posts);
  return (
    <main className="pilot-page uc-page uc-dept" data-dept={dept.slug}>
      <section className="uc-dhero">
        <div className="container uc-dhero-grid">
          <div className="uc-hero-copy">
            <Crumbs crumbs={crumbs} />
            <span className="pilot-label pilot-label-light">{dept.hero.eyebrow}</span>
            <h1>{dept.hero.title} <span>{dept.hero.highlight}</span></h1>
            <p>{dept.hero.answer}</p>
            <div className="pilot-actions">
              <Link href="/audit" className="btn btn-primary">Start with the $250 Audit <ArrowRight size={15} /></Link>
              <Link href="#ideas" className="pilot-text-link is-light">See the examples <span>↓</span></Link>
            </div>
          </div>
          <nav className="uc-jump" aria-label="Examples on this page">
            <small>{dept.ideas.length} EXAMPLES ON THIS PAGE</small>
            {dept.ideas.map((idea, i) => (
              <a key={idea.title} href={`#idea-${i + 1}`}><span>{pad(i + 1)}</span><b>{idea.title}</b><ArrowRight size={15} /></a>
            ))}
          </nav>
        </div>
      </section>

      <section className="uc-ideas" id="ideas">
        <div className="container">
          <div className="pilot-section-head">
            <span className="pilot-label">REUSABLE EXAMPLES</span>
            <h2>{dept.ideas.length} automation examples you can reuse in this department.</h2>
          </div>
          <div className="uc-idea-grid">
            {dept.ideas.map((idea, i) => (
              <article key={idea.title} id={`idea-${i + 1}`} className="uc-idea">
                <header>
                  <span>{pad(i + 1)}</span>
                  <h3>{idea.title}</h3>
                </header>
                <p className="uc-problem">{idea.problem}</p>
                <ol className="uc-flow">
                  {idea.flow.map((step, s) => (
                    <li key={FLOW_LABELS[s]} className={s === 2 ? "is-human" : s === 1 ? "is-auto" : undefined}>
                      <i>{s === 2 ? <UserRound size={14} /> : s === 1 ? <Zap size={14} /> : <CornerDownRight size={14} />}</i>
                      <span><small>{FLOW_LABELS[s]}</small>{step}</span>
                    </li>
                  ))}
                </ol>
                <p className="uc-human"><b>Stays with a person:</b> {idea.staysHuman}</p>
                <div className="uc-tools">{idea.tools.map((tool) => <span key={tool}>{tool}</span>)}</div>
                {idea.proof ? (
                  <Link className="uc-built" href={`/case-studies/${idea.proof.slug}`}><Check size={14} /> Built: {idea.proof.label} <ArrowRight size={14} /></Link>
                ) : null}
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="uc-start">
        <div className="container">
          <div>
            <span className="pilot-label">WHERE TO START</span>
            <h2>{dept.start.title}</h2>
            <p>{dept.start.body}</p>
          </div>
          <Link href="/audit" className="btn btn-primary">Rank these for my business <ArrowRight size={15} /></Link>
        </div>
      </section>

      <section className="uc-dproof">
        <div className="container uc-dproof-grid">
          <div>
            <span className="pilot-label pilot-label-light">{dept.proof.closest ? "CLOSEST PUBLISHED BUILD" : "PUBLISHED RESULT"}</span>
            <strong>{dept.proof.big}</strong>
            <p>{dept.proof.bigLabel}</p>
          </div>
          <div>
            <h2>{dept.proof.title}</h2>
            <p>{dept.proof.summary}</p>
            <Link href={`/case-studies/${dept.proof.slug}`}>Read the full case study <ArrowRight size={15} /></Link>
          </div>
        </div>
      </section>

      {services.length + industries.length + posts.length > 0 ? (
        <section className="uc-related">
          <div className="container">
            <RelatedLinks label="BUILD IT WITH" links={services} />
            <RelatedLinks label="WHO ELSE USES THIS" links={industries} />
            <RelatedLinks label={posts.length > 1 ? "RELATED GUIDES" : "RELATED GUIDE"} links={posts} />
          </div>
        </section>
      ) : null}

      <section className="uc-others">
        <div className="container">
          <span className="pilot-label">OTHER DEPARTMENTS</span>
          <div>
            {others.map((d) => <Link key={d.slug} href={`/use-cases/${d.slug}`} data-dept={d.slug}>{d.name} <ArrowRight size={14} /></Link>)}
          </div>
        </div>
      </section>

      <PilotFaq title={`Questions about ${dept.name.toLowerCase()} automation`} items={dept.faq} />
      <section className="pilot-final pilot-final-service">
        <div className="container">
          <span className="pilot-label pilot-label-light">READY TO PICK THE FIRST ONE?</span>
          <h2>Find out which example pays back fastest.</h2>
          <p>In seven days the Automation Audit ranks your repeating work and hands you a plan you keep either way. Build it with us and the $250 is credited.</p>
          <Link href="/audit" className="btn btn-primary">See the $250 Automation Audit</Link>
        </div>
      </section>
      <NewsletterSection />
    </main>
  );
}
