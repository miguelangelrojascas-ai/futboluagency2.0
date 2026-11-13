"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

const LETTERS = ["F", "U", "A"] as const;

/* Each letter's cap box inside the dark logo (logo-fua-dark.png, fractions of the image). */
const SLOTS = {
  F: { x: 0.049, y: 0.204, w: 0.254, h: 0.43 },
  U: { x: 0.34, y: 0.189, w: 0.301, h: 0.5 },
  A: { x: 0.678, y: 0.204, w: 0.258, h: 0.43 },
};
/* The logo's red. */
const RED = [175, 7, 23];

/* Phases of the scroll, as fractions of the morph distance. */
const FADE_END = 0.3; // everything but the three letters is gone
const GATHER_START = 0.22; // the letters start moving

const clamp01 = (t: number) => Math.min(1, Math.max(0, t));
const easeInOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
const parseRgb = (c: string) => (c.match(/[\d.]+/g) ?? ["255", "255", "255"]).slice(0, 3).map(Number);

type Glyph = { x: number; y: number; w: number; h: number; ox: number; oy: number };
type Type = { font: string; text: string; color: string; style: React.CSSProperties };

/**
 * The hero headline already holds an F, a U and an A (marked data-morph).
 * Scrolling out of the hero, the rest of the copy fades away while those three
 * stay suspended where they were, then glide together, turn the logo's red and
 * land on the navbar logo, which takes over. Fixed copies (portalled above the
 * navbar) do the moving; the originals keep their place in the layout.
 * Reduced motion: nothing moves, the navbar logo is simply there.
 */
