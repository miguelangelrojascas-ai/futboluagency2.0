import { useState } from "react";
import { Mail, Calendar, ClipboardCheck, GraduationCap, Users } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import fuaSportsLogo from "@/assets/fua-sports-logo.png";
import sportVolleyball from "@/assets/sport-volleyball.png";
import sportGolf from "@/assets/sport-golf.png";
import sportTennis from "@/assets/sport-tennis.png";
import sportTrack from "@/assets/sport-track.png";

const sportsList = [
  {
    name: "Volleyball",
    description: "Becas NCAA para jugadoras de alto nivel",
    available: true,
    info: "Trabajamos con coaches de Divisiones I, II y NAIA. Evaluamos tu nivel técnico, físico y académico para ubicarte en la universidad ideal.",
  },
  {
    name: "Tenis",
    description: "Programas universitarios para tenistas competitivos",
    available: true,
    info: "Conexión directa con programas universitarios competitivos en EE.UU. Análisis de ranking ITF/UTR y perfil académico.",
  },
  {
    name: "Béisbol",
    description: "La vía más directa al béisbol universitario en EE.UU.",
    available: true,
    info: "Red consolidada con coaches de béisbol universitario. Showcase, video análisis y proceso completo de reclutamiento.",
  },
  {
    name: "Golf",
    description: "Becas para golfistas con handicap competitivo",
    available: false,
    info: "Próximamente abriremos el proceso de evaluación. Déjanos tu correo y te contactaremos apenas esté disponible.",
  },
  {
    name: "Track & Field",
    description: "Atletismo universitario en las mejores universidades",
    available: false,
    info: "Próximamente abriremos el proceso de evaluación. Déjanos tu correo y te contactaremos apenas esté disponible.",
  },
];

const timeline = [
  { year: "2020", text: "FutbolU Agency fundada" },
  { year: "2023", text: "350+ becas de fútbol" },
  { year: "2024", text: "Expansión a otros deportes" },
  { year: "2025", text: "FUA Sports" },
];

const processSteps = [
  { icon: ClipboardCheck, title: "Evaluación deportiva", desc: "Análisis técnico y físico de tu perfil" },
  { icon: GraduationCap, title: "Perfil universitario", desc: "Construimos tu perfil académico y deportivo" },
  { icon: Users, title: "Contacto con coaches", desc: "Conexión directa con universidades partner" },
];

