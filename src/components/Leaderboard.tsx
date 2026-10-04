import React, { useRef } from 'react';
import { PODIUM_CONTRIBUTORS, LOWER_CONTRIBUTORS } from '../data/leaderboardData.ts';
import { Star, ShieldCheck, ChevronLeft, ChevronRight, Award } from 'lucide-react';

interface LeaderboardProps {
  onOpenAddGroup: () => void;
}

export const Leaderboard: React.FC<LeaderboardProps> = ({ onOpenAddGroup }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleScroll = (dir: 'left' | 'right') => {
    if (scrollRef.current) {
      const offset = dir === 'left' ? -300 : 300;
      scrollRef.current.scrollBy({ left: offset, behavior: 'smooth' });
    }
  };

  const silver = PODIUM_CONTRIBUTORS.find((c) => c.rank === 2);
  const gold = PODIUM_CONTRIBUTORS.find((c) => c.rank === 1);
  const bronze = PODIUM_CONTRIBUTORS.find((c) => c.rank === 3);

  return (
    <section 
      id="leaderboard" 
      className="relative rounded-3xl border border-white/10 bg-[#121212] p-6 sm:p-10 my-16 overflow-hidden shadow-2xl shadow-black/80"
    >
      {/* Background ambient lighting */}
      <div 
        aria-hidden="true" 
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_35%_at_50%_-5%,rgba(37,211,102,0.12)_0%,transparent_70%)]" 
      />

      {/* Header */}
      <div className="relative z-10 text-center mb-12">
        <div className="inline-flex items-center gap-2 bg-black/50 border border-[#25D366]/30 px-4 py-1 rounded-full text-[11px] font-extrabold text-[#25D366] uppercase tracking-widest mb-4 shadow-sm">
          <Award className="w-3.5 h-3.5" />
          Groupizo Community
        </div>

        <div className="flex items-center justify-center gap-3 sm:gap-6 mb-2">
          {/* Left Wreath SVG */}
          <svg className="w-10 sm:w-16 h-16 sm:h-24 opacity-80 flex-shrink-0" viewBox="0 0 60 120" fill="none">
            <path d="M50 110 C10 90 5 50 20 10" stroke="#25D366" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M20 10 C14 26 28 38 20 54" stroke="#25D366" strokeWidth="2" strokeLinecap="round" />
            <path d="M6 30 C22 24 36 42 24 54" stroke="#25D366" strokeWidth="2" strokeLinecap="round" opacity="0.7" />
            <path d="M10 56 C24 52 34 68 24 78" stroke="#25D366" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
          </svg>

          <h2 className="text-2xl sm:text-4xl md:text-5xl font-black text-white leading-tight">
            Top Community<br />
            <span className="text-[#25D366] drop-shadow-[0_0_20px_rgba(37,211,102,0.4)]">
              Contributors
            </span>
          </h2>

          {/* Right Wreath SVG (Mirrored) */}
          <svg className="w-10 sm:w-16 h-16 sm:h-24 opacity-80 flex-shrink-0 -scale-x-100" viewBox="0 0 60 120" fill="none">
            <path d="M50 110 C10 90 5 50 20 10" stroke="#25D366" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M20 10 C14 26 28 38 20 54" stroke="#25D366" strokeWidth="2" strokeLinecap="round" />
            <path d="M6 30 C22 24 36 42 24 54" stroke="#25D366" strokeWidth="2" strokeLinecap="round" opacity="0.7" />
            <path d="M10 56 C24 52 34 68 24 78" stroke="#25D366" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
          </svg>
        </div>

        <p className="text-sm text-gray-400 font-medium">Earn your spot by submitting quality groups</p>
      </div>

      {/* Podium (Desktop: Silver, Gold, Bronze; Mobile: Gold top full width, Silver & Bronze bottom) */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-6 items-end max-w-[960px] mx-auto mb-14">
        
        {/* RANK 2: SILVER */}
        {silver && (
          <div className="order-2 md:order-1 bg-gradient-to-b from-[#141f16] to-[#0c1410] border border-[#B8CCD8]/40 rounded-2xl p-6 flex flex-col items-center relative shadow-lg shadow-black/60">
            {/* Rank Ribbon */}
            <div className="absolute top-4 left-4 w-8 h-10 bg-gradient-to-b from-gray-200 to-gray-500 rounded-sm flex items-center justify-center font-black text-black text-sm shadow-md">
              2
            </div>

            {/* Avatar */}
            <div className="w-20 h-20 rounded-full p-1 bg-gradient-to-tr from-[#B8CCD8] via-gray-400 to-[#B8CCD8] mb-3">
              <img 
                src={silver.avatar} 
                alt={silver.name} 
                className="w-full h-full rounded-full object-cover border-2 border-[#121212]" 
              />
            </div>

            <div className="font-extrabold text-white text-base mb-1 flex items-center gap-1.5">
              <span>{silver.name}</span>
            </div>

            <div className="text-xs text-gray-400 mb-3">
              <strong className="text-[#25D366] font-bold">{silver.approvedGroups}</strong> Approved Groups
            </div>

            <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-bold text-[#FFB700] mb-4">
              <ShieldCheck className="w-3.5 h-3.5 text-[#FFB700]" />
              {silver.badge}
            </div>

            <div className="w-full">
              <div className="flex items-center justify-between text-xs font-bold mb-1.5">
                <span className="text-gray-400">Reputation</span>
                <span className="text-[#FFB700] flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 fill-[#FFB700]" /> {silver.repScore} REP
                </span>
              </div>
              <div className="w-full h-1.5 rounded-full bg-white/10 overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-emerald-600 to-[#25D366] rounded-full" 
                  style={{ width: `${silver.percentage}%` }}
                />
              </div>
            </div>
          </div>
        )}

        {/* RANK 1: GOLD (Elevated) */}
        {gold && (
          <div className="order-1 md:order-2 md:-translate-y-6 bg-gradient-to-b from-[#192214] via-[#111c12] to-[#0c150e] border-2 border-[#FFB700] rounded-2xl p-7 flex flex-col items-center relative shadow-2xl shadow-[#FFB700]/15">
            
            {/* Crown Decoration with Glow */}
            <div className="absolute -top-10 left-1/2 -translate-x-1/2 pointer-events-none">
              <div className="relative">
                <div className="absolute -inset-4 bg-[#FFB700]/30 rounded-full blur-md animate-pulse" />
                <svg className="w-16 h-12 relative drop-shadow-[0_4px_12px_rgba(255,183,0,0.6)]" viewBox="0 0 80 56">
                  <path d="M8 50 L20 20 L40 38 L60 20 L72 50 Z" fill="#FFB700" stroke="#C8860A" strokeWidth="1.5" />
                  <rect x="6" y="47" width="68" height="9" rx="3" fill="#C8860A" />
                  <circle cx="20" cy="20" r="5" fill="#FFB700" stroke="#C8860A" strokeWidth="1" />
                  <circle cx="40" cy="11" r="6.5" fill="#FF3300" stroke="#C8860A" strokeWidth="1" />
                  <circle cx="60" cy="20" r="5" fill="#FFB700" stroke="#C8860A" strokeWidth="1" />
                </svg>
              </div>
            </div>

            {/* Rank 1 Ribbon */}
            <div className="absolute top-4 left-4 w-9 h-11 bg-gradient-to-b from-yellow-300 to-amber-600 rounded-sm flex items-center justify-center font-black text-black text-base shadow-md">
              1
            </div>

            {/* Avatar with Conic Gold Ring */}
            <div className="w-24 h-24 rounded-full p-1 bg-gradient-to-tr from-[#FFB700] via-amber-400 to-[#FFB700] mb-3 mt-4 shadow-lg shadow-[#FFB700]/20">
              <img 
                src={gold.avatar} 
                alt={gold.name} 
                className="w-full h-full rounded-full object-cover border-2 border-[#121212]" 
              />
            </div>

            <div className="font-black text-white text-lg mb-1 flex items-center gap-1.5">
              <span>{gold.name}</span>
              <svg className="w-4 h-4 fill-[#1d9bf0]" viewBox="0 0 24 24">
                <path d="M22.5 12.5c0-1.58-.875-2.95-2.148-3.6.154-.435.238-.905.238-1.4 0-2.21-1.71-3.998-3.818-3.998-.47 0-.92.084-1.336.25C14.818 2.415 13.51 1.5 12 1.5s-2.816.917-3.437 2.25c-.415-.165-.866-.25-1.336-.25-2.11 0-3.818 1.79-3.818 4 0 .494.083.964.237 1.4-1.272.65-2.147 2.018-2.147 3.6 0 1.495.782 2.798 1.942 3.486-.02.17-.032.34-.032.514 0 2.21 1.708 4 3.818 4 .47 0 .92-.086 1.335-.25.62 1.334 1.926 2.25 3.437 2.25 1.512 0 2.818-.916 3.437-2.25.415.163.865.248 1.336.248 2.11 0 3.818-1.79 3.818-4 0-.174-.012-.344-.033-.513 1.158-.687 1.943-1.99 1.943-3.484zm-6.616-3.334l-4.334 6.5c-.145.217-.382.334-.625.334-.143 0-.288-.04-.416-.126l-.115-.094-2.415-2.415c-.293-.293-.293-.768 0-1.06s.768-.294 1.06 0l1.77 1.767 3.825-5.74c.23-.345.696-.436 1.04-.207.346.23.44.696.21 1.04z" />
              </svg>
            </div>

            <div className="text-xs text-gray-300 mb-3">
              <strong className="text-[#25D366] font-extrabold text-sm">{gold.approvedGroups}</strong> Approved Groups
            </div>

            <div className="inline-flex items-center gap-1 px-3.5 py-1 rounded-full bg-[#FFB700]/15 border border-[#FFB700]/30 text-xs font-black text-[#FFB700] mb-5">
              <ShieldCheck className="w-4 h-4 text-[#FFB700]" />
              {gold.badge}
            </div>

            <div className="w-full">
              <div className="flex items-center justify-between text-xs font-bold mb-1.5">
                <span className="text-gray-300">Community Rank 1</span>
                <span className="text-[#FFB700] flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 fill-[#FFB700]" /> {gold.repScore} REP
                </span>
              </div>
              <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden shadow-inner">
                <div 
                  className="h-full bg-gradient-to-r from-yellow-500 to-[#25D366] rounded-full shadow-[0_0_10px_rgba(37,211,102,0.8)]" 
                  style={{ width: `${gold.percentage}%` }}
                />
              </div>
            </div>
          </div>
        )}

        {/* RANK 3: BRONZE */}
        {bronze && (
          <div className="order-3 md:order-3 bg-gradient-to-b from-[#141f16] to-[#0c1410] border border-[#CD8040]/40 rounded-2xl p-6 flex flex-col items-center relative shadow-lg shadow-black/60">
            {/* Rank Ribbon */}
            <div className="absolute top-4 left-4 w-8 h-10 bg-gradient-to-b from-amber-600 to-amber-900 rounded-sm flex items-center justify-center font-black text-white text-sm shadow-md">
              3
            </div>

            {/* Avatar */}
            <div className="w-20 h-20 rounded-full p-1 bg-gradient-to-tr from-[#CD8040] via-amber-800 to-[#CD8040] mb-3">
              <img 
                src={bronze.avatar} 
                alt={bronze.name} 
                className="w-full h-full rounded-full object-cover border-2 border-[#121212]" 
              />
            </div>

            <div className="font-extrabold text-white text-base mb-1 flex items-center gap-1.5">
              <span>{bronze.name}</span>
            </div>

            <div className="text-xs text-gray-400 mb-3">
              <strong className="text-[#25D366] font-bold">{bronze.approvedGroups}</strong> Approved Groups
            </div>

            <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-bold text-[#FFB700] mb-4">
              <ShieldCheck className="w-3.5 h-3.5 text-[#FFB700]" />
              {bronze.badge}
            </div>

            <div className="w-full">
              <div className="flex items-center justify-between text-xs font-bold mb-1.5">
                <span className="text-gray-400">Reputation</span>
                <span className="text-[#FFB700] flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 fill-[#FFB700]" /> {bronze.repScore} REP
                </span>
              </div>
              <div className="w-full h-1.5 rounded-full bg-white/10 overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-emerald-600 to-[#25D366] rounded-full" 
                  style={{ width: `${bronze.percentage}%` }}
                />
              </div>
            </div>
          </div>
        )}

      </div>

      {/* Ranks 4 to 20 Horizontal Scrolling List */}
      <div className="relative mb-12">
        <button
          onClick={() => handleScroll('left')}
          aria-label="Scroll left"
          className="hidden sm:flex absolute -left-4 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-[#0f1a10] border border-[#25D366]/30 text-[#25D366] items-center justify-center hover:bg-[#162816] shadow-xl cursor-pointer"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <div 
          ref={scrollRef}
          className="flex gap-3.5 overflow-x-auto no-scrollbar scroll-smooth py-2 px-1"
        >
          {LOWER_CONTRIBUTORS.map((c) => (
            <div
              key={c.rank}
              className="bg-[#1e1e1e] hover:border-[#25D366]/40 hover:-translate-y-1 transition-all border border-white/5 rounded-2xl p-4 flex flex-col items-center text-center w-36 sm:w-40 flex-shrink-0 relative"
            >
              <span className="absolute top-2.5 left-2.5 text-[11px] font-bold text-gray-400 bg-white/5 px-2 py-0.5 rounded-md">
                #{c.rank}
              </span>

              <img 
                src={c.avatar} 
                alt={c.name} 
                className="w-14 h-14 rounded-full object-cover border border-white/15 mt-3 mb-2.5" 
              />

              <h4 className="text-xs sm:text-sm font-bold text-white truncate max-w-full mb-1">
                {c.name}
              </h4>

              <p className="text-[11px] text-gray-400 mb-2">
                <strong className="text-[#25D366]">{c.approvedGroups}</strong> groups
              </p>

              <div 
                className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold border mb-3 whitespace-nowrap"
                style={{ borderColor: `${c.badgeColor}33`, color: c.badgeColor, backgroundColor: `${c.badgeColor}10` }}
              >
                {c.badge}
              </div>

              <div className="mt-auto w-full">
                <div className="flex items-center justify-center gap-1 text-[11px] font-bold text-[#FFB700] mb-1">
                  <Star className="w-3 h-3 fill-[#FFB700]" />
                  <span>{c.repScore}</span>
                  <span className="text-[9px] text-gray-500">REP</span>
                </div>
                <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-[#25D366] rounded-full" 
                    style={{ width: `${Math.min(100, c.percentage)}%` }} 
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={() => handleScroll('right')}
          aria-label="Scroll right"
          className="hidden sm:flex absolute -right-4 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-[#0f1a10] border border-[#25D366]/30 text-[#25D366] items-center justify-center hover:bg-[#162816] shadow-xl cursor-pointer"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* CTA Block: Reach Top 1 */}
      <div className="bg-gradient-to-r from-[#0e1c0f] to-[#09130a] border border-[#25D366]/20 rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-center gap-6 justify-between shadow-xl">
        <div className="flex items-center gap-5">
          <div className="w-14 h-14 rounded-2xl bg-[#25D366]/10 border border-[#25D366] flex items-center justify-center text-[#25D366] flex-shrink-0 shadow-lg shadow-[#25D366]/15">
            <Award className="w-7 h-7" />
          </div>
          <div>
            <h3 className="text-lg sm:text-xl font-black text-white mb-1">
              Reach Top 1. Become a <span className="text-[#25D366]">Trusted Uploader.</span>
            </h3>
            <p className="text-xs sm:text-sm text-gray-400 max-w-xl">
              Current Top 1 challenge: 420 approved groups. Once the verified blue checkmark is earned, it stays forever with your contributor profile.
            </p>
          </div>
        </div>

        <button
          onClick={onOpenAddGroup}
          className="w-full md:w-auto inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1ebe5a] text-black font-extrabold text-sm px-6 py-3.5 rounded-xl shadow-lg shadow-[#25D366]/25 transition-all hover:scale-105 cursor-pointer whitespace-nowrap"
        >
          <span>Submit Groups Now &rsaquo;</span>
        </button>
      </div>

      {/* Footer reassurance */}
      <div className="border-t border-white/5 pt-5 mt-6 text-center text-xs text-gray-500 flex items-center justify-center gap-2 flex-wrap">
        <ShieldCheck className="w-4 h-4 text-[#25D366]" />
        <span>Every group you submit helps the community grow.</span>
        <strong className="text-[#25D366] font-semibold">
          Trusted Uploader checkmarks stay permanently after unlocking.
        </strong>
      </div>

    </section>
  );
};
