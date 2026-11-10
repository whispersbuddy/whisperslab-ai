import Link from "next/link";
import { ArrowRight, Check, FileSearch, ShieldCheck, Sparkles } from "lucide-react";

export default function HomeOfferPath() {
  return (
    <section className="home-offer-path" id="services">
      <div className="container">
        <header className="home-offer-head">
          <div><span className="eyebrow">HOW WE WORK</span><h2>How does it work?</h2></div>
          <p>Start where your business is today: diagnose the opportunity, build the right workflow, then add ongoing care only when there is something worth protecting.</p>
        </header>

        <div className="home-offer-journey">
          <article className="home-offer-stage is-recommended">
            <div className="home-offer-stage-top"><span>01 · DIAGNOSE</span><em>RECOMMENDED START</em></div>
            <div className="home-offer-icon"><FileSearch aria-hidden="true" /></div>
            <h3>7-Day Automation Audit</h3>
            <strong>$250 <small>· delivered in 7 business days</small></strong>
            <p>Know which 2 to 3 workflows to automate first, what they cost today, and what implementation would involve.</p>
            <ul><li><Check size={14} />Up to three mapped workflows</li><li><Check size={14} />Cost and time baseline</li><li><Check size={14} />Prioritized execution blueprint</li></ul>
            <Link href="/audit">See the Automation Audit <ArrowRight size={16} /></Link>
          </article>

          <article className="home-offer-stage">
            <div className="home-offer-stage-top"><span>02 · BUILD</span></div>
            <div className="home-offer-icon"><Sparkles aria-hidden="true" /></div>
            <h3>30-Day Core Build</h3>
            <strong>From $2,500 <small>· fixed scope</small></strong>
            <p>We build, test, and launch your highest-value workflow with acceptance testing and a clear definition of done.</p>
            <ul><li><Check size={14} />One standard workflow from $2,500</li><li><Check size={14} />Documentation and team training</li><li><Check size={14} />30-day launch stabilization</li></ul>
            <Link href="/core-build">Explore the Core Build <ArrowRight size={16} /></Link>
          </article>

          <article className="home-offer-stage home-offer-operate">
            <div className="home-offer-stage-top"><span>03 · OPERATE</span></div>
            <div className="home-offer-icon"><ShieldCheck aria-hidden="true" /></div>
            <h3>Protect or keep building.</h3>
            <p>Already rely on automation? Choose the operating layer that matches what the business needs next.</p>
            <div className="home-operate-choice">
              <Link href="/automation-care"><span><b>Automation Care</b><small>$500/month</small></span><em>Maintain what exists</em><ArrowRight size={15} /></Link>
              <Link href="/growth-partner"><span><b>AI Growth Partner</b><small>From $1,250/month</small></span><em>Maintain and expand</em><ArrowRight size={15} /></Link>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
