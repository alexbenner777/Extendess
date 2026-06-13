import { useEffect, useRef, useState } from "react";
import { MapPin, Clock, Phone, ArrowUpRight } from "lucide-react";
import { Link } from "wouter";

const salons = [
  {
    name: "Патриаршие пруды",
    address: "Малый Козихинский пер., д. 12",
    phone: "+7 (495) 109-28-09",
    hours: "пн–вс 10:00–22:00",
    img: "/images/salons/salon-kozikhinskiy.webp",
    metro: "Маяковская",
    metroColor: "#009A49",
  },
  {
    name: "Садовая-Кудринская",
    address: "ул. Садовая-Кудринская, д. 19",
    phone: "+7 (495) 109-28-08",
    hours: "пн–вс 10:00–22:00",
    img: "/images/salons/salon-sadovaya.webp",
    metro: "Баррикадная",
    metroColor: "#7F0000",
  },
  {
    name: "Киевская",
    address: "Б. Дорогомиловская, д. 14",
    phone: "+7 (495) 109-28-01",
    hours: "пн–сб 08:00–22:00",
    img: "/images/salons/salon-dorogomilovskaya.webp",
    metro: "Киевская",
    metroColor: "#009A49",
  },
  {
    name: "Жуковка",
    address: "д. Жуковка, д. 58",
    phone: "+7 (495) 109-28-05",
    hours: "пн–вс 10:00–22:00",
    img: "/images/salons/salon-zhukovka.webp",
    metro: "Молодёжная",
    metroColor: "#009A49",
  },
  {
    name: "Ленинский проспект",
    address: "Ленинский пр., д. 43",
    phone: "+7 (495) 109-28-04",
    hours: "пн–сб 08:00–22:00",
    img: "/images/salons/salon-leninskiy.webp",
    metro: "Ленинский просп.",
    metroColor: "#FBAA33",
  },
  {
    name: "Зубовский бульвар",
    address: "Зубовский бул., д. 31/33",
    phone: "+7 (495) 109-28-07",
    hours: "пн–вс 10:00–22:00",
    img: "/images/salons/salon-zubovskiy.webp",
    metro: "Парк культуры",
    metroColor: "#009A49",
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
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section id="salons" className="bg-[#F1EBE3] py-20 px-6 md:px-16">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="mb-12 flex items-end justify-between border-b border-black/10 pb-8">
          <div>
            <span className="text-[9px] uppercase tracking-[0.45em] text-black/30 block mb-4">— Наши адреса</span>
            <h2 className="font-extralight tracking-[-0.03em] leading-[0.95] text-4xl md:text-5xl text-black">
              6 салонов<br />в Москве
            </h2>
          </div>
          <p className="hidden md:block max-w-xs text-xs font-light text-black/40 leading-relaxed text-right">
            Полный спектр услуг — от классических стрижек до эстетической медицины
          </p>
        </div>

        {/* Two-column layout: map left, list right */}
        <div className="flex flex-col md:flex-row gap-6 md:gap-10">

          {/* LEFT: sticky map */}
          <div className="md:w-1/2 relative">
            <div className="md:sticky md:top-24 overflow-hidden" style={{ height: 560 }}>
              {/* Hover image overlay */}
              {hovered !== null && (
                <div
                  className="absolute inset-0 z-10 transition-opacity duration-500"
                  style={{ opacity: 1 }}
                >
                  <img
                    src={salons[hovered].img}
                    alt={salons[hovered].name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                  <div className="absolute bottom-8 left-8 text-white">
                    <p className="text-[9px] uppercase tracking-[0.4em] opacity-60 mb-2">
                      м. {salons[hovered].metro}
                    </p>
                    <h3 className="text-2xl font-extralight tracking-[-0.02em]">
                      {salons[hovered].name}
                    </h3>
                    <p className="text-xs text-white/60 mt-1">{salons[hovered].address}</p>
                  </div>
                </div>
              )}
              {/* Map — shown when nothing is hovered */}
              <div
                className="absolute inset-0 transition-opacity duration-500"
                style={{ opacity: hovered !== null ? 0 : 1, zIndex: 5 }}
              >
                <SalonMap />
              </div>
            </div>
          </div>

          {/* RIGHT: salon list */}
          <div className="md:w-1/2 flex flex-col">
            {salons.map((s, i) => (
              <div
                key={i}
                className="group border-b border-black/8 last:border-b-0 cursor-pointer"
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
              >
                <div className="py-6 flex items-center justify-between gap-4 transition-all duration-300 group-hover:pl-3">
                  <div className="flex-1 min-w-0">
                    {/* Metro */}
                    <div className="flex items-center gap-1.5 mb-2">
                      <span
                        className="w-1.5 h-1.5 rounded-full shrink-0"
                        style={{ backgroundColor: s.metroColor }}
                      />
                      <span className="text-[9px] uppercase tracking-[0.3em] text-black/35 font-light">
                        м. {s.metro}
                      </span>
                    </div>

                    {/* Name */}
                    <h3 className="font-extralight text-xl md:text-2xl tracking-[-0.02em] leading-tight text-black mb-3 group-hover:text-black transition-colors">
                      {s.name}
                    </h3>

                    {/* Details — visible on hover */}
                    <div className="overflow-hidden transition-all duration-500 max-h-0 group-hover:max-h-24 opacity-0 group-hover:opacity-100">
                      <div className="flex flex-col gap-1.5 pb-1">
                        <div className="flex items-start gap-2 text-[10px] text-black/40 font-light">
                          <MapPin size={9} className="mt-0.5 shrink-0" />
                          <span>{s.address}</span>
                        </div>
                        <div className="flex items-center gap-2 text-[10px] text-black/35 font-light">
                          <Clock size={9} className="shrink-0" />
                          <span>{s.hours}</span>
                        </div>
                        <div className="flex items-center gap-2 text-[10px] text-black/35 font-light">
                          <Phone size={9} className="shrink-0" />
                          <a href={`tel:${s.phone}`} className="hover:text-black transition-colors">
                            {s.phone}
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Arrow + book button */}
                  <div className="flex items-center gap-3 shrink-0">
                    <Link
                      href="/contacts"
                      className="opacity-0 group-hover:opacity-100 transition-all duration-300 inline-flex items-center gap-1.5 border border-black/25 px-4 py-2 text-[9px] uppercase tracking-[0.3em] text-black/60 hover:bg-black hover:text-white hover:border-black"
                      onClick={e => e.stopPropagation()}
                    >
                      Записаться
                    </Link>
                    <ArrowUpRight
                      size={16}
                      className="text-black/20 group-hover:text-black/60 transition-colors duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transform"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
