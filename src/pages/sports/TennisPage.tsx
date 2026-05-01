import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  SportHero,
  SportSection,
  SectionTitle,
  FeatureCard,
  ProcessStep,
  TwoCol,
  ColCard,
  FinalCTA,
  BackToSports,
  NAVY,
  RED,
  LIGHT,
} from "./_shared";

const TennisPage = () => {
  const { language } = useLanguage();
  const es = language === "es";

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-16 md:pt-20" style={{ backgroundColor: LIGHT }}>
        <BackToSports />
        <SportHero
          title={es ? "Becas de Tenis Universitario en EE.UU." : "College Tennis Scholarships in the U.S."}
          subtitle={
            es
              ? "Acompañamiento cercano para conseguir la beca que tu talento merece."
              : "Close guidance to secure the scholarship your talent deserves."
          }
          stats={[
            { value: "75–100%", label: es ? "Cobertura" : "Coverage" },
            { value: "NCAA·NAIA·NJCAA", label: es ? "Divisiones" : "Divisions" },
            { value: "100%", label: es ? "De atletas con beca" : "Of athletes get aid" },
          ]}
        />

        {/* Why */}
        <SportSection bg={LIGHT}>
          <SectionTitle>{es ? "¿Por qué el Tenis Universitario?" : "Why College Tennis?"}</SectionTitle>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            <FeatureCard
              title={es ? "Calidad Educativa" : "Educational Quality"}
              desc={es ? "Universidades reconocidas mundialmente." : "Globally recognized universities."}
            />
            <FeatureCard
              title={es ? "Entorno Profesional" : "Professional Environment"}
              desc={es ? "4–5 entrenamientos/semana, fisio, tutores." : "4–5 weekly trainings, physio, tutors."}
            />
            <FeatureCard
              title={es ? "Instalaciones profesionales" : "Professional facilities"}
              desc={es ? "Pistas indoor/outdoor de primer nivel." : "Top-tier indoor/outdoor courts."}
            />
            <FeatureCard
              title={es ? "Desarrollo personal e inglés" : "Personal growth & English"}
              desc={es ? "Inmersión total en cultura americana." : "Full immersion in American culture."}
            />
          </div>
        </SportSection>

        {/* League System */}
        <SportSection bg="#ffffff">
          <SectionTitle>{es ? "El Sistema de Ligas" : "The League System"}</SectionTitle>
          <div className="grid md:grid-cols-3 gap-5 mb-6">
            {[
              { t: "NCAA D1", d: es ? "Máximo nivel competitivo, becas completas." : "Top competitive level, full scholarships." },
              { t: "NCAA D2", d: es ? "Equilibrio académico-deportivo, becas mixtas." : "Academic-athletic balance, mixed aid." },
              { t: "NCAA D3 / NAIA", d: es ? "Flexibilidad y becas académicas atractivas." : "Flexibility and attractive academic aid." },
            ].map((c) => (
              <div key={c.t} className="rounded-xl p-7 border" style={{ backgroundColor: NAVY, borderColor: NAVY }}>
                <h3 className="font-display text-2xl font-bold text-white mb-3">{c.t}</h3>
                <p className="font-body text-sm text-white/75 leading-relaxed">{c.d}</p>
              </div>
            ))}
          </div>
          <div
            className="rounded-full px-6 py-3 inline-block font-body text-sm font-medium"
            style={{ backgroundColor: LIGHT, color: NAVY, border: `1px solid ${RED}` }}
          >
            <span style={{ color: RED }} className="font-bold">NJCAA · </span>
            {es
              ? "Junior College: 2 años, requisitos accesibles, posibilidad de transferencia."
              : "Junior College: 2 years, accessible requirements, transfer pathway."}
          </div>
        </SportSection>

        {/* Financial reality */}
        <SportSection bg={LIGHT}>
          <SectionTitle>{es ? "Realidad Financiera" : "Financial Reality"}</SectionTitle>
          <TwoCol>
            <ColCard
              title={es ? "Beca Deportiva" : "Athletic Scholarship"}
              items={
                es
                  ? ["Ranking nacional / internacional", "UTR / ITF", "Potencial competitivo"]
                  : ["National / international ranking", "UTR / ITF", "Competitive potential"]
              }
            />
            <ColCard
              title={es ? "Beca Académica" : "Academic Scholarship"}
              items={
                es
                  ? ["GPA del bachillerato", "Nivel de inglés (Duolingo / TOEFL)", "Historial académico"]
                  : ["High school GPA", "English level (Duolingo / TOEFL)", "Academic record"]
              }
            />
          </TwoCol>
          <div
            className="mt-8 rounded-xl p-6 text-center font-display text-xl sm:text-2xl font-bold"
            style={{ backgroundColor: RED, color: "white" }}
          >
            {es
              ? "100% de atletas FUA obtienen becas 75% – 100%"
              : "100% of FUA athletes get 75% – 100% scholarships"}
          </div>
          <div className="mt-6 text-center font-body text-base sm:text-lg" style={{ color: NAVY }}>
            <span className="opacity-60">{es ? "Sin beca: " : "Without aid: "}</span>
            <span className="font-bold">$20k – $40k</span>
            <span className="mx-3" style={{ color: RED }}>→</span>
            <span className="opacity-60">{es ? "Con FUA: " : "With FUA: "}</span>
            <span className="font-bold">$6k – $12k</span>
          </div>
        </SportSection>

        {/* Process */}
        <SportSection bg="#ffffff">
          <SectionTitle>{es ? "El Proceso FUA" : "The FUA Process"}</SectionTitle>
          <div className="grid md:grid-cols-2 gap-5">
            {(es
              ? [
                  "Evaluación del atleta",
                  "Preparación del perfil y video highlights",
                  "Contacto con universidades",
                  "Recepción y elección de oferta",
                  "Admisión y Visa",
                  "Viaje a Estados Unidos",
                ]
              : [
                  "Athlete evaluation",
                  "Profile and highlight video preparation",
                  "Contacting universities",
                  "Receiving and choosing offers",
                  "Admission & Visa",
                  "Travel to the United States",
                ]
            ).map((title, i) => (
              <ProcessStep key={title} n={i + 1} title={title} />
            ))}
          </div>
        </SportSection>

        {/* Student-athlete life */}
        <SportSection bg={LIGHT}>
          <SectionTitle>{es ? "Vida del Estudiante-Atleta" : "Student-Athlete Life"}</SectionTitle>
          <div className="grid md:grid-cols-2 gap-5">
            <ColCard
              title="On Campus"
              items={
                es
                  ? ["Residencia universitaria", "Comunidad inmersiva", "Acceso a instalaciones"]
                  : ["University housing", "Immersive community", "Facility access"]
              }
            />
            <ColCard
              title="Off Campus"
              items={
                es
                  ? ["Apartamento compartido", "Mayor independencia", "Para upperclassmen"]
                  : ["Shared apartment", "More independence", "For upperclassmen"]
              }
            />
            <ColCard
              title="Meal Plan"
              items={
                es
                  ? ["Comedor universitario", "Opciones balanceadas", "Incluido en la beca"]
                  : ["Campus dining", "Balanced options", "Included in aid"]
              }
            />
            <ColCard
              title={es ? "Seguro Médico" : "Medical Insurance"}
              items={
                es
                  ? ["Visitas médicas", "Lesiones deportivas", "Fisioterapia", "Urgencias", "Medicamentos"]
                  : ["Medical visits", "Sports injuries", "Physical therapy", "Emergencies", "Medications"]
              }
            />
          </div>
        </SportSection>

        <FinalCTA
          label={es ? "Agenda tu Evaluación Gratuita" : "Schedule Your Free Evaluation"}
          sub={
            es
              ? "Conversemos sobre tu camino al tenis universitario."
              : "Let's discuss your path to college tennis."
          }
        />
        <Footer />
      </main>
    </>
  );
};

export default TennisPage;
