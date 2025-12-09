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
          <div className="relative aspect-video rounded-xl border border-border overflow-hidden bg-card shadow-card">
            <iframe
              src="https://www.youtube.com/embed/0-dWsUxiYkI"
              title="FutbolUAgency - Video explicativo"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 w-full h-full"
            />
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
