"use client";

import { Calendar, Globe, MapPin } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

import { tr } from "@/lib/i18n";
const SpainInfoBar = () => {
  const { language } = useLanguage();
  const isEs = language === "es";

  const items = [
    {
      icon: Calendar,
      label: tr(language, "Duración", "Duration"),
      value: tr(language, "Temporada completa", "Full season"),
    },
    {
      icon: Globe,
      label: tr(language, "Perfil", "Profile"),
      value: tr(language, "Futbolistas internacionales", "International footballers"),
    },
    {
      icon: MapPin,
      label: tr(language, "Ubicación", "Location"),
      value: tr(language, "Talavera de la Reina, a 1h de Madrid", "Talavera de la Reina, 1h from Madrid"),
    },
  ];

  return (
    <section style={{ backgroundColor: "hsl(var(--background))" }}>
      <div className="container-wide px-4">
        <div className="max-w-[1100px] mx-auto grid grid-cols-1 sm:grid-cols-3 gap-px bg-border border border-border rounded-xl overflow-hidden">
          {items.map((item, i) => (
            <div key={i} className="flex items-center gap-4 px-6 py-5 sm:py-6 bg-card/50">
              <item.icon className="w-5 h-5 text-primary flex-shrink-0" />
              <div>
                <p className="font-body text-xs tracking-[0.15em] uppercase text-muted-foreground mb-0.5">
                  {item.label}
                </p>
                <p className="font-body text-sm font-medium text-foreground">
                  {item.value}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SpainInfoBar;
