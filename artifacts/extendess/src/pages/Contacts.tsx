import { useState, useRef, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight, MapPin, Phone, Mail, Clock } from "lucide-react";
import {
  SplitText,
  FadeIn,
  Marquee,
} from "@/components/ui-extras/animations";
import heroImg from "@assets/images/hero.png";

const salons = [
  {
    name: "Патриаршие пруды",
    address: "Малый Козихинский пер., д. 12",
    phone: "+7 (495) 109-28-09",
    hours: "пн–вс 10:00–22:00",
    metro: "Маяковская",
    metroColor: "#009A49",
  },
  {
    name: "Садовая-Кудринская",
    address: "ул. Садовая-Кудринская, д. 19",
    phone: "+7 (495) 109-28-08",
    hours: "пн–вс 10:00–22:00",
    metro: "Баррикадная",
    metroColor: "#8B1A80",
  },
  {
    name: "Киевская",
    address: "Б. Дорогомиловская, д. 14",
    phone: "+7 (495) 109-28-01",
    hours: "пн–сб 08:00–22:00",
    metro: "Киевская",
    metroColor: "#003F8E",
  },
  {
    name: "Жуковка",
    address: "д. Жуковка, д. 58",
    phone: "+7 (495) 109-28-05",
    hours: "пн–вс 10:00–22:00",
    metro: "Молодёжная",
    metroColor: "#003F8E",
  },
  {
    name: "Ленинский проспект",
    address: "Ленинский пр., д. 43",
    phone: "+7 (495) 109-28-04",
    hours: "пн–сб 08:00–22:00",
    metro: "Ленинский просп.",
    metroColor: "#FF7E00",
  },
  {
    name: "Зубовский бульвар",
    address: "Зубовский бул., д. 31/33",
    phone: "+7 (495) 109-28-07",
    hours: "пн–вс 10:00–22:00",
    metro: "Парк культуры",
    metroColor: "#E42313",
  },
];

const services = [
  "Эстетическая медицина",
  "Косметология",
  "Волосы и стилистика",
  "Ногтевой сервис",
  "СПА и массаж",
  "Консультация",
];

const YANDEX_MAP_SRC =
  "https://api-maps.yandex.ru/services/constructor/1.0/js/" +
  "?um=constructor%3Abee4227b7be65cb6b39097ac77eb39cf366eda70f54612c4a8d9976fec432943" +
  "&width=100%25&height=100%25&lang=ru_RU&scroll=false";

