"use client";

import Image, { type StaticImageData } from "next/image";
import { ArrowUpRight } from "lucide-react";
import LocaleLink from "@/components/LocaleLink";
import { useLanguage } from "@/contexts/LanguageContext";
import { pick, type Copy } from "@/lib/i18n";
import usaPhoto from "@/assets/usa-exp-soccer.jpg";
import spainPhoto from "@/assets/spain-clubs/talavera.jpg";

type Path = {
  to: string;
  photo: StaticImageData;
  position: string;
  title: Copy;
  label: Copy;
  body: Copy;
  points: Copy<string[]>;
  link: Copy;
};

const PATHS: Path[] = [
  {
    to: "/usa",
    photo: usaPhoto,
    position: "50% 35%",
    title: { es: "Becas en EE.UU.", en: "Scholarships in the USA", it: "Borse di studio negli USA", de: "Stipendien in den USA" },
    label: { es: "NCAA · NAIA · NJCAA", en: "NCAA · NAIA · NJCAA", it: "NCAA · NAIA · NJCAA", de: "NCAA · NAIA · NJCAA" },
    body: {
      es: "Compites en el fútbol universitario mientras estudias una carrera, con una beca que reduce el coste de los cuatro años.",
      en: "You compete in college soccer while you earn a degree, on a scholarship that cuts the cost of all four years.",
      it: "Giochi nel calcio universitario mentre ti laurei, con una borsa di studio che riduce il costo dei quattro anni.",
      de: "Du spielst College-Fußball und studierst gleichzeitig, mit einem Stipendium, das die Kosten der vier Jahre senkt.",
    },
    points: {
      es: ["Evaluación y plan de reclutamiento", "Contacto con entrenadores universitarios", "Visado, admisión y llegada al campus"],
      en: ["Evaluation and recruiting plan", "Contact with college coaches", "Visa, admission and arrival on campus"],
      it: ["Valutazione e piano di reclutamento", "Contatto con gli allenatori universitari", "Visto, ammissione e arrivo al campus"],
      de: ["Bewertung und Rekrutierungsplan", "Kontakt zu College-Trainern", "Visum, Zulassung und Ankunft auf dem Campus"],
    },
    link: { es: "Ver becas en EE.UU.", en: "See USA scholarships", it: "Scopri le borse negli USA", de: "USA-Stipendien ansehen" },
  },
  {
    to: "/spain",
    photo: spainPhoto,
    position: "50% 60%",
    title: { es: "Proyección en España", en: "Development in Spain", it: "Crescita in Spagna", de: "Entwicklung in Spanien" },
    label: { es: "España · Portugal", en: "Spain · Portugal", it: "Spagna · Portogallo", de: "Spanien · Portugal" },
    body: {
      es: "Entrenas y compites en clubes de España y Portugal durante una temporada completa, con metodología española y visibilidad ante ojeadores.",
      en: "You train and compete with clubs in Spain and Portugal for a full season, with Spanish coaching methods and exposure to scouts.",
      it: "Ti alleni e giochi con club in Spagna e Portogallo per un'intera stagione, con metodologia spagnola e visibilità davanti agli osservatori.",
      de: "Du trainierst und spielst eine ganze Saison bei Vereinen in Spanien und Portugal, mit spanischer Trainingsmethodik und Sichtbarkeit bei Scouts.",
    },
    points: {
      es: ["CF Talavera, C.E. Sabadell, Sport Extremadura, OS Marialvas", "Temporada oficial completa", "Alojamiento, seguro y logística"],
      en: ["CF Talavera, C.E. Sabadell, Sport Extremadura, OS Marialvas", "A full official season", "Housing, insurance and logistics"],
      it: ["CF Talavera, C.E. Sabadell, Sport Extremadura, OS Marialvas", "Una stagione ufficiale completa", "Alloggio, assicurazione e logistica"],
      de: ["CF Talavera, C.E. Sabadell, Sport Extremadura, OS Marialvas", "Eine komplette offizielle Saison", "Unterkunft, Versicherung und Logistik"],
    },
    link: { es: "Ver el programa en España", en: "See the Spain programme", it: "Scopri il programma in Spagna", de: "Spanien-Programm ansehen" },
  },
];

/**
 * "Dos caminos de élite": the agency's two routes, as two full-height photo
 * cards. Each one opens its own page; the step-by-step method lives on the
 * USA page.
 */
const HomePaths = () => {
  const { language } = useLanguage();

  return (
    <section className="bg-[#f3f1ec] py-24 sm:py-32" aria-labelledby="paths-title">
      <div className="container-wide px-4">
        <div className="mb-12 grid gap-6 sm:mb-16 lg:grid-cols-[1fr_auto] lg:items-end lg:gap-16">
          <div>
            <h2 id="paths-title" className="leading-[0.9] text-ink text-[clamp(3.25rem,12vw,7.5rem)]">
              {pick(language, { es: "Dos caminos", en: "Two elite", it: "Due strade", de: "Zwei Wege" })}
              <span className="block pr-[0.08em] italic text-primary">
                {pick(language, { es: "de élite", en: "paths", it: "d'élite", de: "an die Spitze" })}
              </span>
            </h2>
            <p className="label-bebas mt-4 text-[15px] text-ink/50 sm:text-base">
              {pick(language, {
                es: "Estados Unidos o España. Un mismo agente.",
                en: "The United States or Spain. The same agent.",
                it: "Stati Uniti o Spagna. Lo stesso agente.",
                de: "USA oder Spanien. Derselbe Agent.",
              })}
            </p>
          </div>
        </div>

        <ul className="grid gap-5 lg:grid-cols-2 lg:gap-6">
          {PATHS.map((p) => (
            <li key={p.to}>
              <LocaleLink
                to={p.to}
                className="group relative isolate flex min-h-[34rem] flex-col justify-end overflow-hidden rounded-[1.75rem] p-7 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink sm:min-h-[40rem] sm:p-10"
              >
                <Image
                  src={p.photo}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  placeholder="blur"
                  className="-z-20 object-cover transition-transform [transition-duration:1200ms] [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
                  style={{ objectPosition: p.position }}
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 -z-10"
                  style={{
                    background:
                      "linear-gradient(0deg, rgba(10,10,10,0.97) 0%, rgba(10,10,10,0.85) 38%, rgba(10,10,10,0.25) 70%, rgba(10,10,10,0.1) 100%)",
                  }}
                />

                <p className="label-bebas text-base text-red-bright">{pick(language, p.label)}</p>
                <h3 className="mt-2 font-druk text-[clamp(2.75rem,7vw,4.75rem)] uppercase leading-[0.92] text-white">
                  {pick(language, p.title)}
                </h3>
                <p className="mt-4 max-w-[46ch] font-body text-base leading-relaxed text-white/75">
                  {pick(language, p.body)}
                </p>
                <ul className="mt-6 space-y-2 border-t border-white/15 pt-5 font-body text-[15px] text-white/85">
                  {pick(language, p.points).map((pt) => (
                    <li key={pt} className="flex gap-3">
                      <span aria-hidden="true" className="mt-[0.6em] h-1.5 w-1.5 shrink-0 rounded-full bg-red-bright" />
                      {pt}
                    </li>
                  ))}
                </ul>
                <span className="mt-8 inline-flex items-center gap-2 font-body text-sm font-semibold text-white">
                  <span className="border-b border-white/40 pb-0.5 transition-colors group-hover:border-red-bright">
                    {pick(language, p.link)}
                  </span>
                  <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </span>
              </LocaleLink>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default HomePaths;
