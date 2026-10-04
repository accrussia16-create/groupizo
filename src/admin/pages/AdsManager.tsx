import React from 'react';
import { useAdmin } from '../../context/AdminContext.tsx';
import { Megaphone, CheckCircle2, XCircle, Eye, MousePointerClick } from 'lucide-react';

export const AdsManager: React.FC = () => {
  const { ads, toggleAdSlot } = useAdmin();

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white">Monetization &amp; Advertisement Placements</h1>
          <p className="text-xs text-gray-400 mt-1">
            Manage banner slots, sponsor embeds, partner promotions and AdSense code injections
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {ads.map((ad) => (
          <div
            key={ad.id}
            className="p-5 rounded-2xl bg-[#14171d] border border-white/10 hover:border-[#25D366]/40 transition-colors shadow-xl flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="font-extrabold text-sm text-white flex items-center gap-2">
                  <Megaphone className="w-4 h-4 text-[#25D366]" />
                  <span>{ad.name}</span>
                </span>

                <button
                  onClick={() => toggleAdSlot(ad.id)}
                  className={`px-3 py-1 rounded-full text-xs font-bold cursor-pointer transition-colors ${
                    ad.status === 'active'
                      ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                      : 'bg-white/5 text-gray-400 border border-white/10'
                  }`}
                >
                  {ad.status === 'active' ? 'Active' : 'Disabled'}
                </button>
              </div>

              {ad.bannerUrl && (
                <div className="h-28 w-full rounded-xl overflow-hidden bg-black/40 mb-3 border border-white/5">
                  <img
                    src={ad.bannerUrl}
                    alt={ad.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              <div className="text-xs text-gray-400 space-y-1 font-mono">
                <div>Placement slot: <span className="text-white font-bold">{ad.location}</span></div>
                <div>Target link: <span className="text-[#25D366] truncate block">{ad.targetUrl}</span></div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-xs text-gray-400 font-mono">
              <span className="flex items-center gap-1">
                <Eye className="w-3.5 h-3.5" /> {ad.impressions.toLocaleString()} views
              </span>
              <span className="flex items-center gap-1 text-[#25D366] font-bold">
                <MousePointerClick className="w-3.5 h-3.5" /> {ad.clicks.toLocaleString()} clicks
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
