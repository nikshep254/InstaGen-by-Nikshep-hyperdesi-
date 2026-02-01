
import React from 'react';
import { AnalyzerFormData } from '../types.ts';
import { ScanSearch, User, Briefcase, Hash, Heart, Smartphone, AlertCircle } from 'lucide-react';

interface AnalyzerFormProps {
  formData: AnalyzerFormData;
  setFormData: React.Dispatch<React.SetStateAction<AnalyzerFormData>>;
  onSubmit: () => void;
  isLoading: boolean;
}

const AnalyzerForm: React.FC<AnalyzerFormProps> = ({ formData, setFormData, onSubmit, isLoading }) => {
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white dark:bg-[#1E293B] rounded-[2rem] shadow-xl shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-white/5 overflow-hidden transition-all duration-300">
      <div className="p-5 md:p-8 space-y-6 md:space-y-8">
        <div>
          <h2 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white mb-2">Subject Details</h2>
          <p className="text-sm md:text-base text-slate-500 dark:text-slate-300 font-medium mb-6">Provide the raw data for analysis.</p>
          
          <div className="space-y-4 md:space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="name" className="block text-[10px] md:text-xs font-black uppercase tracking-wider text-brand dark:text-brand-glow mb-2 pl-1">Name</label>
                <div className="relative">
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Name"
                    className="w-full px-5 py-3 md:py-4 pl-12 rounded-xl bg-slate-50 dark:bg-[#0F172A] border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:ring-2 focus:ring-brand focus:border-transparent transition-all outline-none font-bold text-sm md:text-base"
                  />
                  <User size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                </div>
              </div>
              <div>
                <label htmlFor="age" className="block text-[10px] md:text-xs font-black uppercase tracking-wider text-brand dark:text-brand-glow mb-2 pl-1">Age</label>
                <input
                  type="text"
                  id="age"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  placeholder="e.g. 28"
                  className="w-full px-5 py-3 md:py-4 rounded-xl bg-slate-50 dark:bg-[#0F172A] border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:ring-2 focus:ring-brand focus:border-transparent transition-all outline-none font-bold text-sm md:text-base"
                />
              </div>
            </div>

            <div>
              <label htmlFor="occupation" className="block text-[10px] md:text-xs font-black uppercase tracking-wider text-brand dark:text-brand-glow mb-2 pl-1">Occupation</label>
              <div className="relative">
                <input
                  type="text"
                  id="occupation"
                  name="occupation"
                  value={formData.occupation}
                  onChange={handleChange}
                  placeholder="e.g. UX Designer at a Startup"
                  className="w-full px-5 py-3 md:py-4 pl-12 rounded-xl bg-slate-50 dark:bg-[#0F172A] border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:ring-2 focus:ring-brand focus:border-transparent transition-all outline-none font-bold text-sm md:text-base"
                />
                <Briefcase size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
              </div>
            </div>

            <div>
              <label htmlFor="traits" className="block text-[10px] md:text-xs font-black uppercase tracking-wider text-brand dark:text-brand-glow mb-2 pl-1">Key Traits (Comma separated)</label>
              <div className="relative">
                <input
                  type="text"
                  id="traits"
                  name="traits"
                  value={formData.traits}
                  onChange={handleChange}
                  placeholder="e.g. Anxious, Ambitious, Caffeine-addicted"
                  className="w-full px-5 py-3 md:py-4 pl-12 rounded-xl bg-slate-50 dark:bg-[#0F172A] border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:ring-2 focus:ring-brand focus:border-transparent transition-all outline-none font-bold text-sm md:text-base"
                />
                <Hash size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
              </div>
            </div>
            
            <div>
              <label htmlFor="hobbies" className="block text-[10px] md:text-xs font-black uppercase tracking-wider text-brand dark:text-brand-glow mb-2 pl-1">Hobbies & Interests</label>
              <div className="relative">
                <textarea
                  id="hobbies"
                  name="hobbies"
                  value={formData.hobbies}
                  onChange={handleChange}
                  rows={2}
                  placeholder="e.g. Pottery, Hiking, Binge-watching reality TV"
                  className="w-full px-5 py-3 md:py-4 pl-12 rounded-xl bg-slate-50 dark:bg-[#0F172A] border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:ring-2 focus:ring-brand focus:border-transparent transition-all outline-none resize-none font-bold text-sm md:text-base"
                />
                <Heart size={20} className="absolute left-4 top-4 text-slate-400" />
              </div>
            </div>

            <div>
              <label htmlFor="socialMediaStyle" className="block text-[10px] md:text-xs font-black uppercase tracking-wider text-brand dark:text-brand-glow mb-2 pl-1">Social Media Behavior</label>
              <div className="relative">
                <input
                  type="text"
                  id="socialMediaStyle"
                  name="socialMediaStyle"
                  value={formData.socialMediaStyle}
                  onChange={handleChange}
                  placeholder="e.g. Posts cryptic stories, lurker, influencer wannabe"
                  className="w-full px-5 py-3 md:py-4 pl-12 rounded-xl bg-slate-50 dark:bg-[#0F172A] border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:ring-2 focus:ring-brand focus:border-transparent transition-all outline-none font-bold text-sm md:text-base"
                />
                <Smartphone size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
              </div>
            </div>

            <div>
              <label htmlFor="worstHabit" className="block text-[10px] md:text-xs font-black uppercase tracking-wider text-brand dark:text-brand-glow mb-2 pl-1">Worst Habit / Pet Peeve</label>
              <div className="relative">
                <input
                  type="text"
                  id="worstHabit"
                  name="worstHabit"
                  value={formData.worstHabit}
                  onChange={handleChange}
                  placeholder="e.g. Chewing loudly, interrupting people"
                  className="w-full px-5 py-3 md:py-4 pl-12 rounded-xl bg-slate-50 dark:bg-[#0F172A] border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:ring-2 focus:ring-brand focus:border-transparent transition-all outline-none font-bold text-sm md:text-base"
                />
                <AlertCircle size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
              </div>
            </div>

          </div>
        </div>
      </div>

      <div className="p-5 md:p-6 bg-slate-50 dark:bg-black/20 border-t border-slate-100 dark:border-white/5">
        <button
          type="submit"
          disabled={isLoading}
          className="w-full flex items-center justify-center gap-2 bg-brand hover:bg-brand-hover text-white font-black text-base md:text-lg py-3 md:py-4 px-6 rounded-xl transition-all transform active:scale-[0.99] disabled:opacity-70 disabled:cursor-not-allowed shadow-xl shadow-brand/20 hover:shadow-brand/40"
        >
          {isLoading ? (
            <span className="flex items-center gap-2">Analyzing Personality...</span>
          ) : (
            <>
              <ScanSearch size={22} />
              Analyze Profile
            </>
          )}
        </button>
      </div>
    </form>
  );
};

export default AnalyzerForm;
