// Server-rendered sections for the service page template (ported from the
// approved v2 mockup in docs/mockups/service-v2.src.html). Interactive pieces
// live in LiveSimulator, BeforeAfter, and Estimator.
import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import type { BentoTile, ServicePage } from "@/app/_content/services";
import type { Crumb } from "@/lib/seo";

export function ServiceHero({ hero, crumbs, children }: { hero: ServicePage["hero"]; crumbs: Crumb[]; children: ReactNode }) {
  return (
    <section className="sv-hero">
      <div className="container sv-hero-grid">
        <div>
          <nav className="sv-crumbs" aria-label="Breadcrumb">
            {crumbs.map((c, i) =>
              i < crumbs.length - 1 ? (
                <span key={c.path}>
                  <a href={c.path}>{c.name}</a>
                  <span aria-hidden="true"> › </span>
                </span>
              ) : (
                <span key={c.path} aria-current="page">
                  {c.name}
                </span>
              )
            )}
          </nav>
          <span className="eyebrow eyebrow-light">{hero.eyebrow}</span>
          <h1>
            {hero.title} <span className="grad-word">{hero.highlight}</span>
          </h1>
          <p className="sv-answer">{hero.answer}</p>
          <div className="sv-actions">
            <a href="/audit" className="btn btn-primary">
              Start with the $250 Audit
            </a>
            <a href={hero.secondaryCta.href} className="btn btn-ghost">
              {hero.secondaryCta.label}
            </a>
          </div>
          <div className="sv-byline">
            <Image src="/assets/haris-ali.jpg" alt="" width={36} height={36} />
            <span>
              Written by <b>Haris Ali</b>, Co-Founder
            </span>
          </div>
        </div>
        <div>{children}</div>
      </div>
    </section>
  );
}

