"use client";

import LocaleLink from "@/components/LocaleLink";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PlayerCard from "@/components/PlayerCard";
import NextPlayerCard from "@/components/NextPlayerCard";
import { useState } from "react";
import Image from "next/image";
import { LEAGUES, players, type League } from "@/data/players";

/** FUA players artwork for the header. */
const HERO_IMAGE = "/images/hero/header-jugadores.png";

const Players = () => {
  const { language } = useLanguage();
  const es = language === "es";
  const [league, setLeague] = useState<League | null>(null);
  const shown = league ? players.filter((p) => p.league === league) : players;

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-16 md:pt-20">
        {/* Hero */}
        {/* Hero: the artwork runs behind the floating navbar, tinted dark, and
            stops short of the full screen so the roster peeks in below. */}
        <section className="relative -mt-16 overflow-hidden bg-[#10182b] md:-mt-20">
          <Image
            src={HERO_IMAGE}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover object-[center_30%]"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 60% 55% at 50% 50%, rgba(10,14,30,0.55) 0%, rgba(10,14,30,0.35) 60%, rgba(10,14,30,0.2) 100%), linear-gradient(to bottom, rgba(10,14,30,0.55) 0%, rgba(10,14,30,0.25) 35%, rgba(10,14,30,0.45) 100%)",
            }}
          />

          <div className="container-wide relative z-10 flex min-h-[560px] flex-col items-center justify-center px-4 pb-16 pt-32 text-center sm:min-h-[620px] md:pt-36 lg:min-h-[70vh] lg:max-h-[760px]">
            <div className="mx-auto max-w-3xl" style={{ textShadow: "0 2px 18px rgba(0,0,0,0.75)" }}>
              <span className="mb-4 inline-block font-body text-xs font-bold uppercase tracking-[0.2em] text-white/80">
                {es ? "Nuestros jugadores" : "Our players"}
              </span>
              <h1 className="mb-6 font-display text-4xl font-bold leading-[1.05] text-white sm:text-5xl md:text-6xl">
                {es ? "Más de " : "More than "}
                <span className="italic text-red-500">{es ? "250 atletas" : "250 athletes"}</span>
                {es ? " han confiado en nosotros" : " have trusted us"}
              </h1>
              <p className="mx-auto max-w-2xl font-body text-base leading-relaxed text-white/90 sm:text-lg">
                {es
                  ? "Futbolistas que ya estudian y compiten en universidades de EE.UU. con beca. El siguiente puedes ser tú."
                  : "Footballers already studying and competing at U.S. universities on a scholarship. You could be next."}
              </p>
            </div>
            <LocaleLink
              to="/apply"
              className="mt-8 inline-flex w-full max-w-xs items-center justify-center gap-2 rounded-full bg-primary px-8 py-3.5 font-body font-semibold text-white transition-colors hover:bg-primary-hover"
            >
              {es ? "Envía tu perfil" : "Send your profile"}
              <ArrowRight className="h-4 w-4" />
            </LocaleLink>
          </div>
        </section>

        {/* Sport picker + roster */}
        <section
          className="section-padding"
          style={{ backgroundColor: "hsl(var(--section-alt))" }}
        >
          <div className="container-wide px-4">
            <div
              role="group"
              aria-label={es ? "Filtrar por liga" : "Filter by league"}
              className="-mx-4 mb-8 flex gap-2 overflow-x-auto px-4 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0"
            >
              {[null, ...LEAGUES].map((l) => {
                const active = league === l;
                return (
                  <button
                    key={l ?? "all"}
                    type="button"
                    aria-pressed={active}
                    onClick={() => setLeague(l)}
                    className={`inline-flex shrink-0 items-center gap-2 whitespace-nowrap rounded-full border px-4 py-2 font-body text-sm font-semibold transition-colors ${
                      active
                        ? "border-primary bg-primary text-white"
                        : "border-border bg-card text-foreground hover:border-foreground/30"
                    }`}
                  >
                    {l ?? (es ? "Todos" : "All")}
                  </button>
                );
              })}
            </div>

            <ul className="grid gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
              {shown.map((player) => (
                <li key={player.image}>
                  <PlayerCard player={player} />
                </li>
              ))}

              {/* Empty card at the end: the next FUA player. */}
              <li>
                <NextPlayerCard />
              </li>

              <li className="sm:col-span-2 lg:col-span-3">
                <div className="flex h-full flex-col justify-center rounded-2xl border border-border p-6 sm:p-7" style={{ backgroundColor: "hsl(var(--card))" }}>
                  <h2 className="font-display text-xl font-bold leading-snug text-foreground sm:text-2xl">
                    {es ? "Fútbol universitario en EE.UU." : "College soccer in the U.S."}
                  </h2>
                  <p className="mt-2 font-body text-[14px] leading-relaxed text-muted-foreground sm:text-[15px]">
                    {es
                      ? "Todos compiten y estudian en programas NCAA, NAIA y NJCAA."
                      : "They all compete and study in NCAA, NAIA and NJCAA programs."}
                  </p>
                  <LocaleLink
                    to="/recursos/las-divisiones"
                    className="mt-4 inline-flex items-center gap-1.5 font-body text-[13px] font-bold text-primary transition-colors hover:text-primary-hover"
                  >
                    {es ? "Qué significa cada división" : "What each division means"}
                    <ArrowRight className="h-3.5 w-3.5" />
                  </LocaleLink>
                </div>
              </li>
            </ul>
          </div>
        </section>

        {/* Closing CTA */}
        <section className="section-padding bg-background">
          <div className="container-wide px-4">
            <div className="mx-auto flex max-w-2xl flex-col items-center gap-6 text-center">
              <h2 className="text-balance font-display text-3xl font-bold sm:text-4xl">
                {es ? "¿Quieres ser el " : "Want to be the "}
                <span className="italic text-primary">{es ? "siguiente" : "next one"}</span>?
              </h2>
              <p className="font-body text-base leading-relaxed text-muted-foreground sm:text-lg">
                {es
                  ? "Empieza por la evaluación gratuita. Analizamos tu perfil deportivo y académico y te decimos con claridad qué opciones reales tienes."
                  : "Start with the free evaluation. We analyse your athletic and academic profile and tell you clearly what real options you have."}
              </p>
              <LocaleLink
                to="/apply"
                className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3.5 font-body font-semibold text-primary-foreground transition-colors hover:bg-primary-hover"
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

export default Players;
