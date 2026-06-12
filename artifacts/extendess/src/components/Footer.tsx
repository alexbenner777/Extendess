import logoUrl from "@assets/logo-big_1776857562328.png";
import { Link } from "wouter";

export function Footer() {
  return (
    <footer className="bg-black text-white py-20 border-t border-white/10">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-12 mb-16">
          <Link href="/">
            <img 
              src={logoUrl} 
              alt="Extendess" 
              className="h-12 object-contain" 
            />
          </Link>
          
          <div className="flex flex-col md:flex-row gap-12 md:gap-24">
            <div className="space-y-4">
              <h4 className="text-xs uppercase tracking-widest text-white/50 mb-6">Адрес</h4>
              <p className="text-sm font-light">Ленинский проспект, 45<br/>Москва, Россия</p>
            </div>
            <div className="space-y-4">
              <h4 className="text-xs uppercase tracking-widest text-white/50 mb-6">Контакты</h4>
              <p className="text-sm font-light">+7 (495) 123-45-67<br/>hello@extendess.ru</p>
            </div>
            <div className="space-y-4">
              <h4 className="text-xs uppercase tracking-widest text-white/50 mb-6">Соцсети</h4>
              <div className="flex flex-col gap-2 text-sm font-light">
                <a href="#" className="hover:text-white/70 transition-colors">Instagram</a>
                <a href="#" className="hover:text-white/70 transition-colors">Telegram</a>
                <a href="#" className="hover:text-white/70 transition-colors">WhatsApp</a>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-xs text-white/40 border-t border-white/10 pt-8 uppercase tracking-widest font-semibold">
          <p>© {new Date().getFullYear()} Extendess. Все права защищены.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">Политика конфиденциальности</a>
            <a href="#" className="hover:text-white transition-colors">Лицензии</a>
          </div>
        </div>
      </div>
    </footer>
  );
}