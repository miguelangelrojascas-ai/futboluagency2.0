import { Link } from "react-router-dom";
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
import tennisPlayerImg from "@/assets/tennis-player.jpg";
import fuaSportsLogo from "@/assets/fua-sports-logo.png";
import Footer from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const NAVY = "#12213a";
const RED = "#b00717";
const LIGHT = "#fafaf8";
const CALENDLY = "https://calendly.com/futbolu-agency";

const TennisPage = () => {
  const { language } = useLanguage();
  const es = language === "es";

  return (
    <>
      <Navbar />
      <main className="min-h-screen" style={{ backgroundColor: LIGHT }}>
        {/* ── HERO ── */}
        <section
          className="relative pt-28 md:pt-36 pb-20 md:pb-28 px-4 overflow-hidden"
          style={{ backgroundColor: NAVY }}
        >
          {/* Decorative background */}
          <div className="absolute inset-0 pointer-events-none">
            <div
              className="absolute -top-32 -right-32 w-96 h-96 rounded-full opacity-20 blur-3xl"
              style={{ background: RED }}
            />
            <div
              className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full opacity-10 blur-3xl"
              style={{ background: "#3b82f6" }}
            />
          </div>

          <div className="relative container-wide max-w-6xl mx-auto">
            {/* FUA Sports logo */}
            <div className="flex justify-center mb-6">
              <Link to="/sports">
                <img src={fuaSportsLogo} alt="FUA Sports" className="h-12 sm:h-14 md:h-16 w-auto" />
              </Link>
            </div>

            {/* Breadcrumb */}
            <div className="flex items-center justify-center gap-2 text-sm text-white/60 mb-8 font-body">
              <Link to="/sports" className="hover:text-white transition-colors">
                FUA Sports
              </Link>
              <ChevronRight className="w-4 h-4" />
              <span className="text-white/90">{es ? "Tenis" : "Tennis"}</span>
            </div>

            {/* Badge */}
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 border"
              style={{
                borderColor: "rgba(176,7,23,0.4)",
                backgroundColor: "rgba(176,7,23,0.12)",
              }}
            >
              <Star className="w-4 h-4" style={{ color: RED }} fill={RED} />
              <span className="text-xs sm:text-sm font-medium text-white font-body">
                {es ? "100% de atletas con beca" : "100% of athletes with scholarship"}
              </span>
            </div>

            <h1
              className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight max-w-4xl"
              style={{ textShadow: "0 2px 16px rgba(0,0,0,0.5)" }}
            >
              {es ? "Becas de Tenis" : "Tennis Scholarships"}
              <br />
              <span style={{ color: RED }}>{es ? "Universitario en EE.UU." : "in the United States"}</span>
            </h1>

            <p className="font-body text-base sm:text-lg md:text-xl text-white/75 max-w-3xl mb-12 leading-relaxed">
              {es
                ? "Acompañamiento cercano para conseguir la beca que tu talento merece. De tu club local a la universidad americana de tus sueños."
                : "Close guidance to secure the scholarship your talent deserves. From your local club to your dream American university."}
            </p>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12 max-w-4xl">
              {[
                { num: "75–100%", label: es ? "Cobertura de beca" : "Scholarship coverage" },
                { num: "NCAA · NAIA · NJCAA", label: es ? "Divisiones disponibles" : "Available divisions" },
                { num: "100%", label: es ? "Atletas con beca" : "Athletes with scholarship" },
              ].map((s) => (
                <div
                  key={s.label}
                  className="rounded-xl border border-white/10 px-5 py-5"
                  style={{ backgroundColor: "rgba(255,255,255,0.04)" }}
                >
                  <div className="font-display text-xl sm:text-2xl font-bold mb-1" style={{ color: RED }}>
                    {s.num}
                  </div>
                  <div className="font-body text-xs text-white/65 uppercase tracking-wider">{s.label}</div>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4">
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
              <a
                href="#process"
                className="inline-flex items-center justify-center gap-2 font-body font-semibold px-8 py-4 rounded-lg text-white border border-white/20 transition-colors hover:bg-white/10"
              >
                {es ? "Ver el proceso" : "See the process"}
              </a>
            </div>
          </div>
        </section>

        {/* ── WHY TENNIS ── */}
        <section className="py-24 md:py-32 px-4" style={{ backgroundColor: "#ffffff" }}>
          <div className="container-wide max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <span
                className="inline-block text-xs font-semibold uppercase tracking-widest mb-4 font-body"
                style={{ color: RED }}
              >
                {es ? "La oportunidad" : "The opportunity"}
              </span>
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold mb-3" style={{ color: NAVY }}>
                {es ? "¿Por qué el Tenis Universitario en EE.UU.?" : "Why University Tennis in the USA?"}
              </h2>
              <div style={{ width: 40, height: 3, background: RED, margin: "0 auto 20px" }} />
              <p className="font-body text-base sm:text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                {es
                  ? "Estados Unidos ofrece el sistema deportivo y educativo más completo del mundo. Miles de familias ya han tomado esta decisión."
                  : "The United States offers the most complete sports and educational system in the world."}
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-10 items-start">
              {/* Tennis ball visual */}
              <div className="rounded-2xl aspect-[4/5] relative overflow-hidden shadow-2xl">
                <img
                  src={tennisPlayerImg}
                  alt={es ? "Jugador de tenis ejecutando un golpe" : "Tennis player executing a stroke"}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>

              <div className="space-y-5">
                {[
                  {
                    icon: BookOpen,
                    title: es ? "Educación de alta calidad" : "High quality education",
                    desc: es
                      ? "Títulos universitarios con reconocimiento internacional que abren puertas en todo el mundo."
                      : "Internationally recognized university degrees that open doors worldwide.",
                  },
                  {
                    icon: Trophy,
                    title: es ? "Entorno profesional" : "Professional environment",
                    desc: es
                      ? "Entrenamientos 4–5 días por semana con preparadores físicos, fisioterapeutas y tutores académicos."
                      : "Training 4–5 days per week with physical trainers, physiotherapists and academic tutors.",
                  },
                  {
                    icon: Shield,
                    title: es ? "Instalaciones de élite" : "Elite facilities",
                    desc: es
                      ? "Pistas indoor y outdoor de primer nivel, gimnasio, sala de fisioterapia y tecnología de última generación."
                      : "Top-level indoor and outdoor courts, gym, physiotherapy room and cutting-edge technology.",
                  },
                  {
                    icon: Users,
                    title: es ? "Desarrollo personal" : "Personal development",
                    desc: es
                      ? "Mejora del inglés, madurez personal y crecimiento a través de una competición organizada e internacional."
                      : "English improvement, personal maturity and growth through organized international competition.",
                  },
                ].map((f) => (
                  <div
                    key={f.title}
                    className="flex gap-4 p-6 rounded-xl border"
                    style={{ borderColor: "#e5e5e5", backgroundColor: "#fafaf8" }}
                  >
                    <div
                      className="shrink-0 w-12 h-12 rounded-lg flex items-center justify-center"
                      style={{ backgroundColor: `${RED}15` }}
                    >
                      <f.icon className="w-6 h-6" style={{ color: RED }} />
                    </div>
                    <div>
                      <h3 className="font-display text-lg font-bold mb-1" style={{ color: NAVY }}>
                        {f.title}
                      </h3>
                      <p className="font-body text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── LEAGUE SYSTEM ── */}
        <section
          className="py-24 md:py-32 px-4"
          style={{ backgroundColor: "#f5f4f2", borderTop: "1px solid rgba(0,0,0,0.05)" }}
        >
          <div className="container-wide max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <span
                className="inline-block text-xs font-semibold uppercase tracking-widest mb-4 font-body"
                style={{ color: RED }}
              >
                {es ? "Ligas universitarias" : "University leagues"}
              </span>
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold mb-3" style={{ color: NAVY }}>
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
                    ? [
                        "Nivel más alto competitivo",
                        "Universidades grandes y reconocidas",
                        "Becas deportivas importantes",
                        "Instalaciones profesionales",
                        "Máxima exigencia",
                      ]
                    : [
                        "Highest competitive level",
                        "Large, well-known universities",
                        "Significant athletic scholarships",
                        "Professional facilities",
                        "Maximum demands",
                      ],
                  scholarship: "70–100%",
                },
                {
                  name: "NCAA División 2",
                  color: "#1e3a6e",
                  features: es
                    ? [
                        "Nivel alto competitivo",
                        "Equilibrio deporte / estudios",
                        "Becas deportivas y académicas",
                        "Muy buenas instalaciones",
                        "Gran ambiente universitario",
                      ]
                    : [
                        "High competitive level",
                        "Balance sport / studies",
                        "Athletic and academic scholarships",
                        "Very good facilities",
                        "Great university atmosphere",
                      ],
                  scholarship: "50–90%",
                },
                {
                  name: "NAIA",
                  color: "#2d5a8e",
                  features: es
                    ? [
                        "Gran nivel competitivo",
                        "Más flexibilidad en admisiones",
                        "Becas deportivas disponibles",
                        "Buen desarrollo académico",
                        "Proceso más accesible",
                      ]
                    : [
                        "Great competitive level",
                        "More flexibility in admissions",
                        "Athletic scholarships available",
                        "Good academic development",
                        "More accessible process",
                      ],
                  scholarship: "40–80%",
                },
              ].map((league) => (
                <div
                  key={league.name}
                  className="rounded-2xl overflow-hidden border bg-white shadow-sm hover:shadow-lg transition-shadow"
                  style={{ borderColor: "#e5e5e5" }}
                >
                  <div className="p-6" style={{ backgroundColor: league.color }}>
                    <div className="text-xs font-medium text-white/60 uppercase tracking-wider mb-1 font-body">
                      {es ? "División" : "Division"}
                    </div>
                    <h3 className="font-display text-2xl font-bold text-white mb-3">{league.name}</h3>
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
                        <li key={f} className="flex gap-2 font-body text-sm leading-relaxed" style={{ color: NAVY }}>
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
          style={{ backgroundColor: "#ffffff", borderTop: "1px solid rgba(0,0,0,0.05)" }}
        >
          <div className="container-wide max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <span
                className="inline-block text-xs font-semibold uppercase tracking-widest mb-4 font-body"
                style={{ color: RED }}
              >
                {es ? "Realidad financiera" : "Financial reality"}
              </span>
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold mb-3" style={{ color: NAVY }}>
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
                    ? [
                        "Ranking nacional / internacional (UTR, ITF)",
                        "Rendimiento en torneos recientes",
                        "Actitud, disciplina y potencial",
                        "Necesidades del equipo universitario",
                      ]
                    : [
                        "National/international ranking (UTR, ITF)",
                        "Performance in recent tournaments",
                        "Attitude, discipline and potential",
                        "University team needs",
                      ],
                  note: es
                    ? "Otorgada directamente por el entrenador universitario."
                    : "Awarded directly by the university coach.",
                },
                {
                  title: es ? "Beca Académica" : "Academic Scholarship",
                  icon: BookOpen,
                  items: es
                    ? [
                        "GPA del bachillerato (mínimo 2.5/4.0)",
                        "Nivel de inglés (Duolingo, TOEFL, IELTS)",
                        "Historial académico completo",
                        "Se mantiene si mantienes buenas notas",
                      ]
                    : [
                        "High school GPA (minimum 2.5/4.0)",
                        "English level (Duolingo, TOEFL, IELTS)",
                        "Complete academic record",
                        "Maintained if you keep good grades",
                      ],
                  note: es ? "Puede combinarse con la beca deportiva." : "Can be combined with athletic scholarship.",
                },
              ].map((b) => (
                <div
                  key={b.title}
                  className="rounded-2xl p-7 sm:p-8 bg-white border"
                  style={{ borderColor: "#e5e5e5" }}
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
                      <li key={it} className="flex gap-2 font-body text-sm leading-relaxed" style={{ color: NAVY }}>
                        <CheckCircle className="w-4 h-4 shrink-0 mt-0.5" style={{ color: RED }} />
                        <span>{it}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="font-body text-sm italic text-muted-foreground border-t pt-4">{b.note}</p>
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
                  <p className="font-display text-2xl sm:text-3xl font-bold">$6k – $12k {es ? "/ año" : "/ year"}</p>
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
                  {
                    num: "01",
                    icon: Users,
                    title: es ? "Evaluación del Atleta" : "Athlete Evaluation",
                    desc: es
                      ? "Analizamos tu perfil deportivo y académico completo para identificar las mejores oportunidades y universidades que encajan con tu nivel y objetivos."
                      : "We analyze your complete athletic and academic profile to identify the best opportunities and universities that match your level and goals.",
                  },
                  {
                    num: "02",
                    icon: Star,
                    title: es ? "Preparación del Perfil" : "Profile Preparation",
                    desc: es
                      ? "Creamos tu perfil completo de tenista y el video de highlights profesional para presentarte ante coaches universitarios de forma impactante."
                      : "We create your complete tennis profile and professional highlights video to present you to university coaches impressively.",
                  },
                  {
                    num: "03",
                    icon: Users,
                    title: es ? "Contacto con Universidades" : "University Contact",
                    desc: es
                      ? "Hablamos directamente con entrenadores para conseguir ofertas deportivas y académicas. Usamos nuestra red de más de 40 universidades partner."
                      : "We speak directly with coaches to secure athletic and academic offers. We use our network of 40+ partner universities.",
                  },
                  {
                    num: "04",
                    icon: Trophy,
                    title: es ? "Recepción y Elección de Oferta" : "Receiving and Choosing Offer",
                    desc: es
                      ? "El jugador y la familia analizan con nuestro equipo las mejores ofertas recibidas y eligen la universidad y programa ideal."
                      : "The player and family analyze the best offers received with our team and choose the ideal university and program.",
                  },
                  {
                    num: "05",
                    icon: Shield,
                    title: es ? "Admisión y Visa F-1" : "Admission and F-1 Visa",
                    desc: es
                      ? "Gestionamos todo el proceso de admisión universitaria y acompañamos en el trámite de la visa de estudiante F-1 paso a paso."
                      : "We manage the entire university admission process and accompany the F-1 student visa process step by step.",
                  },
                  {
                    num: "06",
                    icon: Plane,
                    title: es ? "Viaje a Estados Unidos" : "Travel to the United States",
                    desc: es
                      ? "Organizamos la llegada del jugador, la orientación en el campus y el inicio de su etapa académica y deportiva en EE.UU."
                      : "We organize the player's arrival, campus orientation and the start of their academic and athletic journey in the US.",
                  },
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
                      <h3 className="font-display text-lg sm:text-xl font-bold mb-2 text-white">{step.title}</h3>
                      <p
                        className="font-body text-sm sm:text-base leading-relaxed"
                        style={{ color: "rgba(255,255,255,0.7)" }}
                      >
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
        <section
          className="py-24 md:py-32 px-4"
          style={{ backgroundColor: "#f5f4f2", borderTop: "1px solid rgba(0,0,0,0.05)" }}
        >
          <div className="container-wide max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <span
                className="inline-block text-xs font-semibold uppercase tracking-widest mb-4 font-body"
                style={{ color: RED }}
              >
                {es ? "La experiencia" : "The experience"}
              </span>
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold mb-3" style={{ color: NAVY }}>
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
                  icon: Shield,
                  title: es ? "Vivir On Campus" : "Living On Campus",
                  items: es
                    ? [
                        "Residencias dentro del campus",
                        "Seguridad y supervisión 24/7",
                        "Internet y servicios incluidos",
                        "Lavandería y zonas de estudio",
                        "Cercanía a pistas y clases",
                      ]
                    : [
                        "Residences within campus",
                        "24/7 security and supervision",
                        "Internet and basic services included",
                        "Laundry and study areas",
                        "Close to courts and classes",
                      ],
                },
                {
                  icon: Users,
                  title: es ? "Vivir Off Campus" : "Living Off Campus",
                  items: es
                    ? [
                        "Apartamentos compartidos",
                        "Mayor independencia",
                        "Cocina propia disponible",
                        "A pocos minutos del campus",
                        "Más económico en muchos casos",
                      ]
                    : [
                        "Shared apartments",
                        "Greater independence",
                        "Own kitchen available",
                        "Minutes from campus",
                        "More economical in many cases",
                      ],
                },
                {
                  icon: Heart,
                  title: es ? "Alimentación (Meal Plan)" : "Meal Plan",
                  items: es
                    ? [
                        "Cafeterías en campus",
                        "Desayuno, comida y cena incluidos",
                        "Opciones para deportistas",
                        "Meal Plan completo o parcial",
                        "Opción de cocinar en casa",
                      ]
                    : [
                        "University cafeterias on campus",
                        "Breakfast, lunch and dinner included",
                        "Options adapted for athletes",
                        "Full or partial Meal Plan",
                        "Option to cook at home",
                      ],
                },
                {
                  icon: Shield,
                  title: es ? "Seguro Médico" : "Health Insurance",
                  items: es
                    ? [
                        "Obligatorio para internacionales",
                        "Visitas médicas cubiertas",
                        "Lesiones deportivas incluidas",
                        "Fisioterapia del equipo",
                        "Urgencias y hospitalización",
                      ]
                    : [
                        "Mandatory for all internationals",
                        "Medical visits covered",
                        "Sports injuries included",
                        "Team physiotherapy",
                        "Emergencies and hospitalization",
                      ],
                },
              ].map((card) => (
                <div key={card.title} className="rounded-xl p-6 bg-white border" style={{ borderColor: "#e5e5e5" }}>
                  <div
                    className="w-11 h-11 rounded-lg flex items-center justify-center mb-4"
                    style={{ backgroundColor: `${RED}15` }}
                  >
                    <card.icon className="w-5 h-5" style={{ color: RED }} />
                  </div>
                  <h3 className="font-display text-base font-bold mb-3" style={{ color: NAVY }}>
                    {card.title}
                  </h3>
                  <ul className="space-y-2">
                    {card.items.map((it) => (
                      <li
                        key={it}
                        className="flex gap-2 font-body text-xs sm:text-sm leading-relaxed text-muted-foreground"
                      >
                        <CheckCircle className="w-3.5 h-3.5 shrink-0 mt-0.5" style={{ color: RED }} />
                        <span>{it}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── REQUIREMENTS ── */}
        <section
          className="py-24 md:py-32 px-4"
          style={{ backgroundColor: "#ffffff", borderTop: "1px solid rgba(0,0,0,0.05)" }}
        >
          <div className="container-wide max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <span
                className="inline-block text-xs font-semibold uppercase tracking-widest mb-4 font-body"
                style={{ color: RED }}
              >
                {es ? "Lo que necesitas" : "What you need"}
              </span>
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold mb-3" style={{ color: NAVY }}>
                {es ? "Requisitos para Aplicar" : "Requirements to Apply"}
              </h2>
              <div style={{ width: 40, height: 3, background: RED, margin: "0 auto 0" }} />
            </div>

            <div className="rounded-2xl p-7 sm:p-10 bg-white border" style={{ borderColor: "#e5e5e5" }}>
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
                      ? [
                          "Haber terminado secundaria y bachillerato",
                          "Expediente académico completo",
                          "GPA mínimo de 2.5/4.0",
                        ]
                      : [
                          "Completed high school and baccalaureate",
                          "Complete academic record",
                          "Minimum GPA of 2.5/4.0",
                        ]
                    ).map((it) => (
                      <li key={it} className="flex gap-2 font-body text-sm leading-relaxed" style={{ color: NAVY }}>
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
                      <li key={it} className="flex gap-2 font-body text-sm leading-relaxed" style={{ color: NAVY }}>
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
          style={{ backgroundColor: "#f5f4f2", borderTop: "1px solid rgba(0,0,0,0.05)" }}
        >
          <div className="container-wide max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold mb-3" style={{ color: NAVY }}>
                {es ? "Preguntas Frecuentes" : "Frequently Asked Questions"}
              </h2>
              <div style={{ width: 40, height: 3, background: RED, margin: "0 auto 0" }} />
            </div>
            <Accordion type="single" collapsible className="space-y-3">
              {(es
                ? [
                    {
                      q: "¿Qué nivel de tenis necesito para conseguir una beca?",
                      a: "Trabajamos con jugadores desde ranking ITF junior hasta jugadores con historial competitivo en ligas regionales. No se requiere ser profesional — el sistema NCAA y NAIA tiene opciones para muchos niveles.",
                    },
                    {
                      q: "¿Es necesario hablar inglés perfectamente?",
                      a: "No. Un nivel intermedio es suficiente para comenzar. Las universidades ofrecen programas de apoyo lingüístico, y el inglés mejora rápidamente al vivir en EE.UU.",
                    },
                    {
                      q: "¿Cuánto tiempo dura el proceso?",
                      a: "Normalmente entre 6 y 18 meses desde la evaluación inicial hasta el inicio en la universidad. Recomendamos comenzar al menos un año antes de la fecha de entrada deseada.",
                    },
                    {
                      q: "¿Qué pasa si no cumplo algún requisito académico?",
                      a: "FUA diseña un plan de preparación personalizado. En muchos casos, los Junior Colleges (NJCAA) son una excelente puerta de entrada con requisitos más accesibles.",
                    },
                    {
                      q: "¿La beca cubre todos los gastos?",
                      a: "La mayoría de nuestros atletas obtienen becas que cubren entre el 75% y el 100% de los gastos. La combinación de beca deportiva + académica puede cubrir matrícula, alojamiento, comida y materiales.",
                    },
                  ]
                : [
                    {
                      q: "What tennis level do I need to get a scholarship?",
                      a: "We work with players from ITF junior rankings to players with competitive history in regional leagues. You don't need to be professional — the NCAA and NAIA system has options for many levels.",
                    },
                    {
                      q: "Is perfect English required?",
                      a: "No. An intermediate level is sufficient to start. Universities offer language support programs, and English improves quickly when living in the US.",
                    },
                    {
                      q: "How long does the process take?",
                      a: "Usually 6-18 months from initial evaluation to university start. We recommend starting at least a year before the desired entry date.",
                    },
                    {
                      q: "What if I don't meet some academic requirement?",
                      a: "FUA designs a personalized preparation plan. In many cases, Junior Colleges (NJCAA) are an excellent entry point with more accessible requirements.",
                    },
                    {
                      q: "Does the scholarship cover all expenses?",
                      a: "Most of our athletes receive scholarships covering 75-100% of expenses. The combination of athletic + academic scholarship can cover tuition, housing, meals and materials.",
                    },
                  ]
              ).map((faq, i) => (
                <AccordionItem
                  key={i}
                  value={`item-${i}`}
                  className="rounded-xl border bg-white px-5"
                  style={{ borderColor: "#e5e5e5" }}
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
              {es ? "Tu carrera en el tenis universitario comienza hoy" : "Your university tennis career starts today"}
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
