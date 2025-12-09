import HeroSection from "@/components/HeroSection";
import VideoSection from "@/components/VideoSection";
import SocialProofSection from "@/components/SocialProofSection";
import MetricsSection from "@/components/MetricsSection";
import CTASection from "@/components/CTASection";
import ProcessSection from "@/components/ProcessSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <MetricsSection />
      <VideoSection />
      <SocialProofSection />
      <CTASection />
      <ProcessSection />
      <TestimonialsSection />
      <Footer />
    </main>
  );
};

export default Index;
