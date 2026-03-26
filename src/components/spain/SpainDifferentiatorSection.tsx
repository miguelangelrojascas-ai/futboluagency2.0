import { useLanguage } from "@/contexts/LanguageContext";
import { Zap } from "lucide-react";

const SpainDifferentiatorSection = () => {
  const { language } = useLanguage();
  const isEs = language === "es";

  return (
    <section className="py-24" style={{ backgroundColor: "#0f0f0f" }}>
      <div className="container-wide px-4">
        <div className="max-w-[1100px] mx-auto">
          <div
            className="rounded-2xl p-8 sm:p-10"
            style={{
              backgroundColor: "#141414",
              border: "0.5px solid #222",
            }}
          >
            <div className="flex items-start gap-5">
              <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0">
                <Zap className="w-6 h-6 text-primary" />
              </div>
              <div>
                <span className="inline-block font-body text-xs tracking-[0.15em] uppercase text-primary mb-3">
                  {isEs ? "El Diferenciador" : "The Differentiator"}
                </span>
                <h3 className="font-display text-xl sm:text-2xl font-bold text-foreground mb-4 leading-tight">
                  {isEs
                    ? "Inmersión real en clubes europeos, no turismo deportivo"
                    : "Real immersion in European clubs, not sports tourism"}
                </h3>
                <p className="font-body text-gray-300 text-base leading-relaxed max-w-3xl">
                  {isEs
                    ? "A diferencia del modelo universitario estadounidense, nuestro programa en España es una inmersión total en Clubes de Fútbol Reales. Competirás en sistemas oficiales de liga mientras mantienes la excelencia académica con programas convalidados de secundaria y universidad."
                    : "Unlike the American university model, our program in Spain is a total immersion in Real Football Clubs. You'll compete in official league systems while maintaining academic excellence with accredited high school and university programs."}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SpainDifferentiatorSection;
