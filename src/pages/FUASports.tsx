import { useState } from "react";
import { Link } from "react-router-dom";
import { Mail, Calendar, Volleyball, Flag, CircleDot, Zap, ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import fuaSportsLogo from "@/assets/fua-sports-logo.png";
import sportVolleyball from "@/assets/sport-volleyball.png";
import sportGolf from "@/assets/sport-golf.png";
import sportTennis from "@/assets/sport-tennis.png";
import sportTrack from "@/assets/sport-track.png";

const NAVY = "#12213a";
const RED = "#b00717";

const milestones = [
  { year: "2020", text: "Fundación" },
  { year: "2023", text: "350+ becas fútbol" },
  { year: "2024", text: "Expansión multi-deporte" },
  { year: "2025", text: "FUA Sports" },
];

const sports = [
  {
    name: "Volleyball",
    tagline: "Becas NCAA para jugadoras de alto nivel.",
    to: "/sports/volleyball",
    img: sportVolleyball,
    Icon: Volleyball,
  },
  {
    name: "Golf",
    tagline: "De tu club local a la élite universitaria americana.",
    to: "/sports/golf",
    img: sportGolf,
    Icon: Flag,
  },
  {
    name: "Tenis",
    tagline: "Acompañamiento cercano para la beca que mereces.",
    to: "/sports/tennis",
    img: sportTennis,
    Icon: CircleDot,
  },
  {
    name: "Track & Field",
    tagline: "+1,000 programas y $3.5B en becas disponibles.",
    to: "/sports/track",
    img: sportTrack,
    Icon: Zap,
  },
];

const features = [
  {
    title: "Evaluación Gratuita",
    desc: "Analizamos tu perfil deportivo y académico sin compromiso.",
  },
  {
    title: "Red de +40 Universidades",
    desc: "Acceso directo a coaches y programas en todo EE.UU.",
  },
  {
    title: "75–100% de Beca",
    desc: "Todos nuestros atletas obtienen cobertura entre 75% y 100%.",
  },
];

const FUASports = () => {
  const [ctaEmail, setCtaEmail] = useState("");
  const [ctaSubmitted, setCtaSubmitted] = useState(false);

  const handleCtaSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (ctaEmail) {
      setCtaSubmitted(true);
      setTimeout(() => {
        setCtaSubmitted(false);
        setCtaEmail("");
      }, 3000);
    }
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-16 md:pt-20">
        {/* SECTION 1 — Hero */}
        <section
          className="relative min-h-screen flex items-center justify-center px-4"
          style={{ backgroundColor: NAVY }}
        >
          <div className="container-wide max-w-5xl mx-auto text-center py-24">
            <img
              src={fuaSportsLogo}
              alt="FUA Sports"
              className="w-full h-auto mx-auto block"
              style={{
                maxWidth: "480px",
                marginTop: "-40px",
                marginBottom: "-20px",
                filter: "invert(1) brightness(1.1)",
                mixBlendMode: "screen",
              }}
            />
            <h1
              className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight"
              style={{ textShadow: "0 2px 16px rgba(0,0,0,0.5)" }}
            >
              Becas Universitarias para{" "}
              <span style={{ color: RED }}>Todos los Deportes</span>
            </h1>
            <p className="font-body text-base sm:text-lg md:text-xl text-white/75 max-w-3xl mx-auto mb-14 leading-relaxed">
              La misma metodología que llevó a más de 350 atletas a universidades
              en EE.UU., ahora disponible en más disciplinas deportivas.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
              {[
                { value: "350+", label: "Atletas colocados" },
                { value: "$10M+", label: "En becas conseguidas" },
                { value: "4", label: "Deportes disponibles" },
              ].map((s) => (
                <div
                  key={s.label}
                  className="rounded-xl border border-white/10 px-4 py-6"
                  style={{ backgroundColor: "rgba(255,255,255,0.04)" }}
                >
                  <div
                    className="font-display text-3xl sm:text-4xl font-bold mb-2"
                    style={{ color: RED }}
                  >
                    {s.value}
                  </div>
                  <div className="font-body text-xs sm:text-sm text-white/65 uppercase tracking-wider">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div
            className="absolute bottom-0 left-0 right-0 pointer-events-none"
            style={{
              height: "120px",
              background: "linear-gradient(to bottom, transparent, #fafaf8)",
            }}
          />
        </section>

        {/* SECTION 2 — Nuestra Historia */}
        <section className="py-24 md:py-32 px-4" style={{ backgroundColor: "#fafaf8" }}>
          <div className="container-wide max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
              <div>
                <h2
                  className="font-display text-3xl sm:text-4xl md:text-5xl font-bold mb-6"
                  style={{ color: NAVY }}
                >
                  Nuestra Historia
                </h2>
                <p className="font-body text-base sm:text-lg leading-relaxed text-muted-foreground">
                  FUA Sports nació de FutbolU Agency, agencia especializada en
                  becas de fútbol universitario. Con años de experiencia y una
                  red consolidada de universidades en EE.UU., decidimos expandir
                  nuestra metodología a otros deportes para que más atletas
                  puedan vivir el sueño americano.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {milestones.map((m) => (
                  <div
                    key={m.year}
                    className="rounded-xl bg-white px-5 py-6 border-2"
                    style={{ borderColor: NAVY }}
                  >
                    <div
                      className="font-display text-2xl sm:text-3xl font-bold mb-1"
                      style={{ color: RED }}
                    >
                      {m.year}
                    </div>
                    <div
                      className="font-body text-sm sm:text-base font-medium"
                      style={{ color: NAVY }}
                    >
                      {m.text}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3 — Nuestros Deportes */}
        <section className="py-24 md:py-32 px-4 bg-white">
          <div className="container-wide max-w-6xl mx-auto">
            <div className="text-center mb-14">
              <h2
                className="font-display text-3xl sm:text-4xl md:text-5xl font-bold mb-4"
                style={{ color: NAVY }}
              >
                Elige tu Deporte
              </h2>
              <p className="font-body text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
                Programas especializados con la misma metodología ganadora.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {sports.map((s) => {
                const Icon = s.Icon;
                return (
                  <Link
                    key={s.name}
                    to={s.to}
                    className="group relative rounded-2xl overflow-hidden flex flex-col aspect-video transition-all duration-300 ease-out hover:-translate-y-2 hover:scale-[1.05] hover:z-10 border-2 border-transparent hover:shadow-[0_25px_60px_-15px_rgba(176,7,23,0.55)]"
                    style={{ backgroundColor: NAVY }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.borderColor = RED)
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.borderColor = "transparent")
                    }
                  >
                    <img
                      src={s.img}
                      alt={s.name}
                      className="absolute inset-0 w-full h-full object-cover opacity-75 transition-transform duration-500 group-hover:scale-105"
                    />
                    <div
                      className="absolute inset-0"
                      style={{
                        background:
                          "linear-gradient(to top, rgba(18,33,58,0.92) 15%, rgba(18,33,58,0.25) 100%)",
                      }}
                    />
                    <div className="relative z-10 flex flex-col justify-end flex-1 p-6 sm:p-8">
                      <h3 className="font-display text-3xl sm:text-4xl font-bold text-white mb-2 leading-tight">
                        {s.name}
                      </h3>
                      <p className="font-body text-sm sm:text-base text-white/80 leading-relaxed mb-4">
                        {s.tagline}
                      </p>
                      <span
                        className="font-body text-sm font-semibold inline-flex items-center gap-2 group-hover:gap-3 transition-all"
                        style={{ color: "#ff4757" }}
                      >
                        Explorar programa <ArrowRight className="w-4 h-4" />
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        {/* SECTION 4 — Por qué FUA Sports */}
        <section className="py-24 md:py-32 px-4" style={{ backgroundColor: "#f5f4f2" }}>
          <div className="container-wide max-w-6xl mx-auto">
            <div className="text-center mb-14">
              <h2
                className="font-display text-3xl sm:text-4xl md:text-5xl font-bold mb-4"
                style={{ color: NAVY }}
              >
                La Metodología que Funciona
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {features.map((f) => (
                <div
                  key={f.title}
                  className="rounded-xl bg-white p-7 border-t-4 shadow-sm"
                  style={{ borderTopColor: RED }}
                >
                  <h3
                    className="font-display text-xl sm:text-2xl font-bold mb-3"
                    style={{ color: NAVY }}
                  >
                    {f.title}
                  </h3>
                  <p className="font-body text-sm sm:text-base leading-relaxed text-muted-foreground">
                    {f.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 5 — Final CTA */}
        <section className="py-24 md:py-32 px-4" style={{ backgroundColor: NAVY }}>
          <div className="container-wide max-w-2xl mx-auto text-center">
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
              ¿No ves tu deporte?
            </h2>
            <p className="font-body text-base sm:text-lg text-white/70 mb-8 leading-relaxed">
              Déjanos tu email y sé el primero en saber cuando abramos nuevas disciplinas.
            </p>
            {ctaSubmitted ? (
              <p className="font-body text-lg font-medium mb-6" style={{ color: RED }}>
                ¡Listo! Te notificaremos.
              </p>
            ) : (
              <form
                onSubmit={handleCtaSubmit}
                className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto mb-6"
              >
                <div className="relative flex-1">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    type="email"
                    required
                    placeholder="Tu correo electrónico"
                    value={ctaEmail}
                    onChange={(e) => setCtaEmail(e.target.value)}
                    className="pl-10 bg-white border-white/15 text-foreground placeholder:text-muted-foreground"
                  />
                </div>
                <Button
                  type="submit"
                  className="font-semibold text-white hover:opacity-90"
                  style={{ backgroundColor: RED }}
                >
                  Notificarme
                </Button>
              </form>
            )}
            <a
              href="https://calendly.com/futbolu-agency"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-body text-sm text-white/70 hover:text-white transition-colors"
            >
              <Calendar className="w-4 h-4" />
              O agenda una llamada gratuita →
            </a>
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
};

export default FUASports;
