import { useState } from "react";
import { ArrowRight, X, Play } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import anderMeet from "@/assets/ander-meet.png";
import anderGfi from "@/assets/ander-gfi.png";
import anderCareer from "@/assets/ander-career.jpg";
import anderCommitted from "@/assets/ander-committed.jpg";

const AnderStoryCard = () => {
  const { language } = useLanguage();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const isEs = language === "es";

  const timeline = [
    {
      year: "2024",
      title: isEs ? "Identificado en GFI Academy" : "Identified at GFI Academy",
      desc: isEs
        ? "Nuestros scouts reconocieron su talento y potencial para competir al más alto nivel."
        : "Our scouts recognized his talent and potential to compete at the highest level.",
      image: anderGfi,
    },
    {
      year: "2025",
      title: isEs ? "Debut en CF Fuenlabrada" : "CF Fuenlabrada debut",
      desc: isEs
        ? "Se unió al programa Boarding School y debutó con el primer equipo profesional."
        : "Joined the Boarding School program and debuted with the professional first team.",
      image: anderCareer,
    },
    {
      year: "2026",
      title: isEs ? "Beca NCAA D1 — St. John's" : "NCAA D1 — St. John's",
      desc: isEs
        ? "Consiguió una beca completa en St. John's University (NCAA D1)."
        : "Earned a full scholarship to St. John's University (NCAA D1).",
      image: anderCommitted,
    },
  ];

  return (
    <>
      {/* Card */}
      <section className="section-padding bg-background">
        <div className="container-wide px-4">
          <div
            onClick={() => setIsModalOpen(true)}
            className="relative rounded-2xl overflow-hidden cursor-pointer group h-[320px] sm:h-[380px] md:h-[420px]"
          >
            <img
              src={anderMeet}
              alt="Ander González"
              className="absolute inset-0 w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/50 to-transparent" />
            <div className="relative z-10 h-full flex flex-col justify-end p-6 sm:p-8 md:p-10 max-w-lg">
              <span className="font-body text-xs tracking-[0.15em] uppercase text-muted-foreground mb-2">
                {isEs ? "De México a una beca NCAA D1" : "From Mexico to an NCAA D1 scholarship"}
              </span>
              <h3 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-2">
                Ander González
              </h3>
              <p className="font-body text-sm sm:text-base text-primary font-semibold mb-4">
                St. John's University — NCAA Division 1
              </p>
              <span className="inline-flex items-center gap-2 font-body text-sm text-white/80 group-hover:text-white transition-colors">
                {isEs ? "Ver su historia" : "See his story"} <ArrowRight className="w-4 h-4" />
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 bg-background overflow-y-auto"
        >
          {/* Close button */}
          <button
            onClick={() => setIsModalOpen(false)}
            className="fixed top-4 right-4 z-50 w-10 h-10 rounded-full bg-card border border-border flex items-center justify-center text-foreground hover:bg-muted transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="max-w-4xl mx-auto px-4 py-16 sm:py-20">
            {/* Header */}
            <div className="text-center mb-12 sm:mb-16">
              <span className="text-primary font-body text-xs sm:text-sm tracking-[0.2em] uppercase mb-3 sm:mb-4 block">
                {isEs ? "⭐ Historia de Éxito" : "⭐ Success Story"}
              </span>
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
                {isEs ? "El Camino de " : "The Journey of "}
                <span className="text-primary italic">Ander González</span>
              </h2>
              <p className="font-body text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto">
                {isEs
                  ? "De México a España, y de España a una beca NCAA Division 1 en St. John's University."
                  : "From Mexico to Spain, and from Spain to an NCAA Division 1 scholarship at St. John's University."}
              </p>
            </div>

            {/* Hero Image */}
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
              <h3 className="font-display text-lg sm:text-xl font-semibold text-foreground text-center mb-6">
                🎬 {isEs ? "Mira su historia" : "Watch his story"}
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

                {timeline.map((item, index) => (
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
                      <h3 className="font-display text-lg sm:text-xl font-semibold text-foreground mt-1 mb-2">
                        {item.title}
                      </h3>
                      <p className="font-body text-muted-foreground text-sm sm:text-base leading-relaxed">
                        {item.desc}
                      </p>
                    </div>

                    {/* Image */}
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
                "{isEs
                  ? "El trabajo duro y el entorno adecuado pueden transformar tu carrera."
                  : "Hard work and the right environment can transform your career."}"
              </blockquote>
              <p className="font-body text-primary font-semibold mt-3">— Ander González Vergara</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AnderStoryCard;
