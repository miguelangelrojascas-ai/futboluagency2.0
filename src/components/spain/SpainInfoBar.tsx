import { Calendar, Globe, MapPin } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const SpainInfoBar = () => {
  const { language } = useLanguage();
  const isEs = language === "es";

  const items = [
    {
      icon: Calendar,
      label: isEs ? "Duración" : "Duration",
      value: isEs ? "Temporada completa" : "Full season",
    },
    {
      icon: Globe,
      label: isEs ? "Perfil" : "Profile",
      value: isEs ? "Futbolistas internacionales" : "International footballers",
    },
    {
      icon: MapPin,
      label: isEs ? "Ubicación" : "Location",
      value: "Talavera de la Reina, Madrid",
    },
  ];

  return (
    <section style={{ backgroundColor: "#0f0f0f" }}>
      <div className="container-wide px-4">
        <div className="max-w-[1100px] mx-auto grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-border border border-border rounded-xl overflow-hidden">
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
