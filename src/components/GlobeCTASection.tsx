"use client";

import LocaleLink from "@/components/LocaleLink";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Globe } from "@/components/ui/globe";

/** Closing call to action: a rotating globe and a single button to the form. */
const GlobeCTASection = () => {
  const { language } = useLanguage();
  const es = language === "es";

  return (
    <section className="section-padding" style={{ backgroundColor: "hsl(var(--background))" }}>
      <div className="container-wide px-4">
        <div
          className="relative overflow-hidden rounded-3xl border border-border px-6 py-14 sm:px-10 md:px-16 md:py-20"
          style={{ backgroundColor: "hsl(var(--section-alt))" }}
        >
          <div className="flex flex-col-reverse items-center justify-between gap-10 md:flex-row">
            <div className="z-10 max-w-xl text-left">
              <span className="mb-4 inline-block font-body text-xs font-bold uppercase tracking-[0.2em] text-primary">
                {es ? "Evaluación gratuita" : "Free evaluation"}
              </span>
              <h2 className="font-display text-3xl font-bold leading-[1.1] text-foreground sm:text-4xl md:text-5xl">
                {es ? "De tu ciudad al " : "From your city to "}
                <span className="text-primary">{es ? "campus" : "campus"}</span>
              </h2>
              <p className="mt-5 font-body text-base leading-relaxed text-muted-foreground sm:text-lg">
                {es
                  ? "Envíanos tu perfil y nuestro equipo de admisiones lo revisa: analizamos tu nivel deportivo y académico y te decimos con claridad qué opciones reales tienes. Sin compromiso."
                  : "Send us your profile and our admissions team reviews it: we analyse your athletic and academic level and tell you clearly what real options you have. No commitment."}
              </p>
              <LocaleLink
                to="/apply"
                className="mt-8 inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3.5 font-body font-semibold text-primary-foreground transition-colors hover:bg-primary-hover"
              >
                {es ? "Envía tu perfil" : "Send your profile"}
                <ArrowRight className="h-4 w-4" />
              </LocaleLink>
            </div>

            <div className="relative h-[220px] w-full max-w-xl sm:h-[260px]">
              <Globe className="absolute -bottom-24 right-0 scale-125 sm:-right-16 sm:scale-150" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GlobeCTASection;
