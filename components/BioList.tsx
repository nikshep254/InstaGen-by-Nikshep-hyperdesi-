
import React, { useState } from 'react';
import { GeneratedBio } from '../types.ts';
import { Copy, Check, Share2 } from 'lucide-react';

interface BioListProps {
  bios: GeneratedBio[];
}

const BioCard: React.FC<{ bio: GeneratedBio; index: number }> = ({ bio, index }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(bio.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div 
      className="group relative rounded-3xl bg-white dark:bg-[#0F0F11] border border-gray-100 dark:border-white/10 p-6 transition-all duration-300 hover:shadow-2xl hover:shadow-brand/5 hover:-translate-y-1 hover:border-brand/30"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className="flex justify-between items-start mb-4">
         <div className="px-3 py-1 rounded-full bg-slate-100 dark:bg-white/10 border border-slate-200 dark:border-white/5">
            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-600 dark:text-white">
              {bio.style}
            </span>
         </div>
         <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              onClick={handleCopy}
              className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-white/10 text-slate-400 hover:text-brand transition-colors"
            >
               {copied ? <Check size={16} /> : <Copy size={16} />}
            </button>
         </div>
      </div>

      <p className="text-lg text-black dark:text-white font-semibold leading-relaxed font-sans mb-6 drop-shadow-sm">
        {bio.content}
      </p>

      <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-white/10">
        <span className="text-xs text-slate-400 dark:text-slate-400 font-mono font-bold">
           {bio.content.length} / 150
        </span>
        <button 
           onClick={handleCopy}
           className={`text-xs font-black uppercase tracking-wide transition-colors ${copied ? 'text-green-500' : 'text-brand hover:text-brand-hover'}`}
        >
          {copied ? 'Copied to clipboard' : 'Copy Text'}
        </button>
      </div>
    </div>
  );
};

const BioList: React.FC<BioListProps> = ({ bios }) => {
  return (
    <div className="flex flex-col gap-4 animate-in fade-in slide-in-from-bottom-8 duration-700">
      <div className="flex items-center gap-4 mb-2 opacity-80">
        <div className="h-px flex-1 bg-slate-300 dark:bg-white/20"></div>
        <span className="text-xs font-mono uppercase font-bold text-slate-500 dark:text-slate-300">Generated Results</span>
        <div className="h-px flex-1 bg-slate-300 dark:bg-white/20"></div>
      </div>
      {bios.map((bio, index) => (
        <BioCard key={index} bio={bio} index={index} />
      ))}
    </div>
  );
};

export default BioList;
