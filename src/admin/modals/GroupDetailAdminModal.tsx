import React, { useState } from 'react';
import { useAdmin } from '../../context/AdminContext.tsx';
import { AdminGroup } from '../../types/admin.ts';
import {
  X,
  ExternalLink,
  ShieldCheck,
  Star,
  Activity,
  AlertTriangle,
  Calendar,
  Users,
  Eye,
  MousePointerClick,
  Edit2,
  Trash2,
  CheckCircle,
  Copy,
  Check
} from 'lucide-react';

interface GroupDetailAdminModalProps {
  group: AdminGroup;
  onClose: () => void;
  onEdit: () => void;
}

export const GroupDetailAdminModal: React.FC<GroupDetailAdminModalProps> = ({
  group,
  onClose,
  onEdit
}) => {
  const {
    deleteGroup,
    setGroupStatus,
    toggleFeatureGroup,
    updateGroup,
    runLinkCheck,
    isCheckingLinks
  } = useAdmin();

  const [notes, setNotes] = useState(group.adminNotes || '');
  const [copied, setCopied] = useState(false);

  const handleSaveNotes = () => {
    updateGroup(group.id, { adminNotes: notes });
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(group.inviteLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div 
        className="bg-[#14171d] border border-white/15 rounded-3xl max-w-2xl w-full max-h-[92vh] overflow-y-auto p-6 sm:p-8 relative shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-gray-400 hover:text-white rounded-full bg-white/5 hover:bg-white/10 cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Top Header Card */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 pb-6 border-b border-white/10">
          <img
            src={group.image}
            alt={group.title}
            className="w-16 h-16 rounded-2xl object-cover border border-white/15 bg-black/40 flex-shrink-0"
            onError={(e) => {
              (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1614680376593-902f749f7ffc?w=200&auto=format&fit=crop&q=80';
            }}
          />

          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2 flex-wrap mb-1">
              <span className="px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-white/10 text-gray-300">
                {group.status}
              </span>
              {group.isVerified && (
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#25D366]/15 text-[#25D366] flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3" /> Verified Link
                </span>
              )}
              {group.isFeatured && (
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-yellow-400/15 text-yellow-400 flex items-center gap-1">
                  <Star className="w-3 h-3 fill-current" /> Featured
                </span>
              )}
            </div>

            <h2 className="text-xl sm:text-2xl font-black text-white leading-tight">
              {group.title}
            </h2>

            <div className="flex items-center gap-2 mt-1 text-xs text-[#25D366]">
              <span className="truncate max-w-[280px] font-mono">{group.inviteLink}</span>
              <button
                onClick={handleCopyLink}
                className="p-1 text-gray-400 hover:text-white cursor-pointer"
                title="Copy link"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-[#25D366]" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
              <a
                href={group.inviteLink}
                target="_blank"
                rel="noopener noreferrer"
                className="p-1 text-gray-400 hover:text-white"
                title="Open WhatsApp Invite"
              >
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>

        {/* Traffic & Health Stats Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 my-6">
          <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5">
            <span className="text-[11px] text-gray-400 font-bold block mb-1">Directory Views</span>
            <span className="text-lg font-black text-white">{group.views.toLocaleString()}</span>
          </div>

          <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5">
            <span className="text-[11px] text-gray-400 font-bold block mb-1">Join Clicks</span>
            <span className="text-lg font-black text-[#25D366]">{group.joinClicks.toLocaleString()}</span>
          </div>

          <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5">
            <span className="text-[11px] text-gray-400 font-bold block mb-1">Reports Filed</span>
            <span className={`text-lg font-black ${group.reportsCount > 0 ? 'text-red-400' : 'text-gray-400'}`}>
              {group.reportsCount}
            </span>
          </div>

          <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5">
            <span className="text-[11px] text-gray-400 font-bold block mb-1">Link Health</span>
            <span className="text-xs font-black text-[#25D366] block mt-1">
              {group.linkHealth}
            </span>
          </div>
        </div>

        {/* Detailed Metadata Grid */}
        <div className="space-y-4 text-xs">
          
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-4 rounded-2xl bg-white/[0.02] border border-white/5">
            <div>
              <span className="text-gray-500 font-bold block mb-0.5">Category</span>
              <span className="text-white font-bold">{group.category}</span>
            </div>
            <div>
              <span className="text-gray-500 font-bold block mb-0.5">Location</span>
              <span className="text-white font-bold">{group.country} {group.city ? `(${group.city})` : ''}</span>
            </div>
            <div>
              <span className="text-gray-500 font-bold block mb-0.5">Language</span>
              <span className="text-white font-bold">{group.language || 'English'}</span>
            </div>
            <div>
              <span className="text-gray-500 font-bold block mb-0.5">Date Catalogued</span>
              <span className="text-gray-300 font-mono">{group.createdAt}</span>
            </div>
            <div>
              <span className="text-gray-500 font-bold block mb-0.5">Last Checked</span>
              <span className="text-gray-300 font-mono">{group.lastChecked}</span>
            </div>
            <div>
              <span className="text-gray-500 font-bold block mb-0.5">Group ID</span>
              <span className="text-gray-400 font-mono">{group.id}</span>
            </div>
          </div>

          {/* Description */}
          <div>
            <span className="text-gray-400 font-bold block mb-1">Public Description</span>
            <p className="p-3 rounded-xl bg-[#1b1f28] text-gray-300 leading-relaxed text-xs">
              {group.description || 'No description provided.'}
            </p>
          </div>

          {/* Tags */}
          {group.tags && group.tags.length > 0 && (
            <div>
              <span className="text-gray-400 font-bold block mb-1.5">Tags</span>
              <div className="flex flex-wrap gap-1.5">
                {group.tags.map((t, idx) => (
                  <span key={idx} className="px-2 py-0.5 rounded-full bg-[#25D366]/10 text-[#25D366] font-semibold text-[11px]">
                    #{t}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Admin Internal Notes */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="text-gray-400 font-bold">Internal Moderator Notes</span>
              <button
                onClick={handleSaveNotes}
                className="text-[11px] text-[#25D366] hover:underline cursor-pointer"
              >
                Save Notes
              </button>
            </div>
            <textarea
              rows={2}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Add internal notes about this group, admin contacts, verification check logs..."
              className="w-full bg-[#1b1f28] border border-white/10 rounded-xl p-3 text-xs text-white outline-none resize-none"
            />
          </div>

        </div>

        {/* Action Buttons */}
        <div className="mt-8 pt-5 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
          
          <div className="flex items-center gap-2">
            <button
              onClick={() => runLinkCheck(group.id)}
              disabled={isCheckingLinks}
              className="px-3 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-white font-bold text-xs flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
            >
              <Activity className="w-3.5 h-3.5 text-[#25D366]" />
              <span>{isCheckingLinks ? 'Testing...' : 'Check Link Now'}</span>
            </button>

            <button
              onClick={() => toggleFeatureGroup(group.id)}
              className="px-3 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-white font-bold text-xs flex items-center gap-1.5 cursor-pointer"
            >
              <Star className="w-3.5 h-3.5 text-yellow-400 fill-current" />
              <span>{group.isFeatured ? 'Unfeature' : 'Feature'}</span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            {group.status !== 'active' ? (
              <button
                onClick={() => {
                  setGroupStatus(group.id, 'active');
                  onClose();
                }}
                className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs cursor-pointer"
              >
                Approve Group
              </button>
            ) : (
              <button
                onClick={() => {
                  setGroupStatus(group.id, 'suspended');
                  onClose();
                }}
                className="px-3.5 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs cursor-pointer"
              >
                Suspend Group
              </button>
            )}

            <button
              onClick={onEdit}
              className="px-3.5 py-2 rounded-xl bg-[#25D366] text-black font-extrabold text-xs cursor-pointer hover:bg-[#1ebe5a]"
            >
              Edit Details
            </button>

            <button
              onClick={() => {
                deleteGroup(group.id);
                onClose();
              }}
              className="p-2 rounded-xl bg-red-600/20 hover:bg-red-600 text-red-400 hover:text-white text-xs font-bold cursor-pointer"
              title="Delete group"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