const HomeLogoMorph = ({ heroRef }: { heroRef: React.RefObject<HTMLElement | null> }) => {
  const clones = useRef<(HTMLSpanElement | null)[]>([]);
  const [animate, setAnimate] = useState(false);
  const [types, setTypes] = useState<Type[] | null>(null);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setAnimate(!mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  /* Copy each original letter's type so the clone is identical at rest. */
  useEffect(() => {
    if (!animate) {
      setTypes(null);
      return;
    }
    let live = true;
    document.fonts.ready.then(() => {
      const hero = heroRef.current;
      if (!live || !hero) return;
      const found = LETTERS.map((l) => hero.querySelector<HTMLElement>(`[data-morph="${l}"]`));
      if (found.some((el) => !el)) return;
      setTypes(
        found.map((el) => {
          const cs = getComputedStyle(el!);
          return {
            font: `${cs.fontStyle} ${cs.fontWeight} ${cs.fontSize} ${cs.fontFamily}`,
            text: (el!.textContent ?? "").toUpperCase(),
            color: cs.color,
            style: {
              fontFamily: cs.fontFamily,
              fontSize: cs.fontSize,
              fontStyle: cs.fontStyle,
              fontWeight: cs.fontWeight,
              letterSpacing: cs.letterSpacing,
              lineHeight: cs.lineHeight,
            },
          };
        }),
      );
    });
    return () => {
      live = false;
    };
  }, [animate, heroRef]);

  useEffect(() => {
    const hero = heroRef.current;
    const root = document.documentElement;
    if (!animate || !types || !hero) {
      root.style.removeProperty("--fua-logo-reveal");
      return;
    }
    const originals = LETTERS.map((l) => hero.querySelector<HTMLElement>(`[data-morph="${l}"]`)!);
    const content = hero.querySelector<HTMLElement>("[data-hero-content]");
    const ctx = document.createElement("canvas").getContext("2d")!;
    const colors = types.map((t) => parseRgb(t.color));

    let start: Glyph[] = [];
    let distance = 1;
    let shown = 0;
    let frame = 0;

    /* Where each letter's ink sits, in page coordinates, from the font's own metrics. */
    const measure = () => {
      start = originals.map((el, i) => {
        const r = el.getBoundingClientRect();
        const cloneH = clones.current[i]!.offsetHeight; // untransformed box
        ctx.font = types[i].font;
        const m = ctx.measureText(types[i].text);
        const contentH = m.fontBoundingBoxAscent + m.fontBoundingBoxDescent;
        const baseline = r.top + (r.height - contentH) / 2 + m.fontBoundingBoxAscent;
        const top = baseline - m.actualBoundingBoxAscent;
        const left = r.left - m.actualBoundingBoxLeft;
        return {
          x: left,
          y: top + window.scrollY,
          w: m.actualBoundingBoxLeft + m.actualBoundingBoxRight,
          h: m.actualBoundingBoxAscent + m.actualBoundingBoxDescent,
          /* Ink offset inside the clone, an absolutely placed box one line tall. */
          ox: -m.actualBoundingBoxLeft,
          oy: (cloneH - contentH) / 2 + m.fontBoundingBoxAscent - m.actualBoundingBoxAscent,
        };
      });
      distance = Math.max(240, hero.offsetHeight * 0.6);
    };

    const slots = () => {
      const logo = document.querySelector<HTMLElement>("[data-nav-logo]");
      if (!logo) return null;
      const r = logo.getBoundingClientRect();
      return LETTERS.map((l) => {
        const s = SLOTS[l];
        return { x: r.left + r.width * s.x, y: r.top + r.height * s.y, w: r.width * s.w, h: r.height * s.h };
      });
    };

    const paint = () => {
      const goal = clamp01(window.scrollY / distance);
      shown += (goal - shown) * 0.14;
      if (Math.abs(goal - shown) < 0.0005) shown = goal;

      if (content) content.style.opacity = String(1 - clamp01(shown / FADE_END));
      const ends = slots();
      /* If the F (from "fútbol", right of the U and A) has to pass them, it arcs over. */
      const crossings =
        ends &&
        start.map((a, i) => start.filter((b, j) => j !== i && (a.x - b.x) * (ends[i].x - ends[j].x) < 0).length);
      const p = easeInOut(clamp01((shown - GATHER_START) / (1 - GATHER_START)));
      clones.current.forEach((el, i) => {
        const s = start[i];
        if (!el || !s || !ends) return;
        const e = ends[i];
        const k = e.h / s.h;
        const scale = 1 + (k - 1) * p;
        /* Suspended: at rest the clone holds the spot the letter had before any scroll. */
        const gx = s.x + (e.x + (e.w - s.w * k) / 2 - s.x) * p;
        const lift = crossings && i === 0 && crossings[0] > 0 ? Math.sin(Math.PI * p) * Math.min(140, s.h * 0.9) : 0;
        const gy = s.y + (e.y - s.y) * p - lift;
        el.style.transformOrigin = `${s.ox}px ${s.oy}px`;
        el.style.transform = `translate3d(${gx - s.ox}px, ${gy - s.oy}px, 0) scale(${scale})`;
        const c = colors[i].map((v, j) => Math.round(v + (RED[j] - v) * p));
        el.style.color = `rgb(${c.join(",")})`;
        el.style.opacity = String(1 - clamp01((shown - 0.92) / 0.08));
      });
      root.style.setProperty("--fua-logo-reveal", String(clamp01((shown - 0.88) / 0.1)));

      if (shown !== goal) frame = requestAnimationFrame(paint);
      else frame = 0;
    };
    const kick = () => {
      if (!frame) frame = requestAnimationFrame(paint);
    };
    const onResize = () => {
      measure();
      kick();
    };

    /* The hero opens the page, so a letter's page position is also its resting
       spot on screen, which is where the clone stays suspended. */
    measure();
    shown = clamp01(window.scrollY / distance);
    paint();
    originals.forEach((el) => (el.style.visibility = "hidden"));
    window.addEventListener("scroll", kick, { passive: true });
    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", kick);
      window.removeEventListener("resize", onResize);
      originals.forEach((el) => (el.style.visibility = ""));
      if (content) content.style.opacity = "";
      root.style.removeProperty("--fua-logo-reveal");
    };
  }, [animate, types, heroRef]);

  if (!animate || !types) return null;
  return createPortal(
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[60]">
      {types.map((t, i) => (
        <span
          key={LETTERS[i]}
          ref={(el) => {
            clones.current[i] = el;
          }}
          className="absolute left-0 top-0 whitespace-pre uppercase will-change-transform"
          style={{ ...t.style, color: t.color, opacity: 0 }}
        >
          {t.text}
        </span>
      ))}
    </div>,
    document.body,
  );
};

export default HomeLogoMorph;
