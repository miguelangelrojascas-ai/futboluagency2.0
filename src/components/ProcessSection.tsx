import { useEffect, useRef, useState } from "react";
import { ClipboardCheck, Video, Users, Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

const CALENDLY_URL = "https://calendly.com/miguelangelrojascas/new-meeting";

const ProcessSection = () => {
  const { t } = useLanguage();
  const [activeStep, setActiveStep] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<(HTMLDivElement | null)[]>([]);

  const steps = [
    {
      icon: ClipboardCheck,
      title: t("process.step1.title"),
      description: t("process.step1.desc"),
    },
    {
      icon: Video,
      title: t("process.step2.title"),
      description: t("process.step2.desc"),
    },
    {
      icon: Users,
      title: t("process.step3.title"),
      description: t("process.step3.desc"),
    },
    {
      icon: Trophy,
      title: t("process.step4.title"),
      description: t("process.step4.desc"),
    },
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;

      stepsRef.current.forEach((stepEl, index) => {
        if (!stepEl) return;
        const rect = stepEl.getBoundingClientRect();
        const viewportCenter = window.innerHeight / 2;
        
        if (rect.top <= viewportCenter && rect.bottom >= viewportCenter) {
          setActiveStep(index);
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section ref={sectionRef} className="relative bg-background overflow-hidden">
      {/* Textured gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-[hsl(210,100%,50%)]/5 pointer-events-none" />
      
      {/* Grid texture overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px'
        }}
      />
      
      {/* Radial glow accents */}
      <div className="absolute top-1/4 -left-32 w-64 h-64 bg-[hsl(210,100%,50%)]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-32 w-64 h-64 bg-primary/10 rounded-full blur-3xl pointer-events-none" />

      <div className="container-wide relative px-4">
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-16">
          {/* Sticky Title Card */}
          <div className="lg:w-[380px] lg:flex-shrink-0">
            <div className="lg:sticky lg:top-32">
              <div className="rounded-xl border-2 border-[hsl(210,100%,50%)]/30 bg-gradient-to-br from-[hsl(210,100%,50%)]/10 via-card/50 to-[hsl(210,100%,50%)]/5 backdrop-blur-sm p-6 sm:p-8 text-center shadow-lg shadow-[hsl(210,100%,50%)]/10">
                <h2 className="font-display text-xl sm:text-2xl md:text-3xl font-bold text-[hsl(210,100%,50%)] italic mb-2 sm:mb-3">
                  {t("process.title")}
                </h2>
                <p className="font-body text-foreground/80 text-sm sm:text-base">
                  {t("process.subtitle")}
                </p>
              </div>
            </div>
          </div>

          {/* Timeline */}
          <div className="flex-1 py-12 sm:py-16 lg:py-32">
            <div className="relative">
              {/* Vertical Line */}
              <div className="absolute left-5 sm:left-6 lg:left-8 top-0 bottom-0 w-px bg-gradient-to-b from-primary/50 via-primary to-primary/50" />

              {/* Steps */}
              <div className="space-y-20 sm:space-y-32 lg:space-y-48">
                {steps.map((step, index) => (
                  <div
                    key={index}
                    ref={(el) => (stepsRef.current[index] = el)}
                    className="relative flex gap-6 sm:gap-8 lg:gap-12"
                  >
                    {/* Icon on Timeline */}
                    <div className="relative z-10 flex-shrink-0">
                      <div
                        className={`w-10 h-10 sm:w-12 sm:h-12 lg:w-16 lg:h-16 rounded-full border-2 flex items-center justify-center transition-all duration-500 ${
                          activeStep >= index
                            ? "bg-primary/20 border-primary"
                            : "bg-card border-border"
                        }`}
                      >
                        <step.icon
                          className={`w-4 h-4 sm:w-5 sm:h-5 lg:w-7 lg:h-7 transition-colors duration-500 ${
                            activeStep >= index ? "text-primary" : "text-muted-foreground"
                          }`}
                        />
                      </div>
                    </div>

                    {/* Content */}
                    <div
                      className={`flex-1 pt-1 sm:pt-2 transition-all duration-500 ${
                        activeStep >= index
                          ? "opacity-100 translate-y-0"
                          : "opacity-30 translate-y-4"
                      }`}
                    >
                      <h3 className="font-display text-lg sm:text-2xl lg:text-3xl font-bold text-foreground mb-2 sm:mb-3">
                        {t("process.phase")} {index + 1} - {step.title}
                      </h3>
                      <p className="font-body text-muted-foreground text-sm sm:text-base lg:text-lg leading-relaxed max-w-md">
                        {step.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* CTA Button - Centered */}
        <div className="text-center py-12 sm:py-16">
          <Button
            variant="ctaLarge"
            size="ctaXl"
            className="w-full sm:w-auto min-h-[70px] sm:min-h-[80px] px-8 sm:px-16"
            asChild
          >
            <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer">
              <span className="text-base sm:text-lg md:text-xl font-bold uppercase tracking-wider">{t("video.cta.title")}</span>
              <span className="text-xs sm:text-sm md:text-base font-normal opacity-90">{t("video.cta.subtitle")}</span>
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
