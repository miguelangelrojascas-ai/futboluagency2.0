import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";

interface CalendlySectionProps {
  onOpenForm: () => void;
}

const CalendlySection = ({ onOpenForm }: CalendlySectionProps) => {
  const { language } = useLanguage();
  const isEs = language === "es";

  return (
    <section id="calendly-section" className="py-24" style={{ backgroundColor: "#ffffff" }}>
      <div className="container-wide">
        <div className="text-center">
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
            {isEs
              ? "Agenda tu Evaluación Deportiva Gratuita"
              : "Schedule Your Free Athletic Evaluation"}
          </h2>
          <p className="font-body text-gray-300 text-lg max-w-2xl mx-auto mb-8 leading-relaxed">
            {isEs
              ? "Una llamada estratégica con nuestro equipo de admisiones para analizar tu perfil deportivo, definir tus opciones y trazar un plan personalizado hacia tu destino."
              : "A strategic call with our admissions team to analyze your athletic profile, define your options, and create a personalized plan toward your destination."}
          </p>
          <Button 
            onClick={onOpenForm}
            size="lg"
            className="gap-2"
          >
            <Calendar className="w-5 h-5" />
            {isEs ? "Agendar Reunión" : "Schedule Meeting"}
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CalendlySection;
