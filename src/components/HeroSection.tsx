import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import heroBg from "@/assets/hero-bg.jpg";
import logo from "@/assets/logo-fua.png";

const HeroSection = () => {
  const { t } = useLanguage();
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16 md:pt-20">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img src={heroBg} alt="Soccer team huddle" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/45" />
      </div>

      {/* Bottom fade transition */}
      <div className="absolute bottom-0 left-0 right-0 h-[120px] z-10" style={{ background: "linear-gradient(to bottom, transparent, #ffffff)" }} />

      {/* Centered Logo at Top */}
      <div className="absolute top-20 sm:top-24 left-1/2 -translate-x-1/2 z-20">
        <img src={logo} alt="FutbolUAgency" className="h-24 sm:h-28 md:h-32 w-auto" />
      </div>

      {/* Content */}
      <div className="relative z-10 container-wide section-padding text-center pt-28 sm:pt-36">
        {/* Main Headline */}
        <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold leading-tight mb-4 sm:mb-6 animate-fade-in-up px-2">
          {t("hero.headline")}{" "}
          <span className="text-primary italic">{t("hero.headline.highlight")}</span>
        </h1>

        {/* Subheadline */}
        <p className="font-body font-medium text-gray-300 text-lg max-w-2xl mx-auto mb-8 sm:mb-10 animate-fade-in-up px-4 leading-relaxed" style={{ animationDelay: "0.2s" }}>
          {t("hero.subheadline")}
        </p>

        {/* CTA Buttons */}
        <div className="animate-fade-in-up px-4 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4" style={{ animationDelay: "0.4s" }}>
          <Link
            to="/usa"
            className="inline-flex items-center justify-center gap-2 w-full sm:w-auto h-12 px-8 text-sm sm:text-base font-semibold font-body rounded-lg bg-primary text-primary-foreground hover:bg-primary-hover shadow-lg hover:shadow-glow transform hover:scale-105 transition-all duration-300"
          >
            {t("hero.cta.usa")}
            <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5" />
          </Link>
          <Link
            to="/spain"
            className="inline-flex items-center justify-center gap-2 w-full sm:w-auto h-12 px-8 text-sm sm:text-base font-semibold font-body rounded-lg bg-primary text-primary-foreground hover:bg-primary-hover shadow-lg hover:shadow-glow transform hover:scale-105 transition-all duration-300"
          >
            {t("hero.cta.spain")}
            <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5" />
          </Link>
        </div>
      </div>

      {/* Scroll Indicator - hidden on mobile */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-float hidden sm:block">
        <div className="w-6 h-10 border-2 border-muted-foreground/30 rounded-full flex items-start justify-center p-2">
          <div className="w-1 h-2 bg-primary rounded-full animate-bounce" />
        </div>
      </div>
    </section>
  );
};
export default HeroSection;