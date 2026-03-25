import { Dumbbell } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const sports = [
  { emoji: "🏀", name: "Basketball" },
  { emoji: "🎾", name: "Tennis" },
  { emoji: "🏐", name: "Volleyball" },
  { emoji: "🏃", name: "Track & Field" },
];

const OtherSportsSection = () => {
  const { t } = useLanguage();

  return (
    <section className="section-padding bg-background relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,hsl(210,100%,50%,0.04),transparent_60%)]" />
      <div className="container-wide px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <div className="w-12 h-12 rounded-xl bg-muted border border-border flex items-center justify-center mx-auto mb-5">
            <Dumbbell className="w-6 h-6 text-muted-foreground" />
          </div>
          <h2 className="font-display text-xl sm:text-2xl md:text-3xl font-bold mb-3">
            {t("othersports.title")}
          </h2>
          <p className="font-body text-muted-foreground text-sm sm:text-base max-w-xl mx-auto mb-8">
            {t("othersports.desc")}
          </p>
          <div className="flex items-center justify-center gap-4 sm:gap-6 flex-wrap">
            {sports.map((sport) => (
              <div
                key={sport.name}
                className="flex items-center gap-2 bg-card border border-border rounded-lg px-4 py-2.5 opacity-60"
              >
                <span className="text-xl">{sport.emoji}</span>
                <span className="font-body text-sm text-muted-foreground">{sport.name}</span>
              </div>
            ))}
          </div>
          <p className="font-body text-xs text-muted-foreground mt-5 italic">
            {t("othersports.coming")}
          </p>
        </div>
      </div>
    </section>
  );
};

export default OtherSportsSection;
