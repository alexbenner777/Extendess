import { motion, useScroll, useTransform, AnimatePresence, useMotionValueEvent } from "framer-motion";
import { useRef, useState } from "react";
import { Link } from "wouter";
import { ArrowUpRight } from "lucide-react";
import svcMakeup from "../../assets/svc-makeup-nobg.png";
import svcHair from "../../assets/svc-hair-nobg.png";
import svcNails from "../../assets/svc-nails-nobg.png";
import svcMedicine from "../../assets/svc-medicine-nobg.png";
import svcCosmetology from "../../assets/svc-cosmetology-nobg.png";
import svcSpa from "../../assets/svc-spa-nobg.png";

const allServices = [
  {
    num: "01",
    title: "Макияж\nи визаж",
    desc: "Профессиональный макияж и визаж для любого события. Дневной, вечерний, свадебный — мастера создадут ваш идеальный образ.",
    img: svcMakeup,
    href: "/services",
  },
  {
    num: "02",
    title: "Парикмахерский\nсервис",
    desc: "Авторские стрижки, окрашивание, укладки и уходовые процедуры от мастеров французской школы.",
    img: svcHair,
    href: "/services",
  },
  {
    num: "03",
    title: "Ногтевой\nсервис",
    desc: "Маникюр, педикюр, дизайн и наращивание ногтей. Безупречный результат с использованием премиальных материалов.",
    img: svcNails,
    href: "/services",
  },
  {
    num: "04",
    title: "Эстетическая\nи превентивная медицина",
    desc: "Комплексные программы молодости и долголетия. Индивидуальные протоколы, разработанные врачами высшей категории.",
    img: svcMedicine,
    href: "/services",
  },
  {
    num: "05",
    title: "Инъекционная и\nаппаратная косметология",
    desc: "Botox, филлеры, биоревитализация и аппаратные методики для сияния и молодости кожи без длительной реабилитации.",
    img: svcCosmetology,
    href: "/services",
    imgScale: 0.7,
  },
  {
    num: "06",
    title: "СПА",
    desc: "Ритуалы восстановления и релаксации. Массажи, обёртывания и SPA-программы для гармонии тела и духа.",
    img: svcSpa,
    href: "/services",
  },
];

const FACE_COUNT = 6;
const FACE_ANGLE = 360 / FACE_COUNT; // 60° per face
const FACE_W = 320;
const FACE_H = 440;
const PRISM_RADIUS = Math.round((FACE_W / 2) / Math.tan(Math.PI / FACE_COUNT));

