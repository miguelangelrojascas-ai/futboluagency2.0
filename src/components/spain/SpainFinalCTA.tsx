import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";

const SpainFinalCTA = () => {
  const { language } = useLanguage();
  const isEs = language === "es";

  return (
    <section className="section-padding" style={{ backgroundColor: "#0f0f0f" }}>
      <div className="container-wide px-4">
        <div className="max-w-[700px] mx-auto text-center">
          <p className="font-body text-muted-foreground text-base leading-relaxed mb-6">
            {isEs
              ? "Plazas limitadas por temporada. El proceso comienza con una evaluación gratuita."
              : "Limited spots per season. The process starts with a free evaluation."}
          </p>
          <Link
            to="/apply"
            className="inline-flex items-center gap-2 bg-primary hover:bg-primary-hover text-primary-foreground font-body font-bold px-10 py-4 rounded-lg transition-colors text-base sm:text-lg"
          >
            {isEs ? "Comienza Tu Camino" : "Start Your Journey"} <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default SpainFinalCTA;
