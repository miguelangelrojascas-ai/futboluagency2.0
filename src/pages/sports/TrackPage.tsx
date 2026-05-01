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
      <main className="min-h-screen pt-16 md:pt-20" style={{ backgroundColor: LIGHT }}>
        <BackToSports />
        <SportHero
          title={es ? "Becas de Track & Field en EE.UU." : "Track & Field Scholarships in the U.S."}
          subtitle={
            es
              ? "Más de $3.5 billones disponibles. Estados Unidos es el destino #1 para atletas internacionales."
              : "Over $3.5B available. The U.S. is the #1 destination for international athletes."
          }
          stats={[
            { value: "+1,000", label: es ? "Programas universitarios" : "University programs" },
            { value: "$3.5B", label: es ? "En becas" : "In scholarships" },
            { value: "D1·D2·NAIA", label: es ? "Divisiones" : "Divisions" },
          ]}
        />

        {/* Market */}
        <SportSection bg={LIGHT}>
          <SectionTitle>{es ? "El Mercado del Atletismo Universitario" : "The College Track & Field Market"}</SectionTitle>
          <div className="grid md:grid-cols-3 gap-5">
            <FeatureCard
              title={es ? "Inversión masiva" : "Massive investment"}
              desc={es ? "$3.5B en becas disponibles." : "$3.5B in available scholarships."}
            />
            <FeatureCard
              title={es ? "+1,000 programas" : "1,000+ programs"}
              desc={es ? "Donde FUA puede colocarte." : "Where FUA can place you."}
            />
            <FeatureCard
              title={es ? "Destino #1" : "#1 destination"}
              desc={
                es
                  ? "Para atletas internacionales de alto rendimiento."
                  : "For international high-performance athletes."
              }
            />
          </div>
        </SportSection>

        {/* Performance Matrix */}
        <SportSection bg="#ffffff">
          <SectionTitle>{es ? "Matriz de Rendimiento" : "Performance Matrix"}</SectionTitle>
          <div className="overflow-x-auto rounded-xl border" style={{ borderColor: "#e5e5e5" }}>
            <table className="w-full text-sm bg-white">
              <thead style={{ backgroundColor: NAVY }}>
                <tr className="text-white text-left">
                  <th className="px-4 py-3 font-display font-semibold">{es ? "Evento" : "Event"}</th>
                  <th className="px-4 py-3 font-display font-semibold">{es ? "D1 Mujeres" : "D1 Women"}</th>
                  <th className="px-4 py-3 font-display font-semibold">{es ? "D1 Hombres" : "D1 Men"}</th>
                  <th className="px-4 py-3 font-display font-semibold">D2/NAIA</th>
                  <th className="px-4 py-3 font-display font-semibold">{es ? "Potencial Beca" : "Scholarship Potential"}</th>
                </tr>
              </thead>
              <tbody>
                {matrix.map((r, i) => (
                  <tr key={r.e} style={{ backgroundColor: i % 2 === 0 ? "#ffffff" : LIGHT }}>
                    <td className="px-4 py-3 font-bold" style={{ color: NAVY }}>{r.e}</td>
                    <td className="px-4 py-3" style={{ color: NAVY }}>{r.w}</td>
                    <td className="px-4 py-3" style={{ color: NAVY }}>{r.m}</td>
                    <td className="px-4 py-3" style={{ color: NAVY }}>{r.o}</td>
                    <td className="px-4 py-3 font-bold" style={{ color: RED }}>{r.b}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </SportSection>

        {/* FUA Method */}
        <SportSection bg={LIGHT}>
          <SectionTitle>{es ? "El Método FUA" : "The FUA Method"}</SectionTitle>
          <div className="grid md:grid-cols-3 gap-5">
            {(es
              ? [
                  { t: "Validación Técnica", d: "Diagnóstico gratuito y plan personalizado." },
                  { t: "Blindaje Académico", d: "Traducción de notas, elegibilidad NCAA/NAIA." },
                  { t: "Negociación Financiera", d: "Maximizar beca deportiva + académica." },
                ]
              : [
                  { t: "Technical Validation", d: "Free diagnosis and custom plan." },
                  { t: "Academic Lockdown", d: "Grade translation, NCAA/NAIA eligibility." },
                  { t: "Financial Negotiation", d: "Maximize athletic + academic aid." },
                ]
            ).map((s, i) => (
              <ProcessStep key={s.t} n={i + 1} title={s.t} desc={s.d} />
            ))}
          </div>
        </SportSection>

        {/* Elite scholarship */}
        <SportSection bg="#ffffff">
          <SectionTitle>{es ? "¿Qué incluye una Beca de Élite?" : "What an Elite Scholarship Includes"}</SectionTitle>
          <div className="grid md:grid-cols-3 gap-5">
            <ColCard
              title={es ? "Cobertura Académica" : "Academic Coverage"}
              items={es ? ["Matrícula completa", "Créditos", "Tutoría"] : ["Full tuition", "Credits", "Tutoring"]}
            />
            <ColCard
              title={es ? "Rendimiento Deportivo" : "Athletic Performance"}
              items={
                es
                  ? [
                      "Coaching olímpico",
                      "Instalaciones de élite",
                      "Indumentaria Nike/Adidas/Puma",
                      "Fisio y nutrición",
                    ]
                  : [
                      "Olympic coaching",
                      "Elite facilities",
                      "Nike/Adidas/Puma gear",
                      "Physio and nutrition",
                    ]
              }
            />
            <ColCard
              title={es ? "Costos de Vida" : "Living Costs"}
              items={
                es
                  ? ["Housing", "Meal plan", "Viajes de competencia"]
                  : ["Housing", "Meal plan", "Competition travel"]
              }
            />
          </div>
        </SportSection>

        {/* Requirements */}
        <SportSection bg={LIGHT}>
          <SectionTitle>{es ? "Requisitos" : "Requirements"}</SectionTitle>
          <div className="grid md:grid-cols-2 gap-5">
            <ColCard
              title={es ? "Académico" : "Academic"}
              items={
                es
                  ? ["GPA 2.5+", "Duolingo 95+ / TOEFL 61+ / IELTS 5.5+"]
                  : ["GPA 2.5+", "Duolingo 95+ / TOEFL 61+ / IELTS 5.5+"]
              }
            />
            <ColCard
              title={es ? "Deportivo" : "Athletic"}
              items={
                es
                  ? ["Marcas verificables en federación", "Video técnico de calidad"]
                  : ["Federation-verified marks", "Quality technical video"]
              }
            />
          </div>
          <p className="mt-6 text-center font-body italic" style={{ color: NAVY }}>
            {es
              ? "Si no cumples algún requisito, FUA diseña un plan de preparación personalizado."
              : "If you don't meet a requirement, FUA designs a custom preparation plan."}
          </p>
        </SportSection>

        {/* Day */}
        <SportSection bg="#ffffff">
          <SectionTitle>{es ? "Un día en la Élite" : "A Day in the Elite"}</SectionTitle>
          <div className="space-y-3 max-w-3xl mx-auto">
            {[
              { time: "06:30", t: es ? "Bloque de pista" : "Track block", d: es ? "Técnico intenso" : "Intense technical" },
              { time: "11:00–15:00", t: es ? "Bloque académico" : "Academic block", d: "" },
              { time: "16:00", t: es ? "Trabajo complementario" : "Complementary work", d: es ? "Video + fisio" : "Video + physio" },
              { time: "21:30", t: "Lights Out", d: es ? "Descanso para recuperación" : "Recovery rest" },
            ].map((row) => (
              <div
                key={row.time}
                className="flex gap-5 items-center rounded-xl border bg-white p-5"
                style={{ borderColor: "#e5e5e5" }}
              >
                <div className="font-display text-xl sm:text-2xl font-bold w-32 sm:w-36 shrink-0" style={{ color: RED }}>
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
          sub={es ? "Conversemos sobre tu camino al atletismo universitario." : "Let's talk about your path to college track."}
        />
        <Footer />
      </main>
    </>
  );
};

export default TrackPage;
