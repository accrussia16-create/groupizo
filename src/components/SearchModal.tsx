import React, { useRef, useEffect } from 'react';
import { Search, X, ArrowRight } from 'lucide-react';
import { Group } from '../types.ts';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  filteredGroups: Group[];
  onSelectGroup: (g: Group) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  searchQuery,
  onSearchChange,
  filteredGroups,
  onSelectGroup
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div 
        className="w-full max-w-2xl bg-[#161616] border border-white/15 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[75vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="p-4 border-b border-white/10 flex items-center gap-3 bg-[#1e1e1e]">
          <Search className="w-5 h-5 text-gray-400" />
          <input
            ref={inputRef}
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search by topic, country, city, or group name..."
            className="flex-1 bg-transparent border-none text-white text-base outline-none placeholder:text-gray-500"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="text-xs text-gray-400 hover:text-white px-2 cursor-pointer"
            >
              Clear
            </button>
          )}
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-gray-400 hover:text-white bg-white/5 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results List */}
        <div className="p-3 overflow-y-auto divide-y divide-white/5">
          {filteredGroups.length === 0 ? (
            <div className="py-12 text-center text-gray-500 text-sm">
              No matching WhatsApp groups found for &ldquo;{searchQuery}&rdquo;.
            </div>
          ) : (
            filteredGroups.slice(0, 10).map((g) => (
              <button
                key={g.id}
                onClick={() => {
                  onSelectGroup(g);
                  onClose();
                }}
                className="w-full p-3 flex items-center justify-between text-left hover:bg-white/5 rounded-xl transition-colors cursor-pointer group"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <img
                    src={g.image}
                    alt={g.title}
                    className="w-10 h-10 rounded-lg object-cover bg-black/40 flex-shrink-0"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1614680376593-902f749f7ffc?w=100&auto=format&fit=crop&q=80';
                    }}
                  />
                  <div className="min-w-0">
                    <h4 className="text-sm font-bold text-white group-hover:text-[#25D366] truncate">
                      {g.title}
                    </h4>
                    <p className="text-xs text-gray-400">
                      {g.category} &middot; {g.country} {g.city ? `(${g.city})` : ''}
                    </p>
                  </div>
                </div>

                <div className="text-xs font-bold text-[#25D366] flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0 ml-3">
                  <span>View</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </button>
            ))
          )}
        </div>

        {filteredGroups.length > 10 && (
          <div className="p-3 bg-[#111] border-t border-white/5 text-center text-xs text-gray-400">
            Showing top 10 of {filteredGroups.length} results. Press Enter or close to view in grid.
          </div>
        )}
      </div>
    </div>
  );
};
