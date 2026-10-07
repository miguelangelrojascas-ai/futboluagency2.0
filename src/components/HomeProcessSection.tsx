import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { ArrowRight, ArrowUpRight } from "lucide-react";

const YOUTUBE_CHANNEL = "https://www.youtube.com/@FutbolUagency/videos";

type StepLink = { to: string; label: string; external?: boolean };
type Step = { title: string; desc: string; links?: StepLink[] };

const STEPS_ES: Step[] = [
  {
    title: "Evaluación gratuita",
    desc: "Analizamos tu perfil deportivo y académico y te damos una respuesta real sobre tus opciones de beca. Sin compromiso y sin coste.",
    links: [
      { to: "/recursos/las-divisiones#perfiles", label: "Mira dónde encaja tu perfil" },
    ],
  },
  {
    title: "Plan personalizado",
    desc: "Te asignamos un agente que te acompaña de principio a fin y define contigo el plan: universidades objetivo, calendario y presupuesto familiar.",
  },
  {
    title: "Tu perfil para los entrenadores",
    desc: "Montamos el vídeo de highlights y el perfil deportivo y académico con el que los coaches deciden si te quieren en su equipo.",
    links: [
      { to: "/recursos/requisitos-y-perfil", label: "Cómo se monta el vídeo" },
      { to: YOUTUBE_CHANNEL, label: "Ver ejemplos en nuestro canal", external: true },
    ],
  },
  {
    title: "Contacto y negociación",
    desc: "Presentamos tu perfil a los entrenadores de nuestra red, abrimos la conversación y negociamos la beca en tu nombre.",
    links: [{ to: "/recursos/las-divisiones", label: "Las divisiones, explicadas" }],
  },
  {
    title: "Decisión y admisión",
    desc: "Comparas ofertas reales sobre la mesa y eliges destino. Después tramitamos juntos la admisión y la certificación de elegibilidad.",
    links: [{ to: "/recursos/becas-y-elegibilidad", label: "Becas y elegibilidad" }],
  },
  {
    title: "Visado y llegada al campus",
    desc: "Te guiamos con el visado y preparamos tu llegada. Y seguimos ahí los cuatro años de carrera, también si necesitas un transfer.",
    links: [{ to: "/recursos/visado-y-documentacion", label: "Visado y documentación" }],
  },
];

const STEPS_EN: Step[] = [
  {
    title: "Free evaluation",
    desc: "We analyse your athletic and academic profile and give you a straight answer about your scholarship options. No cost, no commitment.",
    links: [
      { to: "/recursos/las-divisiones#perfiles", label: "See where your profile fits" },
    ],
  },
  {
    title: "A personalised plan",
    desc: "You get an agent who stays with you from start to finish and sets the plan with you: target universities, timeline and family budget.",
  },
  {
    title: "Your profile for coaches",
    desc: "We build the highlight video and the athletic and academic profile coaches use to decide whether they want you on their team.",
    links: [
      { to: "/recursos/requisitos-y-perfil", label: "How the video is built" },
      { to: YOUTUBE_CHANNEL, label: "See examples on our channel", external: true },
    ],
  },
  {
    title: "Outreach and negotiation",
    desc: "We put your profile in front of the coaches in our network, open the conversation and negotiate the scholarship on your behalf.",
    links: [{ to: "/recursos/las-divisiones", label: "The divisions, explained" }],
  },
  {
    title: "Decision and admission",
    desc: "You compare real offers on the table and choose where to go. Then we handle admissions and eligibility certification together.",
    links: [{ to: "/recursos/becas-y-elegibilidad", label: "Scholarships & eligibility" }],
  },
  {
    title: "Visa and arrival on campus",
    desc: "We guide you through the visa and prepare your arrival. And we stay with you all four years, including if you need a transfer.",
    links: [{ to: "/recursos/visado-y-documentacion", label: "Visa & paperwork" }],
  },
];

const linkClass =
  "inline-flex items-center gap-1.5 font-body text-[13px] font-bold text-primary transition-colors hover:text-primary-hover";

