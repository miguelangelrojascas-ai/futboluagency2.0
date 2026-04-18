import { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SpainInfoBar from "@/components/spain/SpainInfoBar";
import SpainDifferentiatorSection from "@/components/spain/SpainDifferentiatorSection";
import SpainAcademiesSection from "@/components/SpainAcademiesSection";
import SpainMadridSection from "@/components/spain/SpainMadridSection";
import SpainMethodologySection from "@/components/spain/SpainMethodologySection";
import SpainTargetProfileSection from "@/components/spain/SpainTargetProfileSection";

import SpainInclusionsSection from "@/components/spain/SpainInclusionsSection";
import AnderStoryCard from "@/components/AnderStoryCard";
import SpainFinalCTA from "@/components/spain/SpainFinalCTA";

import spainTraining from "@/assets/spain-training.jpg";
import spainCompetition from "@/assets/spain-competition.jpg";
import spainWarmup from "@/assets/spain-warmup.jpg";
import spainStadium from "@/assets/spain-stadium.jpg";
import spainAcademy from "@/assets/spain-academy.jpg";

const Spain = () => {
  const { t, language } = useLanguage();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

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

  const updateScrollButtons = () => {
    const el = scrollContainerRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 10);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 10);
  };

  useEffect(() => {
    const el = scrollContainerRef.current;
    if (!el) return;
    el.addEventListener("scroll", updateScrollButtons);
    updateScrollButtons();
    return () => el.removeEventListener("scroll", updateScrollButtons);
  }, []);

  const scrollBy = (direction: number) => {
    const el = scrollContainerRef.current;
    if (!el) return;
    el.scrollBy({ left: direction * 320, behavior: "smooth" });
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    const el = scrollContainerRef.current;
    if (!el) return;
    setIsDragging(true);
    setStartX(e.pageX - el.offsetLeft);
    setScrollLeft(el.scrollLeft);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    const el = scrollContainerRef.current;
    if (!el) return;
    const x = e.pageX - el.offsetLeft;
    el.scrollLeft = scrollLeft - (x - startX);
  };

  const handleMouseUp = () => setIsDragging(false);

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
          <div className="absolute inset-0 bg-[#ffffff]/80" />
          <div className="absolute bottom-0 left-0 right-0 h-[120px] z-10" style={{ background: "linear-gradient(to bottom, transparent, #ffffff)" }} />
          <div className="container-wide px-4 relative">
            <div className="max-w-4xl mx-auto text-center section-padding">
              <span className="inline-block mb-4 text-primary font-body text-xs tracking-[0.15em] uppercase">
                {t("spain.tag")}
              </span>
              <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold mb-6 leading-[1.08]">
                {language === "es"
                  ? "Juega en Academias Profesionales en España"
                  : "Play in Professional Academies in Spain"}
              </h1>
              <p className="font-body font-medium text-gray-300 text-lg max-w-2xl mx-auto mb-8 leading-relaxed">
                {language === "es"
                  ? "Entrena, compite y desarrolla tu carrera futbolística en uno de los entornos más exigentes del mundo"
                  : "Train, compete and develop your football career in one of the most demanding environments in the world"}
              </p>
              <a
                href="https://docs.google.com/forms/d/e/1FAIpQLScXOeAxT7cjKKWiEql7DgAqDNdYJGLzASHtO_b_dLnYOKdcVA/viewform"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-primary hover:bg-primary-hover text-primary-foreground font-body font-semibold px-8 py-3.5 rounded-lg transition-colors text-sm sm:text-base"
              >
                {t("nav.applyCta")} <ArrowRight className="w-5 h-5" />
              </a>
            </div>
          </div>
        </section>

        {/* Info bar */}
        <SpainInfoBar />

        {/* El Diferenciador */}
        <SpainDifferentiatorSection />

        {/* ¿Por qué España? — Carousel */}
        <section className="py-24" style={{ backgroundColor: "#ffffff" }}>
          <div className="container-wide px-4">
            <div className="mb-8">
              <div className="flex items-center justify-between mb-2">
                <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold">
                  {language === "es" ? "¿Por qué España?" : "Why Spain?"}
                </h2>
                <div className="hidden sm:flex items-center gap-2">
                  <button
                    onClick={() => scrollBy(-1)}
                    disabled={!canScrollLeft}
                    className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-foreground hover:bg-muted transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => scrollBy(1)}
                    disabled={!canScrollRight}
                    className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-foreground hover:bg-muted transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
              <p className="font-body text-muted-foreground text-base leading-relaxed mt-2 max-w-xl">
                {language === "es"
                  ? "Uno de los entornos más exigentes del mundo para competir, mejorar y ser visto."
                  : "One of the most demanding environments in the world to compete, improve, and get noticed."}
              </p>
            </div>

            <div
              ref={scrollContainerRef}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
              className={`flex gap-4 overflow-x-auto scrollbar-hide pb-2 ${isDragging ? "cursor-grabbing select-none" : "cursor-grab"}`}
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {carouselCards.map((card, i) => (
                <div
                  key={i}
                  className="flex-shrink-0 w-[75%] sm:w-[280px] md:w-[300px] lg:w-[320px] rounded-2xl overflow-hidden relative aspect-[3/4] group"
                >
                  <img
                    src={card.image}
                    alt={card.title}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    draggable={false}
                  />
                  <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.75) 50%, rgba(0,0,0,0) 100%)" }} />
                  <div className="absolute top-4 left-4 sm:top-5 sm:left-5">
                    <span className="inline-block font-body text-[11px] sm:text-xs tracking-[0.15em] uppercase text-white font-medium bg-black/50 backdrop-blur-sm px-3 py-1 rounded-full drop-shadow-lg">
                      {card.label}
                    </span>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6">
                    <h3 className="font-display text-lg sm:text-xl font-bold text-white leading-tight" style={{ textShadow: "0 2px 8px rgba(0,0,0,0.8)" }}>
                      {card.title}
                    </h3>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex sm:hidden items-center justify-center gap-3 mt-6">
              <button
                onClick={() => scrollBy(-1)}
                disabled={!canScrollLeft}
                className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-foreground hover:bg-muted transition-colors disabled:opacity-30"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => scrollBy(1)}
                disabled={!canScrollRight}
                className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-foreground hover:bg-muted transition-colors disabled:opacity-30"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </section>

        {/* Talavera + partner clubs */}
        <SpainAcademiesSection />

        {/* New sections */}
        <SpainMadridSection />
        <SpainMethodologySection />
        <SpainTargetProfileSection />
        
        <SpainInclusionsSection />
        <AnderStoryCard />
        <SpainFinalCTA />

        <Footer />
      </main>
    </>
  );
};

export default Spain;
