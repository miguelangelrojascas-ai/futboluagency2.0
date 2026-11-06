"use client";

import Image from "next/image";
import LocaleLink from "@/components/LocaleLink";
import {
  ArrowRight,
  CalendarDays,
  Check,
  Mail,
  MapPin,
  Navigation,
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { LocationMap } from "@/components/ui/expanded-map";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useCountUp } from "@/hooks/useCountUp";

/* Ciudad Deportiva (Ébora Formación), P.I. Soto de Cazalegas, Talavera. */
const VENUE = { lat: 39.97637, lng: -4.74797 };
const VENUE_LATLNG = `${VENUE.lat},${VENUE.lng}`;
/* Coordinates rather than a place name, so Google always drops the pin. */
const MAPS_LINK = `https://www.google.com/maps/search/?api=1&query=${VENUE_LATLNG}`;
const MAPS_FROM_AIRPORT = `https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(
  "Aeropuerto Adolfo Suárez Madrid-Barajas",
)}&destination=${VENUE_LATLNG}&travelmode=driving`;

const COACH_EMAIL = "futboluagency@gmail.com";

const eyebrow = "inline-block font-body text-xs font-bold uppercase tracking-[0.2em] text-primary";
/* FUA red is too dark to read on black; dark sections use a lighter red. */
const eyebrowDark = "inline-block font-body text-xs font-bold uppercase tracking-[0.2em] text-red-500";
const h2 = "font-display text-3xl font-bold leading-[1.1] sm:text-4xl md:text-5xl";

/** Same count-up number as the home metrics strip. */
const StatValue = ({ value, label }: { value: number; label: string }) => {
  const { count, ref } = useCountUp(value, 1800);
  return (
    <div ref={ref} className="text-center">
      <div className="mb-1 font-display text-3xl font-bold italic text-primary sm:text-4xl lg:text-5xl">{count}</div>
      <p className="font-body text-xs text-muted-foreground sm:text-sm">{label}</p>
    </div>
  );
};

