import { NextResponse } from "next/server";
import { revalidateTag } from "next/cache";
import { timingSafeEqual } from "crypto";
import { ARTICLES_TAG, CASE_STUDIES_TAG } from "@/lib/api";

// Strapi webhook target. In Strapi admin: Settings → Webhooks → Create, URL
// https://www.whisperslab.com/api/revalidate, header
// "Authorization: Bearer <STRAPI_REVALIDATE_SECRET>", events: entry publish,
// unpublish, update, delete. Refreshes every page built from the changed
// collection (index pages, detail pages, homepage strip, sitemap).
const TAG_BY_MODEL: Record<string, string> = {
  article: ARTICLES_TAG,
  "case-study": CASE_STUDIES_TAG,
};

function isAuthorized(req: Request, secret: string): boolean {
  const given = Buffer.from(req.headers.get("authorization") ?? "");
  const expected = Buffer.from(`Bearer ${secret}`);
  return given.length === expected.length && timingSafeEqual(given, expected);
}

export async function POST(req: Request) {
  const secret = process.env.STRAPI_REVALIDATE_SECRET;
  if (!secret) {
    console.error("Revalidation is not configured: missing STRAPI_REVALIDATE_SECRET");
    return NextResponse.json({ error: "Revalidation is not configured" }, { status: 500 });
  }
  if (!isAuthorized(req, secret)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = (await req.json().catch(() => ({}))) as { model?: string; event?: string };
  const tag = body.model ? TAG_BY_MODEL[body.model] : undefined;
  if (!tag) {
    // Other Strapi collections (users, media, etc.) don't feed any page.
    return NextResponse.json({ revalidated: false, reason: `ignored model: ${body.model ?? "none"}` });
  }

  // expire: 0 so the next visitor (or crawler) gets the new content straight
  // away, rather than one more stale view under the default "max" profile.
  revalidateTag(tag, { expire: 0 });
  return NextResponse.json({ revalidated: true, tag, event: body.event });
}
