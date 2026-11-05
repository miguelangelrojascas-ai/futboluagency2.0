"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image, { type StaticImageData } from "next/image";
import { Pause, Play } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import soccerImg from "@/assets/usa-exp-soccer.jpg";
import academicImg from "@/assets/usa-exp-academic.jpg";
import facilitiesImg from "@/assets/usa-exp-facilities.jpg";
import campusImg from "@/assets/usa-exp-campus.jpg";

type Bilingual = { es: string; en: string };
type Slide = { title: Bilingual; text: Bilingual; img: StaticImageData; alt: Bilingual };

const SLIDES: Slide[] = [
  {
    title: { es: "Fútbol de alta competencia.", en: "High-level soccer." },
    text: {
      es: "Ligas universitarias televisadas (NCAA, NAIA) frente a ojeadores de la MLS. Tu vitrina hacia el profesionalismo.",
      en: "Televised college leagues (NCAA, NAIA) in front of MLS scouts. Your showcase on the way to going pro.",
    },
    img: soccerImg,
    alt: { es: "Celebración de un equipo universitario tras ganar un partido", en: "A college team celebrating a win" },
  },
  {
    title: { es: "Excelencia académica.", en: "Academic excellence." },
    text: {
      es: "Estudia la carrera que quieres en campus de primer nivel, con un título reconocido en todo el mundo.",
      en: "Study the degree you want on a top campus, with a qualification recognised worldwide.",
    },
    img: academicImg,
    alt: { es: "Estudiantes en un aula universitaria", en: "Students in a university lecture hall" },
  },
  {
    title: { es: "Instalaciones de nivel profesional.", en: "Pro-level facilities." },
    text: {
      es: "Estadios, gimnasios de alto rendimiento, fisioterapia y nutrición deportiva. Vive y entrena como en la élite.",
      en: "Stadiums, high-performance gyms, physio and sports nutrition. Live and train like the elite.",
    },
    img: facilitiesImg,
    alt: { es: "Campus universitario en Florida junto a un lago", en: "A Florida university campus by a lake" },
  },
  {
    title: { es: "Vida en el campus.", en: "Campus life." },
    text: {
      es: "Residencia, comedor y compañeros de todo el mundo. Cuatro años que cambian tu forma de ver la vida.",
      en: "Dorms, dining halls and teammates from all over the world. Four years that change how you see life.",
    },
    img: campusImg,
    alt: { es: "Habitación de una residencia universitaria", en: "A university dorm room" },
  },
];

/** How long each slide stays before the carousel moves on. */
const SLIDE_MS = 6000;

