import { Link } from "react-router-dom";
import { ArrowRight, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

const CALENDLY = "https://calendly.com/futbolu-agency";

type Stat = { value: string; label: string };

interface SportSplitHeroProps {
  sport: string;
  eyebrow: string;
  title: string;
  highlight: string;
  subtitle: string;
  image: string;
  imageAlt: string;
  floatingStat: Stat;
  stats: Stat[];
}

const SportSplitHero = ({
  sport,
  eyebrow,
  title,
  highlight,
  subtitle,
  image,
  imageAlt,
  floatingStat,
  stats,
}: SportSplitHeroProps) => {
  const { language } = useLanguage();
  const es = language === "es";

  return (
    <section className="bg-background px-4 pb-16 pt-28 md:pb-24 md:pt-36">
      <div className="container-wide mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <div className="flex flex-col">
          <nav aria-label={es ? "Ruta de navegación" : "Breadcrumb"} className="mb-8">
            <ol className="flex items-center gap-2 font-body text-sm text-muted-foreground">
              <li>
                <Link to="/sports" className="transition-colors hover:text-primary">
                  FUA Sports
                </Link>
              </li>
              <li aria-hidden="true">
                <ChevronRight className="h-4 w-4" />
              </li>
              <li aria-current="page" className="font-medium text-foreground">
                {sport}
              </li>
            </ol>
          </nav>

          <p className="mb-4 font-body text-xs font-semibold uppercase tracking-[0.2em] text-primary">{eyebrow}</p>
          <h1 className="mb-6 text-balance font-display text-4xl font-bold leading-[1.05] sm:text-5xl lg:text-6xl">
            {title} <span className="italic text-primary">{highlight}</span>
          </h1>
          <p className="mb-10 max-w-xl text-pretty font-body text-lg leading-relaxed text-muted-foreground">
            {subtitle}
          </p>

          <div className="mb-12 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg" className="gap-2">
              <a href={CALENDLY} target="_blank" rel="noopener noreferrer">
                {es ? "Evaluación gratuita" : "Free evaluation"}
                <ArrowRight className="h-4 w-4" />
              </a>
            </Button>
            <Button asChild size="lg" variant="outline">
              <a href="#benchmarks">{es ? "¿Tengo nivel?" : "Do I qualify?"}</a>
            </Button>
          </div>

          <dl className="grid grid-cols-3 divide-x divide-border border-t border-border pt-6">
            {stats.map((s) => (
              <div key={s.label} className="flex flex-col gap-1 px-4 first:pl-0">
                <dt className="order-2 font-body text-xs uppercase tracking-wider text-muted-foreground">{s.label}</dt>
                <dd className="order-1 font-display text-xl font-bold text-foreground sm:text-2xl">{s.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="relative">
          <div className="aspect-[4/5] overflow-hidden lg:aspect-auto lg:h-[560px] rounded-3xl bg-muted shadow-2xl">
            <img src={image} alt={imageAlt} className="h-full w-full object-cover" fetchPriority="high" />
          </div>
          <div className="absolute -bottom-6 left-4 flex flex-col gap-1 rounded-2xl border border-border bg-card px-6 py-5 shadow-xl sm:-left-8">
            <span className="font-display text-3xl font-bold text-primary">{floatingStat.value}</span>
            <span className="font-body text-xs uppercase tracking-wider text-muted-foreground">
              {floatingStat.label}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SportSplitHero;
