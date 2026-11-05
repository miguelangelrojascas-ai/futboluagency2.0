"use client";

import { ArrowRight } from "lucide-react";
import LocaleLink from "@/components/LocaleLink";
import { useLanguage } from "@/contexts/LanguageContext";
import { bottomRow, topRow } from "@/data/successCases";

type Bilingual = { es: string; en: string };

type ScholarshipCase = {
  /** Must match the name on the player's success-case card, to reuse the image. */
  name: string;
  university: string;
  division: string;
  /** Share of the cost covered, as shown on the card. */
  coverage: string;
  type: Bilingual;
  covers: Bilingual;
  /** False while the figure has not been confirmed with the player's file. */
  confirmed: boolean;
  /** Path to the long-form story, when there is one. */
  story?: string;
};

/**
 * BORRADOR: one real case per kind of scholarship.
 *
 * Only Ander's figure is confirmed (his story says he signed a full
 * scholarship). The other two are placeholders: swap in the real player,
 * percentage and wording, then set `confirmed: true` to drop the
 * "por confirmar" label.
 */
const CASES: ScholarshipCase[] = [
  {
    name: "Ander González",
    university: "St. John's University",
    division: "NCAA D1",
    coverage: "100%",
    type: { es: "Beca completa", en: "Full scholarship" },
    covers: {
      es: "Matrícula, alojamiento, comida y libros cubiertos durante los cuatro años.",
      en: "Tuition, housing, meals and books covered for all four years.",
    },
    confirmed: true,
    story: "/jugadores/ander-gonzalez",
  },
  {
    name: "Iván Gómez Sumillera",
    university: "Delta State University",
    division: "NCAA D2",
    coverage: "80%",
    type: { es: "Deportiva + académica", en: "Athletic + academic" },
    covers: {
      es: "La beca deportiva se suma a una ayuda académica por sus notas. La familia cubre el resto.",
      en: "The athletic award is stacked with academic aid for his grades. The family covers the rest.",
    },
    confirmed: false,
  },
  {
    name: "Victor Paz",
    university: "Illinois Central College",
    division: "NJCAA",
    coverage: "60%",
    type: { es: "Beca parcial (JUCO)", en: "Partial scholarship (JUCO)" },
    covers: {
      es: "Dos años de college con coste reducido, como puerta de entrada a una universidad de cuatro años.",
      en: "Two years of college at a reduced cost, as a way into a four-year university.",
    },
    confirmed: false,
  },
];

const imageByName = new Map([...topRow, ...bottomRow].map((c) => [c.name, c.image]));

const ScholarshipCasesSection = () => {
  const { language } = useLanguage();
  const es = language === "es";

  return (
    <section
      id="casos"
      className="section-padding"
      style={{ backgroundColor: "hsl(var(--background))", paddingTop: 0, marginTop: "-6rem", position: "relative", zIndex: 10 }}
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="max-w-3xl mb-10">
          <span className="text-primary text-xs font-bold tracking-[0.15em] uppercase mb-3 block">
            {es ? "Casos reales" : "Real cases"}
          </span>
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-foreground leading-tight">
            {es ? "Qué beca consiguieron nuestros jugadores" : "What scholarship our players earned"}
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {CASES.map((c) => {
            const image = imageByName.get(c.name);
            const card = (
              <article className="group flex h-full flex-col overflow-hidden rounded-xl border border-border bg-white transition-shadow duration-300 hover:shadow-[0_12px_40px_rgba(18,33,58,0.14)]">
                <div className="relative aspect-[4/3] overflow-hidden bg-secondary">
                  {image && (
                    <img
                      src={image}
                      alt={`${c.name}, ${c.university}`}
                      loading="lazy"
                      className="h-full w-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                    />
                  )}
                  <span className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1 font-body text-[11px] font-bold uppercase tracking-[0.12em] text-foreground">
                    {c.division}
                  </span>
                </div>

                <div className="flex flex-1 flex-col p-6">
                  <div className="mb-1 flex items-baseline gap-2">
                    <span className="font-display text-4xl font-bold text-primary">{c.coverage}</span>
                    <span className="font-body text-xs font-bold uppercase tracking-[0.12em] text-foreground">
                      {c.type[language]}
                    </span>
                  </div>
                  {!c.confirmed && (
                    <span className="mb-2 font-body text-[11px] italic text-muted-foreground">
                      {es ? "Dato por confirmar" : "Figure to be confirmed"}
                    </span>
                  )}
                  <h3 className="mt-2 font-display text-xl font-bold text-foreground">{c.name}</h3>
                  <p className="mb-4 font-body text-sm text-muted-foreground">{c.university}</p>
                  <p className="font-body text-sm leading-relaxed text-foreground/80">{c.covers[language]}</p>

                  {c.story && (
                    <span className="mt-auto inline-flex items-center gap-2 pt-5 font-body text-sm font-bold text-primary">
                      {es ? "Leer su historia" : "Read his story"}
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </span>
                  )}
                </div>
              </article>
            );

            return c.story ? (
              <LocaleLink key={c.name} to={c.story} className="block h-full no-underline">
                {card}
              </LocaleLink>
            ) : (
              <div key={c.name}>{card}</div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ScholarshipCasesSection;
