import { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

const CALENDLY_URL = "https://calendly.com/miguelangelrojascas/new-meeting";
const NAVY = "#12213a";
const RED = "#b00717";

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

const ProcessSection = () => {
  const { t } = useLanguage();
  const [activeStep, setActiveStep] = useState(0);
  const [imgError, setImgError] = useState<Record<number, boolean>>({});
  const sectionRef = useRef<HTMLElement>(null);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const handleScroll = () => {
      const vh = window.innerHeight;
      stepRefs.current.forEach((el, i) => {
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const mid = rect.top + rect.height / 2;
        if (mid < vh * 0.65 && mid > -rect.height / 2) {
          setActiveStep(i);
        }
      });
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      ref={sectionRef}
      style={{ background: "#ffffff", color: NAVY, padding: "120px 0 80px" }}
    >
      {/* Header */}
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px 80px", textAlign: "center" }}>
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
            boxShadow: "0 30px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.05)",
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
                  onError={() => setImgError(prev => ({ ...prev, [i]: true }))}
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
                  stepRefs.current[i]?.scrollIntoView({ behavior: "smooth", block: "center" })
                }
                aria-label={`Ir a fase ${i + 1}`}
                style={{
                  width: "5px",
                  height: activeStep === i ? "22px" : "5px",
                  borderRadius: "3px",
                  background: activeStep === i ? "white" : "rgba(255,255,255,0.25)",
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
                ref={el => (stepRefs.current[i] = el)}
                style={{
                  minHeight: "85vh",
                  display: "flex",
                  alignItems: "center",
                  padding: "32px 0",
                }}
              >
                <div style={{ width: "100%" }}>
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
                      transform: isActive ? "translateX(0)" : "translateX(-12px)",
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
                      color: "rgba(255,255,255,0.7)",
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
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.06)",
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
                  onError={() => setImgError(prev => ({ ...prev, [i]: true }))}
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
                  color: "white",
                }}
              >
                {t(s.titleKey)}
              </h3>
              <p
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "0.95rem",
                  lineHeight: 1.6,
                  color: "rgba(255,255,255,0.65)",
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
        <a
          href={CALENDLY_URL}
          target="_blank"
          rel="noopener noreferrer"
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
            boxShadow: `0 20px 50px ${RED}55, 0 0 0 1px rgba(255,255,255,0.08)`,
            transition: "transform 0.3s ease, box-shadow 0.3s ease",
          }}
          onMouseEnter={e => {
            e.currentTarget.style.transform = "translateY(-2px)";
          }}
          onMouseLeave={e => {
            e.currentTarget.style.transform = "translateY(0)";
          }}
        >
          <span style={{ fontSize: "1.05rem", fontWeight: 700, letterSpacing: "0.02em" }}>
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
        </a>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .process-desktop { display: none !important; }
          .process-mobile { display: block !important; }
        }
      `}</style>
    </section>
  );
};

export default ProcessSection;
