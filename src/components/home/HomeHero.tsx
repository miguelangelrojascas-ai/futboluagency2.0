"use client";

import Image from "next/image";
import { useLanguage } from "@/contexts/LanguageContext";
import HomeCta from "@/components/home/HomeCta";

/**
 * Editorial hero: three real FUA players cut out on near-black, lit from
 * behind in corporate red, with one oversized headline and a single CTA.
 */
const HomeHero = () => {
  const { language } = useLanguage();
  const es = language === "es";

  return (
    <section className="relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-ink text-white lg:justify-center">
      {/* Light: a red back-glow behind the players and a cold spot from above. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(55% 50% at 50% 78%, hsl(354 86% 45% / 0.42), transparent 70%), radial-gradient(35% 45% at 50% 0%, rgba(255,255,255,0.09), transparent 70%)",
        }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 hidden lg:block"
        style={{
          background:
            "radial-gradient(42% 60% at 74% 70%, hsl(354 86% 45% / 0.45), transparent 70%), radial-gradient(28% 45% at 74% 0%, rgba(255,255,255,0.10), transparent 70%), #0a0a0a",
        }}
      />

      {/* Giant outlined monogram behind the players. */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-[0.18em] left-1/2 -z-10 -translate-x-1/2 select-none font-druk text-[62vw] leading-none text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.07)] lg:left-auto lg:right-[-2vw] lg:translate-x-0 lg:text-[34vw]"
      >
        FUA
      </span>

      <div className="container-wide relative z-10 w-full px-4 pt-28 sm:pt-32 lg:pb-24 lg:pt-36">
        <div className="max-w-xl lg:max-w-[48%]">
          <p className="font-bebas text-[15px] tracking-[0.3em] text-white/60 sm:text-base">
            {es ? "FutbolUAgency · Becas deportivas" : "FutbolUAgency · Athletic scholarships"}
          </p>
          <h1
            className={`mt-3 font-druk uppercase leading-[0.96] tracking-[0.005em] text-white lg:text-[clamp(6rem,8.4vw,9.75rem)] ${
              /* "SCHOLARSHIP" is the longest line, so English runs a size smaller on phones. */
              es ? "text-[clamp(4rem,19vw,7.5rem)]" : "text-[clamp(3.5rem,15.5vw,7.5rem)]"
            }`}
          >
            {es ? (
              <>
                <span className="block">Tu beca</span>
                <span className="block">de fútbol</span>
                <span className="block pr-[0.08em] italic text-red-bright">en EE.UU.</span>
              </>
            ) : (
              <>
                <span className="block">Your soccer</span>
                <span className="block">scholarship</span>
                <span className="block pr-[0.08em] italic text-red-bright">in the USA</span>
              </>
            )}
          </h1>
          <p className="mt-6 max-w-md font-bebas text-[1.2rem] leading-snug tracking-[0.16em] text-white/80 sm:text-[1.35rem]">
            {es
              ? "+250 futbolistas ya compiten en NCAA, NAIA y NJCAA"
              : "250+ players already compete in the NCAA, NAIA and NJCAA"}
          </p>
          <HomeCta className="mt-8" />
        </div>
      </div>

      {/* Players: one in front, two in shadow. Decorative, so hidden from screen readers. */}
      <div
        aria-hidden="true"
        className="relative mt-4 h-[50svh] min-h-[340px] w-full lg:absolute lg:bottom-0 lg:right-0 lg:mt-0 lg:h-[86%] lg:w-[50%]"
      >
        <div className="absolute inset-x-0 bottom-0 flex h-full items-end justify-center">
          <Image
            src="/images/home/jugador-brazos.png"
            alt=""
            width={342}
            height={1199}
            sizes="(min-width: 1024px) 14vw, 28vw"
            className="relative -mr-[9%] h-[80%] w-auto brightness-[0.62] saturate-[0.8]"
          />
          <Image
            src="/images/home/jugador-balon.png"
            alt=""
            width={576}
            height={1189}
            priority
            sizes="(min-width: 1024px) 24vw, 56vw"
            className="relative z-10 h-full w-auto [filter:drop-shadow(0_0_50px_hsl(354_86%_45%/0.45))]"
          />
          <Image
            src="/images/home/jugador-blanco.png"
            alt=""
            width={475}
            height={1282}
            sizes="(min-width: 1024px) 18vw, 36vw"
            className="relative -ml-[9%] h-[82%] w-auto brightness-[0.62] saturate-[0.8]"
          />
        </div>
        {/* Floor: the feet fade into the dark instead of stopping on a hard edge. */}
        <div className="absolute inset-x-0 bottom-0 z-20 h-28 bg-gradient-to-t from-ink via-ink/80 to-transparent" />
      </div>
    </section>
  );
};

export default HomeHero;
