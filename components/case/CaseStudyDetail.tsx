// /case-studies/[slug] in the homepage design system. Styles: app/styles/cases.css.
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import AuthorByline from "@/components/AuthorByline";
import CaseFlow from "@/components/CaseFlow";
import CaseFlowDiagram from "@/components/CaseFlowDiagram";
import NewsletterSection from "@/components/NewsletterSection";
import { CASE_FLOWS } from "@/app/_content/caseFlows";

type Link2 = { href: string; title: string };
type Media = string | { url: string; type?: string; alt?: string };

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function CaseStudyDetail({ cs, slug, updated, guides, more }: { cs: any; slug: string; updated?: string; guides: Link2[]; more: Link2[] }) {
  const d = cs.detail ?? {};
  const media: Media[] = Array.isArray(d.media) ? d.media : [];
  const steps: string[] = Array.isArray(d.howItWorks) ? d.howItWorks : [];

  return (
    <main className="case-page hm">
      <section className="hm-section hm-dark hm-phero hm-cdhero">
        <div className="hm-dark-bg" aria-hidden="true" />
        <div className="container">
          <nav className="hm-crumbs" aria-label="Breadcrumb">
            <span>
              <Link href="/">Home</Link>
              <i aria-hidden="true">/</i>
            </span>
            <span>
              <Link href="/case-studies">Case Studies</Link>
              <i aria-hidden="true">/</i>
            </span>
            <span aria-current="page">{cs.industry}</span>
          </nav>
          <p className="hm-eyebrow hm-eyebrow-light">
            {cs.industry} · {cs.buildType === "ai" ? "AI-powered" : "Automated"}
          </p>
          <h1>{cs.title}</h1>
          <p className="hm-lead">
            <b>The goal:</b> {cs.goal}
          </p>
          <AuthorByline updated={updated} />
        </div>
      </section>

      {cs.metrics?.length ? (
        <section className="hm-section hm-white hm-cdmetrics">
          <div className="container">
            <ul className="hm-stats">
              {cs.metrics.map((m: { num: string; label: string }) => (
                <li key={m.label}>
                  <strong>{m.num}</strong>
                  <h3>{m.label}</h3>
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      <section className="hm-section hm-white hm-cdbody">
        <div className="container hm-cd">
          <aside className="hm-cd-side">
            <p className="hm-eyebrow">Who this was for</p>
            <p>{d.clientSnapshot}</p>
            {d.tools?.length ? (
              <ul className="hm-cd-tools">
                {d.tools.map((t: string) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
            ) : null}
          </aside>

          <article className="hm-cd-article">
            {media.length > 0 ? (
              <div className="hm-cd-media">
                {media.map((item, i) => {
                  const url = typeof item === "string" ? item : item.url;
                  const isVideo = /\.(mp4|webm|ogg)$/i.test(url) || (typeof item !== "string" && item.type === "video");
                  return isVideo ? (
                    <video key={i} src={url} controls />
                  ) : (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img key={i} src={url} alt={typeof item !== "string" && item.alt ? item.alt : ""} />
                  );
                })}
              </div>
            ) : null}

            <section>
              <h2>The situation</h2>
              {d.situation?.map((p: string, i: number) => (
                <p key={i}>{p}</p>
              ))}
            </section>

            <section>
              <h2>What we built</h2>
              {d.whatWeBuilt?.map((p: string, i: number) => (
                <p key={i}>{p}</p>
              ))}
            </section>

            <section>
              <h2>How it works</h2>
              {steps.length >= 2 ? (
                CASE_FLOWS[slug]?.steps.length === steps.length ? <CaseFlowDiagram steps={steps} flow={CASE_FLOWS[slug]} /> : <CaseFlow steps={steps} />
              ) : null}
              <ol className="hm-cd-steps">
                {steps.map((s, i) => (
                  <li key={i}>
                    <span>{String(i + 1).padStart(2, "0")}</span>
                    <p>{s}</p>
                  </li>
                ))}
              </ol>
            </section>

            <section>
              <h2>The challenges we solved</h2>
              <ul className="hm-cd-checks">
                {d.challenges?.map((c: string, i: number) => (
                  <li key={i}>
                    <Check size={18} aria-hidden="true" />
                    <span>{c}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <h2>The result</h2>
              {d.result?.map((p: string, i: number) => (
                <p key={i}>{p}</p>
              ))}
            </section>
          </article>
        </div>
      </section>

      {guides.length > 0 || more.length > 0 ? (
        <section className="hm-section hm-paper hm-related">
          <div className="container hm-related-grid">
            {guides.length > 0 ? (
              <div>
                <p className="hm-eyebrow">{guides.length > 1 ? "Related guides" : "Related guide"}</p>
                <ul className="hm-rows">
                  {guides.map((l) => (
                    <li key={l.href}>
                      <Link href={l.href}>
                        <span>{l.title}</span>
                        <ArrowRight size={20} aria-hidden="true" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
            {more.length > 0 ? (
              <div>
                <p className="hm-eyebrow">More case studies</p>
                <ul className="hm-rows">
                  {more.map((l) => (
                    <li key={l.href}>
                      <Link href={l.href}>
                        <span>{l.title}</span>
                        <ArrowRight size={20} aria-hidden="true" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>
        </section>
      ) : null}

      <section className="hm-final">
        <div className="hm-final-bg" aria-hidden="true" />
        <div className="container hm-final-inner">
          <p className="hm-eyebrow">A clear first step</p>
          <h2>Want a system like this built for your business?</h2>
          <p>Book a free discovery call and we will tell you what we would automate first.</p>
          <div className="hm-actions hm-actions-center">
            <Link href="/book" className="hm-btn">
              <span>Book a free discovery call</span>
              <ArrowRight size={16} aria-hidden="true" />
            </Link>
            <Link href="/case-studies" className="hm-btn hm-btn-outline">
              <span>All case studies</span>
              <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
      <NewsletterSection variant="home" />
    </main>
  );
}
