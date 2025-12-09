import { useEffect, useRef } from "react";
import successZak from "@/assets/success-zak.jpg";
import successVictor from "@/assets/success-victor.jpg";
import successBentchey from "@/assets/success-bentchey.jpg";
import successEduardo from "@/assets/success-eduardo.jpg";
import successPablo from "@/assets/success-pablo.jpg";
import successSimone from "@/assets/success-simone.jpg";
import successMiguel from "@/assets/success-miguel.jpg";
import successChase from "@/assets/success-chase.jpg";
import successDaniel from "@/assets/success-daniel.jpg";

const successCases = [
  { image: successZak, name: "Zak McGall", university: "Seward County CC" },
  { image: successVictor, name: "Victor Paz", university: "Illinois Central College" },
  { image: successBentchey, name: "Bentchey Dominguez", university: "East Mississippi CC" },
  { image: successEduardo, name: "Eduardo Larsen", university: "Beloit College" },
  { image: successPablo, name: "Pablo Exposito", university: "Crowder College" },
  { image: successSimone, name: "Simone Pitale", university: "Seward County CC" },
  { image: successMiguel, name: "Miguel Arnaiz", university: "NIACC" },
  { image: successChase, name: "Chase Nasir", university: "Lake Erie College" },
  { image: successDaniel, name: "Daniel Abreu", university: "East Mississippi CC" },
];

const SuccessCasesSection = () => {
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
      <div className="container-wide">
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="text-primary font-body text-sm tracking-[0.2em] uppercase mb-4 block">
            Más de 250 casos de éxito construidos
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold">
            Algunos resultados de trabajar{" "}
            <span className="text-primary italic">juntos...</span>
          </h2>
        </div>
      </div>

      {/* Full-width Carousel */}
      <div
        ref={scrollRef}
        className="flex gap-6 overflow-hidden"
      >
        {allCases.map((successCase, index) => (
          <div
            key={index}
            className="flex-shrink-0 w-[280px] md:w-[320px]"
          >
            <div className="relative overflow-hidden rounded-2xl bg-card aspect-[3/4]">
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
