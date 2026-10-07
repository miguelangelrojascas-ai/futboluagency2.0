import { useDocumentMeta } from "@/hooks/useDocumentMeta";
import HeroSection from "@/components/HeroSection";
import VideoSection from "@/components/VideoSection";
import LogoCarousel from "@/components/LogoCarousel";
import MetricsSection from "@/components/MetricsSection";


import PathSelectionSection from "@/components/PathSelectionSection";
import SuccessCasesSection from "@/components/SuccessCasesSection";
import HomeProcessSection from "@/components/HomeProcessSection";
import FaqSection from "@/components/FaqSection";
import CalendlySection from "@/components/CalendlySection";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

const Index = () => {
  useDocumentMeta({
    title: "FutbolUAgency LLC. | Becas Deportivas en Estados Unidos",
    description: "Ayudamos a futbolistas internacionales a obtener becas deportivas en universidades NCAA, NAIA y JUCO en Estados Unidos. Evaluación gratuita.",
    ogDescription: "Convierte tu talento en una beca deportiva. Ayudamos a futbolistas internacionales a entrar a universidades NCAA, NAIA y JUCO.",
  });

  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        <HeroSection />
        <MetricsSection />
        <VideoSection />
        <LogoCarousel />
        
        <PathSelectionSection />
        <SuccessCasesSection />
        <HomeProcessSection />
        <FaqSection />
        <CalendlySection />
        <Footer />
      </main>
    </>
  );
};

export default Index;
