
import React, { useState, useRef, useMemo } from 'react';
import { generateRoast } from '../services/geminiService.ts';
import { Flame, Upload, Image as ImageIcon, X } from 'lucide-react';
import MagicLoader from './MagicLoader.tsx';

const EMOJI_SET = ['🔥', '🍳', '🧨', '🌶️', '🥵', '🛑', '🚮', '🗑️', '🤡', '🚩', '💀', '👀', '📉'];

const RoastTool: React.FC = () => {
  const [image, setImage] = useState<string | null>(null);
  const [result, setResult] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Generate random emojis
  const emojis = useMemo(() => {
    if (!result) return [];
    return Array.from({ length: 15 }).map((_, i) => ({
      id: i,
      char: EMOJI_SET[Math.floor(Math.random() * EMOJI_SET.length)],
      top: Math.floor(Math.random() * 90),
      left: Math.floor(Math.random() * 95),
      rot: Math.floor(Math.random() * 360),
      scale: 0.8 + Math.random(),
      opacity: 0.05 + Math.random() * 0.1
    }));
  }, [result]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
        setResult(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRoast = async () => {
    if (!image) return;
    setIsLoading(true);
    try {
      const roast = await generateRoast(image);
      setResult(roast);
    } catch (error) {
      console.error(error);
      setResult("The roasting machine broke. Try a smaller image or try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="lg:col-span-5 bg-white dark:bg-[#1E293B] rounded-[2rem] shadow-xl shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-white/5 p-6 md:p-8">
        <div className="flex items-center gap-3 mb-6 md:mb-8">
          <div className="p-3 rounded-2xl bg-orange-50 dark:bg-orange-500/20 text-orange-500 dark:text-orange-400">
            <Flame size={24} />
          </div>
          <h2 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white">Roast My Feed</h2>
        </div>

        <div className="space-y-6">
          <p className="text-sm text-slate-600 dark:text-slate-300 font-bold">
            Upload a screenshot of your Instagram grid. Prepare to be humbled.
          </p>

          <div 
            onClick={() => fileInputRef.current?.click()}
            className={`border-2 border-dashed rounded-2xl p-8 md:p-10 text-center cursor-pointer transition-all hover:bg-slate-50 dark:hover:bg-white/5 ${image ? 'border-orange-500 bg-orange-50 dark:bg-orange-900/10' : 'border-slate-200 dark:border-white/20'}`}
          >
            <input 
              type="file" 
              ref={fileInputRef} 
              className="hidden" 
              accept="image/*" 
              onChange={handleFileChange} 
            />
            
            {image ? (
              <div className="relative inline-block">
                <img src={image} alt="Preview" className="max-h-48 rounded-lg shadow-lg" />
                <button 
                  onClick={(e) => { e.stopPropagation(); setImage(null); }}
                  className="absolute -top-3 -right-3 bg-red-500 text-white p-1 rounded-full shadow-md hover:bg-red-600"
                >
                  <X size={16} />
                </button>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-3 text-slate-400 dark:text-slate-300">
                <Upload size={32} />
                <span className="font-bold text-sm">Click to upload screenshot</span>
              </div>
            )}
          </div>

          <button
            onClick={handleRoast}
            disabled={!image || isLoading}
            className="w-full bg-orange-600 hover:bg-orange-700 text-white font-black text-lg py-3 md:py-4 px-6 rounded-xl transition-all transform active:scale-[0.99] disabled:opacity-70 disabled:grayscale shadow-xl shadow-orange-600/20"
          >
            {isLoading ? "Cooking..." : "🔥 Roast Me"}
          </button>
        </div>
      </div>

      <div className="lg:col-span-7">
        {result ? (
           <div className="relative rounded-[2rem] border border-slate-200 dark:border-white/10 animate-in zoom-in-95 duration-500 overflow-hidden bg-transparent backdrop-blur-md shadow-2xl shadow-slate-200/50 dark:shadow-none">
             {/* Emoji Backdrop */}
             <div className="absolute inset-0 pointer-events-none z-0 select-none">
              {emojis.map((e) => (
                <div 
                  key={e.id} 
                  style={{ 
                    position: 'absolute', 
                    top: `${e.top}%`, 
                    left: `${e.left}%`, 
                    transform: `rotate(${e.rot}deg) scale(${e.scale})`, 
                    opacity: e.opacity, 
                    fontSize: '2.5rem' 
                  }}
                >
                  {e.char}
                </div>
              ))}
            </div>

             <div className="relative z-10 p-6 md:p-10 bg-white/40 dark:bg-black/20">
               <div className="prose prose-lg dark:prose-invert max-w-none">
                 <div className="whitespace-pre-wrap font-bold text-slate-900 dark:text-white drop-shadow-sm text-sm md:text-base">
                   {result}
                 </div>
               </div>
             </div>
           </div>
        ) : (
          isLoading ? <MagicLoader /> : (
            <div className="hidden lg:flex flex-col items-center justify-center h-[400px] text-center opacity-60">
              <ImageIcon size={48} className="mb-4 text-slate-300 dark:text-slate-400" />
              <p className="text-xl font-bold text-slate-300 dark:text-slate-400">Waiting for evidence...</p>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default RoastTool;
