import React, { createContext, useContext, useState, useEffect } from "react";

type Language = "es" | "en";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  es: {
    // Hero
    "hero.tag": "",
    "hero.headline": "Convierte tu talento en una",
    "hero.headline.highlight": "beca deportiva en Estados Unidos",
    "hero.subheadline": "Ayudamos a futbolistas internacionales a estudiar y jugar fútbol en universidades de Estados Unidos con una",
    "hero.subheadline.highlight": "oportunidad deportiva real",
    "hero.cta": "Comenzar mi Evaluación Gratuita",
    
    // Video Section
    "video.title": "Mira el",
    "video.title.highlight": "Vídeo",
    "video.cta.title": "Agendar Llamada Estratégica",
    "video.cta.subtitle": "Sesión 1 a 1 para evaluar tu caso",
    
    // CTA Section
    "cta.headline": "Transformamos tu sueño de estudiar y jugar en EE.UU.",
    "cta.headline.highlight": "en un plan real.",
    "cta.subheadline": "Lo que obtienes al aplicar con nosotros:",
    "cta.service1.title": "Evaluación deportiva profesional",
    "cta.service1.desc": "Analizamos tu nivel de juego, tu perfil académico y tu potencial para identificar las mejores oportunidades reales para ti.",
    "cta.service2.title": "Creación de tu perfil para becas",
    "cta.service2.desc": "Editamos tu video highlight, tus estadísticas, y diseñamos un perfil profesional que atrae a entrenadores de NCAA, NAIA y JUCO.",
    "cta.service3.title": "Representación y contacto directo con entrenadores",
    "cta.service3.desc": "Nos encargamos de hablar con los coaches, presentar tu perfil y conseguir respuestas reales y ofertas concretas.",
    "cta.service4.title": "Guía completa en visas, becas y admisiones",
    "cta.service4.desc": "Te acompañamos paso a paso hasta que estés aceptado y con beca asegurada. Admisiones, TOEFL, FAFSA, DS-160, I-20.",
    
    // Process Section
    "process.title": "Así es como funciona",
    "process.subtitle": "Nuestro Proceso para conseguir tu Beca Deportiva",
    "process.step1.title": "Evaluación Inicial",
    "process.step1.desc": "Analizamos tu perfil deportivo y académico para identificar las mejores oportunidades.",
    "process.step2.title": "Preparación de Material",
    "process.step2.desc": "Creamos tu video destacado y perfil profesional que impresionará a los entrenadores.",
    "process.step3.title": "Contacto con Universidades",
    "process.step3.desc": "Nos comunicamos directamente con entrenadores y coordinadores de admisiones.",
    "process.step4.title": "Aceptación y Beca",
    "process.step4.desc": "Te guiamos hasta obtener tu oferta oficial y comenzar tu aventura universitaria.",
    "process.phase": "Fase",
    
    // Team Section
    "team.title": "Más que una Agencia,",
    "team.title.highlight": "Somos tu Equipo",
    
    // Success Cases
    "success.title": "Nuestros",
    "success.title.highlight": "Casos de Éxito",
    
    // Footer
    "footer.home": "Inicio",
    "footer.evaluation": "Evaluación",
    "footer.contact": "Contacto",
    "footer.rights": "Todos los derechos reservados",
    
    // Metrics
    "metrics.scholarships": "Becas Conseguidas",
    "metrics.universities": "Universidades Partner",
    "metrics.satisfaction": "Satisfacción",
    "metrics.experience": "Años de Experiencia",
  },
  en: {
    // Hero
    "hero.tag": "",
    "hero.headline": "Turn your talent into a",
    "hero.headline.highlight": "sports scholarship in the United States",
    "hero.subheadline": "We help international soccer players study and play at American universities with a",
    "hero.subheadline.highlight": "real athletic opportunity",
    "hero.cta": "Start My Free Evaluation",
    
    // Video Section
    "video.title": "Watch the",
    "video.title.highlight": "Video",
    "video.cta.title": "Schedule Strategic Call",
    "video.cta.subtitle": "1-on-1 session to evaluate your case",
    
    // CTA Section
    "cta.headline": "We transform your dream of studying and playing in the U.S.",
    "cta.headline.highlight": "into a real plan.",
    "cta.subheadline": "What you get when you apply with us:",
    "cta.service1.title": "Professional athletic evaluation",
    "cta.service1.desc": "We analyze your playing level, academic profile, and potential to identify the best real opportunities for you.",
    "cta.service2.title": "Scholarship profile creation",
    "cta.service2.desc": "We edit your highlight video, your stats, and design a professional profile that attracts NCAA, NAIA, and JUCO coaches.",
    "cta.service3.title": "Direct representation and coach contact",
    "cta.service3.desc": "We handle talking to coaches, presenting your profile, and getting real responses and concrete offers.",
    "cta.service4.title": "Complete visa, scholarship, and admissions guidance",
    "cta.service4.desc": "We accompany you step by step until you're accepted with a secured scholarship. Admissions, TOEFL, FAFSA, DS-160, I-20.",
    
    // Process Section
    "process.title": "This is how it works",
    "process.subtitle": "Our Process to get your Sports Scholarship",
    "process.step1.title": "Initial Evaluation",
    "process.step1.desc": "We analyze your athletic and academic profile to identify the best opportunities.",
    "process.step2.title": "Material Preparation",
    "process.step2.desc": "We create your highlight video and professional profile that will impress coaches.",
    "process.step3.title": "University Contact",
    "process.step3.desc": "We communicate directly with coaches and admissions coordinators.",
    "process.step4.title": "Acceptance and Scholarship",
    "process.step4.desc": "We guide you until you get your official offer and start your university adventure.",
    "process.phase": "Phase",
    
    // Team Section
    "team.title": "More than an Agency,",
    "team.title.highlight": "We Are Your Team",
    
    // Success Cases
    "success.title": "Our",
    "success.title.highlight": "Success Stories",
    
    // Footer
    "footer.home": "Home",
    "footer.evaluation": "Evaluation",
    "footer.contact": "Contact",
    "footer.rights": "All rights reserved",
    
    // Metrics
    "metrics.scholarships": "Scholarships Achieved",
    "metrics.universities": "Partner Universities",
    "metrics.satisfaction": "Satisfaction",
    "metrics.experience": "Years of Experience",
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem("language");
    return (saved as Language) || "es";
  });

  useEffect(() => {
    localStorage.setItem("language", language);
  }, [language]);

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
