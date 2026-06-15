import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import {
  SplitText,
  FadeIn,
  AnimatedCounter,
  StaggerContainer,
  StaggerItem,
  ImageReveal,
  Marquee,
} from "@/components/ui-extras/animations";
import heroImg from "@assets/images/hero.png";
import gallery1 from "@assets/images/gallery-1.png";
import highlightImg from "@assets/images/highlight.png";
import { Sculpture3D } from "@/components/Sculpture3D";

const philosophy = [
  {
    title: "Системный подход",
    text: "Мы объединяем эстетику, медицину и уход, создавая персональные решения для комплексной и последовательной работы с внешностью.",
  },
  {
    title: "Прогнозируемый результат",
    text: "Каждая процедура основана на клиническом опыте и профессиональных протоколах и приводит к результату, соответствующему ожиданиям.",
  },
  {
    title: "Деликатный сервис",
    text: "В основе нашего подхода — внимание к деталям, уважение к личному пространству и индивидуальным особенностям, и безупречный уровень сервиса без избыточности.",
  },
  {
    title: "Премиальные бренды и технологии",
    text: "Мы работаем с ведущими мировыми брендами и инновационными методиками, которые доказали свою эффективность и безопасность.",
  },
];

const timeline = [
  { year: "1954", title: "Основание", text: "Extendess появляется на мировом рынке как атeлье парикмахерского искусства в Париже." },
  { year: "1999", title: "Лаборатория", text: "Открытие собственной научно-исследовательской лаборатории по разработке премиальной косметики." },
  { year: "2007", title: "Москва", text: "Первый салон Extendess в Москве — у метро Маяковская. Старт российской сети." },
  { year: "2026", title: "Сегодня", text: "400 салонов в 47 странах. Сеть премиум-салонов с собственной школой и академией." },
];

export default function About() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);

  return (
    <div className="bg-[#F1EBE3] text-black">
      <section ref={ref} className="relative h-[80vh] overflow-hidden bg-black text-white">
        <motion.img
          src={heroImg}
          alt=""
          className="absolute inset-0 h-full w-full object-cover opacity-50"
          style={{ y, scale: 1.15 }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/5 to-black/35" />
        <div className="relative z-10 h-full flex flex-col justify-end px-6 md:px-16 pb-20">
          <div className="max-w-7xl mx-auto w-full">
            <h1 className="mt-6 font-extralight tracking-[-0.04em] leading-[0.9] text-[clamp(2.5rem,7vw,7rem)]">
              <SplitText text="Extendess — новое поколение заботы о себе" />
            </h1>
          </div>
        </div>
      </section>

      <div className="bg-black text-white py-6 border-y border-black/10">
        <Marquee
          text="HERITAGE · SCIENCE · CRAFT · MOSCOW · BEAUTY · WELLNESS · "
          speed={50}
          className="text-xl md:text-3xl font-extralight uppercase tracking-[0.3em]"
        />
      </div>

      <section className="py-16 md:py-24 px-6 md:px-16">
        <div className="max-w-7xl mx-auto grid md:grid-cols-12 gap-12">
          <div className="md:col-span-5">
            <span className="text-[10px] uppercase tracking-[0.4em] text-black/50">— Кто мы</span>
            <h2 className="mt-6 font-extralight tracking-[-0.02em] leading-[1.05] text-3xl md:text-5xl">
              <SplitText text="EXTENDESS —" />
              <SplitText text="экосистема красоты" delay={0.1} />
              <SplitText text="и здоровья нового" delay={0.2} />
              <SplitText text="поколения." delay={0.3} />
            </h2>
          </div>
          <div className="md:col-span-7 md:pt-8">
            <FadeIn delay={0.3}>
              <p className="text-base md:text-lg font-light text-black/60 leading-relaxed">
                Мы сохранили команду, стандарты и экспертизу, которым доверяли годами, и расширили возможности бренда, объединив профессиональный beauty-сервис, эстетическую медицину и современные технологии.
              </p>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* SCULPTURE + PHILOSOPHY */}
      <section className="bg-[#F1EBE3] py-0 md:py-8 px-6 md:px-16">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-0 md:gap-16 items-center">
          {/* 3D sculpture */}
          <div className="w-full">
            <Sculpture3D />
          </div>
          {/* Philosophy */}
          <div className="py-16 md:py-0">
            <FadeIn>
              <span className="text-[10px] uppercase tracking-[0.4em] text-black/50">— Философия бренда</span>
            </FadeIn>
            <StaggerContainer className="mt-10 space-y-0">
              {philosophy.map((item, i) => (
                <StaggerItem key={i}>
                  <div className="border-t border-black/10 py-7">
                    <h3 className="text-sm uppercase tracking-[0.2em] text-black font-light mb-3">{item.title}</h3>
                    <p className="text-sm font-light text-black/55 leading-relaxed max-w-md">{item.text}</p>
                  </div>
                </StaggerItem>
              ))}
              <div className="border-t border-black/10" />
            </StaggerContainer>
          </div>
        </div>
      </section>


      <section className="py-32 md:py-48 px-6 md:px-16">
        <div className="max-w-7xl mx-auto">
          <FadeIn>
            <span className="text-[10px] uppercase tracking-[0.4em] text-black/50">— Хронология</span>
          </FadeIn>
          <div className="mt-16 space-y-0">
            {timeline.map((item, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div className="border-t border-black/10 py-10 grid md:grid-cols-12 gap-6 group hover:bg-black hover:text-white transition-colors duration-700 px-4 md:px-8 -mx-4 md:-mx-8">
                  <div className="md:col-span-2 text-3xl md:text-5xl font-extralight tracking-tight">
                    {item.year}
                  </div>
                  <div className="md:col-span-3 text-xs uppercase tracking-[0.3em] md:pt-4 opacity-70">
                    {item.title}
                  </div>
                  <div className="md:col-span-7 text-base md:text-lg font-light leading-relaxed opacity-80 max-w-2xl">
                    {item.text}
                  </div>
                </div>
              </FadeIn>
            ))}
            <div className="border-t border-black/10" />
          </div>
        </div>
      </section>

      <section className="px-6 md:px-16 pb-32">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-6">
          <ImageReveal src={gallery1} alt="" className="aspect-[4/5] w-full rounded-2xl" />
          <ImageReveal src={highlightImg} alt="" className="aspect-[4/5] w-full mt-12 md:mt-32 rounded-2xl" direction="bottom" />
        </div>
      </section>
    </div>
  );
}
