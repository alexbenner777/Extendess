import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useState, useRef, useCallback } from "react";
import { Plus, ArrowUpRight } from "lucide-react";
import { Link } from "wouter";
import {
  SplitText,
  FadeIn,
  Marquee,
} from "@/components/ui-extras/animations";
import svcMakeup from "../assets/svc-makeup-nobg.png";
import svcHair from "../assets/svc-hair-nobg.png";
import svcNails from "../assets/svc-nails-nobg.png";
import svcMedicine from "../assets/svc-medicine-nobg.png";
import svcCosmetology from "../assets/svc-cosmetology-nobg.png";
import svcSpa from "../assets/svc-spa-nobg.png";

function TiltImage({ src, alt }: { src: string; alt: string }) {
  const ref = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [14, -14]), { stiffness: 200, damping: 28 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-14, 14]), { stiffness: 200, damping: 28 });
  const scale   = useSpring(1, { stiffness: 250, damping: 28 });

  const shadowX = useTransform(x, [-0.5, 0.5], [-30, 30]);
  const shadowY = useTransform(y, [-0.5, 0.5], [30, -30]);

  const glowX = useTransform(x, [-0.5, 0.5], [30, 70]);
  const glowY = useTransform(y, [-0.5, 0.5], [30, 70]);
  const glare = useTransform(
    [glowX, glowY] as any,
    ([gx, gy]: number[]) =>
      `radial-gradient(ellipse 55% 45% at ${gx}% ${gy}%, rgba(255,255,255,0.13) 0%, transparent 65%)`
  );

  const onMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top)  / rect.height - 0.5);
  }, [x, y]);

  const onEnter = () => scale.set(1.04);
  const onLeave = () => {
    x.set(0); y.set(0); scale.set(1);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      style={{
        perspective: 900,
        width: "100%",
        aspectRatio: "4/5",
        cursor: "grab",
      }}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-8%" }}
      transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.div
        style={{
          rotateX,
          rotateY,
          scale,
          transformStyle: "preserve-3d",
          width: "100%",
          height: "100%",
          position: "relative",
          borderRadius: 12,
        }}
      >
        {/* Dynamic drop shadow layer */}
        <motion.div
          style={{
            position: "absolute",
            inset: "10%",
            borderRadius: 16,
            filter: "blur(32px)",
            background: "radial-gradient(ellipse at center, rgba(180,155,120,0.45) 0%, transparent 70%)",
            translateX: shadowX,
            translateY: shadowY,
            translateZ: -60,
            zIndex: 0,
          }}
        />

        {/* Image */}
        <motion.img
          src={src}
          alt={alt}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "contain",
            position: "relative",
            zIndex: 1,
            translateZ: 40,
            filter: "drop-shadow(0 24px 48px rgba(160,130,95,0.35))",
          }}
        />

        {/* Specular glare highlight */}
        <motion.div
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: 12,
            zIndex: 2,
            backgroundImage: glare,
            pointerEvents: "none",
          }}
        />
      </motion.div>
    </motion.div>
  );
}

const categories = [
  {
    num: "01",
    title: "Макияж и визаж",
    subtitle: "Профессиональный образ",
    img: svcMakeup,
    items: [
      { name: "Express-макияж", price: "от 7 200 ₽" },
      { name: "Вечерний макияж", price: "от 11 300 ₽" },
      { name: "Свадебный макияж", price: "от 19 200 ₽" },
      { name: "Макияж + причёска", price: "по запросу" },
    ],
  },
  {
    num: "02",
    title: "Парикмахерский сервис",
    subtitle: "Французская школа",
    img: svcHair,
    items: [
      { name: "Стрижка с укладкой", price: "от 5 200 ₽" },
      { name: "Окрашивание", price: "от 7 700 ₽" },
      { name: "Укладка", price: "от 3 600 ₽" },
      { name: "Свадебная причёска", price: "по запросу" },
    ],
  },
  {
    num: "03",
    title: "Ногтевой сервис",
    subtitle: "Маникюр и педикюр",
    img: svcNails,
    items: [
      { name: "Маникюр для дам", price: "от 4 100 ₽" },
      { name: "Педикюр для дам", price: "от 6 000 ₽" },
      { name: "Наращивание ногтей", price: "от 10 000 ₽" },
      { name: "Маникюр / педикюр для господ", price: "от 5 100 ₽" },
    ],
  },
  {
    num: "04",
    title: "Эстетическая и превентивная медицина",
    subtitle: "Программы молодости",
    img: svcMedicine,
    items: [
      { name: "Консультация врача", price: "от 6 000 ₽" },
      { name: "Ботулинотерапия (1 зона)", price: "от 9 000 ₽" },
      { name: "Контурная пластика", price: "от 21 000 ₽" },
      { name: "Индивидуальный протокол", price: "по запросу" },
    ],
  },
  {
    num: "05",
    title: "Инъекционная и аппаратная косметология",
    subtitle: "Уход за кожей",
    img: svcCosmetology,
    items: [
      { name: "Мезотерапия", price: "от 12 000 ₽" },
      { name: "Биоревитализация", price: "от 15 000 ₽" },
      { name: "Уход для лица", price: "от 3 200 ₽" },
      { name: "Аппаратные процедуры", price: "от 5 000 ₽" },
    ],
  },
  {
    num: "06",
    title: "СПА",
    subtitle: "Ритуалы восстановления",
    img: svcSpa,
    items: [
      { name: "Общий массаж", price: "от 7 000 ₽" },
      { name: "Релакс-массаж", price: "от 8 500 ₽" },
      { name: "Обёртывание тела", price: "от 7 700 ₽" },
      { name: "Авторские методики массажа", price: "от 11 500 ₽" },
    ],
  },
];

