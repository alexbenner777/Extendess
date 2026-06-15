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
import estetica3img from "@assets/dcd49abb-ad13-46bc-b1a7-11c314f669dc_1781530470479.png";
import heleoProImg from "@assets/2_1781530470478.png";
import dessangeLogo from "@assets/logo_1781078340581.svg";
import extendessLogo from "@assets/logo-big_1776857562328.png";
import extendessIconLogo from "@assets/111_1781556086499.png";
import philosophyImg from "@assets/112_1781267429252.png";
import { Sculpture3D } from "@/components/Sculpture3D";
import { Salons } from "@/components/sections/Salons";
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
            <p className="text-[9px] uppercase tracking-[0.65em] text-white/45 font-light text-center">
              · Французская школа красоты ·<br />· 30 лет в России ·
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
              color: "rgba(26,26,26,0.70)",
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

        {/* ── Logo icon + subtitle after EXTENDESS lands ── */}
        <motion.div
          className="absolute top-[17%] left-0 right-0 flex flex-col items-center gap-3 pointer-events-none"
          style={{ opacity: logoOpacity, y: logoY }}
        >
          <img
            src={extendessIconLogo}
            alt="Extendess"
            className="w-36 object-contain"
            style={{ filter: "brightness(0)", opacity: 0.70 }}
          />
        </motion.div>

        <motion.p
          className="absolute top-[33%] left-0 right-0 text-center uppercase text-black/25 font-light"
          style={{ opacity: subOpacity, y: subY, fontSize: "clamp(0.7rem, 1.2vw, 1rem)", letterSpacing: tagSpacing }}
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

const FAN_ANGLES  = [52,  28,   8,  -8, -28, -52];
const FAN_SCALE   = [0.80, 0.89, 0.97, 0.97, 0.89, 0.80];
const FAN_ORIGINS = [
  "right center",
  "right center",
  "center center",
  "center center",
  "left center",
  "left center",
];
const CARD_W = 230;
const CARD_H = 370;

