"use client";

import Image from "next/image";
import { ArrowRight } from "lucide-react";
import LocaleLink from "@/components/LocaleLink";
import { useLanguage } from "@/contexts/LanguageContext";
/** FUA players framing an empty middle (1920×945). */
const HERO_IMAGE = "/images/hero/header-jugadores.png";

const HeroSection = () => {
  const { t } = useLanguage();
  return (
    <section
      className="relative flex flex-col overflow-hidden pt-16 md:pt-20 lg:min-h-screen"
      /* Same navy and maroon as the edges of the header artwork, so the text area
         on small screens blends into the image below it. */
      style={{ background: "radial-gradient(ellipse 70% 60% at 50% 0%, #2a1626 0%, #10182b 70%), #10182b" }}
    >
      {/* Large screens: the artwork fills the header, players framing the text. */}
      <div className="absolute inset-0 hidden lg:block">
        <Image src={HERO_IMAGE} alt="" fill priority sizes="100vw" className="object-cover object-bottom" />
        {/* Keeps the headline readable over the players in the middle. */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 36% 46% at 50% 40%, rgba(10,12,26,0.94) 0%, rgba(10,12,26,0.8) 45%, rgba(10,12,26,0.35) 75%, transparent 100%), linear-gradient(to bottom, rgba(16,24,43,0.5), transparent 30%)",
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 container-wide px-4 pt-10 text-center sm:pt-14 lg:pt-[14vh]">
        {/* Main Headline */}
        <h1
          className="mx-auto max-w-3xl font-display text-4xl sm:text-5xl md:text-6xl font-bold leading-tight mb-4 sm:mb-6 animate-fade-in-up px-2 text-white"
          style={{ textShadow: "0 2px 16px rgba(0,0,0,0.9)" }}
        >
          {t("hero.headline")}{" "}
          <span className="italic text-red-500">{t("hero.headline.highlight")}</span>
        </h1>

        {/* Subheadline */}
        <p
          className="font-body text-white text-lg max-w-2xl mx-auto mb-8 sm:mb-10 animate-fade-in-up px-4 leading-relaxed"
          style={{ animationDelay: "0.2s", fontWeight: 500, textShadow: "0 2px 16px rgba(0,0,0,0.9)" }}
        >
          {t("hero.subheadline")}
        </p>

        {/* CTA Buttons */}
        <div className="animate-fade-in-up px-4 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4" style={{ animationDelay: "0.4s" }}>
          <LocaleLink
            to="/usa"
            className="inline-flex items-center justify-center gap-2 w-full sm:w-auto h-12 px-8 text-sm sm:text-base font-semibold font-body rounded-lg bg-primary text-primary-foreground shadow-lg active:scale-[0.97]"
            style={{ transition: "transform 160ms cubic-bezier(0.23,1,0.32,1), box-shadow 160ms ease-out, background-color 150ms ease-out" }}
          >
            {t("hero.cta.usa")}
            <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5" />
          </LocaleLink>
          <LocaleLink
            to="/apply"
            className="inline-flex items-center justify-center gap-2 w-full sm:w-auto h-12 px-8 text-sm sm:text-base font-semibold font-body rounded-lg border border-white/40 text-white hover:bg-white/10 active:scale-[0.97]"
            style={{ transition: "transform 160ms cubic-bezier(0.23,1,0.32,1), background-color 150ms ease-out" }}
          >
            {t("hero.cta.apply")}
          </LocaleLink>
        </div>
      </div>

      {/* Phones and tablets: the whole artwork below the text. A portrait crop
          would cut through the middle of both groups of players. */}
      <div className="relative mt-8 aspect-[1920/945] w-full sm:mt-10 lg:hidden">
        <Image src={HERO_IMAGE} alt="" fill priority sizes="100vw" className="object-cover" />
      </div>

      {/* Fade into the white page below. */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-8 sm:h-14 lg:h-28" style={{ background: "linear-gradient(to bottom, transparent, #ffffff)" }} />

      {/* Scroll indicator, large screens only */}
      <div className="absolute bottom-8 left-1/2 z-20 -translate-x-1/2 animate-float hidden lg:block">
        <div className="w-6 h-10 border-2 border-muted-foreground/30 rounded-full flex items-start justify-center p-2">
          <div className="w-1 h-2 bg-primary rounded-full animate-bounce" />
        </div>
      </div>
    </section>
  );
};
export default HeroSection;