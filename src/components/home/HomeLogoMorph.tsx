"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import logoDark from "@/assets/logo-fua-dark.png";

/* The name the hero copy spells out on scroll; F, U and A in red as in the logo. */
const WORD = "FUTBOLUAGENCY";
const RED = new Set([0, 6, 7]);

const clamp01 = (t: number) => Math.min(1, Math.max(0, t));
/* Progress of t between a and b, 0 before, 1 after. */
const seg = (t: number, a: number, b: number) => clamp01((t - a) / (b - a));
const easeInOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
const norm = (c: string) => c.normalize("NFD").replace(/[̀-ͯ]/g, "").toUpperCase();

/**
 * Hero copy split into letters the scroll story can pick from. Words stay
 * unbreakable; each letter is its own box so it can move on its own.
 */
export const Chars = ({ text }: { text: string }) => (
  <>
    {text.split(" ").map((w, i, all) => (
      <span key={i}>
        <span className="inline-block whitespace-nowrap">
          {[...w].map((c, j) => (
            <span key={j} data-ch={c} className="inline-block">
              {c}
            </span>
          ))}
        </span>
        {i < all.length - 1 ? " " : null}
      </span>
    ))}
  </>
);

/**
 * The hero's scroll story, while the hero is pinned:
 *  1. the copy fades, except the letters that spell FUTBOLUAGENCY, which hang
 *     where they are for a beat;
 *  2. they glide to the centre and become the word (letters the copy lacks,
 *     like the G, simply appear with it);
 *  3. the word turns into the FUA logo, which then blurs out in place;
 *  4. the hero un-pins and the navbar arrives as the university logos reach
 *     the top.
 * The original letters move themselves (no copies), so nothing can drift out
 * of size on any screen. Off when motion is reduced.
 */
const HomeLogoMorph = ({
  wrapRef,
  stageRef,
  enabled,
}: {
  wrapRef: React.RefObject<HTMLElement | null>;
  stageRef: React.RefObject<HTMLElement | null>;
  enabled: boolean;
}) => {
  const wordRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const washRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const stage = stageRef.current;
    const word = wordRef.current;
    const logo = logoRef.current;
    const wash = washRef.current;
    if (!enabled || !wrap || !stage || !word || !logo || !wash) return;

    const sources = [...stage.querySelectorAll<HTMLElement>("[data-src] [data-ch]")];
    const targets = [...word.querySelectorAll<HTMLElement>("[data-ch]")];
    const used = new Set<HTMLElement>();
    /* First unused match in reading order: headline first, then the proof line. */
    const pairs = targets.map((t) => {
      const s = sources.find((el) => !used.has(el) && norm(el.dataset.ch ?? "") === t.dataset.ch);
      if (s) used.add(s);
      return s ?? null;
    });
    const rest = sources.filter((el) => !used.has(el));
    const fades = [...stage.querySelectorAll<HTMLElement>("[data-fade]")];

    let geo: ({ dx: number; dy: number; k: number } | null)[] = [];
    let shown = -1;
    let frame = 0;

    const progress = () => {
      const run = wrap.offsetHeight - window.innerHeight;
      return run > 0 ? clamp01((window.scrollY - wrap.offsetTop) / run) : 0;
    };

    /* Centre-to-centre offsets, read with every letter back at rest. */
    const measure = () => {
      pairs.forEach((s) => s && (s.style.transform = ""));
      word.style.transform = "";
      geo = pairs.map((s, i) => {
        if (!s) return null;
        const a = s.getBoundingClientRect();
        const b = targets[i].getBoundingClientRect();
        return {
          dx: b.left + b.width / 2 - (a.left + a.width / 2),
          dy: b.top + b.height / 2 - (a.top + a.height / 2),
          k: parseFloat(getComputedStyle(targets[i]).fontSize) / parseFloat(getComputedStyle(s).fontSize),
        };
      });
    };

    const paint = () => {
      const goal = progress();
      shown = shown < 0 ? goal : shown + (goal - shown) * 0.16;
      if (Math.abs(goal - shown) < 0.0005) shown = goal;
      const t = shown;

      /* 1. Everything but the chosen letters goes. */
      const restO = String(1 - seg(t, 0.02, 0.16));
      rest.forEach((el) => (el.style.opacity = restO));
      fades.forEach((el) => (el.style.opacity = restO));
      wash.style.opacity = String(0.6 * seg(t, 0, 0.35));

      /* 2. The chosen letters hang, then glide into the word. */
      const m = easeInOut(seg(t, 0.12, 0.42));
      const handOff = String(1 - seg(t, 0.4, 0.46));
      pairs.forEach((s, i) => {
        const g = geo[i];
        if (!s || !g) return;
        s.style.transform = `translate3d(${g.dx * m}px, ${g.dy * m}px, 0) scale(${1 + (g.k - 1) * m})`;
        s.style.opacity = handOff;
      });

      /* 3. The word becomes the logo, which blurs out where it stands. */
      const toLogo = seg(t, 0.56, 0.68);
      word.style.opacity = String(seg(t, 0.38, 0.44) * (1 - toLogo));
      word.style.transform = `scale(${1 - 0.1 * toLogo})`;
      const logoIn = easeInOut(seg(t, 0.58, 0.72));
      const logoOut = seg(t, 0.82, 0.98);
      logo.style.opacity = String(logoIn * (1 - logoOut));
      logo.style.transform = `scale(${0.82 + 0.18 * logoIn + 0.08 * logoOut})`;
      logo.style.filter = logoOut ? `blur(${(16 * logoOut).toFixed(1)}px)` : "";

      if (shown !== goal) frame = requestAnimationFrame(paint);
      else frame = 0;
    };
    const kick = () => {
      if (!frame) frame = requestAnimationFrame(paint);
    };
    const onResize = () => {
      measure();
      shown = -1;
      kick();
    };

    measure();
    paint();
    window.addEventListener("scroll", kick, { passive: true });
    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", kick);
      window.removeEventListener("resize", onResize);
      [...sources, ...fades].forEach((el) => {
        el.style.opacity = "";
        el.style.transform = "";
      });
    };
  }, [enabled, wrapRef, stageRef]);

  if (!enabled) return null;
  return (
    <>
      {/* Deepens the photo while the name and logo hold the centre. */}
      <div ref={washRef} aria-hidden="true" className="pointer-events-none absolute inset-0 bg-ink" style={{ opacity: 0 }} />

      <div aria-hidden="true" className="pointer-events-none absolute inset-0 flex items-center justify-center px-4">
        <div
          ref={wordRef}
          className="font-druk whitespace-nowrap uppercase leading-none text-white text-[clamp(2.6rem,11.5vw,9rem)]"
          style={{ opacity: 0 }}
        >
          {[...WORD].map((c, i) => (
            <span key={i} data-ch={c} className={`inline-block ${RED.has(i) ? "text-red-bright" : ""}`}>
              {c}
            </span>
          ))}
        </div>
      </div>

      <div aria-hidden="true" className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div ref={logoRef} className="w-[min(56vw,22rem)] will-change-transform" style={{ opacity: 0 }}>
          <Image src={logoDark} alt="" sizes="(min-width: 1024px) 22rem, 56vw" className="h-auto w-full" />
        </div>
      </div>
    </>
  );
};

export default HomeLogoMorph;
