
import React from 'react';
import { 
  Wand2, ScanSearch, Flame, MessageSquare, 
  Sparkles, Languages, Calendar, AtSign, 
  Aperture, Hash, LayoutGrid, Type, Music, Disc,
  Twitter, Repeat2, Zap, AlertTriangle, UserCheck, RefreshCw, Bomb
} from 'lucide-react';

interface ToolGridProps {
  onSelectTool: (toolId: string) => void;
  currentPlatform: 'instagram' | 'twitter';
  searchQuery?: string;
}

export const TOOLS = [
  // --- INSTAGRAM TOOLS ---
  { id: 'bio', title: 'Bio Creator', desc: 'Craft the perfect bio', icon: Wand2, platform: 'instagram' },
  { id: 'analyzer', title: 'Profile Analyzer', desc: 'Judge your persona', icon: ScanSearch, platform: 'instagram' },
  { id: 'roast', title: 'Roast My Feed', desc: 'Visual vibe check', icon: Flame, platform: 'instagram' },
  { id: 'audio', title: 'Trending Audio', desc: 'Viral sounds & story lyrics', icon: Disc, platform: 'instagram' },
  { id: 'caption', title: 'Caption Writer', desc: 'Engaging captions', icon: MessageSquare, platform: 'instagram' },
  { id: 'lyrics', title: 'Lyric Finder', desc: 'Find song snippets', icon: Music, platform: 'instagram' },
  { id: 'rizz', title: 'Rizz Replier', desc: 'Smooth DMs & comments', icon: Sparkles, platform: 'instagram' },
  { id: 'translator', title: 'Slang Translator', desc: 'Boomer to Gen Z', icon: Languages, platform: 'both' },
  { id: 'calendar', title: 'Content Calendar', desc: 'Plan your next viral week', icon: Calendar, platform: 'both' },
  { id: 'username', title: 'Handle Generator', desc: 'Aesthetic usernames', icon: AtSign, platform: 'both' },
  { id: 'story', title: 'Story Ideas', desc: 'Engage your followers', icon: Aperture, platform: 'instagram' },
  { id: 'hashtag', title: 'Hashtag Curator', desc: 'Niche stacks for reach', icon: Hash, platform: 'instagram' },
  { id: 'highlight', title: 'Highlight Planner', desc: 'Organize your profile', icon: LayoutGrid, platform: 'instagram' },
  { id: 'font', title: 'Aesthetic Fonts', desc: 'Stylize your text', icon: Type, platform: 'both' },

  // --- TWITTER (X) TOOLS ---
  { id: 'twitter-bio', title: 'X Bio Architect', desc: 'High authority bios (160ch)', icon: UserCheck, platform: 'twitter' },
  { id: 'thread', title: 'Thread Maker', desc: 'Turn ideas into viral threads', icon: Repeat2, platform: 'twitter' },
  { id: 'hook', title: 'Viral Hooks', desc: 'Stop the scroll instantly', icon: Zap, platform: 'twitter' },
  { id: 'reply-guy', title: 'Reply Guy', desc: 'Farm engagement on big accs', icon: MessageSquare, platform: 'twitter' },
  { id: 'hottake', title: 'Hot Take Gen', desc: 'Controversial engagement bait', icon: AlertTriangle, platform: 'twitter' },
  { id: 'rewrite-x', title: 'LinkedIn to X', desc: 'Corporate to punchy text', icon: RefreshCw, platform: 'twitter' },
  { id: 'audit-x', title: 'Profile Auditor', desc: 'Check your personal brand', icon: ScanSearch, platform: 'twitter' },
  { id: 'shitpost', title: 'Shitpost Gen', desc: 'Low effort, high viral potential', icon: Bomb, platform: 'twitter' },
];

const ToolGrid: React.FC<ToolGridProps> = ({ onSelectTool, currentPlatform, searchQuery = '' }) => {
  const filteredTools = TOOLS.filter(t => {
    const matchesPlatform = t.platform === 'both' || t.platform === currentPlatform;
    const matchesSearch = t.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          t.desc.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesPlatform && matchesSearch;
  });

  if (filteredTools.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center opacity-60">
        <ScanSearch size={48} className="mb-4 text-slate-300 dark:text-slate-500" />
        <p className="text-lg font-bold text-slate-500 dark:text-slate-400">No tools found matching "{searchQuery}"</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 animate-in fade-in duration-700">
      {filteredTools.map((tool) => (
        <button
          key={tool.id}
          onClick={() => onSelectTool(tool.id)}
          className="group relative flex flex-col items-start p-6 h-full rounded-3xl bg-white/60 dark:bg-white/5 border border-white/40 dark:border-white/10 backdrop-blur-sm hover:bg-white dark:hover:bg-white/10 transition-all duration-300 text-left hover:-translate-y-1 hover:shadow-2xl hover:shadow-brand/10 dark:hover:border-brand/30"
        >
          {/* Hover Glow */}
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-brand/0 to-brand/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

          <div className="relative z-10 w-full">
            <div className="flex justify-between items-start mb-4">
               <div className="p-3 rounded-2xl bg-slate-50 dark:bg-white/5 text-slate-900 dark:text-white border border-slate-100 dark:border-white/10 group-hover:scale-110 transition-transform duration-300 group-hover:bg-brand group-hover:text-white shadow-sm">
                 <tool.icon size={24} strokeWidth={2} />
               </div>
               <div className="w-2 h-2 rounded-full bg-slate-200 dark:bg-white/20 group-hover:bg-brand transition-colors"></div>
            </div>
            
            <h3 className="text-lg font-display font-bold text-slate-900 dark:text-white mb-1 group-hover:translate-x-1 transition-transform drop-shadow-sm">
              {tool.title}
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-200 font-medium leading-relaxed">
              {tool.desc}
            </p>
          </div>
        </button>
      ))}
    </div>
  );
};

export default ToolGrid;
