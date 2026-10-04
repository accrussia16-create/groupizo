import React, { useState } from 'react';
import { useAdmin } from '../../context/AdminContext.tsx';
import { Star, Pin, Trash2, ArrowUp, ArrowDown, ExternalLink, PlusCircle } from 'lucide-react';

export const FeaturedManager: React.FC = () => {
  const { groups, toggleFeatureGroup, togglePinGroup, setActiveTab } = useAdmin();

  const featuredGroups = groups.filter((g) => g.isFeatured);
  const pinnedGroups = groups.filter((g) => g.isPinned);

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white">Featured &amp; Pinned Communities</h1>
          <p className="text-xs text-gray-400 mt-1">
            Control premier visibility placements on the directory homepage and category headers
          </p>
        </div>

        <button
          onClick={() => setActiveTab('groups-all')}
          className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-white font-bold text-xs flex items-center gap-1.5 cursor-pointer border border-white/10 self-start sm:self-auto"
        >
          <PlusCircle className="w-4 h-4 text-[#25D366]" />
          <span>Browse Groups to Feature</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Featured Groups List */}
        <div className="bg-[#14171d] border border-white/10 rounded-2xl p-6 shadow-xl">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-base font-extrabold text-white flex items-center gap-2">
                <Star className="w-4 h-4 text-yellow-400 fill-current" />
                <span>Homepage Featured Rotation ({featuredGroups.length})</span>
              </h2>
              <p className="text-xs text-gray-400">Highlighted on top feed</p>
            </div>
          </div>

          <div className="space-y-3">
            {featuredGroups.length === 0 ? (
              <div className="py-8 text-center text-xs text-gray-500">
                No featured groups configured. Star groups in Group Management to promote them here.
              </div>
            ) : (
              featuredGroups.map((g, idx) => (
                <div
                  key={g.id}
                  className="p-3 rounded-xl bg-white/[0.02] border border-white/5 flex items-center justify-between gap-3"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="font-mono text-xs font-bold text-yellow-400">#{idx + 1}</span>
                    <img
                      src={g.image}
                      alt={g.title}
                      className="w-9 h-9 rounded-lg object-cover bg-black/40 border border-white/10 flex-shrink-0"
                    />
                    <div className="min-w-0">
                      <h3 className="text-xs font-bold text-white truncate">{g.title}</h3>
                      <p className="text-[11px] text-gray-400">{g.category} &middot; {g.country}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => toggleFeatureGroup(g.id)}
                      className="px-2.5 py-1 rounded-lg bg-yellow-400/20 hover:bg-yellow-400 text-yellow-300 hover:text-black font-bold text-[11px] cursor-pointer"
                    >
                      Unfeature
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Pinned Groups List */}
        <div className="bg-[#14171d] border border-white/10 rounded-2xl p-6 shadow-xl">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-base font-extrabold text-white flex items-center gap-2">
                <Pin className="w-4 h-4 text-[#25D366] fill-current" />
                <span>Pinned Communities ({pinnedGroups.length})</span>
              </h2>
              <p className="text-xs text-gray-400">Fixed at top of category feeds</p>
            </div>
          </div>

          <div className="space-y-3">
            {pinnedGroups.length === 0 ? (
              <div className="py-8 text-center text-xs text-gray-500">
                No pinned groups yet. Pin groups from the Groups table to keep them at the top.
              </div>
            ) : (
              pinnedGroups.map((g) => (
                <div
                  key={g.id}
                  className="p-3 rounded-xl bg-white/[0.02] border border-white/5 flex items-center justify-between gap-3"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <img
                      src={g.image}
                      alt={g.title}
                      className="w-9 h-9 rounded-lg object-cover bg-black/40 border border-white/10 flex-shrink-0"
                    />
                    <div className="min-w-0">
                      <h3 className="text-xs font-bold text-white truncate">{g.title}</h3>
                      <p className="text-[11px] text-gray-400">{g.category} &middot; {g.country}</p>
                    </div>
                  </div>

                  <button
                    onClick={() => togglePinGroup(g.id)}
                    className="px-2.5 py-1 rounded-lg bg-[#25D366]/20 hover:bg-[#25D366] text-[#25D366] hover:text-black font-bold text-[11px] cursor-pointer"
                  >
                    Unpin
                  </button>
                </div>
              ))
            )}
          </div>
        </div>

      </div>

    </div>
  );
};
