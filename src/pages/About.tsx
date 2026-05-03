import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, X, Heart, Target, Shield, Users } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ceoIgnacio from "@/assets/ceo-ignacio.jpg";
import ceoMoha from "@/assets/ceo-moha.jpg";

const NAVY = "#12213a";
const RED = "#b00717";

type Bio = { es: string[]; en: string[] } | null;
type Member = {
  name: string;
  initials: string;
  role: { es: string; en: string };
  image: string | null;
  bio: Bio;
};

const teamMembers: Member[] = [
  {
    name: "Ignacio De Bejar",
    initials: "ID",
    role: { es: "Co-Founder & CEO", en: "Co-Founder & CEO" },
    image: ceoIgnacio,
    bio: {
      es: [
        "Ignacio vivió en primera persona lo difícil que es conseguir una beca deportiva en Estados Unidos. Tras formarse en el Hércules CF, decidió dar el salto a EE.UU. para continuar su carrera, pero descubrió que la agencia que debía ayudarlo no brindaba el apoyo prometido.",
        "Se encontró solo en un país nuevo, enfrentando rechazos y obstáculos que tuvo que superar por su cuenta mientras buscaba una universidad donde desarrollarse como atleta y estudiante.",
        "Esa experiencia lo motivó a dedicar su carrera a que ningún jugador viva lo mismo. Hoy, Ignacio utiliza su trayectoria y conocimiento del sistema universitario para guiar a futbolistas internacionales y acompañarlos paso a paso en su camino hacia una beca real en EE.UU.",
      ],
      en: [
        "Ignacio experienced firsthand how difficult it is to get a sports scholarship in the United States. After training at Hércules CF, he decided to make the leap to the U.S. to continue his career, but discovered that the agency supposed to help him didn't provide the promised support.",
        "He found himself alone in a new country, facing rejections and obstacles he had to overcome on his own while searching for a university to develop as an athlete and student.",
        "That experience motivated him to dedicate his career to ensuring no player goes through the same. Today, Ignacio uses his experience and knowledge of the university system to guide international soccer players step by step on their path to a real scholarship in the U.S.",
      ],
    },
  },
  {
    name: "Moha",
    initials: "MH",
    role: { es: "Co-Founder & CEO", en: "Co-Founder & CEO" },
    image: ceoMoha,
    bio: {
      es: [
        "Cuando Mohammed intentó transferirse a una universidad de mayor nivel, esperaba recibir el apoyo de la agencia que lo representaba. Sin embargo, en el momento más importante del proceso, fue abandonado sin guía ni acompañamiento.",
        "Enfrentó solo un camino lleno de incertidumbre, obstáculos y decisiones críticas que impactaban su futuro deportivo y académico.",
        "Esta experiencia lo llevó a crear una agencia con un propósito claro: ofrecer el apoyo que a él le faltó. Hoy, Moha ha ayudado a decenas de jugadores a conseguir becas y oportunidades reales, asegurándose de que cada uno reciba el acompañamiento cercano, profesional y humano que él nunca tuvo.",
      ],
      en: [
        "When Mohammed tried to transfer to a higher-level university, he expected to receive support from the agency representing him. However, at the most important moment of the process, he was abandoned without guidance or support.",
        "He faced alone a path full of uncertainty, obstacles, and critical decisions that impacted his athletic and academic future.",
        "This experience led him to create an agency with a clear purpose: to offer the support he lacked. Today, Moha has helped dozens of players get real scholarships and opportunities, ensuring each one receives the close, professional, and human support he never had.",
      ],
    },
  },
  { name: "Miguel Rojas", initials: "MR", role: { es: "Director Fútbol Latinoamérica", en: "Director Soccer LATAM" }, image: null, bio: null },
  { name: "Mario Serrano", initials: "MS", role: { es: "Director Marketing", en: "Marketing Director" }, image: null, bio: null },
  { name: "Dominiq Aquino", initials: "DA", role: { es: "Director Baseball", en: "Baseball Director" }, image: null, bio: null },
  { name: "Próximamente", initials: "VB", role: { es: "Director Volleyball", en: "Volleyball Director" }, image: null, bio: null },
];

