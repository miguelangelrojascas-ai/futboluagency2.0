import { Dumbbell, Eye, Flame, Building2, ShieldCheck } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { BentoCard, BentoGrid } from "@/components/ui/bento-grid";
import spainTraining from "@/assets/spain-training.jpg";
import spainCompetition from "@/assets/spain-competition.jpg";
import spainWarmup from "@/assets/spain-warmup.jpg";
import spainStadium from "@/assets/spain-stadium.jpg";
import spainAcademy from "@/assets/spain-academy.jpg";

/** Photo that fills the card and lifts slightly on hover. */
const Background = ({ src, alt }: { src: string; alt: string }) => (
  <img
    src={src}
    alt={alt}
    loading="lazy"
    draggable={false}
    className="absolute inset-0 h-full w-full transform-gpu object-cover transition-transform duration-700 ease-out group-hover:scale-105"
  />
);

const SpainWhySection = () => {
  const { language } = useLanguage();
  const isEs = language === "es";

  const features = [
    {
      Icon: Dumbbell,
      name: isEs ? "Nivel competitivo real" : "Real competitive level",
      description: isEs
        ? "Mismo vestuario, misma liga y mismo nivel que los profesionales del club."
        : "Same locker room, same league and same level as the club's professionals.",
      image: spainTraining,
      alt: isEs ? "Entrenamiento en España" : "Training in Spain",
      className: "lg:col-start-1 lg:col-end-2 lg:row-start-1 lg:row-end-3",
    },
    {
      Icon: Eye,
      name: isEs ? "Visibilidad ante entrenadores" : "Visibility to coaches",
      description: isEs
        ? "Partidos oficiales de temporada con scouts mirando cada jornada."
        : "Official league matches with scouts watching every week.",
      image: spainCompetition,
      alt: isEs ? "Competición oficial" : "Official competition",
      className: "lg:col-start-2 lg:col-end-3 lg:row-start-1 lg:row-end-4",
    },
    {
      Icon: Flame,
      name: isEs ? "Experiencia intensiva" : "An intensive experience",
      description: isEs
        ? "Una temporada completa, no un campus de verano."
        : "A full season, not a summer camp.",
      image: spainWarmup,
      alt: isEs ? "Calentamiento previo al partido" : "Pre-match warm-up",
      className: "lg:col-start-1 lg:col-end-2 lg:row-start-3 lg:row-end-4",
    },
    {
      Icon: Building2,
      name: isEs ? "Entorno profesional" : "A professional environment",
      description: isEs
        ? "Dentro de un club real, a una hora de Madrid."
        : "Inside a real club, an hour from Madrid.",
      image: spainStadium,
      alt: isEs ? "Estadio del club" : "Club stadium",
      className: "lg:col-start-3 lg:col-end-4 lg:row-start-1 lg:row-end-2",
    },
    {
      Icon: ShieldCheck,
      name: isEs ? "Academias de élite" : "Elite academies",
      description: isEs
        ? "Estructura, cuerpo técnico y metodología de cantera española."
        : "The structure, coaching staff and methodology of a Spanish academy.",
      image: spainAcademy,
      alt: isEs ? "Academia de fútbol" : "Football academy",
      className: "lg:col-start-3 lg:col-end-4 lg:row-start-2 lg:row-end-4",
    },
  ];

  return (
    <section className="py-24" style={{ backgroundColor: "hsl(var(--background))" }}>
      <div className="container-wide px-4">
        <div className="mb-10 max-w-xl">
          <h2 className="font-display text-2xl font-bold sm:text-3xl md:text-4xl">
            {isEs ? "¿Por qué España?" : "Why Spain?"}
          </h2>
          <p className="mt-3 font-body text-base leading-relaxed text-muted-foreground">
            {isEs
              ? "Uno de los entornos más exigentes del mundo para competir, mejorar y ser visto."
              : "One of the most demanding environments in the world to compete, improve, and get noticed."}
          </p>
        </div>

        <BentoGrid className="lg:grid-rows-3">
          {features.map(({ image, alt, ...feature }) => (
            <BentoCard
              key={feature.name}
              {...feature}
              background={<Background src={image} alt={alt} />}
            />
          ))}
        </BentoGrid>
      </div>
    </section>
  );
};

export default SpainWhySection;
