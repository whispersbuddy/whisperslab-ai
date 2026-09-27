// Content for the two standalone /resources pages. These are lead-magnet
// tools, not funnel pages, so they're simpler than the service/industry
// template: a calculator or a quiz, an explanation, a short FAQ, and a CTA.
//
// House rules: plain words, no em dashes, no hype, no "AI agents", and any
// benchmark numbers shown are real published case study results, never
// invented averages or industry stats.

import type { EstimatorInput } from "@/app/_content/services";
import type { QuizBand, QuizQuestion } from "@/components/resources/ReadinessQuiz";

export const ROI_CALCULATOR = {
  seo: {
    title: "Automation ROI Calculator | Whispers Lab",
    description:
      "Free tool: see how many hours and dollars manual work is costing you each week, and what a fixed-price automation build would give back.",
    keyword: "automation roi calculator",
  },
  hero: {
    eyebrow: "FREE TOOL",
    title: "See what manual work is really",
    highlight: "costing you.",
    intro: "Move the sliders to match any repetitive task. The math is shown, and nothing here comes from us except the formula.",
  },
  estimator: {
    eyebrow: "Your numbers",
    title: "What is one repetitive task costing you?",
    intro: "Pick any task your team does the same way every day, like data entry, follow-ups, or reconciling numbers.",
    unit: "tasks",
    inputs: [
      { id: "docs", label: "Repetitive tasks handled by hand per day", min: 5, max: 200, step: 5, value: 30 },
      { id: "min", label: "Minutes per task, done by hand", min: 1, max: 20, step: 1, value: 5 },
      { id: "days", label: "Working days per week", min: 1, max: 7, step: 1, value: 5 },
      { id: "rate", label: "Hourly cost of that time", min: 15, max: 150, step: 5, value: 35, hint: "Wages plus overhead, or your own hourly value", format: "money" },
      { id: "flag", label: "Share still needing a person to double check", min: 0, max: 50, step: 5, value: 10, format: "percent" },
      { id: "rev", label: "Minutes to check one of those", min: 1, max: 10, step: 1, value: 2 },
    ] as EstimatorInput[],
    worth: ["Worth it once the same task happens every day", "When the task already lives in software, not just paper", "When checking beats doing the task by hand"],
  },
  benchmarks: {
    eyebrow: "For comparison",
    title: "What real Whispers Lab builds have saved",
    intro: "Not averages or industry stats. These are the actual results from our published case studies.",
    rows: [
      { slug: "ai-catalog-content-engine", big: "~22 hrs", title: "The AI Catalog & Content Engine", detail: "saved weekly · catalog cleanup and translation" },
      { slug: "lead-sales-engine", big: "~15 hrs", title: "The Lead Sales Engine That Runs Itself", detail: "saved weekly · lead sourcing and delivery" },
      { slug: "financial-document-reader", big: "~15 hrs", title: "The Financial Document Reader", detail: "saved weekly · bank statement reading" },
      { slug: "zero-double-entry-financial-pipeline", big: "~10 hrs", title: "The Zero Double-Entry Financial Pipeline", detail: "saved weekly · customer and invoice sync" },
      { slug: "onboarding-pipeline-autopilot", big: "~5 hrs", title: "The Onboarding Pipeline That Runs on Autopilot", detail: "saved weekly · client scheduling and intake" },
    ],
  },
  faq: {
    title: "Questions about this calculator",
    items: [
      {
        q: "How is the number on this calculator worked out?",
        a: "It multiplies how many times a task happens by how long it takes, then subtracts the time you would still spend checking the share of results that need a person. The formula is shown under the result. It is an estimate from your own numbers, not a promise.",
      },
      {
        q: "Does this include the cost of building the automation?",
        a: "No. This calculator only estimates the time and money a manual task costs you now. The $250 Automation Audit gives you an actual build price, and most Core Build projects start from $2,500, so you can compare that against what the calculator shows.",
      },
      {
        q: "What if my task doesn't fit neatly into these sliders?",
        a: "Use your best honest estimate. Most repetitive tasks, from data entry to follow-ups to reconciling numbers, fit this shape well enough to get a useful starting number. The Automation Audit measures your real volumes before anything is built.",
      },
      {
        q: "Is a task worth automating if the number is small?",
        a: "Sometimes. A small number here can still be worth fixing if the task is error-prone, blocks other work, or happens at a bad time, like late at night or right before a deadline. The number is one input, not the only one.",
      },
      {
        q: "How do I turn this into an actual plan?",
        a: "Start with the $250 Automation Audit. In 7 days you get a ranked plan of what to automate first, using your real numbers instead of slider estimates. Build it with us and the $250 is credited.",
      },
      {
        q: "Do you save what I enter into the calculator?",
        a: "No. The calculator runs in your browser and nothing you enter is sent to us or stored.",
      },
    ],
  },
  cta: {
    title: "Turn this estimate into a real plan.",
    body: "In 7 days, the Automation Audit measures your actual volumes and hands you a build plan you keep either way. Build it with us and the $250 is credited.",
  },
};

