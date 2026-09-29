import { useLanguage } from "@/contexts/LanguageContext";
import { cn } from "@/lib/utils";
import SuccessCaseCard, { type SuccessCase } from "@/components/SuccessCaseCard";
import successZak from "@/assets/success-zak.jpg";
import successVictor from "@/assets/success-victor.jpg";
import successBentchey from "@/assets/success-bentchey.jpg";
import successEduardo from "@/assets/success-eduardo.jpg";
import successPablo from "@/assets/success-pablo.jpg";
import successMiguel from "@/assets/success-miguel.jpg";
import successChase from "@/assets/success-chase.jpg";
import successDaniel from "@/assets/success-daniel.jpg";
import successOmar from "@/assets/success-omar.png";
import committedAnder from "@/assets/committed-ander.png";
import committedIvan from "@/assets/committed-ivan.png";
import committedSimone from "@/assets/committed-simone.png";
import committedFrancisco from "@/assets/committed-francisco.png";
import committedJuan from "@/assets/committed-juan.png";
import committedJose from "@/assets/committed-jose.png";

const topRow: SuccessCase[] = [
  { image: successOmar, name: "Omar Ocampos", origin: "Club América", university: "Cowley College", division: "NJCAA", layout: "landscape" },
  { image: committedAnder, name: "Ander González", university: "St. John's University", division: "NCAA D1" },
  { image: successZak, name: "Zak McGall", university: "Seward County CC", division: "NJCAA" },
  { image: committedIvan, name: "Iván Gómez Sumillera", university: "Delta State University", division: "NCAA D2" },
  { image: successVictor, name: "Victor Paz", university: "Illinois Central College", division: "NJCAA" },
  { image: committedSimone, name: "Simone Pitale", university: "Monroe University", division: "NJCAA" },
  { image: successEduardo, name: "Eduardo Larsen", university: "Beloit College", division: "NCAA D3" },
];

const bottomRow: SuccessCase[] = [
  { image: committedJose, name: "Jose Contreras", university: "University of West Florida", division: "NCAA D2" },
  { image: successBentchey, name: "Bentchey Dominguez", university: "East Mississippi CC", division: "NJCAA" },
  { image: committedFrancisco, name: "Francisco Giraldo", university: "Regis University", division: "NCAA D2" },
  { image: successPablo, name: "Pablo Exposito", university: "Crowder College", division: "NJCAA" },
  { image: committedJuan, name: "Juan Argüelles", university: "Prairie State College", division: "NJCAA" },
  { image: successMiguel, name: "Miguel Arnaiz", university: "NIACC", division: "NJCAA" },
  { image: successChase, name: "Chase Nasir", university: "Lake Erie College", division: "NCAA D2" },
  { image: successDaniel, name: "Daniel Abreu", university: "East Mississippi CC", division: "NJCAA" },
];

const GalleryRow = ({ cases, reverse = false }: { cases: SuccessCase[]; reverse?: boolean }) => (
  <div className="group/row relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)]">
    <ul
      className={cn(
        "flex w-max gap-4 py-2 group-hover/row:[animation-play-state:paused] motion-reduce:animate-none sm:gap-6",
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
    </section>
  );
};

export default SuccessCasesSection;
