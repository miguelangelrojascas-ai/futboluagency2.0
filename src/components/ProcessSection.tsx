"use client";

import { useEffect, useMemo, useRef, useState } from "react";
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

type PlayNode = {
  /** Posición relativa al campo visible: 0–1 en ancho y alto. */
  x: number;
  y: number;
  type: "start" | "short" | "back" | "long" | "cross" | "header";
  /** Punto de control si el pase va con comba. */
  c?: [number, number];
};

/**
 * La jugada, toque a toque, en coordenadas relativas a la pantalla.
 *
 * Sale de portería, apoya en el central, abre al lateral y vuelve atrás
 * cuando aprietan; luego entra por dentro al pivote, gira en el círculo
 * central, combina con el interior y cambia a la banda derecha para llegar
 * al fondo y dar el centro atrás. Pasa por el centro aunque las tarjetas la
 * tapen un momento. El último toque, el remate, no está aquí: se calcula
 * con la posición real del botón para que la línea acabe en él.
 */
const PLAY_NODES: PlayNode[] = [
  { x: 0.5, y: 0.07, type: "start" },                    // Saque de puerta
  { x: 0.6, y: 0.15, type: "short" },                    // Apoyo al central derecho
  { x: 0.84, y: 0.21, type: "short" },                   // Abre al lateral
  { x: 0.7, y: 0.19, type: "back" },                     // Le aprietan: vuelve al central
  { x: 0.53, y: 0.35, type: "long", c: [0.66, 0.29] },   // Entra por dentro al pivote
  { x: 0.42, y: 0.47, type: "short" },                   // Gira en el círculo central
  { x: 0.6, y: 0.56, type: "short" },                    // Combina con el interior
  { x: 0.88, y: 0.64, type: "long", c: [0.8, 0.55] },    // Cambio a la banda derecha
  { x: 0.79, y: 0.72, type: "short" },                   // Pared con el extremo
  { x: 0.92, y: 0.8, type: "cross", c: [0.91, 0.75] },   // Conduce hasta el fondo
  { x: 0.64, y: 0.82, type: "header", c: [0.82, 0.86] }, // Centro atrás al punto de penalti
];

type Geometry = {
  w: number;
  h: number;
  /** Centro del botón CTA dentro del campo, cuando el campo ya llegó al final. */
  goalX: number;
  goalY: number;
};

