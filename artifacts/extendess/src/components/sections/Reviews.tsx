import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FadeIn } from "../ui-extras/animations";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";

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
    text: "Недавно посетила салон и осталась в полном восторге от стрижки и окраски волос! Мастер Юля Сахарова — настоящий профессионал своего дела. С первого момента общения я поняла, что попала в надёжные руки. Она внимательно выслушала мои пожелания и предложила отличные идеи. Стрижка получилась просто великолепной, а окраска поразила меня: цвет получился насыщенным и ярким.",
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
    text: "Хожу много лет. Все профессионалы своего дела, быстро, качественно, работают в 4 руки, а иногда и в 6. Люблю приходить к ним, всегда получаю отличный результат.",
    rating: 5,
  },
  {
    name: "Данил Аверин",
    date: "21 сентября 2021",
    avatar: "https://lh3.googleusercontent.com/a/ACg8ocKzX0_0y9MBm6lcl6bpwXlDSdAOPHdOXJoJUFLZjOlJskhJMaU=w96-h96-c-rp-mo-br100",
    text: "Люкс салон красоты. Находится в хорошем месте, имеет большое количество профессионалов. Считаю, что свою стоимость полностью оправдывает.",
    rating: 5,
  },
];

function ReviewAvatar({ src, name }: { src: string; name: string }) {
  const [failed, setFailed] = useState(false);
  const initial = name.charAt(0).toUpperCase();

  if (failed) {
    return (
      <div className="w-10 h-10 rounded-full bg-[#C9B7A2]/40 flex items-center justify-center shrink-0">
        <span className="text-xs font-light text-[#5E4B3A] tracking-wider">{initial}</span>
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
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);

  const paginate = (dir: number) => {
    setDirection(dir);
    setCurrent((prev) => (prev + dir + reviews.length) % reviews.length);
  };

  const review = reviews[current];

  return (
    <section id="reviews" className="py-0 bg-black text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-16 pt-20 pb-24 md:pt-28 md:pb-32">

        {/* Header row */}
        <div className="flex items-end justify-between mb-16 border-b border-white/10 pb-10">
          <FadeIn>
            <span className="block text-[9px] uppercase tracking-[0.45em] text-white/30 mb-5">— Google Reviews</span>
            <h2 className="font-extralight tracking-[-0.03em] leading-[0.95] text-5xl md:text-6xl lg:text-7xl text-white">
              Отзывы
            </h2>
          </FadeIn>
          <FadeIn delay={0.15} className="hidden md:flex items-center gap-2 mb-1">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={12} fill="white" strokeWidth={0} className="text-white/80" />
            ))}
            <span className="text-xs text-white/30 tracking-widest ml-1">5.0</span>
          </FadeIn>
        </div>

        {/* Slide area */}
        <div className="relative min-h-[220px] md:min-h-[180px]">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={current}
              custom={direction}
              initial={{ opacity: 0, x: direction * 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction * -50 }}
              transition={{ duration: 0.45, ease: [0.76, 0, 0.24, 1] }}
            >
              <p className="font-extralight text-xl md:text-2xl lg:text-3xl leading-[1.5] text-white/80 tracking-tight max-w-4xl">
                «{review.text}»
              </p>

              <div className="mt-10 flex items-center gap-4">
                <ReviewAvatar src={review.avatar} name={review.name} />
                <div>
                  <div className="text-sm font-light text-white/60">{review.name}</div>
                  <div className="text-[9px] uppercase tracking-[0.35em] text-white/25 mt-0.5">{review.date}</div>
                </div>
                <span className="ml-auto text-[9px] uppercase tracking-[0.3em] text-white/15">
                  {String(current + 1).padStart(2, "0")} / {String(reviews.length).padStart(2, "0")}
                </span>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Controls */}
        <div className="mt-12 flex items-center gap-4 border-t border-white/10 pt-8">
          <button
            onClick={() => paginate(-1)}
            className="flex items-center justify-center hover:opacity-60 transition-all duration-300"
            aria-label="Предыдущий"
          >
            <ChevronLeft size={32} strokeWidth={1.2} />
          </button>
          <button
            onClick={() => paginate(1)}
            className="flex items-center justify-center hover:opacity-60 transition-all duration-300"
            aria-label="Следующий"
          >
            <ChevronRight size={32} strokeWidth={1.2} />
          </button>
          <div className="flex gap-1.5 ml-3">
            {reviews.map((_, i) => (
              <button
                key={i}
                onClick={() => { setDirection(i > current ? 1 : -1); setCurrent(i); }}
                className={`h-px transition-all duration-300 ${i === current ? "w-8 bg-white" : "w-3 bg-white/20"}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
