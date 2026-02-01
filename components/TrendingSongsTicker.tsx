
import React, { useEffect, useState } from 'react';
import { Music, TrendingUp } from 'lucide-react';
import { getDailyTrendingSongs } from '../services/geminiService.ts';

// Initial fallback data to render immediately
const FALLBACK_SONGS = [
  { id: 1, title: "Espresso", artist: "Sabrina Carpenter" },
  { id: 2, title: "BIRDS OF A FEATHER", artist: "Billie Eilish" },
  { id: 3, title: "Good Luck, Babe!", artist: "Chappell Roan" },
  { id: 4, title: "Not Like Us", artist: "Kendrick Lamar" },
  { id: 5, title: "Million Dollar Baby", artist: "Tommy Richman" },
  { id: 6, title: "A Bar Song (Tipsy)", artist: "Shaboozey" },
  { id: 7, title: "Please Please Please", artist: "Sabrina Carpenter" },
  { id: 8, title: "Too Sweet", artist: "Hozier" },
  { id: 9, title: "I Had Some Help", artist: "Post Malone" },
  { id: 10, title: "LUNCH", artist: "Billie Eilish" },
  { id: 11, title: "Fortnight", artist: "Taylor Swift" },
  { id: 12, title: "Beautiful Things", artist: "Benson Boone" },
  { id: 13, title: "Gata Only", artist: "FloyyMenor" },
  { id: 14, title: "Lose Control", artist: "Teddy Swims" },
  { id: 15, title: "Texas Hold 'Em", artist: "Beyoncé" },
  { id: 16, title: "End of Beginning", artist: "Djo" },
  { id: 17, title: "Saturn", artist: "SZA" },
  { id: 18, title: "We Can't Be Friends", artist: "Ariana Grande" },
  { id: 19, title: "Like That", artist: "Future" },
  { id: 20, title: "Austin", artist: "Dasha" },
];

interface Song {
  id: number;
  title: string;
  artist: string;
}

const MarqueeRow: React.FC<{ songs: Song[], direction: 'left' | 'right', speed?: number }> = ({ songs, direction, speed = 40 }) => {
  // Ensure we render something even if empty, to maintain height
  if (!songs || songs.length === 0) return <div className="h-12 w-full"></div>;

  return (
    <div className="flex w-max mb-4 last:mb-0 hover:[animation-play-state:paused]">
       <div 
         className={`flex items-center gap-4 ${direction === 'left' ? 'animate-scroll-left' : 'animate-scroll-right'}`}
         style={{ animationDuration: `${speed}s`, transform: 'translate3d(0,0,0)' }}
       >
          {/* Quadruple duplication to ensure seamless infinite scroll on wide screens */}
          {[...songs, ...songs, ...songs, ...songs].map((song, idx) => (
             <div 
              key={`${song.id}-${idx}-${direction}`}
              className="flex items-center gap-3 px-4 py-2 bg-white/60 dark:bg-[#1C1C1E]/60 backdrop-blur-md border border-white/40 dark:border-white/5 rounded-full whitespace-nowrap group transition-colors hover:bg-white dark:hover:bg-white/10 hover:border-brand/30"
             >
               <div className="flex items-center justify-center w-6 h-6 rounded-full bg-brand/10 dark:bg-brand/20 text-brand">
                 <Music size={12} className="group-hover:animate-bounce" />
               </div>
               
               <div className="flex items-baseline gap-2">
                 <span className="text-sm font-black text-slate-900 dark:text-white leading-none">{song.title}</span>
                 <span className="text-xs font-medium text-slate-500 dark:text-slate-400 leading-none">•</span>
                 <span className="text-xs font-bold text-slate-500 dark:text-slate-400 leading-none">{song.artist}</span>
               </div>
             </div>
          ))}
       </div>
    </div>
  );
};

