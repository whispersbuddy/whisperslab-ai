import type { Metadata } from "next";
import { notFound } from "next/navigation";
import JsonLd from "@/components/JsonLd";
import BlogCard from "@/components/BlogCard";
import NewsletterSection from "@/components/NewsletterSection";
import SiteIcon from "@/components/SiteIcon";
import BeforeAfter from "@/components/service/BeforeAfter";
import Estimator from "@/components/service/Estimator";
import { CtaAudit, FaqSplit, SectionHead, ServiceHero, StackHub, Stepper } from "@/components/service/Sections";
import { DayTimeline, PatternMatchProof, TrustLayers } from "@/components/industry/Sections";
import { getIndustry, INDUSTRIES } from "@/app/_content/industries";
import { getAllPosts } from "@/lib/content";
import { getRoute, isLive, isPathLive } from "@/lib/routes";
import { breadcrumbSchema, buildMetadata, faqSchema, graph, PROVIDER, requireLive, SITE_URL } from "@/lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return INDUSTRIES.map((i) => ({ slug: i.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const i = getIndustry(slug);
  if (!i) return {};
  return buildMetadata({ title: i.seo.title, description: i.seo.description, path: `/industries/${slug}` });
}

export default async function IndustryPageRoute({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const i = getIndustry(slug);
  if (!i) notFound();
  const path = `/industries/${slug}`;
  requireLive(path);

  const route = getRoute(path);
  const crumbs = [
    { name: "Home", path: "/" },
    ...(isPathLive("/industries") ? [{ name: "Industries", path: "/industries" }] : []),
    { name: route?.label ?? i.seo.keyword, path },
  ];
  const services = i.related.services.map((p) => getRoute(p)).filter((r) => r && isLive(r));
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
            audience: { "@type": "BusinessAudience", audienceType: route?.label },
            offers: { "@type": "Offer", name: "Automation Audit", price: 250, priceCurrency: "USD", url: SITE_URL + "/audit" },
          },
          faqSchema(i.faq.items),
          breadcrumbSchema(crumbs)
        )}
      />
      <main className="sv-page">
        <ServiceHero hero={i.hero} crumbs={crumbs}>
          <BeforeAfter before={i.week.before} after={i.week.after} />
        </ServiceHero>

        <section className="section sv-section">
          <div className="container">
            <SectionHead eyebrow={i.week.eyebrow} title={i.week.title} intro={i.week.intro} />
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
                    {i.week.table.map((r) => (
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
            <SectionHead eyebrow={i.moments.eyebrow} title={i.moments.title} intro={i.moments.intro} />
            <DayTimeline items={i.moments.items} />
          </div>
        </section>

        <section className="section sv-section">
          <div className="container">
            <StackHub stack={i.stack} />
          </div>
        </section>

        <section className="section sv-section sv-dark" id="intake">
          <div className="container">
            <SectionHead eyebrow={i.intake.eyebrow} title={i.intake.title} light />
            <Stepper steps={i.intake} />
          </div>
        </section>

        <section className="section sv-section">
          <div className="container">
            <SectionHead eyebrow={i.trust.eyebrow} title={i.trust.title} />
            <TrustLayers trust={i.trust} />
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
            <SectionHead eyebrow={i.proof.eyebrow} title={i.proof.title} intro={i.proof.intro} />
            <PatternMatchProof rows={i.proof.rows} />
          </div>
        </section>

        {services.length || posts.length ? (
          <section className="section sv-section sv-white">
            <div className="container">
              {services.length ? (
                <>
                  <SectionHead eyebrow="RELATED SERVICES" title="Services built for this" />
                  <div className="sv-ind-grid">
                    {services.map((r) => (
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
