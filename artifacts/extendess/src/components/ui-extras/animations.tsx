import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion";
import { useLocation } from "wouter";

// Magnetic Cursor
export function MagneticCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  
  const springConfig = { damping: 25, stiffness: 300, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      cursorX.set(e.clientX - 16);
      cursorY.set(e.clientY - 16);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName.toLowerCase() === 'a' || 
          target.tagName.toLowerCase() === 'button' ||
          target.closest('a') || 
          target.closest('button')) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mouseover", handleMouseOver);
    
    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [cursorX, cursorY]);

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 rounded-full border border-primary pointer-events-none z-[9999] mix-blend-difference hidden md:block"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          scale: isHovering ? 2 : 1,
          backgroundColor: isHovering ? 'var(--color-primary)' : 'transparent',
          opacity: isHovering ? 0.5 : 1
        }}
      />
      <div 
        className="fixed top-0 left-0 w-2 h-2 bg-primary rounded-full pointer-events-none z-[10000] mix-blend-difference hidden md:block"
        style={{
          transform: `translate3d(${mousePosition.x - 4}px, ${mousePosition.y - 4}px, 0)`,
          opacity: isHovering ? 0 : 1
        }}
      />
    </>
  );
}

// Page Transition Wrapper
export function PageTransition({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location}
        initial={{ opacity: 0, filter: "blur(10px)", scale: 0.98 }}
        animate={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
        exit={{ opacity: 0, filter: "blur(10px)", scale: 1.02 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="min-h-screen"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

// Split Text Animation
export function SplitText({ 
  text, 
  className = "", 
  delay = 0 
}: { 
  text: string; 
  className?: string;
  delay?: number;
}) {
  const words = text.split(" ");
  
  return (
    <div className={`flex flex-wrap overflow-hidden ${className}`}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          className="mr-[0.25em] inline-block"
          initial={{ y: "100%", opacity: 0, rotate: 5 }}
          whileInView={{ y: 0, opacity: 1, rotate: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1],
            delay: delay + i * 0.05
          }}
        >
          {word}
        </motion.span>
      ))}
    </div>
  );
}

// Image Reveal Animation
export function ImageReveal({ 
  src, 
  alt = "", 
  className = "", 
  imgClassName = "",
  objectFit = "cover",
  direction = "bottom" 
}: { 
  src: string; 
  alt?: string;
  className?: string;
  imgClassName?: string;
  objectFit?: "cover" | "contain";
  direction?: "left" | "right" | "top" | "bottom";
}) {
  const variants = {
    hidden: {
      clipPath: direction === "left" ? "inset(0 100% 0 0)" :
                direction === "right" ? "inset(0 0 0 100%)" :
                direction === "top" ? "inset(100% 0 0 0)" :
                "inset(0 0 100% 0)",
      scale: objectFit === "contain" ? 1 : 1.1
    },
    visible: {
      clipPath: "inset(0 0 0 0)",
      scale: 1,
      transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1] }
    }
  };

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <motion.img
        src={src}
        alt={alt}
        className={`w-full h-full ${imgClassName}`}
        style={{ objectFit }}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-10%" }}
        variants={variants}
      />
    </div>
  );
}

// Marquee Animation
export function Marquee({ 
  text, 
  speed = 20, 
  className = "" 
}: { 
  text: string; 
  speed?: number;
  className?: string;
}) {
  return (
    <div className={`overflow-hidden whitespace-nowrap flex ${className}`}>
      <motion.div
        className="flex whitespace-nowrap"
        animate={{ x: ["0%", "-50%"] }}
        transition={{
          ease: "linear",
          duration: speed,
          repeat: Infinity,
        }}
      >
        <span className="px-4">{text}</span>
        <span className="px-4">{text}</span>
        <span className="px-4">{text}</span>
        <span className="px-4">{text}</span>
      </motion.div>
    </div>
  );
}

// Scroll Progress
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-primary origin-left z-[100]"
      style={{ scaleX }}
    />
  );
}

// Noise Overlay
export function NoiseOverlay() {
  return (
    <div 
      className="fixed inset-0 pointer-events-none z-[9998] opacity-[0.03] mix-blend-overlay"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
      }}
    />
  );
}

// Animated Counter — triggers when scrolled into view
export function AnimatedCounter({ 
  value, 
  duration = 2 
}: { 
  value: number; 
  duration?: number;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const hasRun = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasRun.current) {
          hasRun.current = true;
          let startTime: number;
          let animationFrame: number;

          const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

          const animate = (timestamp: number) => {
            if (!startTime) startTime = timestamp;
            const raw = (timestamp - startTime) / (duration * 1000);
            const progress = Math.min(raw, 1);
            setCount(Math.floor(value * easeOut(progress)));
            if (progress < 1) {
              animationFrame = requestAnimationFrame(animate);
            } else {
              setCount(value);
            }
          };

          animationFrame = requestAnimationFrame(animate);
          return () => cancelAnimationFrame(animationFrame);
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [value, duration]);
  
  return <span ref={ref}>{count}</span>;
}

export function FadeIn({ 
  children, 
  delay = 0, 
  direction = "up", 
  className = "" 
}: { 
  children: React.ReactNode; 
  delay?: number; 
  direction?: "up" | "down" | "left" | "right" | "none";
  className?: string;
}) {
  const getDirectionOffset = () => {
    switch (direction) {
      case "up": return { y: 40 };
      case "down": return { y: -40 };
      case "left": return { x: 40 };
      case "right": return { x: -40 };
      case "none": return {};
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, ...getDirectionOffset() }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{
        duration: 0.8,
        delay,
        ease: [0.22, 1, 0.36, 1]
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function StaggerContainer({ 
  children, 
  className = "",
  delayChildren = 0.2,
  staggerChildren = 0.1
}: { 
  children: React.ReactNode; 
  className?: string;
  delayChildren?: number;
  staggerChildren?: number;
}) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-10%" }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            delayChildren,
            staggerChildren
          }
        }
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({ 
  children, 
  className = "" 
}: { 
  children: React.ReactNode; 
  className?: string;
}) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { 
          opacity: 1, 
          y: 0,
          transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
        }
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}