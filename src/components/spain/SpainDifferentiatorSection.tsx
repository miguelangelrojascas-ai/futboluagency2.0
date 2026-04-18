import { useLanguage } from "@/contexts/LanguageContext";
import { Zap } from "lucide-react";

const SpainDifferentiatorSection = () => {
  const { language } = useLanguage();
  const isEs = language === "es";

  return (
    <section className="py-24" style={{ backgroundColor: "#ffffff" }}>
      <div className="container-wide px-4">
        <div className="max-w-[1100px] mx-auto">
          <div
            className="rounded-2xl p-8 sm:p-10"
            style={{
              backgroundColor: "#ffffff",
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
                    ? "Una temporada completa en el fútbol español"
                    : "A full season in Spanish football"}
                </h3>
                <p className="font-body text-gray-300 text-base leading-relaxed max-w-3xl">
                  {isEs
                    ? "Mismo vestuario, misma liga, mismo nivel que los profesionales. Compites una temporada completa dentro de un club real, con scouts mirando cada partido"
                    : "Same locker room, same league, same level as the professionals. You compete for a full season within a real club, with scouts watching every game."}
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
