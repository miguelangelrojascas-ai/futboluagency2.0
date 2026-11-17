"use client";

import { useEffect, useState } from "react";
import Image, { type StaticImageData } from "next/image";
import { X } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { pick, type Copy } from "@/lib/i18n";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import YouTubeEmbed from "@/components/YouTubeEmbed";
import HomeCta from "@/components/home/HomeCta";
import teamHuddle from "@/assets/team-header-bg.jpg";
import ignacioPhoto from "@/assets/team/ignacio.webp";
import miguelPhoto from "@/assets/team/miguel.webp";

/*
 * Photos: only real ones. The studio portraits that used to be here were
 * AI-generated and are gone; each person shows their initials until a real
 * photo is added as `photo` (put the file in src/assets/team/). Ignacio's and
 * Miguel's are real photos with the background removed (from FUA's Canva files).
 * Moha's photo is from the FUA Showcase presentation to families.
 */
const MOHA_SHOWCASE = "/images/showcase/presentacion-familias.jpg";

type Person = {
  name: string;
  initials: string;
  role: Copy;
  photo?: string | StaticImageData;
  position?: string;
  instagram?: string;
  bio?: Copy<string[]>;
};

const FOUNDERS: Person[] = [
  {
    name: "Ignacio De Bejar",
    initials: "ID",
    photo: ignacioPhoto,
    position: "50% 8%",
    role: { es: "Cofundador y CEO", en: "Co-founder & CEO", it: "Cofondatore e CEO", de: "Mitgründer & CEO" },
    instagram: "https://www.instagram.com/ignacio_futboluagency/",
    bio: {
      es: [
        "Se formó en el Hércules CF y dio el salto a Estados Unidos para seguir jugando y estudiar. La agencia que debía acompañarlo no cumplió lo prometido.",
        "Se encontró solo en un país nuevo, con rechazos y trámites que tuvo que resolver por su cuenta mientras buscaba una universidad donde crecer como atleta y estudiante.",
        "Hoy pone esa experiencia y su conocimiento del sistema universitario al servicio de cada jugador, paso a paso, hasta una beca real.",
      ],
      en: [
        "He came through Hércules CF and made the jump to the United States to keep playing and study. The agency that was supposed to support him did not deliver.",
        "He found himself alone in a new country, facing rejections and paperwork he had to solve on his own while looking for a university where he could grow as an athlete and a student.",
        "Today he puts that experience and his knowledge of the college system to work for every player, step by step, all the way to a real scholarship.",
      ],
      it: [
        "Si è formato nell'Hércules CF ed è partito per gli Stati Uniti per continuare a giocare e studiare. L'agenzia che doveva seguirlo non ha mantenuto le promesse.",
        "Si è ritrovato solo in un paese nuovo, tra rifiuti e pratiche da risolvere da solo, mentre cercava un'università dove crescere come atleta e studente.",
        "Oggi mette quell'esperienza e la sua conoscenza del sistema universitario al servizio di ogni giocatore, passo dopo passo, fino a una borsa di studio reale.",
      ],
      de: [
        "Er wurde beim Hércules CF ausgebildet und wagte den Schritt in die USA, um weiterzuspielen und zu studieren. Die Agentur, die ihn begleiten sollte, hielt ihr Versprechen nicht.",
        "Er stand allein in einem neuen Land, mit Absagen und Formalitäten, die er selbst lösen musste, während er eine Universität suchte, an der er als Sportler und Student wachsen konnte.",
        "Heute stellt er diese Erfahrung und sein Wissen über das College-System jedem Spieler zur Verfügung, Schritt für Schritt, bis zu einem echten Stipendium.",
      ],
    },
  },
  {
    name: "Moha",
    initials: "MH",
    role: { es: "Cofundador y CEO", en: "Co-founder & CEO", it: "Cofondatore e CEO", de: "Mitgründer & CEO" },
    photo: MOHA_SHOWCASE,
    position: "50% 25%",
    bio: {
      es: [
        "Cuando quiso transferirse a una universidad de más nivel, esperaba el apoyo de la agencia que lo representaba. En el momento más importante del proceso lo dejaron sin guía.",
        "Recorrió solo un camino de incertidumbre y decisiones que marcaban su futuro deportivo y académico.",
        "De ahí nace su propósito: dar a cada jugador el acompañamiento cercano, profesional y humano que a él le faltó.",
      ],
      en: [
        "When he wanted to transfer to a higher-level university, he expected the support of the agency representing him. At the most important moment of the process, he was left without guidance.",
        "He walked alone through uncertainty and decisions that shaped his athletic and academic future.",
        "That is where his purpose comes from: giving every player the close, professional and human support he never had.",
      ],
      it: [
        "Quando ha voluto trasferirsi in un'università di livello più alto, si aspettava il sostegno dell'agenzia che lo rappresentava. Nel momento più importante del percorso è rimasto senza guida.",
        "Ha affrontato da solo un cammino pieno di incertezze e di decisioni che segnavano il suo futuro sportivo e accademico.",
        "Da qui nasce il suo obiettivo: dare a ogni giocatore l'accompagnamento vicino, professionale e umano che a lui è mancato.",
      ],
      de: [
        "Als er an eine Universität mit höherem Niveau wechseln wollte, erwartete er die Unterstützung der Agentur, die ihn vertrat. Im wichtigsten Moment des Prozesses blieb er ohne Begleitung.",
        "Er ging allein einen Weg voller Unsicherheit und Entscheidungen, die seine sportliche und akademische Zukunft prägten.",
        "Daraus entstand sein Ziel: jedem Spieler die nahe, professionelle und menschliche Begleitung zu geben, die ihm selbst gefehlt hat.",
      ],
    },
  },
];

