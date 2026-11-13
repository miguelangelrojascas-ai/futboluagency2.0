"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { druk } from "@/fonts/editorial";

const LETTERS = ["F", "U", "A"] as const;

/* Where the three letters sit inside the white shield logo (fractions of the image). */
const LOGO_BOX = { x: 0.048, y: 0.184, w: 0.882, h: 0.544 };

/* Fast at first, so the letters shrink out of the headline's way, then settle. */
const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);
const clamp01 = (t: number) => Math.min(1, Math.max(0, t));

/**
 * F · U · A spread across the top of the hero. As the visitor scrolls out of
 * it, the letters slide together, shrink, fill in white and land on the navbar
 * logo, which then takes over. On phones that logo sits centred, so the
 * letters gather in the middle. The in-hero letters are the server-rendered
 * fallback; once mounted, a fixed copy (portalled above the navbar) does the
 * moving. Reduced motion: the letters simply scroll away with the hero.
 */
const HomeLogoMorph = ({ heroRef }: { heroRef: React.RefObject<HTMLElement | null> }) => {
  const slots = useRef<(HTMLSpanElement | null)[]>([]);
  const flying = useRef<(HTMLSpanElement | null)[]>([]);
  const [mounted, setMounted] = useState(false);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setMounted(true);
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setAnimate(!mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    if (!animate) {
      root.style.removeProperty("--fua-logo-reveal");
      return;
    }

    let start: { x: number; y: number; w: number; h: number }[] = [];
    let distance = 1;
    let shown = 0; // smoothed progress
    let frame = 0;

    const measure = () => {
      /* Rects at scroll 0: the hero is the first thing on the page. */
      start = slots.current.map((el) => {
        const r = el!.getBoundingClientRect();
        return { x: r.left, y: r.top + window.scrollY, w: r.width, h: r.height };
      });
      /* Finish before the headline climbs into the letters' row: on phones it
         sits right below them, so the morph is shorter there. */
      const heroH = heroRef.current?.offsetHeight ?? window.innerHeight;
      const h1 = heroRef.current?.querySelector("h1");
      const gap = h1 ? h1.getBoundingClientRect().top + window.scrollY - 64 : heroH;
      distance = Math.max(160, Math.min(heroH * 0.55, gap * 1.25));
    };

    const target = () => {
      const logo = document.querySelector<HTMLElement>("[data-nav-logo]");
      if (!logo) return null;
      const r = logo.getBoundingClientRect();
      const box = { x: r.left + r.width * LOGO_BOX.x, y: r.top + r.height * LOGO_BOX.y, w: r.width * LOGO_BOX.w, h: r.height * LOGO_BOX.h };
      return LETTERS.map((_, i) => ({ x: box.x + (box.w / 3) * i, y: box.y, w: box.w / 3, h: box.h }));
    };

    const paint = () => {
      const goal = clamp01(window.scrollY / distance);
      shown += (goal - shown) * 0.16;
      if (Math.abs(goal - shown) < 0.0005) shown = goal;

      const ends = target();
      const p = easeOut(shown);
      const scrolled = shown * distance;
      flying.current.forEach((el, i) => {
        const s = start[i];
        if (!el || !s || !ends) return;
        const e = ends[i];
        const scale = 1 + (e.h / s.h - 1) * p;
        const x = s.x + (e.x + (e.w - s.w * (e.h / s.h)) / 2 - s.x) * p;
        /* Ride up with the page until the navbar line, then stay pinned to it. */
        const y = Math.max(e.y, s.y - scrolled);
        el.style.transform = `translate3d(${x}px, ${y}px, 0) scale(${scale})`;
        /* White outline at rest, solid white once compact, like the logo. */
        const fill = clamp01((p - 0.35) / 0.5);
        el.style.color = `rgba(255,255,255,${fill})`;
        el.style.webkitTextStroke = `${2 / scale}px #fff`;
        /* Hand over to the real logo at the very end. */
        el.style.opacity = String(1 - clamp01((shown - 0.9) / 0.1));
      });
      root.style.setProperty("--fua-logo-reveal", String(clamp01((shown - 0.88) / 0.12)));

      if (shown !== goal) frame = requestAnimationFrame(paint);
      else frame = 0;
    };

    const kick = () => {
      if (!frame) frame = requestAnimationFrame(paint);
    };
    const onResize = () => {
      const y = window.scrollY;
      window.scrollTo(0, 0);
      measure();
      window.scrollTo(0, y);
      kick();
    };

    measure();
    shown = clamp01(window.scrollY / distance);
    paint();
    window.addEventListener("scroll", kick, { passive: true });
    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", kick);
      window.removeEventListener("resize", onResize);
      root.style.removeProperty("--fua-logo-reveal");
    };
  }, [animate, heroRef]);

  const letterClass =
    "font-druk uppercase leading-none text-[clamp(5.5rem,15vw,13rem)] text-transparent [-webkit-text-stroke:2px_rgba(255,255,255,0.9)]";

  return (
    <>
      {/* In-hero letters: the layout slots, and what shows before JS or with reduced motion. */}
      <div
        aria-hidden="true"
        className="container-wide pointer-events-none absolute inset-x-0 top-20 flex justify-between px-4 md:top-24"
        style={{ opacity: mounted && animate ? 0 : 1 }}
      >
        {LETTERS.map((l, i) => (
          <span key={l} ref={(el) => { slots.current[i] = el; }} className={letterClass}>
            {l}
          </span>
        ))}
      </div>

      {mounted &&
        animate &&
        createPortal(
          <div aria-hidden="true" className={`pointer-events-none fixed inset-0 z-[60] ${druk.variable}`}>
            {LETTERS.map((l, i) => (
              <span
                key={l}
                ref={(el) => { flying.current[i] = el; }}
                className={`${letterClass} absolute left-0 top-0 origin-top-left will-change-transform`}
                style={{ opacity: 0 }}
              >
                {l}
              </span>
            ))}
          </div>,
          document.body,
        )}
    </>
  );
};

export default HomeLogoMorph;
