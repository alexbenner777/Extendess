import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, MapPin, Phone, Mail, Clock } from "lucide-react";
import {
  SplitText,
  FadeIn,
  Marquee,
  StaggerContainer,
  StaggerItem,
} from "@/components/ui-extras/animations";

const services = [
  "Эстетическая медицина",
  "Косметология",
  "Волосы и стилистика",
  "Ногтевой сервис",
  "Консультация",
];

const studios = [
  { name: "Маяковская", address: "Тверская улица, 18, Москва", phone: "+7 (495) 123-45-67" },
  { name: "Пушкинская", address: "Большая Дмитровка, 7, Москва", phone: "+7 (495) 123-45-68" },
  { name: "Ленинский", address: "Ленинский проспект, 45, Москва", phone: "+7 (495) 123-45-69" },
];

export default function Contacts() {
  const [submitted, setSubmitted] = useState(false);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
  }

  return (
    <div className="bg-[#F1EBE3] text-black">
      <section className="pt-40 md:pt-56 pb-16 px-6 md:px-16">
        <div className="max-w-7xl mx-auto">
          <FadeIn>
            <span className="text-[10px] uppercase tracking-[0.4em] text-black/50">— Запись · Контакты</span>
          </FadeIn>
          <h1 className="mt-8 font-extralight tracking-[-0.04em] leading-[0.9] text-[clamp(3rem,11vw,11rem)]">
            <SplitText text="Контакты." />
          </h1>
        </div>
      </section>

      <div className="bg-[#1A1A1A] text-white py-6 border-y border-white/10">
        <Marquee
          text="ЗАПИШИТЕСЬ · BOOK NOW · ПОЗВОНИТЕ · ATELIER · "
          speed={40}
          className="text-xl md:text-3xl font-extralight uppercase tracking-[0.3em]"
        />
      </div>

      {/* Booking form */}
      <section className="py-24 md:py-32 px-6 md:px-16 border-b border-black/10">
        <div className="max-w-7xl mx-auto grid md:grid-cols-12 gap-12">
          <div className="md:col-span-5">
            <FadeIn>
              <span className="text-[10px] uppercase tracking-[0.4em] text-black/50">— Запись онлайн</span>
              <h2 className="mt-6 font-extralight tracking-[-0.02em] leading-[1.05] text-3xl md:text-5xl">
                <SplitText text="Оставьте заявку —" />
                <SplitText text="мы свяжемся в течение часа." delay={0.15} />
              </h2>
              <p className="mt-8 text-sm font-light text-black/60 leading-relaxed max-w-md">
                Нажимая «Отправить», вы соглашаетесь с политикой конфиденциальности
                и даёте согласие на обработку персональных данных.
              </p>
            </FadeIn>
          </div>
          <div className="md:col-span-7">
            <form onSubmit={onSubmit} className="space-y-0">
              {[
                { name: "name", label: "Имя", type: "text" },
                { name: "phone", label: "Телефон", type: "tel" },
                { name: "email", label: "Email", type: "email" },
              ].map((field) => (
                <div key={field.name} className="border-b border-black/20 group">
                  <label className="block text-[10px] uppercase tracking-[0.3em] text-black/50 pt-6">
                    {field.label}
                  </label>
                  <input
                    type={field.type}
                    name={field.name}
                    required
                    className="w-full bg-transparent py-4 text-lg md:text-xl font-light outline-none placeholder:text-black/30"
                  />
                </div>
              ))}
              <div className="border-b border-black/20">
                <label className="block text-[10px] uppercase tracking-[0.3em] text-black/50 pt-6">Услуга</label>
                <select
                  name="service"
                  className="w-full bg-transparent py-4 text-lg md:text-xl font-light outline-none appearance-none"
                >
                  {services.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>
              <div className="border-b border-black/20">
                <label className="block text-[10px] uppercase tracking-[0.3em] text-black/50 pt-6">Комментарий</label>
                <textarea
                  name="message"
                  rows={3}
                  className="w-full bg-transparent py-4 text-lg md:text-xl font-light outline-none resize-none"
                />
              </div>

              <div className="pt-10">
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="group inline-flex items-center gap-4 bg-black text-white px-10 py-6 text-xs uppercase tracking-[0.3em] hover:bg-black/80 transition-colors"
                >
                  {submitted ? "Отправлено" : "Отправить"}
                  <ArrowUpRight size={16} className="transition-transform group-hover:rotate-45" />
                </motion.button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Studios */}
      <section className="py-24 md:py-32 px-6 md:px-16 bg-[#F1EBE3] text-black">
        <div className="max-w-7xl mx-auto">
          <FadeIn>
            <span className="text-[10px] uppercase tracking-[0.4em] text-white/50">— Студии в Москве</span>
          </FadeIn>
          <StaggerContainer className="mt-16 grid md:grid-cols-3 gap-8 md:gap-6">
            {studios.map((s) => (
              <StaggerItem key={s.name}>
                <div className="border border-white/15 backdrop-blur-2xl bg-white/5 p-8 md:p-10 hover:bg-white/10 transition-colors duration-500 h-full flex flex-col">
                  <span className="text-[10px] uppercase tracking-[0.3em] text-white/50">— Метро</span>
                  <h3 className="mt-2 text-3xl md:text-4xl font-extralight tracking-[-0.02em]">
                    {s.name}
                  </h3>
                  <div className="mt-8 space-y-4 text-sm font-light text-white/70 flex-1">
                    <div className="flex gap-3"><MapPin size={16} className="opacity-50 flex-shrink-0 mt-1" /><span>{s.address}</span></div>
                    <div className="flex gap-3"><Phone size={16} className="opacity-50 flex-shrink-0 mt-1" /><span>{s.phone}</span></div>
                    <div className="flex gap-3"><Clock size={16} className="opacity-50 flex-shrink-0 mt-1" /><span>10:00 — 22:00 · ежедневно</span></div>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>

          <div className="mt-16 grid md:grid-cols-3 gap-8 text-sm font-light">
            <div className="flex items-center gap-3"><Mail size={16} className="opacity-50" /><span>hello@extendess.ru</span></div>
            <div className="flex items-center gap-3"><Phone size={16} className="opacity-50" /><span>+7 (495) 123-45-67</span></div>
            <div className="flex items-center gap-3"><Clock size={16} className="opacity-50" /><span>Пн—Вс · 10:00 — 22:00</span></div>
          </div>
        </div>
      </section>

      {/* Map placeholder */}
      <section className="aspect-[16/9] md:aspect-[21/9] bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.05),rgba(0,0,0,0.15))] relative overflow-hidden border-y border-black/10">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <MapPin className="mx-auto opacity-30" size={48} />
            <p className="mt-4 text-xs uppercase tracking-[0.3em] text-black/40">Москва · Тверская · Пушкинская · Ленинский</p>
          </div>
        </div>
      </section>
    </div>
  );
}
