import Link from "next/link";
import type { PostSummary } from "@/lib/content";

// Blog post card, shared by /blog, the homepage "latest posts" strip and the
// "keep reading" block on posts, so all three render the same markup.
export default function BlogCard({ post }: { post: PostSummary }) {
  return (
    <Link href={`/blog/${post.slug}`} className="blog-grid-card">
      <div className="blog-grid-card-image">
        <img src={post.heroImage} alt={post.heroImageAlt} />
      </div>
      <div className="blog-grid-card-body">
        {post.categoryName && <span className="blog-category-badge">{post.categoryName}</span>}
        <h3>{post.title}</h3>
        <p>{post.description}</p>
        <time className="blog-meta" dateTime={post.publishedAt}>
          {new Date(post.publishedAt).toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
          })}
          {post.readTime && ` · ${post.readTime}`}
        </time>
      </div>
    </Link>
  );
}
