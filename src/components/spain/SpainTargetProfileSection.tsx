import { Check } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const SpainTargetProfileSection = () => {
  const { language } = useLanguage();
  const isEs = language === "es";

  const items = [
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

  return (
    <section className="section-padding" style={{ backgroundColor: "#0f0f0f" }}>
      <div className="container-wide px-4">
        <div className="max-w-[1100px] mx-auto">
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold mb-8 leading-tight">
            {isEs ? "¿Este programa es para ti?" : "Is this program for you?"}
          </h2>
          <div className="space-y-4">
            {items.map((item, i) => (
              <div key={i} className="flex items-start gap-4">
                <div className="w-6 h-6 rounded-full bg-primary/15 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Check className="w-3.5 h-3.5 text-primary" />
                </div>
                <p className="font-body text-base text-foreground/90 leading-relaxed">
                  {item}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SpainTargetProfileSection;
