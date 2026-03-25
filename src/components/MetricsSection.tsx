import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useLanguage } from "@/contexts/LanguageContext";

const MetricsSection = () => {
  const { t } = useLanguage();
  
  const metrics = [
    { value: "350+", label: t("metrics.universities") },
    { value: "40+", label: "Estados Cubiertos" },
    { value: "$10M+", label: t("metrics.scholarships") },
    { value: "98%", label: t("metrics.satisfaction") },
  ];

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
            <section className="relative py-6 sm:py-8 md:py-12 cursor-pointer" style={{ backgroundColor: "#0f0f0f" }}>
              {/* Soft divider */}
              <div className="absolute top-0 left-0 right-0 h-px bg-foreground/[0.04]" />
            <div className="container-wide px-4">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-12">
                {metrics.map((metric, index) => (
                  <div
                    key={metric.label}
                    className="text-center animate-fade-in-up"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-primary italic mb-1">
                      {metric.value}
                    </div>
                    <p className="font-body text-muted-foreground text-[10px] sm:text-xs md:text-sm">
                      {metric.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </TooltipTrigger>
        <TooltipContent side="bottom" className="max-w-sm text-center">
          <p>Nuestra red de contactos incluye universidades en todas las divisiones: NCAA, NAIA y JUCO.</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default MetricsSection;
