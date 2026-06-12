import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const SERVICES = [
  {
    title: "Парикмахерское искусство",
    desc: "Авторские стрижки, окрашивание\nи укладки от мастеров уровня Парижа",
    num: "01",
  },
  {
    title: "Ногтевой сервис",
    desc: "Маникюр, педикюр и наращивание\nв лучших традициях nail-art",
    num: "02",
  },
  {
    title: "Косметология",
    desc: "Уходовые ритуалы, пилинги и массажи\nдля сияния вашей кожи",
    num: "03",
  },
  {
    title: "Эстетическая медицина",
    desc: "Мезотерапия, биоревитализация\nи контурная пластика",
    num: "04",
  },
  {
    title: "Wellness и восстановление",
    desc: "Комплексные программы восстановления\nтела и духа",
    num: "05",
  },
];

// Slight rotation offsets for each stack position (visual depth feel)
const STACK_ROTS = [0, 1.8, -1.2, 0.8, -0.5];

// Front card gradient pairs
const FRONT_GRADS = [
  ["#F4EDE4", "#E9DDD1"],
  ["#F1EAE0", "#E6DACC"],
  ["#EEE6DB", "#E3D6C7"],
  ["#ECE3D7", "#E0D3C3"],
  ["#E9E0D4", "#DDD0BF"],
];

// Back card gradient (brand-toned, slightly darker)
const BACK_GRADS = [
  ["#DDD0C0", "#C9B89E"],
  ["#DAD0C0", "#C6B69C"],
  ["#D8CFC0", "#C4B49A"],
  ["#D5CCC0", "#C2B298"],
  ["#D3C9BE", "#C0B096"],
];

/**
 * Given scroll progress (0→1) and card index,
 * returns the visual state of that card.
 */
function getCardState(
  rawStep: number,
  cardIdx: number,
  isMobile: boolean
) {
  const activeIdx = Math.min(SERVICES.length - 1, Math.floor(rawStep));
  const flipP = rawStep - Math.floor(rawStep); // 0-1 within current transition
  const easedFlip = flipP < 0.5
    ? 2 * flipP * flipP
    : 1 - Math.pow(-2 * flipP + 2, 2) / 2; // easeInOutQuad

  const flyX = isMobile ? -260 : -520;
  const flyY = isMobile ? -100 : -180;

  if (cardIdx < activeIdx) {
    // Already flipped away — hidden far off-screen
    return {
      rotateY: -180,
      x: flyX,
      y: flyY,
      opacity: 0,
      z: 0,
      scale: 1,
      zIndex: 0,
    };
  }

  if (cardIdx === activeIdx) {
    // Active card — flipping out
    return {
      rotateY: -180 * easedFlip,
      x: flyX * easedFlip,
      y: flyY * easedFlip,
      opacity: Math.max(0, 1 - easedFlip * 2.2),
      z: 0,
      scale: 1,
      zIndex: SERVICES.length + 10,
    };
  }

  // Cards in the stack below
  const stackPos = cardIdx - activeIdx; // 1 = next, 2 = third, …
  const riseAmount = easedFlip; // 0→1 as flipP goes 0→1

  // Each card moves "up" one step as transition progresses
  const effectivePos = stackPos - riseAmount;
  const stackZ = -effectivePos * 10;
  const stackScale = 1 - effectivePos * 0.042;
  const stackRotZ = STACK_ROTS[Math.min(stackPos, STACK_ROTS.length - 1)];

  return {
    rotateY: 0,
    x: 0,
    y: 0,
    opacity: stackPos <= 3 ? 1 : 0,
    z: stackZ,
    scale: Math.max(0.82, stackScale),
    zIndex: SERVICES.length + 10 - stackPos,
    rotateZ: stackRotZ * (1 - riseAmount * (stackPos === 1 ? 1 : 0)),
  };
}

