"use client";

// Site-wide header, rendered once from app/layout.tsx. Menu items come from
// lib/routes.ts, so a dropdown only lists pages that are live, and a whole
// dropdown disappears while its group is empty.
//
// Keeps the legacy hooks other code relies on: the `.nav-wrap` class (the home
// hero's light/dark toggle in ClientEffects adds `nav-light` to it) and the
// transparent-over-hero look on the homepage.
import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight, CalendarCheck, ChevronDown, Menu, X } from "lucide-react";
import SiteIcon from "@/components/SiteIcon";
import { isPathLive, liveRoutes, type SiteRoute } from "@/lib/routes";

export const BARE_PATHS = ["/book", "/booking-confirmed"];

type MenuKey = "services" | "industries" | "pricing" | "resources";

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(href + "/");
}

function MenuLink({ route, onNavigate, showBlurb = true }: { route: SiteRoute; onNavigate: () => void; showBlurb?: boolean }) {
  return (
    <Link href={route.path} className="sh-item" onClick={onNavigate}>
      <span className="sh-item-icon">
        <SiteIcon name={route.icon} />
      </span>
      <span className="sh-item-text">
        <span className="sh-item-label">
          {route.label}
          {route.price ? <span className="sh-item-price">{route.price}</span> : null}
        </span>
        {showBlurb && route.blurb ? <span className="sh-item-blurb">{route.blurb}</span> : null}
      </span>
    </Link>
  );
}

