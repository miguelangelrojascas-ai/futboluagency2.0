import { MapPin, Trophy, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

interface SpainAcademiesSectionProps {
  onOpenForm: () => void;
}

const clubs = [
  "Real Valladolid CF",
  "Real Oviedo",
  "CF Badalona",
  "Fundació Esportiva Grama",
  "CE Sabadell FC",
  "CF Fuenlabrada",
];

const SpainAcademiesSection = ({ onOpenForm }: SpainAcademiesSectionProps) => {
  const { language } = useLanguage();

  const content = {
    es: {
      tag: "Oportunidad Internacional",
      headline: "Juega en las Mejores Academias de Fútbol",
      headlineHighlight: "en España",
      description: "España es uno de los mejores entornos del mundo para desarrollarte como futbolista. Nuestro programa ofrece a jugadores internacionales la oportunidad de entrenar, competir y crecer en academias de alto nivel durante toda la temporada.",
      placement: "Los jugadores son ubicados en clubes según su nivel, edad y rendimiento, asegurando la mejor experiencia de desarrollo posible.",
      clubsTitle: "Trabajamos con academias y clubes competitivos en toda España:",
      moreClubs: "Y muchas otras academias según el nivel y disponibilidad del jugador.",
      cta: "Comienza Tu Camino",
    },
    en: {
      tag: "International Opportunity",
      headline: "Play in Top Football Academies",
      headlineHighlight: "in Spain",
      description: "Spain is one of the best environments in the world to develop as a football player. Our program gives international players the opportunity to train, compete, and grow in high-level football academies throughout the full season.",
      placement: "Players are placed in clubs based on their level, age, and performance, ensuring the best possible development experience.",
      clubsTitle: "We work with competitive academies and clubs across Spain:",
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

        {/* Clubs Grid */}
        <div className="max-w-4xl mx-auto mb-8">
          <p className="font-body text-foreground text-sm sm:text-base font-medium text-center mb-6">
            {t.clubsTitle}
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
            {clubs.map((club, index) => (
              <div
                key={index}
                className="bg-card border border-border rounded-lg p-4 sm:p-5 text-center group hover:border-primary/50 transition-all duration-300"
              >
                <div className="flex items-center justify-center gap-2">
                  <Trophy className="w-4 h-4 text-primary opacity-70" />
                  <span className="font-body text-foreground text-xs sm:text-sm font-medium">
                    {club}
                  </span>
                </div>
              </div>
            ))}
          </div>
          <p className="font-body text-muted-foreground text-xs sm:text-sm text-center mt-4 italic">
            {t.moreClubs}
          </p>
        </div>

        {/* CTA */}
        <div className="text-center mt-10 sm:mt-14">
          <Button
            variant="ctaLarge"
            size="ctaXl"
            className="w-full sm:w-auto min-h-[70px] sm:min-h-[80px] px-8 sm:px-16"
            onClick={onOpenForm}
          >
            <span className="text-base sm:text-lg md:text-xl font-bold uppercase tracking-wider">
              {t.cta}
            </span>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default SpainAcademiesSection;
