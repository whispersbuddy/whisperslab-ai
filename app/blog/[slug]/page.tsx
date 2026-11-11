import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import NewsletterSection from "@/components/NewsletterSection";
import { renderInline, toPlainText } from "@/components/BlogInline";
import { getCategoryBySlug } from "@/app/_content/blogTaxonomy";
import { getCaseStudyBySlug } from "@/app/_content/caseStudiesData";
import { getBlogPostBySlug, BLOG_POSTS } from "@/app/_content/blogData";
import { fetchArticleBySlug, fetchCaseStudyBySlug } from "@/lib/api";
import { getAllPosts, getRelatedPosts } from "@/lib/content";
import { ArrowRight } from "lucide-react";
import { PostCard } from "@/components/blog/BlogIndex";
import { blogServiceLinks } from "@/lib/blogLinks";
import { FOUNDER, PUBLISHER, WEBSITE_ID } from "@/lib/seo";
import ReactMarkdown from 'react-markdown';

const SITE_URL = "https://www.whisperslab.com";

function getResolvedImageUrl(imagePath?: string): string {
  if (!imagePath) return "";
  if (imagePath.startsWith("http://localhost:1337")) {
    return imagePath.replace("http://localhost:1337", process.env.NEXT_PUBLIC_STRAPI_URL || "");
  }
  if (imagePath.startsWith("/uploads/")) {
    return `${process.env.NEXT_PUBLIC_STRAPI_URL}${imagePath}`;
  }
  return imagePath;
}

