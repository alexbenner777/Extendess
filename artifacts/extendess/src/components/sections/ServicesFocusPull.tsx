import { motion, AnimatePresence } from "framer-motion";
import { useRef, useState, useCallback } from "react";
import { Link } from "wouter";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import svcMakeup from "../../assets/svc-makeup-new.png";
import svcHair from "../../assets/svc-hair-new.png";
import svcNails from "../../assets/svc-nails-new.png";
import svcMedicine from "../../assets/svc-medicine-new.png";
import svcCosmetology from "../../assets/svc-cosmetology-new.jpg";
import svcSpa from "../../assets/svc-spa-new.png";

const allServices = [
  {
    num: "01",
    title: "Макияж\nи визаж",
    desc: "Профессиональный макияж и визаж для любого события. Дневной, вечерний, свадебный — мастера создадут ваш идеальный образ.",
    img: svcMakeup,
    href: "/services#service-01",
  },
  {
    num: "02",
    title: "Парикмахерский\nсервис",
    desc: "Авторские стрижки, окрашивание, укладки и уходовые процедуры от мастеров французской школы.",
    img: svcHair,
    href: "/services#service-02",
  },
  {
    num: "03",
    title: "Ногтевой\nсервис",
    desc: "Маникюр, педикюр, дизайн и наращивание ногтей. Безупречный результат с использованием премиальных материалов.",
    img: svcNails,
    href: "/services#service-03",
  },
  {
    num: "04",
    title: "Эстетическая\nи превентивная медицина",
    desc: "Комплексные программы молодости и долголетия. Индивидуальные протоколы, разработанные врачами высшей категории.",
    img: svcMedicine,
    href: "/services#service-04",
    imgPosition: "center center",
  },
  {
    num: "05",
    title: "Инъекционная и\nаппаратная косметология",
    desc: "Botox, филлеры, биоревитализация и аппаратные методики для сияния и молодости кожи без длительной реабилитации.",
    img: svcCosmetology,
    href: "/services#service-05",
  },
  {
    num: "06",
    title: "СПА",
    desc: "Ритуалы восстановления и релаксации. Массажи, обёртывания и SPA-программы для гармонии тела и духа.",
    img: svcSpa,
    href: "/services#service-06",
  },
];

const FACE_W = 390;
const FACE_H = 570;

