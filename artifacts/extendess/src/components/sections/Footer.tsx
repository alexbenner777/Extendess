export function Footer() {
  return (
    <footer className="bg-background py-12 border-t border-border">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-2xl font-serif tracking-widest uppercase text-primary">
            Extendess
          </div>
          
          <div className="flex gap-6 text-sm text-muted-foreground">
            <a href="#" className="hover:text-primary transition-colors">Instagram</a>
            <a href="#" className="hover:text-primary transition-colors">Telegram</a>
            <a href="#" className="hover:text-primary transition-colors">WhatsApp</a>
          </div>
        </div>
        
        <div className="mt-12 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-muted-foreground/60 border-t border-border/50 pt-8">
          <p>© {new Date().getFullYear()} Extendess. Все права защищены.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-foreground transition-colors">Политика конфиденциальности</a>
            <a href="#" className="hover:text-foreground transition-colors">Лицензии</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
