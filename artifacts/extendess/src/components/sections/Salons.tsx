import { useEffect, useRef, useState } from "react";
import { MapPin, Clock, Phone, ChevronLeft, ChevronRight, ArrowUpRight } from "lucide-react";
import { Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";

const salons = [
  {
    name: "Патриаршие пруды",
    address: "Малый Козихинский пер., д. 12",
    phone: "+7 (495) 109-28-09",
    hours: "пн–вс 10:00–22:00",
    img: "/images/salons/salon-kozikhinskiy.webp",
    metro: "Маяковская",
    metroColor: "#009A49",
    metroLine: "Замоскворецкая",
  },
  {
    name: "Садовая-Кудринская",
    address: "ул. Садовая-Кудринская, д. 19",
    phone: "+7 (495) 109-28-08",
    hours: "пн–вс 10:00–22:00",
    img: "/images/salons/salon-sadovaya.webp",
    metro: "Баррикадная",
    metroColor: "#8B1A80",
    metroLine: "Таганско-Краснопресненская",
  },
  {
    name: "Киевская",
    address: "Б. Дорогомиловская, д. 14",
    phone: "+7 (495) 109-28-01",
    hours: "пн–сб 08:00–22:00",
    img: "/images/salons/salon-dorogomilovskaya.webp",
    metro: "Киевская",
    metroColor: "#003F8E",
    metroLine: "Арбатско-Покровская",
  },
  {
    name: "Жуковка",
    address: "д. Жуковка, д. 58",
    phone: "+7 (495) 109-28-05",
    hours: "пн–вс 10:00–22:00",
    img: "/images/salons/salon-zhukovka.webp",
    metro: "Молодёжная",
    metroColor: "#003F8E",
    metroLine: "Арбатско-Покровская",
  },
  {
    name: "Ленинский проспект",
    address: "Ленинский пр., д. 43",
    phone: "+7 (495) 109-28-04",
    hours: "пн–сб 08:00–22:00",
    img: "/images/salons/salon-leninskiy.webp",
    metro: "Ленинский просп.",
    metroColor: "#FF7E00",
    metroLine: "Калужско-Рижская",
  },
  {
    name: "Зубовский бульвар",
    address: "Зубовский бул., д. 31/33",
    phone: "+7 (495) 109-28-07",
    hours: "пн–вс 10:00–22:00",
    img: "/images/salons/salon-zubovskiy.webp",
    metro: "Парк культуры",
    metroColor: "#E42313",
    metroLine: "Сокольническая",
  },
];

const YANDEX_MAP_SRC =
  "https://api-maps.yandex.ru/services/constructor/1.0/js/" +
  "?um=constructor%3Abee4227b7be65cb6b39097ac77eb39cf366eda70f54612c4a8d9976fec432943" +
  "&width=100%25&height=100%25&lang=ru_RU&scroll=false";

function SalonMap() {
  const containerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const existing = document.getElementById("yandex-constructor-script");
    if (existing) existing.remove();
    const script = document.createElement("script");
    script.id = "yandex-constructor-script";
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

export function Salons() {
  const [active, setActive] = useState(0);
  const [dir, setDir] = useState(1);

  const go = (next: number) => {
    setDir(next > active ? 1 : -1);
    setActive((next + salons.length) % salons.length);
  };

  const s = salons[active];

  const variants = {
    enter: (d: number) => ({ opacity: 0, x: d * 60 }),
    center: { opacity: 1, x: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
    exit:  (d: number) => ({ opacity: 0, x: d * -60, transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] } }),
  };

  return (
    <section id="salons" className="bg-[#F1EBE3]">

      {/* TOP ROW — two halves */}
      <div className="flex flex-col md:flex-row" style={{ minHeight: 500 }}>

        {/* LEFT — photo slider */}
        <div
          className="relative w-full overflow-hidden bg-black md:w-1/2"
          style={{ aspectRatio: "16/9" }}
        >
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
              style={{ willChange: "transform, opacity" }}
            />
          </AnimatePresence>

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />

          {/* Section label */}
          <div className="absolute top-6 left-8 z-10">
            <span className="text-[9px] uppercase tracking-[0.4em] text-white/50">— Наши адреса</span>
          </div>

          {/* Counter */}
          <div className="absolute top-6 right-8 z-10">
            <span className="text-[9px] uppercase tracking-[0.4em] text-white/40">
              {String(active + 1).padStart(2, "0")} / {String(salons.length).padStart(2, "0")}
            </span>
          </div>

          {/* Nav arrows */}
          <div className="absolute bottom-6 right-6 z-10 flex gap-2">
            <button
              onClick={() => go(active - 1)}
              className="w-9 h-9 flex items-center justify-center border border-white/30 text-white/60 hover:border-white hover:text-white transition-all duration-200 backdrop-blur-sm bg-black/10"
              aria-label="Предыдущий"
            >
              <ChevronLeft size={14} />
            </button>
            <button
              onClick={() => go(active + 1)}
              className="w-9 h-9 flex items-center justify-center border border-white/30 text-white/60 hover:border-white hover:text-white transition-all duration-200 backdrop-blur-sm bg-black/10"
              aria-label="Следующий"
            >
              <ChevronRight size={14} />
            </button>
          </div>

          {/* Dot indicators */}
          <div className="absolute bottom-8 left-8 z-10 flex items-center gap-1.5">
            {salons.map((_, i) => (
              <button
                key={i}
                onClick={() => go(i)}
                className="transition-all duration-400"
                style={{
                  width: i === active ? 20 : 5,
                  height: 5,
                  borderRadius: 9999,
                  background: i === active ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.3)",
                }}
              />
            ))}
          </div>
        </div>

        {/* RIGHT — salon info + metro nav */}
        <div className="relative w-full md:w-1/2 flex bg-[#F1EBE3]">

          {/* Info panel */}
          <div className="flex-1 flex flex-col justify-between px-7 py-8 min-w-0">
            <AnimatePresence mode="wait" custom={dir}>
              <motion.div
                key={active}
                custom={dir}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                className="flex flex-col h-full justify-between"
              >
                <div>
                  {/* Metro */}
                  <div className="flex items-center gap-2 mb-5">
                    <span
                      className="w-2 h-2 rounded-full shrink-0"
                      style={{ backgroundColor: s.metroColor }}
                    />
                    <span className="text-[10px] uppercase tracking-[0.4em] text-black/40">
                      м. {s.metro}
                    </span>
                    <span className="text-[9px] text-black/25 font-light ml-1 hidden lg:inline">
                      · {s.metroLine}
                    </span>
                  </div>

                  {/* Name */}
                  <h2 className="font-extralight tracking-[-0.03em] leading-[0.95] text-2xl md:text-3xl lg:text-4xl text-black mb-6">
                    {s.name}
                  </h2>

                  {/* Details */}
                  <div className="flex flex-col gap-2.5">
                    <div className="flex items-start gap-2.5 text-xs text-black/50 font-light">
                      <MapPin size={12} className="mt-0.5 shrink-0 text-black/30" />
                      <span>{s.address}</span>
                    </div>
                    <div className="flex items-center gap-2.5 text-xs text-black/45 font-light">
                      <Clock size={12} className="shrink-0 text-black/30" />
                      <span>{s.hours}</span>
                    </div>
                    <div className="flex items-center gap-2.5 text-xs text-black/45 font-light">
                      <Phone size={12} className="shrink-0 text-black/30" />
                      <a href={`tel:${s.phone}`} className="hover:text-black transition-colors">
                        {s.phone}
                      </a>
                    </div>
                  </div>
                </div>

                {/* CTA */}
                <div className="flex items-center gap-3 mt-6">
                  <Link
                    href="/contacts"
                    className="inline-flex items-center gap-2 bg-black text-white text-[9px] uppercase tracking-[0.3em] px-5 py-3.5 hover:bg-black/80 transition-colors duration-300"
                  >
                    Записаться <ArrowUpRight size={11} />
                  </Link>
                  <Link
                    href="/salons"
                    className="text-[9px] uppercase tracking-[0.3em] text-black/40 hover:text-black transition-colors border-b border-black/20 pb-0.5"
                  >
                    Все адреса
                  </Link>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Metro nav — vertical list of stations */}
          <div className="flex flex-col justify-center gap-0 pl-1 pr-2 border-l border-black/10 py-6 w-[130px] shrink-0">
            {salons.map((salon, i) => (
              <button
                key={i}
                onClick={() => go(i)}
                className="flex items-center gap-1.5 py-1.5 px-1.5 text-left transition-all duration-200 rounded-sm hover:bg-black/5"
              >
                <span
                  className="w-1.5 h-1.5 rounded-full shrink-0 transition-all duration-200"
                  style={{
                    backgroundColor: i === active ? salon.metroColor : "transparent",
                    border: `1.5px solid ${i === active ? salon.metroColor : "rgba(0,0,0,0.2)"}`,
                    transform: i === active ? "scale(1.2)" : "scale(1)",
                  }}
                />
                <span
                  className="text-[11px] uppercase tracking-[0.1em] transition-colors duration-200 leading-tight"
                  style={{ color: i === active ? "rgba(0,0,0,0.8)" : "rgba(0,0,0,0.3)" }}
                >
                  {salon.metro}
                </span>
              </button>
            ))}
          </div>

        </div>

      </div>

      {/* BOTTOM — full-width map */}
      <div style={{ height: "50vh", minHeight: 360 }}>
        <SalonMap />
      </div>

    </section>
  );
}