const TEAM: Person[] = [
  {
    name: "Miguel Rojas",
    initials: "MR",
    photo: miguelPhoto,
    position: "50% 100%",
    role: { es: "Director Fútbol Latinoamérica", en: "Director, Soccer Latin America", it: "Direttore Calcio America Latina", de: "Direktor Fußball Lateinamerika" },
    instagram: "https://www.instagram.com/futboluagency.latam/",
  },
  {
    name: "Alejandro Martín",
    initials: "AM",
    role: { es: "Reclutador España", en: "Recruiter, Spain", it: "Recruiter Spagna", de: "Scout Spanien" },
  },
  /* Italian subsidiary: add each director's name here when confirmed. */
  {
    name: "FUA Italia",
    initials: "IT",
    role: { es: "Dirección de la filial italiana", en: "Italian subsidiary leadership", it: "Direzione della filiale italiana", de: "Leitung der italienischen Niederlassung" },
  },
];

const CHAPTERS: { mark: string; title: Copy; body: Copy<string[]> }[] = [
  {
    mark: "01",
    title: { es: "Dos jugadores, la misma herida", en: "Two players, the same wound", it: "Due giocatori, la stessa ferita", de: "Zwei Spieler, dieselbe Wunde" },
    body: {
      es: [
        "Ignacio y Moha no se conocían cuando vivieron lo mismo. Los dos se fueron a Estados Unidos a jugar y estudiar, y los dos confiaron en agencias que desaparecieron cuando más las necesitaban: en una transferencia, en un trámite, en la búsqueda de universidad.",
        "Aprendieron el sistema a base de rechazos, correos sin respuesta y decisiones tomadas a solas, lejos de casa.",
      ],
      en: [
        "Ignacio and Moha did not know each other when they went through the same thing. Both moved to the United States to play and study, and both trusted agencies that disappeared when they were needed most: during a transfer, a piece of paperwork, the search for a university.",
        "They learned the system through rejections, unanswered emails and decisions made alone, far from home.",
      ],
      it: [
        "Ignacio e Moha non si conoscevano quando hanno vissuto la stessa cosa. Entrambi sono partiti per gli Stati Uniti per giocare e studiare, ed entrambi si sono fidati di agenzie sparite quando servivano di più: in un trasferimento, in una pratica, nella ricerca dell'università.",
        "Hanno imparato il sistema a forza di rifiuti, email senza risposta e decisioni prese da soli, lontano da casa.",
      ],
      de: [
        "Ignacio und Moha kannten sich noch nicht, als sie dasselbe erlebten. Beide gingen in die USA, um zu spielen und zu studieren, und beide vertrauten Agenturen, die verschwanden, als man sie am meisten brauchte: bei einem Wechsel, einem Formular, der Suche nach einer Universität.",
        "Sie lernten das System durch Absagen, unbeantwortete E-Mails und Entscheidungen, die sie allein und weit weg von zu Hause treffen mussten.",
      ],
    },
  },
  {
    mark: "2020",
    title: { es: "Nace FutbolUAgency", en: "FutbolUAgency is born", it: "Nasce FutbolUAgency", de: "FutbolUAgency entsteht" },
    body: {
      es: [
        "Cuando se conocieron, vieron que su historia no era una excepción: era lo habitual. En 2020 fundaron FutbolUAgency LLC. con una promesa sencilla: acompañar a cada atleta como si fuera su propio hermano.",
        "Querían ser la agencia que a ellos les habría gustado tener.",
      ],
      en: [
        "When they met, they saw their story was not the exception: it was the norm. In 2020 they founded FutbolUAgency LLC. with a simple promise: to stand by every athlete as if he were their own brother.",
        "They wanted to be the agency they wish they had had.",
      ],
      it: [
        "Quando si sono conosciuti hanno capito che la loro storia non era un'eccezione: era la normalità. Nel 2020 hanno fondato FutbolUAgency LLC. con una promessa semplice: accompagnare ogni atleta come se fosse un fratello.",
        "Volevano essere l'agenzia che avrebbero voluto avere.",
      ],
      de: [
        "Als sie sich kennenlernten, sahen sie, dass ihre Geschichte keine Ausnahme war, sondern die Regel. 2020 gründeten sie FutbolUAgency LLC. mit einem einfachen Versprechen: jeden Athleten so zu begleiten, als wäre er ihr eigener Bruder.",
        "Sie wollten die Agentur sein, die sie selbst gern gehabt hätten.",
      ],
    },
  },
  {
    mark: "360°",
    title: { es: "Acompañamiento integral", en: "Support from start to finish", it: "Accompagnamento completo", de: "Begleitung von Anfang bis Ende" },
    body: {
      es: [
        "Cada jugador tiene un agente que lo conoce por su nombre. Ese agente evalúa su nivel deportivo y académico, diseña el plan, presenta su perfil a los entrenadores, negocia la beca y lo guía en la admisión, el visado y la llegada al campus.",
        "Y no desaparece después de la firma: sigue ahí durante los cuatro años de carrera, para lo deportivo, lo académico y lo personal.",
      ],
      en: [
        "Every player has an agent who knows them by name. That agent assesses their athletic and academic level, builds the plan, presents their profile to coaches, negotiates the scholarship and guides them through admission, the visa and arrival on campus.",
        "And they do not disappear after the signing: they stay through all four years of college, on and off the pitch.",
      ],
      it: [
        "Ogni giocatore ha un agente che lo conosce per nome. Quell'agente valuta il suo livello sportivo e accademico, costruisce il piano, presenta il profilo agli allenatori, negozia la borsa di studio e lo guida nell'ammissione, nel visto e nell'arrivo al campus.",
        "E non sparisce dopo la firma: resta al suo fianco per tutti i quattro anni di università, dentro e fuori dal campo.",
      ],
      de: [
        "Jeder Spieler hat einen Agenten, der ihn beim Namen kennt. Dieser Agent bewertet sein sportliches und akademisches Niveau, erstellt den Plan, stellt sein Profil den Trainern vor, verhandelt das Stipendium und begleitet ihn bei Zulassung, Visum und Ankunft auf dem Campus.",
        "Und er verschwindet nicht nach der Unterschrift: Er bleibt die ganzen vier Studienjahre an seiner Seite, auf und neben dem Platz.",
      ],
    },
  },
  {
    mark: "HOY",
    title: { es: "Quiénes somos hoy", en: "Who we are today", it: "Chi siamo oggi", de: "Wer wir heute sind" },
    body: {
      es: [
        "Lo que empezó con dos exjugadores es hoy un equipo con presencia en España, Latinoamérica, Estados Unidos e Italia, donde una filial propia con sus directores acerca el programa a los jugadores italianos.",
        "Trabajamos dos caminos: becas deportivas en universidades de EE.UU. y temporadas en clubes de España y Portugal. La forma de trabajar es la misma en los dos: un agente, todo el camino.",
      ],
      en: [
        "What began with two former players is now a team present in Spain, Latin America, the United States and Italy, where our own subsidiary, with its directors, brings the programme to Italian players.",
        "We work two paths: athletic scholarships at U.S. universities and seasons with clubs in Spain and Portugal. The way we work is the same on both: one agent, all the way.",
      ],
      it: [
        "Quello che è iniziato con due ex giocatori oggi è una squadra presente in Spagna, America Latina, Stati Uniti e Italia, dove una filiale propria con i suoi direttori porta il programma ai giocatori italiani.",
        "Lavoriamo su due strade: borse di studio sportive nelle università degli USA e stagioni nei club di Spagna e Portogallo. Il modo di lavorare è lo stesso: un agente, tutto il percorso.",
      ],
      de: [
        "Was mit zwei ehemaligen Spielern begann, ist heute ein Team mit Präsenz in Spanien, Lateinamerika, den USA und Italien, wo eine eigene Niederlassung mit ihren Direktoren das Programm zu italienischen Spielern bringt.",
        "Wir bieten zwei Wege: Sportstipendien an US-Universitäten und Saisons bei Vereinen in Spanien und Portugal. Die Arbeitsweise ist bei beiden gleich: ein Agent, den ganzen Weg.",
      ],
    },
  },
];

