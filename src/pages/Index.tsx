import HeroSection from "@/components/HeroSection";
import VideoSection from "@/components/VideoSection";
import LogoCarousel from "@/components/LogoCarousel";
import MetricsSection from "@/components/MetricsSection";
import CTASection from "@/components/CTASection";
import ProcessSection from "@/components/ProcessSection";
import SuccessCasesSection from "@/components/SuccessCasesSection";
import TeamSection from "@/components/TeamSection";
import CalendlySection from "@/components/CalendlySection";
import SpainAcademiesSection from "@/components/SpainAcademiesSection";
import PlayerSuccessStorySection from "@/components/PlayerSuccessStorySection";
import Footer from "@/components/Footer";
import HubSpotFormModal from "@/components/HubSpotFormModal";
import { useHubSpotForm } from "@/hooks/useHubSpotForm";

const Index = () => {
  const { isOpen, openForm, setIsOpen } = useHubSpotForm();

  return (
    <main className="min-h-screen">
      <HeroSection onOpenForm={openForm} />
      <SpainAcademiesSection />
      <PlayerSuccessStorySection />
      <MetricsSection />
      <VideoSection onOpenForm={openForm} />
      <LogoCarousel />
      <CTASection onOpenForm={openForm} />
      <ProcessSection />
      <SuccessCasesSection />
      <TeamSection />
      <CalendlySection onOpenForm={openForm} />
      <Footer />
      <HubSpotFormModal open={isOpen} onOpenChange={setIsOpen} />
    </main>
  );
};

export default Index;
