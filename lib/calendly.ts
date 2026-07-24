// Calendly event-type URLs, read from env with placeholder fallbacks so the
// booking flow builds and renders before real event links are configured.
// These are NEXT_PUBLIC_* because the widget is initialized client-side.
export type CalendlyType = "discovery" | "scope";

export const CALENDLY_URLS: Record<CalendlyType, string> = {
  discovery:
    process.env.NEXT_PUBLIC_CALENDLY_DISCOVERY_URL ||
    "https://calendly.com/whisperslab/30min",
  scope:
    process.env.NEXT_PUBLIC_CALENDLY_SCOPE_URL ||
    "https://calendly.com/whisperslab/30min",
};

// Light, brand-accented theming applied to every embed — renders as a clean
// white card against the site's dark booking sections.
const THEME_PARAMS: Record<string, string> = {
  hide_gdpr_banner: "1",
  hide_event_type_details: "1",
  background_color: "ffffff",
  text_color: "0f172a",
  primary_color: "6b4ff0",
};

export function themedCalendlyUrl(url: string): string {
  // Preserve any params already on the configured URL; layer theming on top.
  const [base, existing = ""] = url.split("?");
  const params = new URLSearchParams(existing);
  for (const [key, value] of Object.entries(THEME_PARAMS)) {
    if (!params.has(key)) params.set(key, value);
  }
  return `${base}?${params.toString()}`;
}
