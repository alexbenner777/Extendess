import { motion, useScroll, useTransform, AnimatePresence, useMotionValueEvent } from "framer-motion";
import { useRef, useState } from "react";
import { Link } from "wouter";
import { ArrowUpRight } from "lucide-react";
import svcMakeup from "@assets/Макияж_и_визаж_1781298033085.png";
import svcHair from "../../assets/svc-hair.png";
import svcNails from "../../assets/svc-nails.png";
import svcMedicine from "../../assets/svc-medicine.png";
import svcCosmetology from "../../assets/svc-cosmetology.png";
import svcSpa from "../../assets/svc-spa.png";

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
    title: "Инъекционная\nи аппаратная косметология",
    desc: "Botox, филлеры, биоревитализация и аппаратные методики для сияния и молодости кожи без длительной реабилитации.",
    img: svcCosmetology,
    href: "/services",
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
const FACE_W = 360;
const FACE_H = 490;
const PRISM_RADIUS = Math.round((FACE_W / 2) / Math.tan(Math.PI / FACE_COUNT)); // ≈312px

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
                <div style={{ position: "absolute", inset: 0, background: "#faf8f5" }} />

                {/* Photo */}
                <div
                  style={{
                    position: "absolute",
                    top: 0, left: 0, right: 0,
                    height: "52%",
                    backgroundImage: `url(${svc.img})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center top",
                  }}
                />

                {/* Fade gradient image → white */}
                <div
                  style={{
                    position: "absolute",
                    top: "39%", left: 0, right: 0,
                    height: "13%",
                    background: "linear-gradient(to bottom, transparent 0%, #faf8f5 100%)",
                  }}
                />

                {/* Text */}
                <div
                  style={{
                    position: "absolute",
                    top: "52%", left: 0, right: 0, bottom: 0,
                    padding: "12px 22px 16px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                  }}
                >
                  <span style={{ display: "block", fontSize: 8, letterSpacing: "0.45em", color: "rgba(0,0,0,0.35)", textTransform: "uppercase", marginBottom: 6, fontWeight: 300 }}>
                    {svc.num}
                  </span>
                  <h3 style={{ fontSize: 19, fontWeight: 200, lineHeight: 1.1, letterSpacing: "-0.01em", color: "rgba(0,0,0,0.88)", whiteSpace: "pre-line", marginBottom: 6 }}>
                    {svc.title}
                  </h3>
                  <p style={{ fontSize: 10, color: "rgba(0,0,0,0.45)", lineHeight: 1.55, fontWeight: 300 }}>
                    {svc.desc}
                  </p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* CTA */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIdx}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="mt-9 flex items-center justify-center"
          >
            <Link
              href={s.href}
              className="group inline-flex items-center gap-2.5 border-b border-black/25 pb-1.5 text-[10px] uppercase tracking-[0.38em] text-black/50 hover:text-black/80 transition-colors duration-300"
            >
              Подробнее
              <ArrowUpRight size={11} className="transition-transform duration-300 group-hover:rotate-45" />
            </Link>
          </motion.div>
        </AnimatePresence>

        {/* Dot indicators */}
        <div className="absolute bottom-8 flex items-center gap-2">
          {allServices.map((_, i) => (
            <div
              key={i}
              className="rounded-full transition-all duration-500"
              style={{
                width: activeIdx === i ? 22 : 6,
                height: 6,
                background: activeIdx === i ? "rgba(0,0,0,0.55)" : "rgba(0,0,0,0.18)",
              }}
            />
          ))}
        </div>

        <p className="absolute bottom-[34px] right-10 md:right-20 text-[9px] uppercase tracking-[0.45em] text-black/[0.18] font-light select-none">
          Скролл ↓
        </p>
      </div>
    </section>
  );
}
