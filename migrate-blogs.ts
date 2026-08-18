import { BLOG_POSTS, BlogBlock } from './app/_content/blogData';
import dotenv from 'dotenv';
dotenv.config({ path: '.env' });

function blocksToMarkdown(blocks: BlogBlock[]): string {
  if (!blocks) return "";
  return blocks.map(block => {
    switch (block.type) {
      case "h2": return `## ${block.text}\n\n`;
      case "p": return `${block.text}\n\n`;
      case "list": return block.items.map(item => `- ${item}`).join("\n") + "\n\n";
      case "callout": return `> ${block.text}\n\n`;
      default: return "";
    }
  }).join("").trim();
}

async function migrate() {
  const url = process.env.NEXT_PUBLIC_STRAPI_URL;
  const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;

  if (!url || !token) {
    console.error('Missing NEXT_PUBLIC_STRAPI_URL or NEXT_PUBLIC_STRAPI_API_TOKEN');
    process.exit(1);
  }

  // 1. Fetch existing articles from Strapi
  let existingArticles: any[] = [];
  try {
    const res = await fetch(`${url}/api/articles?populate=*`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    const json = await res.json();
    if (json.data) {
      existingArticles = json.data;
    }
  } catch (err) {
    console.error("Error fetching existing articles:", err);
  }

  for (const post of BLOG_POSTS) {
    console.log(`Migrating blog post: ${post.slug}`);
    
    const markdownContent = blocksToMarkdown(post.content);

    const payload = {
      data: {
        title: post.title,
        description: post.excerpt.length > 120 ? post.excerpt.slice(0, 117) + '...' : post.excerpt,
        publishedAt: post.publishedAt,
        // The user specifically wants it in the "content" field instead of a "blocks" dynamic zone
        content: markdownContent,
        // We set blocks to null/empty to clear out the old rich-text component if they want
        blocks: [],
      }
    };

    const existing = existingArticles.find((a: any) => a.title === post.title);

    try {
      const endpoint = existing 
        ? `${url}/api/articles/${existing.documentId}` 
        : `${url}/api/articles`;
      
      const method = existing ? 'PUT' : 'POST';

      const res = await fetch(endpoint, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });

      if (!res.ok) {
        const errorText = await res.text();
        console.error(`Failed to migrate ${post.slug}: ${res.status} ${res.statusText}`);
        console.error(errorText);
      } else {
        console.log(`Successfully migrated ${post.slug} (Method: ${method})`);
      }
      
      await new Promise(resolve => setTimeout(resolve, 500));
    } catch (err) {
      console.error(`Error migrating ${post.slug}:`, err);
    }
  }
}

migrate();
