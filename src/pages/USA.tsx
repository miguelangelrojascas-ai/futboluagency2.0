import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle, GraduationCap, Shield, BookOpen, Clock, DollarSign } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProcessSection from "@/components/ProcessSection";
import HubSpotFormModal from "@/components/HubSpotFormModal";
import { useHubSpotForm } from "@/hooks/useHubSpotForm";

const USA = () => {
  const { t } = useLanguage();
  const { isOpen, openForm, setIsOpen } = useHubSpotForm();

  const divisions = [
    { name: "NCAA Division I", desc: t("usa.ncaa.d1"), level: t("usa.level.highest") },
    { name: "NCAA Division II", desc: t("usa.ncaa.d2"), level: t("usa.level.high") },
    { name: "NAIA", desc: t("usa.ncaa.naia"), level: t("usa.level.competitive") },
    { name: "JUCO", desc: t("usa.ncaa.juco"), level: t("usa.level.development") },
  ];

  const requirements = [
    { icon: Shield, text: t("usa.req.level") },
    { icon: BookOpen, text: t("usa.req.english") },
    { icon: GraduationCap, text: t("usa.req.academics") },
    { icon: Clock, text: t("usa.req.age") },
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
            src="/videos/spain-hero.mp4"
          />
          <div className="absolute inset-0 bg-[#0f0f0f]/80" />
          <div className="container-wide px-4 relative">
            <div className="max-w-4xl mx-auto text-center section-padding">
              <span className="inline-block mb-4 text-blue-500 font-body text-xs tracking-[0.15em] uppercase">
                {t("usa.tag")}
              </span>
              <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
                {t("usa.hero.title")} <span className="text-blue-500 italic">{t("usa.hero.highlight")}</span>
              </h1>
              <p className="font-body font-medium text-gray-300 text-lg max-w-2xl mx-auto mb-8 leading-relaxed">
                {t("usa.hero.desc")}
              </p>
              <Link
                to="/apply"
                className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-body font-semibold px-8 py-3.5 rounded-lg transition-colors text-sm sm:text-base"
              >
                {t("nav.applyCta")} <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </section>

        {/* U.S. System Explained */}
        <section className="section-padding bg-background">
          <div className="container-wide px-4">
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-10">
              {t("usa.system.title")}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 max-w-6xl mx-auto">
              {divisions.map((div) => (
                <div key={div.name} className="rounded-xl border border-border bg-[#141414] p-6 hover:border-blue-500/40 transition-colors ring-1 ring-blue-500/30 shadow-[0_0_40px_rgba(37,99,235,0.15)]">
                  <span className="inline-block text-xs font-body font-medium tracking-[0.15em] uppercase text-blue-500 bg-blue-500/10 px-3 py-1 rounded-full mb-3">
                    {div.level}
                  </span>
                  <h3 className="font-display text-lg font-bold mb-2">{div.name}</h3>
                  <p className="font-body text-muted-foreground text-base leading-relaxed">{div.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Recruitment Process Steps */}
        <section className="section-padding bg-background">
          <div className="container-wide px-4">
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-10">
              {t("usa.process.title")}
            </h2>
            <div className="max-w-3xl mx-auto space-y-6">
              {steps.map((step) => (
                <div key={step.num} className="flex gap-5 items-start">
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-blue-600/15 border border-blue-500/30 flex items-center justify-center font-display font-bold text-blue-500 text-sm">
                    {step.num}
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-bold mb-1">{step.title}</h3>
                    <p className="font-body text-muted-foreground text-base leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Requirements */}
        <section className="section-padding bg-background">
          <div className="container-wide px-4">
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-10">
              {t("usa.req.title")}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-3xl mx-auto">
              {requirements.map((req, i) => (
                <div key={i} className="flex items-center gap-4 rounded-xl border border-border bg-[#141414] p-5 ring-1 ring-blue-500/10 shadow-[0_0_20px_rgba(37,99,235,0.08)]">
                  <req.icon className="w-6 h-6 text-blue-500 flex-shrink-0" />
                  <span className="font-body text-sm text-foreground">{req.text}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Scholarship Info */}
        <section className="section-padding bg-background">
          <div className="container-wide px-4">
            <div className="max-w-3xl mx-auto text-center">
              <DollarSign className="w-12 h-12 text-blue-500 mx-auto mb-4" />
              <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
                {t("usa.scholarship.title")}
              </h2>
              <p className="font-body text-muted-foreground text-base sm:text-lg leading-relaxed mb-6">
                {t("usa.scholarship.desc")}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="rounded-xl border border-border bg-[#141414] p-6">
                  <h3 className="font-display text-lg font-bold text-blue-500 mb-2">{t("usa.scholarship.partial")}</h3>
                  <p className="font-body text-muted-foreground text-base leading-relaxed">{t("usa.scholarship.partial.desc")}</p>
                </div>
                <div className="rounded-xl border border-blue-500/30 bg-blue-600/5 p-6 ring-1 ring-blue-500/30 shadow-[0_0_40px_rgba(37,99,235,0.15)]">
                  <h3 className="font-display text-lg font-bold text-blue-500 mb-2">{t("usa.scholarship.full")}</h3>
                  <p className="font-body text-muted-foreground text-base leading-relaxed">{t("usa.scholarship.full.desc")}</p>
                </div>
              </div>
            </div>
          </div>
        </section>


        {/* Process Section */}
        <ProcessSection />

        {/* CTA */}
        <section className="section-padding bg-background">
          <div className="container-wide px-4 text-center">
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
              {t("usa.cta.title")}
            </h2>
            <p className="font-body text-muted-foreground text-base sm:text-lg leading-relaxed max-w-2xl mx-auto mb-8">
              {t("usa.cta.desc")}
            </p>
            <Link
              to="/apply"
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-body font-semibold px-10 py-4 rounded-lg transition-colors text-base sm:text-lg"
            >
              {t("nav.applyCta")} <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </section>

        <Footer />
        <HubSpotFormModal open={isOpen} onOpenChange={setIsOpen} />
      </main>
    </>
  );
};

export default USA;