const HomeProcessSection = () => {
  const { language } = useLanguage();
  const isEs = language === "es";
  const steps = isEs ? STEPS_ES : STEPS_EN;

  return (
    <section
      id="proceso"
      className="section-padding"
      style={{ backgroundColor: "hsl(var(--section-alt))" }}
    >
      <div className="container-wide px-4">
        {/* Header */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <span className="inline-block font-body text-xs font-bold tracking-[0.2em] uppercase text-primary mb-4">
            {isEs ? "Proceso" : "Process"}
          </span>
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-foreground leading-[1.05] mb-6">
            {isEs ? "El método " : "The "}
            <span className="text-primary">FUA</span>
            {isEs ? "" : " method"}
          </h2>
          <p className="font-body text-muted-foreground text-base sm:text-lg leading-relaxed">
            {isEs
              ? "Así funciona una beca de fútbol en una universidad de Estados Unidos. Seis pasos, un agente personal y cero sorpresas."
              : "This is how a soccer scholarship at a U.S. university works. Six steps, one personal agent and no surprises."}
          </p>
        </div>

        {/* Steps */}
        <ol
          className="grid gap-px sm:grid-cols-2 lg:grid-cols-3 border border-border rounded-2xl overflow-hidden"
          style={{ backgroundColor: "hsl(var(--border))" }}
        >
          {steps.map((step, i) => (
            <li
              key={step.title}
              className="group relative flex flex-col p-7 sm:p-8 lg:p-10 transition-colors duration-200 hover:bg-primary/[0.02]"
              style={{ backgroundColor: "hsl(var(--card))" }}
            >
              <span className="font-display text-4xl sm:text-5xl font-bold text-primary/25 leading-none mb-5 transition-colors duration-200 group-hover:text-primary/50">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="font-display text-xl sm:text-[1.375rem] font-bold text-foreground leading-snug mb-3">
                {step.title}
              </h3>
              <p className="font-body text-muted-foreground text-[15px] leading-relaxed">
                {step.desc}
              </p>

              {step.links && (
                <div className="mt-4 flex flex-col gap-2">
                  {step.links.map((link) =>
                    link.external ? (
                      <a
                        key={link.to}
                        href={link.to}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={linkClass}
                      >
                        {link.label}
                        <ArrowUpRight className="h-3.5 w-3.5" />
                      </a>
                    ) : (
                      <Link key={link.to} to={link.to} className={linkClass}>
                        {link.label}
                        <ArrowRight className="h-3.5 w-3.5" />
                      </Link>
                    ),
                  )}
                </div>
              )}

              <span
                aria-hidden="true"
                className="absolute bottom-0 left-0 h-[3px] w-0 group-hover:w-full"
                style={{
                  backgroundColor: "hsl(var(--primary))",
                  transition: "width 450ms cubic-bezier(0.23,1,0.32,1)",
                }}
              />
            </li>
          ))}
        </ol>

        {/* CTA + pointers */}
        <div className="mt-12 sm:mt-14 flex flex-col gap-5 sm:flex-row sm:items-center sm:gap-8">
          <Link
            to="/apply"
            className="inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary-hover text-primary-foreground font-body font-semibold px-6 py-3.5 rounded-lg transition-colors shrink-0"
          >
            {isEs ? "Empieza por el paso 1" : "Start with step 1"}
            <ArrowRight className="w-4 h-4" />
          </Link>
          <p className="font-body text-sm text-muted-foreground leading-relaxed">
            {isEs ? "Comprueba si cumples " : "Check whether you meet the "}
            <Link
              to="/recursos/requisitos-y-perfil"
              className="font-semibold text-primary hover:text-primary-hover transition-colors underline-offset-4 hover:underline"
            >
              {isEs ? "los requisitos" : "requirements"}
            </Link>
            {isEs ? " y lee cada paso a fondo en " : " and read every step in depth in "}
            <Link
              to="/recursos"
              className="font-semibold text-primary hover:text-primary-hover transition-colors underline-offset-4 hover:underline"
            >
              {isEs ? "Recursos" : "Resources"}
            </Link>
            {isEs ? ". ¿Buscas el Gap Year en España? Es " : ". Looking for the Gap Year in Spain? That's "}
            <Link
              to="/spain"
              className="font-semibold text-primary hover:text-primary-hover transition-colors underline-offset-4 hover:underline"
            >
              {isEs ? "otro programa" : "a different program"}
            </Link>
            .
          </p>
        </div>
      </div>
    </section>
  );
};

export default HomeProcessSection;
