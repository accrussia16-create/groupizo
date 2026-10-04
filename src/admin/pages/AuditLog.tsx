import React, { useState } from 'react';
import { useAdmin } from '../../context/AdminContext.tsx';
import { History, Search, Download } from 'lucide-react';

export const AuditLog: React.FC = () => {
  const { auditLogs, showToast } = useAdmin();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredLogs = auditLogs.filter((l) =>
    l.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
    l.target.toLowerCase().includes(searchQuery.toLowerCase()) ||
    l.adminName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleExportLogs = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(auditLogs, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `groupizo_audit_log_${new Date().toISOString().substring(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    showToast('Audit log exported to JSON.');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white">Administrative Activity Audit Log</h1>
          <p className="text-xs text-gray-400 mt-1">
            Immutable log recording administrative approvals, group suspensions, and configuration edits
          </p>
        </div>

        <button
          onClick={handleExportLogs}
          className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-white font-bold text-xs flex items-center gap-1.5 cursor-pointer border border-white/10 self-start sm:self-auto"
        >
          <Download className="w-4 h-4 text-[#25D366]" />
          <span>Export Audit Log (JSON)</span>
        </button>
      </div>

      {/* Search Bar */}
      <div className="w-full sm:w-80 relative flex items-center">
        <Search className="w-4 h-4 text-gray-400 absolute left-3" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search by action, user, or target..."
          className="w-full bg-[#14171d] border border-white/10 focus:border-[#25D366] rounded-xl pl-9 pr-3 py-2 text-xs text-white outline-none"
        />
      </div>

      {/* Table */}
      <div className="bg-[#14171d] border border-white/10 rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-white/10 bg-white/[0.02] text-gray-400 font-bold uppercase tracking-wider text-[10px]">
                <th className="py-3.5 px-4">Timestamp</th>
                <th className="py-3.5 px-4">Administrator</th>
                <th className="py-3.5 px-4">Action</th>
                <th className="py-3.5 px-4">Target Entity</th>
                <th className="py-3.5 px-4">Event Details</th>
                <th className="py-3.5 px-4 text-right">IP Address</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-white/5 text-gray-300">
              {filteredLogs.map((log) => (
                <tr key={log.id} className="hover:bg-white/[0.02] transition-colors">
                  <td className="py-3 px-4 font-mono text-gray-400 whitespace-nowrap">
                    {log.timestamp}
                  </td>

                  <td className="py-3 px-4 whitespace-nowrap">
                    <div className="font-bold text-white">{log.adminName}</div>
                    <div className="text-[10px] text-gray-500">{log.adminEmail}</div>
                  </td>

                  <td className="py-3 px-4 whitespace-nowrap">
                    <span className="font-extrabold text-[#25D366] bg-[#25D366]/10 px-2 py-0.5 rounded-full text-[11px]">
                      {log.action}
                    </span>
                  </td>

                  <td className="py-3 px-4 font-semibold text-white max-w-[200px] truncate" title={log.target}>
                    {log.target}
                  </td>

                  <td className="py-3 px-4 text-gray-400 max-w-[260px] truncate">
                    {log.details || '-'}
                  </td>

                  <td className="py-3 px-4 text-right font-mono text-[11px] text-gray-400 whitespace-nowrap">
                    {log.ipAddress}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
