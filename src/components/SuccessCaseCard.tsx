import { cn } from "@/lib/utils";

export interface SuccessCase {
  image: string;
  name: string;
  university: string;
  division: string;
  origin?: string;
  layout?: "portrait" | "landscape";
}

const SuccessCaseCard = ({ image, name, university, division, origin, layout = "portrait" }: SuccessCase) => {
  const isLandscape = layout === "landscape";

  return (
    <article
      className={cn(
        "group/card flex shrink-0 flex-col gap-2 rounded-2xl bg-muted p-2 shadow-card transition-shadow duration-300 hover:shadow-[0_0_0_1px_hsl(var(--primary)/0.35)] sm:p-2.5",
        isLandscape ? "w-[505px] sm:w-[598px]" : "w-[240px] sm:w-[280px]",
      )}
    >
      <header className="flex flex-col gap-1 px-2 pt-1 font-body text-xs sm:text-sm">
        <div className="flex items-center justify-between gap-3">
          <h3 className="truncate font-body text-sm font-semibold text-secondary sm:text-base">{name}</h3>
          <span className="shrink-0 text-[10px] font-semibold uppercase tracking-[0.15em] text-primary sm:text-xs">
            {division}
          </span>
        </div>
        <div className="flex items-center gap-2 text-muted-foreground">
          <span className="shrink-0">{origin ?? "FUA"}</span>
          <span aria-hidden="true" className="h-px min-w-4 flex-1 bg-muted-foreground/40" />
          <span className="truncate font-medium text-secondary">{university}</span>
        </div>
      </header>

      <div
        className={cn(
          "relative overflow-hidden rounded-xl bg-background",
          isLandscape ? "aspect-[16/9]" : "aspect-[4/5]",
        )}
      >
        <img
          src={image}
          alt={`${name}, ${university}`}
          loading="lazy"
          draggable={false}
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover/card:scale-[1.03]"
        />
      </div>
    </article>
  );
};

export default SuccessCaseCard;
