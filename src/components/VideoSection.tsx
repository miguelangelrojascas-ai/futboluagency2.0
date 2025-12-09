import { Button } from "@/components/ui/button";

const CALENDLY_URL = "https://calendly.com/miguelangelrojascas/new-meeting";

const VideoSection = () => {
  return (
    <section id="video-section" className="bg-background-alt section-padding">
      <div className="container-wide">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold">
            Mira el <span className="text-primary italic">Vídeo</span>
          </h2>
        </div>

        {/* Video Container */}
        <div className="max-w-4xl mx-auto">
          <div className="relative aspect-video rounded-xl border border-border overflow-hidden bg-card shadow-card">
            <iframe
              src="https://www.youtube.com/embed/0-dWsUxiYkI"
              title="FutbolUAgency - Video explicativo"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 w-full h-full"
            />
          </div>

          {/* CTA Button */}
          <div className="text-center mt-10">
            <Button
              variant="cta"
              size="xl"
              asChild
            >
              <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer">
                Agenda tu llamada. Sesión 1-1 para evaluar tu caso
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VideoSection;