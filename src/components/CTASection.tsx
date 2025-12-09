import { ClipboardCheck, Video, Users, FileCheck } from "lucide-react";

const services = [
  {
    icon: ClipboardCheck,
    title: "Evaluación deportiva profesional",
    description: "Analizamos tu nivel de juego, tu perfil académico y tu potencial para identificar las mejores oportunidades reales para ti."
  },
  {
    icon: Video,
    title: "Creación de tu perfil para becas",
    description: "Editamos tu video highlight, tus estadísticas, y diseñamos un perfil profesional que atrae a entrenadores de NCAA, NAIA y JUCO."
  },
  {
    icon: Users,
    title: "Representación y contacto directo con entrenadores",
    description: "Nos encargamos de hablar con los coaches, presentar tu perfil y conseguir respuestas reales y ofertas concretas."
  },
  {
    icon: FileCheck,
    title: "Guía completa en visas, becas y admisiones",
    description: "Te acompañamos paso a paso hasta que estés aceptado y con beca asegurada. Admisiones, TOEFL, FAFSA, DS-160, I-20."
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
              className="relative overflow-hidden rounded-xl bg-card/50 border border-border/30 p-8 transition-all duration-300 hover:border-primary/50 hover:bg-card/70 group"
            >
              {/* Background gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              {/* Icon */}
              <div className="relative mb-6">
                <div className="w-14 h-14 rounded-lg bg-primary/10 border border-primary/30 flex items-center justify-center">
                  <service.icon className="w-7 h-7 text-primary" />
                </div>
              </div>

              {/* Content */}
              <div className="relative">
                <h3 className="font-display text-xl font-semibold text-foreground mb-3">
                  {service.title}
                </h3>
                <p className="font-body text-muted-foreground text-sm leading-relaxed">
                  {service.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CTASection;
