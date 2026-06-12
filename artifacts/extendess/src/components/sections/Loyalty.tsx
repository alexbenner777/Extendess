import { FadeIn } from "../ui-extras/animations";

export function Loyalty() {
  return (
    <section className="py-24 md:py-32 bg-primary relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10 mix-blend-overlay pointer-events-none" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <div className="w-full lg:w-1/2">
            <FadeIn direction="right">
              <h2 className="text-4xl md:text-5xl font-serif text-primary-foreground mb-6 leading-tight">
                Привилегии <br />
                <span className="italic text-secondary">для избранных</span>
              </h2>
              <p className="text-lg text-primary-foreground/80 mb-8 font-light leading-relaxed max-w-md">
                Станьте частью закрытого клуба Extendess. Наша программа лояльности создана для тех, кто выбирает безупречный сервис на регулярной основе.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full border border-secondary/30 flex items-center justify-center shrink-0">
                    <span className="text-secondary font-serif text-xl">1</span>
                  </div>
                  <div>
                    <h4 className="text-lg font-serif text-primary-foreground mb-1">Premium Card</h4>
                    <p className="text-sm text-primary-foreground/70 font-light">Накопительная скидка до 15% на все услуги и домашний уход.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full border border-secondary/30 flex items-center justify-center shrink-0">
                    <span className="text-secondary font-serif text-xl">2</span>
                  </div>
                  <div>
                    <h4 className="text-lg font-serif text-primary-foreground mb-1">Закрытые мероприятия</h4>
                    <p className="text-sm text-primary-foreground/70 font-light">Приглашения на клиентские дни, презентации новинок и мастер-классы.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full border border-secondary/30 flex items-center justify-center shrink-0">
                    <span className="text-secondary font-serif text-xl">3</span>
                  </div>
                  <div>
                    <h4 className="text-lg font-serif text-primary-foreground mb-1">Персональный консьерж</h4>
                    <p className="text-sm text-primary-foreground/70 font-light">Приоритетная запись и индивидуальное сопровождение вашего визита.</p>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
          
          <div className="w-full lg:w-1/2">
            <FadeIn delay={0.2} direction="left">
              <div className="relative aspect-[1.6/1] bg-background/5 border border-white/10 p-8 md:p-12 backdrop-blur-sm flex flex-col justify-between overflow-hidden">
                <div className="absolute -right-20 -top-20 w-64 h-64 bg-secondary/20 rounded-full blur-3xl pointer-events-none" />
                
                <div className="flex justify-between items-start relative z-10">
                  <div className="text-2xl font-serif tracking-widest uppercase text-white">
                    Extendess
                  </div>
                  <div className="text-xs uppercase tracking-widest text-secondary font-medium">
                    Premium Member
                  </div>
                </div>
                
                <div className="relative z-10 mt-20">
                  <div className="text-lg font-mono text-white/60 tracking-[0.2em] mb-2">
                    0000 0000 0000 0000
                  </div>
                  <div className="flex justify-between items-end">
                    <div className="text-sm uppercase tracking-widest text-white/80">
                      Client Name
                    </div>
                    <div className="text-secondary">
                      <svg width="40" height="24" viewBox="0 0 40 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="12" cy="12" r="12" fill="currentColor" fillOpacity="0.5"/>
                        <circle cx="28" cy="12" r="12" fill="currentColor" fillOpacity="0.5"/>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
}
