import { Check, X } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const SpainTargetProfileSection = () => {
  const { language } = useLanguage();
  const isEs = language === "es";

  const yesItems = [
    isEs
      ? "Futbolistas de 16 a 23 años con ambición de competir en Europa"
      : "Footballers aged 16–23 with ambition to compete in Europe",
    isEs
      ? "Jugadores que buscan exposición ante scouts y entrenadores profesionales"
      : "Players seeking exposure to professional scouts and coaches",
    isEs
      ? "Atletas dispuestos a comprometerse con una temporada de desarrollo intensivo"
      : "Athletes willing to commit to a full season of intensive development",
  ];

  const noItems = [
    isEs ? "Solo buscas hacer turismo deportivo" : "You're only looking for sports tourism",
    isEs ? "No estás dispuesto a entrenar al máximo nivel" : "You're not willing to train at the highest level",
    isEs ? "Esperas resultados sin compromiso real" : "You expect results without real commitment",
  ];

  const cardStyle = {
    backgroundColor: "#141414",
    border: "0.5px solid #222",
    borderRadius: "14px",
    padding: "32px",
  };

  return (
    <section style={{ backgroundColor: "#0f0f0f", padding: "40px 0" }}>
      <div className="container-wide px-4">
        <div className="max-w-[1100px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Yes card */}
          <div style={cardStyle} className="flex flex-col">
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold mb-6 leading-tight">
              {isEs ? "¿Este programa es para ti?" : "Is this program for you?"}
            </h2>
            <div className="space-y-4 flex-1">
              {yesItems.map((item, i) => (
                <div key={i} className="flex items-start gap-4">
                  <div className="w-6 h-6 rounded-full bg-primary/15 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5 text-primary" />
                  </div>
                  <p className="font-body text-base text-foreground/90 leading-relaxed">{item}</p>
                </div>
              ))}
            </div>
          </div>

          {/* No card */}
          <div style={cardStyle} className="flex flex-col">
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold mb-6 leading-tight">
              {isEs ? "No es para ti si..." : "It's not for you if..."}
            </h2>
            <div className="space-y-4 flex-1">
              {noItems.map((item, i) => (
                <div key={i} className="flex items-start gap-4">
                  <div className="w-6 h-6 rounded-full bg-muted/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <X className="w-3.5 h-3.5 text-muted-foreground/50" />
                  </div>
                  <p className="font-body text-base text-foreground/90 leading-relaxed">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SpainTargetProfileSection;
