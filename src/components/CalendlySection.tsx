import { useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

const CalendlySection = () => {
  const { t } = useLanguage();

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://assets.calendly.com/assets/external/widget.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <section id="calendly-section" className="section-padding bg-muted/30">
      <div className="container-wide">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
            {t("calendly.title")}
          </h2>
          <p className="font-body text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto">
            {t("calendly.subtitle")}
          </p>
        </div>
        
        <div 
          className="calendly-inline-widget rounded-xl overflow-hidden" 
          data-url="https://calendly.com/miguelangelrojascas"
          style={{ minWidth: "320px", height: "700px" }}
        />
      </div>
    </section>
  );
};

export default CalendlySection;
