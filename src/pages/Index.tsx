import HeroSection from "@/components/HeroSection";
import VideoSection from "@/components/VideoSection";
import LogoCarousel from "@/components/LogoCarousel";
import MetricsSection from "@/components/MetricsSection";
import UniversityMap from "@/components/UniversityMap";


import PathSelectionSection from "@/components/PathSelectionSection";
import SuccessCasesSection from "@/components/SuccessCasesSection";
import AnderStoryCard from "@/components/AnderStoryCard";
import CalendlySection from "@/components/CalendlySection";
import ShowcaseSection from "@/components/ShowcaseSection";
import ShowcaseCountdownBanner from "@/components/ShowcaseCountdownBanner";

import FUASportsTeaser from "@/components/FUASportsTeaser";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

const Index = () => {
  return (
    <>
      <ShowcaseCountdownBanner />
      <Navbar />
      <main className="min-h-screen">
        <HeroSection />
        <ShowcaseSection />
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
