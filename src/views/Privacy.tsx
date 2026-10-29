"use client";

import LocaleLink from "@/components/LocaleLink";
import { useLanguage } from "@/contexts/LanguageContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

/**
 * Draft privacy notice.
 *
 * The technical facts here (what we collect, which processors run, where the
 * data goes) are accurate. The legal identity block is intentionally marked
 * so it is filled in before publishing, and the whole text should be reviewed
 * by a lawyer — see the notice rendered at the top of the page.
 */
const Privacy = () => {
  const { language } = useLanguage();
  const es = language === "es";


  const sections = es
    ? [
        {
          title: "Quién es el responsable",
          body: [
            "FutbolUAgency LLC, sociedad registrada en Texas (Estados Unidos), con dirección en Houston, Texas.",
            "Para cualquier cuestión sobre tus datos puedes escribirnos a futboluagency@gmail.com.",
            "[COMPLETAR: número de registro de la sociedad, dirección postal completa y, si procede, representante en la UE a efectos del RGPD.]",
          ],
        },
        {
          title: "Qué datos recogemos",
          body: [
            "Solo los que nos facilitas tú. No hay analítica, no hay perfilado y no compramos datos a terceros.",
            "Del formulario de solicitud: nombre, datos de contacto, historial deportivo, antecedentes académicos, presupuesto familiar y objetivos. Más adelante, durante el proceso, documentación académica y deportiva.",
            "De la reserva de llamada, si llegamos a ese paso: nombre, correo y la franja horaria que elijas.",
            "Si eres menor de edad, el formulario lo debe completar tu madre, padre o tutor legal.",
          ],
        },
        {
          title: "Para qué los usamos",
          body: [
            "Para evaluar tu perfil, presentarlo a entrenadores universitarios, gestionar la admisión y acompañarte durante el proceso. Es decir, para prestarte el servicio que nos pides.",
            "No usamos tus datos para publicidad ni los vendemos a nadie.",
          ],
        },
        {
          title: "Con quién los compartimos",
          body: [
            "Con las universidades y entrenadores a los que presentamos tu perfil, que es el objeto del servicio. Esto implica una transferencia de datos a Estados Unidos.",
            "Con los organismos de elegibilidad cuando corresponde: NCAA Eligibility Center o NAIA.",
            "Con los proveedores que hacen funcionar la web y nuestra operativa: Vercel (alojamiento de la web), Airtable (donde se guarda tu solicitud), Calendly (para la cita de la llamada) y Google (correo y documentos).",
            "[COMPLETAR: base legal de las transferencias internacionales — cláusulas contractuales tipo, consentimiento explícito u otra — y acuerdos de encargado de tratamiento firmados con cada proveedor.]",
          ],
        },
        {
          title: "Cuánto tiempo los guardamos",
          body: [
            "[COMPLETAR: plazo de conservación. Lo habitual es mantenerlos mientras dure la relación y después durante el periodo que exija la normativa fiscal y mercantil.]",
          ],
        },
        {
          title: "Tus derechos",
          body: [
            "Puedes pedirnos acceso a tus datos, su rectificación, su supresión, la limitación u oposición al tratamiento, y la portabilidad. También puedes retirar tu consentimiento en cualquier momento.",
            "Escríbenos a futboluagency@gmail.com y te responderemos. Si crees que no hemos atendido bien tu solicitud, puedes reclamar ante la Agencia Española de Protección de Datos (aepd.es).",
          ],
        },
        {
          title: "Cookies",
          body: [
            "Esta web no usa cookies de analítica, de seguimiento ni de publicidad, y no instala ninguna cookie propia.",
            "El único servicio externo que se carga en la web es YouTube, y solo cuando le das al play a un vídeo. Si no lo haces, no se envía ninguna petición a terceros. El formulario se envía a nuestro propio servidor, no a un tercero.",
          ],
        },
      ]
    : [
        {
          title: "Who is responsible",
          body: [
            "FutbolUAgency LLC, a company registered in Texas (United States), based in Houston, Texas.",
            "For anything concerning your data, write to futboluagency@gmail.com.",
            "[TO COMPLETE: company registration number, full postal address and, where applicable, an EU representative for GDPR purposes.]",
          ],
        },
        {
          title: "What we collect",
          body: [
            "Only what you give us. There is no analytics, no profiling, and we buy no data from third parties.",
            "From the application form: name, contact details, athletic history, academic background, family budget and goals. Later in the process, academic and athletic documentation.",
            "From booking a call: name, email and the time slot you pick.",
            "If you are a minor, the form must be completed by your parent or legal guardian.",
          ],
        },
        {
          title: "What we use it for",
          body: [
            "To evaluate your profile, present it to college coaches, handle admissions and support you through the process. In other words, to provide the service you asked for.",
            "We do not use your data for advertising and we do not sell it to anyone.",
          ],
        },
        {
          title: "Who we share it with",
          body: [
            "With the universities and coaches we present your profile to, which is the point of the service. This involves transferring data to the United States.",
            "With eligibility bodies where applicable: the NCAA Eligibility Center or the NAIA.",
            "With the providers that run the site and our operations: Vercel (site hosting), Airtable (where your application is stored), Calendly (for scheduling the call) and Google (email and documents).",
            "[TO COMPLETE: legal basis for international transfers — standard contractual clauses, explicit consent or other — and the data processing agreements signed with each provider.]",
          ],
        },
        {
          title: "How long we keep it",
          body: [
            "[TO COMPLETE: retention period. Typically for the duration of the relationship and afterwards for the period required by tax and commercial law.]",
          ],
        },
        {
          title: "Your rights",
          body: [
            "You can ask us for access to your data, its correction or deletion, restriction of or objection to processing, and portability. You can also withdraw your consent at any time.",
            "Write to futboluagency@gmail.com and we will respond. If you believe we have not handled your request properly, you can complain to the Spanish Data Protection Agency (aepd.es).",
          ],
        },
        {
          title: "Cookies",
          body: [
            "This site uses no analytics, tracking or advertising cookies, and sets no first-party cookies of its own.",
            "The only external service the site loads is YouTube, and only when you press play on a video. If you do not, no third-party request is ever made. The form is submitted to our own server, not to a third party.",
          ],
        },
      ];

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-16 md:pt-20">
        <section className="section-padding bg-background">
          <div className="container-wide px-4">
            <div className="mx-auto max-w-3xl">
              <span className="mb-4 inline-block font-body text-xs font-bold uppercase tracking-[0.2em] text-primary">
                {es ? "Legal" : "Legal"}
              </span>
              <h1 className="mb-6 font-display text-4xl font-bold leading-[1.1] sm:text-5xl">
                {es ? "Política de privacidad" : "Privacy policy"}
              </h1>

              {/* Visible while the text has not been through legal review. */}
              <div className="mb-10 rounded-xl border border-dashed border-primary/40 bg-primary/[0.04] p-4">
                <p className="font-body text-sm leading-relaxed text-foreground">
                  <span className="font-bold">
                    {es ? "Borrador pendiente de revisión legal. " : "Draft pending legal review. "}
                  </span>
                  {es
                    ? "Los apartados marcados con [COMPLETAR] necesitan los datos de la sociedad antes de publicarse."
                    : "The sections marked [TO COMPLETE] need the company's details before publishing."}
                </p>
              </div>

              <div className="space-y-10">
                {sections.map((section) => (
                  <div key={section.title}>
                    <h2 className="mb-3 font-display text-xl font-bold text-foreground sm:text-2xl">
                      {section.title}
                    </h2>
                    {section.body.map((p, i) => (
                      <p
                        key={i}
                        className={`mb-3 font-body text-[15px] leading-relaxed last:mb-0 sm:text-base ${
                          p.startsWith("[") ? "rounded-lg bg-muted px-4 py-3 text-muted-foreground/80" : "text-muted-foreground"
                        }`}
                      >
                        {p}
                      </p>
                    ))}
                  </div>
                ))}
              </div>

            </div>
          </div>
        </section>
        <Footer />
      </main>
    </>
  );
};

export default Privacy;
