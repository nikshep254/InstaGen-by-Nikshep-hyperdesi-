
import React from 'react';
import { X } from 'lucide-react';

interface InfoModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  content: React.ReactNode;
}

const InfoModal: React.FC<InfoModalProps> = ({ isOpen, onClose, title, content }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-in fade-in duration-300">
      <div className="relative bg-white dark:bg-[#1C1C1E] rounded-[2rem] w-full max-w-lg shadow-2xl animate-in zoom-in-95 duration-300 border border-gray-200 dark:border-white/10 overflow-hidden">
        
        <div className="flex items-center justify-between p-6 border-b border-gray-100 dark:border-white/5">
          <h3 className="text-xl font-bold font-display text-slate-900 dark:text-white">{title}</h3>
          <button 
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-white/10 transition-colors"
          >
            <X size={20} className="text-gray-500 dark:text-gray-400" />
          </button>
        </div>
        
        <div className="p-8 max-h-[60vh] overflow-y-auto">
          <div className="prose dark:prose-invert text-slate-600 dark:text-slate-300 leading-relaxed text-sm whitespace-pre-line">
            {content}
          </div>
        </div>

        <div className="p-6 border-t border-gray-100 dark:border-white/5 bg-gray-50 dark:bg-white/5 flex justify-end">
          <button 
            onClick={onClose}
            className="px-6 py-2 bg-slate-900 dark:bg-white text-white dark:text-black font-bold rounded-xl text-sm hover:opacity-90 transition-opacity"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};

export default InfoModal;
