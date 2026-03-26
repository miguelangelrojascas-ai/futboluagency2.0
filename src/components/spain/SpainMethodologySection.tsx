import { Target, TrendingUp, Users, BarChart3 } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const SpainMethodologySection = () => {
  const { language } = useLanguage();
  const isEs = language === "es";

  const cards = [
    {
      icon: Target,
      title: isEs ? "Entrenamiento Élite" : "Elite Training",
      desc: isEs
        ? "Sesiones diarias enfocadas en modelo de juego, posicionamiento y toma de decisiones bajo presión real de competición."
        : "Daily sessions focused on game model, positioning and decision-making under real competitive pressure.",
    },
    {
      icon: Users,
      title: isEs ? "Integración en Clubes Europeos" : "European Club Integration",
      desc: isEs
        ? "Competición oficial en ligas federadas contra equipos de nivel profesional dentro de clubes reales."
        : "Official competition in federated leagues against professional-level teams within real clubs.",
    },
    {
      icon: TrendingUp,
      title: isEs ? "Acondicionamiento de Alto Rendimiento" : "High-Performance Conditioning",
      desc: isEs
        ? "Planes de rendimiento individualizados con seguimiento de métricas clave y desarrollo físico integral."
        : "Individualized performance plans with key metric tracking and comprehensive physical development.",
    },
    {
      icon: BarChart3,
      title: isEs ? "Análisis de Video y Scouting" : "Video Analysis & Scouting",
      desc: isEs
        ? "Revisión de partidos, informes individuales y exposición directa a scouts de clubes profesionales."
        : "Match reviews, individual reports and direct exposure to professional club scouts.",
    },
  ];

  return (
    <section className="py-24" style={{ backgroundColor: "#0f0f0f" }}>
      <div className="container-wide px-4">
        <div className="max-w-[1100px] mx-auto">
          <span className="inline-block mb-4 text-primary font-body text-xs tracking-[0.15em] uppercase">
            {isEs ? "Cómo Entrenamos" : "How We Train"}
          </span>
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold mb-4 leading-tight">
            {isEs ? "Nuestra Metodología" : "Our Methodology"}
          </h2>
          <p className="font-body text-muted-foreground text-base leading-relaxed mb-10 max-w-xl">
            {isEs
              ? "Un enfoque integral diseñado para maximizar el rendimiento y la visibilidad de cada jugador."
              : "A comprehensive approach designed to maximize every player's performance and visibility."}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {cards.map((card, i) => (
              <div
                key={i}
                className="rounded-xl bg-card border border-border p-6 sm:p-7 border-t-2 border-t-primary hover:border-primary/30 transition-colors"
              >
                <card.icon className="w-6 h-6 text-primary mb-4" />
                <h3 className="font-display text-lg font-bold text-foreground mb-2">
                  {card.title}
                </h3>
                <p className="font-body text-muted-foreground text-sm leading-relaxed">
                  {card.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SpainMethodologySection;
