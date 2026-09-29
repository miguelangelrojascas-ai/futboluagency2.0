import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";
import { useDocumentMeta } from "@/hooks/useDocumentMeta";
import {
  CheckCircle,
  ClipboardCheck,
  GraduationCap,
  HandCoins,
  Home,
  Medal,
  Megaphone,
  PlaneTakeoff,
  ShieldCheck,
  Timer,
  Trophy,
  Video,
} from "lucide-react";
import sportTrack from "@/assets/sport-track.png";
import methodBg from "@/assets/neus-track.jpg";
import SportSplitHero from "@/components/sports/SportSplitHero";
import SportBenchmarks from "@/components/sports/SportBenchmarks";
import SportMethodSection from "@/components/sports/SportMethodSection";
import ScholarshipCoverage from "@/components/sports/ScholarshipCoverage";
import {
  SportSection,
  SectionTitle,
  FeatureCard,
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

  useDocumentMeta({
    title: es
      ? "Becas de Atletismo Universitario en EE.UU. | FutbolUAgency"
      : "College Track & Field Scholarships in the USA | FutbolUAgency",
    description: es
      ? "Lleva tu talento en atletismo a las pistas universitarias de EE.UU. con becas en NCAA, NAIA y NJCAA."
      : "Take your track & field talent to US college tracks with scholarships across NCAA, NAIA and NJCAA.",
  });

  const matrix = [
    { e: "100m", w: "11.8–12.2s", m: "10.3–10.7s", o: "12.5–13.0s / 11.3–11.8s", b: "70–100%" },
    { e: "400m", w: "54.0–56.0s", m: "47.0–49.0s", o: "57.0–59.0s / 50.0–52.0s", b: "60–100%" },
    { e: es ? "Salto Largo" : "Long Jump", w: "6.0–6.3m", m: "7.5–7.8m", o: "5.5–5.8m / 7.0–7.3m", b: "60–100%" },
  ];

  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        <SportSplitHero
          sport="Track & Field"
          image={sportTrack}
          imageAlt={es ? "Atleta universitario en la pista" : "College athlete on the track"}
          eyebrow={es ? "Tu pista. Tu beca. Tu futuro." : "Your track. Your scholarship. Your future."}
          title={es ? "Becas de Track & Field" : "Track & Field scholarships"}
          highlight={es ? "en EE.UU." : "in the U.S."}
          subtitle={
            es
              ? "Más de $3.5 billones disponibles. Estados Unidos es el destino #1 para atletas internacionales de alto rendimiento."
              : "Over $3.5B available. The U.S. is the #1 destination for international high-performance athletes."
          }
          floatingStat={{ value: "$3.5B", label: es ? "En becas disponibles" : "In available scholarships" }}
          stats={[
            { value: "+1,000", label: es ? "Programas" : "Programs" },
            { value: "60–100%", label: es ? "Cobertura" : "Coverage" },
            { value: "D1–NAIA", label: es ? "Divisiones" : "Divisions" },
          ]}
        />

        <SportBenchmarks
          title={es ? "Tus marcas," : "Your marks,"}
          highlight={es ? "tu beca" : "your scholarship"}
          subtitle={
            es
              ? "En atletismo los números hablan. Usamos marcas oficiales para estimar tu potencial de cobertura en cada división."
              : "In track & field the numbers speak. We use official marks to estimate your coverage potential in each division."
          }
          metrics={[
            { icon: Timer, label: es ? "Marcas oficiales" : "Official marks", desc: es ? "Tiempos y distancias homologados por federación." : "Federation-certified times and distances." },
            { icon: Medal, label: es ? "Progresión" : "Progression", desc: es ? "Evolución de tus marcas en las últimas temporadas." : "How your marks evolved over recent seasons." },
            { icon: GraduationCap, label: es ? "Académico" : "Academics", desc: es ? "Notas que suman becas académicas a la deportiva." : "Grades that stack academic aid on athletic aid." },
            { icon: Video, label: es ? "Video de pruebas" : "Race video", desc: es ? "Carreras o saltos recientes en competición." : "Recent races or jumps in competition." },
          ]}
          columns={[es ? "Prueba" : "Event", es ? "D1 Mujeres" : "D1 Women", es ? "D1 Hombres" : "D1 Men", es ? "D2 / NAIA (M / H)" : "D2 / NAIA (W / M)", es ? "Potencial beca" : "Scholarship potential"]}
          rows={matrix.map((r) => [r.e, r.w, r.m, r.o, r.b])}
          caption={
            es
              ? "Valores orientativos basados en marcas de acceso habituales. Cada caso se evalúa de forma individual."
              : "Guideline values based on typical entry marks. Each case is evaluated individually."
          }
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

        <SportMethodSection
          image={methodBg}
          eyebrow={es ? "Cómo trabajamos" : "How we work"}
          title={es ? "El método" : "The FUA Sports"}
          highlight={es ? "FUA Sports" : "method"}
          subtitle={
            es
              ? "Ingeniería de reclutamiento diseñada para maximizar tu beca. Un equipo contigo en cada paso, desde tu primera marca hasta tu primer día en el campus."
              : "Recruitment engineering designed to maximize your scholarship. A team by your side at every step, from your first mark to your first day on campus."
          }
          steps={
            es
              ? [
                  { icon: ClipboardCheck, title: "Validación técnica", desc: "Diagnóstico gratuito de tus marcas y nivel académico para crear un plan personalizado según tus objetivos.", points: ["Análisis de marcas", "Proyección por división", "Plan a medida"] },
                  { icon: ShieldCheck, title: "Blindaje académico", desc: "Preparamos tu expediente para que ninguna universidad te descarte por papeles.", points: ["Traducción de notas", "Elegibilidad NCAA / NAIA", "TOEFL / Duolingo"] },
                  { icon: Megaphone, title: "Exposición a entrenadores", desc: "Perfil profesional, video de pruebas y contacto directo con entrenadores de programas afines a tu nivel.", points: ["Perfil y highlights", "+1,000 programas", "Seguimiento semanal"] },
                  { icon: HandCoins, title: "Negociación financiera", desc: "Comparamos ofertas y negociamos para asegurar el paquete más alto combinando beca deportiva y académica.", points: ["Comparativa de ofertas", "Beca deportiva + académica", "Firma del NLI"] },
                  { icon: PlaneTakeoff, title: "Llegada al campus", desc: "Te acompañamos en visado, viaje y adaptación para que llegues listo para competir desde el primer día.", points: ["Visado F-1", "Logística de viaje", "Soporte en EE.UU."] },
                ]
              : [
                  { icon: ClipboardCheck, title: "Technical validation", desc: "Free diagnosis of your marks and academic level to build a personalized plan around your goals.", points: ["Mark analysis", "Division projection", "Custom plan"] },
                  { icon: ShieldCheck, title: "Academic lockdown", desc: "We prepare your file so no university rules you out on paperwork.", points: ["Grade translation", "NCAA / NAIA eligibility", "TOEFL / Duolingo"] },
                  { icon: Megaphone, title: "Coach exposure", desc: "Professional profile, race video and direct contact with coaches from programs matching your level.", points: ["Profile & highlights", "1,000+ programs", "Weekly follow-up"] },
                  { icon: HandCoins, title: "Financial negotiation", desc: "We compare offers and negotiate to secure the highest package combining athletic and academic aid.", points: ["Offer comparison", "Athletic + academic aid", "NLI signing"] },
                  { icon: PlaneTakeoff, title: "Arrival on campus", desc: "We guide you through visa, travel and adaptation so you arrive ready to compete from day one.", points: ["F-1 visa", "Travel logistics", "U.S. support"] },
                ]
          }
        />

        <ScholarshipCoverage
          eyebrow={es ? "Qué cubre tu beca" : "What your scholarship covers"}
          title={es ? "¿Qué incluye una" : "What an"}
          highlight={es ? "beca de élite?" : "elite scholarship includes"}
          cards={
            es
              ? [
                  { icon: GraduationCap, title: "Cobertura académica", desc: "Tu carrera universitaria financiada y con apoyo para rendir en clase.", items: ["Pago de matrícula y créditos", "Materiales de estudio", "Centros de tutoría privada para atletas"] },
                  { icon: Trophy, title: "Rendimiento deportivo", desc: "Todo lo necesario para competir al máximo nivel universitario.", items: ["Coaching de nivel olímpico", "Instalaciones de última tecnología", "Indumentaria Nike / Adidas / Puma", "Fisioterapia y nutrición deportiva"] },
                  { icon: Home, title: "Costos de vida", desc: "Vive en el campus sin preocuparte por los gastos del día a día.", items: ["Alojamiento en residencias oficiales", "Plan de comidas completo", "Logística de competencia: viajes y hoteles"] },
                ]
              : [
                  { icon: GraduationCap, title: "Academic coverage", desc: "Your university degree funded, with support to perform in class.", items: ["Tuition and credits", "Study materials", "Private tutoring centers for athletes"] },
                  { icon: Trophy, title: "Athletic performance", desc: "Everything you need to compete at the highest college level.", items: ["Olympic-level coaching", "State-of-the-art facilities", "Nike / Adidas / Puma gear", "Physiotherapy and sports nutrition"] },
                  { icon: Home, title: "Living costs", desc: "Live on campus without worrying about everyday expenses.", items: ["Official housing residences", "Complete meal plan", "Competition logistics: travel and hotels"] },
                ]
          }
        />

        {/* Requirements + Day — white */}
        <SportSection bg="hsl(var(--background))">
          <SectionTitle>{es ? "Requisitos y Vida Diaria" : "Requirements & Daily Life"}</SectionTitle>
          <div className="grid md:grid-cols-2 gap-8 mb-10">
            <div>
              <h3 className="font-display text-xl font-bold mb-5" style={{ color: NAVY }}>
                {es ? "Filtro de Selección" : "Selection Filter"}
              </h3>
              <div className="space-y-4">
                <div className="rounded-xl p-5 border" style={{ borderColor: "hsl(var(--border))", backgroundColor: LIGHT }}>
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
                <div className="rounded-xl p-5 border" style={{ borderColor: "hsl(var(--border))", backgroundColor: LIGHT }}>
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
                    ? "Si no cumples algún requisito, FUA Sports diseña un plan de preparación personalizado."
                    : "If you don't meet a requirement, FUA Sports designs a custom preparation plan."}
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
                    style={{ borderColor: "hsl(var(--border))", backgroundColor: LIGHT }}
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
