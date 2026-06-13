import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Star, ArrowUpRight } from "lucide-react";

const reviews = [
  {
    name: "Sonya",
    date: "20 февраля 2025",
    avatar: "https://lh3.googleusercontent.com/a/ACg8ocK_AfL29G6SJUOtFLScWiVOCvORn3ZU5HdRW_eGaVuvpsCt0gY=w96-h96-c-rp-mo-br100",
    text: "Маникюр, стрижка, окраска волос, укладка — всё на высшем уровне! Приятный персонал и обслуживание. Рекомендую.",
    rating: 5,
  },
  {
    name: "Alice Schwarzwald",
    date: "22 июля 2024",
    avatar: "https://lh3.googleusercontent.com/a/ACg8ocJp_3RyG2ITDtABbilUaSbDwkyEYVNWMey9rnflEh06hcKyhtE=w96-h96-c-rp-mo-br100",
    text: "Мастер Юля Сахарова — настоящий профессионал. С первого момента я поняла, что попала в надёжные руки. Стрижка получилась просто великолепной, а окраска поразила: цвет получился насыщенным и ярким.",
    rating: 5,
  },
  {
    name: "Svetlana Senchukova",
    date: "3 августа 2023",
    avatar: "https://lh3.googleusercontent.com/a/ACg8ocJml0F4chyAKKQ2TOOxhi7p0ZS8DgGB0FNptMF6wBS2vV47ww=w96-h96-c-rp-mo-br100",
    text: "Окрашивала волосы и делала стрижку у Олеси. Очень довольна: вежливая, сообразительная, мыслит образно, руки умеют воплотить желаемое. Большое спасибо.",
    rating: 5,
  },
  {
    name: "Alexander Art",
    date: "6 июня 2023",
    avatar: "https://lh3.googleusercontent.com/a/ACg8ocKit75Nh5y8l355E65KvbZ0B_Uv77GEqMUlOTsDL9BIxfjzDQ=w96-h96-c-rp-mo-br100",
    text: "Познакомилась с мастером Юлией Сахаровой, делая стрижку и мелирование «флэш». У Юли получился КАМЕННЫЙ ЦВЕТОК! Всё то, о чём мечталось, я получила сегодня.",
    rating: 5,
  },
  {
    name: "Полина Ковальчук",
    date: "30 мая 2023",
    avatar: "https://lh3.googleusercontent.com/a/ACg8ocJKKHNNOi1ChnhPc0B8qp7oU0j5yFBfhYm4Mj8DE9642BxLjw=w96-h96-c-rp-mo-br100",
    text: "Очень понравилась стрижка! Мастер Сахарова Юлия. Осталась в восторге!",
    rating: 5,
  },
  {
    name: "Катерина Супонина",
    date: "30 апреля 2023",
    avatar: "https://lh3.googleusercontent.com/a/ACg8ocLZRTSckJpDS4cE-H92a85KTXnykLFvSRHr80hnXtRLwx2mXg=w96-h96-c-rp-mo-br100",
    text: "Хожу много лет. Все профессионалы своего дела, быстро, качественно, работают в 4 руки, а иногда и в 6. Всегда получаю отличный результат.",
    rating: 5,
  },
  {
    name: "Данил Аверин",
    date: "21 сентября 2021",
    avatar: "https://lh3.googleusercontent.com/a/ACg8ocKzX0_0y9MBm6lcl6bpwXlDSdAOPHdOXJoJUFLZjOlJskhJMaU=w96-h96-c-rp-mo-br100",
    text: "Люкс салон красоты. Находится в хорошем месте, имеет большое количество профессионалов. Своей стоимости полностью оправдывает.",
    rating: 5,
  },
];

function ReviewAvatar({ src, name }: { src: string; name: string }) {
  const [failed, setFailed] = useState(false);
  const initial = name.charAt(0).toUpperCase();
  if (failed) {
    return (
      <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0">
        <span className="text-xs font-light text-white/60">{initial}</span>
      </div>
    );
  }
  return (
    <img
      src={src}
      alt={name}
      className="w-10 h-10 rounded-full object-cover grayscale opacity-70 shrink-0"
      onError={() => setFailed(true)}
    />
  );
}

