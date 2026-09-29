import { useState } from "react";
import { ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HubSpotFormModal from "@/components/HubSpotFormModal";
import { Button } from "@/components/ui/button";
import SportRouteCard, { type SportRoute } from "@/components/sports/SportRouteCard";
import fuaSportsLogo from "@/assets/fua-sports-logo.png";
import sportVolleyball from "@/assets/sport-volleyball.png";
import sportGolf from "@/assets/sport-golf.png";
import sportTennis from "@/assets/sport-tennis.png";
import sportTrack from "@/assets/sport-track.png";
import { useLanguage } from "@/contexts/LanguageContext";
import { useDocumentMeta } from "@/hooks/useDocumentMeta";

const CALENDLY = "https://calendly.com/futbolu-agency";

const FUASports = () => {
  const { language } = useLanguage();
  const es = language === "es";
  const [showHubSpotModal, setShowHubSpotModal] = useState(false);

  useDocumentMeta({
    title: "FUA Sports | Becas para Volleyball, Golf, Tenis y Atletismo – FutbolUAgency",
    description:
      "FUA Sports abre becas universitarias en USA para volleyball, golf, tenis y atletismo. Más de $4B en becas disponibles cada año.",
    ogTitle: "FUA Sports | Becas Multi-Deporte – FutbolUAgency",
  });

  const cta = es ? "Ver programa" : "View program";

  const sports: SportRoute[] = [
    {
      name: "Volleyball",
      path: "/sports/volleyball",
      image: sportVolleyball,
      imageAlt: es ? "Jugadora de voleibol en competición" : "Volleyball player in competition",
      divisions: "NCAA · NAIA",
      keyMetric: es ? "Altura y alcance" : "Height & reach",
      facts: [
        { value: "$1.8B", label: es ? "Becas anuales" : "Annual aid" },
        { value: "75–100%", label: es ? "Cobertura" : "Coverage" },
      ],
      cta,
    },
    {
      name: "Golf",
      path: "/sports/golf",
      image: sportGolf,
      imageAlt: es ? "Golfista ejecutando un swing" : "Golfer mid swing",
      divisions: "NCAA · NAIA · NJCAA",
      keyMetric: es ? "Promedio y handicap" : "Average & handicap",
      facts: [
        { value: "+1,300", label: es ? "Programas" : "Programs" },
        { value: "$2.5B", label: es ? "Becas anuales" : "Annual aid" },
      ],
      cta,
    },
    {
      name: es ? "Tenis" : "Tennis",
      path: "/sports/tennis",
      image: sportTennis,
      imageAlt: es ? "Tenista golpeando la pelota" : "Tennis player hitting the ball",
      divisions: "NCAA · NAIA · NJCAA",
      keyMetric: "UTR · ITF",
      facts: [
        { value: "100%", label: es ? "Atletas con beca" : "With scholarship" },
        { value: "75–100%", label: es ? "Cobertura" : "Coverage" },
      ],
      cta,
    },
    {
      name: "Track & Field",
      path: "/sports/track",
      image: sportTrack,
      imageAlt: es ? "Atleta corriendo en la pista" : "Athlete sprinting on the track",
      divisions: "NCAA · NAIA",
      keyMetric: es ? "Marcas oficiales" : "Official marks",
      facts: [
        { value: "+1,000", label: es ? "Programas" : "Programs" },
        { value: "$3.5B", label: es ? "Becas anuales" : "Annual aid" },
      ],
      cta,
    },
  ];

  const pillars = [
    {
      num: "01",
      title: es ? "Evaluación gratuita" : "Free evaluation",
      desc: es
        ? "Analizamos tu perfil deportivo y académico sin compromiso para decirte exactamente qué opciones tienes."
        : "We analyze your athletic and academic profile at no cost to tell you exactly what options you have.",
    },
    {
      num: "02",
      title: es ? "Red de +40 universidades" : "40+ university network",
      desc: es
        ? "Acceso directo a coaches y programas en todo EE.UU., desde D1 hasta NAIA, en todas las divisiones."
        : "Direct access to coaches and programs across the U.S., from D1 to NAIA, across all divisions.",
    },
    {
      num: "03",
      title: es ? "75–100% de beca" : "75–100% scholarship",
      desc: es
        ? "Todos nuestros atletas obtienen becas entre el 75% y el 100% de cobertura. Sin excepciones."
        : "All our athletes receive scholarships between 75% and 100% coverage. No exceptions.",
    },
  ];

  const steps = [
    {
      title: es ? "Evaluación y perfil" : "Evaluation & profile",
      desc: es
        ? "Diagnóstico gratuito de tu nivel deportivo y académico. Creamos tu perfil profesional para los coaches."
        : "Free diagnosis of your athletic and academic level. We build your professional profile for coaches.",
    },
    {
      title: es ? "Video y marcas" : "Video & marks",
      desc: es
        ? "Preparamos tus highlights y datos clave según lo que mira cada deporte: alcance, handicap, UTR o marcas."
        : "We prepare your highlights and key data for each sport: reach, handicap, UTR or marks.",
    },
    {
      title: es ? "Contacto con coaches" : "Coach outreach",
      desc: es
        ? "Contactamos directamente con entrenadores universitarios y negociamos la mejor beca posible."
        : "We contact university coaches directly and negotiate the best possible scholarship.",
    },
    {
      title: es ? "Admisión y llegada" : "Admission & arrival",
      desc: es
        ? "Gestionamos la admisión y la visa, y te acompañamos hasta que llegas a tu universidad."
        : "We manage admission and the visa, and support you until you arrive at your university.",
    },
  ];

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background">
        {/* Hero + sport routes */}
        <section className="px-4 pb-20 pt-28 md:pb-28 md:pt-36">
          <div className="container-wide mx-auto flex max-w-7xl flex-col gap-12 md:gap-16">
            <div className="grid gap-8 lg:grid-cols-[1.3fr_1fr] lg:items-end lg:gap-16">
              <div>
                <img src={fuaSportsLogo} alt="FUA Sports" className="-ml-2 mb-6 h-20 w-auto sm:h-24" />
                <h1 className="text-balance font-display text-4xl font-bold leading-[1.05] sm:text-5xl lg:text-6xl">
                  {es ? "Una metodología." : "One methodology."}{" "}
                  <span className="italic text-primary">{es ? "Cuatro deportes." : "Four sports."}</span>
                </h1>
              </div>
              <div className="flex flex-col gap-6">
                <p className="text-pretty font-body text-lg leading-relaxed text-muted-foreground">
                  {es
                    ? "FUA Sports lleva el proceso que nos ha dado un 98% de satisfacción en fútbol a volleyball, golf, tenis y atletismo. Elige tu deporte y descubre qué buscan los entrenadores."
                    : "FUA Sports brings the process that earned us 98% satisfaction in soccer to volleyball, golf, tennis and track & field. Pick your sport and see what coaches look for."}
                </p>
                <div className="flex flex-col gap-3 sm:flex-row">
                  <Button asChild size="lg" className="gap-2">
                    <a href={CALENDLY} target="_blank" rel="noopener noreferrer">
                      {es ? "Evaluación gratuita" : "Free evaluation"}
                      <ArrowRight className="h-4 w-4" />
                    </a>
                  </Button>
                  <Button asChild size="lg" variant="outline">
                    <a href="#metodo">{es ? "Cómo trabajamos" : "How we work"}</a>
                  </Button>
                </div>
              </div>
            </div>

            <div>
              <h2 className="sr-only">{es ? "Elige tu deporte" : "Choose your sport"}</h2>
              <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                {sports.map((s) => (
                  <li key={s.path}>
                    <SportRouteCard {...s} />
                  </li>
                ))}
              </ul>
            </div>

            <dl className="grid grid-cols-2 gap-y-8 border-t border-border pt-10 md:grid-cols-4">
              {[
                { v: "$4B+", l: es ? "En becas cada año" : "In scholarships yearly" },
                { v: "+3,500", l: es ? "Programas universitarios" : "University programs" },
                { v: "75–100%", l: es ? "Cobertura de beca" : "Scholarship coverage" },
                { v: "98%", l: es ? "Satisfacción" : "Satisfaction" },
              ].map((s) => (
                <div key={s.l} className="flex flex-col gap-1 md:border-l md:border-border md:pl-6 md:first:border-0 md:first:pl-0">
                  <dt className="order-2 font-body text-xs uppercase tracking-wider text-muted-foreground">{s.l}</dt>
                  <dd className="order-1 font-display text-3xl font-bold text-foreground sm:text-4xl">{s.v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* Pillars */}
        <section className="section-alt px-4 py-20 md:py-28">
          <div className="container-wide mx-auto flex max-w-6xl flex-col gap-12">
            <div className="max-w-2xl">
              <p className="mb-4 font-body text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                {es ? "¿Por qué FUA Sports?" : "Why FUA Sports?"}
              </p>
              <h2 className="text-balance font-display text-3xl font-bold sm:text-4xl md:text-5xl">
                {es ? "Resultados que se" : "Results you can"}{" "}
                <span className="italic text-primary">{es ? "pueden medir" : "measure"}</span>
              </h2>
            </div>
            <ul className="grid gap-5 md:grid-cols-3">
              {pillars.map((p) => (
                <li key={p.num} className="premium-card flex flex-col gap-4 p-8">
                  <span className="font-display text-4xl font-bold text-primary/20">{p.num}</span>
                  <h3 className="font-display text-xl font-bold">{p.title}</h3>
                  <p className="font-body text-sm leading-relaxed text-muted-foreground">{p.desc}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Method */}
        <section id="metodo" className="scroll-mt-24 bg-foreground px-4 py-20 md:py-28">
          <div className="container-wide mx-auto flex max-w-6xl flex-col gap-12">
            <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <div className="max-w-2xl">
                <p className="mb-4 font-body text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                  {es ? "Nuestra metodología" : "Our methodology"}
                </p>
                <h2 className="text-balance font-display text-3xl font-bold text-background sm:text-4xl md:text-5xl">
                  {es ? "Cuatro pasos hasta" : "Four steps to"}{" "}
                  <span className="italic text-primary">{es ? "tu universidad" : "your university"}</span>
                </h2>
              </div>
              <p className="max-w-sm font-body text-sm leading-relaxed text-background/60">
                {es
                  ? "El mismo proceso que usamos en fútbol, adaptado a cada deporte. Probado con más de 350 atletas."
                  : "The same process we use in soccer, adapted to each sport. Proven with 350+ athletes."}
              </p>
            </div>
            <ol className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {steps.map((s, i) => (
                <li key={s.title} className="flex flex-col gap-4 rounded-2xl border border-background/10 bg-background/5 p-6">
                  <span className="font-body text-xs font-semibold tabular-nums tracking-[0.2em] text-background/50">
                    {String(i + 1).padStart(2, "0")} / {String(steps.length).padStart(2, "0")}
                  </span>
                  <h3 className="font-display text-xl font-bold text-background">{s.title}</h3>
                  <p className="font-body text-sm leading-relaxed text-background/60">{s.desc}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Other sports */}
        <section className="px-4 py-20 md:py-24">
          <div className="container-wide mx-auto flex max-w-3xl flex-col items-center gap-6 text-center">
            <h2 className="text-balance font-display text-3xl font-bold sm:text-4xl">
              {es ? "¿No ves tu" : "Don't see your"} <span className="italic text-primary">{es ? "deporte?" : "sport?"}</span>
            </h2>
            <p className="text-pretty font-body text-base leading-relaxed text-muted-foreground">
              {es
                ? "Déjanos tus datos y sé el primero en saber cuando abramos nuevas disciplinas."
                : "Leave your details and be the first to know when we open new disciplines."}
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button size="lg" onClick={() => setShowHubSpotModal(true)}>
                {es ? "Notificarme" : "Notify me"}
              </Button>
              <Button asChild size="lg" variant="outline">
                <a href={CALENDLY} target="_blank" rel="noopener noreferrer">
                  {es ? "Agenda una llamada" : "Book a call"}
                </a>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <HubSpotFormModal open={showHubSpotModal} onOpenChange={setShowHubSpotModal} />
    </>
  );
};

export default FUASports;
