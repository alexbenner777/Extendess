import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import { FadeIn } from "../ui-extras/animations";

const faqs = [
  {
    q: "Какие средства по уходу за кожей вы используете?",
    a: "Мы работаем с ведущими мировыми брендами профессиональной косметики, сертифицированными для применения в салонах красоты. Все средства подбираются индивидуально под тип кожи и задачи конкретной процедуры.",
  },
  {
    q: "Есть ли медицинская лицензия на услуги косметологии?",
    a: "Медицинские процедуры выполняются по лицензии в соответствии с Законом о лицензировании медицинской деятельности. Все врачи-косметологи имеют профильные сертификаты и регулярно проходят повышение квалификации.",
  },
  {
    q: "Какие услуги по уходу за волосами вы предлагаете?",
    a: "Полный спектр парикмахерских услуг: стрижки любой сложности, окрашивание, шитьё седины, балаяж, мелирование, укладки и восстановительные уходовые процедуры для волос от ведущих профессиональных брендов.",
  },
  {
    q: "Можно ли приобрести подарочный сертификат?",
    a: "Да, подарочные сертификаты доступны в любом из наших шести салонов. Их можно оформить на конкретную услугу или на произвольную сумму — отличный подарок для близких.",
  },
  {
    q: "Есть ли у вас программа лояльности для постоянных клиентов?",
    a: "Да, в EXTENDESS действует программа лояльности для постоянных гостей с накопительными бонусами и привилегиями. Уточните детали у администратора при визите или по единому номеру салона.",
  },
];

export function FAQSection() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="py-28 md:py-40 px-6 md:px-16">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-12 gap-12 md:gap-20">

          <div className="md:col-span-4">
            <FadeIn>
              <span className="text-[9px] uppercase tracking-[0.45em] text-black/30 block mb-5">— FAQ</span>
              <h2 className="font-extralight tracking-[-0.03em] leading-[1] text-5xl md:text-6xl">
                Часто задаваемые вопросы
              </h2>
            </FadeIn>
          </div>

          <div className="md:col-span-8">
            {faqs.map((faq, i) => (
              <div key={i} className="border-t border-[#C9B7A2]/50 last:border-b">
                <button
                  onClick={() => setOpen(open === i ? null : i)}
                  className="w-full flex items-center justify-between py-7 text-left gap-6 group"
                >
                  <span className={`font-light text-base md:text-lg transition-colors duration-300 ${open === i ? "text-[#5E4B3A]" : "text-black/75 group-hover:text-black"}`}>
                    {faq.q}
                  </span>
                  <span className={`flex-shrink-0 w-7 h-7 border flex items-center justify-center transition-all duration-300 ${open === i ? "border-[#5E4B3A] text-[#5E4B3A]" : "border-black/15 text-black/40 group-hover:border-black/40"}`}>
                    {open === i ? <Minus size={13} /> : <Plus size={13} />}
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {open === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.76, 0, 0.24, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="pb-7 text-sm md:text-base font-light text-black/55 leading-relaxed max-w-2xl">
                        {faq.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
