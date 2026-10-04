import React, { useState } from 'react';
import { useAdmin } from '../../context/AdminContext.tsx';
import {
  LayoutTemplate,
  Eye,
  EyeOff,
  ArrowUp,
  ArrowDown,
  Save,
  CheckCircle,
  HelpCircle,
  Sparkles
} from 'lucide-react';

export const HomepageControl: React.FC = () => {
  const { homepageConfig, setHomepageConfig, toggleSectionEnabled, appearance, updateAppearance, showToast } = useAdmin();

  const [heroHeading, setHeroHeading] = useState(
    appearance?.heroHeading || 'Find WhatsApp Groups That Match Your Interests'
  );
  const [heroSub, setHeroSub] = useState(
    appearance?.heroSubheading || 'Discover public WhatsApp communities by topic, category, country and city.'
  );
  const [searchPlaceholder, setSearchPlaceholder] = useState(
    appearance?.heroSearchPlaceholder || 'Search groups, topics, cities or countries...'
  );

  const moveSection = (index: number, direction: 'up' | 'down') => {
    const newItems = [...homepageConfig];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= newItems.length) return;

    const temp = newItems[index];
    newItems[index] = newItems[targetIndex];
    newItems[targetIndex] = temp;

    setHomepageConfig(newItems);
    showToast('Section order updated.');
  };

  const handleSaveText = (e: React.FormEvent) => {
    e.preventDefault();
    updateAppearance({
      heroHeading: heroHeading.trim(),
      heroSubheading: heroSub.trim(),
      heroSearchPlaceholder: searchPlaceholder.trim()
    });
    showToast('Homepage hero text and search parameters updated.');
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white">Homepage Layout &amp; Content Builder</h1>
          <p className="text-xs text-gray-400 mt-1">
            Toggle visibility, reorder dynamic content blocks, and customize public headline copy
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Section Ordering & Visibility Controls */}
        <div className="lg:col-span-2 bg-[#14171d] border border-white/10 rounded-2xl p-6 shadow-xl">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-base font-extrabold text-white">Homepage Sections Sequence</h2>
              <p className="text-xs text-gray-400">Enable, disable, or rearrange sections displayed to public visitors</p>
            </div>
            <span className="text-xs font-mono text-[#25D366] font-bold">
              {homepageConfig.filter((s) => s.enabled).length} Active Sections
            </span>
          </div>

          <div className="space-y-2">
            {homepageConfig.map((sec, idx) => (
              <div
                key={sec.id}
                className={`p-3.5 rounded-xl border flex items-center justify-between gap-3 transition-colors ${
                  sec.enabled ? 'bg-white/[0.02] border-white/10' : 'bg-black/30 border-white/5 opacity-50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-lg bg-white/5 flex items-center justify-center font-mono font-bold text-xs text-gray-400">
                    {idx + 1}
                  </span>
                  <div>
                    <h3 className="text-xs font-bold text-white">{sec.title}</h3>
                    <span className="text-[10px] text-gray-500 font-mono">ID: #{sec.id}</span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5">
                  {/* Move Up */}
                  <button
                    onClick={() => moveSection(idx, 'up')}
                    disabled={idx === 0}
                    className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white disabled:opacity-20 cursor-pointer"
                    title="Move up"
                  >
                    <ArrowUp className="w-3.5 h-3.5" />
                  </button>

                  {/* Move Down */}
                  <button
                    onClick={() => moveSection(idx, 'down')}
                    disabled={idx === homepageConfig.length - 1}
                    className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white disabled:opacity-20 cursor-pointer"
                    title="Move down"
                  >
                    <ArrowDown className="w-3.5 h-3.5" />
                  </button>

                  {/* Toggle Visibility */}
                  <button
                    onClick={() => toggleSectionEnabled(sec.id)}
                    className={`px-3 py-1 rounded-lg text-xs font-bold flex items-center gap-1 cursor-pointer transition-colors ${
                      sec.enabled
                        ? 'bg-emerald-500/15 text-emerald-400 hover:bg-emerald-500/20'
                        : 'bg-white/5 text-gray-500 hover:text-gray-300'
                    }`}
                  >
                    {sec.enabled ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                    <span>{sec.enabled ? 'Visible' : 'Hidden'}</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Hero Copy & Customizations */}
        <div className="bg-[#14171d] border border-white/10 rounded-2xl p-6 shadow-xl flex flex-col">
          <h2 className="text-base font-extrabold text-white mb-1">Hero Copywriting</h2>
          <p className="text-xs text-gray-400 mb-5">Customize main value proposition on homepage</p>

          <form onSubmit={handleSaveText} className="space-y-4 text-xs flex-1">
            <div>
              <label className="block text-gray-300 font-bold mb-1">Hero Headline</label>
              <input
                type="text"
                value={heroHeading}
                onChange={(e) => setHeroHeading(e.target.value)}
                className="w-full bg-[#1b1f28] border border-white/10 focus:border-[#25D366] rounded-xl px-3 py-2 text-white outline-none"
              />
            </div>

            <div>
              <label className="block text-gray-300 font-bold mb-1">Hero Subheading</label>
              <textarea
                rows={3}
                value={heroSub}
                onChange={(e) => setHeroSub(e.target.value)}
                className="w-full bg-[#1b1f28] border border-white/10 focus:border-[#25D366] rounded-xl px-3 py-2 text-white outline-none resize-none leading-relaxed"
              />
            </div>

            <div>
              <label className="block text-gray-300 font-bold mb-1">Search Bar Placeholder</label>
              <input
                type="text"
                value={searchPlaceholder}
                onChange={(e) => setSearchPlaceholder(e.target.value)}
                className="w-full bg-[#1b1f28] border border-white/10 focus:border-[#25D366] rounded-xl px-3 py-2 text-white outline-none"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-[#25D366] hover:bg-[#1ebe5a] text-black font-extrabold text-xs cursor-pointer shadow-md"
              >
                Save Copy Changes
              </button>
            </div>
          </form>
        </div>

      </div>

    </div>
  );
};
