import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import NewsletterSection from "@/components/NewsletterSection";
import BlogCard from "@/components/BlogCard";
import { getAllPosts } from "@/lib/content";

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

export default async function BlogPage() {
  const posts = await getAllPosts();

  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Blog",
    description:
      "Automation guides for small business owners: what to fix first, how it actually works, and what it looks like in your industry.",
    url: `${SITE_URL}/blog`,
    mainEntity: {
      "@type": "ItemList",
      itemListElement: posts.map((post, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: `${SITE_URL}/blog/${post.slug}`,
        name: post.title,
      })),
    },
  };

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
              {posts.map((post) => (
                <BlogCard post={post} key={post.slug} />
              ))}
            </div>
          </div>
        </section>

        <NewsletterSection />
      </main>
      <SiteFooter />
    </>
  );
}
