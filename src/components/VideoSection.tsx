import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

interface VideoSectionProps {
  onOpenForm: () => void;
}

const VideoSection = ({ onOpenForm }: VideoSectionProps) => {
  const { t } = useLanguage();
  return (
    <section id="video-section" className="section-padding" style={{ backgroundColor: "#ffffff" }}>
      <div className="container-wide">
        {/* Section Header */}
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold px-2">
            {t("video.title")} <span className="text-primary italic">{t("video.title.highlight")}</span>
          </h2>
        </div>

        {/* Video Container */}
        <div className="max-w-4xl mx-auto px-2">
          <div className="relative">
            {/* Blue glow effect */}
            <div className="absolute -inset-4 bg-[hsl(210,100%,50%)]/25 rounded-2xl blur-xl opacity-70" />
            <div className="relative aspect-video rounded-xl border-2 border-[hsl(210,100%,50%)]/40 overflow-hidden bg-card shadow-2xl shadow-[hsl(210,100%,50%)]/20">
              <iframe
                src="https://www.youtube.com/embed/0-dWsUxiYkI"
                title="FutbolUAgency - Video explicativo"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 w-full h-full"
              />
            </div>
          </div>

          {/* CTA Button */}
          <div className="text-center mt-8 sm:mt-10">
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
      </div>
    </section>
  );
};

export default VideoSection;