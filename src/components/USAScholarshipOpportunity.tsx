import { GraduationCap, Shield, Trophy, Globe } from "lucide-react";

const USAScholarshipOpportunity = () => {
  return (
    <section className="section-padding bg-white relative overflow-hidden">
      {/* Subtle top border accent */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-[#12213a]/10" />

      <div className="container-wide px-4">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="max-w-3xl mb-12 sm:mb-16">
            <span className="font-body text-xs tracking-[0.2em] uppercase text-[#12213a] font-bold mb-4 block">
              La Oportunidad
            </span>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-foreground leading-[1.05] mb-6">
              Por qué estudiar y jugar en <span className="text-[#12213a] italic">EE.UU.</span>
            </h2>
          </div>

          {/* Two Column Layout */}
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            {/* Left Column - Main Text */}
            <div className="space-y-6">
              <p className="font-body text-base sm:text-lg text-foreground leading-relaxed">
                Cada año, cientos de futbolistas internacionales eligen las universidades de Estados Unidos porque es el único lugar donde pueden <strong className="text-[#12213a]">compaginar deporte de alto nivel con estudios superiores</strong>. Las becas deportivas permiten que el talento en el campo financie parte de tus estudios, abriéndote las puertas a una experiencia única: competir en ligas universitarias, obtener un título universitario y vivir la vida de un <em>student-athlete</em>.
              </p>

              <p className="font-body text-base text-muted-foreground leading-relaxed">
                El porcentaje de futbolistas que alcanza el mundo profesional es tremendamente bajo. Las lesiones, la alta competitividad de los mercados y la falta de recursos de muchos equipos hace que los futbolistas que puedan vivir del fútbol sean muy pocos.
              </p>

              <div className="bg-[#12213a] rounded-xl p-6 sm:p-8 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
                <p className="font-body text-base sm:text-lg leading-relaxed relative z-10">
                  Sin embargo, si eres futbolista y juegas a nivel competitivo, existe una <strong>opción única</strong>. Jugar y estudiar becado en EE.UU. Se trata de un sistema de competición élite, con aficiones universitarias, recursos de primer nivel y una contraprestación única: <em>formarte en EE.UU. gracias a una beca deportiva</em>.
                </p>
              </div>
            </div>

            {/* Right Column - Key Pillars */}
            <div className="space-y-5">
              <div className="group flex gap-5 p-5 sm:p-6 rounded-xl border border-border bg-white hover:bg-[#12213a]/[0.02] transition-colors duration-300">
                <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-[#12213a]/10 flex items-center justify-center">
                  <Trophy className="w-5 h-5 text-[#12213a]" />
                </div>
                <div>
                  <h4 className="font-display text-lg font-bold text-foreground mb-1">Competición de Élite</h4>
                  <p className="font-body text-sm text-muted-foreground leading-relaxed">
                    Ligas universitarias con aficiones, infraestructura profesional y visibilidad ante scouts.
                  </p>
                </div>
              </div>

              <div className="group flex gap-5 p-5 sm:p-6 rounded-xl border border-border bg-white hover:bg-[#12213a]/[0.02] transition-colors duration-300">
                <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-[#12213a]/10 flex items-center justify-center">
                  <GraduationCap className="w-5 h-5 text-[#12213a]" />
                </div>
                <div>
                  <h4 className="font-display text-lg font-bold text-foreground mb-1">Título Universitario</h4>
                  <p className="font-body text-sm text-muted-foreground leading-relaxed">
                    Obtén un grado reconocido internacionalmente mientras compites al máximo nivel.
                  </p>
                </div>
              </div>

              <div className="group flex gap-5 p-5 sm:p-6 rounded-xl border border-border bg-white hover:bg-[#12213a]/[0.02] transition-colors duration-300">
                <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-[#12213a]/10 flex items-center justify-center">
                  <Shield className="w-5 h-5 text-[#12213a]" />
                </div>
                <div>
                  <h4 className="font-display text-lg font-bold text-foreground mb-1">Beca Deportiva</h4>
                  <p className="font-body text-sm text-muted-foreground leading-relaxed">
                    Tu talento financiará parte o la totalidad de tus estudios. Sin deuda estudiantil.
                  </p>
                </div>
              </div>

              <div className="group flex gap-5 p-5 sm:p-6 rounded-xl border border-border bg-white hover:bg-[#12213a]/[0.02] transition-colors duration-300">
                <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-[#12213a]/10 flex items-center justify-center">
                  <Globe className="w-5 h-5 text-[#12213a]" />
                </div>
                <div>
                  <h4 className="font-display text-lg font-bold text-foreground mb-1">Experiencia de Vida</h4>
                  <p className="font-body text-sm text-muted-foreground leading-relaxed">
                    Vive la cultura americana, perfecciona tu inglés y construye una red internacional de contactos.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default USAScholarshipOpportunity;
