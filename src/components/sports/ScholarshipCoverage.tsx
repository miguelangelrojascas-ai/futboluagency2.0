import type { LucideIcon } from "lucide-react";
import { Check } from "lucide-react";

type CoverageCard = { icon: LucideIcon; title: string; desc: string; items: string[] };

interface ScholarshipCoverageProps {
  eyebrow: string;
  title: string;
  highlight: string;
  cards: CoverageCard[];
}

const ScholarshipCoverage = ({ eyebrow, title, highlight, cards }: ScholarshipCoverageProps) => (
  <section className="section-alt px-4 py-24 md:py-28">
    <div className="container-wide mx-auto max-w-6xl">
      <header className="mx-auto mb-14 flex max-w-2xl flex-col items-center text-center">
        <p className="mb-4 font-body text-xs font-semibold uppercase tracking-[0.2em] text-primary">{eyebrow}</p>
        <h2 className="text-balance font-display text-4xl font-bold leading-tight sm:text-5xl">
          {title} <span className="italic text-primary">{highlight}</span>
        </h2>
      </header>

      <div className="grid gap-6 md:grid-cols-3">
        {cards.map((card, i) => {
          const Icon = card.icon;
          return (
            <article
              key={card.title}
              className="premium-card group flex min-h-[26rem] flex-col p-8 md:p-10"
            >
              <div className="mb-8 flex items-start justify-between">
                <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <Icon className="h-6 w-6" aria-hidden="true" />
                </span>
                <span className="font-display text-5xl font-bold italic leading-none text-border" aria-hidden="true">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
              <h3 className="mb-3 font-display text-2xl font-bold">{card.title}</h3>
              <p className="mb-6 font-body leading-relaxed text-muted-foreground">{card.desc}</p>
              <ul className="mt-auto flex flex-col gap-3 border-t border-border pt-6">
                {card.items.map((item) => (
                  <li key={item} className="flex gap-3 font-body text-foreground">
                    <Check className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </article>
          );
        })}
      </div>
    </div>
  </section>
);

export default ScholarshipCoverage;
