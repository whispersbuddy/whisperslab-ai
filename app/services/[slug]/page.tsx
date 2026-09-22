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
import { getService, SERVICES } from "@/app/_content/services";
import { getAllPosts } from "@/lib/content";
import { getRoute, isLive, isPathLive } from "@/lib/routes";
import { breadcrumbSchema, buildMetadata, faqSchema, graph, PROVIDER, requireLive, SITE_URL } from "@/lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return SERVICES.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const s = getService(slug);
  if (!s) return {};
  return buildMetadata({ title: s.seo.title, description: s.seo.description, path: `/services/${slug}` });
}

export default async function ServicePageRoute({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const s = getService(slug);
  if (!s) notFound();
  const path = `/services/${slug}`;
  requireLive(path);

  const route = getRoute(path);
  const crumbs = [
    { name: "Home", path: "/" },
    ...(isPathLive("/services") ? [{ name: "Services", path: "/services" }] : []),
    { name: route?.label ?? s.seo.keyword, path },
  ];
  const industries = s.related.industries.map((p) => getRoute(p)).filter((r) => r && isLive(r));
  const posts = (await getAllPosts()).filter((p) => s.related.posts.includes(p.slug));

  return (
    <>
      <JsonLd
        data={graph(
          {
            "@type": "Service",
            "@id": SITE_URL + path + "#service",
            name: route?.label,
            serviceType: s.seo.keyword,
            description: s.hero.answer,
            url: SITE_URL + path,
            provider: PROVIDER,
            areaServed: { "@type": "Country", name: "United States" },
            audience: { "@type": "BusinessAudience", audienceType: "Small businesses" },
            hasOfferCatalog: {
              "@type": "OfferCatalog",
              name: `${route?.label} workflows`,
              itemListElement: s.bento.tiles.map((t) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name: t.title } })),
            },
            offers: { "@type": "Offer", name: "Automation Audit", price: 250, priceCurrency: "USD", url: SITE_URL + "/audit" },
          },
          faqSchema(s.faq.items),
          breadcrumbSchema(crumbs)
        )}
      />
      <main className="sv-page">
        <ServiceHero hero={s.hero} crumbs={crumbs}>
          <LiveSimulator modes={s.simulator} />
        </ServiceHero>

        <ValueStrip values={s.values} />

        <section className="section sv-section">
          <div className="container">
            <SectionHead eyebrow={s.beforeAfter.eyebrow} title={s.beforeAfter.title} intro={s.beforeAfter.intro} />
            <BeforeAfter before={s.beforeAfter.before} after={s.beforeAfter.after} />
            <details className="sv-more-detail">
              <summary>See the before and after in detail</summary>
              <div className="compare-scroll">
                <table className="compare-table">
                  <caption className="sr-only">Before and after {s.seo.keyword}</caption>
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
                    {s.beforeAfter.table.map((r) => (
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
            <SectionHead eyebrow={s.steps.eyebrow} title={s.steps.title} />
            <Stepper steps={s.steps} />
          </div>
        </section>

        <section className="section sv-section">
          <div className="container">
            <SectionHead eyebrow={s.bento.eyebrow} title={s.bento.title} intro={s.bento.intro} />
            <Bento tiles={s.bento.tiles} />
          </div>
        </section>

        <section className="section sv-section sv-dark" id="estimate">
          <div className="container">
            <SectionHead eyebrow={s.estimator.eyebrow} title={s.estimator.title} intro={s.estimator.intro} light />
            <Estimator inputs={s.estimator.inputs} unit={s.estimator.unit} />
            <div className="sv-worth">
              {s.estimator.worth.map((w) => (
                <span key={w}>{w}</span>
              ))}
            </div>
          </div>
        </section>

        <section className="section sv-section">
          <div className="container">
            <ResultStory proof={s.proof} />
          </div>
        </section>

        <section className="section sv-section sv-white">
          <div className="container">
            <StackHub stack={s.stack} />
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
            <FaqSplit faq={s.faq} />
          </div>
        </section>

        <CtaAudit cta={s.cta} />
        <NewsletterSection />
      </main>
    </>
  );
}