function ServiceCard({ svc, offset }: { svc: typeof allServices[0]; offset: number }) {
  const absOffset = Math.abs(offset);

  const translateX = Math.sign(offset) * (absOffset === 1 ? 420 : absOffset === 2 ? 840 : 0);
  const translateZ = absOffset === 0 ? 0 : absOffset === 1 ? -120 : -240;
  const zIndex = absOffset === 0 ? 10 : absOffset === 1 ? 6 : 2;
  const opacity = absOffset === 0 ? 1 : absOffset === 1 ? 0.85 : absOffset === 2 ? 0.60 : 0;

  return (
    <motion.div
      animate={{
        x: translateX,
        z: translateZ,
        opacity,
        zIndex,
      }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      style={{
        width: FACE_W,
        height: FACE_H,
        position: "absolute",
        left: "50%",
        top: "50%",
        marginLeft: -FACE_W / 2,
        marginTop: -FACE_H / 2,
        transformOrigin: "center center",
        borderRadius: 6,
        overflow: "hidden",
        boxShadow: absOffset === 0
          ? "0 32px 80px rgba(0,0,0,0.22), 0 2px 12px rgba(0,0,0,0.08)"
          : "0 12px 40px rgba(0,0,0,0.12)",
        cursor: offset !== 0 ? "pointer" : "default",
        pointerEvents: opacity === 0 ? "none" : "auto",
      }}
    >
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(160deg, #eee9e0 0%, #e5ddd3 100%)" }} />

      <div style={{
        position: "absolute", inset: 0, zIndex: 2, pointerEvents: "none",
        background: "linear-gradient(135deg, rgba(255,255,255,0.38) 0%, rgba(255,255,255,0.08) 35%, transparent 60%)",
        borderRadius: 6,
      }} />

      <div style={{
        position: "absolute", top: 0, left: 0, right: 0,
        height: 1, zIndex: 3, pointerEvents: "none",
        background: "linear-gradient(to right, transparent 0%, rgba(255,255,255,0.85) 30%, rgba(255,255,255,0.85) 70%, transparent 100%)",
      }} />

      <div style={{
        position: "absolute", top: 0, left: 0, bottom: 0,
        width: 1, zIndex: 3, pointerEvents: "none",
        background: "linear-gradient(to bottom, rgba(255,255,255,0.7) 0%, rgba(255,255,255,0.15) 50%, transparent 100%)",
      }} />

      <span style={{
        position: "absolute", top: 18, left: 22,
        fontSize: 8, letterSpacing: "0.5em", color: "rgba(0,0,0,0.28)",
        textTransform: "uppercase", fontWeight: 300, zIndex: 4,
      }}>
        {svc.num}
      </span>

      <div style={{
        position: "absolute",
        top: 0, left: 0, right: 0,
        height: "62%",
        overflow: "hidden",
        zIndex: 4,
      }}>
        <img
          src={svc.img}
          alt={svc.title}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: svc.imgPosition ?? "center top",
            display: "block",
          }}
        />
      </div>

      <div style={{
        position: "absolute",
        bottom: 0, left: 0, right: 0,
        padding: "12px 22px 22px",
        zIndex: 4,
      }}>
        <div style={{ width: 24, height: 1, background: "rgba(0,0,0,0.18)", marginBottom: 9 }} />
        <h3 style={{
          fontSize: 26, fontWeight: 200, lineHeight: 1.15,
          letterSpacing: "-0.01em", color: "rgba(0,0,0,0.85)",
          whiteSpace: "pre-line", marginBottom: 8,
        }}>
          {svc.title}
        </h3>
        <p style={{ fontSize: 13.5, color: "rgba(0,0,0,0.42)", lineHeight: 1.6, fontWeight: 300, marginBottom: 16 }}>
          {svc.desc}
        </p>
        {offset === 0 && (
          <Link
            href={svc.href}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 7,
              padding: "9px 18px",
              border: "1px solid rgba(0,0,0,0.85)",
              borderRadius: 4,
              fontSize: 9,
              letterSpacing: "0.38em",
              textTransform: "uppercase",
              color: "#fff",
              fontWeight: 400,
              background: "rgba(0,0,0,0.85)",
              textDecoration: "none",
              transition: "all 0.25s ease",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.background = "rgba(0,0,0,1)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.background = "rgba(0,0,0,0.85)";
            }}
          >
            Открыть
            <ArrowUpRight size={10} />
          </Link>
        )}
      </div>
    </motion.div>
  );
}

