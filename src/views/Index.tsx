import HeroSection from "@/components/HeroSection";
import HomeVideoHero from "@/components/HomeVideoHero";
import VideoSection from "@/components/VideoSection";
import LogoCarousel from "@/components/LogoCarousel";
import MetricsSection from "@/components/MetricsSection";
import SuccessCasesSection from "@/components/SuccessCasesSection";
import HomeProcessSection from "@/components/HomeProcessSection";
import FaqSection from "@/components/FaqSection";
import GlobeCTASection from "@/components/GlobeCTASection";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

/**
 * The home page. `hero` picks the header: the image one is the live home,
 * the scroll-scrubbed video one is shown at /inicio-video to compare.
 */
const Index = ({ hero = "image" }: { hero?: "image" | "video" }) => {

  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        {hero === "video" ? <HomeVideoHero /> : <HeroSection />}
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
