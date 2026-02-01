import React from 'react';
import { X } from 'lucide-react';
import { AboutContent } from './AboutContent.tsx';

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AboutModal: React.FC<AboutModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/40 backdrop-blur-md animate-in fade-in duration-300">
      <div className="relative bg-white/80 dark:bg-[#1C1C1E]/90 rounded-[2.5rem] w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl animate-in zoom-in-95 duration-300 border border-white/40 dark:border-white/10 backdrop-blur-2xl">
        
        {/* Animated Spotlight Background */}
        <div className="absolute inset-0 overflow-hidden rounded-[2.5rem] pointer-events-none">
           <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-gradient-to-br from-gray-200/40 via-white/0 to-transparent dark:from-white/5 dark:via-white/0 rounded-full blur-3xl opacity-50 animate-pulse"></div>
           <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-gradient-to-tl from-gray-200/40 via-white/0 to-transparent dark:from-white/5 dark:via-white/0 rounded-full blur-3xl opacity-50 animation-delay-2000 animate-pulse"></div>
        </div>
        
        <div className="sticky top-0 z-20 flex items-center justify-between p-6 bg-white/50 dark:bg-[#1C1C1E]/50 backdrop-blur-xl border-b border-gray-100 dark:border-white/5">
          <h2 className="text-2xl font-bold text-[#1D1D1F] dark:text-white flex items-center gap-2">
            About <span className="metal-shine font-extrabold">InstaGen</span>
          </h2>
          <button 
            onClick={onClose} 
            className="p-2 rounded-full bg-white/50 dark:bg-black/20 hover:bg-gray-100 dark:hover:bg-white/10 transition-colors group shadow-sm border border-transparent dark:border-white/5"
          >
            <X size={20} className="text-gray-500 dark:text-gray-300 group-hover:rotate-90 transition-transform duration-300" />
          </button>
        </div>
        
        <div className="relative p-6 md:p-8 z-10">
          <AboutContent />
           
           <div className="text-center pt-8 mt-2">
             <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.3em] opacity-80">
               Powered by Hyperdesi
             </p>
           </div>
        </div>
      </div>
    </div>
  );
};

export default AboutModal;