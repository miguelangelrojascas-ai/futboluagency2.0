import { ClipboardCheck, Video, Users, FileCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import cardBgEvaluation from "@/assets/card-bg-evaluation-new.jpg";
import cardBgProfile from "@/assets/card-bg-profile.jpg";
import cardBgCoaches from "@/assets/card-bg-coaches-new.jpg";
import cardBgVisas from "@/assets/card-bg-visas.jpg";

interface CTASectionProps {
  onOpenForm: () => void;
}

const CTASection = ({ onOpenForm }: CTASectionProps) => {
  const { t } = useLanguage();
  const services = [
    {
      icon: ClipboardCheck,
      title: t("cta.service1.title"),
      description: t("cta.service1.desc"),
      bgImage: cardBgEvaluation
    },
    {
      icon: Video,
      title: t("cta.service2.title"),
      description: t("cta.service2.desc"),
      bgImage: cardBgProfile
    },
    {
      icon: Users,
      title: t("cta.service3.title"),
      description: t("cta.service3.desc"),
      bgImage: cardBgCoaches
    },
    {
      icon: FileCheck,
      title: t("cta.service4.title"),
      description: t("cta.service4.desc"),
      bgImage: cardBgVisas
    }
  ];

  return (
    <section className="section-padding bg-background">
      <div className="container-wide px-4">
        <div className="max-w-4xl mx-auto text-center mb-8 sm:mb-12">
          {/* Headline */}
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 px-2">
            {t("cta.headline")}{" "}
            <span className="text-primary italic">{t("cta.headline.highlight")}</span>
          </h2>

          {/* Subheadline */}
          <p className="font-body text-muted-foreground text-base sm:text-lg md:text-xl">
            {t("cta.subheadline")}
          </p>
        </div>

        {/* 2x2 Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 max-w-5xl mx-auto">
          {services.map((service, index) => (
            <div
              key={index}
              className="relative overflow-hidden rounded-xl min-h-[240px] sm:min-h-[280px] group"
            >
              {/* Background Image */}
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                style={{ backgroundImage: `url(${service.bgImage})` }}
              />
              
              {/* Dark Overlay */}
              <div className="absolute inset-0 bg-background/92" />
              
              {/* Content */}
              <div className="relative h-full flex flex-col justify-end p-6 sm:p-8">
                {/* Icon */}
                <div className="mb-3 sm:mb-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-[hsl(210,100%,50%)]/20 border border-[hsl(210,100%,50%)]/40 flex items-center justify-center backdrop-blur-sm">
                    <service.icon className="w-5 h-5 sm:w-6 sm:h-6 text-[hsl(210,100%,50%)]" />
                  </div>
                </div>

                <h3 className="font-display text-lg sm:text-xl font-bold text-foreground mb-2">
                  {service.title}
                </h3>
                <p className="font-body text-foreground/70 text-xs sm:text-sm leading-relaxed">
                  {service.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <div className="text-center mt-8 sm:mt-12">
          <Button
            variant="ctaLarge"
            size="ctaXl"
            className="w-full sm:w-auto min-h-[70px] sm:min-h-[80px] px-8 sm:px-16"
            onClick={onOpenForm}
          >
            <span className="text-base sm:text-lg md:text-xl font-bold uppercase tracking-wider">{t("video.cta.title")}</span>
            <span className="text-xs sm:text-sm md:text-base font-normal opacity-90">{t("video.cta.subtitle")}</span>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
