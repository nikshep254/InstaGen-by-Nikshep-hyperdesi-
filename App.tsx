
import React, { useState, useEffect } from 'react';
import Header from './components/Header.tsx';
import BioForm from './components/BioForm.tsx';
import BioList from './components/BioList.tsx';
import AnalyzerForm from './components/AnalyzerForm.tsx';
import AnalysisResult from './components/AnalysisResult.tsx';
import AboutModal from './components/AboutModal.tsx';
import InfoModal from './components/InfoModal.tsx';
import ToolGrid, { TOOLS } from './components/ToolGrid.tsx';
import GenericTool from './components/GenericTool.tsx';
import RoastTool from './components/RoastTool.tsx';
import TypewriterTitle from './components/TypewriterTitle.tsx';
import MagicLoader from './components/MagicLoader.tsx';
import LandingPage from './components/LandingPage.tsx';
import TrendingSongsTicker from './components/TrendingSongsTicker.tsx';
import ScrollHint from './components/ScrollHint.tsx'; // Import new component
import { BioFormData, GeneratedBio, Tone, AnalyzerFormData, ToolConfig } from './types.ts';
import { generateBios, generateAnalysis } from './services/geminiService.ts';
import { Sparkles, ScanSearch, ChevronLeft, LayoutGrid, ArrowRight, ExternalLink, Search } from 'lucide-react';
import { 
  MessageSquare, Sparkles as SparklesIcon, Languages, Calendar, 
  AtSign, Aperture, Hash, LayoutGrid as LayoutGridIcon, Type, Music, Disc,
  Twitter, Repeat2, Zap, AlertTriangle, UserCheck, RefreshCw, Bomb
} from 'lucide-react';

const DASHBOARD_PHRASES_INSTA = [
  "Craft the perfect bio.",
  "Roast your Instagram feed.",
  "Translate text to slang.",
  "Generate viral captions.",
  "Plan your content calendar.",
  "Find aesthetic usernames.",
  "Curate niche hashtags.",
  "Analyze your profile vibe."
];

const DASHBOARD_PHRASES_TWITTER = [
  "Draft viral threads.",
  "Write killer hooks.",
  "Roast big accounts.",
  "Create hot takes.",
  "Optimize your X bio.",
  "Farm engagement.",
  "Rewrite for X.",
  "Audit your personal brand."
];

