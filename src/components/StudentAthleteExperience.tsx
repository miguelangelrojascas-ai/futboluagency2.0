import { useState } from "react";
import coachHandshake from "@/assets/card-bg-coaches-new.jpg";
import usaFacilities from "@/assets/usa-facilities.png";
import usaAcademic from "@/assets/usa-academic.png";

const items = [
  {
    title: "Fútbol de Alta Competencia",
    text: "Compite en ligas universitarias televisadas (NCAA, NAIA) frente a ojeadores de la MLS y equipos internacionales. Tu vitrina hacia el profesionalismo.",
    img: coachHandshake,
  },
  {
    title: "Excelencia Académica",
    text: "Estudia la carrera de tus sueños en campus de primer nivel. Asegura tu futuro con un título universitario de prestigio internacional.",
    img: usaAcademic,
  },
  {
    title: "Instalaciones de Nivel Profesional",
    text: "Accede a estadios de primer nivel, gimnasios de alto rendimiento, fisioterapia y nutrición deportiva 24/7. Vive y entrena como en la élite.",
    img: usaFacilities,
  },
];

const StudentAthleteExperience = () => {
  const [activeItem, setActiveItem] = useState(0);

  return (
    <section className="py-24 bg-transparent">
      <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
        {/* Left Column */}
        <div>
          <span className="text-[#12213a] text-sm font-bold tracking-widest uppercase mb-4 block">
            EL SUEÑO AMERICANO
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-8">
            Vive la Verdadera Experiencia{" "}
            <span className="italic text-[#12213a]">Student-Athlete</span>
          </h2>
          <div>
            {items.map((item, index) => (
              <div
                key={index}
                className={`relative cursor-pointer py-6 transition-all duration-500 ${
                  activeItem === index
                    ? "opacity-100 border-l-2 border-[#12213a] pl-6 shadow-[-4px_0_10px_-2px_rgba(18,33,58,0.5)]"
                    : "opacity-50 pl-6 border-l-2 border-transparent"
                }`}
                onMouseEnter={() => setActiveItem(index)}
                onClick={() => setActiveItem(index)}
              >
                <h3
                  className={`font-display text-lg font-bold mb-1 transition-colors duration-500 ${
                    activeItem === index ? "text-foreground" : "text-muted-foreground"
                  }`}
                >
                  {item.title}
                </h3>
                <p
                  className={`font-body text-sm leading-relaxed transition-colors duration-500 ${
                    activeItem === index ? "text-muted-foreground" : "text-muted-foreground"
                  }`}
                >
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column */}
        <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(18,33,58,0.15)]">
          <div className="absolute inset-0 bg-[#12213a]/10 blur-3xl rounded-full" />
          {items.map((item, index) => (
            <img
              key={index}
              src={item.img}
              alt={item.title}
              className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-in-out ${
                activeItem === index
                  ? "opacity-100 scale-100"
                  : "opacity-0 scale-105 pointer-events-none"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default StudentAthleteExperience;
