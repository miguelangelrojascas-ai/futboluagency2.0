"use client";

import { ArrowRight } from "lucide-react";
import LocaleLink from "@/components/LocaleLink";
import ScrollLockedVideoHero from "@/components/ui/scroll-locked-video-hero";
import { useLanguage } from "@/contexts/LanguageContext";

/**
 * PRUEBA: home header that scrubs a video with the scroll.
 *
 * The video is the component's own demo clip, hosted on 21st.dev, until FUA
 * picks its own (a tunnel-to-pitch walk-out). Swap VIDEO_SRC for a file in
 * /public/videos, encoded without audio. The previous header is still in
 * HeroSection.tsx; switching back is a one-line change in views/Index.tsx.
 */
const VIDEO_SRC =
  "https://cdn.21st.dev/assets/mirror/21/21a77eac28eacbb7e142016eefeaa0b4a766619e51113629a3bc6df6af066c0f.mp4";

const HomeVideoHero = () => {
  const { t, language } = useLanguage();
  const es = language === "es";

  return (
    <ScrollLockedVideoHero
      videoSrc={VIDEO_SRC}
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
