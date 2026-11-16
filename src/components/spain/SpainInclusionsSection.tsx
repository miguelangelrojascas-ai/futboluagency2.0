"use client";

import { Home, Utensils, Dumbbell, Shield, ClipboardList, Plane } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

import { tr } from "@/lib/i18n";
const SpainInclusionsSection = () => {
  const { language } = useLanguage();
  const isEs = language === "es";

  const items = [
    {
      icon: Home,
      title: tr(language, "Residencia deportiva", "Sports residence"),
      desc: tr(language, "Alojamiento completo durante toda la temporada", "Full accommodation throughout the season"),
    },
    {
      icon: Utensils,
      title: tr(language, "Alimentación completa", "Full board meals"),
      desc: tr(language, "Dieta deportiva supervisada por nutricionistas", "Sports diet supervised by nutritionists"),
    },
    {
      icon: Dumbbell,
      title: tr(language, "Entrenamiento diario", "Daily training"),
      desc: tr(language, "Sesiones tácticas, técnicas y físicas", "Tactical, technical and physical sessions"),
    },
    {
      icon: Shield,
      title: tr(language, "Seguro médico", "Medical insurance"),
      desc: tr(language, "Cobertura médica y prevención de lesiones", "Medical coverage and injury prevention"),
    },
    {
      icon: ClipboardList,
      title: tr(language, "Seguimiento individual", "Individual tracking"),
      desc: tr(language, "Informes de rendimiento y plan de desarrollo", "Performance reports and development plan"),
    },
    {
      icon: Plane,
      title: tr(language, "Gestión de visados", "Visa management"),
      desc: tr(language, "Apoyo completo en trámites y documentación", "Full support with paperwork and documentation"),
    },
  ];

  return (
    <section className="section-padding" style={{ backgroundColor: "hsl(var(--background))" }}>
      <div className="container-wide px-4">
        <div className="max-w-[1100px] mx-auto">
          <span className="inline-block mb-4 text-primary font-body text-xs tracking-[0.15em] uppercase">
            {tr(language, "Incluido en el Programa", "Included in the Program")}
          </span>
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold mb-8 leading-tight">
            {tr(language, "Todo lo que incluye", "Everything included")}
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
