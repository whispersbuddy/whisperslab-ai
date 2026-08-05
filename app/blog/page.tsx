import type { Metadata } from "next";
import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import NewsletterSection from "@/components/NewsletterSection";
import { BLOG_POSTS } from "@/app/_content/blogData";
import { getCategoryBySlug } from "@/app/_content/blogTaxonomy";

export const metadata: Metadata = {
  title: "Blog — Whispers Lab",
  description:
    "Automation guides for small business owners: what to fix first, how it actually works, and what it looks like in your industry.",
  alternates: { canonical: "/blog" },
  openGraph: {
    type: "website",
    siteName: "Whispers Lab",
    locale: "en_US",
    title: "Blog — Whispers Lab",
    description:
      "Automation guides for small business owners: what to fix first, how it actually works, and what it looks like in your industry.",
    url: "/blog",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Whispers Lab — We delete busywork.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog — Whispers Lab",
    description:
      "Automation guides for small business owners: what to fix first, how it actually works, and what it looks like in your industry.",
    images: ["/og-image.png"],
  },
};

const SITE_URL = "https://www.whisperslab.com";

const collectionSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Blog",
  description:
    "Automation guides for small business owners: what to fix first, how it actually works, and what it looks like in your industry.",
  url: `${SITE_URL}/blog`,
  mainEntity: {
    "@type": "ItemList",
    itemListElement: BLOG_POSTS.map((post, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: `${SITE_URL}/blog/${post.slug}`,
      name: post.title,
    })),
  },
};

export default function BlogPage() {
  const posts = [...BLOG_POSTS].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
      />
      <SiteHeader />
      <main>
        <section className="contact-banner">
          <div className="container">
            <span className="eyebrow eyebrow-light">THE LAB REPORT · BLOG</span>
            <h1>Automation, minus the hype.</h1>
          </div>
        </section>

        <section className="section">
          <div className="container">
            <div className="blog-grid">
              {posts.map((post) => {
                const category = getCategoryBySlug(post.category);
                return (
                  <Link
                    href={`/blog/${post.slug}`}
                    className="blog-grid-card"
                    key={post.slug}
                  >
                    <div className="blog-grid-card-image">
                      <img src={post.heroImage} alt={post.heroImageAlt} />
                    </div>
                    <div className="blog-grid-card-body">
                      <span className="blog-category-badge">{category?.name}</span>
                      <h3>{post.title}</h3>
                      <p>{post.excerpt}</p>
                      <time className="blog-meta" dateTime={post.publishedAt}>
                        {new Date(post.publishedAt).toLocaleDateString("en-US", {
                          month: "long",
                          day: "numeric",
                          year: "numeric",
                        })}
                        {" · "}
                        {post.readTime}
                      </time>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        <NewsletterSection />
      </main>
      <SiteFooter />
    </>
  );
}
