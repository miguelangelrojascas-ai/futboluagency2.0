import { useEffect, useRef } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import successZak from "@/assets/success-zak.jpg";
import successVictor from "@/assets/success-victor.jpg";
import successBentchey from "@/assets/success-bentchey.jpg";
import successEduardo from "@/assets/success-eduardo.jpg";
import successPablo from "@/assets/success-pablo.jpg";
import successSimone from "@/assets/success-simone.jpg";
import successMiguel from "@/assets/success-miguel.jpg";
import successChase from "@/assets/success-chase.jpg";
import successDaniel from "@/assets/success-daniel.jpg";
import committedAnder from "@/assets/committed-ander.png";
import committedIvan from "@/assets/committed-ivan.png";
import committedSimone from "@/assets/committed-simone.png";
import committedFrancisco from "@/assets/committed-francisco.png";
import committedJuan from "@/assets/committed-juan.png";
import committedJose from "@/assets/committed-jose.png";

const successCases = [
  { image: successZak, name: "Zak McGall", university: "Seward County CC" },
  { image: committedAnder, name: "Ander González", university: "St. John's University" },
  { image: successVictor, name: "Victor Paz", university: "Illinois Central College" },
  { image: committedIvan, name: "Iván Gómez Sumillera", university: "Delta State College" },
  { image: successBentchey, name: "Bentchey Dominguez", university: "East Mississippi CC" },
  { image: committedSimone, name: "Simone Pitale", university: "Monroe University" },
  { image: successEduardo, name: "Eduardo Larsen", university: "Beloit College" },
  { image: committedFrancisco, name: "Francisco Giraldo", university: "Regis University" },
  { image: successPablo, name: "Pablo Exposito", university: "Crowder College" },
  { image: committedJuan, name: "Juan Argüelles", university: "Prairie State College" },
  { image: successSimone, name: "Simone Pitale", university: "Seward County CC" },
  { image: committedJose, name: "Jose Contreras", university: "University of West Florida" },
  { image: successMiguel, name: "Miguel Arnaiz", university: "NIACC" },
  { image: successChase, name: "Chase Nasir", university: "Lake Erie College" },
  { image: successDaniel, name: "Daniel Abreu", university: "East Mississippi CC" },
];
const SuccessCasesSection = () => {
  const { t, language } = useLanguage();
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    let animationId: number;
    let scrollPosition = 0;
    const speed = 0.5;

    const animate = () => {
      scrollPosition += speed;
      const maxScroll = scrollContainer.scrollWidth / 2;
      
      if (scrollPosition >= maxScroll) {
        scrollPosition = 0;
      }
      
      scrollContainer.scrollLeft = scrollPosition;
      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationId);
  }, []);

  // Duplicate images for infinite scroll
  const allCases = [...successCases, ...successCases];

  return (
    <section className="section-padding bg-background overflow-hidden">
      <div className="container-wide px-4">
        {/* Section Header */}
        <div className="text-center mb-8 sm:mb-12">
          <span className="text-[hsl(210,100%,50%)] font-body text-xs sm:text-sm tracking-[0.2em] uppercase mb-3 sm:mb-4 block">
            {language === "es" ? "Más de 250 casos de éxito construidos" : "Over 250 success stories built"}
          </span>
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold px-2">
            {language === "es" ? "Algunos resultados de trabajar" : "Some results from working"}{" "}
            <span className="text-primary italic">{language === "es" ? "juntos..." : "together..."}</span>
          </h2>
        </div>
      </div>

      {/* Full-width Carousel */}
      <div
        ref={scrollRef}
        className="flex gap-4 sm:gap-6 overflow-hidden px-4"
      >
        {allCases.map((successCase, index) => (
          <div
            key={index}
            className="flex-shrink-0 w-[200px] sm:w-[280px] md:w-[320px]"
          >
            <div className="relative overflow-hidden rounded-xl sm:rounded-2xl bg-card aspect-[3/4]">
              <img
                src={successCase.image}
                alt={successCase.name}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default SuccessCasesSection;