export function ValueStrip({ values }: { values: ServicePage["values"] }) {
  return (
    <section className="sv-values-band">
      <div className="container sv-values">
        {values.map((v, i) => (
          <div key={i} className="sv-vtile">
            <span className="sv-big">{v.big}</span>
            <span className="sv-what">{v.what}</span>
            <span className="sv-from">
              {v.from}. From <a href={v.href}>{v.hrefLabel}</a>
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}

export function SectionHead({ eyebrow, title, intro, light }: { eyebrow: string; title: string; intro?: string; light?: boolean }) {
  return (
    <div className="sv-head">
      <span className={"eyebrow" + (light ? " eyebrow-light" : "")}>{eyebrow}</span>
      <h2>{title}</h2>
      {intro ? <p className="sv-intro">{intro}</p> : null}
    </div>
  );
}

export function DecisionGuide({
  eyebrow,
  title,
  intro,
  goodTitle,
  good,
  cautionTitle,
  caution,
  note,
}: {
  eyebrow: string;
  title: string;
  intro: string;
  goodTitle: string;
  good: string[];
  cautionTitle: string;
  caution: string[];
  note?: string;
}) {
  return (
    <div className="sv-decision">
      <SectionHead eyebrow={eyebrow} title={title} intro={intro} />
      <div>
        <div className="sv-decision-grid">
          <article className="sv-decision-card good">
            <h3>{goodTitle}</h3>
            <ul>
              {good.map((item) => <li key={item}>{item}</li>)}
            </ul>
          </article>
          <article className="sv-decision-card caution">
            <h3>{cautionTitle}</h3>
            <ul>
              {caution.map((item) => <li key={item}>{item}</li>)}
            </ul>
          </article>
        </div>
        {note ? <p className="sv-decision-note">{note}</p> : null}
      </div>
    </div>
  );
}

export function RoiCallout() {
  return (
    <div className="sv-roi-callout">
      <div>
        <span className="eyebrow">CHECK THE ECONOMICS</span>
        <h2>Use your own volume, time, and labor cost.</h2>
        <p>Our free calculator shows the formula, estimated annual value, and simple payback period. No invented industry averages.</p>
      </div>
      <Link className="btn btn-dark" href="/resources/automation-roi-calculator">Calculate your ROI</Link>
    </div>
  );
}

export function Stepper({ steps }: { steps: ServicePage["steps"] }) {
  const pct = (steps.checkpointAfter / steps.items.length) * 100;
  return (
    <>
      <div className="sv-stepper">
        <div className="sv-checkpoint" style={{ left: `calc(${pct}% - 8px)` }} aria-hidden="true">
          <span className="sv-dia">
            <span>YOU</span>
          </span>
          <small>{steps.checkpointLabel}</small>
        </div>
        {steps.items.map((s, i) => (
          <div key={i} className={"sv-step" + (s.ai ? " ai" : "")}>
            <span className="sv-step-n">{i + 1}</span>
            <h3>{s.title}</h3>
            <p>{s.body}</p>
            <span className="sv-step-tools">
              {s.tools.map((t, j) => (
                <span key={j}>{t}</span>
              ))}
            </span>
          </div>
        ))}
      </div>
      <div className="sv-human">
        <span className="sv-human-k">Stays human</span>
        {steps.human.map((h, i) => (
          <span key={i} className="sv-human-c">
            {h}
          </span>
        ))}
      </div>
    </>
  );
}

function Preview({ p }: { p: NonNullable<BentoTile["preview"]> }) {
  switch (p.type) {
    case "table":
      return (
        <div className="sv-prev">
          <div className="sv-mini-table">
            {[...p.head].map((h, i) => (
              <span key={i} className="h">
                {h}
              </span>
            ))}
            {p.rows.map((r, i) => (
              <span key={`${i}-${r.cells[0]}`} className="sv-mini-row">
                {r.cells.map((c, j) => (
                  <span key={j}>{c}</span>
                ))}
                <span className={r.ok ? "ok" : "rv"}>{r.status}</span>
              </span>
            ))}
          </div>
          {p.note ? <div className="sv-ex">{p.note}</div> : null}
        </div>
      );
    case "txns":
      return (
        <div className="sv-prev sv-txns">
          {p.rows.map(([a, b]) => (
            <span key={a} className="sv-txn">
              <span>{a}</span>
              <span>{b}</span>
            </span>
          ))}
        </div>
      );
    case "receipt":
      return (
        <div className="sv-prev sv-receipt">
          <span className="sv-phone" aria-hidden="true" />
          <span>
            <b>{p.amount}</b>
            <br />
            {p.label}
          </span>
        </div>
      );
    case "pdf":
      return (
        <div className="sv-prev sv-pdf">
          <span className="sv-pdf-t">{p.title}</span>
          <span className="sv-pdf-grid" aria-hidden="true">
            {Array.from({ length: 6 }).map((_, i) => (
              <span key={i} />
            ))}
          </span>
          <span className="sv-pdf-note" style={{ width: "92%" }} />
          <span className="sv-pdf-note" style={{ width: "78%" }} />
          <span className="sv-pdf-pages">{p.pages}</span>
        </div>
      );
    case "calendar":
      return (
        <div className="sv-prev">
          <div className="sv-cal" aria-hidden="true">
            {Array.from({ length: 14 }).map((_, i) => (
              <span key={i} className={i + 1 === p.highlight ? "hit" : ""}>
                {i + 1}
              </span>
            ))}
          </div>
          <div className="sv-remind">{p.reminder}</div>
        </div>
      );
    case "counter":
      return (
        <div className="sv-counter">
          {p.from.toLocaleString("en-US")} → 0<small>{p.label}</small>
          <span className="sv-ex">Example count</span>
        </div>
      );
  }
}

export function Bento({ tiles }: { tiles: BentoTile[] }) {
  const areas = ["a", "b", "c", "d", "e", "f"];
  return (
    <div className="sv-bento">
      {tiles.map((t, i) => (
        <article key={i} className={`sv-tile sv-tile-${areas[i]}`}>
          <div className="sv-tile-head">
            <span className="sv-tile-verb">{t.verb}</span>
            <h3>{t.title}</h3>
            {t.body ? <p>{t.body}</p> : null}
          </div>
          {t.preview ? <Preview p={t.preview} /> : null}
        </article>
      ))}
    </div>
  );
}

export function ResultStory({ proof }: { proof: ServicePage["proof"] }) {
  const f = proof.featured;
  return (
    <>
      <div className="sv-story">
        <div>
          <span className="eyebrow">RESULT STORY</span>
          <div className="sv-mega">{f.big}</div>
          <div className="sv-mega-l">{f.bigLabel}</div>
          <h3>{f.title}</h3>
          <div className="sv-ba-strip">
            <div className="b">
              <b>Before</b>
              {f.before}
            </div>
            <div className="a">
              <b>After</b>
              {f.after}
            </div>
          </div>
          <div className="sv-chips">
            {f.chips.map((c, i) => (
              <span key={i}>{c}</span>
            ))}
          </div>
          <a className="sv-go" href={`/case-studies/${f.slug}`}>
            Read the full story →
          </a>
        </div>
        <figure className="sv-frame">
          <div className="sv-frame-bar" aria-hidden="true">
            <i />
            <i />
            <i />
          </div>
          <div className="sv-frame-scr" aria-hidden="true">
            {Array.from({ length: 7 }).map((_, i) => (
              <div key={i}>
                <span />
                <span />
                <span />
              </div>
            ))}
          </div>
          <figcaption>{f.caption}</figcaption>
        </figure>
      </div>
      {proof.more.length ? (
        <div className="sv-more">
          {proof.more.map((m) => (
            <a key={m.slug} className="sv-mr" href={`/case-studies/${m.slug}`}>
              <span className="sv-mr-n">{m.big}</span>
              <span>
                <b>{m.title}</b>
                <span>{m.detail}</span>
              </span>
            </a>
          ))}
        </div>
      ) : null}
    </>
  );
}

export function StackHub({ stack }: { stack: ServicePage["stack"] }) {
  const cx = 300,
    cy = 210,
    rx = 230,
    ry = 160;
  const nodes = stack.tools.map((name, i) => {
    const a = -Math.PI / 2 + (i * 2 * Math.PI) / stack.tools.length;
    return { name, x: cx + rx * Math.cos(a), y: cy + ry * Math.sin(a) };
  });
  return (
    <div className="sv-hub">
      <div>
        <span className="eyebrow">WORKS WITH YOUR STACK</span>
        <h2>{stack.title}</h2>
        <p className="sv-intro">{stack.intro}</p>
        <div className="sv-int-links">
          {stack.links.map((l) => (
            <a key={l.href} href={l.href}>
              {l.label}
            </a>
          ))}
        </div>
      </div>
      <svg viewBox="0 0 600 420" role="img" aria-label={`Tools connected to ${stack.center.toLowerCase()}: ${stack.tools.join(", ")}`}>
        {nodes.map((n) => (
          <line key={"l" + n.name} x1={cx} y1={cy} x2={n.x} y2={n.y} className="sv-spoke" />
        ))}
        <circle cx={cx} cy={cy} r={66} fill="rgba(128,65,255,.12)" />
        <circle cx={cx} cy={cy} r={54} className="sv-core" />
        <text x={cx} y={cy + 5} textAnchor="middle" className="sv-core-t">
          {stack.center}
        </text>
        {nodes.map((n) => {
          const w = n.name.length * 7.4 + 24;
          return (
            <g key={n.name} className="sv-hn">
              <rect x={n.x - w / 2} y={n.y - 16} width={w} height={32} rx={16} />
              <text x={n.x} y={n.y + 4.5} textAnchor="middle">
                {n.name}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

export function FaqSplit({ faq }: { faq: ServicePage["faq"] }) {
  return (
    <div className="sv-faq2">
      <div className="sv-faq-left">
        <span className="eyebrow">CLEARING THE AIR</span>
        <h2>{faq.title}</h2>
        <div className="sv-ask">
          <Image src="/assets/haris-ali.jpg" alt="Haris Ali" width={48} height={48} />
          <div>
            <b>Still not sure?</b>
            <a href="/book">Ask Haris on a free discovery call →</a>
          </div>
        </div>
      </div>
      <div className="faq-list sv-faq-list">
        {faq.items.map((f, i) => (
          <details key={f.q} className="faq-item" open={i === 0}>
            <summary className="faq-question">
              {f.q}
              <span className="faq-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none">
                  <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </span>
            </summary>
            <p className="faq-answer">{f.a}</p>
          </details>
        ))}
      </div>
    </div>
  );
}

const DELIVERABLES = [
  { day: "DAYS 1 TO 2", name: "Automation Readiness Scorecard", bars: [40, 70, 55, 85] },
  { day: "DAYS 3 TO 4", name: "Visual Workflow Map", bars: [30, 30, 30, 30] },
  { day: "DAYS 5 TO 6", name: "Automation Priority Matrix", bars: [90, 60, 35, 20] },
  { day: "DAY 7", name: "Execution Blueprint", bars: [50, 65, 80, 100] },
];

export function CtaAudit({ cta }: { cta: ServicePage["cta"] }) {
  return (
    <section className="section sv-dark sv-cta">
      <div className="container sv-cta-grid">
        <div>
          <span className="eyebrow eyebrow-light">READY WHEN YOU ARE</span>
          <h2>{cta.title}</h2>
          <p className="sv-intro">{cta.body}</p>
          <div className="sv-actions">
            <a href="/audit" className="btn btn-primary">
              Book Your Audit ($250)
            </a>
            <a href="/book" className="btn btn-ghost">
              Book a free discovery call
            </a>
          </div>
        </div>
        <div className="sv-deliv" aria-label="What the Automation Audit delivers">
          {DELIVERABLES.map((d) => (
            <div key={d.name} className="sv-dv">
              <span className="sv-dv-day">{d.day}</span>
              <b>{d.name}</b>
              <div className="sv-dv-viz" aria-hidden="true">
                {d.bars.map((h, i) => (
                  <i key={i} style={{ height: `${h}%` }} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
