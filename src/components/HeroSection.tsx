import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroBg from "@/assets/hero-bg.jpg";
import logo from "@/assets/logo.png";
const HeroSection = () => {
  const scrollToVideo = () => {
    document.getElementById("video-section")?.scrollIntoView({
      behavior: "smooth"
    });
  };
  return <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img src={heroBg} alt="Soccer team huddle" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/50 to-background/30" />
      </div>
      
      {/* Bottom fade transition */}
      <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-background via-background/80 to-transparent" />

      {/* Centered Logo at Top */}
      <div className="absolute top-6 left-1/2 -translate-x-1/2 z-20">
        <img src={logo} alt="FutbolUAgency" className="h-16 md:h-20 w-auto" />
      </div>

      {/* Content */}
      <div className="relative z-10 container-wide section-padding text-center pt-24">
        {/* Tag */}
        <span className="inline-block mb-6 text-primary font-body text-sm tracking-[0.2em] uppercase animate-fade-in"></span>

        {/* Main Headline */}
        <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6 animate-fade-in-up">
          Convierte tu talento en una
          <br />
          <span className="text-primary italic">beca deportiva en Estados Unidos</span>
        </h1>

        {/* Subheadline */}
        <p className="font-body text-muted-foreground text-lg md:text-xl max-w-3xl mx-auto mb-10 animate-fade-in-up" style={{
        animationDelay: "0.2s"
      }}>
          Creamos tu perfil, te conectamos con coaches y te guiamos hasta conseguir tu{" "}
          <span className="font-semibold text-foreground">beca deportiva</span>.
        </p>

        {/* CTA Button */}
        <div className="animate-fade-in-up" style={{
        animationDelay: "0.4s"
      }}>
          <Button variant="hero" size="xl" onClick={scrollToVideo}>
            Comenzar mi Evaluación Gratuita
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-float">
        <div className="w-6 h-10 border-2 border-muted-foreground/30 rounded-full flex items-start justify-center p-2">
          <div className="w-1 h-2 bg-primary rounded-full animate-bounce" />
        </div>
      </div>
    </section>;
};
export default HeroSection;