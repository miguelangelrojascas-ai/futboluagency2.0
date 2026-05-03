import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";
import { CheckCircle } from "lucide-react";
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
  GRAY,
} from "./_shared";

const TrackPage = () => {
  const { language } = useLanguage();
  const es = language === "es";

  const matrix = [
    { e: "100m", w: "11.8–12.2s", m: "10.3–10.7s", o: "12.5–13.0s / 11.3–11.8s", b: "70–100%" },
    { e: "400m", w: "54.0–56.0s", m: "47.0–49.0s", o: "57.0–59.0s / 50.0–52.0s", b: "60–100%" },
    { e: es ? "Salto Largo" : "Long Jump", w: "6.0–6.3m", m: "7.5–7.8m", o: "5.5–5.8m / 7.0–7.3m", b: "60–100%" },
  ];

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-16 md:pt-20">
        <BackToSports />
        <SportHero
          title={es ? "Becas de Track & Field en EE.UU." : "Track & Field Scholarships in the U.S."}
          subtitle={
            es
              ? "Más de $3.5 billones disponibles. Estados Unidos es el destino #1 para atletas internacionales de alto rendimiento."
              : "Over $3.5B available. The U.S. is the #1 destination for international high-performance athletes."
          }
          stats={[
            { value: "+1,000", label: es ? "Programas universitarios" : "University programs" },
            { value: "$3.5B", label: es ? "En becas" : "In scholarships" },
            { value: "D1·D2·NAIA", label: es ? "Divisiones" : "Divisions" },
          ]}
        />

        {/* Market — gray */}
        <SportSection bg={GRAY}>
          <SectionTitle>
            {es ? "El Mercado del Atletismo Universitario" : "The College Track & Field Market"}
          </SectionTitle>
          <div className="grid md:grid-cols-3 gap-5">
            <FeatureCard
              title={es ? "Inversión masiva: $3.5B" : "Massive investment: $3.5B"}
              desc={
                es
                  ? "En becas disponibles anualmente para atletas internacionales de alto rendimiento."
                  : "In scholarships available annually for high-performance international athletes."
              }
            />
            <FeatureCard
              title={es ? "+1,000 programas" : "1,000+ programs"}
              desc={
                es
                  ? "Donde FUA Sports puede colocarte en todo el territorio de EE.UU., desde D1 hasta NAIA."
                  : "Where FUA Sports can place you across the entire US, from D1 to NAIA."
              }
            />
            <FeatureCard
              title={es ? "Destino #1 mundial" : "World's #1 destination"}
              desc={
                es
                  ? "Para atletas internacionales de alto rendimiento que buscan crecer deportiva y académicamente."
                  : "For international high-performance athletes seeking athletic and academic growth."
              }
            />
          </div>
        </SportSection>

        {/* Performance Matrix — white */}
        <SportSection bg="#ffffff">
          <SectionTitle>{es ? "Matriz de Rendimiento" : "Performance Matrix"}</SectionTitle>
          <p className="text-center font-body text-muted-foreground mb-8 -mt-6 max-w-2xl mx-auto">
            {es
              ? "FUA Sports utiliza marcas oficiales para determinar tu potencial de cobertura financiera."
              : "FUA Sports uses official marks to determine your financial coverage potential."}
          </p>
          <div className="overflow-x-auto rounded-xl border" style={{ borderColor: "#e5e5e5" }}>
            <table className="w-full text-sm bg-white">
              <thead style={{ backgroundColor: NAVY }}>
                <tr className="text-white text-left">
                  <th className="px-4 py-3 font-display font-semibold">{es ? "Evento" : "Event"}</th>
                  <th className="px-4 py-3 font-display font-semibold">{es ? "D1 Mujeres" : "D1 Women"}</th>
                  <th className="px-4 py-3 font-display font-semibold">{es ? "D1 Hombres" : "D1 Men"}</th>
                  <th className="px-4 py-3 font-display font-semibold">D2/NAIA</th>
                  <th className="px-4 py-3 font-display font-semibold">
                    {es ? "Potencial Beca" : "Scholarship Potential"}
                  </th>
                </tr>
              </thead>
              <tbody>
                {matrix.map((r, i) => (
                  <tr key={r.e} style={{ backgroundColor: i % 2 === 0 ? "#ffffff" : LIGHT }}>
                    <td className="px-4 py-3 font-bold" style={{ color: NAVY }}>
                      {r.e}
                    </td>
                    <td className="px-4 py-3" style={{ color: NAVY }}>
                      {r.w}
                    </td>
                    <td className="px-4 py-3" style={{ color: NAVY }}>
                      {r.m}
                    </td>
                    <td className="px-4 py-3" style={{ color: NAVY }}>
                      {r.o}
                    </td>
                    <td className="px-4 py-3 font-bold" style={{ color: RED }}>
                      {r.b}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </SportSection>

        {/* FUA Method — dark navy */}
        <SportSection bg={NAVY}>
          <SectionTitle dark>{es ? "El Método FUA Sports" : "The FUA Sports Method"}</SectionTitle>
          <p className="font-body text-white/70 text-center max-w-2xl mx-auto mb-10 -mt-6">
            {es
              ? "Ingeniería de reclutamiento diseñada para maximizar tu beca."
              : "Recruitment engineering designed to maximize your scholarship."}
          </p>
          <div className="grid md:grid-cols-3 gap-5">
            {(es
              ? [
                  {
                    t: "01. Validación Técnica",
                    d: "Diagnóstico gratuito de marcas y nivel académico para crear un plan personalizado según tus objetivos.",
                  },
                  {
                    t: "02. Blindaje Académico",
                    d: "Traducción de notas, certificados de elegibilidad y registro oficial ante NCAA/NAIA.",
                  },
                  {
                    t: "03. Negociación Financiera",
                    d: "Maximización de recursos para asegurar el paquete más alto (Deporte + Academia).",
                  },
                ]
              : [
                  {
                    t: "01. Technical Validation",
                    d: "Free diagnosis of marks and academic level to create a personalized plan based on your goals.",
                  },
                  {
                    t: "02. Academic Lockdown",
                    d: "Grade translation, eligibility certificates and official registration with NCAA/NAIA.",
                  },
                  {
                    t: "03. Financial Negotiation",
                    d: "Maximizing resources to secure the highest package (Athletic + Academic).",
                  },
                ]
            ).map((s, i) => (
              <ProcessStep key={s.t} n={i + 1} title={s.t} desc={s.d} />
            ))}
          </div>
        </SportSection>

        {/* Elite scholarship — gray */}
        <SportSection bg={GRAY}>
          <SectionTitle>{es ? "¿Qué incluye una Beca de Élite?" : "What an Elite Scholarship Includes"}</SectionTitle>
          <div className="grid md:grid-cols-3 gap-5">
            <ColCard
              title={es ? "Cobertura Académica" : "Academic Coverage"}
              items={
                es
                  ? ["Pago de matrícula y créditos", "Materiales de estudio", "Centros de tutoría privada para atletas"]
                  : ["Tuition and credits", "Study materials", "Private tutoring centers for athletes"]
              }
            />
            <ColCard
              title={es ? "Rendimiento Deportivo" : "Athletic Performance"}
              items={
                es
                  ? [
                      "Coaching de nivel olímpico",
                      "Instalaciones de última tecnología",
                      "Indumentaria Nike/Adidas/Puma",
                      "Fisioterapia y nutrición deportiva",
                    ]
                  : [
                      "Olympic-level coaching",
                      "State-of-the-art facilities",
                      "Nike/Adidas/Puma gear",
                      "Physiotherapy and sports nutrition",
                    ]
              }
            />
            <ColCard
              title={es ? "Costos de Vida" : "Living Costs"}
              items={
                es
                  ? [
                      "Alojamiento en residencias oficiales (Housing)",
                      "Plan de comidas completo (Meal Plan)",
                      "Logística de competencia (viajes y hoteles)",
                    ]
                  : ["Official housing residences", "Complete meal plan", "Competition logistics (travel and hotels)"]
              }
            />
          </div>
        </SportSection>

        {/* Requirements + Day — white */}
        <SportSection bg="#ffffff">
          <SectionTitle>{es ? "Requisitos y Vida Diaria" : "Requirements & Daily Life"}</SectionTitle>
          <div className="grid md:grid-cols-2 gap-8 mb-10">
            <div>
              <h3 className="font-display text-xl font-bold mb-5" style={{ color: NAVY }}>
                {es ? "Filtro de Selección" : "Selection Filter"}
              </h3>
              <div className="space-y-4">
                <div className="rounded-xl p-5 border" style={{ borderColor: "#e5e5e5", backgroundColor: LIGHT }}>
                  <h4 className="font-semibold mb-3" style={{ color: NAVY }}>
                    {es ? "Académico" : "Academic"}
                  </h4>
                  <ul className="space-y-2">
                    {["GPA 2.5+ / 4.0", "Duolingo 95+ / TOEFL 61+ / IELTS 5.5+"].map((it) => (
                      <li key={it} className="flex gap-2 text-sm" style={{ color: NAVY }}>
                        <CheckCircle className="w-4 h-4 shrink-0 mt-0.5" style={{ color: RED }} />
                        {it}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="rounded-xl p-5 border" style={{ borderColor: "#e5e5e5", backgroundColor: LIGHT }}>
                  <h4 className="font-semibold mb-3" style={{ color: NAVY }}>
                    {es ? "Deportivo" : "Athletic"}
                  </h4>
                  <ul className="space-y-2">
                    {(es
                      ? ["Marcas verificables en federación nacional", "Video técnico de alta calidad para coaches"]
                      : ["Federation-verified marks", "High-quality technical video for coaches"]
                    ).map((it) => (
                      <li key={it} className="flex gap-2 text-sm" style={{ color: NAVY }}>
                        <CheckCircle className="w-4 h-4 shrink-0 mt-0.5" style={{ color: RED }} />
                        {it}
                      </li>
                    ))}
                  </ul>
                </div>
                <p className="text-sm italic text-center" style={{ color: NAVY }}>
                  {es
                    ? "Si no cumples algún requisito, FUA diseña un plan de preparación personalizado."
                    : "If you don't meet a requirement, FUA designs a custom preparation plan."}
                </p>
              </div>
            </div>
            <div>
              <h3 className="font-display text-xl font-bold mb-5" style={{ color: NAVY }}>
                {es ? "Un Día en la Élite" : "A Day in the Elite"}
              </h3>
              <div className="space-y-3">
                {[
                  {
                    time: "06:30",
                    t: es ? "Bloque de Pista" : "Track Block",
                    d: es ? "Entrenamiento técnico intenso" : "Intense technical training",
                  },
                  {
                    time: "11:00–15:00",
                    t: es ? "Bloque Académico" : "Academic Block",
                    d: es
                      ? "Clases consecutivas (rendimiento obligatorio)"
                      : "Consecutive classes (mandatory performance)",
                  },
                  {
                    time: "16:00",
                    t: es ? "Trabajo Complementario" : "Complementary Work",
                    d: es ? "Revisión de video y fisioterapia" : "Video review and physiotherapy",
                  },
                  {
                    time: "21:30",
                    t: "Lights Out",
                    d: es ? "Descanso forzado para recuperación real" : "Forced rest for real recovery",
                  },
                ].map((row) => (
                  <div
                    key={row.time}
                    className="flex gap-4 items-center rounded-xl border p-4"
                    style={{ borderColor: "#e5e5e5", backgroundColor: LIGHT }}
                  >
                    <div className="font-display text-base font-bold w-24 sm:w-28 shrink-0" style={{ color: RED }}>
                      {row.time}
                    </div>
                    <div>
                      <div className="font-display font-bold text-sm" style={{ color: NAVY }}>
                        {row.t}
                      </div>
                      {row.d && <div className="font-body text-xs text-muted-foreground">{row.d}</div>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </SportSection>

        <FinalCTA
          label={es ? "Agenda tu Evaluación Gratuita" : "Schedule Your Free Evaluation"}
          sub={
            es
              ? "Conversemos sobre tu camino al atletismo universitario. Sin compromiso."
              : "Let's talk about your path to college track. No commitment."
          }
        />
        <Footer />
      </main>
    </>
  );
};

export default TrackPage;
