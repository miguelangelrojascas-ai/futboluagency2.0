import { useState } from "react";
import { ArrowRight, X } from "lucide-react";

const LinkedInIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

const InstagramIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
  </svg>
);
import { useLanguage } from "@/contexts/LanguageContext";
// TODO: Import real photos when available and replace the InitialsAvatar with <img> tags
// import ceoIgnacio from "@/assets/ceo-ignacio.jpg";
// import ceoMoha from "@/assets/ceo-moha.jpg";
import ceoIgnacio from "@/assets/ceo-ignacio.jpg";
import ceoMoha from "@/assets/ceo-moha.jpg";
import monicaRodriguez from "@/assets/monica-rodriguez.jpg";
import pabloTenis from "@/assets/pablo-tennis.jpg";
import fabianMorales from "@/assets/fabian-morales.jpg";
import miguelRojas from "@/assets/miguel-rojas.jpg";
import neusTrack from "@/assets/neus-track.jpg";

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
    image: miguelRojas,
    instagram: "https://www.instagram.com/futboluagency.latam/",
    bio: null,
  },
  {
    name: "Mónica Rodríguez",
    initials: "MR",
    role: "Directora de Scouting y Reclutamiento",
    image: monicaRodriguez,
    linkedin: "https://www.linkedin.com/in/monica-rodriguez-serrano-44367236/",
    bio: null,
  },
  {
    name: "Pablo",
    initials: "PB",
    role: "Ambassador & Tennis Scout",
    image: pabloTenis,
    instagram: "https://www.instagram.com/pablo_fuatenis/",
    bio: null,
  },
  {
    name: "Fabián Morales",
    initials: "FM",
    role: "Central America Recruiter",
    image: fabianMorales,
    linkedin: "https://www.linkedin.com/in/fabianmoralesrecruiting/",
    bio: null,
  },
  {
    name: "Neus Sansaloni",
    initials: "NS",
    role: "Athletics Director",
    image: neusTrack,
    instagram: "https://www.instagram.com/fua_trackandfield/",
    bio: {
      es: [
        "Neus es atleta de élite y actualmente compite en un equipo de primera división, contando con una amplia trayectoria en el atletismo de alto rendimiento.",
        "Su experiencia como deportista de élite, su profundo conocimiento del sector y su compromiso tanto con el deporte base como con el alto rendimiento la convierten en una pieza clave para el desarrollo de nuestra estructura internacional.",
        "Con años de experiencia en la élite del atletismo, Neus aporta visión, credibilidad y una conexión directa con la realidad de los atletas.",
      ],
      en: [
        "Neus is an elite athlete who currently competes on a first-division team, with an extensive track record in high-performance athletics.",
        "Her experience as an elite athlete, her deep knowledge of the sector, and her commitment to both grassroots and high-performance sport make her a key piece in the development of our international structure.",
        "With years of experience at the elite level of athletics, Neus brings vision, credibility, and a direct connection to the reality of athletes.",
      ],
    },
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
    className={`flex items-center justify-center bg-[#ffffff] ${className}`}
    style={{ background: "linear-gradient(135deg, #ffffff 0%, #e5e5e5 50%, #ffffff 100%)" }}
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
      <section className="section-padding" style={{ backgroundColor: "#ffffff" }}>
        <div className="container-wide px-4">
          <div className="text-center mb-10">
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold mb-3">
              {isEs ? "Nuestro " : "Our "}
              <span className="text-primary italic">{isEs ? "Equipo" : "Team"}</span>
            </h2>
            <p className="font-body text-muted-foreground text-base leading-relaxed max-w-xl mx-auto">
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
                className="relative rounded-2xl overflow-hidden h-full aspect-[3/4] group cursor-pointer transition-all duration-500 hover:shadow-[0_0_25px_-5px_hsl(var(--primary)/0.4)] border border-transparent hover:border-primary/40"
              >
                {/* TODO: When photo is available, replace InitialsAvatar with:
                    <img src={member.image} alt={member.name} className="absolute inset-0 w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700" /> */}
                {member.image ? (
                  <img
                    src={member.image}
                    alt={member.name}
                    className="absolute inset-0 w-full h-full object-cover aspect-square group-hover:scale-105 transition-transform duration-700"
                    style={{ objectPosition: "center 15%" }}
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
                  <span className="inline-block font-body text-[10px] sm:text-xs tracking-[0.15em] uppercase font-medium text-primary-foreground bg-primary px-3 py-1 rounded-full mb-3">
                    {member.role}
                  </span>
                  <div className="flex items-start justify-between gap-2">
                    <h3
                      className="font-display text-lg sm:text-xl font-bold text-white leading-tight mb-2"
                      style={{ textShadow: "0 2px 8px rgba(0,0,0,0.7)" }}
                    >
                      {member.name}
                    </h3>
                    <div className="flex items-center gap-1.5">
                      {"instagram" in member && member.instagram && (
                        <a
                          href={member.instagram as string}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-opacity hover:opacity-70"
                          style={{ background: "rgba(255,255,255,0.15)", border: "1px solid rgba(255,255,255,0.25)" }}
                          aria-label="Instagram"
                        >
                          <InstagramIcon className="w-4 h-4 text-white" />
                        </a>
                      )}
                      {"linkedin" in member && member.linkedin && (
                        <a
                          href={member.linkedin as string}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-opacity hover:opacity-70"
                          style={{ background: "rgba(255,255,255,0.15)", border: "1px solid rgba(255,255,255,0.25)" }}
                          aria-label="LinkedIn"
                        >
                          <LinkedInIcon className="w-4 h-4 text-white" />
                        </a>
                      )}
                    </div>
                  </div>
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
                  <span className="inline-block w-fit font-body text-[10px] sm:text-xs tracking-[0.15em] uppercase font-medium text-primary-foreground bg-primary px-3 py-1 rounded-full mb-2">
                    {selected.role}
                  </span>
                  <h2 className="font-display text-2xl sm:text-3xl font-bold text-foreground mb-3">
                    {selected.name}
                  </h2>
                  <div className="flex items-center gap-2 flex-wrap">
                    {"instagram" in selected && selected.instagram && (
                      <a
                        href={selected.instagram as string}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 w-fit font-body text-xs font-semibold px-3 py-1.5 rounded-lg transition-opacity hover:opacity-70"
                        style={{ background: "rgba(18,33,58,0.08)", border: "1px solid rgba(18,33,58,0.14)", color: "#12213a" }}
                      >
                        <InstagramIcon className="w-3.5 h-3.5" />
                        Ver en Instagram
                      </a>
                    )}
                    {"linkedin" in selected && selected.linkedin && (
                      <a
                        href={selected.linkedin as string}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 w-fit font-body text-xs font-semibold px-3 py-1.5 rounded-lg transition-opacity hover:opacity-70"
                        style={{ background: "rgba(18,33,58,0.08)", border: "1px solid rgba(18,33,58,0.14)", color: "#12213a" }}
                      >
                        <LinkedInIcon className="w-3.5 h-3.5" />
                        Ver en LinkedIn
                      </a>
                    )}
                  </div>
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
