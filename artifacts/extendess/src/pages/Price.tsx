import { useState, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { SplitText, FadeIn, Marquee } from "@/components/ui-extras/animations";
import { Link } from "wouter";

const priceCategories = [
  {
    id: "makeup",
    num: "01",
    title: "Макияж и визаж",
    subtitle: "Профессиональный образ",
    items: [
      { name: "Дневной макияж", price: "от 4 000 ₽", note: "до 60 мин" },
      { name: "Вечерний макияж", price: "от 6 000 ₽", note: "до 75 мин" },
      { name: "Свадебный макияж", price: "от 9 500 ₽", note: "с пробником" },
      { name: "Макияж + причёска", price: "от 14 000 ₽", note: "комплекс" },
      { name: "Пробный образ", price: "от 7 500 ₽", note: "репетиция" },
      { name: "Макияж для съёмки", price: "от 8 000 ₽", note: "HD" },
    ],
  },
  {
    id: "hair",
    num: "02",
    title: "Волосы и стилистика",
    subtitle: "Парикмахерские услуги",
    items: [
      { name: "Стрижка (женская)", price: "от 3 500 ₽", note: "с укладкой" },
      { name: "Стрижка (мужская)", price: "от 2 500 ₽", note: "с укладкой" },
      { name: "Укладка", price: "от 3 500 ₽", note: "феном / плойкой" },
      { name: "Окрашивание однотонное", price: "от 8 500 ₽", note: "средняя длина" },
      { name: "Мелирование", price: "от 12 000 ₽", note: "средняя длина" },
      { name: "Балаяж / Омбре", price: "от 16 000 ₽", note: "средняя длина" },
      { name: "Кератиновое выпрямление", price: "от 14 000 ₽", note: "средняя длина" },
      { name: "Ботокс для волос", price: "от 10 000 ₽", note: "средняя длина" },
      { name: "Свадебная причёска", price: "от 12 000 ₽", note: "индивидуально" },
      { name: "Шитьё седины", price: "от 6 500 ₽", note: "1 зона" },
    ],
  },
  {
    id: "nails",
    num: "03",
    title: "Ногтевой сервис",
    subtitle: "Маникюр и педикюр",
    items: [
      { name: "Маникюр классический", price: "от 3 500 ₽", note: "без покрытия" },
      { name: "Маникюр с гель-лаком", price: "от 4 500 ₽", note: "с покрытием" },
      { name: "Педикюр классический", price: "от 4 500 ₽", note: "без покрытия" },
      { name: "Педикюр с гель-лаком", price: "от 5 500 ₽", note: "с покрытием" },
      { name: "Наращивание ногтей (гель)", price: "от 5 500 ₽", note: "10 ногтей" },
      { name: "Наращивание ногтей (акрил)", price: "от 6 000 ₽", note: "10 ногтей" },
      { name: "Маникюр для господ", price: "от 3 000 ₽", note: "без покрытия" },
      { name: "Педикюр для господ", price: "от 4 000 ₽", note: "без покрытия" },
      { name: "Японский маникюр", price: "от 4 500 ₽", note: "P-Shine" },
    ],
  },
  {
    id: "medicine",
    num: "04",
    title: "Эстетическая медицина",
    subtitle: "Инъекционные процедуры",
    items: [
      { name: "Мезотерапия лица", price: "от 7 500 ₽", note: "1 зона" },
      { name: "Инъекции миорелаксантов", price: "от 12 000 ₽", note: "1 зона" },
      { name: "Биоревитализация", price: "от 14 500 ₽", note: "лицо" },
      { name: "Контурная пластика губ", price: "от 22 000 ₽", note: "1 мл" },
      { name: "Контурная пластика скул", price: "от 28 000 ₽", note: "1 мл" },
      { name: "Коллагенотерапия", price: "от 18 000 ₽", note: "курс" },
      { name: "Плазмолифтинг", price: "от 9 000 ₽", note: "1 процедура" },
      { name: "Нитевой лифтинг", price: "от 35 000 ₽", note: "1 зона" },
      { name: "Аппарат Vivace (RF-микронидлинг)", price: "от 25 000 ₽", note: "лицо" },
    ],
  },
  {
    id: "cosmetology",
    num: "05",
    title: "Инъекционная и аппаратная косметология",
    subtitle: "Уход за лицом и телом",
    items: [
      { name: "Уходовая процедура для лица", price: "от 6 500 ₽", note: "60 мин" },
      { name: "Классический массаж лица", price: "от 4 500 ₽", note: "45 мин" },
      { name: "Лимфодренажный массаж лица", price: "от 5 500 ₽", note: "60 мин" },
      { name: "Химический пилинг", price: "от 5 500 ₽", note: "по типу кожи" },
      { name: "Механическая чистка лица", price: "от 7 000 ₽", note: "90 мин" },
      { name: "Комбинированная чистка", price: "от 8 500 ₽", note: "90 мин" },
      { name: "Ультразвуковая чистка", price: "от 5 000 ₽", note: "45 мин" },
      { name: "Микродермабразия", price: "от 6 000 ₽", note: "лицо" },
      { name: "Лазерная фотомолодость", price: "от 12 000 ₽", note: "лицо" },
    ],
  },
  {
    id: "spa",
    num: "06",
    title: "СПА",
    subtitle: "Ритуалы восстановления",
    items: [
      { name: "Классический массаж тела", price: "от 5 000 ₽", note: "60 мин" },
      { name: "Расслабляющий массаж", price: "от 5 500 ₽", note: "60 мин" },
      { name: "Ароматерапевтический ритуал", price: "от 7 500 ₽", note: "90 мин" },
      { name: "Обёртывание (шоколад / водоросли)", price: "от 6 500 ₽", note: "60 мин" },
      { name: "Скраб + массаж", price: "от 8 000 ₽", note: "90 мин" },
      { name: "Стоун-массаж", price: "от 7 000 ₽", note: "70 мин" },
      { name: "Тайский массаж", price: "от 7 500 ₽", note: "90 мин" },
      { name: "SPA-программа на день", price: "от 18 000 ₽", note: "4–6 часов" },
      { name: "Детокс-программа", price: "от 12 000 ₽", note: "индивидуально" },
    ],
  },
];

function PriceCategory({ cat }: { cat: typeof priceCategories[number] }) {
  const [open, setOpen] = useState(false);

  return (
    <section className="border-b border-black/10">
      <div className="max-w-7xl mx-auto px-6 md:px-16">
        <button
          onClick={() => setOpen(!open)}
          className="w-full py-10 flex items-center justify-between group"
        >
          <div className="flex items-center gap-8">
            <span className="text-xs font-mono text-black/30">{cat.num}</span>
            <div className="text-left">
              <p className="text-[10px] uppercase tracking-[0.4em] text-black/40 mb-1">{cat.subtitle}</p>
              <h2 className="font-extralight tracking-[-0.03em] text-3xl md:text-4xl text-black group-hover:translate-x-1 transition-transform duration-300">
                {cat.title}
              </h2>
            </div>
          </div>
          <motion.div
            animate={{ rotate: open ? 180 : 0 }}
            transition={{ duration: 0.3 }}
            className="shrink-0 ml-6"
          >
            <ChevronDown size={20} className="text-black/40" />
          </motion.div>
        </button>

        <motion.div
          initial={false}
          animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="overflow-hidden"
        >
          <div className="pb-12">
            <div className="border-t border-black/10">
              {cat.items.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.04 }}
                  className="flex items-center justify-between py-5 border-b border-black/5 group/row hover:bg-black/[0.02] px-2 -mx-2 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <span className="text-[9px] font-mono text-black/20 w-5 shrink-0">{String(i + 1).padStart(2, "0")}</span>
                    <span className="text-base md:text-lg font-light text-black">{item.name}</span>
                    <span className="text-[9px] uppercase tracking-[0.25em] text-black/30 bg-black/5 px-2 py-1 hidden sm:inline">
                      {item.note}
                    </span>
                  </div>
                  <span className="text-sm md:text-base font-light text-black/70 ml-4 shrink-0">{item.price}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default function Price() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  return (
    <div className="bg-[#F1EBE3] text-black">
      <section ref={heroRef} className="relative h-[80vh] overflow-hidden bg-black text-white">
        <motion.video
          src="/images/services-reel.mp4"
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-60"
          style={{ y, scale: 1.08 }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-transparent to-black/65" />
        <div className="relative z-10 h-full flex flex-col justify-end px-6 md:px-16 pb-20">
          <div className="max-w-7xl mx-auto w-full">
            <FadeIn>
              <span className="text-[10px] uppercase tracking-[0.4em] text-white/60">
                — Прайс-лист · 6 направлений
              </span>
            </FadeIn>
            <h1 className="mt-6 font-extralight tracking-[-0.04em] leading-[0.85] text-[clamp(3.5rem,12vw,12rem)]">
              <SplitText text="Прайс." />
            </h1>
            <FadeIn delay={0.4}>
              <p className="mt-8 max-w-xl text-base md:text-lg font-light text-white/60 leading-relaxed">
                Актуальные цены на все услуги. Точная стоимость рассчитывается
                на консультации — индивидуально для каждого гостя.
              </p>
            </FadeIn>
          </div>
        </div>
      </section>

      <div className="bg-[#1A1A1A] text-white py-6 border-y border-white/10">
        <Marquee
          text="ПРАЙС-ЛИСТ · PRICE LIST · ТАРИФЫ · TARIFF · "
          speed={40}
          className="text-xl md:text-3xl font-extralight uppercase tracking-[0.3em]"
        />
      </div>

      <div className="border-t border-black/10">
        {priceCategories.map((cat) => (
          <PriceCategory key={cat.id} cat={cat} />
        ))}
      </div>

      <section className="py-24 md:py-32 px-6 md:px-16 bg-[#F1EBE3]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div>
            <p className="text-[10px] uppercase tracking-[0.4em] text-black/40 mb-4">— Индивидуальный подбор</p>
            <h2 className="font-extralight tracking-[-0.03em] text-3xl md:text-5xl text-black leading-tight">
              Не знаете, что выбрать?<br />Мы поможем.
            </h2>
            <p className="mt-6 text-sm font-light text-black/50 max-w-md leading-relaxed">
              Наши специалисты бесплатно проконсультируют и подберут оптимальный протокол
              именно для вас — с учётом особенностей и пожеланий.
            </p>
          </div>
          <Link
            href="/contacts"
            className="shrink-0 px-10 py-5 bg-black text-white text-xs font-semibold uppercase tracking-widest hover:bg-black/80 transition-colors"
          >
            Записаться на консультацию
          </Link>
        </div>
      </section>
    </div>
  );
}
