import type { ReactNode } from "react";
import Link from "next/link";

// Minimal inline-markdown renderer for blog body copy. The blog content
// model (app/_content/blogData.ts) stores plain strings, but source drafts
// are written with **bold** and [text](url) markdown, so this renders just
// those two inline forms -- no block-level parsing, no external dependency.
const INLINE_RE = /(\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\))/g;
const BOLD_RE = /^\*\*([^*]+)\*\*$/;
const LINK_RE = /^\[([^\]]+)\]\(([^)]+)\)$/;

export function renderInline(text: string): ReactNode[] {
  return text.split(INLINE_RE).filter(Boolean).map((chunk, i) => {
    const boldMatch = chunk.match(BOLD_RE);
    if (boldMatch) {
      return <strong key={i}>{boldMatch[1]}</strong>;
    }
    const linkMatch = chunk.match(LINK_RE);
    if (linkMatch) {
      const [, label, url] = linkMatch;
      if (url.startsWith("/")) {
        return (
          <Link href={url} key={i}>
            {label}
          </Link>
        );
      }
      return (
        <a href={url} key={i} target="_blank" rel="noopener">
          {label}
        </a>
      );
    }
    return chunk;
  });
}

// Strips the same inline markdown down to plain text, for contexts that need
// a clean string rather than React nodes -- schema.org structured data
// (FAQPage answers, Article descriptions) should hold plain, readable text,
// not markdown syntax, since that's what AI answer engines and search
// crawlers actually consume from it.
export function toPlainText(text: string): string {
  return text
    .replace(LINK_RE_G, "$1")
    .replace(BOLD_RE_G, "$1");
}

const LINK_RE_G = /\[([^\]]+)\]\([^)]+\)/g;
const BOLD_RE_G = /\*\*([^*]+)\*\*/g;
