import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname, hash } = useLocation();
  // null until the first navigation runs, so landing straight on an anchored
  // URL counts as arriving from elsewhere rather than as a same-page jump.
  const prevPathname = useRef<string | null>(null);

  useEffect(() => {
    const arrived = prevPathname.current !== pathname;
    prevPathname.current = pathname;

    if (!hash) {
      window.scrollTo(0, 0);
      return;
    }

    // Landing on another page's anchor: jump straight there. The CSS
    // `scroll-behavior: smooth` animation is unreliable while the page is
    // still mounting (and never runs at all in a hidden tab), so only same-page
    // anchors get the smooth treatment.
    const behavior: ScrollBehavior = arrived ? "instant" : "auto";

    // Lazy-loaded pages mount after this effect runs, so the anchor may not
    // exist yet. Poll for a few seconds until it shows up, then give up.
    const id = hash.slice(1);
    const deadline = Date.now() + 5000;
    let timer: number;

    const tryScroll = () => {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior, block: "start" });
        return;
      }
      if (Date.now() < deadline) {
        timer = window.setTimeout(tryScroll, 50);
      }
    };

    tryScroll();
    return () => window.clearTimeout(timer);
  }, [pathname, hash]);

  return null;
};

export default ScrollToTop;
