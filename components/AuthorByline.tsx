// Byline for pages written by Haris Ali. Links to his block on /about, which is
// the page the site's Person schema points at (FOUNDER_ID in lib/seo.ts).
// `updated` is the real date the page's content last changed; leave it out
// when that is not known rather than showing a made-up date.
import Image from "next/image";
import Link from "next/link";
import { FOUNDER_TITLE } from "@/lib/seo";

function formatDate(iso: string): string {
  return new Date(iso + "T00:00:00Z").toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric", timeZone: "UTC" });
}

export default function AuthorByline({ updated }: { updated?: string }) {
  return (
    <div className="author-byline">
      <Image src="/assets/haris-ali.jpg" alt="" width={36} height={36} />
      <span>
        Written by <Link href="/about#haris-ali">Haris Ali</Link>, {FOUNDER_TITLE}
        {updated ? (
          <>
            {" "}
            · Updated <time dateTime={updated}>{formatDate(updated)}</time>
          </>
        ) : null}
      </span>
    </div>
  );
}
