// Spain page
import { Link } from "react-router-dom";
import { ArrowRight, Trophy, Sun, Users, Target, Zap } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SpainAcademiesSection from "@/components/SpainAcademiesSection";

const Spain = () => {
  const { t, language } = useLanguage();

  const benefits = [
    { icon: Trophy, title: t("spain.benefit1.title"), desc: t("spain.benefit1.desc") },
    { icon: Sun, title: t("spain.benefit2.title"), desc: t("spain.benefit2.desc") },
    { icon: Users, title: t("spain.benefit3.title"), desc: t("spain.benefit3.desc") },
    { icon: Target, title: t("spain.benefit4.title"), desc: t("spain.benefit4.desc") },
  ];

  const steps = [
    { num: "01", title: t("spain.step1.title"), desc: t("spain.step1.desc") },
    { num: "02", title: t("spain.step2.title"), desc: t("spain.step2.desc") },
    { num: "03", title: t("spain.step3.title"), desc: t("spain.step3.desc") },
    { num: "04", title: t("spain.step4.title"), desc: t("spain.step4.desc") },
  ];

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-16 md:pt-20">
        {/* ¿Por qué España? */}
        <section className="section-padding bg-background">
          <div className="container-wide px-4">
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-4">
              {language === "es" ? "¿Por qué España?" : "Why Spain?"}
            </h2>
            <p className="font-body text-muted-foreground text-base sm:text-lg text-center max-w-2xl mx-auto mb-12">
              {language === "es"
                ? "Uno de los entornos más exigentes del mundo para competir, mejorar y ser visto."
                : "One of the most demanding environments in the world to compete, improve, and get noticed."}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 max-w-5xl mx-auto">
              {[
                {
                  emoji: "⚽",
                  title: language === "es" ? "Nivel competitivo real" : "Real competitive level",
                  desc: language === "es"
                    ? "Entrena y compite en un entorno donde el ritmo y la exigencia son de alto nivel."
                    : "Train and compete in an environment where pace and demands are top-tier.",
                },
                {
                  emoji: "👀",
                  title: language === "es" ? "Visibilidad ante entrenadores" : "Visibility to coaches",
                  desc: language === "es"
                    ? "Muéstrate frente a academias y entrenadores que buscan talento."
                    : "Showcase yourself to academies and coaches scouting for talent.",
                },
                {
                  emoji: "🔥",
                  title: language === "es" ? "Experiencia intensiva" : "Intensive experience",
                  desc: language === "es"
                    ? "Semanas de alto nivel donde cada entrenamiento y partido cuenta."
                    : "High-level weeks where every training session and match counts.",
                },
                {
                  emoji: "🏟️",
                  title: language === "es" ? "Entorno profesional" : "Professional environment",
                  desc: language === "es"
                    ? "Vive el día a día del fútbol competitivo en España."
                    : "Experience day-to-day competitive football life in Spain.",
                },
              ].map((card, i) => (
                <div
                  key={i}
                  className="rounded-xl border border-border bg-card p-6 hover:-translate-y-1 hover:shadow-lg transition-all duration-300"
                >
                  <span className="text-3xl mb-4 block">{card.emoji}</span>
                  <h3 className="font-display text-base font-bold mb-2">{card.title}</h3>
                  <p className="font-body text-muted-foreground text-sm leading-relaxed">{card.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>



        {/* Process */}
        <section className="section-padding bg-background-alt">
          <div className="container-wide px-4">
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-10">
              {t("spain.process.title")}
            </h2>
            <div className="max-w-3xl mx-auto space-y-6">
              {steps.map((step) => (
                <div key={step.num} className="flex gap-5 items-start">
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-primary/15 border border-primary/30 flex items-center justify-center font-display font-bold text-primary text-sm">
                    {step.num}
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-bold mb-1">{step.title}</h3>
                    <p className="font-body text-muted-foreground text-sm">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Academies Section */}
        <SpainAcademiesSection />

        <Footer />
      </main>
    </>
  );
};

// Small inline icon since we can't import GraduationCap twice with a different name
const GraduationCapIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
    <path d="M6 12v5c3 3 9 3 12 0v-5" />
  </svg>
);

export default Spain;
