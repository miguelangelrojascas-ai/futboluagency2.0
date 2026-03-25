import { useLanguage } from "@/contexts/LanguageContext";
import ceoIgnacio from "@/assets/ceo-ignacio.jpg";
import ceoMoha from "@/assets/ceo-moha.jpg";

const TeamSection = () => {
  const { t, language } = useLanguage();

  const founders = [
    {
      name: "Ignacio De Bejar",
      role: "Co-founder y CEO",
      image: ceoIgnacio,
      bio: language === "es" ? [
        "Ignacio vivió en primera persona lo difícil que es conseguir una beca deportiva en Estados Unidos. Tras formarse en el Hércules CF, decidió dar el salto a EE.UU. para continuar su carrera, pero descubrió que la agencia que debía ayudarlo no brindaba el apoyo prometido.",
        "Se encontró solo en un país nuevo, enfrentando rechazos y obstáculos que tuvo que superar por su cuenta mientras buscaba una universidad donde desarrollarse como atleta y estudiante.",
        "Esa experiencia lo motivó a dedicar su carrera a que ningún jugador viva lo mismo. Hoy, Ignacio utiliza su trayectoria y conocimiento del sistema universitario para guiar a futbolistas internacionales y acompañarlos paso a paso en su camino hacia una beca real en EE.UU."
      ] : [
        "Ignacio experienced firsthand how difficult it is to get a sports scholarship in the United States. After training at Hércules CF, he decided to make the leap to the U.S. to continue his career, but discovered that the agency supposed to help him didn't provide the promised support.",
        "He found himself alone in a new country, facing rejections and obstacles he had to overcome on his own while searching for a university to develop as an athlete and student.",
        "That experience motivated him to dedicate his career to ensuring no player goes through the same. Today, Ignacio uses his experience and knowledge of the university system to guide international soccer players step by step on their path to a real scholarship in the U.S."
      ]
    },
    {
      name: "Moha",
      role: "Co-founder y CEO",
      image: ceoMoha,
      bio: language === "es" ? [
        "Cuando Mohammed intentó transferirse a una universidad de mayor nivel, esperaba recibir el apoyo de la agencia que lo representaba. Sin embargo, en el momento más importante del proceso, fue abandonado sin guía ni acompañamiento.",
        "Enfrentó solo un camino lleno de incertidumbre, obstáculos y decisiones críticas que impactaban su futuro deportivo y académico.",
        "Esta experiencia lo llevó a crear una agencia con un propósito claro: ofrecer el apoyo que a él le faltó. Hoy, Moha ha ayudado a decenas de jugadores a conseguir becas y oportunidades reales, asegurándose de que cada uno reciba el acompañamiento cercano, profesional y humano que él nunca tuvo."
      ] : [
        "When Mohammed tried to transfer to a higher-level university, he expected to receive support from the agency representing him. However, at the most important moment of the process, he was abandoned without guidance or support.",
        "He faced alone a path full of uncertainty, obstacles, and critical decisions that impacted his athletic and academic future.",
        "This experience led him to create an agency with a clear purpose: to offer the support he lacked. Today, Moha has helped dozens of players get real scholarships and opportunities, ensuring each one receives the close, professional, and human support he never had."
      ]
    }
  ];

  return (
    <section className="py-16 sm:py-20 md:py-32 bg-background">
      <div className="container-wide px-4">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16 md:mb-24">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-foreground mb-4 px-2">
            {t("team.title")}{" "}
            <span className="text-gradient">{t("team.title.highlight")}</span>
          </h2>
        </div>

        {/* Founders Grid */}
        <div className="space-y-16 sm:space-y-20 md:space-y-32">
          {founders.map((founder, index) => (
            <div
              key={founder.name}
              className={`flex flex-col ${
                index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
              } gap-6 sm:gap-8 lg:gap-16 items-center`}
            >
              {/* Image */}
              <div className="w-full lg:w-2/5 flex justify-center">
                <div className="relative group cursor-pointer">
                  {/* Glow effect */}
                  <div className="absolute -inset-1 bg-gradient-to-b from-[hsl(210,100%,50%)]/50 to-[hsl(210,100%,50%)]/20 rounded-2xl blur-xl opacity-50 transition-all duration-500 group-hover:opacity-80 group-hover:blur-2xl group-hover:from-[hsl(210,100%,50%)]/70" />
                  {/* Border frame */}
                  <div className="relative p-1 bg-gradient-to-b from-[hsl(210,100%,50%)]/60 to-[hsl(210,100%,50%)]/20 rounded-2xl transition-all duration-500 group-hover:from-[hsl(210,100%,50%)]/80 group-hover:to-[hsl(210,100%,50%)]/40">
                    <img
                      src={founder.image}
                      alt={founder.name}
                      className="w-56 h-64 sm:w-72 sm:h-80 md:w-80 md:h-96 object-cover object-top rounded-xl transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="w-full lg:w-3/5 space-y-4 sm:space-y-6 text-center lg:text-left">
                {/* Role Badge */}
                <span className="inline-block px-3 sm:px-4 py-1.5 sm:py-2 bg-primary/20 text-primary text-xs sm:text-sm font-medium rounded-full uppercase tracking-[0.15em]">
                  {founder.role}
                </span>

                {/* Name */}
                <h3 className="text-2xl sm:text-3xl font-display font-bold text-foreground">
                  {founder.name}
                </h3>

                {/* Bio */}
                <div className="space-y-3 sm:space-y-4">
                  {founder.bio.map((paragraph, pIndex) => (
                    <p
                      key={pIndex}
                      className="text-muted-foreground text-sm sm:text-base md:text-lg leading-relaxed"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
