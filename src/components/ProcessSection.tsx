"use client";

import { useEffect, useRef, useState } from "react";
import LocaleLink from "@/components/LocaleLink";
import { useLanguage } from "@/contexts/LanguageContext";

const NAVY = "hsl(var(--foreground))";
const RED = "hsl(var(--primary))";

const STEPS_DATA = [
  {
    phase: "01",
    titleKey: "process.step1.title",
    descKey: "process.step1.desc",
    image: "/images/process-01.jpg",
    gradient: "linear-gradient(135deg, #0a1628 0%, #1a2f52 100%)",
  },
  {
    phase: "02",
    titleKey: "process.step2.title",
    descKey: "process.step2.desc",
    image: "/images/process-02.jpg",
    gradient: "linear-gradient(135deg, #12213a 0%, #0f3460 100%)",
  },
  {
    phase: "03",
    titleKey: "process.step3.title",
    descKey: "process.step3.desc",
    image: "/images/process-03.jpg",
    gradient: "linear-gradient(135deg, #0a1a28 0%, #12354a 100%)",
  },
  {
    phase: "04",
    titleKey: "process.step4.title",
    descKey: "process.step4.desc",
    image: "/images/process-04.jpg",
    gradient: "linear-gradient(135deg, #1a0a0a 0%, #3a1216 100%)",
  },
  {
    phase: "05",
    titleKey: "process.step5.title",
    descKey: "process.step5.desc",
    image: "/images/process-05.jpg",
    gradient: "linear-gradient(135deg, #0a0a1a 0%, #16123a 100%)",
  },
  {
    phase: "06",
    titleKey: "process.step6.title",
    descKey: "process.step6.desc",
    image: "/images/process-06.jpg",
    gradient: "linear-gradient(135deg, #0a1a0a 0%, #123a16 100%)",
  },
];

/**
 * SALIDA DE BALÓN POR LA DERECHA, toque a toque (viewBox 1000 x 1000).
 *
 * No es un zig-zag regular: imita cómo progresa de verdad un equipo. Hay
 * pases cortos de apoyo, un retroceso al central cuando aprietan, un cambio
 * largo a la línea, una pared con el lateral que se incorpora, un balón
 * conducido al espacio y un centro atrás desde el fondo. Las distancias y
 * los ángulos son desiguales a propósito.
 *
 * Va pegada a la banda derecha porque la mitad izquierda la tapa la imagen.
 */
const MATCH_NODES = [
  { x: 905, y: 70, type: "start" },   // Saque de puerta
  { x: 852, y: 148, type: "short" },  // Apoyo corto al central derecho
  { x: 928, y: 212, type: "short" },  // Abre al lateral por la línea
  { x: 874, y: 186, type: "back" },   // Le aprietan: retrocede al central
  { x: 941, y: 398, type: "long" },   // Cambio largo a la banda
  { x: 846, y: 447, type: "short" },  // Se asocia por dentro
  { x: 922, y: 487, type: "short" },  // Pared con el lateral que sube
  { x: 897, y: 645, type: "long" },   // Balón conducido al espacio
  { x: 927, y: 757, type: "cross" },  // Llega al fondo
  { x: 736, y: 838, type: "header" }, // Centro atrás al punto de penalti
  { x: 520, y: 955, type: "goal" },   // Remate: sale hacia el botón
];

const PLAY_PATH = [
  "M 905 70",
  "L 852 148",                 // corto, hacia dentro
  "L 928 212",                 // corto, a la línea
  "L 874 186",                 // retroceso bajo presión
  "Q 925 300 941 398",         // cambio largo, con comba
  "L 846 447",                 // corto por dentro
  "L 922 487",                 // pared de primeras
  "Q 915 570 897 645",         // conducción al espacio
  "L 927 757",                 // hasta la línea de fondo
  "Q 860 820 736 838",         // centro atrás
  "L 520 955",                 // remate hacia la portería (el botón)
].join(" ");

