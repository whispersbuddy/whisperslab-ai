// Logos for the tools named in case studies. A tool without an entry here
// is shown as a text badge, so adding a case study never needs a logo first.
export const TOOL_LOGOS: Record<string, string> = {
  n8n: "/assets/n8n.png",
  airtable: "/assets/airtable.png",
  zapier: "/assets/zapier_icon_146029.webp",
  hubspot: "/assets/hubspot-logo.png",
  openai: "/assets/openai.webp",
  claude: "/assets/Claude-ai-logo.png",
  slack: "/assets/slack-outline-logo-minimal-line-art-editable-and-transparent-free-png.webp",
  stripe: "/assets/tools/stripe.svg",
  twilio: "/assets/tools/twilio.svg",
  "google sheets": "/assets/tools/googlesheets.svg",
  "google calendar": "/assets/tools/googlecalendar.svg",
  "google drive": "/assets/tools/googledrive.svg",
  gmail: "/assets/tools/gmail.svg",
  "make.com": "/assets/tools/make.svg",
  xero: "/assets/tools/xero.svg",
  quickbooks: "/assets/tools/quickbooks.svg",
  clickup: "/assets/tools/clickup.svg",
  supabase: "/assets/tools/supabase.svg",
  "next.js": "/assets/tools/nextdotjs.svg",
  "node.js": "/assets/tools/nodedotjs.svg",
  deno: "/assets/tools/deno.svg",
  python: "/assets/tools/python.svg",
  prestashop: "/assets/tools/prestashop.svg",
  woocommerce: "/assets/tools/woocommerce.svg",
  shopify: "/assets/tools/shopify.svg",
  calendly: "/assets/tools/calendly.svg",
  zoom: "/assets/tools/zoom.svg",
  resend: "/assets/tools/resend.svg",
};

export function toolLogo(tool: string): string | undefined {
  return TOOL_LOGOS[tool.trim().toLowerCase()];
}
