"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import type { FlowDef } from "@/app/_content/caseFlows";
import { toolLogo } from "@/lib/toolLogos";
import { useReducedMotion } from "@/lib/useReducedMotion";

const HOP_MS = 800;
const HOLD_MS = 1800;

const pairKey = (a: string, b: string) => [a, b].sort().join("|");
const initials = (tool: string) =>
  tool
    .split(/\s+/)
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

// Tool-by-tool workflow diagram for a case study. A dot travels between the
// real tools in each step while the plain-words sentence for that step shows
// underneath. Plays while on screen; static for reduced-motion users.
export default function CaseFlowDiagram({ steps, flow }: { steps: string[]; flow: FlowDef }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [cursor, setCursor] = useState({ step: 0, hop: 0 });
  const [inView, setInView] = useState(false);
  const [paused, setPaused] = useState(false);
  const reduced = useReducedMotion();
  const running = inView && !paused && !reduced;

  const nodeById = useMemo(() => new Map(flow.nodes.map((n) => [n.id, n])), [flow]);
  const edges = useMemo(() => {
    const seen = new Map<string, [string, string]>();
    flow.steps.forEach(({ path }) => {
      for (let i = 0; i < path.length - 1; i++) seen.set(pairKey(path[i], path[i + 1]), [path[i], path[i + 1]]);
    });
    return [...seen.entries()];
  }, [flow]);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.4 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!running) return;
    const path = flow.steps[cursor.step].path;
    const timers: ReturnType<typeof setTimeout>[] = [];
    timers.push(setTimeout(() => setCursor((c) => ({ ...c, hop: 0 })), 0));
    for (let k = 1; k < path.length; k++) {
      timers.push(setTimeout(() => setCursor((c) => ({ ...c, hop: k })), k * HOP_MS));
    }
    timers.push(
      setTimeout(() => setCursor({ step: (cursor.step + 1) % steps.length, hop: 0 }), (path.length - 1) * HOP_MS + HOLD_MS),
    );
    return () => timers.forEach(clearTimeout);
  }, [running, cursor.step, flow, steps.length]);

  const path = flow.steps[cursor.step].path;
  const hop = running ? cursor.hop : path.length - 1;
  const reached = new Set(path.slice(0, hop + 1));
  const onEdges = new Set<string>();
  for (let i = 0; i < hop; i++) onEdges.add(pairKey(path[i], path[i + 1]));
  const here = nodeById.get(path[hop]);

  return (
    <div className="case-flow case-flow--diagram" ref={rootRef}>
      <div className="case-flow-head">
        <span className="case-flow-label">SEE IT IN MOTION</span>
        {!reduced ? (
          <button type="button" className="case-flow-toggle" aria-pressed={paused} onClick={() => setPaused((p) => !p)}>
            {paused ? "Play" : "Pause"}
          </button>
        ) : null}
      </div>

      <div className="cf-scroll">
      <div className="cf-diagram" role="group" aria-label={`Workflow diagram: ${flow.nodes.map((n) => n.tool).join(", ")}`}>
        <svg className="cf-lines" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
          {edges.map(([key, [a, b]]) => {
            const na = nodeById.get(a);
            const nb = nodeById.get(b);
            if (!na || !nb) return null;
            return <line key={key} x1={na.x} y1={na.y} x2={nb.x} y2={nb.y} className={onEdges.has(key) ? "is-on" : undefined} />;
          })}
        </svg>
        {here ? <span className="cf-packet" aria-hidden="true" style={{ "--x": `${here.x}%`, "--y": `${here.y}%` } as React.CSSProperties} /> : null}
        {flow.nodes.map((n) => {
          const logo = toolLogo(n.tool);
          return (
            <div
              key={n.id}
              className={`cf-node${reached.has(n.id) ? " is-on" : ""}${here?.id === n.id ? " is-here" : ""}`}
              style={{ "--x": `${n.x}%`, "--y": `${n.y}%` } as React.CSSProperties}
            >
              <span className="cf-logo">
                {logo ? <Image src={logo} alt="" width={30} height={30} unoptimized /> : <span className="cf-mono">{n.mono ?? initials(n.tool)}</span>}
              </span>
              {n.href ? (
                <Link href={n.href} className="cf-name">
                  {n.tool}
                </Link>
              ) : (
                <span className="cf-name">{n.tool}</span>
              )}
              <span className="cf-role">{n.role}</span>
            </div>
          );
        })}
      </div>
      </div>

      <div className="cf-steps">
        {steps.map((step, i) => (
          <button
            key={i}
            type="button"
            className={`cf-step${i === cursor.step ? " is-active" : ""}`}
            aria-label={`Step ${i + 1}: ${step}`}
            aria-current={i === cursor.step ? "step" : undefined}
            onClick={() => {
              setCursor({ step: i, hop: 0 });
              setPaused(true);
            }}
          >
            {i + 1}
          </button>
        ))}
      </div>

      <p className="case-flow-stage" key={cursor.step}>
        <span className="case-flow-stepno">
          Step {cursor.step + 1} of {steps.length}
        </span>
        {steps[cursor.step]}
      </p>
      <p className="case-flow-note">An illustration of the steps below. Example flow only, no client data.</p>
    </div>
  );
}
