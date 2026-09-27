"use client";

// "What is manual work costing you?" calculator. Value comes from the
// visitor's own inputs, never from invented statistics. The formula is shown.
import { useState } from "react";
import type { EstimatorInput } from "@/app/_content/services";

const money = (n: number) => "$" + Math.round(n).toLocaleString("en-US");

export default function Estimator({ inputs, unit = "docs", showPayback = false }: { inputs: EstimatorInput[]; unit?: string; showPayback?: boolean }) {
  const [v, setV] = useState<Record<string, number>>(Object.fromEntries(inputs.map((i) => [i.id, i.value])));
  const [buildCost, setBuildCost] = useState(2500);
  const get = (id: string) => v[id] ?? 0;

  // Per-item model: items/day × minutes, minus the share flagged for review.
  const now = (get("docs") * get("min") * get("days")) / 60;
  const after = (get("docs") * (get("flag") / 100) * get("rev") * get("days")) / 60;
  const back = Math.max(0, now - after);
  const month = ((back * 52) / 12) * get("rate");
  const payback = month > 0 ? buildCost / month : 0;

  const fmt = (i: EstimatorInput, n: number) => (i.format === "money" ? "$" + n : i.format === "percent" ? n + "%" : String(n));

  return (
    <div className="sv-est">
      <div className="sv-est-in">
        {inputs.map((i) => (
          <div key={i.id} className="sv-field">
            <div className="sv-field-top">
              <label htmlFor={`est-${i.id}`}>{i.label}</label>
              <output htmlFor={`est-${i.id}`}>{fmt(i, get(i.id))}</output>
            </div>
            <input
              id={`est-${i.id}`}
              type="range"
              min={i.min}
              max={i.max}
              step={i.step}
              value={get(i.id)}
              onChange={(e) => setV((p) => ({ ...p, [i.id]: Number(e.target.value) }))}
            />
            {i.hint ? <span className="sv-field-hint">{i.hint}</span> : null}
          </div>
        ))}
      </div>
      <div className="sv-est-out" aria-live="polite">
        <span className="sv-est-k">Estimated time back</span>
        <div className="sv-est-big">{back.toFixed(1)} hrs</div>
        <span className="sv-est-sub">every week, after checking the flagged items</span>
        <div className="sv-est-money">
          <div>
            <b>{money(month)}</b>
            <span>a month</span>
          </div>
          <div>
            <b>{money(month * 12)}</b>
            <span>a year</span>
          </div>
        </div>
        {showPayback ? (
          <>
            <div className="sv-cost-input">
              <label htmlFor="est-build-cost">Estimated implementation cost</label>
              <input id="est-build-cost" type="number" min="0" step="250" value={buildCost} onChange={(e) => setBuildCost(Math.max(0, Number(e.target.value)))} />
            </div>
            <div className="sv-payback">
              <b>{month > 0 ? `${payback.toFixed(1)} months` : "Add a positive time value"}</b>
              Simple payback at the estimated monthly value above. Your Audit quote replaces this placeholder cost.
            </div>
          </>
        ) : null}
        <div className="sv-bars">
          <div className="sv-bar-row">
            <span>Typing now</span>
            <div className="sv-bar-track">
              <div className="sv-bar-fill now" style={{ width: now > 0 ? "100%" : "0%" }} />
            </div>
            <output>{now.toFixed(1)} h/wk</output>
          </div>
          <div className="sv-bar-row">
            <span>Checking after</span>
            <div className="sv-bar-track">
              <div className="sv-bar-fill after" style={{ width: now > 0 ? `${Math.max(1, (after / now) * 100)}%` : "0%" }} />
            </div>
            <output>{after.toFixed(1)} h/wk</output>
          </div>
        </div>
        <p className="sv-formula">
          time back = ({get("docs")} {unit} × {get("min")} min − {get("docs")} × {get("flag")}% × {get("rev")} min) × {get("days")} days ÷ 60 ={" "}
          {back.toFixed(1)} hrs/wk · per month = hrs × 52 ÷ 12 × ${get("rate")}
        </p>
        <p className="sv-est-note">An estimate from your numbers, not a promise. The Automation Audit measures your real volumes before anything is built.</p>
      </div>
    </div>
  );
}
