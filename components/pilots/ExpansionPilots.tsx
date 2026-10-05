import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check, ExternalLink, LockKeyhole, ShieldCheck } from "lucide-react";
import type { ServicePage } from "@/app/_content/services";
import type { IntegrationPage } from "@/app/_content/integrations";
import type { IndustryPage } from "@/app/_content/industries";
import { getBlogPostBySlug } from "@/app/_content/blogData";
import {
  READINESS_BANDS,
  READINESS_CTA,
  READINESS_FAQ,
  READINESS_MAX_SCORE,
  READINESS_QUESTIONS,
  ROI_CALCULATOR,
} from "@/app/_content/resources";
import { OFFERS } from "@/lib/offers";
import { getRoute } from "@/lib/routes";
import type { Crumb } from "@/lib/seo";
import Estimator from "@/components/service/Estimator";
import NewsletterSection from "@/components/NewsletterSection";
import PlatformLogo from "@/components/PlatformLogo";
import ReadinessQuiz from "@/components/resources/ReadinessQuiz";
import BentoPreview from "@/components/pilots/BentoPreview";
import RelatedLinks from "@/components/RelatedLinks";

// Cross-links a service/industry page's `related` slugs and paths to labelled
// links, dropping anything that doesn't resolve (e.g. a Strapi-only related
// slug not present in the local route/blog data).
function resolvePathLinks(paths: string[]): { href: string; title: string }[] {
  return paths
    .map((path) => {
      const label = getRoute(path)?.label;
      return label ? { href: path, title: label } : null;
    })
    .filter((link): link is { href: string; title: string } => link !== null);
}

function resolvePostLinks(slugs: string[]): { href: string; title: string }[] {
  return slugs
    .map((slug) => {
      const post = getBlogPostBySlug(slug);
      return post ? { href: `/blog/${slug}`, title: post.title } : null;
    })
    .filter((link): link is { href: string; title: string } => link !== null);
}

function PilotCrumbs({ crumbs, dark = false }: { crumbs: Crumb[]; dark?: boolean }) {
  return (
    <nav className={`pilot-crumbs${dark ? " is-dark" : ""}`} aria-label="Breadcrumb">
      {crumbs.map((crumb, index) => (
        <span key={crumb.path}>
          {index < crumbs.length - 1 ? <Link href={crumb.path}>{crumb.name}</Link> : <span aria-current="page">{crumb.name}</span>}
          {index < crumbs.length - 1 ? <i aria-hidden="true">/</i> : null}
        </span>
      ))}
    </nav>
  );
}

