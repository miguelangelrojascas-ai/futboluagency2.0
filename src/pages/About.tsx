import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, X } from "lucide-react";

const LinkedInIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
  </svg>
);
import { useLanguage } from "@/contexts/LanguageContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ceoIgnacio from "@/assets/ceo-ignacio.jpg";
import ceoMoha from "@/assets/ceo-moha.jpg";
import monicaRodriguez from "@/assets/monica-rodriguez.jpg";
import pabloTenis from "@/assets/pablo-tennis.jpg";
import fabianMorales from "@/assets/fabian-morales.jpg";
import miguelRojas from "@/assets/miguel-rojas.jpg";
import neusTrack from "@/assets/neus-track.jpg";
import teamHeaderBg from "@/assets/team-header-bg.jpg";

const NAVY = "#12213a";
const RED = "#b00717";

type Bio = { es: string[]; en: string[] } | null;
type Member = {
  name: string;
  initials: string;
  role: { es: string; en: string };
  image: string | null;
  linkedin?: string;
  instagram?: string;
  bio: Bio;
};

const teamMembers: Member[] = [
  {
    name: "Ignacio De Bejar",
    initials: "ID",
    role: { es: "Co-Founder & CEO", en: "Co-Founder & CEO" },
    image: ceoIgnacio,
    instagram: "https://www.instagram.com/ignacio_futboluagency/",
    bio: {
      es: [
        "Ignacio vivió en primera persona lo difícil que es conseguir una beca deportiva en Estados Unidos. Tras formarse en el Hércules CF, decidió dar el salto a EE.UU. para continuar su carrera, pero descubrió que la agencia que debía ayudarlo no brindaba el apoyo prometido.",
        "Se encontró solo en un país nuevo, enfrentando rechazos y obstáculos que tuvo que superar por su cuenta mientras buscaba una universidad donde desarrollarse como atleta y estudiante.",
        "Esa experiencia lo motivó a dedicar su carrera a que ningún jugador viva lo mismo. Hoy, Ignacio utiliza su trayectoria y conocimiento del sistema universitario para guiar a futbolistas internacionales y acompañarlos paso a paso en su camino hacia una beca real en EE.UU.",
      ],
      en: [
        "Ignacio experienced firsthand how difficult it is to get a sports scholarship in the United States. After training at Hércules CF, he decided to make the leap to the U.S. to continue his career, but discovered that the agency supposed to help him didn't provide the promised support.",
        "He found himself alone in a new country, facing rejections and obstacles he had to overcome on his own while searching for a university to develop as an athlete and student.",
        "That experience motivated him to dedicate his career to ensuring no player goes through the same. Today, Ignacio uses his experience and knowledge of the university system to guide international soccer players step by step on their path to a real scholarship in the U.S.",
      ],
    },
  },
  {
    name: "Moha",
    initials: "MH",
    role: { es: "Co-Founder & CEO", en: "Co-Founder & CEO" },
    image: ceoMoha,
    bio: {
      es: [
        "Cuando Mohammed intentó transferirse a una universidad de mayor nivel, esperaba recibir el apoyo de la agencia que lo representaba. Sin embargo, en el momento más importante del proceso, fue abandonado sin guía ni acompañamiento.",
        "Enfrentó solo un camino lleno de incertidumbre, obstáculos y decisiones críticas que impactaban su futuro deportivo y académico.",
        "Esta experiencia lo llevó a crear una agencia con un propósito claro: ofrecer el apoyo que a él le faltó. Hoy, Moha ha ayudado a decenas de jugadores a conseguir becas y oportunidades reales, asegurándose de que cada uno reciba el acompañamiento cercano, profesional y humano que él nunca tuvo.",
      ],
      en: [
        "When Mohammed tried to transfer to a higher-level university, he expected to receive support from the agency representing him. However, at the most important moment of the process, he was abandoned without guidance or support.",
        "He faced alone a path full of uncertainty, obstacles, and critical decisions that impacted his athletic and academic future.",
        "This experience led him to create an agency with a clear purpose: to offer the support he lacked. Today, Moha has helped dozens of players get real scholarships and opportunities, ensuring each one receives the close, professional, and human support he never had.",
      ],
    },
  },
  { name: "Miguel Rojas", initials: "MR", role: { es: "Director Fútbol Latinoamérica", en: "Director Soccer LATAM" }, image: miguelRojas, instagram: "https://www.instagram.com/futboluagency.latam/", bio: null },
  {
    name: "Mónica Rodríguez",
    initials: "MR",
    role: { es: "Directora de Scouting y Reclutamiento", en: "Scouting & Recruitment Director" },
    image: monicaRodriguez,
    linkedin: "https://www.linkedin.com/in/monica-rodriguez-serrano-44367236/",
    bio: null,
  },
  { name: "Pablo", initials: "PB", role: { es: "Embajador & Scout Tenis", en: "Ambassador & Tennis Scout" }, image: pabloTenis, instagram: "https://www.instagram.com/pablo_fuatenis/", bio: null },
  { name: "Fabián Morales", initials: "FM", role: { es: "Reclutador Centroamérica", en: "Central America Recruiter" }, image: fabianMorales, linkedin: "https://www.linkedin.com/in/fabianmoralesrecruiting/", bio: null },
  {
    name: "Neus Sansaloni",
    initials: "NS",
    role: { es: "Directora Atletismo", en: "Athletics Director" },
    image: neusTrack,
    instagram: "https://www.instagram.com/fua_trackandfield/",
    bio: {
      es: [
        "Neus es atleta de élite y actualmente compite en un equipo de primera división, contando con una amplia trayectoria en el atletismo de alto rendimiento.",
        "Su experiencia como deportista de élite, su profundo conocimiento del sector y su compromiso tanto con el deporte base como con el alto rendimiento la convierten en una pieza clave para el desarrollo de nuestra estructura internacional.",
        "Con años de experiencia en la élite del atletismo, Neus aporta visión, credibilidad y una conexión directa con la realidad de los atletas.",
      ],
      en: [
        "Neus is an elite athlete who currently competes on a first-division team, with an extensive track record in high-performance athletics.",
        "Her experience as an elite athlete, her deep knowledge of the sector, and her commitment to both grassroots and high-performance sport make her a key piece in the development of our international structure.",
        "With years of experience at the elite level of athletics, Neus brings vision, credibility, and a direct connection to the reality of athletes.",
      ],
    },
  },
  { name: "Próximamente", initials: "VB", role: { es: "Director Volleyball", en: "Volleyball Director" }, image: null, bio: null },
];

