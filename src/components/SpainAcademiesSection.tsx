import { MapPin, Trophy, Star, Crown } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import valladolidImg from "@/assets/spain-clubs/valladolid.jpg";
import oviedoImg from "@/assets/spain-clubs/oviedo.jpg";
import badalonaImg from "@/assets/spain-clubs/badalona.jpg";
import gramaImg from "@/assets/spain-clubs/grama.jpg";
import sabadellImg from "@/assets/spain-clubs/sabadell.jpg";
import fuenlabradaImg from "@/assets/spain-clubs/fuenlabrada.jpg";

const clubs = [
  {
    name: "Real Valladolid CF",
    img: valladolidImg,
    desc: {
      es: "Club profesional con presencia en LaLiga y Segunda División. Formación en un entorno de alto nivel con exposición real al fútbol competitivo.",
      en: "Professional club with presence in LaLiga and Segunda División. Training in a high-level environment with real exposure to competitive football.",
    },
  },
  {
    name: "Real Oviedo",
    img: oviedoImg,
    desc: {
      es: "Histórico club español con gran tradición. Desarrollo en un entorno competitivo con enfoque en progresión y oportunidades reales.",
      en: "Historic Spanish club with great tradition. Development in a competitive environment focused on progression and real opportunities.",
    },
  },
  {
    name: "CF Badalona",
    img: badalonaImg,
    desc: {
      es: "Club catalán enfocado en el desarrollo de talento. Entorno ideal para crecer competitivamente dentro del sistema español.",
      en: "Catalan club focused on talent development. Ideal environment to grow competitively within the Spanish system.",
    },
  },
  {
    name: "Fundació Esportiva Grama",
    img: gramaImg,
    desc: {
      es: "Academia reconocida por su formación técnica. Perfecto para jugadores que buscan evolución constante y minutos de juego.",
      en: "Academy recognized for its technical training. Perfect for players seeking constant evolution and playing time.",
    },
  },
  {
    name: "CE Sabadell FC",
    img: sabadellImg,
    desc: {
      es: "Club histórico con experiencia en categorías profesionales. Ambiente competitivo con enfoque en rendimiento y proyección.",
      en: "Historic club with experience in professional categories. Competitive environment focused on performance and projection.",
    },
  },
  {
    name: "CF Fuenlabrada",
    img: fuenlabradaImg,
    desc: {
      es: "Club de Madrid con experiencia reciente en Segunda División. Alta exposición y nivel competitivo en una de las zonas más fuertes de España.",
      en: "Madrid-based club with recent experience in Segunda División. High exposure and competitive level in one of Spain's strongest areas.",
    },
  },
];

