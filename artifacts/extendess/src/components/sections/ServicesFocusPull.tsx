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

// Card positions in CSS 3D space
// translateX, translateY, translateZ, rotateY
const CARD_LAYOUT = [
  { x: -280, y: 0, z: 120, ry: 6 },
  { x: 260, y: 40, z: 40, ry: -5 },
  { x: -200, y: -20, z: -100, ry: 4 },
  { x: 280, y: -40, z: -240, ry: -6 },
  { x: -260, y: 30, z: -380, ry: 5 },
];

// Blur level for each card when a given card is active
// blur in px, indexed by [activeCard][cardIndex]
function getBlur(activeIdx: number, cardIdx: number): number {
  const dist = Math.abs(activeIdx - cardIdx);
  if (dist === 0) return 0;
  if (dist === 1) return 3;
  if (dist === 2) return 7;
  return 11;
}

function getOpacity(activeIdx: number, cardIdx: number): number {
  const dist = Math.abs(activeIdx - cardIdx);
  if (dist === 0) return 1;
  if (dist === 1) return 0.65;
  if (dist === 2) return 0.42;
  return 0.22;
}

function getScale(activeIdx: number, cardIdx: number): number {
  const dist = Math.abs(activeIdx - cardIdx);
  if (dist === 0) return 1.04;
  return 1;
}

