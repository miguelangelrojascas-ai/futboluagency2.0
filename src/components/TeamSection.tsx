import ceoIgnacio from "@/assets/ceo-ignacio.jpg";
import ceoMoha from "@/assets/ceo-moha.jpg";

const founders = [
  {
    name: "Ignacio Pérez",
    role: "Co-founder y CEO",
    image: ceoIgnacio,
    bio: [
      "Ignacio vivió en primera persona lo difícil que es conseguir una beca deportiva en Estados Unidos. Tras formarse en el Hércules CF, decidió dar el salto a EE.UU. para continuar su carrera, pero descubrió que la agencia que debía ayudarlo no brindaba el apoyo prometido.",
      "Se encontró solo en un país nuevo, enfrentando rechazos y obstáculos que tuvo que superar por su cuenta mientras buscaba una universidad donde desarrollarse como atleta y estudiante.",
      "Esa experiencia lo motivó a dedicar su carrera a que ningún jugador viva lo mismo. Hoy, Ignacio utiliza su trayectoria y conocimiento del sistema universitario para guiar a futbolistas internacionales y acompañarlos paso a paso en su camino hacia una beca real en EE.UU."
    ]
  },
  {
    name: "Moha",
    role: "Co-founder y CEO",
    image: ceoMoha,
    bio: [
      "Cuando Mohammed intentó transferirse a una universidad de mayor nivel, esperaba recibir el apoyo de la agencia que lo representaba. Sin embargo, en el momento más importante del proceso, fue abandonado sin guía ni acompañamiento.",
      "Enfrentó solo un camino lleno de incertidumbre, obstáculos y decisiones críticas que impactaban su futuro deportivo y académico.",
      "Esta experiencia lo llevó a crear una agencia con un propósito claro: ofrecer el apoyo que a él le faltó. Hoy, Moha ha ayudado a decenas de jugadores a conseguir becas y oportunidades reales, asegurándose de que cada uno reciba el acompañamiento cercano, profesional y humano que él nunca tuvo."
    ]
  }
];

const TeamSection = () => {
  return (
    <section className="py-20 md:py-32 bg-background">
      <div className="container-wide">
        {/* Section Header */}
        <div className="text-center mb-16 md:mb-24">
          <h2 className="text-3xl md:text-5xl font-display font-bold text-foreground mb-4">
            Más que una Agencia,{" "}
            <span className="text-gradient">Somos tu Equipo</span>
          </h2>
        </div>

        {/* Founders Grid */}
        <div className="space-y-20 md:space-y-32">
          {founders.map((founder, index) => (
            <div
              key={founder.name}
              className={`flex flex-col ${
                index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
              } gap-8 lg:gap-16 items-center`}
            >
              {/* Image */}
              <div className="w-full lg:w-2/5 flex justify-center">
                <div className="relative">
                  {/* Glow effect */}
                  <div className="absolute -inset-1 bg-gradient-to-b from-primary/50 to-primary/20 rounded-2xl blur-xl opacity-50" />
                  {/* Border frame */}
                  <div className="relative p-1 bg-gradient-to-b from-primary/60 to-primary/20 rounded-2xl">
                    <img
                      src={founder.image}
                      alt={founder.name}
                      className="w-72 h-80 md:w-80 md:h-96 object-cover object-top rounded-xl"
                    />
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="w-full lg:w-3/5 space-y-6">
                {/* Role Badge */}
                <span className="inline-block px-4 py-2 bg-primary/20 text-primary text-sm font-semibold rounded-full uppercase tracking-wider">
                  {founder.role}
                </span>

                {/* Name */}
                <h3 className="text-3xl md:text-4xl font-display font-bold text-foreground">
                  {founder.name}
                </h3>

                {/* Bio */}
                <div className="space-y-4">
                  {founder.bio.map((paragraph, pIndex) => (
                    <p
                      key={pIndex}
                      className="text-muted-foreground text-base md:text-lg leading-relaxed"
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
