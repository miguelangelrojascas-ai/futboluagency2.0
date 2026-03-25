import { useState } from "react";
import { ArrowRight, X } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import ceoIgnacio from "@/assets/ceo-ignacio.jpg";
import ceoMoha from "@/assets/ceo-moha.jpg";

const TeamProfileCards = () => {
  const { language } = useLanguage();
  const isEs = language === "es";
  const [activeFounder, setActiveFounder] = useState<number | null>(null);

  const founders = [
    {
      name: "Ignacio De Bejar",
      role: "Co-founder & CEO",
      image: ceoIgnacio,
      bio: isEs
        ? [
            "Ignacio vivió en primera persona lo difícil que es conseguir una beca deportiva en Estados Unidos. Tras formarse en el Hércules CF, decidió dar el salto a EE.UU. para continuar su carrera, pero descubrió que la agencia que debía ayudarlo no brindaba el apoyo prometido.",
            "Se encontró solo en un país nuevo, enfrentando rechazos y obstáculos que tuvo que superar por su cuenta mientras buscaba una universidad donde desarrollarse como atleta y estudiante.",
            "Esa experiencia lo motivó a dedicar su carrera a que ningún jugador viva lo mismo. Hoy, Ignacio utiliza su trayectoria y conocimiento del sistema universitario para guiar a futbolistas internacionales y acompañarlos paso a paso en su camino hacia una beca real en EE.UU.",
          ]
        : [
            "Ignacio experienced firsthand how difficult it is to get a sports scholarship in the United States. After training at Hércules CF, he decided to make the leap to the U.S. to continue his career, but discovered that the agency supposed to help him didn't provide the promised support.",
            "He found himself alone in a new country, facing rejections and obstacles he had to overcome on his own while searching for a university to develop as an athlete and student.",
            "That experience motivated him to dedicate his career to ensuring no player goes through the same. Today, Ignacio uses his experience and knowledge of the university system to guide international soccer players step by step on their path to a real scholarship in the U.S.",
          ],
    },
    {
      name: "Moha",
      role: "Co-founder & CEO",
      image: ceoMoha,
      bio: isEs
        ? [
            "Cuando Mohammed intentó transferirse a una universidad de mayor nivel, esperaba recibir el apoyo de la agencia que lo representaba. Sin embargo, en el momento más importante del proceso, fue abandonado sin guía ni acompañamiento.",
            "Enfrentó solo un camino lleno de incertidumbre, obstáculos y decisiones críticas que impactaban su futuro deportivo y académico.",
            "Esta experiencia lo llevó a crear una agencia con un propósito claro: ofrecer el apoyo que a él le faltó. Hoy, Moha ha ayudado a decenas de jugadores a conseguir becas y oportunidades reales, asegurándose de que cada uno reciba el acompañamiento cercano, profesional y humano que él nunca tuvo.",
          ]
        : [
            "When Mohammed tried to transfer to a higher-level university, he expected to receive support from the agency representing him. However, at the most important moment of the process, he was abandoned without guidance or support.",
            "He faced alone a path full of uncertainty, obstacles, and critical decisions that impacted his athletic and academic future.",
            "This experience led him to create an agency with a clear purpose: to offer the support he lacked. Today, Moha has helped dozens of players get real scholarships and opportunities, ensuring each one receives the close, professional, and human support he never had.",
          ],
    },
  ];

  const selectedFounder = activeFounder !== null ? founders[activeFounder] : null;

  return (
    <>
      <section className="section-padding bg-background">
        <div className="container-wide px-4">
          <div className="text-center mb-10">
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold mb-3">
              {isEs ? "Más que una Agencia, Somos tu " : "More than an Agency, We're Your "}
              <span className="text-primary italic">{isEs ? "Equipo" : "Team"}</span>
            </h2>
            <p className="font-body text-muted-foreground text-sm sm:text-base max-w-xl mx-auto">
              {isEs
                ? "Conoce a los fundadores que crearon FutbolU Agency desde su propia experiencia."
                : "Meet the founders who built FutbolU Agency from their own experience."}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-5 justify-center max-w-[640px] mx-auto">
            {founders.map((founder, i) => (
              <div
                key={founder.name}
                onClick={() => setActiveFounder(i)}
                className="flex-1 relative rounded-2xl overflow-hidden aspect-[3/4] group cursor-pointer transition-all duration-500 hover:shadow-[0_0_25px_-5px_hsl(var(--primary)/0.4)]"
              >
                <img
                  src={founder.image}
                  alt={founder.name}
                  className="absolute inset-0 w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.6) 40%, rgba(0,0,0,0.1) 100%)",
                  }}
                />
                <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6">
                  <span className="inline-block font-body text-[10px] sm:text-xs tracking-[0.12em] uppercase font-semibold text-primary-foreground bg-primary px-3 py-1 rounded-full mb-3">
                    {founder.role}
                  </span>
                  <h3
                    className="font-display text-xl sm:text-2xl font-bold text-white leading-tight mb-2"
                    style={{ textShadow: "0 2px 8px rgba(0,0,0,0.7)" }}
                  >
                    {founder.name}
                  </h3>
                  <span className="inline-flex items-center gap-1.5 font-body text-sm text-white/70 group-hover:text-white transition-colors">
                    {isEs ? "Ver su historia" : "See their story"}{" "}
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Modal */}
      {selectedFounder && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
          onClick={() => setActiveFounder(null)}
        >
          <div
            className="relative bg-card border border-border rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActiveFounder(null)}
              className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center text-foreground hover:bg-background transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="p-6 sm:p-8">
              {/* Portrait */}
              <div className="flex flex-col sm:flex-row gap-6 mb-6">
                <div className="flex-shrink-0">
                  <img
                    src={selectedFounder.image}
                    alt={selectedFounder.name}
                    className="w-32 h-40 sm:w-40 sm:h-52 object-cover object-top rounded-xl border border-border"
                  />
                </div>
                <div className="flex flex-col justify-center">
                  <span className="inline-block w-fit font-body text-[10px] sm:text-xs tracking-[0.12em] uppercase font-semibold text-primary-foreground bg-primary px-3 py-1 rounded-full mb-2">
                    {selectedFounder.role}
                  </span>
                  <h2 className="font-display text-2xl sm:text-3xl font-bold text-foreground">
                    {selectedFounder.name}
                  </h2>
                </div>
              </div>

              {/* Bio */}
              <div className="space-y-4">
                {selectedFounder.bio.map((paragraph, i) => (
                  <p
                    key={i}
                    className="font-body text-muted-foreground text-sm sm:text-base leading-relaxed"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TeamProfileCards;
