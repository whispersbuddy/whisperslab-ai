import { BLOG_POSTS } from "./app/_content/blogData";
import dotenv from "dotenv";

// Load environment variables from .env.local or .env
dotenv.config({ path: ".env.local" });
dotenv.config(); // fallback to .env if .env.local doesn't exist

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL;
const API_TOKEN = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;

if (!STRAPI_URL || !API_TOKEN) {
  console.error("Missing NEXT_PUBLIC_STRAPI_URL or NEXT_PUBLIC_STRAPI_API_TOKEN environment variables.");
  process.exit(1);
}

function convertContentToMarkdown(contentBlocks) {
  if (!Array.isArray(contentBlocks)) return '';
  return contentBlocks.map(block => {
    if (block.type === 'h2') return `## ${block.text}`;
    if (block.type === 'p') return block.text;
    if (block.type === 'list') return block.items.map(item => `- ${item}`).join('\n');
    if (block.type === 'callout') return `> ${block.text}`; // Representing callouts as blockquotes
    return '';
  }).filter(Boolean).join('\n\n');
}

async function migrateBlogs() {
  console.log(`Starting migration of ${BLOG_POSTS.length} blog posts to ${STRAPI_URL}...`);

  for (const post of BLOG_POSTS) {
    try {
      const markdownBody = convertContentToMarkdown(post.content);

      const payload = {
        data: {
          title: post.title,
          slug: post.slug,
          description: post.excerpt.length > 77 ? post.excerpt.substring(0, 77) + '...' : post.excerpt,
          blocks: [
            {
              __component: 'shared.rich-text',
              body: markdownBody
            }
          ]
        }
      };

      const response = await fetch(`${STRAPI_URL}/api/articles`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${API_TOKEN}`,
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error(`❌ Failed to migrate "${post.title}". Status: ${response.status}`);
        console.error("Error details:", JSON.stringify(errorData.error || errorData, null, 2));
      } else {
        console.log(`✅ Successfully migrated "${post.title}"`);
      }
    } catch (error) {
      console.error(`❌ Error making request for "${post.title}":`, error);
    }
  }

  console.log("Migration complete!");
}

migrateBlogs();
