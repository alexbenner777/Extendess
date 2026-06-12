import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const slides = [
  {
    num: "01",
    title: "Слайд 1",
    text: "Контент появится позже",
    accent: "#C9A96E",
    bg: "linear-gradient(135deg, #1a1208 0%, #2e1f0e 50%, #1a1208 100%)",
  },
  {
    num: "02",
    title: "Слайд 2",
    text: "Контент появится позже",
    accent: "#A89070",
    bg: "linear-gradient(135deg, #0e1a18 0%, #0e2420 50%, #0e1a18 100%)",
  },
  {
    num: "03",
    title: "Слайд 3",
    text: "Контент появится позже",
    accent: "#B8A898",
    bg: "linear-gradient(135deg, #100e1a 0%, #1a0e28 50%, #100e1a 100%)",
  },
  {
    num: "04",
    title: "Слайд 4",
    text: "Контент появится позже",
    accent: "#C8A080",
    bg: "linear-gradient(135deg, #1a0e10 0%, #280e14 50%, #1a0e10 100%)",
  },
  {
    num: "05",
    title: "Слайд 5",
    text: "Контент появится позже",
    accent: "#D4B896",
    bg: "linear-gradient(135deg, #121a0e 0%, #1e280e 50%, #121a0e 100%)",
  },
];

export function ZoomThrough() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    const inner = innerRef.current;
    if (!section || !inner) return;

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

        // Ease in/out for smoother feel
        const eased = t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;

        els.forEach((el, i) => {
          if (i === tIdx) {
            // Current slide zooms through
            gsap.set(el, {
              scale: 1 + eased * 1.2,
              opacity: 1 - eased,
              filter: `blur(${eased * 16}px)`,
            });
          } else if (i === tIdx + 1) {
            // Next slide emerges from depth
            gsap.set(el, {
              scale: 0.55 + eased * 0.45,
              opacity: eased,
              filter: `blur(${(1 - eased) * 18}px)`,
            });
          } else if (i < tIdx) {
            // Past slides — hidden, zoomed out
            gsap.set(el, { scale: 2.2, opacity: 0, filter: "blur(20px)" });
          } else {
            // Future slides — hidden, small
            gsap.set(el, { scale: 0.55, opacity: 0, filter: "blur(18px)" });
          }
        });
      },
    });

    return () => {
      st.kill();
    };
  }, []);

  return (
    <div
      ref={sectionRef}
      style={{ height: `${slides.length * 100}vh`, background: "#EFE9E1" }}
    >
      {/* Sticky viewport */}
      <div
        ref={innerRef}
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
          — О нас
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
              background: slide.bg,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              padding: "clamp(32px, 5vw, 64px)",
              boxShadow: "0 60px 120px rgba(0,0,0,0.22), 0 4px 24px rgba(0,0,0,0.1)",
              transformOrigin: "center center",
              willChange: "transform, opacity, filter",
              overflow: "hidden",
            }}
          >
            {/* Subtle noise texture overlay */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                backgroundImage:
                  "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E\")",
                backgroundSize: "180px 180px",
                borderRadius: 16,
                pointerEvents: "none",
              }}
            />

            {/* Corner accent line */}
            <div
              style={{
                position: "absolute",
                top: 28,
                left: 32,
                width: 32,
                height: 1,
                background: slide.accent,
                opacity: 0.6,
              }}
            />

            {/* Slide number */}
            <span
              style={{
                position: "absolute",
                top: 28,
                right: 32,
                fontSize: 9,
                letterSpacing: "0.5em",
                color: "rgba(255,255,255,0.25)",
                textTransform: "uppercase",
                fontWeight: 300,
              }}
            >
              {slide.num} / 05
            </span>

            {/* Title */}
            <h2
              style={{
                fontSize: "clamp(2.4rem, 6vw, 5rem)",
                fontWeight: 100,
                letterSpacing: "-0.03em",
                lineHeight: 1,
                color: "rgba(255,255,255,0.92)",
                textAlign: "center",
                marginBottom: 20,
                fontFamily: "inherit",
              }}
            >
              {slide.title}
            </h2>

            {/* Divider */}
            <div
              style={{
                width: 40,
                height: 1,
                background: slide.accent,
                marginBottom: 20,
                opacity: 0.7,
              }}
            />

            {/* Text */}
            <p
              style={{
                fontSize: "clamp(11px, 1.5vw, 14px)",
                fontWeight: 300,
                color: "rgba(255,255,255,0.42)",
                textAlign: "center",
                lineHeight: 1.75,
                maxWidth: 380,
                letterSpacing: "0.02em",
              }}
            >
              {slide.text}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
