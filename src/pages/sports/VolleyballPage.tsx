import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";
import sportVolleyball from "@/assets/sport-volleyball.png";
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

const VolleyballPage = () => {
  const { language } = useLanguage();
  const es = language === "es";

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-16 md:pt-20" style={{ backgroundColor: LIGHT }}>
        <BackToSports />
        <SportHero
          title={es ? "Becas de Voleibol Universitario en EE.UU." : "College Volleyball Scholarships in the U.S."}
          subtitle={
            es
              ? "Combina tu pasión por el voleibol con una educación universitaria de calidad."
              : "Combine your passion for volleyball with a top-tier university education."
          }
          stats={[
            { value: "75–100%", label: es ? "Cobertura de beca" : "Scholarship coverage" },
            { value: "NCAA D1·D2·D3·NAIA", label: es ? "Divisiones" : "Divisions" },
            { value: es ? "Gratis" : "Free", label: es ? "Evaluación inicial" : "Initial evaluation" },
          ]}
        />

        {/* Why */}
        <SportSection bg={LIGHT}>
          <SectionTitle>{es ? "¿Por qué el Voleibol Universitario?" : "Why College Volleyball?"}</SectionTitle>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            <FeatureCard
              title={es ? "Educación de alta calidad" : "High-quality education"}
              desc={es ? "Universidades reconocidas internacionalmente." : "Internationally recognized universities."}
            />
            <FeatureCard
              title={es ? "Entrenamiento diario de alto nivel" : "Daily high-level training"}
              desc={es ? "Coaches certificados y staff completo." : "Certified coaches and complete staff."}
            />
            <FeatureCard
              title={es ? "Instalaciones profesionales" : "Professional facilities"}
              desc={es ? "Pabellones, gimnasios y servicios médicos." : "Arenas, gyms and medical services."}
            />
            <FeatureCard
              title={es ? "Competición organizada y exigente" : "Organized, demanding competition"}
              desc={es ? "Calendarios oficiales NCAA / NAIA." : "Official NCAA / NAIA calendars."}
            />
          </div>
        </SportSection>

        {/* League system */}
        <SportSection bg="#ffffff">
          <SectionTitle>{es ? "El Sistema de Ligas" : "The League System"}</SectionTitle>
          <div className="grid md:grid-cols-3 gap-5 mb-6">
            {[
              { t: "NCAA D1", d: es ? "Nivel más alto, becas deportivas importantes." : "Top level, major athletic scholarships." },
              { t: "NCAA D2", d: es ? "Equilibrio deporte / estudios, becas deportivas y académicas." : "Sport/study balance, athletic + academic aid." },
              { t: "NAIA", d: es ? "Nivel competitivo, más flexibilidad en admisiones." : "Competitive level, more admissions flexibility." },
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

        {/* Scholarships */}
        <SportSection bg={LIGHT}>
          <SectionTitle>{es ? "Cómo Funcionan las Becas" : "How Scholarships Work"}</SectionTitle>
          <TwoCol>
            <ColCard
              title={es ? "Beca Deportiva" : "Athletic Scholarship"}
              items={
                es
                  ? ["Basada en nivel de juego", "Rendimiento competitivo", "Actitud y compromiso", "Potencial de desarrollo"]
                  : ["Based on playing level", "Competitive performance", "Attitude and commitment", "Development potential"]
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
              ? "TODOS nuestros atletas obtienen becas entre 75% – 100%"
              : "ALL our athletes get scholarships between 75% – 100%"}
          </div>
          <div className="mt-6 text-center font-body text-base sm:text-lg" style={{ color: NAVY }}>
            <span className="opacity-60">{es ? "Sin beca: " : "Without scholarship: "}</span>
            <span className="font-bold">$20k – $40k / {es ? "año" : "year"}</span>
            <span className="mx-3" style={{ color: RED }}>→</span>
            <span className="opacity-60">{es ? "Con FUA Sports: " : "With FUA Sports: "}</span>
            <span className="font-bold">$6k – $12k / {es ? "año" : "year"}</span>
          </div>
        </SportSection>

        {/* Process */}
        <SportSection bg="#ffffff">
          <SectionTitle>{es ? "El Proceso FUA Sports" : "The FUA Sports Process"}</SectionTitle>
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
          <TwoCol>
            <ColCard
              title={es ? "Vivir On Campus" : "Living On Campus"}
              items={
                es
                  ? ["Residencia universitaria", "Comunidad inmersiva 24/7", "Acceso directo a instalaciones"]
                  : ["University housing", "Immersive 24/7 community", "Direct access to facilities"]
              }
            />
            <ColCard
              title={es ? "Vivir Off Campus" : "Living Off Campus"}
              items={
                es
                  ? ["Apartamento compartido", "Mayor independencia", "Generalmente para upperclassmen"]
                  : ["Shared apartment", "More independence", "Usually for upperclassmen"]
              }
            />
          </TwoCol>
          <div className="mt-6">
            <TwoCol>
              <ColCard
                title={es ? "Meal Plan" : "Meal Plan"}
                items={
                  es
                    ? ["Comedor universitario", "Opciones balanceadas", "Incluido en la beca"]
                    : ["Campus dining hall", "Balanced options", "Included in scholarship"]
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
            </TwoCol>
          </div>
        </SportSection>

        <FinalCTA
          label={es ? "Agenda tu Evaluación Gratuita" : "Schedule Your Free Evaluation"}
          sub={
            es
              ? "Sesión 1 a 1 con nuestro equipo para evaluar tu caso."
              : "1-on-1 session with our team to evaluate your case."
          }
        />
        <Footer />
      </main>
    </>
  );
};

export default VolleyballPage;
