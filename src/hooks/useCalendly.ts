
declare global {
  interface Window {
    Calendly?: {
      initPopupWidget: (options: { url: string }) => void;
    };
  }
}

export const CALENDLY_URL =
  "https://calendly.com/miguelangelrojascas/new-meeting?hide_event_type_details=1&hide_gdpr_banner=1";

let loading = false;

/**
 * Injects the Calendly widget once.
 *
 * Nothing is requested from Calendly until this runs, which keeps pages that
 * never offer a booking free of third-party requests.
 */
const loadCalendly = (onReady?: () => void) => {
  if (window.Calendly) {
    onReady?.();
    return;
  }
  if (loading) return;
  loading = true;

  const link = document.createElement("link");
  link.href = "https://assets.calendly.com/assets/external/widget.css";
  link.rel = "stylesheet";
  document.head.appendChild(link);

  const script = document.createElement("script");
  script.src = "https://assets.calendly.com/assets/external/widget.js";
  script.async = true;
  script.onload = () => onReady?.();
  document.body.appendChild(script);
};

/**
 * Opens the booking popup, loading the widget on the spot if needed. If the
 * script cannot load — blocked by an extension, offline — it falls back to
 * Calendly's own page so the visitor can still book.
 */
export const openCalendly = () => {
  if (window.Calendly) {
    window.Calendly.initPopupWidget({ url: CALENDLY_URL });
    return;
  }

  loadCalendly(() => window.Calendly?.initPopupWidget({ url: CALENDLY_URL }));

  // If the widget has not appeared shortly after, hand over to the hosted page.
  setTimeout(() => {
    if (!window.Calendly) window.open(CALENDLY_URL, "_blank", "noopener,noreferrer");
  }, 2500);
};