/** Confeti determinista para la celebración en el CTA. */
const CONFETTI_PARTICLES = Array.from({ length: 42 }, (_, i) => {
  const angle = (i / 42) * Math.PI * 2 - Math.PI / 2 + (i % 3) * 0.12;
  const velocity = 75 + (i % 5) * 32;
  const tx = Math.cos(angle) * velocity * 1.35;
  const ty = Math.sin(angle) * velocity - 35; // Impulso inicial hacia arriba
  const colors = [
    "hsl(var(--primary))",
    "hsl(var(--foreground))",
    "#f59e0b",
    "#10b981",
    "#3b82f6",
    "#ffffff",
  ];
  return {
    id: i,
    tx: Math.round(tx),
    ty: Math.round(ty),
    rot: ((i * 73) % 720) - 360,
    color: colors[i % colors.length],
    delay: (i % 6) * 0.035,
    width: i % 2 === 0 ? 9 : 6,
    height: i % 3 === 0 ? 6 : 12,
  };
});

type FieldVisibility = "subtle" | "balanced" | "xray";

const ProcessSection = ({
  fieldVisibility = "balanced",
}: {
  /** Cuánto se ve la pizarra táctica detrás del texto. */
  fieldVisibility?: FieldVisibility;
}) => {
  const { t } = useLanguage();
  const [activeStep, setActiveStep] = useState(0);
  const [isHeaderMoment, setIsHeaderMoment] = useState(false);
  const [isGoal, setIsGoal] = useState(false);
  const [ctaHitKey, setCtaHitKey] = useState(0);
  const [imgError, setImgError] = useState<Record<number, boolean>>({});

  const sectionRef = useRef<HTMLElement>(null);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);
  /** El bloque de texto en sí, para saber dónde acaba la fase 6. */
  const contentRefs = useRef<(HTMLDivElement | null)[]>([]);
  const wasGoalRef = useRef(false);

  // Referencias para animar el SVG a 60fps sin re-renderizar React
  const activePathRef = useRef<SVGPathElement>(null);
  const ballGroupRef = useRef<SVGGElement>(null);
  const ballSpinRef = useRef<SVGGElement>(null);

  useEffect(() => {
    let rafId: number;

    const updateAnimation = () => {
      const vh = window.innerHeight;
      let progress = 0;

      const firstStep = stepRefs.current[0];
      const lastStep = stepRefs.current[STEPS_DATA.length - 1];

      if (firstStep && lastStep && firstStep.offsetHeight > 0) {
        // Desktop: Progreso exacto desde el centro del Paso 1 al centro del Paso 6
        const firstRect = firstStep.getBoundingClientRect();
        const lastRect = lastStep.getBoundingClientRect();
        const startY = firstRect.top + firstRect.height / 2;
        /* El gol cae cuando se acaba de leer la fase 6, no en su centro: el
           ancla es el final de su bloque de texto. */
        const lastContent = contentRefs.current[STEPS_DATA.length - 1];
        const endY = lastContent
          ? lastContent.getBoundingClientRect().bottom
          : lastRect.top + lastRect.height / 2;
        const triggerY = vh * 0.55;

        const totalDistance = endY - startY;
        if (totalDistance > 0) {
          progress = (triggerY - startY) / totalDistance;
        }

        // Actualizar el paso activo
        stepRefs.current.forEach((el, i) => {
          if (!el) return;
          const rect = el.getBoundingClientRect();
          const mid = rect.top + rect.height / 2;
          if (mid < vh * 0.65 && mid > -rect.height / 2) {
            setActiveStep((prev) => (prev !== i ? i : prev));
          }
        });
      } else if (sectionRef.current) {
        // Mobile fallback
        const rect = sectionRef.current.getBoundingClientRect();
        const scrollable = rect.height - vh * 1.1;
        if (scrollable > 0) {
          progress = (-rect.top + vh * 0.25) / scrollable;
        }
        const mobileIndex = Math.min(
          STEPS_DATA.length - 1,
          Math.max(0, Math.floor(progress * STEPS_DATA.length))
        );
        setActiveStep((prev) => (prev !== mobileIndex ? mobileIndex : prev));
      }

      const clampedProgress = Math.max(0, Math.min(1, progress));

      // Animar línea de pase y el balón sutil
      const pathEl = activePathRef.current;
      const ballEl = ballGroupRef.current;
      const spinEl = ballSpinRef.current;

      if (pathEl && ballEl && spinEl) {
        const totalLength = pathEl.getTotalLength();
        const currentLength = totalLength * clampedProgress;

        pathEl.style.strokeDasharray = `${totalLength}`;
        pathEl.style.strokeDashoffset = `${totalLength - currentLength}`;

        const point = pathEl.getPointAtLength(currentLength);

        // Elevación sutil durante el centro desde la banda (82% a 94% del recorrido)
        let ballScale = 1;
        if (clampedProgress > 0.82 && clampedProgress < 0.94) {
          const crossPhase = (clampedProgress - 0.82) / 0.12;
          ballScale = 1 + Math.sin(crossPhase * Math.PI) * 0.28;
        }

        ballEl.setAttribute(
          "transform",
          `translate(${point.x}, ${point.y}) scale(${ballScale.toFixed(2)})`
        );
        spinEl.setAttribute("transform", `rotate(${clampedProgress * 820})`);
      }

      const headerActive = clampedProgress >= 0.92;
      const goalScored = clampedProgress >= 0.96;

      setIsHeaderMoment((prev) => (prev !== headerActive ? headerActive : prev));
      setIsGoal((prev) => (prev !== goalScored ? goalScored : prev));

      // Impacto en el botón y confeti cada vez que entra el gol
      if (goalScored && !wasGoalRef.current) {
        wasGoalRef.current = true;
        setCtaHitKey((k) => k + 1);
      } else if (!goalScored && clampedProgress < 0.88) {
        wasGoalRef.current = false;
      }
    };

    const onScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(updateAnimation);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    updateAnimation();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(rafId);
    };
  }, []);

  // Ajustes de sutileza
  const pitchStrokeOpacity =
    fieldVisibility === "xray" ? 0.22 : fieldVisibility === "balanced" ? 0.08 : 0.045;
  const passLineOpacity =
    fieldVisibility === "xray" ? 0.65 : fieldVisibility === "balanced" ? 0.28 : 0.16;
  const ballOpacity =
    fieldVisibility === "xray" ? 0.9 : fieldVisibility === "balanced" ? 0.55 : 0.35;
  const textOpacity = fieldVisibility === "xray" ? 0.15 : 1;

  return (
    <section
      ref={sectionRef}
      style={{
        background: "hsl(var(--background))",
        color: NAVY,
        padding: "120px 0 80px",
      }}
    >
      {/* Header */}
      <div
        style={{
          maxWidth: 1280,
          margin: "0 auto",
          padding: "0 24px 80px",
          textAlign: "center",
        }}
      >
        <h2
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(2.5rem, 5vw, 4rem)",
            fontWeight: 700,
            marginBottom: 16,
            letterSpacing: "-0.02em",
          }}
        >
          {t("process.title")}
        </h2>
        <p
          style={{
            fontFamily: "Inter, sans-serif",
            fontSize: "1.125rem",
            color: "rgba(18,33,58,0.7)",
            maxWidth: 640,
            margin: "0 auto",
            lineHeight: 1.6,
          }}
        >
          {t("process.subtitle")}
        </p>
        <div
          style={{
            width: 60,
            height: 3,
            background: RED,
            margin: "32px auto 0",
            borderRadius: 2,
          }}
        />
      </div>

      {/* El campo se queda pegado solo mientras hay pasos: al cerrarse este
          contenedor, en la tarjeta de la fase 06, deja de mostrarse. */}
      <div style={{ position: "relative" }}>
        {/* ── CAMPO A PANTALLA COMPLETA (solo detrás de los pasos y el CTA) ──
            Una pista absoluta del alto de este contenedor encierra al sticky,
            de modo que el campo no puede asomar en la sección siguiente. El
            truco anterior del margen negativo sí lo dejaba escapar. */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            zIndex: 0,
          }}
        >
          <div
            style={{
              position: "sticky",
              top: 0,
              height: "100vh",
              overflow: "hidden",
            }}
          >
          <svg
            viewBox="0 0 1000 1000"
            preserveAspectRatio="xMidYMid slice"
            style={{ width: "100%", height: "100%" }}
          >
            {/* Líneas del campo */}
            <g
              stroke={NAVY}
              strokeOpacity={pitchStrokeOpacity}
              strokeWidth="1.5"
              fill="none"
              style={{ transition: "stroke-opacity 0.4s ease" }}
            >
              <rect x="40" y="40" width="920" height="920" rx="6" />
              <line x1="40" y1="500" x2="960" y2="500" />
              <circle cx="500" cy="500" r="95" />
              <circle cx="500" cy="500" r="2.5" fill={NAVY} fillOpacity={pitchStrokeOpacity} />

              {/* Área propia (arriba) */}
              <rect x="300" y="40" width="400" height="140" />
              <rect x="410" y="40" width="180" height="55" />
              <path d="M 345 180 A 85 85 0 0 0 655 180" />

              {/* Área rival (abajo). La portería es el botón, así que no se dibuja aquí. */}
              <rect x="300" y="820" width="400" height="140" />
              <rect x="410" y="905" width="180" height="55" />
              <path d="M 345 820 A 85 85 0 0 1 655 820" />

              {/* Córners */}
              <path d="M 40 58 A 18 18 0 0 0 58 40" />
              <path d="M 942 40 A 18 18 0 0 0 960 58" />
              <path d="M 40 942 A 18 18 0 0 1 58 960" />
              <path d="M 942 960 A 18 18 0 0 1 960 942" />
            </g>

            {/* Guía punteada de la jugada */}
            <path
              d={PLAY_PATH}
              fill="none"
              stroke={NAVY}
              strokeOpacity={pitchStrokeOpacity * 0.85}
              strokeWidth="1.2"
              strokeDasharray="4 6"
              strokeLinejoin="round"
            />

            {/* Línea de pases que se dibuja con el scroll */}
            <path
              ref={activePathRef}
              d={PLAY_PATH}
              fill="none"
              stroke={RED}
              strokeOpacity={passLineOpacity}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* Micro-nodos de toque */}
            {MATCH_NODES.map((pt, idx) => (
              <g key={idx}>
                <circle
                  cx={pt.x}
                  cy={pt.y}
                  r={pt.type === "header" ? "4" : "2.6"}
                  fill={pt.type === "header" && isHeaderMoment ? RED : NAVY}
                  fillOpacity={
                    pt.type === "header" && isHeaderMoment ? 0.65 : pitchStrokeOpacity * 1.4
                  }
                />
                {pt.type === "header" && isHeaderMoment && (
                  <circle
                    cx={pt.x}
                    cy={pt.y}
                    r="7"
                    fill="none"
                    stroke={RED}
                    strokeOpacity="0.4"
                    strokeWidth="1.2"
                    style={{ animation: "headerImpact 1.1s ease-out infinite" }}
                  />
                )}
              </g>
            ))}

            {/* ── BALÓN ── */}
            <g
              ref={ballGroupRef}
              transform="translate(905, 70)"
              style={{ opacity: ballOpacity, transition: "opacity 0.3s ease" }}
            >
              <g ref={ballSpinRef}>
                <circle r="10" fill="hsl(var(--background))" stroke={NAVY} strokeWidth="1.4" />
                <polygon
                  points="0,-4.2 4,-1.3 2.5,3.4 -2.5,3.4 -4,-1.3"
                  fill={NAVY}
                  fillOpacity="0.75"
                />
                <line x1="0" y1="-4.2" x2="0" y2="-10" stroke={NAVY} strokeWidth="1" />
                <line x1="4" y1="-1.3" x2="9.4" y2="-3.1" stroke={NAVY} strokeWidth="1" />
                <line x1="2.5" y1="3.4" x2="5.9" y2="8" stroke={NAVY} strokeWidth="1" />
                <line x1="-2.5" y1="3.4" x2="-5.9" y2="8" stroke={NAVY} strokeWidth="1" />
                <line x1="-4" y1="-1.3" x2="-9.4" y2="-3.1" stroke={NAVY} strokeWidth="1" />
              </g>
            </g>
          </svg>
          </div>
        </div>

        {/* ── DESKTOP: Sticky scroll ── */}
        <div
          className="process-desktop"
          style={{
            position: "relative",
            zIndex: 1,
            maxWidth: 1280,
            margin: "0 auto",
            padding: "0 24px",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 80,
            alignItems: "start",
          }}
        >
          {/* LEFT — Sticky image */}
          <div
            style={{
              position: "sticky",
              top: "10vh",
              height: "80vh",
              borderRadius: 24,
              overflow: "hidden",
              boxShadow:
                "0 30px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.05)",
            }}
          >
            {STEPS_DATA.map((s, i) => (
              <div
                key={i}
                style={{
                  position: "absolute",
                  inset: 0,
                  opacity: activeStep === i ? 1 : 0,
                  transition: "opacity 0.7s ease",
                  background: s.gradient,
                }}
              >
                {!imgError[i] && (
                  <img
                    src={s.image}
                    alt={t(s.titleKey)}
                    onError={() =>
                      setImgError((prev) => ({ ...prev, [i]: true }))
                    }
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                )}
                {/* Bottom gradient overlay */}
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background:
                      "linear-gradient(180deg, rgba(0,0,0,0) 40%, rgba(0,0,0,0.85) 100%)",
                  }}
                />
                {/* Big phase number watermark */}
                <div
                  style={{
                    position: "absolute",
                    bottom: 32,
                    left: 40,
                    fontFamily: "'Playfair Display', serif",
                    fontSize: "8rem",
                    fontWeight: 700,
                    color: "rgba(255,255,255,0.95)",
                    lineHeight: 1,
                    textShadow: "0 4px 30px rgba(0,0,0,0.6)",
                  }}
                >
                  {s.phase}
                </div>
              </div>
            ))}

            {/* Right-side progress dots */}
            <div
              style={{
                position: "absolute",
                right: 20,
                top: "50%",
                transform: "translateY(-50%)",
                display: "flex",
                flexDirection: "column",
                gap: 10,
                zIndex: 5,
              }}
            >
              {STEPS_DATA.map((_, i) => (
                <button
                  key={i}
                  onClick={() =>
                    stepRefs.current[i]?.scrollIntoView({
                      behavior: "smooth",
                      block: "center",
                    })
                  }
                  aria-label={`Ir a fase ${i + 1}`}
                  style={{
                    width: "5px",
                    height: activeStep === i ? "22px" : "5px",
                    borderRadius: "3px",
                    background:
                      activeStep === i ? "white" : "rgba(255,255,255,0.25)",
                    transition: "all 0.3s ease",
                    cursor: "pointer",
                    border: "none",
                    padding: 0,
                  }}
                />
              ))}
            </div>
          </div>

          {/* RIGHT — Pasos de texto */}
          <div style={{ position: "relative" }}>

            {/* ── PASOS DE TEXTO ── */}
            <div
              style={{
                position: "relative",
                zIndex: 1,
                opacity: textOpacity,
                transition: "opacity 0.35s ease",
              }}
            >
              {STEPS_DATA.map((s, i) => {
                const isActive = activeStep === i;
                return (
                  <div
                    key={i}
                    ref={(el) => {
                      stepRefs.current[i] = el;
                    }}
                    style={{
                      minHeight: "85vh",
                      display: "flex",
                      alignItems: "center",
                      padding: "32px 0",
                    }}
                  >
                    <div
                      ref={(el) => {
                        contentRefs.current[i] = el;
                      }}
                      style={{ position: "relative", width: "100%" }}
                    >
                      {/* Velo que mantiene el texto legible sobre el campo. Sin
                          bordes ni blur: solo el fondo difuminándose hacia la
                          banda derecha, por donde pasa la jugada. */}
                      <span
                        aria-hidden="true"
                        style={{
                          position: "absolute",
                          inset: "-28px -56px -28px -32px",
                          zIndex: -1,
                          background:
                            "radial-gradient(120% 90% at 20% 50%, hsl(var(--background)) 55%, color-mix(in srgb, hsl(var(--background)) 80%, transparent) 78%, transparent 100%)",
                        }}
                      />
                      {/* Phase pill */}
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 16,
                          marginBottom: 24,
                          opacity: isActive ? 1 : 0.45,
                          transition: "opacity 0.5s ease",
                        }}
                      >
                        <div
                          style={{
                            width: 48,
                            height: 48,
                            borderRadius: "50%",
                            background: isActive ? RED : "rgba(18,33,58,0.08)",
                            color: isActive ? "white" : NAVY,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontFamily: "'Playfair Display', serif",
                            fontWeight: 700,
                            fontSize: "1.1rem",
                            transition: "background 0.5s ease",
                          }}
                        >
                          {s.phase}
                        </div>
                        <span
                          style={{
                            fontFamily: "Inter, sans-serif",
                            fontSize: "0.75rem",
                            fontWeight: 600,
                            letterSpacing: "0.2em",
                            color: "rgba(18,33,58,0.6)",
                          }}
                        >
                          FASE {s.phase} DE 6
                        </span>
                      </div>

                      {/* Title */}
                      <h3
                        style={{
                          fontFamily: "'Playfair Display', serif",
                          fontSize: "clamp(2rem, 3.5vw, 3rem)",
                          fontWeight: 700,
                          lineHeight: 1.1,
                          marginBottom: 24,
                          color: NAVY,
                          opacity: isActive ? 1 : 0.5,
                          transform: isActive
                            ? "translateX(0)"
                            : "translateX(-12px)",
                          transition: "all 0.5s ease",
                        }}
                      >
                        {t(s.titleKey)}
                      </h3>

                      {/* Description */}
                      <p
                        style={{
                          fontFamily: "Inter, sans-serif",
                          fontSize: "1.0625rem",
                          lineHeight: 1.7,
                          color: "rgba(18,33,58,0.7)",
                          maxWidth: 520,
                          opacity: isActive ? 1 : 0.4,
                          transition: "opacity 0.5s ease",
                        }}
                      >
                        {t(s.descKey)}
                      </p>

                      {/* Animated accent line */}
                      <div
                        style={{
                          marginTop: 32,
                          height: 2,
                          background: RED,
                          width: isActive ? 80 : 0,
                          transition: "width 0.6s ease",
                          borderRadius: 2,
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* ── MOBILE: Stacked cards ── */}
        <div
          className="process-mobile"
          style={{
            position: "relative",
            zIndex: 1,
            display: "none",
            maxWidth: 640,
            margin: "0 auto",
            padding: "0 20px",
          }}
        >
          {STEPS_DATA.map((s, i) => (
            <div
              key={i}
              style={{
                marginBottom: 48,
                borderRadius: 20,
                overflow: "hidden",
                background: "hsl(var(--background))",
                border: "1px solid rgba(18,33,58,0.08)",
                boxShadow: "0 4px 24px rgba(0,0,0,0.06)",
              }}
            >
              <div
                style={{
                  position: "relative",
                  width: "100%",
                  aspectRatio: "16 / 10",
                  background: s.gradient,
                }}
              >
                {!imgError[i] && (
                  <img
                    src={s.image}
                    alt={t(s.titleKey)}
                    onError={() =>
                      setImgError((prev) => ({ ...prev, [i]: true }))
                    }
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                )}
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background:
                      "linear-gradient(180deg, rgba(0,0,0,0) 50%, rgba(0,0,0,0.8) 100%)",
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    bottom: 16,
                    left: 20,
                    fontFamily: "'Playfair Display', serif",
                    fontSize: "2.5rem",
                    fontWeight: 700,
                    color: "white",
                    lineHeight: 1,
                  }}
                >
                  FASE {s.phase}
                </div>
              </div>

              <div style={{ padding: "24px 24px 28px" }}>
                <h3
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: "1.6rem",
                    fontWeight: 700,
                    lineHeight: 1.2,
                    marginBottom: 12,
                    color: NAVY,
                  }}
                >
                  {t(s.titleKey)}
                </h3>
                <p
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: "0.95rem",
                    lineHeight: 1.6,
                    color: "rgba(18,33,58,0.7)",
                  }}
                >
                  {t(s.descKey)}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* ── CTA CON IMPACTO DEL BALÓN DE GOL Y CONFETI DE CELEBRACIÓN ── */}
        <div
          style={{
            position: "relative",
            maxWidth: 720,
            margin: "90px auto 0",
            padding: "0 24px",
            textAlign: "center",
          }}
        >
          {/* Balón que baja desde el cabezazo y golpea el botón CTA */}
          {ctaHitKey > 0 && (
            <div
              key={`strike-${ctaHitKey}`}
              aria-hidden="true"
              style={{
                position: "absolute",
                left: "50%",
                top: 0,
                transform: "translateX(-50%)",
                pointerEvents: "none",
                zIndex: 20,
              }}
            >
              {/* Balón que impacta el botón y rebota */}
              <div
                style={{
                  animation:
                    "ballStrikeCta 0.85s cubic-bezier(0.22, 0.61, 0.36, 1) forwards",
                }}
              >
                <svg width="26" height="26" viewBox="-12 -12 24 24">
                  <circle
                    r="10"
                    fill="hsl(var(--background))"
                    stroke={NAVY}
                    strokeWidth="1.6"
                  />
                  <polygon
                    points="0,-4.4 4.2,-1.4 2.6,3.5 -2.6,3.5 -4.2,-1.4"
                    fill={RED}
                  />
                  <line x1="0" y1="-4.4" x2="0" y2="-10" stroke={NAVY} strokeWidth="1.2" />
                  <line x1="4.2" y1="-1.4" x2="9.5" y2="-3.1" stroke={NAVY} strokeWidth="1.2" />
                  <line x1="2.6" y1="3.5" x2="6" y2="8" stroke={NAVY} strokeWidth="1.2" />
                  <line x1="-2.6" y1="3.5" x2="-6" y2="8" stroke={NAVY} strokeWidth="1.2" />
                  <line x1="-4.2" y1="-1.4" x2="-9.5" y2="-3.1" stroke={NAVY} strokeWidth="1.2" />
                </svg>
              </div>

              {/* Onda de choque en el punto de impacto */}
              <div
                style={{
                  position: "absolute",
                  left: "50%",
                  top: 0,
                  width: 24,
                  height: 24,
                  borderRadius: "50%",
                  border: `2px solid ${RED}`,
                  transform: "translate(-50%, -50%) scale(0)",
                  animation: "ctaShockwave 0.7s ease-out 0.22s forwards",
                }}
              />

              {/* Explosión de confeti alrededor del botón */}
              {CONFETTI_PARTICLES.map((p) => (
                <span
                  key={p.id}
                  style={
                    {
                      position: "absolute",
                      left: 0,
                      top: 12,
                      width: p.width,
                      height: p.height,
                      background: p.color,
                      borderRadius: 2,
                      opacity: 0,
                      "--tx": `${p.tx}px`,
                      "--ty": `${p.ty}px`,
                      "--rot": `${p.rot}deg`,
                      animation: `confettiBurst 1.35s cubic-bezier(0.16, 1, 0.3, 1) ${
                        0.22 + p.delay
                      }s forwards`,
                    } as React.CSSProperties
                  }
                />
              ))}
            </div>
          )}

          <div
            key={`btn-bounce-${ctaHitKey}`}
            style={{
              position: "relative",
              display: "inline-block",
              animation:
                ctaHitKey > 0
                  ? "ctaButtonImpact 0.65s cubic-bezier(0.36, 0.07, 0.19, 0.97) 0.22s both"
                  : "none",
            }}
          >
            {/* ── LA PORTERÍA: el botón es la meta a la que llega la jugada ── */}
            <svg
              aria-hidden="true"
              viewBox="0 0 300 150"
              preserveAspectRatio="none"
              style={{
                position: "absolute",
                left: "-13%",
                top: "-26%",
                width: "126%",
                height: "152%",
                zIndex: 0,
                pointerEvents: "none",
                overflow: "visible",
              }}
            >
              {/* Red: malla tenue que se enciende al entrar el balón */}
              <g
                stroke={isGoal ? RED : NAVY}
                strokeOpacity={isGoal ? 0.28 : 0.1}
                strokeWidth="0.7"
                style={{ transition: "stroke 0.4s ease, stroke-opacity 0.4s ease" }}
              >
                {Array.from({ length: 11 }, (_, i) => (
                  <line key={`v${i}`} x1={18 + i * 26.4} y1="14" x2={18 + i * 26.4} y2="136" />
                ))}
                {Array.from({ length: 6 }, (_, i) => (
                  <line key={`h${i}`} x1="18" y1={14 + i * 24.4} x2="282" y2={14 + i * 24.4} />
                ))}
              </g>

              {/* Postes y larguero */}
              <g
                stroke={isGoal ? RED : NAVY}
                strokeOpacity={isGoal ? 0.9 : 0.3}
                strokeWidth="3"
                strokeLinecap="round"
                fill="none"
                style={{ transition: "stroke 0.4s ease, stroke-opacity 0.4s ease" }}
              >
                <line x1="18" y1="14" x2="282" y2="14" />
                <line x1="18" y1="14" x2="18" y2="136" />
                <line x1="282" y1="14" x2="282" y2="136" />
              </g>
            </svg>
            <LocaleLink
              to="/apply"
              style={{
                position: "relative",
                zIndex: 1,
                display: "inline-flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 4,
                background: RED,
                color: "white",
                padding: "20px 48px",
                borderRadius: 12,
                textDecoration: "none",
                fontFamily: "Inter, sans-serif",
                boxShadow: isGoal
                  ? `0 24px 60px color-mix(in srgb, ${RED} 50%, transparent), 0 0 0 4px color-mix(in srgb, ${RED} 20%, transparent)`
                  : `0 20px 50px color-mix(in srgb, ${RED} 35%, transparent), 0 0 0 1px rgba(255,255,255,0.08)`,
                transition: "transform 0.3s ease, box-shadow 0.4s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-3px) scale(1.02)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0) scale(1)";
              }}
            >
              <span
                style={{
                  fontSize: "1.05rem",
                  fontWeight: 700,
                  letterSpacing: "0.02em",
                }}
              >
                {t("video.cta.title")}
              </span>
              <span
                style={{
                  fontSize: "0.8rem",
                  fontWeight: 400,
                  opacity: 0.85,
                  letterSpacing: "0.05em",
                }}
              >
                {t("video.cta.subtitle")}
              </span>
            </LocaleLink>
          </div>
        </div>
      </div>


      <style>{`
        @keyframes goalRipple {
          0% {
            r: 8px;
            opacity: 0.6;
          }
          100% {
            r: 55px;
            opacity: 0;
          }
        }
        @keyframes headerImpact {
          0% {
            r: 4px;
            opacity: 0.65;
          }
          100% {
            r: 22px;
            opacity: 0;
          }
        }
        @keyframes ballStrikeCta {
          0% {
            transform: translate(-18px, -110px) rotate(0deg) scale(0.85);
            opacity: 0;
          }
          15% {
            opacity: 1;
          }
          32% {
            transform: translate(0px, -6px) rotate(180deg) scale(1.15, 0.82);
            opacity: 1;
          }
          65% {
            transform: translate(28px, -58px) rotate(340deg) scale(0.95);
            opacity: 0.9;
          }
          100% {
            transform: translate(54px, -18px) rotate(480deg) scale(0.6);
            opacity: 0;
          }
        }
        @keyframes ctaButtonImpact {
          0% {
            transform: scale(1) translateY(0);
          }
          25% {
            transform: scale(1.06, 0.91) translateY(9px);
          }
          55% {
            transform: scale(0.98, 1.04) translateY(-5px);
          }
          80% {
            transform: scale(1.02, 0.99) translateY(2px);
          }
          100% {
            transform: scale(1) translateY(0);
          }
        }
        @keyframes ctaShockwave {
          0% {
            transform: translate(-50%, -50%) scale(0.3);
            opacity: 0.9;
          }
          100% {
            transform: translate(-50%, -50%) scale(5.5);
            opacity: 0;
          }
        }
        @keyframes confettiBurst {
          0% {
            transform: translate(0, 0) rotate(0deg) scale(0.4);
            opacity: 1;
          }
          65% {
            opacity: 1;
          }
          100% {
            transform: translate(var(--tx), calc(var(--ty) + 95px)) rotate(var(--rot)) scale(1);
            opacity: 0;
          }
        }
        @media (max-width: 768px) {
          .process-desktop { display: none !important; }
          .process-mobile { display: block !important; }
        }
      `}</style>
    </section>
  );
};

export default ProcessSection;
