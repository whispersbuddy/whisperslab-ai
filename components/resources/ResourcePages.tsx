// /resources/automation-roi-calculator and /resources/ai-readiness-assessment in the
// homepage design system. Content: app/_content/resources.ts. Styles: app/styles/blog-resources.css.
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import NewsletterSection from "@/components/NewsletterSection";
import Estimator from "@/components/service/Estimator";
import ReadinessQuiz from "@/components/resources/ReadinessQuiz";
import {
  READINESS_BANDS,
  READINESS_CTA,
  READINESS_FAQ,
  READINESS_MAX_SCORE,
  READINESS_QUESTIONS,
  ROI_CALCULATOR,
} from "@/app/_content/resources";
import type { Crumb } from "@/lib/seo";

type FaqItem = { q: string; a: string };

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

function Final({
  eyebrow,
  title,
  body,
  second,
}: {
  eyebrow: string;
  title: string;
  body: string;
  second: { href: string; label: string };
}) {
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
          <Link href={second.href} className="hm-btn hm-btn-outline">
            <span>{second.label}</span>
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}

const READ_STEPS = [
  { t: "Start with one task", d: "Do not combine unrelated work into one estimate." },
  { t: "Use loaded labor cost", d: "Include overhead, or the real value of the owner's time." },
  { t: "Keep review time honest", d: "Good automation removes repetition, not responsibility." },
];

