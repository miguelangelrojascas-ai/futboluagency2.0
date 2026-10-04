import type { CSSProperties } from "react";
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
  logo?: string;
}

const delay = (ms: number): CSSProperties => ({ animationDelay: `${ms}ms` });

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
  logo,
}: SportSplitHeroProps) => {
  const { language } = useLanguage();
  const es = language === "es";

  return (
    <section className="relative overflow-hidden bg-background px-4 pb-16 pt-28 md:pb-24 md:pt-36">
      <div
        aria-hidden="true"
        className="hero-float pointer-events-none absolute -right-32 top-10 h-[28rem] w-[28rem] rounded-full bg-primary/5 blur-3xl"
      />
      {logo && (
        <div className="hero-reveal relative mb-10 flex justify-center md:mb-14" style={delay(0)}>
          <div className="flex h-28 w-28 items-center justify-center overflow-hidden rounded-2xl border border-border bg-white p-2 shadow-xl sm:h-36 sm:w-36">
            <img src={logo} alt={`FUA ${sport}`} className="h-full w-full object-contain" />
          </div>
        </div>
      )}
      <div className="container-wide relative mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <div className="flex flex-col">
          <nav aria-label={es ? "Ruta de navegación" : "Breadcrumb"} className="hero-reveal mb-8" style={delay(0)}>
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

          <p
            className="hero-reveal mb-4 flex items-center gap-3 font-body text-xs font-semibold uppercase tracking-[0.2em] text-primary"
            style={delay(100)}
          >
            <span aria-hidden="true" className="h-px w-8 bg-primary" />
            {eyebrow}
          </p>
          <h1
            className="hero-reveal mb-6 text-balance font-display text-4xl font-bold leading-[1.05] sm:text-5xl lg:text-6xl"
            style={delay(200)}
          >
            {title} <span className="italic text-primary">{highlight}</span>
          </h1>
          <p
            className="hero-reveal mb-10 max-w-xl text-pretty font-body text-lg leading-relaxed text-muted-foreground"
            style={delay(320)}
          >
            {subtitle}
          </p>

          <div className="hero-reveal mb-12 flex" style={delay(440)}>
            <Button asChild size="lg" className="group gap-2">
              <a href={CALENDLY} target="_blank" rel="noopener noreferrer">
                {es ? "Evaluación gratuita" : "Free evaluation"}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
            </Button>
          </div>

          <dl className="grid grid-cols-3 divide-x divide-border border-t border-border pt-6">
            {stats.map((s, i) => (
              <div key={s.label} className="hero-reveal flex flex-col gap-1 px-4 first:pl-0" style={delay(560 + i * 90)}>
                <dt className="order-2 font-body text-xs uppercase tracking-wider text-muted-foreground">{s.label}</dt>
                <dd className="order-1 font-display text-xl font-bold text-foreground sm:text-2xl">{s.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="relative">
          <div className="hero-image-reveal aspect-[4/5] overflow-hidden rounded-3xl bg-muted shadow-2xl lg:aspect-auto lg:h-[560px]">
            <img src={image} alt={imageAlt} className="hero-ken-burns h-full w-full object-cover" fetchPriority="high" />
          </div>
          <div className="hero-reveal absolute -bottom-6 left-4 sm:-left-8" style={delay(700)}>
            <div className="hero-float flex flex-col gap-1 rounded-2xl border border-border bg-card px-6 py-5 shadow-xl">
              <span className="font-display text-3xl font-bold text-primary">{floatingStat.value}</span>
              <span className="font-body text-xs uppercase tracking-wider text-muted-foreground">
                {floatingStat.label}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SportSplitHero;
