import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { Preloader } from "./Preloader";
import { MagneticCursor, NoiseOverlay, PageTransition, ScrollProgress } from "./ui-extras/animations";
import { useYClients } from "./YClientsWidget";

const DEFAULT_BOOKING_URL = "https://n522032.yclients.com/";

export function Layout({ children }: { children: React.ReactNode }) {
  const { openWidget } = useYClients();

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

      {/* Sticky Booking Button — floating pill, right side */}
      <div className="fixed bottom-5 right-5 z-50 pointer-events-auto">
        <button
          onClick={() => openWidget(DEFAULT_BOOKING_URL)}
          className="flex items-center justify-center bg-black text-white px-6 py-3.5 text-[10px] font-bold uppercase tracking-widest shadow-xl transition-all duration-300 hover:scale-105 hover:bg-black/80 border border-white/10 rounded"
        >
          Записаться
        </button>
      </div>
    </div>
  );
}
