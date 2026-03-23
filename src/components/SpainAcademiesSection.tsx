import { MapPin, Trophy, Star, Crown } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import valladolidImg from "@/assets/spain-clubs/valladolid.jpg";
import oviedoImg from "@/assets/spain-clubs/oviedo.jpg";
import badalonaImg from "@/assets/spain-clubs/badalona.jpg";
import gramaImg from "@/assets/spain-clubs/grama.jpg";
import sabadellImg from "@/assets/spain-clubs/sabadell.jpg";
import fuenlabradaImg from "@/assets/spain-clubs/fuenlabrada.jpg";

const clubs = [
  { name: "Real Valladolid CF", img: valladolidImg },
  { name: "Real Oviedo", img: oviedoImg },
  { name: "CF Badalona", img: badalonaImg },
  { name: "Fundació Esportiva Grama", img: gramaImg },
  { name: "CE Sabadell FC", img: sabadellImg },
  { name: "CF Fuenlabrada", img: fuenlabradaImg },
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
      featuredDesc: "Nuestro programa principal en Talavera CF ofrece una experiencia de desarrollo integral: entrenamiento diario de alto nivel, competición oficial en liga, residencia deportiva y seguimiento personalizado de cada jugador.",
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
      featuredDesc: "Our flagship program at Talavera CF offers a comprehensive development experience: daily high-level training, official league competition, sports residence, and personalized tracking for every player.",
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
        <div className="max-w-4xl mx-auto mb-8">
          <p className="font-body text-muted-foreground text-xs sm:text-sm font-medium text-center mb-6">
            {t.clubsTitle}
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
            {clubs.map((club, index) => (
              <div
                key={index}
                className="bg-card border border-border rounded-lg p-3 sm:p-4 text-center group hover:border-border transition-all duration-300"
              >
                <div className="flex items-center justify-center gap-2">
                  <Trophy className="w-3 h-3 text-muted-foreground opacity-50" />
                  <span className="font-body text-muted-foreground text-xs sm:text-sm">
                    {club}
                  </span>
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
