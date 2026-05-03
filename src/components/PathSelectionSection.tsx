import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import gapYearImg from "@/assets/program-gap-year.jpg";
import soccerUsaImg from "@/assets/program-soccer-usa.jpg";
import otherSportsImg from "@/assets/program-other-sports.jpg";
import spainAcademyImg from "@/assets/spain-academy.jpg";

const PathSelectionSection = () => {
  const { language } = useLanguage();
  const isEs = language === "es";

  const programs = [
    {
      image: soccerUsaImg,
      tag: isEs ? "Programa Estrella" : "Flagship Program",
      title: isEs ? "Becas de Fútbol en EE.UU." : "Soccer Scholarships in the U.S.",
      desc: isEs
        ? "Te conectamos con coaches de NCAA, NAIA y JUCO. Construimos tu perfil, gestionamos contactos y negociamos la mejor beca posible para que estudies y compitas al máximo nivel."
        : "We connect you with NCAA, NAIA and JUCO coaches. We build your profile, manage outreach and negotiate the best scholarship so you can study and compete at the highest level.",
      cta: isEs ? "Explorar EE.UU." : "Explore U.S.",
      to: "/usa",
      accent: "#12213a",
    },
    {
      image: gapYearImg,
      tag: isEs ? "Año de Preparación" : "Preparation Year",
      title: isEs ? "Gap Year en España" : "Gap Year in Spain",
      desc: isEs
        ? "Una temporada completa entrenando y compitiendo en academias profesionales españolas. Eleva tu nivel futbolístico, mejora tu inglés y prepárate para dar el salto a EE.UU. o al fútbol europeo."
        : "A full season training and competing in Spanish professional academies. Raise your level, improve your English, and get ready for the leap to the U.S. or European football.",
      cta: isEs ? "Ver programa España" : "View Spain program",
      to: "/spain",
      accent: "#b00717",
    },
    {
      image: otherSportsImg,
      tag: isEs ? "Próximamente" : "Coming Soon",
      title: isEs ? "Otros Deportes Universitarios" : "Other College Sports",
      desc: isEs
        ? "Becas universitarias en EE.UU. para tenis, golf, atletismo y voleibol. Mismo proceso, mismo compromiso, ahora ampliando a más disciplinas para atletas internacionales."
        : "U.S. college scholarships for tennis, golf, track & field and volleyball. Same process, same commitment, now expanding to more disciplines for international athletes.",
      cta: isEs ? "Ver deportes" : "View sports",
      to: "/fua-sports",
      accent: "#12213a",
    },
  ];

  return (
    <section id="path-selection" className="py-24 sm:py-28 md:py-32" style={{ backgroundColor: "#ffffff" }}>
      <div className="container-wide px-4">
        <div className="max-w-3xl mb-12 sm:mb-16">
          <span className="inline-block mb-4 text-primary font-body text-xs tracking-[0.2em] uppercase font-bold">
            {isEs ? "Nuestros Programas" : "Our Programs"}
          </span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-[1.05]">
            {isEs ? (
              <>Un programa para cada <span className="italic text-primary">etapa</span> de tu carrera.</>
            ) : (
              <>A program for every <span className="italic text-primary">stage</span> of your career.</>
            )}
          </h2>
          <p className="font-body text-muted-foreground text-base sm:text-lg leading-relaxed mt-5 max-w-2xl">
            {isEs
              ? "Diseñamos rutas concretas según tu nivel, edad y objetivos. Sin promesas vacías, solo planes reales y ejecución profesional."
              : "We design concrete paths based on your level, age and goals. No empty promises — just real plans and professional execution."}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {programs.map((p) => (
            <Link
              key={p.title}
              to={p.to}
              className="group flex flex-col"
            >
              {/* Image */}
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden mb-5 ring-1 ring-black/5 shadow-[0_4px_30px_rgba(0,0,0,0.06)]">
                <img
                  src={p.image}
                  alt={p.title}
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                />
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ background: `linear-gradient(180deg, transparent 40%, ${p.accent}cc 100%)` }}
                />
                <div className="absolute top-4 left-4">
                  <span className="inline-block bg-white/95 backdrop-blur-sm font-body text-[10px] sm:text-[11px] tracking-[0.15em] uppercase font-bold px-3 py-1.5 rounded-full" style={{ color: p.accent }}>
                    {p.tag}
                  </span>
                </div>
                <div
                  className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white flex items-center justify-center transition-all duration-500 group-hover:rotate-45"
                  style={{ color: p.accent }}
                >
                  <ArrowUpRight className="w-5 h-5" />
                </div>
              </div>

              {/* Text */}
              <div className="flex flex-col flex-1">
                <h3 className="font-display text-2xl sm:text-3xl font-bold text-foreground leading-tight mb-3 group-hover:opacity-80 transition-opacity">
                  {p.title}
                </h3>
                <p className="font-body text-muted-foreground text-sm sm:text-base leading-relaxed mb-5 flex-1">
                  {p.desc}
                </p>
                <span
                  className="inline-flex items-center gap-1.5 font-body text-sm font-bold tracking-wide group-hover:gap-3 transition-all"
                  style={{ color: p.accent }}
                >
                  {p.cta} <ArrowUpRight className="w-4 h-4" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PathSelectionSection;
