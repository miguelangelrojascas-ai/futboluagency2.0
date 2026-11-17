"use client";

import Image from "next/image";
import { useLanguage } from "@/contexts/LanguageContext";
import { pick, type Copy } from "@/lib/i18n";

type Pillar = { title: Copy; body: Copy };

/* Copy carries its own Italian and German, so it reads right without the dictionaries. */
const LABEL: Copy = {
  es: "Por qué FUA · Representación de élite",
  en: "Why FUA · Elite representation",
  it: "Perché FUA · Rappresentanza d'élite",
  de: "Warum FUA · Spitzenvertretung",
};
const HEAD: Copy<[string, string]> = {
  es: ["Un agente.", "Todo el camino."],
  en: ["One agent.", "All the way."],
  it: ["Un agente.", "Tutto il percorso."],
  de: ["Ein Agent.", "Den ganzen Weg."],
};
const LEDE: Copy = {
  es: "Creada por exfutbolistas que ya recorrieron este camino. Eliminamos la incertidumbre del proceso con un modelo basado en resultados reales y trato personal.",
  en: "Built by former players who have walked this road themselves. We take the uncertainty out of the process with a model built on real results and personal care.",
  it: "Nata da ex calciatori che questo percorso l'hanno già fatto. Togliamo l'incertezza dal processo con un modello basato su risultati reali e un rapporto personale.",
  de: "Gegründet von ehemaligen Fußballern, die diesen Weg selbst gegangen sind. Wir nehmen dem Prozess die Unsicherheit – mit einem Modell aus echten Ergebnissen und persönlicher Betreuung.",
};

const PHOTO = "/images/showcase/presentacion-familias.jpg";
const CAPTION: Copy = {
  es: "Presentación del Showcase a las familias.",
  en: "Presenting the Showcase to families.",
  it: "Presentazione dello Showcase alle famiglie.",
  de: "Vorstellung des Showcase für die Familien.",
};

const STATS: { num: string; label: Copy }[] = [
  { num: "2020", label: { es: "Año de fundación", en: "Year founded", it: "Anno di fondazione", de: "Gründungsjahr" } },
  { num: "+350", label: { es: "Atletas colocados", en: "Athletes placed", it: "Atleti collocati", de: "Vermittelte Athleten" } },
  { num: "+$10M", label: { es: "En becas conseguidas", en: "In scholarships secured", it: "In borse di studio ottenute", de: "An erhaltenen Stipendien" } },
  { num: "98%", label: { es: "Satisfacción de familias", en: "Family satisfaction", it: "Famiglie soddisfatte", de: "Zufriedene Familien" } },
];

const PILLARS: Pillar[] = [
  {
    title: { es: "Trabajo directo", en: "Direct work", it: "Lavoro diretto", de: "Direkte Arbeit" },
    body: {
      es: "Negociamos personalmente tu beca con entrenadores de EE.UU. y clubes en España, sin intermediarios ni plataformas automáticas.",
      en: "We negotiate your scholarship in person with U.S. coaches and clubs in Spain, with no middlemen and no automated platforms.",
      it: "Negoziamo personalmente la tua borsa di studio con gli allenatori negli USA e con i club in Spagna, senza intermediari né piattaforme automatiche.",
      de: "Wir verhandeln dein Stipendium persönlich mit Trainern in den USA und Vereinen in Spanien – ohne Zwischenhändler und ohne automatische Plattformen.",
    },
  },
  {
    title: { es: "Transparencia real", en: "Real transparency", it: "Trasparenza reale", de: "Echte Transparenz" },
    body: {
      es: "Analizamos tu nivel deportivo y académico con honestidad desde el día uno, sin falsas promesas.",
      en: "We assess your athletic and academic level honestly from day one, with no false promises.",
      it: "Valutiamo il tuo livello sportivo e accademico con onestà fin dal primo giorno, senza false promesse.",
      de: "Wir bewerten dein sportliches und schulisches Niveau vom ersten Tag an ehrlich – ohne falsche Versprechen.",
    },
  },
  {
    title: { es: "Acompañamiento total", en: "Support all the way", it: "Accompagnamento totale", de: "Rundum-Begleitung" },
    body: {
      es: "Te guiamos desde la primera evaluación hasta tu graduación universitaria, incluida la gestión de transfers.",
      en: "We guide you from your first evaluation to your college graduation, transfers included.",
      it: "Ti seguiamo dalla prima valutazione fino alla laurea, compresa la gestione dei transfer.",
      de: "Wir begleiten dich von der ersten Bewertung bis zum Uni-Abschluss, inklusive Transfers.",
    },
  },
  {
    title: { es: "Resultados comprobados", en: "Proven results", it: "Risultati comprovati", de: "Bewiesene Ergebnisse" },
    body: {
      es: "Un sistema validado por más de 350 atletas que compiten en la NCAA, la NAIA, la NJCAA y el fútbol español.",
      en: "A system proven by more than 350 athletes competing in the NCAA, NAIA, NJCAA and Spanish football.",
      it: "Un sistema convalidato da oltre 350 atleti che giocano in NCAA, NAIA, NJCAA e nel calcio spagnolo.",
      de: "Ein System, bestätigt von über 350 Athleten in der NCAA, NAIA, NJCAA und im spanischen Fußball.",
    },
  },
];

