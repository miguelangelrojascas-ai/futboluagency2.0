"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useLanguage } from "@/contexts/LanguageContext";
import HomeCta from "@/components/home/HomeCta";
import { SPOTLIGHT } from "@/components/home/spotlight";

const SLIDE_MS = 6500;

/** Font size that lets the surname span the viewport whatever its length. */
const surnameSize = (word: string) => `${Math.min(30, 96 / (word.length * 0.47))}vw`;

/**
 * Proposal A, "Spotlight": one real player at a time, his surname set huge
 * behind him and his school as a credit line, the way an agency presents a
 * client. Rotates on its own; the bars under the credit switch it by hand.
 */
const HomeHeroSpotlight = () => {
  const { language } = useLanguage();
  const es = language === "es";
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [still, setStill] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setStill(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (paused || still) return;
    const t = window.setTimeout(() => setActive((i) => (i + 1) % SPOTLIGHT.length), SLIDE_MS);
    return () => window.clearTimeout(t);
  }, [active, paused, still]);

  const player = SPOTLIGHT[active];

  return (
    <section className="relative isolate overflow-hidden bg-ink text-white">
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10"
        style={{ background: "radial-gradient(45% 55% at 60% 72%, hsl(354 86% 40% / 0.38), transparent 72%)" }}
      />

      {/* Surname, huge and dark red, behind the player. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-[56%] -z-10 lg:top-[12%]">
        {SPOTLIGHT.map((p, i) => (
          <span
            key={p.name}
            className="absolute inset-x-0 whitespace-nowrap text-center font-druk uppercase leading-none text-[hsl(354_62%_17%)] transition-[opacity,transform] duration-700 ease-out"
            style={{
              fontSize: surnameSize(p.surname),
              opacity: i === active ? 1 : 0,
              transform: i === active ? "translateY(0)" : "translateY(4%)",
            }}
          >
            {p.surname}
          </span>
        ))}
      </div>

      <div className="container-wide relative flex min-h-[100svh] flex-col px-4 pb-8 pt-24 sm:pt-28 lg:grid lg:grid-cols-[1fr_auto] lg:items-end lg:gap-12 lg:pb-14">
        {/* Players: in the flow on phones, behind the copy on desktop. */}
        <div
          aria-hidden="true"
          className="relative order-2 -mx-4 min-h-[340px] flex-1 lg:absolute lg:inset-y-0 lg:left-[50%] lg:mx-0 lg:w-[32%]"
        >
          {SPOTLIGHT.map((p, i) => (
            <Image
              key={p.name}
              src={p.src}
              alt=""
              width={p.width}
              height={p.height}
              priority={i === 0}
              sizes="(min-width: 1024px) 26vw, 60vw"
              className="absolute bottom-0 left-1/2 h-[96%] w-auto max-w-none -translate-x-1/2 transition-[opacity,transform] duration-700 ease-out lg:h-[86%]"
              style={{
                opacity: i === active ? 1 : 0,
                transform: `translateX(-50%) scale(${i === active ? 1 : 0.97})`,
              }}
            />
          ))}
          <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-ink via-ink/70 to-transparent" />
        </div>

        <div className="relative z-10 order-1 lg:order-none">
          <h1
            className={`font-druk uppercase leading-[0.96] text-white lg:text-[clamp(4.5rem,6.4vw,7rem)] ${
              es ? "text-[clamp(3.5rem,18vw,6rem)]" : "text-[clamp(3rem,14.5vw,6rem)]"
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
          <p className="mt-4 max-w-md font-bebas text-[1.15rem] leading-snug tracking-[0.16em] text-white/75 sm:text-[1.3rem]">
            {es
              ? "+250 futbolistas ya compiten en NCAA, NAIA y NJCAA"
              : "250+ players already compete in the NCAA, NAIA and NJCAA"}
          </p>
          <HomeCta className="mt-7" />
        </div>

        {/* Credit line for the player on screen, plus the controls. */}
        <div
          className="relative z-10 order-3 -mt-16 lg:mt-0 lg:min-w-[260px] lg:text-right"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocus={() => setPaused(true)}
          onBlur={() => setPaused(false)}
        >
          <div aria-live="polite">
            <p className="font-bebas text-[1.6rem] leading-none tracking-[0.1em]">{player.name}</p>
            <p className="mt-1.5 font-bebas text-[15px] tracking-[0.2em] text-white/60">
              {player.university} · <span className="text-red-bright">{player.division}</span>
            </p>
          </div>
          <div className="mt-4 flex gap-2 lg:justify-end">
            {SPOTLIGHT.map((p, i) => (
              <button
                key={p.name}
                type="button"
                onClick={() => setActive(i)}
                aria-label={es ? `Ver a ${p.name}` : `Show ${p.name}`}
                aria-pressed={i === active}
                className="group relative flex h-6 w-12 items-center"
              >
                <span className="relative block h-[3px] w-full overflow-hidden rounded-full bg-white/20 transition-colors group-hover:bg-white/35">
                  {i === active && (
                    <span
                      key={`${active}-${paused || still}`}
                      className="absolute inset-y-0 left-0 rounded-full bg-white"
                      style={
                        paused || still
                          ? { width: "100%" }
                          : { width: "100%", animation: `fua-progress ${SLIDE_MS}ms linear both` }
                      }
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

export default HomeHeroSpotlight;
