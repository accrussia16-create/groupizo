import React, { useState } from 'react';
import { useAdmin } from '../../context/AdminContext.tsx';
import { GroupReport, ReportStatus } from '../../types/admin.ts';
import {
  ShieldAlert,
  AlertTriangle,
  CheckCircle,
  Eye,
  Trash2,
  ExternalLink,
  MessageSquare,
  Search,
  X
} from 'lucide-react';

export const ReportsManager: React.FC = () => {
  const { reports, updateReportStatus, deleteReport, setGroupStatus, deleteGroup } = useAdmin();

  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [inspectingReport, setInspectingReport] = useState<GroupReport | null>(null);
  const [internalNote, setInternalNote] = useState('');

  const filteredReports = reports.filter((r) => {
    if (statusFilter !== 'all' && r.status !== statusFilter) return false;
    return true;
  });

  const handleOpenInspect = (r: GroupReport) => {
    setInspectingReport(r);
    setInternalNote(r.internalNotes || '');
  };

  const handleSaveNotes = () => {
    if (inspectingReport) {
      updateReportStatus(inspectingReport.id, inspectingReport.status, internalNote);
      setInspectingReport({ ...inspectingReport, internalNotes: internalNote });
    }
  };

  const getStatusBadge = (status: ReportStatus) => {
    switch (status) {
      case 'Pending':
        return <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/15 text-amber-400 border border-amber-500/30">Pending</span>;
      case 'Investigating':
        return <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-500/15 text-blue-400 border border-blue-500/30">Investigating</span>;
      case 'Resolved':
        return <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">Resolved</span>;
      case 'Dismissed':
        return <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-gray-500/15 text-gray-400">Dismissed</span>;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white">Abuse &amp; Safety Moderation</h1>
          <p className="text-xs text-gray-400 mt-1">
            Community reports regarding broken links, financial scams, impersonation, or illicit content
          </p>
        </div>

        <div className="flex items-center gap-2">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-[#14171d] border border-white/10 rounded-xl px-3 py-2 text-xs text-white outline-none cursor-pointer"
          >
            <option value="all">All Reports</option>
            <option value="Pending">Pending Review</option>
            <option value="Investigating">Investigating</option>
            <option value="Resolved">Resolved</option>
            <option value="Dismissed">Dismissed</option>
          </select>
        </div>
      </div>

      {/* Reports Table */}
      <div className="bg-[#14171d] border border-white/10 rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-white/10 bg-white/[0.02] text-gray-400 font-bold uppercase tracking-wider text-[10px]">
                <th className="py-3.5 px-4">Report ID</th>
                <th className="py-3.5 px-4">Target Group</th>
                <th className="py-3.5 px-4">Violation Reason</th>
                <th className="py-3.5 px-4">Reported Details</th>
                <th className="py-3.5 px-4">Reporter &amp; IP</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Moderator Action</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-white/5 text-gray-300">
              {filteredReports.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-gray-500">
                    No active reports under this filter. Community queue is clean!
                  </td>
                </tr>
              ) : (
                filteredReports.map((r) => (
                  <tr key={r.id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="py-3 px-4 font-mono font-bold text-gray-400">
                      {r.id}
                    </td>

                    <td className="py-3 px-4">
                      <div className="font-bold text-white max-w-[180px] truncate" title={r.groupTitle}>
                        {r.groupTitle}
                      </div>
                      <a
                        href={r.groupInviteLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[11px] text-[#25D366] hover:underline truncate max-w-[180px] font-mono flex items-center gap-1"
                      >
                        <span className="truncate">{r.groupInviteLink}</span>
                        <ExternalLink className="w-3 h-3 flex-shrink-0" />
                      </a>
                    </td>

                    <td className="py-3 px-4 whitespace-nowrap">
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-rose-500/15 text-rose-400 border border-rose-500/30">
                        <AlertTriangle className="w-3 h-3" /> {r.reason}
                      </span>
                    </td>

                    <td className="py-3 px-4 max-w-[220px]">
                      <p className="line-clamp-2 text-gray-300 leading-snug">{r.details}</p>
                    </td>

                    <td className="py-3 px-4 text-[11px] text-gray-400 whitespace-nowrap">
                      <div>{r.reportedByEmail || 'Anonymous Visitor'}</div>
                      <div className="text-[10px] text-gray-500 font-mono">IP: {r.reportedIp}</div>
                    </td>

                    <td className="py-3 px-4 whitespace-nowrap">
                      {getStatusBadge(r.status)}
                    </td>

                    <td className="py-3 px-4 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => handleOpenInspect(r)}
                          className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-gray-200 text-[11px] font-bold cursor-pointer"
                        >
                          Investigate
                        </button>

                        <button
                          onClick={() => updateReportStatus(r.id, 'Dismissed')}
                          className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 text-[11px] cursor-pointer"
                          title="Dismiss report"
                        >
                          Dismiss
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

      {/* Investigation Modal */}
      {inspectingReport && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="bg-[#14171d] border border-white/15 rounded-3xl max-w-lg w-full p-6 shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-rose-400" />
                <span>Investigate: {inspectingReport.groupTitle}</span>
              </h3>
              <button
                onClick={() => setInspectingReport(null)}
                className="p-1 rounded-md text-gray-400 hover:text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3.5 text-xs mb-6">
              <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300">
                <div className="font-bold mb-1 uppercase tracking-wider text-[10px]">
                  Flagged Reason: {inspectingReport.reason}
                </div>
                <p className="leading-relaxed text-gray-200">{inspectingReport.details}</p>
              </div>

              <div>
                <span className="text-gray-500 font-bold block mb-1">WhatsApp Invite Link</span>
                <a
                  href={inspectingReport.groupInviteLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-[#25D366] hover:underline flex items-center gap-1.5"
                >
                  <span className="truncate">{inspectingReport.groupInviteLink}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

              <div>
                <span className="text-gray-500 font-bold block mb-1">Internal Investigation Log</span>
                <textarea
                  rows={2}
                  value={internalNote}
                  onChange={(e) => setInternalNote(e.target.value)}
                  placeholder="Record verification results or action taken..."
                  className="w-full bg-[#1b1f28] border border-white/10 rounded-xl p-3 text-xs text-white outline-none resize-none"
                />
                <button
                  type="button"
                  onClick={handleSaveNotes}
                  className="text-[11px] text-[#25D366] hover:underline mt-1 font-bold cursor-pointer"
                >
                  Save Note
                </button>
              </div>
            </div>

            {/* Moderation Resolution Actions */}
            <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-white/10">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    setGroupStatus(inspectingReport.groupId, 'suspended');
                    updateReportStatus(inspectingReport.id, 'Resolved', 'Group suspended due to confirmed report.');
                    setInspectingReport(null);
                  }}
                  className="px-3 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs cursor-pointer"
                >
                  Suspend Group
                </button>

                <button
                  onClick={() => {
                    deleteGroup(inspectingReport.groupId);
                    updateReportStatus(inspectingReport.id, 'Resolved', 'Group deleted permanently.');
                    setInspectingReport(null);
                  }}
                  className="px-3 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs cursor-pointer"
                >
                  Delete Group
                </button>
              </div>

              <button
                onClick={() => {
                  updateReportStatus(inspectingReport.id, 'Resolved', 'Marked resolved by moderator.');
                  setInspectingReport(null);
                }}
                className="px-4 py-2 rounded-xl bg-[#25D366] hover:bg-[#1ebe5a] text-black font-extrabold text-xs cursor-pointer"
              >
                Mark Resolved
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
