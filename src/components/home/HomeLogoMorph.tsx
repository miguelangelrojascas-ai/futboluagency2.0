"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import logoFrame from "@/assets/logo-fua-frame.png";
import logoLetters from "@/assets/logo-fua-letters.png";

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
  { x: 0.0488, y: 0.2037, w: 0.2539, h: 0.5271 },
  { x: 0.3398, y: 0.1888, w: 0.3027, h: 0.6523 },
  { x: 0.6777, y: 0.2037, w: 0.2578, h: 0.5888 },
];
/* Breathing room kept under the logo while it rides down the hero. */
const PAD = 24;
const INSET = 0.93;
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
 * away, everything riding down the middle of what is left of it.
 *  1. the copy fades, except the letters that spell FUTBOLUAGENCY, which glide
 *     into the word (letters the copy lacks, like the G, simply appear);
 *  2. the word holds and keeps travelling down;
 *  3. UTBOL and GENCY go, and F slides over to U and A: FUA;
 *  4. the three letters stretch into the logo's letter shapes. The logo comes in
 *     in two layers: first its frame (wordmark and swoosh) around the letters,
 *     then its own F, U and A take over from the stretched ones at the same spot,
 *     so the two sets never show side by side. The logo then stays until the
 *     hero has scrolled away.
 * Scroll is eased, so wheel steps glide instead of jumping.
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
  const frameRef = useRef<HTMLImageElement>(null);
  const lettersRef = useRef<HTMLImageElement>(null);
  const washRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const stage = stageRef.current;
    const layer = layerRef.current;
    const word = wordRef.current;
    const logo = logoRef.current;
    const wash = washRef.current;
    const frameImg = frameRef.current;
    const lettersImg = lettersRef.current;
    if (!enabled || !wrap || !stage || !layer || !word || !logo || !wash || !frameImg || !lettersImg) return;

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
    /* How far the layer may ride down before the logo would leave the hero. */
    let maxRide = 0;
    /* Height of the docked navbar, which covers the top of the hero. */
    let navH = 0;
    let frame = 0;
    /* Eased scroll position and the time of the last frame. */
    let cur = -1;
    let last = 0;

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
      const lgH = logo.offsetHeight;
      const H = wrap.offsetHeight;
      navH = (document.querySelector("nav")?.getBoundingClientRect().bottom ?? 0) + 8;
      maxRide = Math.max(0, (H - lgH) / 2 - PAD);
      /* The story ends when the space left below the navbar just fits the logo. */
      run = Math.max(1, H - lgH - navH - 2 * PAD);

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
        /* A touch inside the slot, so the logo's own letters cover them at the swap. */
        const sx = (sw / k.w) * INSET;
        const sy = (sh / k.h) * INSET;
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

    const paint = (now: number) => {
      frame = 0;
      const target = Math.max(0, window.scrollY - wrap.offsetTop);
      if (cur < 0) cur = target;
      const dt = last ? Math.min(64, now - last) : 16;
      last = now;
      /* Ease toward the real scroll position; about 90% of the way in 160 ms. */
      cur += (target - cur) * (1 - Math.exp(-dt / 70));
      if (Math.abs(target - cur) < 0.3) cur = target;
      const s = cur;
      const t = clamp01(s / run);
      /* Centre of what is visible of the hero below the navbar. */
      const ride = Math.min((s + Math.min(s, navH)) / 2, maxRide);

      /* The word and logo hold the middle of whatever is left of the hero. */
      layer.style.transform = `translate3d(0, ${ride.toFixed(1)}px, 0)`;

      /* 1. Everything but the chosen letters goes; the photo darkens. */
      const restO = String(1 - seg(t, 0, 0.1));
      rest.forEach((el) => (el.style.opacity = restO));
      fades.forEach((el) => (el.style.opacity = restO));
      wash.style.opacity = String(0.65 * seg(t, 0, 0.25));

      /* The chosen letters glide into the word, left to right. */
      const arrive = (i: number) => 0.02 + i * 0.014;
      const FLY = 0.12;
      pairs.forEach((el, i) => {
        const g = glide[i];
        if (!el || !g) return;
        const m = easeInOut(seg(t, arrive(i), arrive(i) + FLY));
        el.style.transform = `translate3d(${(g.dx * m).toFixed(1)}px, ${(g.dy * m + ride * m).toFixed(1)}px, 0) scale(${(1 + (g.k - 1) * m).toFixed(3)})`;
        /* In flight the letters soften, so crossing paths read as motion, not clutter. */
        const fly = Math.sin(Math.PI * m);
        el.style.filter = fly > 0.01 ? `blur(${(4 * fly).toFixed(1)}px)` : "";
        el.style.opacity = String((1 - 0.5 * fly) * (1 - seg(t, arrive(i) + FLY - 0.015, arrive(i) + FLY)));
      });

      /* 3. UTBOL and GENCY go; F joins U and A. */
      const gone = easeInOut(seg(t, 0.5, 0.6));
      const join = easeInOut(seg(t, 0.52, 0.66));
      /* 4. FUA stretches into the logo's letters; the logo takes over. */
      const fit = easeInOut(seg(t, 0.62, 0.8));
      /* The logo's letters land on top first, then the stretched ones leave beneath them. */
      const logoLetters = easeInOut(seg(t, 0.77, 0.81));
      const swap = easeInOut(seg(t, 0.78, 0.81));
      const red = FROM.map((c, n) => Math.round(lerp(c, TO[n], fit))).join(",");

      targets.forEach((el, i) => {
        const shown = pairs[i]
          ? seg(t, arrive(i) + FLY - 0.015, arrive(i) + FLY)
          : seg(t, arrive(i) + 0.04, arrive(i) + FLY);
        const j = FUA.indexOf(i);
        if (j < 0) {
          /* They shrink toward the middle of the word as they go. */
          el.style.opacity = String(shown * (1 - gone));
          el.style.transform = gone > 0 ? `scale(${(1 - 0.35 * gone).toFixed(3)})` : "";
          el.style.filter = gone > 0 ? `blur(${(5 * gone).toFixed(1)}px)` : "";
          return;
        }
        const f = fua[j];
        if (!f) return;
        el.style.opacity = String(shown * (1 - swap));
        el.style.color = `rgb(${red})`;
        el.style.transform = `translate3d(${lerp(f.cx * join, f.tx, fit).toFixed(1)}px, ${(f.ty * fit).toFixed(1)}px, 0) scale(${lerp(1, f.sx, fit).toFixed(3)}, ${lerp(1, f.sy, fit).toFixed(3)})`;
      });

      const frameIn = easeInOut(seg(t, 0.7, 0.86));
      frameImg.style.opacity = String(frameIn);
      frameImg.style.transform = `scale(${(1.06 - 0.06 * frameIn).toFixed(4)})`;
      frameImg.style.filter = frameIn < 1 ? `blur(${(8 * (1 - frameIn)).toFixed(1)}px)` : "";
      lettersImg.style.opacity = String(logoLetters);
      logo.style.opacity = t > 0.6 ? "1" : "0";

      if (cur !== target) frame = requestAnimationFrame(paint);
      else last = 0;
    };
    const kick = () => {
      if (!frame) frame = requestAnimationFrame(paint);
    };
    const onResize = () => {
      measure();
      kick();
    };

    measure();
    paint(performance.now());
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
          <div ref={logoRef} className="relative w-[min(62vw,34svh)] lg:w-[min(24vw,28svh)]" style={{ opacity: 0 }}>
            <Image ref={lettersRef} src={logoLetters} alt="" sizes="(min-width: 1024px) 18rem, 62vw" className="h-auto w-full" style={{ opacity: 0 }} />
            <Image
              ref={frameRef}
              src={logoFrame}
              alt=""
              sizes="(min-width: 1024px) 18rem, 62vw"
              className="absolute inset-0 h-auto w-full will-change-[opacity,transform,filter]"
              style={{ opacity: 0 }}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default HomeLogoMorph;