export function Services() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const textRefs = useRef<(HTMLDivElement | null)[]>([]);
  const dotsRef = useRef<(HTMLDivElement | null)[]>([]);
  const counterRef = useRef<HTMLSpanElement>(null);
  const scrollHintRef = useRef<HTMLDivElement>(null);
  const activeIdxRef = useRef(0);

  const [isMobile, setIsMobile] = useState(false);
  const [mobileActive, setMobileActive] = useState(0);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Apply visual state to all cards & UI imperatively (no re-render)
  function applyState(idx: number) {
    const prev = activeIdxRef.current;
    if (idx === prev && idx !== 0) return;
    activeIdxRef.current = idx;

    SERVICES.forEach((_, i) => {
      const card = cardRefs.current[i];
      const text = textRefs.current[i];
      const dot = dotsRef.current[i];
      if (!card) return;

      const blur = getBlur(idx, i);
      const opacity = getOpacity(idx, i);
      const scale = getScale(idx, i);
      const { x, y, z, ry } = CARD_LAYOUT[i];

      gsap.to(card, {
        filter: `blur(${blur}px)`,
        opacity,
        x,
        y,
        z,
        rotateY: ry,
        scale,
        duration: 0.75,
        ease: "power2.out",
      });

      if (text) {
        gsap.to(text, {
          opacity: i === idx ? 1 : 0,
          y: i === idx ? 0 : 14,
          duration: 0.55,
          ease: "power2.out",
        });
      }

      if (dot) {
        gsap.to(dot, {
          width: i === idx ? 26 : 6,
          backgroundColor: i === idx ? "#8B7355" : "rgba(139,115,85,0.22)",
          duration: 0.4,
          ease: "power2.out",
        });
      }
    });

    if (counterRef.current) {
      gsap.to(counterRef.current, {
        opacity: 0,
        y: -6,
        duration: 0.2,
        ease: "power2.in",
        onComplete: () => {
          if (counterRef.current) {
            counterRef.current.textContent = String(idx + 1).padStart(2, "0");
          }
          gsap.to(counterRef.current, {
            opacity: 1,
            y: 0,
            duration: 0.25,
            ease: "power2.out",
          });
        },
      });
    }

    if (scrollHintRef.current) {
      gsap.to(scrollHintRef.current, {
        opacity: idx === 0 ? 1 : 0,
        duration: 0.4,
      });
    }
  }

  useEffect(() => {
    if (isMobile || !sectionRef.current || !stickyRef.current) return;

    // Set initial 3D positions via GSAP (avoids inline style conflict)
    SERVICES.forEach((_, i) => {
      const card = cardRefs.current[i];
      if (!card) return;
      const { x, y, z, ry } = CARD_LAYOUT[i];
      gsap.set(card, {
        x, y, z,
        rotateY: ry,
        filter: `blur(${getBlur(0, i)}px)`,
        opacity: getOpacity(0, i),
        scale: getScale(0, i),
      });
    });

    // Show first card text
    if (textRefs.current[0]) gsap.set(textRefs.current[0], { opacity: 1, y: 0 });
    SERVICES.forEach((_, i) => {
      if (i > 0 && textRefs.current[i]) gsap.set(textRefs.current[i], { opacity: 0, y: 14 });
    });

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: 1.0,
        onUpdate: (self) => {
          const total = SERVICES.length - 1;
          const raw = self.progress * total;
          const idx = Math.min(total, Math.round(raw));
          applyState(idx);
        },
      });
    }, sectionRef);

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
                  filter: i === mobileActive ? "none" : "blur(0.5px)",
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
        {/* Top bar */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            zIndex: 10,
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

        {/* 3D Card Stage */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            perspective: "1200px",
            perspectiveOrigin: "50% 50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div style={{ position: "relative", width: 0, height: 0, transformStyle: "preserve-3d" }}>
            {SERVICES.map((_, i) => (
                <div
                  key={i}
                  ref={(el) => { cardRefs.current[i] = el; }}
                  style={{
                    position: "absolute",
                    width: "380px",
                    height: "240px",
                    marginLeft: "-190px",
                    marginTop: "-120px",
                    willChange: "transform, filter, opacity",
                    cursor: "default",
                    borderRadius: "2px",
                    overflow: "hidden",
                  }}
                >
                  {/* Card body */}
                  <div
                    style={{
                      width: "100%",
                      height: "100%",
                      background: "linear-gradient(135deg, #F2EBE2 0%, #E8DDD0 100%)",
                      border: "1px solid rgba(120,95,70,0.25)",
                      position: "relative",
                      boxShadow: "0 24px 60px rgba(60,40,20,0.18), 0 4px 16px rgba(60,40,20,0.08)",
                    }}
                  >
                    {/* Decorative corner lines */}
                    {([
                      { top: 10, left: 10 },
                      { top: 10, right: 10 },
                      { bottom: 10, left: 10 },
                      { bottom: 10, right: 10 },
                    ] as React.CSSProperties[]).map((pos, ci) => (
                      <div
                        key={ci}
                        style={{
                          position: "absolute",
                          width: 18,
                          height: 18,
                          borderTop: ci < 2 ? "1px solid rgba(100,78,55,0.4)" : "none",
                          borderBottom: ci >= 2 ? "1px solid rgba(100,78,55,0.4)" : "none",
                          borderLeft: ci === 0 || ci === 2 ? "1px solid rgba(100,78,55,0.4)" : "none",
                          borderRight: ci === 1 || ci === 3 ? "1px solid rgba(100,78,55,0.4)" : "none",
                          ...pos,
                        }}
                      />
                    ))}

                    {/* Horizontal texture lines */}
                    {Array.from({ length: 6 }).map((_, li) => (
                      <div
                        key={li}
                        style={{
                          position: "absolute",
                          left: 22,
                          right: 22,
                          top: 38 + li * 28,
                          height: "1px",
                          background: "rgba(140,115,88,0.08)",
                        }}
                      />
                    ))}

                    {/* Card number */}
                    <div
                      style={{
                        position: "absolute",
                        top: 18,
                        left: 22,
                        fontSize: "9px",
                        letterSpacing: "0.42em",
                        color: "rgba(100,78,55,0.35)",
                        textTransform: "uppercase",
                        fontWeight: 300,
                      }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </div>

                    {/* Border inset */}
                    <div
                      style={{
                        position: "absolute",
                        inset: "8px",
                        border: "1px solid rgba(139,115,85,0.12)",
                        pointerEvents: "none",
                      }}
                    />
                  </div>
                </div>
            ))}
          </div>
        </div>

        {/* HTML Text overlay — active service info */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            pointerEvents: "none",
            zIndex: 20,
          }}
        >
          {SERVICES.map((s, i) => (
            <div
              key={i}
              ref={(el) => { textRefs.current[i] = el; }}
              style={{
                position: "absolute",
                textAlign: "center",
                maxWidth: "400px",
                padding: "0 24px",
                opacity: i === 0 ? 1 : 0,
                transform: i === 0 ? "translateY(0)" : "translateY(14px)",
              }}
            >
              <p style={{ fontSize: "9px", letterSpacing: "0.42em", textTransform: "uppercase", color: "#9C8670", marginBottom: "14px" }}>
                {String(i + 1).padStart(2, "0")} из {String(SERVICES.length).padStart(2, "0")}
              </p>
              <h3 style={{ fontFamily: "serif", fontSize: "clamp(22px, 2.6vw, 38px)", color: "#3D2E20", fontWeight: 300, lineHeight: 1.15, marginBottom: "16px" }}>
                {s.title}
              </h3>
              <p style={{ fontSize: "14px", color: "#7A6A5A", lineHeight: 1.72, fontWeight: 300, whiteSpace: "pre-line" }}>
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
            zIndex: 20,
            pointerEvents: "none",
          }}
        >
          {SERVICES.map((_, i) => (
            <div
              key={i}
              ref={(el) => { dotsRef.current[i] = el; }}
              style={{
                width: i === 0 ? "26px" : "6px",
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
            bottom: "28px",
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 20,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "6px",
            opacity: 1,
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
