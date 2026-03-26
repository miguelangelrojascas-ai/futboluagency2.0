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
