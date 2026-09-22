// Content for /industries/[slug] pages. Structurally different from the
// service/integration template on purpose: most industries have no direct
// case study yet, so proof is shown as "closest builds" (a real result from
// a different industry that solved the same shape of problem), never
// presented as if it happened in this industry. See sections.pattern-match-proof
// in docs/mockups/law-v2.src.html for the source design.
//
// House rules for copy: plain words (grade 6 to 8), no em dashes, no hype,
// no "AI agents", no "AI steps run through business API accounts" (removed
// per the approved plan), and only numbers that come from published case
// studies or verified external sources (cited in the FAQ/trust section).

import type { BaSide, ServicePage } from "@/app/_content/services";

export type Moment = {
  time: string;
  before: string;
  after: string;
  /** True if this moment still needs a person even in the "after" version. */
  human: boolean;
  service: { label: string; href: string };
};

export type ClosestProofRow = {
  needLabel: string;
  need: string;
  slug: string;
  title: string;
  detail: string;
  big: string;
  bigLabel: string;
};

export type IndustryPage = {
  slug: string;
  seo: { title: string; description: string; keyword: string };
  hero: { eyebrow: string; title: string; highlight: string; answer: string; secondaryCta: { label: string; href: string } };
  week: { eyebrow: string; title: string; intro: string; before: BaSide; after: BaSide; table: { row: string; before: string; after: string }[] };
  moments: { eyebrow: string; title: string; intro: string; items: Moment[] };
  intake: ServicePage["steps"];
  trust: {
    eyebrow: string;
    title: string;
    layers: { label: string; note: string }[];
    citation: { badge: string; badgeSmall: string; text: string; url: string; fine: string };
    promises: { label: string; body: string }[];
  };
  estimator: ServicePage["estimator"];
  proof: { eyebrow: string; title: string; intro: string; rows: ClosestProofRow[] };
  stack: ServicePage["stack"];
  faq: ServicePage["faq"];
  cta: ServicePage["cta"];
  related: { services: string[]; posts: string[] };
};

