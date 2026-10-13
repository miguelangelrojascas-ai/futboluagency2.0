import { Link } from "react-router-dom";
import { ArrowRight, ClipboardList, MessageSquare, UserCheck } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useDocumentMeta } from "@/hooks/useDocumentMeta";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Globe } from "@/components/ui/globe";
import AirtableForm from "@/components/AirtableForm";

const Apply = () => {
  const { t, language } = useLanguage();
  const es = language === "es";

  useDocumentMeta({
    title: es
      ? "Evaluación gratuita | FutbolUAgency"
      : "Free evaluation | FutbolUAgency",
    description: es
      ? "Rellena el formulario de admisiones de FutbolUAgency y descubre qué opciones reales de beca tienes."
      : "Fill in the FutbolUAgency admissions form and find out what real scholarship options you have.",
  });

  const steps = [
    {
      Icon: ClipboardList,
      title: es ? "Rellenas el formulario" : "You fill in the form",
      desc: es
        ? "Tu perfil deportivo, tu vídeo y cuándo quieres empezar. Cinco minutos."
        : "Your athletic profile, your video and when you want to start. Five minutes.",
    },
    {
      Icon: MessageSquare,
      title: es ? "Revisamos tu perfil" : "We review your profile",
      desc: es
        ? "El equipo de admisiones lo valora uno a uno y ve qué divisiones encajan contigo."
        : "The admissions team reviews it one by one and sees which divisions fit you.",
    },
    {
      Icon: UserCheck,
      title: es ? "Agendamos la llamada" : "We book the call",
      desc: es
        ? "Si vemos opciones reales, te enviamos el enlace para que elijas día y hora."
        : "If we see real options, we send you the link to pick a day and time.",
    },
  ];

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-16 md:pt-20">
        <section className="section-padding relative overflow-hidden bg-background">
          <div className="container-wide px-4">
            <div className="relative grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
              <div className="relative z-10">
                <span className="mb-4 inline-block font-body text-xs font-bold uppercase tracking-[0.2em] text-primary">
                  {es ? "Evaluación gratuita" : "Free evaluation"}
                </span>
                <h1 className="mb-5 font-display text-4xl font-bold leading-[1.05] sm:text-5xl">
                  {t("apply.title")}{" "}
                  <span className="italic text-primary">{t("apply.title.highlight")}</span>
                </h1>
                <p className="mb-8 font-body text-base leading-relaxed text-muted-foreground sm:text-lg">
                  {t("apply.subtitle")}
                </p>

                <a
                  href="#formulario"
                  className="inline-flex items-center gap-2 rounded-lg bg-primary px-7 py-4 font-body font-semibold text-primary-foreground transition-colors hover:bg-primary-hover"
                >
                  {es ? "Rellenar el formulario" : "Fill in the form"}
                  <ArrowRight className="h-4 w-4" />
                </a>

                <p className="mt-5 font-body text-sm text-muted-foreground">
                  {es ? "¿Prefieres escribirnos? " : "Prefer to write? "}
                  <a
                    href="mailto:futboluagency@gmail.com"
                    className="font-semibold text-primary underline-offset-4 hover:underline"
                  >
                    futboluagency@gmail.com
                  </a>
                </p>
              </div>

              <div className="relative h-[300px] w-full sm:h-[360px]">
                <Globe className="absolute bottom-6 left-1/2 max-w-[380px] -translate-x-1/2 sm:max-w-[440px]" />
              </div>
            </div>

            {/* What happens after you send it */}
            <ol className="mt-16 grid gap-px overflow-hidden rounded-2xl border border-border sm:grid-cols-3" style={{ backgroundColor: "hsl(var(--border))" }}>
              {steps.map(({ Icon, title, desc }, i) => (
                <li key={title} className="flex flex-col p-7" style={{ backgroundColor: "hsl(var(--card))" }}>
                  <span className="mb-4 grid h-10 w-10 place-items-center rounded-full bg-primary/10 text-primary">
                    <Icon className="h-[18px] w-[18px]" />
                  </span>
                  <h2 className="mb-2 font-display text-lg font-bold text-foreground">
                    <span className="mr-2 text-primary/40">{String(i + 1).padStart(2, "0")}</span>
                    {title}
                  </h2>
                  <p className="font-body text-[15px] leading-relaxed text-muted-foreground">{desc}</p>
                </li>
              ))}
            </ol>

            {/* The form itself, served from the CRM so nothing is retyped. */}
            <div id="formulario" className="scroll-mt-28">
              <h2 className="mb-2 mt-16 font-display text-2xl font-bold text-foreground sm:text-3xl">
                {es ? "Cuéntanos tu caso" : "Tell us about your case"}
              </h2>
              <p className="mb-3 max-w-xl font-body text-base leading-relaxed text-muted-foreground">
                {es
                  ? "Ten a mano el enlace a tu vídeo de highlights: es lo que un entrenador mira primero."
                  : "Have your highlight video link ready: it is the first thing a coach looks at."}
              </p>
              <p className="mb-8 max-w-xl font-body text-sm leading-relaxed text-muted-foreground">
                {es ? "¿No sabes qué presupuesto necesitas? Lee primero " : "Not sure what budget you need? Read "}
                <Link
                  to="/recursos/costes-y-financiacion"
                  className="font-semibold text-primary underline-offset-4 hover:underline"
                >
                  {es ? "la guía de costes" : "the costs guide"}
                </Link>
                {es ? " y vuelve." : " first and come back."}
              </p>
              <AirtableForm
                title={es ? "Formulario de admisiones" : "Admissions form"}
              />
            </div>
          </div>
        </section>
        <Footer />
      </main>
    </>
  );
};

export default Apply;
