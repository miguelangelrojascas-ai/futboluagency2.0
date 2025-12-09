import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const MetricsSection = () => {
  const metrics = [
    { value: "350+", label: "Universidades Aliadas" },
    { value: "40+", label: "Estados Cubiertos" },
    { value: "$10M+", label: "En Becas Gestionadas" },
    { value: "98%", label: "Tasa de Éxito" },
  ];

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <section className="py-8 md:py-12 bg-background/50 backdrop-blur-sm border-y border-border/20 cursor-pointer">
            <div className="container-wide">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-12">
                {metrics.map((metric, index) => (
                  <div
                    key={metric.label}
                    className="text-center animate-fade-in-up"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-primary italic mb-1">
                      {metric.value}
                    </div>
                    <p className="font-body text-muted-foreground text-xs md:text-sm">
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
