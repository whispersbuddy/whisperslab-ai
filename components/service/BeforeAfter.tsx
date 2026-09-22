"use client";

// Drag-to-compare slider. Both panels render as real HTML; the after panel is
// clipped with CSS. The accessible range input drives the handle.
import { useState } from "react";
import type { BaSide } from "@/app/_content/services";

function Side({ side, variant }: { side: BaSide; variant: "before" | "after" }) {
  const good = variant === "after";
  return (
    <div className={`sv-ba-layer sv-ba-${variant}`} aria-hidden={variant === "after" ? "true" : undefined}>
      <div className="sv-ba-top">
        <span className={"sv-pill " + (good ? "green" : "red")}>● {side.time}</span>
        {side.pills.map((p) => (
          <span key={p} className={"sv-pill " + (good ? "green" : "red")}>
            {p}
          </span>
        ))}
      </div>
      <div className="sv-win">
        <h4>{side.table.title}</h4>
        <div className="sv-sheet" style={{ gridTemplateColumns: `1.4fr repeat(${side.table.head.length - 1}, 0.8fr)` }}>
          {side.table.head.map((h) => (
            <span key={h} className="h">
              {h}
            </span>
          ))}
          {side.table.rows.map((r, i) =>
            r.cells.map((c, j) => (
              <span key={`${i}-${j}`} className={j === r.cells.length - 1 && r.status ? r.status : ""}>
                {c}
              </span>
            ))
          )}
          {side.table.footer
            ? side.table.footer.cells.map((c, j) => (
                <span key={`f${j}`} className={"h" + (j === side.table.footer!.cells.length - 1 && side.table.footer!.status ? " " + side.table.footer!.status : "")}>
                  {c}
                </span>
              ))
            : null}
        </div>
      </div>
      <div className="sv-ba-aside">
        {side.aside.kind === "note" ? <div className="sv-win sv-note">{side.aside.text}</div> : null}
        {side.aside.kind === "message" ? (
          <div className="sv-win sv-msg">
            <span className="sv-msg-av" />
            <div>
              <b>{side.aside.channel}</b> · {side.aside.topic ?? "Data entry workflow"}
              <p>{side.aside.text}</p>
              <div className="sv-msg-btns">
                {side.aside.actions.map((a, i) => (
                  <span key={a} className={i === 0 ? "primary" : ""}>
                    {a}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ) : null}
        {side.aside.kind === "mail" ? (
          <div className="sv-win">
            <h4>{side.aside.title}</h4>
            {side.aside.items.map((m) => (
              <p key={m.subject}>
                <b>{m.subject}</b> {m.from}
              </p>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default function BeforeAfter({ before, after }: { before: BaSide; after: BaSide }) {
  const [pos, setPos] = useState(50);
  return (
    <div className="sv-ba" style={{ ["--pos" as string]: `${pos}%` }}>
      <span className="sv-ba-tag l">BEFORE</span>
      <span className="sv-ba-tag r">AFTER</span>
      <Side side={before} variant="before" />
      <Side side={after} variant="after" />
      <input type="range" min={0} max={100} value={pos} onChange={(e) => setPos(Number(e.target.value))} aria-label="Compare before and after" />
      <div className="sv-ba-handle" aria-hidden="true" />
    </div>
  );
}
