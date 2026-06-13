import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { Preloader } from "./Preloader";
import { MagneticCursor, NoiseOverlay, PageTransition, ScrollProgress } from "./ui-extras/animations";
import { Link } from "wouter";
import { MessageCircle } from "lucide-react";

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-[100dvh] flex flex-col bg-background text-foreground font-sans relative selection:bg-primary selection:text-primary-foreground">
      <Preloader />
      <NoiseOverlay />
      <ScrollProgress />
      <MagneticCursor />

      <Navbar />
      
      <main className="flex-1 flex flex-col">
        <PageTransition>
          {children}
        </PageTransition>
      </main>

      <Footer />

      {/* Sticky Booking Button — desktop: floating pill, mobile: full-width bar */}
      <div className="fixed bottom-0 left-0 right-0 z-50 md:bottom-6 md:right-6 md:left-auto md:right-6 pointer-events-auto">
        {/* Mobile: full-width bar */}
        <Link
          href="/contacts"
          className="flex md:hidden items-center justify-center bg-primary text-primary-foreground py-4 text-xs font-bold uppercase tracking-widest w-full"
        >
          Записаться
        </Link>
        {/* Desktop: floating pill */}
        <Link
          href="/contacts"
          className="hidden md:flex bg-primary/90 hover:bg-primary backdrop-blur-xl text-primary-foreground px-6 py-4 rounded-full text-xs font-bold uppercase tracking-widest shadow-2xl transition-transform hover:scale-105 border border-primary-foreground/10"
        >
          Записаться
        </Link>
      </div>
    </div>
  );
}