/**
 * Why FUA: who is behind the agency, the four things a family can hold us to,
 * a real photo and the numbers. Light, between the two paths and the FAQ.
 */
const HomeWhyUs = () => {
  const { language } = useLanguage();
  const [lineA, lineB] = pick(language, HEAD);

  return (
    <section className="bg-background py-24 sm:py-32" aria-labelledby="why-title">
      <div className="container-wide px-4">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <p className="label-bebas text-base text-primary">{pick(language, LABEL)}</p>
            <h2 id="why-title" className="mt-4 leading-[0.9] text-ink text-[clamp(3.25rem,9vw,6.5rem)]">
              {lineA}
              <span className="block pr-[0.08em] italic text-primary">{lineB}</span>
            </h2>
            <p className="mt-8 max-w-[54ch] font-body text-lg leading-relaxed text-ink/70">{pick(language, LEDE)}</p>

            <ol className="mt-14 grid gap-x-10 gap-y-10 sm:grid-cols-2">
              {PILLARS.map(({ title, body }, i) => (
                <li key={i} className="group relative border-t border-ink/15 pt-6">
                  {/* Red rule that runs along the top on hover. */}
                  <span aria-hidden="true" className="absolute -top-px left-0 h-0.5 w-10 bg-primary transition-[width] duration-500 ease-out group-hover:w-full" />
                  <p className="font-bebas text-lg tracking-[0.12em] text-primary">0{i + 1}</p>
                  <h3 className="mt-1 font-druk text-3xl uppercase leading-none text-ink">{pick(language, title)}</h3>
                  <p className="mt-3 font-body text-[15px] leading-relaxed text-ink/65">{pick(language, body)}</p>
                </li>
              ))}
            </ol>
          </div>

          <figure className="lg:col-span-5">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[1.75rem] bg-ink/5">
              <Image
                src={PHOTO}
                alt={pick(language, CAPTION)}
                fill
                sizes="(min-width: 1024px) 38vw, 100vw"
                className="object-cover object-[50%_30%]"
              />
            </div>
            <figcaption className="mt-4 font-body text-sm text-ink/55">{pick(language, CAPTION)}</figcaption>
          </figure>
        </div>

        <ul className="mt-16 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          {STATS.map((stat) => (
            <li key={stat.num} className="rounded-[1.5rem] bg-[#f3f1ec] p-6 sm:p-8">
              <p className="font-druk text-[clamp(2.75rem,6vw,4.5rem)] leading-none text-ink">{stat.num}</p>
              <p className="mt-3 font-body text-sm text-ink/60 sm:text-base">{pick(language, stat.label)}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default HomeWhyUs;
