const MetricsSection = () => {
  const metrics = [
    { value: "350+", label: "Universidades Aliadas" },
    { value: "40+", label: "Estados Cubiertos" },
    { value: "$10M+", label: "En Becas Gestionadas" },
    { value: "98%", label: "Tasa de Éxito" },
  ];

  return (
    <section className="section-padding bg-background">
      <div className="container-wide">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {metrics.map((metric, index) => (
            <div
              key={metric.label}
              className="text-center animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-primary italic mb-2">
                {metric.value}
              </div>
              <p className="font-body text-muted-foreground text-sm md:text-base">
                {metric.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MetricsSection;
