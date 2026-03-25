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
