"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { CALENDLY_URLS, CalendlyType, themedCalendlyUrl } from "@/lib/calendly";

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
    const burger = document.getElementById("burger");
    const mobileMenu = document.getElementById("mobileMenu");
    const onBurgerClick = () => mobileMenu?.classList.toggle("open");
    const menuLinkHandlers: Array<[Element, () => void]> = [];
    if (burger && mobileMenu) {
      burger.addEventListener("click", onBurgerClick);
      mobileMenu.querySelectorAll("a").forEach((a) => {
        const handler = () => mobileMenu.classList.remove("open");
        a.addEventListener("click", handler);
        menuLinkHandlers.push([a, handler]);
      });
    }

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
        if (isContactForm) {
          // Gated high-ticket flow: hand off to the booking page instead of
          // showing an inline confirmation.
          window.location.assign("/booking-confirmed");
          return;
        }
        if (submitBtn) submitBtn.textContent = "Sent!";
        form.reset();
      } catch {
        if (submitBtn) submitBtn.textContent = "Something went wrong — try again";
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

    return () => {
      if (calendlyPollId) clearInterval(calendlyPollId);
      window.removeEventListener("message", onCalendlyMessage);
      burger?.removeEventListener("click", onBurgerClick);
      menuLinkHandlers.forEach(([a, handler]) =>
        a.removeEventListener("click", handler)
      );
      forms.forEach((form) =>
        form.removeEventListener("submit", handleFormSubmit)
      );
      heroToggle?.removeEventListener("click", onHeroToggleClick);
    };
  }, [pathname]);

  return null;
}