const About = () => {
  const { language } = useLanguage();
  const es = language === "es";
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const selected = activeIndex !== null ? teamMembers[activeIndex] : null;

  useEffect(() => {
    document.title = "Sobre Nosotros | Quiénes Somos – FutbolUAgency";
    document.querySelector('meta[name="description"]')?.setAttribute("content", "Conoce al equipo detrás de FutbolUAgency. Exfutbolistas profesionales que ayudan a jóvenes talentos a obtener becas deportivas en universidades americanas.");
    document.querySelector('meta[property="og:title"]')?.setAttribute("content", "Sobre Nosotros | FutbolUAgency");
    document.querySelector('meta[property="og:description"]')?.setAttribute("content", "Conoce al equipo detrás de FutbolUAgency. Exfutbolistas profesionales que ayudan a jóvenes talentos a obtener becas deportivas en universidades americanas.");
  }, []);

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-16 md:pt-20" style={{ backgroundColor: "#ffffff", color: NAVY }}>
        {/* HERO */}
        <section className="relative overflow-hidden" style={{ minHeight: "480px" }}>
          <img
            src={teamHeaderBg}
            alt="FUA Team"
            className="absolute inset-0 w-full h-full object-cover"
            style={{ filter: "grayscale(100%)", objectPosition: "center 15%" }}
          />
          <div
            className="absolute inset-0"
            style={{ background: "linear-gradient(to bottom, rgba(18,33,58,0.55) 0%, rgba(18,33,58,0.78) 100%)" }}
          />
          <div className="relative container-wide px-4 max-w-4xl mx-auto text-center flex flex-col items-center justify-center py-28 md:py-36">
            <span
              className="inline-block font-body text-xs tracking-[0.2em] uppercase font-semibold mb-5 px-3 py-1 rounded-full"
              style={{ color: "rgba(255,255,255,0.85)", background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.2)" }}
            >
              {es ? "Nuestra historia" : "Our story"}
            </span>
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold leading-tight mb-6 text-white">
              {es ? "Fundada por atletas que vivieron el proceso" : "Founded by athletes who lived the process"}
            </h1>
            <p className="font-body text-lg md:text-xl leading-relaxed" style={{ color: "rgba(255,255,255,0.8)" }}>
              {es
                ? "FutbolUAgency LLC. nació de una experiencia real: la frustración de buscar una beca en EE.UU. sin el apoyo adecuado. Hoy somos la agencia que nos habría gustado tener."
                : "FutbolUAgency LLC. was born from a real experience: the frustration of seeking a scholarship in the U.S. without proper support. Today we are the agency we wish we'd had."}
            </p>
          </div>
        </section>

        {/* ORIGIN STORY */}
        <section className="py-20 md:py-24" style={{ backgroundColor: "#f5f4f2" }}>
          <div className="container-wide px-4 max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              <div>
                <span className="font-body text-xs tracking-[0.2em] uppercase font-semibold mb-4 block" style={{ color: RED }}>
                  {es ? "Cómo empezó todo" : "How it all started"}
                </span>
                <h2 className="font-display text-3xl md:text-4xl font-bold mb-6 leading-tight" style={{ color: NAVY }}>
                  {es ? "Dos jugadores. La misma historia." : "Two players. The same story."}
                </h2>
                <div className="space-y-4">
                  {(es
                    ? [
                        "Ignacio y Moha se conocieron después de haber vivido experiencias casi idénticas: los dos intentaron llegar a universidades en EE.UU., los dos confiaron en agencias que los dejaron solos en el momento más importante.",
                        "En lugar de rendirse, decidieron aprender el sistema por su cuenta y ayudar a otros a no vivir lo mismo.",
                        "En 2020 fundaron FutbolUAgency LLC. con una promesa simple: acompañar a cada atleta como si fuera su propio hermano.",
                      ]
                    : [
                        "Ignacio and Moha met after having lived almost identical experiences: both tried to reach universities in the U.S., both trusted agencies that left them alone at the most important moment.",
                        "Instead of giving up, they decided to learn the system on their own and help others avoid the same experience.",
                        "In 2020 they founded FutbolUAgency LLC. with a simple promise: to accompany each athlete as if they were their own brother.",
                      ]
                  ).map((p, i) => (
                    <p key={i} className="font-body text-base md:text-lg leading-relaxed" style={{ color: "rgba(18,33,58,0.75)" }}>
                      {p}
                    </p>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {[
                  { num: "2020", label: es ? "Año de fundación" : "Year founded" },
                  { num: "350+", label: es ? "Atletas colocados" : "Athletes placed" },
                  { num: "$10M+", label: es ? "En becas conseguidas" : "In scholarships secured" },
                  { num: "98%", label: es ? "Satisfacción de familias" : "Family satisfaction" },
                ].map((s, i) => (
                  <div
                    key={i}
                    className="p-6 rounded-2xl bg-white"
                    style={{ border: "1px solid rgba(18,33,58,0.06)", boxShadow: "0 4px 16px rgba(18,33,58,0.04)" }}
                  >
                    <div className="font-display text-3xl md:text-4xl font-bold mb-2" style={{ color: RED }}>
                      {s.num}
                    </div>
                    <div className="font-body text-sm" style={{ color: "rgba(18,33,58,0.6)" }}>
                      {s.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* MISSION & VALUES */}
        <section className="py-20 md:py-24">
          <div className="container-wide px-4 max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <span className="font-body text-xs tracking-[0.2em] uppercase font-semibold mb-4 block" style={{ color: RED }}>
                {es ? "Lo que nos mueve" : "What drives us"}
              </span>
              <h2 className="font-display text-3xl md:text-4xl font-bold leading-tight" style={{ color: NAVY }}>
                {es ? "Nuestra Misión y Valores" : "Our Mission & Values"}
              </h2>
            </div>

            <div
              className="max-w-3xl mx-auto p-8 md:p-10 rounded-2xl mb-14 text-center"
              style={{ background: NAVY, color: "white" }}
            >
              <p className="font-display italic text-xl md:text-2xl leading-relaxed">
                {es
                  ? '"Nuestra misión es clara: que ningún talento se pierda por falta de información, por una agencia irresponsable o por no saber cómo funciona el sistema."'
                  : '"Our mission is clear: no talent should be lost due to lack of information, an irresponsible agency, or not knowing how the system works."'}
              </p>
            </div>
          </div>
        </section>

        {/* TEAM */}
        <section className="py-20 md:py-24" style={{ backgroundColor: "#f5f4f2" }}>
          <div className="container-wide px-4 max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <span className="font-body text-xs tracking-[0.2em] uppercase font-semibold mb-4 block" style={{ color: RED }}>
                {es ? "Las personas" : "The people"}
              </span>
              <h2 className="font-display text-3xl md:text-4xl font-bold mb-4 leading-tight" style={{ color: NAVY }}>
                {es ? "Nuestro Equipo" : "Our Team"}
              </h2>
              <p className="font-body text-base md:text-lg max-w-xl mx-auto" style={{ color: "rgba(18,33,58,0.7)" }}>
                {es ? "Las personas detrás de cada oportunidad que creamos." : "The people behind every opportunity we create."}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10 max-w-5xl mx-auto">
              {teamMembers.map((member, i) => {
                const hasBio = member.bio !== null;
                return (
                  <div
                    key={i}
                    onClick={() => (hasBio ? setActiveIndex(i) : null)}
                    className="group"
                    style={{ cursor: hasBio ? "pointer" : "default" }}
                  >
                    <div className="relative overflow-hidden aspect-[4/5] bg-[#0d0d0d]">
                      {member.image ? (
                        <img
                          src={member.image}
                          alt={member.name}
                          className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                          style={{ objectPosition: "center 15%" }}
                        />
                      ) : (
                        <div
                          className="absolute inset-0 flex items-center justify-center"
                          style={{ background: "linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)" }}
                        >
                          <span className="font-display text-6xl font-bold" style={{ color: "rgba(255,255,255,0.12)" }}>
                            {member.initials}
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="pt-4">
                      <span
                        className="block font-body text-[11px] tracking-[0.18em] uppercase font-semibold mb-1.5"
                        style={{ color: "rgba(18,33,58,0.45)" }}
                      >
                        {member.role[es ? "es" : "en"]}
                      </span>
                      <div className="flex items-center justify-between gap-2">
                        <h3 className="font-display text-xl font-bold leading-tight" style={{ color: NAVY }}>
                          {member.name}
                        </h3>
                        <div className="flex items-center gap-2">
                          {member.instagram && (
                            <a
                              href={member.instagram}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full transition-opacity hover:opacity-70"
                              style={{ background: "rgba(18,33,58,0.08)", border: "1px solid rgba(18,33,58,0.14)", color: NAVY }}
                              aria-label="Instagram"
                            >
                              <InstagramIcon />
                            </a>
                          )}
                          {member.linkedin && (
                            <a
                              href={member.linkedin}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full transition-opacity hover:opacity-70"
                              style={{ background: "rgba(18,33,58,0.08)", border: "1px solid rgba(18,33,58,0.14)", color: NAVY }}
                              aria-label="LinkedIn"
                            >
                              <LinkedInIcon />
                            </a>
                          )}
                        </div>
                      </div>
                      {hasBio && (
                        <span
                          className="inline-flex items-center gap-2 mt-3 font-body text-sm transition-all group-hover:gap-3"
                          style={{ color: RED }}
                        >
                          <span className="h-px w-6 transition-all group-hover:w-10" style={{ background: RED }} />
                          <ArrowRight className="w-4 h-4" />
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 md:py-24 text-center">
          <div className="container-wide px-4 max-w-3xl mx-auto">
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4" style={{ color: NAVY }}>
              {es ? "¿Listo para dar el siguiente paso?" : "Ready to take the next step?"}
            </h2>
            <p className="font-body text-base md:text-lg mb-8" style={{ color: "rgba(18,33,58,0.7)" }}>
              {es ? "Aplica ahora y descubre qué oportunidades hay para ti." : "Apply now and discover what opportunities exist for you."}
            </p>
            <Link
              to="/apply"
              className="inline-flex items-center gap-2 font-body font-semibold px-8 py-3.5 rounded-lg transition-all text-sm sm:text-base text-white"
              style={{ background: RED, boxShadow: "0 8px 24px rgba(176,7,23,0.3)" }}
            >
              {es ? "Aplica Ahora" : "Apply Now"} <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </section>

        <Footer />
      </main>

      {/* MODAL */}
      {selected && (
        <div
          onClick={() => setActiveIndex(null)}
          style={{
            position: "fixed", inset: 0, zIndex: 50,
            background: "rgba(18,33,58,0.85)", backdropFilter: "blur(6px)",
            display: "flex", alignItems: "center", justifyContent: "center",
            padding: "24px",
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: "white", borderRadius: "20px",
              maxWidth: "960px", width: "100%",
              maxHeight: "90vh", overflow: "hidden",
              position: "relative",
            }}
          >
            <button
              onClick={() => setActiveIndex(null)}
              style={{
                position: "absolute", top: "16px", right: "16px", zIndex: 10,
                width: "40px", height: "40px", borderRadius: "50%",
                background: "rgba(255,255,255,0.9)", border: "1px solid rgba(18,33,58,0.12)", cursor: "pointer",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}
            >
              <X className="w-5 h-5" style={{ color: NAVY }} />
            </button>

            <div className="grid md:grid-cols-2" style={{ maxHeight: "90vh" }}>
              {/* INFO */}
              <div className="p-8 sm:p-10 md:p-12 order-2 md:order-1 overflow-y-auto">
                <span
                  className="block font-body text-[11px] tracking-[0.18em] uppercase font-semibold mb-3"
                  style={{ color: "rgba(18,33,58,0.45)" }}
                >
                  {selected.role[es ? "es" : "en"]}
                </span>
                <div className="flex items-center gap-3 mb-6 flex-wrap">
                  <h2 className="font-display text-3xl sm:text-4xl font-bold" style={{ color: NAVY }}>
                    {selected.name}
                  </h2>
                  <div className="flex items-center gap-2">
                    {selected.instagram && (
                      <a
                        href={selected.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-shrink-0 flex items-center justify-center w-9 h-9 rounded-full transition-opacity hover:opacity-70"
                        style={{ background: "rgba(18,33,58,0.08)", border: "1px solid rgba(18,33,58,0.14)", color: NAVY }}
                        aria-label="Instagram"
                      >
                        <InstagramIcon />
                      </a>
                    )}
                    {selected.linkedin && (
                      <a
                        href={selected.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-shrink-0 flex items-center justify-center w-9 h-9 rounded-full transition-opacity hover:opacity-70"
                        style={{ background: "rgba(18,33,58,0.08)", border: "1px solid rgba(18,33,58,0.14)", color: NAVY }}
                        aria-label="LinkedIn"
                      >
                        <LinkedInIcon />
                      </a>
                    )}
                  </div>
                </div>

                <div className="space-y-4">
                  {selected.bio ? (
                    selected.bio[es ? "es" : "en"].map((p: string, i: number) => (
                      <p key={i} className="font-body text-sm sm:text-base leading-relaxed" style={{ color: "rgba(18,33,58,0.7)" }}>
                        {p}
                      </p>
                    ))
                  ) : (
                    <p className="font-body text-sm sm:text-base italic" style={{ color: "rgba(18,33,58,0.6)" }}>
                      {es ? "Bio próximamente." : "Bio coming soon."}
                    </p>
                  )}
                </div>
              </div>

              {/* PHOTO */}
              <div className="relative order-1 md:order-2 bg-[#0d0d0d] min-h-[260px] md:min-h-full">
                {selected.image ? (
                  <img
                    src={selected.image}
                    alt={selected.name}
                    className="absolute inset-0 w-full h-full object-cover"
                    style={{ objectPosition: "center 15%" }}
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="font-display text-6xl font-bold" style={{ color: "rgba(255,255,255,0.12)" }}>
                      {selected.initials}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default About;