export default function SiteHeader() {
  const pathname = usePathname() || "/";
  const [open, setOpen] = useState<MenuKey | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const navRef = useRef<HTMLElement | null>(null);

  const services = liveRoutes("services");
  const integrations = liveRoutes("integrations");
  const industries = liveRoutes("industries");
  const pricing = liveRoutes("pricing");
  const resources = liveRoutes("resources");
  const servicesHubLive = isPathLive("/services");
  const integrationsHubLive = isPathLive("/integrations");
  const industriesHubLive = isPathLive("/industries");
  const aboutLive = isPathLive("/about");

  const closeAll = useCallback(() => {
    setOpen(null);
    setMobileOpen(false);
  }, []);

  // Close menus on navigation (reset during render, the pattern React
  // recommends over a state-setting effect).
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpen(null);
    setMobileOpen(false);
  }

  // Escape and outside-click close the open dropdown.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      const trigger = navRef.current?.querySelector<HTMLButtonElement>(`[data-menu="${open}"]`);
      setOpen(null);
      trigger?.focus();
    };
    const onClick = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) setOpen(null);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, [open]);

  // Lock page scroll while the mobile sheet is open.
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  if (BARE_PATHS.some((p) => pathname.startsWith(p))) return null;

  const hoverOpen = (key: MenuKey) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpen(key);
  };
  const hoverClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpen(null), 180);
  };

  const trigger = (key: MenuKey, label: string, activePaths: string[]) => {
    const active = activePaths.some((p) => isActive(pathname, p));
    return (
      <button
        type="button"
        className={"sh-trigger" + (active ? " nav-active" : "")}
        data-menu={key}
        aria-expanded={open === key}
        aria-controls={`sh-panel-${key}`}
        onClick={() => setOpen(open === key ? null : key)}
      >
        {label}
        <ChevronDown size={14} className="sh-chevron" aria-hidden="true" />
      </button>
    );
  };

  const hasServicesMenu = services.length > 0 || integrations.length > 0;
  const isHome = pathname === "/";

  return (
    <header className={"nav-wrap site-header" + (isHome ? "" : " nav-solid") + (mobileOpen ? " is-open" : "")}>
      <div className="container nav">
        <Link href="/" className="logo" aria-label="Whispers Lab home">
          <img src="/assets/logo-trim.png" alt="Whispers Lab" width={348} height={45} />
        </Link>

        <nav className="nav-links sh-nav" aria-label="Main" ref={navRef}>
          {hasServicesMenu ? (
            <div className="sh-dd" onMouseEnter={() => hoverOpen("services")} onMouseLeave={hoverClose}>
              {trigger("services", "Services", ["/services", "/integrations"])}
              <div id="sh-panel-services" className="sh-panel sh-mega" hidden={open !== "services"}>
                {services.length > 0 ? (
                  <div className="sh-col">
                    <span className="sh-col-title">What we automate</span>
                    {services.map((r) => (
                      <MenuLink key={r.path} route={r} onNavigate={closeAll} />
                    ))}
                    {servicesHubLive ? (
                      <Link href="/services" className="sh-all" onClick={closeAll}>
                        All services <ArrowRight size={14} aria-hidden="true" />
                      </Link>
                    ) : null}
                  </div>
                ) : null}
                {integrations.length > 0 ? (
                  <div className="sh-col">
                    <span className="sh-col-title">Built on</span>
                    {integrations.map((r) => (
                      <MenuLink key={r.path} route={r} onNavigate={closeAll} showBlurb={false} />
                    ))}
                    {integrationsHubLive ? (
                      <Link href="/integrations" className="sh-all" onClick={closeAll}>
                        All integrations <ArrowRight size={14} aria-hidden="true" />
                      </Link>
                    ) : null}
                  </div>
                ) : null}
                <Link href="/audit" className="sh-feature" onClick={closeAll}>
                  <span className="sh-feature-kicker">Not sure where to start?</span>
                  <span className="sh-feature-title">Start with the $250 Automation Audit</span>
                  <span className="sh-feature-copy">In 7 days you get a plan showing exactly what to automate first. The $250 is credited if you build with us.</span>
                  <span className="sh-feature-cta">
                    See how the Audit works <ArrowRight size={14} aria-hidden="true" />
                  </span>
                </Link>
              </div>
            </div>
          ) : null}

          {industries.length > 0 ? (
            <div className="sh-dd" onMouseEnter={() => hoverOpen("industries")} onMouseLeave={hoverClose}>
              {trigger("industries", "Industries", ["/industries"])}
              <div id="sh-panel-industries" className="sh-panel sh-list" hidden={open !== "industries"}>
                {industries.map((r) => (
                  <MenuLink key={r.path} route={r} onNavigate={closeAll} />
                ))}
                {industriesHubLive ? (
                  <Link href="/industries" className="sh-all" onClick={closeAll}>
                    All industries <ArrowRight size={14} aria-hidden="true" />
                  </Link>
                ) : null}
              </div>
            </div>
          ) : null}

          <div className="sh-dd" onMouseEnter={() => hoverOpen("pricing")} onMouseLeave={hoverClose}>
            {trigger("pricing", "Pricing", pricing.map((r) => r.path))}
            <div id="sh-panel-pricing" className="sh-panel sh-list" hidden={open !== "pricing"}>
              {pricing.map((r) => (
                <MenuLink key={r.path} route={r} onNavigate={closeAll} />
              ))}
            </div>
          </div>

          <Link href="/case-studies" className={isActive(pathname, "/case-studies") ? "nav-active" : undefined}>
            Case Studies
          </Link>

          {resources.length > 1 ? (
            <div className="sh-dd" onMouseEnter={() => hoverOpen("resources")} onMouseLeave={hoverClose}>
              {trigger("resources", "Resources", resources.map((r) => r.path))}
              <div id="sh-panel-resources" className="sh-panel sh-list" hidden={open !== "resources"}>
                {resources.map((r) => (
                  <MenuLink key={r.path} route={r} onNavigate={closeAll} />
                ))}
              </div>
            </div>
          ) : (
            <Link href="/blog" className={isActive(pathname, "/blog") ? "nav-active" : undefined}>
              Blog
            </Link>
          )}

          {aboutLive ? (
            <Link href="/about" className={isActive(pathname, "/about") ? "nav-active" : undefined}>
              About
            </Link>
          ) : (
            <Link href="/contact" className={isActive(pathname, "/contact") ? "nav-active" : undefined}>
              Contact
            </Link>
          )}
        </nav>

        <Link href="/book" className="btn btn-cta sh-cta">
          Book Free Discovery Call
          <svg className="btn-arrow" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Link>

        <button
          type="button"
          className="sh-burger"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
          aria-controls="sh-mobile"
          onClick={() => setMobileOpen((v) => !v)}
        >
          {mobileOpen ? <X size={24} aria-hidden="true" /> : <Menu size={24} aria-hidden="true" />}
        </button>
      </div>

      <div id="sh-mobile" className="sh-mobile" hidden={!mobileOpen}>
        <div className="sh-mobile-scroll">
          {services.length > 0 ? (
            <details className="sh-acc" open>
              <summary>
                Services <ChevronDown size={16} aria-hidden="true" />
              </summary>
              {services.map((r) => (
                <MenuLink key={r.path} route={r} onNavigate={closeAll} showBlurb={false} />
              ))}
              {integrations.map((r) => (
                <MenuLink key={r.path} route={r} onNavigate={closeAll} showBlurb={false} />
              ))}
            </details>
          ) : null}
          {industries.length > 0 ? (
            <details className="sh-acc">
              <summary>
                Industries <ChevronDown size={16} aria-hidden="true" />
              </summary>
              {industries.map((r) => (
                <MenuLink key={r.path} route={r} onNavigate={closeAll} showBlurb={false} />
              ))}
            </details>
          ) : null}
          <details className="sh-acc">
            <summary>
              Pricing <ChevronDown size={16} aria-hidden="true" />
            </summary>
            {pricing.map((r) => (
              <MenuLink key={r.path} route={r} onNavigate={closeAll} showBlurb={false} />
            ))}
          </details>
          <Link href="/case-studies" className="sh-mobile-link" onClick={closeAll}>
            Case Studies
          </Link>
          {resources.map((r) => (
            <Link key={r.path} href={r.path} className="sh-mobile-link" onClick={closeAll}>
              {r.label}
            </Link>
          ))}
          {aboutLive ? (
            <Link href="/about" className="sh-mobile-link" onClick={closeAll}>
              About
            </Link>
          ) : null}
          <Link href="/contact" className="sh-mobile-link" onClick={closeAll}>
            Contact
          </Link>
        </div>
        <div className="sh-mobile-cta">
          <Link href="/book" className="btn btn-cta" onClick={closeAll}>
            <CalendarCheck size={16} aria-hidden="true" /> Book Free Discovery Call
          </Link>
        </div>
      </div>
    </header>
  );
}
