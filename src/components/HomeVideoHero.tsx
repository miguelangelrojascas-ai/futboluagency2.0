"use client";

import { ArrowRight } from "lucide-react";
import LocaleLink from "@/components/LocaleLink";
import ScrollLockedVideoHero from "@/components/ui/scroll-locked-video-hero";
import { useLanguage } from "@/contexts/LanguageContext";

/**
 * Home header that scrubs a video with the scroll: out of the tunnel, onto
 * the pitch, up to the lit stands.
 *
 * The clip is encoded without audio and with a keyframe every 4 frames so
 * seeking back and forth stays smooth. The previous header is still in
 * HeroSection.tsx; switching back is a one-line change in views/Index.tsx.
 */
const VIDEO_SRC = "/videos/hero-estadio.mp4";
const POSTER = "/videos/hero-estadio-poster.jpg";

const HomeVideoHero = () => {
  const { t, language } = useLanguage();
  const es = language === "es";

  return (
    <ScrollLockedVideoHero
      videoSrc={VIDEO_SRC}
      poster={POSTER}
      scrollHint={es ? "DESLIZA" : "SCROLL"}
      skipLabel={es ? "Saltar intro" : "Skip intro"}
      title={
        <>
          {t("hero.headline")} <span className="italic text-[#e0293a]">{t("hero.headline.highlight")}</span>
        </>
      }
      tagline={t("hero.subheadline")}
      actions={
        <div className="flex w-full flex-col items-center justify-center gap-3 sm:w-auto sm:flex-row sm:gap-4">
          <LocaleLink
            to="/usa"
            className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-primary px-8 font-body text-sm font-semibold text-primary-foreground shadow-lg transition-colors hover:bg-primary-hover sm:w-auto sm:text-base"
          >
            {t("hero.cta.usa")}
            <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5" />
          </LocaleLink>
          <LocaleLink
            to="/apply"
            className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-lg border border-white/40 px-8 font-body text-sm font-semibold text-white transition-colors hover:bg-white/10 sm:w-auto sm:text-base"
          >
            {t("hero.cta.apply")}
          </LocaleLink>
        </div>
      }
    />
  );
};

export default HomeVideoHero;
