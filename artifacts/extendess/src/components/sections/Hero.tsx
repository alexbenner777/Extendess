import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { FadeIn } from "../ui-extras/animations";
import heroImg from "@assets/images/hero.png";

export function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  const scrollToBooking = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    document.querySelector("#booking")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section ref={ref} className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
      {/* Background photo with parallax */}
      <motion.div
        className="absolute inset-0 z-0"
        style={{ y, opacity }}
      >
        <div className="absolute inset-0 bg-black/40 z-10" />
        <img
          src={heroImg}
          alt="Luxury Salon"
          className="w-full h-full object-cover object-center"
        />
      </motion.div>

      {/* Giant watermark brand text */}
      <motion.div
        className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none select-none"
        style={{ y: textY }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3.0, duration: 1.5 }}
      >
        <span
          className="text-white/10 font-sans font-extralight uppercase tracking-[0.12em] leading-none whitespace-nowrap"
          style={{ fontSize: "clamp(5rem, 20vw, 22rem)" }}
        >
          EXTENDESS
        </span>
      </motion.div>

      {/* Content */}
      <div className="container relative z-20 mx-auto px-6 flex flex-col items-center text-center mt-24">
        <FadeIn delay={3.2}>
          <span className="text-xs md:text-sm text-white/70 uppercase tracking-[0.35em] mb-8 block font-light">
            Парижский шик · Сердце Москвы
          </span>
        </FadeIn>

        <FadeIn delay={3.4}>
          <h1
            className="font-sans font-extralight text-white leading-[0.9] max-w-5xl mx-auto mb-10 uppercase tracking-[0.05em]"
            style={{ fontSize: "clamp(3.5rem, 11vw, 12rem)" }}
          >
            Наследие<br />
            <span className="italic font-thin opacity-70">красоты</span>
          </h1>
        </FadeIn>

        <FadeIn delay={3.6}>
          <p className="text-base md:text-lg lg:text-xl text-white/60 max-w-xl mx-auto mb-14 font-light tracking-wide leading-relaxed">
            Эволюция совершенства. Extendess — это не просто салон,<br className="hidden md:block" />
            это история, которую вы чувствуете в воздухе.
          </p>
        </FadeIn>

        <FadeIn delay={3.8}>
          <a
            href="#booking"
            onClick={scrollToBooking}
            className="group relative inline-flex items-center justify-center px-12 py-5 bg-white text-black text-xs font-medium uppercase tracking-[0.3em] overflow-hidden transition-all hover:text-white"
          >
            <span className="absolute inset-0 bg-black translate-y-[100%] group-hover:translate-y-0 transition-transform duration-500 ease-out" />
            <span className="relative z-10">Записаться</span>
          </a>
        </FadeIn>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 4, duration: 1 }}
      >
        <span className="text-[10px] text-white/40 uppercase tracking-[0.3em] font-light">Скролл</span>
        <div className="w-[1px] h-12 bg-white/20 relative overflow-hidden">
          <motion.div
            className="absolute top-0 left-0 w-full h-1/2 bg-white"
            animate={{ top: ["-50%", "100%"] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
          />
        </div>
      </motion.div>
    </section>
  );
}
