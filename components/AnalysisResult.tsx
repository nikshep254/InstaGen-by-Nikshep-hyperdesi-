import React, { useMemo } from 'react';
import { Quote } from 'lucide-react';

interface AnalysisResultProps {
  content: string;
}

const EMOJI_SET = ['🕵️', '🧠', '💅', '☕', '🍷', '🎭', '👀', '🚩', '💀', '🤡', '📉', '📚', '🤐', '🙄', '🥀'];

const AnalysisResult: React.FC<AnalysisResultProps> = ({ content }) => {
  // Simple paragraph formatting
  const paragraphs = content.split('\n').filter(p => p.trim() !== '');

  // Generate random emojis
  const emojis = useMemo(() => {
    return Array.from({ length: 15 }).map((_, i) => ({
      id: i,
      char: EMOJI_SET[Math.floor(Math.random() * EMOJI_SET.length)],
      top: Math.floor(Math.random() * 90),
      left: Math.floor(Math.random() * 95),
      rot: Math.floor(Math.random() * 360),
      scale: 0.8 + Math.random(),
      opacity: 0.05 + Math.random() * 0.1
    }));
  }, [content]); // Regenerate if content changes

  return (
    <div className="relative rounded-3xl border border-gray-200 dark:border-white/10 overflow-hidden animate-in fade-in slide-in-from-bottom-8 duration-700 bg-transparent backdrop-blur-md">
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
              fontSize: '3rem' 
            }}
          >
            {e.char}
          </div>
        ))}
      </div>

      <div className="relative z-10 p-8 md:p-10 bg-white/30 dark:bg-black/20">
        <div className="flex items-center justify-center mb-8">
           <div className="bg-white/50 dark:bg-white/10 p-4 rounded-full backdrop-blur-sm shadow-sm">
              <Quote className="text-purple-600 dark:text-purple-400 w-8 h-8" />
           </div>
        </div>
        
        <article className="prose prose-lg dark:prose-invert max-w-none">
          {paragraphs.map((paragraph, index) => (
            <p key={index} className="text-[#1D1D1F] dark:text-gray-100 leading-relaxed mb-6 font-serif text-lg drop-shadow-sm">
              {paragraph}
            </p>
          ))}
        </article>

        <div className="mt-8 pt-8 border-t border-gray-200/30 dark:border-white/10 text-center">
           <p className="text-xs font-semibold uppercase tracking-widest text-gray-500 dark:text-gray-400">
             End of Analysis
           </p>
        </div>
      </div>
    </div>
  );
};

export default AnalysisResult;