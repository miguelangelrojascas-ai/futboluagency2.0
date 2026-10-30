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
 * Coordenadas tácticas en el viewBox (1000 x 1000).
 * Diseñadas por el canal central-derecho para no quedar ocultas
 * detrás de la tarjeta sticky izquierda en Desktop.
 */
const TACTICAL_NODES = [
  { x: 500, y: 95, label: "01" },  // Saque desde área propia
  { x: 740, y: 240, label: "02" }, // Salida por banda derecha
  { x: 560, y: 420, label: "03" }, // Interior / Mediocentro
  { x: 800, y: 580, label: "04" }, // Progresión ofensiva
  { x: 640, y: 760, label: "05" }, // Asistencia en frontal del área
  { x: 500, y: 935, label: "06" }, // ¡GOL! Dentro de la portería rival
];

// Curva Bézier suave que conecta los 6 puntos tácticos de portería a portería
const PLAY_PATH =
  "M 500 95 C 640 120, 760 170, 740 240 C 710 320, 550 340, 560 420 C 570 500, 810 490, 800 580 C 790 670, 670 680, 640 760 C 610 835, 525 870, 500 935";

const ProcessSection = () => {
  const { t } = useLanguage();
  const [activeStep, setActiveStep] = useState(0);
  const [isGoal, setIsGoal] = useState(false);
  const [imgError, setImgError] = useState<Record<number, boolean>>({});

  const sectionRef = useRef<HTMLElement>(null);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Referencias para animar el SVG a 60fps sin re-renderizar React
  const activePathRef = useRef<SVGPathElement>(null);
  const ballGroupRef = useRef<SVGGElement>(null);
  const ballSpinRef = useRef<SVGGElement>(null);

  useEffect(() => {
    let rafId: number;

    const updateAnimation = () => {
      const vh = window.innerHeight;
      let progress = 0;

      // 1. Detectar si estamos en Desktop (stepRefs visibles) o Mobile
      const firstStep = stepRefs.current[0];
      const lastStep = stepRefs.current[STEPS_DATA.length - 1];

      if (firstStep && lastStep && firstStep.offsetHeight > 0) {
        // Desktop: Progreso exacto desde el centro del Paso 1 al centro del Paso 6
        const firstRect = firstStep.getBoundingClientRect();
        const lastRect = lastStep.getBoundingClientRect();
        const startY = firstRect.top + firstRect.height / 2;
        const endY = lastRect.top + lastRect.height / 2;
        const triggerY = vh * 0.55;

        const totalDistance = endY - startY;
        if (totalDistance > 0) {
          progress = (triggerY - startY) / totalDistance;
        }

        // Actualizar el paso activo para las tarjetas
        stepRefs.current.forEach((el, i) => {
          if (!el) return;
          const rect = el.getBoundingClientRect();
          const mid = rect.top + rect.height / 2;
          if (mid < vh * 0.65 && mid > -rect.height / 2) {
            setActiveStep((prev) => (prev !== i ? i : prev));
          }
        });
      } else if (sectionRef.current) {
        // Mobile fallback: Progreso basado en el contenedor general
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

      // Limitar progreso entre 0 y 1
      const clampedProgress = Math.max(0, Math.min(1, progress));

      // 2. Animar el trazo táctico y la posición/rotación del balón directamente en el DOM
      const pathEl = activePathRef.current;
      const ballEl = ballGroupRef.current;
      const spinEl = ballSpinRef.current;

      if (pathEl && ballEl && spinEl) {
        const totalLength = pathEl.getTotalLength();
        const currentLength = totalLength * clampedProgress;

        // Dibuja la línea roja progresivamente
        pathEl.style.strokeDasharray = `${totalLength}`;
        pathEl.style.strokeDashoffset = `${totalLength - currentLength}`;

        // Posiciona el balón en las coordenadas exactas de la curva
        const point = pathEl.getPointAtLength(currentLength);
        ballEl.setAttribute("transform", `translate(${point.x}, ${point.y})`);

        // Hace girar el balón conforme avanza (3 vueltas completas de portería a portería)
        spinEl.setAttribute("transform", `rotate(${clampedProgress * 1080})`);
      }

      // 3. Disparar estado de ¡GOL! al cruzar la línea de meta (96%+)
      const goalScored = clampedProgress >= 0.96;
      setIsGoal((prev) => (prev !== goalScored ? goalScored : prev));
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

  return (
    <section
      ref={sectionRef}
      style={{
        position: "relative",
        background: "hsl(var(--background))",
        color: NAVY,
        padding: "120px 0 80px",
      }}
    >
      {/* ── FONDO STICKY: CAMPO DE FÚTBOL TÁCTICO Y BALÓN ── */}
      <div
        aria-hidden="true"
        style={{
          position: "sticky",
          top: 0,
          height: "100vh",
          marginBottom: "-100vh",
          width: "100%",
          overflow: "hidden",
          pointerEvents: "none",
          zIndex: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <svg
          viewBox="0 0 1000 1000"
          preserveAspectRatio="xMidYMid slice"
          style={{
            width: "100%",
            height: "100%",
            maxWidth: 1360,
            opacity: 0.9,
          }}
        >
          <defs>
            {/* Filtro de resplandor para el balón y el gol */}
            <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="8" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* ── LÍNEAS DEL CAMPO (Estilo Pizarra Táctica) ── */}
          <g
            stroke={NAVY}
            strokeOpacity="0.08"
            strokeWidth="2"
            fill="none"
          >
            {/* Perímetro del campo */}
            <rect x="80" y="60" width="840" height="880" rx="8" />
            {/* Línea de medio campo */}
            <line x1="80" y1="500" x2="920" y2="500" />
            {/* Círculo central */}
            <circle cx="500" cy="500" r="95" />
            <circle cx="500" cy="500" r="4" fill={NAVY} fillOpacity="0.12" />

            {/* Área grande y pequeña SUPERIOR (Inicio - Fase 01) */}
            <rect x="280" y="60" width="440" height="145" />
            <rect x="390" y="60" width="220" height="55" />
            <rect x="445" y="32" width="110" height="28" strokeOpacity="0.18" />
            <path d="M 410 205 A 95 95 0 0 0 590 205" />

            {/* Área grande y pequeña INFERIOR (Portería rival - Fase 06) */}
            <rect x="280" y="795" width="440" height="145" />
            <rect x="390" y="885" width="220" height="55" />
            <path d="M 410 795 A 95 95 0 0 1 590 795" />

            {/* Saques de esquina */}
            <path d="M 80 85 A 25 25 0 0 0 105 60" />
            <path d="M 895 60 A 25 25 0 0 0 920 85" />
            <path d="M 80 915 A 25 25 0 0 1 105 940" />
            <path d="M 895 940 A 25 25 0 0 1 920 915" />
          </g>

          {/* ── PORTERÍA INFERIOR (Se ilumina al marcar GOL en Fase 06) ── */}
          <g>
            <rect
              x="445"
              y="940"
              width="110"
              height="32"
              rx="4"
              fill={isGoal ? RED : "transparent"}
              fillOpacity={isGoal ? 0.18 : 0}
              stroke={isGoal ? RED : NAVY}
              strokeOpacity={isGoal ? 0.9 : 0.2}
              strokeWidth={isGoal ? 3.5 : 2}
              style={{ transition: "all 0.4s ease" }}
            />
            {/* Onda expansiva de GOL */}
            <circle
              cx="500"
              cy="940"
              r={isGoal ? 90 : 10}
              fill="none"
              stroke={RED}
              strokeWidth="2"
              opacity={isGoal ? 0 : 0}
              style={{
                animation: isGoal ? "goalPulse 1.4s ease-out infinite" : "none",
              }}
            />
            {/* Etiqueta ¡GOL! */}
            <text
              x="500"
              y="990"
              textAnchor="middle"
              fill={RED}
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: "14px",
                fontWeight: 800,
                letterSpacing: "0.25em",
                opacity: isGoal ? 1 : 0,
                transform: isGoal ? "translateY(0)" : "translateY(-6px)",
                transition: "all 0.35s ease",
              }}
            >
              GOAL!
            </text>
          </g>

          {/* ── TRAZADO DE LA JUGADA (Guía punteada + Línea activa) ── */}
          {/* Guía táctica de fondo */}
          <path
            d={PLAY_PATH}
            fill="none"
            stroke={NAVY}
            strokeOpacity="0.12"
            strokeWidth="2.5"
            strokeDasharray="8 10"
          />

          {/* Línea roja que se dibuja con el scroll */}
          <path
            ref={activePathRef}
            d={PLAY_PATH}
            fill="none"
            stroke={RED}
            strokeWidth="3.5"
            strokeLinecap="round"
            filter="url(#glow)"
          />

          {/* ── NODOS TÁCTICOS (01 a 06) ── */}
          {TACTICAL_NODES.map((node, index) => {
            const reached = activeStep >= index;
            const isCurrent = activeStep === index;
            return (
              <g key={index} transform={`translate(${node.x}, ${node.y})`}>
                <circle
                  r={isCurrent ? 16 : 11}
                  fill={reached ? RED : "hsl(var(--background))"}
                  stroke={reached ? RED : NAVY}
                  strokeOpacity={reached ? 1 : 0.2}
                  strokeWidth="2"
                  style={{ transition: "all 0.4s ease" }}
                />
                <text
                  dy="4"
                  textAnchor="middle"
                  fill={reached ? "white" : NAVY}
                  fillOpacity={reached ? 1 : 0.4}
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: "10px",
                    fontWeight: 700,
                    transition: "all 0.4s ease",
                  }}
                >
                  {node.label}
                </text>
              </g>
            );
          })}

          {/* ── BALÓN DE FÚTBOL ANIMADO ── */}
          <g ref={ballGroupRef} transform="translate(500, 95)">
            {/* Halo exterior del balón */}
            <circle
              r="22"
              fill={RED}
              fillOpacity="0.15"
              filter="url(#glow)"
            />
            <g ref={ballSpinRef}>
              {/* Esfera del balón */}
              <circle
                r="14"
                fill="#ffffff"
                stroke={NAVY}
                strokeWidth="2.2"
              />
              {/* Pentágono central y costuras clásicas */}
              <polygon
                points="0,-6 5.7,-1.8 3.5,4.8 -3.5,4.8 -5.7,-1.8"
                fill={RED}
              />
              <line x1="0" y1="-6" x2="0" y2="-14" stroke={NAVY} strokeWidth="1.6" />
              <line x1="5.7" y1="-1.8" x2="13.3" y2="-4.3" stroke={NAVY} strokeWidth="1.6" />
              <line x1="3.5" y1="4.8" x2="8.2" y2="11.3" stroke={NAVY} strokeWidth="1.6" />
              <line x1="-3.5" y1="4.8" x2="-8.2" y2="11.3" stroke={NAVY} strokeWidth="1.6" />
              <line x1="-5.7" y1="-1.8" x2="-13.3" y2="-4.3" stroke={NAVY} strokeWidth="1.6" />
            </g>
          </g>
        </svg>
      </div>

      {/* ── CONTENIDO PRINCIPAL (zIndex: 1 para estar sobre el campo) ── */}
      <div style={{ position: "relative", zIndex: 1 }}>
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

        {/* ── DESKTOP: Sticky scroll ── */}
        <div
          className="process-desktop"
          style={{
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
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background:
                      "linear-gradient(180deg, rgba(0,0,0,0) 40%, rgba(0,0,0,0.85) 100%)",
                  }}
                />
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

          {/* RIGHT — Scrollable text steps */}
          <div>
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
                    style={{
                      width: "100%",
                      background: "color-mix(in srgb, hsl(var(--background)) 82%, transparent)",
                      backdropFilter: "blur(6px)",
                      padding: "28px",
                      borderRadius: 20,
                    }}
                  >
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

        {/* ── MOBILE: Stacked cards ── */}
        <div
          className="process-mobile"
          style={{
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
                background: "color-mix(in srgb, hsl(var(--background)) 90%, transparent)",
                backdropFilter: "blur(8px)",
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

        {/* CTA */}
        <div
          style={{
            maxWidth: 720,
            margin: "120px auto 0",
            padding: "0 24px",
            textAlign: "center",
          }}
        >
          <LocaleLink
            to="/apply"
            style={{
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
              boxShadow: `0 20px 50px color-mix(in srgb, ${RED} 35%, transparent), 0 0 0 1px rgba(255,255,255,0.08)`,
              transition: "transform 0.3s ease, box-shadow 0.3s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
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

      <style>{`
        @keyframes goalPulse {
          0% {
            r: 15px;
            opacity: 0.85;
          }
          100% {
            r: 110px;
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
