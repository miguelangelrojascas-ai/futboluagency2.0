import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useLanguage } from "@/contexts/LanguageContext";
import { useCountUp } from "@/hooks/useCountUp";

const CountUpValue = ({ value, label }: { value: string; label: string }) => {
  // Parse numeric part, prefix ($) and suffix (+, %, M+)
  const match = value.match(/^(\$?)(\d+)(.*)/);
  const prefix = match?.[1] || "";
  const num = parseInt(match?.[2] || "0", 10);
  const suffix = match?.[3] || "";

  const { count, ref } = useCountUp(num, 1800);

  return (
    <div ref={ref} className="text-center animate-fade-in-up">
      <div className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-primary italic mb-1">
        {prefix}{count}{suffix}
      </div>
      <p className="font-body text-muted-foreground text-xs sm:text-sm">
        {label}
      </p>
    </div>
  );
};

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
                  <CountUpValue key={index} value={metric.value} label={metric.label} />
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
