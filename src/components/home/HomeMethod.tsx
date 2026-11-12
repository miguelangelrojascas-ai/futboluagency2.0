"use client";

import Image from "next/image";
import { useLanguage } from "@/contexts/LanguageContext";

type Step = { title: string; desc: string };

const STEPS_ES: Step[] = [
  { title: "Evaluación gratuita", desc: "Analizamos tu perfil deportivo y académico y te damos una respuesta real sobre tus opciones de beca. Sin compromiso y sin coste." },
  { title: "Plan personalizado", desc: "Te asignamos un agente que te acompaña de principio a fin y define contigo el plan: universidades objetivo, calendario y presupuesto familiar." },
  { title: "Tu perfil para los coaches", desc: "Montamos el vídeo de highlights y el perfil deportivo y académico con el que los entrenadores deciden si te quieren en su equipo." },
  { title: "Contacto y negociación", desc: "Presentamos tu perfil a los entrenadores de nuestra red, abrimos la conversación y negociamos la beca en tu nombre." },
  { title: "Decisión y admisión", desc: "Comparas ofertas reales sobre la mesa y eliges destino. Después tramitamos juntos la admisión y la certificación de elegibilidad." },
  { title: "Visado y llegada", desc: "Te guiamos con el visado y preparamos tu llegada. Y seguimos ahí los cuatro años de carrera, también si necesitas un transfer." },
];

const STEPS_EN: Step[] = [
  { title: "Free evaluation", desc: "We analyse your athletic and academic profile and give you a straight answer about your scholarship options. No cost, no commitment." },
  { title: "A personalised plan", desc: "You get an agent who stays with you from start to finish and sets the plan with you: target universities, timeline and family budget." },
  { title: "Your profile for coaches", desc: "We build the highlight video and the athletic and academic profile coaches use to decide whether they want you on their team." },
  { title: "Outreach and negotiation", desc: "We put your profile in front of the coaches in our network, open the conversation and negotiate the scholarship on your behalf." },
  { title: "Decision and admission", desc: "You compare real offers on the table and choose where to go. Then we handle admissions and eligibility certification together." },
  { title: "Visa and arrival", desc: "We guide you through the visa and prepare your arrival. And we stay with you all four years, including if you need a transfer." },
];

/** The six steps, as an editorial list beside a cut-out player on a clean background. */
const HomeMethod = () => {
  const { language } = useLanguage();
  const es = language === "es";
  const steps = es ? STEPS_ES : STEPS_EN;

  return (
    <section id="proceso" className="bg-white py-20 sm:py-28">
      <div className="container-wide grid gap-12 px-4 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-28">
            <p className="font-bebas text-[15px] tracking-[0.3em] text-primary sm:text-base">
              {es ? "6 pasos · De tu ciudad al campus" : "6 steps · From your city to campus"}
            </p>
            <h2 className="mt-3 font-druk uppercase leading-[0.88] text-ink text-[clamp(3.25rem,13vw,7rem)] lg:text-[clamp(4rem,6.6vw,7rem)]">
              {es ? "El método" : "The FUA"}
              <span className="block pr-[0.08em] italic text-primary">{es ? "FUA" : "method"}</span>
            </h2>
            <div className="relative mt-8 hidden h-[460px] lg:block xl:h-[520px]">
              <div
                aria-hidden="true"
                className="absolute inset-x-8 bottom-0 h-3/4 rounded-full"
                style={{ background: "radial-gradient(closest-side, hsl(354 86% 50% / 0.12), transparent)" }}
              />
              <Image
                src="/images/home/jugador-bandera.png"
                alt={es ? "Jugador de FUA con la bandera de España" : "FUA player wrapped in the Spanish flag"}
                width={605}
                height={1423}
                sizes="20vw"
                className="relative mx-auto h-full w-auto"
              />
            </div>
          </div>
        </div>

        <ol className="lg:col-span-7">
          {steps.map((step, i) => (
            <li key={step.title} className="grid grid-cols-[auto_1fr] gap-5 border-t border-ink/10 py-7 last:border-b sm:gap-8 sm:py-9">
              <span className="w-[1.6em] font-druk text-4xl leading-none text-primary sm:text-5xl">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <h3 className="font-druk text-[1.75rem] uppercase leading-none tracking-[0.01em] text-ink sm:text-4xl">
                  {step.title}
                </h3>
                <p className="mt-3 max-w-prose font-body text-[15px] leading-relaxed text-muted-foreground sm:text-base">
                  {step.desc}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
};

export default HomeMethod;