function ContactMap() {
  const containerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const existing = document.getElementById("yandex-contacts-script");
    if (existing) existing.remove();
    const script = document.createElement("script");
    script.id = "yandex-contacts-script";
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

export default function Contacts() {
  const [submitted, setSubmitted] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
  }

  return (
    <div className="bg-[#F1EBE3] text-black">

      {/* HERO */}
      <section ref={heroRef} className="relative h-[80vh] overflow-hidden bg-black text-white">
        <motion.img
          src={heroImg}
          alt=""
          className="absolute inset-0 h-full w-full object-cover opacity-50"
          style={{ y, scale: 1.15 }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/50" />
        <div className="relative z-10 h-full flex flex-col justify-end px-6 md:px-16 pb-20">
          <div className="max-w-7xl mx-auto w-full">
            <FadeIn>
              <span className="text-[10px] uppercase tracking-[0.4em] text-white/60">— Запись · Контакты</span>
            </FadeIn>
            <h1 className="mt-6 font-extralight tracking-[-0.04em] leading-[0.85] text-[clamp(2.8rem,9vw,9rem)]">
              <SplitText text="Контакты" />
            </h1>
            <FadeIn delay={0.4}>
              <p className="mt-8 max-w-xl text-base font-light text-white/55 leading-relaxed">
                Запишитесь онлайн или свяжитесь с нами напрямую —<br />мы ответим в течение часа.
              </p>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* MARQUEE */}
      <div className="bg-[#1A1A1A] text-white py-6 border-y border-white/10">
        <Marquee
          text="ЗАПИШИТЕСЬ · BOOK NOW · ПОЗВОНИТЕ · ATELIER · EXTENDESS · "
          speed={40}
          className="text-xl md:text-3xl font-extralight uppercase tracking-[0.3em]"
        />
      </div>

      {/* BOOKING FORM */}
      <section className="py-24 md:py-32 px-6 md:px-16 border-b border-black/10">
        <div className="max-w-7xl mx-auto grid md:grid-cols-12 gap-12 md:gap-20">

          <div className="md:col-span-5">
            <FadeIn>
              <span className="text-[9px] uppercase tracking-[0.45em] text-black/30">— Запись онлайн</span>
              <h2 className="mt-6 font-extralight tracking-[-0.03em] leading-[1.0] text-3xl md:text-5xl">
                <SplitText text="Оставьте заявку —" />
                <SplitText text="мы свяжемся в течение часа." delay={0.15} />
              </h2>
              <p className="mt-8 text-sm font-light text-black/50 leading-relaxed max-w-sm">
                Нажимая «Отправить», вы соглашаетесь с политикой конфиденциальности
                и даёте согласие на обработку персональных данных.
              </p>

              <div className="mt-12 flex flex-col gap-4">
                <div className="flex items-center gap-3 text-sm font-light text-black/50">
                  <Mail size={14} className="text-black/30 shrink-0" />
                  <span>hello@extendess.ru</span>
                </div>
                <div className="flex items-center gap-3 text-sm font-light text-black/50">
                  <Phone size={14} className="text-black/30 shrink-0" />
                  <span>+7 (495) 109-28-00</span>
                </div>
                <div className="flex items-center gap-3 text-sm font-light text-black/50">
                  <Clock size={14} className="text-black/30 shrink-0" />
                  <span>пн–вс 10:00–22:00</span>
                </div>
              </div>
            </FadeIn>
          </div>

          <div className="md:col-span-7">
            <form onSubmit={onSubmit} className="space-y-0">
              {[
                { name: "name", label: "Имя", type: "text" },
                { name: "phone", label: "Телефон", type: "tel" },
                { name: "email", label: "Email", type: "email" },
              ].map((field) => (
                <div key={field.name} className="border-b border-black/15 group focus-within:border-black/40 transition-colors">
                  <label className="block text-[9px] uppercase tracking-[0.35em] text-black/35 pt-6">
                    {field.label}
                  </label>
                  <input
                    type={field.type}
                    name={field.name}
                    required
                    className="w-full bg-transparent py-4 text-lg md:text-xl font-extralight outline-none placeholder:text-black/20 text-black"
                  />
                </div>
              ))}

              <div className="border-b border-black/15 focus-within:border-black/40 transition-colors">
                <label className="block text-[9px] uppercase tracking-[0.35em] text-black/35 pt-6">Услуга</label>
                <select
                  name="service"
                  className="w-full bg-transparent py-4 text-lg md:text-xl font-extralight outline-none appearance-none cursor-pointer text-black"
                >
                  {services.map((s) => (
                    <option key={s} value={s} className="bg-[#F1EBE3]">{s}</option>
                  ))}
                </select>
              </div>

              <div className="border-b border-black/15 focus-within:border-black/40 transition-colors">
                <label className="block text-[9px] uppercase tracking-[0.35em] text-black/35 pt-6">Комментарий</label>
                <textarea
                  name="message"
                  rows={3}
                  className="w-full bg-transparent py-4 text-lg md:text-xl font-extralight outline-none resize-none text-black placeholder:text-black/20"
                  placeholder="Пожелания или вопросы..."
                />
              </div>

              <div className="pt-10">
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  className="group inline-flex items-center gap-4 bg-black text-white px-10 py-5 text-[9px] uppercase tracking-[0.35em] hover:bg-black/80 transition-colors rounded"
                >
                  {submitted ? "Отправлено ✓" : "Отправить заявку"}
                  {!submitted && <ArrowUpRight size={14} className="transition-transform group-hover:rotate-45" />}
                </motion.button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* SALONS */}
      <section className="py-24 md:py-32 px-6 md:px-16 border-b border-black/10">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-14 border-b border-black/10 pb-8">
            <div>
              <span className="text-[9px] uppercase tracking-[0.45em] text-black/30 block mb-5">— Наши салоны</span>
              <h2 className="font-extralight tracking-[-0.03em] leading-[0.95] text-3xl md:text-5xl text-black">
                6 адресов<br />в Москве
              </h2>
            </div>
            <p className="hidden md:block max-w-xs text-xs font-light text-black/40 leading-relaxed text-right">
              Выберите ближайший салон и запишитесь на удобное время
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-black/10">
            {salons.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ delay: (i % 3) * 0.07, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="bg-[#F1EBE3] px-7 py-8 group hover:bg-black hover:text-white transition-colors duration-500"
              >
                <div className="flex items-center gap-2 mb-4">
                  <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: s.metroColor }} />
                  <span className="text-[9px] uppercase tracking-[0.4em] text-black/40 group-hover:text-white/40 transition-colors">
                    м. {s.metro}
                  </span>
                </div>
                <h3 className="font-extralight text-xl md:text-2xl tracking-[-0.02em] leading-tight mb-5">
                  {s.name}
                </h3>
                <div className="flex flex-col gap-2.5">
                  <div className="flex items-start gap-2.5 text-xs font-light text-black/50 group-hover:text-white/50 transition-colors">
                    <MapPin size={11} className="mt-0.5 shrink-0 text-black/30 group-hover:text-white/30" />
                    <span>{s.address}</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-xs font-light text-black/45 group-hover:text-white/45 transition-colors">
                    <Clock size={11} className="shrink-0 text-black/30 group-hover:text-white/30" />
                    <span>{s.hours}</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-xs font-light text-black/45 group-hover:text-white/45 transition-colors">
                    <Phone size={11} className="shrink-0 text-black/30 group-hover:text-white/30" />
                    <a href={`tel:${s.phone}`} className="hover:underline">{s.phone}</a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* MAP */}
      <div className="border-t border-black/10">
        <div className="px-6 md:px-16 py-8 max-w-7xl mx-auto">
          <p className="text-[9px] uppercase tracking-[0.45em] text-black/30">— Все адреса на карте</p>
        </div>
        <div style={{ height: "55vh", minHeight: 380 }}>
          <ContactMap />
        </div>
      </div>

    </div>
  );
}
