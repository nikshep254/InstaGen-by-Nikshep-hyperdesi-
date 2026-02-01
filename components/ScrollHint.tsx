
import React from 'react';
import { X, ArrowDown } from 'lucide-react';

interface ScrollHintProps {
  onClose: () => void;
}

const ScrollHint: React.FC<ScrollHintProps> = ({ onClose }) => {
  return (
    <div className="fixed bottom-6 right-6 z-50 animate-in slide-in-from-bottom-10 fade-in duration-700">
       <div className="relative bg-white/90 dark:bg-[#1C1C1E]/90 backdrop-blur-xl p-4 pr-10 rounded-2xl shadow-2xl border border-slate-200 dark:border-white/10 flex items-center gap-4 max-w-[280px]">
         <div className="p-3 bg-brand/10 rounded-full text-brand shrink-0">
           <ArrowDown size={20} className="animate-bounce" />
         </div>
         <div>
           <h4 className="font-bold text-sm text-slate-900 dark:text-white">Explore Features</h4>
           <p className="text-xs text-slate-500 dark:text-slate-400 leading-snug mt-1">
             Scroll down to find more tools for your profile.
           </p>
         </div>
         <button 
           onClick={onClose} 
           className="absolute top-2 right-2 p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-black/5 dark:hover:bg-white/10 rounded-full transition-colors"
         >
           <X size={14} />
         </button>
       </div>
    </div>
  );
};

export default ScrollHint;
