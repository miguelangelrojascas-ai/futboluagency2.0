"use client";

import Image, { type StaticImageData } from "next/image";
import { useEffect, useState } from "react";
import { ArrowRight, ArrowUpRight, Check, Play, X } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { tr } from "@/lib/i18n";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import talaveraCrest from "@/assets/spain-clubs/talavera-logo.png";
import sabadellCrest from "@/assets/spain-clubs/sabadell-crest.svg";
import extremaduraCrest from "@/assets/spain-clubs/sport-extremadura-crest.webp";
import marialvasCrest from "@/assets/spain-clubs/marialvas-crest.webp";
import primePlayMark from "@/assets/primeplay-wordmark.jpg";
import talaveraTraining from "@/assets/spain-clubs/talavera.jpg";
import tunnelPhoto from "@/assets/spain-academy.jpg";
import warmupPhoto from "@/assets/spain-warmup.jpg";
import stadiumPhoto from "@/assets/spain-stadium.jpg";
import coachingPhoto from "@/assets/spain-training.jpg";
import primePlayEvent from "@/assets/primeplay-usa-event.jpg";

/* The Spain programme's own application form. */
const APPLY_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLScXOeAxT7cjKKWiEql7DgAqDNdYJGLzASHtO_b_dLnYOKdcVA/viewform";
const PRIME_PLAY_URL = "https://primeplay.es/en/about-us/";
const LIFE_VIDEO_ID = "bSJDji1pLPA";

/* Photos for "Cómo entrenamos": one fades into the next every few seconds. */
const TRAINING_SLIDES: { src: StaticImageData | string; es: string; en: string }[] = [
  { src: warmupPhoto, es: "Calentamiento antes del entrenamiento", en: "Warm-up before training" },
  { src: stadiumPhoto, es: "Charla técnica en el estadio", en: "Team talk in the stadium" },
  { src: "/images/showcase/campo-principal.jpg", es: "Campo principal de la Ciudad Deportiva", en: "Main pitch at the sports complex" },
  { src: coachingPhoto, es: "Sesión con el cuerpo técnico", en: "Session with the coaching staff" },
  { src: "/images/showcase/ciudad-deportiva-atardecer.jpg", es: "Ciudad Deportiva al atardecer", en: "The sports complex at sunset" },
];

const TrainingSlideshow = ({ language }: { language: string }) => {
  const [active, setActive] = useState(0);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => setActive((i) => (i + 1) % TRAINING_SLIDES.length), 4500);
    return () => window.clearInterval(id);
  }, []);
  return (
    <div className="relative min-h-[22rem] overflow-hidden rounded-[1.75rem] bg-ink lg:col-span-5">
      {TRAINING_SLIDES.map((slide, i) => (
        <Image
          key={i}
          src={slide.src}
          alt={tr(language as "es", slide.es, slide.en)}
          fill
          sizes="(min-width: 1024px) 40vw, 100vw"
          aria-hidden={i !== active}
          className={`object-cover transition-[opacity,transform] duration-[1400ms] ease-out ${i === active ? "scale-100 opacity-100" : "scale-105 opacity-0"}`}
        />
      ))}
      <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/70 to-transparent" />
      <div className="absolute inset-x-6 bottom-5 flex items-end justify-between gap-4">
        <p className="label-bebas text-sm text-white/85">{tr(language as "es", TRAINING_SLIDES[active].es, TRAINING_SLIDES[active].en)}</p>
        <div className="flex shrink-0 gap-1.5">
          {TRAINING_SLIDES.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`${i + 1} / ${TRAINING_SLIDES.length}`}
              aria-current={i === active}
              className={`h-1.5 rounded-full transition-all duration-500 ${i === active ? "w-6 bg-white" : "w-1.5 bg-white/45 hover:bg-white/80"}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

/* YouTube loads only after the visitor presses play. */
const LifeVideo = ({ language }: { language: string }) => {
  const [playing, setPlaying] = useState(false);
  const title = tr(language as "es", "Así se vive el programa desde dentro", "Life on the programme, from the inside");
  return (
    <figure>
    <div className="relative aspect-video overflow-hidden rounded-[1.75rem] bg-ink">
      {playing ? (
        <iframe
          className="absolute inset-0 h-full w-full"
          src={`https://www.youtube-nocookie.com/embed/${LIFE_VIDEO_ID}?autoplay=1&rel=0`}
          title={title}
          allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
          allowFullScreen
        />
      ) : (
        <button type="button" onClick={() => setPlaying(true)} className="group absolute inset-0 h-full w-full text-left" aria-label={title}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`https://i.ytimg.com/vi/${LIFE_VIDEO_ID}/maxresdefault.jpg`}
            alt=""
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover opacity-90 transition-transform duration-700 group-hover:scale-[1.03]"
          />
          <span aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          <span className="absolute left-1/2 top-1/2 flex h-20 w-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-red-bright text-white shadow-[0_12px_40px_-8px_hsl(354_86%_50%/0.9)] transition-transform duration-300 group-hover:scale-110 sm:h-24 sm:w-24">
            <Play className="ml-1 h-8 w-8 fill-current" />
          </span>
        </button>
      )}
    </div>
    <figcaption className="mt-5 flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
      <span className="font-druk text-2xl uppercase leading-none text-ink sm:text-4xl">{title}</span>
      <span className="label-bebas text-sm text-ink/50">{tr(language as "es", "Vídeo · La experiencia de un jugador", "Video · A player's experience")}</span>
    </figcaption>
    </figure>
  );
};

