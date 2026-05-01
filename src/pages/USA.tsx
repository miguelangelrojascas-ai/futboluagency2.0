import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle, GraduationCap, Shield, BookOpen, Clock, DollarSign, TrendingUp, Trophy, Languages, Video } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProcessSection from "@/components/ProcessSection";
import StudentAthleteExperience from "@/components/StudentAthleteExperience";
import PlayerProfilesSection from "@/components/usa/PlayerProfilesSection";
import UniversityMap from "@/components/UniversityMap";
import HubSpotFormModal from "@/components/HubSpotFormModal";
import { useHubSpotForm } from "@/hooks/useHubSpotForm";

const USA = () => {
  const { t } = useLanguage();
  const { isOpen, openForm, setIsOpen } = useHubSpotForm();

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
          <div className="absolute inset-0 bg-black/45" />
          <div className="container-wide px-4 relative">
            <div className="max-w-4xl mx-auto text-center section-padding">
              <span className="inline-block mb-4 text-[#12213a] font-body text-xs tracking-[0.15em] uppercase">
                {t("usa.tag")}
              </span>
              <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold mb-6 text-muted">
                {t("usa.hero.title")} <span className="text-[#12213a] italic">{t("usa.hero.highlight")}</span>
              </h1>
              <p className="font-body font-medium text-gray-300 text-lg max-w-2xl mx-auto mb-8 leading-relaxed">
                {t("usa.hero.desc")}
              </p>
              <button
                onClick={openForm}
                className="inline-flex items-center gap-2 bg-[#12213a] hover:bg-[#12213a] text-white font-body font-semibold px-8 py-3.5 rounded-lg transition-colors text-sm sm:text-base"
              >
                {t("nav.applyCta")} <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </section>

        <StudentAthleteExperience />

        {/* Scholarship / Financial Analysis */}
        <section className="section-padding bg-background">
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
                La inversión depende de tu nivel futbolístico y del potencial competitivo que puedas demostrar. En FutbolUAgency lo dejamos claro desde el primer día: trabajamos para conseguirte la mejor beca posible dentro de tus posibilidades.
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
        </section>


        <UniversityMap />

        {/* Requirements */}
        <section className="section-padding bg-background relative overflow-hidden">
          <div className="absolute inset-0">
            <img src="/images/college-cup.png" alt="" className="w-full h-full object-cover opacity-10" />
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

        {/* CTA */}
        <section className="section-padding bg-background">
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
