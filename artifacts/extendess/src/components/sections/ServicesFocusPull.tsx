import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const SERVICES = [
  {
    title: "Парикмахерское искусство",
    desc: "Авторские стрижки, окрашивание и укладки\nот мастеров уровня Парижа",
  },
  {
    title: "Ногтевой сервис",
    desc: "Маникюр, педикюр и наращивание\nв лучших традициях nail-art",
  },
  {
    title: "Косметология",
    desc: "Уходовые ритуалы, пилинги и массажи\nдля сияния вашей кожи",
  },
  {
    title: "Эстетическая медицина",
    desc: "Мезотерапия, биоревитализация\nи контурная пластика",
  },
  {
    title: "Wellness и восстановление",
    desc: "Комплексные программы восстановления\nтела и духа",
  },
];

// Subtle card palette variations — warm neutrals
const CARD_TONES = [
  ["#F0EAE1", "#DDD3C7"],
  ["#EDE6DC", "#DAD0C3"],
  ["#EBE4D9", "#D8CDBE"],
  ["#E8E0D4", "#D5CABB"],
  ["#E6DDD1", "#D2C6B7"],
];

/**
 * Given camera progress (0 → N-1) and card index,
 * returns { scale, opacity } for that card.
 *
 * relPos = cameraPos - cardIndex
 *   < -1.5  → far away, invisible
 *   -1.5→ 0 → approaching: tiny → fills screen
 *    0→ 0.35 → passing through: screen-fill → zoom-past, fade out
 *   > 0.35  → passed, invisible
 */
function getCardState(cameraPos: number, cardIdx: number) {
  const relPos = cameraPos - cardIdx;

  if (relPos < -1.8) {
    return { scale: 0.04, opacity: 0 };
  }

  if (relPos < 0) {
    // Approaching phase: relPos from -1.8 to 0
    const t = (relPos + 1.8) / 1.8; // 0 → 1
    const tEased = t * t * (3 - 2 * t); // smoothstep
    const scale = 0.04 + tEased * 0.97; // 0.04 → 1.01
    // Fade in during last 60% of approach
    const fadeT = Math.max(0, (t - 0.4) / 0.6);
    const opacity = fadeT;
    return { scale, opacity };
  }

  if (relPos < 0.35) {
    // Pass-through phase: relPos from 0 to 0.35
    const t = relPos / 0.35; // 0 → 1
    const tEased = t * t * t; // cubic ease in (fast fade)
    const scale = 1.01 + t * 1.6; // 1.0 → 2.6 (zoom past)
    const opacity = 1 - tEased; // 1 → 0
    return { scale, opacity };
  }

  return { scale: 2.6, opacity: 0 };
}

