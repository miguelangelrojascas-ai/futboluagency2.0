import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useDocumentMeta } from "@/hooks/useDocumentMeta";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PlayerCard from "@/components/PlayerCard";
import { players, placeholderCount } from "@/data/players";

const Players = () => {
  const { language } = useLanguage();
  const es = language === "es";

  useDocumentMeta({
    title: es
      ? "Nuestros Jugadores | FutbolUAgency"
      : "Our Players | FutbolUAgency",
    description: es
      ? "Los futbolistas de FutbolUAgency que ya estudian y compiten en universidades NCAA, NAIA y NJCAA de Estados Unidos."
      : "The FutbolUAgency footballers already studying and competing at NCAA, NAIA and NJCAA universities in the United States.",
  });

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-16 md:pt-20">
        {/* Hero */}
        <section className="section-padding relative overflow-hidden bg-background">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,hsl(var(--primary)/0.07),transparent_60%)]" />
          <div className="container-wide relative px-4">
            <div className="max-w-3xl">
              <span className="mb-4 inline-block font-body text-xs font-bold uppercase tracking-[0.2em] text-primary">
                {es ? "Nuestros jugadores" : "Our players"}
              </span>
              <h1 className="mb-6 font-display text-4xl font-bold leading-[1.05] sm:text-5xl md:text-6xl">
                {es ? "Más de " : "More than "}
                <span className="italic text-primary">250 atletas</span>
                {es ? " han confiado en nosotros" : " have trusted us"}
              </h1>
              <p className="font-body text-base leading-relaxed text-muted-foreground sm:text-lg">
                {es
                  ? "Esta es la familia FUA. Cada ficha es un futbolista real al que hemos acompañado hasta el campus. No están todos: algunas familias prefieren no hacerlo público."
                  : "This is the FUA family. Every card is a real footballer we have guided all the way to campus. Not everyone is here: some families prefer to keep it private."}
              </p>
            </div>
          </div>
        </section>

        {/* Sport picker + roster */}
        <section
          className="section-padding"
          style={{ backgroundColor: "hsl(var(--section-alt))" }}
        >
          <div className="container-wide px-4">
            <div className="mb-10 max-w-2xl border-b border-border pb-6">
              <h2 className="font-display text-2xl font-bold text-foreground sm:text-3xl md:text-4xl">
                {es ? "Fútbol universitario en EE.UU." : "College soccer in the U.S."}
              </h2>
              <p className="mt-2 font-body text-[15px] leading-relaxed text-muted-foreground">
                {es
                  ? "Futbolistas que ya compiten y estudian en programas NCAA, NAIA y NJCAA."
                  : "Footballers already competing and studying in NCAA, NAIA and NJCAA programs."}
              </p>
            </div>

            <ul className="grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4 xl:grid-cols-5">
              {players.map((player) => (
                <li key={player.name}>
                  <PlayerCard player={player} />
                </li>
              ))}
              {Array.from({ length: placeholderCount }).map((_, i) => (
                <li key={`placeholder-${i}`}>
                  <PlayerCard emptyLabel={es ? "Próximamente" : "Coming soon"} />
                </li>
              ))}
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
              <Link
                to="/apply"
                className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3.5 font-body font-semibold text-primary-foreground transition-colors hover:bg-primary-hover"
              >
                {es ? "Envía tu perfil" : "Send your profile"}
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

export default Players;
