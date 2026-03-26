import { useLanguage } from "@/contexts/LanguageContext";
import anderCommitted from "@/assets/ander-committed.jpg";

const SpainAnderTestimonial = () => {
  const { language } = useLanguage();
  const isEs = language === "es";

  return (
    <section className="section-padding" style={{ backgroundColor: "#0f0f0f" }}>
      <div className="container-wide px-4">
        <div className="max-w-[1100px] mx-auto">
          <div className="rounded-xl border border-border bg-card overflow-hidden flex flex-col sm:flex-row">
            <div className="sm:w-48 md:w-56 flex-shrink-0">
              <img
                src={anderCommitted}
                alt="Ander González"
                className="w-full h-48 sm:h-full object-cover"
              />
            </div>
            <div className="p-6 sm:p-8 flex flex-col justify-center">
              <blockquote className="font-display text-lg sm:text-xl italic text-foreground/90 mb-4 leading-relaxed">
                "{isEs
                  ? "Entrenar en España me preparó para competir al más alto nivel. Sin esta experiencia, no habría llegado a una beca NCAA D1."
                  : "Training in Spain prepared me to compete at the highest level. Without this experience, I wouldn't have earned an NCAA D1 scholarship."}"
              </blockquote>
              <div>
                <p className="font-body text-sm font-medium text-foreground">Ander González</p>
                <p className="font-body text-xs text-muted-foreground">
                  St. John's University — NCAA D1
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SpainAnderTestimonial;
