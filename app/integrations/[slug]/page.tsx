import type { Metadata } from "next";
import { notFound } from "next/navigation";
import JsonLd from "@/components/JsonLd";
import BlogCard from "@/components/BlogCard";
import NewsletterSection from "@/components/NewsletterSection";
import SiteIcon from "@/components/SiteIcon";
import LiveSimulator from "@/components/service/LiveSimulator";
import BeforeAfter from "@/components/service/BeforeAfter";
import Estimator from "@/components/service/Estimator";
import { Bento, CtaAudit, FaqSplit, ResultStory, SectionHead, ServiceHero, StackHub, Stepper, ValueStrip } from "@/components/service/Sections";
import { getIntegration, INTEGRATIONS } from "@/app/_content/integrations";
import { getAllPosts } from "@/lib/content";
import { getRoute, isLive, isPathLive } from "@/lib/routes";
import { breadcrumbSchema, buildMetadata, faqSchema, graph, PROVIDER, requireLive, SITE_URL } from "@/lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return INTEGRATIONS.map((i) => ({ slug: i.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const i = getIntegration(slug);
  if (!i) return {};
  return buildMetadata({ title: i.seo.title, description: i.seo.description, path: `/integrations/${slug}` });
}

export default async function IntegrationPageRoute({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const i = getIntegration(slug);
  if (!i) notFound();
  const path = `/integrations/${slug}`;
  requireLive(path);

  const route = getRoute(path);
  const crumbs = [
    { name: "Home", path: "/" },
    ...(isPathLive("/integrations") ? [{ name: "Integrations", path: "/integrations" }] : []),
    { name: route?.label ?? i.seo.keyword, path },
  ];
  const industries = i.related.industries.map((p) => getRoute(p)).filter((r) => r && isLive(r));
  const posts = (await getAllPosts()).filter((p) => i.related.posts.includes(p.slug));

  return (
    <>
      <JsonLd
        data={graph(
          {
            "@type": "Service",
            "@id": SITE_URL + path + "#service",
            name: route?.label,
            serviceType: i.seo.keyword,
            description: i.hero.answer,
            url: SITE_URL + path,
            provider: PROVIDER,
            areaServed: { "@type": "Country", name: "United States" },
            audience: { "@type": "BusinessAudience", audienceType: "Small businesses" },
            mentions: { "@type": "SoftwareApplication", name: i.tool.name, applicationCategory: "BusinessApplication", url: i.tool.url, ...(i.tool.sameAs ? { sameAs: i.tool.sameAs } : {}) },
            offers: { "@type": "Offer", name: "Automation Audit", price: 250, priceCurrency: "USD", url: SITE_URL + "/audit" },
          },
          faqSchema(i.faq.items),
          breadcrumbSchema(crumbs)
        )}
      />
      <main className="sv-page">
        <ServiceHero hero={i.hero} crumbs={crumbs}>
          <LiveSimulator modes={i.simulator} />
        </ServiceHero>

        <ValueStrip values={i.values} />

        <section className="section sv-section" id="includes">
          <div className="container">
            <SectionHead eyebrow={i.beforeAfter.eyebrow} title={i.beforeAfter.title} intro={i.beforeAfter.intro} />
            <BeforeAfter before={i.beforeAfter.before} after={i.beforeAfter.after} />
            <details className="sv-more-detail">
              <summary>See the before and after in detail</summary>
              <div className="compare-scroll">
                <table className="compare-table">
                  <caption className="sr-only">Before and after {i.seo.keyword}</caption>
                  <thead>
                    <tr>
                      <th scope="col">
                        <span className="sr-only">Task</span>
                      </th>
                      <th scope="col">Before</th>
                      <th scope="col">After</th>
                    </tr>
                  </thead>
                  <tbody>
                    {i.beforeAfter.table.map((r) => (
                      <tr key={r.row}>
                        <th scope="row">{r.row}</th>
                        <td>{r.before}</td>
                        <td>{r.after}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </details>
          </div>
        </section>

        <section className="section sv-section sv-white">
          <div className="container">
            <SectionHead eyebrow={i.steps.eyebrow} title={i.steps.title} />
            <Stepper steps={i.steps} />
          </div>
        </section>

        <section className="section sv-section">
          <div className="container">
            <SectionHead eyebrow={i.bento.eyebrow} title={i.bento.title} intro={i.bento.intro} />
            <Bento tiles={i.bento.tiles} />
          </div>
        </section>

        <section className="section sv-section sv-dark" id="estimate">
          <div className="container">
            <SectionHead eyebrow={i.estimator.eyebrow} title={i.estimator.title} intro={i.estimator.intro} light />
            <Estimator inputs={i.estimator.inputs} unit={i.estimator.unit} />
            <div className="sv-worth">
              {i.estimator.worth.map((w) => (
                <span key={w}>{w}</span>
              ))}
            </div>
          </div>
        </section>

        <section className="section sv-section">
          <div className="container">
            <ResultStory proof={i.proof} />
          </div>
        </section>

        <section className="section sv-section sv-white">
          <div className="container">
            <StackHub stack={i.stack} />
          </div>
        </section>

        {industries.length || posts.length ? (
          <section className="section sv-section">
            <div className="container">
              {industries.length ? (
                <>
                  <SectionHead eyebrow="WHO WE BUILD THIS FOR" title="Industries we build this for" />
                  <div className="sv-ind-grid">
                    {industries.map((r) => (
                      <a key={r!.path} href={r!.path} className="sv-ind">
                        <span className="sv-ind-icon">
                          <SiteIcon name={r!.icon} size={20} />
                        </span>
                        <span>
                          <b>{r!.label}</b>
                          <span>{r!.blurb}</span>
                        </span>
                      </a>
                    ))}
                  </div>
                </>
              ) : null}
              {posts.length ? (
                <div className="sv-reading">
                  <SectionHead eyebrow="RELATED READING" title="Guides from our blog" />
                  <div className="blog-grid">
                    {posts.map((p) => (
                      <BlogCard key={p.slug} post={p} />
                    ))}
                  </div>
                </div>
              ) : null}
            </div>
          </section>
        ) : null}

        <section className="section sv-section" id="faq">
          <div className="container">
            <FaqSplit faq={i.faq} />
          </div>
        </section>

        <CtaAudit cta={i.cta} />
        <NewsletterSection />
      </main>
    </>
  );
}
