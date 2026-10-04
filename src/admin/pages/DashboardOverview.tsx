import React, { useState } from 'react';
import { useAdmin } from '../../context/AdminContext.tsx';
import {
  Users2,
  CheckCircle2,
  Clock,
  Star,
  AlertTriangle,
  Skull,
  FolderTree,
  Globe2,
  MapPin,
  Users,
  TrendingUp,
  ArrowUpRight,
  Eye,
  MousePointerClick,
  PlusCircle,
  Activity,
  Calendar,
  ExternalLink
} from 'lucide-react';

export const DashboardOverview: React.FC = () => {
  const {
    groups,
    submissions,
    reports,
    categories,
    countries,
    cities,
    users,
    auditLogs,
    setActiveTab
  } = useAdmin();

  const [timeRange, setTimeRange] = useState<'today' | 'week' | 'month' | 'year'>('month');

  // Computed metrics
  const totalGroups = groups.length;
  const activeGroups = groups.filter((g) => g.status === 'active').length;
  const pendingGroups = groups.filter((g) => g.status === 'pending').length + submissions.filter((s) => s.status === 'Pending').length;
  const featuredGroups = groups.filter((g) => g.isFeatured).length;
  const reportedGroups = groups.filter((g) => g.status === 'reported' || g.reportsCount > 0).length;
  const deadGroups = groups.filter((g) => g.status === 'expired' || g.linkHealth === 'BROKEN' || g.linkHealth === 'REVOKED').length;
  
  const totalCategories = categories.length;
  const totalCountries = countries.length;
  const totalCities = cities.length;
  const totalUsersCount = users.length;

  const totalViews = groups.reduce((acc, g) => acc + g.views, 74800);
  const totalJoins = groups.reduce((acc, g) => acc + g.joinClicks, 23410);

  // Stats cards config
  const statCards = [
    {
      title: 'Total Groups',
      value: totalGroups,
      icon: <Users2 className="w-5 h-5 text-[#25D366]" />,
      change: '+18.4%',
      trend: 'up',
      desc: 'Catalogued in database',
      tab: 'groups-all'
    },
    {
      title: 'Active Groups',
      value: activeGroups,
      icon: <CheckCircle2 className="w-5 h-5 text-emerald-400" />,
      change: '+14.2%',
      trend: 'up',
      desc: 'Serving live visitor traffic',
      tab: 'groups-all'
    },
    {
      title: 'Pending Submissions',
      value: pendingGroups,
      icon: <Clock className="w-5 h-5 text-amber-400" />,
      change: '+5 today',
      trend: 'neutral',
      desc: 'Requires review',
      tab: 'submissions',
      highlight: pendingGroups > 0
    },
    {
      title: 'Featured / Pinned',
      value: featuredGroups,
      icon: <Star className="w-5 h-5 text-yellow-400" />,
      change: 'Top rotation',
      trend: 'neutral',
      desc: 'Displayed in hero & top lists',
      tab: 'featured'
    },
    {
      title: 'Reported Groups',
      value: reportedGroups,
      icon: <AlertTriangle className="w-5 h-5 text-rose-500" />,
      change: '-2 resolved',
      trend: 'down',
      desc: 'Scam or broken complaints',
      tab: 'reports',
      highlight: reportedGroups > 0
    },
    {
      title: 'Dead / Broken Links',
      value: deadGroups,
      icon: <Skull className="w-5 h-5 text-gray-400" />,
      change: 'Needs repair',
      trend: 'neutral',
      desc: 'Revoked by group admins',
      tab: 'link-checker'
    },
    {
      title: 'Categories',
      value: totalCategories,
      icon: <FolderTree className="w-5 h-5 text-teal-400" />,
      change: '12 Featured',
      trend: 'neutral',
      desc: 'Classification taxonomy',
      tab: 'categories'
    },
    {
      title: 'Countries & Cities',
      value: `${totalCountries} / ${totalCities}`,
      icon: <Globe2 className="w-5 h-5 text-sky-400" />,
      change: '52 Global',
      trend: 'up',
      desc: 'Geographic coverage',
      tab: 'locations'
    },
    {
      title: 'Registered Users',
      value: totalUsersCount,
      icon: <Users className="w-5 h-5 text-indigo-400" />,
      change: '+12 this week',
      trend: 'up',
      desc: 'Contributors & admins',
      tab: 'users'
    }
  ];

  // Chart data simulation depending on timeRange
  const chartData = {
    today: [
      { label: '00:00', added: 1, views: 320, joins: 88 },
      { label: '04:00', added: 0, views: 180, joins: 45 },
      { label: '08:00', added: 3, views: 920, joins: 310 },
      { label: '12:00', added: 5, views: 1840, joins: 680 },
      { label: '16:00', added: 4, views: 1650, joins: 540 },
      { label: '20:00', added: 6, views: 2100, joins: 790 }
    ],
    week: [
      { label: 'Mon', added: 14, views: 8900, joins: 2600 },
      { label: 'Tue', added: 19, views: 10400, joins: 3100 },
      { label: 'Wed', added: 22, views: 12100, joins: 3800 },
      { label: 'Thu', added: 16, views: 9800, joins: 2950 },
      { label: 'Fri', added: 28, views: 15400, joins: 4800 },
      { label: 'Sat', added: 34, views: 18200, joins: 5900 },
      { label: 'Sun', added: 26, views: 14700, joins: 4400 }
    ],
    month: [
      { label: 'W1', added: 84, views: 42000, joins: 12400 },
      { label: 'W2', added: 98, views: 49000, joins: 14800 },
      { label: 'W3', added: 112, views: 56000, joins: 17200 },
      { label: 'W4', added: 126, views: 63000, joins: 19800 }
    ],
    year: [
      { label: 'Q1', added: 340, views: 180000, joins: 54000 },
      { label: 'Q2', added: 420, views: 220000, joins: 68000 },
      { label: 'Q3', added: 510, views: 275000, joins: 86000 },
      { label: 'Q4', added: 640, views: 340000, joins: 108000 }
    ]
  }[timeRange];

  const maxViews = Math.max(...chartData.map((d) => d.views));

  return (
    <div className="space-y-8 animate-fadeIn">
      
      {/* Top Banner with Quick Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-gradient-to-r from-[#17231a] to-[#12161c] border border-[#25D366]/20 rounded-2xl p-6 shadow-xl">
        <div>
          <div className="text-xs font-bold text-[#25D366] uppercase tracking-wider mb-1 flex items-center gap-1.5">
            <Activity className="w-4 h-4" /> Real-time Administrative Overview
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white">
            System Dashboard
          </h1>
          <p className="text-xs sm:text-sm text-gray-400 mt-1">
            Directory health, group approvals, live WhatsApp invite monitoring &amp; analytics.
          </p>
        </div>

        <div className="flex items-center gap-2.5 flex-wrap">
          <button
            onClick={() => setActiveTab('groups-new')}
            className="px-4 py-2.5 rounded-xl bg-[#25D366] hover:bg-[#1ebe5a] text-black font-extrabold text-xs flex items-center gap-1.5 shadow-md shadow-[#25D366]/20 transition-all cursor-pointer"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Add Group</span>
          </button>
          <button
            onClick={() => setActiveTab('submissions')}
            className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer border border-white/10"
          >
            <Clock className="w-4 h-4 text-amber-400" />
            <span>Review Queue ({pendingGroups})</span>
          </button>
        </div>
      </div>

      {/* KPI Metric Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4">
        {statCards.map((card, idx) => (
          <div
            key={idx}
            onClick={() => setActiveTab(card.tab)}
            className={`p-5 rounded-2xl border transition-all hover:-translate-y-1 hover:shadow-xl cursor-pointer ${
              card.highlight
                ? 'bg-amber-500/[0.07] border-amber-500/40 hover:border-amber-400'
                : 'bg-[#14171d] border-white/10 hover:border-[#25D366]/40'
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-gray-400">{card.title}</span>
              <div className="p-2 rounded-xl bg-white/5 border border-white/10">
                {card.icon}
              </div>
            </div>

            <div className="flex items-baseline justify-between mb-1.5">
              <span className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                {card.value}
              </span>
              <span className="text-[11px] font-bold text-[#25D366] flex items-center gap-0.5">
                <ArrowUpRight className="w-3.5 h-3.5" /> {card.change}
              </span>
            </div>

            <p className="text-xs text-gray-500">{card.desc}</p>
          </div>
        ))}
      </div>

      {/* Traffic & Clicks Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Main Chart (Views & Join Clicks) */}
        <div className="lg:col-span-2 bg-[#14171d] border border-white/10 rounded-2xl p-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
            <div>
              <h3 className="text-base font-extrabold text-white flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-[#25D366]" /> Traffic &amp; WhatsApp Joins
              </h3>
              <p className="text-xs text-gray-400">Total views and outbound WhatsApp join clicks</p>
            </div>

            {/* Time Filter Buttons */}
            <div className="flex items-center gap-1 bg-white/5 p-1 rounded-xl border border-white/10 text-xs">
              {(['today', 'week', 'month', 'year'] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => setTimeRange(t)}
                  className={`px-3 py-1 rounded-lg font-bold capitalize transition-colors cursor-pointer ${
                    timeRange === t ? 'bg-[#25D366] text-black shadow-sm' : 'text-gray-400 hover:text-white'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* Bar Chart Visualization */}
          <div className="h-64 flex items-end gap-3 pt-6 pb-2 border-b border-white/10">
            {chartData.map((d, i) => {
              const viewHeight = Math.round((d.views / maxViews) * 100);
              const joinHeight = Math.round((d.joins / maxViews) * 100);

              return (
                <div key={i} className="flex-1 flex flex-col items-center gap-2 h-full justify-end group">
                  <div className="text-[10px] text-gray-400 font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                    {d.views.toLocaleString()}
                  </div>
                  
                  {/* Dual Bar (Views in dark green, Joins in WhatsApp green) */}
                  <div className="w-full max-w-[36px] flex items-end gap-1 h-full">
                    <div 
                      className="flex-1 bg-emerald-800/80 hover:bg-emerald-700 rounded-t transition-all"
                      style={{ height: `${viewHeight}%` }}
                      title={`Views: ${d.views}`}
                    />
                    <div 
                      className="flex-1 bg-[#25D366] hover:bg-[#1ebe5a] rounded-t transition-all shadow-[0_0_8px_rgba(37,211,102,0.4)]"
                      style={{ height: `${joinHeight}%` }}
                      title={`Joins: ${d.joins}`}
                    />
                  </div>

                  <span className="text-[11px] font-bold text-gray-400">{d.label}</span>
                </div>
              );
            })}
          </div>

          <div className="flex items-center justify-between pt-4 text-xs">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-sm bg-emerald-800" />
                <span className="text-gray-400">Directory Page Views: <strong className="text-white">{totalViews.toLocaleString()}</strong></span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-sm bg-[#25D366]" />
                <span className="text-gray-400">WhatsApp Joins: <strong className="text-white">{totalJoins.toLocaleString()}</strong></span>
              </div>
            </div>

            <div className="text-[11px] text-[#25D366] font-bold">
              Avg conversion: {((totalJoins / totalViews) * 100).toFixed(1)}%
            </div>
          </div>
        </div>

        {/* Popular Categories Distribution */}
        <div className="bg-[#14171d] border border-white/10 rounded-2xl p-6 flex flex-col">
          <h3 className="text-base font-extrabold text-white mb-1">Top Categories</h3>
          <p className="text-xs text-gray-400 mb-5">Share of groups catalogued by genre</p>

          <div className="space-y-3.5 flex-1">
            {categories.slice(0, 6).map((cat) => {
              const pct = Math.round((cat.groupsCount / 475) * 100);

              return (
                <div key={cat.id} className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-gray-200 flex items-center gap-1.5">
                      <span>{cat.icon}</span> {cat.name}
                    </span>
                    <span className="font-mono text-gray-400">{cat.groupsCount} groups</span>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-white/10 overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-emerald-600 to-[#25D366] rounded-full" 
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          <button
            onClick={() => setActiveTab('categories')}
            className="mt-4 pt-3 border-t border-white/10 text-xs font-bold text-[#25D366] hover:underline flex items-center justify-center gap-1 cursor-pointer"
          >
            <span>Manage All 12 Categories</span>
            <ExternalLink className="w-3 h-3" />
          </button>
        </div>

      </div>

      {/* Bottom Grid: Recent Activity Feed & Geographic Hotspots */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Recent Activity / Audit Log */}
        <div className="lg:col-span-2 bg-[#14171d] border border-white/10 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-extrabold text-white">Recent Administrative Events</h3>
              <p className="text-xs text-gray-400">System actions, approvals, moderation updates</p>
            </div>
            <button
              onClick={() => setActiveTab('activity')}
              className="text-xs font-bold text-[#25D366] hover:underline cursor-pointer"
            >
              View Full Audit Log
            </button>
          </div>

          <div className="divide-y divide-white/5">
            {auditLogs.slice(0, 5).map((log) => (
              <div key={log.id} className="py-3 flex items-start justify-between gap-4">
                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-lg bg-white/5 flex items-center justify-center text-xs font-bold text-[#25D366] flex-shrink-0 mt-0.5">
                    ✓
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white">
                      {log.action}: <span className="text-[#25D366]">{log.target}</span>
                    </div>
                    {log.details && (
                      <div className="text-[11px] text-gray-400">{log.details}</div>
                    )}
                    <div className="text-[10px] text-gray-500 mt-0.5">
                      by {log.adminName} &middot; IP {log.ipAddress}
                    </div>
                  </div>
                </div>
                <span className="text-[11px] text-gray-500 whitespace-nowrap font-mono">
                  {log.timestamp}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Geographic Hotspots */}
        <div className="bg-[#14171d] border border-white/10 rounded-2xl p-6">
          <h3 className="text-base font-extrabold text-white mb-1">Top Countries</h3>
          <p className="text-xs text-gray-400 mb-4">Distribution of global WhatsApp groups</p>

          <div className="space-y-3">
            {countries.slice(0, 6).map((c) => (
              <div key={c.id} className="flex items-center justify-between p-2 rounded-xl bg-white/[0.02] border border-white/5">
                <div className="flex items-center gap-2.5">
                  {c.code !== 'global' ? (
                    <img
                      src={`https://flagcdn.com/w40/${c.code.toLowerCase()}.png`}
                      alt={c.name}
                      className="w-5 h-3.5 object-cover rounded shadow-sm"
                    />
                  ) : (
                    <span>🌍</span>
                  )}
                  <span className="text-xs font-bold text-white">{c.name}</span>
                </div>
                <span className="text-xs font-mono font-bold text-[#25D366]">
                  {c.groupsCount}
                </span>
              </div>
            ))}
          </div>

          <button
            onClick={() => setActiveTab('locations')}
            className="w-full mt-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-bold text-gray-300 transition-colors cursor-pointer text-center"
          >
            Manage Countries &amp; Cities
          </button>
        </div>

      </div>

    </div>
  );
};
