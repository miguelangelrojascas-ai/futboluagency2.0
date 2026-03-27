import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import talaveraImg from "@/assets/spain-clubs/talavera.jpg";

const partnerClubs = [
  "CE Sabadell FC",
  "Real Valladolid CF",
  "Real Oviedo",
  "CF Badalona",
  "Fundació Esportiva Grama",
  "CF Fuenlabrada",
];

const SpainAcademiesSection = () => {
  const { language } = useLanguage();

  const content = {
    es: {
      badge: "Programa Principal",
      featuredTitle: "CF Talavera de la Reina · CE Sabadell FC",
      featuredDesc: "Nuestra red base de clubes ofrece una experiencia de desarrollo integral: entrenamiento diario de alto nivel, competición oficial en liga, residencia deportiva y seguimiento personalizado de cada jugador.",
      applyBtn: "Aplicar al programa",
      partnersLabel: "También colaboramos con:",
    },
    en: {
      badge: "Main Program",
      featuredTitle: "CF Talavera de la Reina · CE Sabadell FC",
      featuredDesc: "Our core club network offers a comprehensive development experience: daily high-level training, official league competition, sports residence, and personalized tracking for every player.",
      applyBtn: "Apply to program",
      partnersLabel: "We also collaborate with:",
    },
  };

  const t = content[language];

  return (
    <section className="py-24 relative overflow-hidden" style={{ backgroundColor: "#0f0f0f" }}>
      <div className="container-wide px-4 relative z-10">

        {/* Talavera CF Hero Card */}
        <div className="max-w-[1100px] w-full mx-auto mb-12 sm:mb-16">
          <div className="relative rounded-2xl overflow-hidden border border-border hover:border-primary/50 transition-colors duration-300 ring-1 ring-red-500/30 shadow-[0_0_40px_rgba(220,38,38,0.15)] aspect-[3/4] sm:aspect-[16/7]">
            <img
              src={talaveraImg}
              alt="CF Talavera de la Reina"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.95) 55%, rgba(0,0,0,0.2) 100%)" }} />

            <div className="absolute top-4 left-4 sm:top-6 sm:left-6">
              <span className="inline-block font-body text-[11px] sm:text-xs tracking-[0.15em] uppercase font-medium bg-primary text-primary-foreground px-3 py-1 rounded-full">
                {t.badge}
              </span>
            </div>

            <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-8">
              <h3 className="font-display text-xl sm:text-3xl font-bold text-white mb-2" style={{ textShadow: "0 2px 8px rgba(0,0,0,0.9)" }}>
                {t.featuredTitle}
              </h3>
              <p className="font-body text-white/80 text-sm sm:text-base max-w-xl leading-relaxed mb-5" style={{ textShadow: "0 2px 8px rgba(0,0,0,0.9)" }}>
                {t.featuredDesc}
              </p>
              <a
                href="https://docs.google.com/forms/d/e/1FAIpQLScXOeAxT7cjKKWiEql7DgAqDNdYJGLzASHtO_b_dLnYOKdcVA/viewform"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-body text-sm font-medium text-primary hover:text-primary-foreground hover:bg-primary px-4 py-2 rounded-lg border border-primary/50 hover:border-primary transition-all duration-300"
              >
                {t.applyBtn} <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Partner Clubs — styled pills */}
        <div className="max-w-[1100px] w-full mx-auto mb-12 sm:mb-16">
          <p className="font-body text-muted-foreground text-xs tracking-[0.15em] uppercase text-center mb-5">
            {t.partnersLabel}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5">
            {partnerClubs.map((club) => (
              <span
                key={club}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#1a1a1a] border border-primary/20 text-sm font-body text-foreground/80 whitespace-nowrap"
              >
                {club}
              </span>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default SpainAcademiesSection;
