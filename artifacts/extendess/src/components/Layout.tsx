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

      {/* Sticky Booking/WhatsApp Button */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-4 items-end pointer-events-auto">
        <Link 
          href="/contacts"
          className="bg-primary/90 hover:bg-primary backdrop-blur-xl text-primary-foreground px-6 py-4 rounded-full text-xs font-bold uppercase tracking-widest shadow-2xl transition-transform hover:scale-105 border border-primary-foreground/10"
        >
          Записаться
        </Link>
      </div>
    </div>
  );
}