import { useEffect, useRef } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useDocumentMeta } from "@/hooks/useDocumentMeta";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

declare global {
  interface Window {
    hbspt?: {
      forms: {
        create: (config: {
          portalId: string;
          formId: string;
          region: string;
          target: string;
        }) => void;
      };
    };
  }
}

const Apply = () => {
  const { t, language } = useLanguage();
  const es = language === "es";
  const formContainerRef = useRef<HTMLDivElement>(null);
  const scriptLoaded = useRef(false);

  useDocumentMeta({
    title: es
      ? "Aplica Ahora | FutbolUAgency"
      : "Apply Now | FutbolUAgency",
    description: es
      ? "Envía tu perfil deportivo y académico para una evaluación gratuita de tu potencial de beca universitaria en EE.UU."
      : "Submit your athletic and academic profile for a free evaluation of your US college scholarship potential.",
  });

  useEffect(() => {
    const loadForm = () => {
      if (formContainerRef.current && window.hbspt) {
        formContainerRef.current.innerHTML = "";
        window.hbspt.forms.create({
          portalId: "50757411",
          formId: "16a71fa4-3618-420a-b755-0abff6c34759",
          region: "na1",
          target: "#apply-hubspot-form-container",
        });
      }
    };

    if (scriptLoaded.current && window.hbspt) {
      loadForm();
      return;
    }

    const script = document.createElement("script");
    script.src = "//js.hsforms.net/forms/embed/v2.js";
    script.charset = "utf-8";
    script.async = true;
    script.onload = () => {
      scriptLoaded.current = true;
      loadForm();
    };
    document.body.appendChild(script);
  }, []);

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-16 md:pt-20">
        <section className="section-padding bg-background">
          <div className="container-wide px-4">
            <div className="max-w-2xl mx-auto">
              {/* Header */}
              <div className="text-center mb-10">
                <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
                  {t("apply.title")} <span className="text-primary italic">{t("apply.title.highlight")}</span>
                </h1>
                <p className="font-body text-muted-foreground text-base sm:text-lg">
                  {t("apply.subtitle")}
                </p>
              </div>

              {/* HubSpot form */}
              <div
                id="apply-hubspot-form-container"
                ref={formContainerRef}
                className="min-h-[400px]"
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
