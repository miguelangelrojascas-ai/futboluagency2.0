import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import talaveraImg from "@/assets/spain-clubs/talavera.jpg";

const partnerClubs = [
  "Real Valladolid CF",
  "Real Oviedo",
  "CF Badalona",
  "Fundació Esportiva Grama",
  "CE Sabadell FC",
  "CF Fuenlabrada",
];

const SpainAcademiesSection = () => {
  const { language } = useLanguage();

  const content = {
    es: {
      badge: "Programa Principal",
      featuredClub: "Talavera CF",
      featuredDesc: "Nuestro programa principal en Talavera CF ofrece una experiencia de desarrollo integral: entrenamiento diario de alto nivel, competición oficial en liga, residencia deportiva y seguimiento personalizado de cada jugador.",
      applyBtn: "Aplicar al programa",
      partnersLabel: "También colaboramos con:",
      cta: "\n\n",
    },
    en: {
      badge: "Main Program",
      featuredClub: "Talavera CF",
      featuredDesc: "Our flagship program at Talavera CF offers a comprehensive development experience: daily high-level training, official league competition, sports residence, and personalized tracking for every player.",
      applyBtn: "Apply to program",
      partnersLabel: "We also collaborate with:",
      cta: "\n\n",
    },
  };

  const t = content[language];

  return (
    <section className="section-padding relative overflow-hidden" style={{ backgroundColor: "#0f0f0f" }}>
      <div className="container-wide px-4 relative z-10">

        {/* Talavera CF Hero Card */}
        <div className="max-w-[1100px] w-full mx-auto mb-12 sm:mb-16">
          <div className="relative rounded-2xl overflow-hidden border border-border hover:border-primary/50 transition-colors duration-300" style={{ aspectRatio: "16/7" }}>
            {/* Background photo */}
            <img
              src={talaveraImg}
              alt="Talavera CF"
              className="absolute inset-0 w-full h-full object-cover"
            />
            {/* Dark gradient overlay */}
            <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.93) 45%, rgba(0,0,0,0.3) 100%)" }} />

            {/* Top-left badge */}
            <div className="absolute top-4 left-4 sm:top-6 sm:left-6">
              <span className="inline-block font-body text-[11px] sm:text-xs tracking-[0.15em] uppercase font-medium bg-primary text-primary-foreground px-3 py-1 rounded-full">
                {t.badge}
              </span>
            </div>

            {/* Bottom content */}
            <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-8">
              <h3 className="font-display text-2xl sm:text-3xl font-bold text-white mb-2" style={{ textShadow: "0 2px 8px rgba(0,0,0,0.9)" }}>
                {t.featuredClub}
              </h3>
              <p className="font-body text-white/80 text-base max-w-xl leading-relaxed mb-5 line-clamp-2" style={{ textShadow: "0 2px 8px rgba(0,0,0,0.9)" }}>
                {t.featuredDesc}
              </p>
              <a
                href="https://forms.gle/Qy9vdJ5jZtyKPVKf6"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-body text-sm font-medium text-primary hover:text-primary-foreground hover:bg-primary px-4 py-2 rounded-lg border border-primary/50 hover:border-primary transition-all duration-300"
              >
                {t.applyBtn} <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Partner Clubs — minimal pills */}
        <div className="max-w-[1100px] w-full mx-auto mb-12 sm:mb-16">
          <p className="font-body text-muted-foreground text-xs tracking-[0.15em] uppercase text-center mb-5">
            {t.partnersLabel}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5">
            {partnerClubs.map((club) => (
              <span
                key={club}
                className="font-body text-[12px] text-foreground/80 rounded-full px-3.5 py-1.5 whitespace-nowrap"
                style={{ border: "1px solid rgba(255,255,255,0.15)" }}
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
