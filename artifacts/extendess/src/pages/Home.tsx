import { motion, useScroll, useTransform, AnimatePresence, useMotionTemplate, useMotionValueEvent } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Link } from "wouter";
import { ArrowUpRight } from "lucide-react";
import {
  SplitText,
  Marquee,
  FadeIn,
} from "@/components/ui-extras/animations";
import heroImg from "@assets/images/hero.png";
import highlightImg from "@assets/4e8fdef0-e4c3-4847-8626-0552c762eca2_1781269893220.png";
import service1 from "@assets/images/service-1.png";
import service2 from "@assets/images/service-2.png";
import service3 from "@assets/images/service-3.png";
import service4 from "@assets/images/service-4.png";
import dessangeLogo from "@assets/logo_1781078340581.svg";
import extendessLogo from "@assets/logo-big_1776857562328.png";
import philosophyImg from "@assets/112_1781267429252.png";
import { Sculpture3D } from "@/components/Sculpture3D";
import { Salons } from "@/components/sections/Salons";
import { Reviews } from "@/components/sections/Reviews";
import { FAQSection } from "@/components/sections/FAQ";
import { Services as ServicesFocusPull } from "@/components/sections/ServicesFocusPull";
import {
  CrescinaLogo,
  LorealLogo,
  PhytomerLogo,
  NoadadaLogo,
  SisleyLogo,
  EnhelLogo,
  NescensLogo,
  KerastaseLogo,
} from "@/components/sections/BrandLogos";
import svcMakeup from "@assets/Макияж_и_визаж_1781298033085.png";
import svcHair from "../assets/svc-hair.png";
import svcNails from "../assets/svc-nails.png";
import svcMedicine from "../assets/svc-medicine.png";
import svcCosmetology from "../assets/svc-cosmetology.png";
import svcSpa from "../assets/svc-spa.png";

