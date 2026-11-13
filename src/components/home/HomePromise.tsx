"use client";

import { useLanguage } from "@/contexts/LanguageContext";

/**
 * First thing after the hero: the outcome the family is buying, said with
 * calm certainty. Order follows how a premium decision is made: the future
 * first, then what it is made of, then proof, then the risk taken away.
 * Every line restates something the site already promises elsewhere.
 */
const HomePromise = () => {
  const { language } = useLanguage();
  const es = language === "es";

  const outcomes = es
    ? [
        { title: "Un título universitario", text: "Una carrera completa en una universidad de Estados Unidos." },
        { title: "Fútbol de competición", text: "Entrenas y compites cada semana con un programa universitario." },
        { title: "Una beca negociada por ti", text: "Tu agente presenta tu perfil y negocia la oferta en tu nombre." },
      ]
    : [
        { title: "A university degree", text: "A full degree at a university in the United States." },
        { title: "Competitive soccer", text: "You train and compete every week with a college program." },
        { title: "A scholarship negotiated for you", text: "Your agent presents your profile and negotiates the offer on your behalf." },
      ];

  const proof = [
    { value: "250+", label: es ? "Atletas en EE.UU." : "Athletes in the USA" },
    { value: "$10M+", label: es ? "En becas conseguidas" : "In scholarships secured" },
    { value: "4", label: es ? "Años a tu lado" : "Years by your side" },
  ];

  return (
    <section className="bg-white py-24 sm:py-32" aria-labelledby="promise-title">
      <div className="container-wide grid gap-12 px-4 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-5">
          <h2 id="promise-title" className="font-druk uppercase leading-[1.1] text-ink text-[clamp(3.25rem,12vw,6.5rem)]">
            {es ? "Cuatro años que" : "Four years that"}
            <span className="block pr-[0.08em] leading-[0.96] italic text-primary">{es ? "lo cambian todo." : "change everything."}</span>
          </h2>
          <p className="mt-4 font-bebas text-[15px] tracking-[0.26em] text-ink/50 sm:text-base">
            {es ? "Fútbol, título y beca. A la vez." : "Soccer, a degree and a scholarship. At once."}
          </p>
        </div>

        <div className="lg:col-span-6 lg:col-start-7 lg:pt-3">
          <p className="max-w-[60ch] font-body text-lg leading-relaxed text-ink/75 sm:text-xl">
            {es
              ? "No tienes que elegir entre estudiar y seguir jugando. En Estados Unidos haces las dos cosas, y la beca lo hace posible. Tú pones el talento; nosotros nos encargamos de que los entrenadores lo vean."
              : "You don't have to choose between studying and playing on. In the United States you do both, and the scholarship makes it possible. You bring the talent; we make sure the coaches see it."}
          </p>

          <ul className="mt-10 border-t border-ink/10">
            {outcomes.map((o) => (
              <li key={o.title} className="grid gap-1 border-b border-ink/10 py-5 sm:grid-cols-[minmax(0,15rem)_1fr] sm:gap-8">
                <span className="font-druk text-2xl uppercase leading-tight text-ink sm:text-[1.7rem]">{o.title}</span>
                <span className="font-body text-[15px] leading-relaxed text-ink/65 sm:pt-1 sm:text-base">{o.text}</span>
              </li>
            ))}
          </ul>

          <dl className="mt-10 grid grid-cols-3 gap-6">
            {proof.map((f) => (
              <div key={f.label} className="flex flex-col-reverse">
                <dt className="mt-2 font-bebas text-[13px] tracking-[0.2em] text-ink/50 sm:text-[15px]">{f.label}</dt>
                <dd className="font-druk text-[clamp(2.25rem,7vw,3.75rem)] leading-none text-ink">{f.value}</dd>
              </div>
            ))}
          </dl>

          <p className="mt-10 font-body text-[15px] text-ink/65">
            {es
              ? "Saber si tienes opciones no te cuesta nada: la evaluación es gratuita y sin compromiso."
              : "Finding out whether you have options costs nothing: the evaluation is free and carries no commitment."}
          </p>
        </div>
      </div>
    </section>
  );
};

export default HomePromise;
