import { Eye } from "lucide-react";

const Header = () => {
  return (
    <header className="relative py-6 sm:py-8 px-3 sm:px-4 border-b border-border">
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/5" />
      
      <div className="relative max-w-4xl mx-auto text-center">
        <div className="flex items-center justify-center gap-2 sm:gap-3 mb-2">
          <Eye className="w-5 h-5 sm:w-8 sm:h-8 text-primary animate-flicker" />
          <span className="text-[10px] sm:text-xs text-muted-foreground tracking-[0.2em] sm:tracking-[0.3em] uppercase">
            [CLASSIFIED]
          </span>
          <Eye className="w-5 h-5 sm:w-8 sm:h-8 text-primary animate-flicker" />
        </div>
        
        <h1 className="text-3xl sm:text-4xl md:text-6xl font-display font-black text-foreground animate-glitch text-glow">
          MK ULTRA
        </h1>
        <h2 className="text-xl sm:text-2xl md:text-3xl font-display font-bold text-primary mt-1 sm:mt-2">
          OPP LIST
        </h2>
        
        <div className="mt-3 sm:mt-4 flex flex-wrap items-center justify-center gap-2 sm:gap-4 text-[10px] sm:text-xs text-muted-foreground">
          <span className="px-2 py-1 border border-border">CLEARANCE: OMEGA</span>
          <span className="w-2 h-2 bg-primary rounded-full animate-pulse hidden sm:block" />
          <span className="px-2 py-1 border border-border">STATUS: ACTIVE</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
