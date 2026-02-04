import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import heroBg from "@/assets/hero-bg.jpg";
import logo from "@/assets/logo-fua.png";

interface HeroSectionProps {
  onOpenForm: () => void;
}

const HeroSection = ({ onOpenForm }: HeroSectionProps) => {
  const { t } = useLanguage();
  return <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img src={heroBg} alt="Soccer team huddle" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/50 to-background/30" />
      </div>
      
      {/* Bottom fade transition */}
      <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-background via-background/80 to-transparent" />

      {/* Centered Logo at Top */}
      <div className="absolute top-6 sm:top-8 left-1/2 -translate-x-1/2 z-20">
        <img src={logo} alt="FutbolUAgency" className="h-24 sm:h-28 md:h-32 w-auto" />
      </div>

      {/* Content */}
      <div className="relative z-10 container-wide section-padding text-center pt-28 sm:pt-36">
        {/* Tag */}
        <span className="inline-block mb-4 sm:mb-6 text-primary font-body text-xs sm:text-sm tracking-[0.2em] uppercase animate-fade-in"></span>

        {/* Main Headline */}
        <h1 className="font-display text-2xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight mb-4 sm:mb-6 animate-fade-in-up px-2">
          {t("hero.headline")}{" "}
          <span className="text-primary italic">{t("hero.headline.highlight")}</span>
        </h1>

        {/* Subheadline */}
        <p className="font-body text-foreground/90 text-base sm:text-lg md:text-xl max-w-3xl mx-auto mb-8 sm:mb-10 animate-fade-in-up px-4" style={{
        animationDelay: "0.2s"
      }}>
          {t("hero.subheadline")}{" "}
          <span className="font-semibold text-foreground">{t("hero.subheadline.highlight")}</span>.
        </p>

        {/* CTA Button */}
        <div className="animate-fade-in-up px-4" style={{
        animationDelay: "0.4s"
      }}>
          <Button variant="hero" size="lg" className="w-full sm:w-auto text-sm sm:text-base" onClick={onOpenForm}>
            {t("hero.cta")}
            <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
          </Button>
        </div>
      </div>

      {/* Scroll Indicator - hidden on mobile */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-float hidden sm:block">
        <div className="w-6 h-10 border-2 border-muted-foreground/30 rounded-full flex items-start justify-center p-2">
          <div className="w-1 h-2 bg-primary rounded-full animate-bounce" />
        </div>
      </div>
    </section>;
};
export default HeroSection;