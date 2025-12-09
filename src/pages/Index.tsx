import HeroSection from "@/components/HeroSection";
import VideoSection from "@/components/VideoSection";
import LogoCarousel from "@/components/LogoCarousel";
import MetricsSection from "@/components/MetricsSection";
import CTASection from "@/components/CTASection";
import ProcessSection from "@/components/ProcessSection";
import SuccessCasesSection from "@/components/SuccessCasesSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <MetricsSection />
      <VideoSection />
      <LogoCarousel />
      <CTASection />
      <ProcessSection />
      <SuccessCasesSection />
      <Footer />
    </main>
  );
};

export default Index;
