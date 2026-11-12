"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import YouTubeEmbed from "@/components/YouTubeEmbed";

/** The explainer video on black, no buttons around it. */
const HomeVideo = () => {
  const { language } = useLanguage();
  const es = language === "es";

  return (
    <section id="video-section" className="bg-ink py-20 text-white sm:py-28">
      <div className="container-wide px-4">
        <p className="font-bebas text-[15px] tracking-[0.3em] text-white/55 sm:text-base">
          {es ? "Conócenos" : "Meet us"}
        </p>
        <h2 className="mt-3 font-druk text-white uppercase leading-[0.88] text-[clamp(3.25rem,13vw,7rem)]">
          {es ? "Mira cómo" : "See how"}
          <span className="block pr-[0.08em] italic text-red-bright">{es ? "trabajamos" : "we work"}</span>
        </h2>
        <div className="relative mt-10 aspect-video overflow-hidden rounded-lg border border-white/10 bg-black sm:mt-14">
          <YouTubeEmbed id="0-dWsUxiYkI" title="FutbolUAgency LLC. - Video explicativo" className="absolute inset-0 h-full w-full" />
        </div>
      </div>
    </section>
  );
};

export default HomeVideo;
