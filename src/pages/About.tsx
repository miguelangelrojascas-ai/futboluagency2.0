import { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import TeamProfileCards from "@/components/TeamProfileCards";

import spainTraining from "@/assets/spain-training.jpg";
import spainCompetition from "@/assets/spain-competition.jpg";
import spainWarmup from "@/assets/spain-warmup.jpg";
import spainStadium from "@/assets/spain-stadium.jpg";
import spainAcademy from "@/assets/spain-academy.jpg";

const About = () => {
  const { language } = useLanguage();
  const isEs = language === "es";
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeftPos, setScrollLeftPos] = useState(0);

  const carouselCards = [
    {
      image: spainStadium,
      title: isEs ? "Entorno Profesional" : "Professional Environment",
    },
    {
      image: spainTraining,
      title: isEs ? "Entrenamiento de Élite" : "Elite Training",
    },
    {
      image: spainCompetition,
      title: isEs ? "Competición Real" : "Real Competition",
    },
    {
      image: spainWarmup,
      title: isEs ? "Preparación Física" : "Physical Preparation",
    },
    {
      image: spainAcademy,
      title: isEs ? "Academias de Alto Nivel" : "Top-Level Academies",
    },
  ];

  const updateScrollButtons = () => {
    const el = scrollContainerRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 10);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 10);
  };

  useEffect(() => {
    const el = scrollContainerRef.current;
    if (!el) return;
    el.addEventListener("scroll", updateScrollButtons);
    updateScrollButtons();
    return () => el.removeEventListener("scroll", updateScrollButtons);
  }, []);

  const scrollBy = (direction: number) => {
    const el = scrollContainerRef.current;
    if (!el) return;
    el.scrollBy({ left: direction * 320, behavior: "smooth" });
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    const el = scrollContainerRef.current;
    if (!el) return;
    setIsDragging(true);
    setStartX(e.pageX - el.offsetLeft);
    setScrollLeftPos(el.scrollLeft);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    const el = scrollContainerRef.current;
    if (!el) return;
    const x = e.pageX - el.offsetLeft;
    el.scrollLeft = scrollLeftPos - (x - startX);
  };

  const handleMouseUp = () => setIsDragging(false);

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-16 md:pt-20">
        <TeamProfileCards />

        {/* Values / Mission */}
        <section className="section-padding bg-background">
          <div className="container-wide px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold mb-6">
                {isEs ? "Lo que nos mueve" : "What drives us"}
              </h2>
              <p className="font-body font-normal text-muted-foreground text-base sm:text-lg leading-relaxed mb-10">
                {isEs
                  ? "Creemos que cada jugador merece la oportunidad de demostrar su talento en el entorno correcto. Trabajamos con compromiso, transparencia y conocimiento profundo del ecosistema deportivo y académico para abrir puertas que de otra forma permanecerían cerradas."
                  : "We believe every player deserves the chance to prove their talent in the right environment. We work with commitment, transparency, and deep knowledge of the sports and academic ecosystem to open doors that would otherwise remain closed."}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {[
                  {
                    title: isEs ? "Compromiso" : "Commitment",
                    desc: isEs
                      ? "Acompañamos a cada jugador desde el primer contacto hasta que llega a su destino."
                      : "We support each player from first contact until they reach their destination.",
                  },
                  {
                    title: isEs ? "Transparencia" : "Transparency",
                    desc: isEs
                      ? "Comunicación clara, expectativas reales y un proceso sin sorpresas."
                      : "Clear communication, real expectations, and a process with no surprises.",
                  },
                  {
                    title: isEs ? "Resultados" : "Results",
                    desc: isEs
                      ? "Más de 250 jugadores colocados en universidades y academias de alto nivel."
                      : "Over 250 players placed in top universities and high-level academies.",
                  },
                ].map((value, i) => (
                  <div key={i} className="rounded-xl border border-border bg-card p-6">
                    <h3 className="font-display text-lg font-bold text-foreground mb-2">{value.title}</h3>
                    <p className="font-body text-muted-foreground text-sm leading-relaxed">{value.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 md:py-20 bg-background">
          <div className="container-wide px-4 text-center">
            <h2 className="font-display text-2xl sm:text-3xl font-bold mb-4">
              {isEs ? "¿Listo para dar el siguiente paso?" : "Ready to take the next step?"}
            </h2>
            <p className="font-body text-muted-foreground text-base mb-8 max-w-xl mx-auto">
              {isEs
                ? "Aplica ahora y descubre qué oportunidades hay para ti."
                : "Apply now and discover what opportunities await you."}
            </p>
            <Link
              to="/apply"
              className="inline-flex items-center gap-2 bg-primary hover:bg-primary-hover text-primary-foreground font-body font-semibold px-8 py-3.5 rounded-lg transition-colors text-sm sm:text-base"
            >
              {isEs ? "Aplica Ahora" : "Apply Now"} <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
};

export default About;
