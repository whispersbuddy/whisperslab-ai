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

/**
 * Proof comes in two honest shapes:
 * - "direct": a published case study is actually tagged with this industry,
 *   so it renders like the service template's ResultStory (real, in-industry proof).
 * - "closest": no case study exists for this industry yet, so the page shows
 *   the closest real result from elsewhere, explicitly labeled as such
 *   (PatternMatchProof). Never blend the two or present "closest" as direct.
 */
export type IndustryProof =
  | { mode: "direct"; eyebrow: string; title: string; featured: ServicePage["proof"]["featured"]; more: ServicePage["proof"]["more"] }
  | { mode: "closest"; eyebrow: string; title: string; intro: string; rows: ClosestProofRow[] };

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
    /** Omit when no real, verified external citation applies to this industry. Never invent one. */
    citation?: { badge: string; badgeSmall: string; text: string; url: string; fine: string };
    promises: { label: string; body: string }[];
  };
  estimator: ServicePage["estimator"];
  proof: IndustryProof;
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
      mode: "closest",
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
  {
    slug: "real-estate",
    seo: {
      title: "Real Estate Automation for Small Teams | Whispers Lab",
      description:
        "Whispers Lab builds real estate automation: leads answered fast, showings booked, and deals that follow themselves up, without the fair housing risk.",
      keyword: "real estate automation",
    },
    hero: {
      eyebrow: "Industry · Real estate",
      title: "Real estate automation that",
      highlight: "answers before they call someone else.",
      answer:
        "Real estate automation replies to new leads within minutes, lets buyers book a showing from a link instead of a text thread, and chases signatures until a deal closes. Agents still make every pricing, offer, and buyer decision. The system handles the fast reply and the paperwork, written to stay on the right side of fair housing rules.",
      secondaryCta: { label: "See a real estate build", href: "#proof" },
    },
    week: {
      eyebrow: "A week at a small brokerage",
      title: "What does a week look like before and after?",
      intro: "One agent's illustrative week. Nothing here is a measured result, just what the hours look like both ways.",
      before: {
        time: "Week of admin hours",
        pills: ["22 of 45 working hours on admin", "3 leads replied to the next day"],
        table: {
          title: "This week, by hand",
          head: ["Day", "Admin hours", "Biggest task"],
          rows: [
            { cells: ["Mon", "5", "Overnight leads, showing texts"], status: "bad" },
            { cells: ["Tue", "5", "Signature chasing, CRM updates"], status: "bad" },
            { cells: ["Wed", "6", "Listing copy, showing texts"], status: "bad" },
            { cells: ["Thu", "6", "Title company calls, follow-ups"], status: "bad" },
          ],
          footer: { cells: ["22 hrs", "of 45", ""], status: "bad" },
        },
        aside: { kind: "note", text: "That lead from last night still hasn't heard back." },
      },
      after: {
        time: "Week of admin hours",
        pills: ["7 of 45 working hours on admin", "0 leads waiting more than 5 minutes"],
        table: {
          title: "This week, automated",
          head: ["Day", "Admin hours", "Biggest task"],
          rows: [
            { cells: ["Mon", "2", "Reviewing 2 draft listing descriptions"], status: "ok" },
            { cells: ["Tue", "1", "Approving a showing exception"], status: "ok" },
            { cells: ["Wed", "2", "Reviewing listing copy"], status: "ok" },
            { cells: ["Thu", "2", "A buyer call that needed a person"], status: "ok" },
          ],
        },
        aside: { kind: "message", channel: "#leads", topic: "New lead", text: "Jordan Price replied to in 3 minutes and booked a showing for Thursday.", actions: ["View lead", "Open calendar"] },
      },
      table: [
        { row: "New leads", before: "Checked when someone has a free minute", after: "Answered within minutes, any hour" },
        { row: "Showing requests", before: "Back-and-forth texts to find a time", after: "Booked from a self-serve calendar link" },
        { row: "Deal paperwork", before: "Chased for signatures one document at a time", after: "Reminders go out until everything is signed" },
        { row: "Your time", before: "Chasing leads and paperwork", after: "Showing homes and closing deals" },
      ],
    },
    moments: {
      eyebrow: "One ordinary Tuesday",
      title: "Which real estate tasks can be automated?",
      intro: "Six moments from a small team's Tuesday. The amber ones still wait for an agent, even after automation.",
      items: [
        { time: "7:40 AM", before: "Checks overnight leads from three portals by hand.", after: "Every overnight lead was replied to within minutes.", human: false, service: { label: "Lead Follow-Up Automation", href: "/services/lead-follow-up-automation" } },
        { time: "9:15 AM", before: "Texts back and forth to find a showing time that works.", after: "The buyer picked a showing time from a calendar link sent last night.", human: false, service: { label: "Client Onboarding Automation", href: "/services/client-onboarding-automation" } },
        { time: "11:00 AM", before: "Calls the title company to check on a document.", after: "A status update came in automatically, no call needed.", human: false, service: { label: "Software Integration Services", href: "/services/software-integration-services" } },
        { time: "1:30 PM", before: "Reminds a buyer for the third time to sign a disclosure.", after: "The signature reminder went out on its own. Signed this morning.", human: false, service: { label: "Client Onboarding Automation", href: "/services/client-onboarding-automation" } },
        { time: "3:00 PM", before: "Writes a listing description from scratch.", after: "A draft listing description is ready for the agent to review.", human: true, service: { label: "Data Entry Automation", href: "/services/data-entry-automation" } },
        { time: "5:30 PM", before: "Updates the CRM before heading home.", after: "The CRM updated itself the moment each lead and showing happened.", human: false, service: { label: "Software Integration Services", href: "/services/software-integration-services" } },
      ],
    },
    intake: {
      eyebrow: "See it work",
      title: "How does real estate lead follow-up work?",
      items: [
        { title: "Capture", body: "New leads come in from your portals, website, and ads.", tools: ["Zillow", "Website"] },
        { title: "Reply", body: "A fast, warm first reply goes out within minutes, any hour.", tools: ["AI reply"], ai: true },
        { title: "Route", body: "Each lead is matched to the right agent by territory or rotation.", tools: ["Your CRM"] },
        { title: "Follow up", body: "Follow-ups continue on schedule until the lead responds or opts out.", tools: ["Email", "SMS"] },
      ],
      checkpointAfter: 3,
      checkpointLabel: "Agent approves before anything goes to a serious buyer",
      human: ["Pricing and offer conversations", "Anything that could read as steering a buyer", "Contract terms", "Disclosures", "Deciding when a lead needs a call, not a text"],
    },
    trust: {
      eyebrow: "Compliance & fair housing",
      title: "How does automation avoid fair housing risk?",
      layers: [
        { label: "Agent review", note: "before anything goes to a serious buyer" },
        { label: "Neutral language", note: "descriptions stick to the property, not the neighborhood" },
        { label: "Every message logged", note: "linked back to its source, so it can be checked" },
        { label: "Your systems", note: "tools your brokerage already controls" },
      ],
      citation: {
        badge: "HUD",
        badgeSmall: "May 2024",
        text: "In May 2024, HUD issued Fair Housing Act guidance stating that the Act applies to housing-related communications and advertising whether or not AI produced them, and the housing provider stays responsible for the tools it uses. We write automated replies and listing descriptions to stick to the property, never a description of the neighborhood or who lives there.",
        url: "https://archives.hud.gov/news/2024/pr24-098.cfm",
        fine: "General information, not legal advice. Check your state's real estate commission guidance too.",
      },
      promises: [
        { label: "Your voice", body: "Replies and listing copy use wording your brokerage approved." },
        { label: "Every buyer treated alike", body: "The same fast reply and follow-up schedule for every lead." },
      ],
    },
    estimator: {
      eyebrow: "Your numbers",
      title: "What is slow lead response costing you?",
      intro: "Move the sliders to match your week.",
      unit: "leads",
      inputs: [
        { id: "docs", label: "New leads and showing requests per day", min: 1, max: 40, step: 1, value: 8 },
        { id: "min", label: "Minutes to reply, route, and schedule each one", min: 1, max: 20, step: 1, value: 8 },
        { id: "days", label: "Working days per week", min: 1, max: 7, step: 1, value: 6 },
        { id: "rate", label: "Hourly cost of that time", min: 15, max: 150, step: 5, value: 40, hint: "Wages plus overhead, or your own hourly value", format: "money" },
        { id: "flag", label: "Share still needing a person to double check", min: 0, max: 50, step: 5, value: 20, format: "percent" },
        { id: "rev", label: "Minutes to check one of those", min: 1, max: 10, step: 1, value: 3 },
      ],
      worth: ["Worth it once leads come from more than one portal", "When showing requests take more than one text to schedule", "When a slow reply has cost you a buyer before"],
    },
    proof: {
      mode: "direct",
      eyebrow: "Proof · Real estate",
      title: "A real estate build, not a guess",
      featured: {
        slug: "lead-sales-engine",
        big: "~15 hrs",
        bigLabel: "saved every week, with leads never sold twice since launch",
        title: "The Lead Sales Engine That Runs Itself",
        before: "Every lead meant looking up the contact by hand, texting one at a time, and occasionally handling the same lead twice.",
        after: "New leads are found, enriched with contact details, and handled automatically, with everything marked and synced the moment it's done.",
        chips: ["Real estate", "n8n", "Twilio"],
        caption: "Illustration of the lead routing view",
      },
      more: [],
    },
    stack: {
      title: "Built on the tools you already pay for",
      intro: "Portals, your CRM, e-signature, and calendars stay where they are. Automation connects them, and the Audit confirms which connections are possible before anything is built.",
      center: "Your leads",
      tools: ["Zillow", "Realtor.com", "DocuSign", "dotloop", "Follow Up Boss", "Twilio", "QuickBooks", "Google Calendar"],
      links: [
        { label: "Lead Follow-Up Automation", href: "/services/lead-follow-up-automation" },
        { label: "Client Onboarding Automation", href: "/services/client-onboarding-automation" },
        { label: "Software Integration Services", href: "/services/software-integration-services" },
      ],
    },
    faq: {
      title: "Questions agents ask before they automate",
      items: [
        {
          q: "What can a real estate team automate?",
          a: "A small real estate team can automate replying to new leads, routing them to the right agent, scheduling showings, sending signature and document reminders, and keeping the CRM updated. Pricing conversations, offers, contract terms, and anything that could influence a buyer's choice of neighborhood stay with agents.",
        },
        {
          q: "Does automated lead response cause fair housing problems?",
          a: "It can, if the automation isn't built carefully. HUD's May 2024 guidance says the Fair Housing Act applies to AI-generated communications and advertising the same as anything a person writes, and the housing provider stays responsible. Whispers Lab writes replies and listing copy to describe the property, not the neighborhood or its residents, and keeps every message logged.",
        },
        {
          q: "How fast should a real estate lead be answered?",
          a: "As fast as possible, ideally within minutes. Leads that wait even an hour are far more likely to go with whichever agent replies first. Automated follow-up sends a reply within minutes of a lead coming in, any hour, then keeps following up on a schedule.",
        },
        {
          q: "Does it work with Zillow and Follow Up Boss?",
          a: "Usually, yes. Real estate automation connects to the portals, CRM, and e-signature tools you already use where possible. The $250 Automation Audit confirms the exact connections before anything is built.",
        },
        {
          q: "How much does real estate automation cost?",
          a: "At Whispers Lab it starts with a $250 Automation Audit that maps how leads and paperwork move through your business today. If you go ahead, the build is quoted as a fixed price starting from $2,500, with the $250 credited toward it. Ongoing support is available for $500 a month.",
        },
        {
          q: "Will automation replace my transaction coordinator or assistant?",
          a: "No. It removes the retyping, chasing, and copying between systems, not the judgment. Your team spends that time on work that needs a person, like a buyer conversation or reviewing contract terms.",
        },
      ],
    },
    cta: {
      title: "Find out how many leads are going cold.",
      body: "In 7 days, the Automation Audit maps how leads and paperwork move through your business and hands you a build plan you keep either way. Build it with us and the $250 is credited.",
    },
    related: {
      services: ["/services/lead-follow-up-automation", "/services/client-onboarding-automation", "/services/software-integration-services"],
      posts: ["real-estate-lead-follow-up-automation"],
    },
  },
  {
    slug: "ecommerce-retail",
    seo: {
      title: "Ecommerce Automation for Small Retailers | Whispers Lab",
      description:
        "Whispers Lab builds ecommerce automation: supplier feeds cleaned, listings pushed live, and orders synced, without anyone retyping a product.",
      keyword: "ecommerce automation",
    },
    hero: {
      eyebrow: "Industry · E-commerce & retail",
      title: "Ecommerce automation for stores that stop",
      highlight: "updating listings by hand.",
      answer:
        "Ecommerce automation cleans up messy supplier feeds, translates and formats listings, and pushes them live to your store automatically. Inventory and orders stay in sync across the tools you use, and pricing changes outside your guardrails wait for a person. You still decide what to sell and for how much. The system handles the retyping.",
      secondaryCta: { label: "See an e-commerce build", href: "#proof" },
    },
    week: {
      eyebrow: "A week running the store",
      title: "What does a week look like before and after?",
      intro: "One small store's illustrative week. Nothing here is a measured result, just what the hours look like both ways.",
      before: {
        time: "Week of catalog and order hours",
        pills: ["19 of 45 working hours on catalog and orders", "2 pricing errors live on the site"],
        table: {
          title: "This week, by hand",
          head: ["Day", "Admin hours", "Biggest task"],
          rows: [
            { cells: ["Mon", "5", "Rewriting new listings"], status: "bad" },
            { cells: ["Tue", "4", "Inventory counts, order issues"], status: "bad" },
            { cells: ["Wed", "5", "Pricing updates, customer emails"], status: "bad" },
            { cells: ["Thu", "5", "Reconciling sales and payouts"], status: "bad" },
          ],
          footer: { cells: ["19 hrs", "of 45", ""], status: "bad" },
        },
        aside: { kind: "note", text: "Which price is actually live on the site right now?" },
      },
      after: {
        time: "Week of catalog and order hours",
        pills: ["5 of 45 working hours on catalog and orders", "0 pricing errors live"],
        table: {
          title: "This week, automated",
          head: ["Day", "Admin hours", "Biggest task"],
          rows: [
            { cells: ["Mon", "1", "Reviewing 3 new listings"], status: "ok" },
            { cells: ["Tue", "1", "Approving a reorder"], status: "ok" },
            { cells: ["Wed", "2", "A pricing change outside the guardrail"], status: "ok" },
            { cells: ["Thu", "1", "Checking a flagged mismatch"], status: "ok" },
          ],
        },
        aside: { kind: "message", channel: "#ops", topic: "Catalog sync", text: "40 new listings cleaned, translated, and pushed live. 0 duplicates.", actions: ["View log", "Open store"] },
      },
      table: [
        { row: "New listings", before: "Rewritten and priced by hand, one at a time", after: "Cleaned, translated, and pushed live automatically" },
        { row: "Inventory counts", before: "Checked against a spreadsheet, sometimes stale", after: "Synced the moment a sale or restock happens" },
        { row: "Order issues", before: "Found when a customer complains", after: "Flagged automatically before it ships wrong" },
        { row: "Your time", before: "Copying data between supplier feeds, sheets, and the store", after: "Reviewing the rare item that needs a person" },
      ],
    },
    moments: {
      eyebrow: "One ordinary Wednesday",
      title: "Which e-commerce tasks can be automated?",
      intro: "Six moments from a small store's Wednesday. The amber ones still wait for a person, even after automation.",
      items: [
        { time: "6:30 AM", before: "Checks overnight orders for anything unusual by hand.", after: "Overnight orders were checked automatically, one flagged for a mismatched address.", human: true, service: { label: "Data Entry Automation", href: "/services/data-entry-automation" } },
        { time: "9:00 AM", before: "Starts rewriting 40 new supplier listings by hand.", after: "40 new listings were cleaned, translated, and pushed live overnight.", human: false, service: { label: "Software Integration Services", href: "/services/software-integration-services" } },
        { time: "11:30 AM", before: "Manually updates inventory after a wholesale order ships.", after: "Inventory updated the moment the order left the warehouse.", human: false, service: { label: "Software Integration Services", href: "/services/software-integration-services" } },
        { time: "1:00 PM", before: "Answers \"where is my order\" emails one at a time.", after: "Most tracking questions got an automatic reply with real tracking data.", human: false, service: { label: "Lead Follow-Up Automation", href: "/services/lead-follow-up-automation" } },
        { time: "3:00 PM", before: "Reconciles the day's sales against Stripe payouts by hand.", after: "Sales and payouts matched themselves overnight.", human: false, service: { label: "Bookkeeping Automation", href: "/services/bookkeeping-automation" } },
        { time: "5:00 PM", before: "Emails a supplier to reorder low stock.", after: "A reorder draft was waiting, ready to approve.", human: true, service: { label: "Data Entry Automation", href: "/services/data-entry-automation" } },
      ],
    },
    intake: {
      eyebrow: "See it work",
      title: "How does supplier feed automation work?",
      items: [
        { title: "Pull", body: "New products and prices are pulled from your supplier feed automatically.", tools: ["Supplier feed"] },
        { title: "Clean", body: "Titles and descriptions are rewritten and translated where needed.", tools: ["AI cleanup"], ai: true },
        { title: "Check", body: "Every listing is checked against what's already live, so nothing duplicates.", tools: ["Your store"] },
        { title: "Publish", body: "Clean listings push live automatically. Anything unsure waits for a person.", tools: ["Your storefront"] },
      ],
      checkpointAfter: 3,
      checkpointLabel: "You approve pricing rules before anything goes live",
      human: ["Approving pricing or catalog conflicts", "Anything flagged as unsure", "Supplier disputes", "Deciding when a listing needs a rewrite, not a fix", "Customer complaints that need a real answer"],
    },
    trust: {
      eyebrow: "Accuracy & data",
      title: "How do we keep the catalog accurate?",
      layers: [
        { label: "Duplicate check", note: "every listing checked against what's already live before it pushes" },
        { label: "Price guardrails", note: "changes outside your set range wait for approval" },
        { label: "Every push logged", note: "linked back to its source, so it can be checked" },
        { label: "Your systems", note: "tools your store already runs on" },
      ],
      promises: [
        { label: "Your brand voice", body: "Descriptions use wording your store approved, not a generic script." },
        { label: "No silent price changes", body: "Anything outside your guardrails waits for a person." },
      ],
    },
    estimator: {
      eyebrow: "Your numbers",
      title: "What is manual catalog work costing you?",
      intro: "Move the sliders to match your week.",
      unit: "listings",
      inputs: [
        { id: "docs", label: "Listings or orders touched by hand per day", min: 5, max: 300, step: 5, value: 60 },
        { id: "min", label: "Minutes per listing or order, cleaning or checking", min: 1, max: 15, step: 1, value: 3 },
        { id: "days", label: "Working days per week", min: 1, max: 7, step: 1, value: 6 },
        { id: "rate", label: "Hourly cost of that time", min: 15, max: 150, step: 5, value: 30, hint: "Wages plus overhead, or your own hourly value", format: "money" },
        { id: "flag", label: "Share still needing a person to double check", min: 0, max: 50, step: 5, value: 10, format: "percent" },
        { id: "rev", label: "Minutes to check one of those", min: 1, max: 10, step: 1, value: 2 },
      ],
      worth: ["Worth it once a supplier feed needs cleaning before it can go live", "When the same product data lives in more than one system", "When pricing or inventory has ever gone out of sync"],
    },
    proof: {
      mode: "direct",
      eyebrow: "Proof · E-commerce",
      title: "An e-commerce build, not a guess",
      featured: {
        slug: "ai-catalog-content-engine",
        big: "~22 hrs",
        bigLabel: "saved every week, with zero duplicate entries or catalog errors",
        title: "The AI Catalog & Content Engine",
        before: "Supplier catalogs arrived messy and in raw foreign languages, so the team spent hours manually rewriting titles and fixing pricing before anything could go live.",
        after: "A one-click system fetches the raw feed, cleans and translates the text, and pushes every listing live to the store automatically.",
        chips: ["E-commerce", "Python", "OpenAI"],
        caption: "Illustration of the synced product catalog",
      },
      more: [{ slug: "self-cleaning-warehouse-system", big: "~3 hrs", title: "The Self-Cleaning Warehouse System", detail: "saved weekly · Make.com, Google Drive" }],
    },
    stack: {
      title: "Built on the tools you already pay for",
      intro: "Your storefront, supplier feeds, payments, and accounting stay where they are. Automation connects them, and the Audit confirms which connections are possible before anything is built.",
      center: "Your catalog",
      tools: ["Shopify", "PrestaShop", "WooCommerce", "QuickBooks", "Stripe", "Google Sheets", "OpenAI"],
      links: [
        { label: "Software Integration Services", href: "/services/software-integration-services" },
        { label: "Data Entry Automation", href: "/services/data-entry-automation" },
        { label: "Bookkeeping Automation", href: "/services/bookkeeping-automation" },
      ],
    },
    faq: {
      title: "Questions store owners ask first",
      items: [
        {
          q: "What can a small online store automate?",
          a: "A small store can automate cleaning and translating supplier listings, pushing products live, syncing inventory across sales channels, matching sales to payouts, and answering common order status questions. Pricing strategy and anything a customer needs a real answer to stay with your team.",
        },
        {
          q: "How much does ecommerce automation cost?",
          a: "At Whispers Lab it starts with a $250 Automation Audit that maps which catalog and order tasks take your team the most time. If you go ahead, the build is quoted as a fixed price starting from $2,500, with the $250 credited toward it. Ongoing support is available for $500 a month.",
        },
        {
          q: "Will automated listings sound generic?",
          a: "No, when it's built around your brand. Descriptions are written in the tone your store already uses, not a one-size-fits-all template. What disappears is the hours of manual rewriting, not the voice.",
        },
        {
          q: "Does it work with Shopify and WooCommerce?",
          a: "Usually, yes. Ecommerce automation connects to the storefront, supplier feeds, and accounting tools you already use where possible. The $250 Automation Audit confirms the exact connections before anything is built.",
        },
        {
          q: "What stops a bad price from going live by accident?",
          a: "Guardrails you set. Prices and listings that fall inside your normal range publish automatically. Anything outside it, like a price that looks too low or too high, waits for a person to approve before it goes live.",
        },
        {
          q: "How long does it take to set up?",
          a: "An ecommerce automation built in the Whispers Lab Core Build goes live in under 30 days. That includes mapping your supplier feeds and sales channels, building and testing the sync, and showing your team how to check flagged items.",
        },
      ],
    },
    cta: {
      title: "Find out what's costing your catalog the most time.",
      body: "In 7 days, the Automation Audit maps your catalog and order work and hands you a build plan you keep either way. Build it with us and the $250 is credited.",
    },
    related: {
      services: ["/services/software-integration-services", "/services/data-entry-automation", "/services/bookkeeping-automation"],
      posts: ["ecommerce-product-listing-automation-supplier-feeds"],
    },
  },
  {
    slug: "property-management",
    seo: {
      title: "Property Management Automation | Whispers Lab",
      description:
        "Whispers Lab builds property management automation: maintenance requests logged, rent reminders sent, and screening applied consistently.",
      keyword: "property management automation",
    },
    hero: {
      eyebrow: "Industry · Property management",
      title: "Property management automation for requests",
      highlight: "that don't wait until Monday.",
      answer:
        "Property management automation logs maintenance requests the moment they come in, notifies the nearest available vendor, and sends rent reminders on schedule. Tenant screening applies the same criteria to every applicant. You still make every decision on repairs, disputes, and leases. The system handles the logging, routing, and reminders.",
      secondaryCta: { label: "See how requests get routed", href: "#intake" },
    },
    week: {
      eyebrow: "A week managing a portfolio",
      title: "What does a week look like before and after?",
      intro: "One manager's illustrative week. Nothing here is a measured result, just what the hours look like both ways.",
      before: {
        time: "Week of admin hours",
        pills: ["20 of 45 working hours on admin", "4 maintenance requests still open after 3 days"],
        table: {
          title: "This week, by hand",
          head: ["Day", "Admin hours", "Biggest task"],
          rows: [
            { cells: ["Mon", "5", "Overnight requests, vendor calls"], status: "bad" },
            { cells: ["Tue", "4", "Rent reminders, screening review"], status: "bad" },
            { cells: ["Wed", "5", "Vendor follow-up, tenant texts"], status: "bad" },
            { cells: ["Thu", "6", "Inspection reports, late rent"], status: "bad" },
          ],
          footer: { cells: ["20 hrs", "of 45", ""], status: "bad" },
        },
        aside: { kind: "note", text: "Did anyone ever call a plumber for unit 4B?" },
      },
      after: {
        time: "Week of admin hours",
        pills: ["6 of 45 working hours on admin", "0 requests open past 24 hours without an update"],
        table: {
          title: "This week, automated",
          head: ["Day", "Admin hours", "Biggest task"],
          rows: [
            { cells: ["Mon", "1", "Approving an urgent repair"], status: "ok" },
            { cells: ["Tue", "1", "Reviewing 2 screening reports"], status: "ok" },
            { cells: ["Wed", "2", "A vendor dispute that needed a call"], status: "ok" },
            { cells: ["Thu", "2", "Approving a move-out charge"], status: "ok" },
          ],
        },
        aside: { kind: "message", channel: "#maintenance", topic: "Work order", text: "Unit 4B leak logged and assigned to Rivera Plumbing. Tenant notified.", actions: ["View request", "Open unit"] },
      },
      table: [
        { row: "Maintenance requests", before: "Logged in a group chat, easy to lose", after: "Logged, assigned, and tracked automatically" },
        { row: "Rent reminders", before: "Sent by hand, sometimes late", after: "Sent on schedule, every time" },
        { row: "Tenant screening", before: "Checked across a few different tools", after: "Checked consistently against the same criteria for every applicant" },
        { row: "Your time", before: "Chasing repairs and rent", after: "Checking the few things that need a person" },
      ],
    },
    moments: {
      eyebrow: "One ordinary Thursday",
      title: "Which property management tasks can be automated?",
      intro: "Six moments from a small portfolio's Thursday. The amber ones still wait for a person, even after automation.",
      items: [
        { time: "7:30 AM", before: "Scrolls a group chat for overnight maintenance requests.", after: "Overnight requests were logged and assigned to a vendor automatically.", human: false, service: { label: "Data Entry Automation", href: "/services/data-entry-automation" } },
        { time: "9:45 AM", before: "Calls three vendors to find one available today.", after: "The nearest available vendor was notified and confirmed.", human: false, service: { label: "Software Integration Services", href: "/services/software-integration-services" } },
        { time: "11:30 AM", before: "Checks which tenants haven't paid rent yet.", after: "Late tenants already got a reminder with a payment link.", human: false, service: { label: "Bookkeeping Automation", href: "/services/bookkeeping-automation" } },
        { time: "1:00 PM", before: "Reviews a new applicant's screening report by hand.", after: "The report is summarized and waiting, checked against the same criteria as every other applicant.", human: true, service: { label: "Data Entry Automation", href: "/services/data-entry-automation" } },
        { time: "3:00 PM", before: "Texts a tenant three times about a late inspection.", after: "The inspection reminder went out on its own. Confirmed for Friday.", human: false, service: { label: "Client Onboarding Automation", href: "/services/client-onboarding-automation" } },
        { time: "5:00 PM", before: "Writes a move-out inspection report from photos and notes.", after: "The report built itself from the photos and notes the moment the inspection was submitted.", human: true, service: { label: "Data Entry Automation", href: "/services/data-entry-automation" } },
      ],
    },
    intake: {
      eyebrow: "See it work",
      title: "How does maintenance request automation work?",
      items: [
        { title: "Log", body: "A tenant's request comes in by text, email, or a form, and gets logged automatically.", tools: ["Tenant portal"] },
        { title: "Triage", body: "Urgent issues, like no heat or a leak, get flagged for immediate action.", tools: ["Rules you approve"] },
        { title: "Assign", body: "The nearest available vendor is notified and asked to confirm.", tools: ["Your vendor list"] },
        { title: "Update", body: "The tenant gets a status update automatically. Anything unresolved after 24 hours is flagged for a person.", tools: ["SMS", "Email"] },
      ],
      checkpointAfter: 3,
      checkpointLabel: "You approve anything urgent or unusual",
      human: ["Approving unusual or urgent repairs", "Tenant disputes", "Eviction or lease decisions", "Screening decisions", "Anything client-facing that reads oddly"],
    },
    trust: {
      eyebrow: "Compliance & fair housing",
      title: "How does automation avoid fair housing risk?",
      layers: [
        { label: "Consistent criteria", note: "every applicant screened against the same standard" },
        { label: "Manager review", note: "before any screening decision goes out" },
        { label: "Every message logged", note: "linked back to its source, so it can be checked" },
        { label: "Your systems", note: "tools your team already controls" },
      ],
      citation: {
        badge: "HUD",
        badgeSmall: "May 2024",
        text: "In May 2024, HUD issued Fair Housing Act guidance stating that the Act applies to tenant screening and housing-related communications whether or not AI produced them, and the housing provider stays responsible for the tools it uses. We build screening and communication workflows to apply the same criteria to every applicant.",
        url: "https://archives.hud.gov/news/2024/pr24-098.cfm",
        fine: "General information, not legal advice. Check your state and local housing rules too.",
      },
      promises: [
        { label: "Same criteria, every time", body: "No applicant gets a different standard than another." },
        { label: "Your policies", body: "Reminders and messages use wording your team approved." },
      ],
    },
    estimator: {
      eyebrow: "Your numbers",
      title: "What is manual property management costing you?",
      intro: "Move the sliders to match your week.",
      unit: "requests",
      inputs: [
        { id: "docs", label: "Maintenance requests and rent tasks per day", min: 1, max: 40, step: 1, value: 10 },
        { id: "min", label: "Minutes to log, assign, or follow up on each one", min: 1, max: 20, step: 1, value: 8 },
        { id: "days", label: "Working days per week", min: 1, max: 7, step: 1, value: 6 },
        { id: "rate", label: "Hourly cost of that time", min: 15, max: 150, step: 5, value: 35, hint: "Wages plus overhead, or your own hourly value", format: "money" },
        { id: "flag", label: "Share still needing a person to double check", min: 0, max: 50, step: 5, value: 20, format: "percent" },
        { id: "rev", label: "Minutes to check one of those", min: 1, max: 10, step: 1, value: 4 },
      ],
      worth: ["Worth it once requests come in by text, call, and email all at once", "When rent reminders get sent late some months", "When a portfolio has more than a handful of units"],
    },
    proof: {
      mode: "closest",
      eyebrow: "Proof · Closest builds",
      title: "Our published case studies are not from property managers. These solved the same problems elsewhere.",
      intro: "No property management case study exists yet, so here is the closest real build for each shape of need.",
      rows: [
        { needLabel: "You need", need: "Move-in and move-out reports built from photos and notes", slug: "inspection-report-writes-itself", title: "The Inspection Report That Writes Itself", detail: "Field inspections · photos and notes become a finished report automatically", big: "~4 hrs", bigLabel: "saved per report" },
        { needLabel: "You need", need: "Showings and move-ins booked without back-and-forth", slug: "onboarding-pipeline-autopilot", title: "The Onboarding Pipeline That Runs on Autopilot", detail: "Coaching · clients book themselves and arrive with paperwork done", big: "~5 hrs", bigLabel: "saved weekly" },
        { needLabel: "You need", need: "Rent and vendor invoices staying in sync with your books", slug: "zero-double-entry-financial-pipeline", title: "The Zero Double-Entry Financial Pipeline", detail: "Professional services · records sync automatically, nothing typed twice", big: "~10 hrs", bigLabel: "saved weekly" },
      ],
    },
    stack: {
      title: "Built on the tools you already pay for",
      intro: "Your property management software, vendor list, and accounting stay where they are. Automation connects them, and the Audit confirms which connections are possible before anything is built.",
      center: "Your properties",
      tools: ["AppFolio", "Buildium", "Yardi", "QuickBooks", "DocuSign", "Twilio", "Google Calendar"],
      links: [
        { label: "Data Entry Automation", href: "/services/data-entry-automation" },
        { label: "Client Onboarding Automation", href: "/services/client-onboarding-automation" },
        { label: "Bookkeeping Automation", href: "/services/bookkeeping-automation" },
      ],
    },
    faq: {
      title: "Questions property managers ask first",
      items: [
        {
          q: "What can a small property management company automate?",
          a: "A small property management company can automate logging and routing maintenance requests, notifying vendors, sending rent reminders, summarizing screening reports, and confirming inspections. Repair approvals, tenant disputes, and lease or eviction decisions stay with your team.",
        },
        {
          q: "Does automated tenant screening cause fair housing problems?",
          a: "It can, if it isn't built to apply the same standard to everyone. HUD's May 2024 guidance says the Fair Housing Act applies to AI-assisted tenant screening and communications the same as anything a person does, and the housing provider stays responsible. Whispers Lab builds screening workflows to check every applicant against the same criteria, with a manager reviewing before any decision goes out.",
        },
        {
          q: "How fast should a maintenance request be answered?",
          a: "As fast as the urgency requires. An emergency like no heat or a leak should be flagged and routed to a vendor within minutes, any hour. Automated logging catches the request the moment it comes in, whether that's midnight or a Sunday.",
        },
        {
          q: "Does it work with AppFolio or Buildium?",
          a: "Usually, yes. Property management automation connects to the property management software, vendor tools, and accounting you already use where possible. The $250 Automation Audit confirms the exact connections before anything is built.",
        },
        {
          q: "How much does property management automation cost?",
          a: "At Whispers Lab it starts with a $250 Automation Audit that maps how requests, rent, and screening move through your business today. If you go ahead, the build is quoted as a fixed price starting from $2,500, with the $250 credited toward it. Ongoing support is available for $500 a month.",
        },
        {
          q: "Will automation replace my property manager or assistant?",
          a: "No. It removes the logging, chasing, and copying between systems, not the judgment. Your team spends that time on repair decisions, tenant conversations, and anything that needs a person.",
        },
      ],
    },
    cta: {
      title: "Find the admin eating your week.",
      body: "In 7 days, the Automation Audit maps how requests, rent, and screening move through your business and hands you a build plan you keep either way. Build it with us and the $250 is credited.",
    },
    related: {
      services: ["/services/data-entry-automation", "/services/client-onboarding-automation", "/services/bookkeeping-automation"],
      posts: [],
    },
  },
  {
    slug: "accounting-bookkeeping",
    seo: {
      title: "Accounting Firm Automation for Small Firms | Whispers Lab",
      description:
        "Whispers Lab builds accounting firm automation: client documents read and filed, reminders sent, and books that reconcile themselves.",
      keyword: "accounting firm automation",
    },
    hero: {
      eyebrow: "Industry · Accounting & bookkeeping",
      title: "Accounting firm automation that keeps",
      highlight: "client work moving, not paperwork.",
      answer:
        "Accounting firm automation chases missing client documents automatically, reads statements and receipts the moment they arrive, and matches payments to invoices without anyone typing a number twice. Your team still makes every judgment call. The system handles the collecting, reading, and matching, so billable hours go to client work, not data entry.",
      secondaryCta: { label: "See how document intake works", href: "#intake" },
    },
    week: {
      eyebrow: "A week at a small firm",
      title: "What does a week look like before and after?",
      intro: "One firm's illustrative week. Nothing here is a measured result, just what the hours look like both ways.",
      before: {
        time: "Week of admin hours",
        pills: ["18 of 45 working hours on admin", "3 clients still missing documents"],
        table: {
          title: "This week, by hand",
          head: ["Day", "Admin hours", "Biggest task"],
          rows: [
            { cells: ["Mon", "5", "Chasing documents, data entry"], status: "bad" },
            { cells: ["Tue", "4", "Reconciling payments"], status: "bad" },
            { cells: ["Wed", "4", "Client emails, data entry"], status: "bad" },
            { cells: ["Thu", "5", "Month-end matching"], status: "bad" },
          ],
          footer: { cells: ["18 hrs", "of 45", ""], status: "bad" },
        },
        aside: { kind: "note", text: "Has this client even sent last month's statements?" },
      },
      after: {
        time: "Week of admin hours",
        pills: ["5 of 45 working hours on admin", "0 clients missing documents past the deadline"],
        table: {
          title: "This week, automated",
          head: ["Day", "Admin hours", "Biggest task"],
          rows: [
            { cells: ["Mon", "1", "Reviewing 2 flagged statements"], status: "ok" },
            { cells: ["Tue", "1", "Approving an unmatched payment"], status: "ok" },
            { cells: ["Wed", "1", "A client billing question"], status: "ok" },
            { cells: ["Thu", "2", "Reviewing the month-end summary"], status: "ok" },
          ],
        },
        aside: { kind: "message", channel: "#clients", topic: "Document intake", text: "3 clients reminded automatically. 2 have sent everything already.", actions: ["View list", "Send reminder"] },
      },
      table: [
        { row: "Client documents", before: "Chased by email, one client at a time", after: "Reminders go out automatically until everything is in" },
        { row: "Data entry", before: "Retyped from statements and receipts", after: "Read and filed automatically, checked against the total" },
        { row: "Reconciliation", before: "Matched by eye at month end", after: "Matched automatically as transactions clear" },
        { row: "Your time", before: "Typing and chasing", after: "Reviewing the flagged few and talking with clients" },
      ],
    },
    moments: {
      eyebrow: "One ordinary Tuesday",
      title: "Which accounting firm tasks can be automated?",
      intro: "Six moments from a small firm's Tuesday. The amber ones still wait for a person, even after automation.",
      items: [
        { time: "7:50 AM", before: "Checks which clients still haven't sent this month's documents.", after: "Reminders already went out to the 3 clients missing documents.", human: false, service: { label: "Client Onboarding Automation", href: "/services/client-onboarding-automation" } },
        { time: "9:30 AM", before: "Retypes numbers from a stack of bank statements.", after: "Statement transactions were read and filed automatically overnight.", human: false, service: { label: "Data Entry Automation", href: "/services/data-entry-automation" } },
        { time: "11:00 AM", before: "Matches payments to invoices by eye.", after: "Payments matched to invoices automatically, one flagged for review.", human: true, service: { label: "Bookkeeping Automation", href: "/services/bookkeeping-automation" } },
        { time: "1:00 PM", before: "Answers a client's \"where's my refund\" email.", after: "The client got an automatic status update when their return moved stage.", human: false, service: { label: "Lead Follow-Up Automation", href: "/services/lead-follow-up-automation" } },
        { time: "3:00 PM", before: "Copies numbers from the practice tool into the accounting system.", after: "The two systems stayed in sync all day, nothing copied by hand.", human: false, service: { label: "Software Integration Services", href: "/services/software-integration-services" } },
        { time: "5:00 PM", before: "Builds next week's task list from memory.", after: "The task list built itself from what's actually due.", human: true, service: { label: "Data Entry Automation", href: "/services/data-entry-automation" } },
      ],
    },
    intake: {
      eyebrow: "See it work",
      title: "How does client document intake work?",
      items: [
        { title: "Request", body: "Clients get a reminder listing exactly which documents are still missing.", tools: ["Email", "Client portal"] },
        { title: "Read", body: "Statements, receipts, and invoices are read the moment they arrive.", tools: ["AI reading"], ai: true },
        { title: "Check", body: "Totals and dates are checked against simple rules you approve.", tools: ["Rules you approve"] },
        { title: "File", body: "Clean data lands in your accounting system. Anything unsure waits for a person.", tools: ["Xero", "QuickBooks"] },
      ],
      checkpointAfter: 3,
      checkpointLabel: "Only flagged items stop here",
      human: ["Approving unusual transactions", "Anything flagged as unsure", "Client billing questions", "Tax treatment decisions", "Deciding when a number looks wrong"],
    },
    trust: {
      eyebrow: "Accuracy & data",
      title: "How do we keep client data accurate and separate?",
      layers: [
        { label: "Client-by-client access", note: "each workflow only reaches the client it's built for" },
        { label: "Every entry checked", note: "totals and dates verified before anything files" },
        { label: "Every action logged", note: "linked back to its source, so it can be checked" },
        { label: "Your systems", note: "tools your firm already controls" },
      ],
      promises: [
        { label: "No mixed files", body: "One client's documents never land in another's file." },
        { label: "Your review, always", body: "Flagged items wait for a person before anything is marked done." },
      ],
    },
    estimator: {
      eyebrow: "Your numbers",
      title: "What is manual bookkeeping work costing your firm?",
      intro: "Move the sliders to match your week.",
      unit: "documents",
      inputs: [
        { id: "docs", label: "Client documents handled by hand per day", min: 5, max: 100, step: 5, value: 25 },
        { id: "min", label: "Minutes to enter or check each one", min: 1, max: 15, step: 1, value: 4 },
        { id: "days", label: "Working days per week", min: 1, max: 7, step: 1, value: 5 },
        { id: "rate", label: "Hourly cost of that time", min: 15, max: 150, step: 5, value: 40, hint: "Wages plus overhead, or your own hourly value", format: "money" },
        { id: "flag", label: "Share still needing a person to double check", min: 0, max: 50, step: 5, value: 10, format: "percent" },
        { id: "rev", label: "Minutes to check one of those", min: 1, max: 10, step: 1, value: 3 },
      ],
      worth: ["Worth it once client documents arrive from more than one place", "When chasing paperwork eats into billable hours", "When month end means matching things by eye"],
    },
    proof: {
      mode: "closest",
      eyebrow: "Proof · Closest builds",
      title: "Our published case studies are not from accounting firms. These solved the same problems elsewhere.",
      intro: "No accounting firm case study exists yet, so here is the closest real build for each shape of need.",
      rows: [
        { needLabel: "Your firm needs", need: "Client documents read and filed without retyping", slug: "financial-document-reader", title: "The Financial Document Reader", detail: "Financial services · bank statement transactions read and filed automatically", big: "~15 hrs", bigLabel: "saved weekly" },
        { needLabel: "Your firm needs", need: "Two systems that stop correcting each other", slug: "zero-double-entry-financial-pipeline", title: "The Zero Double-Entry Financial Pipeline", detail: "Professional services · records sync automatically, nothing typed twice", big: "~10 hrs", bigLabel: "saved weekly" },
        { needLabel: "Your firm needs", need: "Old client files and duplicate records cleared out for good", slug: "self-cleaning-warehouse-system", title: "The Self-Cleaning Warehouse System", detail: "Warehousing · a backlog of thousands of files cleared safely, once", big: "~3 hrs", bigLabel: "saved weekly" },
      ],
    },
    stack: {
      title: "Built on the tools you already pay for",
      intro: "Your practice management, accounting, and client communication tools stay where they are. Automation connects them, and the Audit confirms which connections are possible before anything is built.",
      center: "Your firm",
      tools: ["Xero", "QuickBooks", "Zapier", "Gmail", "Google Drive", "Airtable", "Stripe"],
      links: [
        { label: "Bookkeeping Automation", href: "/services/bookkeeping-automation" },
        { label: "Data Entry Automation", href: "/services/data-entry-automation" },
        { label: "Zapier", href: "/integrations/zapier" },
      ],
    },
    faq: {
      title: "Questions firm owners ask first",
      items: [
        {
          q: "What can a small accounting or bookkeeping firm automate?",
          a: "A small firm can automate reminding clients about missing documents, reading statements and receipts into your accounting system, matching payments to invoices, and sending status updates. Tax decisions, unusual transactions, and client conversations stay with your team.",
        },
        {
          q: "How much does accounting firm automation cost?",
          a: "At Whispers Lab it starts with a $250 Automation Audit that maps which client and bookkeeping tasks take your team the most time. If you go ahead, the build is quoted as a fixed price starting from $2,500, with the $250 credited toward it. Ongoing support is available for $500 a month.",
        },
        {
          q: "Will automation replace bookkeepers or staff accountants?",
          a: "No. It removes the retyping, chasing, and matching, not the judgment. Your team spends that time on tax decisions, unusual transactions, and client conversations that need a person.",
        },
        {
          q: "How is one client's data kept separate from another's?",
          a: "Each workflow only reaches the client it's built for, with its own access and its own logged actions. Nothing about the automation lets one client's documents or data land in another's file.",
        },
        {
          q: "Does it work with Xero and QuickBooks?",
          a: "Usually, yes. Accounting firm automation is typically built around Xero or QuickBooks, reading documents into them and matching payments against your bank feed. The $250 Automation Audit confirms the exact connections before anything is built.",
        },
        {
          q: "How accurate is automated document reading?",
          a: "It is as accurate as the rules it checks against. Totals and dates are verified before anything is filed, and anything that doesn't match cleanly is flagged for a person instead of being marked done automatically.",
        },
      ],
    },
    cta: {
      title: "Find out what's slowing your firm down.",
      body: "In 7 days, the Automation Audit maps your document and client work and hands you a build plan you keep either way. Build it with us and the $250 is credited.",
    },
    related: {
      services: ["/services/bookkeeping-automation", "/services/data-entry-automation", "/services/client-onboarding-automation"],
      posts: ["accounting-workflow-automation-tasks-to-fix-first"],
    },
  },
];

export function getIndustry(slug: string): IndustryPage | undefined {
  return INDUSTRIES.find((i) => i.slug === slug);
}