export function Services() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [activeIdx, setActiveIdx] = useState(0);

  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ["start start", "end end"],
  });

  // Cube rotates on Y: 0° → −300° (5 steps × 60°) over full scroll
  const rotateY = useTransform(
    scrollYProgress,
    [0, 1],
    [0, -(FACE_ANGLE * (FACE_COUNT - 1))]
  );

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const idx = Math.min(FACE_COUNT - 1, Math.round(v * (FACE_COUNT - 1)));
    setActiveIdx(idx);
  });

  const s = allServices[activeIdx];

  return (
    <section ref={wrapperRef} className="relative h-[550vh] bg-[#EFE9E1]">
      <div className="sticky top-0 h-screen flex flex-col items-center justify-center overflow-hidden">

        {/* Progress bar */}
        <div className="absolute top-0 inset-x-0 h-[1px] bg-black/10 z-20">
          <motion.div
            className="h-full bg-black/30 origin-left"
            style={{ scaleX: scrollYProgress }}
          />
        </div>

        {/* Section label */}
        <p className="absolute top-9 left-10 md:left-20 text-[9px] uppercase tracking-[0.55em] text-black/25 font-light select-none">
          Услуги
        </p>

        {/* Slide counter */}
        <AnimatePresence mode="wait">
          <motion.p
            key={activeIdx}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="absolute top-9 right-10 md:right-20 text-[9px] uppercase tracking-[0.55em] text-black/25 font-light select-none"
          >
            {allServices[activeIdx].num} / 06
          </motion.p>
        </AnimatePresence>

        {/* ── 3D PRISM SCENE ── */}
        <div style={{ perspective: "1100px", perspectiveOrigin: "50% 48%" }}>
          <motion.div
            style={{
              width: FACE_W,
              height: FACE_H,
              position: "relative",
              transformStyle: "preserve-3d",
              rotateY,
            }}
          >
            {allServices.map((svc, i) => (
              <div
                key={i}
                style={{
                  position: "absolute",
                  inset: 0,
                  transform: `rotateY(${i * FACE_ANGLE}deg) translateZ(${PRISM_RADIUS}px)`,
                  backfaceVisibility: "hidden",
                  borderRadius: 6,
                  overflow: "hidden",
                  boxShadow: "0 32px 80px rgba(0,0,0,0.18), 0 2px 12px rgba(0,0,0,0.06)",
                }}
              >
                {/* Card background */}
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(160deg, #eee9e0 0%, #e5ddd3 100%)" }} />

                {/* Number — top left */}
                <span style={{
                  position: "absolute", top: 18, left: 22,
                  fontSize: 8, letterSpacing: "0.5em", color: "rgba(0,0,0,0.28)",
                  textTransform: "uppercase", fontWeight: 300,
                }}>
                  {svc.num}
                </span>

                {/* Floating image — centered */}
                <div style={{
                  position: "absolute",
                  top: "7%", left: "50%",
                  transform: "translateX(-50%)",
                  width: 260, height: 235,
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  {/* Drop shadow that follows the float */}
                  <motion.div
                    animate={{ scaleX: [1, 0.82, 1], opacity: [0.18, 0.09, 0.18] }}
                    transition={{
                      duration: 3.2,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: i * 0.55,
                    }}
                    style={{
                      position: "absolute",
                      bottom: -14,
                      left: "50%",
                      transform: "translateX(-50%)",
                      width: 130,
                      height: 18,
                      background: "radial-gradient(ellipse, rgba(0,0,0,0.45) 0%, transparent 70%)",
                      borderRadius: "50%",
                      filter: "blur(6px)",
                    }}
                  />
                  <motion.img
                    src={svc.img}
                    alt={svc.title}
                    animate={{ y: [-9, 9, -9] }}
                    transition={{
                      duration: 3.2,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: i * 0.55,
                    }}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "contain",
                      display: "block",
                      filter: "drop-shadow(0 16px 32px rgba(0,0,0,0.18))",
                      transform: svc.imgScale ? `scale(${svc.imgScale})` : undefined,
                    }}
                  />
                </div>

                {/* Text + button — bottom */}
                <div style={{
                  position: "absolute",
                  bottom: 0, left: 0, right: 0,
                  padding: "12px 22px 22px",
                }}>
                  <div style={{ width: 24, height: 1, background: "rgba(0,0,0,0.18)", marginBottom: 9 }} />
                  <h3 style={{
                    fontSize: 22, fontWeight: 200, lineHeight: 1.15,
                    letterSpacing: "-0.01em", color: "rgba(0,0,0,0.85)",
                    whiteSpace: "pre-line", marginBottom: 7,
                  }}>
                    {svc.title}
                  </h3>
                  <p style={{ fontSize: 12, color: "rgba(0,0,0,0.42)", lineHeight: 1.6, fontWeight: 300, marginBottom: 16 }}>
                    {svc.desc}
                  </p>
                  <Link
                    href={svc.href}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 7,
                      padding: "9px 18px",
                      border: "1px solid rgba(0,0,0,0.22)",
                      borderRadius: 2,
                      fontSize: 9,
                      letterSpacing: "0.38em",
                      textTransform: "uppercase",
                      color: "rgba(0,0,0,0.6)",
                      fontWeight: 300,
                      background: "transparent",
                      textDecoration: "none",
                      transition: "all 0.25s ease",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.background = "rgba(0,0,0,0.06)";
                      (e.currentTarget as HTMLElement).style.borderColor = "rgba(0,0,0,0.45)";
                      (e.currentTarget as HTMLElement).style.color = "rgba(0,0,0,0.85)";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.background = "transparent";
                      (e.currentTarget as HTMLElement).style.borderColor = "rgba(0,0,0,0.22)";
                      (e.currentTarget as HTMLElement).style.color = "rgba(0,0,0,0.6)";
                    }}
                  >
                    Открыть
                    <ArrowUpRight size={10} />
                  </Link>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Service buttons below cube */}
        <div style={{
          position: "absolute",
          bottom: 8,
          left: 0,
          right: 0,
          overflowX: "auto",
          overflowY: "hidden",
          display: "flex",
          justifyContent: "center",
          gap: 6,
          padding: "0 24px",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}>
          {allServices.map((svc, i) => (
            <button
              key={i}
              onClick={() => setActiveIdx(i)}
              style={{
                flexShrink: 0,
                padding: "5px 12px",
                border: `1px solid ${activeIdx === i ? "rgba(0,0,0,0.55)" : "rgba(0,0,0,0.18)"}`,
                borderRadius: 2,
                fontSize: 7,
                letterSpacing: "0.35em",
                textTransform: "uppercase",
                color: activeIdx === i ? "rgba(0,0,0,0.85)" : "rgba(0,0,0,0.4)",
                fontWeight: activeIdx === i ? 400 : 300,
                background: activeIdx === i ? "rgba(0,0,0,0.05)" : "transparent",
                cursor: "pointer",
                transition: "all 0.25s ease",
                whiteSpace: "nowrap",
              }}
              onMouseEnter={(e) => {
                if (activeIdx !== i) {
                  (e.currentTarget as HTMLElement).style.borderColor = "rgba(0,0,0,0.35)";
                  (e.currentTarget as HTMLElement).style.color = "rgba(0,0,0,0.65)";
                }
              }}
              onMouseLeave={(e) => {
                if (activeIdx !== i) {
                  (e.currentTarget as HTMLElement).style.borderColor = "rgba(0,0,0,0.18)";
                  (e.currentTarget as HTMLElement).style.color = "rgba(0,0,0,0.4)";
                }
              }}
            >
              {svc.title.replace("\n", " ")}
            </button>
          ))}
        </div>

        <p className="absolute bottom-[34px] right-10 md:right-20 text-[9px] uppercase tracking-[0.45em] text-black/[0.18] font-light select-none">
          Скролл ↓
        </p>
      </div>
    </section>
  );
}
