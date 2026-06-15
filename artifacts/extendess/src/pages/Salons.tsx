import { useState, useRef, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { MapPin, Clock, Phone, ChevronLeft, ChevronRight, Wifi, Coffee, ParkingMeter, Dumbbell, ShieldCheck, Star } from "lucide-react";
import { SplitText, FadeIn, Marquee } from "@/components/ui-extras/animations";
import { Link } from "wouter";

const salons = [
  {
    id: 1,
    num: "01",
    name: "Патриаршие пруды",
    address: "Малый Козихинский пер., д. 12",
    phone: "+7 (495) 109-28-09",
    hours: "пн–вс 10:00–22:00",
    img: "/images/salons/salon-kozikhinskiy.webp",
    metro: "Маяковская",
    metroColor: "#009A49",
    metroLine: "Замоскворецкая",
    area: "Пресня",
    sqm: "540 м²",
    masters: 14,
    desc: "Флагманский салон в самом сердце Москвы. Исторический особняк с высокими потолками, панорамными окнами и авторским интерьером. Здесь расположена клиника эстетической медицины полного цикла.",
    amenities: ["Wi-Fi", "Кофе", "Парковка", "Гардероб"],
    tags: ["Флагман", "Медицина", "Свадьба"],
    rating: "4.9",
    reviews: 312,
    bookingUrl: "https://n522032.yclients.com/",
  },
  {
    id: 2,
    num: "02",
    name: "Садовая-Кудринская",
    address: "ул. Садовая-Кудринская, д. 19",
    phone: "+7 (495) 109-28-08",
    hours: "пн–вс 10:00–22:00",
    img: "/images/salons/salon-sadovaya.webp",
    metro: "Баррикадная",
    metroColor: "#8B1A80",
    metroLine: "Таганско-Краснопресненская",
    area: "Пресня",
    sqm: "380 м²",
    masters: 10,
    desc: "Стильное пространство в доме XIX века в тихом переулке. Особая атмосфера — уютный интерьер с бежевыми тонами и живыми растениями. Полный спектр парикмахерских и косметологических услуг.",
    amenities: ["Wi-Fi", "Кофе", "Гардероб"],
    tags: ["Косметология", "Волосы"],
    rating: "4.8",
    reviews: 218,
    bookingUrl: "https://n522035.yclients.com/",
  },
  {
    id: 3,
    num: "03",
    name: "Киевская",
    address: "Б. Дорогомиловская, д. 14",
    phone: "+7 (495) 109-28-01",
    hours: "пн–сб 08:00–22:00",
    img: "/images/salons/salon-dorogomilovskaya.webp",
    metro: "Киевская",
    metroColor: "#003F8E",
    metroLine: "Арбатско-Покровская",
    area: "Дорогомилово",
    sqm: "420 м²",
    masters: 12,
    desc: "Просторный салон у Киевского вокзала с ранним открытием. Идеален для деловых людей — работает с 08:00 в будни. Широкая зона SPA и wellness-процедур, отдельные кабинеты для инъекций.",
    amenities: ["Wi-Fi", "Кофе", "Парковка", "Детская зона"],
    tags: ["SPA", "Ранее открытие"],
    rating: "4.8",
    reviews: 196,
    bookingUrl: "https://n522037.yclients.com/",
  },
  {
    id: 4,
    num: "04",
    name: "Жуковка",
    address: "д. Жуковка, д. 58",
    phone: "+7 (495) 109-28-05",
    hours: "пн–вс 10:00–22:00",
    img: "/images/salons/salon-zhukovka.webp",
    metro: "Молодёжная",
    metroColor: "#003F8E",
    metroLine: "Арбатско-Покровская",
    area: "Рублёвка",
    sqm: "680 м²",
    masters: 18,
    desc: "Наш самый просторный салон на Рублёво-Успенском шоссе. Для резидентов загородного Подмосковья — отдельный VIP-этаж, закрытые кабинеты и персональный консьерж-сервис.",
    amenities: ["Wi-Fi", "Кофе", "Парковка", "VIP-зал", "Консьерж"],
    tags: ["VIP", "Флагман", "Загород"],
    rating: "5.0",
    reviews: 147,
    bookingUrl: "https://n522030.yclients.com/",
  },
  {
    id: 5,
    num: "05",
    name: "Ленинский проспект",
    address: "Ленинский пр., д. 43",
    phone: "+7 (495) 109-28-04",
    hours: "пн–сб 08:00–22:00",
    img: "/images/salons/salon-leninskiy.webp",
    metro: "Ленинский просп.",
    metroColor: "#FF7E00",
    metroLine: "Калужско-Рижская",
    area: "Гагаринский",
    sqm: "350 м²",
    masters: 9,
    desc: "Современный салон на юго-западе Москвы. Отличается быстрым сервисом и удобной записью — идеален для регулярных визитов без лишнего времени в пути.",
    amenities: ["Wi-Fi", "Кофе", "Парковка"],
    tags: ["Косметология", "Ногти"],
    rating: "4.7",
    reviews: 183,
    bookingUrl: "https://n504940.yclients.com/",
  },
  {
    id: 6,
    num: "06",
    name: "Зубовский бульвар",
    address: "Зубовский бул., д. 31/33",
    phone: "+7 (495) 109-28-07",
    hours: "пн–вс 10:00–22:00",
    img: "/images/salons/salon-zubovskiy.webp",
    metro: "Парк культуры",
    metroColor: "#E42313",
    metroLine: "Сокольническая",
    area: "Хамовники",
    sqm: "310 м²",
    masters: 8,
    desc: "Boutique-салон в тихом бульварном переулке. Ограниченное число мест — только персональный подход. Специализация: авторские окрашивания и уход за волосами.",
    amenities: ["Wi-Fi", "Кофе", "Гардероб"],
    tags: ["Boutique", "Волосы", "Макияж"],
    rating: "4.9",
    reviews: 164,
    bookingUrl: "https://n522038.yclients.com/",
  },
];

const AMENITY_ICONS: Record<string, React.ReactNode> = {
  "Wi-Fi": <Wifi size={11} />,
  "Кофе": <Coffee size={11} />,
  "Парковка": <ParkingMeter size={11} />,
  "VIP-зал": <Star size={11} />,
  "Консьерж": <ShieldCheck size={11} />,
  "Детская зона": <Dumbbell size={11} />,
  "Гардероб": <ShieldCheck size={11} />,
};

const YANDEX_MAP_SRC =
  "https://api-maps.yandex.ru/services/constructor/1.0/js/" +
  "?um=constructor%3Abee4227b7be65cb6b39097ac77eb39cf366eda70f54612c4a8d9976fec432943" +
  "&width=100%25&height=100%25&lang=ru_RU&scroll=false";

function SalonMap() {
  const containerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const existing = document.getElementById("yandex-salons-script");
    if (existing) existing.remove();
    const script = document.createElement("script");
    script.id = "yandex-salons-script";
    script.charset = "utf-8";
    script.async = true;
    script.src = YANDEX_MAP_SRC;
    container.innerHTML = "";
    container.appendChild(script);
    return () => {
      script.remove();
      if (container) container.innerHTML = "";
    };
  }, []);
  return <div ref={containerRef} style={{ width: "100%", height: "100%" }} />;
}

