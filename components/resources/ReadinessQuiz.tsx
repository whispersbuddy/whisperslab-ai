"use client";

// AI Readiness Assessment quiz. Server-rendered questions and options so
// crawlers and no-JS visitors see every question; the score and verdict
// reveal client-side once every question is answered.
import { useState } from "react";

export type QuizOption = { label: string; points: number };
export type QuizQuestion = { q: string; options: QuizOption[] };
export type QuizBand = { min: number; max: number; verdict: string; body: string; cta: { label: string; href: string } };

export default function ReadinessQuiz({ questions, bands, maxScore }: { questions: QuizQuestion[]; bands: QuizBand[]; maxScore: number }) {
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [revealed, setRevealed] = useState(false);
  const answeredCount = Object.keys(answers).length;
  const allAnswered = answeredCount === questions.length;
  const score = Object.values(answers).reduce((s, p) => s + p, 0);
  const band = bands.find((b) => score >= b.min && score <= b.max) ?? bands[bands.length - 1];

  const pick = (qi: number, points: number) => {
    setAnswers((a) => ({ ...a, [qi]: points }));
    setRevealed(false);
  };

  return (
    <div className="quiz">
      <div className="quiz-questions">
        {questions.map((q, qi) => (
          <fieldset key={qi} className="quiz-q">
            <legend>
              <span className="quiz-q-n">{qi + 1}</span>
              {q.q}
            </legend>
            <div className="quiz-opts" role="radiogroup" aria-label={q.q}>
              {q.options.map((o, oi) => (
                <button
                  key={oi}
                  type="button"
                  role="radio"
                  aria-checked={answers[qi] === o.points}
                  className={"quiz-opt" + (answers[qi] === o.points ? " sel" : "")}
                  onClick={() => pick(qi, o.points)}
                >
                  {o.label}
                </button>
              ))}
            </div>
          </fieldset>
        ))}
      </div>
      <div className="quiz-result">
        <button type="button" className="btn btn-primary" disabled={!allAnswered} onClick={() => setRevealed(true)}>
          {allAnswered ? "See your result" : `Answer all ${questions.length} questions (${answeredCount}/${questions.length})`}
        </button>
        {revealed ? (
          <div className="quiz-verdict" aria-live="polite">
            <span className="quiz-score">
              {score}/{maxScore}
            </span>
            <h3>{band.verdict}</h3>
            <p>{band.body}</p>
            <a className="btn btn-primary" href={band.cta.href}>
              {band.cta.label}
            </a>
          </div>
        ) : null}
      </div>
    </div>
  );
}