export function PilotFaq({ title, items }: { title: string; items: ServicePage["faq"]["items"] }) {
  return (
    <section className="pilot-faq" id="faq">
      <div className="container pilot-faq-grid">
        <div className="pilot-faq-intro">
          <span className="pilot-label">QUESTIONS, ANSWERED</span>
          <h2>{title}</h2>
          <p>Clear scope, clear ownership, and no black-box handoff.</p>
        </div>
        <div className="pilot-faq-list">
          {items.map((item, index) => (
            <details key={item.q} open={index === 0}>
              <summary>{item.q}<span aria-hidden="true">+</span></summary>
              <p>{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ReadinessPilot({ crumbs }: { crumbs: Crumb[] }) {
  const signals = [
    ["01", "Repeatable steps", "The path is mostly known."],
    ["02", "Digital inputs", "The source already lives in software."],
    ["03", "Enough volume", "The task consumes real weekly time."],
    ["04", "Checkable output", "A person can tell right from wrong."],
    ["05", "Named reviewer", "Exceptions have a clear owner."],
    ["06", "Stable process", "The rules are not changing every week."],
  ];

  return <main className="pilot-page ready-page">
    <section className="ready-hero">
      <div className="container ready-hero-grid">
        <div className="ready-copy">
          <PilotCrumbs crumbs={crumbs} dark />
          <span className="pilot-label pilot-label-light">FREE TOOL · 3 MINUTES · ONE TASK</span>
          <h1>Is this task ready to <span>automate?</span></h1>
          <p>Score one real task against the six conditions that make automation reliable. You will get a practical verdict, not an AI maturity buzzword.</p>
          <a className="btn btn-primary" href="#assessment">Start the assessment <ArrowRight size={15} /></a>
        </div>
        <div className="ready-signal-map" aria-label="The six readiness signals">
          <div className="ready-signal-head"><span>READINESS SIGNALS</span><b>6 checks</b></div>
          {signals.map(([number, title, body]) => <div className="ready-signal" key={number}><span>{number}</span><div><b>{title}</b><small>{body}</small></div><i aria-hidden="true" /></div>)}
        </div>
      </div>
    </section>

    <section className="ready-assessment" id="assessment">
      <div className="container ready-assessment-grid">
        <header><span className="pilot-label">SCORE ONE TASK</span><h2>Use the task you wish would disappear first.</h2><p>Answer for the process as it works today—not how you hope it will work after a new system is installed.</p></header>
        <div className="ready-quiz-shell"><ReadinessQuiz questions={READINESS_QUESTIONS} bands={READINESS_BANDS} maxScore={READINESS_MAX_SCORE} /></div>
      </div>
    </section>

    <section className="ready-reading">
      <div className="container">
        <div className="pilot-section-head"><span className="pilot-label pilot-label-light">HOW TO READ THE SCORE</span><h2>A low score is a sequence, not a dead end.</h2></div>
        <div className="ready-bands">
          {READINESS_BANDS.map((band) => <article key={band.verdict}><span>{band.min}–{band.max}</span><h3>{band.verdict}</h3><p>{band.body}</p></article>)}
        </div>
      </div>
    </section>

    <section className="ready-next"><div className="container"><div><span className="pilot-label">WHAT THIS TOOL DOES NOT DO</span><h2>One task is not the whole operating system.</h2></div><div><p>The assessment tells you whether one workflow has a good automation shape. It does not compare competing workflows, estimate tool costs, or map failure handling.</p><p>That is the job of the Automation Audit: ranking the opportunities together before anything is built.</p></div></div></section>
    <PilotFaq title={READINESS_FAQ.title} items={READINESS_FAQ.items} />
    <section className="pilot-final pilot-final-ready"><div className="container"><span className="pilot-label pilot-label-light">FROM SCORE TO BUILD PLAN</span><h2>{READINESS_CTA.title}</h2><p>{READINESS_CTA.body}</p><div className="pilot-actions"><Link href="/audit" className="btn btn-primary">See the $250 Automation Audit</Link><Link href="/book" className="btn btn-ghost-light">Book a free discovery call</Link></div></div></section>
    <NewsletterSection />
  </main>;
}

const SERVICE_VISUALS: Record<string, {
  file: string;
  meta: string;
  stages: { title: string; detail: string; state: string; review?: boolean }[];
  footer: string;
  exception: string;
}> = {
  "data-entry-automation": {
    file: "Northside_Plumbing_20417.pdf",
    meta: "Inbox · 1,284.50 USD · due Oct 3",
    stages: [
      { title: "Read", detail: "9 fields extracted", state: "0.9s" },
      { title: "Validate", detail: "Totals match · vendor found", state: "1.3s" },
      { title: "Human check", detail: "PO number missing", state: "Review", review: true },
      { title: "Deliver", detail: "Draft bill created in Xero", state: "Ready" },
    ],
    footer: "Source document attached",
    exception: "1 field needs a person",
  },
  "bookkeeping-automation": {
    file: "September_bank_feed.csv",
    meta: "428 transactions · Xero · September close",
    stages: [
      { title: "Import", detail: "Transactions normalized", state: "12s" },
      { title: "Match", detail: "Receipts and invoices linked", state: "94%" },
      { title: "Review", detail: "18 unusual items queued", state: "Check", review: true },
      { title: "Reconcile", detail: "Clean entries ready to post", state: "Ready" },
    ],
    footer: "Audit trail retained",
    exception: "Only exceptions reach the bookkeeper",
  },
  "client-onboarding-automation": {
    file: "Cedar_Studio_signed_agreement.pdf",
    meta: "New client · Growth package · starts Monday",
    stages: [
      { title: "Create", detail: "Client record and folder made", state: "Done" },
      { title: "Schedule", detail: "Kickoff options sent", state: "Sent" },
      { title: "Collect", detail: "Two intake answers missing", state: "Waiting", review: true },
      { title: "Welcome", detail: "Team and client briefed", state: "Ready" },
    ],
    footer: "Every handoff has an owner",
    exception: "2 answers waiting on the client",
  },
  "lead-follow-up-automation": {
    file: "Website lead · Jordan Price",
    meta: "Ridge Supply Co · demo request · 2:14 PM",
    stages: [
      { title: "Capture", detail: "Lead and source recorded", state: "0.2s" },
      { title: "Enrich", detail: "Company and role matched", state: "0.8s" },
      { title: "Route", detail: "Territory owner assigned", state: "Priya" },
      { title: "Follow up", detail: "Personal reply needs approval", state: "Review", review: true },
    ],
    footer: "Response clock started automatically",
    exception: "Tone stays with the salesperson",
  },
  "software-integration-services": {
    file: "Customer 1842 · CRM → Accounting",
    meta: "HubSpot update · QuickBooks sync · 3 linked apps",
    stages: [
      { title: "Detect", detail: "Customer status changed", state: "Event" },
      { title: "Validate", detail: "Required fields confirmed", state: "Passed" },
      { title: "Sync", detail: "One tax code is unmapped", state: "Review", review: true },
      { title: "Confirm", detail: "Systems receive one final record", state: "Ready" },
    ],
    footer: "Retries and logs included",
    exception: "1 mapping needs an owner",
  },
};

export function ServicePilot({ page, crumbs }: { page: ServicePage; crumbs: Crumb[] }) {
  const featured = page.proof.featured;
  const visual = SERVICE_VISUALS[page.slug] ?? SERVICE_VISUALS["data-entry-automation"];
  const relatedIndustries = resolvePathLinks(page.related.industries);
  const relatedPosts = resolvePostLinks(page.related.posts);
  return (
    <main className={`pilot-page pilot-service service-${page.slug}`}>
      <section className="de-hero">
        <div className="container de-hero-grid">
          <div className="de-hero-copy">
            <PilotCrumbs crumbs={crumbs} dark />
            <span className="pilot-label pilot-label-light">{page.hero.eyebrow}</span>
            <h1>{page.hero.title} <span>{page.hero.highlight}</span></h1>
            <p>{page.hero.answer}</p>
            <div className="pilot-actions">
              <Link href="/audit" className="btn btn-primary">Start with the $250 Audit <ArrowRight size={15} /></Link>
              <Link href="#workflow" className="pilot-text-link">See the workflow <span>↓</span></Link>
            </div>
          </div>

          <div className="de-flow" aria-label={`Example ${page.slug.replace(/-/g, " ")} flow`}>
            <div className="de-flow-top"><span /><span /><span /><b>{page.slug}.flow</b></div>
            <div className="de-flow-source">
              <small>NEW WORK ITEM</small>
              <strong>{visual.file}</strong>
              <span>{visual.meta}</span>
            </div>
            <ol>
              {visual.stages.map((stage, index) => <li key={stage.title} className={stage.review ? "needs-review" : undefined}><i>{String(index + 1).padStart(2, "0")}</i><span><b>{stage.title}</b><small>{stage.detail}</small></span><em>{stage.state}</em></li>)}
            </ol>
            <div className="de-flow-footer"><span><Check size={14} /> {visual.footer}</span><b>{visual.exception}</b></div>
          </div>
        </div>
      </section>

      <nav className="pilot-jump" aria-label="On this page">
        <div className="container"><span>On this page</span><Link href="#outcomes">Outcome</Link><Link href="#workflow">Workflow</Link><Link href="#scope">Documents</Link><Link href="#proof">Proof</Link><Link href="#faq">FAQ</Link></div>
      </nav>

      <section className="de-outcomes" id="outcomes">
        <div className="container">
          <div className="de-outcome-lead"><span className="pilot-label">WHAT CHANGES</span><h2>{page.beforeAfter.title}</h2></div>
          <div className="de-outcome-row">
            {page.values.map((value) => <article key={value.big}><strong>{value.big}</strong><h3>{value.what}</h3><p>{value.from}</p></article>)}
          </div>
        </div>
      </section>

      <section className="de-workflow" id="workflow">
        <div className="container de-workflow-grid">
          <div className="de-sticky-copy"><span className="pilot-label">THE OPERATING MODEL</span><h2>Four stages. One visible exception queue.</h2><p>The automation does not hide uncertainty. It moves clean work forward and stops exactly where a person is needed.</p></div>
          <ol className="de-steps">
            {page.steps.items.map((step, index) => (
              <li key={step.title}><span>{String(index + 1).padStart(2, "0")}</span><div><h3>{step.title}</h3><p>{step.body}</p><small>{step.tools.join(" · ")}</small></div></li>
            ))}
            <li className="de-human-step"><span>H</span><div><h3>Judgment stays with your team</h3><p>{page.steps.human.join(" · ")}</p></div></li>
          </ol>
        </div>
      </section>

      <section className="de-scope" id="scope">
        <div className="container">
          <div className="pilot-section-head"><span className="pilot-label">{page.bento.eyebrow}</span><h2>{page.bento.title}</h2><p>{page.bento.intro}</p></div>
          <div className="de-scope-grid">
            {page.bento.tiles.map((tile, index) => <article key={tile.title} className={index === 0 ? "is-featured" : ""}><small>{tile.verb}</small><span>{String(index + 1).padStart(2, "0")}</span><h3>{tile.title}</h3>{tile.body ? <p>{tile.body}</p> : null}{tile.preview ? <BentoPreview p={tile.preview} /> : null}</article>)}
          </div>
        </div>
      </section>

      <section className="de-proof" id="proof">
        <div className="container de-proof-grid">
          <div><span className="pilot-label pilot-label-light">PUBLISHED RESULT</span><strong>{featured.big}</strong><p>{featured.bigLabel}</p></div>
          <div><h2>{featured.title}</h2><div className="de-proof-change"><span><b>Before</b>{featured.before}</span><span><b>After</b>{featured.after}</span></div><Link href={`/case-studies/${featured.slug}`}>Read the full case study <ArrowRight size={15} /></Link></div>
        </div>
      </section>

      <section className="de-ownership">
        <div className="container de-ownership-grid">
          <div><span className="pilot-label">WHAT YOU OWN</span><h2>Built in your accounts. Documented for your team.</h2><p>{page.stack.intro}</p></div>
          <div className="de-stack-list"><div><LockKeyhole size={20} /><span><b>Your logins and data</b><small>No dependency on our accounts</small></span></div><div><ShieldCheck size={20} /><span><b>Exception and error handling</b><small>Failures are visible, not silent</small></span></div><div className="de-tool-line">{page.stack.tools.slice(0, 8).map((tool) => <PlatformLogo key={tool} name={tool} />)}</div></div>
        </div>
      </section>

      {(relatedIndustries.length > 0 || relatedPosts.length > 0) && (
        <section className="de-related">
          <div className="container">
            <RelatedLinks label="WHO ELSE USES THIS" links={relatedIndustries} />
            <RelatedLinks label={relatedPosts.length > 1 ? "RELATED GUIDES" : "RELATED GUIDE"} links={relatedPosts} />
          </div>
        </section>
      )}
      <PilotFaq title={page.faq.title} items={page.faq.items} />
      <section className="pilot-final pilot-final-service"><div className="container"><span className="pilot-label pilot-label-light">A CLEAR FIRST STEP</span><h2>{page.cta.title}</h2><p>{page.cta.body}</p><div className="pilot-actions"><Link href="/audit" className="btn btn-primary">Book the $250 Audit</Link><Link href="/book" className="pilot-text-link is-light">Book a free discovery call</Link></div></div></section>
      <NewsletterSection />
    </main>
  );
}

export const DataEntryPilot = ServicePilot;

const INDUSTRY_EDITORIAL: Record<string, { image: string; alt: string; handles: string; humans: string; dayTitle: string; cta: string; final: string }> = {
  "law-firms": { image: "/assets/industries/law-firms-editorial.png", alt: "Attorney reviewing an intake packet at her desk", handles: "Intake, routing, document preparation, reminders", humans: "Advice, judgment, approval, client relationships", dayTitle: "The work moves before anyone starts chasing it.", cta: "Map your firm’s workflow", final: "START WITH THE ADMIN AROUND THE LAW" },
  "real-estate": { image: "/assets/industries/real-estate-editorial.png", alt: "Real estate team reviewing a new lead", handles: "Lead capture, routing, reminders, listing updates", humans: "Advice, negotiation, showings, client trust", dayTitle: "Every lead and listing reaches the next step on time.", cta: "Map your real estate workflow", final: "START WITH THE HANDOFFS AROUND THE DEAL" },
  "ecommerce-retail": { image: "/assets/industries/ecommerce-editorial.png", alt: "E-commerce team managing products and orders", handles: "Catalog updates, order routing, inventory alerts, reports", humans: "Brand choices, merchandising, customer recovery", dayTitle: "The catalog and orders move without another spreadsheet shift.", cta: "Map your commerce operations", final: "START WITH THE REPETITION BEHIND EACH ORDER" },
  "property-management": { image: "/assets/industries/property-management-editorial.png", alt: "Property manager coordinating maintenance with a technician", handles: "Request intake, vendor routing, reminders, owner updates", humans: "Tenant relationships, approvals, urgent judgment", dayTitle: "Requests reach the right person before the inbox piles up.", cta: "Map your property workflow", final: "START WITH THE HANDOFFS AROUND EACH PROPERTY" },
  "accounting-bookkeeping": { image: "/assets/industries/accounting-editorial.png", alt: "Accounting team reviewing financial documents", handles: "Document collection, extraction, matching, reminders", humans: "Review, tax treatment, advice, final approval", dayTitle: "Clean records arrive before the review work begins.", cta: "Map your accounting workflow", final: "START WITH THE ADMIN AROUND THE NUMBERS" },
};

export function IndustryPilot({ page, crumbs }: { page: IndustryPage; crumbs: Crumb[] }) {
  const proofRows = page.proof.mode === "closest" ? page.proof.rows : [];
  // A Strapi-sourced industry carries its own editorial data (see
  // mapStrapiIndustry in lib/api.ts); the code-side lookup table is only a
  // fallback for the 5 local industries, which don't duplicate that data
  // into app/_content/industries.ts. Falling back to "law-firms" for an
  // unrecognized slug is what silently showed the wrong hero photo for any
  // new industry that only had a code-side visual template missing for it -
  // now only possible for a *local* entry with no matching editorial data,
  // not for anything sourced from Strapi.
  const editorial = page.editorial ?? INDUSTRY_EDITORIAL[page.slug] ?? INDUSTRY_EDITORIAL["law-firms"];
  const relatedServices = resolvePathLinks(page.related.services);
  const relatedPosts = resolvePostLinks(page.related.posts);
  return (
    <main className={`pilot-page pilot-law industry-${page.slug}`}>
      <section className="law-hero">
        <Image src={editorial.image} alt={editorial.alt} fill priority sizes="100vw" />
        <div className="law-hero-shade" />
        <div className="container law-hero-inner">
          <div className="law-hero-card">
            <PilotCrumbs crumbs={crumbs} dark />
            <span className="pilot-label pilot-label-light">{page.hero.eyebrow}</span>
            <h1>{page.hero.title} <span>{page.hero.highlight}</span></h1>
            <p>{page.hero.answer}</p>
            <div className="pilot-actions"><Link href="/audit" className="btn btn-primary">{editorial.cta}</Link><Link href="#day" className="pilot-text-link is-light">See a day after automation ↓</Link></div>
          </div>
        </div>
      </section>

      <section className="law-boundary"><div className="container"><article><small>AUTOMATION HANDLES</small><strong>{editorial.handles}</strong></article><i /><article><small>PEOPLE KEEP</small><strong>{editorial.humans}</strong></article></div></section>

      <section className="law-day" id="day">
        <div className="container law-day-grid">
          <header><span className="pilot-label">{page.moments.eyebrow}</span><h2>{editorial.dayTitle}</h2><p>{page.moments.intro}</p></header>
          <ol>
            {page.moments.items.map((moment) => <li key={moment.time}><time>{moment.time}</time><div><small>BEFORE</small><p>{moment.before}</p></div><div className="after"><small>AFTER</small><p>{moment.after}</p>{moment.human ? <b>Human judgment stays here</b> : null}</div></li>)}
          </ol>
        </div>
      </section>

      <section className="law-intake" id="intake">
        <div className="container">
          <div className="pilot-section-head"><span className="pilot-label">FROM INQUIRY TO OPEN MATTER</span><h2>{page.intake.title}</h2></div>
          <ol>{page.intake.items.map((step, index) => <li key={step.title}><span>{index + 1}</span><h3>{step.title}</h3><p>{step.body}</p><small>{step.tools.join(" · ")}</small></li>)}</ol>
          <div className="law-human-note"><ShieldCheck size={22} /><div><b>The stop points are designed, not improvised.</b><p>{page.intake.human.join(" · ")}</p></div></div>
        </div>
      </section>

      <section className="law-trust">
        <div className="container law-trust-grid">
          <div><span className="pilot-label">TRUST ARCHITECTURE</span><h2>{page.trust.title}</h2>{page.trust.citation ? <p className="law-citation">{page.trust.citation.text} <a href={page.trust.citation.url} target="_blank" rel="noopener">Source <ExternalLink size={13} /></a></p> : null}</div>
          <div>{page.trust.layers.map((layer, index) => <article key={layer.label}><span>{String(index + 1).padStart(2, "0")}</span><div><h3>{layer.label}</h3><p>{layer.note}</p></div></article>)}</div>
        </div>
      </section>

      {page.proof.mode === "closest" ? <section className="law-proof" id="proof"><div className="container"><div className="pilot-section-head"><span className="pilot-label">HONEST PATTERN MATCH</span><h2>{page.proof.title}</h2><p>{page.proof.intro}</p></div><div className="law-proof-list">{proofRows.map((row) => <Link key={row.slug} href={`/case-studies/${row.slug}`}><span>{row.need}</span><b>{row.big}</b><small>{row.title} · {row.detail}</small></Link>)}</div></div></section> : <section className="law-proof" id="proof"><div className="container"><div className="pilot-section-head"><span className="pilot-label">PUBLISHED RESULT</span><h2>{page.proof.title}</h2></div><Link className="law-direct-proof" href={`/case-studies/${page.proof.featured.slug}`}><div><strong>{page.proof.featured.big}</strong><small>{page.proof.featured.bigLabel}</small></div><div><h3>{page.proof.featured.title}</h3><p>{page.proof.featured.after}</p><span>Read the full case study <ArrowRight size={15} /></span></div></Link></div></section>}

      {(relatedServices.length > 0 || relatedPosts.length > 0) && (
        <section className="de-related">
          <div className="container">
            <RelatedLinks label="RELATED SERVICES" links={relatedServices} />
            <RelatedLinks label={relatedPosts.length > 1 ? "RELATED GUIDES" : "RELATED GUIDE"} links={relatedPosts} />
          </div>
        </section>
      )}
      <PilotFaq title={page.faq.title} items={page.faq.items} />
      <section className="pilot-final pilot-final-law"><div className="container"><span className="pilot-label">{editorial.final}</span><h2>{page.cta.title}</h2><p>{page.cta.body}</p><div className="pilot-actions"><Link href="/audit" className="btn btn-dark">See the $250 Automation Audit</Link></div></div></section>
      <NewsletterSection />
    </main>
  );
}

export const LawFirmPilot = IndustryPilot;

const INTEGRATION_BLUEPRINTS: Record<string, { mark: string; sourceLabel: string; sources: [string, string][]; core: string; coreSub: string; outputLabel: string; outputs: [string, string][] }> = {
  airtable: { mark: "airtable", sourceLabel: "YOUR OPERATING DATA", sources: [["Companies", "Name · Domain · Owner"], ["Contacts", "Email · Role · Company ↗"], ["Deals", "Stage · Value · Contact ↗"]], core: "One source of truth", coreSub: "Linked, permissioned, visible", outputLabel: "THE WORK MOVES", outputs: [["Form", "Create record"], ["Stage changed", "Notify owner"], ["No reply", "Schedule follow-up"]] },
  n8n: { mark: "n8n", sourceLabel: "EVENTS IN", sources: [["Webhook", "Website · CRM · payment"], ["Schedule", "Hourly · nightly · monthly"], ["API", "Custom systems · databases"]], core: "Workflow orchestration", coreSub: "Branching, logged, controllable", outputLabel: "ACTIONS OUT", outputs: [["Valid record", "Update systems"], ["Exception", "Route for review"], ["Failure", "Retry and alert"]] },
  zapier: { mark: "zapier", sourceLabel: "TRIGGERS", sources: [["New form", "Lead or client intake"], ["New sale", "Payment or order event"], ["Row updated", "Spreadsheet or database"]], core: "Trigger to action", coreSub: "Fast, familiar, maintainable", outputLabel: "AUTOMATED ACTIONS", outputs: [["Lead arrives", "Create CRM record"], ["Sale closes", "Send receipt"], ["Booking made", "Schedule reminder"]] },
};

export function IntegrationPilot({ page, crumbs, fit }: { page: IntegrationPage; crumbs: Crumb[]; fit: { good: string[]; caution: string[] } }) {
  const featured = page.proof.featured;
  const blueprint = INTEGRATION_BLUEPRINTS[page.slug] ?? INTEGRATION_BLUEPRINTS.airtable;
  return (
    <main className={`pilot-page pilot-airtable integration-${page.slug}`}>
      <section className="air-hero">
        <div className="container air-hero-inner">
          <PilotCrumbs crumbs={crumbs} dark />
          <PlatformLogo name={page.tool.name} showName={false} className="air-platform-logo" />
          <span className="pilot-label pilot-label-light">{page.hero.eyebrow}</span>
          <h1>{page.hero.title} <span>{page.hero.highlight}</span></h1>
          <p>{page.hero.answer}</p>
          <div className="pilot-actions"><Link href="/audit" className="btn btn-primary">Map the workflow first</Link><a href={page.tool.url} target="_blank" rel="noopener" className="pilot-text-link is-light">Visit {page.tool.name} <ExternalLink size={14} /></a></div>
        </div>
      </section>

      <section className="air-blueprint" id="architecture">
        <div className="container">
          <div className="air-blueprint-card">
            <div className="air-schema"><small>{blueprint.sourceLabel}</small>{blueprint.sources.map(([title, detail]) => <div key={title}><b>{title}</b><span>{detail}</span></div>)}</div>
            <div className="air-core"><PlatformLogo name={page.tool.name} showName={false} className="air-core-logo" /><span>{page.tool.name.toUpperCase()}</span><b>{blueprint.core}</b><small>{blueprint.coreSub}</small></div>
            <div className="air-outputs"><small>{blueprint.outputLabel}</small>{blueprint.outputs.map(([source, action]) => <div key={source}><span>{source}</span><i>→</i><b>{action}</b></div>)}</div>
          </div>
        </div>
      </section>

      <section className="air-fit">
        <div className="container air-fit-grid">
          <header><span className="pilot-label">PLATFORM DECISION</span><h2>{page.tool.name} is excellent at one specific kind of job.</h2><p>Choose it for the workflow it fits, not because it is the first tool someone recognizes.</p></header>
          <article className="yes"><small>USE {page.tool.name.toUpperCase()} WHEN</small>{fit.good.map((item) => <p key={item}><Check size={16} />{item}</p>)}</article>
          <article className="no"><small>CHOOSE ANOTHER APPROACH WHEN</small>{fit.caution.map((item) => <p key={item}><span>—</span>{item}</p>)}</article>
        </div>
      </section>

      <section className="air-build" id="includes">
        <div className="container air-build-grid">
          <div><span className="pilot-label">WHAT A BUILD INCLUDES</span><h2>Workflow first. Platform second.</h2><p>{page.bento.intro}</p><div className="air-tool-cloud">{page.stack.tools.slice(0, 10).map((tool) => <PlatformLogo key={tool} name={tool} />)}</div></div>
          <ol>{page.bento.tiles.map((tile, index) => <li key={tile.title}><span>{String(index + 1).padStart(2, "0")}</span><div><small>{tile.verb}</small><h3>{tile.title}</h3>{tile.body ? <p>{tile.body}</p> : null}{tile.preview ? <BentoPreview p={tile.preview} /> : null}</div></li>)}</ol>
        </div>
      </section>

      {page.cost ? (
        <section className="air-cost" id="cost">
          <div className="container">
            <div className="pilot-section-head"><span className="pilot-label">{page.cost.eyebrow}</span><h2>{page.cost.title}</h2><p>{page.cost.intro}</p></div>
            <div className="air-cost-grid">
              {OFFERS.map((offer) => (
                <article key={offer.key}>
                  <small>{offer.timeline}</small>
                  <h3>{offer.name}</h3>
                  <strong>{offer.price}</strong>
                  <p>{offer.pitch}</p>
                  <Link href={offer.href}>{offer.cta} <ArrowRight size={14} /></Link>
                </article>
              ))}
            </div>
            <p className="air-cost-note">{page.cost.note}</p>
          </div>
        </section>
      ) : null}

      <section className="air-proof"><div className="container air-proof-grid"><div><span className="pilot-label pilot-label-light">A REAL CONNECTED BUILD</span><strong>{featured.big}</strong><small>{featured.bigLabel}</small></div><div><h2>{featured.title}</h2><p>{featured.after}</p><div>{featured.chips.map((chip) => <span key={chip}>{chip}</span>)}</div><Link href={`/case-studies/${featured.slug}`}>Read the case study <ArrowRight size={15} /></Link></div></div></section>

      <PilotFaq title={page.faq.title} items={page.faq.items} />
      <section className="pilot-final pilot-final-air"><div className="container"><span className="pilot-label pilot-label-light">TOOL FIT STARTS WITH THE WORKFLOW</span><h2>{page.cta.title}</h2><p>{page.cta.body}</p><div className="pilot-actions"><Link href="/audit" className="btn btn-primary">Map the workflow first</Link><Link href="/book" className="pilot-text-link is-light">Talk through the use case</Link></div></div></section>
      <NewsletterSection />
    </main>
  );
}

export const AirtablePilot = IntegrationPilot;

export function RoiPilot({ crumbs }: { crumbs: Crumb[] }) {
  const { hero, estimator, benchmarks, faq, cta } = ROI_CALCULATOR;
  return (
    <main className="pilot-page pilot-roi">
      <section className="roi-hero">
        <div className="container roi-hero-grid">
          <div className="roi-hero-copy"><PilotCrumbs crumbs={crumbs} dark /><span className="pilot-label pilot-label-light">{hero.eyebrow} · NO EMAIL REQUIRED</span><h1>{hero.title} <span>{hero.highlight}</span></h1><p>{hero.intro}</p><div className="roi-formula-preview"><span>Volume</span><i>×</i><span>Minutes</span><i>×</i><span>Hourly cost</span><i>−</i><span>Review time</span></div></div>
          <div className="roi-tool"><div className="roi-tool-head"><span>Automation ROI model</span><b>Uses your numbers</b></div><Estimator inputs={estimator.inputs} unit={estimator.unit} showPayback /></div>
        </div>
      </section>

      <section className="roi-read"><div className="container roi-read-grid"><div><span className="pilot-label">HOW TO READ THE RESULT</span><h2>Time back is the useful number. Payback is the decision number.</h2></div><ol><li><span>01</span><p><b>Start with one task.</b> Do not combine unrelated work into one estimate.</p></li><li><span>02</span><p><b>Use loaded labor cost.</b> Include overhead or the real value of the owner’s time.</p></li><li><span>03</span><p><b>Keep review time honest.</b> Good automation removes repetition, not responsibility.</p></li></ol></div></section>

      <section className="roi-benchmarks"><div className="container"><div className="pilot-section-head"><span className="pilot-label">PUBLISHED WHISPERS LAB RESULTS</span><h2>{benchmarks.title}</h2><p>{benchmarks.intro}</p></div><div className="roi-benchmark-list">{benchmarks.rows.map((row, index) => <Link key={row.slug} href={`/case-studies/${row.slug}`}><span>{String(index + 1).padStart(2, "0")}</span><div><h3>{row.title}</h3><p>{row.detail}</p></div><strong>{row.big}</strong><ArrowRight size={17} /></Link>)}</div></div></section>

      <PilotFaq title={faq.title} items={faq.items} />
      <section className="pilot-final pilot-final-roi"><div className="container"><span className="pilot-label pilot-label-light">TURN THE ESTIMATE INTO A SCOPE</span><h2>{cta.title}</h2><p>{cta.body}</p><div className="pilot-actions"><Link href="/audit" className="btn btn-primary">See the $250 Automation Audit</Link><Link href="/resources/ai-readiness-assessment" className="pilot-text-link is-light">Check readiness first</Link></div></div></section>
      <NewsletterSection />
    </main>
  );
}
