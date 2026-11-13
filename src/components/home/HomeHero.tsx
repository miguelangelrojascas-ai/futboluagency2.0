"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useLanguage } from "@/contexts/LanguageContext";
import HomeCta from "@/components/home/HomeCta";
import HomeLogoMorph from "@/components/home/HomeLogoMorph";

const SLIDE_MS = 6500;

/*
 * Photos: Unsplash License (free for commercial use, no attribution required).
 * Credited here anyway, in case they are ever replaced:
 *   hero-bengalas.jpg  Waldemar Brandt   unsplash.com/photos/0aLvDQ_Q6qk
 *   hero-niebla.jpg    Michal Balog      unsplash.com/photos/pc5AA3yBRUg
 *   hero-grada.jpg     Kisha Tuman       unsplash.com/photos/-p8TaLLcXxs
 * They show the stage, not FUA clients, so no player is named on them.
 */
const SLIDES = [
  { src: "/images/home/hero-bengalas.jpg", w: 2400, h: 1600, position: "50% 18%", es: "Compite", en: "Compete", color: true },
  { src: "/images/home/hero-niebla.jpg", w: 2400, h: 1600, position: "55% 45%", es: "Estudia", en: "Study", color: false },
  { src: "/images/home/hero-grada.jpg", w: 2400, h: 1668, position: "60% 55%", es: "Crece", en: "Grow", color: false },
];

/**
 * Full-bleed black-and-white photography of the college game, rotating, with a
 * dark wash on the copy side so the white and red type reads at full contrast.
 */
const HomeHero = () => {
  const { language } = useLanguage();
  const es = language === "es";
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [still, setStill] = useState(false);
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setStill(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (paused || still) return;
    const t = window.setTimeout(() => setActive((i) => (i + 1) % SLIDES.length), SLIDE_MS);
    return () => window.clearTimeout(t);
  }, [active, paused, still]);

  return (
    <section ref={heroRef} className="relative isolate overflow-hidden bg-ink text-white">
      {/* Photos: cross-fade, each settling from a slight zoom while it is on screen. */}
      <div aria-hidden="true" className="absolute inset-0 -z-20">
        {SLIDES.map((s, i) => (
          <Image
            key={s.src}
            src={s.src}
            alt=""
            fill
            priority={i === 0}
            sizes="100vw"
            className={`object-cover transition-[opacity,transform] ease-out ${
              /* The flares keep their colour: the one red moment; the rest is black and white. */
              s.color ? "saturate-[1.1] contrast-[1.1]" : "grayscale-[1] contrast-[1.2] brightness-[0.85]"
            }`}
            style={{
              objectPosition: s.position,
              opacity: i === active ? 1 : 0,
              transform: i === active && !still ? "scale(1)" : "scale(1.07)",
              transitionDuration: i === active ? `1000ms, ${SLIDE_MS + 1000}ms` : "1000ms, 1000ms",
            }}
          />
        ))}
      </div>

      {/* Wash: near-black behind the copy, opening up towards the image. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10"
        style={{
          background:
            "linear-gradient(90deg, rgba(10,10,10,0.94) 0%, rgba(10,10,10,0.78) 38%, rgba(10,10,10,0.25) 72%, rgba(10,10,10,0.15) 100%), linear-gradient(0deg, rgba(10,10,10,0.96) 0%, rgba(10,10,10,0.75) 28%, rgba(10,10,10,0) 55%), linear-gradient(180deg, rgba(10,10,10,0.6) 0%, rgba(10,10,10,0) 22%)",
        }}
      />

      {/* Portrait screens see the full height of the photo, sponsor boards
          included: an extra wash keeps them out of sight. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 lg:hidden"
        style={{
          background:
            "linear-gradient(180deg, rgba(10,10,10,0.85) 0%, rgba(10,10,10,0.2) 22%, rgba(10,10,10,0.25) 45%, rgba(10,10,10,0.92) 68%)",
        }}
      />

      <HomeLogoMorph heroRef={heroRef} />

      <div className="container-wide relative flex min-h-[100svh] flex-col justify-end px-4 pb-10 pt-28 lg:pb-16">
        <div className="max-w-[60rem]">
          <h1
            className={`font-druk uppercase leading-[0.96] text-white lg:text-[clamp(5rem,7.2vw,8rem)] ${
              es ? "text-[clamp(3.75rem,19vw,6.5rem)]" : "text-[clamp(3.25rem,15vw,6.5rem)]"
            }`}
          >
            {es ? (
              <>
                <span className="block">
                  Tu beca <br className="lg:hidden" />
                  de fútbol
                </span>
                <span className="block pr-[0.08em] italic text-red-bright">en EE.UU.</span>
              </>
            ) : (
              <>
                <span className="block">
                  Your soccer <br className="lg:hidden" />
                  scholarship
                </span>
                <span className="block pr-[0.08em] italic text-red-bright">in the USA</span>
              </>
            )}
          </h1>
          <p className="mt-5 max-w-2xl font-bebas text-[1.2rem] leading-snug tracking-[0.16em] text-white sm:text-[1.45rem]">
            {es ? (
              <>
                +250 futbolistas ya compiten en NCAA, NAIA y NJCAA · más de $10M en becas
              </>
            ) : (
              <>
                250+ players already compete in the NCAA, NAIA and NJCAA · over $10M in scholarships
              </>
            )}
          </p>
          <HomeCta className="mt-8" />
        </div>

        {/* Slide word and controls, bottom right. */}
        <div
          className="mt-10 flex items-end justify-between gap-6 lg:absolute lg:bottom-16 lg:right-4 lg:mt-0 lg:block lg:text-right"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocus={() => setPaused(true)}
          onBlur={() => setPaused(false)}
        >
          <p aria-hidden="true" className="font-druk text-[2.75rem] uppercase leading-none text-white/90 lg:text-[3.5rem]">
            {SLIDES[active][es ? "es" : "en"]}
            <span className="text-red-bright">.</span>
          </p>
          <div className="flex gap-2 lg:mt-4 lg:justify-end">
            {SLIDES.map((s, i) => (
              <button
                key={s.src}
                type="button"
                onClick={() => setActive(i)}
                aria-label={es ? `Imagen ${i + 1} de ${SLIDES.length}` : `Image ${i + 1} of ${SLIDES.length}`}
                aria-pressed={i === active}
                className="group flex h-6 w-12 items-center rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
              >
                <span className="relative block h-[3px] w-full overflow-hidden rounded-full bg-white/25 transition-colors group-hover:bg-white/40">
                  {i === active && (
                    <span
                      key={`${active}-${paused || still}`}
                      className="absolute inset-0 rounded-full bg-white"
                      style={paused || still ? undefined : { animation: `fua-progress ${SLIDE_MS}ms linear both` }}
                    />
                  )}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeHero;
