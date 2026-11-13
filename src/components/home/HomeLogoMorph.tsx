"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import logoDark from "@/assets/logo-fua-dark.png";

/* The name the hero copy spells out on scroll; F, U and A in red as in the logo. */
const WORD = "FUTBOLUAGENCY";
const FUA = [0, 6, 7];
const RED = new Set(FUA);

/*
 * Where F, U and A sit inside logo-fua-dark.png (512×535), as fractions of the
 * image: the word's letters stretch into exactly these boxes before the logo
 * itself shows.
 */
const SLOTS = [
  { x: 0.049, y: 0.204, w: 0.254, h: 0.43 },
  { x: 0.34, y: 0.189, w: 0.301, h: 0.5 },
  { x: 0.678, y: 0.204, w: 0.258, h: 0.43 },
];
/* Logo red, to blend the letters into the artwork. */
const FROM = [235, 22, 41];
const TO = [175, 7, 23];

const clamp01 = (t: number) => Math.min(1, Math.max(0, t));
/* Progress of t between a and b, 0 before, 1 after. */
const seg = (t: number, a: number, b: number) => clamp01((t - a) / (b - a));
const easeInOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
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

type Box = { x: number; y: number; w: number; h: number };

/**
 * The hero's scroll story. Nothing is pinned: it plays while the hero scrolls
 * away and is over when half of it has left the screen.
 *  1. the copy fades, except the letters that spell FUTBOLUAGENCY, which glide
 *     into the word in the middle of what is left of the hero (letters the copy
 *     lacks, like the G, simply appear);
 *  2. UTBOL and GENCY fade, and F slides over to U and A: FUA;
 *  3. the three letters stretch into the shapes of the logo's letters, the logo
 *     shows around them and blurs out in place.
 * The original letters move themselves (no copies), so nothing can drift out of
 * size on any screen. Off when motion is reduced.
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
  const layerRef = useRef<HTMLDivElement>(null);
  const wordRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const washRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const stage = stageRef.current;
    const layer = layerRef.current;
    const word = wordRef.current;
    const logo = logoRef.current;
    const wash = washRef.current;
    if (!enabled || !wrap || !stage || !layer || !word || !logo || !wash) return;

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
    const ctx = document.createElement("canvas").getContext("2d");

    let glide: ({ dx: number; dy: number; k: number } | null)[] = [];
    /* Per F/U/A: the slide into "FUA", then the stretch into the logo. */
    let fua: { cx: number; tx: number; ty: number; sx: number; sy: number }[] = [];
    let run = 1;
    let frame = 0;

    const docBox = (el: Element): Box => {
      const r = el.getBoundingClientRect();
      return { x: r.left, y: r.top + window.scrollY, w: r.width, h: r.height };
    };

    /* The letter's ink, not its em box, measured on a canvas in the same font. */
    const ink = (el: HTMLElement): Box => {
      const b = docBox(el);
      if (!ctx) return b;
      const cs = getComputedStyle(el);
      ctx.font = `${cs.fontStyle} ${cs.fontWeight} ${cs.fontSize} ${cs.fontFamily}`;
      const m = ctx.measureText(el.textContent ?? "");
      const lh = parseFloat(cs.lineHeight) || parseFloat(cs.fontSize);
      const base = (lh - (m.fontBoundingBoxAscent + m.fontBoundingBoxDescent)) / 2 + m.fontBoundingBoxAscent;
      return {
        x: b.x - m.actualBoundingBoxLeft,
        y: b.y + base - m.actualBoundingBoxAscent,
        w: m.actualBoundingBoxLeft + m.actualBoundingBoxRight,
        h: m.actualBoundingBoxAscent + m.actualBoundingBoxDescent,
      };
    };

    /* Everything read at rest, in page coordinates. */
    const measure = () => {
      [...pairs, ...targets].forEach((el) => el && (el.style.transform = ""));
      layer.style.transform = "";
      logo.style.transform = "";
      run = Math.max(1, wrap.offsetHeight * 0.5);

      glide = pairs.map((s, i) => {
        if (!s) return null;
        const a = docBox(s);
        const b = docBox(targets[i]);
        return {
          dx: b.x + b.w / 2 - (a.x + a.w / 2),
          dy: b.y + b.h / 2 - (a.y + a.h / 2),
          k: parseFloat(getComputedStyle(targets[i]).fontSize) / parseFloat(getComputedStyle(s).fontSize),
        };
      });

      const boxes = FUA.map((i) => docBox(targets[i]));
      const all = docBox(word);
      const total = boxes.reduce((n, b) => n + b.w, 0);
      let left = all.x + all.w / 2 - total / 2;
      const lg = docBox(logo);
      fua = FUA.map((i, j) => {
        const b = boxes[j];
        const cx = left - b.x;
        left += b.w;
        /* Stretch: scale the ink to the slot, around the letter's centre. */
        const k = ink(targets[i]);
        const slot = SLOTS[j];
        const sw = slot.w * lg.w;
        const sh = slot.h * lg.h;
        const sx = sw / k.w;
        const sy = sh / k.h;
        const ox = k.x + k.w / 2 - (b.x + b.w / 2);
        const oy = k.y + k.h / 2 - (b.y + b.h / 2);
        return {
          cx,
          tx: lg.x + (slot.x + slot.w / 2) * lg.w - (b.x + b.w / 2) - ox * sx,
          ty: lg.y + (slot.y + slot.h / 2) * lg.h - (b.y + b.h / 2) - oy * sy,
          sx,
          sy,
        };
      });
    };

    const paint = () => {
      frame = 0;
      const s = Math.max(0, window.scrollY - wrap.offsetTop);
      const t = clamp01(s / run);

      /* The word and logo hold the middle of whatever is left of the hero. */
      layer.style.transform = `translate3d(0, ${(s / 2).toFixed(1)}px, 0)`;

      /* 1. Everything but the chosen letters goes; the photo darkens. */
      const restO = String(1 - seg(t, 0, 0.12));
      rest.forEach((el) => (el.style.opacity = restO));
      fades.forEach((el) => (el.style.opacity = restO));
      wash.style.opacity = String(0.6 * seg(t, 0, 0.3));

      /* The chosen letters ride the page at first, then glide into the word. */
      /* Staggered by place in the word, so it assembles left to right. */
      const arrive = (i: number) => 0.04 + i * 0.016;
      pairs.forEach((el, i) => {
        const g = glide[i];
        if (!el || !g) return;
        const m = easeInOut(seg(t, arrive(i), arrive(i) + 0.13));
        el.style.transform = `translate3d(${(g.dx * m).toFixed(1)}px, ${(g.dy * m + (s / 2) * m).toFixed(1)}px, 0) scale(${1 + (g.k - 1) * m})`;
        /* In flight the letters soften, so crossing paths read as motion, not clutter. */
        const fly = Math.sin(Math.PI * m);
        el.style.filter = fly > 0.01 ? `blur(${(5 * fly).toFixed(1)}px)` : "";
        el.style.opacity = String((1 - 0.55 * fly) * (1 - seg(t, arrive(i) + 0.12, arrive(i) + 0.15)));
      });

      /* 2. UTBOL and GENCY go; F joins U and A. */
      const gone = seg(t, 0.4, 0.5);
      const join = easeInOut(seg(t, 0.42, 0.56));
      /* 3. FUA stretches into the logo's letters, the logo takes over and blurs out. */
      const fit = easeInOut(seg(t, 0.56, 0.7));
      const lettersOut = seg(t, 0.7, 0.76);
      const red = FROM.map((c, n) => Math.round(lerp(c, TO[n], fit))).join(",");

      targets.forEach((el, i) => {
        const shown = pairs[i] ? seg(t, arrive(i) + 0.12, arrive(i) + 0.15) : seg(t, arrive(i) + 0.05, arrive(i) + 0.15);
        const j = FUA.indexOf(i);
        if (j < 0) {
          el.style.opacity = String(shown * (1 - gone));
          el.style.filter = gone > 0 ? `blur(${(6 * gone).toFixed(1)}px)` : "";
          return;
        }
        const f = fua[j];
        if (!f) return;
        el.style.opacity = String(shown * (1 - lettersOut));
        el.style.color = `rgb(${red})`;
        el.style.transform = `translate3d(${lerp(f.cx * join, f.tx, fit).toFixed(1)}px, ${(f.ty * fit).toFixed(1)}px, 0) scale(${lerp(1, f.sx, fit).toFixed(3)}, ${lerp(1, f.sy, fit).toFixed(3)})`;
      });

      const logoIn = easeInOut(seg(t, 0.64, 0.74));
      const logoOut = seg(t, 0.8, 1);
      logo.style.opacity = String(logoIn * (1 - logoOut));
      logo.style.transform = `scale(${1 + 0.08 * logoOut})`;
      logo.style.filter = logoOut ? `blur(${(16 * logoOut).toFixed(1)}px)` : "";
    };
    const kick = () => {
      if (!frame) frame = requestAnimationFrame(paint);
    };
    const onResize = () => {
      measure();
      kick();
    };

    measure();
    paint();
    /* Anton may land after the first measure; the ink boxes depend on it. */
    document.fonts?.ready.then(onResize);
    window.addEventListener("scroll", kick, { passive: true });
    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", kick);
      window.removeEventListener("resize", onResize);
      [...sources, ...fades].forEach((el) => {
        el.style.opacity = "";
        el.style.filter = "";
        el.style.transform = "";
      });
    };
  }, [enabled, wrapRef, stageRef]);

  if (!enabled) return null;
  return (
    <>
      {/* Deepens the photo while the name and logo hold the centre. */}
      <div ref={washRef} aria-hidden="true" className="pointer-events-none absolute inset-0 bg-ink" style={{ opacity: 0 }} />

      <div ref={layerRef} aria-hidden="true" className="pointer-events-none absolute inset-0 will-change-transform">
        <div className="absolute inset-0 flex items-center justify-center px-4">
          <div
            ref={wordRef}
            className="font-druk whitespace-nowrap uppercase leading-none text-white text-[clamp(2.6rem,11.5vw,9rem)]"
          >
            {[...WORD].map((c, i) => (
              <span
                key={i}
                data-ch={c}
                className={`inline-block will-change-transform ${RED.has(i) ? "text-red-bright" : ""}`}
                style={{ opacity: 0 }}
              >
                {c}
              </span>
            ))}
          </div>
        </div>

        <div className="absolute inset-0 flex items-center justify-center">
          <div ref={logoRef} className="w-[min(62vw,34svh)] will-change-transform" style={{ opacity: 0 }}>
            <Image src={logoDark} alt="" sizes="(min-width: 1024px) 22rem, 62vw" className="h-auto w-full" />
          </div>
        </div>
      </div>
    </>
  );
};

export default HomeLogoMorph;
