import { Quote } from "lucide-react";

const TestimonialsSection = () => {
  const testimonials = [
    {
      name: "Carlos Mendez",
      university: "University of Kentucky",
      quote: "Gracias a FutbolUAgency logré mi sueño de estudiar y jugar en Estados Unidos con una beca completa.",
    },
    {
      name: "Ana García",
      university: "UCLA",
      quote: "El equipo me guió en cada paso del proceso. Hoy estoy jugando en una de las mejores universidades del país.",
    },
    {
      name: "Diego Fernández",
      university: "Stanford University",
      quote: "Profesionales de primer nivel. Me ayudaron a conseguir una beca que cambió mi vida.",
    },
  ];

  return (
    <section className="section-padding bg-background-alt">
      <div className="container-wide">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-primary font-body text-sm tracking-[0.2em] uppercase mb-4 block">
            Testimonios
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold">
            Historias de <span className="text-primary italic">Éxito</span>
          </h2>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.name}
              className="bg-card rounded-xl p-8 border border-border hover:border-primary/30 transition-all duration-300 animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Quote Icon */}
              <Quote className="w-8 h-8 text-primary/30 mb-4" />

              {/* Quote */}
              <p className="font-body text-muted-foreground mb-6 leading-relaxed">
                "{testimonial.quote}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-4">
                {/* Avatar Placeholder */}
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                  <span className="font-display text-lg font-bold text-primary">
                    {testimonial.name.charAt(0)}
                  </span>
                </div>

                <div>
                  <h4 className="font-display font-semibold text-foreground">
                    {testimonial.name}
                  </h4>
                  <p className="font-body text-sm text-muted-foreground">
                    {testimonial.university}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
