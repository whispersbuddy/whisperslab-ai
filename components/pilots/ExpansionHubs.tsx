import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { SiteRoute } from "@/lib/routes";
import type { Crumb } from "@/lib/seo";
import NewsletterSection from "@/components/NewsletterSection";
import SiteIcon from "@/components/SiteIcon";
import PlatformLogo from "@/components/PlatformLogo";
import { PilotFaq } from "@/components/pilots/ExpansionPilots";

type FaqItem = { q: string; a: string };

function HubCrumbs({ crumbs }: { crumbs: Crumb[] }) {
  return <nav className="pilot-crumbs is-dark" aria-label="Breadcrumb">{crumbs.map((crumb, index) => <span key={crumb.path}>{index < crumbs.length - 1 ? <Link href={crumb.path}>{crumb.name}</Link> : <span aria-current="page">{crumb.name}</span>}{index < crumbs.length - 1 ? <i aria-hidden="true">/</i> : null}</span>)}</nav>;
}

export function ServicesHubPilot({ routes, crumbs, faq }: { routes: SiteRoute[]; crumbs: Crumb[]; faq: FaqItem[] }) {
  return <main className="pilot-page hub-page hub-services">
    <section className="hub-hero"><div className="container hub-hero-grid"><div><HubCrumbs crumbs={crumbs} /><span className="pilot-label pilot-label-light">SERVICES · CHOOSE BY BOTTLENECK</span><h1>Start with the work that keeps <span>coming back.</span></h1><p>You do not need to choose a tool. Choose the repeated task, handoff, or broken connection that costs your team the most attention.</p><Link href="/audit" className="btn btn-primary">Find the best first workflow <ArrowRight size={15} /></Link></div><div className="hub-diagnostic"><small>WHAT IS EATING THE WEEK?</small><Link href="/services/data-entry-automation"><span>01</span><b>We keep retyping information</b><ArrowRight size={16} /></Link><Link href="/services/client-onboarding-automation"><span>02</span><b>People wait for the next step</b><ArrowRight size={16} /></Link><Link href="/services/software-integration-services"><span>03</span><b>Our systems disagree</b><ArrowRight size={16} /></Link></div></div></section>
    <section className="hub-index"><div className="container"><header><span className="pilot-label">THE SERVICE INDEX</span><div><h2>Five service categories. Many possible workflows.</h2><p>These pages group related problems so the site stays easy to navigate. A Core Build scopes one agreed workflow from whichever category fits the bottleneck.</p></div></header><div className="hub-index-list">{routes.map((route, index) => <Link href={route.path} key={route.path}><span>{String(index + 1).padStart(2, "0")}</span><i><SiteIcon name={route.icon} size={22} /></i><div><h3>{route.label}</h3><p>{route.blurb}</p></div><ArrowRight size={20} /></Link>)}</div></div></section>
    <section className="hub-coverage"><div className="container"><div><span className="pilot-label">WORKFLOWS INSIDE THOSE SERVICES</span><h2>Not every workflow needs its own service page.</h2><p>Scheduling, document processing, CRM updates, reporting, alerts, invoicing, and reminders are delivery patterns inside the five categories—not seven extra packages to choose between.</p></div><ul><li>Document processing</li><li>Lead capture and routing</li><li>Client scheduling</li><li>Invoices and reminders</li><li>CRM and data sync</li><li>Reports and alerts</li></ul></div></section>
    <section className="hub-method"><div className="container"><div><span className="pilot-label pilot-label-light">ONE DELIVERY STANDARD</span><h2>Different workflow. Same ownership.</h2></div><ol><li><span>01</span><b>Mapped before it is built</b><p>Triggers, decisions, exceptions, and owners are documented first.</p></li><li><span>02</span><b>Tested away from live work</b><p>Your real process keeps running while the new one is proven safely.</p></li><li><span>03</span><b>Handed over visibly</b><p>You receive alerts, documentation, walkthroughs, and control.</p></li></ol></div></section>
    <PilotFaq title="Questions about our services" items={faq} />
    <section className="pilot-final pilot-final-service"><div className="container"><span className="pilot-label pilot-label-light">NOT SURE WHICH PROBLEM IS FIRST?</span><h2>Let the Audit rank the work.</h2><p>In seven days, you get a workflow map and a fixed-priority plan you keep either way.</p><Link href="/audit" className="btn btn-primary">See the $250 Automation Audit</Link></div></section><NewsletterSection />
  </main>;
}

const INDUSTRY_IMAGES: Record<string, string> = {
  "/industries/law-firms": "/assets/industries/law-firms-editorial.png",
  "/industries/real-estate": "/assets/industries/real-estate-editorial.png",
  "/industries/ecommerce-retail": "/assets/industries/ecommerce-editorial.png",
  "/industries/property-management": "/assets/industries/property-management-editorial.png",
  "/industries/accounting-bookkeeping": "/assets/industries/accounting-editorial.png",
};

