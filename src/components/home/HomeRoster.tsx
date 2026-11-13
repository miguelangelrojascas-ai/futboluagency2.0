"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import { cn } from "@/lib/utils";
import SuccessCaseCard, { type SuccessCase } from "@/components/SuccessCaseCard";
import { homeTopRow, homeBottomRow } from "@/data/homeCarousel";

const GalleryRow = ({ cases, reverse = false }: { cases: SuccessCase[]; reverse?: boolean }) => (
  <div className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)]">
    <ul
      className={cn(
        "flex w-max gap-4 py-2 motion-reduce:animate-none sm:gap-6",
        reverse ? "animate-marquee-reverse" : "animate-marquee",
      )}
    >
      {[...cases, ...cases].map((c, i) => (
        <li key={`${c.name}-${i}`} aria-hidden={i >= cases.length || undefined}>
          <SuccessCaseCard {...c} />
        </li>
      ))}
    </ul>
  </div>
);

/** "Del club a la universidad": the commitment graphics. */
const HomeRoster = () => {
  const { language } = useLanguage();
  const es = language === "es";

  return (
      <section className="overflow-hidden bg-white py-20 sm:py-28" aria-labelledby="roster-title">
        <div className="container-wide mb-12 grid gap-6 px-4 sm:mb-16 lg:grid-cols-[1fr_auto] lg:items-end lg:gap-16">
          <div>
            <h2
              id="roster-title"
              className="font-druk uppercase leading-[0.88] text-ink text-[clamp(3.25rem,13vw,8rem)]"
            >
              {es ? "Del club a la" : "From the club to"}
              <span className="block pr-[0.08em] italic text-primary">{es ? "universidad" : "university"}</span>
            </h2>
            <p className="mt-4 font-bebas text-[15px] tracking-[0.26em] text-ink/50 sm:text-base">
              {es ? "Más de 250 casos de éxito" : "Over 250 success stories"}
            </p>
          </div>
          <p className="max-w-sm font-body text-base leading-relaxed text-muted-foreground lg:pb-3">
            {es
              ? "Cada gráfico es un jugador que confió en nosotros y hoy estudia y compite con beca en Estados Unidos."
              : "Every graphic is a player who trusted us and now studies and competes on a scholarship in the United States."}
          </p>
        </div>

        <div className="flex flex-col gap-6 sm:gap-8">
          <GalleryRow cases={homeTopRow} />
          <GalleryRow cases={homeBottomRow} reverse />
        </div>
      </section>
  );
};

export default HomeRoster;
