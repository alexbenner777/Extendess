import { useEffect, useRef } from "react";
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
  "&width=100%25&height=520&lang=ru_RU&scroll=false";

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
  return <div ref={containerRef} style={{ width: "100%", height: 520 }} />;
}

export function Salons() {
  return (
    <>
      <section id="salons" className="bg-[#F1EBE3] pt-20 pb-0 px-6 md:px-16">
        {/* Header */}
        <div className="max-w-7xl mx-auto mb-12 flex items-end justify-between border-b border-black/10 pb-8">
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

        {/* 2-column grid of salon cards */}
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-3">
          {salons.map((s, i) => (
            <div
              key={i}
              className="bg-white flex group hover:shadow-md transition-shadow duration-300"
            >
              {/* Portrait image — stretches full card height */}
              <div className="w-[55%] shrink-0 overflow-hidden self-stretch">
                <img
                  src={s.img}
                  alt={s.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Info */}
              <div className="flex flex-col justify-between px-6 py-5 flex-1 min-w-0">
                <div>
                  {/* Metro */}
                  <div className="flex items-center gap-1.5 mb-3">
                    <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: s.metroColor }} />
                    <span className="text-[9px] uppercase tracking-[0.3em] text-black/35 font-light">м. {s.metro}</span>
                  </div>

                  {/* Name */}
                  <h3 className="font-extralight text-xl md:text-2xl tracking-[-0.02em] leading-tight text-black mb-4">
                    {s.name}
                  </h3>

                  {/* Address + hours + phone */}
                  <div className="flex flex-col gap-2">
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
                      <a href={`tel:${s.phone}`} className="hover:text-black transition-colors">{s.phone}</a>
                    </div>
                  </div>
                </div>

                {/* Book button */}
                <Link
                  href="/contacts"
                  className="mt-5 self-start inline-flex items-center gap-2 border border-black/20 px-4 py-2 text-[8px] uppercase tracking-[0.3em] text-black/50 hover:bg-black hover:text-white hover:border-black transition-all duration-300"
                >
                  Записаться <ArrowUpRight size={10} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Yandex Map */}
      <div className="bg-[#F1EBE3]">
        <SalonMap />
      </div>
    </>
  );
}
