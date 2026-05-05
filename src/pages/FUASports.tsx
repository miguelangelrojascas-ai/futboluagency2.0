import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import fuaSportsLogo from "@/assets/fua-sports-logo.png";
import sportVolleyball from "@/assets/sport-volleyball.png";
import sportGolf from "@/assets/sport-golf.png";
import sportTennis from "@/assets/sport-tennis.png";
import sportTrack from "@/assets/sport-track.png";
import { useLanguage } from "@/contexts/LanguageContext";

const NAVY = "#12213a";
const RED = "#b00717";

const SPORTS = [
  {
    name: "Volleyball",
    tag: "NCAA D1 · D2 · D3 · NAIA",
    desc: "Becas para jugadoras de alto nivel competitivo en todo el territorio de EE.UU.",
    stat: "$1.8B en becas anuales",
    gradient: "linear-gradient(135deg, #0a1628 0%, #12213a 50%, #1a3a6e 100%)",
    accent: "#4a90d9",
    path: "/sports/volleyball",
    image: sportVolleyball,
  },
  {
    name: "Golf",
    tag: "$2.5B en becas anuales",
    desc: "De tu club local a la élite universitaria americana. +1,300 programas disponibles.",
    stat: "+1,300 programas",
    gradient: "linear-gradient(135deg, #0a1a0a 0%, #0f3a14 50%, #1a5e1e 100%)",
    accent: "#4ad98a",
    path: "/sports/golf",
    image: sportGolf,
  },
  {
    name: "Tenis",
    tag: "NCAA · NAIA · NJCAA",
    desc: "Acompañamiento cercano para conseguir la beca que tu talento merece.",
    stat: "100% atletas con beca",
    gradient: "linear-gradient(135deg, #1a0808 0%, #3a1012 50%, #6e1a1a 100%)",
    accent: "#d94a4a",
    path: "/sports/tennis",
    image: sportTennis,
  },
  {
    name: "Track & Field",
    tag: "+1,000 programas universitarios",
    desc: "Estados Unidos es el destino #1 para atletas internacionales de alto rendimiento.",
    stat: "$3.5B en becas",
    gradient: "linear-gradient(135deg, #1a1808 0%, #3a3010 50%, #6e5e1a 100%)",
    accent: "#d9c44a",
    path: "/sports/track",
    image: sportTrack,
  },
];

