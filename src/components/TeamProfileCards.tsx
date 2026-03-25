import { useState } from "react";
import { ArrowRight, X } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
// TODO: Import real photos when available and replace the InitialsAvatar with <img> tags
// import ceoIgnacio from "@/assets/ceo-ignacio.jpg";
// import ceoMoha from "@/assets/ceo-moha.jpg";
import ceoIgnacio from "@/assets/ceo-ignacio.jpg";
import ceoMoha from "@/assets/ceo-moha.jpg";

const teamMembers = [
  {
    name: "Ignacio De Bejar",
    initials: "ID",
    role: "Co-Founder & CEO",
    // TODO: Replace null with imported image when photo is available
    image: ceoIgnacio,
    bio: {
      es: [
        "Ignacio vivió en primera persona lo difícil que es conseguir una beca deportiva en Estados Unidos. Tras formarse en el Hércules CF, decidió dar el salto a EE.UU. para continuar su carrera, pero descubrió que la agencia que debía ayudarlo no brindaba el apoyo prometido.",
        "Se encontró solo en un país nuevo, enfrentando rechazos y obstáculos que tuvo que superar por su cuenta mientras buscaba una universidad donde desarrollarse como atleta y estudiante.",
        "Esa experiencia lo motivó a dedicar su carrera a que ningún jugador viva lo mismo. Hoy, Ignacio utiliza su trayectoria y conocimiento del sistema universitario para guiar a futbolistas internacionales y acompañarlos paso a paso en su camino hacia una beca real en EE.UU.",
      ],
      en: [
        "Ignacio experienced firsthand how difficult it is to get a sports scholarship in the United States. After training at Hércules CF, he decided to make the leap to the U.S. to continue his career, but discovered that the agency supposed to help him didn't provide the promised support.",
        "He found himself alone in a new country, facing rejections and obstacles he had to overcome on his own while searching for a university to develop as an athlete and student.",
        "That experience motivated him to dedicate his career to ensuring no player goes through the same. Today, Ignacio uses his experience and knowledge of the university system to guide international soccer players step by step on their path to a real scholarship in the U.S.",
      ],
    },
  },
  {
    name: "Moha",
    initials: "MH",
    role: "Co-Founder & CEO",
    image: ceoMoha,
    bio: {
      es: [
        "Cuando Mohammed intentó transferirse a una universidad de mayor nivel, esperaba recibir el apoyo de la agencia que lo representaba. Sin embargo, en el momento más importante del proceso, fue abandonado sin guía ni acompañamiento.",
        "Enfrentó solo un camino lleno de incertidumbre, obstáculos y decisiones críticas que impactaban su futuro deportivo y académico.",
        "Esta experiencia lo llevó a crear una agencia con un propósito claro: ofrecer el apoyo que a él le faltó. Hoy, Moha ha ayudado a decenas de jugadores a conseguir becas y oportunidades reales, asegurándose de que cada uno reciba el acompañamiento cercano, profesional y humano que él nunca tuvo.",
      ],
      en: [
        "When Mohammed tried to transfer to a higher-level university, he expected to receive support from the agency representing him. However, at the most important moment of the process, he was abandoned without guidance or support.",
        "He faced alone a path full of uncertainty, obstacles, and critical decisions that impacted his athletic and academic future.",
        "This experience led him to create an agency with a clear purpose: to offer the support he lacked. Today, Moha has helped dozens of players get real scholarships and opportunities, ensuring each one receives the close, professional, and human support he never had.",
      ],
    },
  },
  {
    name: "Miguel Rojas",
    initials: "MR",
    role: "Director Fútbol Latinoamérica",
    image: null, // TODO: Replace with imported image
    bio: null,
  },
  {
    name: "Mario Serrano",
    initials: "MS",
    role: "Director Marketing",
    image: null,
    bio: null,
  },
  {
    name: "Dominiq Aquino",
    initials: "DA",
    role: "Director Baseball",
    image: null,
    bio: null,
  },
  {
    name: "Próximamente",
    initials: "VB",
    role: "Director Volleyball",
    image: null,
    bio: null,
  },
];

const InitialsAvatar = ({ initials, className = "" }: { initials: string; className?: string }) => (
  <div
    className={`flex items-center justify-center bg-[#1a1a1a] ${className}`}
    style={{ background: "linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 50%, #1a1a1a 100%)" }}
  >
    <span className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-white/20">
      {initials}
    </span>
  </div>
);

