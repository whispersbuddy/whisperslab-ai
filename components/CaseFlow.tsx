"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "@/lib/useReducedMotion";

// Animated overview of a case study's "how it works" steps. Plays while it is
// on screen, pauses on demand, and stays static for reduced-motion users.
export default function CaseFlow({ steps }: { steps: string[] }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [inView, setInView] = useState(false);
  const [paused, setPaused] = useState(false);
  const reduced = useReducedMotion();

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.4 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const running = inView && !paused && !reduced;

  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => setActive((a) => (a + 1) % steps.length), 3200);
    return () => clearInterval(id);
  }, [running, steps.length]);

  if (steps.length < 2) return null;

  return (
    <div className="case-flow" ref={rootRef} role="group" aria-label="Animated overview of how this build works">
      <div className="case-flow-head">
        <span className="case-flow-label">SEE IT IN MOTION</span>
        {!reduced ? (
          <button type="button" className="case-flow-toggle" aria-pressed={paused} onClick={() => setPaused((p) => !p)}>
            {paused ? "Play" : "Pause"}
          </button>
        ) : null}
      </div>
      <ol
        className="case-flow-track"
        style={{ "--steps": steps.length, "--gap": steps.length - 1, "--active": active } as React.CSSProperties}
      >
        <span className="case-flow-packet" aria-hidden="true" />
        {steps.map((step, i) => (
          <li key={i} className={i < active ? "is-done" : i === active ? "is-active" : undefined}>
            <button
              type="button"
              className="case-flow-node"
              aria-label={`Step ${i + 1}: ${step}`}
              aria-current={i === active ? "step" : undefined}
              onClick={() => {
                setActive(i);
                setPaused(true);
              }}
            >
              {i + 1}
            </button>
          </li>
        ))}
      </ol>
      <p className="case-flow-stage" key={active}>
        <span className="case-flow-stepno">
          Step {active + 1} of {steps.length}
        </span>
        {steps[active]}
      </p>
      <p className="case-flow-note">An illustration of the steps below. Example flow only, no client data.</p>
    </div>
  );
}