function BrandEvolution() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // ── DESSANGE visible from start, flips backward as user scrolls ──
  const dessangeRotateX    = useTransform(scrollYProgress, [0, 0.40], [0, -88]);
  const dessangeOpacity    = useTransform(scrollYProgress, [0, 0.30, 0.40], [1, 1, 0]);
  const dessangeScale      = useTransform(scrollYProgress, [0, 0.40], [1, 0.92]);
  const dessangeBrightness = useTransform(scrollYProgress, [0.18, 0.40], [1, 0.3]);
  const dessangeFilter     = useMotionTemplate`brightness(${dessangeBrightness})`;

  // ── EXTENDESS flips forward (90 → 0 deg), scales from depth ──
  const extRotateX = useTransform(scrollYProgress, [0.28, 0.65], [90, 0]);
  const extOpacity = useTransform(scrollYProgress, [0.26, 0.34, 0.65, 1], [0, 1, 1, 1]);
  const extScale   = useTransform(scrollYProgress, [0.28, 0.65], [1.22, 1]);

  // ── Flash at crossing moment ──
  const flashOpacity = useTransform(scrollYProgress, [0.32, 0.37, 0.42], [0, 0.28, 0]);

  // ── Background: black → white, synced with the flip ──
  const bgWhite = useTransform(scrollYProgress, [0.26, 0.65], [0, 1]);

  // ── Logo + subtitle + tagline after EXTENDESS lands ──
  const logoOpacity    = useTransform(scrollYProgress, [0.60, 0.74], [0, 1]);
  const logoY          = useTransform(scrollYProgress, [0.60, 0.74], ["14px", "0px"]);
  const subOpacity     = useTransform(scrollYProgress, [0.62, 0.75], [0, 1]);
  const subY           = useTransform(scrollYProgress, [0.62, 0.75], ["10px", "0px"]);
  const tagOpacity     = useTransform(scrollYProgress, [0.70, 0.80], [0, 1]);
  const tagSpacing     = useTransform(scrollYProgress, [0.70, 0.80], ["0.15em", "0.55em"]);

  // ── Heritage labels (Dessange era) — visible from start ──
  const yearOpacity = useTransform(scrollYProgress, [0, 0.24, 0.36], [1, 1, 0]);

  return (
    <section ref={containerRef} className="relative h-[320vh]">
      <div className="sticky top-0 h-screen overflow-hidden bg-[#0A0908]">

        {/* ── White background layer fades in as EXTENDESS arrives ── */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{ opacity: bgWhite, background: "#F1EBE3" }}
        />

        {/* ── 3D stage with shared perspective ── */}
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{ perspective: "1100px", perspectiveOrigin: "50% 50%" }}
        >
          {/* Dessange heritage block (fades in then out) */}
          <motion.div
            className="absolute top-[18%] flex flex-col items-center gap-4 pointer-events-none"
            style={{ opacity: yearOpacity }}
          >
            <img
              src={dessangeLogo}
              alt="Dessange"
              className="h-6 opacity-65"
              style={{ filter: "invert(1)" }}
            />
            <p className="text-[9px] uppercase tracking-[0.65em] text-white/45 font-light text-center">
              · С 1954 года ·<br />· Французская школа красоты ·<br />· 30 лет в России ·
            </p>
          </motion.div>

          {/* DESSANGE — falls backward into screen */}
          <motion.h2
            className="absolute left-0 right-0 text-center font-extralight uppercase select-none leading-none tracking-[0.14em] text-white/50 px-8"
            style={{
              fontSize: "clamp(3.5rem, 13vw, 15rem)",
              rotateX: dessangeRotateX,
              opacity: dessangeOpacity,
              scale: dessangeScale,
              filter: dessangeFilter,
              transformOrigin: "center bottom",
              transformStyle: "preserve-3d",
            }}
          >
            DESSANGE
          </motion.h2>

          {/* EXTENDESS — fits within viewport */}
          <motion.h2
            className="absolute left-0 right-0 text-center font-extralight uppercase select-none leading-none tracking-[0.06em] whitespace-nowrap px-8"
            style={{
              fontSize: "clamp(3rem, 13vw, 13rem)",
              color: "rgba(26,26,26,0.08)",
              rotateX: extRotateX,
              opacity: extOpacity,
              scale: extScale,
              transformOrigin: "center top",
              transformStyle: "preserve-3d",
            }}
          >
            EXTENDESS
          </motion.h2>
        </div>

        {/* ── Flash at crossover ── */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{
            opacity: flashOpacity,
            background: "radial-gradient(ellipse 70% 50% at 50% 50%, rgba(241,235,227,1) 0%, transparent 70%)",
          }}
        />

        {/* ── Logo — top ── */}
        <motion.div
          className="absolute top-[13%] left-0 right-0 flex justify-center"
          style={{ opacity: logoOpacity, y: logoY }}
        >
          <img
            src={extendessLogo}
            alt="Extendess"
            className="h-20"
            style={{ filter: "brightness(0)" }}
          />
        </motion.div>

        {/* ── Текст 1: "Москва · Новое поколение" — below logo ── */}
        <motion.p
          className="absolute top-[30%] left-0 right-0 text-center uppercase text-black/40 font-light tracking-[0.45em]"
          style={{ opacity: subOpacity, y: subY, fontSize: "clamp(0.7rem, 1.2vw, 1rem)" }}
        >
          Новая глава истории бренда в России
        </motion.p>

        {/* ── Текст 2: "Эволюция совершенства" — bottom ── */}
        <motion.p
          className="absolute top-[73%] left-0 right-0 text-center uppercase text-black/25 font-light"
          style={{ opacity: tagOpacity, letterSpacing: tagSpacing, fontSize: "clamp(0.7rem, 1.2vw, 1rem)" }}
        >
          Эволюция совершенства
        </motion.p>

        {/* Progress bar */}
        <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-white/[0.07] z-10">
          <motion.div
            className="h-full bg-black/20 origin-left"
            style={{ scaleX: scrollYProgress }}
          />
        </div>
      </div>
    </section>
  );
}

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

// Geometry constants for a 6-face prism rotating on Y
const FACE_COUNT = 6;
const FACE_ANGLE = 360 / FACE_COUNT; // 60° per face
const FACE_W = 360;
const FACE_H = 490;
const PRISM_RADIUS = Math.round((FACE_W / 2) / Math.tan(Math.PI / FACE_COUNT)); // ≈312px

