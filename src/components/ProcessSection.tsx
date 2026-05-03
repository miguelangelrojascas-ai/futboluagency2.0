import { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

const CALENDLY_URL = "https://calendly.com/miguelangelrojascas/new-meeting";

const NAVY = "#12213a";
const RED = "#b00717";

// 🔁 Replace these image imports with your real photos
// Each step has a placeholder — swap src="" with your actual image paths
const STEP_IMAGES = [
  "/images/process-evaluation.jpg", // Fase 1 — evaluación del jugador
  "/images/process-profile.jpg", // Fase 2 — creación del perfil
  "/images/process-search.jpg", // Fase 3 — búsqueda universidades
  "/images/process-negotiation.jpg", // Fase 4 — negociación con coach
  "/images/process-admission.jpg", // Fase 5 — admisión y firma
  "/images/process-travel.jpg", // Fase 6 — viaje a EE.UU.
];

const ProcessSection = () => {
  const { t } = useLanguage();
  const [activeStep, setActiveStep] = useState(-1);
  const [lineProgress, setLineProgress] = useState(0);
  const timelineRef = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<(HTMLDivElement | null)[]>([]);

  const steps = [
    {
      phase: "01",
      title: t("process.step1.title"),
      description: t("process.step1.desc"),
      image: STEP_IMAGES[0],
      imageFallback: "📋",
      imageLabel: "Evaluación del atleta",
      color: "#e8f0fe",
    },
    {
      phase: "02",
      title: t("process.step2.title"),
      description: t("process.step2.desc"),
      image: STEP_IMAGES[1],
      imageFallback: "👤",
      imageLabel: "Creación del perfil",
      color: "#fce8e8",
    },
    {
      phase: "03",
      title: t("process.step3.title"),
      description: t("process.step3.desc"),
      image: STEP_IMAGES[2],
      imageFallback: "🗺️",
      imageLabel: "Búsqueda de universidades",
      color: "#e8fee8",
    },
    {
      phase: "04",
      title: t("process.step4.title"),
      description: t("process.step4.desc"),
      image: STEP_IMAGES[3],
      imageFallback: "🤝",
      imageLabel: "Negociación con coach",
      color: "#fef9e8",
    },
    {
      phase: "05",
      title: t("process.step5.title"),
      description: t("process.step5.desc"),
      image: STEP_IMAGES[4],
      imageFallback: "📄",
      imageLabel: "Admisión y trámites",
      color: "#f0e8fe",
    },
    {
      phase: "06",
      title: t("process.step6.title"),
      description: t("process.step6.desc"),
      image: STEP_IMAGES[5],
      imageFallback: "✈️",
      imageLabel: "Viaje a EE.UU.",
      color: "#e8fefe",
    },
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (!timelineRef.current) return;
      const rect = timelineRef.current.getBoundingClientRect();
      const vh = window.innerHeight;
      const progress = Math.max(0, Math.min(1, (vh * 0.55 - rect.top) / rect.height));
      setLineProgress(progress * 100);

      stepsRef.current.forEach((el, i) => {
        if (!el) return;
        const r = el.getBoundingClientRect();
        if (r.top <= vh * 0.6) setActiveStep(i);
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section style={{ backgroundColor: "#fafaf8", overflow: "hidden" }}>
      {/* Header */}
      <div style={{ textAlign: "center", padding: "64px 24px 48px" }}>
        <span
          style={{
            fontSize: "10px",
            fontWeight: 700,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: RED,
            display: "block",
            marginBottom: "12px",
          }}
        >
          {t("process.title")}
        </span>
        <h2
          style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: "clamp(24px, 4vw, 40px)",
            fontWeight: 700,
            color: NAVY,
            marginBottom: "12px",
            lineHeight: 1.2,
          }}
        >
          {t("process.subtitle")}
        </h2>
        <div style={{ width: 40, height: 3, background: RED, margin: "0 auto" }} />
      </div>

      {/* Timeline */}
      <div
        ref={timelineRef}
        style={{ position: "relative", maxWidth: "900px", margin: "0 auto", padding: "0 24px 80px" }}
      >
        {/* Vertical line track */}
        <div
          style={{
            position: "absolute",
            left: "50%",
            transform: "translateX(-50%)",
            top: 0,
            bottom: 0,
            width: "2px",
            background: "rgba(18,33,58,0.08)",
            display: "none",
          }}
          className="timeline-line-track"
        />

        {/* Vertical line fill */}
        <div
          style={{
            position: "absolute",
            left: "50%",
            transform: "translateX(-50%)",
            top: 0,
            width: "2px",
            height: `${lineProgress}%`,
            background: `linear-gradient(to bottom, ${RED}, ${NAVY})`,
            transition: "height 0.12s linear",
            display: "none",
          }}
          className="timeline-line-fill"
        />

        {/* Mobile line */}
        <div
          style={{
            position: "absolute",
            left: "20px",
            top: 0,
            bottom: 0,
            width: "2px",
            background: "rgba(18,33,58,0.08)",
          }}
        />
        <div
          style={{
            position: "absolute",
            left: "20px",
            top: 0,
            width: "2px",
            height: `${lineProgress}%`,
            background: `linear-gradient(to bottom, ${RED}, ${NAVY})`,
            transition: "height 0.12s linear",
          }}
        />

        {steps.map((step, i) => {
          const isActive = activeStep >= i;
          const isEven = i % 2 === 0;

          return (
            <div
              key={i}
              ref={(el) => (stepsRef.current[i] = el)}
              style={{
                display: "flex",
                flexDirection: "column",
                marginBottom: i < steps.length - 1 ? "64px" : 0,
                position: "relative",
              }}
              className={`process-step step-${i}`}
            >
              {/* Desktop: alternating layout */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 48px 1fr",
                  gap: "0",
                  alignItems: "center",
                }}
                className="step-grid"
              >
                {/* Left side */}
                <div
                  style={{
                    padding: "0 24px",
                    opacity: isActive ? 1 : 0.25,
                    transform: isActive ? "translateX(0)" : isEven ? "translateX(-20px)" : "translateX(0)",
                    transition: "opacity 0.5s ease, transform 0.5s ease",
                    order: isEven ? 1 : 3,
                    textAlign: isEven ? "right" : "left",
                  }}
                >
                  {isEven ? (
                    // Even steps: text on left
                    <>
                      <span
                        style={{
                          fontSize: "10px",
                          fontWeight: 800,
                          letterSpacing: "0.15em",
                          color: RED,
                          display: "block",
                          marginBottom: "8px",
                        }}
                      >
                        FASE {step.phase}
                      </span>
                      <h3
                        style={{
                          fontFamily: "'Playfair Display', Georgia, serif",
                          fontSize: "clamp(16px, 2vw, 22px)",
                          fontWeight: 700,
                          color: NAVY,
                          marginBottom: "10px",
                          lineHeight: 1.3,
                        }}
                      >
                        {step.title}
                      </h3>
                      <p style={{ fontSize: "13px", color: "#666", lineHeight: 1.7, margin: 0 }}>{step.description}</p>
                    </>
                  ) : (
                    // Odd steps: image on left
                    <StepImage step={step} isActive={isActive} />
                  )}
                </div>

                {/* Center dot */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    position: "relative",
                    zIndex: 2,
                    order: 2,
                  }}
                >
                  <div
                    style={{
                      width: "40px",
                      height: "40px",
                      borderRadius: "50%",
                      background: isActive ? RED : "#e5e5e5",
                      border: `3px solid #fafaf8`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: isActive ? "white" : "#aaa",
                      fontFamily: "Georgia, serif",
                      fontSize: "14px",
                      fontWeight: 700,
                      transition: "all 0.4s ease",
                      boxShadow: isActive ? `0 0 0 6px rgba(176,7,23,0.12)` : "none",
                      flexShrink: 0,
                    }}
                  >
                    {step.phase}
                  </div>
                </div>

                {/* Right side */}
                <div
                  style={{
                    padding: "0 24px",
                    opacity: isActive ? 1 : 0.25,
                    transform: isActive ? "translateX(0)" : !isEven ? "translateX(20px)" : "translateX(0)",
                    transition: "opacity 0.5s ease, transform 0.5s ease",
                    order: isEven ? 3 : 1,
                    textAlign: isEven ? "left" : "right",
                  }}
                >
                  {!isEven ? (
                    // Odd steps: text on right
                    <>
                      <span
                        style={{
                          fontSize: "10px",
                          fontWeight: 800,
                          letterSpacing: "0.15em",
                          color: RED,
                          display: "block",
                          marginBottom: "8px",
                        }}
                      >
                        FASE {step.phase}
                      </span>
                      <h3
                        style={{
                          fontFamily: "'Playfair Display', Georgia, serif",
                          fontSize: "clamp(16px, 2vw, 22px)",
                          fontWeight: 700,
                          color: NAVY,
                          marginBottom: "10px",
                          lineHeight: 1.3,
                        }}
                      >
                        {step.title}
                      </h3>
                      <p style={{ fontSize: "13px", color: "#666", lineHeight: 1.7, margin: 0 }}>{step.description}</p>
                    </>
                  ) : (
                    // Even steps: image on right
                    <StepImage step={step} isActive={isActive} />
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* CTA */}
      <div style={{ textAlign: "center", padding: "0 24px 80px" }}>
        <a
          href={CALENDLY_URL}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "inline-flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "4px",
            background: RED,
            color: "white",
            padding: "20px 48px",
            borderRadius: "12px",
            textDecoration: "none",
            transition: "opacity 0.2s",
          }}
          onMouseOver={(e) => (e.currentTarget.style.opacity = "0.9")}
          onMouseOut={(e) => (e.currentTarget.style.opacity = "1")}
        >
          <span style={{ fontSize: "16px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em" }}>
            {t("video.cta.title")}
          </span>
          <span style={{ fontSize: "13px", opacity: 0.85 }}>{t("video.cta.subtitle")}</span>
        </a>
      </div>

      {/* Responsive styles */}
      <style>{`
        @media (min-width: 768px) {
          .timeline-line-track,
          .timeline-line-fill {
            display: block !important;
          }
          .step-grid {
            display: grid !important;
          }
        }
        @media (max-width: 767px) {
          .step-grid {
            display: flex !important;
            flex-direction: row !important;
            gap: 16px !important;
            align-items: flex-start !important;
          }
          .step-grid > div:first-child,
          .step-grid > div:last-child {
            display: none !important;
          }
          .step-grid > div:nth-child(2) {
            order: 1 !important;
          }
        }
      `}</style>
    </section>
  );
};

// Image sub-component with fallback
const StepImage = ({ step, isActive }: { step: any; isActive: boolean }) => (
  <div
    style={{
      borderRadius: "14px",
      overflow: "hidden",
      aspectRatio: "4/3",
      position: "relative",
      background: step.color,
      border: "1px solid rgba(0,0,0,0.06)",
      opacity: isActive ? 1 : 0.4,
      transition: "opacity 0.5s ease",
    }}
  >
    <img
      src={step.image}
      alt={step.imageLabel}
      style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
      onError={(e) => {
        // Fallback if image doesn't exist yet
        const target = e.currentTarget as HTMLImageElement;
        target.style.display = "none";
        const parent = target.parentElement;
        if (parent && !parent.querySelector(".fallback")) {
          const fb = document.createElement("div");
          fb.className = "fallback";
          fb.style.cssText =
            "position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:8px;";
          fb.innerHTML = `<span style="font-size:36px">${step.imageFallback}</span><span style="font-size:11px;color:#999;text-align:center;padding:0 16px">${step.imageLabel}</span>`;
          parent.appendChild(fb);
        }
      }}
    />
  </div>
);

export default ProcessSection;
