// Spain page
import { Link } from "react-router-dom";
import { ArrowRight, Trophy, Sun, Users, Target, Zap, Circle, Eye, Timer, Building2, Dumbbell, Swords, ScanEye } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";


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
        {/* Hero */}
        <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
            src="/videos/spain-hero-new.mov"
          />
          <div className="absolute inset-0 bg-background/70" />
          <div className="container-wide px-4 relative">
            <div className="max-w-4xl mx-auto text-center section-padding">
              <span className="inline-block mb-4 text-primary font-body text-xs tracking-[0.2em] uppercase">
                {t("spain.tag")}
              </span>
              <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                {language === "es" ? "Juega en las Mejores Academias de Fútbol" : "Play in Top Football Academies"}{" "}
                <span className="text-primary italic">{language === "es" ? "en España" : "in Spain"}</span>
              </h1>
              <p className="font-body text-muted-foreground text-base sm:text-lg md:text-xl max-w-3xl mx-auto mb-8">
                {language === "es"
                  ? "España es uno de los mejores entornos del mundo para desarrollarte como futbolista. Nuestro programa ofrece a jugadores internacionales la oportunidad de entrenar, competir y crecer en academias de alto nivel durante toda la temporada."
                  : "Spain is one of the best environments in the world to develop as a football player. Our program gives international players the opportunity to train, compete, and grow in high-level football academies throughout the full season."}
              </p>
              <Link
                to="/apply"
                className="inline-flex items-center gap-2 bg-primary hover:bg-primary-hover text-primary-foreground font-body font-semibold px-8 py-3.5 rounded-lg transition-colors text-sm sm:text-base"
              >
                {t("nav.applyCta")} <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </section>

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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
              {[
                {
                  icon: Circle,
                  title: language === "es" ? "Nivel competitivo real" : "Real competitive level",
                  desc: language === "es"
                    ? "Entrena y compite en un entorno donde el ritmo y la exigencia son de alto nivel."
                    : "Train and compete in an environment where pace and demands are top-tier.",
                },
                {
                  icon: Eye,
                  title: language === "es" ? "Visibilidad ante entrenadores" : "Visibility to coaches",
                  desc: language === "es"
                    ? "Muéstrate frente a academias y entrenadores que buscan talento."
                    : "Showcase yourself to academies and coaches scouting for talent.",
                },
                {
                  icon: Timer,
                  title: language === "es" ? "Experiencia intensiva" : "Intensive experience",
                  desc: language === "es"
                    ? "Semanas de alto nivel donde cada entrenamiento y partido cuenta."
                    : "High-level weeks where every training session and match counts.",
                },
                {
                  icon: Building2,
                  title: language === "es" ? "Entorno profesional" : "Professional environment",
                  desc: language === "es"
                    ? "Vive el día a día del fútbol competitivo en España."
                    : "Experience day-to-day competitive football life in Spain.",
                },
              ].map((card, i) => {
                const IconComponent = card.icon;
                return (
                  <div
                    key={i}
                    className="rounded-xl border border-border bg-card p-7 hover:-translate-y-1 hover:shadow-lg transition-all duration-300"
                  >
                    <div className="w-11 h-11 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center mb-5">
                      <IconComponent className="w-5 h-5 text-primary" strokeWidth={1.5} />
                    </div>
                    <h3 className="font-display text-base font-bold mb-2 text-foreground">{card.title}</h3>
                    <p className="font-body text-muted-foreground text-sm leading-relaxed">{card.desc}</p>
                  </div>
                );
              })}
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
