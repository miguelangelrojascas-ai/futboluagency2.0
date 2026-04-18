import { useLanguage } from "@/contexts/LanguageContext";
import anderMeet from "@/assets/ander-meet.png";
import anderGfi from "@/assets/ander-gfi.png";
import anderCareer from "@/assets/ander-career.jpg";
import anderCommitted from "@/assets/ander-committed.jpg";

const PlayerSuccessStorySection = () => {
  const { language } = useLanguage();

  const content = {
    es: {
      tag: "Historia de Éxito",
      headline: "El Camino de",
      headlineHighlight: "Ander González",
      subtitle: "De México a España, y de España a una beca NCAA Division 1 en St. John's University.",
      videoTitle: "Mira su historia",
      timeline: [
        {
          year: "2024",
          title: "Identificado por GFI Academy",
          description: "Nuestros scouts identificaron a Ander en GFI Academy, reconociendo su talento y potencial para competir al más alto nivel.",
          image: anderGfi,
        },
        {
          year: "2025",
          title: "Boarding School & Debut Profesional",
          description: "Se unió al programa Boarding School de CF Fuenlabrada y debutó con el primer equipo profesional.",
          image: anderCareer,
        },
        {
          year: "2026",
          title: "Beca NCAA D1 — St. John's University",
          description: "Tras una temporada destacada, consiguió una beca completa en St. John's University (NCAA D1), con ofertas también de UCLA, Gardner-Webb, Northwestern y Cleveland University.",
          image: anderCommitted,
        },
      ],
      quote: "El trabajo duro y el entorno adecuado pueden transformar tu carrera.",
    },
    en: {
      tag: "Player Success Story",
      headline: "The Journey of",
      headlineHighlight: "Ander González",
      subtitle: "From Mexico to Spain, and from Spain to an NCAA Division 1 scholarship at St. John's University.",
      videoTitle: "Watch his story",
      timeline: [
        {
          year: "2024",
          title: "Identified at GFI Academy",
          description: "Our scouts identified Ander at GFI Academy, recognizing his talent and potential to compete at the highest level.",
          image: anderGfi,
        },
        {
          year: "2025",
          title: "Boarding School & Professional Debut",
          description: "Joined CF Fuenlabrada's Boarding School program and debuted with the professional first team.",
          image: anderCareer,
        },
        {
          year: "2026",
          title: "NCAA D1 Scholarship — St. John's University",
          description: "After an outstanding season, earned a full scholarship to St. John's University (NCAA D1), with additional offers from UCLA, Gardner-Webb, Northwestern, and Cleveland University.",
          image: anderCommitted,
        },
      ],
      quote: "Hard work and the right environment can transform your career.",
    },
  };

  const t = content[language];

  return (
    <section className="section-padding relative overflow-hidden" style={{ backgroundColor: "#ffffff" }}>
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl" />

      <div className="container-wide px-4 relative z-10">
        {/* Header */}
        <div className="max-w-4xl mx-auto text-center mb-12 sm:mb-16">
          <span className="text-primary font-body text-xs sm:text-sm tracking-[0.15em] uppercase mb-3 sm:mb-4 block">
            ⭐ {t.tag}
          </span>
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold mb-4 px-2">
            {t.headline}{" "}
            <span className="text-primary italic">{t.headlineHighlight}</span>
          </h2>
          <p className="font-body text-muted-foreground text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
            {t.subtitle}
          </p>
        </div>

        {/* Hero Image - full photo visible */}
        <div className="max-w-md mx-auto mb-12 sm:mb-16">
          <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-border">
            <img
              src={anderMeet}
              alt="Ander González"
              className="w-full h-auto object-contain"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/40 via-transparent to-transparent" />
          </div>
        </div>

        {/* Video */}
        <div className="max-w-3xl mx-auto mb-12 sm:mb-16">
          <h3 className="font-display text-lg sm:text-xl font-bold text-foreground text-center mb-6">
            🎬 {t.videoTitle}
          </h3>
          <div className="rounded-2xl overflow-hidden border border-border shadow-2xl">
            <video
              controls
              playsInline
              preload="metadata"
              className="w-full h-auto"
              poster={anderMeet}
            >
              <source src="/videos/ander-highlights.mp4" type="video/mp4" />
            </video>
          </div>
        </div>

        {/* Timeline */}
        <div className="max-w-5xl mx-auto">
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-4 sm:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary/60 via-primary/30 to-transparent sm:-translate-x-px" />

            {t.timeline.map((item, index) => (
              <div
                key={index}
                className={`relative flex flex-col sm:flex-row items-start gap-6 sm:gap-12 mb-12 sm:mb-16 last:mb-0 ${
                  index % 2 === 0 ? "sm:flex-row" : "sm:flex-row-reverse"
                }`}
              >
                {/* Year dot */}
                <div className="absolute left-4 sm:left-1/2 w-8 h-8 -translate-x-1/2 bg-primary rounded-full flex items-center justify-center z-10 shadow-lg shadow-primary/30">
                  <span className="text-primary-foreground text-[10px] font-bold">{item.year.slice(-2)}</span>
                </div>

                {/* Content */}
                <div className={`pl-16 sm:pl-0 sm:w-1/2 ${index % 2 === 0 ? "sm:pr-16 sm:text-right" : "sm:pl-16"}`}>
                  <span className="text-primary font-display text-2xl sm:text-3xl font-bold">{item.year}</span>
                  <h3 className="font-display text-lg sm:text-xl font-bold text-foreground mt-1 mb-2">
                    {item.title}
                  </h3>
                  <p className="font-body text-muted-foreground text-base leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {/* Image - full photo visible */}
                <div className={`pl-16 sm:pl-0 sm:w-1/2 ${index % 2 === 0 ? "sm:pl-16" : "sm:pr-16"}`}>
                  <div className="rounded-xl overflow-hidden border border-border shadow-lg">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-auto object-contain"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quote */}
        <div className="max-w-2xl mx-auto mt-12 sm:mt-16 text-center">
          <blockquote className="font-display text-xl sm:text-2xl italic text-foreground/80">
            "{t.quote}"
          </blockquote>
          <p className="font-body text-primary font-medium mt-3">— Ander González Vergara</p>
        </div>
      </div>
    </section>
  );
};

export default PlayerSuccessStorySection;
