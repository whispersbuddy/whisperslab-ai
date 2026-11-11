// /case-studies index in the homepage design system. Styles: app/styles/cases.css.
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import NewsletterSection from "@/components/NewsletterSection";
import type { CaseStudy } from "@/app/_content/caseStudiesData";

const READ = [
  { t: "Context", d: "What the business and team were dealing with." },
  { t: "Constraint", d: "Where manual effort, risk, or delay accumulated." },
  { t: "System", d: "How the new workflow moves and where people stay involved." },
  { t: "Result", d: "The measured change after the system went live." },
];

export default function CaseStudiesIndex({ studies }: { studies: CaseStudy[] }) {
  return (
    <main className="cases-page hm">
      <section className="hm-section hm-dark hm-phero hm-chero">
        <div className="hm-dark-bg" aria-hidden="true" />
        <div className="container hm-chero-grid">
          <div>
            <nav className="hm-crumbs" aria-label="Breadcrumb">
              <span>
                <Link href="/">Home</Link>
                <i aria-hidden="true">/</i>
              </span>
              <span aria-current="page">Case Studies</span>
            </nav>
            <p className="hm-eyebrow hm-eyebrow-light">Real systems · Measured outcomes</p>
            <h1>
              Proof should show the <span className="hm-grad-text">work before the win.</span>
            </h1>
            <p className="hm-lead">
              Every case study names the operational pain, the system we built, and the result. No anonymous percentage
              floating without context.
            </p>
          </div>
          <div className="hm-ccount">
            <strong>{String(studies.length).padStart(2, "0")}</strong>
            <span>published builds</span>
            <p>AI extraction · data sync · lead operations · reporting · onboarding</p>
          </div>
        </div>
      </section>

      <section className="hm-section hm-white">
        <div className="container">
          <header className="hm-head">
            <p className="hm-eyebrow">The build index</p>
            <h2>From manual bottleneck to working system.</h2>
          </header>
          <div className="hm-clist">
            {studies.map((cs, i) => (
              <article key={cs.slug}>
                <div className="hm-cl-meta">
                  <span className="hm-cl-n">{String(i + 1).padStart(2, "0")}</span>
                  <small>{cs.industry}</small>
                  <em>{cs.buildType === "ai" ? "AI-powered" : "Automated"}</em>
                </div>
                <div className="hm-cl-main">
                  <h3>
                    <Link href={`/case-studies/${cs.slug}`}>{cs.title}</Link>
                  </h3>
                  <p className="hm-cl-goal">
                    <b>The goal:</b> {cs.goal}
                  </p>
                  <div className="hm-cl-ba">
                    <div>
                      <small>Before</small>
                      <p>{cs.before}</p>
                    </div>
                    <div>
                      <small>After</small>
                      <p>{cs.after}</p>
                    </div>
                  </div>
                  <Link className="hm-cl-link" href={`/case-studies/${cs.slug}`}>
                    <span>Read the full build story</span>
                    <ArrowRight size={16} aria-hidden="true" />
                  </Link>
                </div>
                <ul className="hm-cl-metrics">
                  {cs.metrics.map((m) => (
                    <li key={m.label}>
                      <strong>{m.num}</strong>
                      <span>{m.label}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="hm-section hm-dark">
        <div className="hm-dark-bg" aria-hidden="true" />
        <div className="container">
          <header className="hm-head hm-head-center">
            <p className="hm-eyebrow hm-eyebrow-light">How to read these</p>
            <h2>Outcome first. Architecture second. Hype nowhere.</h2>
          </header>
          <div className="hm-rules">
            {READ.map((r) => (
              <div key={r.t}>
                <h3>{r.t}</h3>
                <p>{r.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="hm-final">
        <div className="hm-final-bg" aria-hidden="true" />
        <div className="container hm-final-inner">
          <p className="hm-eyebrow">Your workflow is the next brief</p>
          <h2>Show us what keeps piling up.</h2>
          <p>Book a free discovery call and we will tell you which of your repeated tasks is worth automating first.</p>
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
      <NewsletterSection variant="home" />
    </main>
  );
}
