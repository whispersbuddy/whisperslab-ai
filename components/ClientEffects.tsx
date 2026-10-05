"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { CALENDLY_URLS, CalendlyType, themedCalendlyUrl } from "@/lib/calendly";
import { trackEvent } from "@/lib/analytics";

// Internal links worth counting as intent: where visitors go to buy or book.
const CTA_PATHS = new Set(["/audit", "/book", "/contact", "/core-build", "/pricing", "/automation-care", "/growth-partner"]);

declare global {
  interface Window {
    Calendly?: {
      initInlineWidget: (options: {
        url: string;
        parentElement: HTMLElement;
      }) => void;
    };
  }
}

/**
 * Re-implements the legacy script.js behavior (mobile nav toggle + toolkit
 * marquee) against the dangerouslySetInnerHTML markup, plus wires the
 * newsletter/contact forms to the Resend-backed API routes. Re-runs on every
 * route change since the markup it targets is re-inserted per page.
 */
export default function ClientEffects() {
  const pathname = usePathname();

  useEffect(() => {
    // The mobile menu now lives in components/SiteHeader.tsx.
    const viewports = document.querySelectorAll<HTMLElement>(".toolkit-icons");
    viewports.forEach((viewport) => {
      if (viewport.dataset.marqueeReady) return;
      viewport.dataset.marqueeReady = "true";

      const icons = [...viewport.children];
      const track = document.createElement("div");
      track.className = "marquee-track";
      icons.forEach((icon) => track.appendChild(icon));
      icons.forEach((icon) => track.appendChild(icon.cloneNode(true)));

      viewport.classList.add("marquee-viewport");
      viewport.appendChild(track);
    });

    async function handleFormSubmit(e: Event) {
      e.preventDefault();
      const form = e.currentTarget as HTMLFormElement;
      const isContactForm = form.classList.contains("contact-form");
      const endpoint = isContactForm ? "/api/contact" : "/api/newsletter";
      const submitBtn = form.querySelector<HTMLButtonElement>(
        'button[type="submit"]'
      );
      const originalLabel = submitBtn?.textContent ?? "";
      const data = Object.fromEntries(new FormData(form).entries());

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = "Sending...";
      }

      try {
        const res = await fetch(endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });
        if (!res.ok) throw new Error("Request failed");
        trackEvent(isContactForm ? "generate_lead" : "newsletter_signup", {
          form_name: isContactForm ? "contact" : "newsletter",
          page_path: window.location.pathname,
        });
        if (isContactForm) {
          // Gated high-ticket flow: hand off to the booking page instead of
          // showing an inline confirmation.
          window.location.assign("/booking-confirmed");
          return;
        }
        if (submitBtn) submitBtn.textContent = "Sent!";
        form.reset();
      } catch {
        if (submitBtn) submitBtn.textContent = "Something went wrong. Try again";
      } finally {
        setTimeout(() => {
          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.textContent = originalLabel;
          }
        }, 2500);
      }
    }

    const forms = document.querySelectorAll<HTMLFormElement>(
      ".newsletter-form, .contact-form"
    );
    forms.forEach((form) => form.addEventListener("submit", handleFormSubmit));

    const heroToggle = document.getElementById("heroThemeToggle");
    const hero = document.querySelector(".hero");
    const heroBgImg = document.getElementById(
      "heroBgImg"
    ) as HTMLImageElement | null;
    const navWrap = document.querySelector(".nav-wrap");
    const onHeroToggleClick = () => {
      if (!hero || !heroBgImg) return;
      const isLight = hero.classList.toggle("hero-light");
      navWrap?.classList.toggle("nav-light", isLight);
      heroToggle?.classList.toggle("is-light", isLight);
      heroToggle?.setAttribute("aria-pressed", String(isLight));
      heroBgImg.src = isLight
        ? (heroBgImg.dataset.lightSrc ?? heroBgImg.src)
        : (heroBgImg.dataset.darkSrc ?? heroBgImg.src);
    };
    heroToggle?.addEventListener("click", onHeroToggleClick);

    // Calendly's widget.js loads asynchronously (next/script,
    // afterInteractive), so window.Calendly may not exist yet on first run.
    // Poll briefly for it, then init any not-yet-mounted embeds on the page.
    let calendlyPollId: ReturnType<typeof setInterval> | undefined;
    let calendlyAttempts = 0;
    const initCalendlyEmbeds = () => {
      const targets = document.querySelectorAll<HTMLElement>(
        "[data-calendly]:not([data-calendly-ready])"
      );
      if (targets.length === 0) return true;
      if (!window.Calendly) return false;

      targets.forEach((el) => {
        const type = el.dataset.calendly as CalendlyType | undefined;
        const baseUrl = type ? CALENDLY_URLS[type] : undefined;
        if (!baseUrl) return;
        el.dataset.calendlyReady = "true";
        window.Calendly!.initInlineWidget({
          url: themedCalendlyUrl(baseUrl),
          parentElement: el,
        });
      });
      return true;
    };
    if (!initCalendlyEmbeds()) {
      calendlyPollId = setInterval(() => {
        calendlyAttempts += 1;
        if (initCalendlyEmbeds() || calendlyAttempts > 25) {
          if (calendlyPollId) clearInterval(calendlyPollId);
        }
      }, 200);
    }

    // Calendly reports its actual content height via postMessage so the
    // embed can grow to fit instead of showing its own internal scrollbar.
    const onCalendlyMessage = (e: MessageEvent) => {
      if (e.data?.event === "calendly.event_scheduled") {
        trackEvent("calendly_booking", { page_path: window.location.pathname });
        return;
      }
      if (e.data?.event !== "calendly.page_height") return;
      const height = e.data?.payload?.height;
      if (!height) return;
      document
        .querySelectorAll<HTMLElement>("[data-calendly]")
        .forEach((el) => {
          el.style.height = `${height}px`;
        });
    };
    window.addEventListener("message", onCalendlyMessage);

    // One delegated listener covers links in both React components and the
    // legacy HTML strings rendered via dangerouslySetInnerHTML.
    const onCtaClick = (e: MouseEvent) => {
      const link = (e.target as Element | null)?.closest?.("a");
      if (!link) return;
      let url: URL;
      try {
        url = new URL(link.href, window.location.origin);
      } catch {
        return;
      }
      if (url.origin !== window.location.origin || !CTA_PATHS.has(url.pathname)) return;
      trackEvent("cta_click", {
        cta_destination: url.pathname,
        cta_text: (link.textContent ?? "").trim().slice(0, 60),
        page_path: window.location.pathname,
      });
    };
    document.addEventListener("click", onCtaClick);

    return () => {
      if (calendlyPollId) clearInterval(calendlyPollId);
      window.removeEventListener("message", onCalendlyMessage);
      document.removeEventListener("click", onCtaClick);
      forms.forEach((form) =>
        form.removeEventListener("submit", handleFormSubmit)
      );
      heroToggle?.removeEventListener("click", onHeroToggleClick);
    };
  }, [pathname]);

  return null;
}
