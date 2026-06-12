import { FadeIn, StaggerContainer, StaggerItem } from "../ui-extras/animations";
import team1 from "@assets/images/team-1.png";
import team2 from "@assets/images/team-2.png";
import team3 from "@assets/images/team-3.png";

export function Team() {
  const team = [
    {
      name: "Мартемьянов Виталий",
      role: "Арт-менеджер, Топ-стилист",
      bio: "Стаж в сети Extendess 18 лет. Стажировки в Париже, регулярные мастер-классы по стрижкам и колористике. Участие в показах на неделе высокой моды в Москве.",
      image: team1
    },
    {
      name: "Петрачкова Ольга",
      role: "Топ-стилист",
      bio: "30 лет в профессии, регулярные стажировки в Париже. Огромный опыт позволяет провести грамотный анализ состояния волос и подобрать протокол окрашивания.",
      image: team2
    },
    {
      name: "Кумашкова Елена",
      role: "Топ-стилист",
      bio: "Стаж работы 35 лет, из них 25 лет в салоне Extendess. Обучение в школе Extendess в Париже и в академии L'Oréal в Москве.",
      image: team3
    }
  ];

  return (
    <section id="team" className="py-24 md:py-32 bg-background">
      <div className="container mx-auto px-6">
        <FadeIn className="mb-20">
          <span className="text-sm text-primary uppercase tracking-widest mb-4 block">Мастера</span>
          <h2 className="text-4xl md:text-5xl font-serif text-foreground">
            Создатели <span className="italic">прекрасного</span>
          </h2>
        </FadeIn>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {team.map((member, idx) => (
            <StaggerItem key={idx} className="group">
              <div className="relative aspect-[3/4] overflow-hidden mb-8">
                <img 
                  src={member.image} 
                  alt={member.name}
                  className="w-full h-full object-cover filter grayscale-[20%] group-hover:grayscale-0 transition-all duration-700"
                />
              </div>
              <h3 className="text-xl font-serif text-foreground mb-2">{member.name}</h3>
              <p className="text-sm uppercase tracking-widest text-primary mb-4">{member.role}</p>
              <p className="text-muted-foreground leading-relaxed font-light text-sm">
                {member.bio}
              </p>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
