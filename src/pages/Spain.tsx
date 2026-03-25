// Spain page
import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ArrowLeft, ChevronLeft, ChevronRight, Dumbbell, Swords, ScanEye } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

import spainTraining from "@/assets/spain-training.jpg";
import spainCompetition from "@/assets/spain-competition.jpg";
import spainWarmup from "@/assets/spain-warmup.jpg";
import spainStadium from "@/assets/spain-stadium.jpg";
import spainAcademy from "@/assets/spain-academy.jpg";

const Spain = () => {
  const { t, language } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);

  const carouselCards = [
    {
      image: spainTraining,
      label: language === "es" ? "Entrenamiento" : "Training",
      title: language === "es" ? "Nivel competitivo real" : "Real competitive level",
    },
    {
      image: spainCompetition,
      label: language === "es" ? "Competición" : "Competition",
      title: language === "es" ? "Visibilidad ante entrenadores" : "Visibility to coaches",
    },
    {
      image: spainWarmup,
      label: language === "es" ? "Intensidad" : "Intensity",
      title: language === "es" ? "Experiencia intensiva" : "Intensive experience",
    },
    {
      image: spainStadium,
      label: language === "es" ? "Profesionalismo" : "Professionalism",
      title: language === "es" ? "Entorno profesional" : "Professional environment",
    },
    {
      image: spainAcademy,
      label: language === "es" ? "Academia" : "Academy",
      title: language === "es" ? "Academias de élite" : "Elite academies",
    },
  ];

  const visibleCards = 3;
  const maxIndex = carouselCards.length - visibleCards;

  const scrollPrev = () => setCurrentIndex((prev) => Math.max(0, prev - 1));
  const scrollNext = () => setCurrentIndex((prev) => Math.min(maxIndex, prev + 1));

  const steps = [
    { num: "01", title: t("spain.step1.title"), desc: t("spain.step1.desc") },
    { num: "02", title: t("spain.step2.title"), desc: t("spain.step2.desc") },
    { num: "03", title: t("spain.step3.title"), desc: t("spain.step3.desc") },
    { num: "04", title: t("spain.step4.title"), desc: t("spain.step4.desc") },
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
            src="/videos/spain-hero-new.mov"
          />
          <div className="absolute inset-0 bg-background/70" />
          <div className="container-wide px-4 relative">
            <div className="max-w-4xl mx-auto text-center section-padding">
              <span className="inline-block mb-4 text-primary font-body text-xs tracking-[0.2em] uppercase">
                {t("spain.tag")}
              </span>
              <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                {language === "es" ? "Juega en las Mejores Academias de Fútbol" : "Play in Top Football Academies"}{" "}
                <span className="text-primary italic">{language === "es" ? "en España" : "in Spain"}</span>
              </h1>
              <p className="font-body text-muted-foreground text-base sm:text-lg md:text-xl max-w-3xl mx-auto mb-8">
                {language === "es"
                  ? "España es uno de los mejores entornos del mundo para desarrollarte como futbolista. Nuestro programa ofrece a jugadores internacionales la oportunidad de entrenar, competir y crecer en academias de alto nivel durante toda la temporada."
                  : "Spain is one of the best environments in the world to develop as a football player. Our program gives international players the opportunity to train, compete, and grow in high-level football academies throughout the full season."}
              </p>
              <Link
                to="/apply"
                className="inline-flex items-center gap-2 bg-primary hover:bg-primary-hover text-primary-foreground font-body font-semibold px-8 py-3.5 rounded-lg transition-colors text-sm sm:text-base"
              >
                {t("nav.applyCta")} <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </section>

        {/* ¿Por qué España? — Carousel */}
        <section className="section-padding bg-background">
          <div className="container-wide px-4">
            <div className="flex items-end justify-between mb-8">
              <div>
                <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold">
                  {language === "es" ? "¿Por qué España?" : "Why Spain?"}
                </h2>
                <p className="font-body text-muted-foreground text-sm sm:text-base mt-2 max-w-xl">
                  {language === "es"
                    ? "Uno de los entornos más exigentes del mundo para competir, mejorar y ser visto."
                    : "One of the most demanding environments in the world to compete, improve, and get noticed."}
                </p>
              </div>
              <div className="hidden sm:flex items-center gap-2">
                <button
                  onClick={scrollPrev}
                  disabled={currentIndex === 0}
                  className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-foreground hover:bg-muted transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={scrollNext}
                  disabled={currentIndex >= maxIndex}
                  className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-foreground hover:bg-muted transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Cards carousel */}
            <div className="overflow-hidden">
              <div
                className="flex gap-4 transition-transform duration-500 ease-out"
                style={{ transform: `translateX(-${currentIndex * (100 / visibleCards + 1.35)}%)` }}
              >
                {carouselCards.map((card, i) => (
                  <div
                    key={i}
                    className="flex-shrink-0 w-[80%] sm:w-[calc(33.333%-11px)] rounded-2xl overflow-hidden relative aspect-[3/4] group cursor-pointer"
                  >
                    <img
                      src={card.image}
                      alt={card.title}
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6">
                      <span className="inline-block font-body text-[10px] sm:text-xs tracking-[0.15em] uppercase text-primary mb-2">
                        {card.label}
                      </span>
                      <h3 className="font-display text-lg sm:text-xl md:text-2xl font-bold text-white leading-tight">
                        {card.title}
                      </h3>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Mobile arrows */}
            <div className="flex sm:hidden items-center justify-center gap-3 mt-6">
              <button
                onClick={scrollPrev}
                disabled={currentIndex === 0}
                className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-foreground hover:bg-muted transition-colors disabled:opacity-30"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={scrollNext}
                disabled={currentIndex >= carouselCards.length - 1}
                className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-foreground hover:bg-muted transition-colors disabled:opacity-30"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </section>
        {/* Next Step */}
        <section className="py-16 md:py-20 bg-background">
          <div className="container-wide px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold mb-4 text-foreground">
                {language === "es" ? "Da el siguiente paso en tu carrera" : "Take the next step in your career"}
              </h2>
              <p className="font-body text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto mb-12">
                {language === "es"
                  ? "Entrena en academias profesionales, compite en ligas exigentes y gana visibilidad dentro del sistema español."
                  : "Train at professional academies, compete in demanding leagues, and gain visibility within the Spanish system."}
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-10">
                {[
                  { icon: Dumbbell, label: language === "es" ? "Entrenamiento profesional" : "Professional training" },
                  { icon: Swords, label: language === "es" ? "Competición real" : "Real competition" },
                  { icon: ScanEye, label: language === "es" ? "Exposición ante entrenadores" : "Exposure to coaches" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0">
                      <item.icon className="w-5 h-5 text-primary" strokeWidth={1.5} />
                    </div>
                    <span className="font-body text-sm font-semibold text-foreground">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>



        {/* Process */}
        <section className="section-padding bg-background-alt">
          <div className="container-wide px-4">
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-10">
              {t("spain.process.title")}
            </h2>
            <div className="max-w-3xl mx-auto space-y-6">
              {steps.map((step) => (
                <div key={step.num} className="flex gap-5 items-start">
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-primary/15 border border-primary/30 flex items-center justify-center font-display font-bold text-primary text-sm">
                    {step.num}
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-bold mb-1">{step.title}</h3>
                    <p className="font-body text-muted-foreground text-sm">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>


        <Footer />
      </main>
    </>
  );
};

// Small inline icon since we can't import GraduationCap twice with a different name
const GraduationCapIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
    <path d="M6 12v5c3 3 9 3 12 0v-5" />
  </svg>
);

export default Spain;
