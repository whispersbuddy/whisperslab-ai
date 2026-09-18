import Link from "next/link";
import BlogCard from "@/components/BlogCard";
import { getAllPosts } from "@/lib/content";

// Homepage "latest from the blog" strip. The homepage is the most-crawled page
// on the site, so linking the newest posts here is how new posts get found
// quickly. Heading markup mirrors the homepage's case-section.
export default async function LatestPosts() {
  const posts = (await getAllPosts()).slice(0, 3);
  if (posts.length === 0) return null;

  return (
    <section className="section">
      <div className="container">
        <span className="eyebrow">THE LAB REPORT · LATEST GUIDES</span>
        <h2>Fix the busywork yourself, one guide at a time.</h2>
        <p className="section-copy">
          Plain-English breakdowns of what to automate first and how it actually works.
        </p>
        <Link href="/blog" className="link-cta">See all guides →</Link>

        <div className="blog-grid">
          {posts.map((post) => (
            <BlogCard post={post} key={post.slug} />
          ))}
        </div>
      </div>
    </section>
  );
}
