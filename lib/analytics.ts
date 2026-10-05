type EventParams = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

// Safe on the server, on localhost/preview hosts (where app/layout.tsx never
// loads gtag.js) and when an ad blocker removed gtag.
export function trackEvent(name: string, params: EventParams = {}) {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;
  // "beacon" lets the hit finish even when the page navigates away right after.
  window.gtag("event", name, { transport_type: "beacon", ...params });
}