const TrendingSongsTicker: React.FC = () => {
  // Initialize immediately with fallback to avoid layout shift/invisible state
  const [row1Songs, setRow1Songs] = useState<Song[]>(FALLBACK_SONGS.slice(0, 10));
  const [row2Songs, setRow2Songs] = useState<Song[]>(FALLBACK_SONGS.slice(10));
  
  useEffect(() => {
    const fetchSongs = async () => {
      const today = new Date().toISOString().split('T')[0];
      const cacheKey = `instagen_trending_songs_text_v1_${today}`; // New cache key for text-only version
      
      // Cleanup old cache entries to keep 24/7 updates clean
      Object.keys(localStorage).forEach(key => {
        if (key.startsWith('instagen_trending_songs_text_v1_') && key !== cacheKey) {
          localStorage.removeItem(key);
        }
      });

      let allSongs = [...FALLBACK_SONGS];

      // Check Cache
      const cachedData = localStorage.getItem(cacheKey);
      if (cachedData) {
        try {
          const parsed = JSON.parse(cachedData);
          if (Array.isArray(parsed) && parsed.length > 0) {
            allSongs = parsed;
          }
        } catch (e) {
          console.error("Cache parse error", e);
        }
      } else {
        // Fetch Fresh if no cache
        try {
          const freshSongs = await getDailyTrendingSongs();
          if (freshSongs && freshSongs.length > 0) {
             const mergedSongs = freshSongs.map((fs, idx) => ({
               id: idx + 200,
               title: fs.title,
               artist: fs.artist,
             }));
             allSongs = mergedSongs;
             
             // Update Cache
             localStorage.setItem(cacheKey, JSON.stringify(mergedSongs));
          }
        } catch (e) {
          console.warn("Using fallback songs due to API error", e);
        }
      }

      // Ensure we have enough items for the marquee to loop smoothly
      if (allSongs.length < 20) {
         allSongs = [...allSongs, ...FALLBACK_SONGS.slice(0, 20 - allSongs.length)];
      }

      const mid = Math.ceil(allSongs.length / 2);
      setRow1Songs(allSongs.slice(0, mid));
      setRow2Songs(allSongs.slice(mid));
    };

    fetchSongs();
  }, []);

  return (
    // Outer Wrapper with higher Z-index
    <div className="w-full mt-12 mb-4 relative z-10 min-h-[120px]">
      
      {/* Label - Absolute positioned to pop out */}
      <div className="absolute -top-3 left-6 z-40 bg-brand text-white px-3 py-1 rounded-full shadow-lg shadow-brand/30 border border-white/20 transform -rotate-2 flex items-center gap-1">
        <TrendingUp size={12} className="stroke-[3px]" />
        <span className="text-[10px] font-black uppercase tracking-widest">Trending Audio</span>
      </div>

      {/* Main Content Box */}
      <div className="w-full py-6 overflow-hidden relative border-t border-b border-white/20 bg-gradient-to-b from-white/10 to-white/5 dark:from-white/5 dark:to-black/20 backdrop-blur-lg">
        
        {/* Side Fades */}
        <div className="absolute top-0 left-0 h-full w-24 bg-gradient-to-r from-[#F5F5F7] dark:from-black to-transparent z-20 pointer-events-none"></div>
        <div className="absolute top-0 right-0 h-full w-24 bg-gradient-to-l from-[#F5F5F7] dark:from-black to-transparent z-20 pointer-events-none"></div>
        
        <div className="flex flex-col gap-3">
           <MarqueeRow songs={row1Songs} direction="left" speed={60} />
           <MarqueeRow songs={row2Songs} direction="right" speed={70} />
        </div>
      </div>
      
      <style>{`
        @keyframes scroll-left {
          0% { transform: translate3d(0,0,0); }
          100% { transform: translate3d(-25%,0,0); } 
        }
        @keyframes scroll-right {
          0% { transform: translate3d(-25%,0,0); }
          100% { transform: translate3d(0,0,0); }
        }
        .animate-scroll-left {
          animation: scroll-left linear infinite;
        }
        .animate-scroll-right {
          animation: scroll-right linear infinite;
        }
      `}</style>
    </div>
  );
};

export default TrendingSongsTicker;
