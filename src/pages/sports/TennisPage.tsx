import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  CheckCircle,
  ChevronRight,
  Star,
  Shield,
  Trophy,
  Users,
  BookOpen,
  Heart,
  Plane,
  Award,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import { useDocumentMeta } from "@/hooks/useDocumentMeta";
import tennisPlayerImg from "@/assets/tennis-player.jpg";
import tennisStudentsImg from "@/assets/tennis-students.jpg";
import tennisTrophyImg from "@/assets/tennis-trophy.webp";
import tennisFacilityImg from "@/assets/tennis-facility.jpg";
import fuaSportsLogo from "@/assets/fua-sports-logo.png";
import campusDorm from "@/assets/campus-dorm.jpg";
import campusDining from "@/assets/campus-dining.jpg";
import campusMedical from "@/assets/campus-medical.jpg";
import campusOffcampus from "@/assets/campus-offcampus.jpg";
import sportTennis from "@/assets/sport-tennis.png";
import tennisLogo from "@/assets/logo-tennis.png";
import SportSplitHero from "@/components/sports/SportSplitHero";
import SportBenchmarks from "@/components/sports/SportBenchmarks";
import Footer from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const NAVY = "hsl(var(--foreground))";
const RED = "hsl(var(--primary))";
const LIGHT = "hsl(var(--background))";
const CALENDLY = "https://calendly.com/futbolu-agency";

