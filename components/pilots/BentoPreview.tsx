import type { BentoPreview as BentoPreviewData } from "@/app/_content/services";

// Small illustrative visual for a bento tile (transaction list, receipt,
// generated PDF, calendar reminder, or before/after counter). Ported from
// the pre-redesign components/service/Sections.tsx, which is no longer
// rendered anywhere, so this preview data wasn't showing up on any page.
// Callers only render this when tile.preview is set (see ExpansionPilots.tsx).
export default function BentoPreview({ p }: { p: BentoPreviewData }) {
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
        <div className="sv-prev">
          <div className="sv-counter">
            {p.from.toLocaleString("en-US")} → 0<small>{p.label}</small>
            <span className="sv-ex">Example count</span>
          </div>
        </div>
      );
  }
}
