import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  SportHero,
  SportSection,
  SectionTitle,
  FeatureCard,
  ProcessStep,
  ColCard,
  FinalCTA,
  BackToSports,
  NAVY,
  RED,
  LIGHT,
} from "./_shared";

const GolfPage = () => {
  const { language } = useLanguage();
  const es = language === "es";

  const d1 = [
    { p: es ? "Elite Nacional" : "National Elite", h: "<0.5", s: "68–70", b: "100%" },
    { p: es ? "Competitivo D1" : "Competitive D1", h: "<1.0", s: "70–73", b: "80–100%" },
    { p: es ? "Proyección D1" : "D1 Prospect", h: "1.0–2.0", s: "73–75", b: "50–79%" },
  ];
  const d2 = [
    { p: es ? "Alto Rendimiento D2" : "High Performance D2", h: "1.0–2.5", s: "74–76", b: "80–90%" },
    { p: es ? "Competitivo D2" : "Competitive D2", h: "2.5–4.0", s: "76–78", b: "60–79%" },
    { p: es ? "NAIA / Desarrollo" : "NAIA / Development", h: "4.0–6.0", s: "78–82", b: "40–60%" },
  ];

  const renderTable = (title: string, rows: typeof d1) => (
    <div>
      <h3 className="font-display text-xl font-bold mb-4 text-center" style={{ color: NAVY }}>
        {title}
      </h3>
      <div className="overflow-x-auto rounded-xl border" style={{ borderColor: "#e5e5e5" }}>
        <table className="w-full text-sm bg-white">
          <thead style={{ backgroundColor: NAVY }}>
            <tr className="text-white text-left">
              <th className="px-4 py-3 font-display font-semibold">{es ? "Perfil" : "Profile"}</th>
              <th className="px-4 py-3 font-display font-semibold">{es ? "Hándicap" : "Handicap"}</th>
              <th className="px-4 py-3 font-display font-semibold">{es ? "Score Promedio" : "Avg Score"}</th>
              <th className="px-4 py-3 font-display font-semibold" style={{ color: "#fff" }}>
                {es ? "Potencial Beca" : "Scholarship Potential"}
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={r.p} style={{ backgroundColor: i % 2 === 0 ? "#ffffff" : LIGHT }}>
                <td className="px-4 py-3 font-medium" style={{ color: NAVY }}>{r.p}</td>
                <td className="px-4 py-3" style={{ color: NAVY }}>{r.h}</td>
                <td className="px-4 py-3" style={{ color: NAVY }}>{r.s}</td>
                <td className="px-4 py-3 font-bold" style={{ color: RED }}>{r.b}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-16 md:pt-20" style={{ backgroundColor: LIGHT }}>
        <BackToSports />
        <SportHero
          title={es ? "Becas de Golf Universitario en EE.UU." : "College Golf Scholarships in the U.S."}
          subtitle={es ? "De tu club local a la élite universitaria americana." : "From your local club to the American collegiate elite."}
          stats={[
            { value: "+1,300", label: es ? "Programas de golf" : "Golf programs" },
            { value: "$2.5B", label: es ? "En becas anuales" : "In annual scholarships" },
            { value: "D1·D2·D3·NAIA", label: es ? "Divisiones" : "Divisions" },
          ]}
        />

        {/* Why */}
        <SportSection bg={LIGHT}>
          <SectionTitle>{es ? "¿Por qué el Golf Universitario?" : "Why College Golf?"}</SectionTitle>
          <div className="grid md:grid-cols-3 gap-5 mb-10">
            <FeatureCard
              title={es ? "Financiación Total" : "Full Funding"}
              desc={es ? "Matrícula, viajes y equipo técnico cubiertos." : "Tuition, travel and technical equipment covered."}
            />
            <FeatureCard
              title={es ? "Vitrina Profesional" : "Pro Showcase"}
              desc={es ? "Compite junto a futuros jugadores del PGA Tour." : "Compete alongside future PGA Tour players."}
            />
            <FeatureCard
              title={es ? "Respaldo Académico" : "Academic Backing"}
              desc={es ? "Título universitario americano reconocido mundialmente." : "Globally recognized U.S. university degree."}
            />
          </div>
          <blockquote
            className="rounded-xl p-8 font-display text-xl sm:text-2xl italic text-center"
            style={{ backgroundColor: NAVY, color: "white" }}
          >
            “
            {es
              ? "No buscamos una universidad para que juegues; buscamos el presupuesto que financie tu éxito."
              : "We don't look for a university for you to play in; we find the budget that funds your success."}
            ”
          </blockquote>
        </SportSection>

        {/* Profile */}
        <SportSection bg="#ffffff">
          <SectionTitle>{es ? "El Perfil del Atleta Ideal" : "The Ideal Athlete Profile"}</SectionTitle>
          <div className="grid md:grid-cols-3 gap-5">
            <ColCard
              title={es ? "Métricas de Campo" : "Course Metrics"}
              items={
                es
                  ? ["Scoring Average", "Hándicap Index", "Consistencia últimos 5 torneos"]
                  : ["Scoring Average", "Handicap Index", "Consistency in last 5 tournaments"]
              }
            />
            <ColCard
              title={es ? "Reconocimiento" : "Recognition"}
              items={["WAGR ranking", "Junior Golf Scoreboard"]}
            />
            <ColCard
              title={es ? "Elegibilidad" : "Eligibility"}
              items={["GPA", "SAT / Duolingo", "NCAA Eligibility Center"]}
            />
          </div>
        </SportSection>

        {/* Standards */}
        <SportSection bg={LIGHT}>
          <SectionTitle>{es ? "Estándares por División" : "Standards by Division"}</SectionTitle>
          <div className="space-y-10">
            {renderTable("División I", d1)}
            {renderTable("División II & NAIA", d2)}
          </div>
        </SportSection>

        {/* Roadmap */}
        <SportSection bg="#ffffff">
          <SectionTitle>{es ? "Tu Hoja de Ruta" : "Your Roadmap"}</SectionTitle>
          <div className="grid md:grid-cols-2 gap-5">
            {(es
              ? [
                  { t: "Auditoría Técnica (Mes 1)", d: "Evaluación hándicap + proyección académica." },
                  { t: "Perfil Digital Pro (Mes 2)", d: "Portafolio + video swing Trackman." },
                  { t: "Campaña de Exposición (Mes 3–5)", d: "Contacto con +1,000 coaches D1/D2/NAIA." },
                  { t: "Negociación de Becas (Mes 6)", d: "Filtro de ofertas, selección del 'Best Fit'." },
                  { t: "Commitment & Visa", d: "Firma NLI, gestión Visa I-20, llegada al campus." },
                ]
              : [
                  { t: "Technical Audit (Month 1)", d: "Handicap evaluation + academic projection." },
                  { t: "Pro Digital Profile (Month 2)", d: "Portfolio + Trackman swing video." },
                  { t: "Exposure Campaign (Months 3–5)", d: "Outreach to 1,000+ D1/D2/NAIA coaches." },
                  { t: "Scholarship Negotiation (Month 6)", d: "Offer filtering, 'Best Fit' selection." },
                  { t: "Commitment & Visa", d: "NLI signing, I-20 Visa management, campus arrival." },
                ]
            ).map((s, i) => (
              <ProcessStep key={s.t} n={i + 1} title={s.t} desc={s.d} />
            ))}
          </div>
        </SportSection>

        {/* Daily schedule */}
        <SportSection bg={LIGHT}>
          <SectionTitle>{es ? "24 Horas de Alto Rendimiento" : "24 Hours of High Performance"}</SectionTitle>
          <div className="space-y-3 max-w-3xl mx-auto">
            {[
              { time: "06:00", t: es ? "Entrenamiento" : "Training", d: es ? "Swing, putting, fuerza" : "Swing, putting, strength" },
              { time: "09:00", t: es ? "Clases" : "Classes", d: es ? "Bloque académico" : "Academic block" },
              { time: "14:00", t: es ? "Campo" : "Course", d: es ? "Ronda práctica" : "Practice round" },
              { time: "19:00", t: es ? "Análisis" : "Analysis", d: es ? "Estadísticas, video, recuperación" : "Stats, video, recovery" },
              { time: "21:00", t: es ? "Tutoría académica" : "Academic tutoring", d: "" },
            ].map((row) => (
              <div
                key={row.time}
                className="flex gap-5 items-center rounded-xl border bg-white p-5"
                style={{ borderColor: "#e5e5e5" }}
              >
                <div className="font-display text-2xl font-bold w-20 shrink-0" style={{ color: RED }}>
                  {row.time}
                </div>
                <div>
                  <div className="font-display font-bold" style={{ color: NAVY }}>{row.t}</div>
                  {row.d && <div className="font-body text-sm text-muted-foreground">{row.d}</div>}
                </div>
              </div>
            ))}
          </div>
        </SportSection>

        <FinalCTA
          label={es ? "Agenda tu Evaluación Gratuita" : "Schedule Your Free Evaluation"}
          sub={es ? "Conversemos sobre tu camino al golf universitario." : "Let's talk about your path to college golf."}
        />
        <Footer />
      </main>
    </>
  );
};

export default GolfPage;
