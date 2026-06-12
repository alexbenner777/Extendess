import { useState } from "react";
import { FadeIn } from "../ui-extras/animations";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export function Booking() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  return (
    <section id="booking" className="py-24 md:py-32 bg-primary relative text-primary-foreground">
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          
          <FadeIn direction="right">
            <h2 className="text-4xl md:text-5xl font-serif mb-8 leading-tight">
              Запланируйте <br/> свой <span className="italic text-secondary">визит</span>
            </h2>
            <p className="text-primary-foreground/80 mb-12 text-lg font-light max-w-md">
              Оставьте заявку, и наш консьерж свяжется с вами в течение 15 минут для подтверждения времени и деталей процедуры.
            </p>
            
            <div className="space-y-8">
              <div>
                <h4 className="text-sm uppercase tracking-widest text-secondary mb-2">Адрес</h4>
                <p className="text-lg">Ленинский проспект, 45<br/>Москва, Россия</p>
              </div>
              <div>
                <h4 className="text-sm uppercase tracking-widest text-secondary mb-2">Время работы</h4>
                <p className="text-lg">Ежедневно<br/>10:00 — 22:00</p>
              </div>
              <div>
                <h4 className="text-sm uppercase tracking-widest text-secondary mb-2">Контакты</h4>
                <p className="text-lg">+7 (495) 123-45-67<br/>hello@extendess.ru</p>
              </div>
            </div>
          </FadeIn>

          <FadeIn direction="left" delay={0.2}>
            <div className="bg-background text-foreground p-8 md:p-12">
              <h3 className="text-2xl font-serif mb-8">Форма записи</h3>
              
              {isSubmitted ? (
                <div className="h-[400px] flex flex-col items-center justify-center text-center">
                  <div className="w-16 h-16 rounded-full bg-secondary/20 flex items-center justify-center mb-6">
                    <span className="text-2xl">✓</span>
                  </div>
                  <h4 className="text-xl font-serif mb-2">Заявка принята</h4>
                  <p className="text-muted-foreground">Мы свяжемся с вами в ближайшее время.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Input required placeholder="Ваше имя" className="bg-transparent border-t-0 border-x-0 border-b border-border rounded-none focus-visible:ring-0 focus-visible:border-primary px-0 pb-2 text-base" />
                  </div>
                  <div className="space-y-2">
                    <Input required type="tel" placeholder="Телефон" className="bg-transparent border-t-0 border-x-0 border-b border-border rounded-none focus-visible:ring-0 focus-visible:border-primary px-0 pb-2 text-base" />
                  </div>
                  <div className="space-y-2 pt-2">
                    <Select required>
                      <SelectTrigger className="bg-transparent border-t-0 border-x-0 border-b border-border rounded-none focus:ring-0 px-0 text-base h-auto pb-2">
                        <SelectValue placeholder="Выберите услугу" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="aesthetic">Эстетическая медицина</SelectItem>
                        <SelectItem value="cosmetology">Косметология</SelectItem>
                        <SelectItem value="hair">Уход за волосами</SelectItem>
                        <SelectItem value="nails">Ногтевой сервис</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2 pt-2">
                    <Input type="date" className="bg-transparent border-t-0 border-x-0 border-b border-border rounded-none focus-visible:ring-0 focus-visible:border-primary px-0 pb-2 text-base w-full text-muted-foreground" />
                  </div>
                  <div className="space-y-2 pt-2">
                    <Textarea placeholder="Комментарий (необязательно)" className="bg-transparent border-t-0 border-x-0 border-b border-border rounded-none focus-visible:ring-0 focus-visible:border-primary px-0 pb-2 min-h-[80px] resize-none text-base" />
                  </div>
                  <Button type="submit" className="w-full bg-primary text-white hover:bg-primary/90 h-14 text-sm uppercase tracking-widest font-medium mt-4">
                    Подтвердить
                  </Button>
                  <p className="text-xs text-muted-foreground text-center pt-4">
                    Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности.
                  </p>
                </form>
              )}
            </div>
          </FadeIn>

        </div>
      </div>
    </section>
  );
}
