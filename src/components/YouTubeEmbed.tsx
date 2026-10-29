"use client";

import { useState } from "react";
import { Play } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

type YouTubeEmbedProps = {
  id: string;
  title: string;
  className?: string;
};

/**
 * Click-to-load YouTube player.
 *
 * Nothing is requested from YouTube until the visitor presses play, and the
 * iframe uses youtube-nocookie.com. Until then we show YouTube's thumbnail,
 * which comes from a domain that sets no cookies.
 */
const YouTubeEmbed = ({ id, title, className }: YouTubeEmbedProps) => {
  const [playing, setPlaying] = useState(false);
  const { language } = useLanguage();
  const es = language === "es";

  if (playing) {
    return (
      <iframe
        src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1`}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className={className}
      />
    );
  }

  return (
    <button
      type="button"
      onClick={() => setPlaying(true)}
      className={`group/play relative block h-full w-full ${className ?? ""}`}
      aria-label={es ? `Reproducir: ${title}` : `Play: ${title}`}
    >
      <img
        src={`https://i.ytimg.com/vi/${id}/maxresdefault.jpg`}
        alt=""
        aria-hidden="true"
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <span aria-hidden="true" className="absolute inset-0 bg-black/30 transition-colors group-hover/play:bg-black/20" />
      <span className="absolute inset-0 grid place-items-center">
        <span className="grid h-16 w-16 place-items-center rounded-full bg-primary text-primary-foreground shadow-lg transition-transform duration-300 group-hover/play:scale-110">
          <Play className="ml-0.5 h-7 w-7 fill-current" />
        </span>
      </span>
    </button>
  );
};

export default YouTubeEmbed;
