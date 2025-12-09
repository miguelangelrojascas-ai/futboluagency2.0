import { ClipboardCheck, UserCircle, Send } from "lucide-react";

const ProcessSection = () => {
  const steps = [
    {
      number: "01",
      icon: ClipboardCheck,
      title: "Aplicación y Evaluación",
      description: "Analizamos tu perfil deportivo y académico de forma gratuita.",
    },
    {
      number: "02",
      icon: UserCircle,
      title: "Preparación y Perfil Deportivo",
      description: "Desarrollamos tu perfil profesional y video de highlights.",
    },
    {
      number: "03",
      icon: Send,
      title: "Contacto con Universidades y Becas",
      description: "Contactamos entrenadores en universidades que encajen contigo.",
    },
  ];

  return (
    <section className="section-padding bg-background">
      <div className="container-wide">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-primary font-body text-sm tracking-[0.2em] uppercase mb-4 block">
            Nuestro Proceso
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold">
            Cómo <span className="text-primary italic">funciona</span>
          </h2>
        </div>

        {/* Steps */}
        <div className="max-w-4xl mx-auto space-y-8">
          {steps.map((step, index) => (
            <div
              key={step.number}
              className="flex items-start gap-6 md:gap-10 p-6 rounded-xl border border-border bg-card/30 hover:bg-card/50 transition-colors animate-fade-in-up"
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              {/* Number */}
              <div className="flex-shrink-0">
                <span className="font-display text-4xl md:text-5xl font-bold text-primary/30 italic">
                  {step.number}
                </span>
              </div>

              {/* Content */}
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <step.icon className="w-5 h-5 text-secondary" />
                  <h3 className="font-display text-xl md:text-2xl font-semibold text-foreground">
                    {step.title}
                  </h3>
                </div>
                <p className="font-body text-muted-foreground">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