const variants = {
  enter: (d: number) => ({ opacity: 0, x: d * 60 }),
  center: { opacity: 1, x: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
  exit: (d: number) => ({ opacity: 0, x: d * -60, transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } }),
};

export default function SalonsPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "35%"]);

  const [active, setActive] = useState(0);
  const [dir, setDir] = useState(1);

  const go = (next: number) => {
    setDir(next > active ? 1 : -1);
    setActive((next + salons.length) % salons.length);
  };

  const s = salons[active];

  return (
    <div className="bg-[#F1EBE3] text-black">

      {/* ── HERO ── */}
      <section ref={heroRef} className="relative h-[85vh] overflow-hidden bg-black text-white">
        <motion.video
          src="/images/services-bg.mp4"
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-50"
          style={{ y, scale: 1.08 }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/75" />
        <div className="relative z-10 h-full flex flex-col justify-end px-6 md:px-16 pb-20">
          <div className="max-w-7xl mx-auto w-full">
            <FadeIn>
              <span className="text-[10px] uppercase tracking-[0.4em] text-white/60">
                — Наши адреса · 6 салонов в Москве и Подмосковье
              </span>
            </FadeIn>
            <h1 className="mt-6 font-extralight tracking-[-0.04em] leading-[0.85] text-[clamp(3.5rem,13vw,13rem)]">
              <SplitText text="Салоны." />
            </h1>
            <FadeIn delay={0.5}>
              <p className="mt-8 max-w-xl text-base font-light text-white/55 leading-relaxed">
                Шесть пространств Extendess — от уютного boutique-салона до флагмана с клиникой
                эстетической медицины полного цикла.
              </p>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── MARQUEE ── */}
      <div className="bg-[#1A1A1A] text-white py-6 border-y border-white/10">
        <Marquee
          text="МОСКВА · ПАТРИАРШИЕ · САДОВАЯ · КИЕВСКАЯ · ЖУКОВКА · ЛЕНИНСКИЙ · ЗУБОВСКИЙ · "
          speed={45}
          className="text-xl md:text-3xl font-extralight uppercase tracking-[0.3em]"
        />
      </div>

      {/* ── INTERACTIVE SLIDER ── */}
      <section className="py-12 md:py-20 px-6 md:px-16">
        <div className="max-w-7xl mx-auto">
          <p className="text-[9px] uppercase tracking-[0.45em] text-black/30 mb-10">— Выберите салон</p>

          <div className="flex flex-col lg:flex-row gap-8 lg:gap-0 items-stretch" style={{ minHeight: 520 }}>

            {/* Photo */}
            <div className="w-full lg:w-[55%] relative overflow-hidden bg-black rounded-xl"
              style={{ aspectRatio: "16/10" }}>
              <AnimatePresence mode="wait" custom={dir}>
                <motion.img
                  key={active}
                  custom={dir}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  src={s.img}
                  alt={s.name}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </AnimatePresence>
              <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent pointer-events-none" />
              <div className="absolute top-5 right-6 z-10">
                <span className="text-[9px] uppercase tracking-[0.4em] text-white/40">
                  {String(active + 1).padStart(2, "0")} / {String(salons.length).padStart(2, "0")}
                </span>
              </div>
              <div className="absolute bottom-5 left-6 z-10 flex items-center gap-1.5">
                {salons.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => go(i)}
                    style={{
                      width: i === active ? 20 : 5,
                      height: 5,
                      borderRadius: 9999,
                      background: i === active ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.3)",
                      transition: "all 0.35s",
                    }}
                  />
                ))}
              </div>
              <div className="absolute bottom-5 right-6 z-10 flex gap-2">
                <button onClick={() => go(active - 1)}
                  className="w-9 h-9 flex items-center justify-center border border-white/30 text-white/60 hover:border-white hover:text-white transition-all backdrop-blur-sm bg-black/10 rounded">
                  <ChevronLeft size={14} />
                </button>
                <button onClick={() => go(active + 1)}
                  className="w-9 h-9 flex items-center justify-center border border-white/30 text-white/60 hover:border-white hover:text-white transition-all backdrop-blur-sm bg-black/10 rounded">
                  <ChevronRight size={14} />
                </button>
              </div>
            </div>

            {/* Info panel */}
            <div className="w-full lg:w-[45%] flex">
              {/* Detail */}
              <div className="flex-1 px-0 lg:px-10 py-2 flex flex-col justify-between">
                <AnimatePresence mode="wait" custom={dir}>
                  <motion.div key={active} custom={dir} variants={variants} initial="enter" animate="center" exit="exit"
                    className="flex flex-col h-full justify-between">
                    <div>
                      {/* Metro */}
                      <div className="flex items-center gap-2 mb-5">
                        <span className="w-2 h-2 rounded-full" style={{ backgroundColor: s.metroColor }} />
                        <span className="text-[10px] uppercase tracking-[0.4em] text-black/40">м. {s.metro}</span>
                        <span className="text-[9px] text-black/25 ml-1 hidden lg:inline">· {s.metroLine}</span>
                      </div>
                      <div className="flex items-baseline gap-3 mb-2">
                        <span className="text-[9px] font-mono text-black/25">{s.num}</span>
                        <h2 className="font-extralight tracking-[-0.03em] leading-[0.95] text-2xl md:text-3xl lg:text-4xl text-black">
                          {s.name}
                        </h2>
                      </div>
                      <p className="mt-4 text-sm font-light text-black/55 leading-relaxed max-w-sm">{s.desc}</p>

                      {/* Stats row */}
                      <div className="mt-6 flex gap-6">
                        <div>
                          <p className="text-[9px] uppercase tracking-[0.35em] text-black/30">Площадь</p>
                          <p className="mt-1 text-lg font-extralight text-black">{s.sqm}</p>
                        </div>
                        <div>
                          <p className="text-[9px] uppercase tracking-[0.35em] text-black/30">Мастеров</p>
                          <p className="mt-1 text-lg font-extralight text-black">{s.masters}</p>
                        </div>
                        <div>
                          <p className="text-[9px] uppercase tracking-[0.35em] text-black/30">Рейтинг</p>
                          <p className="mt-1 text-lg font-extralight text-black">★ {s.rating}</p>
                        </div>
                      </div>

                      {/* Contact */}
                      <div className="mt-6 flex flex-col gap-2">
                        <div className="flex items-center gap-2.5 text-xs text-black/50 font-light">
                          <MapPin size={11} className="shrink-0 text-black/30" />{s.address}
                        </div>
                        <div className="flex items-center gap-2.5 text-xs text-black/45 font-light">
                          <Clock size={11} className="shrink-0 text-black/30" />{s.hours}
                        </div>
                        <div className="flex items-center gap-2.5 text-xs text-black/45 font-light">
                          <Phone size={11} className="shrink-0 text-black/30" />
                          <a href={`tel:${s.phone}`} className="hover:text-black transition-colors">{s.phone}</a>
                        </div>
                      </div>

                      {/* Amenities */}
                      <div className="mt-5 flex flex-wrap gap-2">
                        {s.amenities.map((a) => (
                          <span key={a} className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-black/5 text-[9px] uppercase tracking-[0.2em] text-black/50 rounded">
                            {AMENITY_ICONS[a]}{a}
                          </span>
                        ))}
                      </div>

                      {/* Tags */}
                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {s.tags.map((t) => (
                          <span key={t} className="text-[8px] uppercase tracking-[0.3em] text-black/35 border border-black/15 px-2 py-1">
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>

                    <a
                      href={s.bookingUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-6 inline-flex items-center gap-2 bg-black text-white text-[9px] uppercase tracking-[0.3em] px-6 py-4 hover:bg-black/80 transition-colors self-start rounded"
                    >
                      Записаться в этот салон
                    </a>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Station nav */}
              <div className="flex-col justify-center gap-0 border-l border-black/10 pl-4 py-4 w-[110px] shrink-0 hidden lg:flex">
                {salons.map((salon, i) => (
                  <button key={i} onClick={() => go(i)}
                    className="flex items-center gap-1.5 py-2 px-1 text-left transition-all hover:bg-black/5 rounded-sm">
                    <span className="w-1.5 h-1.5 rounded-full shrink-0 transition-all"
                      style={{
                        backgroundColor: i === active ? salon.metroColor : "transparent",
                        border: `1.5px solid ${i === active ? salon.metroColor : "rgba(0,0,0,0.2)"}`,
                        transform: i === active ? "scale(1.2)" : "scale(1)",
                      }} />
                    <span className="text-[10px] uppercase tracking-[0.1em] leading-tight transition-colors"
                      style={{ color: i === active ? "rgba(0,0,0,0.8)" : "rgba(0,0,0,0.28)" }}>
                      {salon.metro}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── ALL SALONS GRID ── */}
      <section className="px-6 md:px-16 pb-16">
        <div className="max-w-7xl mx-auto">
          <div className="border-t border-black/10 pt-12 mb-10 flex items-end justify-between">
            <h2 className="font-extralight tracking-[-0.03em] text-2xl md:text-4xl text-black">Все салоны</h2>
            <span className="text-[9px] uppercase tracking-[0.4em] text-black/30">{salons.length} адреса</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {salons.map((salon, i) => (
              <motion.div
                key={salon.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ delay: (i % 3) * 0.08, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="bg-[#F1EBE3] group cursor-pointer rounded-xl overflow-hidden"
                onClick={() => { setActive(i); window.scrollTo({ top: 0, behavior: "smooth" }); }}
              >
                {/* Photo */}
                <div className="relative overflow-hidden rounded-xl" style={{ aspectRatio: "4/3" }}>
                  <img
                    src={salon.img}
                    alt={salon.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                  <div className="absolute top-4 left-4 flex gap-1.5">
                    {salon.tags.map((t) => (
                      <span key={t} className="text-[7px] uppercase tracking-[0.25em] text-white/80 bg-black/40 backdrop-blur-sm px-2 py-1">
                        {t}
                      </span>
                    ))}
                  </div>
                  <span className="absolute top-4 right-4 text-[9px] uppercase tracking-[0.3em] text-white/50">{salon.num}</span>
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="flex items-center gap-1.5 mb-1">
                      <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: salon.metroColor }} />
                      <span className="text-[8px] uppercase tracking-[0.3em] text-white/60">м. {salon.metro}</span>
                    </div>
                    <h3 className="font-extralight text-lg text-white leading-tight">{salon.name}</h3>
                  </div>
                </div>

                {/* Info */}
                <div className="px-5 py-5">
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <p className="text-xs font-light text-black/50 leading-relaxed flex-1">{salon.address}</p>
                    <span className="text-[10px] text-black/40 shrink-0">★ {salon.rating} <span className="text-black/25">({salon.reviews})</span></span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] uppercase tracking-[0.25em] text-black/35">{salon.hours}</span>
                    <span className="text-[9px] uppercase tracking-[0.25em] text-black/30">{salon.sqm} · {salon.masters} мастера</span>
                  </div>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {salon.amenities.slice(0, 3).map((a) => (
                      <span key={a} className="inline-flex items-center gap-1 px-2 py-1 bg-black/5 text-[8px] uppercase tracking-[0.15em] text-black/45 rounded">
                        {AMENITY_ICONS[a]}{a}
                      </span>
                    ))}
                  </div>
                  <div className="mt-4 pt-4 border-t border-black/8 flex items-center justify-between">
                    <a href={`tel:${salon.phone}`} className="text-[10px] font-light text-black/45 hover:text-black transition-colors">
                      {salon.phone}
                    </a>
                    <span className="text-[8px] uppercase tracking-[0.3em] text-black/25 group-hover:text-black/60 transition-colors">
                      Выбрать →
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── MAP ── */}
      <div className="border-t border-black/10">
        <div className="px-6 md:px-16 py-8">
          <div className="max-w-7xl mx-auto">
            <p className="text-[9px] uppercase tracking-[0.45em] text-black/30 mb-6">— Все адреса на карте</p>
          </div>
        </div>
        <div style={{ height: "55vh", minHeight: 380 }}>
          <SalonMap />
        </div>
      </div>

      {/* ── CTA ── */}
      <section className="py-24 px-6 md:px-16 bg-[#1A1A1A] text-white">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div>
            <p className="text-[10px] uppercase tracking-[0.4em] text-white/30 mb-4">— Запись онлайн</p>
            <h2 className="font-extralight tracking-[-0.03em] text-3xl md:text-5xl leading-tight">
              Выберите салон<br />и запишитесь онлайн.
            </h2>
            <p className="mt-6 text-sm font-light text-white/40 max-w-md leading-relaxed">
              Запись доступна в любое удобное время. Мастер свяжется с вами
              для подтверждения визита.
            </p>
          </div>
          <Link
            href="/contacts"
            className="shrink-0 px-10 py-5 bg-white text-black text-xs font-semibold uppercase tracking-widest hover:bg-white/90 transition-colors"
          >
            Записаться
          </Link>
        </div>
      </section>
    </div>
  );
}