function Category({ cat, index }: { cat: typeof categories[number]; index: number }) {
  const [open, setOpen] = useState<number | null>(null);
  const reverse = index % 2 === 1;

  return (
    <section id={`service-${cat.num}`} className={`border-b border-black/10 ${index === 0 ? "border-t" : ""}`}>
      <div className="max-w-7xl mx-auto px-6 md:px-16 py-24 md:py-32">
        <div className={`grid md:grid-cols-12 gap-12 md:gap-16 ${reverse ? "md:[direction:rtl]" : ""}`}>
          <div className="md:col-span-5 md:[direction:ltr]">
            <TiltImage src={cat.img} alt={cat.title} />
          </div>
          <div className="md:col-span-7 md:[direction:ltr] flex flex-col justify-center">
            <div className="flex items-center gap-6 mb-8">
              <span className="text-xs font-mono opacity-40">{cat.num}</span>
              <span className="text-[10px] uppercase tracking-[0.4em] text-black/50">
                {cat.subtitle}
              </span>
            </div>
            <h2 className="font-extralight tracking-[-0.03em] leading-[1] text-4xl md:text-6xl lg:text-7xl mb-12">
              <SplitText text={cat.title} />
            </h2>
            <ul className="border-t border-black/10">
              {cat.items.map((item, i) => (
                <li key={i} className="border-b border-black/10">
                  <button
                    onClick={() => setOpen(open === i ? null : i)}
                    className="w-full flex items-center justify-between py-6 group"
                  >
                    <span className="text-lg md:text-xl font-light text-left">
                      {item.name}
                    </span>
                    <div className="flex items-center gap-6">
                      <span className="text-xs uppercase tracking-[0.2em] text-black/50">
                        {item.price}
                      </span>
                      <motion.div animate={{ rotate: open === i ? 45 : 0 }}>
                        <Plus size={20} />
                      </motion.div>
                    </div>
                  </button>
                  <motion.div
                    initial={false}
                    animate={{
                      height: open === i ? "auto" : 0,
                      opacity: open === i ? 1 : 0,
                    }}
                    className="overflow-hidden"
                  >
                    <p className="pb-6 text-sm font-light text-black/60 max-w-2xl">
                      Индивидуальная консультация и подбор протокола. Используются
                      сертифицированные препараты и авторские методики Extendess.
                      Длительность процедуры — от 45 до 90 минут.
                    </p>
                  </motion.div>
                </li>
              ))}
            </ul>
            <div className="mt-8 flex items-center gap-4">
              <Link
                href="/price"
                className="inline-flex items-center gap-2 border border-black text-black text-[9px] uppercase tracking-[0.3em] px-5 py-3.5 hover:bg-black hover:text-white transition-colors duration-300 rounded"
              >
                Прайс <ArrowUpRight size={11} />
              </Link>
              <Link
                href="/contacts"
                className="inline-flex items-center gap-2 bg-black text-white text-[9px] uppercase tracking-[0.3em] px-5 py-3.5 hover:bg-black/80 transition-colors duration-300 rounded"
              >
                Записаться <ArrowUpRight size={11} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Services() {
  return (
    <div className="bg-[#F1EBE3] text-black">
      <section className="relative h-[80vh] overflow-hidden bg-black text-white">
        <video
          src="/images/services-bg.mp4"
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-80"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/55" />
        <div className="relative z-10 h-full flex flex-col justify-end px-6 md:px-16 pb-20">
          <div className="max-w-7xl mx-auto w-full">
            <FadeIn>
              <span className="text-[10px] uppercase tracking-[0.4em] text-white/60">
                — Услуги · 06 направлений
              </span>
            </FadeIn>
            <h1 className="mt-6 font-extralight tracking-[-0.04em] leading-[0.85] text-[clamp(3.5rem,12vw,12rem)]">
              <SplitText text="Услуги." />
            </h1>
            <FadeIn delay={0.4}>
              <p className="mt-8 max-w-xl text-base md:text-lg font-light text-white/60 leading-relaxed">
                Полный спектр услуг премиум-класса — от классической косметологии
                до инновационной эстетической медицины.
              </p>
            </FadeIn>
          </div>
        </div>
      </section>

      <div className="bg-[#1A1A1A] text-white py-6 border-y border-white/10">
        <Marquee
          text="ESTHETIC · MEDICINE · BEAUTY · COLOR · NAILS · WELLNESS · "
          speed={45}
          className="text-xl md:text-3xl font-extralight uppercase tracking-[0.3em]"
        />
      </div>

      {categories.map((cat, i) => (
        <Category key={cat.num} cat={cat} index={i} />
      ))}
    </div>
  );
}
