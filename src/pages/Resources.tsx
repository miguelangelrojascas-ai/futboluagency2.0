import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useDocumentMeta } from "@/hooks/useDocumentMeta";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useCalendlyLoader, openCalendly } from "@/hooks/useCalendly";
import { guides, resourcesHeroImage } from "@/data/resources";

const PREVIEW_SECTIONS = 3;

const Resources = () => {
  const { language } = useLanguage();
  const es = language === "es";
  useCalendlyLoader();

  useDocumentMeta({
    title: es
      ? "Recursos | Guías sobre becas de fútbol en EE.UU. – FutbolUAgency"
      : "Resources | Guides on U.S. soccer scholarships – FutbolUAgency",
    description: es
      ? "Guías completas sobre becas de fútbol universitario en Estados Unidos: elegibilidad, requisitos, proceso, visado, costes y vida en el campus."
      : "Complete guides on U.S. college soccer scholarships: eligibility, requirements, process, visa, costs and campus life.",
  });

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
                const written = guide.sections.filter((s) => s.body.es.length > 0).length;
                const extra = guide.sections.length - PREVIEW_SECTIONS;
                return (
                  <li key={guide.slug}>
                    <Link
                      to={`/recursos/${guide.slug}`}
                      className="group/card flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card p-7 transition-colors duration-200 hover:border-primary/40 sm:p-8"
                    >
                      <div className="-mx-7 -mt-7 mb-6 overflow-hidden sm:-mx-8 sm:-mt-8">
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
                        <span className="font-body text-[11px] font-bold uppercase tracking-[0.15em] text-muted-foreground/70">
                          {written} {es ? "secciones" : "sections"}
                        </span>
                      </div>

                      <h2 className="mb-3 font-display text-xl font-bold leading-snug text-foreground sm:text-2xl">
                        {es ? guide.title.es : guide.title.en}
                      </h2>
                      <p className="mb-6 font-body text-[15px] leading-relaxed text-muted-foreground">
                        {es ? guide.summary.es : guide.summary.en}
                      </p>

                      <ul className="mb-6 flex-1 space-y-2 border-t border-border pt-5">
                        {guide.sections.slice(0, PREVIEW_SECTIONS).map((section) => (
                          <li
                            key={section.id}
                            className="flex gap-2.5 font-body text-[13px] leading-relaxed text-muted-foreground"
                          >
                            <span aria-hidden="true" className="text-primary/50">
                              ·
                            </span>
                            <span className="truncate">
                              {es ? section.title.es : section.title.en}
                            </span>
                          </li>
                        ))}
                        {extra > 0 && (
                          <li className="pl-5 font-body text-[13px] text-muted-foreground/70">
                            {es ? `+${extra} secciones más` : `+${extra} more sections`}
                          </li>
                        )}
                      </ul>

                      <span className="inline-flex items-center gap-2 font-body text-sm font-bold text-primary">
                        {es ? "Explorar guía" : "Explore guide"}
                        <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover/card:translate-x-0.5" />
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
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
                  ? "Agenda una llamada informativa con nuestro equipo. Traes tus dudas y te respondemos sobre tu caso concreto, no en general."
                  : "Book an information call with our team. Bring your questions and we answer them for your specific case, not in general."}
              </p>
              <button
                type="button"
                onClick={openCalendly}
                className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3.5 font-body font-semibold text-primary-foreground transition-colors hover:bg-primary-hover"
              >
                {es ? "Agendar llamada informativa" : "Book an information call"}
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
};

export default Resources;
