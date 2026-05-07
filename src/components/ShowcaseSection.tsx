import { useEffect, useState } from "react";
import { Calendar, MapPin, Clock, Users, Ticket, ArrowRight } from "lucide-react";

const EVENT_DATE = new Date("2026-06-16T10:00:00+02:00").getTime();

const calc = () => {
  const diff = EVENT_DATE - Date.now();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0 };
  return {
    days: Math.floor(diff / 86400000),
    hours: Math.floor((diff % 86400000) / 3600000),
    minutes: Math.floor((diff % 3600000) / 60000),
  };
};

const openCalendly = () => {
  const w = window as any;
  if (w.Calendly) {
    w.Calendly.initPopupWidget({
      url: "https://calendly.com/miguelangelrojascas/new-meeting",
    });
  }
};

const RED = "#b00717";
const NAVY = "#12213a";

const ShowcaseSection = () => {
  const [t, setT] = useState(calc());
  useEffect(() => {
    const id = setInterval(() => setT(calc()), 60000);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="py-24 md:py-32 px-4 relative overflow-hidden" style={{ backgroundColor: "#fafaf8" }}>
      {/* Decorative soft glow */}
      <div
        aria-hidden
        className="absolute -top-40 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full opacity-[0.07] blur-3xl pointer-events-none"
        style={{ background: `radial-gradient(circle, ${RED} 0%, transparent 60%)` }}
      />

      <div className="container-wide max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <span
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-bold uppercase tracking-[0.2em] mb-5"
            style={{ borderColor: `${RED}40`, backgroundColor: `${RED}12`, color: RED }}
          >
            <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: RED }} />
            Próximo evento · Noticia
          </span>
          <h2
            className="font-display text-4xl sm:text-5xl md:text-6xl font-bold mb-4 leading-[1.05]"
            style={{ color: NAVY }}
          >
            Becas Deportivas USA
            <span className="block italic mt-2" style={{ color: RED }}>
              Showcase 2026
            </span>
          </h2>
          <p className="font-body text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Tu oportunidad de jugar fútbol y estudiar en las mejores universidades de Estados
            Unidos al más alto nivel. Jugadores de 16 a 23 años.
          </p>
        </div>

        {/* Main card */}
        <div
          className="rounded-2xl border bg-white overflow-hidden ring-1 ring-black/5"
          style={{
            borderColor: "#e5e5e5",
            boxShadow: "0 40px 80px -30px rgba(176,7,23,0.18)",
          }}
        >
          <div className="grid md:grid-cols-2">
            {/* Left: countdown */}
            <div className="p-8 sm:p-10 md:p-12 border-b md:border-b-0 md:border-r" style={{ borderColor: "#eaeaea" }}>
              <p className="font-body text-xs uppercase tracking-[0.25em] text-muted-foreground mb-6">
                Faltan
              </p>
              <div className="flex items-baseline gap-4 mb-8">
                {[
                  { v: t.days, l: "días" },
                  { v: t.hours, l: "horas" },
                  { v: t.minutes, l: "min" },
                ].map((it) => (
                  <div key={it.l} className="flex flex-col">
                    <span
                      className="font-display font-bold tabular-nums leading-none"
                      style={{
                        fontSize: "clamp(48px, 8vw, 88px)",
                        color: NAVY,
                      }}
                    >
                      {it.v.toString().padStart(2, "0")}
                    </span>
                    <span className="font-body text-xs sm:text-sm uppercase tracking-widest text-muted-foreground mt-2">
                      {it.l}
                    </span>
                  </div>
                ))}
              </div>

              <div className="space-y-3 font-body text-sm sm:text-base" style={{ color: NAVY }}>
                <div className="flex items-center gap-3">
                  <Calendar className="w-4 h-4 shrink-0" style={{ color: RED }} />
                  <span>16 de Junio de 2026</span>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="w-4 h-4 shrink-0" style={{ color: RED }} />
                  <span>10:00 — 15:00</span>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 shrink-0 mt-0.5" style={{ color: RED }} />
                  <span>Ciudad Deportiva de Ébora Formación · Talavera de la Reina</span>
                </div>
                <div className="flex items-center gap-3">
                  <Users className="w-4 h-4 shrink-0" style={{ color: RED }} />
                  <span>Jugadores de 16 a 23 años</span>
                </div>
                <div className="flex items-center gap-3">
                  <Ticket className="w-4 h-4 shrink-0" style={{ color: RED }} />
                  <span>Entrada gratuita</span>
                </div>
              </div>
            </div>

            {/* Right: divisions + CTA */}
            <div className="p-8 sm:p-10 md:p-12 flex flex-col justify-between">
              <div>
                <p className="font-body text-xs uppercase tracking-[0.25em] text-muted-foreground mb-4">
                  Visualizado por divisiones
                </p>
                <div className="flex flex-wrap gap-2 mb-8">
                  {["NCAA", "NAIA", "JUCO"].map((d) => (
                    <span
                      key={d}
                      className="px-4 py-2 rounded-lg border bg-white font-display font-bold text-sm tracking-wider"
                      style={{ borderColor: "#e5e5e5", color: NAVY }}
                    >
                      {d}
                    </span>
                  ))}
                </div>
                <h3
                  className="font-display text-2xl sm:text-3xl font-bold mb-4 leading-tight"
                  style={{ color: NAVY }}
                >
                  Consigue tu beca deportiva
                </h3>
                <p className="font-body text-sm sm:text-base text-muted-foreground leading-relaxed mb-8">
                  Reserva una llamada con nuestro equipo y te guiamos en todo el proceso para
                  asegurar tu plaza en el showcase.
                </p>
              </div>

              <div className="space-y-3">
                <a
                  href="https://forms.gle/fGpZNHmB87sroUAT9"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group w-full inline-flex items-center justify-center gap-2 h-14 px-6 rounded-xl text-white font-body font-bold transition-all hover:scale-[1.02]"
                  style={{
                    background: `linear-gradient(135deg, ${RED} 0%, #7a0510 100%)`,
                    boxShadow: "0 12px 30px -8px rgba(176,7,23,0.4)",
                  }}
                >
                  <span className="flex flex-col items-center leading-tight">
                    <span className="text-base">Aplica al Showcase</span>
                    <span className="text-[11px] font-normal opacity-90">
                      Rellena el formulario
                    </span>
                  </span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </a>
                <a
                  href="tel:+34603331990"
                  className="block text-center font-body text-xs text-muted-foreground hover:text-foreground transition-colors"
                >
                  o llámanos al +34 603 331 990
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ShowcaseSection;
