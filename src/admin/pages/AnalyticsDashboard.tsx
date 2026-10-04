import React, { useState } from 'react';
import { useAdmin } from '../../context/AdminContext.tsx';
import {
  BarChart3,
  TrendingUp,
  Users,
  Eye,
  MousePointerClick,
  Search,
  Globe2,
  Calendar,
  Layers,
  ArrowUpRight
} from 'lucide-react';

export const AnalyticsDashboard: React.FC = () => {
  const { groups } = useAdmin();
  const [filterPeriod, setFilterPeriod] = useState<'today' | '7d' | '30d' | '90d' | '1y'>('30d');

  const analyticsSummary = {
    visitors: '184,200',
    pageViews: '512,800',
    groupViews: '320,100',
    joinClicks: '94,620',
    searches: '48,150',
    conversionRate: '29.5%'
  };

  const topSearchTerms = [
    { term: 'fitness Lagos', count: 1840, change: '+22%' },
    { term: 'crypto India', count: 1420, change: '+15%' },
    { term: 'PUBG tournament custom room', count: 1290, change: '+34%' },
    { term: 'German B1 Goethe', count: 890, change: '+8%' },
    { term: 'Karachi used cars', count: 760, change: '+12%' },
    { term: 'free freelance jobs', count: 640, change: '+19%' }
  ];

  return (
    <div className="space-y-6">
      
      {/* Header & Time Filters */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white">Traffic &amp; Outbound Conversion Analytics</h1>
          <p className="text-xs text-gray-400 mt-1">
            Real-time clickstream data, search inquiries and WhatsApp join analytics
          </p>
        </div>

        {/* Time filters */}
        <div className="flex items-center gap-1 bg-[#14171d] p-1 rounded-2xl border border-white/10 text-xs self-start sm:self-auto">
          {[
            { id: 'today', label: 'Today' },
            { id: '7d', label: '7 Days' },
            { id: '30d', label: '30 Days' },
            { id: '90d', label: '90 Days' },
            { id: '1y', label: '1 Year' }
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setFilterPeriod(item.id as any)}
              className={`px-3 py-1.5 rounded-xl font-bold transition-colors cursor-pointer ${
                filterPeriod === item.id
                  ? 'bg-[#25D366] text-black shadow-sm'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-6 gap-3">
        <div className="p-4 rounded-2xl bg-[#14171d] border border-white/10">
          <span className="text-[11px] text-gray-400 font-bold block mb-1">Unique Visitors</span>
          <span className="text-xl font-black text-white">{analyticsSummary.visitors}</span>
          <span className="text-[10px] text-[#25D366] font-bold block mt-1">+14.2%</span>
        </div>

        <div className="p-4 rounded-2xl bg-[#14171d] border border-white/10">
          <span className="text-[11px] text-gray-400 font-bold block mb-1">Total Page Views</span>
          <span className="text-xl font-black text-white">{analyticsSummary.pageViews}</span>
          <span className="text-[10px] text-[#25D366] font-bold block mt-1">+18.0%</span>
        </div>

        <div className="p-4 rounded-2xl bg-[#14171d] border border-white/10">
          <span className="text-[11px] text-gray-400 font-bold block mb-1">Group Card Views</span>
          <span className="text-xl font-black text-white">{analyticsSummary.groupViews}</span>
          <span className="text-[10px] text-[#25D366] font-bold block mt-1">+11.5%</span>
        </div>

        <div className="p-4 rounded-2xl bg-[#14171d] border border-white/10">
          <span className="text-[11px] text-gray-400 font-bold block mb-1">WhatsApp Join Clicks</span>
          <span className="text-xl font-black text-[#25D366]">{analyticsSummary.joinClicks}</span>
          <span className="text-[10px] text-[#25D366] font-bold block mt-1">+24.8%</span>
        </div>

        <div className="p-4 rounded-2xl bg-[#14171d] border border-white/10">
          <span className="text-[11px] text-gray-400 font-bold block mb-1">Search Queries</span>
          <span className="text-xl font-black text-white">{analyticsSummary.searches}</span>
          <span className="text-[10px] text-[#25D366] font-bold block mt-1">+9.1%</span>
        </div>

        <div className="p-4 rounded-2xl bg-[#14171d] border border-white/10">
          <span className="text-[11px] text-gray-400 font-bold block mb-1">Avg Join Rate</span>
          <span className="text-xl font-black text-emerald-400">{analyticsSummary.conversionRate}</span>
          <span className="text-[10px] text-gray-400 font-bold block mt-1">High conversion</span>
        </div>
      </div>

      {/* Top Performing Groups & Top Search Queries */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Top Performed Groups */}
        <div className="bg-[#14171d] border border-white/10 rounded-2xl p-6 shadow-xl">
          <h2 className="text-base font-extrabold text-white mb-1">Top Joined Communities</h2>
          <p className="text-xs text-gray-400 mb-4">Groups with the highest outbound join click-through rate</p>

          <div className="space-y-3">
            {groups.slice(0, 5).map((g, idx) => (
              <div key={g.id} className="p-3 rounded-xl bg-white/[0.02] border border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-3 min-w-0">
                  <span className="font-mono text-xs font-bold text-[#25D366]">#{idx + 1}</span>
                  <div className="min-w-0">
                    <h3 className="text-xs font-bold text-white truncate max-w-[220px]">{g.title}</h3>
                    <p className="text-[10px] text-gray-400">{g.category} &middot; {g.country}</p>
                  </div>
                </div>

                <div className="text-right">
                  <span className="font-bold text-white text-xs font-mono">{g.joinClicks.toLocaleString()} joins</span>
                  <div className="text-[10px] text-[#25D366]">{((g.joinClicks / (g.views || 1)) * 100).toFixed(1)}% conversion</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Search Terms */}
        <div className="bg-[#14171d] border border-white/10 rounded-2xl p-6 shadow-xl">
          <h2 className="text-base font-extrabold text-white mb-1">Top User Search Inquiries</h2>
          <p className="text-xs text-gray-400 mb-4">Keywords and queries entered into the directory search input</p>

          <div className="space-y-2.5">
            {topSearchTerms.map((item, idx) => (
              <div key={idx} className="p-2.5 rounded-xl bg-white/[0.02] border border-white/5 flex items-center justify-between text-xs">
                <span className="font-bold text-gray-200 flex items-center gap-2">
                  <Search className="w-3.5 h-3.5 text-gray-500" />
                  <span>&ldquo;{item.term}&rdquo;</span>
                </span>

                <div className="flex items-center gap-3">
                  <span className="font-mono font-bold text-white">{item.count.toLocaleString()} searches</span>
                  <span className="text-[10px] font-bold text-[#25D366]">{item.change}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};
