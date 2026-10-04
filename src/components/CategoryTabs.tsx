import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight, Layers } from 'lucide-react';
import { useAdmin } from '../context/AdminContext.tsx';

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
  const { categories, appearance } = useAdmin();

  const primaryColor = appearance?.primaryColor || '#25D366';

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -260 : 260;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const activeCategories = categories.filter((c) => !c.isHidden);

  return (
    <div className="relative border-b border-gray-200 pb-4 mb-8">
      {/* Scroll controls */}
      <button 
        onClick={() => scroll('left')}
        aria-label="Scroll categories left"
        className="hidden md:flex absolute -left-3 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-white border border-gray-200 items-center justify-center text-gray-600 hover:text-black hover:border-gray-400 shadow-md cursor-pointer"
      >
        <ChevronLeft className="w-4 h-4" />
      </button>

      <button 
        onClick={() => scroll('right')}
        aria-label="Scroll categories right"
        className="hidden md:flex absolute -right-3 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-white border border-gray-200 items-center justify-center text-gray-600 hover:text-black hover:border-gray-400 shadow-md cursor-pointer"
      >
        <ChevronRight className="w-4 h-4" />
      </button>

      <div 
        ref={scrollRef}
        className="flex items-center gap-2 overflow-x-auto no-scrollbar scroll-smooth px-1"
      >
        {/* "All Groups" / Latest Tab */}
        <button
          onClick={() => onSelectCategory('all')}
          className={`flex-shrink-0 px-4 py-2 rounded-full text-xs sm:text-sm font-bold transition-all cursor-pointer ${
            selectedCategory === 'all'
              ? 'text-black shadow-sm'
              : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
          }`}
          style={{
            backgroundColor: selectedCategory === 'all' ? primaryColor : undefined
          }}
        >
          All Categories
        </button>

        {/* Dynamic Category Tabs from Admin State */}
        {activeCategories.map((cat) => {
          const isSelected = selectedCategory === cat.slug;

          return (
            <button
              key={cat.slug}
              onClick={() => onSelectCategory(cat.slug)}
              className={`flex-shrink-0 px-3.5 py-2 rounded-full text-xs sm:text-sm font-bold transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                isSelected
                  ? 'text-black shadow-sm'
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
              }`}
              style={{
                backgroundColor: isSelected ? primaryColor : undefined
              }}
            >
              <span>{cat.icon}</span>
              <span>{cat.name}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