const STATS: { num: string; label: Copy }[] = [
  { num: "2020", label: { es: "Año de fundación", en: "Year founded", it: "Anno di fondazione", de: "Gründungsjahr" } },
  { num: "350+", label: { es: "Atletas colocados", en: "Athletes placed", it: "Atleti collocati", de: "Vermittelte Athleten" } },
  { num: "$10M+", label: { es: "En becas conseguidas", en: "In scholarships secured", it: "In borse di studio ottenute", de: "An erhaltenen Stipendien" } },
  { num: "98%", label: { es: "Satisfacción de familias", en: "Family satisfaction", it: "Famiglie soddisfatte", de: "Zufriedene Familien" } },
];

/* Backdrop behind each portrait; the cut-out photos (no background) sit on it. */
const BACKDROP = "absolute inset-0 bg-[radial-gradient(120%_90%_at_30%_10%,#2a2a2a_0%,#0a0a0a_70%)]";

const Portrait = ({ person, sizes }: { person: Person; sizes: string }) =>
  person.photo ? (
    <>
    <div aria-hidden="true" className={BACKDROP} />
    <Image
      src={person.photo}
      alt={person.name}
      fill
      sizes={sizes}
      className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
      style={{ objectPosition: person.position ?? "50% 20%" }}
    />
    </>
  ) : (
    <div aria-hidden="true" className={`${BACKDROP} flex items-center justify-center`}>
      <span className="font-druk text-[5.5rem] leading-none text-white/15">{person.initials}</span>
    </div>
  );

