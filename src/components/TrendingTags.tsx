import React from 'react';
import { TRENDING_TAGS } from '../data/groupsData.ts';
import { Hash } from 'lucide-react';

interface TrendingTagsProps {
  onSelectTag: (tag: string) => void;
  activeTag: string | null;
}

export const TrendingTags: React.FC<TrendingTagsProps> = ({ onSelectTag, activeTag }) => {
  return (
    <section className="my-14 text-center">
      <h2 className="text-xl sm:text-2xl font-black text-white mb-2">What people are searching for</h2>
      <p className="text-xs sm:text-sm text-gray-400 max-w-md mx-auto mb-6">
        Topics that come up most often across 1,790+ listed groups.
      </p>

      <div className="flex flex-wrap gap-2.5 justify-center max-w-4xl mx-auto">
        {TRENDING_TAGS.map((t) => {
          const isActive = activeTag?.toLowerCase() === t.tag.toLowerCase();

          return (
            <button
              key={t.tag}
              onClick={() => onSelectTag(t.tag)}
              className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                isActive
                  ? 'bg-[#25D366] text-black font-extrabold shadow-lg shadow-[#25D366]/20 scale-105'
                  : 'bg-[#25D366]/[0.07] border border-[#25D366]/25 text-[#25D366] hover:bg-[#25D366]/15 hover:border-[#25D366] hover:-translate-y-0.5'
              }`}
            >
              <Hash className="w-3 h-3 stroke-[2.5]" />
              <span>{t.tag}</span>
              <span className={`text-[10px] ml-1 ${isActive ? 'text-black/70' : 'text-gray-400'}`}>
                {t.count}+
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
};
