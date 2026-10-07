import { Link, Navigate, useParams } from "react-router-dom";
import { ArrowLeft, ArrowRight, ChevronRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useDocumentMeta } from "@/hooks/useDocumentMeta";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PlayerProfilesSection from "@/components/usa/PlayerProfilesSection";
import { findGuide, guides } from "@/data/resources";

const ResourceGuide = () => {
  const { slug } = useParams();
  const { language } = useLanguage();
  const es = language === "es";
  const guide = findGuide(slug);

  const title = guide ? (es ? guide.title.es : guide.title.en) : "";
  const summary = guide ? (es ? guide.summary.es : guide.summary.en) : "";

  useDocumentMeta({
    title: guide ? `${title} | FutbolUAgency` : "FutbolUAgency",
    description: summary,
  });

  if (!guide) return <Navigate to="/recursos" replace />;

  const index = guides.findIndex((g) => g.slug === guide.slug);
  const next = guides[index + 1];
  const written = guide.sections.filter((s) => s.body.es.length > 0);

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-16 md:pt-20">
        {/* Header */}
        <section className="section-padding relative overflow-hidden bg-background">
          <img
            src={guide.image}
            alt=""
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 h-full w-full object-cover"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "linear-gradient(100deg, hsl(var(--background)) 0%, hsl(var(--background) / 0.96) 45%, hsl(var(--background) / 0.7) 65%, hsl(var(--background) / 0.3) 100%)",
            }}
          />
          <div className="container-wide relative px-4">
            <nav aria-label={es ? "Ruta de navegación" : "Breadcrumb"} className="mb-8">
              <ol className="flex items-center gap-2 font-body text-sm text-muted-foreground">
                <li>
                  <Link to="/recursos" className="transition-colors hover:text-primary">
                    {es ? "Recursos" : "Resources"}
                  </Link>
                </li>
                <li aria-hidden="true">
                  <ChevronRight className="h-4 w-4" />
                </li>
                <li aria-current="page" className="font-medium text-foreground">
                  {title}
                </li>
              </ol>
            </nav>

            <div className="max-w-3xl">
              <span className="mb-4 inline-block font-display text-sm font-bold tracking-[0.2em] text-primary">
                {guide.number}
              </span>
              <h1 className="mb-6 font-display text-4xl font-bold leading-[1.05] sm:text-5xl">
                {title}
              </h1>
              <p className="font-body text-base leading-relaxed text-muted-foreground sm:text-lg">
                {summary}
              </p>
            </div>
          </div>
        </section>

        {/* Body */}
        <section
          className="section-padding"
          style={{ backgroundColor: "hsl(var(--section-alt))" }}
        >
          <div className="container-wide px-4">
            <div className="grid gap-12 lg:grid-cols-[minmax(0,14rem)_minmax(0,1fr)] lg:gap-16">
              {/* Table of contents */}
              <nav aria-label={es ? "Contenido de la guía" : "Guide contents"} className="lg:sticky lg:top-28 lg:self-start">
                <h2 className="mb-4 font-body text-[11px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
                  {es ? "En esta guía" : "In this guide"}
                </h2>
                <ol className="space-y-2.5 border-l border-border pl-4">
                  {guide.sections.map((section) => (
                    <li key={section.id}>
                      <a
                        href={`#${section.id}`}
                        className="font-body text-[13px] leading-snug text-muted-foreground transition-colors hover:text-primary"
                      >
                        {es ? section.title.es : section.title.en}
                      </a>
                    </li>
                  ))}
                </ol>
              </nav>

              {/* Sections */}
              <div className="max-w-2xl">
                {guide.sections.map((section) => {
                  const paragraphs = es ? section.body.es : section.body.en;
                  const pending = paragraphs.length === 0;
                  return (
                    <article
                      key={section.id}
                      id={section.id}
                      className="scroll-mt-28 border-b border-border py-8 first:pt-0 last:border-b-0"
                    >
                      <h2 className="mb-4 font-display text-xl font-bold leading-snug text-foreground sm:text-2xl">
                        {es ? section.title.es : section.title.en}
                      </h2>
                      {pending ? (
                        <p className="rounded-xl border border-dashed border-border px-4 py-3 font-body text-sm text-muted-foreground/70">
                          {es ? "Sección en preparación." : "Section in progress."}
                        </p>
                      ) : (
                        paragraphs.map((text, i) => (
                          <p
                            key={i}
                            className="mb-4 font-body text-[15px] leading-relaxed text-muted-foreground last:mb-0 sm:text-base"
                          >
                            {text}
                          </p>
                        ))
                      )}

                      {section.table && (
                        <figure className="mt-6">
                          <div className="overflow-x-auto rounded-xl border border-border" style={{ backgroundColor: "hsl(var(--card))" }}>
                            <table className="w-full border-collapse text-left font-body text-sm">
                              <thead>
                                <tr className="border-b border-border">
                                  {(es ? section.table.columns.es : section.table.columns.en).map((col, i) => (
                                    <th
                                      key={col}
                                      scope="col"
                                      className={`px-4 py-3 font-bold uppercase tracking-[0.1em] text-[11px] text-muted-foreground ${
                                        i === 2 ? "text-right" : ""
                                      }`}
                                    >
                                      {col}
                                    </th>
                                  ))}
                                </tr>
                              </thead>
                              <tbody>
                                {section.table.rows.map((row) => {
                                  const cells = es ? row.es : row.en;
                                  return (
                                    <tr key={cells[0]} className="border-b border-border/60 last:border-b-0">
                                      <td className="px-4 py-3 font-semibold text-foreground">{cells[0]}</td>
                                      <td className="px-4 py-3 text-muted-foreground">{cells[1]}</td>
                                      <td className="whitespace-nowrap px-4 py-3 text-right font-semibold text-foreground">
                                        {cells[2]}
                                      </td>
                                    </tr>
                                  );
                                })}
                              </tbody>
                              <tfoot>
                                <tr style={{ backgroundColor: "hsl(var(--primary) / 0.06)" }}>
                                  <td colSpan={2} className="px-4 py-3.5 font-bold text-foreground">
                                    {(es ? section.table.total.es : section.table.total.en)[0]}
                                  </td>
                                  <td className="whitespace-nowrap px-4 py-3.5 text-right font-display text-base font-bold text-primary">
                                    {(es ? section.table.total.es : section.table.total.en)[1]}
                                  </td>
                                </tr>
                              </tfoot>
                            </table>
                          </div>
                          <figcaption className="mt-3 font-body text-xs leading-relaxed text-muted-foreground/80">
                            {es ? section.table.caption.es : section.table.caption.en}
                          </figcaption>
                        </figure>
                      )}

                      {section.image && (
                        <figure
                          className={`mt-6 overflow-hidden rounded-xl border border-border ${
                            section.image.diagram ? "p-4 sm:p-6" : ""
                          }`}
                          style={
                            section.image.diagram
                              ? { backgroundColor: "hsl(var(--card))" }
                              : undefined
                          }
                        >
                          <img
                            src={section.image.src}
                            alt={es ? section.image.alt.es : section.image.alt.en}
                            loading="lazy"
                            className={
                              section.image.diagram
                                ? "mx-auto h-auto w-full max-w-xl object-contain"
                                : "h-full w-full object-cover"
                            }
                          />
                        </figure>
                      )}
                    </article>
                  );
                })}

                {/* Guide footer */}
                <div className="mt-10 flex flex-col gap-4 border-t border-border pt-8 sm:flex-row sm:items-center sm:justify-between">
                  <Link
                    to="/recursos"
                    className="inline-flex items-center gap-2 font-body text-sm font-bold text-muted-foreground transition-colors hover:text-primary"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    {es ? "Todas las guías" : "All guides"}
                  </Link>
                  {next && (
                    <Link
                      to={`/recursos/${next.slug}`}
                      className="inline-flex items-center gap-2 font-body text-sm font-bold text-primary transition-colors hover:text-primary-hover"
                    >
                      {es ? next.title.es : next.title.en}
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {guide.sections.some((section) => section.profiles) && <PlayerProfilesSection />}

        {/* CTA */}
        <section className="section-padding bg-background">
          <div className="container-wide px-4">
            <div className="mx-auto flex max-w-2xl flex-col items-center gap-6 text-center">
              <h2 className="text-balance font-display text-3xl font-bold sm:text-4xl">
                {es ? "¿Lo quieres aplicar a " : "Want to apply this to "}
                <span className="italic text-primary">{es ? "tu caso" : "your case"}</span>?
              </h2>
              <p className="font-body text-base leading-relaxed text-muted-foreground sm:text-lg">
                {es
                  ? `Has leído ${written.length} ${written.length === 1 ? "sección" : "secciones"} de teoría. La evaluación gratuita te dice qué significa todo esto para tu perfil concreto.`
                  : `You have read ${written.length} ${written.length === 1 ? "section" : "sections"} of theory. The free evaluation tells you what all of it means for your specific profile.`}
              </p>
              <Link
                to="/apply"
                className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3.5 font-body font-semibold text-primary-foreground transition-colors hover:bg-primary-hover"
              >
                {es ? "Evaluación gratuita" : "Free evaluation"}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
};

export default ResourceGuide;