// Uses the local copy of a post when Strapi is unreachable, so an outage
// doesn't turn every post into a 404.
async function loadPost(slug: string) {
  const fromStrapi = await fetchArticleBySlug(slug);
  if (fromStrapi) return fromStrapi;
  const local = getBlogPostBySlug(slug);
  return local ? { ...local, description: local.excerpt } : null;
}

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const fetchedPost = await loadPost(slug);
  if (!fetchedPost) return {};

  const staticData = getBlogPostBySlug(slug) || BLOG_POSTS.find(p => p.title === fetchedPost.title);
  const strapiImage = fetchedPost.cover?.url || fetchedPost.heroImage;
  
  const post = {
    ...staticData,
    ...fetchedPost,
    heroImage: getResolvedImageUrl(strapiImage || staticData?.heroImage),
    heroImageAlt: fetchedPost.heroImageAlt || staticData?.heroImageAlt,
  };

  const title = `${post.title} | Whispers Lab Blog`;
  const description = post.description;
  const url = `/blog/${post.slug}`;
  const imageUrl = post.heroImage?.startsWith("http")
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
  const fetchedPost = await loadPost(slug);
  if (!fetchedPost) notFound();

  const staticData = getBlogPostBySlug(slug) || BLOG_POSTS.find(p => p.title === fetchedPost.title);
  const strapiImage = fetchedPost.cover?.url || fetchedPost.heroImage;
  const categoryVal = typeof fetchedPost.category === "object" ? fetchedPost.category : (fetchedPost.category || staticData?.category);

  let contentVal = fetchedPost.content || staticData?.content;
  
  if (typeof contentVal === 'string') {
    // Convert "Not sure ... Automation Audit" paragraphs into blockquotes so they render as callouts
    contentVal = contentVal.replace(/^(Not sure.*?Automation Audit.*?)$/gm, '> $1');
  }
  let readTimeVal = fetchedPost.readTime || staticData?.readTime;
  if (!readTimeVal && typeof contentVal === 'string') {
    const wordCount = contentVal.trim().split(/\s+/).length;
    const minutes = Math.max(1, Math.round(wordCount / 225));
    readTimeVal = `${minutes} min read`;
  }

  let faqVal = fetchedPost.faq || staticData?.faq;
  if ((!faqVal || faqVal.length === 0) && typeof contentVal === 'string') {
    const faqRegex = /(?:^|\n)##\s*Frequently [Aa]sked [Qq]uestions\s*\n([\s\S]*)$/i;
    const match = contentVal.match(faqRegex);
    if (match) {
      const faqText = match[1];
      const newFaq: any[] = [];
      const blocks = faqText.split(/(?:^|\n)###\s+/);
      for (const block of blocks) {
        if (!block.trim()) continue;
        const firstNewline = block.indexOf('\n');
        if (firstNewline === -1) {
          newFaq.push({ question: block.trim(), answer: "" });
        } else {
          const question = block.substring(0, firstNewline).trim();
          const answer = block.substring(firstNewline).trim();
          newFaq.push({ question, answer });
        }
      }
      if (newFaq.length > 0) {
        faqVal = newFaq;
        contentVal = contentVal.replace(faqRegex, '').trim();
      }
    }
  }

  const post = {
    ...staticData,
    ...fetchedPost,
    heroImage: getResolvedImageUrl(strapiImage || staticData?.heroImage),
    heroImageAlt: fetchedPost.heroImageAlt || staticData?.heroImageAlt,
    heroImageCredit: fetchedPost.heroImageCredit || staticData?.heroImageCredit,
    category: categoryVal,
    publishedAt: fetchedPost.publishedAt || staticData?.publishedAt,
    readTime: readTimeVal,
    takeaways: fetchedPost.takeaways || staticData?.takeaways,
    content: contentVal,
    faq: faqVal,
    relatedCaseStudySlugs: fetchedPost.relatedCaseStudySlugs || staticData?.relatedCaseStudySlugs,
    relatedPosts: fetchedPost.relatedPosts || staticData?.relatedPosts,
  };

  const category = typeof post.category === "object" ? post.category : getCategoryBySlug(post.category);
  let relatedCaseStudies: any[] = [];
  if (fetchedPost?.relatedCaseStudies && fetchedPost.relatedCaseStudies.length > 0) {
    relatedCaseStudies = fetchedPost.relatedCaseStudies;
  } else if (post.relatedCaseStudySlugs && post.relatedCaseStudySlugs.length > 0) {
    relatedCaseStudies = post.relatedCaseStudySlugs
      .map((s: string) => getCaseStudyBySlug(s))
      .filter((cs: any): cs is NonNullable<typeof cs> => Boolean(cs));
  } else if (typeof post.content === 'string') {
    const caseStudyRegex = /\[([^\]]+)\]\((?:https?:\/\/[^\/]+)?\/case-studies\/([^\)\/]+)\/?\)/;
    const match = post.content.match(caseStudyRegex);
    if (match) {
      const linkText = match[1];
      const linkSlug = match[2];
      
      let csTitle = linkText;
      const localCs = getCaseStudyBySlug(linkSlug);
      if (localCs) {
         csTitle = localCs.title;
      } else {
         const strapiCs = await fetchCaseStudyBySlug(linkSlug);
         if (strapiCs) {
             csTitle = strapiCs.title;
         }
      }
      
      relatedCaseStudies = [{
         title: csTitle,
         slug: linkSlug
      }];
    }
  }
  
  const relatedPosts = await getRelatedPosts(post.slug);

  const postUrl = `${SITE_URL}/blog/${post.slug}`;
  const imageUrl = post.heroImage?.startsWith("http")
    ? post.heroImage
    : `${SITE_URL}${post.heroImage}`;

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    image: imageUrl,
    datePublished: post.publishedAt,
    dateModified: post.publishedAt,
    articleSection: category?.name,
    author: FOUNDER,
    publisher: PUBLISHER,
    isPartOf: { "@id": WEBSITE_ID },
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
    post.faq && post.faq.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: post.faq.map((item: any) => ({
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
      <main className="hm hm-post">
        <article>
          <header className="hm-section hm-dark hm-phero hm-post-hero">
            <div className="hm-dark-bg" aria-hidden="true" />
            <div className="container">
              <nav className="hm-crumbs" aria-label="Breadcrumb">
                <span>
                  <Link href="/">Home</Link>
                  <i aria-hidden="true">/</i>
                </span>
                <span>
                  <Link href="/blog">Blog</Link>
                </span>
              </nav>
              {category && <p className="hm-eyebrow hm-eyebrow-light">{category.name}</p>}
              <h1>{post.title}</h1>
              <p className="hm-post-meta">
                <span>By Haris Ali</span>
                <i aria-hidden="true">/</i>
                <time dateTime={post.publishedAt}>
                  {new Date(post.publishedAt).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </time>
                {post.readTime && (
                  <>
                    <i aria-hidden="true">/</i>
                    <span>{post.readTime}</span>
                  </>
                )}
              </p>
            </div>
          </header>

          <section className="hm-section hm-white hm-post-section">
            <div className="container">
              {post.heroImage && (
                <figure className="hm-post-figure">
                  <img src={post.heroImage} alt={post.heroImageAlt} />
                  {post.heroImageCredit && (
                    <figcaption>
                      <a href={post.heroImageCredit.url} target="_blank" rel="noopener">
                        {post.heroImageCredit.text}
                      </a>
                    </figcaption>
                  )}
                </figure>
              )}

              <div className="hm-post-body">
                {post.takeaways && post.takeaways.length > 0 && (
                  <div className="hm-takeaways">
                    <p className="hm-eyebrow">Key takeaways</p>
                    <ul>
                      {(typeof post.takeaways === 'string' ? post.takeaways.split('\n').filter(Boolean) : post.takeaways).map((t: any, i: number) => (
                        <li key={i}>{renderInline(t)}</li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="hm-prose">
                  {typeof post.content === 'string' ? (
                    <ReactMarkdown
                      components={{
                        blockquote(props) {
                          return <div className="hm-callout">{props.children}</div>;
                        }
                      }}
                    >
                      {post.content}
                    </ReactMarkdown>
                  ) : (
                    post.content?.map((block: any, i: number) => {
                      if (block.type === "h2") {
                        return <h2 key={i}>{block.text}</h2>;
                      }
                      if (block.type === "p") {
                        return <p key={i}>{renderInline(block.text)}</p>;
                      }
                      if (block.type === "list") {
                        return (
                          <ul key={i}>
                            {block.items.map((item: any, j: number) => (
                              <li key={j}>{renderInline(item)}</li>
                            ))}
                          </ul>
                        );
                      }
                      if (block.type === "callout") {
                        return (
                          <div className="hm-callout" key={i}>
                            {renderInline(block.text)}
                          </div>
                        );
                      }
                      return null;
                    })
                  )}
                </div>

                {relatedCaseStudies.length > 0 && (
                  <aside className="hm-rel">
                    <p className="hm-eyebrow">
                      {relatedCaseStudies.length > 1 ? "Related case studies" : "Related case study"}
                    </p>
                    <ul>
                      {relatedCaseStudies.map((cs: any) => (
                        <li key={cs.slug}>
                          <Link href={`/case-studies/${cs.slug}`}>
                            <span>{cs.title}</span>
                            <ArrowRight size={16} aria-hidden="true" />
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </aside>
                )}

                {blogServiceLinks(post.slug).length > 0 && (
                  <aside className="hm-rel">
                    <p className="hm-eyebrow">How we help with this</p>
                    <ul>
                      {blogServiceLinks(post.slug).map((link) => (
                        <li key={link.href}>
                          <Link href={link.href}>
                            <span>{link.title}</span>
                            <ArrowRight size={16} aria-hidden="true" />
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </aside>
                )}

                {post.faq && post.faq.length > 0 && (
                  <div className="hm-post-faq">
                    <h2>Frequently asked questions</h2>
                    <div className="hm-faq">
                      {post.faq.map((item: any, i: number) => (
                        <details key={i}>
                          <summary>
                            {item.question}
                            <span className="hm-faq-icon" aria-hidden="true" />
                          </summary>
                          <p>{renderInline(item.answer)}</p>
                        </details>
                      ))}
                    </div>
                  </div>
                )}

                <div className="hm-post-cta">
                  <p>Think this might apply to your business?</p>
                  <span>Tell us what eats your week. The discovery call is free.</span>
                  <Link href="/book" className="hm-btn hm-btn-light">
                    <span>Book a free discovery call</span>
                    <ArrowRight size={16} aria-hidden="true" />
                  </Link>
                </div>
              </div>
            </div>
          </section>

          {relatedPosts.length > 0 && (
            <section className="hm-section hm-paper">
              <div className="container">
                <header className="hm-head">
                  <p className="hm-eyebrow">Keep reading</p>
                  <h2>More from the Lab Report.</h2>
                </header>
                <ul className="hm-pgrid">
                  {relatedPosts.map((p) => (
                    <li key={p.slug}>
                      <PostCard post={p} />
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          )}
        </article>

        <NewsletterSection variant="home" />
      </main>
    </>
  );
}
