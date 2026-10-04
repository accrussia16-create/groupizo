import React, { useState } from 'react';
import { FAQS_DATA } from '../data/blogData.ts';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { useAdmin } from '../context/AdminContext.tsx';

interface FaqSectionProps {
  onOpenReport?: () => void;
}

export const FaqSection: React.FC<FaqSectionProps> = ({ onOpenReport }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const { appearance } = useAdmin();
  const brandName = appearance?.siteName || 'GroupHub';

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="scroll-mt-24 my-16">
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-[#128C7E] font-bold text-xs uppercase tracking-wider mb-2">
          <HelpCircle className="w-3.5 h-3.5" /> Got Questions?
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-gray-950">
          Frequently Asked Questions
        </h2>
        <p className="text-xs sm:text-sm text-gray-500 max-w-lg mx-auto mt-1">
          Everything you need to know about finding, joining, and listing groups on {brandName}.
        </p>
      </div>

      <div className="max-w-3xl mx-auto space-y-3">
        {FAQS_DATA.map((faq, idx) => {
          const isOpen = openIndex === idx;

          return (
            <div 
              key={idx}
              className="border border-gray-200/90 rounded-2xl overflow-hidden bg-white shadow-2xs transition-colors"
            >
              <button
                onClick={() => toggle(idx)}
                className="w-full p-4 sm:p-5 flex items-center justify-between text-left font-bold text-sm sm:text-base text-gray-900 hover:text-[#128C7E] transition-colors cursor-pointer"
              >
                <span>{faq.question.replace('Groupizo', brandName)}</span>
                <ChevronDown 
                  className={`w-4 h-4 text-gray-400 transition-transform duration-200 flex-shrink-0 ml-4 ${
                    isOpen ? 'rotate-180 text-[#128C7E]' : ''
                  }`} 
                />
              </button>

              {isOpen && (
                <div className="px-4 sm:px-5 pb-5 pt-1 text-xs sm:text-sm text-gray-600 leading-relaxed border-t border-gray-100 bg-gray-50/50">
                  <p>{faq.answer.replace(/Groupizo/g, brandName)}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};
