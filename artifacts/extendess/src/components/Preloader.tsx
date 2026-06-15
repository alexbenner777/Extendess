import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import logoUrl from "@assets/logo-big_1776857562328.png";

export function Preloader() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), 3800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
        >
          <div className="relative flex items-center justify-center" style={{ width: 360, height: 510 }}>
            <svg
              className="absolute inset-0 w-full h-full"
              viewBox="0 0 360 510"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <motion.rect
                x="1"
                y="1"
                width="358"
                height="508"
                stroke="white"
                strokeWidth="0.8"
                fill="none"
                initial={{ pathLength: 0, opacity: 0.4 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 2.4, ease: [0.76, 0, 0.24, 1] }}
              />
            </svg>

            <div className="relative flex flex-col items-center gap-8 px-8">
              <motion.img
                src={logoUrl}
                alt="Extendess"
                className="w-56 object-contain"
                style={{ filter: "brightness(0) invert(1)" }}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.6, duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
              />

              <motion.div
                className="flex flex-col items-center gap-3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2.2, duration: 0.8 }}
              >
                <div className="w-16 h-[1px] bg-white/20 relative overflow-hidden">
                  <motion.div
                    className="absolute left-0 top-0 h-full bg-white/60"
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ delay: 2.2, duration: 1.2, ease: "linear" }}
                  />
                </div>
                <span className="text-[13px] uppercase tracking-[0.5em] text-white/40 font-light">
                  Загрузка
                </span>
              </motion.div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