const TennisPage = () => {
  const { language } = useLanguage();
  const es = language === "es";

  useDocumentMeta({
    title: es
      ? "Becas de Tenis Universitario en EE.UU. | FutbolUAgency"
      : "College Tennis Scholarships in the USA | FutbolUAgency",
    description: es
      ? "Acompañamiento cercano para conseguir la beca de tenis universitario que tu talento merece en NCAA, NAIA y NJCAA."
      : "Close support to help you earn the college tennis scholarship your talent deserves across NCAA, NAIA and NJCAA.",
  });

  // Carrusel sincronizado de la sección "Por qué el tenis universitario"
  const [activeWhy, setActiveWhy] = useState(0);
  const whyPausedRef = useRef(false);
  useEffect(() => {
    const id = window.setInterval(() => {
      if (!whyPausedRef.current) setActiveWhy((i) => (i + 1) % 4);
    }, 4000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <>
      <Navbar />
      <main className="min-h-screen" style={{ backgroundColor: LIGHT }}>
        <SportSplitHero
          sport={es ? "Tenis" : "Tennis"}
          logo={tennisLogo}
          image={sportTennis}
          imageAlt={es ? "Jugadora de tenis universitario" : "College tennis player"}
          eyebrow={es ? "Tu cancha. Tu beca. Tu futuro." : "Your court. Your scholarship. Your future."}
          title={es ? "Becas de tenis" : "Tennis scholarships"}
          highlight={es ? "en EE.UU." : "in the U.S."}
          subtitle={
            es
              ? "Acompañamiento cercano para conseguir la beca que tu talento merece. De tu club local a la universidad americana de tus sueños."
              : "Close guidance to secure the scholarship your talent deserves. From your local club to your dream American university."
          }
          floatingStat={{ value: "100%", label: es ? "Atletas con beca" : "Athletes with scholarship" }}
          stats={[
            { value: "75–100%", label: es ? "Cobertura" : "Coverage" },
            { value: "NCAA", label: "NAIA · NJCAA" },
            { value: es ? "Gratis" : "Free", label: es ? "Evaluación" : "Evaluation" },
          ]}
        />

        <SportBenchmarks
          title={es ? "Tu UTR," : "Your UTR,"}
          highlight={es ? "tu universidad" : "your university"}
          subtitle={
            es
              ? "El Universal Tennis Rating (UTR) es la referencia que usan los entrenadores universitarios. Así se ubica tu nivel en cada división."
              : "The Universal Tennis Rating (UTR) is the benchmark college coaches use. Here is where your level fits in each division."
          }
          metrics={[
            { icon: Star, label: "UTR", desc: es ? "Rating universal: el primer filtro de los coaches." : "Universal rating: coaches' first filter." },
            { icon: Trophy, label: es ? "Ranking ITF / nacional" : "ITF / national ranking", desc: es ? "Posición en rankings juveniles y federativos." : "Position in junior and federation rankings." },
            { icon: Users, label: es ? "Victorias clave" : "Key wins", desc: es ? "Resultados ante rivales de nivel similar o superior." : "Wins over similar or higher-rated opponents." },
            { icon: BookOpen, label: es ? "Académico" : "Academics", desc: es ? "Notas e inglés: sumas becas académicas." : "Grades and English: stack academic aid." },
          ]}
          columns={[es ? "División" : "Division", es ? "UTR hombres" : "Men's UTR", es ? "UTR mujeres" : "Women's UTR", es ? "Cobertura típica" : "Typical coverage"]}
          rows={[
            [es ? "NCAA D1 (top)" : "NCAA D1 (top)", "13+", "10.5+", "75–100%"],
            ["NCAA D1", "11.5–13", "9–10.5", "60–100%"],
            ["NCAA D2", "10–11.5", "7.5–9", "50–100%"],
            ["NAIA", "9.5–11", "7–8.5", "50–100%"],
            ["NJCAA", "8.5–10", "6–8", "50–100%"],
          ]}
          caption={
            es
              ? "Valores orientativos. Si todavía no tienes UTR, lo calculamos a partir de tus resultados en la evaluación gratuita."
              : "Guideline values. If you don't have a UTR yet, we estimate it from your results in the free evaluation."
          }
        />

        {/* ── WHY TENNIS ── */}
        <section className="py-24 md:py-32 px-4" style={{ backgroundColor: "hsl(var(--background))" }}>
          <div className="container-wide max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <span
                className="inline-block text-xs font-semibold uppercase tracking-widest mb-4 font-body"
                style={{ color: RED }}
              >
                {es ? "La oportunidad" : "The opportunity"}
              </span>
              <h2
                className="font-display text-3xl sm:text-4xl md:text-5xl font-bold mb-3"
                style={{ color: NAVY }}
              >
                {es ? "¿Por qué el Tenis Universitario en EE.UU.?" : "Why University Tennis in the USA?"}
              </h2>
              <div style={{ width: 40, height: 3, background: RED, margin: "0 auto 20px" }} />
              <p className="font-body text-base sm:text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                {es
                  ? "Estados Unidos ofrece el sistema deportivo y educativo más completo del mundo. Miles de familias ya han tomado esta decisión."
                  : "The United States offers the most complete sports and educational system in the world."}
              </p>
            </div>

            {(() => {
              const items = [
                {
                  icon: BookOpen,
                  image: tennisStudentsImg,
                  title: es ? "Educación de alta calidad" : "High quality education",
                  desc: es
                    ? "Títulos universitarios con reconocimiento internacional que abren puertas en todo el mundo."
                    : "Internationally recognized university degrees that open doors worldwide.",
                },
                {
                  icon: Trophy,
                  image: tennisTrophyImg,
                  title: es ? "Entorno profesional" : "Professional environment",
                  desc: es
                    ? "Entrenamientos 4–5 días por semana con preparadores físicos, fisioterapeutas y tutores académicos."
                    : "Training 4–5 days per week with physical trainers, physiotherapists and academic tutors.",
                },
                {
                  icon: Shield,
                  image: tennisFacilityImg,
                  title: es ? "Instalaciones de élite" : "Elite facilities",
                  desc: es
                    ? "Pistas indoor y outdoor de primer nivel, gimnasio, sala de fisioterapia y tecnología de última generación."
                    : "Top-level indoor and outdoor courts, gym, physiotherapy room and cutting-edge technology.",
                },
                {
                  icon: Users,
                  image: tennisPlayerImg,
                  title: es ? "Desarrollo personal" : "Personal development",
                  desc: es
                    ? "Mejora del inglés, madurez personal y crecimiento a través de una competición organizada e internacional."
                    : "English improvement, personal maturity and growth through organized international competition.",
                },
              ];
              return (
                <div
                  className="grid lg:grid-cols-2 gap-10 items-start"
                  onMouseEnter={() => { whyPausedRef.current = true; }}
                  onMouseLeave={() => { whyPausedRef.current = false; }}
                >
                  {/* Carrusel de imágenes */}
                  <div className="rounded-2xl aspect-[4/5] relative overflow-hidden shadow-2xl lg:sticky lg:top-24">
                    {items.map((it, i) => (
                      <img
                        key={it.title}
                        src={it.image}
                        alt={it.title}
                        className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-out"
                        style={{ opacity: activeWhy === i ? 1 : 0 }}
                        loading="lazy"
                      />
                    ))}
                    {/* Indicadores */}
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                      {items.map((_, i) => (
                        <button
                          key={i}
                          type="button"
                          aria-label={`Imagen ${i + 1}`}
                          onClick={() => setActiveWhy(i)}
                          className="h-2 rounded-full transition-all"
                          style={{
                            width: activeWhy === i ? 24 : 8,
                            backgroundColor: activeWhy === i ? "hsl(var(--background))" : "rgba(255,255,255,0.5)",
                          }}
                        />
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4">
                    {items.map((f, i) => {
                      const isActive = activeWhy === i;
                      return (
                        <button
                          key={f.title}
                          type="button"
                          onClick={() => setActiveWhy(i)}
                          onMouseEnter={() => setActiveWhy(i)}
                          aria-current={isActive}
                          className="w-full text-left flex gap-4 p-6 rounded-xl bg-white border transition-all duration-500 ease-out"
                          style={{
                            borderColor: isActive ? RED : "hsl(var(--border))",
                            boxShadow: isActive ? "0 20px 40px -20px rgba(176,7,23,0.35)" : "none",
                            transform: isActive ? "scale(1.03)" : "scale(1)",
                            opacity: isActive ? 1 : 0.55,
                          }}
                        >
                          <div
                            className="shrink-0 w-12 h-12 rounded-lg flex items-center justify-center transition-colors duration-500"
                            style={{ backgroundColor: isActive ? RED : `${RED}15` }}
                          >
                            <f.icon
                              className="w-6 h-6 transition-colors duration-500"
                              style={{ color: isActive ? "hsl(var(--background))" : RED }}
                            />
                          </div>
                          <div>
                            <h3 className="font-display text-lg font-bold mb-1" style={{ color: NAVY }}>
                              {f.title}
                            </h3>
                            <p className="font-body text-sm text-muted-foreground leading-relaxed">
                              {f.desc}
                            </p>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })()}
          </div>
        </section>

        {/* ── LEAGUE SYSTEM ── */}
        <section
          className="py-24 md:py-32 px-4"
          style={{ backgroundColor: "hsl(var(--section-alt))", borderTop: "1px solid rgba(0,0,0,0.05)" }}
        >
          <div className="container-wide max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <span
                className="inline-block text-xs font-semibold uppercase tracking-widest mb-4 font-body"
                style={{ color: RED }}
              >
                {es ? "Ligas universitarias" : "University leagues"}
              </span>
              <h2
                className="font-display text-3xl sm:text-4xl md:text-5xl font-bold mb-3"
                style={{ color: NAVY }}
              >
                {es ? "El Sistema de Ligas en EE.UU." : "The US League System"}
              </h2>
              <div style={{ width: 40, height: 3, background: RED, margin: "0 auto 20px" }} />
              <p className="font-body text-base sm:text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                {es
                  ? "Hay una opción para cada perfil de jugador. Nuestro equipo te ayuda a encontrar la tuya."
                  : "There's an option for every player profile. Our team helps you find yours."}
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-10">
              {[
                {
                  name: "NCAA División 1",
                  color: NAVY,
                  features: es
                    ? ["Nivel más alto competitivo", "Universidades grandes y reconocidas", "Becas deportivas importantes", "Instalaciones profesionales", "Máxima exigencia"]
                    : ["Highest competitive level", "Large, well-known universities", "Significant athletic scholarships", "Professional facilities", "Maximum demands"],
                  scholarship: "70–100%",
                },
                {
                  name: "NCAA División 2",
                  color: "#1e3a6e",
                  features: es
                    ? ["Nivel alto competitivo", "Equilibrio deporte / estudios", "Becas deportivas y académicas", "Muy buenas instalaciones", "Gran ambiente universitario"]
                    : ["High competitive level", "Balance sport / studies", "Athletic and academic scholarships", "Very good facilities", "Great university atmosphere"],
                  scholarship: "50–90%",
                },
                {
                  name: "NAIA",
                  color: "#2d5a8e",
                  features: es
                    ? ["Gran nivel competitivo", "Más flexibilidad en admisiones", "Becas deportivas disponibles", "Buen desarrollo académico", "Proceso más accesible"]
                    : ["Great competitive level", "More flexibility in admissions", "Athletic scholarships available", "Good academic development", "More accessible process"],
                  scholarship: "40–80%",
                },
              ].map((league) => (
                <div
                  key={league.name}
                  className="rounded-2xl overflow-hidden border bg-white shadow-sm hover:shadow-lg transition-shadow"
                  style={{ borderColor: "hsl(var(--border))" }}
                >
                  <div className="p-6" style={{ backgroundColor: league.color }}>
                    <div className="text-xs font-medium text-white/60 uppercase tracking-wider mb-1 font-body">
                      {es ? "División" : "Division"}
                    </div>
                    <h3 className="font-display text-2xl font-bold text-white mb-3">
                      {league.name}
                    </h3>
                    <div
                      className="inline-block text-xs font-semibold px-3 py-1 rounded-full font-body"
                      style={{ backgroundColor: "rgba(255,255,255,0.15)", color: "white" }}
                    >
                      {es ? "Beca típica: " : "Typical scholarship: "}
                      {league.scholarship}
                    </div>
                  </div>
                  <div className="p-6">
                    <ul className="space-y-3">
                      {league.features.map((f) => (
                        <li
                          key={f}
                          className="flex gap-2 font-body text-sm leading-relaxed"
                          style={{ color: NAVY }}
                        >
                          <CheckCircle className="w-4 h-4 shrink-0 mt-0.5" style={{ color: RED }} />
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>

            {/* NJCAA */}
            <div
              className="rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center gap-4 border"
              style={{ backgroundColor: LIGHT, borderColor: RED }}
            >
              <div
                className="shrink-0 px-4 py-2 rounded-lg font-display font-bold text-white"
                style={{ backgroundColor: RED }}
              >
                NJCAA
              </div>
              <p className="font-body text-sm sm:text-base leading-relaxed" style={{ color: NAVY }}>
                <strong>Junior College</strong> —{" "}
                {es
                  ? "2 años con requisitos de entrada más accesibles. Excelente opción para desarrollarse y luego transferirse a NCAA o NAIA."
                  : "2 years with more accessible entry requirements. Excellent option to develop and then transfer to NCAA or NAIA."}
              </p>
            </div>
          </div>
        </section>

        {/* ── FINANCIAL REALITY ── */}
        <section
          className="py-24 md:py-32 px-4"
          style={{ backgroundColor: "hsl(var(--background))", borderTop: "1px solid rgba(0,0,0,0.05)" }}
        >
          <div className="container-wide max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <span
                className="inline-block text-xs font-semibold uppercase tracking-widest mb-4 font-body"
                style={{ color: RED }}
              >
                {es ? "Realidad financiera" : "Financial reality"}
              </span>
              <h2
                className="font-display text-3xl sm:text-4xl md:text-5xl font-bold mb-3"
                style={{ color: NAVY }}
              >
                {es ? "¿Cuánto puedes conseguir?" : "How much can you get?"}
              </h2>
              <div style={{ width: 40, height: 3, background: RED, margin: "0 auto 0" }} />
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-10">
              {[
                {
                  title: es ? "Beca Deportiva" : "Athletic Scholarship",
                  icon: Trophy,
                  items: es
                    ? ["Ranking nacional / internacional (UTR, ITF)", "Rendimiento en torneos recientes", "Actitud, disciplina y potencial", "Necesidades del equipo universitario"]
                    : ["National/international ranking (UTR, ITF)", "Performance in recent tournaments", "Attitude, discipline and potential", "University team needs"],
                  note: es
                    ? "Otorgada directamente por el entrenador universitario."
                    : "Awarded directly by the university coach.",
                },
                {
                  title: es ? "Beca Académica" : "Academic Scholarship",
                  icon: BookOpen,
                  items: es
                    ? ["GPA del bachillerato (mínimo 2.5/4.0)", "Nivel de inglés (Duolingo, TOEFL, IELTS)", "Historial académico completo", "Se mantiene si mantienes buenas notas"]
                    : ["High school GPA (minimum 2.5/4.0)", "English level (Duolingo, TOEFL, IELTS)", "Complete academic record", "Maintained if you keep good grades"],
                  note: es
                    ? "Puede combinarse con la beca deportiva."
                    : "Can be combined with athletic scholarship.",
                },
              ].map((b) => (
                <div
                  key={b.title}
                  className="rounded-2xl p-7 sm:p-8 bg-white border"
                  style={{ borderColor: "hsl(var(--border))" }}
                >
                  <div className="flex items-center gap-4 mb-6">
                    <div
                      className="w-14 h-14 rounded-xl flex items-center justify-center"
                      style={{ backgroundColor: `${RED}15` }}
                    >
                      <b.icon className="w-7 h-7" style={{ color: RED }} />
                    </div>
                    <h3 className="font-display text-2xl font-bold" style={{ color: NAVY }}>
                      {b.title}
                    </h3>
                  </div>
                  <ul className="space-y-3 mb-6">
                    {b.items.map((it) => (
                      <li
                        key={it}
                        className="flex gap-2 font-body text-sm leading-relaxed"
                        style={{ color: NAVY }}
                      >
                        <CheckCircle className="w-4 h-4 shrink-0 mt-0.5" style={{ color: RED }} />
                        <span>{it}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="font-body text-sm italic text-muted-foreground border-t pt-4">
                    {b.note}
                  </p>
                </div>
              ))}
            </div>

            {/* Guarantee banner */}
            <div
              className="rounded-2xl p-8 sm:p-10 text-center text-white"
              style={{
                background: `linear-gradient(135deg, ${NAVY} 0%, ${RED} 100%)`,
              }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/15 mb-4">
                <Award className="w-4 h-4 text-white" />
                <span className="text-xs font-semibold uppercase tracking-wider font-body">
                  {es ? "Nuestro resultado" : "Our result"}
                </span>
              </div>
              <h3 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold mb-2">
                {es ? "El 100% de nuestros atletas" : "100% of our athletes"}
              </h3>
              <p className="font-body text-base sm:text-lg text-white/85 mb-8">
                {es
                  ? "obtienen becas entre el 75% y el 100% de cobertura"
                  : "receive scholarships covering 75% to 100%"}
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-10">
                <div className="text-center">
                  <p className="font-body text-xs uppercase tracking-wider text-white/60 mb-1">
                    {es ? "Sin beca" : "Without scholarship"}
                  </p>
                  <p className="font-display text-xl sm:text-2xl font-bold line-through opacity-70">
                    $20k – $40k {es ? "/ año" : "/ year"}
                  </p>
                </div>
                <div className="font-display text-3xl">→</div>
                <div className="text-center">
                  <p className="font-body text-xs uppercase tracking-wider text-white/60 mb-1">
                    {es ? "Con FUA Sports" : "With FUA Sports"}
                  </p>
                  <p className="font-display text-2xl sm:text-3xl font-bold">
                    $6k – $12k {es ? "/ año" : "/ year"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── PROCESS ── */}
        <section id="process" className="py-24 md:py-32 px-4" style={{ backgroundColor: NAVY }}>
          <div className="container-wide max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <span
                className="inline-block text-xs font-semibold uppercase tracking-widest mb-4 font-body"
                style={{ color: RED }}
              >
                {es ? "Hoja de ruta" : "Roadmap"}
              </span>
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold mb-3 text-white">
                {es ? "El Proceso FUA — 6 Pasos" : "The FUA Process — 6 Steps"}
              </h2>
              <div style={{ width: 40, height: 3, background: RED, margin: "0 auto 20px" }} />
              <p className="font-body text-base sm:text-lg text-white/70 max-w-3xl mx-auto leading-relaxed">
                {es
                  ? "Nuestro equipo acompaña al atleta y a la familia en cada paso, desde el primer contacto hasta la llegada a la universidad."
                  : "Our team accompanies the athlete and family at each step, from first contact to university arrival."}
              </p>
            </div>

            <div className="relative">
              {/* Vertical line */}
              <div
                className="hidden md:block absolute left-8 top-4 bottom-4 w-0.5"
                style={{ backgroundColor: "rgba(255,255,255,0.15)" }}
              />

              <div className="space-y-6">
                {[
                  { num: "01", icon: Users, title: es ? "Evaluación del Atleta" : "Athlete Evaluation", desc: es ? "Analizamos tu perfil deportivo y académico completo para identificar las mejores oportunidades y universidades que encajan con tu nivel y objetivos." : "We analyze your complete athletic and academic profile to identify the best opportunities and universities that match your level and goals." },
                  { num: "02", icon: Star, title: es ? "Preparación del Perfil" : "Profile Preparation", desc: es ? "Creamos tu perfil completo de tenista y el video de highlights profesional para presentarte ante coaches universitarios de forma impactante." : "We create your complete tennis profile and professional highlights video to present you to university coaches impressively." },
                  { num: "03", icon: Users, title: es ? "Contacto con Universidades" : "University Contact", desc: es ? "Hablamos directamente con entrenadores para conseguir ofertas deportivas y académicas. Usamos nuestra red de más de 40 universidades partner." : "We speak directly with coaches to secure athletic and academic offers. We use our network of 40+ partner universities." },
                  { num: "04", icon: Trophy, title: es ? "Recepción y Elección de Oferta" : "Receiving and Choosing Offer", desc: es ? "El jugador y la familia analizan con nuestro equipo las mejores ofertas recibidas y eligen la universidad y programa ideal." : "The player and family analyze the best offers received with our team and choose the ideal university and program." },
                  { num: "05", icon: Shield, title: es ? "Admisión y Visa F-1" : "Admission and F-1 Visa", desc: es ? "Gestionamos todo el proceso de admisión universitaria y acompañamos en el trámite de la visa de estudiante F-1 paso a paso." : "We manage the entire university admission process and accompany the F-1 student visa process step by step." },
                  { num: "06", icon: Plane, title: es ? "Viaje a Estados Unidos" : "Travel to the United States", desc: es ? "Organizamos la llegada del jugador, la orientación en el campus y el inicio de su etapa académica y deportiva en EE.UU." : "We organize the player's arrival, campus orientation and the start of their academic and athletic journey in the US." },
                ].map((step) => (
                  <div key={step.num} className="relative flex gap-5 md:gap-6 items-start">
                    <div
                      className="relative z-10 shrink-0 w-16 h-16 rounded-full flex items-center justify-center font-display text-lg font-bold text-white shadow-lg"
                      style={{ backgroundColor: RED }}
                    >
                      {step.num}
                    </div>
                    <div
                      className="flex-1 rounded-xl p-5 sm:p-6"
                      style={{
                        backgroundColor: "rgba(255,255,255,0.06)",
                        border: "1px solid rgba(255,255,255,0.1)",
                      }}
                    >
                      <h3 className="font-display text-lg sm:text-xl font-bold mb-2 text-white">
                        {step.title}
                      </h3>
                      <p className="font-body text-sm sm:text-base leading-relaxed" style={{ color: "rgba(255,255,255,0.7)" }}>
                        {step.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── STUDENT ATHLETE LIFE ── */}
        <section className="py-24 md:py-32 px-4" style={{ backgroundColor: "hsl(var(--background))" }}>
          <div className="container-wide max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <span
                className="inline-block text-xs font-semibold uppercase tracking-widest mb-4 font-body"
                style={{ color: RED }}
              >
                {es ? "La experiencia" : "The experience"}
              </span>
              <h2
                className="font-display text-3xl sm:text-4xl md:text-5xl font-bold mb-3"
                style={{ color: NAVY }}
              >
                {es ? "Vida del Estudiante-Atleta" : "Student-Athlete Life"}
              </h2>
              <div style={{ width: 40, height: 3, background: RED, margin: "0 auto 20px" }} />
              <p className="font-body text-base sm:text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                {es
                  ? "Todo lo que necesitas saber sobre cómo será la vida de tu hijo/a en una universidad americana."
                  : "Everything you need to know about what life will be like for your child at an American university."}
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-12">
              {[
                {
                  title: es ? "Vivir On Campus" : "Living On Campus",
                  image: campusDorm,
                  items: es
                    ? ["Residencias dentro del campus", "Seguridad y supervisión 24/7", "Internet y servicios incluidos", "Lavandería y zonas de estudio", "Cercanía a pistas y clases"]
                    : ["Residences within campus", "24/7 security and supervision", "Internet and basic services included", "Laundry and study areas", "Close to courts and classes"],
                },
                {
                  title: es ? "Vivir Off Campus" : "Living Off Campus",
                  image: campusOffcampus,
                  items: es
                    ? ["Apartamentos compartidos", "Mayor independencia", "Cocina propia disponible", "A pocos minutos del campus", "Más económico en muchos casos"]
                    : ["Shared apartments", "Greater independence", "Own kitchen available", "Minutes from campus", "More economical in many cases"],
                },
                {
                  title: es ? "Alimentación (Meal Plan)" : "Meal Plan",
                  image: campusDining,
                  items: es
                    ? ["Cafeterías en campus", "Desayuno, comida y cena incluidos", "Opciones para deportistas", "Meal Plan completo o parcial", "Opción de cocinar en casa"]
                    : ["University cafeterias on campus", "Breakfast, lunch and dinner included", "Options adapted for athletes", "Full or partial Meal Plan", "Option to cook at home"],
                },
                {
                  title: es ? "Seguro Médico" : "Health Insurance",
                  image: campusMedical,
                  items: es
                    ? ["Obligatorio para internacionales", "Visitas médicas cubiertas", "Lesiones deportivas incluidas", "Fisioterapia del equipo", "Urgencias y hospitalización"]
                    : ["Mandatory for all internationals", "Medical visits covered", "Sports injuries included", "Team physiotherapy", "Emergencies and hospitalization"],
                },
              ].map((card) => (
                <div
                  key={card.title}
                  className="group relative rounded-xl overflow-hidden flex flex-col min-h-[360px]"
                  style={{ backgroundColor: NAVY }}
                >
                  <img
                    src={card.image}
                    alt={card.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                    loading="lazy"
                  />
                  <div
                    className="absolute inset-0 transition-opacity duration-500 ease-out group-hover:opacity-30"
                    style={{
                      background:
                        "linear-gradient(180deg, rgba(18,33,58,0.45) 0%, rgba(18,33,58,0.70) 55%, rgba(18,33,58,0.92) 100%)",
                    }}
                  />
                  <div className="relative p-6 flex flex-col h-full">
                    <h3
                      className="font-display text-base font-bold text-white"
                      style={{ textShadow: "0 2px 8px rgba(0,0,0,0.6)" }}
                    >
                      {card.title}
                    </h3>
                    <ul className="space-y-2 mt-auto transition-opacity duration-300 ease-out group-hover:opacity-0">
                      {card.items.map((it) => (
                        <li
                          key={it}
                          className="flex gap-2 font-body text-xs sm:text-sm leading-relaxed text-white/90"
                          style={{ textShadow: "0 1px 4px rgba(0,0,0,0.5)" }}
                        >
                          <CheckCircle className="w-3.5 h-3.5 shrink-0 mt-0.5 text-white" />
                          <span>{it}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* ── REQUIREMENTS ── */}
        <section
          className="py-24 md:py-32 px-4"
          style={{ backgroundColor: "hsl(var(--section-alt))", borderTop: "1px solid rgba(0,0,0,0.05)" }}
        >
          <div className="container-wide max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <span
                className="inline-block text-xs font-semibold uppercase tracking-widest mb-4 font-body"
                style={{ color: RED }}
              >
                {es ? "Lo que necesitas" : "What you need"}
              </span>
              <h2
                className="font-display text-3xl sm:text-4xl md:text-5xl font-bold mb-3"
                style={{ color: NAVY }}
              >
                {es ? "Requisitos para Aplicar" : "Requirements to Apply"}
              </h2>
              <div style={{ width: 40, height: 3, background: RED, margin: "0 auto 0" }} />
            </div>

            <div className="rounded-2xl p-7 sm:p-10 bg-white border" style={{ borderColor: "hsl(var(--border))" }}>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <BookOpen className="w-5 h-5" style={{ color: RED }} />
                    <h4 className="font-display text-lg font-bold" style={{ color: NAVY }}>
                      {es ? "Académicos" : "Academic"}
                    </h4>
                  </div>
                  <ul className="space-y-2">
                    {(es
                      ? ["Haber terminado secundaria y bachillerato", "Expediente académico completo", "GPA mínimo de 2.5/4.0"]
                      : ["Completed high school and baccalaureate", "Complete academic record", "Minimum GPA of 2.5/4.0"]
                    ).map((it) => (
                      <li
                        key={it}
                        className="flex gap-2 font-body text-sm leading-relaxed"
                        style={{ color: NAVY }}
                      >
                        <CheckCircle className="w-4 h-4 shrink-0 mt-0.5" style={{ color: RED }} />
                        <span>{it}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <Award className="w-5 h-5" style={{ color: RED }} />
                    <h4 className="font-display text-lg font-bold" style={{ color: NAVY }}>
                      {es ? "Inglés" : "English"}
                    </h4>
                  </div>
                  <ul className="space-y-2">
                    {(es
                      ? ["Duolingo English Test (recomendado)", "TOEFL iBT", "IELTS", "No se requiere nivel perfecto"]
                      : ["Duolingo English Test (recommended)", "TOEFL iBT", "IELTS", "Perfect level not required"]
                    ).map((it) => (
                      <li
                        key={it}
                        className="flex gap-2 font-body text-sm leading-relaxed"
                        style={{ color: NAVY }}
                      >
                        <CheckCircle className="w-4 h-4 shrink-0 mt-0.5" style={{ color: RED }} />
                        <span>{it}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section
          className="py-24 md:py-32 px-4"
          style={{ backgroundColor: "hsl(var(--background))", borderTop: "1px solid rgba(0,0,0,0.05)" }}
        >
          <div className="container-wide max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h2
                className="font-display text-3xl sm:text-4xl md:text-5xl font-bold mb-3"
                style={{ color: NAVY }}
              >
                {es ? "Preguntas Frecuentes" : "Frequently Asked Questions"}
              </h2>
              <div style={{ width: 40, height: 3, background: RED, margin: "0 auto 0" }} />
            </div>
            <Accordion type="single" collapsible className="space-y-3">
              {(es
                ? [
                    { q: "¿Qué nivel de tenis necesito para conseguir una beca?", a: "Trabajamos con jugadores desde ranking ITF junior hasta jugadores con historial competitivo en ligas regionales. No se requiere ser profesional — el sistema NCAA y NAIA tiene opciones para muchos niveles." },
                    { q: "¿Es necesario hablar inglés perfectamente?", a: "No. Un nivel intermedio es suficiente para comenzar. Las universidades ofrecen programas de apoyo lingüístico, y el inglés mejora rápidamente al vivir en EE.UU." },
                    { q: "¿Cuánto tiempo dura el proceso?", a: "Normalmente entre 6 y 18 meses desde la evaluación inicial hasta el inicio en la universidad. Recomendamos comenzar al menos un año antes de la fecha de entrada deseada." },
                    { q: "¿Qué pasa si no cumplo algún requisito académico?", a: "FUA diseña un plan de preparación personalizado. En muchos casos, los Junior Colleges (NJCAA) son una excelente puerta de entrada con requisitos más accesibles." },
                    { q: "¿La beca cubre todos los gastos?", a: "La mayoría de nuestros atletas obtienen becas que cubren entre el 75% y el 100% de los gastos. La combinación de beca deportiva + académica puede cubrir matrícula, alojamiento, comida y materiales." },
                  ]
                : [
                    { q: "What tennis level do I need to get a scholarship?", a: "We work with players from ITF junior rankings to players with competitive history in regional leagues. You don't need to be professional — the NCAA and NAIA system has options for many levels." },
                    { q: "Is perfect English required?", a: "No. An intermediate level is sufficient to start. Universities offer language support programs, and English improves quickly when living in the US." },
                    { q: "How long does the process take?", a: "Usually 6-18 months from initial evaluation to university start. We recommend starting at least a year before the desired entry date." },
                    { q: "What if I don't meet some academic requirement?", a: "FUA designs a personalized preparation plan. In many cases, Junior Colleges (NJCAA) are an excellent entry point with more accessible requirements." },
                    { q: "Does the scholarship cover all expenses?", a: "Most of our athletes receive scholarships covering 75-100% of expenses. The combination of athletic + academic scholarship can cover tuition, housing, meals and materials." },
                  ]
              ).map((faq, i) => (
                <AccordionItem
                  key={i}
                  value={`item-${i}`}
                  className="rounded-xl border bg-white px-5"
                  style={{ borderColor: "hsl(var(--border))" }}
                >
                  <AccordionTrigger
                    className="font-display text-base sm:text-lg font-bold hover:no-underline text-left"
                    style={{ color: NAVY }}
                  >
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="font-body text-sm sm:text-base text-muted-foreground leading-relaxed">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        {/* ── CTA FINAL ── */}
        <section className="py-24 px-4" style={{ backgroundColor: NAVY }}>
          <div className="container-wide max-w-3xl mx-auto text-center">
            <div
              className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-6"
              style={{ backgroundColor: RED }}
            >
              <Trophy className="w-8 h-8 text-white" />
            </div>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-5">
              {es
                ? "Tu carrera en el tenis universitario comienza hoy"
                : "Your university tennis career starts today"}
            </h2>
            <p className="font-body text-base sm:text-lg text-white/70 mb-10 leading-relaxed">
              {es
                ? "Agenda una evaluación gratuita con nuestro equipo. Sin compromiso. Analizamos tu perfil y te decimos exactamente qué opciones tienes."
                : "Schedule a free evaluation with our team. No commitment. We analyze your profile and tell you exactly what options you have."}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <a
                href={CALENDLY}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 font-body font-semibold px-8 py-4 rounded-lg text-white transition-all hover:opacity-90 hover:scale-[1.02]"
                style={{ backgroundColor: RED }}
              >
                {es ? "Agenda tu Evaluación Gratuita" : "Schedule Free Evaluation"}
                <ArrowRight className="w-5 h-5" />
              </a>
              <Link
                to="/sports"
                className="inline-flex items-center justify-center gap-2 font-body font-semibold px-8 py-4 rounded-lg text-white border border-white/20 transition-colors hover:bg-white/10"
              >
                {es ? "Ver otros deportes" : "See other sports"}
              </Link>
            </div>
            <p className="font-body text-sm text-white/60">
              {es ? "También puedes escribirnos a " : "You can also write to us at "}
              <a
                href="mailto:futboluagency@gmail.com"
                className="text-white/80 hover:text-white transition-colors underline"
              >
                futboluagency@gmail.com
              </a>
            </p>
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
};

export default TennisPage;
