import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export interface ZoomSlide {
  num: string;
  title: string;
  desc: string;
  img: string;
  href?: string;
}

interface Props {
  slides: ZoomSlide[];
  label?: string;
}

export function ZoomThrough({ slides = [], label = "— Услуги" }: Props) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const els = slideRefs.current.filter(Boolean) as HTMLDivElement[];
    const N = els.length;

    // Initial state — only first slide visible
    els.forEach((el, i) => {
      gsap.set(el, {
        scale: i === 0 ? 1 : 0.55,
        opacity: i === 0 ? 1 : 0,
        filter: i === 0 ? "blur(0px)" : "blur(18px)",
        zIndex: N - i,
      });
    });

    const st = ScrollTrigger.create({
      trigger: section,
      start: "top top",
      end: "bottom bottom",
      scrub: 1.2,
      onUpdate: (self) => {
        const prog = self.progress;
        const transitions = N - 1;
        const raw = prog * transitions;
        const tIdx = Math.min(Math.floor(raw), transitions - 1);
        const t = Math.max(0, Math.min(1, raw - tIdx));

        // Ease in-out
        const eased = t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;

        els.forEach((el, i) => {
          if (i === tIdx) {
            gsap.set(el, {
              scale: 1 + eased * 1.2,
              opacity: 1 - eased,
              filter: `blur(${eased * 16}px)`,
            });
          } else if (i === tIdx + 1) {
            gsap.set(el, {
              scale: 0.55 + eased * 0.45,
              opacity: eased,
              filter: `blur(${(1 - eased) * 18}px)`,
            });
          } else if (i < tIdx) {
            gsap.set(el, { scale: 2.2, opacity: 0, filter: "blur(20px)" });
          } else {
            gsap.set(el, { scale: 0.55, opacity: 0, filter: "blur(18px)" });
          }
        });
      },
    });

    return () => {
      st.kill();
    };
  }, [slides]);

  return (
    <div
      ref={sectionRef}
      style={{ height: `${slides.length * 100}vh`, background: "#EFE9E1" }}
    >
      <div
        style={{
          position: "sticky",
          top: 0,
          height: "100vh",
          perspective: "1000px",
          perspectiveOrigin: "50% 50%",
          overflow: "hidden",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#EFE9E1",
        }}
      >
        {/* Section label */}
        <p
          style={{
            position: "absolute",
            top: 36,
            left: 40,
            fontSize: 9,
            letterSpacing: "0.5em",
            textTransform: "uppercase",
            color: "rgba(0,0,0,0.25)",
            fontWeight: 300,
            zIndex: 100,
            pointerEvents: "none",
          }}
        >
          {label}
        </p>

        {slides.map((slide, i) => (
          <div
            key={i}
            ref={(el) => { slideRefs.current[i] = el; }}
            style={{
              position: "absolute",
              width: "min(700px, 88vw)",
              height: "min(520px, 80vh)",
              borderRadius: 16,
              overflow: "hidden",
              boxShadow: "0 60px 120px rgba(0,0,0,0.28), 0 4px 24px rgba(0,0,0,0.12)",
              transformOrigin: "center center",
              willChange: "transform, opacity, filter",
              background: "#1a1208",
            }}
          >
            {/* Photo fills top ~58% */}
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: "62%",
                backgroundImage: `url(${slide.img})`,
                backgroundSize: "cover",
                backgroundPosition: "center top",
              }}
            />

            {/* Fade transition image → dark area */}
            <div
              style={{
                position: "absolute",
                top: "49%",
                left: 0,
                right: 0,
                height: "13%",
                background: "linear-gradient(to bottom, transparent, #1a1208)",
              }}
            />

            {/* Dark bottom panel */}
            <div
              style={{
                position: "absolute",
                top: "62%",
                left: 0,
                right: 0,
                bottom: 0,
                background: "#1a1208",
              }}
            />

            {/* Slide number — top right */}
            <span
              style={{
                position: "absolute",
                top: 24,
                right: 28,
                fontSize: 9,
                letterSpacing: "0.5em",
                color: "rgba(255,255,255,0.4)",
                textTransform: "uppercase",
                fontWeight: 300,
                zIndex: 2,
              }}
            >
              {slide.num} / {String(slides.length).padStart(2, "0")}
            </span>

            {/* Gold accent line top left */}
            <div
              style={{
                position: "absolute",
                top: 28,
                left: 28,
                width: 28,
                height: 1,
                background: "#C9A96E",
                opacity: 0.7,
                zIndex: 2,
              }}
            />

            {/* Text content */}
            <div
              style={{
                position: "absolute",
                top: "62%",
                left: 0,
                right: 0,
                bottom: 0,
                padding: "16px 28px 24px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <h2
                style={{
                  fontSize: "clamp(1.4rem, 4vw, 2.2rem)",
                  fontWeight: 100,
                  letterSpacing: "-0.02em",
                  lineHeight: 1.05,
                  color: "rgba(255,255,255,0.92)",
                  whiteSpace: "pre-line",
                  marginBottom: 10,
                  fontFamily: "inherit",
                }}
              >
                {slide.title}
              </h2>
              <p
                style={{
                  fontSize: "clamp(10px, 1.3vw, 12px)",
                  fontWeight: 300,
                  color: "rgba(255,255,255,0.42)",
                  lineHeight: 1.7,
                  letterSpacing: "0.01em",
                }}
              >
                {slide.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
