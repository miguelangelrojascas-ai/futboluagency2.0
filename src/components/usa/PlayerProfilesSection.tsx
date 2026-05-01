import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import profileElite from "@/assets/profile-elite.png";
import profileAlto from "@/assets/profile-alto.webp";
import profileMedio from "@/assets/profile-medio.jpeg";
import profileDesarrollo from "@/assets/profile-desarrollo.webp";

interface Profile {
  level: string;
  badgeColor: string;
  gradient: string;
  image: string;
  imagePosition?: string;
  profile: string;
  universities: string;
  plan: string;
  extraLink?: { label: string; to: string };
}

const PlayerProfilesSection = () => {
  const { language } = useLanguage();
  const isEs = language === "es";

  const profiles: Profile[] = [
    {
      level: "Élite",
      badgeColor: "#7c3aed",
      gradient: "linear-gradient(135deg, #4c1d95 0%, #7c3aed 100%)",
      image: profileElite,
      imagePosition: "center 20%",
      profile: isEs
        ? "Academias top o selecciones nacionales. Historial en divisiones competitivas, Sub-17, Sub-20 o debut semiprofesional."
        : "Top academies or national teams. Background in competitive divisions, U-17, U-20 or semi-pro debut.",
      universities: isEs
        ? "NCAA D1 — Programas top. Beca 70–100%"
        : "NCAA D1 — Top programs. Scholarship 70–100%",
      plan: isEs
        ? "Seleccionamos las mejores opciones según posición, estilo de juego y objetivos académicos. Negociación directa con coaches."
        : "We select the best options based on position, playing style and academic goals. Direct negotiation with coaches.",
    },
    {
      level: "Alto",
      badgeColor: "#dc2626",
      gradient: "linear-gradient(135deg, #7f1d1d 0%, #dc2626 100%)",
      image: profileAlto,
      imagePosition: "center center",
      profile: isEs
        ? "Clubes competitivos, ligas regionales. Trayectoria sólida, buen nivel técnico y físico. Inglés intermedio o superior."
        : "Competitive clubs, regional leagues. Solid track record, good technical and physical level. Intermediate or higher English.",
      universities: isEs
        ? "NCAA D1 / D2 — NAIA top. Beca 50–90%"
        : "NCAA D1 / D2 — Top NAIA. Scholarship 50–90%",
      plan: isEs
        ? "Construimos tu perfil y video highlights para maximizar ofertas. Acceso a nuestra red de 40+ universidades partner."
        : "We build your profile and highlights video to maximize offers. Access to our network of 40+ partner universities.",
    },
    {
      level: "Medio",
      badgeColor: "#2563eb",
      gradient: "linear-gradient(135deg, #1e3a8a 0%, #2563eb 100%)",
      image: profileMedio,
      imagePosition: "center 25%",
      profile: isEs
        ? "Perfil con potencial claro. Menos trayectoria pero con habilidades demostrables. Buen expediente académico."
        : "Profile with clear potential. Less track record but with demonstrable skills. Good academic record.",
      universities: isEs
        ? "NCAA D2 — NAIA — NJCAA. Beca académica + deportiva combinada."
        : "NCAA D2 — NAIA — NJCAA. Combined academic + athletic scholarship.",
      plan: isEs
        ? "Potenciamos tu perfil académico y deportivo. El GPA puede compensar y abrir puertas a mejores becas."
        : "We boost your academic and athletic profile. GPA can compensate and unlock better scholarships.",
    },
    {
      level: isEs ? "Desarrollo" : "Development",
      badgeColor: "#16a34a",
      gradient: "linear-gradient(135deg, #14532d 0%, #16a34a 100%)",
      image: profileDesarrollo,
      imagePosition: "center 30%",
      profile: isEs
        ? "Jugador con ambición y compromiso. Considera el Gap Year en España para elevar su nivel antes de aplicar."
        : "Ambitious and committed player. Consider a Gap Year in Spain to raise your level before applying.",
      universities: isEs
        ? "NAIA — NJCAA — D3. Posibilidad de transferencia a D1/D2 tras primer año."
        : "NAIA — NJCAA — D3. Possibility to transfer to D1/D2 after first year.",
      plan: isEs
        ? "Evaluamos si el Gap Year en España es el mejor paso previo. Un año en academia profesional puede transformar tu perfil."
        : "We evaluate whether a Gap Year in Spain is the best prior step. A year in a professional academy can transform your profile.",
      extraLink: {
        label: isEs ? "Ver programa España →" : "See Spain program →",
        to: "/spain",
      },
    },
  ];

  const colLabel = "text-[10px] tracking-[0.15em] uppercase text-muted-foreground font-semibold mb-2 block";

  return (
    <section className="section-padding" style={{ backgroundColor: "#fafaf8" }}>
      <div className="container-wide px-4">
        <div className="max-w-3xl mb-12">
          <span className="text-red-600 text-xs font-bold tracking-[0.15em] uppercase mb-4 block">
            {isEs ? "¿Puedes conseguir una beca?" : "Can you get a scholarship?"}
          </span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4 leading-tight">
            {isEs ? "Encuentra tu perfil" : "Find your profile"}
          </h2>
          <p className="font-body text-muted-foreground text-base sm:text-lg leading-relaxed">
            {isEs
              ? "El potencial de beca depende de tu nivel futbolístico y académico. Aquí te mostramos qué puede conseguir cada perfil."
              : "Scholarship potential depends on your athletic and academic level. Here's what each profile can achieve."}
          </p>
        </div>

        <div className="space-y-4 max-w-6xl">
          {profiles.map((p, i) => (
            <div
              key={i}
              className="rounded-xl overflow-hidden bg-white grid grid-cols-1 md:grid-cols-[180px_1fr_1fr_1fr]"
              style={{ border: "1px solid #e5e5e5" }}
            >
              {/* Left column — level with photo background */}
              <div className="relative p-5 flex flex-col justify-between min-h-[180px] md:min-h-[200px] overflow-hidden">
                <img
                  src={p.image}
                  alt={p.level}
                  className="absolute inset-0 w-full h-full object-cover"
                  style={{ objectPosition: p.imagePosition || "center" }}
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background: `linear-gradient(180deg, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0.55) 60%, ${p.badgeColor}cc 100%)`,
                  }}
                />
                <span
                  className="relative inline-flex items-center self-start px-2.5 py-1 rounded-full text-[10px] font-bold tracking-[0.12em] uppercase text-white"
                  style={{ backgroundColor: p.badgeColor, boxShadow: "0 1px 4px rgba(0,0,0,0.3)" }}
                >
                  {isEs ? "Nivel" : "Level"}
                </span>
                <span
                  className="relative font-display text-2xl sm:text-3xl font-bold text-white mt-4"
                  style={{ textShadow: "0 2px 8px rgba(0,0,0,0.6)" }}
                >
                  {p.level}
                </span>
              </div>

              {/* Profile */}
              <div className="p-4 md:border-l" style={{ borderColor: "#f0f0f0" }}>
                <span className={colLabel}>{isEs ? "Perfil del jugador" : "Player profile"}</span>
                <p className="font-body text-sm text-foreground leading-relaxed">{p.profile}</p>
              </div>

              {/* Universities */}
              <div className="p-4 md:border-l" style={{ borderColor: "#f0f0f0" }}>
                <span className={colLabel}>{isEs ? "Universidades objetivo" : "Target universities"}</span>
                <p className="font-body text-sm text-foreground leading-relaxed">{p.universities}</p>
              </div>

              {/* Plan */}
              <div className="p-4 md:border-l" style={{ borderColor: "#f0f0f0" }}>
                <span className={colLabel}>{isEs ? "Nuestro plan" : "Our plan"}</span>
                <p className="font-body text-sm text-foreground leading-relaxed">{p.plan}</p>
                {p.extraLink && (
                  <Link
                    to={p.extraLink.to}
                    className="inline-block mt-3 text-xs font-semibold text-red-600 hover:text-red-700 transition-colors"
                  >
                    {p.extraLink.label}
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>

        <p className="text-center text-xs italic text-muted-foreground mt-8 max-w-2xl mx-auto">
          {isEs
            ? "* El potencial de beca es orientativo. Cada caso se evalúa individualmente en una consulta gratuita."
            : "* Scholarship potential is indicative. Each case is evaluated individually in a free consultation."}
        </p>
      </div>
    </section>
  );
};

export default PlayerProfilesSection;