/** Trazado SVG en píxeles y fracción del recorrido en la que cae cada toque. */
function buildPlay({ w, h, goalX, goalY }: Geometry) {
  const pts = PLAY_NODES.map((n) => ({
    ...n,
    px: n.x * w,
    py: n.y * h,
    pc: n.c ? ([n.c[0] * w, n.c[1] * h] as const) : undefined,
  }));

  let d = `M ${pts[0].px} ${pts[0].py}`;
  const cumulative = [0];
  let total = 0;
  let prev = { x: pts[0].px, y: pts[0].py };

  const addSegment = (to: { x: number; y: number }, c?: readonly [number, number]) => {
    if (c) {
      d += ` Q ${c[0]} ${c[1]} ${to.x} ${to.y}`;
      /* Longitud aproximada de la curva, muestreada. */
      let last = prev;
      for (let i = 1; i <= 16; i++) {
        const t = i / 16;
        const x = (1 - t) ** 2 * prev.x + 2 * (1 - t) * t * c[0] + t ** 2 * to.x;
        const y = (1 - t) ** 2 * prev.y + 2 * (1 - t) * t * c[1] + t ** 2 * to.y;
        total += Math.hypot(x - last.x, y - last.y);
        last = { x, y };
      }
    } else {
      d += ` L ${to.x} ${to.y}`;
      total += Math.hypot(to.x - prev.x, to.y - prev.y);
    }
    cumulative.push(total);
    prev = to;
  };

  for (const p of pts.slice(1)) addSegment({ x: p.px, y: p.py }, p.pc);
  addSegment({ x: goalX, y: goalY }); // Remate al botón

  const frac = (type: PlayNode["type"]) =>
    cumulative[PLAY_NODES.findIndex((n) => n.type === type)] / total;

  return {
    d,
    nodes: [
      ...pts.map((p) => ({ x: p.px, y: p.py, type: p.type as string })),
      { x: goalX, y: goalY, type: "goal" },
    ],
    crossFrac: frac("cross"),
    headerFrac: frac("header"),
  };
}

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

  /** Contenedor del campo (pasos + CTA), la caja pegajosa y el botón. */
  const fieldTrackRef = useRef<HTMLDivElement>(null);
  const fieldBoxRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  const [geometry, setGeometry] = useState<Geometry>({
    w: 1000,
    h: 800,
    goalX: 500,
    goalY: 760,
  });
  const play = useMemo(() => buildPlay(geometry), [geometry]);
  const playRef = useRef(play);
  playRef.current = play;

  /* El campo se dibuja en los píxeles reales de la pantalla. Antes era un
     lienzo cuadrado recortado para llenarla, y en pantallas anchas el final
     de la jugada quedaba fuera, cortado. La portería se coloca donde está el
     botón cuando el campo deja de estar fijo, que es cuando entra el gol. */
  useEffect(() => {
    const measure = () => {
      const track = fieldTrackRef.current;
      const box = fieldBoxRef.current;
      const cta = ctaRef.current;
      if (!track || !box || !cta) return;
      const trackRect = track.getBoundingClientRect();
      const ctaRect = cta.getBoundingClientRect();
      const w = box.clientWidth;
      const h = box.clientHeight;
      const next = {
        w,
        h,
        goalX: Math.round(ctaRect.left + ctaRect.width / 2 - trackRect.left),
        goalY: Math.round(h - (trackRect.bottom - (ctaRect.top + ctaRect.height / 2))),
      };
      setGeometry((prev) =>
        prev.w === next.w && prev.h === next.h && prev.goalX === next.goalX && prev.goalY === next.goalY
          ? prev
          : next,
      );
    };

    measure();
    const observer = new ResizeObserver(measure);
    if (fieldTrackRef.current) observer.observe(fieldTrackRef.current);
    window.addEventListener("resize", measure);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  useEffect(() => {
    let rafId: number;

    const updateAnimation = () => {
      const vh = window.innerHeight;
      const track = fieldTrackRef.current;
      if (!track) return;
      const trackBottom = track.getBoundingClientRect().bottom;

      /* El balón sale cuando el ancla cruza startLine y marca cuando el final
         del campo (el botón) llega a endLine, ya visible en pantalla. */
      const endLine = vh * 0.96;
      let anchorY: number;
      let startLine: number;

      const firstStep = stepRefs.current[0];
      const desktop = !!firstStep && firstStep.offsetHeight > 0;

      if (desktop) {
        const firstRect = firstStep.getBoundingClientRect();
        anchorY = firstRect.top + firstRect.height / 2;
        startLine = vh * 0.55;

        // Actualizar el paso activo
        stepRefs.current.forEach((el, i) => {
          if (!el) return;
          const rect = el.getBoundingClientRect();
          const mid = rect.top + rect.height / 2;
          if (mid < vh * 0.65 && mid > -rect.height / 2) {
            setActiveStep((prev) => (prev !== i ? i : prev));
          }
        });
      } else {
        anchorY = track.getBoundingClientRect().top;
        startLine = vh * 0.3;
      }

      const distance = trackBottom - anchorY - (endLine - startLine);
      const progress = distance > 0 ? (startLine - anchorY) / distance : 0;

      if (!desktop) {
        const mobileIndex = Math.min(
          STEPS_DATA.length - 1,
          Math.max(0, Math.floor(progress * STEPS_DATA.length))
        );
        setActiveStep((prev) => (prev !== mobileIndex ? mobileIndex : prev));
      }

      const clampedProgress = Math.max(0, Math.min(1, progress));
      const { crossFrac, headerFrac } = playRef.current;

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

        // Elevación sutil durante el centro, del fondo al punto de penalti
        let ballScale = 1;
        if (clampedProgress > crossFrac && clampedProgress < headerFrac) {
          const crossPhase = (clampedProgress - crossFrac) / (headerFrac - crossFrac);
          ballScale = 1 + Math.sin(crossPhase * Math.PI) * 0.28;
        }

        ballEl.setAttribute(
          "transform",
          `translate(${point.x}, ${point.y}) scale(${ballScale.toFixed(2)})`
        );
        spinEl.setAttribute("transform", `rotate(${clampedProgress * 820})`);
      }

      const headerActive = clampedProgress >= headerFrac;
      const goalScored = clampedProgress >= 0.985;

      setIsHeaderMoment((prev) => (prev !== headerActive ? headerActive : prev));
      setIsGoal((prev) => (prev !== goalScored ? goalScored : prev));

      // Impacto en el botón y confeti cada vez que entra el gol
      if (goalScored && !wasGoalRef.current) {
        wasGoalRef.current = true;
        setCtaHitKey((k) => k + 1);
      } else if (!goalScored && clampedProgress < headerFrac - 0.04) {
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
    /* Se vuelve a enganchar cuando cambia el trazado, para redibujarlo ya. */
  }, [play]);

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
      <div ref={fieldTrackRef} style={{ position: "relative" }}>
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
            ref={fieldBoxRef}
            style={{
              position: "sticky",
              top: 0,
              height: "100vh",
              overflow: "hidden",
            }}
          >
          <svg
            viewBox={`0 0 ${geometry.w} ${geometry.h}`}
            style={{ width: "100%", height: "100%", display: "block" }}
          >
            {/* Líneas del campo, en píxeles. La línea de fondo de abajo pasa por
                el botón: la portería rival es el CTA. */}
            {(() => {
              const { w, h, goalX, goalY } = geometry;
              const left = w * 0.04;
              const right = w * 0.96;
              const top = h * 0.04;
              const bottom = Math.min(h - 4, goalY + 34);
              const mid = (top + bottom) / 2;
              const boxW = Math.min(w * 0.4, 520);
              const smallW = boxW * 0.45;
              const boxH = h * 0.14;
              const smallH = h * 0.055;
              const arc = boxW * 0.21;
              const r = Math.min(h, w) * 0.11;
              return (
                <g
                  stroke={NAVY}
                  strokeOpacity={pitchStrokeOpacity}
                  strokeWidth="1.5"
                  fill="none"
                  style={{ transition: "stroke-opacity 0.4s ease" }}
                >
                  <rect x={left} y={top} width={right - left} height={bottom - top} rx="6" />
                  <line x1={left} y1={mid} x2={right} y2={mid} />
                  <circle cx={w / 2} cy={mid} r={r} />
                  <circle cx={w / 2} cy={mid} r="2.5" fill={NAVY} fillOpacity={pitchStrokeOpacity} />

                  {/* Área propia (arriba) */}
                  <rect x={w / 2 - boxW / 2} y={top} width={boxW} height={boxH} />
                  <rect x={w / 2 - smallW / 2} y={top} width={smallW} height={smallH} />
                  <path d={`M ${w / 2 - arc} ${top + boxH} A ${arc} ${arc * 0.5} 0 0 0 ${w / 2 + arc} ${top + boxH}`} />

                  {/* Área rival (abajo), centrada en el botón */}
                  <rect x={goalX - boxW / 2} y={bottom - boxH} width={boxW} height={boxH} />
                  <path d={`M ${goalX - arc} ${bottom - boxH} A ${arc} ${arc * 0.5} 0 0 1 ${goalX + arc} ${bottom - boxH}`} />

                  {/* Córners */}
                  <path d={`M ${left} ${top + 18} A 18 18 0 0 0 ${left + 18} ${top}`} />
                  <path d={`M ${right - 18} ${top} A 18 18 0 0 0 ${right} ${top + 18}`} />
                  <path d={`M ${left} ${bottom - 18} A 18 18 0 0 1 ${left + 18} ${bottom}`} />
                  <path d={`M ${right - 18} ${bottom} A 18 18 0 0 1 ${right} ${bottom - 18}`} />
                </g>
              );
            })()}

            {/* Guía punteada de la jugada */}
            <path
              d={play.d}
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
              d={play.d}
              fill="none"
              stroke={RED}
              strokeOpacity={passLineOpacity}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* Micro-nodos de toque */}
            {play.nodes.filter((pt) => pt.type !== "goal").map((pt, idx) => (
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
              transform={`translate(${play.nodes[0].x}, ${play.nodes[0].y})`}
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
            ref={ctaRef}
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
