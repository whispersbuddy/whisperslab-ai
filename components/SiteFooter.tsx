"use client";

// Site-wide footer, rendered once from app/layout.tsx. Columns are built from
// lib/routes.ts so only live pages are linked.
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { usePathname } from "next/navigation";
import { BARE_PATHS } from "@/components/SiteHeader";
import { isPathLive, liveRoutes, type SiteRoute } from "@/lib/routes";
import ReviewLinks from "@/components/ReviewLinks";

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
      <p className="sf-title">{title}</p>
      <ul>
        {links.map((l) => (
          <li key={l.href}>
            <Link href={l.href}>
              {l.label}
            </Link>
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

  const company = [
    ...(isPathLive("/about") ? [{ href: "/about", label: "About" }] : []),
    { href: "/pricing", label: "Pricing" },
    { href: "/case-studies", label: "Case Studies" },
    { href: "/contact", label: "Contact" },
    { href: "/book", label: "Book a Call" },
  ];
  const resources = toLinks(liveRoutes("resources"));
  const legal = liveRoutes("legal");

  return (
    <footer className="footer site-footer">
      <div className="container">
        <div className="sf-cta">
          <div>
            <p className="sf-headline">We delete busywork.</p>
            <p className="sf-tag">Custom AI and automation for small business owners.</p>
          </div>
          <div className="sf-cta-actions">
            <Link href="/book" className="sf-cta-btn">
              <span>Book a free discovery call</span>
              <ArrowUpRight size={16} aria-hidden="true" />
            </Link>
            <a href="mailto:hello@whisperslab.com" className="sf-cta-mail">hello@whisperslab.com</a>
          </div>
        </div>

        <div className="sf-cols">
          <Column title="Services" links={services} />
          <Column title="Industries" links={industries} />
          <Column title="Integrations" links={integrations} />
          <Column title="Company" links={company} />
          <Column title="Resources" links={resources} />
        </div>

        <div className="sf-brandrow">
          <div className="sf-brand">
            <Link href="/" className="logo" aria-label="Whispers Lab home">
              <img src="/assets/logo-trim.png" alt="Whispers Lab" width={348} height={45} />
            </Link>
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
            </div>
          </div>
          <ReviewLinks cards />
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
      <div className="sf-wordmark" aria-hidden="true">Whispers Lab</div>
    </footer>
  );
}
