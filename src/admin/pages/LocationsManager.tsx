import React, { useState } from 'react';
import { useAdmin } from '../../context/AdminContext.tsx';
import { AdminCountry, AdminCity } from '../../types/admin.ts';
import {
  Globe2,
  MapPin,
  PlusCircle,
  Edit2,
  Trash2,
  Star,
  Eye,
  EyeOff,
  Search,
  X
} from 'lucide-react';

export const LocationsManager: React.FC = () => {
  const {
    countries,
    addCountry,
    updateCountry,
    deleteCountry,
    cities,
    addCity,
    deleteCity
  } = useAdmin();

  const [activeTab, setActiveTab] = useState<'countries' | 'cities'>('countries');
  const [searchQuery, setSearchQuery] = useState('');

  // Country modal state
  const [isAddCountryOpen, setIsAddCountryOpen] = useState(false);
  const [editingCountry, setEditingCountry] = useState<AdminCountry | null>(null);
  const [countryName, setCountryName] = useState('');
  const [countryCode, setCountryCode] = useState('');

  // City modal state
  const [isAddCityOpen, setIsAddCityOpen] = useState(false);
  const [cityName, setCityName] = useState('');
  const [cityCountry, setCityCountry] = useState('India');

  const filteredCountries = countries.filter((c) =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.code.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredCities = cities.filter((c) =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.country.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSaveCountry = (e: React.FormEvent) => {
    e.preventDefault();
    if (!countryName.trim()) return;

    if (editingCountry) {
      updateCountry(editingCountry.id, {
        name: countryName.trim(),
        code: countryCode.trim().toLowerCase()
      });
      setEditingCountry(null);
    } else {
      addCountry({
        name: countryName.trim(),
        code: countryCode.trim().toLowerCase()
      });
      setIsAddCountryOpen(false);
    }
  };

  const handleSaveCity = (e: React.FormEvent) => {
    e.preventDefault();
    if (!cityName.trim()) return;

    const matchedCountry = countries.find((c) => c.name.toLowerCase() === cityCountry.toLowerCase());

    addCity({
      name: cityName.trim(),
      country: cityCountry,
      countryCode: matchedCountry ? matchedCountry.code : 'global'
    });
    setIsAddCityOpen(false);
    setCityName('');
  };

  return (
    <div className="space-y-6">
      
      {/* Header & Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white">Geographic Locations</h1>
          <p className="text-xs text-gray-400 mt-1">
            Global country registries and regional metropolitan cities taxonomy
          </p>
        </div>

        {/* Tab switch */}
        <div className="flex items-center gap-2 bg-[#14171d] p-1 rounded-2xl border border-white/10 self-start sm:self-auto">
          <button
            onClick={() => setActiveTab('countries')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'countries' ? 'bg-[#25D366] text-black shadow-sm' : 'text-gray-400 hover:text-white'
            }`}
          >
            <Globe2 className="w-4 h-4" />
            <span>Countries ({countries.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('cities')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'cities' ? 'bg-[#25D366] text-black shadow-sm' : 'text-gray-400 hover:text-white'
            }`}
          >
            <MapPin className="w-4 h-4" />
            <span>Cities ({cities.length})</span>
          </button>
        </div>
      </div>

      {/* Action and Search Bar */}
      <div className="bg-[#14171d] border border-white/10 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="w-full sm:w-80 relative flex items-center">
          <Search className="w-4 h-4 text-gray-400 absolute left-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={`Search ${activeTab}...`}
            className="w-full bg-[#1b1f28] border border-white/10 focus:border-[#25D366] rounded-xl pl-9 pr-3 py-2 text-xs text-white outline-none"
          />
        </div>

        {activeTab === 'countries' ? (
          <button
            onClick={() => {
              setCountryName('');
              setCountryCode('');
              setIsAddCountryOpen(true);
            }}
            className="w-full sm:w-auto px-4 py-2 rounded-xl bg-[#25D366] hover:bg-[#1ebe5a] text-black font-extrabold text-xs flex items-center justify-center gap-1.5 cursor-pointer shadow-md"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Add Country</span>
          </button>
        ) : (
          <button
            onClick={() => setIsAddCityOpen(true)}
            className="w-full sm:w-auto px-4 py-2 rounded-xl bg-[#25D366] hover:bg-[#1ebe5a] text-black font-extrabold text-xs flex items-center justify-center gap-1.5 cursor-pointer shadow-md"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Add City</span>
          </button>
        )}
      </div>

      {/* Countries View */}
      {activeTab === 'countries' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredCountries.map((c) => (
            <div
              key={c.id}
              className={`p-4 rounded-2xl border transition-all hover:-translate-y-1 hover:shadow-xl ${
                c.isHidden ? 'bg-[#14171d]/60 border-white/5 opacity-50' : 'bg-[#14171d] border-white/10 hover:border-[#25D366]/40'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-7 rounded overflow-hidden border border-black/40 shadow-sm flex items-center justify-center bg-black/40">
                  {c.code !== 'global' ? (
                    <img
                      src={`https://flagcdn.com/w40/${c.code.toLowerCase()}.png`}
                      alt={c.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span>🌍</span>
                  )}
                </div>

                <div className="flex items-center gap-1">
                  <button
                    onClick={() => updateCountry(c.id, { isFeatured: !c.isFeatured })}
                    className={`p-1.5 rounded-lg cursor-pointer ${
                      c.isFeatured ? 'text-yellow-400 bg-yellow-400/10' : 'text-gray-500 hover:text-gray-300'
                    }`}
                    title={c.isFeatured ? 'Featured Country' : 'Feature Country'}
                  >
                    <Star className="w-3.5 h-3.5 fill-current" />
                  </button>

                  <button
                    onClick={() => updateCountry(c.id, { isHidden: !c.isHidden })}
                    className="p-1.5 rounded-lg text-gray-500 hover:text-white cursor-pointer"
                  >
                    {c.isHidden ? <EyeOff className="w-3.5 h-3.5 text-amber-400" /> : <Eye className="w-3.5 h-3.5" />}
                  </button>

                  <button
                    onClick={() => {
                      setEditingCountry(c);
                      setCountryName(c.name);
                      setCountryCode(c.code);
                    }}
                    className="p-1.5 rounded-lg text-gray-400 hover:text-[#25D366] cursor-pointer"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => deleteCountry(c.id)}
                    className="p-1.5 rounded-lg text-gray-500 hover:text-red-400 cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <h3 className="text-sm font-extrabold text-white truncate">{c.name}</h3>
              <div className="flex items-center justify-between text-xs text-gray-400 mt-2 pt-2 border-t border-white/5">
                <span className="font-mono uppercase text-[10px] text-gray-500">ISO: {c.code}</span>
                <span className="font-bold text-[#25D366]">{c.groupsCount} groups</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Cities View */}
      {activeTab === 'cities' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {filteredCities.map((city) => (
            <div
              key={city.id}
              className="bg-[#14171d] border border-white/10 hover:border-[#25D366]/40 rounded-xl p-3 flex items-center justify-between transition-all"
            >
              <div className="flex items-center gap-2 min-w-0">
                <MapPin className="w-4 h-4 text-[#25D366] flex-shrink-0" />
                <div className="min-w-0">
                  <div className="text-xs font-bold text-white truncate">{city.name}</div>
                  <div className="text-[10px] text-gray-400 truncate">{city.country}</div>
                </div>
              </div>

              <div className="flex items-center gap-2 flex-shrink-0">
                <span className="text-[11px] font-bold text-[#25D366] px-2 py-0.5 rounded-full bg-[#25D366]/10">
                  {city.groupsCount}
                </span>
                <button
                  onClick={() => deleteCity(city.id)}
                  className="p-1 text-gray-500 hover:text-red-400 cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Country Modal */}
      {(isAddCountryOpen || editingCountry) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="bg-[#14171d] border border-white/15 rounded-3xl max-w-sm w-full p-6 shadow-2xl">
            <h3 className="text-lg font-bold text-white mb-4">
              {editingCountry ? 'Edit Country' : 'Add New Country'}
            </h3>

            <form onSubmit={handleSaveCountry} className="space-y-3 text-xs">
              <div>
                <label className="block text-gray-300 font-bold mb-1">Country Name</label>
                <input
                  type="text"
                  required
                  value={countryName}
                  onChange={(e) => setCountryName(e.target.value)}
                  placeholder="e.g. Bangladesh"
                  className="w-full bg-[#1b1f28] border border-white/10 rounded-xl px-3 py-2 text-white outline-none"
                />
              </div>

              <div>
                <label className="block text-gray-300 font-bold mb-1">2-Letter ISO Code (for flag)</label>
                <input
                  type="text"
                  required
                  maxLength={2}
                  value={countryCode}
                  onChange={(e) => setCountryCode(e.target.value.toLowerCase())}
                  placeholder="e.g. bd, in, pk, us"
                  className="w-full bg-[#1b1f28] border border-white/10 rounded-xl px-3 py-2 text-white outline-none uppercase font-mono"
                />
              </div>

              <div className="pt-3 flex gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setIsAddCountryOpen(false);
                    setEditingCountry(null);
                  }}
                  className="flex-1 py-2 rounded-xl bg-white/10 text-gray-300 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2 rounded-xl bg-[#25D366] text-black font-extrabold"
                >
                  Save Country
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* City Modal */}
      {isAddCityOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="bg-[#14171d] border border-white/15 rounded-3xl max-w-sm w-full p-6 shadow-2xl">
            <h3 className="text-lg font-bold text-white mb-4">Add Regional City</h3>

            <form onSubmit={handleSaveCity} className="space-y-3 text-xs">
              <div>
                <label className="block text-gray-300 font-bold mb-1">City Name</label>
                <input
                  type="text"
                  required
                  value={cityName}
                  onChange={(e) => setCityName(e.target.value)}
                  placeholder="e.g. Rawalpindi"
                  className="w-full bg-[#1b1f28] border border-white/10 rounded-xl px-3 py-2 text-white outline-none"
                />
              </div>

              <div>
                <label className="block text-gray-300 font-bold mb-1">Country</label>
                <select
                  value={cityCountry}
                  onChange={(e) => setCityCountry(e.target.value)}
                  className="w-full bg-[#1b1f28] border border-white/10 rounded-xl px-3 py-2 text-white outline-none cursor-pointer"
                >
                  {countries.map((c) => (
                    <option key={c.id} value={c.name}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="pt-3 flex gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddCityOpen(false)}
                  className="flex-1 py-2 rounded-xl bg-white/10 text-gray-300 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2 rounded-xl bg-[#25D366] text-black font-extrabold"
                >
                  Save City
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