export function Services() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const textRefs = useRef<(HTMLDivElement | null)[]>([]);
  const dotsRef = useRef<(HTMLDivElement | null)[]>([]);
  const counterRef = useRef<HTMLSpanElement>(null);
  const scrollHintRef = useRef<HTMLDivElement>(null);
  const camPosRef = useRef(0);
  const activeIdxRef = useRef(0);

  const [isMobile, setIsMobile] = useState(false);
  const [mobileActive, setMobileActive] = useState(0);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  function applyCamera(cameraPos: number) {
    const activeIdx = Math.min(
      SERVICES.length - 1,
      Math.max(0, Math.round(cameraPos))
    );

    SERVICES.forEach((_, i) => {
      const card = cardRefs.current[i];
      const text = textRefs.current[i];
      const dot = dotsRef.current[i];
      if (!card) return;

      const { scale, opacity } = getCardState(cameraPos, i);

      gsap.set(card, { scale, opacity });

      if (text) {
        // Text visible when card is close to filling screen
        const relPos = cameraPos - i;
        const textOpacity =
          relPos >= -0.3 && relPos <= 0.15
            ? Math.max(0, 1 - Math.abs(relPos) / 0.25)
            : 0;
        gsap.set(text, { opacity: textOpacity });
      }

      if (dot) {
        gsap.set(dot, {
          width: i === activeIdx ? 24 : 6,
          backgroundColor:
            i === activeIdx ? "#8B7355" : "rgba(139,115,85,0.22)",
        });
      }
    });

    if (counterRef.current) {
      counterRef.current.textContent = String(activeIdx + 1).padStart(2, "0");
    }
    if (scrollHintRef.current) {
      gsap.set(scrollHintRef.current, { opacity: cameraPos < 0.2 ? 1 : 0 });
    }
  }

  useEffect(() => {
    if (isMobile || !sectionRef.current || !stickyRef.current) return;

    // Initial state: cards pre-positioned
    SERVICES.forEach((_, i) => {
      const card = cardRefs.current[i];
      if (!card) return;
      const { scale, opacity } = getCardState(0, i);
      gsap.set(card, { scale, opacity });
    });
    if (textRefs.current[0]) gsap.set(textRefs.current[0], { opacity: 0 });
    SERVICES.forEach((_, i) => {
      if (textRefs.current[i]) gsap.set(textRefs.current[i], { opacity: 0 });
    });

    const ctx = gsap.context(() => {
      const proxy = { cam: 0 };

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: 1.2,
        onUpdate: (self) => {
          const targetCam = self.progress * (SERVICES.length - 1 + 0.3);
          camPosRef.current = targetCam;
          applyCamera(targetCam);
        },
      });
    }, sectionRef);

    // Kick off first frame
    applyCamera(0);

    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMobile]);

  if (isMobile) {
    return (
      <section id="services" style={{ background: "#EFE9E1" }} className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-14">
            <p style={{ fontSize: "10px", letterSpacing: "0.35em", textTransform: "uppercase", color: "#9C8670", marginBottom: "12px" }}>
              — Услуги
            </p>
            <h2 style={{ fontFamily: "serif", fontSize: "36px", color: "#3D2E20", fontWeight: 300 }}>
              Искусство <em style={{ color: "#8B7355" }}>преображения</em>
            </h2>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {SERVICES.map((s, i) => (
              <div
                key={i}
                onClick={() => setMobileActive(i)}
                style={{
                  padding: "22px 26px",
                  background: i === mobileActive ? "#E4D9CC" : "#EAE4DC",
                  border: `1px solid ${i === mobileActive ? "rgba(139,115,85,0.4)" : "rgba(139,115,85,0.12)"}`,
                  opacity: i === mobileActive ? 1 : 0.55,
                  cursor: "pointer",
                  transition: "all 0.45s ease",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "8px" }}>
                  <span style={{ fontSize: "9px", letterSpacing: "0.4em", color: "#8B7355" }}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div style={{ flex: 1, height: "1px", background: "rgba(139,115,85,0.18)" }} />
                </div>
                <h3 style={{ fontFamily: "serif", fontSize: "20px", color: "#3D2E20", fontWeight: 300, marginBottom: i === mobileActive ? "10px" : "0" }}>
                  {s.title}
                </h3>
                {i === mobileActive && (
                  <p style={{ fontSize: "13px", color: "#7A6A5A", lineHeight: 1.65, fontWeight: 300, whiteSpace: "pre-line" }}>
                    {s.desc}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      ref={sectionRef}
      id="services"
      style={{ height: "500vh", position: "relative" }}
    >
      <div
        ref={stickyRef}
        style={{
          position: "sticky",
          top: 0,
          height: "100vh",
          width: "100%",
          overflow: "hidden",
          background: "#EFE9E1",
        }}
      >
        {/* Radial vignette for depth */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse 70% 70% at 50% 50%, transparent 55%, rgba(239,233,225,0.55) 100%)",
            zIndex: 5,
            pointerEvents: "none",
          }}
        />

        {/* Top UI bar */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            zIndex: 30,
            padding: "36px 56px 0",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            pointerEvents: "none",
          }}
        >
          <div>
            <p style={{ fontSize: "9px", letterSpacing: "0.4em", textTransform: "uppercase", color: "rgba(100,80,60,0.5)", marginBottom: "6px" }}>
              — Услуги
            </p>
            <h2 style={{ fontFamily: "serif", fontSize: "clamp(26px, 2.8vw, 42px)", color: "#3D2E20", fontWeight: 300, lineHeight: 1.1 }}>
              Искусство{" "}
              <em style={{ color: "#8B7355", fontStyle: "italic" }}>преображения</em>
            </h2>
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontSize: "52px", fontFamily: "serif", fontWeight: 200, color: "rgba(139,115,85,0.2)", lineHeight: 1, display: "flex", alignItems: "baseline", gap: "2px" }}>
              <span ref={counterRef} style={{ display: "inline-block" }}>01</span>
              <span style={{ fontSize: "18px" }}>/{String(SERVICES.length).padStart(2, "0")}</span>
            </div>
          </div>
        </div>

        {/* Card stage — all cards centered, zoom driven by scale */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {SERVICES.map((_, i) => {
            const [from, to] = CARD_TONES[i];
            return (
              <div
                key={i}
                ref={(el) => { cardRefs.current[i] = el; }}
                style={{
                  position: "absolute",
                  width: "100vw",
                  height: "100vh",
                  willChange: "transform, opacity",
                  transformOrigin: "center center",
                }}
              >
                {/* Card fill */}
                <div
                  style={{
                    width: "100%",
                    height: "100%",
                    background: `linear-gradient(160deg, ${from} 0%, ${to} 100%)`,
                    position: "relative",
                  }}
                >
                  {/* Subtle horizontal stripe texture */}
                  {Array.from({ length: 16 }).map((_, li) => (
                    <div
                      key={li}
                      style={{
                        position: "absolute",
                        left: 0,
                        right: 0,
                        top: `${6.25 * li}%`,
                        height: "1px",
                        background: "rgba(100,80,60,0.05)",
                      }}
                    />
                  ))}

                  {/* Frame border */}
                  <div
                    style={{
                      position: "absolute",
                      inset: "clamp(20px, 3vw, 48px)",
                      border: "1px solid rgba(120,95,70,0.2)",
                      pointerEvents: "none",
                    }}
                  />

                  {/* Corner accents */}
                  {[
                    { top: "clamp(20px,3vw,48px)", left: "clamp(20px,3vw,48px)" },
                    { top: "clamp(20px,3vw,48px)", right: "clamp(20px,3vw,48px)" },
                    { bottom: "clamp(20px,3vw,48px)", left: "clamp(20px,3vw,48px)" },
                    { bottom: "clamp(20px,3vw,48px)", right: "clamp(20px,3vw,48px)" },
                  ].map((pos, ci) => (
                    <div
                      key={ci}
                      style={{
                        position: "absolute",
                        width: 28,
                        height: 28,
                        borderTop: ci < 2 ? "1.5px solid rgba(100,78,55,0.4)" : "none",
                        borderBottom: ci >= 2 ? "1.5px solid rgba(100,78,55,0.4)" : "none",
                        borderLeft: ci === 0 || ci === 2 ? "1.5px solid rgba(100,78,55,0.4)" : "none",
                        borderRight: ci === 1 || ci === 3 ? "1.5px solid rgba(100,78,55,0.4)" : "none",
                        ...pos,
                      }}
                    />
                  ))}

                  {/* Card index number (faint, large) */}
                  <div
                    style={{
                      position: "absolute",
                      bottom: "clamp(28px,4vw,60px)",
                      right: "clamp(28px,4vw,60px)",
                      fontSize: "clamp(80px, 12vw, 180px)",
                      fontFamily: "serif",
                      fontWeight: 200,
                      color: "rgba(120,95,70,0.08)",
                      lineHeight: 1,
                      userSelect: "none",
                    }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* HTML Text overlay — centered, appears at card arrival */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 20,
            pointerEvents: "none",
          }}
        >
          {SERVICES.map((s, i) => (
            <div
              key={i}
              ref={(el) => { textRefs.current[i] = el; }}
              style={{
                position: "absolute",
                textAlign: "center",
                maxWidth: "540px",
                padding: "0 32px",
                opacity: 0,
              }}
            >
              <p style={{ fontSize: "9px", letterSpacing: "0.45em", textTransform: "uppercase", color: "#9C8670", marginBottom: "20px" }}>
                {String(i + 1).padStart(2, "0")} / {String(SERVICES.length).padStart(2, "0")}
              </p>
              <h3 style={{ fontFamily: "serif", fontSize: "clamp(28px, 4vw, 58px)", color: "#2E2118", fontWeight: 300, lineHeight: 1.1, marginBottom: "20px", letterSpacing: "-0.01em" }}>
                {s.title}
              </h3>
              <div style={{ width: "40px", height: "1px", background: "rgba(139,115,85,0.4)", margin: "0 auto 20px" }} />
              <p style={{ fontSize: "15px", color: "#7A6A5A", lineHeight: 1.75, fontWeight: 300, whiteSpace: "pre-line" }}>
                {s.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Side progress dots */}
        <div
          style={{
            position: "absolute",
            right: "36px",
            top: "50%",
            transform: "translateY(-50%)",
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            zIndex: 30,
            pointerEvents: "none",
          }}
        >
          {SERVICES.map((_, i) => (
            <div
              key={i}
              ref={(el) => { dotsRef.current[i] = el; }}
              style={{
                width: i === 0 ? "24px" : "6px",
                height: "6px",
                borderRadius: "3px",
                background: i === 0 ? "#8B7355" : "rgba(139,115,85,0.22)",
              }}
            />
          ))}
        </div>

        {/* Scroll hint */}
        <div
          ref={scrollHintRef}
          style={{
            position: "absolute",
            bottom: "32px",
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 30,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "8px",
            pointerEvents: "none",
          }}
        >
          <p style={{ fontSize: "8px", letterSpacing: "0.38em", textTransform: "uppercase", color: "rgba(100,80,60,0.45)" }}>
            Прокрутите
          </p>
          <div style={{ width: "1px", height: "28px", background: "linear-gradient(to bottom, rgba(139,115,85,0.5), transparent)" }} />
        </div>
      </div>
    </section>
  );
}
