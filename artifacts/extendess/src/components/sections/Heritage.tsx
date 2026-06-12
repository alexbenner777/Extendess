import { FadeIn, AnimatedCounter } from "../ui-extras/animations";

export function Heritage() {
  const stats = [
    { value: 1954, label: "год основания", prefix: "С " },
    { value: 47, label: "стран присутствия" },
    { value: 400, label: "салонов в мире" },
    { value: 1999, label: "лаборатория", prefix: "С " },
  ];

  return (
    <section id="heritage" className="py-24 md:py-32 bg-card relative">
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
          <FadeIn direction="right">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-primary leading-tight">
              Искусство, пронесённое <br/> сквозь <span className="italic text-foreground">десятилетия</span>
            </h2>
          </FadeIn>
          <FadeIn direction="left">
            <p className="text-lg text-muted-foreground leading-relaxed">
              С 1954 года Extendess задает мировые стандарты в индустрии красоты. 
              Мы объединяем передовые научные разработки нашей исследовательской лаборатории 
              с безупречным французским сервисом. Каждый визит к нам — это погружение в 
              атмосферу закрытого ателье на Rue Saint-Honoré, где время замирает, уступая место заботе о вас.
            </p>
          </FadeIn>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 border-t border-border pt-16">
          {stats.map((stat, idx) => (
            <FadeIn key={idx} delay={idx * 0.1}>
              <div className="text-center md:text-left">
                <div className="text-4xl md:text-5xl font-serif text-primary mb-4 flex items-center justify-center md:justify-start">
                  {stat.prefix && <span className="text-3xl mr-2 text-foreground/50">{stat.prefix}</span>}
                  <AnimatedCounter value={stat.value} duration={2} />
                </div>
                <div className="text-sm uppercase tracking-widest text-muted-foreground">
                  {stat.label}
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
