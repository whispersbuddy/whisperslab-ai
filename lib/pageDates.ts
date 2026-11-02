// "Updated" date shown in the byline of service, industry and integration
// pages: the later of the page's code date (`updated` in lib/routes.ts) and its
// last edit in Strapi. Returns an ISO date (YYYY-MM-DD) or undefined if neither
// is known, in which case the byline shows the author without a date.
import { fetchPageUpdatedDates } from "@/lib/api";
import { getRoute } from "@/lib/routes";

export async function pageUpdated(path: string): Promise<string | undefined> {
  const code = getRoute(path)?.updated;
  const cms = (await fetchPageUpdatedDates()).get(path);
  const times = [code ? new Date(code).getTime() : NaN, cms ? cms.getTime() : NaN].filter((t) => !isNaN(t));
  return times.length ? new Date(Math.max(...times)).toISOString().slice(0, 10) : undefined;
}
