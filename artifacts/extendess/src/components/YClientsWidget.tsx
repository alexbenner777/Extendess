import { createContext, useContext, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

interface YClientsContextValue {
  openWidget: (url: string) => void;
  closeWidget: () => void;
}

const YClientsContext = createContext<YClientsContextValue>({
  openWidget: () => {},
  closeWidget: () => {},
});

export function useYClients() {
  return useContext(YClientsContext);
}

export function YClientsProvider({ children }: { children: React.ReactNode }) {
  const [url, setUrl] = useState<string | null>(null);

  const openWidget = useCallback((u: string) => setUrl(u), []);
  const closeWidget = useCallback(() => setUrl(null), []);

  return (
    <YClientsContext.Provider value={{ openWidget, closeWidget }}>
      {children}

      <AnimatePresence>
        {url && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              className="fixed inset-0 z-[9998] bg-black/40 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={closeWidget}
            />

            {/* Panel */}
            <motion.div
              key="panel"
              className="fixed top-0 left-0 z-[9999] h-full w-full md:w-1/2 bg-white shadow-2xl flex flex-col"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-black/10 shrink-0">
                <span className="text-[10px] uppercase tracking-[0.35em] text-black/40 font-light">
                  Запись онлайн
                </span>
                <button
                  onClick={closeWidget}
                  className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-black/5 transition-colors"
                >
                  <X size={18} className="text-black/50" />
                </button>
              </div>

              {/* iframe */}
              <iframe
                src={url}
                className="flex-1 w-full border-none"
                title="Запись онлайн"
                allow="payment"
              />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </YClientsContext.Provider>
  );
}
