import { Home, Utensils, Dumbbell, Shield, ClipboardList, Plane } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const SpainInclusionsSection = () => {
  const { language } = useLanguage();
  const isEs = language === "es";

  const items = [
    {
      icon: Home,
      title: isEs ? "Residencia deportiva" : "Sports residence",
      desc: isEs ? "Alojamiento completo durante toda la temporada" : "Full accommodation throughout the season",
    },
    {
      icon: Utensils,
      title: isEs ? "Alimentación completa" : "Full board meals",
      desc: isEs ? "Dieta deportiva supervisada por nutricionistas" : "Sports diet supervised by nutritionists",
    },
    {
      icon: Dumbbell,
      title: isEs ? "Entrenamiento diario" : "Daily training",
      desc: isEs ? "Sesiones tácticas, técnicas y físicas" : "Tactical, technical and physical sessions",
    },
    {
      icon: Shield,
      title: isEs ? "Seguro médico" : "Medical insurance",
      desc: isEs ? "Cobertura médica y prevención de lesiones" : "Medical coverage and injury prevention",
    },
    {
      icon: ClipboardList,
      title: isEs ? "Seguimiento individual" : "Individual tracking",
      desc: isEs ? "Informes de rendimiento y plan de desarrollo" : "Performance reports and development plan",
    },
    {
      icon: Plane,
      title: isEs ? "Gestión de visados" : "Visa management",
      desc: isEs ? "Apoyo completo en trámites y documentación" : "Full support with paperwork and documentation",
    },
  ];

  return (
    <section className="section-padding" style={{ backgroundColor: "#0f0f0f" }}>
      <div className="container-wide px-4">
        <div className="max-w-[1100px] mx-auto">
          <span className="inline-block mb-4 text-primary font-body text-xs tracking-[0.15em] uppercase">
            {isEs ? "Incluido en el Programa" : "Included in the Program"}
          </span>
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold mb-8 leading-tight">
            {isEs ? "Todo lo que incluye" : "Everything included"}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {items.map((item, i) => (
              <div
                key={i}
                className="rounded-xl bg-card border border-border p-5 sm:p-6 hover:border-primary/30 transition-colors"
              >
                <item.icon className="w-5 h-5 text-primary mb-3" />
                <h3 className="font-display text-base font-bold text-foreground mb-1">
                  {item.title}
                </h3>
                <p className="font-body text-sm text-muted-foreground leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SpainInclusionsSection;
