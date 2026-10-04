import React from 'react';
import { CATEGORIES_DATA, COUNTRIES_DATA, CITIES_DATA } from '../data/groupsData.ts';
import { ArrowRight, MapPin } from 'lucide-react';

interface BrowseSectionsProps {
  onSelectCategory: (slug: string) => void;
  onSelectCountry: (countryName: string) => void;
  onSelectCity: (cityName: string) => void;
}

export const BrowseSections: React.FC<BrowseSectionsProps> = ({
  onSelectCategory,
  onSelectCountry,
  onSelectCity
}) => {
  return (
    <div className="space-y-20 my-16">
      
      {/* ── BROWSE BY CATEGORY ── */}
      <section id="browse-categories" className="scroll-mt-20">
        <div className="text-center mb-8">
          <h2 className="text-2xl sm:text-3xl font-black text-white mb-2">Browse by category</h2>
          <p className="text-xs sm:text-sm text-gray-400 max-w-md mx-auto">
            Pick a topic and see all verified groups listed under it.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-3 sm:gap-4">
          {CATEGORIES_DATA.map((cat) => (
            <button
              key={cat.slug}
              onClick={() => onSelectCategory(cat.slug)}
              className="group bg-[#1e1e1e] hover:bg-[#252525] border border-[#2d2d2d] hover:border-[#25D366] rounded-xl p-3.5 sm:p-4 flex items-center gap-3 transition-all duration-200 hover:-translate-y-0.5 text-left cursor-pointer"
            >
              <div className="text-2xl w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                {cat.icon || '📂'}
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-xs sm:text-sm font-bold text-white group-hover:text-[#25D366] truncate transition-colors">
                  {cat.name}
                </div>
                <div className="text-[11px] text-gray-400">
                  {cat.count} groups
                </div>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* ── BROWSE BY COUNTRY ── */}
      <section id="browse-countries" className="scroll-mt-20">
        <div className="text-center mb-8">
          <h2 className="text-2xl sm:text-3xl font-black text-white mb-2">Browse by country</h2>
          <p className="text-xs sm:text-sm text-gray-400 max-w-md mx-auto">
            Find groups from your country or explore international communities worldwide.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-3 sm:gap-4">
          {COUNTRIES_DATA.map((ctry) => {
            const flagUrl = ctry.code !== 'global'
              ? `https://flagcdn.com/w40/${ctry.code.toLowerCase()}.png`
              : null;

            return (
              <button
                key={ctry.slug}
                onClick={() => onSelectCountry(ctry.name)}
                className="group bg-[#1e1e1e] hover:bg-[#252525] border border-[#2d2d2d] hover:border-[#25D366] rounded-xl p-3.5 sm:p-4 flex items-center gap-3 transition-all duration-200 hover:-translate-y-0.5 text-left cursor-pointer"
              >
                <div className="w-8 h-6 rounded flex items-center justify-center overflow-hidden flex-shrink-0 border border-black/40 shadow-sm">
                  {flagUrl ? (
                    <img 
                      src={flagUrl} 
                      alt={`${ctry.name} flag`} 
                      className="w-full h-full object-cover" 
                      loading="lazy"
                    />
                  ) : (
                    <span className="text-base">🌍</span>
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-xs sm:text-sm font-bold text-white group-hover:text-[#25D366] truncate transition-colors">
                    {ctry.name}
                  </div>
                  <div className="text-[11px] text-gray-400">
                    {ctry.count} groups
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* ── LOCAL COMMUNITIES (CITIES) ── */}
      <section id="browse-cities" className="scroll-mt-20">
        <div className="text-center mb-8">
          <h2 className="text-2xl sm:text-3xl font-black text-white mb-2">Local communities</h2>
          <p className="text-xs sm:text-sm text-gray-400 max-w-md mx-auto">
            Groups tied to specific metropolitan cities and regions.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5 sm:gap-3">
          {CITIES_DATA.map((city) => (
            <button
              key={city.slug}
              onClick={() => onSelectCity(city.name)}
              className="bg-[#1e1e1e] hover:bg-[#25D366]/5 border border-[#2d2d2d] hover:border-[#25D366] rounded-xl px-3.5 py-2.5 flex items-center justify-between gap-2 transition-colors cursor-pointer text-left group"
            >
              <div className="flex items-center gap-2 min-w-0">
                <MapPin className="w-3.5 h-3.5 text-[#25D366] flex-shrink-0" />
                <span className="text-xs sm:text-sm font-medium text-gray-200 group-hover:text-white truncate">
                  {city.name}
                </span>
              </div>
              <span className="bg-[#25D366]/15 text-[#25D366] text-[11px] font-bold px-2 py-0.5 rounded-full flex-shrink-0">
                {city.count}
              </span>
            </button>
          ))}
        </div>
      </section>

    </div>
  );
};
