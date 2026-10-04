import React, { useState } from 'react';
import { Search, CheckCircle, ShieldCheck, Zap, Globe, Layers, Eye, Users } from 'lucide-react';

interface HeroProps {
  onSearch: (query: string) => void;
  searchQuery: string;
}

export const Hero: React.FC<HeroProps> = ({ onSearch, searchQuery }) => {
  const [localQuery, setLocalQuery] = useState(searchQuery);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(localQuery);
  };

  const tickerItems = [
    { icon: <Layers className="w-4 h-4 text-[#25D366]" />, val: '1,790+', label: 'Active Groups' },
    { icon: <Globe className="w-4 h-4 text-[#25D366]" />, val: '52', label: 'Countries' },
    { icon: <Users className="w-4 h-4 text-[#25D366]" />, val: '54', label: 'Cities' },
    { icon: <Layers className="w-4 h-4 text-[#25D366]" />, val: '31', label: 'Categories' },
    { icon: <CheckCircle className="w-4 h-4 text-[#25D366]" />, val: 'Reviewed', label: 'Before Publishing' },
    { icon: <Zap className="w-4 h-4 text-[#25D366]" />, val: 'Free', label: 'No Account Needed' },
    { icon: <ShieldCheck className="w-4 h-4 text-[#25D366]" />, val: 'Report', label: 'Any Listing' },
    { icon: <Eye className="w-4 h-4 text-[#25D366]" />, val: 'Monitored', label: 'Invite Status' },
  ];

  return (
    <section id="hero" className="relative text-center pt-16 pb-12 bg-gradient-to-b from-[#0a0a0a] via-[#0d1a10] to-[#0a0a0a] border-b border-[#25D366]/15 overflow-hidden">
      
      {/* Background glow effects */}
      <div 
        aria-hidden="true" 
        className="pointer-events-none absolute -top-32 left-1/2 -translate-x-1/2 w-[700px] h-[400px] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(37,211,102,0.18)_0%,rgba(18,140,126,0.08)_40%,transparent_70%)] animate-hero-pulse" 
      />
      <div 
        aria-hidden="true" 
        className="pointer-events-none absolute -bottom-20 -right-20 w-[350px] h-[350px] rounded-full bg-[radial-gradient(circle,rgba(37,211,102,0.08)_0%,transparent_70%)]" 
      />

      <div className="relative z-10 max-w-[1200px] mx-auto px-4">
        
        {/* Hero badge */}
        <div className="inline-flex items-center gap-2 bg-white/[0.04] border border-white/10 px-4 py-1.5 rounded-full text-xs font-bold text-gray-300 uppercase tracking-wider mb-6 shadow-inner">
          <span className="w-2 h-2 rounded-full bg-[#25D366] animate-blink" />
          Free WhatsApp Group Directory
        </div>

        {/* Hero Heading */}
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-white tracking-tight leading-[1.15] mb-5">
          Find Wa groups<br />
          that actually work.<br />
          <span className="text-[#25D366] drop-shadow-[0_0_25px_rgba(37,211,102,0.35)]">
            Every link checked before it goes live.
          </span>
        </h1>

        {/* Subtitle */}
        <p className="max-w-[620px] mx-auto text-sm sm:text-base text-gray-400 leading-relaxed mb-4">
          We check each group link before adding it here. If a link stops working, we catch it and update the listing.
          1,790+ groups across 52 countries can search by topic, city, or country. Free, no account needed.
        </p>

        {/* Live Status indicator */}
        <p className="text-xs sm:text-sm text-[#25D366] font-semibold flex items-center justify-center gap-2 mb-8">
          <CheckCircle className="w-4 h-4 stroke-[2.5]" />
          Last invite link verified 5 minutes ago &middot; 100% active
        </p>

        {/* Search Box */}
        <div className="max-w-[580px] mx-auto mb-10">
          <form 
            onSubmit={handleSubmit}
            className="flex items-center bg-[#1e1e1e] p-1.5 sm:p-2 rounded-full border border-white/15 shadow-2xl shadow-black/80 focus-within:border-[#25D366] focus-within:ring-2 focus-within:ring-[#25D366]/30 transition-all"
          >
            <div className="pl-3 sm:pl-4 text-gray-400">
              <Search className="w-5 h-5" />
            </div>
            <input 
              type="text"
              value={localQuery}
              onChange={(e) => {
                setLocalQuery(e.target.value);
                onSearch(e.target.value);
              }}
              placeholder="Try: fitness Lagos, crypto India, gaming, study..."
              className="flex-1 bg-transparent border-none text-white text-sm sm:text-base px-3 py-2 outline-none placeholder:text-gray-500"
            />
            {localQuery && (
              <button 
                type="button" 
                onClick={() => {
                  setLocalQuery('');
                  onSearch('');
                }}
                className="text-xs text-gray-400 hover:text-white px-2 cursor-pointer"
              >
                Clear
              </button>
            )}
            <button 
              type="submit"
              className="bg-[#25D366] hover:bg-[#1ebe5a] text-black font-extrabold text-xs sm:text-sm px-5 py-2.5 rounded-full transition-colors flex items-center gap-1.5 cursor-pointer flex-shrink-0"
            >
              <span>Search</span>
            </button>
          </form>
        </div>

      </div>

      {/* Trust Strip */}
      <div className="border-t border-b border-white/5 bg-black/40 py-4 px-4">
        <div className="max-w-[1000px] mx-auto flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs sm:text-sm text-gray-400">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-[#25D366]" />
            <span>Every link checked before listing</span>
          </div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#25D366]" />
            <span>Free to browse and submit</span>
          </div>
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-[#25D366]" />
            <span>No account needed</span>
          </div>
        </div>
      </div>

      {/* Stats Ticker Slider */}
      <div className="w-full bg-[#0a0f0b] border-b border-[#25D366]/10 overflow-hidden py-3">
        <div className="flex w-max animate-slide-stats hover:[animation-play-state:paused]">
          {[...tickerItems, ...tickerItems].map((item, idx) => (
            <div 
              key={idx} 
              className="inline-flex items-center gap-2.5 px-8 border-r border-white/10 whitespace-nowrap"
            >
              {item.icon}
              <span className="text-sm font-extrabold text-[#25D366] tracking-tight">{item.val}</span>
              <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">{item.label}</span>
            </div>
          ))}
        </div>
      </div>

    </section>
  );
};