function StickyServices() {
  return (
    <section className="bg-[#F1EBE3] pt-24 pb-28 md:pt-36 md:pb-36 overflow-hidden">

      {/* Header */}
      <div className="max-w-7xl mx-auto mb-20 px-6 md:px-16 flex items-end justify-between border-b border-black/10 pb-8">
        <div>
          <span className="text-[9px] uppercase tracking-[0.5em] text-black/30 block mb-4">— Направления</span>
          <h2 className="font-extralight tracking-[-0.03em] leading-[0.95] text-4xl md:text-5xl lg:text-6xl text-black">
            Все услуги
          </h2>
        </div>
        <Link
          href="/services"
          className="hidden md:inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.38em] text-black/40 hover:text-black transition-colors border-b border-black/20 pb-1"
        >
          Подробнее <ArrowUpRight size={11} />
        </Link>
      </div>

      {/* ── Fan / accordion spread — desktop ── */}
      <div className="hidden md:flex justify-center items-end" style={{ perspective: "1300px", perspectiveOrigin: "50% 80%" }}>
        {allServices.map((svc, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, rotateY: FAN_ANGLES[i] * 1.6, y: 60 }}
            whileInView={{ opacity: 1, rotateY: FAN_ANGLES[i], y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1.1, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
            style={{
              width: CARD_W,
              height: CARD_H,
              flexShrink: 0,
              marginLeft: i === 0 ? 0 : -38,
              transformOrigin: FAN_ORIGINS[i],
              scale: FAN_SCALE[i],
              zIndex: i < 3 ? i + 1 : 7 - i,
              borderRadius: 6,
              overflow: "hidden",
              background: "#EDE7DF",
              boxShadow: i === 2 || i === 3
                ? "0 24px 64px rgba(0,0,0,0.18)"
                : "0 8px 28px rgba(0,0,0,0.10)",
              cursor: "pointer",
            }}
          >
            <Link href={svc.href} style={{ display: "block", height: "100%" }}>
              {/* Image — top 54% */}
              <div style={{ position: "relative", height: "54%", overflow: "hidden" }}>
                <img
                  src={svc.img}
                  alt={svc.title}
                  style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top" }}
                />
                <div style={{
                  position: "absolute", inset: 0,
                  background: "linear-gradient(to bottom, transparent 70%, rgba(237,231,223,0.55) 100%)",
                }} />
              </div>

              {/* Text — bottom 46% */}
              <div style={{ padding: "14px 18px 18px", display: "flex", flexDirection: "column", gap: 0 }}>
                <span style={{ fontSize: 7.5, letterSpacing: "0.44em", color: "rgba(0,0,0,0.32)", textTransform: "uppercase", fontWeight: 300, marginBottom: 7 }}>
                  {svc.num}
                </span>
                <h3 style={{ fontSize: 16, fontWeight: 200, lineHeight: 1.2, letterSpacing: "-0.01em", color: "rgba(0,0,0,0.88)", whiteSpace: "pre-line", marginBottom: 8 }}>
                  {svc.title}
                </h3>
                <p style={{ fontSize: 9.5, color: "rgba(0,0,0,0.42)", lineHeight: 1.55, fontWeight: 300, display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                  {svc.desc}
                </p>
                <div style={{ marginTop: 10, display: "flex", alignItems: "center", gap: 5, fontSize: 8, letterSpacing: "0.32em", textTransform: "uppercase", color: "rgba(0,0,0,0.32)" }}>
                  Открыть <ArrowUpRight size={9} />
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* ── Mobile: 2-col grid ── */}
      <div className="md:hidden grid grid-cols-2 gap-px bg-black/8 mx-4">
        {allServices.map((svc, i) => (
          <motion.div
            key={i}
            className="bg-[#EDE7DF] overflow-hidden"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: i * 0.06 }}
            style={{ borderRadius: 4 }}
          >
            <Link href={svc.href} style={{ display: "block" }}>
              <div style={{ aspectRatio: "4/3", overflow: "hidden", position: "relative" }}>
                <img src={svc.img} alt={svc.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, transparent 72%, rgba(237,231,223,0.55) 100%)" }} />
              </div>
              <div style={{ padding: "12px 14px 14px" }}>
                <span style={{ fontSize: 7, letterSpacing: "0.4em", color: "rgba(0,0,0,0.3)", textTransform: "uppercase", display: "block", marginBottom: 5 }}>{svc.num}</span>
                <h3 style={{ fontSize: 14, fontWeight: 200, lineHeight: 1.2, whiteSpace: "pre-line", color: "rgba(0,0,0,0.88)", marginBottom: 5 }}>{svc.title}</h3>
                <p style={{ fontSize: 9, color: "rgba(0,0,0,0.42)", lineHeight: 1.5, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{svc.desc}</p>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Mobile CTA */}
      <div className="mt-10 flex justify-center md:hidden">
        <Link href="/services" className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.38em] text-black/40 hover:text-black transition-colors border-b border-black/20 pb-1">
          Все услуги <ArrowUpRight size={11} />
        </Link>
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
    link: "/contacts",
  },
  {
    tag: "— Инновации в эстетической медицине",
    title: "Estetica 3.0",
    description:
      "Многофункциональная лазерная платформа нового поколения для комплексного омоложения и эстетической коррекции кожи. Объединяет IPL, диодный, неодимовый, эрбиевый и CO₂-лазеры — омоложение, эпиляция, сосуды, пигментация, акне и удаление татуировок.",
    img: estetica3img,
    link: "/contacts",
  },
  {
    tag: "— Инновации в эстетической медицине",
    title: "Heleo PRO LED",
    description:
      "Современная LED-фототерапия нового поколения. Эффективна при акне, постакне, розацеа и гиперпигментации. Подходит для любого типа кожи круглый год — стимулирует регенерацию и активирует восстановительные процессы без агрессивного воздействия.",
    img: heleoProImg,
    link: "/contacts",
  },
];

function InnovationCounter({ index, total, progress }: { index: number; total: number; progress: import("framer-motion").MotionValue<number> }) {
  const start = index / total;
  const end = (index + 1) / total;
  const mid = (start + end) / 2;
  const opacity = useTransform(progress, [start, mid - 0.05, mid + 0.05, end], [0, 1, 1, 0]);
  return (
    <motion.p
      style={{ opacity }}
      className="absolute top-9 right-10 md:right-20 text-[9px] uppercase tracking-[0.55em] text-black/25 font-light select-none z-10"
    >
      0{index + 1} / 0{total}
    </motion.p>
  );
}

function InnovationPanel({ item, index, progress }: { item: typeof innovations[0]; index: number; progress: import("framer-motion").MotionValue<number> }) {
  const start = index / innovations.length;
  const end = (index + 1) / innovations.length;
  const mid = (start + end) / 2;

  const opacity = useTransform(progress, [start, mid - 0.05, mid + 0.05, end], [0, 1, 1, 0]);
  const y = useTransform(progress, [start, mid, end], [40, 0, -40]);
  const imgScale = useTransform(progress, [start, mid], [1.06, 1]);

  return (
    <motion.div
      style={{ opacity, y }}
      className="absolute inset-0 flex items-center px-6 md:px-20"
    >
      <div className="w-full max-w-7xl mx-auto grid md:grid-cols-12 gap-8 md:gap-20 items-center">

        {/* Left: image */}
        <div className="md:col-span-5 flex items-center justify-center">
          <motion.img
            src={item.img}
            alt={item.title}
            style={{ scale: imgScale }}
            className="w-full max-h-[70vh] object-contain"
          />
        </div>

        {/* Right: text */}
        <div className="md:col-span-7">
          <div className="flex items-start gap-8 mb-8">
            <span
              className="font-extralight text-[clamp(4rem,10vw,9rem)] leading-none text-black/06 select-none"
              style={{ color: "rgba(26,26,26,0.06)" }}
            >
              0{index + 1}
            </span>
            <div className="pt-3">
              <span className="text-[9px] uppercase tracking-[0.5em] text-black/40 font-light">
                Инновации
              </span>
            </div>
          </div>
          <div className="w-8 h-px bg-black/30 mb-8" />
          <h3 className="font-extralight tracking-[-0.03em] leading-[1.05] text-[clamp(2.8rem,5vw,5.5rem)]">
            {item.title}
          </h3>
          <p className="mt-8 max-w-xl text-base md:text-[1.05rem] font-light text-black/55 leading-relaxed">
            {item.description}
          </p>
        </div>

      </div>
    </motion.div>
  );
}

function InnovationsCarousel() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ["start start", "end end"],
  });

  return (
    <section ref={wrapperRef} style={{ height: `${innovations.length * 100}vh` }} className="relative bg-[#F1EBE3]">
      <div className="sticky top-0 h-screen overflow-hidden">

        {/* Thin top line */}
        <div className="absolute top-0 inset-x-0 h-px bg-black/08 z-10">
          <motion.div
            className="h-full bg-black/25 origin-left"
            style={{ scaleX: scrollYProgress }}
          />
        </div>

        {/* Section label */}
        <p className="absolute top-9 left-10 md:left-20 text-[9px] uppercase tracking-[0.55em] text-black/25 font-light select-none z-10">
          Технологии
        </p>

        {/* Counter */}
        {innovations.map((_, i) => (
          <InnovationCounter key={i} index={i} total={innovations.length} progress={scrollYProgress} />
        ))}

        {/* Panels */}
        {innovations.map((item, i) => (
          <InnovationPanel key={i} item={item} index={i} progress={scrollYProgress} />
        ))}

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

  const [showVideo, setShowVideo] = useState(true);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
    const interval = setInterval(() => {
      setShowVideo(v => !v);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-[#F1EBE3] text-black">
      {/* HERO */}
      <section ref={heroRef} className="relative h-[100vh] w-full overflow-hidden bg-black text-white">
        <motion.div className="absolute inset-0" style={{ scale: heroScale, y: heroY, opacity: heroOpacity }}>

          {/* Video layer — always mounted, opacity toggled */}
          <motion.div
            className="absolute inset-0"
            animate={{ opacity: showVideo ? 1 : 0 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          >
            <video
              ref={videoRef}
              src="/images/hero2.mp4"
              autoPlay
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
                className="group inline-flex items-center gap-3 border border-white/30 backdrop-blur-xl bg-white/5 px-8 py-5 text-xs uppercase tracking-[0.3em] hover:bg-white hover:text-black transition-all duration-500 self-start rounded"
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

      {/* MARQUEE */}
      <div className="bg-black text-white py-8 border-y border-white/10">
        <Marquee
          text="МОСКВА • 6 САЛОНОВ • EXTENDESS • НОВОЕ ПОКОЛЕНИЕ • "
          speed={40}
          className="text-2xl md:text-4xl font-extralight uppercase tracking-[0.2em]"
        />
      </div>

      {/* BRAND EVOLUTION */}
      <BrandEvolution />

      {/* PHILOSOPHY */}
      <section className="py-16 md:py-28 px-6 md:px-16 md:-mt-24">
        <div className="max-w-7xl mx-auto grid md:grid-cols-12 gap-8 md:gap-16 items-start">

          {/* Left: animated sculpture */}
          <div className="md:col-span-5 flex flex-col gap-6 items-center md:items-start">
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
          <div className="md:col-span-7 md:pt-28">
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
      <section className="py-8 md:py-14 px-6 md:px-16 bg-[#F1EBE3]">
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
    </div>
  );
}
