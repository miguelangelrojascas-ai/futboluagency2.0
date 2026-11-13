"use client";

import { useLanguage } from "@/contexts/LanguageContext";

/**
 * Why FUA: the founding story, on black, after the visitor has seen the
 * promise, the proof and the method. It answers "why trust these people".
 */
const HomeWhyUs = () => {
  const { language } = useLanguage();
  const es = language === "es";


  return (
    <section className="bg-ink py-24 text-white sm:py-32" aria-labelledby="why-title">
      <div className="container-wide grid gap-10 px-4 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-5">
          <h2 id="why-title" className="font-druk uppercase leading-[0.92] text-red-bright text-[clamp(3.25rem,12vw,6.5rem)]">
            {es ? "Un agente." : "One agent."}
            <span className="block text-white">{es ? "Todo el camino." : "All the way."}</span>
          </h2>
          <p className="mt-4 font-bebas text-[15px] tracking-[0.26em] text-white/55 sm:text-base">
            {es ? "Por qué FUA · Fundada en 2020 por dos exjugadores" : "Why FUA · Founded in 2020 by two former players"}
          </p>
        </div>

        <div className="lg:col-span-6 lg:col-start-7 lg:pt-3">
          <div className="max-w-[60ch] space-y-5 font-body text-base leading-relaxed text-white/75 sm:text-lg">
            <p>
              {es
                ? "Ignacio y Moha intentaron llegar a universidades de EE.UU. y las agencias en las que confiaron los dejaron solos en el momento más importante. Aprendieron el sistema por su cuenta y en 2020 fundaron FutbolUAgency."
                : "Ignacio and Moha tried to reach U.S. universities, and the agencies they trusted left them alone at the most important moment. They learned the system on their own and founded FutbolUAgency in 2020."}
            </p>
            <p>
              {es
                ? "Desde entonces, cada jugador tiene un agente que lo acompaña de la evaluación a la firma, y que sigue ahí los cuatro años de carrera."
                : "Since then, every player gets an agent who stays with them from the evaluation to the signing, and through all four years of college."}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeWhyUs;
