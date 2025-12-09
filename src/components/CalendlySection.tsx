import { useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";

declare global {
  interface Window {
    Calendly?: {
      initPopupWidget: (options: { url: string }) => void;
    };
  }
}

const CalendlySection = () => {
  const { t } = useLanguage();

  useEffect(() => {
    // Load Calendly CSS
    const link = document.createElement("link");
    link.href = "https://assets.calendly.com/assets/external/widget.css";
    link.rel = "stylesheet";
    document.head.appendChild(link);

    // Load Calendly JS
    const script = document.createElement("script");
    script.src = "https://assets.calendly.com/assets/external/widget.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.head.removeChild(link);
      document.body.removeChild(script);
    };
  }, []);

  const openCalendly = () => {
    if (window.Calendly) {
      window.Calendly.initPopupWidget({
        url: 'https://calendly.com/miguelangelrojascas/new-meeting?hide_event_type_details=1&hide_gdpr_banner=1'
      });
    }
  };

  return (
    <section id="calendly-section" className="section-padding bg-muted/30">
      <div className="container-wide">
        <div className="text-center">
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
            {t("calendly.title")}
          </h2>
          <p className="font-body text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto mb-8">
            {t("calendly.subtitle")}
          </p>
          <Button 
            onClick={openCalendly}
            size="lg"
            className="gap-2"
          >
            <Calendar className="w-5 h-5" />
            {t("calendly.button")}
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CalendlySection;
