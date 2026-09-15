import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle, TrendingUp, Trophy, Languages, Video, BookOpen } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProcessSection from "@/components/ProcessSection";
import StudentAthleteExperience from "@/components/StudentAthleteExperience";
import PlayerProfilesSection from "@/components/usa/PlayerProfilesSection";
import UniversityMap from "@/components/UniversityMap";
import HubSpotFormModal from "@/components/HubSpotFormModal";
import { useHubSpotForm } from "@/hooks/useHubSpotForm";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";

const USA = () => {
  const { t } = useLanguage();
  const { isOpen, openForm, setIsOpen } = useHubSpotForm();

  const carouselImages = [
    "/images/process-01.jpg",
    "/images/process-02.jpg",
    "/images/process-03.jpg",
    "/images/process-04.jpg",
    "/images/process-05.jpg",
    "/images/process-06.jpg",
  ];
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveImage((prev) => (prev + 1) % carouselImages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    document.title = "Fútbol Universitario en USA | Becas NCAA, NAIA y JUCO – FutbolUAgency";
    document.querySelector('meta[name="description"]')?.setAttribute("content", "Descubre cómo conseguir una beca de fútbol en universidades americanas NCAA, NAIA y JUCO. Proceso, requisitos y casos de éxito reales.");
    document.querySelector('meta[property="og:title"]')?.setAttribute("content", "Fútbol Universitario en USA | FutbolUAgency");
    document.querySelector('meta[property="og:description"]')?.setAttribute("content", "Descubre cómo conseguir una beca de fútbol en universidades americanas NCAA, NAIA y JUCO. Proceso, requisitos y casos de éxito reales.");
  }, []);

  const divisions = [
    { name: "NCAA Division I", desc: t("usa.ncaa.d1"), level: t("usa.level.highest") },
    { name: "NCAA Division II", desc: t("usa.ncaa.d2"), level: t("usa.level.high") },
    { name: "NAIA", desc: t("usa.ncaa.naia"), level: t("usa.level.competitive") },
    { name: "JUCO", desc: t("usa.ncaa.juco"), level: t("usa.level.development") },
  ];

  const requirements = [
    {
      icon: BookOpen,
      num: "01",
      label: "BACHILLER O GRADO SUPERIOR",
      value: "16 — 23 años",
      desc: "Tener el título o estar en proceso de conseguirlo. Aplicable también para aquellos graduados que deseen cursar un Máster en EE.UU.",
    },
    {
      icon: Trophy,
      num: "02",
      label: "NIVEL FUTBOLÍSTICO COMPETITIVO",
      value: "Nivel de Élite",
      desc: "Jugar a un nivel competitivo (Liga Preferente, Nacional, División de Honor, Regional o equivalentes). Se requiere un currículum deportivo y videos de respaldo.",
    },
    {
      icon: Languages,
      num: "03",
      label: "NIVEL DE INGLÉS",
      value: "Intermedio — Alto",
      desc: "No es necesario ser experto inicialmente, pero se requiere obtener un nivel intermedio-alto para superar las pruebas exigidas (TOEFL o DUOLINGO).",
    },
    {
      icon: Video,
      num: "04",
      label: "VIDEO MEJORES JUGADAS",
      value: "4 — 6 Minutos",
      desc: "Capacidad de preparar un video de calidad con tus mejores jugadas y disponer de partidos completos para el análisis de los coaches universitarios.",
    },
  ];



  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-16 md:pt-20">
        {/* Hero */}
        <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
            src="/videos/spain-hero.mp4"
          />
          <div className="absolute inset-0 bg-black/60" />
          <div className="container-wide px-4 relative">
            <div className="max-w-4xl mx-auto text-center section-padding">
              <span className="inline-block mb-4 text-white/60 font-body text-xs tracking-[0.15em] uppercase">
                {t("usa.tag")}
              </span>
              <h1
                className="font-display text-3xl sm:text-4xl md:text-5xl mb-6 text-white"
                style={{ fontWeight: 800, textShadow: "0 2px 16px rgba(0,0,0,0.9)" }}
              >
                {t("usa.hero.title")} <span className="text-[#b00717] italic">{t("usa.hero.highlight")}</span>
              </h1>
              <p
                className="font-body font-medium text-gray-300 text-lg max-w-2xl mx-auto mb-8 leading-relaxed"
                style={{ textShadow: "0 1px 8px rgba(0,0,0,0.8)" }}
              >
                {t("usa.hero.desc")}
              </p>
              <button
                onClick={openForm}
                className="inline-flex items-center gap-2 bg-[#b00717] hover:bg-[#900612] text-white font-body font-semibold px-8 py-3.5 rounded-lg transition-colors text-sm sm:text-base"
              >
                {t("nav.applyCta")} <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
          <div
            className="absolute bottom-0 left-0 right-0 pointer-events-none"
            style={{ height: "100px", background: "linear-gradient(to bottom, transparent, #0a1628)" }}
          />
        </section>

        {/* La Oportunidad — narrative section */}
        <section style={{ backgroundColor: "#f5f4f2", padding: "80px 0" }}>
          <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
            {/* Left: Image Carousel */}
            <div style={{ position: "relative", overflow: "hidden", borderRadius: "16px", aspectRatio: "4/3", boxShadow: "0 20px 60px rgba(18,33,58,0.18)" }}>
              {carouselImages.map((src, i) => (
                <img
                  key={src}
                  src={src}
                  alt=""
                  loading="lazy"
                  style={{
                    position: "absolute",
                    inset: 0,
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    opacity: activeImage === i ? 1 : 0,
                    transition: "opacity 0.9s ease-in-out",
                  }}
                />
              ))}
              {/* Dot indicators */}
              <div style={{ position: "absolute", bottom: "16px", left: "50%", transform: "translateX(-50%)", display: "flex", gap: "8px", zIndex: 10 }}>
                {carouselImages.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImage(i)}
                    style={{
                      width: activeImage === i ? "24px" : "8px",
                      height: "8px",
                      borderRadius: "4px",
                      background: activeImage === i ? "#ffffff" : "rgba(255,255,255,0.5)",
                      border: "none",
                      cursor: "pointer",
                      transition: "all 0.3s ease",
                      padding: 0,
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Right: Text */}
            <div>
              <span style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "#b00717", display: "block", marginBottom: "16px" }}>
                LA OPORTUNIDAD
              </span>
              <h2 style={{ fontFamily: "Playfair Display, Georgia, serif", fontSize: "clamp(28px, 4vw, 42px)", fontWeight: 700, color: "#12213a", marginBottom: "12px", lineHeight: 1.2 }}>
                Por qué estudiar y jugar en EE.UU.
              </h2>
              <div style={{ width: "40px", height: "3px", background: "#b00717", marginBottom: "32px" }} />
              <p style={{ fontSize: "15px", color: "rgba(18,33,58,0.65)", lineHeight: 1.9, marginBottom: "20px" }}>
                Cada año, cientos de futbolistas internacionales eligen las universidades de Estados Unidos porque es el único lugar donde pueden compaginar deporte de alto nivel con estudios superiores de calidad.
              </p>
              <blockquote style={{ background: "rgba(18,33,58,0.04)", borderLeft: "3px solid #b00717", borderRadius: 0, padding: "16px 24px", margin: "24px 0" }}>
                <p style={{ fontFamily: "Playfair Display, Georgia, serif", fontStyle: "italic", fontSize: "17px", color: "#12213a", lineHeight: 1.7, margin: 0 }}>
                  Las becas deportivas permiten que tu talento en el campo financie tu educación — abriéndote las puertas a una experiencia única que no existe en ningún otro país.
                </p>
              </blockquote>
              <p style={{ fontSize: "15px", color: "rgba(18,33,58,0.65)", lineHeight: 1.9, marginBottom: "20px" }}>
                El porcentaje de futbolistas que alcanza el mundo profesional es muy bajo. Las lesiones, la alta competitividad y la falta de recursos hacen que muy pocos puedan vivir del fútbol. Pero esta no es la única razón para elegir EE.UU.
              </p>
              <p style={{ fontSize: "15px", color: "rgba(18,33,58,0.75)", lineHeight: 1.9, marginBottom: 0 }}>
                Tanto si tu objetivo es seguir desarrollándote deportivamente al más alto nivel, como si buscas garantizarte una carrera universitaria de prestigio — o simplemente aprovechar tu talento para reducir el coste de tus estudios — en EE.UU. los dos caminos van juntos.
              </p>
            </div>
          </div>
        </section>

        <StudentAthleteExperience />

        {/* Scholarship / Financial Analysis */}
        <section className="section-padding" style={{ backgroundColor: "#ffffff" }}>
          <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-12 items-start">
            {/* Left Column */}
            <div>
              <span className="text-[#12213a] text-sm font-bold tracking-[0.15em] uppercase mb-4 block">
                TIPOS DE BECAS
              </span>
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
                ¿Cuánto puedes conseguir realmente?
              </h2>
              <p className="font-body text-muted-foreground text-base leading-relaxed mb-8">
                Determinamos el potencial de beca basándonos en un análisis técnico del perfil deportivo y académico.
              </p>
              <blockquote className="font-body text-base sm:text-lg italic text-muted-foreground leading-relaxed mb-8 border-l-2 border-[#12213a]/40 pl-5">
                La inversión depende de tu nivel futbolístico y del potencial competitivo que puedas demostrar. En FutbolUAgency LLC. lo dejamos claro desde el primer día: trabajamos para conseguirte la mejor beca posible dentro de tus posibilidades.
              </blockquote>
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-[#12213a] flex-shrink-0" />
                <span className="font-body text-sm text-muted-foreground tracking-[0.15em] uppercase">
                  Gestión basada en transparencia
                </span>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-4">
              {/* Main stat card */}
              <div className="rounded-xl border border-border bg-[#ffffff] p-8 ring-1 ring-[#12213a]/20 shadow-[0_0_40px_rgba(18,33,58,0.1)] relative overflow-hidden">
                <TrendingUp className="absolute top-6 right-6 w-16 h-16 text-[#12213a]/10" />
                <span className="font-body text-xs tracking-[0.15em] uppercase text-muted-foreground mb-4 block">
                  Beca promedio de nuestros atletas
                </span>
                <div className="flex items-baseline gap-1 mb-3">
                  <span className="font-display text-5xl sm:text-6xl font-bold text-foreground">$25,324</span>
                  <span className="font-display text-xl italic text-[#12213a]">/año</span>
                </div>
                <p className="font-body text-sm text-muted-foreground leading-relaxed max-w-sm">
                  Monto anual promedio gestionado y asegurado para nuestra red de atletas en el sistema universitario americano.
                </p>
              </div>

              {/* Two smaller cards */}
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-xl border border-border bg-[#ffffff] p-6">
                  <span className="font-body text-xs tracking-[0.15em] uppercase text-[#12213a] font-bold mb-3 block">
                    Rango Estándar
                  </span>
                  <span className="font-display text-2xl sm:text-3xl font-bold text-foreground block mb-2">
                    70% — 90%
                  </span>
                  <p className="font-body text-xs text-muted-foreground leading-relaxed">
                    Cobertura promedio lograda para el 85% de nuestros representados.
                  </p>
                </div>
                <div className="rounded-xl border border-[#12213a]/30 bg-[#12213a]/5 p-6 ring-1 ring-[#12213a]/30 shadow-[0_0_40px_rgba(18,33,58,0.15)]">
                  <span className="font-body text-xs tracking-[0.15em] uppercase text-[#12213a] font-bold mb-3 block">
                    Perfil Élite
                  </span>
                  <span className="font-display text-2xl sm:text-3xl font-bold text-foreground block mb-2">
                    Hasta 100%
                  </span>
                  <p className="font-body text-xs text-muted-foreground leading-relaxed">
                    Reservado para atletas de Selección Nacional o perfiles de División 1.
                  </p>
                </div>
              </div>

            </div>
          </div>

          {/* CTA Banner — full width below grid */}
          <div className="max-w-7xl mx-auto px-4 mt-8">
            <div
              className="flex flex-col items-center text-center gap-5 rounded-[14px] py-8 px-8"
              style={{ backgroundColor: "#12213a" }}
            >
              <div>
                <p className="font-display text-xl font-bold text-white mb-1.5 leading-snug">
                  ¿Quieres saber cuánta beca podrías obtener?
                </p>
                <p className="font-body text-sm text-white/70 leading-relaxed">
                  Mándanos tu video de highlights y te contactamos en menos de 24 horas.
                </p>
              </div>
              <a
                href="https://wa.me/34603331990?text=Hola,%20quiero%20saber%20cu%C3%A1nta%20beca%20podr%C3%ADa%20obtener.%20Les%20env%C3%ADo%20mi%20video%20de%20highlights."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-[#b00717] text-white font-bold text-sm px-8 py-3.5 rounded-lg no-underline whitespace-nowrap"
              >
                Enviar mi video →
              </a>
            </div>
          </div>
        </section>


        <UniversityMap />

        {/* Requirements */}
        <section className="section-padding relative overflow-hidden" style={{ backgroundColor: "#ffffff" }}>
          <div className="absolute inset-0">
            <img src="/images/college-cup.png" alt="" className="w-full h-full object-cover opacity-10" loading="lazy" />
            <div className="absolute inset-0 bg-background/80" />
          </div>
            <div className="container-wide px-4 relative z-10">
            <div className="max-w-3xl mb-12">
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">
                Perfil de Admisión
              </h2>
              <p className="font-body text-muted-foreground text-base leading-relaxed">
                Evaluamos cuatro áreas técnicas críticas para determinar la elegibilidad y el potencial de beca de cada prospecto.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-6xl mx-auto">
              {requirements.map((req, i) => (
                <div
                  key={i}
                  className="bg-white flex flex-col gap-5 transition-all duration-300 ease-out hover:scale-[1.04] hover:z-10 hover:shadow-[0_12px_40px_rgba(18,33,58,0.18)] hover:ring-1 hover:ring-[#12213a]/40 cursor-default relative"
                  style={{ border: "1px solid #e5e5e5", borderRadius: "12px", padding: "20px" }}
                >
                  <req.icon className="w-8 h-8 text-[#12213a] transition-transform duration-300" />
                  <div>
                    <span className="font-body text-xs sm:text-sm tracking-[0.15em] uppercase text-foreground block mb-2">
                      <span className="text-[#b00717] font-bold">{req.num}</span> — {req.label}
                    </span>
                    <span className="font-display text-base font-bold italic text-[#b00717] block mb-3">
                      {req.value}
                    </span>
                    <p className="font-body text-sm text-foreground leading-relaxed">
                      {req.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>




        {/* Player Profiles */}
        <PlayerProfilesSection />

        {/* Process Section */}
        <ProcessSection />

        {/* FAQ */}
        <section className="section-padding" style={{ backgroundColor: "#fafaf8" }}>
          <div className="container-wide px-4 max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <span className="inline-block text-[#b00717] text-xs font-bold tracking-[0.15em] uppercase mb-3">
                Preguntas Frecuentes
              </span>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#12213a]">
                Todo lo que necesitas saber
              </h2>
            </div>
            <Accordion type="single" collapsible className="w-full">
              {[
                {
                  q: "¿Necesito hablar inglés perfectamente?",
                  a: "No. Un nivel básico-intermedio es suficiente para empezar el proceso. Las universidades tienen programas de apoyo lingüístico.",
                },
                {
                  q: "¿Cuánto cuesta el proceso con FutbolUAgency?",
                  a: "La evaluación inicial es completamente gratuita. Nuestros honorarios se pagan únicamente cuando consigues una oferta universitaria real.",
                },
                {
                  q: "¿Cuánto tiempo tarda todo el proceso?",
                  a: "Entre 6 y 18 meses desde la evaluación inicial hasta tu llegada a la universidad en EE.UU.",
                },
                {
                  q: "¿Qué nivel futbolístico necesito?",
                  a: "Nivel competitivo regional o superior: liga preferente, nacional, división de honor o equivalente en tu país.",
                },
                {
                  q: "¿La beca cubre todos los gastos?",
                  a: "La mayoría de nuestros atletas obtienen becas entre el 75% y 100% que cubren matrícula, alojamiento y comida. El costo restante suele ser entre $6,000 y $12,000 anuales vs $40,000 sin beca.",
                },
                {
                  q: "¿Puedo estudiar cualquier carrera?",
                  a: "Sí. Las universidades americanas tienen cientos de carreras disponibles. Puedes elegir la que más te interese mientras compites en el equipo.",
                },
              ].map((item, i) => (
                <AccordionItem
                  key={i}
                  value={`item-${i}`}
                  className="border-b border-[#12213a]/10"
                >
                  <AccordionTrigger className="font-body font-semibold text-[#12213a] text-left hover:no-underline hover:text-[#b00717] transition-colors py-5">
                    {item.q}
                  </AccordionTrigger>
                  <AccordionContent className="font-body text-gray-600 leading-relaxed pb-5">
                    {item.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        {/* Otros deportes */}
        <section style={{ backgroundColor: "#f5f4f2", padding: "48px 24px" }}>
          <div className="max-w-3xl mx-auto text-center">
            <span style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "#b00717", display: "block", marginBottom: "12px" }}>
              FUA SPORTS
            </span>
            <h2 style={{ fontFamily: "Playfair Display, Georgia, serif", fontSize: "26px", fontWeight: 700, color: "#12213a", marginBottom: "10px", lineHeight: 1.3 }}>
              ¿Practicas otro deporte?
            </h2>
            <p style={{ fontSize: "14px", color: "rgba(18,33,58,0.6)", lineHeight: 1.7, marginBottom: "28px" }}>
              También gestionamos becas universitarias en EE.UU. para otros deportes.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {[
                { label: "Volleyball", href: "/sports/volleyball" },
                { label: "Golf", href: "/sports/golf" },
                { label: "Tenis", href: "/sports/tennis" },
                { label: "Track & Field", href: "/sports/track" },
              ].map((pill) => (
                <Link
                  key={pill.href}
                  to={pill.href}
                  className="transition-colors duration-200"
                  style={{
                    backgroundColor: "#ffffff",
                    border: "1px solid #e5e5e5",
                    borderRadius: "999px",
                    padding: "10px 20px",
                    fontSize: "14px",
                    fontWeight: 600,
                    color: "#12213a",
                    textDecoration: "none",
                    display: "inline-block",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.backgroundColor = "#12213a";
                    (e.currentTarget as HTMLAnchorElement).style.color = "#ffffff";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.backgroundColor = "#ffffff";
                    (e.currentTarget as HTMLAnchorElement).style.color = "#12213a";
                  }}
                >
                  {pill.label}
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="section-padding" style={{ backgroundColor: "#ffffff" }}>
          <div className="container-wide px-4 text-center">
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
              {t("usa.cta.title")}
            </h2>
            <p className="font-body text-muted-foreground text-base sm:text-lg leading-relaxed max-w-2xl mx-auto mb-8">
              {t("usa.cta.desc")}
            </p>
            <button
              onClick={openForm}
              className="inline-flex items-center gap-2 bg-[#12213a] hover:bg-[#12213a] text-white font-body font-semibold px-10 py-4 rounded-lg transition-colors text-base sm:text-lg"
            >
              {t("nav.applyCta")} <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </section>

        <Footer />
        <HubSpotFormModal open={isOpen} onOpenChange={setIsOpen} />
      </main>
    </>
  );
};

export default USA;
