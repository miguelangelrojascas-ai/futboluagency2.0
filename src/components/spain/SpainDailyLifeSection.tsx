"use client";

import { useLanguage } from "@/contexts/LanguageContext";

import { tr } from "@/lib/i18n";
const SpainDailyLifeSection = () => {
  const { language } = useLanguage();
  const isEs = language === "es";

  const weekday = {
    title: tr(language, "Día de entrenamiento", "Training day"),
    items: [
      { time: "07:30", label: tr(language, "Desayuno en residencia", "Breakfast at residence") },
      { time: "09:00", label: tr(language, "Sesión táctica / video", "Tactical session / video") },
      { time: "10:30", label: tr(language, "Entrenamiento en campo", "Field training") },
      { time: "13:00", label: tr(language, "Almuerzo y descanso", "Lunch & rest") },
      { time: "16:00", label: tr(language, "Gimnasio / prevención de lesiones", "Gym / injury prevention") },
      { time: "18:00", label: tr(language, "Segunda sesión técnica", "Second technical session") },
      { time: "20:30", label: tr(language, "Cena y tiempo libre", "Dinner & free time") },
    ],
  };

  const matchDay = {
    title: tr(language, "Día de partido", "Match day"),
    items: [
      { time: "08:00", label: tr(language, "Desayuno ligero", "Light breakfast") },
      { time: "09:30", label: tr(language, "Activación y estiramientos", "Activation & stretching") },
      { time: "10:30", label: tr(language, "Charla táctica pre-partido", "Pre-match tactical talk") },
      { time: "12:00", label: tr(language, "Comida pre-partido", "Pre-match meal") },
      { time: "16:00", label: tr(language, "Calentamiento", "Warm-up") },
      { time: "17:00", label: tr(language, "Partido oficial", "Official match") },
      { time: "20:00", label: tr(language, "Recuperación y cena", "Recovery & dinner") },
    ],
  };

  const renderCard = (data: typeof weekday) => (
    <div className="rounded-xl bg-card border border-border p-6 sm:p-7">
      <h3 className="font-display text-lg sm:text-xl font-bold text-foreground mb-5">
        {data.title}
      </h3>
      <div className="space-y-3">
        {data.items.map((item, i) => (
          <div key={i} className="flex items-center gap-4">
            <span className="font-body text-xs font-medium text-primary w-12 flex-shrink-0">
              {item.time}
            </span>
            <span className="font-body text-sm text-foreground/80">
              {item.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <section className="section-padding" style={{ backgroundColor: "hsl(var(--background))" }}>
      <div className="container-wide px-4">
        <div className="max-w-[1100px] mx-auto">
          <span className="inline-block mb-4 text-primary font-body text-xs tracking-[0.15em] uppercase">
            {tr(language, "Vida Diaria", "Daily Life")}
          </span>
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold mb-8 leading-tight">
            {tr(language, "Un día en la vida", "A day in the life")}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {renderCard(weekday)}
            {renderCard(matchDay)}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SpainDailyLifeSection;
