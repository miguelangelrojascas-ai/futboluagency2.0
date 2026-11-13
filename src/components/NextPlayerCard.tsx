"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";
import LocaleLink from "@/components/LocaleLink";
import { useLanguage } from "@/contexts/LanguageContext";

/** Grey footballer silhouette, standing with a ball at his feet. */
const Silhouette = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 200 320" className={className} aria-hidden="true">
    <defs>
      <linearGradient id="np-grey" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#9aa0ac" />
        <stop offset="1" stopColor="#757b88" />
      </linearGradient>
    </defs>
    <ellipse cx="104" cy="306" rx="62" ry="7" fill="#000" opacity="0.08" />
    <g fill="url(#np-grey)">
      <ellipse cx="100" cy="38" rx="19" ry="23" />
      <path d="M89 58c0 7-2 11-9 13-14 4-24 8-28 20l-10 58c-2 8 4 12 8 6l12-46 2 42c0 12-4 22-6 32l-4 36 38 2 6-20h4l6 20 38-2-4-36c-2-10-6-20-6-32l2-42 12 46c4 6 10 2 8-6l-10-58c-4-12-14-16-28-20-7-2-9-6-9-13z" />
      <path d="M62 216l28 2-4 74 3 9-23 1 2-10zM110 218l28-2-6 76 2 10-23-1 3-9z" />
    </g>
    <circle cx="156" cy="292" r="13" fill="#c3c7cf" />
    <path d="M150 286l6 4 6-4M156 290v8" stroke="#a9aeb8" strokeWidth="1.5" fill="none" />
  </svg>
);

/**
 * Empty commitment graphic at the end of the roster: same layout as the real
 * ones, but with a silhouette and no school, inviting the visitor to be next.
 * Typing a name fills it in.
 */
const NextPlayerCard = () => {
  const { language } = useLanguage();
  const es = language === "es";
  const [name, setName] = useState("");

  const words = (name.trim() || (es ? "Tu nombre" : "Your name")).toUpperCase().split(/\s+/);
  const first = words[0];
  const rest = words.slice(1).join(" ");

  return (
    <article className="overflow-hidden rounded-2xl border border-dashed border-primary/40 bg-card">
      <div
        className="relative aspect-[3/2] overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, #2563eb 0 6%, transparent 6% 94%, #2563eb 94%), linear-gradient(#f4f5f7, #e7e9ee)",
        }}
      >
        <Silhouette className="absolute bottom-[22%] right-[8%] h-[72%] w-auto" />
        <p className="absolute left-[7%] top-[36%] max-w-[60%] font-body text-[clamp(1.1rem,4.2vw,1.9rem)] font-black leading-[0.95] tracking-tight sm:text-[clamp(1rem,2.2vw,1.6rem)] lg:text-[clamp(1rem,1.7vw,1.6rem)]">
          <span className="text-neutral-900">{first}</span>
          {rest && <span className="text-red-600"> {rest}</span>}
        </p>
        <div className="absolute inset-x-[5%] bottom-[7%] flex h-[17%] items-center gap-3 border-y-2 border-[#2563eb] bg-white/85 px-3">
          <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full border-2 border-dashed border-neutral-400 font-body text-sm font-bold text-neutral-400">
            ?
          </span>
          <span className="font-body text-[11px] font-bold uppercase tracking-[0.12em] text-neutral-400 sm:text-xs">
            {es ? "Tu universidad en EE.UU." : "Your U.S. university"}
          </span>
        </div>
      </div>

      <div className="flex flex-col gap-3 border-t border-dashed border-primary/30 p-4">
        <label className="font-body text-[13px] font-semibold text-foreground" htmlFor="next-player-name">
          {es ? "¿Y si el siguiente eres tú?" : "What if you're next?"}
        </label>
        <input
          id="next-player-name"
          value={name}
          onChange={(e) => setName(e.target.value.slice(0, 28))}
          placeholder={es ? "Escribe tu nombre" : "Type your name"}
          autoComplete="name"
          className="w-full rounded-full border border-border bg-background px-4 py-2.5 font-body text-[16px] text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary sm:text-sm"
        />
        <LocaleLink
          to="/apply"
          className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-5 py-2.5 font-body text-sm font-semibold text-white transition-colors hover:bg-primary-hover"
        >
          {es ? "Quiero ser parte de FUA" : "I want to join FUA"}
          <ArrowRight className="h-4 w-4" />
        </LocaleLink>
      </div>
    </article>
  );
};

export default NextPlayerCard;
