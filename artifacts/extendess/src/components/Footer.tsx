import { useState } from "react";
import logoUrl from "@assets/logo-big_1776857562328.png";
import { Link } from "wouter";

function TelegramIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12L7.16 13.947l-2.96-.924c-.643-.204-.657-.643.136-.953l11.57-4.461c.537-.194 1.006.131.988.612z"/>
    </svg>
  );
}

function VkIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M15.684 0H8.316C1.592 0 0 1.592 0 8.316v7.368C0 22.408 1.592 24 8.316 24h7.368C22.408 24 24 22.408 24 15.684V8.316C24 1.592 22.408 0 15.684 0zm3.692 17.123h-1.744c-.66 0-.864-.525-2.05-1.727-1.033-1-1.49-1.135-1.744-1.135-.356 0-.458.102-.458.593v1.575c0 .424-.135.677-1.253.677-1.846 0-3.896-1.118-5.335-3.202C4.624 10.857 4 8.408 4 7.952c0-.254.102-.491.593-.491h1.744c.44 0 .61.203.78.677.863 2.49 2.303 4.675 2.896 4.675.22 0 .322-.102.322-.66V9.721c-.068-1.186-.695-1.287-.695-1.71 0-.203.17-.407.44-.407h2.744c.373 0 .508.203.508.643v3.473c0 .372.17.508.271.508.22 0 .407-.136.813-.542 1.253-1.405 2.151-3.574 2.151-3.574.119-.254.322-.491.762-.491h1.744c.525 0 .644.27.525.643-.22 1.017-2.354 4.031-2.354 4.031-.186.305-.254.44 0 .78.186.254.796.779 1.203 1.253.745.847 1.32 1.558 1.473 2.05.17.49-.085.745-.576.745z"/>
    </svg>
  );
}

export function Footer() {
  const [email, setEmail] = useState("");

  return (
    <footer className="bg-[#111] text-white">
      {/* Top: Logo + Subscribe */}
      <div className="border-b border-white/10">
        <div className="container mx-auto px-6 py-14 flex flex-col md:flex-row items-start md:items-center justify-between gap-10">
          {/* Logo */}
          <Link href="/">
            <img
              src={logoUrl}
              alt="Extendess"
              className="h-16 object-contain"
              style={{ filter: "brightness(0) invert(1)" }}
            />
          </Link>

          {/* Subscribe block */}
          <div className="flex flex-col gap-4 w-full md:max-w-md">
            <p className="text-sm font-light text-white/80">Подпишитесь на рассылку</p>
            <div className="flex items-center gap-0 rounded-lg overflow-hidden">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                className="flex-1 bg-[#f0ebe4] text-black placeholder-black/40 text-sm font-light px-5 py-3.5 outline-none"
              />
              <button
                type="button"
                onClick={() => setEmail("")}
                className="bg-[#f0ebe4] text-black text-[10px] font-bold uppercase tracking-widest px-6 py-3.5 border-l border-black/10 hover:bg-white transition-colors"
              >
                Подписаться
              </button>
            </div>
            <p className="text-[10px] text-white/30 font-light">
              Отправляя данную информацию, Вы соглашаетесь на обработку{" "}
              <Link href="/contacts" className="underline hover:text-white/60 transition-colors">
                персональных данных
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Bottom: Nav + Social + Contacts */}
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
          {/* Гостям */}
          <div>
            <h4 className="text-xs font-normal text-white/90 mb-5">Гостям</h4>
            <ul className="flex flex-col gap-3">
              {[
                { label: "О салонах", href: "/salons" },
                { label: "Услуги", href: "/services" },
                { label: "Специалисты", href: "/team" },
                { label: "Подарочные сертификаты", href: "/contacts" },
              ].map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-xs font-light text-white/50 hover:text-white transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* События */}
          <div>
            <h4 className="text-xs font-normal text-white/90 mb-5">События</h4>
            <ul className="flex flex-col gap-3">
              {[
                { label: "Спецпредложения", href: "/services" },
                { label: "Новости", href: "/about" },
              ].map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-xs font-light text-white/50 hover:text-white transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Социальные сети */}
          <div>
            <h4 className="text-[9px] uppercase tracking-widest text-white/40 mb-5">Социальные сети</h4>
            <div className="flex items-center gap-3">
              <a
                href="https://t.me/extendess"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:text-white hover:border-white/50 transition-all"
              >
                <TelegramIcon />
              </a>
              <a
                href="https://vk.com/extendess"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:text-white hover:border-white/50 transition-all"
              >
                <VkIcon />
              </a>
            </div>
          </div>

          {/* Контакты */}
          <div>
            <h4 className="text-[9px] uppercase tracking-widest text-white/40 mb-5">Контакты</h4>
            <p className="text-[10px] text-white/40 font-light mb-1">Единый номер для записи</p>
            <p className="text-2xl font-light text-white tracking-tight mb-2">8 (945) 000-00-00</p>
            <p className="text-[10px] text-white/40 font-light">Ежедневно 10:00–22:00</p>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-3 text-[9px] text-white/25 uppercase tracking-widest">
          <p>© {new Date().getFullYear()} Extendess. Все права защищены.</p>
          <div className="flex gap-4">
            <Link href="/contacts" className="hover:text-white/50 transition-colors">Политика конфиденциальности</Link>
            <Link href="/contacts" className="hover:text-white/50 transition-colors">Лицензии</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
