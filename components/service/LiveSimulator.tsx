"use client";

// Hero demo: pick a mode and watch the workflow run step by step. The finished
// state renders on the server, so crawlers and no-JS visitors see every step.
import { useEffect, useRef, useState } from "react";
import { Play } from "lucide-react";
import type { SimMode } from "@/app/_content/services";

export default function LiveSimulator({ modes }: { modes: SimMode[] }) {
  const [active, setActive] = useState(0);
  const [shown, setShown] = useState<number>(modes[0].steps.length);
  const [running, setRunning] = useState(false);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const mode = modes[active];

  const clear = () => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  };
  useEffect(() => clear, []);

  const run = (index: number) => {
    clear();
    setActive(index);
    const total = modes[index].steps.length;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setShown(total);
      return;
    }
    setShown(0);
    setRunning(true);
    for (let i = 1; i <= total; i++) timers.current.push(setTimeout(() => setShown(i), 350 + (i - 1) * 520));
    timers.current.push(setTimeout(() => setRunning(false), 350 + total * 520));
  };

  return (
    <div className={"sv-sim" + (running ? " running" : "")}>
      <div className="sv-sim-head">
        <span className="sv-live">
          <i aria-hidden="true" />
          LIVE DEMO · SAMPLE DATA
        </span>
        <div className="sv-tabs" role="tablist" aria-label="Demo mode">
          {modes.map((m, i) => (
            <button key={m.key} type="button" role="tab" aria-selected={i === active} onClick={() => run(i)}>
              {m.tab}
            </button>
          ))}
        </div>
      </div>
      <div className="sv-sim-body">
        <div className="sv-sim-in">
          <span className="sv-src">
            <b>{mode.sourceIcon}</b>
            {mode.source}
          </span>
          <div className="sv-thumb" aria-hidden="true">
            <div className="sv-thumb-title">{mode.doc.title}</div>
            {mode.doc.rows.map(([a, b]) => (
              <div key={a} className="sv-thumb-row">
                <span>{a}</span>
                <span>{b}</span>
              </div>
            ))}
            {mode.doc.photos ? (
              <div className="sv-thumb-photos">
                {Array.from({ length: mode.doc.photos }).map((_, i) => (
                  <span key={i} />
                ))}
              </div>
            ) : null}
            {Array.from({ length: mode.doc.lines ?? 0 }).map((_, i) => (
              <div key={i} className="sv-thumb-line" style={{ width: `${88 - i * 9}%` }} />
            ))}
          </div>
        </div>
        <ol className="sv-log" aria-live="polite">
          {mode.steps.map((s, i) => (
            <li key={s.t + i} className={(s.flag ? "flag" : "") + (i >= shown ? " pending" : "") + (running && i === shown - 1 ? " now" : "")}>
              <time>{s.t}</time>
              <span className="sv-dot" aria-hidden="true">
                {s.flag ? "!" : "✓"}
              </span>
              <span dangerouslySetInnerHTML={{ __html: s.text }} />
            </li>
          ))}
        </ol>
      </div>
      <div className="sv-sim-out">
        <div style={{ opacity: running ? 0.3 : 1 }}>
          <div className="sv-out-k">{mode.out.k}</div>
          <div className="sv-out-v">{mode.out.v}</div>
          <div className="sv-out-s">{mode.out.s}</div>
        </div>
        <button type="button" className="sv-run" onClick={() => run(active)} disabled={running}>
          <Play size={12} fill="currentColor" aria-hidden="true" /> Run again
        </button>
      </div>
    </div>
  );
}
