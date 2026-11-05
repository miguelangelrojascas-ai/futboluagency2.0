"use client";

import LocaleLink from "@/components/LocaleLink";
import { ArrowRight, ChevronDown } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { guides, resourcesHeroImage } from "@/data/resources";

const Resources = () => {
  const { language } = useLanguage();
  const es = language === "es";


  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-16 md:pt-20">
        {/* Hero */}
        <section className="section-padding relative overflow-hidden bg-background">
          <img
            src={resourcesHeroImage}
            alt=""
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 h-full w-full object-cover"
          />
          {/* Legibility wash: solid on the left where the copy sits, clearing to the right */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "linear-gradient(100deg, hsl(var(--background)) 0%, hsl(var(--background) / 0.96) 42%, hsl(var(--background) / 0.72) 62%, hsl(var(--background) / 0.35) 100%)",
            }}
          />
          <div className="container-wide relative px-4">
            <div className="max-w-3xl">
              <span className="mb-4 inline-block font-body text-xs font-bold uppercase tracking-[0.2em] text-primary">
                {es ? "Recursos" : "Resources"}
              </span>
              <h1 className="mb-6 font-display text-4xl font-bold leading-[1.05] sm:text-5xl md:text-6xl">
                {es ? "Guías para entenderlo " : "Guides to understand it "}
                <span className="italic text-primary">{es ? "todo" : "all"}</span>
              </h1>
              <p className="font-body text-base leading-relaxed text-muted-foreground sm:text-lg">
                {es
                  ? "Esto es todo lo que necesitas entender antes de tener una reunión con el equipo de admisiones. Después de ver los recursos entenderás lo suficiente para tomar una decisión informada sobre el proceso de estudiar becado en una universidad americana."
                  : "This is everything you need to understand before sitting down with our admissions team. Once you have been through these resources you will know enough to make an informed decision about studying on a scholarship at an American university."}
              </p>
            </div>
          </div>
        </section>

        {/* Guide index */}
        <section
          className="section-padding"
          style={{ backgroundColor: "hsl(var(--section-alt))" }}
        >
          <div className="container-wide px-4">
            <ul className="grid gap-5 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
              {guides.map((guide) => {
                const written = guide.sections.filter((s) => s.body.es.length > 0);
                return (
                  <li key={guide.slug} className="guide-card relative">
                    <LocaleLink
                      to={`/recursos/${guide.slug}`}
                      className="group/card flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card p-7 transition-colors duration-200 hover:border-primary/40 sm:p-8"
                    >
                      <div className="guide-image -mx-7 -mt-7 mb-6 overflow-hidden sm:-mx-8 sm:-mt-8">
                        <img
                          src={guide.image}
                          alt=""
                          aria-hidden="true"
                          loading="lazy"
                          className="h-36 w-full object-cover transition-transform duration-700 ease-out group-hover/card:scale-[1.04]"
                        />
                      </div>

                      <div className="mb-5 flex items-baseline justify-between gap-4">
                        <span className="font-display text-4xl font-bold leading-none text-primary/25 transition-colors duration-200 group-hover/card:text-primary/50">
                          {guide.number}
                        </span>
                        <span className="inline-flex items-center gap-1 font-body text-[11px] font-bold uppercase tracking-[0.15em] text-muted-foreground/70">
                          {written.length} {es ? "secciones" : "sections"}
                          <ChevronDown className="guide-chevron h-3.5 w-3.5" />
                        </span>
                      </div>

                      <h2 className="mb-3 font-display text-xl font-bold leading-snug text-foreground sm:text-2xl">
                        {es ? guide.title.es : guide.title.en}
                      </h2>
                      <p className="mb-6 flex-1 font-body text-[15px] leading-relaxed text-muted-foreground">
                        {es ? guide.summary.es : guide.summary.en}
                      </p>

                      <span className="inline-flex items-center gap-2 font-body text-sm font-bold text-primary">
                        {es ? "Explorar guía" : "Explore guide"}
                        <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover/card:translate-x-0.5" />
                      </span>
                    </LocaleLink>

                  </li>
                );
              })}
            </ul>
            <style>{`
              /* Only where there is a real pointer. On touch the card is a plain link. */
              @media (hover: hover) and (min-width: 768px) {
                .guide-image {
                  transition: height 380ms cubic-bezier(0.23, 1, 0.32, 1);
                  height: 9rem;
                }
                .guide-card:hover .guide-image,
                .guide-card:focus-within .guide-image {
                  height: 0;
                }
                .guide-image img { height: 100%; }
                .guide-chevron { transition: transform 200ms ease; }
                .guide-card:hover .guide-chevron { transform: rotate(180deg); }
              }
              @media (prefers-reduced-motion: reduce) {
                .guide-image { transition: none !important; }
              }
            `}</style>
          </div>
        </section>

        {/* Closing CTA */}
        <section className="section-padding bg-background">
          <div className="container-wide px-4">
            <div className="mx-auto flex max-w-2xl flex-col items-center gap-6 text-center">
              <h2 className="text-balance font-display text-3xl font-bold sm:text-4xl">
                {es ? "¿Te queda alguna " : "Still have a "}
                <span className="italic text-primary">{es ? "duda" : "question"}</span>?
              </h2>
              <p className="font-body text-base leading-relaxed text-muted-foreground sm:text-lg">
                {es
                  ? "Envíanos tu perfil con tus dudas. Lo revisamos y te escribimos para hablar de tu caso concreto, no en general."
                  : "Send us your profile along with your questions. We review it and write to you to talk about your specific case, not in general."}
              </p>
              <LocaleLink
                to="/apply"
                className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3.5 font-body font-semibold text-primary-foreground transition-colors hover:bg-primary-hover"
              >
                {es ? "Envía tu perfil" : "Send your profile"}
                <ArrowRight className="h-4 w-4" />
              </LocaleLink>
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
};

export default Resources;