const About = () => {
  const { language } = useLanguage();
  const [open, setOpen] = useState<Person | null>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background pt-16 md:pt-20">
        {/* HERO */}
        <section className="relative isolate overflow-hidden bg-ink text-white">
          <Image
            src={teamHuddle}
            alt=""
            fill
            priority
            sizes="100vw"
            placeholder="blur"
            className="-z-20 object-cover grayscale"
            style={{ objectPosition: "50% 20%" }}
          />
          <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(10,10,10,0.92)_0%,rgba(10,10,10,0.7)_55%,rgba(10,10,10,0.35)_100%)]" />
          <div className="container-wide px-4 py-28 md:py-40">
            <h1 className="max-w-4xl leading-[0.92] text-white text-[clamp(3rem,9vw,7rem)]">
              {pick(language, { es: "Fundada por jugadores", en: "Founded by players", it: "Fondata da giocatori", de: "Gegründet von Spielern" })}
              <span className="block pr-[0.08em] italic text-red-bright">
                {pick(language, { es: "que vivieron el proceso", en: "who lived the process", it: "che hanno vissuto il percorso", de: "die den Weg selbst gingen" })}
              </span>
            </h1>
            <p className="label-bebas mt-5 text-base text-white/60 sm:text-lg">
              {pick(language, { es: "Nuestra historia · Desde 2020", en: "Our story · Since 2020", it: "La nostra storia · Dal 2020", de: "Unsere Geschichte · Seit 2020" })}
            </p>
            <p className="mt-8 max-w-2xl font-body text-lg leading-relaxed text-white/80">
              {pick(language, {
                es: "FutbolUAgency LLC. nació de una experiencia real: buscar una beca en Estados Unidos sin el apoyo adecuado. Hoy somos la agencia que nos habría gustado tener.",
                en: "FutbolUAgency LLC. was born from a real experience: chasing a scholarship in the United States without the right support. Today we are the agency we wish we had had.",
                it: "FutbolUAgency LLC. è nata da un'esperienza reale: cercare una borsa di studio negli Stati Uniti senza il sostegno giusto. Oggi siamo l'agenzia che avremmo voluto avere.",
                de: "FutbolUAgency LLC. entstand aus einer echten Erfahrung: ein Stipendium in den USA zu suchen, ohne die richtige Unterstützung. Heute sind wir die Agentur, die wir selbst gern gehabt hätten.",
              })}
            </p>
          </div>
        </section>

        {/* STORY */}
        <section className="py-24 sm:py-32" aria-labelledby="story-title">
          <div className="container-wide px-4">
            <div className="grid gap-12 lg:grid-cols-12">
              <div className="lg:col-span-4">
                <div className="lg:sticky lg:top-32">
                  <h2 id="story-title" className="leading-[0.92] text-ink text-[clamp(2.75rem,7vw,5rem)]">
                    {pick(language, { es: "De la experiencia", en: "From experience", it: "Dall'esperienza", de: "Aus Erfahrung" })}
                    <span className="block pr-[0.08em] italic text-primary">
                      {pick(language, { es: "a la misión", en: "to mission", it: "alla missione", de: "zur Mission" })}
                    </span>
                  </h2>
                  <dl className="mt-10 grid grid-cols-2 gap-x-6 gap-y-8 border-t border-ink/10 pt-8">
                    {STATS.map((s) => (
                      <div key={s.num}>
                        <dt className="label-bebas text-sm text-ink/50">{pick(language, s.label)}</dt>
                        <dd className="mt-1 font-druk text-4xl text-primary">{s.num}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </div>

              <ol className="space-y-16 lg:col-span-7 lg:col-start-6">
                {CHAPTERS.map((c, i) => (
                  <li key={c.mark} className="grid gap-4 sm:grid-cols-[7.5rem_1fr] sm:gap-8">
                    <span aria-hidden="true" className="font-druk text-5xl leading-none text-primary/25 sm:text-6xl">
                      {c.mark}
                    </span>
                    <div>
                      <h3 className="text-2xl font-bold text-ink sm:text-[1.75rem]">{pick(language, c.title)}</h3>
                      <div className="mt-4 max-w-[62ch] space-y-4 font-body text-base leading-relaxed text-ink/70 sm:text-lg">
                        {pick(language, c.body).map((p) => (
                          <p key={p}>{p}</p>
                        ))}
                      </div>
                      {i === 1 && (
                        <blockquote className="mt-8 border-l-2 border-primary pl-5 font-body text-lg font-medium leading-relaxed text-ink sm:text-xl">
                          {pick(language, {
                            es: "«Que ningún talento se pierda por falta de información, por una agencia irresponsable o por no saber cómo funciona el sistema.»",
                            en: "“No talent should be lost to a lack of information, an irresponsible agency or not knowing how the system works.”",
                            it: "«Nessun talento deve andare perso per mancanza di informazioni, per un'agenzia irresponsabile o per non sapere come funziona il sistema.»",
                            de: "„Kein Talent soll verloren gehen, weil Informationen fehlen, eine Agentur unverantwortlich handelt oder niemand weiß, wie das System funktioniert.“",
                          })}
                        </blockquote>
                      )}
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        {/* FOUNDERS */}
        <section className="bg-ink py-24 text-white sm:py-32" aria-labelledby="founders-title">
          <div className="container-wide px-4">
            <h2 id="founders-title" className="leading-[0.92] text-white text-[clamp(2.75rem,8vw,5.5rem)]">
              {pick(language, { es: "Los fundadores", en: "The founders", it: "I fondatori", de: "Die Gründer" })}
            </h2>
            <p className="label-bebas mt-4 text-base text-white/55">
              {pick(language, { es: "Ignacio y Moha · Exjugadores", en: "Ignacio and Moha · Former players", it: "Ignacio e Moha · Ex giocatori", de: "Ignacio und Moha · Ehemalige Spieler" })}
            </p>

            <ul className="mt-12 grid gap-6 md:grid-cols-2">
              {FOUNDERS.map((f) => (
                <li key={f.name}>
                  <button
                    type="button"
                    onClick={() => setOpen(f)}
                    className="group block w-full text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
                  >
                    <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-[#111]">
                      <Portrait person={f} sizes="(min-width: 768px) 50vw, 100vw" />
                    </div>
                    <p className="label-bebas mt-5 text-sm text-white/50">{pick(language, f.role)}</p>
                    <p className="mt-1 flex items-center justify-between font-body text-xl font-semibold text-white">
                      {f.name}
                      <span className="font-body text-sm font-medium text-white/60 transition-colors group-hover:text-red-bright">
                        {pick(language, { es: "Leer su historia", en: "Read his story", it: "Leggi la sua storia", de: "Seine Geschichte lesen" })} →
                      </span>
                    </p>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* TEAM TODAY */}
        <section className="py-24 sm:py-32" aria-labelledby="team-title">
          <div className="container-wide px-4">
            <h2 id="team-title" className="leading-[0.92] text-ink text-[clamp(2.75rem,8vw,5.5rem)]">
              {pick(language, { es: "El equipo", en: "The team", it: "La squadra", de: "Das Team" })}{" "}
              <span className="pr-[0.08em] italic text-primary">{pick(language, { es: "hoy", en: "today", it: "oggi", de: "heute" })}</span>
            </h2>
            <p className="label-bebas mt-4 text-base text-ink/50">
              {pick(language, { es: "España · Latinoamérica · Estados Unidos · Italia", en: "Spain · Latin America · United States · Italy", it: "Spagna · America Latina · Stati Uniti · Italia", de: "Spanien · Lateinamerika · USA · Italien" })}
            </p>

            <ul className="mt-12 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
              {TEAM.map((m) => (
                <li key={m.name}>
                  <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-ink">
                    <Portrait person={m} sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" />
                  </div>
                  <p className="label-bebas mt-4 text-sm text-ink/50">{pick(language, m.role)}</p>
                  <p className="mt-1 flex items-center gap-3 font-body text-lg font-semibold text-ink">
                    {m.name}
                    {m.instagram && (
                      <a
                        href={m.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-body text-sm font-medium text-primary hover:underline"
                      >
                        Instagram
                      </a>
                    )}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* VIDEO */}
        <section id="video" className="bg-[#f3f1ec] py-24 sm:py-28" aria-labelledby="video-title">
          <div className="container-wide max-w-5xl px-4">
            <h2 id="video-title" className="leading-[0.92] text-ink text-[clamp(2.5rem,6vw,4.5rem)]">
              {pick(language, { es: "Así trabajamos", en: "How we work", it: "Come lavoriamo", de: "So arbeiten wir" })}
            </h2>
            <div className="relative mt-10 aspect-video overflow-hidden rounded-2xl bg-black shadow-[0_18px_50px_-20px_rgba(10,10,10,0.45)]">
              <YouTubeEmbed id="0-dWsUxiYkI" title="FutbolUAgency LLC." className="absolute inset-0 h-full w-full" />
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-ink py-24 text-white sm:py-28">
          <div className="container-wide px-4">
            <h2 className="leading-[0.92] text-white text-[clamp(3rem,9vw,6.5rem)]">
              {pick(language, { es: "El siguiente", en: "The next one", it: "Il prossimo", de: "Der Nächste" })}
              <span className="block pr-[0.08em] italic text-red-bright">{pick(language, { es: "eres tú", en: "is you", it: "sei tu", de: "bist du" })}</span>
            </h2>
            <HomeCta className="mt-10" />
          </div>
        </section>

        <Footer />
      </main>

      {/* Founder story */}
      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={open.name}
          onClick={() => setOpen(null)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-ink/85 p-6 backdrop-blur-sm"
        >
          <div onClick={(e) => e.stopPropagation()} className="relative grid max-h-[90vh] w-full max-w-4xl overflow-hidden rounded-2xl bg-white md:grid-cols-2">
            <button
              type="button"
              autoFocus
              onClick={() => setOpen(null)}
              aria-label={pick(language, { es: "Cerrar", en: "Close", it: "Chiudi", de: "Schließen" })}
              className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-ink/10 bg-white/90"
            >
              <X className="h-5 w-5 text-ink" />
            </button>
            <div className="order-2 overflow-y-auto p-8 sm:p-10 md:order-1">
              <p className="label-bebas text-sm text-ink/50">{pick(language, open.role)}</p>
              <h2 className="mt-1 text-4xl text-ink">{open.name}</h2>
              <div className="mt-6 space-y-4 font-body text-base leading-relaxed text-ink/70">
                {open.bio && pick(language, open.bio).map((p) => <p key={p}>{p}</p>)}
              </div>
              {open.instagram && (
                <a href={open.instagram} target="_blank" rel="noopener noreferrer" className="mt-6 inline-block font-body text-sm font-semibold text-primary hover:underline">
                  Instagram
                </a>
              )}
            </div>
            <div className="relative order-1 min-h-[260px] bg-ink md:order-2">
              <Portrait person={open} sizes="(min-width: 768px) 28rem, 100vw" />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default About;
