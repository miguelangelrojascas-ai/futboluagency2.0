import { ClipboardCheck, Video, Users, FileCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import cardBgEvaluation from "@/assets/card-bg-evaluation.jpg";
import cardBgProfile from "@/assets/card-bg-profile.jpg";
import cardBgCoaches from "@/assets/card-bg-coaches.jpg";
import cardBgVisas from "@/assets/card-bg-visas.jpg";

const CALENDLY_URL = "https://calendly.com/miguelangelrojascas/new-meeting";

const services = [
  {
    icon: ClipboardCheck,
    title: "Evaluación deportiva profesional",
    description: "Analizamos tu nivel de juego, tu perfil académico y tu potencial para identificar las mejores oportunidades reales para ti.",
    bgImage: cardBgEvaluation
  },
  {
    icon: Video,
    title: "Creación de tu perfil para becas",
    description: "Editamos tu video highlight, tus estadísticas, y diseñamos un perfil profesional que atrae a entrenadores de NCAA, NAIA y JUCO.",
    bgImage: cardBgProfile
  },
  {
    icon: Users,
    title: "Representación y contacto directo con entrenadores",
    description: "Nos encargamos de hablar con los coaches, presentar tu perfil y conseguir respuestas reales y ofertas concretas.",
    bgImage: cardBgCoaches
  },
  {
    icon: FileCheck,
    title: "Guía completa en visas, becas y admisiones",
    description: "Te acompañamos paso a paso hasta que estés aceptado y con beca asegurada. Admisiones, TOEFL, FAFSA, DS-160, I-20.",
    bgImage: cardBgVisas
  }
];

const CTASection = () => {
  return (
    <section className="section-padding bg-background">
      <div className="container-wide">
        <div className="max-w-4xl mx-auto text-center mb-12">
          {/* Headline */}
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Transformamos tu sueño de estudiar y jugar en EE.UU.{" "}
            <span className="text-primary italic">en un plan real.</span>
          </h2>

          {/* Subheadline */}
          <p className="font-body text-muted-foreground text-lg md:text-xl">
            Lo que obtienes al aplicar con nosotros:
          </p>
        </div>

        {/* 2x2 Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {services.map((service, index) => (
            <div
              key={index}
              className="relative overflow-hidden rounded-xl min-h-[280px] group"
            >
              {/* Background Image */}
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                style={{ backgroundImage: `url(${service.bgImage})` }}
              />
              
              {/* Dark Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-background/40" />
              
              {/* Content */}
              <div className="relative h-full flex flex-col justify-end p-8">
                {/* Icon */}
                <div className="mb-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/20 border border-primary/40 flex items-center justify-center backdrop-blur-sm">
                    <service.icon className="w-6 h-6 text-primary" />
                  </div>
                </div>

                <h3 className="font-display text-xl font-semibold text-foreground mb-2">
                  {service.title}
                </h3>
                <p className="font-body text-muted-foreground text-sm leading-relaxed">
                  {service.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <div className="text-center mt-12">
          <Button
            variant="cta"
            size="xl"
            asChild
          >
            <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer">
              Agenda tu llamada. Sesión 1-1 para evaluar tu caso
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
