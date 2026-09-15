import { useEffect } from "react";
import HeroSection from "@/components/HeroSection";
import VideoSection from "@/components/VideoSection";
import LogoCarousel from "@/components/LogoCarousel";
import MetricsSection from "@/components/MetricsSection";


import PathSelectionSection from "@/components/PathSelectionSection";
import SuccessCasesSection from "@/components/SuccessCasesSection";
import AnderStoryCard from "@/components/AnderStoryCard";
import CalendlySection from "@/components/CalendlySection";
import FUASportsTeaser from "@/components/FUASportsTeaser";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

const Index = () => {
  useEffect(() => {
    document.title = "FutbolUAgency LLC. | Becas Deportivas en Estados Unidos";
    document.querySelector('meta[name="description"]')?.setAttribute("content", "Ayudamos a futbolistas internacionales a obtener becas deportivas en universidades NCAA, NAIA y JUCO en Estados Unidos. Evaluación gratuita.");
    document.querySelector('meta[property="og:title"]')?.setAttribute("content", "FutbolUAgency LLC. | Becas Deportivas en Estados Unidos");
    document.querySelector('meta[property="og:description"]')?.setAttribute("content", "Convierte tu talento en una beca deportiva. Ayudamos a futbolistas internacionales a entrar a universidades NCAA, NAIA y JUCO.");
  }, []);

  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        <HeroSection />
        <MetricsSection />
        <VideoSection />
        <LogoCarousel />
        
        <PathSelectionSection />
        <AnderStoryCard />
        <SuccessCasesSection />
        <FUASportsTeaser />
        <CalendlySection />
        <Footer />
      </main>
    </>
  );
};

export default Index;
