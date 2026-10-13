import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useDocumentMeta } from "@/hooks/useDocumentMeta";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SpainInfoBar from "@/components/spain/SpainInfoBar";
import SpainDifferentiatorSection from "@/components/spain/SpainDifferentiatorSection";
import SpainWhySection from "@/components/spain/SpainWhySection";
import SpainAcademiesSection from "@/components/SpainAcademiesSection";
import SpainMadridSection from "@/components/spain/SpainMadridSection";
import SpainMethodologySection from "@/components/spain/SpainMethodologySection";
import SpainTargetProfileSection from "@/components/spain/SpainTargetProfileSection";

import SpainInclusionsSection from "@/components/spain/SpainInclusionsSection";
import AnderStoryCard from "@/components/AnderStoryCard";
import SpainFinalCTA from "@/components/spain/SpainFinalCTA";


const Spain = () => {
  const { t, language } = useLanguage();

  useDocumentMeta({
    title: "Programa en España | Academias de Fútbol Élite – FutbolUAgency",
    description: "Entrena en las mejores academias de fútbol de España. Programa élite con clubes profesionales a una hora de Madrid. Para jugadores internacionales de 14 a 19 años.",
    ogTitle: "Programa en España | FutbolUAgency",
    ogDescription: "Entrena en las mejores academias de fútbol de España. Programa élite con clubes profesionales a una hora de Madrid.",
  });

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
          <div className="absolute bottom-0 left-0 right-0 h-[120px] z-10" style={{ background: "linear-gradient(to bottom, transparent, #ffffff)" }} />
          <div className="container-wide px-4 relative">
            <div className="max-w-4xl mx-auto text-center section-padding">
              <span className="inline-block mb-4 text-primary font-body text-xs tracking-[0.15em] uppercase">
                {t("spain.tag")}
              </span>
              <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold mb-6 leading-[1.08] text-white" style={{ textShadow: "0 2px 16px rgba(0,0,0,0.5)" }}>
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

        <SpainWhySection />

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