const Showcase = () => {
  const { language } = useLanguage();
  const es = language === "es";

  const coachMail = `mailto:${COACH_EMAIL}?subject=${encodeURIComponent(
    es ? "Showcase Talavera 2027 – Confirmo asistencia" : "Showcase Talavera 2027 – Attendance",
  )}`;

  const facts = [
    {
      icon: CalendarDays,
      label: es ? "Cuándo" : "When",
      value: es ? "1, 2 y 3 de febrero de 2027" : "February 1, 2 & 3, 2027",
    },
    {
      icon: MapPin,
      label: es ? "Dónde" : "Where",
      value: es ? "Talavera de la Reina · a 1h30 de Madrid" : "Talavera de la Reina · 90 min from Madrid",
    },
  ];

  const stats = [
    { value: 60, label: es ? "Jugadores en el showcase" : "Players on show" },
    { value: 45, label: es ? "De clubes españoles" : "From Spanish clubs" },
    { value: 15, label: es ? "De MLS NEXT (EE.UU.)" : "From MLS NEXT (USA)" },
    { value: 3, label: es ? "Días de evaluación en directo" : "Days of live evaluation" },
  ];

  const tiers = [
    {
      name: "División de Honor",
      desc: es
        ? "La máxima categoría regional del fútbol amateur español: la vía directa hacia la pirámide profesional."
        : "The top regional tier of Spanish amateur football — the direct pipeline into the professional pyramid.",
    },
    {
      name: "Segunda RFEF",
      desc: es
        ? "Cuarta categoría nacional: fútbol estructurado, competitivo y bien entrenado."
        : "Spain's fourth national tier — structured, competitive, well-coached.",
    },
    {
      name: "Tercera RFEF",
      desc: es
        ? "Quinta categoría nacional: cantera probada de jugadores técnicos y preparados físicamente."
        : "Spain's fifth national tier — a proven source of technically sharp, physically ready prospects.",
    },
    {
      name: "MLS NEXT (USA)",
      desc: es
        ? "15 jugadores de la academia GFI Houston (Texas), uno de los mejores circuitos formativos de EE.UU., que viajan a España para este showcase."
        : "15 players from the GFI Houston academy (Texas), one of the top youth circuits in the U.S., traveling to Spain for this Showcase.",
    },
  ];

  const P = "/images/showcase";
  const days = [
    {
      tag: es ? "Llegada (opcional)" : "Arrival (optional)",
      title: es ? "Domingo o lunes" : "Sunday or Monday",
      image: { src: `${P}/hotel.jpg`, alt: es ? "Habitación del Talavera Hotel" : "Talavera Hotel room" },
      items: es
        ? [
            "Domingo 31 ene por la tarde: recogida en el aeropuerto, traslado y check-in para quien prefiera llegar un día antes.",
            "Lunes 1 feb por la mañana: recogida, traslado y check-in para quien llegue el día de la apertura.",
            "Tiempo libre antes de la presentación oficial.",
          ]
        : [
            "Sunday, Jan 31 afternoon: airport pickup, hotel transfer and check-in for coaches arriving a day early.",
            "Monday, Feb 1 morning: pickup, transfer and check-in for coaches arriving on opening day.",
            "Free time before the official presentation.",
          ],
    },
    {
      tag: es ? "Día uno · 1 feb" : "Day one · Feb 1",
      title: es ? "Lunes" : "Monday",
      image: { src: `${P}/presentacion-familias.jpg`, alt: es ? "Presentación del showcase a las familias en la edición anterior" : "Showcase presentation to families at the last edition" },
      items: es
        ? [
            "Tarde: presentación oficial del evento en la Ciudad Deportiva, con catering de bienvenida.",
            "Cena: catering en la Ciudad Deportiva.",
            "Traslado de vuelta al hotel.",
          ]
        : [
            "Afternoon: official presentation at the Ciudad Deportiva, with welcome catering.",
            "Dinner: catering at the Ciudad Deportiva.",
            "Transfer back to the hotel.",
          ],
    },
    {
      tag: es ? "Día dos · 2 feb" : "Day two · Feb 2",
      title: es ? "Martes" : "Tuesday",
      image: { src: `${P}/campo-principal.jpg`, alt: es ? "Campo de partido de la Ciudad Deportiva" : "Ciudad Deportiva match pitch" },
      items: es
        ? [
            "9:00 – 17:00: unos 6 partidos en la Ciudad Deportiva. Los 60 jugadores juegan a lo largo del día.",
            "Comida en la Ciudad Deportiva.",
            "Cena en un restaurante de Talavera.",
          ]
        : [
            "9:00 AM – 5:00 PM: around 6 Showcase matches at the Ciudad Deportiva. All 60 players feature across the day.",
            "Lunch at the Ciudad Deportiva.",
            "Dinner at a restaurant in Talavera.",
          ],
    },
    {
      tag: es ? "Día tres · 3 feb" : "Day three · Feb 3",
      title: es ? "Miércoles" : "Wednesday",
      image: { src: `${P}/clubhouse.jpg`, alt: es ? "Clubhouse de la Ciudad Deportiva" : "Ciudad Deportiva clubhouse" },
      items: es
        ? [
            "9:00 – 14:00: conversaciones entre los entrenadores y los jugadores que les interesan.",
            "Comida de cierre en la Ciudad Deportiva.",
          ]
        : [
            "9:00 AM – 2:00 PM: informal conversations between coaches and the players who interest them.",
            "Closing lunch at the Ciudad Deportiva.",
          ],
    },
  ];

  const gallery = [
    { src: "/images/showcase/campo-principal.jpg", label: es ? "Campo de partido" : "Match pitch" },
    { src: "/images/showcase/campo-grada.jpg", label: es ? "Campo y grada" : "Pitch & stands" },
    { src: "/images/showcase/terraza.jpg", label: es ? "Terraza exterior" : "Outdoor terrace" },
    { src: "/images/showcase/ciudad-deportiva-atardecer.jpg", label: es ? "Las instalaciones al atardecer" : "The grounds at dusk" },
    { src: "/images/showcase/clubhouse.jpg", label: es ? "Clubhouse de la Ciudad Deportiva" : "Ciudad Deportiva clubhouse" },
    { src: "/images/showcase/estadio-el-prado.jpg", label: es ? "Estadio El Prado, Talavera" : "Estadio El Prado, Talavera" },
  ];

  const coachPack = es
    ? [
        ["2 noches en el Talavera Hotel (★★★)", "habitación doble superior de uso individual, con desayuno."],
        ["Comidas y cenas", "durante toda la estancia, incluido el catering de bienvenida."],
        ["Transporte", "traslados desde y hasta el aeropuerto y todos los desplazamientos locales."],
        ["Una persona de contacto", "durante toda la visita, para lo que necesites."],
      ]
    : [
        ["2 nights at the Talavera Hotel (★★★)", "superior double room, single occupancy, breakfast included."],
        ["Meals", "lunches and dinners for the full stay, including welcome catering."],
        ["Ground transport", "airport transfers and all local transportation."],
        ["A dedicated point of contact", "throughout your visit, for anything you need."],
      ];

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-16 md:pt-20">
        {/* ── Hero ─────────────────────────────────────────── */}
        <section className="relative overflow-hidden bg-footer-dark">
          <Image
            src="/images/showcase/campo-grada.jpg"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-50"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/30" />
          <div className="container-wide relative px-4 sm:px-6 pb-14 pt-20 text-center md:pb-20 md:pt-32">
            <h1
              className="hero-reveal mx-auto max-w-4xl font-display text-4xl leading-[1.05] text-white sm:text-5xl md:text-7xl"
              style={{ fontWeight: 800, animationDelay: "80ms" }}
            >
              Showcase <span className="text-red-600 italic">Talavera</span> 2027
            </h1>
            <p
              className="hero-reveal mx-auto mt-6 max-w-2xl font-body text-base leading-relaxed text-white/80 sm:text-lg"
              style={{ animationDelay: "160ms" }}
            >
              {es
                ? "Tres días de fútbol en directo ante entrenadores universitarios de Estados Unidos. 60 jugadores de España y EE.UU., a hora y media de Madrid."
                : "Three days of live football in front of U.S. college coaches. 60 players from Spain and the U.S., ninety minutes from Madrid."}
            </p>
            <ul
              className="hero-reveal mt-6 flex flex-col items-center gap-2 font-body text-sm font-semibold text-white sm:flex-row sm:flex-wrap sm:justify-center sm:gap-x-6 sm:text-base"
              style={{ animationDelay: "200ms" }}
            >
              {facts.map(({ icon: Icon, label, value }) => (
                <li key={label} className="inline-flex items-center gap-2">
                  <Icon className="h-4 w-4 shrink-0 text-red-500" aria-label={label} />
                  {value}
                </li>
              ))}
            </ul>
            <div
              className="hero-reveal mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center"
              style={{ animationDelay: "240ms" }}
            >
              <LocaleLink
                to="/apply"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-7 py-3.5 font-body font-semibold text-white transition-colors hover:bg-primary-hover"
              >
                {es ? "Soy jugador: quiero participar" : "I'm a player: I want in"}
                <ArrowRight className="h-4 w-4" />
              </LocaleLink>
              <a
                href="#coaches"
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/30 px-7 py-3.5 font-body font-semibold text-white transition-colors hover:bg-white/10"
              >
                {es ? "Soy coach: ver el Coach Pack" : "I'm a coach: see the Coach Pack"}
              </a>
            </div>

            <p className="mt-10 font-body text-xs uppercase tracking-[0.15em] text-white/50">
              {es ? "Organiza FutbolUAgency · Con PrimePlay" : "Organized by FutbolUAgency · With PrimePlay"}
            </p>
          </div>
        </section>

        {/* ── Authority numbers (same strip as the home) ────── */}
        <section className="relative bg-[hsl(var(--section-alt))] py-6 sm:py-8 md:py-12">
          <div className="absolute inset-x-0 top-0 h-px bg-foreground/[0.04]" />
          <div className="container-wide px-4">
            <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4 lg:gap-12">
              {stats.map((st) => (
                <StatValue key={st.label} value={st.value} label={st.label} />
              ))}
            </div>
          </div>
        </section>

        {/* ── Last edition video ───────────────────────────── */}
        <section id="edicion-anterior" className="section-padding scroll-mt-24">
          <div className="container-wide grid items-center gap-12 md:grid-cols-[1fr_auto] lg:gap-20">
            <div className="max-w-xl">
              <span className={eyebrow}>{es ? "Edición anterior" : "Last edition"}</span>
              <h2 className={`${h2} mt-4`}>
                {es ? "Así se vive el " : "What the "}
                <span className="text-primary italic">showcase</span>
                {es ? "" : " looks like"}
              </h2>
              <p className="mt-5 font-body text-base leading-relaxed text-muted-foreground sm:text-lg">
                {es
                  ? "La última edición, en la Ciudad Deportiva de Talavera: jugadores compitiendo en partidos reales mientras los entrenadores evalúan en el campo. Este año crecemos: más jugadores, dos países y tres días completos."
                  : "Our last edition, at the Ciudad Deportiva in Talavera: players competing in real matches while coaches evaluate pitch-side. This year it grows: more players, two countries and three full days."}
              </p>
              <ul className="mt-8 space-y-3">
                {(es
                  ? [
                      "Partidos completos, no pruebas sueltas.",
                      "Entrenadores universitarios evaluando en directo.",
                      "Un día entero para hablar cara a cara con ellos.",
                    ]
                  : [
                      "Full matches, not isolated drills.",
                      "College coaches evaluating live.",
                      "A full day to talk with them face to face.",
                    ]
                ).map((item) => (
                  <li key={item} className="flex items-start gap-3 font-body text-sm text-foreground sm:text-base">
                    <Check className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mx-auto w-full max-w-[360px]">
              <div className="relative overflow-hidden rounded-2xl bg-black shadow-card">
                <video
                  className="aspect-[9/16] w-full object-cover"
                  src="/videos/showcase-2026.mp4"
                  poster="/videos/showcase-2026-poster.jpg"
                  controls
                  playsInline
                  preload="none"
                  aria-label={es ? "Vídeo de la edición anterior del showcase" : "Video of the last Showcase edition"}
                />
              </div>
            </div>
          </div>
        </section>

        {/* ── The talent ───────────────────────────────────── */}
        <section className="section-padding section-alt">
          <div className="container-wide">
            <span className={eyebrow}>{es ? "El talento" : "The talent"}</span>
            <h2 className={`${h2} mt-4 max-w-3xl`}>
              {es ? "60 jugadores. España y EE.UU. " : "60 players. Spain and the U.S. "}
              <span className="text-primary italic">{es ? "Una sola ventana." : "One scouting window."}</span>
            </h2>
            <p className="mt-5 max-w-2xl font-body text-base leading-relaxed text-muted-foreground sm:text-lg">
              {es
                ? "No lo hemos montado alrededor de una sola categoría ni de un solo país: 45 jugadores de tres niveles del fútbol español y 15 de MLS NEXT llegados desde Estados Unidos, evaluados en la misma ventana."
                : "We didn't build it around one division or one country: 45 players from three tiers of Spanish football plus 15 MLS NEXT players from the U.S., all evaluated in the same window."}
            </p>

            <dl className="mt-12 divide-y divide-border border-y border-border">
              {tiers.map((tier) => (
                <div key={tier.name} className="grid gap-1 py-5 md:grid-cols-[220px_1fr] md:gap-8">
                  <dt className="font-body text-base font-bold text-foreground">{tier.name}</dt>
                  <dd className="font-body text-sm leading-relaxed text-muted-foreground sm:text-base">{tier.desc}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* ── Location ─────────────────────────────────────── */}
        <section id="ubicacion" className="section-padding scroll-mt-24">
          <div className="container-wide grid gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <span className={eyebrow}>{es ? "La ubicación" : "The location"}</span>
              <h2 className={`${h2} mt-4`}>
                {es ? "A un paso de " : "A short trip from "}
                <span className="text-primary italic">Madrid</span>
              </h2>
              <p className="mt-5 font-body text-base leading-relaxed text-muted-foreground sm:text-lg">
                {es
                  ? "Talavera de la Reina está a unos 130 km —hora y media por carretera— del aeropuerto Adolfo Suárez Madrid-Barajas, uno de los mejor conectados de Europa. Aterrizas por la mañana y esa misma tarde estás viendo fútbol."
                  : "Talavera de la Reina is about 130 km — 90 minutes by road — from Madrid–Barajas Airport, one of Europe's best-connected hubs. Land in the morning and you can be watching football that same afternoon."}
              </p>

              <div className="mt-8 grid grid-cols-3 gap-3">
                {[
                  { v: "130 km", l: es ? "Desde Madrid" : "From Madrid" },
                  { v: "~90 min", l: es ? "Por carretera" : "By road" },
                  { v: "MAD", l: es ? "Aeropuerto Barajas" : "Barajas airport" },
                ].map((s) => (
                  <div key={s.v} className="rounded-xl border border-border border-b-4 border-b-primary bg-card px-3 py-4 text-center">
                    <p className="font-body text-lg font-bold text-foreground sm:text-2xl">{s.v}</p>
                    <p className="mt-1 font-body text-[10px] uppercase tracking-[0.12em] text-muted-foreground sm:text-xs">{s.l}</p>
                  </div>
                ))}
              </div>

              <ul className="mt-8 space-y-3">
                {(es
                  ? [
                      "Vuelos directos a Madrid desde los principales aeropuertos de EE.UU.",
                      "Nos encargamos de los traslados puerta a puerta: sin coche de alquiler ni logística.",
                      "Una ciudad castellana histórica, a orillas del Tajo, con mucha cultura futbolística.",
                    ]
                  : [
                      "Direct flights to Madrid from most major U.S. hubs.",
                      "We handle airport transfers door to door — no rental car, no logistics.",
                      "A historic Castilian city on the Tagus River, with a deep football culture.",
                    ]
                ).map((item) => (
                  <li key={item} className="flex items-start gap-3 font-body text-sm text-foreground sm:text-base">
                    <Check className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                    {item}
                  </li>
                ))}
              </ul>

            </div>

            <div className="flex flex-col">
              <div className="bg-texture-subtle flex min-h-[300px] items-center justify-center rounded-2xl border border-border bg-muted/40 p-4 sm:min-h-[420px]">
              <LocationMap
                location="Ciudad Deportiva · Talavera de la Reina"
                latitude={VENUE.lat}
                longitude={VENUE.lng}
                zoom={13}
                hint={es ? "Toca para abrir" : "Tap to open"}
                closeLabel={es ? "Cerrar mapa" : "Close map"}
                mapsUrl={MAPS_LINK}
                mapsLabel={es ? "Abrir en Google Maps" : "Open in Google Maps"}
                expandedWidth={520}
                expandedHeight={380}
              />
              </div>
              <p className="mt-4 flex items-start gap-2 font-body text-sm text-muted-foreground">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                Polígono Sector VI, 45683 Cazalegas (Talavera de la Reina), Toledo
              </p>
              <div className="mt-4 flex flex-col gap-3 sm:flex-row">
                <a
                  href={MAPS_FROM_AIRPORT}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-lg border border-border px-5 py-3 font-body text-sm font-semibold text-foreground transition-colors hover:bg-muted"
                >
                  <Navigation className="h-4 w-4" />
                  {es ? "Ruta desde el aeropuerto" : "Route from the airport"}
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ── Schedule ─────────────────────────────────────── */}
        <section id="programa" className="section-padding section-alt scroll-mt-24">
          <div className="container-wide">
            <span className={eyebrow}>{es ? "Programa" : "Full schedule"}</span>
            <h2 className={`${h2} mt-4 max-w-3xl`}>
              {es ? "Tres días pensados para " : "Every hour, built for "}
              <span className="text-primary italic">{es ? "evaluar" : "evaluation"}</span>
            </h2>
            <p className="mt-5 max-w-2xl font-body text-base leading-relaxed text-muted-foreground sm:text-lg">
              {es
                ? "Del aterrizaje a la última conversación con los jugadores. Para los entrenadores todo está incluido: traslados, hotel y comidas."
                : "From landing to the last conversation with players. For coaches everything is covered: transfers, hotel and every meal."}
            </p>

            <ol className="mt-12 grid gap-5 md:grid-cols-2 md:gap-6">
              {days.map((d) => (
                <li key={d.tag} className="flex flex-col rounded-[2rem] bg-card p-2 shadow-card">
                  <div className="relative aspect-[4/3] overflow-hidden rounded-[1.5rem] bg-muted">
                    <Image
                      src={d.image.src}
                      alt={d.image.alt}
                      fill
                      sizes="(min-width: 768px) 50vw, 100vw"
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 px-5 pb-6 pt-6 md:px-8 md:pb-8">
                    <p className="font-body text-xs font-semibold uppercase tracking-[0.18em] text-primary sm:text-sm">{d.tag}</p>
                    <h3 className="mt-2 font-display text-2xl font-bold sm:text-3xl">{d.title}</h3>
                    <ul className="mt-4 space-y-3">
                      {d.items.map((item) => (
                        <li key={item} className="font-body text-sm leading-relaxed text-muted-foreground sm:text-base">
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ── Facility gallery ─────────────────────────────── */}
        <section className="section-padding">
          <div className="container-wide">
            <span className={eyebrow}>{es ? "Las instalaciones" : "The facility"}</span>
            <h2 className={`${h2} mt-4 max-w-3xl`}>
              {es ? "Tres días de fútbol en una " : "A first-class home for "}
              <span className="text-primary italic">{es ? "casa de primera" : "three days of football"}</span>
            </h2>
            <p className="mt-5 max-w-2xl font-body text-base leading-relaxed text-muted-foreground sm:text-lg">
              {es
                ? "La Ciudad Deportiva de Talavera acoge los partidos, las pruebas y las comidas: campos modernos, clubhouse propio y espacio pensado para este tipo de evento."
                : "Talavera's Ciudad Deportiva hosts the matches, testing and meals: modern pitches, a dedicated clubhouse and space built for exactly this kind of event."}
            </p>

            <Carousel opts={{ align: "start", loop: true }} className="mt-12">
              <CarouselContent className="-ml-3 md:-ml-4">
                {gallery.map((g) => (
                  <CarouselItem key={g.src} className="basis-[85%] pl-3 sm:basis-1/2 md:pl-4 lg:basis-1/3">
                    <figure>
                      <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-muted">
                        <Image
                          src={g.src}
                          alt={g.label}
                          fill
                          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 85vw"
                          className="object-cover"
                          draggable={false}
                        />
                      </div>
                      <figcaption className="mt-3 font-body text-[11px] uppercase tracking-[0.12em] text-muted-foreground sm:text-xs">
                        {g.label}
                      </figcaption>
                    </figure>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <div className="mt-6 flex justify-end gap-2">
                <CarouselPrevious className="static h-11 w-11 translate-y-0" />
                <CarouselNext className="static h-11 w-11 translate-y-0" />
              </div>
            </Carousel>
          </div>
        </section>

        {/* ── Coaches ──────────────────────────────────────── */}
        <section id="coaches" className="section-padding section-alt scroll-mt-24">
          <div className="container-wide grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
            <div>
              <span className={eyebrow}>{es ? "Para entrenadores" : "For coaches"}</span>
              <h2 className={`${h2} mt-4`}>
                {es ? "Tú te centras en " : "You focus on "}
                <span className="text-primary italic">{es ? "evaluar" : "scouting"}</span>
                {es ? ". Del resto nos ocupamos nosotros." : ". We handle the rest."}
              </h2>
              <p className="mt-5 font-body text-base leading-relaxed text-muted-foreground sm:text-lg">
                {es
                  ? "La invitación cubre hotel, comidas y transporte durante la visita estándar de 3 días y 2 noches."
                  : "Your invitation covers hotel, meals and ground transport for the standard 3-day / 2-night visit."}
              </p>

              <ul className="mt-8 divide-y divide-border border-y border-border">
                {coachPack.map(([title, desc]) => (
                  <li key={title} className="flex gap-3 py-4 font-body text-sm leading-relaxed text-muted-foreground sm:text-base">
                    <Check className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                    <span>
                      <strong className="font-semibold text-foreground">{title}</strong> — {desc}
                    </span>
                  </li>
                ))}
              </ul>

              <div className="mt-8 grid grid-cols-2 gap-3">
                {[
                  { src: "/images/showcase/hotel.jpg", alt: es ? "Habitación del Talavera Hotel" : "Talavera Hotel room" },
                  { src: "/images/showcase/comedor.jpg", alt: es ? "Comedor de la Ciudad Deportiva" : "Ciudad Deportiva dining room" },
                ].map((img) => (
                  <div key={img.src} className="relative aspect-[4/3] overflow-hidden rounded-xl bg-muted">
                    <Image src={img.src} alt={img.alt} fill sizes="(min-width: 1024px) 25vw, 50vw" className="object-cover" />
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:pt-10">
              <div className="rounded-3xl border border-border border-t-4 border-t-primary bg-card p-8 text-center shadow-card md:p-10">
                <p className="font-body text-xs font-bold uppercase tracking-[0.2em] text-primary">Coach Pack</p>
                <p className="mt-3 font-display text-6xl font-bold text-foreground md:text-7xl">550 €</p>
                <p className="mt-3 font-body text-sm text-muted-foreground">
                  {es ? "2 noches de hotel · comidas y cenas · transporte" : "2 nights hotel · meals & dinners · ground transport"}
                </p>
                <a
                  href={coachMail}
                  className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3.5 font-body font-semibold text-white transition-colors hover:bg-primary-hover"
                >
                  <Mail className="h-4 w-4" />
                  {es ? "Confirmar asistencia" : "Confirm your attendance"}
                </a>
                <p className="mt-4 font-body text-xs text-muted-foreground">{COACH_EMAIL}</p>
              </div>
              <p className="mt-5 rounded-xl border-l-4 border-amber-400 bg-amber-50 p-4 font-body text-sm leading-relaxed text-amber-950">
                {es ? (
                  <>
                    La visita estándar termina el miércoles después de comer. Si tu vuelo lo requiere, añadimos una noche más y sales el jueves;
                    esa noche <strong>no está incluida</strong> en el Coach Pack y te confirmamos el precio antes de reservarla.
                  </>
                ) : (
                  <>
                    The standard visit ends Wednesday after lunch. If your flight requires it, we can add a night and you leave Thursday; that
                    night is <strong>not included</strong> in the Coach Pack and we'll confirm the cost before booking it.
                  </>
                )}
              </p>
              <p className="mt-5 font-body text-sm leading-relaxed text-muted-foreground">
                {es
                  ? "Al confirmar, cuéntanos qué posiciones o perfiles buscas y te preparamos notas de scouting antes de que llegues."
                  : "When you confirm, tell us which positions or profiles you're prioritizing and we'll prepare scouting notes before you arrive."}
              </p>
            </div>
          </div>
        </section>

        {/* ── Players CTA ──────────────────────────────────── */}
        <section className="section-padding">
          <div className="container-wide">
            <div className="relative overflow-hidden rounded-3xl bg-footer-dark px-6 py-14 sm:px-10 md:px-16 md:py-20">
              <Image
                src="/images/showcase/campo-principal.jpg"
                alt=""
                fill
                sizes="100vw"
                className="object-cover opacity-30"
              />
              <div className="relative max-w-2xl">
                <span className={eyebrowDark}>{es ? "Jugadores" : "Players"}</span>
                <h2 className={`${h2} mt-4 text-white`}>
                  {es ? "¿Quieres jugar el showcase?" : "Want to play in the Showcase?"}
                </h2>
                <p className="mt-5 font-body text-base leading-relaxed text-white/75 sm:text-lg">
                  {es
                    ? "El showcase es solo por invitación. Envíanos tu perfil: lo revisamos y, si encajas, te contamos cómo participar."
                    : "The Showcase is by invitation only. Send us your profile: we review it and, if you're a fit, we'll tell you how to take part."}
                </p>
                <LocaleLink
                  to="/apply"
                  className="mt-8 inline-flex items-center gap-2 rounded-lg bg-primary px-7 py-3.5 font-body font-semibold text-white transition-colors hover:bg-primary-hover"
                >
                  {es ? "Envía tu perfil" : "Send your profile"}
                  <ArrowRight className="h-4 w-4" />
                </LocaleLink>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
};

export default Showcase;
