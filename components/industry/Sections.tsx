// Server-rendered sections unique to the industry template (ported from the
// approved v2 mockup in docs/mockups/law-v2.src.html). Everything else on an
// industry page (hero, week comparison, intake steps, stack, FAQ, CTA) reuses
// the exact same generic components built for the service template.
import { CheckCircle2, KeyRound, ShieldCheck, Wrench } from "lucide-react";
import type { ClosestProofRow, IndustryPage, Moment } from "@/app/_content/industries";

const LAYER_ICONS = [ShieldCheck, CheckCircle2, KeyRound, Wrench];

export function TrustLayers({ trust }: { trust: IndustryPage["trust"] }) {
  return (
    <div>
      <div className="about-principles trust-layers">
        {trust.layers.map((l, i) => {
          const Icon = LAYER_ICONS[i % LAYER_ICONS.length];
          return (
            <article key={i} className="about-principle">
              <span className="about-principle-icon">
                <Icon size={22} strokeWidth={1.8} aria-hidden="true" />
              </span>
              <h3>{l.label}</h3>
              <p>{l.note}</p>
            </article>
          );
        })}
      </div>
      {trust.citation ? (
        <div className="citation-box">
          <span className="citation-badge">
            {trust.citation.badge}
            <small>{trust.citation.badgeSmall}</small>
          </span>
          <div>
            <p>
              {trust.citation.text} <a href={trust.citation.url} target="_blank" rel="noopener">Read the guidance &rarr;</a>
            </p>
            <p className="citation-fine">{trust.citation.fine}</p>
          </div>
        </div>
      ) : null}
      <div className="citation-promises">
        {trust.promises.map((p) => (
          <div key={p.label} className="citation-promise">
            <b>{p.label}</b>
            {p.body}
          </div>
        ))}
      </div>
    </div>
  );
}

export function DayTimeline({ items }: { items: Moment[] }) {
  return (
    <div className="compare-scroll">
      <table className="compare-table">
        <caption className="sr-only">A Monday before and after automation</caption>
        <thead>
          <tr>
            <th scope="col">Time</th>
            <th scope="col">Before</th>
            <th scope="col">After</th>
            <th scope="col">Related service</th>
          </tr>
        </thead>
        <tbody>
          {items.map((m) => (
            <tr key={m.time}>
              <th scope="row">
                {m.time}
                {m.human ? <span className="moment-human"> · still human</span> : null}
              </th>
              <td>{m.before}</td>
              <td>{m.after}</td>
              <td>
                <a href={m.service.href}>{m.service.label} &rarr;</a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function PatternMatchProof({ rows }: { rows: ClosestProofRow[] }) {
  return (
    <div className="match-rows">
      {rows.map((r) => (
        <a key={r.slug} className="match-row" href={`/case-studies/${r.slug}`}>
          <div className="match-need">
            <small>{r.needLabel}</small>
            {r.need}
          </div>
          <span className="match-arrow" aria-hidden="true">
            &rarr;
          </span>
          <div className="match-build">
            <small>We built</small>
            <b>{r.title}</b>
            <span>{r.detail}</span>
          </div>
          <div className="match-metric">
            <span className="sv-mr-n">{r.big}</span>
            <span>{r.bigLabel}</span>
          </div>
        </a>
      ))}
    </div>
  );
}
