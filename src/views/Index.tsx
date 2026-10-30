import HeroSection from "@/components/HeroSection";
import VideoSection from "@/components/VideoSection";
import LogoCarousel from "@/components/LogoCarousel";
import MetricsSection from "@/components/MetricsSection";
import SuccessCasesSection from "@/components/SuccessCasesSection";
import HomeProcessSection from "@/components/HomeProcessSection";
import FaqSection from "@/components/FaqSection";
import GlobeCTASection from "@/components/GlobeCTASection";
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
        <SuccessCasesSection />
        <HomeProcessSection />
        <FaqSection />
        <GlobeCTASection />
        <Footer />
      </main>
    </>
  );
};

export default Index;
