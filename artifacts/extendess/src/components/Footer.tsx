import logoUrl from "@assets/logo-big_1776857562328.png";
import { Link } from "wouter";

export function Footer() {
  return (
    <footer className="bg-black text-white py-8 border-t border-white/10">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
          <Link href="/">
            <img 
              src={logoUrl} 
              alt="Extendess" 
              className="h-8 object-contain" 
            />
          </Link>
          
          <div className="flex flex-col md:flex-row gap-6 md:gap-16">
            <div>
              <h4 className="text-[9px] uppercase tracking-widest text-white/40 mb-2">Адрес</h4>
              <p className="text-xs font-light text-white/70">Ленинский проспект, 45<br/>Москва, Россия</p>
            </div>
            <div>
              <h4 className="text-[9px] uppercase tracking-widest text-white/40 mb-2">Контакты</h4>
              <p className="text-xs font-light text-white/70">+7 (495) 123-45-67<br/>hello@extendess.ru</p>
            </div>
            <div>
              <h4 className="text-[9px] uppercase tracking-widest text-white/40 mb-2">Соцсети</h4>
              <div className="flex gap-4 text-xs font-light text-white/70">
                <a href="#" className="hover:text-white transition-colors">Instagram</a>
                <a href="#" className="hover:text-white transition-colors">Telegram</a>
                <a href="#" className="hover:text-white transition-colors">WhatsApp</a>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row justify-between items-center gap-3 text-[9px] text-white/30 border-t border-white/10 pt-4 uppercase tracking-widest">
          <p>© {new Date().getFullYear()} Extendess. Все права защищены.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-white transition-colors">Политика конфиденциальности</a>
            <a href="#" className="hover:text-white transition-colors">Лицензии</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