const SpainAcademiesSection = () => {
  const { language } = useLanguage();

  const content = {
    es: {
      tag: "Oportunidad Internacional",
      headline: "Juega en las Mejores Academias de Fútbol",
      headlineHighlight: "en España",
      description: "España es uno de los mejores entornos del mundo para desarrollarte como futbolista. Nuestro programa ofrece a jugadores internacionales la oportunidad de entrenar, competir y crecer en academias de alto nivel durante toda la temporada.",
      placement: "Los jugadores son ubicados en clubes según su nivel, edad y rendimiento, asegurando la mejor experiencia de desarrollo posible.",
      featuredTitle: "Programa Destacado",
      featuredClub: "Talavera CF",
      featuredDesc: "Nuestro programa principal en Talavera CF ofrece una experiencia de desarrollo integral: entrenamiento diario de alto nivel, competición oficial en liga, residencia deportiva y seguimiento personalizado de cada jugador. Club competitivo en el fútbol semiprofesional español. Buena plataforma para ganar minutos y desarrollarse en Europa.",
      clubsTitle: "También colaboramos con otros clubes de alto nivel:",
      moreClubs: "Y muchas otras academias según el nivel y disponibilidad del jugador.",
      cta: "Comienza Tu Camino",
    },
    en: {
      tag: "International Opportunity",
      headline: "Play in Top Football Academies",
      headlineHighlight: "in Spain",
      description: "Spain is one of the best environments in the world to develop as a football player. Our program gives international players the opportunity to train, compete, and grow in high-level football academies throughout the full season.",
      placement: "Players are placed in clubs based on their level, age, and performance, ensuring the best possible development experience.",
      featuredTitle: "Featured Program",
      featuredClub: "Talavera CF",
      featuredDesc: "Our flagship program at Talavera CF offers a comprehensive development experience: daily high-level training, official league competition, sports residence, and personalized tracking for every player. A competitive club in Spanish semi-professional football — a great platform to earn minutes and develop in Europe.",
      clubsTitle: "We also collaborate with other top-level clubs:",
      moreClubs: "And many other academies depending on the player's level and availability.",
      cta: "Start Your Journey",
    },
  };

  const t = content[language];

  return (
    <section className="section-padding bg-background relative overflow-hidden">
      {/* Subtle background accent */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent" />
      
      <div className="container-wide px-4 relative z-10">
        {/* Header */}
        <div className="max-w-4xl mx-auto text-center mb-10 sm:mb-16">
          <span className="text-[hsl(210,100%,50%)] font-body text-xs sm:text-sm tracking-[0.2em] uppercase mb-3 sm:mb-4 block">
            <MapPin className="inline w-4 h-4 mr-1 -mt-0.5" />
            {t.tag}
          </span>
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-6 px-2">
            {t.headline}{" "}
            <span className="text-primary italic">{t.headlineHighlight}</span>
          </h2>
          <p className="font-body text-muted-foreground text-base sm:text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
            {t.description}
          </p>
        </div>

        {/* Placement info */}
        <div className="max-w-3xl mx-auto mb-10 sm:mb-14">
          <div className="bg-card/50 border border-border rounded-xl p-6 sm:p-8 backdrop-blur-sm">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-primary/20 border border-primary/40 flex items-center justify-center flex-shrink-0">
                <Star className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
              </div>
              <p className="font-body text-muted-foreground text-sm sm:text-base leading-relaxed">
                {t.placement}
              </p>
            </div>
          </div>
        </div>

        {/* Featured: Talavera CF */}
        <div className="max-w-3xl mx-auto mb-10 sm:mb-14">
          <div className="bg-gradient-to-br from-primary/10 via-card to-card border-2 border-primary/40 rounded-2xl p-6 sm:p-10 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-40 h-40 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-primary/20 border border-primary/50 flex items-center justify-center">
                  <Crown className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                </div>
                <div>
                  <span className="text-primary font-body text-xs tracking-[0.15em] uppercase block">{t.featuredTitle}</span>
                  <h3 className="font-display text-2xl sm:text-3xl font-bold text-foreground">{t.featuredClub}</h3>
                </div>
              </div>
              <p className="font-body text-muted-foreground text-sm sm:text-base leading-relaxed">
                {t.featuredDesc}
              </p>
            </div>
          </div>
        </div>

        {/* Clubs Grid */}
        <div className="max-w-6xl mx-auto mb-8">
          <p className="font-body text-muted-foreground text-xs sm:text-sm font-medium text-center mb-6">
            {t.clubsTitle}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {clubs.map((club, index) => (
              <div
                key={index}
                className="relative rounded-xl overflow-hidden group cursor-pointer border border-border hover:border-primary/40 transition-all duration-300 h-56 sm:h-64"
              >
                <img
                  src={club.img}
                  alt={club.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {/* Default overlay with name */}
                <div className="absolute inset-0 bg-background/50 group-hover:bg-background/80 transition-all duration-300" />
                <div className="absolute inset-0 flex flex-col items-center justify-center p-5 transition-all duration-300">
                  <h3 className="font-display text-lg sm:text-xl md:text-2xl font-bold text-foreground text-center uppercase tracking-wide drop-shadow-lg">
                    {club.name}
                  </h3>
                  {/* Description - hidden by default, shown on hover */}
                  <p className="font-body text-muted-foreground text-sm leading-relaxed text-center mt-3 max-h-0 opacity-0 group-hover:max-h-40 group-hover:opacity-100 transition-all duration-500 overflow-hidden">
                    {club.desc[language]}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <p className="font-body text-muted-foreground text-xs text-center mt-4 italic">
            {t.moreClubs}
          </p>
        </div>

        {/* CTA - links to Google Form */}
        <div className="text-center mt-10 sm:mt-14">
          <a
            href="https://forms.gle/Qy9vdJ5jZtyKPVKf6"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 whitespace-normal text-center flex-col gap-1 rounded-xl bg-primary text-primary-foreground hover:bg-primary-hover shadow-xl hover:shadow-glow transform hover:scale-[1.02] font-bold tracking-wide transition-all duration-300 min-h-[70px] sm:min-h-[80px] px-8 sm:px-16 py-5"
          >
            <span className="text-base sm:text-lg md:text-xl font-bold uppercase tracking-wider">
              {t.cta}
            </span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default SpainAcademiesSection;