export function Services() {
  const [activeIdx, setActiveIdx] = useState(0);
  const dragStartX = useRef(0);
  const isDragging = useRef(false);
  const total = allServices.length;

  const prev = useCallback(() => {
    setActiveIdx(i => (i - 1 + total) % total);
  }, [total]);

  const next = useCallback(() => {
    setActiveIdx(i => (i + 1) % total);
  }, [total]);

  const handleDragStart = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    isDragging.current = false;
    const x = "touches" in e ? e.touches[0].clientX : e.clientX;
    dragStartX.current = x;
  }, []);

  const handleDragEnd = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    const x = "changedTouches" in e ? e.changedTouches[0].clientX : e.clientX;
    const delta = x - dragStartX.current;
    if (Math.abs(delta) > 50) {
      if (delta < 0) next();
      else prev();
    }
  }, [prev, next]);

  return (
    <section className="relative bg-[#F1EBE3] py-0" style={{ zIndex: 10 }}>
      <div
        className="relative overflow-hidden"
        style={{ height: 720 }}
        onMouseDown={handleDragStart}
        onMouseUp={handleDragEnd}
        onTouchStart={handleDragStart}
        onTouchEnd={handleDragEnd}
      >
        {/* Section label */}
        <p className="absolute top-9 left-10 md:left-20 text-[10px] uppercase tracking-[0.4em] text-black/50 select-none" style={{ zIndex: 20 }}>
          — Услуги
        </p>

        {/* Slide counter */}
        <AnimatePresence mode="wait">
          <motion.p
            key={activeIdx}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="absolute top-9 right-10 md:right-20 text-[10px] uppercase tracking-[0.4em] text-black/50 select-none"
            style={{ zIndex: 20 }}
          >
            {allServices[activeIdx].num} / 06
          </motion.p>
        </AnimatePresence>

        {/* Edge fade overlays */}
        <div style={{
          position: "absolute", inset: 0, zIndex: 15, pointerEvents: "none",
          background: "linear-gradient(to right, #F1EBE3 0%, transparent 9%, transparent 91%, #F1EBE3 100%)",
        }} />

        {/* 3D perspective scene */}
        <div
          style={{
            perspective: "1200px",
            perspectiveOrigin: "50% 48%",
            position: "absolute",
            inset: 0,
            zIndex: 10,
            transformStyle: "preserve-3d",
          }}
        >
          {allServices.map((svc, i) => {
            let offset = i - activeIdx;
            if (offset > total / 2) offset -= total;
            if (offset < -total / 2) offset += total;
            if (Math.abs(offset) > 2) return null;
            return (
              <div
                key={i}
                onClick={() => {
                  if (offset === -1) prev();
                  else if (offset === 1) next();
                }}
                style={{
                  position: "absolute", inset: 0, transformStyle: "preserve-3d",
                  zIndex: offset === 0 ? 10 : Math.abs(offset) === 1 ? 6 : 2,
                  pointerEvents: Math.abs(offset) > 1 ? "none" : "auto",
                }}
              >
                <ServiceCard svc={svc} offset={offset} />
              </div>
            );
          })}
        </div>

        {/* Navigation arrows */}
        <button
          onClick={prev}
          style={{
            position: "absolute",
            left: 24,
            top: "50%",
            transform: "translateY(-50%)",
            zIndex: 30,
            width: 44,
            height: 44,
            borderRadius: "50%",
            border: "1px solid rgba(0,0,0,0.18)",
            background: "rgba(241,235,227,0.9)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            backdropFilter: "blur(8px)",
            transition: "all 0.2s ease",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.background = "rgba(0,0,0,0.85)";
            (e.currentTarget as HTMLElement).style.color = "#fff";
            (e.currentTarget as HTMLElement).style.borderColor = "transparent";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.background = "rgba(241,235,227,0.9)";
            (e.currentTarget as HTMLElement).style.color = "inherit";
            (e.currentTarget as HTMLElement).style.borderColor = "rgba(0,0,0,0.18)";
          }}
        >
          <ChevronLeft size={16} strokeWidth={1.5} />
        </button>

        <button
          onClick={next}
          style={{
            position: "absolute",
            right: 24,
            top: "50%",
            transform: "translateY(-50%)",
            zIndex: 30,
            width: 44,
            height: 44,
            borderRadius: "50%",
            border: "1px solid rgba(0,0,0,0.18)",
            background: "rgba(241,235,227,0.9)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            backdropFilter: "blur(8px)",
            transition: "all 0.2s ease",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.background = "rgba(0,0,0,0.85)";
            (e.currentTarget as HTMLElement).style.color = "#fff";
            (e.currentTarget as HTMLElement).style.borderColor = "transparent";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.background = "rgba(241,235,227,0.9)";
            (e.currentTarget as HTMLElement).style.color = "inherit";
            (e.currentTarget as HTMLElement).style.borderColor = "rgba(0,0,0,0.18)";
          }}
        >
          <ChevronRight size={16} strokeWidth={1.5} />
        </button>

        {/* Bottom gradient fade — seamless into next section */}
        <div style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 120,
          pointerEvents: "none",
          zIndex: 20,
          background: "linear-gradient(to bottom, transparent 0%, #F1EBE3 100%)",
        }} />

        {/* Dots */}
        <div style={{
          position: "absolute",
          bottom: 20,
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 30,
          display: "flex",
          gap: 8,
          alignItems: "center",
        }}>
          {allServices.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveIdx(i)}
              style={{
                width: i === activeIdx ? 20 : 5,
                height: 5,
                borderRadius: 3,
                background: i === activeIdx ? "rgba(0,0,0,0.65)" : "rgba(0,0,0,0.18)",
                border: "none",
                cursor: "pointer",
                padding: 0,
                transition: "all 0.35s ease",
              }}
            />
          ))}
        </div>

        {/* Bottom CTA */}
        <Link
          href="/services"
          style={{
            position: "absolute",
            bottom: 20,
            right: 28,
            zIndex: 30,
            display: "inline-flex",
            alignItems: "center",
            gap: 7,
            fontSize: 9,
            letterSpacing: "0.42em",
            textTransform: "uppercase",
            color: "rgba(0,0,0,0.45)",
            textDecoration: "none",
            fontWeight: 300,
            transition: "color 0.2s ease",
          }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "rgba(0,0,0,0.85)"; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "rgba(0,0,0,0.45)"; }}
        >
          Все услуги <ArrowUpRight size={10} />
        </Link>
      </div>
    </section>
  );
}