export function RoiCalculatorView({ crumbs }: { crumbs: Crumb[] }) {
  const { hero, estimator, benchmarks, faq, cta } = ROI_CALCULATOR;
  return (
    <main className="hm hm-res">
      <section className="hm-section hm-dark hm-phero">
        <div className="hm-dark-bg" aria-hidden="true" />
        <div className="container hm-tool-grid">
          <div>
            <Crumbs crumbs={crumbs} />
            <p className="hm-eyebrow hm-eyebrow-light">{hero.eyebrow} · No email required</p>
            <h1>
              {hero.title} <span className="hm-grad-text">{hero.highlight}</span>
            </h1>
            <p className="hm-lead">{hero.intro}</p>
            <ul className="hm-formula" aria-label="How the estimate is calculated">
              <li>Volume</li>
              <li aria-hidden="true">×</li>
              <li>Minutes</li>
              <li aria-hidden="true">×</li>
              <li>Hourly cost</li>
              <li aria-hidden="true">−</li>
              <li>Review time</li>
            </ul>
          </div>
          <div className="hm-tool">
            <div className="hm-tool-head">
              <span>Automation ROI model</span>
              <b>Uses your numbers</b>
            </div>
            <Estimator inputs={estimator.inputs} unit={estimator.unit} showPayback />
          </div>
        </div>
      </section>

      <section className="hm-section hm-white">
        <div className="container hm-split">
          <header className="hm-head">
            <p className="hm-eyebrow">How to read the result</p>
            <h2>Time back is the useful number. Payback is the decision number.</h2>
          </header>
          <ol className="hm-readsteps">
            {READ_STEPS.map((s, i) => (
              <li key={s.t}>
                <span>{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <b>{s.t}</b>
                  <p>{s.d}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="hm-section hm-paper">
        <div className="container">
          <header className="hm-head">
            <p className="hm-eyebrow">Published Whispers Lab results</p>
            <h2>{benchmarks.title}</h2>
            <p>{benchmarks.intro}</p>
          </header>
          <ul className="hm-closest">
            {benchmarks.rows.map((row, i) => (
              <li key={row.slug}>
                <Link href={`/case-studies/${row.slug}`}>
                  <span className="hm-closest-need">Result {String(i + 1).padStart(2, "0")}</span>
                  <strong>{row.big}</strong>
                  <span className="hm-closest-body">
                    <b>{row.title}</b>
                    <small>{row.detail}</small>
                  </span>
                  <ArrowRight size={18} aria-hidden="true" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <Faq title={faq.title} items={faq.items} />
      <Final
        eyebrow="Turn the estimate into a scope"
        title={cta.title}
        body={cta.body}
        second={{ href: "/resources/ai-readiness-assessment", label: "Check readiness first" }}
      />
      <NewsletterSection variant="home" />
    </main>
  );
}

const SIGNALS = [
  ["01", "Repeatable steps", "The path is mostly known."],
  ["02", "Digital inputs", "The source already lives in software."],
  ["03", "Enough volume", "The task consumes real weekly time."],
  ["04", "Checkable output", "A person can tell right from wrong."],
  ["05", "Named reviewer", "Exceptions have a clear owner."],
  ["06", "Stable process", "The rules are not changing every week."],
];

export function ReadinessPage({ crumbs }: { crumbs: Crumb[] }) {
  return (
    <main className="hm hm-res">
      <section className="hm-section hm-dark hm-phero">
        <div className="hm-dark-bg" aria-hidden="true" />
        <div className="container hm-tool-grid">
          <div>
            <Crumbs crumbs={crumbs} />
            <p className="hm-eyebrow hm-eyebrow-light">Free tool · 3 minutes · one task</p>
            <h1>
              Is this task ready to <span className="hm-grad-text">automate?</span>
            </h1>
            <p className="hm-lead">
              Score one real task against the six conditions that make automation reliable. You get a practical
              verdict, not an AI maturity buzzword.
            </p>
            <div className="hm-actions">
              <Link href="#assessment" className="hm-btn">
                <span>Start the assessment</span>
                <ArrowRight size={16} aria-hidden="true" />
              </Link>
            </div>
          </div>
          <div className="hm-signals" aria-label="The six readiness signals">
            <div className="hm-tool-head">
              <span>Readiness signals</span>
              <b>6 checks</b>
            </div>
            <ul>
              {SIGNALS.map(([n, t, d]) => (
                <li key={n}>
                  <span>{n}</span>
                  <div>
                    <b>{t}</b>
                    <small>{d}</small>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="hm-section hm-white" id="assessment">
        <div className="container hm-split hm-quizsplit">
          <header className="hm-head">
            <p className="hm-eyebrow">Score one task</p>
            <h2>Use the task you wish would disappear first.</h2>
            <p>Answer for the process as it works today, not how you hope it will work after a new system is installed.</p>
          </header>
          <div className="hm-quizcard">
            <ReadinessQuiz questions={READINESS_QUESTIONS} bands={READINESS_BANDS} maxScore={READINESS_MAX_SCORE} />
          </div>
        </div>
      </section>

      <section className="hm-section hm-paper">
        <div className="container">
          <header className="hm-head">
            <p className="hm-eyebrow">How to read the score</p>
            <h2>A low score is a sequence, not a dead end.</h2>
          </header>
          <ul className="hm-bands">
            {READINESS_BANDS.map((b) => (
              <li key={b.verdict}>
                <span>
                  {b.min} to {b.max}
                </span>
                <h3>{b.verdict}</h3>
                <p>{b.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="hm-section hm-white">
        <div className="container hm-split">
          <header className="hm-head">
            <p className="hm-eyebrow">What this tool does not do</p>
            <h2>One task is not the whole operating system.</h2>
          </header>
          <div className="hm-notdo">
            <p>
              The assessment tells you whether one workflow has a good automation shape. It does not compare competing
              workflows, estimate tool costs, or map failure handling.
            </p>
            <p>That is what the discovery call and the audit are for: ranking the opportunities together before anything is built.</p>
          </div>
        </div>
      </section>

      <Faq title={READINESS_FAQ.title} items={READINESS_FAQ.items} />
      <Final
        eyebrow="From score to build plan"
        title={READINESS_CTA.title}
        body={READINESS_CTA.body}
        second={{ href: "/resources/automation-roi-calculator", label: "Estimate the savings" }}
      />
      <NewsletterSection variant="home" />
    </main>
  );
}
