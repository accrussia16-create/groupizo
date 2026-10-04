import React, { useState } from 'react';
import { Group } from '../types.ts';
import { X, ExternalLink, Copy, Check, ShieldCheck, AlertCircle, Users, Globe, MapPin, Tag, QrCode } from 'lucide-react';

interface GroupDetailModalProps {
  group: Group | null;
  onClose: () => void;
  onReport: (group: Group) => void;
}

export const GroupDetailModal: React.FC<GroupDetailModalProps> = ({
  group,
  onClose,
  onReport
}) => {
  const [copied, setCopied] = useState(false);
  const [showQr, setShowQr] = useState(false);

  if (!group) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(group.inviteLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleJoin = () => {
    window.open(group.inviteLink, '_blank', 'noopener,noreferrer');
  };

  const memberPct = Math.round((group.membersCount / (group.maxMembers || 1024)) * 100);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div 
        className="bg-[#181818] border border-white/15 rounded-3xl max-w-lg w-full max-h-[90vh] overflow-y-auto relative shadow-2xl overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close modal"
          className="absolute top-3 right-3 z-20 p-2 text-white bg-black/60 hover:bg-black rounded-full cursor-pointer transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Top Cover */}
        <div className="relative h-44 sm:h-48 w-full bg-[#111]">
          <img
            src={group.image}
            alt={group.title}
            className="w-full h-full object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1614680376593-902f749f7ffc?w=600&auto=format&fit=crop&q=80';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#181818] via-transparent to-black/40" />

          {/* Verification Badge */}
          {group.isVerified && (
            <span className="absolute top-4 left-4 bg-[#25D366] text-black font-black text-xs px-2.5 py-1 rounded-full flex items-center gap-1 shadow-md">
              <ShieldCheck className="w-3.5 h-3.5" /> Checked &amp; Verified
            </span>
          )}
        </div>

        {/* Modal Content */}
        <div className="p-6 flex-1 flex flex-col -mt-4 relative z-10">
          
          {/* Group Title */}
          <h2 className="text-xl sm:text-2xl font-black text-white mb-2 leading-snug">
            {group.title}
          </h2>

          {/* Meta Pills */}
          <div className="flex flex-wrap gap-2 text-xs text-gray-300 mb-5">
            <span className="inline-flex items-center gap-1 bg-white/5 border border-white/10 px-2.5 py-1 rounded-full">
              <Globe className="w-3.5 h-3.5 text-[#25D366]" /> {group.country}
            </span>
            {group.city && (
              <span className="inline-flex items-center gap-1 bg-white/5 border border-white/10 px-2.5 py-1 rounded-full">
                <MapPin className="w-3.5 h-3.5 text-[#25D366]" /> {group.city}
              </span>
            )}
            <span className="inline-flex items-center gap-1 bg-white/5 border border-white/10 px-2.5 py-1 rounded-full">
              <Tag className="w-3.5 h-3.5 text-[#25D366]" /> {group.category}
            </span>
          </div>

          {/* Description */}
          {group.description && (
            <div className="bg-white/[0.03] border border-white/5 rounded-xl p-3.5 text-xs sm:text-sm text-gray-300 leading-relaxed mb-5">
              {group.description}
            </div>
          )}

          {/* Member capacity indicator */}
          <div className="mb-5">
            <div className="flex items-center justify-between text-xs text-gray-400 mb-1.5">
              <span className="flex items-center gap-1">
                <Users className="w-3.5 h-3.5 text-gray-400" /> Member Capacity
              </span>
              <span className="font-bold text-white">
                {group.membersCount} / {group.maxMembers || 1024} members ({memberPct}%)
              </span>
            </div>
            <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-emerald-500 to-[#25D366] rounded-full"
                style={{ width: `${Math.min(100, memberPct)}%` }}
              />
            </div>
          </div>

          {/* Tags */}
          {group.tags && group.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mb-6">
              {group.tags.map((tag, idx) => (
                <span 
                  key={idx}
                  className="text-[11px] font-semibold text-[#25D366] bg-[#25D366]/10 border border-[#25D366]/20 px-2 py-0.5 rounded-full"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}

          {/* Primary Action Buttons */}
          <div className="space-y-3 mt-auto">
            <button
              onClick={handleJoin}
              className="w-full py-3.5 px-4 rounded-xl bg-[#25D366] hover:bg-[#1ebe5a] text-black font-black text-sm flex items-center justify-center gap-2 shadow-lg shadow-[#25D366]/20 transition-all hover:scale-[1.01] cursor-pointer"
            >
              <span>Join WhatsApp Group</span>
              <ExternalLink className="w-4 h-4 stroke-[2.5]" />
            </button>

            <div className="flex items-center gap-2">
              <button
                onClick={handleCopy}
                className="flex-1 py-2.5 px-3 rounded-xl bg-white/10 hover:bg-white/15 text-white font-bold text-xs flex items-center justify-center gap-2 border border-white/10 transition-colors cursor-pointer"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 text-[#25D366]" />
                    <span className="text-[#25D366]">Link Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span>Copy Invite Link</span>
                  </>
                )}
              </button>

              <button
                onClick={() => setShowQr(!showQr)}
                className="py-2.5 px-3 rounded-xl bg-white/10 hover:bg-white/15 text-white font-bold text-xs flex items-center justify-center gap-1.5 border border-white/10 transition-colors cursor-pointer"
                title="View QR Code"
              >
                <QrCode className="w-4 h-4" />
                <span>QR</span>
              </button>
            </div>
          </div>

          {/* Optional QR Code View */}
          {showQr && (
            <div className="mt-4 p-4 rounded-xl bg-white flex flex-col items-center justify-center text-center text-black animate-fadeIn">
              <img
                src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(group.inviteLink)}`}
                alt="Scan to join WhatsApp group"
                className="w-36 h-36 mb-2"
              />
              <p className="text-[11px] font-bold text-gray-700">Scan with WhatsApp camera to join</p>
            </div>
          )}

          {/* Safety Notice & Report */}
          <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-gray-500">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-[#25D366]" />
              Safe community listing
            </span>
            <button
              onClick={() => {
                onClose();
                onReport(group);
              }}
              className="text-red-400 hover:text-red-300 flex items-center gap-1 cursor-pointer font-medium"
            >
              <AlertCircle className="w-3 h-3" />
              Report listing
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};
