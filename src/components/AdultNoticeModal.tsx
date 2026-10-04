import React from 'react';
import { AlertCircle } from 'lucide-react';

interface AdultNoticeModalProps {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export const AdultNoticeModal: React.FC<AdultNoticeModalProps> = ({
  isOpen,
  onConfirm,
  onCancel
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div 
        className="w-full max-w-[420px] bg-[#151515] border border-white/15 rounded-2xl p-6 sm:p-7 shadow-2xl text-white animate-scaleUp"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-12 h-12 rounded-full bg-red-500/15 border border-red-500/40 text-red-400 flex items-center justify-center mb-4">
          <AlertCircle className="w-6 h-6 stroke-[2.5]" />
        </div>

        <h3 className="text-xl font-bold mb-2">Turn on 18+ groups?</h3>
        
        <p className="text-sm text-gray-300 leading-relaxed mb-6">
          This will show adult group listings. Continue only if you are of legal age and explicitly want to view 18+ content.
        </p>

        <div className="flex flex-col-reverse sm:flex-row items-center justify-end gap-2.5">
          <button
            type="button"
            onClick={onCancel}
            className="w-full sm:w-auto px-5 py-2.5 rounded-full border border-white/15 bg-white/5 hover:bg-white/10 text-gray-300 font-bold text-xs sm:text-sm cursor-pointer transition-colors"
          >
            No, keep clean
          </button>
          
          <button
            type="button"
            onClick={onConfirm}
            className="w-full sm:w-auto px-5 py-2.5 rounded-full bg-gradient-to-r from-[#ff464c] to-[#bd0d1d] hover:brightness-110 text-white font-extrabold text-xs sm:text-sm cursor-pointer border border-red-500/70 shadow-lg shadow-red-600/30 transition-all"
          >
            Yes, show 18+ groups
          </button>
        </div>
      </div>
    </div>
  );
};
