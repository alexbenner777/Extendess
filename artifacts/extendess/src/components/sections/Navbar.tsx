import { useState, useEffect } from "react";
import { motion, useScroll } from "framer-motion";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { scrollY } = useScroll();

  useEffect(() => {
    return scrollY.onChange((latest) => {
      setIsScrolled(latest > 50);
    });
  }, [scrollY]);

  const navLinks = [
    { name: "Услуги", href: "#services" },
    { name: "Команда", href: "#team" },
    { name: "Портфолио", href: "#gallery" },
    { name: "О нас", href: "#heritage" },
    { name: "Контакты", href: "#booking" },
  ];

  const scrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <motion.header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out border-b border-transparent",
        isScrolled ? "bg-background/90 backdrop-blur-md py-3 border-border shadow-sm" : "bg-transparent py-5"
      )}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut", delay: 3 }}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        <a href="#" className="flex flex-col items-start leading-none">
          <span className={cn(
            "font-sans font-light uppercase tracking-[0.25em] transition-all duration-300",
            isScrolled ? "text-3xl md:text-4xl text-primary" : "text-4xl md:text-5xl lg:text-6xl text-white"
          )}>
            Extendess
          </span>
          <span className={cn(
            "text-[10px] uppercase tracking-[0.3em] font-light mt-0.5 transition-all duration-300",
            isScrolled ? "text-foreground/40" : "text-white/50"
          )}>
            Москва · Новое Поколение
          </span>
        </a>

        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => scrollTo(e, link.href)}
              className={cn(
                "text-xs font-medium uppercase tracking-widest transition-colors relative group",
                isScrolled ? "text-foreground/70 hover:text-primary" : "text-white/70 hover:text-white"
              )}
            >
              {link.name}
              <span className={cn(
                "absolute -bottom-1 left-0 w-0 h-[1px] transition-all duration-300 group-hover:w-full",
                isScrolled ? "bg-primary" : "bg-white"
              )} />
            </a>
          ))}
        </nav>

        <div className="hidden md:block">
          <a
            href="#booking"
            onClick={(e) => scrollTo(e, "#booking")}
            className={cn(
              "px-6 py-3 text-xs font-medium uppercase tracking-widest transition-all duration-300",
              isScrolled
                ? "bg-primary text-primary-foreground hover:bg-primary/90"
                : "bg-white text-black hover:bg-white/90"
            )}
          >
            Записаться
          </a>
        </div>

        <button
          className={cn("md:hidden", isScrolled ? "text-foreground" : "text-white")}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={cn(
          "fixed inset-0 bg-background z-40 flex flex-col items-center justify-center gap-8 transition-transform duration-500 ease-in-out md:hidden",
          isMobileMenuOpen ? "translate-y-0" : "-translate-y-full"
        )}
      >
        {navLinks.map((link) => (
          <a
            key={link.name}
            href={link.href}
            onClick={(e) => scrollTo(e, link.href)}
            className="text-3xl font-light uppercase tracking-[0.2em] text-foreground"
          >
            {link.name}
          </a>
        ))}
        <a
          href="#booking"
          onClick={(e) => scrollTo(e, "#booking")}
          className="px-8 py-4 bg-primary text-primary-foreground text-sm font-medium uppercase tracking-wider mt-4"
        >
          Записаться
        </a>
      </div>
    </motion.header>
  );
}
