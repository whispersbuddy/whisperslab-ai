// Serves /llms.txt: the curated summary in lib/llms.ts plus sections for any
// new pages that are live in lib/routes.ts, so AI crawlers only see real pages.
import { LLMS_BASE } from "@/lib/llms";
import { isPathLive, liveRoutes, type SiteRoute } from "@/lib/routes";
import { SITE_URL } from "@/lib/seo";

export const dynamic = "force-static";

const line = (r: SiteRoute) => `- [${r.label}](${SITE_URL}${r.path})${r.blurb ? `: ${r.blurb}.` : ""}`;

export function GET() {
  const growth = isPathLive("/growth-partner")
    ? `- [AI Growth Partner](${SITE_URL}/growth-partner): $500/month ongoing retainer. Maintains deployed systems and adds one new workflow monthly.`
    : "- AI Growth Partner: $500/month ongoing retainer. Maintains deployed systems and adds one new workflow monthly. Described on the homepage pricing section.";

  const sections: string[] = [];
  const add = (title: string, routes: SiteRoute[]) => {
    if (routes.length) sections.push(`## ${title}\n\n${routes.map(line).join("\n")}`);
  };
  add("Services", liveRoutes("services"));
  add("Industries", liveRoutes("industries"));
  add("Integrations", liveRoutes("integrations"));
  add("Free tools", liveRoutes("resources").filter((r) => r.path !== "/blog"));
  const company = ["/about", "/pricing"].filter(isPathLive).map((p) => liveRoutes().find((r) => r.path === p)!);
  add("Company", company);

  const body = LLMS_BASE.replace("__GROWTH__", growth).trimEnd() + (sections.length ? "\n\n" + sections.join("\n\n") : "") + "\n";
  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
