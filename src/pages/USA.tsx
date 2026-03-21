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

  const steps = [
    { num: "01", title: t("usa.step1.title"), desc: t("usa.step1.desc") },
    { num: "02", title: t("usa.step2.title"), desc: t("usa.step2.desc") },
    { num: "03", title: t("usa.step3.title"), desc: t("usa.step3.desc") },
    { num: "04", title: t("usa.step4.title"), desc: t("usa.step4.desc") },
    { num: "05", title: t("usa.step5.title"), desc: t("usa.step5.desc") },
  ];

  const timeline = [
    { month: t("usa.timeline.m1"), task: t("usa.timeline.t1") },
    { month: t("usa.timeline.m2"), task: t("usa.timeline.t2") },
    { month: t("usa.timeline.m3"), task: t("usa.timeline.t3") },
    { month: t("usa.timeline.m4"), task: t("usa.timeline.t4") },
    { month: t("usa.timeline.m5"), task: t("usa.timeline.t5") },
  ];

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-16 md:pt-20">
        {/* Hero */}
        <section className="section-padding bg-background relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,hsl(210,100%,50%,0.08),transparent_60%)]" />
          <div className="container-wide px-4 relative">
            <div className="max-w-4xl mx-auto text-center">
              <span className="inline-block mb-4 text-[hsl(210,100%,50%)] font-body text-xs tracking-[0.2em] uppercase">
                {t("usa.tag")}
              </span>
              <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                {t("usa.hero.title")} <span className="text-[hsl(210,100%,50%)] italic">{t("usa.hero.highlight")}</span>
              </h1>
              <p className="font-body text-muted-foreground text-base sm:text-lg md:text-xl max-w-3xl mx-auto mb-8">
                {t("usa.hero.desc")}
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

        {/* U.S. System Explained */}
        <section className="section-padding bg-background-alt">
          <div className="container-wide px-4">
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-10">
              {t("usa.system.title")}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 max-w-6xl mx-auto">
              {divisions.map((div) => (
                <div key={div.name} className="rounded-xl border border-border bg-card p-6 hover:border-[hsl(210,100%,50%)]/40 transition-colors">
                  <span className="inline-block text-xs font-body font-medium text-[hsl(210,100%,50%)] bg-[hsl(210,100%,50%)]/10 px-3 py-1 rounded-full mb-3">
                    {div.level}
                  </span>
                  <h3 className="font-display text-lg font-bold mb-2">{div.name}</h3>
                  <p className="font-body text-muted-foreground text-sm">{div.desc}</p>
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

        {/* Requirements */}
        <section className="section-padding bg-background-alt">
          <div className="container-wide px-4">
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-10">
              {t("usa.req.title")}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-3xl mx-auto">
              {requirements.map((req, i) => (
                <div key={i} className="flex items-center gap-4 rounded-xl border border-border bg-card p-5">
                  <req.icon className="w-6 h-6 text-[hsl(210,100%,50%)] flex-shrink-0" />
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
              <DollarSign className="w-12 h-12 text-primary mx-auto mb-4" />
              <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
                {t("usa.scholarship.title")}
              </h2>
              <p className="font-body text-muted-foreground text-base sm:text-lg mb-6">
                {t("usa.scholarship.desc")}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="rounded-xl border border-border bg-card p-6">
                  <h3 className="font-display text-lg font-bold text-primary mb-2">{t("usa.scholarship.partial")}</h3>
                  <p className="font-body text-muted-foreground text-sm">{t("usa.scholarship.partial.desc")}</p>
                </div>
                <div className="rounded-xl border border-primary/30 bg-primary/5 p-6">
                  <h3 className="font-display text-lg font-bold text-primary mb-2">{t("usa.scholarship.full")}</h3>
                  <p className="font-body text-muted-foreground text-sm">{t("usa.scholarship.full.desc")}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section className="section-padding bg-background-alt">
          <div className="container-wide px-4">
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-10">
              {t("usa.timeline.title")}
            </h2>
            <div className="max-w-2xl mx-auto">
              {timeline.map((item, i) => (
                <div key={i} className="flex gap-4 items-start mb-6 last:mb-0">
                  <div className="flex flex-col items-center">
                    <div className="w-3 h-3 rounded-full bg-primary" />
                    {i < timeline.length - 1 && <div className="w-0.5 h-12 bg-border mt-1" />}
                  </div>
                  <div className="-mt-1">
                    <span className="font-body text-xs text-primary font-semibold uppercase tracking-wider">{item.month}</span>
                    <p className="font-body text-foreground text-sm mt-1">{item.task}</p>
                  </div>
                </div>
              ))}
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
            <p className="font-body text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto mb-8">
              {t("usa.cta.desc")}
            </p>
            <Link
              to="/apply"
              className="inline-flex items-center gap-2 bg-primary hover:bg-primary-hover text-primary-foreground font-body font-bold px-10 py-4 rounded-lg transition-colors text-base sm:text-lg"
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
