import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const PathSelectionSection = () => {
  const { language } = useLanguage();
  const isEs = language === "es";

  const programs = [
    {
      number: "01",
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
      number: "02",
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
      number: "03",
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border-t border-foreground/15">
          {programs.map((p, i) => (
            <Link
              key={p.title}
              to={p.to}
              className={`group relative flex flex-col p-8 sm:p-10 lg:p-12 border-b border-foreground/15 md:border-b-0 ${
                i > 0 ? "md:border-l md:border-foreground/15" : ""
              } transition-colors duration-500 hover:bg-foreground/[0.02]`}
            >
              {/* Top row: number + tag */}
              <div className="flex items-start justify-between mb-10 sm:mb-14">
                <span
                  className="font-display text-sm font-bold tracking-[0.2em]"
                  style={{ color: p.accent }}
                >
                  {p.number}
                </span>
                <span
                  className="font-body text-[10px] sm:text-[11px] tracking-[0.2em] uppercase font-bold"
                  style={{ color: p.accent }}
                >
                  {p.tag}
                </span>
              </div>

              {/* Title */}
              <h3 className="font-display text-3xl sm:text-4xl lg:text-[2.75rem] font-bold text-foreground leading-[1.05] mb-6">
                {p.title}
              </h3>

              {/* Description */}
              <p className="font-body text-muted-foreground text-base leading-relaxed mb-10 flex-1">
                {p.desc}
              </p>

              {/* CTA */}
              <span
                className="inline-flex items-center gap-2 font-body text-sm font-bold tracking-wide group-hover:gap-3 transition-all"
                style={{ color: p.accent }}
              >
                {p.cta}
                <ArrowUpRight className="w-4 h-4 transition-transform duration-500 group-hover:rotate-45" />
              </span>

              {/* Bottom accent line on hover */}
              <span
                className="absolute bottom-0 left-0 h-[2px] w-0 group-hover:w-full transition-all duration-700 ease-out"
                style={{ backgroundColor: p.accent }}
              />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PathSelectionSection;
