import { motion } from "framer-motion";
import { useState } from "react";
import { Plus } from "lucide-react";
import {
  SplitText,
  FadeIn,
  Marquee,
  ImageReveal,
} from "@/components/ui-extras/animations";
import service1 from "@assets/images/service-1.png";
import service2 from "@assets/images/service-2.png";
import service3 from "@assets/images/service-3.png";
import service4 from "@assets/images/service-4.png";

const categories = [
  {
    num: "01",
    title: "Эстетическая медицина",
    subtitle: "Инъекционные процедуры",
    img: service1,
    items: [
      { name: "Мезотерапия", price: "от 7 500 ₽" },
      { name: "Инъекции миорелаксантов", price: "от 12 000 ₽" },
      { name: "Биоревитализация", price: "от 14 500 ₽" },
      { name: "Контурная пластика", price: "от 22 000 ₽" },
    ],
  },
  {
    num: "02",
    title: "Косметология",
    subtitle: "Уход за лицом",
    img: service2,
    items: [
      { name: "Уходовые процедуры для лица", price: "от 6 500 ₽" },
      { name: "Классический массаж лица", price: "от 4 500 ₽" },
      { name: "Пилинги", price: "от 5 500 ₽" },
      { name: "Чистка лица", price: "от 7 000 ₽" },
    ],
  },
  {
    num: "03",
    title: "Волосы и стилистика",
    subtitle: "Парикмахерские услуги",
    img: service3,
    items: [
      { name: "Окрашивание", price: "от 8 500 ₽" },
      { name: "Укладка", price: "от 3 500 ₽" },
      { name: "Свадебная причёска", price: "от 12 000 ₽" },
      { name: "Шитьё седины", price: "от 6 500 ₽" },
    ],
  },
  {
    num: "04",
    title: "Ногтевой сервис",
    subtitle: "Маникюр и педикюр",
    img: service4,
    items: [
      { name: "Педикюр для дам", price: "от 4 500 ₽" },
      { name: "Наращивание ногтей", price: "от 5 500 ₽" },
      { name: "Маникюр для дам", price: "от 3 500 ₽" },
      { name: "Маникюр / педикюр для господ", price: "от 4 000 ₽" },
    ],
  },
];

function Category({ cat, index }: { cat: typeof categories[number]; index: number }) {
  const [open, setOpen] = useState<number | null>(null);
  const reverse = index % 2 === 1;

  return (
    <section className={`border-b border-black/10 ${index === 0 ? "border-t" : ""}`}>
      <div className="max-w-7xl mx-auto px-6 md:px-16 py-24 md:py-32">
        <div className={`grid md:grid-cols-12 gap-12 md:gap-16 ${reverse ? "md:[direction:rtl]" : ""}`}>
          <div className="md:col-span-5 md:[direction:ltr]">
            <ImageReveal src={cat.img} alt={cat.title} className="aspect-[4/5] w-full rounded-2xl" />
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
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Services() {
  return (
    <div className="bg-[#F1EBE3] text-black">
      <section className="pt-40 md:py-56 pb-24 px-6 md:px-16 bg-[#F1EBE3]">
        <div className="max-w-7xl mx-auto">
          <FadeIn>
            <span className="text-[10px] uppercase tracking-[0.4em] text-black/50">
              — Услуги · 04 направления
            </span>
          </FadeIn>
          <h1 className="mt-8 font-extralight tracking-[-0.04em] leading-[0.9] text-[clamp(3rem,11vw,11rem)]">
            <SplitText text="Услуги." />
          </h1>
          <FadeIn delay={0.4}>
            <p className="mt-12 max-w-xl text-base md:text-lg font-light text-black/60 leading-relaxed">
              Полный спектр услуг премиум-класса — от классической косметологии
              до инновационной эстетической медицины.
            </p>
          </FadeIn>
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