function StickyServices() {
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

  // Track which face is front-facing
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const idx = Math.min(FACE_COUNT - 1, Math.round(v * (FACE_COUNT - 1)));
    setActiveIdx(idx);
  });

  const s = allServices[activeIdx];

  return (
    <section ref={wrapperRef} className="relative h-[550vh] bg-[#F1EBE3]">
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

        {/* ── 3D CUBE SCENE ── */}
        <div
          style={{
            perspective: "1100px",
            perspectiveOrigin: "50% 48%",
          }}
        >
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
                  boxShadow: "none",
                }}
              >
                {/* Card background */}
                <div style={{ position: "absolute", inset: 0, background: "#F1EBE3" }} />

                {/* Service photo — top element, 52% of card height */}
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    height: "52%",
                    backgroundImage: `url(${svc.img})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center top",
                  }}
                />

                {/* Soft shadow at bottom of image — fades into white */}
                <div
                  style={{
                    position: "absolute",
                    top: "39%",
                    left: 0,
                    right: 0,
                    height: "13%",
                    background: "linear-gradient(to bottom, transparent 0%, #F1EBE3 100%)",
                  }}
                />

                {/* Text content — positioned below image */}
                <div
                  style={{
                    position: "absolute",
                    top: "52%",
                    left: 0,
                    right: 0,
                    bottom: 0,
                    padding: "12px 22px 16px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                  }}
                >
                  <span
                    style={{
                      display: "block",
                      fontSize: 8,
                      letterSpacing: "0.45em",
                      color: "rgba(0,0,0,0.35)",
                      textTransform: "uppercase",
                      marginBottom: 6,
                      fontWeight: 300,
                    }}
                  >
                    {svc.num}
                  </span>
                  <h3
                    style={{
                      fontSize: 19,
                      fontWeight: 200,
                      lineHeight: 1.1,
                      letterSpacing: "-0.01em",
                      color: "rgba(0,0,0,0.88)",
                      whiteSpace: "pre-line",
                      marginBottom: 6,
                    }}
                  >
                    {svc.title}
                  </h3>
                  <p
                    style={{
                      fontSize: 10,
                      color: "rgba(0,0,0,0.45)",
                      lineHeight: 1.55,
                      fontWeight: 300,
                    }}
                  >
                    {svc.desc}
                  </p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Active service CTA */}
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

        {/* Scroll hint */}
        <p className="absolute bottom-[34px] right-10 md:right-20 text-[9px] uppercase tracking-[0.45em] text-black/18 font-light select-none">
          Скролл ↓
        </p>

        {/* Top fade */}
        <div style={{
          position: "absolute", top: 0, left: 0, right: 0,
          height: 160, pointerEvents: "none", zIndex: 30,
          background: "linear-gradient(to bottom, #F1EBE3 0%, transparent 100%)",
        }} />

      </div>
    </section>
  );
}

const innovations = [
  {
    tag: "— Инновации в эстетической медицине",
    title: "Vivace",
    description:
      "Инновационная технология микроигольчатого RF-лифтинга для естественного омоложения кожи. Подтягивает овал лица, повышает упругость, уменьшает морщины и улучшает качество кожи без длительной реабилитации. Подходит для лица, шеи и тела, а эффект становится заметнее в течение нескольких недель.",
    img: highlightImg,
    link: "/services",
  },
  {
    tag: "— Косметология",
    title: "Биоревитализация",
    description:
      "Глубокое увлажнение и восстановление кожи с помощью инъекций гиалуроновой кислоты. Натуральный результат, который виден с первого сеанса.",
    img: service1,
    link: "/services",
  },
  {
    tag: "— Wellness",
    title: "Превентивная\nмедицина",
    description:
      "Индивидуальные программы оздоровления, разработанные с учётом вашего образа жизни. Комплексный подход к красоте и долголетию.",
    img: service2,
    link: "/services",
  },
];

function InnovationsCarousel() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);

  const go = (next: number) => {
    setDirection(next > current ? 1 : -1);
    setCurrent(next);
  };
  const prev = () => go((current - 1 + innovations.length) % innovations.length);
  const next = () => go((current + 1) % innovations.length);

  const item = innovations[current];

  const textVariants = {
    enter: (d: number) => ({ opacity: 0, y: d * 24 }),
    center: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
    exit: (d: number) => ({ opacity: 0, y: d * -16, transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] } }),
  };

  const imgVariants = {
    enter: (d: number) => ({ opacity: 0, scale: 0.96, x: d * 30 }),
    center: { opacity: 1, scale: 1, x: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
    exit: (d: number) => ({ opacity: 0, scale: 0.96, x: d * -20, transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] } }),
  };

  return (
    <section className="py-16 md:py-24 px-6 md:px-16 overflow-hidden">
      <div className="max-w-7xl mx-auto grid md:grid-cols-12 gap-8 md:gap-16 items-center">

        {/* Left: image */}
        <div className="md:col-span-5">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={current}
              custom={direction}
              variants={imgVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="w-full overflow-hidden"
            >
              <img
                src={item.img}
                alt={item.title}
                style={{ width: "100%", height: 520, objectFit: "contain", display: "block" }}
              />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Right: text column */}
        <div className="md:col-span-7 md:pt-8">

          {/* Navigation — above text */}
          <div className="mb-10 flex items-center justify-between w-full">
            <button
              onClick={prev}
              className="w-11 h-11 rounded-full border border-black/20 flex items-center justify-center hover:border-black hover:bg-black hover:text-white transition-all duration-300"
              aria-label="Предыдущий"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M9 2L4 7L9 12" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </button>
            <div className="flex gap-2 items-center">
              {innovations.map((_, i) => (
                <button
                  key={i}
                  onClick={() => go(i)}
                  className={`h-px transition-all duration-300 ${i === current ? "w-8 bg-black" : "w-4 bg-black/25"}`}
                  aria-label={`Слайд ${i + 1}`}
                />
              ))}
            </div>
            <button
              onClick={next}
              className="w-11 h-11 rounded-full border border-black/20 flex items-center justify-center hover:border-black hover:bg-black hover:text-white transition-all duration-300"
              aria-label="Следующий"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M5 2L10 7L5 12" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </button>
          </div>

          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={current}
              custom={direction}
              variants={textVariants}
              initial="enter"
              animate="center"
              exit="exit"
            >
              <span className="text-[10px] uppercase tracking-[0.4em] text-black/50">{item.tag}</span>
              <h3 className="mt-8 font-extralight tracking-[-0.03em] leading-[1.05] text-[clamp(2.5rem,5vw,5rem)] whitespace-pre-line">
                {item.title}
              </h3>
              <p className="mt-10 max-w-2xl text-base md:text-lg font-light text-black/60 leading-relaxed">
                {item.description}
              </p>
              <Link
                href={item.link}
                className="mt-10 inline-flex items-center gap-3 border-b border-black pb-2 text-xs uppercase tracking-[0.3em] hover:gap-5 transition-all"
              >
                Подробнее <ArrowUpRight size={14} />
              </Link>
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroScale = useTransform(heroProgress, [0, 1], [1, 1.15]);
  const heroY = useTransform(heroProgress, [0, 1], ["0%", "30%"]);
  const heroOpacity = useTransform(heroProgress, [0, 0.7], [1, 0.3]);
  const titleY = useTransform(heroProgress, [0, 1], ["0%", "-50%"]);

  const [showVideo, setShowVideo] = useState(false);

  useEffect(() => {
    const INTERVAL = 6000;
    const timer = setInterval(() => {
      setShowVideo((prev) => {
        const next = !prev;
        if (next && videoRef.current) {
          videoRef.current.currentTime = 0;
          videoRef.current.play().catch(() => {});
        }
        return next;
      });
    }, INTERVAL);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-[#F1EBE3] text-black">
      {/* HERO */}
      <section ref={heroRef} className="relative h-[100vh] w-full overflow-hidden bg-black text-white">
        <motion.div className="absolute inset-0" style={{ scale: heroScale, y: heroY, opacity: heroOpacity }}>

          {/* Static hero image */}
          <AnimatePresence initial={false}>
            {!showVideo && (
              <motion.img
                key="hero-img"
                src={heroImg}
                alt=""
                className="absolute inset-0 h-full w-full object-cover opacity-70"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.7 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
              />
            )}
          </AnimatePresence>

          {/* Video layer — always mounted, opacity toggled */}
          <motion.div
            className="absolute inset-0"
            animate={{ opacity: showVideo ? 1 : 0 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          >
            <video
              ref={videoRef}
              src="/images/hero2.mp4"
              muted
              loop
              playsInline
              className="h-full w-full object-cover opacity-70"
            />
          </motion.div>

          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/80" />
        </motion.div>

        <motion.div
          className="absolute inset-0 flex flex-col justify-end pb-24 md:pb-32 px-6 md:px-16"
          style={{ y: titleY }}
        >
          <div className="max-w-7xl mx-auto w-full">
            <h1 className="font-extralight tracking-[-0.03em] leading-[0.9] text-[clamp(3.5rem,6vw,7rem)]">
              <SplitText text="Где красота" delay={0.4} />
              <SplitText text="встречается" delay={0.7} />
              <SplitText text="со здоровьем" delay={1.0} />
            </h1>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.6, duration: 1 }}
              className="mt-10 flex flex-col gap-6"
            >
              <p className="text-sm md:text-base text-white/70 max-w-md font-light leading-relaxed">
                Сохраняя ДНК французской школы Dessange, мы создаём новое поколение beauty & wellness-пространств с международным уровнем сервиса
              </p>
              <Link
                href="/contacts"
                className="group inline-flex items-center gap-3 border border-white/30 backdrop-blur-xl bg-white/5 px-8 py-5 rounded-full text-xs uppercase tracking-[0.3em] hover:bg-white hover:text-black transition-all duration-500 self-start"
              >
                Записаться
                <ArrowUpRight size={16} className="transition-transform group-hover:rotate-45" />
              </Link>
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-0 text-white/50"
        >
          <motion.div
            className="w-5 h-8 border border-white/30 rounded-full flex items-start justify-center pt-1.5"
          >
            <motion.div
              className="w-[2px] h-2 bg-white/60 rounded-full"
              animate={{ y: [0, 10, 0], opacity: [1, 0, 1] }}
              transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
            />
          </motion.div>
        </motion.div>
      </section>

      {/* BRAND EVOLUTION */}
      <BrandEvolution />

      {/* MARQUEE */}
      <div className="bg-black text-white py-8 border-y border-white/10">
        <Marquee
          text="МОСКВА • 6 САЛОНОВ • EXTENDESS • НОВОЕ ПОКОЛЕНИЕ • "
          speed={40}
          className="text-2xl md:text-4xl font-extralight uppercase tracking-[0.2em]"
        />
      </div>

      {/* PHILOSOPHY */}
      <section className="py-16 md:py-24 px-6 md:px-16">
        <div className="max-w-7xl mx-auto grid md:grid-cols-12 gap-8 md:gap-16 items-start">

          {/* Left: animated sculpture */}
          <div className="md:col-span-5 flex flex-col gap-6 items-start">
            <span className="text-[10px] uppercase tracking-[0.4em] text-black/50">— Философия</span>
            <motion.div
              className="relative w-full"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            >
              <Sculpture3D />
            </motion.div>
          </div>

          {/* Right: text column — sticky so it stays centered while image scrolls */}
          <div className="md:col-span-7 md:pt-16">
            <h2 className="font-extralight tracking-[-0.03em] leading-[1.05] text-[clamp(2rem,5vw,5rem)]">
              <SplitText text="EXTENDESS:" />
              <SplitText text="новая философия." delay={0.1} />
              <SplitText text="Та же любовь к деталям." delay={0.2} />
            </h2>
            <FadeIn delay={0.6}>
              <p className="mt-12 max-w-2xl text-base md:text-lg font-light text-black/60 leading-relaxed">
                Мы объединили в одном пространстве парикмахерское искусство, ногтевой сервис,
                косметологию, эстетическую и превентивную медицину, wellness- и восстановительные
                практики, чтобы забота о себе стала по-настоящему комплексной.
              </p>
              <Link
                href="/about"
                className="mt-10 inline-flex items-center gap-3 border-b border-black pb-2 text-xs uppercase tracking-[0.3em] hover:gap-5 transition-all"
              >
                О бренде <ArrowUpRight size={14} />
              </Link>
            </FadeIn>
          </div>

        </div>
      </section>


      {/* FOCUS PULL — 3D cinematic services section */}
      <ServicesFocusPull />

      {/* INNOVATIONS CAROUSEL */}
      <InnovationsCarousel />

      {/* BRANDS */}
      <section className="py-24 md:py-32 px-6 md:px-16 bg-[#F1EBE3]">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-14 border-b border-black/10 pb-8">
            <div>
              <span className="text-[9px] uppercase tracking-[0.45em] text-black/30 block mb-5">— Партнёры</span>
              <h2 className="font-extralight tracking-[-0.03em] leading-[0.95] text-4xl md:text-5xl lg:text-6xl text-black">
                Профессиональные<br />бренды
              </h2>
            </div>
            <p className="hidden md:block max-w-xs text-xs font-light text-black/40 leading-relaxed text-right">
              Мы работаем только с сертифицированными профессиональными продуктами ведущих мировых марок
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-black/8">
            {([
              { Logo: LorealLogo, tag: "Coloration" },
              { Logo: SisleyLogo, tag: "Luxury Care" },
              { Logo: PhytomerLogo, tag: "Marine Care" },
              { Logo: CrescinaLogo, tag: "Hair Growth" },
              { Logo: NescensLogo, tag: "Anti-Aging" },
              { Logo: NoadadaLogo, tag: "Cosmeric Series" },
              { Logo: EnhelLogo, tag: "Aesthetics" },
              { Logo: KerastaseLogo, tag: "Hair Care" },
            ]).map(({ Logo, tag }, i) => (
              <div
                key={i}
                className="bg-[#F1EBE3] px-8 py-10 flex flex-col items-center justify-center gap-6 group hover:bg-[#5E4B3A]/5 transition-colors duration-300 min-h-[140px]"
              >
                <Logo className="w-full max-w-[220px] h-20 object-contain opacity-70 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="text-[9px] uppercase tracking-[0.35em] text-black/25">{tag}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <Reviews />

      {/* SALONS + MAP */}
      <Salons />
    </div>
  );
}
