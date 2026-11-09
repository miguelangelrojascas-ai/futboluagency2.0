"use client";

import Image from "next/image";
import LocaleLink from "@/components/LocaleLink";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import type { Player } from "@/data/players";

/** One committed footballer. The graphic already carries name, school and division. */
const PlayerCard = ({ player }: { player: Player }) => {
  const { language } = useLanguage();
  const es = language === "es";

  const card = (
    <article className="group/card overflow-hidden rounded-2xl border border-border bg-card transition-shadow duration-300 hover:shadow-[0_0_0_1px_hsl(var(--primary)/0.35)]">
      <div className="relative aspect-[3/2] overflow-hidden bg-muted">
        <Image
          src={player.image}
          alt={`${player.name} — ${player.university} (${player.division})`}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          draggable={false}
          className="object-cover transition-transform duration-700 ease-out group-hover/card:scale-[1.02]"
        />
      </div>
      {player.story && (
        <p className="flex items-center gap-1 border-t border-border px-4 py-3 font-body text-[13px] font-bold text-primary">
          {es ? "Conoce su historia" : "Read his story"}
          <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover/card:translate-x-0.5" />
        </p>
      )}
    </article>
  );

  if (!player.story) return card;

  return (
    <LocaleLink
      to={`/players/${player.story}`}
      className="block rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
      aria-label={es ? `Conoce la historia de ${player.name}` : `Read ${player.name}'s story`}
    >
      {card}
    </LocaleLink>
  );
};

export default PlayerCard;
