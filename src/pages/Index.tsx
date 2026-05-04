import HeroSection from "@/components/HeroSection";
import VideoSection from "@/components/VideoSection";
import LogoCarousel from "@/components/LogoCarousel";
import MetricsSection from "@/components/MetricsSection";
import UniversityMap from "@/components/UniversityMap";


import PathSelectionSection from "@/components/PathSelectionSection";
import SuccessCasesSection from "@/components/SuccessCasesSection";
import AnderStoryCard from "@/components/AnderStoryCard";
import CalendlySection from "@/components/CalendlySection";

import FUASportsTeaser from "@/components/FUASportsTeaser";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

const Index = () => {
  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        <HeroSection />
        <MetricsSection />
        <VideoSection />
        <LogoCarousel />
        
        <PathSelectionSection />
        <UniversityMap />
        
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