const About = () => {
  const { language } = useLanguage();
  const es = language === "es";
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const selected = activeIndex !== null ? teamMembers[activeIndex] : null;

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-16 md:pt-20" style={{ backgroundColor: "#ffffff", color: NAVY }}>
        {/* HERO */}
        <section className="py-20 md:py-28">
          <div className="container-wide px-4 max-w-4xl mx-auto text-center">
            <span
              className="inline-block font-body text-xs tracking-[0.2em] uppercase font-semibold mb-5 px-3 py-1 rounded-full"
              style={{ color: RED, background: "rgba(176,7,23,0.08)" }}
            >
              {es ? "Nuestra historia" : "Our story"}
            </span>
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold leading-tight mb-6" style={{ color: NAVY }}>
              {es ? "Fundada por atletas que vivieron el problema" : "Founded by athletes who lived the problem"}
            </h1>
            <p className="font-body text-lg md:text-xl leading-relaxed" style={{ color: "rgba(18,33,58,0.7)" }}>
              {es
                ? "FutbolUAgency LLC. nació de una experiencia real: la frustración de buscar una beca en EE.UU. sin el apoyo adecuado. Hoy somos la agencia que nos habría gustado tener."
                : "FutbolUAgency LLC. was born from a real experience: the frustration of seeking a scholarship in the U.S. without proper support. Today we are the agency we wish we'd had."}
            </p>
          </div>
        </section>

        {/* ORIGIN STORY */}
        <section className="py-20 md:py-24" style={{ backgroundColor: "#f5f4f2" }}>
          <div className="container-wide px-4 max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              <div>
                <span className="font-body text-xs tracking-[0.2em] uppercase font-semibold mb-4 block" style={{ color: RED }}>
                  {es ? "Cómo empezó todo" : "How it all started"}
                </span>
                <h2 className="font-display text-3xl md:text-4xl font-bold mb-6 leading-tight" style={{ color: NAVY }}>
                  {es ? "Dos jugadores. La misma historia." : "Two players. The same story."}
                </h2>
                <div className="space-y-4">
                  {(es
                    ? [
                        "Ignacio y Moha se conocieron después de haber vivido experiencias casi idénticas: los dos intentaron llegar a universidades en EE.UU., los dos confiaron en agencias que los dejaron solos en el momento más importante.",
                        "En lugar de rendirse, decidieron aprender el sistema por su cuenta y ayudar a otros a no vivir lo mismo.",
                        "En 2020 fundaron FutbolUAgency LLC. con una promesa simple: acompañar a cada atleta como si fuera su propio hermano.",
                      ]
                    : [
                        "Ignacio and Moha met after having lived almost identical experiences: both tried to reach universities in the U.S., both trusted agencies that left them alone at the most important moment.",
                        "Instead of giving up, they decided to learn the system on their own and help others avoid the same experience.",
                        "In 2020 they founded FutbolUAgency LLC. with a simple promise: to accompany each athlete as if they were their own brother.",
                      ]
                  ).map((p, i) => (
                    <p key={i} className="font-body text-base md:text-lg leading-relaxed" style={{ color: "rgba(18,33,58,0.75)" }}>
                      {p}
                    </p>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {[
                  { num: "2020", label: es ? "Año de fundación" : "Year founded" },
                  { num: "350+", label: es ? "Atletas colocados" : "Athletes placed" },
                  { num: "$10M+", label: es ? "En becas conseguidas" : "In scholarships secured" },
                  { num: "98%", label: es ? "Satisfacción de familias" : "Family satisfaction" },
                ].map((s, i) => (
                  <div
                    key={i}
                    className="p-6 rounded-2xl bg-white"
                    style={{ border: "1px solid rgba(18,33,58,0.06)", boxShadow: "0 4px 16px rgba(18,33,58,0.04)" }}
                  >
                    <div className="font-display text-3xl md:text-4xl font-bold mb-2" style={{ color: RED }}>
                      {s.num}
                    </div>
                    <div className="font-body text-sm" style={{ color: "rgba(18,33,58,0.6)" }}>
                      {s.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* MISSION & VALUES */}
        <section className="py-20 md:py-24">
          <div className="container-wide px-4 max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <span className="font-body text-xs tracking-[0.2em] uppercase font-semibold mb-4 block" style={{ color: RED }}>
                {es ? "Lo que nos mueve" : "What drives us"}
              </span>
              <h2 className="font-display text-3xl md:text-4xl font-bold leading-tight" style={{ color: NAVY }}>
                {es ? "Nuestra Misión y Valores" : "Our Mission & Values"}
              </h2>
            </div>

            <div
              className="max-w-3xl mx-auto p-8 md:p-10 rounded-2xl mb-14 text-center"
              style={{ background: NAVY, color: "white" }}
            >
              <p className="font-display italic text-xl md:text-2xl leading-relaxed">
                {es
                  ? '"Nuestra misión es clara: que ningún talento se pierda por falta de información, por una agencia irresponsable o por no saber cómo funciona el sistema."'
                  : '"Our mission is clear: no talent should be lost due to lack of information, an irresponsible agency, or not knowing how the system works."'}
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
              {[
                { icon: Heart, title: es ? "Acompañamiento real" : "Real support", desc: es ? "Cada atleta tiene un agente personal que lo guía desde el primer día hasta que aterriza en su universidad." : "Each athlete has a personal agent who guides them from day one until they land at their university." },
                { icon: Shield, title: es ? "Transparencia total" : "Full transparency", desc: es ? "Desde el primer día decimos la verdad: qué es posible, qué no, y cómo maximizar tus opciones reales." : "From day one we tell the truth: what's possible, what's not, and how to maximize your real options." },
                { icon: Target, title: es ? "Resultados probados" : "Proven results", desc: es ? "No prometemos lo que no podemos cumplir. Nuestros números hablan: 350+ atletas colocados, 98% satisfacción." : "We don't promise what we can't deliver. Our numbers speak: 350+ placed athletes, 98% satisfaction." },
                { icon: Users, title: es ? "Familia primero" : "Family first", desc: es ? "Entendemos que detrás de cada jugador hay una familia. Los incluimos en cada decisión importante del proceso." : "We understand that behind every player there is a family. We include them in every important decision." },
              ].map((v, i) => {
                const Icon = v.icon;
                return (
                  <div
                    key={i}
                    className="p-6 md:p-8 rounded-2xl flex gap-5"
                    style={{ background: "#f5f4f2", border: "1px solid rgba(18,33,58,0.06)" }}
                  >
                    <div
                      className="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center"
                      style={{ background: "rgba(176,7,23,0.1)" }}
                    >
                      <Icon className="w-6 h-6" style={{ color: RED }} />
                    </div>
                    <div>
                      <h3 className="font-display text-xl font-bold mb-2" style={{ color: NAVY }}>
                        {v.title}
                      </h3>
                      <p className="font-body text-base leading-relaxed" style={{ color: "rgba(18,33,58,0.7)" }}>
                        {v.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* TEAM */}
        <section className="py-20 md:py-24" style={{ backgroundColor: "#f5f4f2" }}>
          <div className="container-wide px-4 max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <span className="font-body text-xs tracking-[0.2em] uppercase font-semibold mb-4 block" style={{ color: RED }}>
                {es ? "Las personas" : "The people"}
              </span>
              <h2 className="font-display text-3xl md:text-4xl font-bold mb-4 leading-tight" style={{ color: NAVY }}>
                {es ? "Nuestro Equipo" : "Our Team"}
              </h2>
              <p className="font-body text-base md:text-lg max-w-xl mx-auto" style={{ color: "rgba(18,33,58,0.7)" }}>
                {es ? "Las personas detrás de cada oportunidad que creamos." : "The people behind every opportunity we create."}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
              {teamMembers.map((member, i) => {
                const hasBio = member.bio !== null;
                return (
                  <div
                    key={i}
                    onClick={() => (hasBio ? setActiveIndex(i) : null)}
                    className="relative rounded-2xl overflow-hidden aspect-[3/4] group transition-all duration-300"
                    style={{
                      cursor: hasBio ? "pointer" : "default",
                      border: "1px solid rgba(18,33,58,0.08)",
                      background: "white",
                    }}
                    onMouseOver={(e) => {
                      if (hasBio) {
                        e.currentTarget.style.borderColor = RED;
                        e.currentTarget.style.boxShadow = "0 12px 32px rgba(176,7,23,0.15)";
                      }
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.borderColor = "rgba(18,33,58,0.08)";
                      e.currentTarget.style.boxShadow = "none";
                    }}
                  >
                    {member.image ? (
                      <img
                        src={member.image}
                        alt={member.name}
                        className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        style={{ objectPosition: "center 15%" }}
                      />
                    ) : (
                      <div
                        className="absolute inset-0 flex items-center justify-center"
                        style={{ background: "linear-gradient(135deg, #f5f4f2 0%, #e5e5e5 100%)" }}
                      >
                        <span className="font-display text-6xl font-bold" style={{ color: "rgba(18,33,58,0.15)" }}>
                          {member.initials}
                        </span>
                      </div>
                    )}

                    <div
                      className="absolute inset-0"
                      style={{ background: "linear-gradient(to top, rgba(18,33,58,0.92) 0%, rgba(18,33,58,0.4) 45%, rgba(18,33,58,0) 100%)" }}
                    />

                    <div className="absolute bottom-0 left-0 right-0 p-5">
                      <span
                        className="inline-block font-body text-[10px] tracking-[0.15em] uppercase font-semibold mb-2 px-2.5 py-1 rounded-full text-white"
                        style={{ background: RED }}
                      >
                        {member.role[es ? "es" : "en"]}
                      </span>
                      <h3 className="font-display text-lg font-bold text-white leading-tight mb-1.5" style={{ textShadow: "0 2px 8px rgba(0,0,0,0.6)" }}>
                        {member.name}
                      </h3>
                      {hasBio && (
                        <span className="inline-flex items-center gap-1.5 font-body text-sm text-white/80 group-hover:text-white transition-colors">
                          {es ? "Ver perfil" : "View profile"} <ArrowRight className="w-4 h-4" />
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 md:py-24 text-center">
          <div className="container-wide px-4 max-w-3xl mx-auto">
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4" style={{ color: NAVY }}>
              {es ? "¿Listo para dar el siguiente paso?" : "Ready to take the next step?"}
            </h2>
            <p className="font-body text-base md:text-lg mb-8" style={{ color: "rgba(18,33,58,0.7)" }}>
              {es ? "Aplica ahora y descubre qué oportunidades hay para ti." : "Apply now and discover what opportunities exist for you."}
            </p>
            <Link
              to="/apply"
              className="inline-flex items-center gap-2 font-body font-semibold px-8 py-3.5 rounded-lg transition-all text-sm sm:text-base text-white"
              style={{ background: RED, boxShadow: "0 8px 24px rgba(176,7,23,0.3)" }}
            >
              {es ? "Aplica Ahora" : "Apply Now"} <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </section>

        <Footer />
      </main>

      {/* MODAL */}
      {selected && (
        <div
          onClick={() => setActiveIndex(null)}
          style={{
            position: "fixed", inset: 0, zIndex: 50,
            background: "rgba(18,33,58,0.85)", backdropFilter: "blur(6px)",
            display: "flex", alignItems: "center", justifyContent: "center",
            padding: "24px",
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: "white", borderRadius: "20px",
              maxWidth: "620px", width: "100%",
              maxHeight: "90vh", overflowY: "auto",
              position: "relative",
            }}
          >
            <button
              onClick={() => setActiveIndex(null)}
              style={{
                position: "absolute", top: "16px", right: "16px", zIndex: 10,
                width: "32px", height: "32px", borderRadius: "50%",
                background: "#f5f4f2", border: "none", cursor: "pointer",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}
            >
              <X className="w-4 h-4" style={{ color: NAVY }} />
            </button>

            <div className="p-6 sm:p-8">
              <div className="flex flex-col sm:flex-row gap-5 mb-6">
                {selected.image ? (
                  <img
                    src={selected.image}
                    alt={selected.name}
                    className="w-32 h-40 sm:w-36 sm:h-48 object-cover rounded-xl flex-shrink-0"
                    style={{ objectPosition: "center 15%" }}
                  />
                ) : (
                  <div
                    className="w-32 h-40 sm:w-36 sm:h-48 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: "#f5f4f2" }}
                  >
                    <span className="font-display text-4xl font-bold" style={{ color: "rgba(18,33,58,0.2)" }}>
                      {selected.initials}
                    </span>
                  </div>
                )}
                <div className="flex flex-col justify-center">
                  <span
                    className="inline-block w-fit font-body text-[10px] tracking-[0.15em] uppercase font-semibold mb-2 px-2.5 py-1 rounded-full text-white"
                    style={{ background: RED }}
                  >
                    {selected.role[es ? "es" : "en"]}
                  </span>
                  <h2 className="font-display text-2xl sm:text-3xl font-bold" style={{ color: NAVY }}>
                    {selected.name}
                  </h2>
                </div>
              </div>

              <div style={{ height: "1px", background: "rgba(18,33,58,0.1)", margin: "0 0 24px" }} />

              <div className="space-y-4">
                {selected.bio ? (
                  selected.bio[es ? "es" : "en"].map((p: string, i: number) => (
                    <p key={i} className="font-body text-sm sm:text-base leading-relaxed" style={{ color: "rgba(18,33,58,0.75)" }}>
                      {p}
                    </p>
                  ))
                ) : (
                  <p className="font-body text-sm sm:text-base italic" style={{ color: "rgba(18,33,58,0.6)" }}>
                    {es ? "Bio próximamente." : "Bio coming soon."}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default About;
