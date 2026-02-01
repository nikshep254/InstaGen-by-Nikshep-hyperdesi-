
import React, { useState, useEffect } from 'react';
import { Instagram, Twitter } from 'lucide-react';

interface HeaderProps {
  onOpenAbout: () => void;
  showDashboard: boolean;
  onNavigateHome: () => void;
  platform: 'instagram' | 'twitter';
  setPlatform: (p: 'instagram' | 'twitter') => void;
}

const Header: React.FC<HeaderProps> = ({ onOpenAbout, showDashboard, onNavigateHome, platform, setPlatform }) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={`fixed top-0 left-0 right-0 z-[100] flex justify-center px-2 md:px-4 transition-all duration-500 ease-out ${scrolled ? 'pt-2 md:pt-4' : 'pt-4 md:pt-6'}`}>
      <header 
        className={`relative w-full max-w-4xl transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] overflow-hidden
          ${scrolled 
            ? 'bg-white/70 dark:bg-[#1C1C1E]/70 backdrop-blur-2xl border border-gray-200/50 dark:border-white/10 rounded-full py-2 shadow-2xl shadow-black/5 dark:shadow-black/40' 
            : 'bg-transparent border border-transparent py-2 md:py-4'
          }`}
      >
        {/* === RETRO PIXEL LAYER === */}
        <div className="absolute top-0 left-0 w-full h-[2px] opacity-20 pointer-events-none">
           <div className="w-full h-full flex animate-pixel-scroll">
              {Array.from({ length: 40 }).map((_, i) => (
                <div key={i} className={`w-8 h-full ${i % 2 === 0 ? 'bg-transparent' : 'bg-brand/30'}`}></div>
              ))}
           </div>
        </div>
        
        {/* Mario-style Runner */}
        <div className="absolute -top-[2px] left-10 animate-pixel-run pointer-events-none hidden md:block opacity-60 mix-blend-overlay">
           <div className="w-1.5 h-1.5 bg-red-500 shadow-[1.5px_0_0_0_#ef4444,3px_0_0_0_#ef4444,0_1.5px_0_0_#ef4444,1.5px_1.5px_0_0_#b91c1c,3px_1.5px_0_0_#b91c1c,4.5px_1.5px_0_0_#ef4444,1.5px_3px_0_0_#ef4444,3px_3px_0_0_#ef4444,0_4.5px_0_0_#000,4.5px_4.5px_0_0_#000]"></div>
        </div>
        {/* ========================== */}

        <div className="px-3 md:px-6 flex items-center justify-between relative z-10">
          
          {/* Logo Section */}
          <div className="flex items-center gap-2 md:gap-3 cursor-pointer group" onClick={onNavigateHome}>
            <div className="relative">
              <div className="absolute inset-0 bg-green-500/20 blur-lg rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="flex items-center justify-center w-8 h-8 md:w-10 md:h-10 bg-white/10 dark:bg-white/5 rounded-xl md:rounded-2xl border border-white/20 dark:border-white/10 relative z-10 transform group-hover:scale-110 transition-transform duration-300">
                <span className="text-xl md:text-2xl filter drop-shadow-sm">🐊</span>
              </div>
            </div>
            <span className={`font-display font-bold text-base md:text-lg tracking-tight transition-colors ${scrolled ? 'text-[#1D1D1F] dark:text-[#F5F5F7]' : 'text-[#1D1D1F] dark:text-[#F5F5F7]'}`}>
              {platform === 'instagram' ? 'Insta' : 'Social'}Gen<span className="text-green-500">.</span>
            </span>
          </div>
          
          {/* Controls */}
          <div className="flex items-center gap-2 md:gap-3">
             {/* Platform Switcher */}
             <div className="flex items-center bg-slate-100 dark:bg-white/10 rounded-full p-1 border border-slate-200 dark:border-white/5">
                <button 
                  onClick={() => setPlatform('instagram')}
                  className={`p-1.5 md:p-2 rounded-full transition-all duration-300 ${platform === 'instagram' ? 'bg-white dark:bg-black shadow-sm text-pink-600' : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-200'}`}
                >
                  <Instagram size={14} className="md:w-4 md:h-4" strokeWidth={platform === 'instagram' ? 2.5 : 2} />
                </button>
                <button 
                  onClick={() => setPlatform('twitter')}
                  className={`p-1.5 md:p-2 rounded-full transition-all duration-300 ${platform === 'twitter' ? 'bg-white dark:bg-black shadow-sm text-black dark:text-white' : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-200'}`}
                >
                  <Twitter size={14} className="md:w-4 md:h-4" strokeWidth={platform === 'twitter' ? 2.5 : 2} />
                </button>
             </div>

             <button
                onClick={onOpenAbout}
                className={`flex items-center gap-1 md:gap-2 px-3 py-1.5 md:px-4 md:py-2 text-[10px] md:text-xs font-bold uppercase tracking-widest rounded-full transition-all border
                  ${scrolled 
                    ? 'border-gray-200 dark:border-white/10 hover:bg-gray-100 dark:hover:bg-white/10 text-gray-600 dark:text-gray-300' 
                    : 'bg-white/90 dark:bg-white/10 border-white/20 dark:border-white/5 backdrop-blur-md shadow-lg text-[#1D1D1F] dark:text-[#F5F5F7] hover:scale-105'
                  }`}
              >
                <span>Builder</span> <span className="text-sm md:text-base">🥷</span>
              </button>
          </div>
        </div>
        
        <style>{`
          @keyframes pixel-scroll {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .animate-pixel-scroll {
            animation: pixel-scroll 8s linear infinite;
          }
          @keyframes pixel-run {
            0% { left: -10px; }
            100% { left: 110%; }
          }
          .animate-pixel-run {
            animation: pixel-run 15s linear infinite;
          }
        `}</style>
      </header>
    </div>
  );
};

export default Header;
