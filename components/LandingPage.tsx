
import React, { useState } from 'react';
import { 
  ArrowRight, Check, X as XIcon, Repeat, Clock, CalendarClock, 
  Instagram, Twitter, Ghost, Sparkles, Smartphone, Fingerprint, Wand2, 
  ScanSearch, Flame, MessageSquare, ChevronRight
} from 'lucide-react';
import TypewriterTitle from './TypewriterTitle.tsx';

interface LandingPageProps {
  onStart: () => void;
  platform?: 'instagram' | 'twitter';
}

const HERO_PHRASES = [
  "INSTAGRAM BIOS",
  "VIRAL THREADS",
  "PROFILE AUDITS",
  "CONTENT STRATEGY",
  "DIGITAL AESTHETICS"
];

const LandingPage: React.FC<LandingPageProps> = ({ onStart, platform = 'instagram' }) => {
  const [step, setStep] = useState(0);
  const totalSteps = 4;

  const handleNext = () => {
    if (step < totalSteps - 1) {
      setStep(prev => prev + 1);
    } else {
      onStart();
    }
  };

  const steps = [
    { id: 'welcome', title: 'Welcome' },
    { id: 'why', title: 'Why SocialGen?' },
    { id: 'tools', title: 'Stay on Track' },
    { id: 'builder', title: 'The Builder' },
  ];

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center p-2 sm:p-4 overflow-hidden">
      
      {/* Background FX */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-brand/10 rounded-full blur-[120px] pointer-events-none animate-pulse-glow"></div>
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[100px] pointer-events-none"></div>

      {/* Main Card Container */}
      <div className="relative w-full max-w-6xl h-full max-h-[90vh] md:max-h-[85vh] bg-white/60 dark:bg-[#0F0F11]/80 backdrop-blur-2xl rounded-3xl md:rounded-[3rem] border border-white/40 dark:border-white/10 shadow-2xl flex flex-col overflow-hidden transition-all duration-500">
        
        {/* Progress Bar (Mobile) */}
        <div className="absolute top-0 left-0 h-1 bg-brand transition-all duration-500 z-50 md:hidden" style={{ width: `${((step + 1) / totalSteps) * 100}%` }}></div>

        {/* Content Area */}
        <div className="flex-grow overflow-y-auto overflow-x-hidden relative scroll-smooth">
          <div className="min-h-full p-5 md:p-12 flex flex-col items-center justify-center">
            
            {/* --- STEP 1: WELCOME --- */}
            {step === 0 && (
              <div className="w-full flex flex-col items-center text-center space-y-6 md:space-y-10 animate-in fade-in slide-in-from-right-8 duration-500">
                <div className="space-y-4 md:space-y-6">
                  <h1 className="text-4xl md:text-8xl font-display font-black tracking-tighter text-slate-900 dark:text-white leading-[0.9] drop-shadow-xl">
                    SUPERCHARGE
                  </h1>
                  <div className="text-lg md:text-3xl font-display font-bold text-brand h-8 flex items-center justify-center tracking-tight drop-shadow-lg">
                    <TypewriterTitle phrases={HERO_PHRASES} />
                  </div>
                  <p className="max-w-xl mx-auto text-base md:text-lg text-slate-800 dark:text-slate-200 font-semibold leading-relaxed drop-shadow-sm px-2">
                    The ultimate AI toolkit for digital maximalists. 
                    Switch between <b className="text-pink-500">Instagram</b> and <b className="text-blue-500">Twitter</b> modes to dominate every feed.
                  </p>
                </div>

                {/* Creator Card */}
                <div 
                  className="relative group bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 p-4 md:p-6 rounded-3xl flex items-center gap-4 md:gap-5 hover:border-brand/50 transition-all duration-300 cursor-pointer shadow-lg hover:shadow-xl hover:-translate-y-1"
                  onClick={() => window.open('https://instagram.com/nikkk.exe', '_blank')}
                >
                  <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-500 p-[2px]">
                    <div className="w-full h-full rounded-full bg-white dark:bg-black flex items-center justify-center text-xl md:text-2xl overflow-hidden">
                       🐊
                    </div>
                  </div>
                  <div className="text-left">
                    <div className="text-[10px] md:text-xs font-bold uppercase tracking-wider text-brand mb-1">Created By</div>
                    <h3 className="text-base md:text-lg font-bold text-slate-900 dark:text-white">Nikshep Doggalli</h3>
                    <div className="flex items-center gap-1 text-xs md:text-sm text-brand font-medium">
                      <Instagram size={14} /> @nikkk.exe
                    </div>
                  </div>
                  <div className="ml-4 opacity-0 group-hover:opacity-100 transition-opacity text-slate-400 dark:text-white hidden sm:block">
                    <ArrowRight size={20} />
                  </div>
                </div>
              </div>
            )}

            {/* --- STEP 2: WHY SOCIALGEN --- */}
            {step === 1 && (
              <div className="w-full animate-in fade-in slide-in-from-right-8 duration-500">
                <div className="text-center mb-6 md:mb-10">
                   <h2 className="text-2xl md:text-4xl font-display font-bold text-slate-900 dark:text-white mb-2 drop-shadow-md">
                     {platform === 'instagram' ? 'Why InstaGen?' : 'Why Switch to X?'}
                   </h2>
                   <p className="text-sm md:text-base text-slate-600 dark:text-slate-200 font-medium">Upgrade your workflow instantly.</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 max-w-6xl mx-auto">
                   {/* Card 1: Features */}
                   <div className="bg-white dark:bg-white/5 rounded-3xl md:rounded-[2.5rem] p-6 md:p-8 border border-green-100 dark:border-green-500/10 shadow-xl shadow-slate-200/40 dark:shadow-none relative overflow-hidden group">
                      <div className="absolute top-0 left-0 w-full h-1 bg-green-500"></div>
                      <div className="text-3xl md:text-5xl mb-4 md:mb-6 transform group-hover:scale-110 transition-transform duration-300">🥳</div>
                      <h3 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white mb-4 md:mb-6">Powerful Features</h3>
                      <ul className="space-y-3 md:space-y-4">
                        {[
                          "Viral Thread Generator (X)",
                          "Aesthetic Bio Architect",
                          "Reply Guy / Rizz Tool",
                          "Hot Take Generator",
                          "Deep Profile Audits"
                        ].map((item, i) => (
                          <li key={i} className="flex items-start gap-3">
                            <div className="mt-0.5 min-w-[20px] h-5 rounded-full bg-green-100 dark:bg-green-500/20 text-green-600 dark:text-green-400 flex items-center justify-center">
                              <Check size={12} strokeWidth={3} />
                            </div>
                            <span className="text-slate-700 dark:text-slate-100 font-semibold text-sm">{item}</span>
                          </li>
                        ))}
                      </ul>
                   </div>

                   {/* Card 2: Other Tools */}
                   <div className="bg-white dark:bg-white/5 rounded-3xl md:rounded-[2.5rem] p-6 md:p-8 border border-gray-100 dark:border-white/5 shadow-lg relative overflow-hidden opacity-90">
                      <div className="absolute top-0 left-0 w-full h-1 bg-red-400"></div>
                      <div className="text-3xl md:text-5xl mb-4 md:mb-6">😖</div>
                      <h3 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white mb-4 md:mb-6">Other Tools</h3>
                      <ul className="space-y-3 md:space-y-4">
                        {[
                          "Generic ChatGPT responses",
                          "Expensive monthly subs",
                          "Complicated interfaces",
                          "Boring templates",
                          "Limited free tiers"
                        ].map((item, i) => (
                          <li key={i} className="flex items-start gap-3">
                             <div className="mt-0.5 min-w-[20px] h-5 rounded-full bg-red-100 dark:bg-red-500/20 text-red-600 dark:text-red-400 flex items-center justify-center">
                              <XIcon size={12} strokeWidth={3} />
                            </div>
                            <span className="text-slate-600 dark:text-slate-300 font-medium text-sm">{item}</span>
                          </li>
                        ))}
                      </ul>
                   </div>

                   {/* Card 3: Current Workflow */}
                   <div className="bg-slate-50 dark:bg-white/5 rounded-3xl md:rounded-[2.5rem] p-6 md:p-8 border border-transparent opacity-70 scale-95 grayscale hover:grayscale-0 hover:scale-100 hover:opacity-100 transition-all duration-300 hidden md:block">
                      <div className="text-5xl mb-6">🤬</div>
                      <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6">Current Workflow</h3>
                      <ul className="space-y-4">
                        {[
                          "Writer's block forever",
                          "Switching between apps",
                          "Copy-pasting notes",
                          "Inconsistent aesthetic",
                          "Zero engagement"
                        ].map((item, i) => (
                          <li key={i} className="flex items-start gap-3">
                             <div className="mt-0.5 min-w-[20px] h-5 rounded-full bg-slate-200 dark:bg-white/10 text-slate-500 dark:text-slate-300 flex items-center justify-center">
                              <XIcon size={12} strokeWidth={3} />
                            </div>
                            <span className="text-slate-500 dark:text-slate-300 font-medium text-sm">{item}</span>
                          </li>
                        ))}
                      </ul>
                   </div>
                </div>
              </div>
            )}

            {/* --- STEP 3: TOOLS --- */}
            {step === 2 && (
              <div className="w-full animate-in fade-in slide-in-from-right-8 duration-500">
                <div className="text-center mb-6 md:mb-10">
                   <h2 className="text-2xl md:text-4xl font-display font-bold text-slate-900 dark:text-white mb-2 drop-shadow-md">Stay on Track</h2>
                   <p className="text-sm md:text-base text-slate-600 dark:text-slate-200 font-medium">Smart tools to automate your growth.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
                  {/* Card 1: Recurring */}
                  <div className="bg-white dark:bg-white/5 rounded-3xl md:rounded-[2.5rem] p-6 md:p-8 border border-gray-100 dark:border-white/5 shadow-xl hover:-translate-y-2 transition-transform duration-300 flex flex-col items-center text-center">
                     <div className="w-12 h-12 md:w-16 md:h-16 bg-blue-50 dark:bg-blue-500/20 rounded-2xl flex items-center justify-center mb-4 md:mb-6 text-blue-600 dark:text-blue-400">
                       <Repeat size={24} className="md:w-8 md:h-8" />
                     </div>
                     <h3 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white mb-2">Recurring Posts</h3>
                     <p className="text-slate-600 dark:text-slate-300 text-sm mb-4 md:mb-6">Automate your weekly content rhythm.</p>
                     
                     {/* Mini UI */}
                     <div className="w-full bg-slate-50 dark:bg-black/20 rounded-xl p-3 flex items-center gap-3 text-left">
                       <div className="p-2 bg-white dark:bg-white/10 rounded-lg shadow-sm"><Repeat size={14}/></div>
                       <div>
                         <div className="font-bold text-xs text-slate-900 dark:text-white">Weekly Drop</div>
                         <div className="text-[10px] text-slate-500 dark:text-slate-400">Mon @ 9AM</div>
                       </div>
                     </div>
                  </div>

                  {/* Card 2: Best Times */}
                  <div className="bg-white dark:bg-white/5 rounded-3xl md:rounded-[2.5rem] p-6 md:p-8 border border-gray-100 dark:border-white/5 shadow-xl hover:-translate-y-2 transition-transform duration-300 flex flex-col items-center text-center">
                     <div className="w-12 h-12 md:w-16 md:h-16 bg-yellow-50 dark:bg-yellow-500/20 rounded-2xl flex items-center justify-center mb-4 md:mb-6 text-yellow-600 dark:text-yellow-400">
                       <Clock size={24} className="md:w-8 md:h-8" />
                     </div>
                     <h3 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white mb-2">Smart Scheduling</h3>
                     <p className="text-slate-600 dark:text-slate-300 text-sm mb-4 md:mb-6">Post when your audience is awake.</p>

                     {/* Mini UI */}
                     <div className="w-full space-y-2">
                       <div className="bg-slate-50 dark:bg-black/20 rounded-lg p-2 px-3 flex items-center justify-between">
                          <span className="text-xs font-bold text-slate-900 dark:text-white">9:00 AM</span>
                          <span className="text-[10px] font-bold text-green-600 bg-green-100 dark:bg-green-500/20 px-1.5 py-0.5 rounded">High</span>
                       </div>
                     </div>
                  </div>

                  {/* Card 3: Timeslots */}
                  <div className="bg-white dark:bg-white/5 rounded-3xl md:rounded-[2.5rem] p-6 md:p-8 border border-gray-100 dark:border-white/5 shadow-xl hover:-translate-y-2 transition-transform duration-300 flex flex-col items-center text-center hidden md:flex">
                     <div className="w-16 h-16 bg-purple-50 dark:bg-purple-500/20 rounded-2xl flex items-center justify-center mb-6 text-purple-600 dark:text-purple-400">
                       <CalendarClock size={32} />
                     </div>
                     <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Timeslots</h3>
                     <p className="text-slate-600 dark:text-slate-300 text-sm mb-6">Rapid fire scheduling slots.</p>

                     {/* Mini UI */}
                     <div className="w-full grid grid-cols-3 gap-2">
                       {['9AM', '1PM', '6PM'].map(t => (
                         <div key={t} className="py-1.5 bg-slate-50 dark:bg-black/20 rounded text-[10px] font-bold text-slate-600 dark:text-slate-300">{t}</div>
                       ))}
                     </div>
                  </div>
                </div>
              </div>
            )}

            {/* --- STEP 4: BUILDER CARD --- */}
            {step === 3 && (
              <div className="w-full flex flex-col items-center text-center animate-in fade-in slide-in-from-right-8 duration-500">
                 <div className="bg-brand/10 dark:bg-white/5 p-6 md:p-8 rounded-full mb-4 md:mb-8 animate-bounce-slow">
                   <Wand2 size={48} className="md:w-16 md:h-16 text-brand" />
                 </div>
                 <h1 className="text-4xl md:text-7xl font-display font-black text-slate-900 dark:text-white mb-4 md:mb-6 drop-shadow-xl">
                   Ready to Build?
                 </h1>
                 <p className="text-base md:text-xl text-slate-600 dark:text-slate-200 max-w-2xl mb-8 md:mb-12 font-semibold px-4">
                   Your all-in-one toolkit for digital domination is ready.
                   Bios, Roasts, Captions, Threads, and Strategy await.
                 </p>
                 
                 <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 md:mb-12 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
                   {[Wand2, Flame, MessageSquare, ScanSearch].map((Icon, i) => (
                     <div key={i} className="p-3 md:p-4 bg-slate-100 dark:bg-white/5 rounded-2xl flex items-center justify-center">
                       <Icon size={20} className="md:w-6 md:h-6 text-slate-900 dark:text-white"/>
                     </div>
                   ))}
                 </div>
              </div>
            )}

          </div>
        </div>

        {/* --- BOTTOM NAVIGATION BAR --- */}
        <div className="p-4 md:p-8 border-t border-slate-200/50 dark:border-white/5 bg-white/50 dark:bg-black/20 backdrop-blur-md flex items-center justify-between z-20">
           
           {/* Step Indicators */}
           <div className="flex items-center gap-2">
             {steps.map((s, i) => (
               <button 
                 key={s.id}
                 onClick={() => setStep(i)}
                 className={`transition-all duration-300 rounded-full ${i === step ? 'w-6 h-1.5 md:w-8 md:h-2 bg-brand' : 'w-1.5 h-1.5 md:w-2 md:h-2 bg-slate-300 dark:bg-white/20 hover:bg-slate-400 dark:hover:bg-white/40'}`}
                 aria-label={s.title}
               />
             ))}
           </div>
           
           {/* Text Indicator (Desktop) */}
           <div className="hidden md:block text-xs font-bold uppercase tracking-[0.2em] text-brand">
              {steps[step].title}
           </div>

           {/* Next Button (Right Corner) */}
           <button 
             onClick={handleNext}
             className="group flex items-center gap-2 pl-5 pr-4 py-2.5 md:pl-6 md:pr-5 md:py-3 bg-slate-900 dark:bg-white text-white dark:text-black rounded-full font-bold text-sm shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95 transition-all"
           >
             <span>{step === totalSteps - 1 ? 'Start Building' : 'Next'}</span>
             <ChevronRight size={16} className="md:w-[18px] md:h-[18px] group-hover:translate-x-1 transition-transform" strokeWidth={3} />
           </button>
        </div>

      </div>
    </div>
  );
};

export default LandingPage;
