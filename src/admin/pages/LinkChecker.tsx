import React, { useState } from 'react';
import { useAdmin } from '../../context/AdminContext.tsx';
import { LinkStatus } from '../../types/admin.ts';
import {
  Activity,
  RefreshCw,
  CheckCircle,
  AlertTriangle,
  XCircle,
  Clock,
  ExternalLink,
  Edit,
  Trash2,
  ShieldCheck,
  Search
} from 'lucide-react';

export const LinkChecker: React.FC = () => {
  const { linkChecks, runLinkCheck, isCheckingLinks, replaceLink } = useAdmin();

  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [replacingLinkItem, setReplacingLinkItem] = useState<{ id: string; groupId: string; groupTitle: string; inviteUrl: string } | null>(null);
  const [newInviteUrl, setNewInviteUrl] = useState('');

  const activeCount = linkChecks.filter((l) => l.status === 'ACTIVE').length;
  const brokenCount = linkChecks.filter((l) => l.status === 'BROKEN' || l.status === 'REVOKED').length;
  const pendingCount = linkChecks.filter((l) => l.status === 'PENDING CHECK').length;

  const filteredLinks = linkChecks.filter((l) => {
    if (filterStatus !== 'all' && l.status !== filterStatus) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return l.groupTitle.toLowerCase().includes(q) || l.inviteUrl.toLowerCase().includes(q);
    }
    return true;
  });

  const handleOpenReplace = (item: any) => {
    setReplacingLinkItem(item);
    setNewInviteUrl(item.inviteUrl);
  };

  const handleConfirmReplace = () => {
    if (replacingLinkItem && newInviteUrl.trim()) {
      replaceLink(replacingLinkItem.groupId, newInviteUrl.trim());
      setReplacingLinkItem(null);
    }
  };

  const getStatusBadge = (status: LinkStatus) => {
    switch (status) {
      case 'ACTIVE':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-black bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
            <CheckCircle className="w-3 h-3" /> ACTIVE
          </span>
        );
      case 'BROKEN':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-black bg-rose-500/15 text-rose-400 border border-rose-500/30">
            <XCircle className="w-3 h-3" /> BROKEN (404)
          </span>
        );
      case 'REVOKED':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-black bg-amber-500/15 text-amber-400 border border-amber-500/30">
            <AlertTriangle className="w-3 h-3" /> REVOKED (410)
          </span>
        );
      case 'PENDING CHECK':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-black bg-blue-500/15 text-blue-400 border border-blue-500/30">
            <Clock className="w-3 h-3" /> PENDING CHECK
          </span>
        );
      default:
        return (
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-gray-500/15 text-gray-400">
            {status}
          </span>
        );
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white">WhatsApp Link Health Verification</h1>
          <p className="text-xs text-gray-400 mt-1">
            Automated crawler service verifying invite validity, revocation status &amp; HTTP responses
          </p>
        </div>

        <button
          onClick={() => runLinkCheck()}
          disabled={isCheckingLinks}
          className="px-4 py-2.5 rounded-xl bg-[#25D366] hover:bg-[#1ebe5a] text-black font-extrabold text-xs flex items-center gap-2 shadow-lg shadow-[#25D366]/20 transition-all cursor-pointer disabled:opacity-50"
        >
          <RefreshCw className={`w-4 h-4 ${isCheckingLinks ? 'animate-spin' : ''}`} />
          <span>{isCheckingLinks ? 'Verifying All Links...' : 'Scan All Links Now'}</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 rounded-2xl bg-[#14171d] border border-white/10 flex items-center justify-between">
          <div>
            <span className="text-xs text-gray-400 font-bold block mb-1">Healthy Active Links</span>
            <span className="text-2xl font-black text-emerald-400">{activeCount}</span>
          </div>
          <CheckCircle className="w-8 h-8 text-emerald-400/30" />
        </div>

        <div className="p-4 rounded-2xl bg-[#14171d] border border-white/10 flex items-center justify-between">
          <div>
            <span className="text-xs text-gray-400 font-bold block mb-1">Broken / Revoked Links</span>
            <span className="text-2xl font-black text-rose-400">{brokenCount}</span>
          </div>
          <AlertTriangle className="w-8 h-8 text-rose-400/30" />
        </div>

        <div className="p-4 rounded-2xl bg-[#14171d] border border-white/10 flex items-center justify-between">
          <div>
            <span className="text-xs text-gray-400 font-bold block mb-1">Crawler Frequency</span>
            <span className="text-sm font-bold text-white block mt-1">Every 12 Hours</span>
          </div>
          <Activity className="w-8 h-8 text-[#25D366]/30" />
        </div>
      </div>

      {/* Search & Filters */}
      <div className="bg-[#14171d] border border-white/10 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="w-full sm:w-80 relative flex items-center">
          <Search className="w-4 h-4 text-gray-400 absolute left-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search group name or invite URL..."
            className="w-full bg-[#1b1f28] border border-white/10 focus:border-[#25D366] rounded-xl pl-9 pr-3 py-2 text-xs text-white outline-none"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="w-full sm:w-auto bg-[#1b1f28] border border-white/10 focus:border-[#25D366] rounded-xl px-3 py-2 text-xs text-white outline-none cursor-pointer"
          >
            <option value="all">All Link Statuses</option>
            <option value="ACTIVE">ACTIVE</option>
            <option value="BROKEN">BROKEN</option>
            <option value="REVOKED">REVOKED</option>
            <option value="PENDING CHECK">PENDING CHECK</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-[#14171d] border border-white/10 rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-white/10 bg-white/[0.02] text-gray-400 font-bold uppercase tracking-wider text-[10px]">
                <th className="py-3.5 px-4">Group Name</th>
                <th className="py-3.5 px-4">WhatsApp Invite URL</th>
                <th className="py-3.5 px-4">Health Status</th>
                <th className="py-3.5 px-4">Last Checked</th>
                <th className="py-3.5 px-4">Next Check</th>
                <th className="py-3.5 px-4">Failures</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-white/5 text-gray-300">
              {filteredLinks.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-gray-500">
                    No matching links in registry.
                  </td>
                </tr>
              ) : (
                filteredLinks.map((l) => (
                  <tr key={l.id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="py-3 px-4 font-bold text-white max-w-[200px] truncate">
                      {l.groupTitle}
                    </td>

                    <td className="py-3 px-4 font-mono text-[11px] text-[#25D366] max-w-[240px] truncate">
                      <div className="flex items-center gap-1.5">
                        <span className="truncate">{l.inviteUrl}</span>
                        <a
                          href={l.inviteUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-500 hover:text-white"
                          title="Open WhatsApp link"
                        >
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                    </td>

                    <td className="py-3 px-4 whitespace-nowrap">
                      {getStatusBadge(l.status)}
                    </td>

                    <td className="py-3 px-4 font-mono text-gray-400 whitespace-nowrap">
                      {l.lastChecked}
                    </td>

                    <td className="py-3 px-4 font-mono text-gray-400 whitespace-nowrap">
                      {l.nextCheck}
                    </td>

                    <td className="py-3 px-4 whitespace-nowrap">
                      <span className={`font-mono font-bold ${l.failuresCount > 0 ? 'text-red-400' : 'text-gray-400'}`}>
                        {l.failuresCount}
                      </span>
                    </td>

                    <td className="py-3 px-4 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => runLinkCheck(l.id)}
                          disabled={isCheckingLinks}
                          className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 hover:text-[#25D366] cursor-pointer"
                          title="Ping link health now"
                        >
                          <RefreshCw className="w-3.5 h-3.5" />
                        </button>

                        <button
                          onClick={() => handleOpenReplace(l)}
                          className="px-2.5 py-1 rounded-lg bg-[#25D366]/15 hover:bg-[#25D366] text-[#25D366] hover:text-black font-extrabold text-[11px] cursor-pointer transition-colors"
                        >
                          Replace Link
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Replace Link Modal */}
      {replacingLinkItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="bg-[#14171d] border border-white/15 rounded-3xl max-w-md w-full p-6 shadow-2xl">
            <h3 className="text-lg font-bold text-white mb-1">
              Replace Group Invite Link
            </h3>
            <p className="text-xs text-gray-400 mb-4 truncate">
              Target: <strong className="text-white">{replacingLinkItem.groupTitle}</strong>
            </p>

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-gray-300 mb-1">New WhatsApp Invite Link</label>
                <input
                  type="url"
                  value={newInviteUrl}
                  onChange={(e) => setNewInviteUrl(e.target.value)}
                  placeholder="https://chat.whatsapp.com/..."
                  className="w-full bg-[#1b1f28] border border-white/10 focus:border-[#25D366] rounded-xl px-3 py-2 text-xs text-white outline-none font-mono"
                />
              </div>

              <div className="pt-2 flex gap-2">
                <button
                  type="button"
                  onClick={() => setReplacingLinkItem(null)}
                  className="flex-1 py-2 rounded-xl bg-white/10 text-xs font-bold text-gray-300"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleConfirmReplace}
                  className="flex-1 py-2 rounded-xl bg-[#25D366] text-black text-xs font-black"
                >
                  Save &amp; Verify Link
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