export function Reviews() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const onMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.pageX - (trackRef.current?.offsetLeft ?? 0));
    setScrollLeft(trackRef.current?.scrollLeft ?? 0);
  };
  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !trackRef.current) return;
    e.preventDefault();
    const x = e.pageX - trackRef.current.offsetLeft;
    trackRef.current.scrollLeft = scrollLeft - (x - startX);
  };
  const onMouseUp = () => setIsDragging(false);

  return (
    <section id="reviews" className="bg-black text-white overflow-hidden">
      <div className="pt-20 pb-8 md:pt-28 md:pb-10">

        {/* Header */}
        <div className="px-6 md:px-16 max-w-7xl mx-auto mb-12 flex items-end justify-between">
          <div>
            <span className="block text-[9px] uppercase tracking-[0.45em] text-white/30 mb-5">— Google Reviews</span>
            <h2 className="font-extralight tracking-[-0.03em] leading-[0.95] text-5xl md:text-6xl text-white">
              Отзывы
            </h2>
          </div>
          <div className="hidden md:flex flex-col items-end gap-2">
            <div className="flex items-center gap-1.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={11} fill="white" strokeWidth={0} className="text-white/80" />
              ))}
            </div>
            <span className="text-[9px] uppercase tracking-[0.4em] text-white/25">5.0 · {reviews.length} отзывов</span>
          </div>
        </div>

        {/* Scrollable cards track */}
        <div
          ref={trackRef}
          className="flex gap-4 overflow-x-auto select-none pb-10"
          style={{
            cursor: isDragging ? "grabbing" : "grab",
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            paddingLeft: "clamp(24px, 6vw, 128px)",
            paddingRight: "clamp(24px, 6vw, 128px)",
          }}
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseUp={onMouseUp}
          onMouseLeave={onMouseUp}
        >
          {reviews.map((r, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
              className="shrink-0 flex flex-col justify-between"
              style={{
                width: "clamp(280px, 28vw, 380px)",
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.07)",
                padding: "32px 28px 28px",
              }}
            >
              {/* Stars */}
              <div>
                <div className="flex items-center gap-1 mb-6">
                  {[...Array(r.rating)].map((_, j) => (
                    <Star key={j} size={9} fill="rgba(255,255,255,0.5)" strokeWidth={0} />
                  ))}
                </div>

                {/* Quote */}
                <p className="font-extralight text-base leading-relaxed text-white/70 tracking-tight">
                  «{r.text}»
                </p>
              </div>

              {/* Author */}
              <div className="mt-8 pt-6 border-t border-white/8 flex items-center gap-3">
                <ReviewAvatar src={r.avatar} name={r.name} />
                <div className="min-w-0">
                  <div className="text-sm font-light text-white/80 truncate">{r.name}</div>
                  <div className="text-[9px] uppercase tracking-[0.3em] text-white/25 mt-0.5">{r.date}</div>
                </div>
              </div>
            </motion.div>
          ))}

          {/* Google CTA card */}
          <div
            className="shrink-0 flex flex-col items-start justify-end"
            style={{
              width: "clamp(200px, 18vw, 260px)",
              background: "rgba(255,255,255,0.02)",
              border: "1px solid rgba(255,255,255,0.06)",
              padding: "32px 28px 28px",
            }}
          >
            <p className="text-[10px] uppercase tracking-[0.4em] text-white/25 mb-6 leading-relaxed">
              Читать все<br />отзывы
            </p>
            <a
              href="https://maps.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border border-white/20 px-5 py-3 text-[9px] uppercase tracking-[0.35em] text-white/50 hover:border-white/60 hover:text-white transition-all duration-300"
            >
              Google <ArrowUpRight size={10} />
            </a>
          </div>
        </div>

        {/* Scroll hint */}
        <div className="px-6 md:px-16 max-w-7xl mx-auto flex items-center gap-3 opacity-30">
          <div className="h-px w-8 bg-white/40" />
          <span className="text-[9px] uppercase tracking-[0.4em] text-white/40">Тяните для просмотра</span>
        </div>

      </div>
    </section>
  );
}