const FUASports = () => {
  const [modalSport, setModalSport] = useState<typeof sportsList[number] | null>(null);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [ctaEmail, setCtaEmail] = useState("");
  const [ctaSubmitted, setCtaSubmitted] = useState(false);

  const handleModalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      setTimeout(() => {
        setModalSport(null);
        setSubmitted(false);
        setEmail("");
      }, 2000);
    }
  };

  const handleCtaSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (ctaEmail) {
      setCtaSubmitted(true);
      setTimeout(() => {
        setCtaSubmitted(false);
        setCtaEmail("");
      }, 3000);
    }
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-16 md:pt-20">
        {/* Hero */}
        <section className="py-24 md:py-32" style={{ backgroundColor: "#0d0d1a" }}>
          <div className="container-wide px-4 text-center">
            <img
              src={fuaSportsLogo}
              alt="FUA Sports"
              className="h-32 sm:h-40 md:h-52 w-auto mx-auto mb-8"
              style={{ filter: "invert(1) brightness(1.1)", mixBlendMode: "screen" }}
            />
            <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white max-w-4xl mx-auto mb-6 leading-tight">
              Becas Universitarias para{" "}
              <span className="text-primary">Todos los Deportes</span>
            </h1>
            <p className="font-body text-base sm:text-lg md:text-xl text-white/70 max-w-3xl mx-auto mb-12 leading-relaxed">
              La misma metodología que llevó a más de 350 atletas a universidades en EE.UU., ahora disponible en más disciplinas deportivas.
            </p>
            <div className="grid grid-cols-2 gap-6 max-w-2xl mx-auto">
              <div>
                <div className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-primary mb-2">350+</div>
                <div className="font-body text-sm sm:text-base text-white/60">Atletas colocados</div>
              </div>
              <div>
                <div className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-primary mb-2">40+</div>
                <div className="font-body text-sm sm:text-base text-white/60">Universidades partner</div>
              </div>
            </div>
          </div>
        </section>

        {/* Nuestra Historia */}
        <section className="py-24" style={{ backgroundColor: "#ffffff" }}>
          <div className="container-wide px-4">
            <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center max-w-6xl mx-auto">
              <div>
                <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-6">
                  Nuestra Historia
                </h2>
                <p className="font-body text-base sm:text-lg text-muted-foreground leading-relaxed">
                  FUA Sports nació de FutbolU Agency, la agencia líder en becas de fútbol universitario en Latinoamérica. Con años de experiencia y una red consolidada de universidades en EE.UU., decidimos expandir nuestra metodología a otros deportes para que más atletas puedan vivir el sueño americano.
                </p>
              </div>
              <div className="relative pl-8">
                <div className="absolute left-2 top-2 bottom-2 w-px bg-border" />
                <div className="space-y-8">
                  {timeline.map((item) => (
                    <div key={item.year} className="relative">
                      <div className="absolute -left-8 top-1.5 w-3 h-3 rounded-full bg-primary ring-4 ring-primary/20" />
                      <div className="font-display text-xl font-bold text-primary mb-1">{item.year}</div>
                      <div className="font-body text-base text-foreground">{item.text}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Sports Grid */}
        <section className="py-24" style={{ backgroundColor: "#f5f4f2" }}>
          <div className="container-wide px-4">
            <div className="text-center mb-12">
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">
                Nuestros Deportes
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
              {[
                { name: "Volleyball", tagline: "Becas NCAA para jugadoras de alto nivel.", to: "/sports/volleyball", img: sportVolleyball },
                { name: "Golf", tagline: "De tu club local a la élite universitaria americana.", to: "/sports/golf", img: sportGolf },
                { name: "Tenis", tagline: "Acompañamiento cercano para la beca que mereces.", to: "/sports/tennis", img: sportTennis },
                { name: "Track & Field", tagline: "+1,000 programas y $3.5B en becas disponibles.", to: "/sports/track", img: sportTrack },
              ].map((sport) => (
                <a
                  key={sport.name}
                  href={sport.to}
                  className="group rounded-2xl overflow-hidden flex flex-col min-h-[360px] transition-transform hover:-translate-y-1"
                  style={{ backgroundColor: "#12213a" }}
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={sport.img}
                      alt={sport.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#12213a] to-transparent" />
                  </div>
                  <div className="p-8 sm:p-10 flex flex-col justify-between flex-1">
                    <h3 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3 leading-tight">
                      {sport.name}
                    </h3>
                    <p className="font-body text-base sm:text-lg text-white/70 leading-relaxed mb-6">
                      {sport.tagline}
                    </p>
                    <span
                      className="font-body text-sm font-semibold inline-flex items-center gap-2 group-hover:gap-3 transition-all"
                      style={{ color: "#b00717" }}
                    >
                      Explorar programa →
                    </span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>


        {/* Final CTA */}
        <section className="py-24" style={{ backgroundColor: "#0d0d1a" }}>
          <div className="container-wide px-4">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
                ¿Tu deporte no está disponible aún?
              </h2>
              <p className="font-body text-base sm:text-lg text-white/70 mb-8 leading-relaxed">
                Déjanos tu email y sé el primero en saber cuando abramos nuevas disciplinas.
              </p>
              {ctaSubmitted ? (
                <p className="font-body text-primary text-lg font-medium mb-6">
                  ¡Listo! Te notificaremos.
                </p>
              ) : (
                <form onSubmit={handleCtaSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto mb-6">
                  <div className="relative flex-1">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                    <Input
                      type="email"
                      required
                      placeholder="Tu correo electrónico"
                      value={ctaEmail}
                      onChange={(e) => setCtaEmail(e.target.value)}
                      className="pl-10 bg-white/5 border-white/15 text-white placeholder:text-white/40"
                    />
                  </div>
                  <Button type="submit">Notificarme</Button>
                </form>
              )}
              <a
                href="https://calendly.com/futbolu-agency"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-body text-sm text-white/70 hover:text-white transition-colors"
              >
                <Calendar className="w-4 h-4" />
                O agenda una llamada gratuita
              </a>
            </div>
          </div>
        </section>

        <Footer />
      </main>

      {/* Sport detail modal */}
      <Dialog open={!!modalSport} onOpenChange={(o) => !o && setModalSport(null)}>
        <DialogContent className="bg-[#ffffff] border-border max-w-md">
          <DialogHeader>
            <DialogTitle className="font-display text-2xl sm:text-3xl font-bold text-foreground">
              {modalSport?.name}
            </DialogTitle>
            <DialogDescription className="font-body text-muted-foreground text-base leading-relaxed mt-2">
              {modalSport?.info}
            </DialogDescription>
          </DialogHeader>
          {submitted ? (
            <div className="py-6 text-center">
              <p className="font-body text-primary font-medium text-lg">
                ¡Listo! Te contactaremos pronto.
              </p>
            </div>
          ) : (
            <form onSubmit={handleModalSubmit} className="flex flex-col gap-4 mt-4">
              <p className="font-body text-sm text-muted-foreground">
                Déjanos tu email y te contactamos
              </p>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  type="email"
                  required
                  placeholder="Tu correo electrónico"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 bg-background border-border"
                />
              </div>
              <Button type="submit" className="w-full">
                Enviar
              </Button>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default FUASports;
