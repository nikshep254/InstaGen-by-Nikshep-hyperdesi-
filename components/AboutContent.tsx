
import React from 'react';
import { Wand2, ScanSearch, Flame, MessageSquare, User, Instagram } from 'lucide-react';

export const AboutContent = () => {
  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
       
       <div className="flex flex-col items-center text-center space-y-6 pb-10 border-b-4 border-slate-100 dark:border-white/5 border-dashed pt-4">
           
           {/* Crafted By Section */}
           <div className="flex flex-col items-center">
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 mb-2">Crafted By</span>
              <h3 className="text-4xl sm:text-5xl font-black tracking-tighter text-slate-900 dark:text-white uppercase" style={{ textShadow: '3px 3px 0px rgba(100,100,100,0.2)' }}>
                Nikshep Doggalli
              </h3>
              <div className="flex items-center gap-2 text-sm font-bold bg-black text-white px-4 py-1.5 transform skew-x-[-10deg] mt-3">
                 <span className="transform skew-x-[10deg] flex items-center gap-2 tracking-widest">
                   HYPERDESI STUDIOS
                 </span>
              </div>
           </div>

           {/* Connect Through Section */}
           <div className="pt-6 flex flex-col items-center">
             <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 mb-3">Connect Through</span>
             <a 
               href="https://instagram.com/nikkk.exe" 
               target="_blank" 
               rel="noopener noreferrer"
               className="inline-flex items-center gap-3 px-6 py-3 bg-brand hover:bg-brand-hover text-white font-bold border-[3px] border-black dark:border-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all group"
             >
               <Instagram size={18} className="group-hover:scale-110 transition-transform" />
               <span className="uppercase tracking-wide">@nikkk.exe</span>
             </a>
           </div>
       </div>

       {/* Features Grid - Retro Style */}
       <div className="space-y-6">
         <div className="text-center">
            <h3 className="inline-block text-xl font-black text-slate-900 dark:text-white border-b-4 border-brand px-4 py-1 uppercase tracking-tight transform -rotate-1">
              The Power Suite
            </h3>
         </div>
         
         <div className="grid md:grid-cols-2 gap-5">
            {[
              { icon: Wand2, title: "Bio Creator", desc: "Generate aesthetic bios instantly.", color: "text-brand" },
              { icon: Flame, title: "Roast My Feed", desc: "Brutal AI analysis of your vibes.", color: "text-orange-500" },
              { icon: MessageSquare, title: "Caption Writer", desc: "No more writer's block.", color: "text-blue-500" },
              { icon: ScanSearch, title: "Profile Analyzer", desc: "Deep psychological breakdown.", color: "text-purple-500" }
            ].map((feature, i) => (
              <div key={i} className="group relative p-5 bg-slate-50 dark:bg-white/5 border-[3px] border-slate-200 dark:border-white/10 hover:border-slate-900 dark:hover:border-white transition-colors">
                <div className="flex items-start gap-4">
                  <div className={`p-3 bg-white dark:bg-black border-2 border-slate-900 dark:border-white shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] dark:shadow-[3px_3px_0px_0px_rgba(255,255,255,1)] ${feature.color}`}>
                    <feature.icon size={24} strokeWidth={2.5} />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white uppercase tracking-wide text-sm mb-1">{feature.title}</h4>
                    <p className="text-xs font-medium text-slate-500 dark:text-slate-400 leading-relaxed">
                      {feature.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
         </div>
       </div>
    </div>
  );
}
