
import React from 'react';
import { BioFormData, Tone } from '../types.ts';
import { Wand2, Smile, MapPin, AtSign } from 'lucide-react';

interface BioFormProps {
  formData: BioFormData;
  setFormData: React.Dispatch<React.SetStateAction<BioFormData>>;
  onSubmit: () => void;
  isLoading: boolean;
}

const TONES = Object.values(Tone);

const BioForm: React.FC<BioFormProps> = ({ formData, setFormData, onSubmit, isLoading }) => {
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleToggle = () => {
    setFormData(prev => ({ ...prev, includeEmojis: !prev.includeEmojis }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <form onSubmit={handleSubmit} className="relative bg-white/50 dark:bg-[#0F0F11] backdrop-blur-xl rounded-[2rem] md:rounded-[2.5rem] p-1 border border-white/60 dark:border-white/10 shadow-xl shadow-slate-200/40 dark:shadow-black/50">
      <div className="p-5 md:p-10 space-y-8 md:space-y-10">
        
        {/* Header */}
        <div className="flex items-center justify-between">
           <h2 className="text-xl md:text-2xl font-display font-bold text-slate-900 dark:text-white">Profile Config</h2>
           <div className="w-12 h-1 bg-gradient-to-r from-brand to-transparent rounded-full"></div>
        </div>

        {/* Inputs */}
        <div className="space-y-6 md:space-y-8">
          
          <div className="group">
            <label className="text-[10px] md:text-xs font-black uppercase tracking-widest text-brand dark:text-brand-glow mb-2 block">Handle</label>
            <div className="relative flex items-center">
              <AtSign size={18} className="absolute left-0 text-slate-400 group-focus-within:text-brand transition-colors" />
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="username"
                className="w-full bg-transparent border-b-2 border-slate-200 dark:border-white/20 py-2 md:py-3 pl-8 text-base md:text-lg font-bold text-slate-900 dark:text-white focus:border-brand focus:outline-none transition-colors placeholder:text-slate-400 dark:placeholder:text-slate-500"
              />
            </div>
          </div>

          <div className="group">
            <label className="text-[10px] md:text-xs font-black uppercase tracking-widest text-brand dark:text-brand-glow mb-2 block">Vibe & Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              rows={2}
              placeholder="Travel photographer, minimalism..."
              className="w-full bg-slate-50 dark:bg-white/5 border border-transparent rounded-2xl p-4 text-sm md:text-base font-bold text-slate-900 dark:text-white focus:bg-white dark:focus:bg-black focus:border-brand focus:outline-none transition-all resize-none placeholder:text-slate-400"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="group">
              <label className="text-[10px] md:text-xs font-black uppercase tracking-widest text-brand dark:text-brand-glow mb-2 block">Region</label>
              <div className="relative flex items-center">
                <MapPin size={18} className="absolute left-0 text-slate-400 group-focus-within:text-brand transition-colors" />
                <input
                  type="text"
                  name="region"
                  value={formData.region}
                  onChange={handleChange}
                  placeholder="City/State"
                  className="w-full bg-transparent border-b-2 border-slate-200 dark:border-white/20 py-2 md:py-3 pl-8 text-sm md:text-base font-bold text-slate-900 dark:text-white focus:border-brand focus:outline-none transition-colors placeholder:text-slate-400 dark:placeholder:text-slate-500"
                />
              </div>
            </div>
             <div className="group">
              <label className="text-[10px] md:text-xs font-black uppercase tracking-widest text-brand dark:text-brand-glow mb-2 block">Keywords</label>
              <input
                type="text"
                name="keywords"
                value={formData.keywords}
                onChange={handleChange}
                placeholder="tech, art..."
                className="w-full bg-transparent border-b-2 border-slate-200 dark:border-white/20 py-2 md:py-3 text-sm md:text-base font-bold text-slate-900 dark:text-white focus:border-brand focus:outline-none transition-colors placeholder:text-slate-400 dark:placeholder:text-slate-500"
              />
            </div>
          </div>

          <div>
             <label className="text-[10px] md:text-xs font-black uppercase tracking-widest text-brand dark:text-brand-glow mb-2 block">Tone</label>
             <div className="flex flex-wrap gap-2">
                {TONES.slice(0, 5).map(tone => (
                  <button
                    key={tone}
                    type="button"
                    onClick={() => setFormData(prev => ({...prev, tone}))}
                    className={`px-3 py-1.5 md:px-4 md:py-2 rounded-full text-[10px] md:text-xs font-bold border transition-all ${formData.tone === tone ? 'bg-slate-900 dark:bg-white text-white dark:text-black border-transparent shadow-glow' : 'border-slate-200 dark:border-white/20 text-slate-500 dark:text-slate-300 hover:border-slate-400 hover:text-slate-900 dark:hover:text-white'}`}
                  >
                    {tone}
                  </button>
                ))}
             </div>
             <select
                name="tone"
                value={formData.tone}
                onChange={handleChange}
                className="mt-3 w-full bg-slate-50 dark:bg-white/5 rounded-xl px-4 py-3 text-sm font-bold text-slate-900 dark:text-white outline-none border border-transparent focus:border-brand"
             >
                {TONES.map(tone => <option key={tone} value={tone}>{tone}</option>)}
             </select>
          </div>

          <div className="flex items-center justify-between pt-4">
             <div className="flex items-center gap-3">
               <span className="flex items-center justify-center w-8 h-8 rounded-full bg-yellow-100 dark:bg-yellow-400 text-yellow-800 dark:text-black font-bold">
                 <Smile size={16} />
               </span>
               <span className="text-sm font-bold text-slate-700 dark:text-white">Enable Emojis</span>
             </div>
             <button
                type="button"
                onClick={handleToggle}
                className={`w-12 h-6 rounded-full transition-colors relative ${formData.includeEmojis ? 'bg-green-500 shadow-glow' : 'bg-slate-300 dark:bg-slate-700'}`}
             >
               <span className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${formData.includeEmojis ? 'left-7' : 'left-1'}`}></span>
             </button>
          </div>

        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full group relative overflow-hidden bg-slate-900 dark:bg-white text-white dark:text-black rounded-2xl py-4 md:py-5 font-display font-black text-base md:text-lg hover:shadow-2xl hover:scale-[1.01] transition-all disabled:opacity-70 disabled:scale-100"
        >
          <span className="relative z-10 flex items-center justify-center gap-2">
             {isLoading ? 'Processing...' : (
               <>
                 Generate Bios <Wand2 size={20} className="group-hover:rotate-12 transition-transform"/>
               </>
             )}
          </span>
          <div className="absolute inset-0 bg-brand opacity-0 group-hover:opacity-10 transition-opacity"></div>
        </button>

      </div>
    </form>
  );
};

export default BioForm;
