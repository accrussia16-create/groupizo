import React, { useState } from 'react';
import { Group } from '../types.ts';
import { useAdmin } from '../context/AdminContext.tsx';
import { X, CheckCircle, AlertTriangle } from 'lucide-react';

interface ReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  targetGroup: Group | null;
}

export const ReportModal: React.FC<ReportModalProps> = ({
  isOpen,
  onClose,
  targetGroup
}) => {
  const { addReport } = useAdmin();
  const [reason, setReason] = useState('Broken Link');
  const [details, setDetails] = useState('');
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    addReport({
      groupId: targetGroup?.id || 'general',
      groupTitle: targetGroup?.title || 'Community Issue',
      groupInviteLink: targetGroup?.inviteLink || '',
      reason: (reason as any) || 'Broken Link',
      details: details.trim() || 'Report submitted by directory visitor.',
      reportedByEmail: email.trim() || 'anonymous@visitor.com'
    });

    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
      setDetails('');
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div 
        className="bg-[#181818] border border-white/15 rounded-3xl max-w-md w-full p-6 sm:p-7 relative shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-gray-400 hover:text-white rounded-full bg-white/5 hover:bg-white/10 cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="py-8 text-center flex flex-col items-center justify-center space-y-3">
            <div className="w-14 h-14 rounded-full bg-red-500/20 border border-red-500 flex items-center justify-center text-red-400">
              <CheckCircle className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-white">Report Received</h3>
            <p className="text-xs text-gray-400">
              Thank you for keeping Groupizo safe. Our automated link checker and moderators will inspect this group.
            </p>
          </div>
        ) : (
          <div>
            <div className="flex items-center gap-2 text-red-400 text-xs font-bold uppercase mb-1">
              <AlertTriangle className="w-4 h-4" /> Safety &amp; Content Moderation
            </div>
            
            <h2 className="text-xl font-black text-white mb-1">
              Report WhatsApp Group
            </h2>

            {targetGroup && (
              <p className="text-xs text-gray-400 mb-4 bg-white/5 p-2 rounded-lg truncate">
                Reporting: <strong className="text-white">{targetGroup.title}</strong>
              </p>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-300 mb-1">Reason for report</label>
                <select
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  className="w-full bg-[#222] border border-white/15 focus:border-red-500 rounded-xl px-3 py-2 text-xs sm:text-sm text-white outline-none cursor-pointer"
                >
                  <option value="broken-link">Broken / Expired Invite Link</option>
                  <option value="group-full">Group at Max Capacity (1,024 members)</option>
                  <option value="spam-scam">Spam, Phishing, or Financial Fraud</option>
                  <option value="inappropriate">Inappropriate / Prohibited Content</option>
                  <option value="impersonation">Impersonation / Fake Admin</option>
                  <option value="other">Other issue</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-300 mb-1">Additional details</label>
                <textarea
                  rows={3}
                  value={details}
                  onChange={(e) => setDetails(e.target.value)}
                  placeholder="Tell us what is wrong with this link or listing..."
                  className="w-full bg-[#222] border border-white/15 focus:border-red-500 rounded-xl px-3 py-2 text-xs sm:text-sm text-white outline-none resize-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-300 mb-1">Your email (optional)</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="For status updates on this report"
                  className="w-full bg-[#222] border border-white/15 focus:border-red-500 rounded-xl px-3 py-2 text-xs sm:text-sm text-white outline-none"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3 bg-red-600 hover:bg-red-700 text-white font-extrabold text-xs sm:text-sm rounded-xl transition-colors cursor-pointer shadow-lg shadow-red-600/20"
                >
                  Submit Report to Moderation
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
