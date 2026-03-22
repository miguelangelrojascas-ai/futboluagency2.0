import HeroSection from "@/components/HeroSection";
import VideoSection from "@/components/VideoSection";
import LogoCarousel from "@/components/LogoCarousel";
import MetricsSection from "@/components/MetricsSection";

import CTASection from "@/components/CTASection";
import PathSelectionSection from "@/components/PathSelectionSection";
import SuccessCasesSection from "@/components/SuccessCasesSection";
import TeamSection from "@/components/TeamSection";
import CalendlySection from "@/components/CalendlySection";
import SpainAcademiesSection from "@/components/SpainAcademiesSection";
import OtherSportsSection from "@/components/OtherSportsSection";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import HubSpotFormModal from "@/components/HubSpotFormModal";
import { useHubSpotForm } from "@/hooks/useHubSpotForm";

const Index = () => {
  const { isOpen, openForm, setIsOpen } = useHubSpotForm();

  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        <HeroSection />
        <VideoSection onOpenForm={openForm} />
        <MetricsSection />
        <LogoCarousel />
        
        <PathSelectionSection />
        <CTASection onOpenForm={openForm} />
        <PlayerSuccessStorySection />
        <SpainAcademiesSection />
        <SuccessCasesSection />
        <OtherSportsSection />
        <TeamSection />
        <CalendlySection onOpenForm={openForm} />
        <Footer />
        <HubSpotFormModal open={isOpen} onOpenChange={setIsOpen} />
      </main>
    </>
  );
};

export default Index;
