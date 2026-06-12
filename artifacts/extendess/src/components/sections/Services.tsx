import { FadeIn, StaggerContainer, StaggerItem } from "../ui-extras/animations";
import service1 from "@assets/images/service-1.png";
import service2 from "@assets/images/service-2.png";
import service3 from "@assets/images/service-3.png";
import service4 from "@assets/images/service-4.png";

export function Services() {
  const categories = [
    {
      title: "Эстетическая медицина",
      image: service1,
      items: ["Мезотерапия", "Инъекции миорелаксантов", "Биоревитализация", "Контурная пластика"]
    },
    {
      title: "Косметология и уход",
      image: service2,
      items: ["Уходовые процедуры для лица", "Классический массаж для лица", "Пилинги", "Чистка лица"]
    },
    {
      title: "Уход за волосами",
      image: service3,
      items: ["Окрашивание", "Укладка", "Свадебная прическа", "Шитьё седины"]
    },
    {
      title: "Ногтевой сервис",
      image: service4,
      items: ["Педикюр для дам", "Наращивание ногтей", "Маникюр для дам", "Маникюр/педикюр для господ"]
    }
  ];

  return (
    <section id="services" className="py-24 md:py-32 bg-card relative">
      <div className="container mx-auto px-6">
        <FadeIn className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-4xl md:text-5xl font-serif text-foreground mb-6">
            Искусство <span className="italic text-primary">преображения</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Выверенные протоколы, премиальные бренды и мастерство, отточенное годами. 
            Каждая процедура — это ритуал, посвященный вашей красоте.
          </p>
        </FadeIn>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-16">
          {categories.map((category, idx) => (
            <StaggerItem key={idx} className="group cursor-pointer">
              <div className="relative aspect-[4/3] overflow-hidden mb-8 bg-background">
                <img 
                  src={category.image} 
                  alt={category.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-500" />
              </div>
              <h3 className="text-2xl font-serif text-foreground border-b border-border pb-4 mb-6">
                {category.title}
              </h3>
              <ul className="space-y-3">
                {category.items.map((item, i) => (
                  <li key={i} className="text-muted-foreground flex items-center gap-3 transition-colors group-hover:text-foreground">
                    <span className="w-1 h-1 bg-secondary rounded-full" />
                    {item}
                  </li>
                ))}
              </ul>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
