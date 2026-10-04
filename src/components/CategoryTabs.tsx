import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { CATEGORIES_DATA } from '../data/groupsData.ts';

interface CategoryTabsProps {
  selectedCategory: string;
  onSelectCategory: (slug: string) => void;
  adultMode: boolean;
  onToggleAdult: () => void;
}

export const CategoryTabs: React.FC<CategoryTabsProps> = ({
  selectedCategory,
  onSelectCategory,
  adultMode,
  onToggleAdult
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -260 : 260;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className="relative border-b border-[#2d2d2d] pb-4 mb-8">
      {/* Scroll controls for desktop */}
      <button 
        onClick={() => scroll('left')}
        aria-label="Scroll categories left"
        className="hidden md:flex absolute -left-3 top-1/2 -translate-y-1/2 z-10 w-7 h-7 rounded-full bg-[#1e1e1e] border border-white/20 items-center justify-center text-gray-300 hover:text-white hover:border-[#25D366] shadow-lg cursor-pointer"
      >
        <ChevronLeft className="w-4 h-4" />
      </button>

      <button 
        onClick={() => scroll('right')}
        aria-label="Scroll categories right"
        className="hidden md:flex absolute -right-3 top-1/2 -translate-y-1/2 z-10 w-7 h-7 rounded-full bg-[#1e1e1e] border border-white/20 items-center justify-center text-gray-300 hover:text-white hover:border-[#25D366] shadow-lg cursor-pointer"
      >
        <ChevronRight className="w-4 h-4" />
      </button>

      <div 
        ref={scrollRef}
        className="flex items-center gap-2.5 overflow-x-auto no-scrollbar scroll-smooth px-1"
      >
        {/* Adult 18+ Toggle */}
        <button
          onClick={onToggleAdult}
          className={`h-9 px-3 rounded-full border text-xs font-black tracking-wide flex items-center gap-1.5 flex-shrink-0 cursor-pointer transition-all ${
            adultMode
              ? 'border-red-500 bg-gradient-to-r from-red-600 to-rose-800 text-white shadow-lg shadow-red-600/30 animate-adult-pulse'
              : 'border-white/15 bg-white/5 text-gray-300 hover:border-white/30 hover:text-white'
          }`}
          title={adultMode ? '18+ mode active (click to disable)' : 'Enable 18+ content mode'}
        >
          <span className="font-extrabold">18+</span>
          <span className={`w-1.5 h-1.5 rounded-full ${adultMode ? 'bg-white' : 'bg-gray-500'}`} />
        </button>

        {/* "Latest Added" / All Tab */}
        <button
          onClick={() => onSelectCategory('all')}
          className={`flex-shrink-0 px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
            selectedCategory === 'all'
              ? 'bg-[#25D366] text-black font-bold shadow-md shadow-[#25D366]/20'
              : 'bg-white/5 text-gray-400 hover:text-white hover:bg-white/10'
          }`}
        >
          Latest Added
        </button>

        {/* Category tabs */}
        {CATEGORIES_DATA.map((cat) => (
          <button
            key={cat.slug}
            onClick={() => onSelectCategory(cat.slug)}
            className={`flex-shrink-0 px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer whitespace-nowrap ${
              selectedCategory === cat.slug
                ? 'bg-[#25D366] text-black font-bold shadow-md shadow-[#25D366]/20'
                : 'bg-white/5 text-gray-400 hover:text-white hover:bg-white/10'
            }`}
          >
            <span>{cat.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};