const StudentAthleteExperience = () => {
  const { language } = useLanguage();
  const es = language === "es";

  const trackRef = useRef<HTMLDivElement>(null);
  const slideRefs = useRef<(HTMLLIElement | null)[]>([]);
  const settleTimer = useRef<number | undefined>(undefined);
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [inView, setInView] = useState(false);

  const goTo = useCallback((index: number) => {
    const track = trackRef.current;
    const slide = slideRefs.current[index];
    if (!track || !slide) return;
    setActive(index);
    track.scrollTo({
      left: slide.offsetLeft - (track.clientWidth - slide.clientWidth) / 2,
      behavior: "smooth",
    });
  }, []);

  /* Swiping by hand: once the scroll settles, the slide nearest the centre wins. */
  const onScroll = () => {
    window.clearTimeout(settleTimer.current);
    settleTimer.current = window.setTimeout(() => {
      const track = trackRef.current;
      if (!track) return;
      const centre = track.scrollLeft + track.clientWidth / 2;
      let nearest = 0;
      let best = Infinity;
      slideRefs.current.forEach((s, i) => {
        if (!s) return;
        const d = Math.abs(s.offsetLeft + s.clientWidth / 2 - centre);
        if (d < best) {
          best = d;
          nearest = i;
        }
      });
      setActive(nearest);
    }, 120);
  };

  /* Only run the clock while the section is on screen. */
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.4 });
    io.observe(track);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) setPlaying(false);
    return () => window.clearTimeout(settleTimer.current);
  }, []);

  const running = playing && inView;
  const next = () => goTo((active + 1) % SLIDES.length);

  return (
    <section
      className="overflow-hidden py-20 md:py-28"
      style={{ backgroundColor: "#0b1526" }}
      aria-roledescription="carousel"
      aria-label={es ? "La experiencia student-athlete" : "The student-athlete experience"}
    >
      <div className="mx-auto mb-10 max-w-7xl px-4 md:mb-14">
        <span className="mb-4 block font-body text-xs font-bold uppercase tracking-[0.2em] text-primary">
          {es ? "El sueño americano" : "The American dream"}
        </span>
        <h2 className="max-w-4xl font-display text-4xl font-bold leading-[1.05] text-white sm:text-5xl md:text-6xl">
          {es ? "Vive la experiencia " : "Live the "}
          {/* Same term in both languages, in brand red (a touch brighter so it reads on navy). */}
          <span className="whitespace-nowrap text-[#e0293a]">student-athlete</span>
          {es ? "." : " experience."}
        </h2>
      </div>

      <div
        ref={trackRef}
        onScroll={onScroll}
        className="sae-track flex snap-x snap-mandatory gap-4 overflow-x-auto md:gap-6"
      >
        <ul className="contents">
          {SLIDES.map((s, i) => (
            <li
              key={s.title.es}
              ref={(el) => {
                slideRefs.current[i] = el;
              }}
              aria-roledescription="slide"
              aria-label={`${i + 1} / ${SLIDES.length}`}
              onClick={() => i !== active && goTo(i)}
              className={`sae-slide relative shrink-0 snap-center overflow-hidden rounded-[22px] md:rounded-[28px] transition-opacity duration-500 ${
                i === active ? "opacity-100" : "cursor-pointer opacity-40 hover:opacity-60"
              }`}
            >
              <Image
                src={s.img}
                alt={s.alt[language]}
                fill
                sizes="(min-width: 768px) 86vw, 90vw"
                className={`object-cover transition-transform [transition-duration:1600ms] ease-out ${
                  i === active ? "scale-100" : "scale-[1.06]"
                }`}
                priority={i === 0}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-transparent" />
              <div
                className={`absolute inset-x-0 bottom-0 px-6 pb-8 text-center transition-all duration-700 md:px-16 md:pb-14 ${
                  i === active ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
                }`}
              >
                <h3 className="font-display text-2xl font-bold text-white md:text-4xl">{s.title[language]}</h3>
                <p className="mx-auto mt-3 max-w-2xl font-body text-sm leading-relaxed text-white/80 md:text-lg">
                  {s.text[language]}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-8 flex items-center justify-center gap-3 md:mt-10">
        <div className="flex h-14 items-center gap-3 rounded-full bg-white/10 px-6 backdrop-blur">
          {SLIDES.map((s, i) => (
            <button
              key={s.title.es}
              type="button"
              onClick={() => goTo(i)}
              aria-label={`${es ? "Ir a" : "Go to"} ${s.title[language]}`}
              aria-current={i === active}
              className={`relative h-2 overflow-hidden rounded-full bg-white/35 transition-[width] duration-500 ${
                i === active ? "w-12" : "w-2 hover:bg-white/60"
              }`}
            >
              {i === active && (
                <span
                  key={`${active}-${language}`}
                  className="sae-fill absolute inset-y-0 left-0 rounded-full bg-white"
                  style={{ animationPlayState: running ? "running" : "paused" }}
                  onAnimationEnd={next}
                />
              )}
            </button>
          ))}
        </div>
        <button
          type="button"
          onClick={() => setPlaying((p) => !p)}
          aria-label={playing ? (es ? "Pausar" : "Pause") : es ? "Reproducir" : "Play"}
          className="flex h-14 w-14 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur transition-colors hover:bg-white/20"
        >
          {playing ? <Pause className="h-5 w-5 fill-current" /> : <Play className="ml-0.5 h-5 w-5 fill-current" />}
        </button>
      </div>

      <style>{`
        .sae-track {
          --slide-w: min(1180px, 86vw);
          padding-inline: calc((100% - var(--slide-w)) / 2);
          scrollbar-width: none;
        }
        .sae-track::-webkit-scrollbar { display: none; }
        .sae-slide { width: var(--slide-w); aspect-ratio: 4 / 5; }
        @media (min-width: 768px) {
          .sae-slide { aspect-ratio: 16 / 9; max-height: 78vh; }
        }
        .sae-fill { width: 0; animation: sae-fill ${SLIDE_MS}ms linear forwards; }
        @keyframes sae-fill { to { width: 100%; } }
      `}</style>
    </section>
  );
};

export default StudentAthleteExperience;