export const INDUSTRIES: IndustryPage[] = [
  {
    slug: "law-firms",
    seo: {
      title: "Law Firm Automation for Small Firms | Whispers Lab",
      description:
        "Law firm automation that handles intake, conflict prep, and status updates, while attorneys keep every legal decision. See the live intake demo.",
      keyword: "law firm automation",
    },
    hero: {
      eyebrow: "Industry · Law firms",
      title: "Law firm automation that keeps",
      highlight: "the lawyering human.",
      answer:
        "Law firm automation handles the administrative work around a matter: answering and routing new inquiries, preparing conflict searches, drafting engagement letters from your templates, chasing signatures, and sending status updates. Attorneys still make every legal decision. The system prepares the work and stops for a lawyer wherever judgment is needed.",
      secondaryCta: { label: "Try the intake demo", href: "#intake" },
    },
    week: {
      eyebrow: "A Monday at a small firm",
      title: "What does a week look like before and after?",
      intro: "One attorney's illustrative week. Nothing here is a measured result, just what the hours look like both ways.",
      before: {
        time: "Week of admin hours",
        pills: ["21 of 45 working hours on admin", "0 hours back to client work"],
        table: {
          title: "This week, by hand",
          head: ["Day", "Admin hours", "Biggest task"],
          rows: [
            { cells: ["Mon", "5", "Conflict checks, status calls"], status: "bad" },
            { cells: ["Tue", "4", "New inquiries, signatures"], status: "bad" },
            { cells: ["Wed", "5", "Conflict checks, billing"], status: "bad" },
            { cells: ["Thu", "4", "Status calls, chasing"], status: "bad" },
          ],
          footer: { cells: ["21 hrs", "of 45", ""], status: "bad" },
        },
        aside: { kind: "note", text: "Almost half the week before touching a matter." },
      },
      after: {
        time: "Week of admin hours",
        pills: ["6 of 45 working hours on admin", "15 hours back to client work"],
        table: {
          title: "This week, automated",
          head: ["Day", "Admin hours", "Biggest task"],
          rows: [
            { cells: ["Mon", "1", "Reviewing 1 flagged conflict"], status: "ok" },
            { cells: ["Tue", "1", "Approving 2 draft letters"], status: "ok" },
            { cells: ["Wed", "2", "Reviewing flagged conflicts"], status: "ok" },
            { cells: ["Thu", "1", "Approving a decline"], status: "ok" },
          ],
        },
        aside: { kind: "message", channel: "#intake", topic: "Conflict review", text: "1 possible match waiting on M. Chen. Everything else cleared automatically.", actions: ["Review", "Clear"] },
      },
      table: [
        { row: "Inquiries", before: "Read, replied to, and summarized by hand", after: "Acknowledged at once, summarized for the attorney" },
        { row: "Conflict checks", before: "Searched across three systems and a spreadsheet", after: "Searched automatically, a match waits for a lawyer" },
        { row: "Status updates", before: "\"Any update?\" calls answered one at a time", after: "Sent automatically when a matter moves" },
        { row: "Signatures", before: "Chased by email, again and again", after: "Reminders go out on their own until signed" },
      ],
    },
    moments: {
      eyebrow: "One ordinary Monday",
      title: "Which law firm tasks can be automated?",
      intro: "Six moments from a small firm's Monday. The amber ones still wait for an attorney, even after automation.",
      items: [
        { time: "8:10 AM", before: "Finds Sunday's 9:47 PM web inquiry. The prospect has already booked with another firm.", after: "That inquiry was acknowledged Sunday at 9:47 PM, and a summary is waiting in the intake queue.", human: false, service: { label: "Lead Follow-Up Automation", href: "/services/lead-follow-up-automation" } },
        { time: "9:30 AM", before: "Checks names in the practice management tool, an old spreadsheet, and a partner's memory.", after: "The conflict search ran overnight. One possible match is waiting for an attorney.", human: true, service: { label: "Software Integration Services", href: "/services/software-integration-services" } },
        { time: "11:00 AM", before: "Two clients call to ask, \"Any update on my case?\"", after: "Both received a stage update automatically when their matters moved last week.", human: false, service: { label: "Client Onboarding Automation", href: "/services/client-onboarding-automation" } },
        { time: "1:30 PM", before: "Builds an engagement letter from an old Word file.", after: "A draft from your approved template is waiting for attorney approval.", human: true, service: { label: "Data Entry Automation", href: "/services/data-entry-automation" } },
        { time: "3:00 PM", before: "Emails a third reminder about the unsigned letter.", after: "The e-signature reminder went out on its own. Signed at 2:12 PM.", human: false, service: { label: "Client Onboarding Automation", href: "/services/client-onboarding-automation" } },
        { time: "5:45 PM", before: "Writes invoice reminders before leaving.", after: "Reminders with payment links went out at 9 AM.", human: false, service: { label: "Bookkeeping Automation", href: "/services/bookkeeping-automation" } },
      ],
    },
    intake: {
      eyebrow: "Try it",
      title: "How does automated legal intake work?",
      items: [
        { title: "Acknowledge", body: "A reply goes out at once, any hour, with no legal information in it.", tools: ["Web form"] },
        { title: "Summarize", body: "Practice area, every name mentioned, and any urgent dates get written up for the attorney.", tools: ["AI summary"], ai: true },
        { title: "Search", body: "Every name is checked against clients, former clients, and adverse parties.", tools: ["Your practice management tool"] },
        { title: "Stop for a lawyer", body: "A possible match waits for an attorney. Nothing substantive goes out until a person decides.", tools: ["Attorney review"] },
      ],
      checkpointAfter: 3,
      checkpointLabel: "Attorney decision needed",
      human: ["Every conflict decision", "Anything substantive sent to a prospect or client", "Legal advice of any kind", "Court deadlines and filings", "Trust accounting"],
    },
    trust: {
      eyebrow: "Confidentiality & ethics",
      title: "How is client confidentiality protected?",
      layers: [
        { label: "Attorney sign-off", note: "on anything substantive before it goes out" },
        { label: "Every action logged", note: "linked back to its source, so it can be checked" },
        { label: "Least access", note: "each workflow only reaches the data it needs" },
        { label: "Your systems", note: "tools your firm already controls, nothing new to trust" },
      ],
      citation: {
        badge: "ABA",
        badgeSmall: "Op. 512",
        text: "In Formal Opinion 512, released July 29, 2024, the ABA's Standing Committee on Ethics and Professional Responsibility said lawyers using generative AI must consider their duties of competence, confidentiality, client communication, and reasonable fees. Those duties stay with your firm. We build so they are easier to meet, and show you exactly where AI is used.",
        url: "https://www.americanbar.org/news/abanews/aba-news-archives/2024/07/aba-issues-first-ethics-guidance-ai-tools/",
        fine: "General information, not legal advice. Check your state bar's guidance too.",
      },
      promises: [
        { label: "Your templates", body: "Letters and updates use wording your firm approved, not a generic script." },
        { label: "Prospects count too", body: "Intake details get the same care as an existing client's file." },
      ],
    },
    estimator: {
      eyebrow: "Your numbers",
      title: "What does the admin cost your firm each week?",
      intro: "Set these to an honest guess for your firm. Nothing here comes from us except the math.",
      unit: "tasks",
      inputs: [
        { id: "docs", label: "Intake, conflict, update, and signature tasks per day", min: 1, max: 40, step: 1, value: 8 },
        { id: "min", label: "Average minutes per task", min: 2, max: 30, step: 1, value: 12 },
        { id: "days", label: "Working days per week", min: 1, max: 7, step: 1, value: 5 },
        { id: "rate", label: "Hourly cost of the person doing it", min: 20, max: 300, step: 10, value: 60, hint: "Attorney, paralegal, or legal assistant time", format: "money" },
        { id: "flag", label: "Share that still needs a person, even after automation", min: 10, max: 90, step: 5, value: 30, format: "percent" },
        { id: "rev", label: "Minutes to review or decide on one of those", min: 1, max: 20, step: 1, value: 5 },
      ],
      worth: ["Worth it once conflict checks span more than one system", "When \"any update?\" calls happen every week", "When signatures need more than one reminder to land"],
    },
    proof: {
      eyebrow: "Proof · Closest builds",
      title: "Our published case studies are not from law firms. These solved the same problems elsewhere.",
      intro: "No law firm case study exists yet, so here is the closest real build for each shape of need.",
      rows: [
        { needLabel: "Your firm needs", need: "Consults booked with intake finished first", slug: "onboarding-pipeline-autopilot", title: "The Onboarding Pipeline That Runs on Autopilot", detail: "Coaching · clients book themselves and arrive with intake forms done", big: "~5 hrs", bigLabel: "saved weekly" },
        { needLabel: "Your firm needs", need: "Client history out of one partner's inbox", slug: "crm-that-fills-itself-in", title: "The CRM That Fills Itself In", detail: "Education · emails and meetings log themselves to the right record", big: "~6 hrs", bigLabel: "saved weekly" },
        { needLabel: "Your firm needs", need: "One client's data never visible to another", slug: "financial-document-reader", title: "The Financial Document Reader", detail: "Financial services · every account's data walled off", big: "~15 hrs", bigLabel: "saved weekly" },
      ],
    },
    stack: {
      title: "Built around the software your firm already uses",
      intro: "Practice management, intake, e-signature, billing, and email stay where they are. Automation connects them. Which connections are possible depends on each tool's API and your plan, and the Audit confirms that before anything is built.",
      center: "Your firm",
      tools: ["Clio", "MyCase", "PracticePanther", "Smokeball", "Clio Grow", "Lawmatics", "DocuSign", "LawPay", "QuickBooks", "Outlook", "Gmail", "Calendly"],
      links: [
        { label: "Lead Follow-Up Automation", href: "/services/lead-follow-up-automation" },
        { label: "Client Onboarding Automation", href: "/services/client-onboarding-automation" },
        { label: "Bookkeeping Automation", href: "/services/bookkeeping-automation" },
      ],
    },
    faq: {
      title: "Questions attorneys ask before they automate",
      items: [
        {
          q: "What can a small law firm automate with AI?",
          a: "A small law firm can automate the administrative work around its matters: acknowledging and routing new inquiries, preparing conflict searches, drafting engagement letters from approved templates, collecting client documents, sending status updates, and chasing unpaid invoices. Legal advice, conflict decisions, court deadlines, and trust accounting stay with attorneys and staff.",
        },
        {
          q: "Is it ethical for lawyers to use AI and automation?",
          a: "It can be, when the firm meets its professional duties. In Formal Opinion 512, released July 29, 2024, the American Bar Association's ethics committee said lawyers using generative AI must consider their duties of competence, confidentiality, client communication, and reasonable fees. State bars publish their own guidance, so firms should check the rules in their jurisdiction too.",
        },
        {
          q: "How is client confidentiality protected when a law firm automates?",
          a: "Confidentiality is protected through how the system is built. Information moves only between tools the firm already controls, each workflow gets only the access it needs, every automated action is logged, and anything substantive waits for attorney approval. Prospective client information collected at intake gets the same care as client files.",
        },
        {
          q: "Does law firm automation work with Clio or MyCase?",
          a: "It depends on the tool and the subscription plan. Most modern practice management, email, e-signature, and billing tools offer some way to connect other software, but the options vary. Whispers Lab confirms which connections are possible for a firm's specific tools during the $250 Automation Audit, before anything is built.",
        },
        {
          q: "How much does automation cost for a small law firm?",
          a: "With Whispers Lab, it starts with a $250 Automation Audit that maps intake, conflicts, onboarding, and billing workflows and ranks them by time saved. If the firm goes ahead, the build is quoted as a fixed price with no hourly billing, and the $250 is credited toward it. Ongoing maintenance and new workflows are available through the AI Growth Partner plan at $500 a month.",
        },
        {
          q: "Will automation replace paralegals or legal assistants?",
          a: "No. Automation removes the retyping, chasing, and copying between systems, not the judgment. Paralegals and legal assistants spend that time on work that needs a person, such as preparing matters, talking with clients, and checking the details an attorney relies on.",
        },
      ],
    },
    cta: {
      title: "Find the admin your firm can stop doing by hand.",
      body: "In 7 days, the Automation Audit maps intake, conflicts, onboarding, and billing, and hands you a plan you keep either way. Build it with us and the $250 is credited.",
    },
    related: {
      services: ["/services/lead-follow-up-automation", "/services/client-onboarding-automation", "/services/data-entry-automation", "/services/bookkeeping-automation"],
      posts: [],
    },
  },
];

export function getIndustry(slug: string): IndustryPage | undefined {
  return INDUSTRIES.find((i) => i.slug === slug);
}
