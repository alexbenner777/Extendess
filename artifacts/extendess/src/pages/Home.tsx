import { motion, useScroll, useTransform, AnimatePresence, MotionValue, useMotionTemplate, useMotionValueEvent, useMotionValue, useSpring } from "framer-motion";
import { useRef, useState, useEffect, useCallback } from "react";
import { Link } from "wouter";
import { ArrowUpRight } from "lucide-react";
import {
  SplitText,
  ImageReveal,
  Marquee,
  FadeIn,
  StaggerContainer,
  StaggerItem,
  AnimatedCounter,
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
import svcMakeup from "../assets/svc-makeup.png";
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
            <p className="text-[9px] uppercase tracking-[0.65em] text-white/45 font-light">
              С 1954 года · Французская школа красоты · 30 лет в России
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

function StickyServices() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const activeIdxRef = useRef(0);
  const [activeIdx, setActiveIdx] = useState(0);
  const isTransitioning = useRef(false);
  const lastFlipTime = useRef(0);
  const accDelta = useRef(0);

  const goTo = useCallback((next: number) => {
    if (isTransitioning.current) return;
    isTransitioning.current = true;
    accDelta.current = 0;
    setActiveIdx(next);
    activeIdxRef.current = next;
    setTimeout(() => { isTransitioning.current = false; }, 700);
  }, []);

  useEffect(() => {
    const onWheel = (e: WheelEvent) => {
      const wrapper = wrapperRef.current;
      if (!wrapper) return;

      // Section is "active" when it has been scrolled into and not yet out of:
      // outer section top <= 0 (we've entered it) AND bottom still in viewport (not exited yet)
      const rect = wrapper.getBoundingClientRect();
      const pinned = rect.top <= 0 && rect.bottom >= window.innerHeight - 8;
      if (!pinned) return;

      const idx = activeIdxRef.current;
      const goingDown = e.deltaY > 0;

      // Prevent page scroll while we're inside the barrel (except when exiting last/first slide)
      const atEnd = goingDown && idx >= allServices.length - 1;
      const atStart = !goingDown && idx <= 0;
      if (!atEnd && !atStart) {
        e.preventDefault();
      }

      // Accumulate delta — works for both mouse wheel (large steps) and trackpad (small steps)
      accDelta.current += e.deltaY;
      const threshold = 40;

      if (Math.abs(accDelta.current) < threshold) return;
      if (Date.now() - lastFlipTime.current < 650) return;

      if (accDelta.current > 0 && idx < allServices.length - 1) {
        lastFlipTime.current = Date.now();
        goTo(idx + 1);
      } else if (accDelta.current < 0 && idx > 0) {
        lastFlipTime.current = Date.now();
        goTo(idx - 1);
      } else {
        accDelta.current = 0;
      }
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    return () => window.removeEventListener("wheel", onWheel);
  }, [goTo]);

  // 6-face barrel: 360° / 6 = 60° per slide
  const cubeRotateX = activeIdx * 60;

  // Bottom-edge shadow intensity during the flip
  const [edgeShadow, setEdgeShadow] = useState(0.18);
  useEffect(() => {
    setEdgeShadow(0.65);
    const t = setTimeout(() => setEdgeShadow(0.18), 430);
    return () => clearTimeout(t);
  }, [activeIdx]);

  return (
    <section ref={wrapperRef} className="relative h-[500vh]">
      {/* sticky shell — overflow-hidden clips the hidden faces vertically */}
      <div className="sticky top-0 h-screen overflow-hidden bg-[#F1EBE3]">
        {/* perspective wrapper — separate from overflow-hidden so 3D content isn't clipped horizontally */}
        <div
          className="absolute inset-0 w-full h-full"
          style={{ perspective: "140vh", perspectiveOrigin: "50% 50%" }}
        >
          {/* 6-face barrel */}
          <motion.div
            className="absolute inset-0 w-full h-full"
            animate={{ rotateX: cubeRotateX }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
            style={{ transformStyle: "preserve-3d", transformOrigin: "50% 50%" }}
          >
            {allServices.map((s, i) => (
              <div
                key={i}
                className="absolute inset-0 w-full h-full bg-[#F1EBE3]"
                style={{
                  transform: `rotateX(${i * -60}deg) translateZ(86.6vh)`,
                  backfaceVisibility: "hidden",
                }}
              >
                {/* Service image — right side */}
                <div className="absolute right-0 top-0 w-[45%] h-full hidden md:flex items-center justify-center pointer-events-none select-none pr-8">
                  <img
                    src={s.img}
                    alt={s.title}
                    className="h-[70vh] w-auto object-contain"
                    style={{ filter: "drop-shadow(0 40px 60px rgba(0,0,0,0.15))" }}
                  />
                </div>

                {/* Text — left side */}
                <div className="absolute left-0 top-0 w-full md:w-[58%] h-full flex flex-col justify-center px-10 md:px-20 pb-16">
                  <span className="text-[10px] uppercase tracking-[0.5em] text-black/40 mb-6 block font-light">
                    {s.num} / 06
                  </span>
                  <h3
                    className="font-extralight tracking-[-0.02em] leading-[0.95] text-black mb-8 whitespace-pre-line"
                    style={{ fontSize: "clamp(2rem, 5vw, 5rem)" }}
                  >
                    {s.title}
                  </h3>
                  <p className="text-sm md:text-base text-black/55 font-light leading-relaxed mb-10 max-w-sm">
                    {s.desc}
                  </p>
                  <Link
                    href={s.href}
                    className="group inline-flex items-center gap-3 border border-black/30 px-8 py-4 text-xs uppercase tracking-[0.3em] text-black hover:bg-black hover:text-white transition-all duration-500 self-start"
                  >
                    Подробнее
                    <ArrowUpRight size={14} className="transition-transform group-hover:rotate-45" />
                  </Link>
                </div>

                {/* Bottom edge shadow */}
                <motion.div
                  className="absolute inset-x-0 bottom-0 h-28 pointer-events-none"
                  animate={{ opacity: edgeShadow }}
                  transition={{ duration: 0.43 }}
                  style={{
                    background: "linear-gradient(to top, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.10) 40%, transparent 100%)",
                  }}
                />
              </div>
            ))}
          </motion.div>
        </div>

        {/* Nav buttons — outside cube, above perspective layer */}
        <div className="absolute bottom-6 left-10 md:left-20 right-4 md:right-8 flex flex-wrap items-center gap-2 z-10">
          {allServices.map((sv, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={`inline-flex items-center gap-1.5 border px-3 py-2 text-[9px] uppercase tracking-[0.2em] transition-all duration-500 whitespace-nowrap ${
                activeIdx === i
                  ? "border-black bg-black text-white"
                  : "border-black/20 bg-transparent text-black/40 hover:border-black/50 hover:text-black/70"
              }`}
            >
              <span className="opacity-50 text-[8px]">{sv.num}</span>
              {sv.title.replace("\n", " ")}
            </button>
          ))}
        </div>
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

  const variants = {
    enter: (d: number) => ({ opacity: 0, x: d * 40 }),
    center: { opacity: 1, x: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
    exit: (d: number) => ({ opacity: 0, x: d * -40, transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] } }),
  };

  return (
    <section className="py-32 md:py-48 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-8">

        {/* Single AnimatePresence wraps both text and image — no duplication */}
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={current}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            className="flex items-center gap-6 md:gap-10"
          >
            {/* Left arrow */}
            <button
              onClick={prev}
              className="shrink-0 w-11 h-11 border border-black/20 flex items-center justify-center hover:bg-black hover:text-white transition-colors"
              aria-label="Предыдущий"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M9 2L4 7L9 12" stroke="currentColor" strokeWidth="1.2"/></svg>
            </button>

            {/* Text side */}
            <div className="flex-1 min-w-0">
              <span className="text-[10px] uppercase tracking-[0.4em] text-black/50">{item.tag}</span>
              <h3 className="mt-6 font-extralight tracking-[-0.02em] leading-[1] text-4xl md:text-5xl lg:text-6xl whitespace-pre-line">
                {item.title}
              </h3>
              <p className="mt-8 text-sm md:text-base font-light text-black/60 leading-relaxed max-w-sm">
                {item.description}
              </p>
              <Link
                href={item.link}
                className="mt-10 inline-flex items-center gap-3 border-b border-black pb-2 text-xs uppercase tracking-[0.3em] hover:gap-5 transition-all"
              >
                Подробнее <ArrowUpRight size={14} />
              </Link>
            </div>

            {/* Image side */}
            <div className="flex-1 min-w-0 overflow-hidden">
              <img
                src={item.img}
                alt={item.title}
                style={{ width: "100%", height: 520, objectFit: "contain", display: "block" }}
              />
            </div>

            {/* Right arrow */}
            <button
              onClick={next}
              className="shrink-0 w-11 h-11 border border-black/20 flex items-center justify-center hover:bg-black hover:text-white transition-colors"
              aria-label="Следующий"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M5 2L10 7L5 12" stroke="currentColor" strokeWidth="1.2"/></svg>
            </button>
          </motion.div>
        </AnimatePresence>

        {/* Dots — outside AnimatePresence so they don't duplicate */}
        <div className="mt-10 flex items-center gap-4 px-16 md:px-20">
          <span className="text-[10px] uppercase tracking-[0.35em] text-black/30">
            {String(current + 1).padStart(2, "0")} / {String(innovations.length).padStart(2, "0")}
          </span>
          <div className="flex gap-2 ml-4">
            {innovations.map((_, i) => (
              <button
                key={i}
                onClick={() => go(i)}
                className={`h-px transition-all duration-500 ${i === current ? "w-10 bg-black" : "w-4 bg-black/20"}`}
              />
            ))}
          </div>
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
            <h1 className="font-extralight tracking-[-0.03em] leading-[0.9] text-[clamp(2rem,6vw,7rem)]">
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
                className="group inline-flex items-center gap-3 border border-white/30 backdrop-blur-xl bg-white/5 px-8 py-5 text-xs uppercase tracking-[0.3em] hover:bg-white hover:text-black transition-all duration-500 self-start"
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


      {/* INNOVATIONS CAROUSEL */}
      <InnovationsCarousel />

      {/* STICKY SERVICES */}
      <StickyServices />

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

      {/* SALONS + MAP */}
      <Salons />

      {/* REVIEWS */}
      <Reviews />

      {/* CTA */}
      <section className="bg-[#F1EBE3] text-black py-32 md:py-48 px-6 md:px-16 relative overflow-hidden">
        <motion.div
          aria-hidden
          className="absolute -top-40 -left-40 w-[40rem] h-[40rem] rounded-full bg-[#C9B7A2]/20 blur-3xl"
          animate={{ x: [0, 100, 0], y: [0, 50, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          aria-hidden
          className="absolute -bottom-40 -right-40 w-[40rem] h-[40rem] rounded-full bg-[#C9B7A2]/20 blur-3xl"
          animate={{ x: [0, -100, 0], y: [0, -50, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
        />
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <h2 className="font-extralight tracking-[-0.04em] leading-[0.95] text-[clamp(3rem,9vw,9rem)] text-black">
            <SplitText text="Запишитесь" />
            <SplitText text="сегодня." delay={0.1} />
          </h2>
          <FadeIn delay={0.4}>
            <Link
              href="/contacts"
              className="mt-16 inline-flex items-center gap-4 border border-black/30 bg-transparent px-10 py-6 text-xs uppercase tracking-[0.3em] hover:bg-black hover:text-white transition-all duration-500"
            >
              Перейти к записи <ArrowUpRight size={16} />
            </Link>
          </FadeIn>

        </div>
      </section>
    </div>
  );
}
