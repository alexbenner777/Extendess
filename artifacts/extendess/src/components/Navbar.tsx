import { useState } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { Link, useLocation } from "wouter";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import logoUrl from "@assets/logo-big_1776857562328.png";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { scrollY } = useScroll();
  const [location] = useLocation();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50);
  });

  const navLinks = [
    { name: "О бренде", href: "/about" },
    { name: "Услуги", href: "/services" },
    { name: "Прайс", href: "/price" },
    { name: "Салоны", href: "/salons" },
    { name: "Контакты", href: "/contacts" },
  ];

  const isLight = isScrolled;

  const textColor = isLight ? "text-black/70 hover:text-black" : "text-white/70 hover:text-white";
  const activeColor = isLight ? "text-black" : "text-white";
  const lineColor = isLight ? "bg-black" : "bg-white";
  const logoFilter = isLight ? "brightness(0)" : "brightness(0) invert(1)";

  return (
    <motion.header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out border-b border-transparent",
        isScrolled
          ? "bg-[#F1EBE3] backdrop-blur-2xl py-4 border-black/5 shadow-sm"
          : "bg-transparent py-6"
      )}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut", delay: 0.5 }}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        <Link href="/" className="flex items-center">
          <img
            src={logoUrl}
            alt="Extendess"
            className="h-12 object-contain transition-all duration-500"
            style={{ filter: logoFilter }}
          />
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={cn(
                "text-xs font-semibold uppercase tracking-widest transition-colors relative group",
                location === link.href ? activeColor : textColor
              )}
            >
              {link.name}
              <span className={cn(
                "absolute -bottom-2 left-0 h-[1px] transition-all duration-300",
                lineColor,
                location === link.href ? "w-full" : "w-0 group-hover:w-full"
              )} />
            </Link>
          ))}
        </nav>

        <div className="hidden md:block">
          <Link
            href="/contacts"
            className="px-6 py-3 bg-primary text-primary-foreground text-xs font-semibold uppercase tracking-widest hover:bg-primary/90 transition-colors rounded"
          >
            Записаться
          </Link>
        </div>

        <button
          className={cn("md:hidden", isLight ? "text-black" : "text-white")}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed inset-0 bg-[#F1EBE3] z-[60] flex flex-col items-center justify-center gap-8 md:hidden"
          >
            <button
              className="absolute top-6 right-6 text-foreground"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <X size={24} />
            </button>
            {navLinks.map((link, i) => (
              <motion.div
                key={link.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06 + 0.1, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              >
                <Link
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-3xl font-bold uppercase tracking-widest text-foreground"
                >
                  {link.name}
                </Link>
              </motion.div>
            ))}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: navLinks.length * 0.06 + 0.15, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="absolute bottom-10"
            >
              <Link
                href="/contacts"
                onClick={() => setIsMobileMenuOpen(false)}
                className="px-10 py-4 bg-primary text-primary-foreground text-xs font-semibold uppercase tracking-widest w-64 text-center block rounded"
              >
                Записаться
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
