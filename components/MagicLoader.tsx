
import React, { useState, useEffect } from 'react';

const LOAD_EMOJIS = ['✨', '💿', '🎵', '🎹', '🌊', '🔥', '🔮', '💫', '🐊', '💙', '☁️'];

const MagicLoader: React.FC = () => {
  const [index, setIndex] = useState(0);
  const [seconds, setSeconds] = useState(5);

  useEffect(() => {
    // Cycle the main emoji
    const emojiInterval = setInterval(() => {
      setIndex((prev) => (prev + 1) % LOAD_EMOJIS.length);
    }, 200);
    
    // Countdown timer
    const timerInterval = setInterval(() => {
      setSeconds((prev) => {
        if (prev <= 1) return 1; // Stay at 1s if it takes longer
        return prev - 1;
      });
    }, 1000);

    return () => {
      clearInterval(emojiInterval);
      clearInterval(timerInterval);
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-[300px] w-full animate-in fade-in duration-500">
      <div className="relative flex items-center justify-center w-24 h-24">
        {/* Blue/White Glow Background (The "Buffer" effect) */}
        <div className="absolute inset-0 bg-blue-500/10 dark:bg-blue-400/20 rounded-full blur-2xl animate-pulse"></div>
        <div className="absolute inset-0 border-[3px] border-white/20 border-t-brand/50 rounded-full animate-spin-slow"></div>
        
        {/* Cycling Emoji */}
        <div className="text-5xl transform transition-all duration-200 ease-in-out select-none drop-shadow-sm scale-110">
          {LOAD_EMOJIS[index]}
        </div>
      </div>
      
      <p className="mt-8 text-[10px] font-bold uppercase tracking-[0.3em] text-slate-400 dark:text-slate-500 animate-pulse">
        Thinking...
      </p>

      {/* ETA Display */}
      <div className="mt-3 flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/5">
         <span className="text-sm animate-spin-slow" style={{ animationDuration: '3s' }}>⏳</span>
         <span className="text-xs font-mono font-medium text-slate-500 dark:text-slate-400">
           ETA: ~{seconds}s
         </span>
      </div>
    </div>
  );
};

export default MagicLoader;
