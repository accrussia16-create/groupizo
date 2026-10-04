import React from 'react';
import { useAdmin } from '../context/AdminContext.tsx';
import { MapPin, Globe2, FolderTree, ArrowRight } from 'lucide-react';

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
  const { categories, countries, cities } = useAdmin();

  return (
    <div className="space-y-16 my-16">
      
      {/* ── BROWSE BY CATEGORY ── */}
      <section id="browse-categories" className="scroll-mt-24">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-[#128C7E] font-bold text-xs uppercase tracking-wider mb-2">
            <FolderTree className="w-3.5 h-3.5" /> Topics &amp; Interests
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-gray-950">
            Browse Groups by Category
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 max-w-md mx-auto mt-1">
            Pick a topic and discover targeted WhatsApp groups curated for that interest.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-3 sm:gap-4">
          {categories.filter((c) => !c.isHidden).map((cat) => (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.slug)}
              className="group bg-white hover:bg-emerald-50/50 border border-gray-200 hover:border-[#25D366] rounded-2xl p-4 flex items-center gap-3 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md text-left cursor-pointer"
            >
              <div className="text-2xl w-11 h-11 rounded-xl bg-gray-100 group-hover:bg-[#25D366]/20 flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-all">
                {cat.icon || '📁'}
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-sm font-extrabold text-gray-900 group-hover:text-[#128C7E] truncate transition-colors">
                  {cat.name}
                </div>
                <div className="text-xs text-gray-500 mt-0.5">
                  {cat.groupsCount} groups
                </div>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* ── BROWSE BY COUNTRY ── */}
      <section id="browse-countries" className="scroll-mt-24">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-[#128C7E] font-bold text-xs uppercase tracking-wider mb-2">
            <Globe2 className="w-3.5 h-3.5" /> Worldwide Reach
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-gray-950">
            Browse Groups by Country
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 max-w-md mx-auto mt-1">
            Find active groups from your homeland or join international global chats.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-3 sm:gap-4">
          {countries.filter((c) => !c.isHidden).map((ctry) => {
            const flagUrl = ctry.code !== 'global'
              ? `https://flagcdn.com/w40/${ctry.code.toLowerCase()}.png`
              : null;

            return (
              <button
                key={ctry.id}
                onClick={() => onSelectCountry(ctry.name)}
                className="group bg-white hover:bg-emerald-50/50 border border-gray-200 hover:border-[#25D366] rounded-2xl p-4 flex items-center gap-3 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md text-left cursor-pointer"
              >
                <div className="w-9 h-6.5 rounded overflow-hidden flex items-center justify-center flex-shrink-0 border border-black/10 shadow-xs bg-gray-100">
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
                  <div className="text-sm font-extrabold text-gray-900 group-hover:text-[#128C7E] truncate transition-colors">
                    {ctry.name}
                  </div>
                  <div className="text-xs text-gray-500 mt-0.5">
                    {ctry.groupsCount} groups
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* ── LOCAL METROPOLITAN CITIES ── */}
      <section id="browse-cities" className="scroll-mt-24">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-[#128C7E] font-bold text-xs uppercase tracking-wider mb-2">
            <MapPin className="w-3.5 h-3.5" /> Local Networks
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-gray-950">
            Regional City Communities
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 max-w-md mx-auto mt-1">
            Connect with people in your local metropolitan city, district or university hub.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {cities.filter((c) => !c.isHidden).map((city) => (
            <button
              key={city.id}
              onClick={() => onSelectCity(city.name)}
              className="bg-white hover:bg-emerald-50/60 border border-gray-200 hover:border-[#25D366] rounded-2xl px-4 py-3 flex items-center justify-between gap-2 transition-all cursor-pointer text-left group shadow-2xs hover:shadow-sm"
            >
              <div className="flex items-center gap-2 min-w-0">
                <MapPin className="w-4 h-4 text-[#128C7E] flex-shrink-0" />
                <span className="text-sm font-bold text-gray-900 group-hover:text-[#128C7E] truncate">
                  {city.name}
                </span>
              </div>
              <span className="bg-emerald-100 text-[#128C7E] text-[11px] font-black px-2 py-0.5 rounded-full flex-shrink-0">
                {city.groupsCount}
              </span>
            </button>
          ))}
        </div>
      </section>

    </div>
  );
};
