import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import NewsletterSection from "@/components/NewsletterSection";
import { renderInline, toPlainText } from "@/components/BlogInline";
import { BLOG_POSTS, getBlogPostBySlug } from "@/app/_content/blogData";
import { getCategoryBySlug } from "@/app/_content/blogTaxonomy";
import { getCaseStudyBySlug } from "@/app/_content/caseStudiesData";

const SITE_URL = "https://www.whisperslab.com";

export function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) return {};

  const title = `${post.title} — Whispers Lab Blog`;
  const description = post.excerpt;
  const url = `/blog/${post.slug}`;
  const imageUrl = post.heroImage.startsWith("http")
    ? post.heroImage
    : `${SITE_URL}${post.heroImage}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      siteName: "Whispers Lab",
      locale: "en_US",
      title,
      description,
      url,
      images: [{ url: imageUrl, width: 1200, height: 630, alt: post.heroImageAlt }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) notFound();

  const category = getCategoryBySlug(post.category);
  const relatedCaseStudies = (post.relatedCaseStudySlugs ?? [])
    .map((s) => getCaseStudyBySlug(s))
    .filter((cs): cs is NonNullable<typeof cs> => Boolean(cs));
  const relatedPosts = (post.relatedPosts ?? [])
    .map((s) => getBlogPostBySlug(s))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));
  const postUrl = `${SITE_URL}/blog/${post.slug}`;
  const imageUrl = post.heroImage.startsWith("http")
    ? post.heroImage
    : `${SITE_URL}${post.heroImage}`;

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    image: imageUrl,
    datePublished: post.publishedAt,
    dateModified: post.publishedAt,
    articleSection: category?.name,
    author: {
      "@type": "Person",
      name: "Haris Ali",
      jobTitle: "Co-Founder, Whispers Lab",
    },
    publisher: {
      "@type": "Organization",
      name: "Whispers Lab",
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/assets/logo-trim.png`,
      },
    },
    mainEntityOfPage: postUrl,
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE_URL}/blog` },
      { "@type": "ListItem", position: 3, name: post.title, item: postUrl },
    ],
  };

  const faqSchema =
    post.faq.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: post.faq.map((item) => ({
            "@type": "Question",
            name: item.question,
            acceptedAnswer: {
              "@type": "Answer",
              text: toPlainText(item.answer),
            },
          })),
        }
      : null;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}
      <SiteHeader />
      <main>
        <article>
          <section className="blog-detail-banner">
            <div className="container">
              <nav className="blog-breadcrumb" aria-label="Breadcrumb">
                <Link href="/blog">Blog</Link>
                <span> / </span>
              </nav>
              {category && <span className="blog-category-badge">{category.name}</span>}
              <h1>{post.title}</h1>
              <p className="blog-detail-meta">
                By Haris Ali ·{" "}
                <time dateTime={post.publishedAt}>
                  {new Date(post.publishedAt).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </time>
                {" · "}
                {post.readTime}
              </p>
            </div>
            <div className="container">
              <div className="blog-detail-hero">
                <img src={post.heroImage} alt={post.heroImageAlt} />
              </div>
              {post.heroImageCredit && (
                <span className="blog-image-credit">
                  <a href={post.heroImageCredit.url} target="_blank" rel="noopener">
                    {post.heroImageCredit.text}
                  </a>
                </span>
              )}
            </div>
          </section>

          <section className="section">
            <div className="container">
              <div className="blog-detail-body">
                {post.takeaways.length > 0 && (
                  <div className="blog-takeaways">
                    <span className="blog-takeaways-label">KEY TAKEAWAYS</span>
                    <ul>
                      {post.takeaways.map((t, i) => (
                        <li key={i}>{renderInline(t)}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {post.content.map((block, i) => {
                  if (block.type === "h2") {
                    return <h2 key={i}>{block.text}</h2>;
                  }
                  if (block.type === "p") {
                    return <p key={i}>{renderInline(block.text)}</p>;
                  }
                  if (block.type === "list") {
                    return (
                      <ul key={i}>
                        {block.items.map((item, j) => (
                          <li key={j}>{renderInline(item)}</li>
                        ))}
                      </ul>
                    );
                  }
                  if (block.type === "callout") {
                    return (
                      <div className="blog-detail-callout" key={i}>
                        {renderInline(block.text)}
                      </div>
                    );
                  }
                  return null;
                })}

                {relatedCaseStudies.length > 0 && (
                  <div className="blog-related-case">
                    <span className="blog-takeaways-label">
                      {relatedCaseStudies.length > 1 ? "RELATED CASE STUDIES" : "RELATED CASE STUDY"}
                    </span>
                    <ul>
                      {relatedCaseStudies.map((cs) => (
                        <li key={cs.slug}>
                          <Link href={`/case-studies/${cs.slug}`}>{cs.title} →</Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {relatedPosts.length > 0 && (
                  <div className="blog-related-case">
                    <span className="blog-takeaways-label">RELATED READING</span>
                    <ul>
                      {relatedPosts.map((p) => (
                        <li key={p.slug}>
                          <Link href={`/blog/${p.slug}`}>{p.title} →</Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {post.faq.length > 0 && (
                  <div className="blog-faq">
                    <h2>Frequently asked questions</h2>
                    {post.faq.map((item, i) => (
                      <div className="blog-faq-item" key={i}>
                        <h3>{item.question}</h3>
                        <p>{renderInline(item.answer)}</p>
                      </div>
                    ))}
                  </div>
                )}

                <div className="blog-detail-cta">
                  <p>Think this might apply to your business?</p>
                  <a href="/audit" className="btn btn-primary">
                    Get the $250 Automation Audit
                  </a>
                </div>
              </div>
            </div>
          </section>
        </article>

        <NewsletterSection />
      </main>
      <SiteFooter />
    </>
  );
}
