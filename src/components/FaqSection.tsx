import React, { useState } from 'react';
import { FAQS_DATA } from '../data/blogData.ts';
import { ChevronDown } from 'lucide-react';

interface FaqSectionProps {
  onOpenReport: () => void;
}

export const FaqSection: React.FC<FaqSectionProps> = ({ onOpenReport }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="scroll-mt-20 my-16">
      <div className="text-center mb-10">
        <h2 className="text-2xl sm:text-3xl font-black text-white mb-2">Common questions</h2>
        <p className="text-xs sm:text-sm text-gray-400 max-w-lg mx-auto">
          Questions people usually ask about Groupizo and WhatsApp groups.
          Something else on your mind?{' '}
          <button 
            onClick={onOpenReport}
            className="text-[#25D366] underline hover:text-[#1ebe5a] cursor-pointer"
          >
            Report an issue or send us a message.
          </button>
        </p>
      </div>

      <div className="max-w-3xl mx-auto space-y-3">
        {FAQS_DATA.map((faq, idx) => {
          const isOpen = openIndex === idx;

          return (
            <div 
              key={idx}
              className="border border-[#2d2d2d] rounded-xl overflow-hidden bg-[#1e1e1e] transition-colors"
            >
              <button
                onClick={() => toggle(idx)}
                className="w-full p-4 sm:p-5 flex items-center justify-between text-left font-bold text-sm sm:text-base text-gray-200 hover:text-[#25D366] transition-colors cursor-pointer bg-white/[0.02]"
              >
                <span>{faq.question}</span>
                <ChevronDown 
                  className={`w-4 h-4 text-gray-400 transition-transform duration-200 flex-shrink-0 ml-4 ${
                    isOpen ? 'rotate-180 text-[#25D366]' : ''
                  }`} 
                />
              </button>

              {isOpen && (
                <div className="px-4 sm:px-5 pb-5 pt-1 text-xs sm:text-sm text-gray-400 leading-relaxed border-t border-white/5 bg-black/20">
                  <p>{faq.answer}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};