export function IndustriesHubPilot({ routes, crumbs, faq }: { routes: SiteRoute[]; crumbs: Crumb[]; faq: FaqItem[] }) {
  return <main className="pilot-page hub-page hub-industries">
    <section className="ih-hero"><div className="container"><HubCrumbs crumbs={crumbs} /><div className="ih-hero-grid"><div><span className="pilot-label pilot-label-light">INDUSTRIES · OPERATIONS IN CONTEXT</span><h1>The busywork changes names. <span>The pattern stays familiar.</span></h1><p>Every industry has its own judgment, risk, and relationships. We automate the repeated handoffs around that human work.</p></div><div className="ih-collage">{routes.slice(0, 3).map((route) => <Link href={route.path} key={route.path}><Image src={INDUSTRY_IMAGES[route.path]} alt="" fill sizes="28vw" /><span>{route.label}</span></Link>)}</div></div></div></section>
    <section className="ih-gallery"><div className="container"><div className="pilot-section-head"><span className="pilot-label">CHOOSE YOUR OPERATING CONTEXT</span><h2>See where automation stops and professional judgment begins.</h2></div><div className="ih-grid">{routes.map((route) => <Link href={route.path} key={route.path}><div><Image src={INDUSTRY_IMAGES[route.path]} alt="" fill sizes="(max-width: 720px) 100vw, 40vw" /></div><span><small>INDUSTRY WORKFLOW</small><h3>{route.label}</h3><p>{route.blurb}</p><b>Explore the workflow <ArrowRight size={15} /></b></span></Link>)}</div></div></section>
    <section className="ih-pattern"><div className="container"><header><span className="pilot-label pilot-label-light">THE SHARED PATTERN</span><h2>Intake. Decisions. Handoffs. Follow-up.</h2></header><div><p><b>Automate</b> repeatable capture, routing, reminders, and updates.</p><p><b>Keep human</b> advice, approval, exceptions, and relationships.</p><p><b>Design controls</b> around access, retention, errors, and ownership.</p></div></div></section>
    <PilotFaq title="Questions about industry fit" items={faq} />
    <section className="pilot-final pilot-final-law"><div className="container"><span className="pilot-label">DON’T SEE YOUR INDUSTRY?</span><h2>Start with the workflow, not the label.</h2><p>Show us the repeated work. We will tell you whether the pattern is ready to automate.</p><Link href="/book" className="btn btn-dark">Book a free discovery call</Link></div></section><NewsletterSection />
  </main>;
}

export function IntegrationsHubPilot({ routes, crumbs, faq }: { routes: SiteRoute[]; crumbs: Crumb[]; faq: FaqItem[] }) {
  return <main className="pilot-page hub-page hub-integrations">
    <section className="xhub-hero"><div className="container xhub-grid"><div><HubCrumbs crumbs={crumbs} /><span className="pilot-label pilot-label-light">INTEGRATIONS · ARCHITECTURE BEFORE SOFTWARE</span><h1>Pick the tool after you understand <span>the work.</span></h1><p>Airtable, n8n, and Zapier solve different parts of an automation system. We map the workflow first, then choose the smallest platform that fits it.</p><Link href="/audit" className="btn btn-primary">Map the workflow first</Link></div><div className="xhub-map"><div className="xhub-node source">Your apps</div><i /><div className="xhub-core">Workflow</div><i /><div className="xhub-node output">Reliable result</div><PlatformLogo name="Airtable" className="xhub-tool t1" /><PlatformLogo name="n8n" className="xhub-tool t2" /><PlatformLogo name="Zapier" className="xhub-tool t3" /></div></div></section>
    <section className="xhub-compare"><div className="container"><div className="pilot-section-head"><span className="pilot-label">PLATFORM SELECTOR</span><h2>Three tools. Three different jobs.</h2></div><div className="xhub-table"><div className="head"><span>Platform</span><span>Best at</span><span>Watch for</span><span>Explore</span></div><div><b><PlatformLogo name="Airtable" /></b><span>Shared operational data and lightweight interfaces</span><span>Record limits and complex relational scale</span><Link href="/integrations/airtable">Architecture <ArrowRight size={14} /></Link></div><div><b><PlatformLogo name="n8n" /></b><span>Branching workflows, APIs, and deeper control</span><span>Technical ownership and maintenance</span><Link href="/integrations/n8n">Architecture <ArrowRight size={14} /></Link></div><div><b><PlatformLogo name="Zapier" /></b><span>Fast, familiar app-to-app automation</span><span>Task volume and complex branching cost</span><Link href="/integrations/zapier">Architecture <ArrowRight size={14} /></Link></div></div></div></section>
    <section className="xhub-routes"><div className="container">{routes.map((route, index) => <Link href={route.path} key={route.path}><span>{String(index + 1).padStart(2, "0")}</span><div><h3><PlatformLogo name={route.label} /></h3><p>{route.blurb}</p></div><ArrowRight size={20} /></Link>)}</div></section>
    <PilotFaq title="Questions about the tools we use" items={faq} />
    <section className="pilot-final pilot-final-air"><div className="container"><span className="pilot-label pilot-label-light">TOOL-NEUTRAL BY DESIGN</span><h2>Recommend the platform after the process.</h2><p>The $250 Audit maps the workflow, cost, ownership, and failure handling before a subscription is added.</p><Link href="/audit" className="btn btn-primary">See the Automation Audit</Link></div></section><NewsletterSection />
  </main>;
}
