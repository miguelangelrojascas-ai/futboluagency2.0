import { useEffect, useRef, useState } from "react";
import { ClipboardCheck, Video, Users, Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";

const CALENDLY_URL = "https://calendly.com/miguelangelrojascas/new-meeting";

const steps = [
  {
    icon: ClipboardCheck,
    title: "Evaluación Inicial",
    description: "Analizamos tu perfil deportivo y académico para identificar las mejores oportunidades.",
  },
  {
    icon: Video,
    title: "Preparación de Material",
    description: "Creamos tu video destacado y perfil profesional que impresionará a los entrenadores.",
  },
  {
    icon: Users,
    title: "Contacto con Universidades",
    description: "Nos comunicamos directamente con entrenadores y coordinadores de admisiones.",
  },
  {
    icon: Trophy,
    title: "Aceptación y Beca",
    description: "Te guiamos hasta obtener tu oferta oficial y comenzar tu aventura universitaria.",
  },
];

const ProcessSection = () => {
  const [activeStep, setActiveStep] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;

      stepsRef.current.forEach((stepEl, index) => {
        if (!stepEl) return;
        const rect = stepEl.getBoundingClientRect();
        const viewportCenter = window.innerHeight / 2;
        
        if (rect.top <= viewportCenter && rect.bottom >= viewportCenter) {
          setActiveStep(index);
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section ref={sectionRef} className="relative bg-background">
      {/* Warm gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-primary/5 pointer-events-none" />

      <div className="container-wide relative">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-16">
          {/* Sticky Title Card */}
          <div className="lg:w-[380px] lg:flex-shrink-0">
            <div className="lg:sticky lg:top-32">
              <div className="rounded-xl border border-border/50 bg-card/30 backdrop-blur-sm p-8 text-center">
                <h2 className="font-display text-2xl md:text-3xl font-bold text-primary italic mb-3">
                  Así es como funciona
                </h2>
                <p className="font-body text-muted-foreground">
                  Nuestro Proceso para conseguir tu Beca Deportiva
                </p>
              </div>
            </div>
          </div>

          {/* Timeline */}
          <div className="flex-1 py-16 lg:py-32">
            <div className="relative">
              {/* Vertical Line */}
              <div className="absolute left-6 lg:left-8 top-0 bottom-0 w-px bg-gradient-to-b from-primary/50 via-primary to-primary/50" />

              {/* Steps */}
              <div className="space-y-32 lg:space-y-48">
                {steps.map((step, index) => (
                  <div
                    key={index}
                    ref={(el) => (stepsRef.current[index] = el)}
                    className="relative flex gap-8 lg:gap-12"
                  >
                    {/* Icon on Timeline */}
                    <div className="relative z-10 flex-shrink-0">
                      <div
                        className={`w-12 h-12 lg:w-16 lg:h-16 rounded-full border-2 flex items-center justify-center transition-all duration-500 ${
                          activeStep >= index
                            ? "bg-primary/20 border-primary"
                            : "bg-card border-border"
                        }`}
                      >
                        <step.icon
                          className={`w-5 h-5 lg:w-7 lg:h-7 transition-colors duration-500 ${
                            activeStep >= index ? "text-primary" : "text-muted-foreground"
                          }`}
                        />
                      </div>
                    </div>

                    {/* Content */}
                    <div
                      className={`flex-1 pt-2 transition-all duration-500 ${
                        activeStep >= index
                          ? "opacity-100 translate-y-0"
                          : "opacity-30 translate-y-4"
                      }`}
                    >
                      <h3 className="font-display text-2xl lg:text-3xl font-bold text-foreground mb-3">
                        Fase {index + 1} - {step.title}
                      </h3>
                      <p className="font-body text-muted-foreground text-base lg:text-lg leading-relaxed max-w-md">
                        {step.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA Button */}
            <div className="text-center mt-20">
              <Button
                variant="ctaLarge"
                size="ctaXl"
                asChild
              >
                <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer">
                  <span className="text-lg md:text-xl font-bold uppercase tracking-wider">Agendar Llamada Estratégica</span>
                  <span className="text-sm md:text-base font-normal opacity-90">Sesión 1 a 1 para evaluar tu caso</span>
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
