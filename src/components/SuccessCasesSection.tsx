import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { cn } from "@/lib/utils";
import SuccessCaseCard, { type SuccessCase } from "@/components/SuccessCaseCard";
import { topRow, bottomRow } from "@/data/successCases";

const GalleryRow = ({ cases, reverse = false }: { cases: SuccessCase[]; reverse?: boolean }) => (
  <div className="group/row relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)]">
    <ul
      className={cn(
        "flex w-max gap-4 py-2 motion-reduce:animate-none sm:gap-6",
        reverse ? "animate-marquee-reverse" : "animate-marquee",
      )}
    >
      {[...cases, ...cases].map((successCase, index) => (
        <li key={`${successCase.name}-${index}`} aria-hidden={index >= cases.length || undefined}>
          <SuccessCaseCard {...successCase} />
        </li>
      ))}
    </ul>
  </div>
);

const SuccessCasesSection = () => {
  const { language } = useLanguage();
  const es = language === "es";

  return (
    <section className="section-padding overflow-hidden bg-background" aria-labelledby="success-cases-title">
      <div className="container-wide px-4">
        <div className="mx-auto mb-10 flex max-w-2xl flex-col items-center gap-3 text-center sm:mb-14">
          <span className="font-body text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            {es ? "Más de 250 casos de éxito" : "Over 250 success stories"}
          </span>
          <h2 id="success-cases-title" className="text-balance font-display text-3xl font-bold sm:text-4xl md:text-5xl">
            {es ? "Del club a la" : "From the club to"}{" "}
            <span className="text-primary italic">{es ? "universidad" : "university"}</span>
          </h2>
          <p className="text-pretty font-body text-base text-muted-foreground sm:text-lg">
            {es
              ? "Algunos de los deportistas que ya compiten y estudian en Estados Unidos gracias a trabajar juntos."
              : "Some of the athletes already competing and studying in the United States after working with us."}
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-6 sm:gap-8">
        <GalleryRow cases={topRow} />
        <GalleryRow cases={bottomRow} reverse />
      </div>

      <div className="container-wide px-4">
        <div className="mt-10 flex justify-center sm:mt-12">
          <Link
            to="/players"
            className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-6 py-3.5 font-body font-semibold text-foreground transition-colors hover:border-primary/40 hover:text-primary"
          >
            {es ? "Ver todos los jugadores" : "See all players"}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default SuccessCasesSection;
