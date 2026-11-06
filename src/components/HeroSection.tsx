"use client";

import Image from "next/image";
import { ArrowRight } from "lucide-react";
import LocaleLink from "@/components/LocaleLink";
import { useLanguage } from "@/contexts/LanguageContext";

/*
 * FUA players cut out on navy, around the headline (layout taken from
 * eturesports.com). Two rows of three: the back row sits higher and fades out
 * at the thighs, the front row stands on the bottom edge. Heights are capped
 * by the screen width so all six fit on a phone without being cut.
 */
type Player = { src: string; w: number; h: number; alt: string };

const BACK: Player[] = [
  { src: "/images/hero/delta-state.png", w: 454, h: 1027, alt: "Jugador de FUA con la equipación de Delta State" },
  { src: "/images/hero/ines-cardenas.png", w: 624, h: 690, alt: "Inés Cárdenas, jugadora de FUA en St. Thomas More" },
  { src: "/images/hero/jugador-23.png", w: 612, h: 977, alt: "Jugador de FUA con la equipación universitaria verde" },
];

const FRONT: Player[] = [
  { src: "/images/hero/st-johns.png", w: 788, h: 1022, alt: "Jugador de FUA con la equipación de St. John's" },
  { src: "/images/hero/jugador-3.png", w: 632, h: 1074, alt: "Jugador de FUA con la equipación universitaria blanca" },
  { src: "/images/hero/miguel-arnaiz.png", w: 738, h: 1088, alt: "Miguel Arnaiz, jugador de FUA, con la bandera de España" },
];

const Row = ({ players, className, imgClassName, priority }: {
  players: Player[];
  className: string;
  imgClassName: string;
  priority?: boolean;
}) => (
  <div className={`pointer-events-none absolute inset-x-0 flex items-end ${className}`}>
    {players.map((p) => (
      <Image
        key={p.src}
        src={p.src}
        alt={p.alt}
        width={p.w}
        height={p.h}
        priority={priority}
        sizes="(min-width: 768px) 30vw, 45vw"
        draggable={false}
        className={`w-auto max-w-none shrink-0 select-none [&:not(:first-child)]:-ml-[8vw] md:[&:not(:first-child)]:-ml-[2vw] ${imgClassName}`}
      />
    ))}
  </div>
);

const HeroSection = () => {
  const { t } = useLanguage();
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#1C3360] pt-16 md:pt-20">
      <Row
        players={BACK}
        className="top-[9%] justify-center md:top-[10%] md:justify-between md:px-[2%]"
        imgClassName="h-[52vw] opacity-90 [mask-image:linear-gradient(to_bottom,black_65%,transparent)] md:h-[min(62vh,38vw)]"
      />
      <Row
        players={FRONT}
        className="bottom-0 justify-center"
        imgClassName="h-[54vw] md:h-[min(72vh,43vw)]"
        priority
      />

      {/* Darken the photos, more in the middle where the text sits */}
      <div className="absolute inset-0 bg-[#0d1a33]/45" />
      <div
        className="absolute inset-0"
        style={{ background: "radial-gradient(ellipse 55% 55% at 50% 50%, rgba(8,16,34,0.55), transparent 75%)" }}
      />

      {/* Content */}
      <div className="container-wide section-padding relative z-10 text-center">
        <p className="animate-fade-in-up mb-5 font-body text-xs font-semibold uppercase tracking-[0.25em] text-white/80 sm:text-sm">
          FutbolUAgency
        </p>
        <h1
          className="animate-fade-in-up mx-auto max-w-4xl px-2 font-display text-4xl font-bold leading-[1.05] text-white sm:text-6xl md:text-7xl"
          style={{ textShadow: "0 4px 24px rgba(0,0,0,0.5)" }}
        >
          {t("hero.headline")} <span className="italic">{t("hero.headline.highlight")}</span>
        </h1>

        <p
          className="animate-fade-in-up mx-auto mb-8 mt-6 max-w-2xl px-4 font-body text-base leading-relaxed text-white/90 sm:mb-10 sm:text-lg"
          style={{ animationDelay: "0.2s", textShadow: "0 2px 16px rgba(0,0,0,0.7)" }}
        >
          {t("hero.subheadline")}
        </p>

        <div
          className="animate-fade-in-up flex flex-col items-center justify-center gap-3 px-4 sm:flex-row sm:gap-4"
          style={{ animationDelay: "0.4s" }}
        >
          <LocaleLink
            to="/usa"
            className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-primary px-8 font-body text-sm font-semibold text-white shadow-lg transition-colors hover:bg-primary-hover active:scale-[0.97] sm:w-auto sm:text-base"
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
