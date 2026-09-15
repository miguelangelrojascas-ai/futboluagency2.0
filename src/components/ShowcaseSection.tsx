import { useEffect, useState } from "react";
import { Calendar, MapPin, Clock, Users, Ticket, ArrowRight } from "lucide-react";

const EVENT_DATE = new Date("2026-06-16T10:00:00+02:00").getTime();

const calc = () => {
  const diff = EVENT_DATE - Date.now();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  return {
    days: Math.floor(diff / 86400000),
    hours: Math.floor((diff % 86400000) / 3600000),
    minutes: Math.floor((diff % 3600000) / 60000),
    seconds: Math.floor((diff % 60000) / 1000),
  };
};

const RED = "#b00717";
const NAVY = "#12213a";

const ShowcaseSection = () => {
  const [t, setT] = useState(calc());
  useEffect(() => {
    const id = setInterval(() => setT(calc()), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="py-10 md:py-14 px-4 relative overflow-hidden">
      {/* Background video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        aria-hidden
        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        style={{ zIndex: 0 }}
      >
        <source src="/videos/campo-showcase.mp4" type="video/mp4" />
      </video>
      {/* Dark overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "linear-gradient(135deg, rgba(18,33,58,0.82) 0%, rgba(18,33,58,0.65) 100%)", zIndex: 1 }}
      />

      <div className="container-wide max-w-6xl mx-auto relative" style={{ zIndex: 2 }}>
        {/* Header */}
        <div className="text-center mb-6">
          <span
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-bold uppercase tracking-[0.2em] mb-5"
            style={{ borderColor: `${RED}80`, backgroundColor: `${RED}30`, color: "#ff6b7a" }}
          >
            <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: RED }} />
            Próximo evento · Noticia
          </span>
          <h2
            className="font-display text-4xl sm:text-5xl md:text-6xl font-bold mb-4 leading-[1.05]"
            style={{ color: "#ffffff" }}
          >
            Becas Deportivas USA
            <span className="block italic mt-2" style={{ color: RED }}>
              Showcase 2026
            </span>
          </h2>
          <p className="font-body text-base sm:text-lg max-w-2xl mx-auto leading-relaxed" style={{ color: "rgba(255,255,255,0.75)" }}>
            Tu oportunidad de jugar fútbol y estudiar en las mejores universidades de Estados
            Unidos al más alto nivel. Jugadores de 16 a 23 años.
          </p>
        </div>

        {/* Main card */}
        <div className="relative">
          {/* Glow depth effect */}
          <div className="absolute -inset-4 rounded-3xl blur-2xl opacity-60" style={{ background: `${RED}30` }} />
          <div
            className="relative rounded-2xl border-2 bg-white overflow-hidden"
            style={{
              borderColor: `${RED}35`,
              boxShadow: `0 25px 60px -15px ${RED}35, 0 0 0 1px ${RED}10`,
            }}
          >
          <div className="grid md:grid-cols-2">
            {/* Left: countdown */}
            <div className="relative p-6 sm:p-8 md:p-10 border-b md:border-b-0 md:border-r flex flex-col justify-between gap-6 min-w-0 overflow-hidden" style={{ borderColor: "rgba(255,255,255,0.15)", backgroundColor: NAVY }}>
              {/* Video background */}
              <video
                autoPlay muted loop playsInline aria-hidden
                className="absolute inset-0 w-full h-full object-cover pointer-events-none"
                style={{ zIndex: 0 }}
              >
                <source src="/videos/campo-showcase.mp4" type="video/mp4" />
              </video>
              {/* Overlay */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{ background: NAVY, zIndex: 1 }}
              />
              {/* Content wrapper above video */}
              <div className="relative flex flex-col justify-between gap-6 h-full" style={{ zIndex: 2 }}>
              <div>
                <p className="font-body text-sm uppercase tracking-[0.25em] mb-4" style={{ color: "rgba(255,255,255,0.55)" }}>
                  Faltan
                </p>
                <div className="flex items-center gap-2 sm:gap-3">
                  {[
                    { v: t.days, l: "días" },
                    { v: t.hours, l: "horas" },
                    { v: t.minutes, l: "min" },
                    { v: t.seconds, l: "seg" },
                  ].map((it, i, arr) => (
                    <div key={it.l} className="flex items-center gap-2 sm:gap-3">
                      <div className="flex flex-col items-center">
                        <span
                          className="font-display font-bold tabular-nums leading-none"
                          style={{ fontSize: "clamp(32px, 4.5vw, 64px)", color: "#ffffff" }}
                        >
                          {it.v.toString().padStart(2, "0")}
                        </span>
                        <span className="font-body text-xs sm:text-sm uppercase tracking-widest mt-2" style={{ color: "rgba(255,255,255,0.5)" }}>
                          {it.l}
                        </span>
                      </div>
                      {i < arr.length - 1 && (
                        <span
                          className="font-display font-bold self-start pt-1"
                          style={{ fontSize: "clamp(24px, 3.5vw, 52px)", color: RED, lineHeight: 1 }}
                        >
                          :
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-3 font-body text-sm sm:text-base" style={{ color: "rgba(255,255,255,0.9)" }}>
                <div className="flex items-center gap-4">
                  <Calendar className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" style={{ color: RED }} />
                  <span>16 de Junio de 2026</span>
                </div>
                <div className="flex items-center gap-4">
                  <Clock className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" style={{ color: RED }} />
                  <span>10:00 — 15:00</span>
                </div>
                <div className="flex items-start gap-4">
                  <MapPin className="w-4 h-4 sm:w-5 sm:h-5 shrink-0 mt-0.5" style={{ color: RED }} />
                  <span>Ciudad Deportiva de Ébora Formación · Talavera de la Reina</span>
                </div>
                <div className="flex items-center gap-4">
                  <Users className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" style={{ color: RED }} />
                  <span>Jugadores de 16 a 23 años</span>
                </div>
                <div className="flex items-center gap-4">
                  <Ticket className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" style={{ color: RED }} />
                  <span>Entrada gratuita</span>
                </div>
              </div>

              <div className="space-y-3 pt-2">
                <a
                  href="https://forms.gle/C9ZSoJGytSFDv63GA"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group w-full inline-flex items-center justify-center gap-2 h-14 px-6 rounded-xl text-white font-body font-bold transition-all hover:scale-[1.02]"
                  style={{
                    background: `linear-gradient(135deg, ${RED} 0%, #7a0510 100%)`,
                    boxShadow: "0 12px 30px -8px rgba(176,7,23,0.5)",
                  }}
                >
                  <span className="flex flex-col items-center leading-tight">
                    <span className="text-base">Aplica al Showcase</span>
                    <span className="text-[11px] font-normal opacity-90">Rellena el formulario</span>
                  </span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </a>
                <a
                  href="tel:+34603331990"
                  className="block text-center font-body text-xs transition-colors" style={{ color: "rgba(255,255,255,0.45)" }}
                >
                  o llámanos al +34 603 331 990
                </a>
              </div>
              </div>{/* end content wrapper */}
            </div>

            {/* Right: showcase poster */}
            <div className="flex items-stretch">
              <img
                src="/showcase-poster.jpg"
                alt="Showcase Becas Deportivas USA 2026"
                className="w-full object-contain rounded-b-2xl md:rounded-bl-none md:rounded-r-2xl"
              />
            </div>
          </div>
          </div>
        </div>
      </div>

      {/* Bottom fade into next section */}
      <div
        aria-hidden
        className="absolute bottom-0 left-0 right-0 h-28 pointer-events-none"
        style={{ background: "linear-gradient(to bottom, transparent, rgba(0,0,0,0.85))", zIndex: 3 }}
      />
    </section>
  );
};

export default ShowcaseSection;