const TeamProfileCards = () => {
  const { language } = useLanguage();
  const isEs = language === "es";
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const selected = activeIndex !== null ? teamMembers[activeIndex] : null;

  return (
    <>
      <section className="section-padding" style={{ backgroundColor: "#0f0f0f" }}>
        <div className="container-wide px-4">
          <div className="text-center mb-10">
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold mb-3">
              {isEs ? "Nuestro " : "Our "}
              <span className="text-primary italic">{isEs ? "Equipo" : "Team"}</span>
            </h2>
            <p className="font-body text-muted-foreground text-sm sm:text-base max-w-xl mx-auto">
              {isEs
                ? "Las personas detrás de cada oportunidad que creamos."
                : "The people behind every opportunity we create."}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
            {teamMembers.map((member, i) => (
              <div
                key={i}
                onClick={() => setActiveIndex(i)}
                className="relative rounded-2xl overflow-hidden aspect-[3/4] group cursor-pointer transition-all duration-500 hover:shadow-[0_0_25px_-5px_hsl(var(--primary)/0.4)] border border-transparent hover:border-primary/40"
              >
                {/* TODO: When photo is available, replace InitialsAvatar with:
                    <img src={member.image} alt={member.name} className="absolute inset-0 w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700" /> */}
                {member.image ? (
                  <img
                    src={member.image}
                    alt={member.name}
                    className="absolute inset-0 w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
                  />
                ) : (
                  <InitialsAvatar initials={member.initials} className="absolute inset-0 w-full h-full" />
                )}
                <div
                  className="absolute inset-0"
                  style={{
                    background: "linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.5) 40%, rgba(0,0,0,0.05) 100%)",
                  }}
                />
                <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6">
                  <span className="inline-block font-body text-[10px] sm:text-xs tracking-[0.12em] uppercase font-semibold text-primary-foreground bg-primary px-3 py-1 rounded-full mb-3">
                    {member.role}
                  </span>
                  <h3
                    className="font-display text-xl sm:text-2xl font-bold text-white leading-tight mb-2"
                    style={{ textShadow: "0 2px 8px rgba(0,0,0,0.7)" }}
                  >
                    {member.name}
                  </h3>
                  <span className="inline-flex items-center gap-1.5 font-body text-sm text-white/70 group-hover:text-white transition-colors">
                    {isEs ? "Ver perfil" : "View profile"} <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Modal */}
      {selected && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
          onClick={() => setActiveIndex(null)}
        >
          <div
            className="relative bg-card border border-border rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActiveIndex(null)}
              className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center text-foreground hover:bg-background transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="p-6 sm:p-8">
              <div className="flex flex-col sm:flex-row gap-6 mb-6">
                {/* TODO: Replace InitialsAvatar with <img> when photo available */}
                {selected.image ? (
                  <img
                    src={selected.image}
                    alt={selected.name}
                    className="w-32 h-40 sm:w-40 sm:h-52 object-cover object-top rounded-xl border border-border flex-shrink-0"
                  />
                ) : (
                  <InitialsAvatar
                    initials={selected.initials}
                    className="w-32 h-40 sm:w-40 sm:h-52 rounded-xl border border-border flex-shrink-0"
                  />
                )}
                <div className="flex flex-col justify-center">
                  <span className="inline-block w-fit font-body text-[10px] sm:text-xs tracking-[0.12em] uppercase font-semibold text-primary-foreground bg-primary px-3 py-1 rounded-full mb-2">
                    {selected.role}
                  </span>
                  <h2 className="font-display text-2xl sm:text-3xl font-bold text-foreground">
                    {selected.name}
                  </h2>
                </div>
              </div>

              <div className="space-y-4">
                {selected.bio && selected.bio[language] ? (
                  selected.bio[language].map((paragraph: string, i: number) => (
                    <p key={i} className="font-body text-muted-foreground text-sm sm:text-base leading-relaxed">
                      {paragraph}
                    </p>
                  ))
                ) : (
                  <p className="font-body text-muted-foreground text-sm sm:text-base italic">
                    {isEs ? "Bio próximamente." : "Bio coming soon."}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TeamProfileCards;
