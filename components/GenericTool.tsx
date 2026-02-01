
import React, { useState, useMemo } from 'react';
import { ToolConfig } from '../types.ts';
import { generateGenericText } from '../services/geminiService.ts';
import { ArrowRight, Copy, Check, Sparkles } from 'lucide-react';
import MagicLoader from './MagicLoader.tsx';

interface GenericToolProps {
  config: ToolConfig;
}

const EMOJI_SET = ['✨', '🎈', '🎉', '💡', '🔥', '🚀', '💯', '🌈', '📝', '💬', '📢', '🔔', '🎯', '🎰', '🎲'];

const CopyButton = ({ text }: { text: string }) => {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <button onClick={handleCopy} className="p-2 text-slate-400 hover:text-brand transition-colors rounded-full hover:bg-slate-100 dark:hover:bg-white/10" title="Copy">
       {copied ? <Check size={18} className="text-green-500" /> : <Copy size={18} />}
    </button>
  );
};

const GenericTool: React.FC<GenericToolProps> = ({ config }) => {
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [result, setResult] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  // Generate random emojis
  const emojis = useMemo(() => {
    if (!result) return [];
    return Array.from({ length: 12 }).map((_, i) => ({
      id: i,
      char: EMOJI_SET[Math.floor(Math.random() * EMOJI_SET.length)],
      top: Math.floor(Math.random() * 90),
      left: Math.floor(Math.random() * 95),
      rot: Math.floor(Math.random() * 360),
      scale: 0.8 + Math.random(),
      opacity: 0.05 + Math.random() * 0.1
    }));
  }, [result]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setResult(null);

    const prompt = config.promptTemplate(formData);
    
    try {
      // Pass useSearch config if available
      const generatedText = await generateGenericText(
        prompt, 
        undefined, 
        undefined, 
        config.useSearch
      );
      setResult(generatedText);
    } catch (error) {
      console.error(error);
      setResult("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopyMain = () => {
    if (result) {
      navigator.clipboard.writeText(result);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const renderResultContent = () => {
    if (!result) return null;

    if (config.outputFormat === 'list') {
      try {
        // Attempt to clean and parse JSON
        const cleanResult = result.replace(/```json/g, '').replace(/```/g, '').trim();
        const items = JSON.parse(cleanResult);
        
        if (Array.isArray(items)) {
          return (
            <div className="space-y-4">
              {items.map((item: string, idx: number) => (
                <div key={idx} className="p-4 md:p-5 rounded-2xl bg-white dark:bg-black/40 border border-slate-100 dark:border-white/10 flex justify-between items-start gap-4 hover:border-brand/50 transition-colors shadow-sm">
                  <p className="text-black dark:text-white font-semibold leading-relaxed mt-1 text-sm md:text-base">{item}</p>
                  <CopyButton text={item} />
                </div>
              ))}
            </div>
          );
        }
      } catch (e) {
        // If parsing fails, fall back to standard text rendering
        console.warn("Failed to parse list output", e);
      }
    }

    // Standard text output
    return (
      <div className="prose prose-lg dark:prose-invert max-w-none">
        <div className="whitespace-pre-wrap font-bold text-black dark:text-white drop-shadow-sm text-sm md:text-base">
          {result}
        </div>
      </div>
    );
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Input Section */}
      <div className="lg:col-span-5 bg-white dark:bg-[#1E293B] rounded-[2rem] shadow-xl shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-white/10 p-6 md:p-8">
        <div className="flex items-center gap-3 mb-6 md:mb-8">
          <div className="p-3 rounded-2xl bg-brand-light dark:bg-brand/20 text-brand">
            <config.icon size={24} />
          </div>
          <h2 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white">{config.title}</h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5 md:space-y-6">
          {config.fields.map((field) => (
            <div key={field.name}>
              <label className="block text-[10px] md:text-xs font-black uppercase tracking-wider text-brand dark:text-brand-glow mb-2 pl-1">
                {field.label} {field.required && <span className="text-red-400">*</span>}
              </label>
              
              {field.type === 'textarea' ? (
                <textarea
                  name={field.name}
                  required={field.required}
                  placeholder={field.placeholder}
                  rows={4}
                  className="w-full px-5 py-3 md:py-4 rounded-xl bg-slate-50 dark:bg-[#0F172A] border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:ring-2 focus:ring-brand focus:border-transparent transition-all outline-none resize-none font-bold text-sm md:text-base"
                  onChange={handleChange}
                />
              ) : field.type === 'select' ? (
                <div className="relative">
                  <select
                    name={field.name}
                    required={field.required}
                    className="w-full px-5 py-3 md:py-4 rounded-xl bg-slate-50 dark:bg-[#0F172A] border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-brand focus:border-transparent transition-all outline-none appearance-none font-bold text-sm md:text-base"
                    onChange={handleChange}
                    defaultValue=""
                  >
                    <option value="" disabled>Select an option</option>
                    {field.options?.map(opt => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                </div>
              ) : (
                <input
                  type="text"
                  name={field.name}
                  required={field.required}
                  placeholder={field.placeholder}
                  className="w-full px-5 py-3 md:py-4 rounded-xl bg-slate-50 dark:bg-[#0F172A] border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:ring-2 focus:ring-brand focus:border-transparent transition-all outline-none font-bold text-sm md:text-base"
                  onChange={handleChange}
                />
              )}
            </div>
          ))}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-2 bg-brand hover:bg-brand-hover text-white font-black text-base md:text-lg py-3 md:py-4 px-6 rounded-xl transition-all transform active:scale-[0.99] disabled:opacity-70 mt-4 shadow-xl shadow-brand/20 hover:shadow-brand/40"
          >
            {isLoading ? "Generating..." : (
              <>
                {config.buttonText} <ArrowRight size={20} className="md:w-[22px] md:h-[22px]" />
              </>
            )}
          </button>
        </form>
      </div>

      {/* Result Section */}
      <div className="lg:col-span-7">
        {result ? (
          <div className="relative rounded-[2rem] border border-slate-200 dark:border-white/10 animate-in fade-in duration-500 bg-transparent backdrop-blur-md overflow-hidden shadow-2xl shadow-slate-200/50 dark:shadow-none">
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

            <div className="relative z-10 p-6 md:p-10 bg-white/90 dark:bg-[#131315]/90 backdrop-blur-xl">
               <div className="flex justify-between items-center mb-6">
                <h3 className="text-base md:text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <Sparkles size={20} className="text-brand" /> Result
                </h3>
                {/* Only show main copy button if NOT in list mode */}
                {config.outputFormat !== 'list' && (
                  <button
                    onClick={handleCopyMain}
                    className="text-xs font-semibold flex items-center gap-1.5 px-4 py-2 rounded-full bg-slate-100 dark:bg-white/10 hover:bg-white dark:hover:bg-white/20 transition-colors text-slate-900 dark:text-white backdrop-blur-sm shadow-sm"
                  >
                    {copied ? <Check size={14} /> : <Copy size={14} />}
                    {copied ? "Copied" : "Copy"}
                  </button>
                )}
              </div>

              {renderResultContent()}
            </div>
          </div>
        ) : (
          isLoading ? <MagicLoader /> : (
            <div className="hidden lg:flex flex-col items-center justify-center h-[400px] bg-white/50 dark:bg-[#1E293B]/50 rounded-[2rem] border border-slate-200 dark:border-white/5 text-center p-8 border-dashed">
              <div className="mb-4 p-4 rounded-full bg-slate-50 dark:bg-white/5">
                <config.icon size={32} className="text-slate-300 dark:text-slate-500" />
              </div>
              <p className="text-slate-400 dark:text-slate-400 font-bold">Your generated content will appear here</p>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default GenericTool;
