import { useEffect, useRef, useState } from "react";
import success1 from "@/assets/success-1.jpg";
import success2 from "@/assets/success-2.jpg";
import success3 from "@/assets/success-3.jpg";
import success4 from "@/assets/success-4.jpg";
import success5 from "@/assets/success-5.jpg";
import success6 from "@/assets/success-6.jpg";

const successCases = [
  { image: success1, name: "Carlos M.", university: "University of Kentucky" },
  { image: success2, name: "Ana G.", university: "UCLA" },
  { image: success3, name: "Diego F.", university: "Stanford University" },
  { image: success4, name: "María L.", university: "Wake Forest" },
  { image: success5, name: "Javier R.", university: "Clemson University" },
  { image: success6, name: "Laura S.", university: "Penn State" },
];

const SuccessCasesSection = () => {
  const [isPaused, setIsPaused] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer || isPaused) return;

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
  }, [isPaused]);

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
        className="flex gap-6 overflow-hidden cursor-grab"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {allCases.map((successCase, index) => (
          <div
            key={index}
            className="flex-shrink-0 w-[280px] md:w-[320px] group"
          >
            <div className="relative overflow-hidden rounded-2xl bg-card aspect-[3/4]">
              <img
                src={successCase.image}
                alt={successCase.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              {/* Info on hover */}
              <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <h4 className="font-display text-lg font-semibold text-foreground">
                  {successCase.name}
                </h4>
                <p className="font-body text-sm text-primary">
                  {successCase.university}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default SuccessCasesSection;
