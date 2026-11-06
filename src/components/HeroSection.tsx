"use client";

import Image from "next/image";
import { ArrowRight } from "lucide-react";
import LocaleLink from "@/components/LocaleLink";
import { useLanguage } from "@/contexts/LanguageContext";

/*
 * Players cut out on FUA red, framing the headline (layout taken from
 * eturesports.com). Each cutout runs from the head to the thighs; the section
 * clips the bottom. Phones only show the two inner players, half off-screen.
 */
const PLAYERS = [
  // Outer pair sits behind, higher up
  {
    src: "/images/hero/jugador-23.png",
    w: 612,
    h: 977,
    alt: "Jugador de FUA con la equipación universitaria verde",
    className: "hidden md:block left-[-3%] top-[14%] h-[94%] lg:left-[1%]",
  },
  {
    src: "/images/hero/delta-state.png",
    w: 454,
    h: 1027,
    alt: "Jugador de FUA con la equipación de Delta State",
    className: "hidden md:block right-[-2%] top-[13%] h-[96%] lg:right-[2%]",
  },
  // Inner pair in front, lower
  {
    src: "/images/hero/st-johns.png",
    w: 788,
    h: 1022,
    alt: "Jugador de FUA con la equipación de St. John's",
    className: "left-[-38%] top-[34%] h-[66%] sm:left-[-16%] md:left-[11%] md:top-[24%] md:h-[84%] lg:left-[14%]",
  },
  {
    src: "/images/hero/jugador-3.png",
    w: 632,
    h: 1074,
    alt: "Jugador de FUA con la equipación universitaria blanca",
    className: "right-[-30%] top-[32%] h-[68%] sm:right-[-12%] md:right-[12%] md:top-[22%] md:h-[86%] lg:right-[15%]",
  },
];

const HeroSection = () => {
  const { t } = useLanguage();
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#6e0b14] pt-16 md:pt-20">
      {/* Players */}
      <div className="absolute inset-0">
        {PLAYERS.map((p, i) => (
          <Image
            key={p.src}
            src={p.src}
            alt={p.alt}
            width={p.w}
            height={p.h}
            priority={i >= 2}
            sizes="(min-width: 768px) 45vw, 80vw"
            className={`absolute w-auto max-w-none select-none [mask-image:linear-gradient(to_bottom,black_70%,transparent)] ${p.className}`}
            draggable={false}
          />
        ))}
      </div>

      {/* Darken the photos, more in the middle where the text sits */}
      <div className="absolute inset-0 bg-black/30" />
      <div
        className="absolute inset-0"
        style={{ background: "radial-gradient(ellipse 55% 60% at 50% 50%, rgba(0,0,0,0.45), transparent 75%)" }}
      />
      <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/50 to-transparent" />

      {/* Content */}
      <div className="container-wide section-padding relative z-10 text-center">
        <p className="animate-fade-in-up mb-5 font-body text-xs font-semibold uppercase tracking-[0.25em] text-white/80 sm:text-sm">
          FutbolUAgency
        </p>
        <h1
          className="animate-fade-in-up mx-auto max-w-4xl px-2 font-display text-4xl font-bold leading-[1.05] text-white sm:text-6xl md:text-7xl"
          style={{ textShadow: "0 4px 24px rgba(0,0,0,0.45)" }}
        >
          {t("hero.headline")} <span className="italic">{t("hero.headline.highlight")}</span>
        </h1>

        <p
          className="animate-fade-in-up mx-auto mb-8 mt-6 max-w-2xl px-4 font-body text-base leading-relaxed text-white/90 sm:mb-10 sm:text-lg"
          style={{ animationDelay: "0.2s", textShadow: "0 2px 16px rgba(0,0,0,0.6)" }}
        >
          {t("hero.subheadline")}
        </p>

        <div
          className="animate-fade-in-up flex flex-col items-center justify-center gap-3 px-4 sm:flex-row sm:gap-4"
          style={{ animationDelay: "0.4s" }}
        >
          <LocaleLink
            to="/usa"
            className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-white px-8 font-body text-sm font-semibold text-primary shadow-lg transition-transform active:scale-[0.97] sm:w-auto sm:text-base"
          >
            {t("hero.cta.usa")}
            <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5" />
          </LocaleLink>
          <LocaleLink
            to="/apply"
            className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-full border border-white/30 bg-white/10 px-8 font-body text-sm font-semibold text-white backdrop-blur transition-colors hover:bg-white/20 active:scale-[0.97] sm:w-auto sm:text-base"
          >
            {t("hero.cta.apply")}
          </LocaleLink>
        </div>
      </div>
    </section>
  );
};
export default HeroSection;