const FUASports = () => {
  const { language } = useLanguage();
  const es = language === "es";
  const [active, setActive] = useState(0);
  const [fading, setFading] = useState(false);

  // Auto-advance carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setFading(true);
      setTimeout(() => {
        setActive((prev) => (prev + 1) % SPORTS.length);
        setFading(false);
      }, 400);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const goTo = (i: number) => {
    if (i === active) return;
    setFading(true);
    setTimeout(() => {
      setActive(i);
      setFading(false);
    }, 400);
  };

  const slide = SPORTS[active];

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-16 md:pt-20">
        {/* ── CINEMATIC HERO CAROUSEL ── */}
        <section
          style={{
            position: "relative",
            overflow: "hidden",
            minHeight: "90vh",
            background: slide.gradient,
            transition: "background 0.8s ease",
            display: "flex",
            alignItems: "center",
          }}
        >
          {/* Animated glow */}
          <div
            style={{
              position: "absolute",
              top: "-100px",
              right: "-100px",
              width: "500px",
              height: "500px",
              borderRadius: "50%",
              background: `${slide.accent}18`,
              filter: "blur(100px)",
              transition: "background 1s ease",
              pointerEvents: "none",
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: "-80px",
              left: "-80px",
              width: "400px",
              height: "400px",
              borderRadius: "50%",
              background: `rgba(176,7,23,0.08)`,
              filter: "blur(80px)",
              pointerEvents: "none",
            }}
          />

          {/* Bottom fade */}
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: "120px",
              background: "linear-gradient(to bottom, transparent, #fafaf8)",
              zIndex: 2,
            }}
          />

          <div
            style={{
              maxWidth: "1100px",
              margin: "0 auto",
              padding: "80px 32px 120px",
              position: "relative",
              zIndex: 1,
              width: "100%",
            }}
          >
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "64px", alignItems: "center" }}>
              {/* LEFT — Logo + pitch */}
              <div>
                <img
                  src={fuaSportsLogo}
                  alt="FUA Sports"
                  style={{
                    height: "80px",
                    width: "auto",
                    filter: "invert(1) brightness(1.1)",
                    marginBottom: "28px",
                    display: "block",
                  }}
                />
                <h1
                  style={{
                    fontFamily: "Georgia, serif",
                    fontSize: "clamp(28px, 4vw, 48px)",
                    fontWeight: 700,
                    color: "white",
                    lineHeight: 1.2,
                    marginBottom: "16px",
                  }}
                >
                  {es ? "Becas Universitarias para " : "University Scholarships for "}
                  <span style={{ color: RED }}>{es ? "Todos los Deportes" : "All Sports"}</span>
                </h1>
                <p
                  style={{
                    fontSize: "15px",
                    color: "rgba(255,255,255,0.65)",
                    lineHeight: 1.8,
                    maxWidth: "420px",
                    marginBottom: "32px",
                  }}
                >
                  {es
                    ? "La misma metodología que llevó a más de 350 atletas a universidades en EE.UU., ahora disponible en más disciplinas deportivas."
                    : "The same methodology that placed 350+ athletes in U.S. universities, now available in more sports."}
                </p>

                {/* Stats row */}
                <div style={{ display: "flex", gap: "24px", flexWrap: "wrap" }}>
                  {[
                    { n: "350+", l: es ? "Atletas colocados" : "Athletes placed" },
                    { n: "4", l: es ? "Deportes activos" : "Active sports" },
                    { n: "75–100%", l: es ? "Cobertura beca" : "Scholarship coverage" },
                  ].map((s, i) => (
                    <div key={i}>
                      <div
                        style={{
                          fontFamily: "Georgia, serif",
                          fontSize: "24px",
                          fontWeight: 700,
                          color: "white",
                        }}
                      >
                        {s.n}
                      </div>
                      <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.5)", marginTop: "2px" }}>{s.l}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* RIGHT — Animated sport */}
              <div>
                {/* Big sport name */}
                <div
                  style={{
                    opacity: fading ? 0 : 1,
                    transform: fading ? "translateY(12px)" : "translateY(0)",
                    transition: "opacity 0.4s ease, transform 0.4s ease",
                    marginBottom: "24px",
                  }}
                >
                  <span
                    style={{
                      fontSize: "10px",
                      fontWeight: 700,
                      letterSpacing: "0.2em",
                      textTransform: "uppercase",
                      color: slide.accent,
                      display: "block",
                      marginBottom: "10px",
                      transition: "color 0.6s ease",
                    }}
                  >
                    {slide.tag}
                  </span>
                  <div
                    style={{
                      fontFamily: "Georgia, serif",
                      fontSize: "clamp(48px, 8vw, 88px)",
                      fontWeight: 700,
                      color: "white",
                      lineHeight: 1,
                      marginBottom: "12px",
                    }}
                  >
                    {slide.name}
                  </div>
                  <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.6)", lineHeight: 1.7, maxWidth: "340px" }}>
                    {slide.desc}
                  </p>
                </div>

                {/* Progress dots */}
                <div style={{ display: "flex", gap: "8px", marginBottom: "24px" }}>
                  {SPORTS.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => goTo(i)}
                      style={{
                        height: "4px",
                        width: active === i ? "32px" : "16px",
                        borderRadius: "2px",
                        background: active === i ? "white" : "rgba(255,255,255,0.2)",
                        border: "none",
                        cursor: "pointer",
                        padding: 0,
                        transition: "all 0.3s ease",
                      }}
                    />
                  ))}
                </div>

                {/* Sport pills */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
                  {SPORTS.map((s, i) => (
                    <Link
                      key={i}
                      to={s.path}
                      onClick={() => goTo(i)}
                      style={{
                        borderRadius: "10px",
                        padding: "14px 16px",
                        background: active === i ? "rgba(255,255,255,0.12)" : "rgba(255,255,255,0.04)",
                        border: active === i ? "1px solid rgba(255,255,255,0.25)" : "1px solid rgba(255,255,255,0.08)",
                        transition: "all 0.3s ease",
                        textDecoration: "none",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <span
                        style={{
                          fontFamily: "Georgia, serif",
                          fontSize: "14px",
                          fontWeight: 700,
                          color: active === i ? "white" : "rgba(255,255,255,0.45)",
                          transition: "color 0.3s ease",
                        }}
                      >
                        {s.emoji} {s.name}
                      </span>
                      {active === i && <ArrowRight size={14} color="white" />}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── WHAT IS FUA SPORTS ── */}
        <section style={{ background: "#fafaf8", padding: "80px 24px" }}>
          <div style={{ maxWidth: "900px", margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: "56px" }}>
              <span
                style={{
                  fontSize: "10px",
                  fontWeight: 700,
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: RED,
                  display: "block",
                  marginBottom: "14px",
                }}
              >
                {es ? "¿Qué es FUA Sports?" : "What is FUA Sports?"}
              </span>
              <h2
                style={{
                  fontFamily: "Georgia, serif",
                  fontSize: "clamp(26px, 4vw, 42px)",
                  fontWeight: 700,
                  color: NAVY,
                  marginBottom: "16px",
                  lineHeight: 1.2,
                }}
              >
                {es ? "Una metodología. Múltiples deportes." : "One methodology. Multiple sports."}
              </h2>
              <p
                style={{
                  fontSize: "16px",
                  color: "#555",
                  lineHeight: 1.8,
                  maxWidth: "620px",
                  margin: "0 auto",
                }}
              >
                {es
                  ? "FUA Sports es la rama de FutbolUAgency enfocada en deportes más allá del fútbol. Usamos el mismo proceso que nos ha dado un 98% de satisfacción para colocar atletas de volleyball, golf, tenis y atletismo en universidades de EE.UU."
                  : "FUA Sports is the branch of FutbolUAgency focused on sports beyond soccer. We use the same process that has given us 98% satisfaction to place volleyball, golf, tennis and track & field athletes in U.S. universities."}
              </p>
            </div>

            {/* Three pillars */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px" }}>
              {[
                {
                  num: "01",
                  title: es ? "Evaluación gratuita" : "Free evaluation",
                  desc: es
                    ? "Analizamos tu perfil deportivo y académico sin compromiso para decirte exactamente qué opciones tienes."
                    : "We analyze your athletic and academic profile at no cost to tell you exactly what options you have.",
                },
                {
                  num: "02",
                  title: es ? "Red de +40 universidades" : "40+ university network",
                  desc: es
                    ? "Acceso directo a coaches y programas en todo EE.UU., desde D1 hasta NAIA, en todas las divisiones."
                    : "Direct access to coaches and programs across the U.S., from D1 to NAIA, across all divisions.",
                },
                {
                  num: "03",
                  title: es ? "75–100% de beca garantizada" : "75–100% guaranteed scholarship",
                  desc: es
                    ? "Todos nuestros atletas obtienen becas entre el 75% y el 100% de cobertura. Sin excepciones."
                    : "All our athletes receive scholarships between 75% and 100% coverage. No exceptions.",
                },
              ].map((p, i) => (
                <div
                  key={i}
                  style={{
                    background: "white",
                    border: "1px solid #e5e5e5",
                    borderRadius: "16px",
                    padding: "28px",
                  }}
                >
                  <div
                    style={{
                      fontFamily: "Georgia, serif",
                      fontSize: "32px",
                      fontWeight: 700,
                      color: "rgba(176,7,23,0.12)",
                      marginBottom: "12px",
                    }}
                  >
                    {p.num}
                  </div>
                  <div
                    style={{ width: "32px", height: "3px", background: RED, borderRadius: "2px", marginBottom: "14px" }}
                  />
                  <h3
                    style={{
                      fontFamily: "Georgia, serif",
                      fontSize: "17px",
                      fontWeight: 700,
                      color: NAVY,
                      marginBottom: "10px",
                    }}
                  >
                    {p.title}
                  </h3>
                  <p style={{ fontSize: "13px", color: "#666", lineHeight: 1.75 }}>{p.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── SPORTS GRID ── */}
        <section style={{ background: "white", padding: "80px 24px", borderTop: "1px solid rgba(0,0,0,0.05)" }}>
          <div style={{ maxWidth: "960px", margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: "48px" }}>
              <span
                style={{
                  fontSize: "10px",
                  fontWeight: 700,
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: RED,
                  display: "block",
                  marginBottom: "14px",
                }}
              >
                {es ? "Nuestros programas" : "Our programs"}
              </span>
              <h2
                style={{
                  fontFamily: "Georgia, serif",
                  fontSize: "clamp(24px, 3vw, 36px)",
                  fontWeight: 700,
                  color: NAVY,
                  marginBottom: "8px",
                }}
              >
                {es ? "Elige tu Deporte" : "Choose Your Sport"}
              </h2>
              <div style={{ width: 40, height: 3, background: RED, margin: "0 auto" }} />
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "20px" }}>
              {SPORTS.map((s, i) => (
                <Link
                  key={i}
                  to={s.path}
                  style={{
                    display: "block",
                    textDecoration: "none",
                    borderRadius: "16px",
                    overflow: "hidden",
                    background: s.gradient,
                    padding: "36px 32px",
                    position: "relative",
                    minHeight: "200px",
                    transition: "transform 0.2s ease, box-shadow 0.2s ease",
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.transform = "translateY(-4px)";
                    e.currentTarget.style.boxShadow = "0 20px 48px rgba(0,0,0,0.25)";
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  {/* Glow */}
                  <div
                    style={{
                      position: "absolute",
                      top: "-40px",
                      right: "-40px",
                      width: "160px",
                      height: "160px",
                      borderRadius: "50%",
                      background: `${s.accent}20`,
                      filter: "blur(40px)",
                      pointerEvents: "none",
                    }}
                  />

                  <div style={{ position: "relative", zIndex: 1 }}>
                    <span
                      style={{
                        fontSize: "9px",
                        fontWeight: 700,
                        letterSpacing: "0.15em",
                        textTransform: "uppercase",
                        color: s.accent,
                        display: "block",
                        marginBottom: "10px",
                      }}
                    >
                      {s.stat}
                    </span>
                    <h3
                      style={{
                        fontFamily: "Georgia, serif",
                        fontSize: "28px",
                        fontWeight: 700,
                        color: "white",
                        marginBottom: "10px",
                      }}
                    >
                      {s.emoji} {s.name}
                    </h3>
                    <p
                      style={{
                        fontSize: "13px",
                        color: "rgba(255,255,255,0.6)",
                        lineHeight: 1.6,
                        marginBottom: "20px",
                      }}
                    >
                      {s.desc}
                    </p>
                    <span
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "6px",
                        fontSize: "13px",
                        fontWeight: 700,
                        color: "white",
                      }}
                    >
                      {es ? "Explorar programa" : "Explore program"} <ArrowRight size={14} />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ── SAME METHODOLOGY ── */}
        <section style={{ background: NAVY, padding: "80px 24px" }}>
          <div style={{ maxWidth: "900px", margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: "48px" }}>
              <span
                style={{
                  fontSize: "10px",
                  fontWeight: 700,
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: RED,
                  display: "block",
                  marginBottom: "14px",
                }}
              >
                {es ? "Nuestra metodología" : "Our methodology"}
              </span>
              <h2
                style={{
                  fontFamily: "Georgia, serif",
                  fontSize: "clamp(24px, 3vw, 36px)",
                  fontWeight: 700,
                  color: "white",
                  marginBottom: "8px",
                }}
              >
                {es ? "La Misma Metodología Ganadora" : "The Same Winning Methodology"}
              </h2>
              <div style={{ width: 40, height: 3, background: RED, margin: "0 auto 16px" }} />
              <p
                style={{
                  fontSize: "15px",
                  color: "rgba(255,255,255,0.6)",
                  maxWidth: "520px",
                  margin: "0 auto",
                  lineHeight: 1.7,
                }}
              >
                {es
                  ? "El mismo proceso que usamos en fútbol, adaptado a cada deporte. Probado con más de 350 atletas."
                  : "The same process we use in soccer, adapted to each sport. Proven with 350+ athletes."}
              </p>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px" }}>
              {[
                {
                  step: "01",
                  title: es ? "Evaluación y Perfil" : "Evaluation & Profile",
                  desc: es
                    ? "Diagnóstico gratuito del nivel deportivo y académico. Creamos tu perfil profesional para los coaches."
                    : "Free diagnosis of athletic and academic level. We create your professional profile for coaches.",
                },
                {
                  step: "02",
                  title: es ? "Contacto con Coaches" : "Coach Outreach",
                  desc: es
                    ? "Contactamos directamente con entrenadores universitarios y negociamos la mejor beca posible para ti."
                    : "We directly contact university coaches and negotiate the best possible scholarship for you.",
                },
                {
                  step: "03",
                  title: es ? "Admisión y Llegada" : "Admission & Arrival",
                  desc: es
                    ? "Gestionamos la admisión, la visa y te acompañamos hasta que aterrices en tu universidad en EE.UU."
                    : "We manage admission, the visa, and accompany you until you land at your U.S. university.",
                },
              ].map((s, i) => (
                <div
                  key={i}
                  style={{
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: "14px",
                    padding: "24px",
                  }}
                >
                  <div
                    style={{
                      width: "36px",
                      height: "36px",
                      borderRadius: "50%",
                      background: RED,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontFamily: "Georgia, serif",
                      fontSize: "13px",
                      fontWeight: 700,
                      color: "white",
                      marginBottom: "14px",
                    }}
                  >
                    {s.step}
                  </div>
                  <h3
                    style={{
                      fontFamily: "Georgia, serif",
                      fontSize: "16px",
                      fontWeight: 700,
                      color: "white",
                      marginBottom: "8px",
                    }}
                  >
                    {s.title}
                  </h3>
                  <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.55)", lineHeight: 1.7 }}>{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── COMING SOON / EMAIL CAPTURE ── */}
        <section style={{ background: "#fafaf8", padding: "72px 24px", borderTop: "1px solid rgba(0,0,0,0.05)" }}>
          <div style={{ maxWidth: "560px", margin: "0 auto", textAlign: "center" }}>
            <h2
              style={{
                fontFamily: "Georgia, serif",
                fontSize: "clamp(22px, 3vw, 32px)",
                fontWeight: 700,
                color: NAVY,
                marginBottom: "12px",
              }}
            >
              {es ? "¿No ves tu deporte?" : "Don't see your sport?"}
            </h2>
            <p style={{ fontSize: "14px", color: "#666", marginBottom: "28px", lineHeight: 1.7 }}>
              {es
                ? "Déjanos tu email y sé el primero en saber cuando abramos nuevas disciplinas."
                : "Leave your email and be the first to know when we open new disciplines."}
            </p>
            <div style={{ display: "flex", gap: "10px", maxWidth: "420px", margin: "0 auto 16px" }}>
              <input
                type="email"
                placeholder={es ? "Tu correo electrónico" : "Your email address"}
                style={{
                  flex: 1,
                  padding: "12px 16px",
                  borderRadius: "8px",
                  border: "1px solid #e5e5e5",
                  fontSize: "14px",
                  fontFamily: "Inter, sans-serif",
                  outline: "none",
                }}
              />
              <button
                style={{
                  background: RED,
                  color: "white",
                  border: "none",
                  padding: "12px 20px",
                  borderRadius: "8px",
                  fontWeight: 700,
                  fontSize: "13px",
                  cursor: "pointer",
                  fontFamily: "Inter, sans-serif",
                  whiteSpace: "nowrap",
                }}
              >
                {es ? "Notificarme" : "Notify me"}
              </button>
            </div>
            <a
              href="https://calendly.com/miguelangelrojascas/new-meeting"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontSize: "13px",
                color: "#888",
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center",
                gap: "4px",
              }}
            >
              {es ? "O agenda una llamada gratuita →" : "Or schedule a free call →"}
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default FUASports;
