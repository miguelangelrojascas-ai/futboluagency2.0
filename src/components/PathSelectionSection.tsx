import { Link } from "react-router-dom";
import { ArrowRight, GraduationCap, Trophy } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const PathSelectionSection = () => {
  const { t } = useLanguage();

  return (
    <section id="path-selection" className="section-padding" style={{ backgroundColor: "#ffffff" }}>
      <div className="container-wide px-4">
        <div className="text-center mb-10 sm:mb-14">
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
            {t("path.title")} <span className="text-primary italic">{t("path.title.highlight")}</span>
          </h2>
          <p className="font-body text-muted-foreground text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
            {t("path.subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {/* USA Path */}
          <Link
            to="/usa"
            className="group relative overflow-hidden rounded-2xl border border-border bg-card p-8 sm:p-10 transition-all duration-300 hover:border-[hsl(210,100%,50%)]/50 hover:shadow-lg hover:shadow-[hsl(210,100%,50%)]/10"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-[hsl(210,100%,50%)]/5 rounded-bl-full" />
            <div className="relative">
              <div className="w-14 h-14 rounded-xl bg-[hsl(210,100%,50%)]/15 border border-[hsl(210,100%,50%)]/30 flex items-center justify-center mb-6">
                <GraduationCap className="w-7 h-7 text-[hsl(210,100%,50%)]" />
              </div>
              <h3 className="font-display text-xl sm:text-2xl font-bold text-foreground mb-3">
                {t("path.usa.title")}
              </h3>
              <p className="font-body text-muted-foreground text-base mb-6 leading-relaxed">
                {t("path.usa.desc")}
              </p>
              <span className="inline-flex items-center gap-2 font-body text-sm font-semibold text-[hsl(210,100%,50%)] group-hover:gap-3 transition-all">
                {t("path.usa.cta")} <ArrowRight className="w-4 h-4" />
              </span>
            </div>
          </Link>

          {/* Spain Path */}
          <Link
            to="/spain"
            className="group relative overflow-hidden rounded-2xl border border-border bg-card p-8 sm:p-10 transition-all duration-300 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full" />
            <div className="relative">
              <div className="w-14 h-14 rounded-xl bg-primary/15 border border-primary/30 flex items-center justify-center mb-6">
                <Trophy className="w-7 h-7 text-primary" />
              </div>
              <h3 className="font-display text-xl sm:text-2xl font-bold text-foreground mb-3">
                {t("path.spain.title")}
              </h3>
              <p className="font-body text-muted-foreground text-base mb-6 leading-relaxed">
                {t("path.spain.desc")}
              </p>
              <span className="inline-flex items-center gap-2 font-body text-sm font-semibold text-primary group-hover:gap-3 transition-all">
                {t("path.spain.cta")} <ArrowRight className="w-4 h-4" />
              </span>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default PathSelectionSection;
