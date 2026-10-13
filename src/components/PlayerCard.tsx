import { UserRound } from "lucide-react";
import type { Player } from "@/data/players";

type PlayerCardProps = {
  player?: Player;
  /** Label shown inside an empty slot. */
  emptyLabel?: string;
};

/** One footballer in the roster, or an empty slot when no player is given. */
const PlayerCard = ({ player, emptyLabel }: PlayerCardProps) => {
  if (!player) {
    return (
      <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-dashed border-border bg-card/40">
        <div className="grid aspect-[4/5] place-items-center">
          <div className="flex flex-col items-center gap-2 px-4 text-center">
            <span className="grid h-11 w-11 place-items-center rounded-full border border-dashed border-border text-muted-foreground/60">
              <UserRound className="h-5 w-5" strokeWidth={1.75} />
            </span>
            <span className="font-body text-xs font-semibold uppercase tracking-[0.15em] text-muted-foreground/70">
              {emptyLabel}
            </span>
          </div>
        </div>
        <div className="border-t border-dashed border-border px-4 py-3.5">
          <div className="h-3.5 w-2/3 rounded-full bg-muted" />
          <div className="mt-2 h-3 w-1/2 rounded-full bg-muted/70" />
        </div>
      </article>
    );
  }

  return (
    <article className="group/card flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card transition-shadow duration-300 hover:shadow-[0_0_0_1px_hsl(var(--primary)/0.35)]">
      <div className="relative aspect-[4/5] overflow-hidden bg-muted">
        {player.image && (
          <img
            src={player.image}
            alt={`${player.name} — FutbolUAgency`}
            loading="lazy"
            draggable={false}
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover/card:scale-[1.03]"
          />
        )}
        {player.division && (
          <span className="absolute right-3 top-3 rounded-full bg-background/90 px-2.5 py-1 font-body text-[10px] font-bold uppercase tracking-[0.12em] text-primary backdrop-blur-sm">
            {player.division}
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-1 px-4 py-3.5">
        <h3 className="truncate font-display text-base font-bold leading-snug text-foreground">
          {player.name}
        </h3>
        {player.university && (
          <p className="truncate font-body text-[13px] text-muted-foreground">
            {player.university}
          </p>
        )}
      </div>
    </article>
  );
};

export default PlayerCard;
