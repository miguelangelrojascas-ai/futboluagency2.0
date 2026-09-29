import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

export interface SportRoute {
  name: string;
  path: string;
  image: string;
  imageAlt: string;
  divisions: string;
  keyMetric: string;
  facts: { value: string; label: string }[];
  cta: string;
}

const SportRouteCard = ({ name, path, image, imageAlt, divisions, keyMetric, facts, cta }: SportRoute) => (
  <Link
    to={path}
    className="group relative flex aspect-[3/4] flex-col justify-between overflow-hidden rounded-3xl bg-foreground p-5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
  >
    <img
      src={image}
      alt={imageAlt}
      loading="lazy"
      className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
    />
    <div
      aria-hidden="true"
      className="absolute inset-0 bg-gradient-to-t from-foreground via-foreground/40 to-transparent"
    />

    <div className="relative flex items-start justify-between gap-3">
      <span className="rounded-full bg-background/90 px-3 py-1 font-body text-[11px] font-semibold uppercase tracking-wider text-foreground backdrop-blur">
        {divisions}
      </span>
      <span
        aria-hidden="true"
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-background text-foreground transition-colors duration-300 group-hover:bg-primary group-hover:text-primary-foreground"
      >
        <ArrowUpRight className="h-5 w-5" />
      </span>
    </div>

    <div className="relative flex flex-col gap-4">
      <div>
        <p className="mb-1 font-body text-xs font-semibold uppercase tracking-[0.2em] text-background/70">
          {keyMetric}
        </p>
        <h3 className="font-display text-3xl font-bold text-background">{name}</h3>
      </div>
      <dl className="grid grid-cols-2 gap-3 border-t border-background/20 pt-4">
        {facts.map((f) => (
          <div key={f.label} className="flex flex-col">
            <dt className="order-2 font-body text-[11px] uppercase tracking-wider text-background/60">{f.label}</dt>
            <dd className="order-1 font-display text-lg font-bold text-background">{f.value}</dd>
          </div>
        ))}
      </dl>
      <span className="sr-only">{cta}</span>
    </div>
  </Link>
);

export default SportRouteCard;