export const READINESS_QUESTIONS: QuizQuestion[] = [
  {
    q: "How does this task get done each time?",
    options: [
      { label: "The exact same steps, every time", points: 2 },
      { label: "Mostly the same, with some judgment calls", points: 1 },
      { label: "It's different every time", points: 0 },
    ],
  },
  {
    q: "Where does the data for this task live?",
    options: [
      { label: "In one piece of software", points: 2 },
      { label: "Spread across two or three tools", points: 2 },
      { label: "On paper, or in someone's head", points: 0 },
    ],
  },
  {
    q: "How many hours a week does it take your team?",
    options: [
      { label: "Less than 2 hours", points: 0 },
      { label: "2 to 5 hours", points: 1 },
      { label: "More than 5 hours", points: 2 },
    ],
  },
  {
    q: "Could someone check the result in a minute or two?",
    options: [
      { label: "Yes, easily", points: 2 },
      { label: "It would take some digging", points: 1 },
      { label: "No, it needs real expertise every time", points: 0 },
    ],
  },
  {
    q: "Is there someone who could approve or review flagged items?",
    options: [
      { label: "Yes, that person already exists", points: 2 },
      { label: "Maybe, it would need to be set up", points: 1 },
      { label: "No", points: 0 },
    ],
  },
  {
    q: "Has this task stayed roughly the same for the last few months?",
    options: [
      { label: "Yes, it's stable", points: 2 },
      { label: "It changes sometimes", points: 1 },
      { label: "It's changing constantly right now", points: 0 },
    ],
  },
];

export const READINESS_MAX_SCORE = 12;

export const READINESS_BANDS: QuizBand[] = [
  {
    min: 9,
    max: 12,
    verdict: "Ready to start",
    body: "This task has the shape of ones we automate most often: repeatable, already in software, and with someone able to check the result. The $250 Automation Audit is the fastest way to turn this into a real plan.",
    cta: { label: "See the $250 Automation Audit", href: "/audit" },
  },
  {
    min: 5,
    max: 8,
    verdict: "Close, with a few things to sort out first",
    body: "Parts of this task are ready to automate, and parts need a bit of work first, like moving off paper or settling on one set of steps. The Automation Audit will tell you honestly what to fix before a build, and what can start now.",
    cta: { label: "See the $250 Automation Audit", href: "/audit" },
  },
  {
    min: 0,
    max: 4,
    verdict: "Not quite yet",
    body: "This task is still changing too much, or too much of it depends on someone's judgment, to automate well right now. Standardizing the steps first will make it a much better candidate. Our newsletter sends one task to fix each week.",
    cta: { label: "Get the weekly newsletter", href: "/#framework" },
  },
];

export const READINESS_SEO = {
  title: "AI Readiness Assessment | Whispers Lab",
  description:
    "A free 3-minute quiz that scores how ready your business is to automate a task, and what to fix first if it is not ready yet.",
  keyword: "ai readiness assessment",
};

export const READINESS_FAQ = {
  title: "Questions about this assessment",
  items: [
    {
      q: "What does this assessment actually measure?",
      a: "It scores one task, not your whole business, against six things that make automation work well: consistent steps, data that already lives in software, real hours spent, an easy way to check the result, someone able to approve flagged items, and a task that isn't changing every week.",
    },
    {
      q: "What if different tasks get different scores?",
      a: "That's expected, and useful. Most businesses have a mix of highly automatable tasks and ones that need work first. The $250 Automation Audit ranks all of them together, not just the one you scored here.",
    },
    {
      q: "I scored low. Does that mean automation won't work for my business?",
      a: "No, it means this particular task isn't ready yet, usually because the steps still vary too much or too much depends on paper or memory. Standardizing the process first, even without any software, often turns a low score into a high one.",
    },
    {
      q: "How is this different from the Automation Audit?",
      a: "This assessment is a free, 3-minute self-check on one task. The $250 Automation Audit is a 7-day deep dive across your whole business, done by us, that ends in a ranked, priced build plan.",
    },
    {
      q: "Is this assessment specific to any industry?",
      a: "No, it works the same way for any small business. The six questions apply whether the task is data entry, client onboarding, lead follow-up, or bookkeeping.",
    },
    {
      q: "Do you save my answers?",
      a: "No. The assessment runs in your browser and your answers aren't sent to us or stored.",
    },
  ],
};

export const READINESS_CTA = {
  title: "Ready for the real plan?",
  body: "In 7 days, the Automation Audit maps your actual workflows and hands you a ranked, priced build plan you keep either way. Build it with us and the $250 is credited.",
};
