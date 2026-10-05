import { getRoute, isPathLive } from "@/lib/routes";

// Service, industry and integration pages each blog post should link to.
// Rendered by app/blog/[slug]/page.tsx independent of whether the post body
// comes from the CMS or from app/_content/blogData.ts.
const BLOG_SERVICE_LINKS: Record<string, string[]> = {
  "5-signs-your-business-is-losing-hours-to-busywork": ["/services/data-entry-automation", "/services/software-integration-services"],
  "accounting-workflow-automation-tasks-to-fix-first": ["/services/bookkeeping-automation", "/industries/accounting-bookkeeping", "/services/data-entry-automation"],
  "automate-client-onboarding": ["/services/client-onboarding-automation", "/integrations/zapier"],
  "crm-data-hygiene": ["/integrations/airtable", "/integrations/n8n", "/services/software-integration-services"],
  "document-processing-automation": ["/services/data-entry-automation", "/industries/accounting-bookkeeping"],
  "double-data-entry": ["/services/software-integration-services", "/services/data-entry-automation", "/integrations/zapier"],
  "ecommerce-product-listing-automation-supplier-feeds": ["/industries/ecommerce-retail", "/services/data-entry-automation", "/services/software-integration-services"],
  "invoice-follow-up-automation-get-paid-faster": ["/services/bookkeeping-automation", "/industries/accounting-bookkeeping"],
  "real-estate-lead-follow-up-automation": ["/services/lead-follow-up-automation", "/industries/real-estate"],
  "speed-to-lead": ["/services/lead-follow-up-automation", "/industries/real-estate"],
};

export function blogServiceLinks(slug: string): { href: string; title: string }[] {
  return (BLOG_SERVICE_LINKS[slug] ?? [])
    .filter((path) => isPathLive(path))
    .flatMap((path) => {
      const label = getRoute(path)?.label;
      return label ? [{ href: path, title: label }] : [];
    });
}
