import { Play } from "lucide-react";

const VideoSection = () => {
  return (
    <section id="video-section" className="bg-background-alt section-padding">
      <div className="container-wide">
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="text-primary font-body text-sm tracking-[0.2em] uppercase mb-4 block">
            Paso 1
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold">
            Mira el <span className="text-primary italic">Vídeo</span>
          </h2>
        </div>

        {/* Video Container */}
        <div className="max-w-4xl mx-auto">
          <div className="relative aspect-video rounded-xl border border-border overflow-hidden bg-card shadow-card group cursor-pointer">
            {/* Video Placeholder - Replace with actual video */}
            <div className="absolute inset-0 bg-gradient-to-br from-card to-background flex items-center justify-center">
              <div className="w-20 h-20 md:w-24 md:h-24 bg-primary rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-glow">
                <Play className="w-8 h-8 md:w-10 md:h-10 text-primary-foreground fill-current ml-1" />
              </div>
            </div>
            
            {/* Video embed placeholder text */}
            <div className="absolute bottom-4 left-4 right-4 text-center">
              <p className="text-muted-foreground text-sm font-body">
                Video VSL - Haz clic para reproducir
              </p>
            </div>
          </div>

          {/* Description */}
          <p className="text-center text-muted-foreground font-body mt-8 text-lg max-w-2xl mx-auto">
            Este video te muestra cómo funciona el proceso y si calificas para una beca.
          </p>
        </div>
      </div>
    </section>
  );
};

export default VideoSection;
