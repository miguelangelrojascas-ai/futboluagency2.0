import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";

interface CalendlySectionProps {
  onOpenForm: () => void;
}

const CalendlySection = ({ onOpenForm }: CalendlySectionProps) => {
  const { t } = useLanguage();
  return (
    <section id="calendly-section" className="section-padding bg-background">
      <div className="container-wide">
        <div className="text-center">
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
            {t("calendly.title")}
          </h2>
          <p className="font-body text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto mb-8">
            {t("calendly.subtitle")}
          </p>
          <Button 
            onClick={onOpenForm}
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
