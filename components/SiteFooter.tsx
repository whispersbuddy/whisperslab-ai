"use client";

// Site-wide footer, rendered once from app/layout.tsx. Columns are built from
// lib/routes.ts so only live pages are linked.
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BARE_PATHS } from "@/components/SiteHeader";
import { isPathLive, liveRoutes, type SiteRoute } from "@/lib/routes";
import { CLUTCH_URL } from "@/lib/social";

const SOCIALS = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/whispers-lab/",
    path: "M6.94 8.5H3.56V20h3.38V8.5ZM5.25 3.6a1.96 1.96 0 1 0 0 3.92 1.96 1.96 0 0 0 0-3.92ZM20.45 20h-3.37v-5.6c0-1.34-.02-3.06-1.87-3.06-1.87 0-2.16 1.46-2.16 2.96V20H9.68V8.5h3.24v1.57h.05c.45-.86 1.56-1.77 3.21-1.77 3.43 0 4.06 2.26 4.06 5.2V20Z",
  },
];

function Column({ title, links }: { title: string; links: { href: string; label: string }[] }) {
  if (links.length === 0) return null;
  return (
    <div className="sf-col">
      <h2 className="sf-title">{title}</h2>
      <ul>
        {links.map((l) => (
          <li key={l.href}>
            <Link href={l.href}>{l.label}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

const toLinks = (routes: SiteRoute[]) => routes.map((r) => ({ href: r.path, label: r.label }));

export default function SiteFooter() {
  const pathname = usePathname() || "/";
  if (BARE_PATHS.some((p) => pathname.startsWith(p))) return null;

  const services = toLinks(liveRoutes("services"));
  if (services.length && isPathLive("/services")) services.push({ href: "/services", label: "All services" });
  const industries = toLinks(liveRoutes("industries"));
  if (industries.length && isPathLive("/industries")) industries.push({ href: "/industries", label: "All industries" });
  const integrations = toLinks(liveRoutes("integrations"));
  if (integrations.length && isPathLive("/integrations")) integrations.push({ href: "/integrations", label: "All integrations" });

  const offers = toLinks(liveRoutes("pricing"));
  const company = [
    ...(isPathLive("/about") ? [{ href: "/about", label: "About" }] : []),
    { href: "/case-studies", label: "Case Studies" },
    { href: "/contact", label: "Contact" },
    { href: "/book", label: "Book a Call" },
  ];
  const resources = toLinks(liveRoutes("resources"));
  const legal = liveRoutes("legal");

  return (
    <footer className="footer site-footer">
      <div className="container">
        <div className="sf-top">
          <div className="sf-brand">
            <Link href="/" className="logo" aria-label="Whispers Lab home">
              <img src="/assets/logo-trim.png" alt="Whispers Lab" width={348} height={45} />
            </Link>
            <p className="sf-tag">We delete busywork. Custom AI and automation for small business owners.</p>
            <p className="footer-mandate">THE LAB REPORT: WEEKLY AI SHORTCUTS TO BUY BACK YOUR TIME.</p>
            <div className="footer-social">
              {SOCIALS.map((s) => (
                <a key={s.label} href={s.href} target="_blank" rel="noopener" aria-label={s.label} className="social-icon">
                  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d={s.path} fill="currentColor" />
                  </svg>
                </a>
              ))}
              <a href="https://www.instagram.com/whispers__lab/" target="_blank" rel="noopener" aria-label="Instagram" className="social-icon">
                <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <rect x="3.5" y="3.5" width="17" height="17" rx="5" stroke="currentColor" strokeWidth="1.6" />
                  <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.6" />
                  <circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" />
                </svg>
              </a>
              {/* Inline star mark stands in until a proper Clutch logo asset exists */}
              <a href={CLUTCH_URL} target="_blank" rel="noopener" aria-label="Clutch" className="social-icon">
                <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path
                    d="M12 3.4 14.1 9h5.9l-4.78 3.47L17.3 18 12 14.5 6.7 18l1.98-5.53L3.9 9h5.9L12 3.4Z"
                    stroke="currentColor"
                    strokeWidth="1.4"
                    strokeLinejoin="round"
                  />
                </svg>
              </a>
            </div>
          </div>
          <div className="sf-cols">
            <Column title="Services" links={services} />
            <Column title="Industries" links={industries} />
            <Column title="Integrations" links={integrations} />
            <Column title="Pricing" links={offers} />
            <Column title="Company" links={company} />
            <Column title="Resources" links={resources} />
          </div>
        </div>
        <div className="sf-bottom">
          <span>© {new Date().getFullYear()} Whispers Lab LLC. Sheridan, WY, USA · Team in Karachi, Pakistan.</span>
          {legal.length ? (
            <span className="sf-legal">
              {legal.map((r) => (
                <Link key={r.path} href={r.path}>
                  {r.label}
                </Link>
              ))}
            </span>
          ) : null}
        </div>
      </div>
    </footer>
  );
}
