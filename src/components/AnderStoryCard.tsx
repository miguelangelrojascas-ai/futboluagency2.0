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
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className="relative bg-card border border-border rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center text-foreground hover:bg-background transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="p-6 sm:p-8">
              {/* Header */}
              <span className="font-body text-xs tracking-[0.15em] uppercase text-primary mb-2 block">
                {isEs ? "Historia de Éxito" : "Success Story"}
              </span>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-foreground mb-1">
                {isEs ? "El camino de " : "The journey of "}
                <span className="text-primary italic">Ander González</span>
              </h2>
              <p className="font-body text-muted-foreground text-sm sm:text-base mb-6">
                {isEs
                  ? "De México a España, y de España a una beca NCAA Division 1 en St. John's University."
                  : "From Mexico to Spain, and from Spain to an NCAA Division 1 scholarship at St. John's University."}
              </p>

              {/* Video */}
              <div className="rounded-xl overflow-hidden border border-border mb-8">
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

              {/* Timeline */}
              <div className="space-y-6 mb-8">
                {timeline.map((item, i) => (
                  <div key={i} className="flex gap-4 items-start">
                    <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-primary/15 border border-primary/30 flex items-center justify-center">
                      <span className="font-display font-bold text-primary text-sm">{item.year}</span>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-display text-base font-bold text-foreground mb-1">{item.title}</h4>
                      <p className="font-body text-muted-foreground text-sm">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Quote */}
              <div className="border-t border-border pt-6 text-center">
                <blockquote className="font-display text-lg sm:text-xl italic text-foreground/80">
                  "{isEs
                    ? "El trabajo duro y el entorno adecuado pueden transformar tu carrera."
                    : "Hard work and the right environment can transform your career."}"
                </blockquote>
                <p className="font-body text-primary font-semibold mt-2 text-sm">— Ander González Vergara</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AnderStoryCard;
