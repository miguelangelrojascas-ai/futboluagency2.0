import React, { createContext, useContext, useState, useEffect } from "react";

type Language = "es" | "en";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  es: {
    // Nav
    "nav.home": "Inicio",
    "nav.usa": "Becas EE.UU.",
    "nav.players": "Nuestros Jugadores",
    "nav.resources": "Recursos",
    "nav.privacy": "Privacidad",
    "nav.cookies": "Cookies",
    "nav.about": "Nosotros",
    "nav.apply": "Aplicar",
    "nav.applyCta": "Aplica Ahora",

    // Hero
    "hero.tag": "",
    "hero.headline": "Consigue una Beca Deportiva en",
    "hero.headline.highlight": "Universidades de Estados Unidos",
    "hero.subheadline": "Ayudamos a futbolistas de 16 a 23 años a estudiar y competir en universidades de Estados Unidos a través de becas deportivas.",
    "hero.cta.usa": "Explorar Becas en EE.UU.",
    "hero.cta.apply": "Envía tu perfil",

    // Video Section
    "video.title": "Mira el",
    "video.title.highlight": "Vídeo",
    "video.cta.title": "Envía tu perfil",
    "video.cta.subtitle": "Lo revisamos y te escribimos para la llamada",

    // CTA Section
    "cta.headline": "Transformamos tu sueño de estudiar y jugar en EE.UU.",
    "cta.headline.highlight": "en un plan real.",
    "cta.subheadline": "Lo que obtienes al aplicar con nosotros:",
    "cta.service1.title": "Evaluación deportiva profesional",
    "cta.service1.desc": "Analizamos tu nivel de juego, tu perfil académico y tu potencial para identificar las mejores oportunidades reales para ti.",
    "cta.service2.title": "Construcción de tu perfil",
    "cta.service2.desc": "Creamos tu perfil profesional, incluyendo video highlight y presentación optimizada para entrenadores y clubes.",
    "cta.service3.title": "Representación y contacto directo",
    "cta.service3.desc": "Presentamos tu perfil a entrenadores y clubes, generando oportunidades reales y respuestas concretas.",
    "cta.service4.title": "Acompañamiento hasta tu destino",
    "cta.service4.desc": "Te guiamos en todo el proceso hasta asegurar tu lugar, ya sea en una universidad o en un club en Europa.",


    // Process Section
    "process.title": "Así es como funciona",
    "process.subtitle": "Nuestro Proceso para conseguir tu Beca Deportiva",
    "process.step1.title": "Aplicación y Evaluación Gratuita",
    "process.step1.desc": "Analizamos personalmente tu perfil deportivo y académico para darte una respuesta real sobre tus posibilidades de becadeportiva.",
    "process.step2.title": "Admisión y Plan Personalizado",
    "process.step2.desc": "Diseñamos un plan de acción a tu medida. Se te asignará un agente personal y nuestro equipo empezará a trabajar en el material que buscan los entrenadores.",
    "process.step3.title": "Búsqueda de Universidades",
    "process.step3.desc": "Identificamos los programas y equipos que mejor encajan con lo que buscas. Buscamos el equilibrio perfecto entre tu nivel futbolístico, tus metas académicas y las expectativas de tu familia.",
    "process.step4.title": "Negociación de Contrato",
    "process.step4.desc": "Contactamos directamente con los coaches de las universidades, presentamos tu talento y negociamos las mejores condiciones de beca posibles en tu nombre.",
    "process.step5.title": "Decisión y Trámites de Admisión",
    "process.step5.desc": "Te asesoramos en la elección final de tu universidad y realizamos juntos todos los trámites de admisión.",
    "process.step6.title": "Visado y Tu Nueva Vida en USA",
    "process.step6.desc": "Te guiamos en la obtención de tu Visa y preparamos tu llegada al campus. Una vez allí, te acompañaremos durante los 4 años de tu carrera universitaria.",
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
    "metrics.universities": "Universidades con Colocaciones",
    "metrics.satisfaction": "Satisfacción",
    "metrics.experience": "Años de Experiencia",

    // Other Sports

    // USA Page
    "usa.tag": "Programa Estados Unidos",
    "usa.hero.title": "Consigue una Beca de Fútbol Universitario en Estados Unidos y",
    "usa.hero.highlight": "Compite al Máximo Nivel",
    "usa.hero.desc": "Te guiamos paso a paso para jugar, estudiar y desarrollarte en universidades americanas.",
    "usa.system.title": "El Sistema Universitario de EE.UU.",
    "usa.ncaa.d1": "El nivel más alto. Universidades con los mejores programas deportivos y becas completas.",
    "usa.ncaa.d2": "Nivel alto con buenas becas. Gran equilibrio entre deporte y estudios.",
    "usa.ncaa.naia": "Universidades más pequeñas con mucha flexibilidad en becas y oportunidades.",
    "usa.ncaa.juco": "Colegios comunitarios de 2 años. Ideal para comenzar y transferirse después.",
    "usa.level.highest": "Nivel Élite",
    "usa.level.high": "Nivel Alto",
    "usa.level.competitive": "Competitivo",
    "usa.level.development": "Desarrollo",
    "usa.process.title": "Nuestro Proceso de Reclutamiento",
    "usa.step1.title": "Evaluación Deportiva y Académica",
    "usa.step1.desc": "Analizamos tu nivel de juego, historial académico y objetivos personales.",
    "usa.step2.title": "Creación de Perfil Profesional",
    "usa.step2.desc": "Producimos tu video highlight y perfil deportivo que enviaremos a los coaches.",
    "usa.step3.title": "Contacto con Entrenadores",
    "usa.step3.desc": "Enviamos tu perfil a universidades seleccionadas y gestionamos la comunicación.",
    "usa.step4.title": "Ofertas y Negociación de Becas",
    "usa.step4.desc": "Te ayudamos a evaluar las ofertas y negociar las mejores condiciones de beca.",
    "usa.step5.title": "Admisión, Visa y Viaje",
    "usa.step5.desc": "Gestionamos todo el proceso de admisión, visa estudiantil y preparación para el viaje.",
    "usa.req.title": "Requisitos",
    "usa.req.level": "Nivel competitivo de fútbol (academia, semiprofesional o superior)",
    "usa.req.english": "Nivel básico de inglés (o disposición para preparar el TOEFL)",
    "usa.req.academics": "Expediente académico aceptable (bachillerato completo o en curso)",
    "usa.req.age": "Entre 17 y 24 años típicamente",
    "usa.scholarship.title": "Tipos de Becas",
    "usa.scholarship.desc": "Las becas pueden cubrir desde un porcentaje hasta la totalidad de los costos universitarios.",
    "usa.scholarship.partial": "Beca Parcial",
    "usa.scholarship.partial.desc": "Cubre entre el 30% y 80% de los costos. Es el tipo más común en NCAA DII y NAIA.",
    "usa.scholarship.full": "Beca Completa",
    "usa.scholarship.full.desc": "Cubre el 100% de matrícula, alojamiento y alimentación. Disponible en NCAA DI y algunas NAIA.",
    "usa.timeline.title": "Cronograma Típico",
    "usa.timeline.m1": "Mes 1-2",
    "usa.timeline.t1": "Evaluación inicial y creación de perfil profesional",
    "usa.timeline.m2": "Mes 2-4",
    "usa.timeline.t2": "Envío de perfil a universidades y primeros contactos con coaches",
    "usa.timeline.m3": "Mes 4-6",
    "usa.timeline.t3": "Entrevistas, ofertas y negociación de becas",
    "usa.timeline.m4": "Mes 6-8",
    "usa.timeline.t4": "Aceptación, proceso de admisión y solicitud de visa",
    "usa.timeline.m5": "Mes 8-10",
    "usa.timeline.t5": "Preparación final y viaje a Estados Unidos",
    "usa.cta.title": "¿Listo para dar el salto?",
    "usa.cta.desc": "Aplica ahora y comienza tu camino hacia una beca deportiva en Estados Unidos.",


    // Players Page
    "players.title": "Jugadores que",
    "players.title.highlight": "Confiaron en Nosotros",
    "players.subtitle": "Conoce a los jugadores que ya están cumpliendo su sueño de jugar y estudiar a nivel internacional.",

    // Apply Page
    "apply.title": "Comienza tu",
    "apply.title.highlight": "Camino",
    "apply.subtitle": "Rellena el formulario y nuestro equipo de admisiones evaluará tu perfil deportivo y académico. Si vemos opciones reales, te escribimos para agendar la llamada. Sin compromiso y sin coste.",
    "apply.name": "Nombre Completo",
    "apply.name.placeholder": "Tu nombre completo",
    "apply.age": "Edad",
    "apply.country": "País",
    "apply.country.placeholder": "Tu país",
    "apply.position": "Posición",
    "apply.level": "Nivel",
    "apply.level.professional": "Profesional",
    "apply.level.semipro": "Semi-Profesional",
    "apply.level.academy": "Academia / Cantera",
    "apply.level.amateur": "Amateur",
    "apply.level.youth": "Juvenil",
    "apply.video": "Link de Video (YouTube, Vimeo, etc.)",
    "apply.email": "Email",
    "apply.whatsapp": "WhatsApp",
    "apply.select": "Seleccionar...",
    "apply.submit": "Enviar Solicitud",
    "apply.success.title": "¡Solicitud Enviada!",
    "apply.success.desc": "Gracias por tu interés. Nuestro equipo revisará tu perfil y te contactará pronto.",
  },
  en: {
    // Nav
    "nav.home": "Home",
    "nav.usa": "USA Scholarships",
    "nav.players": "Our Players",
    "nav.resources": "Resources",
    "nav.privacy": "Privacy",
    "nav.cookies": "Cookies",
    "nav.about": "About Us",
    "nav.apply": "Apply",
    "nav.applyCta": "Apply Now",

    // Hero
    "hero.tag": "",
    "hero.headline": "Transform Your Talent Into",
    "hero.headline.highlight": "Opportunities.",
    "hero.subheadline": "We help international players get opportunities in top programs",
    "hero.cta.usa": "Explore USA Scholarships",
    "hero.cta.apply": "Send your profile",

    // Video Section
    "video.title": "Watch the",
    "video.title.highlight": "Video",
    "video.cta.title": "Send your profile",
    "video.cta.subtitle": "We review it and write to you about the call",

    // CTA Section
    "cta.headline": "We transform your dream of studying and playing in the U.S.",
    "cta.headline.highlight": "into a real plan.",
    "cta.subheadline": "What you get when you apply with us:",
    "cta.service1.title": "Professional athletic evaluation",
    "cta.service1.desc": "We analyze your playing level, academic profile, and potential to identify the best real opportunities for you.",
    "cta.service2.title": "Profile building",
    "cta.service2.desc": "We create your professional profile, including highlight video and presentation optimized for coaches and clubs.",
    "cta.service3.title": "Direct representation and contact",
    "cta.service3.desc": "We present your profile to coaches and clubs, generating real opportunities and concrete responses.",
    "cta.service4.title": "Support to your destination",
    "cta.service4.desc": "We guide you through the entire process to secure your spot, whether at a university or a club in Europe.",


    // Process Section
    "process.title": "This is how it works",
    "process.subtitle": "Our Process to get your Sports Scholarship",
    "process.step1.title": "Free Application & Evaluation",
    "process.step1.desc": "It all starts with your application. We personally analyze your athletic and academic profile to give you a real answer about your scholarship possibilities before taking the next step.",
    "process.step2.title": "Admission & Personalized Plan",
    "process.step2.desc": "Once you join FutbolU LLC., we design your custom roadmap. You'll be assigned a personal agent and our editing team will start working on your profile and a high-impact highlight video.",
    "process.step3.title": "University Search",
    "process.step3.desc": "We identify the programs and teams that best fit what you're looking for. We seek the perfect balance between your soccer level, your academic goals, and your family's expectations.",
    "process.step4.title": "Contract Negotiation",
    "process.step4.desc": "We go to bat for you. We contact coaches in the U.S. directly, present your talent, and negotiate the best possible scholarship terms on your behalf.",
    "process.step5.title": "Decision & Admission Process",
    "process.step5.desc": "We guide you through your final university choice. You're not alone in the paperwork: we complete all admission procedures together so every document is perfect.",
    "process.step6.title": "Visa & Your New Life in the USA",
    "process.step6.desc": "We guide you through obtaining your F-1 Visa and prepare your arrival on campus. Once there, we stay by your side: FutbolU LLC. supports you throughout all 4 years of your university life.",
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
    "metrics.universities": "Universities with Placements",
    "metrics.satisfaction": "Satisfaction",
    "metrics.experience": "Years of Experience",

    // Other Sports

    // USA Page
    "usa.tag": "USA Program",
    "usa.hero.title": "Get a College Soccer Scholarship in the U.S. and",
    "usa.hero.highlight": "Compete at the Highest Level",
    "usa.hero.desc": "We guide you step by step to get your sports scholarship at an American university. NCAA, NAIA or JUCO.",
    "usa.system.title": "The U.S. University System",
    "usa.ncaa.d1": "The highest level. Universities with the best athletic programs and full scholarships.",
    "usa.ncaa.d2": "High level with good scholarships. Great balance between sports and academics.",
    "usa.ncaa.naia": "Smaller universities with great scholarship flexibility and opportunities.",
    "usa.ncaa.juco": "2-year community colleges. Ideal to start and transfer later.",
    "usa.level.highest": "Elite Level",
    "usa.level.high": "High Level",
    "usa.level.competitive": "Competitive",
    "usa.level.development": "Development",
    "usa.process.title": "Our Recruitment Process",
    "usa.step1.title": "Athletic and Academic Evaluation",
    "usa.step1.desc": "We analyze your playing level, academic history and personal goals.",
    "usa.step2.title": "Professional Profile Creation",
    "usa.step2.desc": "We produce your highlight video and athletic profile to send to coaches.",
    "usa.step3.title": "Coach Contact",
    "usa.step3.desc": "We send your profile to selected universities and manage communication.",
    "usa.step4.title": "Offers and Scholarship Negotiation",
    "usa.step4.desc": "We help you evaluate offers and negotiate the best scholarship conditions.",
    "usa.step5.title": "Admission, Visa and Travel",
    "usa.step5.desc": "We manage the entire admission process, student visa and travel preparation.",
    "usa.req.title": "Requirements",
    "usa.req.level": "Competitive football level (academy, semi-professional or higher)",
    "usa.req.english": "Basic English level (or willingness to prepare for TOEFL)",
    "usa.req.academics": "Acceptable academic record (high school completed or in progress)",
    "usa.req.age": "Typically between 17 and 24 years old",
    "usa.scholarship.title": "Types of Scholarships",
    "usa.scholarship.desc": "Scholarships can cover from a percentage to the entirety of university costs.",
    "usa.scholarship.partial": "Partial Scholarship",
    "usa.scholarship.partial.desc": "Covers between 30% and 80% of costs. Most common in NCAA DII and NAIA.",
    "usa.scholarship.full": "Full Scholarship",
    "usa.scholarship.full.desc": "Covers 100% of tuition, housing and meals. Available in NCAA DI and some NAIA.",
    "usa.timeline.title": "Typical Timeline",
    "usa.timeline.m1": "Month 1-2",
    "usa.timeline.t1": "Initial evaluation and professional profile creation",
    "usa.timeline.m2": "Month 2-4",
    "usa.timeline.t2": "Profile sent to universities and first coach contacts",
    "usa.timeline.m3": "Month 4-6",
    "usa.timeline.t3": "Interviews, offers and scholarship negotiation",
    "usa.timeline.m4": "Month 6-8",
    "usa.timeline.t4": "Acceptance, admission process and visa application",
    "usa.timeline.m5": "Month 8-10",
    "usa.timeline.t5": "Final preparation and travel to the United States",
    "usa.cta.title": "Ready to make the leap?",
    "usa.cta.desc": "Apply now and start your path to a sports scholarship in the United States.",


    // Players Page
    "players.title": "Players Who",
    "players.title.highlight": "Trusted Us",
    "players.subtitle": "Meet the players who are already living their dream of playing and studying at an international level.",

    // Apply Page
    "apply.title": "Start Your",
    "apply.title.highlight": "Journey",
    "apply.subtitle": "Fill in the form and our admissions team will assess your athletic and academic profile. If we see real options, we will write to you to book the call. No commitment, no cost.",
    "apply.name": "Full Name",
    "apply.name.placeholder": "Your full name",
    "apply.age": "Age",
    "apply.country": "Country",
    "apply.country.placeholder": "Your country",
    "apply.position": "Position",
    "apply.level": "Level",
    "apply.level.professional": "Professional",
    "apply.level.semipro": "Semi-Professional",
    "apply.level.academy": "Academy / Youth",
    "apply.level.amateur": "Amateur",
    "apply.level.youth": "Youth",
    "apply.video": "Video Link (YouTube, Vimeo, etc.)",
    "apply.email": "Email",
    "apply.whatsapp": "WhatsApp",
    "apply.select": "Select...",
    "apply.submit": "Submit Application",
    "apply.success.title": "Application Sent!",
    "apply.success.desc": "Thank you for your interest. Our team will review your profile and contact you soon.",
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
