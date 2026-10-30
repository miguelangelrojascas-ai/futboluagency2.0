"use client";

import LocaleLink from "@/components/LocaleLink";
import { notFound, useParams } from "next/navigation";
import { ArrowLeft, ArrowRight, ChevronRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { findPlayerStory } from "@/data/playerStories";

const PlayerStory = () => {
  const { slug } = useParams<{ slug: string }>();
  const { language } = useLanguage();
  const es = language === "es";
  const story = findPlayerStory(slug);

  const summary = story ? (es ? story.summary.es : story.summary.en) : "";


  if (!story) notFound();

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-16 md:pt-20">
        {/* Header */}
        <section className="section-padding relative overflow-hidden bg-background">
          <img
            src={story.heroImage}
            alt=""
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 h-full w-full object-cover object-top"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "linear-gradient(100deg, hsl(var(--background)) 0%, hsl(var(--background) / 0.95) 45%, hsl(var(--background) / 0.65) 68%, hsl(var(--background) / 0.25) 100%)",
            }}
          />
          <div className="container-wide relative px-4">
            <nav aria-label={es ? "Ruta de navegación" : "Breadcrumb"} className="mb-8">
              <ol className="flex items-center gap-2 font-body text-sm text-muted-foreground">
                <li>
                  <LocaleLink to="/players" className="transition-colors hover:text-primary">
                    {es ? "Nuestros jugadores" : "Our players"}
                  </LocaleLink>
                </li>
                <li aria-hidden="true">
                  <ChevronRight className="h-4 w-4" />
                </li>
                <li aria-current="page" className="font-medium text-foreground">
                  {story.name}
                </li>
              </ol>
            </nav>

            <div className="max-w-3xl">
              <span className="mb-4 inline-block font-body text-xs font-bold uppercase tracking-[0.2em] text-primary">
                {es ? story.eyebrow.es : story.eyebrow.en}
              </span>
              <h1 className="mb-4 font-display text-4xl font-bold leading-[1.05] sm:text-5xl md:text-6xl">
                {story.name}
              </h1>
              <p className="mb-6 font-body text-base font-semibold text-primary sm:text-lg">
                {story.university} — {story.division}
              </p>
              <p className="font-body text-base leading-relaxed text-muted-foreground sm:text-lg">
                {summary}
              </p>
            </div>
          </div>
        </section>

        {/* Chapters */}
        <section
          className="section-padding"
          style={{ backgroundColor: "hsl(var(--section-alt))" }}
        >
          <div className="container-wide px-4">
            <ol className="mx-auto flex max-w-4xl flex-col gap-10 sm:gap-14">
              {story.chapters.map((chapter, i) => (
                <li
                  key={chapter.year}
                  className="grid items-center gap-6 sm:gap-10 md:grid-cols-2"
                >
                  <div className={i % 2 === 1 ? "md:order-2" : undefined}>
                    <figure className="overflow-hidden rounded-2xl border border-border">
                      <img
                        src={chapter.image}
                        alt={es ? chapter.alt.es : chapter.alt.en}
                        loading="lazy"
                        className="aspect-[4/3] w-full object-cover"
                      />
                    </figure>
                  </div>
                  <div>
                    <span className="font-display text-3xl font-bold leading-none text-primary/30 sm:text-4xl">
                      {chapter.year}
                    </span>
                    <h2 className="mb-3 mt-3 font-display text-xl font-bold leading-snug text-foreground sm:text-2xl">
                      {es ? chapter.title.es : chapter.title.en}
                    </h2>
                    <p className="font-body text-[15px] leading-relaxed text-muted-foreground sm:text-base">
                      {es ? chapter.body.es : chapter.body.en}
                    </p>
                  </div>
                </li>
              ))}
            </ol>

            {story.video && (
              <div className="mx-auto mt-14 max-w-3xl sm:mt-20">
                <h2 className="mb-5 text-center font-display text-xl font-bold text-foreground sm:text-2xl">
                  {es ? "Mira su vídeo" : "Watch his video"}
                </h2>
                <div className="overflow-hidden rounded-2xl border border-border">
                  <video
                    controls
                    playsInline
                    preload="metadata"
                    poster={story.video.poster}
                    className="h-auto w-full"
                  >
                    <source src={story.video.src} type="video/mp4" />
                  </video>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* CTA */}
        <section className="section-padding bg-background">
          <div className="container-wide px-4">
            <div className="mx-auto flex max-w-2xl flex-col items-center gap-6 text-center">
              <h2 className="text-balance font-display text-3xl font-bold sm:text-4xl">
                {es ? "¿Quieres el " : "Want the "}
                <span className="italic text-primary">{es ? "mismo camino" : "same path"}</span>?
              </h2>
              <p className="font-body text-base leading-relaxed text-muted-foreground sm:text-lg">
                {es
                  ? "Empieza por la evaluación gratuita. Analizamos tu perfil y te decimos con claridad qué opciones reales tienes."
                  : "Start with the free evaluation. We analyse your profile and tell you clearly what real options you have."}
              </p>
              <LocaleLink
                to="/apply"
                className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3.5 font-body font-semibold text-primary-foreground transition-colors hover:bg-primary-hover"
              >
                {es ? "Envía tu perfil" : "Send your profile"}
                <ArrowRight className="h-4 w-4" />
              </LocaleLink>
              <LocaleLink
                to="/players"
                className="inline-flex items-center gap-2 font-body text-sm font-bold text-muted-foreground transition-colors hover:text-primary"
              >
                <ArrowLeft className="h-4 w-4" />
                {es ? "Todos los jugadores" : "All players"}
              </LocaleLink>
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
};

export default PlayerStory;
