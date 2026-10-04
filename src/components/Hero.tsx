import React, { useState } from 'react';
import { Search, CheckCircle2, ShieldCheck, Zap, Globe, Sparkles } from 'lucide-react';
import { useAdmin } from '../context/AdminContext.tsx';

interface HeroProps {
  onSearch: (query: string) => void;
  searchQuery: string;
}

export const Hero: React.FC<HeroProps> = ({ onSearch, searchQuery }) => {
  const [localQuery, setLocalQuery] = useState(searchQuery);
  const { appearance, groups, categories, countries } = useAdmin();

  const primaryColor = appearance?.primaryColor || '#25D366';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(localQuery);
  };

  const trendingPills = ['Gaming', 'Crypto', 'Jobs', 'UPSC', 'Business', 'Lagos', 'Karachi'];

  return (
    <section 
      id="hero" 
      className="relative text-center pt-16 sm:pt-20 pb-16 px-4 bg-gradient-to-b from-[#0b1f14] via-[#0d281a] to-[#08170e] text-white overflow-hidden"
    >
      {/* Subtle background glow */}
      <div 
        aria-hidden="true" 
        className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[800px] h-[450px] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(37,211,102,0.18)_0%,rgba(18,140,126,0.06)_40%,transparent_70%)] animate-hero-pulse" 
      />

      <div className="relative z-10 max-w-[1000px] mx-auto">
        
        {/* Pill Badge */}
        <div className="inline-flex items-center gap-2 bg-white/10 border border-white/15 px-4 py-1.5 rounded-full text-xs font-bold text-emerald-300 uppercase tracking-wider mb-6 shadow-xs backdrop-blur-xs">
          <span className="w-2 h-2 rounded-full bg-[#25D366] animate-pulse" />
          Verified Public WhatsApp Communities
        </div>

        {/* Large Headline */}
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-white tracking-tight leading-[1.12] mb-5">
          {appearance?.heroHeading ? (
            <span className="text-white">
              {appearance.heroHeading}
            </span>
          ) : (
            <>
              Find WhatsApp Groups<br />
              <span 
                className="text-transparent bg-clip-text bg-gradient-to-r from-[#25D366] via-emerald-300 to-[#128C7E]"
              >
                That Match Your Interests
              </span>
            </>
          )}
        </h1>

        {/* Supporting text */}
        <p className="max-w-[640px] mx-auto text-base sm:text-lg text-emerald-100/80 leading-relaxed mb-8">
          {appearance?.heroSubheading || 'Discover public WhatsApp communities by topic, category, country and city.'}
        </p>

        {/* Large Search Box */}
        <div className="max-w-[640px] mx-auto mb-6">
          <form 
            onSubmit={handleSubmit}
            className="flex items-center bg-white p-2 rounded-2xl sm:rounded-full border border-white/30 shadow-2xl shadow-black/40 focus-within:ring-3 focus-within:ring-[#25D366]/40 transition-all"
          >
            <div className="pl-3 sm:pl-4 text-gray-400 flex-shrink-0">
              <Search className="w-5 h-5 text-gray-500" />
            </div>

            <input 
              type="text"
              value={localQuery}
              onChange={(e) => {
                setLocalQuery(e.target.value);
                onSearch(e.target.value);
              }}
              placeholder={appearance?.heroSearchPlaceholder || 'Search groups, topics, cities or countries...'}
              className="flex-1 bg-transparent border-none text-gray-900 text-sm sm:text-base px-3 py-2.5 outline-none placeholder:text-gray-400 font-medium"
            />

            {localQuery && (
              <button 
                type="button" 
                onClick={() => {
                  setLocalQuery('');
                  onSearch('');
                }}
                className="text-xs text-gray-400 hover:text-gray-700 px-2 cursor-pointer font-bold"
              >
                Clear
              </button>
            )}

            <button 
              type="submit"
              className="text-black font-extrabold text-sm sm:text-base px-6 py-3 rounded-xl sm:rounded-full transition-all flex items-center gap-1.5 cursor-pointer flex-shrink-0 shadow-md hover:brightness-105 active:scale-95"
              style={{ backgroundColor: primaryColor }}
            >
              <span>Search</span>
            </button>
          </form>
        </div>

        {/* Trending Searches */}
        <div className="flex flex-wrap items-center justify-center gap-2 text-xs text-emerald-200/80 mb-10">
          <span className="font-semibold text-gray-400">Popular:</span>
          {trendingPills.map((term) => (
            <button
              key={term}
              onClick={() => {
                setLocalQuery(term);
                onSearch(term);
              }}
              className="px-2.5 py-1 rounded-full bg-white/10 hover:bg-white/20 text-white font-medium transition-colors cursor-pointer"
            >
              #{term}
            </button>
          ))}
        </div>

        {/* Community Trust Strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 border-t border-white/10 text-left text-xs text-emerald-100/90">
          <div className="flex items-center gap-3 bg-white/[0.04] p-3 rounded-xl border border-white/5">
            <CheckCircle2 className="w-5 h-5 text-[#25D366] flex-shrink-0" />
            <div>
              <div className="font-bold text-white text-sm">{groups.length}+ Groups</div>
              <div className="text-[11px] text-gray-300">Reviewed &amp; Live</div>
            </div>
          </div>

          <div className="flex items-center gap-3 bg-white/[0.04] p-3 rounded-xl border border-white/5">
            <Globe className="w-5 h-5 text-[#25D366] flex-shrink-0" />
            <div>
              <div className="font-bold text-white text-sm">{countries.length} Countries</div>
              <div className="text-[11px] text-gray-300">Worldwide Discovery</div>
            </div>
          </div>

          <div className="flex items-center gap-3 bg-white/[0.04] p-3 rounded-xl border border-white/5">
            <ShieldCheck className="w-5 h-5 text-[#25D366] flex-shrink-0" />
            <div>
              <div className="font-bold text-white text-sm">Monitored Status</div>
              <div className="text-[11px] text-gray-300">Active Link Verification</div>
            </div>
          </div>

          <div className="flex items-center gap-3 bg-white/[0.04] p-3 rounded-xl border border-white/5">
            <Zap className="w-5 h-5 text-[#25D366] flex-shrink-0" />
            <div>
              <div className="font-bold text-white text-sm">100% Free</div>
              <div className="text-[11px] text-gray-300">No Account Required</div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
