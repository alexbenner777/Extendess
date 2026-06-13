import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { SplitText, FadeIn, Marquee } from "@/components/ui-extras/animations";
import { Salons as SalonsSection } from "@/components/sections/Salons";
import heroImg from "@assets/images/hero.png";

export default function Salons() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);

  return (
    <div className="bg-[#F1EBE3] text-black">
      <section ref={ref} className="relative h-[60vh] overflow-hidden bg-black text-white">
        <motion.img
          src={heroImg}
          alt=""
          className="absolute inset-0 h-full w-full object-cover opacity-40"
          style={{ y, scale: 1.15 }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black" />
        <div className="relative z-10 h-full flex flex-col justify-end px-6 md:px-16 pb-20">
          <div className="max-w-7xl mx-auto w-full">
            <FadeIn>
              <span className="text-[10px] uppercase tracking-[0.4em] text-white/60">— Наши адреса · 6 салонов в Москве</span>
            </FadeIn>
            <h1 className="mt-6 font-extralight tracking-[-0.04em] leading-[0.85] text-[clamp(3.5rem,12vw,12rem)]">
              <SplitText text="Салоны." />
            </h1>
          </div>
        </div>
      </section>

      <div className="bg-[#1A1A1A] text-white py-6 border-y border-white/10">
        <Marquee
          text="МОСКВА · ПАТРИАРШИЕ · САДОВАЯ · КИЕВСКАЯ · ЖУКОВКА · ЛЕНИНСКИЙ · ЗУБОВСКИЙ · "
          speed={45}
          className="text-xl md:text-3xl font-extralight uppercase tracking-[0.3em]"
        />
      </div>

      <SalonsSection />
    </div>
  );
}