const ApplyButton = ({ label, className = "" }: { label: string; className?: string }) => (
  <a
    href={APPLY_URL}
    target="_blank"
    rel="noopener noreferrer"
    className={`group inline-flex items-center gap-3 rounded-full bg-red-bright px-8 py-4 font-bebas text-xl tracking-[0.14em] text-white shadow-[0_12px_32px_-12px_hsl(354_86%_50%/0.8)] transition-colors hover:bg-primary-hover ${className}`}
  >
    {label}
    <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
  </a>
);

const Label = ({ children, dark = false }: { children: React.ReactNode; dark?: boolean }) => (
  <p className={`label-bebas mt-4 text-base ${dark ? "text-white/55" : "text-ink/50"}`}>{children}</p>
);

const Spain = () => {
  const { language } = useLanguage();
  const t = (es: string, en: string) => tr(language, es, en);

  const facts = [
    { k: t("Duración", "Length"), v: t("Temporada completa", "A full season") },
    { k: t("Edad", "Age"), v: t("16 a 23 años", "16 to 23") },
    { k: t("Base", "Base"), v: t("Talavera de la Reina, a 1 h de Madrid", "Talavera de la Reina, 1 h from Madrid") },
    { k: t("Red de clubes", "Club network"), v: t("España y Portugal", "Spain and Portugal") },
  ];

  const clubs: { name: string; place: string; crest: StaticImageData }[] = [
    { name: "CF Talavera de la Reina", place: t("Talavera de la Reina · España", "Talavera de la Reina · Spain"), crest: talaveraCrest },
    { name: "C.E. Sabadell", place: t("Sabadell · España", "Sabadell · Spain"), crest: sabadellCrest },
    { name: "Sport Extremadura", place: t("Badajoz · España", "Badajoz · Spain"), crest: extremaduraCrest },
    { name: "C.F. Os Marialvas", place: t("Portugal", "Portugal"), crest: marialvasCrest },
  ];

  const primePlay = [
    {
      image: "/images/showcase/estadio-el-prado.jpg",
      title: t("Clubes reales, no un campus", "Real clubs, not a camp"),
      body: t(
        "Prime Play invierte y gestiona clubes en España y Portugal. Por eso puedes entrar en una plantilla de verdad y competir en liga federada.",
        "Prime Play invests in and runs clubs in Spain and Portugal. That is why you can join a real squad and play in a federated league.",
      ),
    },
    {
      image: "/images/showcase/hotel.jpg",
      title: t("Residencia de élite", "Elite residence"),
      body: t(
        "Un entorno estructurado las 24 horas: alojamiento, comidas, estudio y descanso pensados para rendir.",
        "A structured environment around the clock: housing, meals, study and rest built around performance.",
      ),
    },
    {
      image: primePlayEvent,
      title: t("Puente con Estados Unidos", "A bridge to the United States"),
      body: t(
        "Prime Play es una plataforma transatlántica, con una academia en Houston de más de 3.000 jugadores. Una red que une el fútbol europeo con Estados Unidos.",
        "Prime Play is a transatlantic platform, with an academy in Houston of over 3,000 players. A network that links European football with the United States.",
      ),
    },
    {
      image: coachingPhoto,
      title: t("Desarrollo integral", "All-round development"),
      body: t(
        "Metodología deportiva, formación académica y seguimiento personalizado de cada jugador, dentro de un mismo modelo.",
        "Football methodology, education and personal follow-up for every player, within one model.",
      ),
    },
  ];

  const method = [
    {
      title: t("Entrenamiento de élite", "Elite training"),
      body: t(
        "Sesiones diarias de modelo de juego, posicionamiento y toma de decisiones bajo presión real de competición.",
        "Daily sessions focused on game model, positioning and decision-making under real competitive pressure.",
      ),
    },
    {
      title: t("Competición oficial", "Official competition"),
      body: t(
        "Ligas federadas contra equipos de nivel profesional, dentro de clubes reales. Mismo vestuario y misma liga que la plantilla.",
        "Federated leagues against professional-level teams, inside real clubs. Same dressing room and same league as the squad.",
      ),
    },
    {
      title: t("Alto rendimiento", "High performance"),
      body: t(
        "Planes físicos individualizados, prevención de lesiones y seguimiento de las métricas clave de cada jugador.",
        "Individual conditioning plans, injury prevention and tracking of each player's key metrics.",
      ),
    },
    {
      title: t("Vídeo y scouting", "Video and scouting"),
      body: t(
        "Revisión de partidos, informes individuales y exposición directa a ojeadores de clubes profesionales.",
        "Match review, individual reports and direct exposure to scouts from professional clubs.",
      ),
    },
  ];

  const trainingDay = [
    ["07:30", t("Desayuno en residencia", "Breakfast at residence")],
    ["09:00", t("Sesión táctica / vídeo", "Tactical session / video")],
    ["10:30", t("Entrenamiento en campo", "Field training")],
    ["13:00", t("Almuerzo y descanso", "Lunch & rest")],
    ["16:00", t("Gimnasio / prevención de lesiones", "Gym / injury prevention")],
    ["18:00", t("Segunda sesión técnica", "Second technical session")],
    ["20:30", t("Cena y tiempo libre", "Dinner & free time")],
  ];
  const matchDay = [
    ["08:00", t("Desayuno ligero", "Light breakfast")],
    ["09:30", t("Activación y estiramientos", "Activation & stretching")],
    ["10:30", t("Charla táctica pre-partido", "Pre-match tactical talk")],
    ["12:00", t("Comida pre-partido", "Pre-match meal")],
    ["16:00", t("Calentamiento", "Warm-up")],
    ["17:00", t("Partido oficial", "Official match")],
    ["20:00", t("Recuperación y cena", "Recovery & dinner")],
  ];

  const included = [
    [t("Residencia deportiva", "Sports residence"), t("Alojamiento durante toda la temporada", "Housing for the whole season")],
    [t("Alimentación completa", "Full meal plan"), t("Dieta deportiva supervisada por nutricionistas", "Sports diet supervised by nutritionists")],
    [t("Entrenamiento diario", "Daily training"), t("Sesiones tácticas, técnicas y físicas", "Tactical, technical and physical sessions")],
    [t("Seguro médico", "Medical insurance"), t("Cobertura médica y prevención de lesiones", "Medical cover and injury prevention")],
    [t("Seguimiento individual", "Individual follow-up"), t("Informes de rendimiento y plan de desarrollo", "Performance reports and a development plan")],
    [t("Gestión de visados", "Visa management"), t("Apoyo completo en trámites y documentación", "Full support with paperwork and documents")],
  ];

  const forYou = [
    t("Tienes entre 16 y 23 años y quieres competir en Europa", "You are 16 to 23 and want to compete in Europe"),
    t("Buscas exposición ante ojeadores y entrenadores profesionales", "You want exposure to professional scouts and coaches"),
    t("Estás dispuesto a comprometerte con una temporada de desarrollo intensivo", "You are ready to commit to a season of intensive development"),
  ];
  const notForYou = [
    t("Solo buscas hacer turismo deportivo", "You are only looking for a football holiday"),
    t("No estás dispuesto a entrenar al máximo nivel", "You are not willing to train at the highest level"),
    t("Esperas resultados sin un compromiso real", "You expect results without real commitment"),
  ];

  const partners = ["Real Valladolid CF", "Real Oviedo", "CF Fuenlabrada", "CF Badalona", "Fundació Esportiva Grama"];

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background pt-16 md:pt-20">
        {/* HERO */}
        <section className="relative isolate flex min-h-[88svh] flex-col justify-end overflow-hidden bg-ink text-white">
          <video
            autoPlay
            muted
            loop
            playsInline
            aria-hidden="true"
            className="absolute inset-0 -z-20 h-full w-full object-cover"
            src="/videos/spain-hero.mp4"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 -z-10"
            style={{
              background:
                "linear-gradient(0deg, rgba(10,10,10,0.97) 0%, rgba(10,10,10,0.7) 35%, rgba(10,10,10,0.25) 70%), linear-gradient(90deg, rgba(10,10,10,0.75) 0%, rgba(10,10,10,0) 65%)",
            }}
          />
          <div className="container-wide w-full px-4 pb-10 pt-24 sm:pb-14">
            <h1 className="max-w-5xl leading-[0.9] text-white text-[clamp(3.25rem,10vw,8.5rem)]">
              {t("Una temporada", "A season")}
              <span className="block pr-[0.08em] italic text-red-bright">{t("en el fútbol español", "in Spanish football")}</span>
            </h1>
            <Label dark>{t("Con Prime Play", "With Prime Play")}</Label>
            <p className="mt-5 max-w-md font-body text-base leading-relaxed text-white/80 sm:hidden">
              {t("Entrena, compite y vive una temporada en un club real de España o Portugal.", "Train, compete and live a full season at a real club in Spain or Portugal.")}
            </p>
            <p className="mt-6 hidden max-w-2xl font-body text-lg leading-relaxed text-white/80 sm:block">
              {t(
                "Entrenas, compites y vives dentro de un club real de España o Portugal durante toda la temporada, en uno de los entornos más exigentes del mundo para mejorar y ser visto.",
                "You train, compete and live inside a real club in Spain or Portugal for the whole season, in one of the most demanding environments in the world to improve and be seen.",
              )}
            </p>
            <ApplyButton label={t("Aplica al programa", "Apply to the programme")} className="mt-8" />

            <dl className="mt-10 grid sm:mt-14 grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 lg:grid-cols-4">
              {facts.map((f) => (
                <div key={f.k} className="bg-ink/80 px-4 py-4 backdrop-blur-sm sm:px-5 sm:py-5">
                  <dt className="label-bebas text-sm text-white/50">{f.k}</dt>
                  <dd className="mt-1 font-body text-sm font-semibold text-white sm:text-[15px]">{f.v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* THE DIFFERENCE */}
        <section className="py-24 sm:py-32">
          <div className="container-wide grid gap-12 px-4 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-7">
              <h2 className="leading-[0.92] text-ink text-[clamp(2.75rem,7.5vw,6rem)]">
                {t("Mismo vestuario.", "Same dressing room.")}
                <span className="block">{t("Misma liga.", "Same league.")}</span>
                <span className="block pr-[0.08em] italic text-primary">{t("Mismo nivel.", "Same level.")}</span>
              </h2>
              <Label>{t("Una temporada completa, no un campus de verano", "A full season, not a summer camp")}</Label>
              <p className="mt-8 max-w-[60ch] font-body text-lg leading-relaxed text-ink/70">
                {t(
                  "No es un campus ni una prueba de una semana. Te incorporas a la plantilla de un club, compites en partidos oficiales cada fin de semana y te ven ojeadores en cada jornada. Así se mide de verdad tu nivel, y así se mejora.",
                  "This is not a camp or a one-week trial. You join a club's squad, play official matches every weekend and scouts watch every round. That is how your level is really measured, and how it improves.",
                )}
              </p>
            </div>
            <div className="relative aspect-[4/5] overflow-hidden rounded-[1.75rem] lg:col-span-5">
              <Image src={tunnelPhoto} alt={t("Jugadores saliendo al campo", "Players walking out onto the pitch")} fill sizes="(min-width: 1024px) 40vw, 100vw" placeholder="blur" className="object-cover" />
            </div>
          </div>
        </section>

        {/* CLUBS */}
        <section className="bg-ink py-24 text-white sm:py-32" aria-labelledby="spain-clubs-title">
          <div className="container-wide px-4">
            <h2 id="spain-clubs-title" className="leading-[0.92] text-white text-[clamp(2.75rem,8vw,6rem)]">
              {t("Dónde vas a", "Where you will")}{" "}
              <span className="pr-[0.08em] italic text-red-bright">{t("competir", "compete")}</span>
            </h2>
            <Label dark>{t("Clubes de destino y competición · España y Portugal", "Destination and competition clubs · Spain and Portugal")}</Label>

            <ul className="mt-14 grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-5">
              {clubs.map((c) => (
                <li key={c.name} className="group relative flex flex-col items-center overflow-hidden rounded-2xl border border-white/10 bg-[radial-gradient(70%_55%_at_50%_38%,rgba(255,255,255,0.09),transparent_70%)] px-4 pb-6 pt-10 text-center transition-colors duration-300 hover:border-red-bright/50 sm:px-6 sm:pb-8 sm:pt-14">
                  <div className="relative h-28 w-28 sm:h-40 sm:w-40 lg:h-44 lg:w-44">
                    <Image
                      src={c.crest}
                      alt={t(`Escudo del ${c.name}`, `${c.name} crest`)}
                      fill
                      sizes="(min-width: 1024px) 11rem, 7rem"
                      className="object-contain drop-shadow-[0_18px_30px_rgba(0,0,0,0.55)] transition-transform duration-500 group-hover:-translate-y-1 group-hover:scale-[1.06]"
                    />
                  </div>
                  <p className="mt-8 font-body text-sm font-semibold text-white sm:text-lg">{c.name}</p>
                  <p className="label-bebas mt-1 text-xs text-white/50 sm:text-sm">{c.place}</p>
                </li>
              ))}
            </ul>

            <p className="mt-12 max-w-3xl font-body text-sm leading-relaxed text-white/50">
              <span className="text-white/75">{t("También colaboramos con: ", "We also work with: ")}</span>
              {partners.join(" · ")}
            </p>
          </div>
        </section>

        {/* PRIME PLAY */}
        <section className="py-24 sm:py-32" aria-labelledby="primeplay-title">
          <div className="container-wide px-4">
            <div className="grid gap-12 lg:grid-cols-12">
              <div className="lg:col-span-5">
                <h2 id="primeplay-title" className="leading-[0.92] text-ink text-[clamp(2.75rem,7vw,5.5rem)]">
                  {t("En alianza con", "In partnership with")}
                  <span className="block pr-[0.08em] italic text-primary">Prime Play</span>
                </h2>
                <Label>{t("Plataforma transatlántica de talento", "A transatlantic talent platform")}</Label>
                <div className="mt-8 overflow-hidden rounded-2xl bg-black">
                  <Image src={primePlayMark} alt="Prime Play" sizes="(min-width: 1024px) 30vw, 100vw" className="h-auto w-full" />
                </div>
                <p className="mt-8 max-w-[52ch] font-body text-base leading-relaxed text-ink/70 sm:text-lg">
                  {t(
                    "Prime Play crea y gestiona ecosistemas de formación futbolística (academias, residencias y clubes propios) en España, Portugal y Francia, y conecta talento a los dos lados del Atlántico. Con su red, FUA pone a cada jugador dentro de un club real y lo acompaña durante toda la temporada.",
                    "Prime Play builds and runs football development ecosystems (academies, residences and its own clubs) in Spain, Portugal and France, and connects talent on both sides of the Atlantic. Through its network, FUA places every player inside a real club and stays with them all season.",
                  )}
                </p>
                <a
                  href={PRIME_PLAY_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-flex items-center gap-2 border-b border-ink/30 pb-0.5 font-body text-sm font-semibold text-ink transition-colors hover:border-primary hover:text-primary"
                >
                  {t("Conoce Prime Play", "About Prime Play")} <ArrowUpRight className="h-4 w-4" />
                </a>
              </div>

              <ul className="grid gap-4 self-start sm:grid-cols-2 lg:col-span-6 lg:col-start-7">
                {primePlay.map((p, i) => (
                  <li
                    key={p.title}
                    tabIndex={0}
                    className="group relative isolate flex aspect-[4/5] flex-col justify-end overflow-hidden rounded-2xl bg-ink text-white outline-none ring-red-bright/70 transition-shadow duration-300 focus-visible:ring-2 sm:aspect-[3/4]"
                  >
                    <Image
                      src={p.image}
                      alt=""
                      fill
                      sizes="(min-width: 1024px) 22vw, (min-width: 640px) 45vw, 100vw"
                      className="-z-20 object-cover transition-transform duration-700 ease-out group-hover:scale-110 group-focus-visible:scale-110"
                    />
                    <span aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-t from-black/90 via-black/40 to-black/5 transition-colors duration-500 group-hover:from-black/95 group-hover:via-black/70" />
                    <span aria-hidden="true" className="absolute left-6 top-5 font-bebas text-2xl tracking-[0.1em] text-white/60 transition-colors group-hover:text-red-bright">0{i + 1}</span>
                    <div className="p-6">
                      <span aria-hidden="true" className="block h-1 w-8 rounded-full bg-red-bright transition-all duration-500 group-hover:w-16" />
                      <h3 className="mt-4 text-xl font-bold leading-tight text-white">{p.title}</h3>
                      <div className="grid grid-rows-[1fr] transition-[grid-template-rows] duration-500 ease-out [@media(hover:hover)]:grid-rows-[0fr] [@media(hover:hover)]:group-hover:grid-rows-[1fr] [@media(hover:hover)]:group-focus-visible:grid-rows-[1fr]">
                        <p className="overflow-hidden font-body text-[15px] leading-relaxed text-white/80">
                          <span className="block pt-3">{p.body}</span>
                        </p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* BASE: TALAVERA */}
        <section className="relative isolate overflow-hidden bg-ink text-white">
          <Image src={talaveraTraining} alt="" fill sizes="100vw" placeholder="blur" className="-z-20 object-cover" style={{ objectPosition: "50% 60%" }} />
          <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(10,10,10,0.95)_0%,rgba(10,10,10,0.8)_45%,rgba(10,10,10,0.3)_100%)]" />
          <div className="container-wide px-4 py-24 sm:py-32">
            <div className="max-w-2xl">
              <h2 className="leading-[0.92] text-white text-[clamp(2.75rem,7vw,5.5rem)]">
                {t("La base:", "The base:")}
                <span className="block pr-[0.08em] italic text-red-bright">{t("a una hora de Madrid", "an hour from Madrid")}</span>
              </h2>
              <Label dark>{t("CF Talavera de la Reina · Programa principal", "CF Talavera de la Reina · Main programme")}</Label>
              <div className="mt-8 space-y-4 font-body text-lg leading-relaxed text-white/80">
                <p>
                  {t(
                    "El programa principal vive en el CF Talavera de la Reina: entrenamiento diario de alto nivel, competición oficial en liga, residencia deportiva y seguimiento personalizado de cada jugador.",
                    "The main programme is based at CF Talavera de la Reina: high-level daily training, official league competition, a sports residence and personal follow-up for every player.",
                  )}
                </p>
                <p>
                  {t(
                    "Talavera es una ciudad castellana con mucha cultura futbolística, y la cercanía a la capital permite jugar torneos, amistosos y showcases ante equipos y ojeadores de primer nivel.",
                    "Talavera is a Castilian city with a deep football culture, and being close to the capital means tournaments, friendlies and showcases in front of top-level teams and scouts.",
                  )}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* METHOD */}
        <section className="py-24 sm:py-32" aria-labelledby="method-title">
          <div className="container-wide px-4">
            <h2 id="method-title" className="leading-[0.92] text-ink text-[clamp(2.75rem,7vw,5.5rem)]">
              {t("Cómo", "How we")} <span className="pr-[0.08em] italic text-primary">{t("entrenamos", "train")}</span>
            </h2>
            <Label>{t("Metodología de cantera española", "Spanish academy methodology")}</Label>
            <div className="mt-14 grid gap-12 lg:grid-cols-12">
              <ul className="divide-y divide-ink/10 border-y border-ink/10 lg:col-span-7">
                {method.map((m) => (
                  <li key={m.title} className="grid gap-2 py-7 sm:grid-cols-[14rem_1fr] sm:gap-8">
                    <h3 className="text-xl font-bold text-ink">{m.title}</h3>
                    <p className="font-body text-base leading-relaxed text-ink/65">{m.body}</p>
                  </li>
                ))}
              </ul>
              <TrainingSlideshow language={language} />
            </div>
          </div>
        </section>

        {/* A DAY */}
        <section className="bg-[#f3f1ec] py-24 sm:py-32" aria-labelledby="day-title">
          <div className="container-wide px-4">
            <h2 id="day-title" className="leading-[0.92] text-ink text-[clamp(2.75rem,7vw,5.5rem)]">
              {t("Un día", "A day")} <span className="pr-[0.08em] italic text-primary">{t("en el club", "at the club")}</span>
            </h2>
            <Label>{t("Así es la semana de un jugador del programa", "What a week looks like for a player on the programme")}</Label>
            <div className="mt-14 grid gap-6 md:grid-cols-2">
              {[
                { title: t("Día de entrenamiento", "Training day"), items: trainingDay, dark: false },
                { title: t("Día de partido", "Match day"), items: matchDay, dark: true },
              ].map((d) => (
                <div key={d.title} className={`rounded-[1.75rem] p-8 sm:p-10 ${d.dark ? "bg-ink text-white" : "bg-white text-ink"}`}>
                  <h3 className={`font-druk text-4xl uppercase leading-none ${d.dark ? "text-red-bright" : "text-ink"}`}>{d.title}</h3>
                  <ol className="mt-8 space-y-4">
                    {d.items.map(([time, label]) => (
                      <li key={time + label} className="grid grid-cols-[4.5rem_1fr] items-baseline gap-4">
                        <span className={`font-bebas text-xl tracking-[0.08em] ${d.dark ? "text-white/50" : "text-primary"}`}>{time}</span>
                        <span className={`font-body text-base ${d.dark ? "text-white/85" : "text-ink/80"}`}>{label}</span>
                      </li>
                    ))}
                  </ol>
                </div>
              ))}
            </div>
            <div className="mt-6">
              <LifeVideo language={language} />
            </div>
          </div>
        </section>

        {/* INCLUDED + FIT */}
        <section className="py-24 sm:py-32" aria-labelledby="included-title">
          <div className="container-wide px-4">
            <h2 id="included-title" className="leading-[0.92] text-ink text-[clamp(2.75rem,7vw,5.5rem)]">
              {t("Todo", "Everything")} <span className="pr-[0.08em] italic text-primary">{t("incluido", "included")}</span>
            </h2>
            <Label>{t("Tú solo te preocupas de jugar", "All you have to do is play")}</Label>
            <ul className="mt-14 grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
              {included.map(([title, body]) => (
                <li key={title} className="flex gap-4">
                  <Check aria-hidden="true" className="mt-1 h-5 w-5 shrink-0 text-primary" />
                  <div>
                    <h3 className="text-lg font-bold text-ink">{title}</h3>
                    <p className="mt-1 font-body text-[15px] leading-relaxed text-ink/65">{body}</p>
                  </div>
                </li>
              ))}
            </ul>

            <div className="mt-20 grid gap-6 md:grid-cols-2">
              <div className="rounded-[1.75rem] bg-ink p-8 text-white sm:p-10">
                <h3 className="font-druk text-4xl uppercase leading-none text-white">
                  {t("Es para ti", "It is for you")} <span className="italic text-red-bright">{t("si…", "if…")}</span>
                </h3>
                <ul className="mt-8 space-y-4">
                  {forYou.map((x) => (
                    <li key={x} className="flex gap-3 font-body text-base text-white/85">
                      <Check aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 text-red-bright" />
                      {x}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-[1.75rem] border border-ink/10 p-8 sm:p-10">
                <h3 className="font-druk text-4xl uppercase leading-none text-ink">
                  {t("No es para ti", "It is not for you")} <span className="italic text-ink/40">{t("si…", "if…")}</span>
                </h3>
                <ul className="mt-8 space-y-4">
                  {notForYou.map((x) => (
                    <li key={x} className="flex gap-3 font-body text-base text-ink/70">
                      <X aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 text-ink/35" />
                      {x}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* CLOSE */}
        <section className="relative isolate overflow-hidden bg-ink py-24 text-white sm:py-32">
          <div
            aria-hidden="true"
            className="absolute inset-0 -z-10"
            style={{ background: "radial-gradient(45% 70% at 85% 90%, hsl(354 86% 45% / 0.45), transparent 70%)" }}
          />
          <div className="container-wide px-4">
            <h2 className="max-w-4xl leading-[0.92] text-white text-[clamp(3rem,9vw,7rem)]">
              {t("Tu temporada", "Your season")}
              <span className="block pr-[0.08em] italic text-red-bright">{t("empieza aquí", "starts here")}</span>
            </h2>
            <p className="mt-6 max-w-xl font-body text-lg leading-relaxed text-white/75">
              {t(
                "Plazas limitadas por temporada. El proceso comienza con una evaluación gratuita de tu perfil.",
                "Limited places each season. It all starts with a free evaluation of your profile.",
              )}
            </p>
            <ApplyButton label={t("Aplica al programa", "Apply to the programme")} className="mt-10" />
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
};

export default Spain;
