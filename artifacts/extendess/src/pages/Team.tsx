import { motion } from "framer-motion";
import { useState } from "react";
import { Link } from "wouter";
import { ArrowUpRight } from "lucide-react";
import {
  SplitText,
  FadeIn,
  Marquee,
  StaggerContainer,
  StaggerItem,
} from "@/components/ui-extras/animations";
import team1 from "@assets/images/team-1.png";
import team2 from "@assets/images/team-2.png";
import team3 from "@assets/images/team-3.png";

const members = [
  {
    num: "01",
    name: "Мартемьянов Виталий Ибрахимович",
    role: "Арт-менеджер · Топ-стилист",
    studio: "Салон у метро Пушкинская",
    img: team1,
    bio: "Топ-стилист со стажем работы в сети Extendess 18 лет. Стажировки в Париже, регулярные мастер-классы по стрижкам и колористике. Участие в показах на неделе высокой моды в Москве.",
    skills: ["Женская стрижка", "Мужская стрижка", "Окрашивание", "Процедуры для волос"],
  },
  {
    num: "02",
    name: "Петрачкова Ольга Петровна",
    role: "Топ-стилист · Колорист",
    studio: "Салон у метро Маяковская",
    img: team2,
    bio: "30 лет в профессии, регулярные стажировки в Париже. Огромный опыт позволяет провести грамотный анализ состояния волос и подобрать индивидуальный протокол окрашивания.",
    skills: ["Мелирование", "Колористика", "Уход за волосами"],
  },
  {
    num: "03",
    name: "Кумашкова Елена Александровна",
    role: "Топ-стилист",
    studio: "Салон у метро Маяковская",
    img: team3,
    bio: "Стаж работы парикмахером 35 лет, из них 25 лет в салоне Extendess. Обучение в школе Extendess в Париже и в академии L'Oréal в Москве.",
    skills: ["Окрашивание", "Калифорнийское мелирование", "Уход"],
  },
];

export default function Team() {
  const [active, setActive] = useState(0);

  return (
    <div className="bg-[#F1EBE3] text-black">
      <section className="pt-40 md:pt-56 pb-24 px-6 md:px-16">
        <div className="max-w-7xl mx-auto">
          <FadeIn>
            <span className="text-[10px] uppercase tracking-[0.4em] text-black/50">
              — Команда · Топ-стилисты
            </span>
          </FadeIn>
          <h1 className="mt-8 font-extralight tracking-[-0.04em] leading-[0.9] text-[clamp(3rem,11vw,11rem)]">
            <SplitText text="Мастера." />
          </h1>
          <FadeIn delay={0.4}>
            <p className="mt-12 max-w-xl text-base md:text-lg font-light text-black/60 leading-relaxed">
              Парикмахеры, колористы, косметологи и визажисты с десятилетиями
              опыта и регулярными стажировками в Париже.
            </p>
          </FadeIn>
        </div>
      </section>

      <div className="bg-[#1A1A1A] text-white py-6 border-y border-white/10">
        <Marquee
          text="STYLISTS · COLORISTS · ARTISTS · MASTERS · "
          speed={40}
          className="text-xl md:text-3xl font-extralight uppercase tracking-[0.3em]"
        />
      </div>

      {/* Featured master interactive */}
      <section className="py-24 md:py-32 px-6 md:px-16 border-b border-black/10">
        <div className="max-w-7xl mx-auto grid md:grid-cols-12 gap-12">
          <div className="md:col-span-5 relative">
            <div className="aspect-[3/4] overflow-hidden bg-black/5 relative">
              {members.map((m, i) => (
                <motion.img
                  key={i}
                  src={m.img}
                  alt={m.name}
                  className="absolute inset-0 h-full w-full object-cover"
                  initial={false}
                  animate={{
                    opacity: active === i ? 1 : 0,
                    scale: active === i ? 1 : 1.1,
                  }}
                  transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                />
              ))}
            </div>
          </div>
          <div className="md:col-span-7 flex flex-col justify-center">
            {members.map((m, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                onMouseEnter={() => setActive(i)}
                className="group text-left border-t border-black/10 py-8 last:border-b transition-colors"
              >
                <div className="flex items-start justify-between gap-6">
                  <div>
                    <div className="flex items-center gap-6 mb-4">
                      <span className="text-xs font-mono opacity-40">{m.num}</span>
                      <span className="text-[10px] uppercase tracking-[0.3em] opacity-50">
                        {m.role}
                      </span>
                    </div>
                    <h3 className={`text-2xl md:text-4xl font-extralight tracking-[-0.02em] transition-opacity duration-500 ${active === i ? "opacity-100" : "opacity-30"}`}>
                      {m.name}
                    </h3>
                    <motion.div
                      initial={false}
                      animate={{
                        height: active === i ? "auto" : 0,
                        opacity: active === i ? 1 : 0,
                      }}
                      transition={{ duration: 0.5 }}
                      className="overflow-hidden"
                    >
                      <p className="mt-6 text-base font-light text-black/60 leading-relaxed max-w-xl">
                        {m.bio}
                      </p>
                      <div className="mt-6 flex flex-wrap gap-2">
                        {m.skills.map((s) => (
                          <span
                            key={s}
                            className="text-[10px] uppercase tracking-[0.2em] border border-black/20 px-3 py-2"
                          >
                            {s}
                          </span>
                        ))}
                      </div>
                      <div className="mt-4 text-xs uppercase tracking-[0.3em] opacity-50">
                        {m.studio}
                      </div>
                    </motion.div>
                  </div>
                  <ArrowUpRight
                    size={28}
                    className={`flex-shrink-0 transition-all duration-500 ${active === i ? "rotate-45 opacity-100" : "opacity-30"}`}
                  />
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 md:py-32 px-6 md:px-16 bg-[#F1EBE3] text-black">
        <div className="max-w-7xl mx-auto">
          <FadeIn>
            <span className="text-[10px] uppercase tracking-[0.4em] text-white/50">
              — Школа Extendess
            </span>
          </FadeIn>
          <StaggerContainer className="mt-16 grid md:grid-cols-3 gap-12">
            {[
              { num: "01", t: "Стажировки в Париже", d: "Каждый мастер сети проходит регулярное обучение в школе Extendess в Париже." },
              { num: "02", t: "Академия L'Oréal", d: "Партнёрская программа с академией L'Oréal в Москве — постоянное повышение квалификации." },
              { num: "03", t: "Внутренние мастер-классы", d: "Топ-стилисты сети проводят внутренние обучения для всех специалистов салонов." },
            ].map((x) => (
              <StaggerItem key={x.num}>
                <div className="border-t border-white/20 pt-6">
                  <span className="text-xs font-mono opacity-50">{x.num}</span>
                  <h4 className="mt-4 text-xl md:text-2xl font-light">{x.t}</h4>
                  <p className="mt-4 text-sm font-light text-white/60 leading-relaxed">{x.d}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
          <FadeIn delay={0.4}>
            <Link
              href="/contacts"
              className="mt-16 inline-flex items-center gap-3 border border-white/30 backdrop-blur-xl bg-white/5 px-8 py-5 text-xs uppercase tracking-[0.3em] hover:bg-white hover:text-black transition-all duration-500"
            >
              Записаться к мастеру <ArrowUpRight size={16} />
            </Link>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