const App: React.FC = () => {
  const [showDashboard, setShowDashboard] = useState(false);
  const [activeTool, setActiveTool] = useState<string | null>(null);
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [platform, setPlatform] = useState<'instagram' | 'twitter'>('instagram');
  const [searchQuery, setSearchQuery] = useState(''); // New search state
  const [showScrollHint, setShowScrollHint] = useState(false); // New scroll hint state
  
  // Footer Modal State
  const [infoModalData, setInfoModalData] = useState<{title: string, content: React.ReactNode} | null>(null);

  // Bio & Analyzer State (Legacy components)
  const [bioFormData, setBioFormData] = useState<BioFormData>({
    name: '', description: '', region: '', tone: Tone.Professional, keywords: '', cta: '', includeEmojis: true,
  });
  const [bios, setBios] = useState<GeneratedBio[]>([]);
  const [isGeneratingBio, setIsGeneratingBio] = useState(false);
  
  const [analyzerFormData, setAnalyzerFormData] = useState<AnalyzerFormData>({
    name: '', age: '', occupation: '', traits: '', hobbies: '', socialMediaStyle: '', worstHabit: '',
  });
  const [analysisResult, setAnalysisResult] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // Handlers
  const handleGenerateBios = async () => {
    setIsGeneratingBio(true);
    setBios([]);
    try {
      const res = await generateBios(bioFormData);
      setBios(res);
    } catch (e) { console.error(e); } finally { setIsGeneratingBio(false); }
  };

  const handleAnalyzeProfile = async () => {
    setIsAnalyzing(true);
    setAnalysisResult(null);
    try {
      const res = await generateAnalysis(analyzerFormData);
      setAnalysisResult(res);
    } catch (e) { console.error(e); } finally { setIsAnalyzing(false); }
  };

  const handleStartApp = () => {
    setShowDashboard(true);
    // Show scroll hint shortly after entering dashboard
    setTimeout(() => {
      setShowScrollHint(true);
    }, 1500);
  };

  // Tool Configurations
  const getToolConfig = (id: string): ToolConfig | null => {
    switch(id) {
      // --- INSTAGRAM TOOLS ---
      case 'caption':
        return {
          id, title: 'Caption Writer', description: 'Write engaging captions.',
          icon: MessageSquare,
          buttonText: 'Write Captions',
          outputFormat: 'list',
          fields: [
            { name: 'context', label: 'What is in the photo/video?', type: 'textarea', placeholder: 'e.g. Sunset at the beach with coffee', required: true },
            { name: 'tone', label: 'Vibe', type: 'select', options: ['Aesthetic', 'Funny', 'Short', 'Inspirational', 'Savage'], required: true }
          ],
          promptTemplate: (d) => `Write exactly 3 playful Instagram caption options for a photo about: "${d.context}". Tone: ${d.tone}. Strictly return ONLY a valid JSON array of strings.`
        };
      case 'rizz':
        return {
          id, title: 'Rizz Replier', description: 'Generate witty replies.',
          icon: SparklesIcon,
          buttonText: 'Generate Rizz',
          outputFormat: 'list',
          fields: [
            { name: 'message', label: 'Message to reply to', type: 'textarea', placeholder: 'e.g. "Did it hurt when you fell from heaven?"', required: true },
            { name: 'tone', label: 'Intent', type: 'select', options: ['Flirty', 'Funny', 'Mean/Roast', 'Polite rejection', 'Playful'], required: true }
          ],
          promptTemplate: (d) => `Write exactly 3 witty replies to the message: "${d.message}". Intent: ${d.tone}.
          
          Strictly return ONLY a valid JSON array of strings. 
          Example: ["Reply 1", "Reply 2", "Reply 3"]
          Do not include any markdown formatting or extra text.`
        };
      case 'story':
        return {
          id, title: 'Story Ideas', description: 'Interactive story concepts.',
          icon: Aperture,
          buttonText: 'Get Ideas',
          outputFormat: 'list',
          fields: [
            { name: 'context', label: 'What are you doing today?', type: 'text', placeholder: 'e.g. Working from home', required: true }
          ],
          promptTemplate: (d) => `Give exactly 3 interactive Instagram Story ideas based on: "${d.context}". Strictly return ONLY a valid JSON array of strings.`
        };
      case 'hashtag':
        return {
          id, title: 'Hashtag Curator', description: 'Niche hashtag stacks.',
          icon: Hash,
          buttonText: 'Curate Tags',
          outputFormat: 'list',
          fields: [
            { name: 'topic', label: 'Post Topic', type: 'text', placeholder: 'e.g. Street Photography in Tokyo', required: true }
          ],
          promptTemplate: (d) => `Generate exactly 3 distinct sets of hashtags for: "${d.topic}". Return them as 3 strings. Strictly return ONLY a valid JSON array of strings.`
        };
      case 'highlight':
        return {
          id, title: 'Highlight Planner', description: 'Organize your profile.',
          icon: LayoutGridIcon,
          buttonText: 'Plan Highlights',
          outputFormat: 'list',
          fields: [
            { name: 'niche', label: 'Account Type', type: 'text', placeholder: 'e.g. Lifestyle Influencer', required: true }
          ],
          promptTemplate: (d) => `Suggest exactly 3 Instagram Highlight category names (with emoji) for a "${d.niche}" account. Strictly return ONLY a valid JSON array of strings.`
        };
      case 'lyrics':
        return {
          id, title: 'Lyric Finder', description: 'Get viral song snippets.',
          icon: Music,
          buttonText: 'Get Lyrics',
          outputFormat: 'list',
          fields: [
            { name: 'song', label: 'Song / Audio Name', type: 'text', placeholder: 'e.g. Espresso by Sabrina Carpenter', required: true },
            { name: 'mood', label: 'Caption Style', type: 'select', options: ['Story Overlay', 'Aesthetic Lowercase', 'Shoutout', 'Emotional', 'Hype'], required: true }
          ],
          promptTemplate: (d) => `Identify the most viral/trending lyrics snippet from the song/audio "${d.song}". Provide exactly 3 different caption variations using this snippet in a "${d.mood}" style. Strictly return ONLY a valid JSON array of strings.`
        };
      case 'audio':
        return {
          id, 
          title: 'Trending Audio', 
          description: 'Real-time viral hits & Spotify Top 50.',
          icon: Disc,
          buttonText: 'Find Audio',
          useSearch: true, 
          fields: [
            { name: 'vibe', label: 'Vibe / Niche', type: 'text', placeholder: 'e.g. Late Night Drives, Gym, Office Life', required: true },
            { name: 'format', label: 'Content Format', type: 'select', options: ['Reels Trend', 'Story Background', 'Photo Dump', 'Vlog'], required: true }
          ],
          promptTemplate: (d) => `Context: Today is ${new Date().toLocaleDateString()}.
          Using Google Search, find the current Spotify Top 50 Global chart and trending Instagram Reels audio for this week. 
          Suggest 5 songs that match the "${d.vibe}" vibe for a ${d.format}.
          CRITICAL: Use emojis liberally. For each song provide: Title/Artist, Why it fits, and a Story Lyric. `
        };

      // --- SHARED TOOLS ---
      case 'translator':
        return {
          id, title: 'Slang Translator', description: 'Translate text to slang.',
          icon: Languages,
          buttonText: 'Translate',
          outputFormat: 'list',
          fields: [
            { name: 'text', label: 'Normal Text', type: 'textarea', placeholder: 'e.g. I am very tired today.', required: true },
            { name: 'style', label: 'Translate into...', type: 'select', options: ['Gen Z / Brainrot', 'Corporate Speak', 'Old Money / Polished', 'Medieval', 'Pirate', 'Tech Bro'], required: true }
          ],
          promptTemplate: (d) => `Translate "${d.text}" into ${d.style} style. Provide exactly 3 distinct variations. Strictly return ONLY a valid JSON array of strings.`
        };
      case 'calendar':
        return {
          id, title: 'Content Calendar', description: '3-day content plan.',
          icon: Calendar,
          buttonText: 'Plan 3 Days',
          outputFormat: 'list',
          fields: [
            { name: 'niche', label: 'Niche / Topic', type: 'text', placeholder: 'e.g. Vegan Cooking', required: true },
            { name: 'goal', label: 'Main Goal', type: 'select', options: ['Growth', 'Sales', 'Engagement', 'Authority'], required: true }
          ],
          promptTemplate: (d) => `Create a playful 3-Day Mini Content Plan for "${d.niche}" (Goal: ${d.goal}). Provide 3 concise daily plans (one string per day). Strictly return ONLY a valid JSON array of strings.`
        };
      case 'username':
        return {
          id, title: 'Handle Generator', description: 'Unique username ideas.',
          icon: AtSign,
          buttonText: 'Find Handles',
          outputFormat: 'list',
          fields: [
            { name: 'name', label: 'Name or Word', type: 'text', placeholder: 'e.g. Sarah', required: true },
            { name: 'vibe', label: 'Style', type: 'select', options: ['Minimalist (sarah.jpg)', 'Y2K (xoxo_sarah)', 'Professional', 'Clever', 'Crypto / Tech'], required: true }
          ],
          promptTemplate: (d) => `Generate exactly 3 available-sounding instagram/twitter username options based on "${d.name}" with a "${d.vibe}" aesthetic. Strictly return ONLY a valid JSON array of strings.`
        };
      case 'font':
        return {
          id, title: 'Aesthetic Fonts', description: 'Stylize your text.',
          icon: Type,
          buttonText: 'Stylize',
          outputFormat: 'list',
          fields: [
            { name: 'text', label: 'Text to Stylize', type: 'text', placeholder: 'e.g. Link in Bio', required: true }
          ],
          promptTemplate: (d) => `Rewrite "${d.text}" in exactly 3 different aesthetic unicode font styles. Strictly return ONLY a valid JSON array of strings.`
        };

      // --- TWITTER (X) SPECIFIC TOOLS ---
      case 'twitter-bio':
        return {
          id, title: 'X Bio Architect', description: 'Authority bios (160ch).',
          icon: UserCheck,
          buttonText: 'Build Bios',
          outputFormat: 'list',
          fields: [
            { name: 'role', label: 'Who are you?', type: 'text', placeholder: 'e.g. Founder of a SaaS, Crypto Trader', required: true },
            { name: 'proof', label: 'Social Proof / Credibility', type: 'text', placeholder: 'e.g. Built 3 startups, $1M ARR', required: true },
            { name: 'style', label: 'Style', type: 'select', options: ['Authority/Serious', 'Shitposter', 'Minimalist', 'Mysterious'], required: true }
          ],
          promptTemplate: (d) => `Create 3 distinct Twitter bios for a "${d.role}". Include this proof: "${d.proof}". Style: ${d.style}. Constraints: Under 160 chars, credible, maybe one link placeholder. Strictly return ONLY a valid JSON array of strings.`
        };
      case 'thread':
        return {
          id, title: 'Thread Maker', description: 'Turn ideas into threads.',
          icon: Repeat2,
          buttonText: 'Draft Thread',
          outputFormat: 'list',
          fields: [
            { name: 'topic', label: 'Thread Topic', type: 'textarea', placeholder: 'e.g. How to start dropshipping in 2025', required: true },
            { name: 'style', label: 'Writing Style', type: 'select', options: ['Storytelling', 'Actionable List', 'Contrarian', 'Analytical'], required: true }
          ],
          promptTemplate: (d) => `Write the outline of a viral Twitter thread about "${d.topic}". Style: ${d.style}. Return exactly 3 items: 1) The Hook Tweet 2) The Body/Value Prop Summary 3) The CTA/Closing Tweet. Strictly return ONLY a valid JSON array of strings.`
        };
      case 'hook':
        return {
          id, title: 'Viral Hooks', description: 'Stop the scroll instantly.',
          icon: Zap,
          buttonText: 'Generate Hooks',
          outputFormat: 'list',
          fields: [
            { name: 'topic', label: 'Topic', type: 'text', placeholder: 'e.g. AI is changing coding', required: true },
            { name: 'type', label: 'Hook Type', type: 'select', options: ['Negative/Fear', 'How-To', 'Listicle', 'Personal Story', 'Contrarian'], required: true }
          ],
          promptTemplate: (d) => `Write 5 viral Twitter hooks about "${d.topic}". Style: ${d.type}. They must be punchy, short, and clickbaity but honest. Strictly return ONLY a valid JSON array of strings.`
        };
      case 'reply-guy':
        return {
          id, title: 'Reply Guy', description: 'Farm engagement.',
          icon: MessageSquare,
          buttonText: 'Generate Replies',
          outputFormat: 'list',
          fields: [
            { name: 'tweet', label: 'Tweet you are replying to', type: 'textarea', placeholder: 'Paste the original tweet here...', required: true },
            { name: 'vibe', label: 'Strategy', type: 'select', options: ['Disagree/Debate', 'Funny/Meme', 'Add Value/Insight', 'Supportive'], required: true }
          ],
          promptTemplate: (d) => `Write 3 replies to this tweet: "${d.tweet}". Strategy: ${d.vibe}. Goal: Get likes and visibility. Strictly return ONLY a valid JSON array of strings.`
        };
      case 'hottake':
        return {
          id, title: 'Hot Take Gen', description: 'Controversial bait.',
          icon: AlertTriangle,
          buttonText: 'Spit Fire',
          outputFormat: 'list',
          fields: [
            { name: 'industry', label: 'Industry / Topic', type: 'text', placeholder: 'e.g. Remote Work, Bitcoin, Modern Dating', required: true }
          ],
          promptTemplate: (d) => `Generate 3 controversial "Hot Takes" or unpopular opinions about "${d.industry}". The goal is to trigger people to comment. Strictly return ONLY a valid JSON array of strings.`
        };
      case 'rewrite-x':
        return {
          id, title: 'LinkedIn to X', description: 'Corporate to punchy.',
          icon: RefreshCw,
          buttonText: 'Rewrite',
          outputFormat: 'list',
          fields: [
            { name: 'text', label: 'Boring Text / LinkedIn Post', type: 'textarea', placeholder: 'Paste long text here...', required: true }
          ],
          promptTemplate: (d) => `Rewrite this text into a punchy, viral Twitter style (short sentences, line breaks, no fluff): "${d.text}". Provide 3 variations. Strictly return ONLY a valid JSON array of strings.`
        };
      case 'audit-x':
        return {
          id, title: 'Profile Auditor', description: 'Check personal brand.',
          icon: ScanSearch,
          buttonText: 'Audit Me',
          outputFormat: 'list',
          fields: [
            { name: 'handle', label: 'Handle', type: 'text', placeholder: '@elonmusk', required: true },
            { name: 'bio', label: 'Current Bio', type: 'textarea', placeholder: 'Paste current bio...', required: true }
          ],
          promptTemplate: (d) => `Act as a branding expert. Roast/Audit this Twitter profile. Handle: ${d.handle}, Bio: "${d.bio}". Provide 3 distinct pieces of brutal feedback on how to improve authority and followers. Strictly return ONLY a valid JSON array of strings.`
        };
      case 'shitpost':
        return {
          id, title: 'Shitpost Gen', description: 'Low effort, high viral.',
          icon: Bomb,
          buttonText: 'Generate Garbage',
          outputFormat: 'list',
          fields: [
            { name: 'topic', label: 'Topic (Optional)', type: 'text', placeholder: 'e.g. Developers, Crypto, Gym', required: false }
          ],
          promptTemplate: (d) => `Generate 3 funny, low-effort, "shitpost" style tweets about ${d.topic || "general life"}. Lowercase, bad grammar allowed, unhinged vibe. Strictly return ONLY a valid JSON array of strings.`
        };

      default: return null;
    }
  };

  const currentToolTitle = activeTool ? TOOLS.find(t => t.id === activeTool)?.title : (platform === 'instagram' ? 'InstaGen' : 'SocialGen');
  const dashboardPhrases = platform === 'instagram' ? DASHBOARD_PHRASES_INSTA : DASHBOARD_PHRASES_TWITTER;

  // Footer Content Data
  const footerContent = {
    contact: {
      title: "Contact Us",
      content: "Have questions, feedback, or just want to say hi?\n\nReach out to us directly on Instagram: @nikkk.exe\n\nOr drop us a virtual letter at: hello@instagen.ai\n\nWe typically respond within 24-48 hours."
    },
    faq: {
      title: "Frequently Asked Questions",
      content: "Q: Is InstaGen free?\nA: Yes! All core features are currently free to use.\n\nQ: Do you save my data?\nA: No. We process your inputs in real-time and discard them immediately after generation.\n\nQ: Can I use the generated content for business?\nA: Absolutely. You own the rights to any content generated by the tool."
    },
    privacy: {
      title: "Privacy Policy",
      content: "Your privacy is paramount to us.\n\n1. Data Collection: We do not store personal data entered into the generators.\n2. Processing: All AI processing is done via secure APIs (Google Gemini).\n3. Cookies: We use local storage only to remember your theme preference (Light/Dark mode).\n4. Third Parties: We do not sell your data to third parties."
    },
    terms: {
      title: "Terms of Service",
      content: "By using InstaGen, you agree to the following:\n\n1. You will not use this tool to generate harmful, offensive, or illegal content.\n2. We are not responsible for how you use the generated content on your social media profiles.\n3. The service is provided 'as is' without warranties of any kind.\n4. Be cool, be creative."
    },
    cookie: {
      title: "Cookie Policy",
      content: "We like real cookies 🍪, but digital ones are annoying.\n\nWe only use essential local storage to remember if you prefer Dark Mode or Light Mode. No tracking pixels, no ad targeting, no invasive spyware. Enjoy the clean web."
    }
  };

  return (
    <div className="min-h-screen flex flex-col font-sans transition-colors duration-300 relative">
      <Header 
        onOpenAbout={() => setIsAboutOpen(true)}
        showDashboard={showDashboard}
        onNavigateHome={() => setShowDashboard(false)}
        platform={platform}
        setPlatform={setPlatform}
      />
      <AboutModal isOpen={isAboutOpen} onClose={() => setIsAboutOpen(false)} />
      
      <InfoModal 
        isOpen={!!infoModalData} 
        onClose={() => setInfoModalData(null)}
        title={infoModalData?.title || ''}
        content={infoModalData?.content}
      />

      {/* Scroll Hint Popup */}
      {showDashboard && showScrollHint && (
        <ScrollHint onClose={() => setShowScrollHint(false)} />
      )}

      {/* Increased top padding for the fixed floating header */}
      <main className="flex-grow w-full pt-24 md:pt-32 pb-20">
        
        {/* Conditional Rendering: Landing Page or Dashboard */}
        {!showDashboard ? (
          <LandingPage onStart={handleStartApp} platform={platform} />
        ) : (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 animate-in fade-in duration-500">
            {/* Header / Typewriter Area */}
            <div className="mb-10 md:mb-16 flex flex-col items-center text-center gap-6">
              <div className="space-y-4 w-full max-w-5xl mx-auto">
                 {activeTool ? (
                   <div className="flex flex-col items-center gap-6">
                     <button 
                       onClick={() => { setActiveTool(null); setSearchQuery(''); }}
                       className="group flex items-center gap-2 text-sm font-bold tracking-widest text-gray-500 hover:text-brand transition-colors uppercase"
                     >
                       <ChevronLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                       Back to Toolkit
                     </button>
                     <h2 className="text-4xl sm:text-6xl font-display font-bold tracking-tight text-[#1D1D1F] dark:text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">
                        {currentToolTitle}
                     </h2>
                   </div>
                 ) : (
                   <div className="space-y-8">
                      <h2 className="text-4xl sm:text-7xl font-display font-bold tracking-tight text-[#1D1D1F] dark:text-white leading-[0.9] drop-shadow-[0_0_20px_rgba(255,255,255,0.4)] min-h-[80px] sm:min-h-[120px]">
                        <TypewriterTitle phrases={dashboardPhrases} />
                      </h2>
                      
                      {/* --- SEARCH BAR --- */}
                      <div className="relative max-w-md mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200">
                        <div className="relative group">
                          <div className="absolute -inset-0.5 bg-gradient-to-r from-brand to-purple-600 rounded-2xl opacity-20 group-hover:opacity-40 transition duration-500 blur-md"></div>
                          <div className="relative flex items-center bg-white/50 dark:bg-white/5 backdrop-blur-md rounded-2xl border border-white/40 dark:border-white/10 shadow-lg">
                             <Search className="ml-4 text-slate-400 group-focus-within:text-brand transition-colors" size={20} />
                             <input 
                               type="text" 
                               placeholder="Find a tool..." 
                               value={searchQuery}
                               onChange={(e) => setSearchQuery(e.target.value)}
                               className="w-full bg-transparent border-none focus:ring-0 py-3 md:py-4 pl-3 pr-4 text-slate-900 dark:text-white font-semibold placeholder:text-slate-400 dark:placeholder:text-slate-500 outline-none"
                             />
                             {searchQuery && (
                               <button 
                                 onClick={() => setSearchQuery('')}
                                 className="mr-3 p-1 rounded-full hover:bg-black/5 dark:hover:bg-white/10 text-slate-400"
                               >
                                 <Sparkles size={14} />
                               </button>
                             )}
                          </div>
                        </div>
                      </div>
                      {/* ------------------ */}
                   </div>
                 )}
              </div>
            </div>

            {/* Content Area */}
            {!activeTool ? (
              <ToolGrid 
                onSelectTool={setActiveTool} 
                currentPlatform={platform} 
                searchQuery={searchQuery}
              />
            ) : (
              <div className="animate-in fade-in slide-in-from-bottom-8 duration-500 max-w-6xl mx-auto">
                {activeTool === 'bio' && (
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
                    <div className="lg:col-span-5 sticky top-24 md:top-32"><BioForm formData={bioFormData} setFormData={setBioFormData} onSubmit={handleGenerateBios} isLoading={isGeneratingBio} /></div>
                    <div className="lg:col-span-7">
                      {bios.length > 0 && <BioList bios={bios} />}
                      {!bios.length && !isGeneratingBio && (
                        <div className="flex flex-col items-center justify-center min-h-[300px] md:min-h-[400px] border border-dashed border-gray-300 dark:border-white/10 rounded-[2rem] bg-gray-50/50 dark:bg-white/5 mx-2 md:mx-0">
                          <Sparkles className="text-gray-300 dark:text-white/20 mb-4" size={48} />
                          <p className="text-gray-400 dark:text-gray-500 font-medium text-center px-4">Results will materialize here</p>
                        </div>
                      )}
                      {isGeneratingBio && <MagicLoader />}
                    </div>
                  </div>
                )}
                
                {activeTool === 'analyzer' && (
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
                    <div className="lg:col-span-5 sticky top-24 md:top-32"><AnalyzerForm formData={analyzerFormData} setFormData={setAnalyzerFormData} onSubmit={handleAnalyzeProfile} isLoading={isAnalyzing} /></div>
                    <div className="lg:col-span-7">
                      {analysisResult && <AnalysisResult content={analysisResult} />}
                      {!analysisResult && !isAnalyzing && (
                        <div className="flex flex-col items-center justify-center min-h-[300px] md:min-h-[400px] border border-dashed border-gray-300 dark:border-white/10 rounded-[2rem] bg-gray-50/50 dark:bg-white/5 mx-2 md:mx-0">
                          <ScanSearch className="text-gray-300 dark:text-white/20 mb-4" size={48} />
                          <p className="text-gray-400 dark:text-gray-500 font-medium text-center px-4">Awaiting subject data</p>
                        </div>
                      )}
                      {isAnalyzing && <MagicLoader />}
                    </div>
                  </div>
                )}

                {activeTool === 'roast' && <RoastTool />}

                {/* Generic Tools (Handles both Insta and Twitter tools) */}
                {!['bio', 'analyzer', 'roast'].includes(activeTool) && getToolConfig(activeTool) && (
                  <GenericTool config={getToolConfig(activeTool)!} />
                )}
              </div>
            )}
          </div>
        )}
      </main>

      {/* Trending Songs Ticker - Displayed only when Dashboard is active AND Instagram mode is on */}
      {showDashboard && platform === 'instagram' && <TrendingSongsTicker />}

      {/* Styled Footer (Unlocked Coding Style) */}
      <footer className="bg-black text-white py-12 border-t border-white/10 mt-auto w-full">
        <div className="max-w-6xl mx-auto px-6 flex flex-col items-center text-center">
          
          {/* Logo/Brand */}
          <div className="flex items-center gap-3 mb-6">
             <div className="w-8 h-8 bg-white text-black rounded-lg flex items-center justify-center">
               <span className="text-xl font-bold">🐊</span>
             </div>
             <span className="text-2xl font-bold tracking-tight text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]">InstaGen</span>
          </div>

          {/* Tagline */}
          <p className="text-slate-200 max-w-lg mb-8 text-sm leading-relaxed font-medium">
            Your gateway to mastering digital aesthetics. Craft bios, analyze vibes, and grow your presence with our comprehensive AI toolkit.
          </p>

          {/* Navigation Links */}
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-3 mb-10 text-sm font-bold text-slate-300">
             <button onClick={() => setIsAboutOpen(true)} className="hover:text-white transition-colors hover:drop-shadow-glow">About Us</button>
             <button onClick={() => setInfoModalData(footerContent.contact)} className="hover:text-white transition-colors hover:drop-shadow-glow">Contact Us</button>
             <button onClick={() => setInfoModalData(footerContent.faq)} className="hover:text-white transition-colors hover:drop-shadow-glow">FAQ</button>
             <button onClick={() => setInfoModalData(footerContent.privacy)} className="hover:text-white transition-colors hover:drop-shadow-glow">Privacy Policy</button>
             <button onClick={() => setInfoModalData(footerContent.terms)} className="hover:text-white transition-colors hover:drop-shadow-glow">Terms of Service</button>
             <button onClick={() => setInfoModalData(footerContent.cookie)} className="hover:text-white transition-colors hover:drop-shadow-glow">Cookie Policy</button>
             <button onClick={() => setShowDashboard(true)} className="hover:text-white transition-colors hover:drop-shadow-glow">Browse Features</button>
          </div>

          {/* Copyright */}
          <div className="text-xs text-slate-400 font-medium">
            © 2026 InstaGen AI. All rights reserved. Crafted by <a href="https://instagram.com/nikkk.exe" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors font-bold text-slate-200">HYPERDESI</a>.
          </div>
          
          {/* Corner accent to match image style slightly */}
          <div className="fixed bottom-0 right-0 w-20 h-20 bg-white/5 rounded-tl-full blur-2xl pointer-events-none"></div>

        </div>
      </footer>
    </div>
  );
};

export default App;
