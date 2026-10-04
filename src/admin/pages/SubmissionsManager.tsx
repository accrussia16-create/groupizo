import React, { useState } from 'react';
import { useAdmin } from '../../context/AdminContext.tsx';
import { Submission, SubmissionStatus } from '../../types/admin.ts';
import {
  CheckCircle,
  XCircle,
  Clock,
  AlertCircle,
  ExternalLink,
  Trash2,
  Eye,
  Search,
  Filter
} from 'lucide-react';

export const SubmissionsManager: React.FC = () => {
  const { submissions, approveSubmission, rejectSubmission, deleteSubmission } = useAdmin();

  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [reviewingSub, setReviewingSub] = useState<Submission | null>(null);
  const [rejectingSubId, setRejectingSubId] = useState<string | null>(null);
  const [rejectionReason, setRejectionReason] = useState('Violates community policy (Spam / Fake link)');

  const filteredSubmissions = submissions.filter((s) => {
    if (statusFilter !== 'all' && s.status !== statusFilter) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        s.groupName.toLowerCase().includes(q) ||
        s.submitterName.toLowerCase().includes(q) ||
        s.submitterEmail.toLowerCase().includes(q) ||
        s.category.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const handleApprove = (id: string) => {
    approveSubmission(id);
    if (reviewingSub?.id === id) setReviewingSub(null);
  };

  const handleReject = () => {
    if (rejectingSubId) {
      rejectSubmission(rejectingSubId, rejectionReason);
      setRejectingSubId(null);
      if (reviewingSub?.id === rejectingSubId) setReviewingSub(null);
    }
  };

  const getStatusBadge = (status: SubmissionStatus) => {
    switch (status) {
      case 'Pending':
        return <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-amber-500/15 text-amber-400 border border-amber-500/30">Pending Review</span>;
      case 'Approved':
        return <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">Approved &amp; Live</span>;
      case 'Rejected':
        return <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-rose-500/15 text-rose-400 border border-rose-500/30">Rejected</span>;
      default:
        return <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-gray-500/15 text-gray-400">{status}</span>;
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white">Community Submissions Queue</h1>
          <p className="text-xs text-gray-400 mt-1">
            Incoming WhatsApp group submissions pending verification and publication
          </p>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-[#14171d] border border-white/10 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="w-full sm:w-80 relative flex items-center">
          <Search className="w-4 h-4 text-gray-400 absolute left-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by group or submitter email..."
            className="w-full bg-[#1b1f28] border border-white/10 focus:border-[#25D366] rounded-xl pl-9 pr-3 py-2 text-xs text-white outline-none"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full sm:w-auto bg-[#1b1f28] border border-white/10 focus:border-[#25D366] rounded-xl px-3 py-2 text-xs text-white outline-none cursor-pointer"
          >
            <option value="all">All Submissions</option>
            <option value="Pending">Pending Review</option>
            <option value="Approved">Approved</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-[#14171d] border border-white/10 rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-white/10 bg-white/[0.02] text-gray-400 font-bold uppercase tracking-wider text-[10px]">
                <th className="py-3.5 px-4">Submission ID</th>
                <th className="py-3.5 px-4">Group Name &amp; Link</th>
                <th className="py-3.5 px-4">Submitter Info</th>
                <th className="py-3.5 px-4">Category &amp; Country</th>
                <th className="py-3.5 px-4">Submitted Date</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Review Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-white/5 text-gray-300">
              {filteredSubmissions.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-gray-500">
                    No submissions found.
                  </td>
                </tr>
              ) : (
                filteredSubmissions.map((s) => (
                  <tr key={s.id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="py-3 px-4 font-mono font-bold text-gray-400">
                      {s.id}
                    </td>

                    <td className="py-3 px-4">
                      <div className="font-bold text-white max-w-[200px] truncate" title={s.groupName}>
                        {s.groupName}
                      </div>
                      <a
                        href={s.inviteLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[11px] text-[#25D366] hover:underline truncate max-w-[220px] font-mono flex items-center gap-1"
                      >
                        <span className="truncate">{s.inviteLink}</span>
                        <ExternalLink className="w-3 h-3 flex-shrink-0" />
                      </a>
                    </td>

                    <td className="py-3 px-4">
                      <div className="font-semibold text-gray-200">{s.submitterName}</div>
                      <div className="text-[11px] text-gray-500">{s.submitterEmail} &middot; IP {s.submitterIp}</div>
                    </td>

                    <td className="py-3 px-4 whitespace-nowrap">
                      <div className="font-semibold text-gray-200">{s.category}</div>
                      <div className="text-gray-400 text-[11px]">{s.country} {s.city ? `(${s.city})` : ''}</div>
                    </td>

                    <td className="py-3 px-4 font-mono text-gray-400 whitespace-nowrap">
                      {s.submittedDate}
                    </td>

                    <td className="py-3 px-4 whitespace-nowrap">
                      {getStatusBadge(s.status)}
                    </td>

                    <td className="py-3 px-4 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => setReviewingSub(s)}
                          className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white cursor-pointer"
                          title="Inspect submission"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>

                        {s.status === 'Pending' && (
                          <>
                            <button
                              onClick={() => handleApprove(s.id)}
                              className="px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-[11px] cursor-pointer"
                            >
                              Approve
                            </button>

                            <button
                              onClick={() => setRejectingSubId(s.id)}
                              className="px-2.5 py-1 rounded-lg bg-rose-600/20 hover:bg-rose-600 text-rose-400 hover:text-white font-extrabold text-[11px] cursor-pointer"
                            >
                              Reject
                            </button>
                          </>
                        )}

                        <button
                          onClick={() => deleteSubmission(s.id)}
                          className="p-1.5 rounded-lg text-gray-500 hover:text-red-400 hover:bg-red-500/10 cursor-pointer"
                          title="Delete submission"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
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

      {/* Review Modal */}
      {reviewingSub && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="bg-[#14171d] border border-white/15 rounded-3xl max-w-lg w-full p-6 sm:p-7 shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-4">
              <h3 className="text-lg font-bold text-white">Review Submission: {reviewingSub.groupName}</h3>
              <button
                onClick={() => setReviewingSub(null)}
                className="p-1 rounded-md text-gray-400 hover:text-white cursor-pointer"
              >
                <XCircle className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs mb-6">
              <div>
                <span className="text-gray-500 font-bold block mb-0.5">WhatsApp Invite URL</span>
                <a
                  href={reviewingSub.inviteLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-[#25D366] hover:underline flex items-center gap-1.5"
                >
                  <span>{reviewingSub.inviteLink}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

              <div className="grid grid-cols-2 gap-3 p-3 rounded-xl bg-white/[0.02]">
                <div>
                  <span className="text-gray-500 font-bold block">Submitter</span>
                  <span className="text-white font-bold">{reviewingSub.submitterName}</span>
                </div>
                <div>
                  <span className="text-gray-500 font-bold block">Email</span>
                  <span className="text-gray-300">{reviewingSub.submitterEmail}</span>
                </div>
                <div>
                  <span className="text-gray-500 font-bold block">Category</span>
                  <span className="text-white font-bold">{reviewingSub.category}</span>
                </div>
                <div>
                  <span className="text-gray-500 font-bold block">Location</span>
                  <span className="text-white font-bold">{reviewingSub.country} {reviewingSub.city ? `(${reviewingSub.city})` : ''}</span>
                </div>
              </div>

              <div>
                <span className="text-gray-500 font-bold block mb-1">Description</span>
                <p className="p-3 rounded-xl bg-[#1b1f28] text-gray-300 leading-relaxed">
                  {reviewingSub.description || 'No description provided.'}
                </p>
              </div>

              {reviewingSub.rejectionReason && (
                <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300">
                  <strong className="block mb-0.5">Rejection Reason:</strong>
                  {reviewingSub.rejectionReason}
                </div>
              )}
            </div>

            <div className="flex gap-2">
              {reviewingSub.status === 'Pending' ? (
                <>
                  <button
                    onClick={() => {
                      setRejectingSubId(reviewingSub.id);
                    }}
                    className="flex-1 py-2.5 rounded-xl bg-red-600/20 hover:bg-red-600 text-red-400 hover:text-white font-bold text-xs cursor-pointer"
                  >
                    Reject with Reason
                  </button>
                  <button
                    onClick={() => handleApprove(reviewingSub.id)}
                    className="flex-1 py-2.5 rounded-xl bg-[#25D366] hover:bg-[#1ebe5a] text-black font-extrabold text-xs cursor-pointer"
                  >
                    Approve &amp; Publish Live
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setReviewingSub(null)}
                  className="w-full py-2.5 rounded-xl bg-white/10 text-white font-bold text-xs"
                >
                  Close
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Rejection Modal with Reason Selection */}
      {rejectingSubId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="bg-[#14171d] border border-white/15 rounded-3xl max-w-md w-full p-6 shadow-2xl">
            <h3 className="text-lg font-bold text-white mb-1">Select Rejection Reason</h3>
            <p className="text-xs text-gray-400 mb-4">
              The submitter will receive this feedback regarding their submission.
            </p>

            <div className="space-y-3">
              <select
                value={rejectionReason}
                onChange={(e) => setRejectionReason(e.target.value)}
                className="w-full bg-[#1b1f28] border border-white/10 rounded-xl px-3 py-2 text-xs text-white outline-none cursor-pointer"
              >
                <option value="Violates community policy (Spam / Fake link)">Violates community policy (Spam / Fake link)</option>
                <option value="Invite link has already expired or is broken">Invite link has already expired or is broken</option>
                <option value="Duplicate group already listed in directory">Duplicate group already listed in directory</option>
                <option value="Group name or description violates safety standards">Group name or description violates safety standards</option>
                <option value="Commercial solicitation / unauthorized gambling">Commercial solicitation / unauthorized gambling</option>
              </select>

              <div className="pt-2 flex gap-2">
                <button
                  onClick={() => setRejectingSubId(null)}
                  className="flex-1 py-2 rounded-xl bg-white/10 text-xs font-bold text-gray-300"
                >
                  Cancel
                </button>
                <button
                  onClick={handleReject}
                  className="flex-1 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold"
                >
                  Confirm Rejection
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
