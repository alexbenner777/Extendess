import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import {
  SplitText,
  FadeIn,
  Marquee,
  ImageReveal,
} from "@/components/ui-extras/animations";
import g1 from "@assets/images/gallery-1.png";
import g2 from "@assets/images/gallery-2.png";
import g3 from "@assets/images/gallery-3.png";
import g4 from "@assets/images/gallery-4.png";
import g5 from "@assets/images/gallery-5.png";
import g6 from "@assets/images/gallery-6.png";
import hero from "@assets/images/hero.png";
import highlight from "@assets/images/highlight.png";

const items = [
  { src: g1, label: "Atelier · Moscow", aspect: "aspect-[3/4]" },
  { src: g2, label: "Skincare · Studio", aspect: "aspect-[4/5]" },
  { src: g3, label: "Color · Lab", aspect: "aspect-[3/4]" },
  { src: g4, label: "Skin · Closeup", aspect: "aspect-[4/5]" },
  { src: g5, label: "Products · Still life", aspect: "aspect-[3/4]" },
  { src: g6, label: "Hands · Detail", aspect: "aspect-[4/5]" },
  { src: hero, label: "Portrait · Editorial", aspect: "aspect-[3/4]" },
  { src: highlight, label: "Vivace · Treatment", aspect: "aspect-[4/5]" },
];

function ParallaxItem({ src, label, aspect, i }: { src: string; label: string; aspect: string; i: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], i % 2 === 0 ? ["0%", "-20%"] : ["0%", "20%"]);

  return (
    <motion.div ref={ref} className={`${aspect} overflow-hidden relative group`} style={{ y }}>
      <ImageReveal src={src} alt={label} className="h-full w-full" imgClassName="group-hover:scale-110 transition-transform duration-1000" />
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500 backdrop-blur-0 group-hover:backdrop-blur-[2px]" />
      <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 translate-y-2 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
        <span className="text-[10px] uppercase tracking-[0.3em] text-white bg-black/40 backdrop-blur-xl px-3 py-2">
          {label}
        </span>
      </div>
    </motion.div>
  );
}

export default function Gallery() {
  return (
    <div className="bg-white text-black">
      <section className="pt-40 md:pt-56 pb-16 px-6 md:px-16">
        <div className="max-w-7xl mx-auto">
          <FadeIn>
            <span className="text-[10px] uppercase tracking-[0.4em] text-black/50">
              — Атмосфера
            </span>
          </FadeIn>
          <h1 className="mt-8 font-extralight tracking-[-0.04em] leading-[0.9] text-[clamp(3rem,11vw,11rem)]">
            <SplitText text="Галерея." />
          </h1>
        </div>
      </section>

      <div className="bg-black text-white py-6 border-y border-white/10">
        <Marquee
          text="ATELIER · MOMENTS · DETAILS · TEXTURE · LIGHT · "
          speed={45}
          className="text-xl md:text-3xl font-extralight uppercase tracking-[0.3em]"
        />
      </div>

      <section className="px-6 md:px-16 py-16 md:py-24">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {items.map((it, i) => (
            <ParallaxItem key={i} {...it} i={i} />
          ))}
        </div>
      </section>

      <section className="bg-black text-white py-32 md:py-48 px-6 md:px-16">
        <div className="max-w-5xl mx-auto text-center">
          <FadeIn>
            <span className="text-[10px] uppercase tracking-[0.4em] text-white/50">— Visit us</span>
          </FadeIn>
          <h2 className="mt-6 font-extralight tracking-[-0.04em] leading-[0.95] text-[clamp(2.5rem,7vw,7rem)]">
            <SplitText text="Загляните" />
            <SplitText text="к нам." delay={0.1} />
          </h2>
        </div>
      </section>
    </div>
  );
}
