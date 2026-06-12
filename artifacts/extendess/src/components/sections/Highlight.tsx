import { FadeIn } from "../ui-extras/animations";
import highlightImg from "@assets/images/highlight.png";
import { ArrowRight } from "lucide-react";

export function Highlight() {
  return (
    <section className="py-24 md:py-32 bg-background relative overflow-hidden">
      {/* Decorative background circle */}
      <div className="absolute top-1/2 -right-[20%] -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          
          <div className="w-full lg:w-1/2 relative">
            <FadeIn direction="right">
              <div className="relative aspect-[4/5] overflow-hidden bg-card">
                <img 
                  src={highlightImg} 
                  alt="Vivace Technology" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-8 -right-8 w-48 h-48 bg-primary flex items-center justify-center p-8 hidden md:flex">
                <p className="text-white font-serif italic text-xl text-center leading-snug">
                  Мгновенный результат
                </p>
              </div>
            </FadeIn>
          </div>

          <div className="w-full lg:w-1/2">
            <FadeIn delay={0.2} direction="left">
              <div className="inline-block px-4 py-2 border border-primary/20 text-primary text-xs uppercase tracking-widest mb-8">
                Инновация
              </div>
              <h2 className="text-4xl md:text-5xl font-serif text-foreground mb-6 leading-tight">
                Vivace — революция в <br />
                <span className="italic text-primary">эстетической медицине</span>
              </h2>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                Теперь в EXTENDESS на Ленинском! Откройте для себя современную технологию микроигольчатого RF-лифтинга, которая возвращает коже упругость, молодость и здоровое сияние уже после первой процедуры.
              </p>
              
              <ul className="space-y-4 mb-10">
                {['Безболезненно и комфортно', 'Минимальный период реабилитации', 'Видимый эффект после 1 сеанса'].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-foreground/80">
                    <div className="w-1.5 h-1.5 rounded-full bg-secondary" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <a href="#booking" className="inline-flex items-center gap-4 text-primary font-medium uppercase tracking-widest text-sm group">
                Узнать подробнее
                <span className="w-10 h-[1px] bg-primary group-hover:w-16 transition-all duration-300 relative">
                  <ArrowRight size={14} className="absolute -right-1 -top-[6px]" />
                </span>
              </a>
            </FadeIn>
          </div>
          
        </div>
      </div>
    </section>
  );
}
