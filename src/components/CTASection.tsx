import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const CTASection = () => {
  return (
    <section className="section-padding bg-background-alt">
      <div className="container-wide">
        <div className="max-w-3xl mx-auto text-center">
          {/* Step Label */}
          <span className="text-primary font-body text-sm tracking-[0.2em] uppercase mb-4 block">
            Paso 2
          </span>

          {/* Headline */}
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            Agenda tu{" "}
            <span className="text-primary italic">Evaluación Gratuita</span>
          </h2>

          {/* Subheadline */}
          <p className="font-body text-muted-foreground text-lg md:text-xl mb-10 max-w-2xl mx-auto">
            Descubre si calificas para una beca deportiva y qué oportunidades tienes en Estados Unidos.
          </p>

          {/* CTA Button */}
          <Button variant="cta" size="xl">
            Agendar Evaluación Gratuita
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
