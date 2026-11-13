"use client";

import { useLanguage } from "@/contexts/LanguageContext";

/**
 * Who FUA is, said once and plainly: a large red statement beside the founding
 * story, with the three figures the agency stands behind set as text, not tiles.
 */
const HomeStatement = () => {
  const { language } = useLanguage();
  const es = language === "es";

  const facts = [
    { value: "2020", label: es ? "Fundada" : "Founded" },
    { value: "250+", label: es ? "Atletas en EE.UU." : "Athletes in the USA" },
    { value: "$10M+", label: es ? "En becas conseguidas" : "In scholarships secured" },
  ];

  return (
    <section className="bg-white py-24 sm:py-32">
      <div className="container-wide grid gap-10 px-4 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-5">
          <h2 className="font-druk uppercase leading-[0.92] text-primary text-[clamp(3.25rem,12vw,6.5rem)]">
            {es ? "Un agente." : "One agent."}
            <span className="block text-ink">{es ? "Todo el camino." : "All the way."}</span>
          </h2>
          <p className="mt-4 font-bebas text-[15px] tracking-[0.26em] text-ink/50 sm:text-base">
            {es ? "Fundada por dos exjugadores" : "Founded by two former players"}
          </p>
        </div>

        <div className="lg:col-span-6 lg:col-start-7 lg:pt-3">
          <div className="max-w-[60ch] space-y-5 font-body text-base leading-relaxed text-ink/70 sm:text-lg">
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
          <dl className="mt-12 grid grid-cols-3 gap-6 border-t border-ink/10 pt-6">
            {facts.map((f) => (
              <div key={f.label}>
                <dt className="sr-only">{f.label}</dt>
                <dd className="font-druk text-[clamp(2.25rem,7vw,3.75rem)] leading-none text-ink">{f.value}</dd>
                <dd aria-hidden="true" className="mt-2 font-bebas text-[13px] tracking-[0.2em] text-ink/50 sm:text-[15px]">
                  {f.label}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
};

export default HomeStatement;