export function Services() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const wrapperRefs = useRef<(HTMLDivElement | null)[]>([]);
  const dotRefs = useRef<(HTMLDivElement | null)[]>([]);
  const counterRef = useRef<HTMLSpanElement>(null);
  const scrollHintRef = useRef<HTMLDivElement>(null);

  const [isMobile, setIsMobile] = useState(false);
  const [mobileActive, setMobileActive] = useState(0);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  function applyStates(rawStep: number, mobile: boolean) {
    const displayIdx = Math.min(SERVICES.length - 1, Math.round(rawStep));

    SERVICES.forEach((_, i) => {
      const wrapper = wrapperRefs.current[i];
      if (!wrapper) return;

      const state = getCardState(rawStep, i, mobile);

      gsap.set(wrapper, {
        rotateY: state.rotateY,
        x: state.x,
        y: state.y,
        opacity: state.opacity,
        z: state.z,
        scale: state.scale,
        zIndex: state.zIndex,
        rotateZ: (state as any).rotateZ ?? 0,
        force3D: true,
      });
    });

    if (counterRef.current) {
      counterRef.current.textContent = String(displayIdx + 1).padStart(2, "0");
    }
    if (scrollHintRef.current) {
      gsap.set(scrollHintRef.current, { opacity: rawStep < 0.15 ? 1 : 0 });
    }
    dotRefs.current.forEach((dot, i) => {
      if (!dot) return;
      gsap.set(dot, {
        width: i === displayIdx ? 24 : 6,
        backgroundColor: i === displayIdx ? "#8B7355" : "rgba(139,115,85,0.22)",
      });
    });
  }

  useEffect(() => {
    if (isMobile || !sectionRef.current || !stickyRef.current) return;

    // Set initial state
    applyStates(0, false);

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: 1.4,
        onUpdate: (self) => {
          const raw = self.progress * (SERVICES.length - 1 + 0.01);
          applyStates(raw, false);
        },
      });
    }, sectionRef);

    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMobile]);

  // ── Mobile layout ────────────────────────────────────────────
  if (isMobile) {
    return (
      <section id="services" style={{ background: "#EFE9E1" }} className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-14">
            <p style={{ fontSize: "10px", letterSpacing: "0.35em", textTransform: "uppercase", color: "#9C8670", marginBottom: "12px" }}>
              — Услуги
            </p>
            <h2 style={{ fontFamily: "serif", fontSize: "34px", color: "#3D2E20", fontWeight: 300 }}>
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
                  borderRadius: "2px",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "8px" }}>
                  <span style={{ fontSize: "9px", letterSpacing: "0.4em", color: "#8B7355" }}>{s.num}</span>
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

  // ── Desktop layout ───────────────────────────────────────────
  const CARD_W = 480;
  const CARD_H = 340;

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
        {/* Top UI bar */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            zIndex: 40,
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
          <div style={{ display: "flex", alignItems: "baseline", gap: "2px", fontFamily: "serif", fontWeight: 200 }}>
            <span ref={counterRef} style={{ fontSize: "52px", color: "rgba(139,115,85,0.22)", lineHeight: 1 }}>01</span>
            <span style={{ fontSize: "18px", color: "rgba(139,115,85,0.18)" }}>/{String(SERVICES.length).padStart(2, "0")}</span>
          </div>
        </div>

        {/* Card stack stage */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            perspective: "1200px",
            perspectiveOrigin: "50% 48%",
          }}
        >
          <div
            style={{
              position: "relative",
              width: CARD_W,
              height: CARD_H,
              transformStyle: "preserve-3d",
            }}
          >
            {/* Render in reverse order so card 0 paints on top */}
            {[...SERVICES].reverse().map((s, ri) => {
              const i = SERVICES.length - 1 - ri;
              const [fg, fg2] = FRONT_GRADS[i];
              const [bg, bg2] = BACK_GRADS[i];

              return (
                <div
                  key={i}
                  ref={(el) => { wrapperRefs.current[i] = el; }}
                  style={{
                    position: "absolute",
                    inset: 0,
                    transformStyle: "preserve-3d",
                    willChange: "transform, opacity",
                    transformOrigin: "center center",
                  }}
                >
                  {/* ── Front face ── */}
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      background: `linear-gradient(145deg, ${fg} 0%, ${fg2} 100%)`,
                      borderRadius: "6px",
                      boxShadow: "0 32px 80px rgba(60,40,20,0.22), 0 6px 20px rgba(60,40,20,0.1)",
                      backfaceVisibility: "hidden",
                      WebkitBackfaceVisibility: "hidden",
                      padding: "40px 44px",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      overflow: "hidden",
                    }}
                  >
                    {/* Subtle horizontal texture */}
                    {Array.from({ length: 8 }).map((_, li) => (
                      <div
                        key={li}
                        style={{
                          position: "absolute",
                          left: 0, right: 0,
                          top: `${12.5 * li}%`,
                          height: "1px",
                          background: "rgba(100,78,55,0.05)",
                        }}
                      />
                    ))}

                    {/* Frame border */}
                    <div style={{ position: "absolute", inset: "14px", border: "1px solid rgba(110,88,62,0.15)", borderRadius: "4px", pointerEvents: "none" }} />

                    {/* Content */}
                    <div>
                      <p style={{ fontSize: "9px", letterSpacing: "0.45em", textTransform: "uppercase", color: "#9C8670", marginBottom: "16px" }}>
                        {s.num} / {String(SERVICES.length).padStart(2, "0")}
                      </p>
                      <h3 style={{ fontFamily: "serif", fontSize: "clamp(22px, 2.2vw, 32px)", color: "#2E1F0E", fontWeight: 300, lineHeight: 1.15, marginBottom: "18px" }}>
                        {s.title}
                      </h3>
                      <div style={{ width: "32px", height: "1px", background: "rgba(139,115,85,0.4)", marginBottom: "16px" }} />
                      <p style={{ fontSize: "14px", color: "#7A6A5A", lineHeight: 1.7, fontWeight: 300, whiteSpace: "pre-line" }}>
                        {s.desc}
                      </p>
                    </div>

                    {/* Bottom row */}
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
                      <p style={{ fontSize: "9px", letterSpacing: "0.35em", textTransform: "uppercase", color: "rgba(100,78,55,0.3)" }}>
                        Extendess
                      </p>
                      <div style={{ width: "20px", height: "20px", borderBottom: "1px solid rgba(100,78,55,0.25)", borderRight: "1px solid rgba(100,78,55,0.25)" }} />
                    </div>
                  </div>

                  {/* ── Back face ── */}
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      background: `linear-gradient(145deg, ${bg} 0%, ${bg2} 100%)`,
                      borderRadius: "6px",
                      boxShadow: "0 32px 80px rgba(60,40,20,0.22), 0 6px 20px rgba(60,40,20,0.1)",
                      backfaceVisibility: "hidden",
                      WebkitBackfaceVisibility: "hidden",
                      transform: "rotateY(180deg)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      overflow: "hidden",
                    }}
                  >
                    {/* Geometric back pattern */}
                    <div style={{ position: "absolute", inset: "14px", border: "1px solid rgba(255,255,255,0.25)", borderRadius: "4px" }} />
                    <div style={{ position: "absolute", inset: "28px", border: "1px solid rgba(255,255,255,0.12)", borderRadius: "2px" }} />

                    {/* Diagonal lines */}
                    {Array.from({ length: 12 }).map((_, li) => (
                      <div
                        key={li}
                        style={{
                          position: "absolute",
                          left: 0, right: 0,
                          top: `${100 / 12 * li}%`,
                          height: "1px",
                          background: "rgba(255,255,255,0.1)",
                        }}
                      />
                    ))}
                    {Array.from({ length: 8 }).map((_, li) => (
                      <div
                        key={li}
                        style={{
                          position: "absolute",
                          top: 0, bottom: 0,
                          left: `${100 / 8 * li}%`,
                          width: "1px",
                          background: "rgba(255,255,255,0.07)",
                        }}
                      />
                    ))}

                    {/* Center E logo mark */}
                    <div style={{ display: "flex", flexDirection: "column", gap: "5px", opacity: 0.55 }}>
                      {[1, 0.6, 1].map((w, wi) => (
                        <div key={wi} style={{ width: `${28 * w}px`, height: "2px", background: "rgba(255,255,255,0.7)" }} />
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: scroll progress indicator */}
        <div
          style={{
            position: "absolute",
            right: "40px",
            top: "50%",
            transform: "translateY(-50%)",
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            zIndex: 40,
            pointerEvents: "none",
          }}
        >
          {SERVICES.map((_, i) => (
            <div
              key={i}
              ref={(el) => { dotRefs.current[i] = el; }}
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
            zIndex: 40,
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
