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
    "nav.usa": "EE.UU.",
    "nav.spain": "España",
    "nav.players": "Jugadores",
    "nav.apply": "Aplicar",
    "nav.applyCta": "Aplica Ahora",

    // Hero
    "hero.tag": "",
    "hero.headline": "Transforma tu talento en",
    "hero.headline.highlight": "oportunidades.",
    "hero.subheadline": "Ayudamos a futbolistas internacionales a conseguir oportunidades en los mejores programas",
    "hero.cta.usa": "Explorar Becas en EE.UU.",
    "hero.cta.spain": "Explorar Programa en España",

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
    "cta.service2.title": "Construcción de tu perfil",
    "cta.service2.desc": "Creamos tu perfil profesional, incluyendo video highlight y presentación optimizada para entrenadores y clubes.",
    "cta.service3.title": "Representación y contacto directo",
    "cta.service3.desc": "Presentamos tu perfil a entrenadores y clubes, generando oportunidades reales y respuestas concretas.",
    "cta.service4.title": "Acompañamiento hasta tu destino",
    "cta.service4.desc": "Te guiamos en todo el proceso hasta asegurar tu lugar, ya sea en una universidad o en un club en Europa.",

    // Path Selection
    "path.title": "Elige tu",
    "path.title.highlight": "Camino",
    "path.subtitle": "Dos oportunidades únicas para desarrollar tu carrera futbolística a nivel internacional.",
    "path.usa.title": "Becas Deportivas en EE.UU.",
    "path.usa.desc": "Estudia y juega fútbol en una universidad americana con beca deportiva. NCAA, NAIA y JUCO.",
    "path.usa.cta": "Explorar programa EE.UU.",
    "path.spain.title": "Juega en Academias en España",
    "path.spain.desc": "Entrena y compite en academias y clubes de fútbol competitivos en España durante una temporada completa.",
    "path.spain.cta": "Explorar programa España",

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

    // Calendly
    "calendly.title": "Agenda tu Evaluación Gratuita",
    "calendly.subtitle": "Selecciona un horario que te convenga para hablar con nuestro equipo sobre tu futuro deportivo.",
    "calendly.button": "Agendar Reunión",

    // Other Sports
    "othersports.title": "Otros Deportes — Próximamente",
    "othersports.desc": "Estamos expandiendo nuestro programa a otros deportes. Si eres atleta de basketball, tenis u otros deportes, pronto tendremos oportunidades para ti.",
    "othersports.coming": "Próximamente disponible — Regístrate para ser notificado",

    // USA Page
    "usa.tag": "Programa Estados Unidos",
    "usa.hero.title": "Cómo Conseguir una",
    "usa.hero.highlight": "Beca de Fútbol en EE.UU.",
    "usa.hero.desc": "Te guiamos paso a paso para conseguir tu beca deportiva en una universidad americana. NCAA, NAIA o JUCO.",
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

    // Spain Page
    "spain.tag": "Programa España",
    "spain.hero.title": "Juega y Entrena en",
    "spain.hero.highlight": "Academias de Fútbol en España",
    "spain.hero.desc": "Nuestro programa ofrece a jugadores internacionales la oportunidad de entrenar y competir en clubes y academias de fútbol competitivas en España.",
    "spain.system.title": "El Sistema de Fútbol en España",
    "spain.system.desc": "España cuenta con una de las estructuras de fútbol más desarrolladas del mundo, con ligas competitivas en todos los niveles.",
    "spain.leagues.title": "Ligas y Competición",
    "spain.leagues.desc": "Desde ligas juveniles hasta divisiones profesionales, los jugadores compiten en un entorno de alto nivel durante toda la temporada.",
    "spain.universities.title": "Formación Académica",
    "spain.universities.desc": "Combinamos el entrenamiento deportivo con programas de estudio, asegurando el desarrollo integral del jugador.",
    "spain.benefits.title": "¿Por qué España?",
    "spain.benefit1.title": "Nivel Competitivo",
    "spain.benefit1.desc": "Entrena en una de las mejores ligas del mundo con metodología española.",
    "spain.benefit2.title": "Estilo de Vida",
    "spain.benefit2.desc": "Clima ideal, cultura rica y un entorno perfecto para el desarrollo personal.",
    "spain.benefit3.title": "Exposición",
    "spain.benefit3.desc": "Visibilidad ante scouts y ojeadores de clubes profesionales europeos.",
    "spain.benefit4.title": "Desarrollo Técnico",
    "spain.benefit4.desc": "Metodología de entrenamiento reconocida mundialmente por formar jugadores técnicos.",
    "spain.process.title": "Cómo Funciona",
    "spain.step1.title": "Evaluación del Jugador",
    "spain.step1.desc": "Analizamos tu nivel, edad y objetivos para encontrar la mejor academia para ti.",
    "spain.step2.title": "Selección de Club",
    "spain.step2.desc": "Te ubicamos en un club o academia acorde a tu nivel y aspiraciones.",
    "spain.step3.title": "Documentación y Viaje",
    "spain.step3.desc": "Gestionamos visados, seguros y toda la logística necesaria.",
    "spain.step4.title": "Integración y Temporada",
    "spain.step4.desc": "Te incorporas al equipo y compites durante toda la temporada oficial.",
    "spain.cta.title": "¿Listo para jugar en España?",
    "spain.cta.desc": "Aplica ahora y comienza tu experiencia futbolística en España.",

    // Players Page
    "players.title": "Jugadores que",
    "players.title.highlight": "Confiaron en Nosotros",
    "players.subtitle": "Conoce a los jugadores que ya están cumpliendo su sueño de jugar y estudiar a nivel internacional.",

    // Apply Page
    "apply.title": "Comienza tu",
    "apply.title.highlight": "Camino",
    "apply.subtitle": "Completa el formulario y nuestro equipo se pondrá en contacto contigo para evaluar tu perfil.",
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
    "nav.usa": "USA",
    "nav.spain": "Spain",
    "nav.players": "Players",
    "nav.apply": "Apply",
    "nav.applyCta": "Apply Now",

    // Hero
    "hero.tag": "",
    "hero.headline": "Transform Your Talent Into",
    "hero.headline.highlight": "Opportunities.",
    "hero.subheadline": "We help international players get opportunities in top programs",
    "hero.cta.usa": "Explore USA Scholarships",
    "hero.cta.spain": "Explore Spain Program",

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

    // Path Selection
    "path.title": "Choose Your",
    "path.title.highlight": "Path",
    "path.subtitle": "Two unique opportunities to develop your football career at an international level.",
    "path.usa.title": "Sports Scholarships in the U.S.",
    "path.usa.desc": "Study and play soccer at an American university with a sports scholarship. NCAA, NAIA and JUCO.",
    "path.usa.cta": "Explore USA program",
    "path.spain.title": "Play in Spanish Academies",
    "path.spain.desc": "Train and compete in competitive football academies and clubs in Spain for a full season.",
    "path.spain.cta": "Explore Spain program",

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

    // Calendly
    "calendly.title": "Schedule Your Free Evaluation",
    "calendly.subtitle": "Select a time that works for you to talk with our team about your athletic future.",
    "calendly.button": "Schedule Meeting",

    // Other Sports
    "othersports.title": "Other Sports — Coming Soon",
    "othersports.desc": "We're expanding our program to other sports. If you're a basketball, tennis or other sport athlete, we'll have opportunities for you soon.",
    "othersports.coming": "Coming soon — Register to be notified",

    // USA Page
    "usa.tag": "USA Program",
    "usa.hero.title": "How to Get a",
    "usa.hero.highlight": "Soccer Scholarship in the U.S.",
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

    // Spain Page
    "spain.tag": "Spain Program",
    "spain.hero.title": "Play and Train at",
    "spain.hero.highlight": "Football Academies in Spain",
    "spain.hero.desc": "Our program gives international players the opportunity to train and compete in competitive football academies and clubs in Spain.",
    "spain.system.title": "The Football System in Spain",
    "spain.system.desc": "Spain has one of the most developed football structures in the world, with competitive leagues at every level.",
    "spain.leagues.title": "Leagues and Competition",
    "spain.leagues.desc": "From youth leagues to professional divisions, players compete in a high-level environment throughout the season.",
    "spain.universities.title": "Academic Development",
    "spain.universities.desc": "We combine athletic training with study programs, ensuring the player's comprehensive development.",
    "spain.benefits.title": "Why Spain?",
    "spain.benefit1.title": "Competitive Level",
    "spain.benefit1.desc": "Train in one of the best leagues in the world with Spanish methodology.",
    "spain.benefit2.title": "Lifestyle",
    "spain.benefit2.desc": "Ideal climate, rich culture and a perfect environment for personal development.",
    "spain.benefit3.title": "Exposure",
    "spain.benefit3.desc": "Visibility to scouts from professional European clubs.",
    "spain.benefit4.title": "Technical Development",
    "spain.benefit4.desc": "World-renowned training methodology for developing technical players.",
    "spain.process.title": "How It Works",
    "spain.step1.title": "Player Evaluation",
    "spain.step1.desc": "We analyze your level, age and goals to find the best academy for you.",
    "spain.step2.title": "Club Selection",
    "spain.step2.desc": "We place you in a club or academy matching your level and aspirations.",
    "spain.step3.title": "Documentation and Travel",
    "spain.step3.desc": "We manage visas, insurance and all necessary logistics.",
    "spain.step4.title": "Integration and Season",
    "spain.step4.desc": "You join the team and compete throughout the official season.",
    "spain.cta.title": "Ready to play in Spain?",
    "spain.cta.desc": "Apply now and start your football experience in Spain.",

    // Players Page
    "players.title": "Players Who",
    "players.title.highlight": "Trusted Us",
    "players.subtitle": "Meet the players who are already living their dream of playing and studying at an international level.",

    // Apply Page
    "apply.title": "Start Your",
    "apply.title.highlight": "Journey",
    "apply.subtitle": "Fill out the form and our team will contact you to evaluate your profile.",
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
