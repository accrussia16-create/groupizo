import React, { useState } from 'react';
import { Group } from '../types.ts';
import { X, ExternalLink, Copy, Check, ShieldCheck, AlertCircle, Users, Globe, MapPin, Tag, QrCode } from 'lucide-react';
import { useAdmin } from '../context/AdminContext.tsx';

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
  const { appearance } = useAdmin();
  const primaryColor = appearance?.primaryColor || '#25D366';

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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-fadeIn">
      <div 
        className="bg-white border border-gray-200 rounded-3xl max-w-lg w-full max-h-[90vh] overflow-y-auto relative shadow-2xl overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close modal"
          className="absolute top-3.5 right-3.5 z-20 p-2 text-white bg-black/60 hover:bg-black rounded-full cursor-pointer transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Top Cover Banner */}
        <div className="relative h-48 w-full bg-gray-900">
          <img
            src={group.image}
            alt={group.title}
            className="w-full h-full object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1614680376593-902f749f7ffc?w=600&auto=format&fit=crop&q=80';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />

          {/* Verification Badge */}
          {group.isVerified && (
            <span className="absolute top-4 left-4 bg-[#128C7E] text-white font-extrabold text-xs px-3 py-1 rounded-full flex items-center gap-1 shadow-md">
              <ShieldCheck className="w-3.5 h-3.5 text-[#25D366]" /> Verified Link
            </span>
          )}

          {/* Category Badge */}
          <span className="absolute bottom-3 left-4 text-xs font-black uppercase tracking-wider bg-black/80 text-[#25D366] px-2.5 py-0.5 rounded-md border border-[#25D366]/40">
            {group.category}
          </span>
        </div>

        {/* Modal Content */}
        <div className="p-6 flex-1 flex flex-col bg-white">
          
          {/* Group Title */}
          <h2 className="text-xl sm:text-2xl font-black text-gray-950 mb-2 leading-snug">
            {group.title}
          </h2>

          {/* Meta Pills */}
          <div className="flex flex-wrap gap-2 text-xs text-gray-600 mb-5">
            <span className="inline-flex items-center gap-1.5 bg-gray-100 px-3 py-1 rounded-full font-semibold">
              <Globe className="w-3.5 h-3.5 text-[#128C7E]" /> {group.country}
            </span>
            {group.city && (
              <span className="inline-flex items-center gap-1.5 bg-gray-100 px-3 py-1 rounded-full font-semibold">
                <MapPin className="w-3.5 h-3.5 text-[#128C7E]" /> {group.city}
              </span>
            )}
            <span className="inline-flex items-center gap-1.5 bg-gray-100 px-3 py-1 rounded-full font-semibold">
              <Tag className="w-3.5 h-3.5 text-[#128C7E]" /> {group.category}
            </span>
          </div>

          {/* Description */}
          <div className="bg-gray-50 border border-gray-200/80 rounded-2xl p-4 text-xs sm:text-sm text-gray-700 leading-relaxed mb-5">
            {group.description || 'Verified WhatsApp community group. Friendly discussion, announcements and updates.'}
          </div>

          {/* Member Capacity Indicator */}
          <div className="mb-5">
            <div className="flex items-center justify-between text-xs text-gray-600 mb-1.5">
              <span className="flex items-center gap-1 font-semibold">
                <Users className="w-3.5 h-3.5 text-gray-500" /> Member Capacity
              </span>
              <span className="font-bold text-gray-900">
                {group.membersCount} / {group.maxMembers || 1024} members ({memberPct}%)
              </span>
            </div>
            <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
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
                  className="text-[11px] font-semibold text-[#128C7E] bg-emerald-50 border border-emerald-200/80 px-2.5 py-0.5 rounded-full"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}

          {/* Action Buttons */}
          <div className="space-y-3 mt-auto">
            <button
              onClick={handleJoin}
              className="w-full py-3.5 px-4 rounded-xl text-black font-black text-sm flex items-center justify-center gap-2 shadow-md transition-all hover:brightness-105 active:scale-95 cursor-pointer"
              style={{ backgroundColor: primaryColor }}
            >
              <span>Join WhatsApp Group</span>
              <ExternalLink className="w-4 h-4 stroke-[2.5]" />
            </button>

            <div className="flex items-center gap-2">
              <button
                onClick={handleCopy}
                className="flex-1 py-2.5 px-3 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold text-xs flex items-center justify-center gap-2 border border-gray-200 transition-colors cursor-pointer"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-600" />
                    <span className="text-emerald-700">Invite Link Copied!</span>
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
                className="py-2.5 px-3.5 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold text-xs flex items-center justify-center gap-1.5 border border-gray-200 transition-colors cursor-pointer"
                title="View QR Code"
              >
                <QrCode className="w-4 h-4" />
                <span>QR Code</span>
              </button>
            </div>
          </div>

          {/* QR Code Popup */}
          {showQr && (
            <div className="mt-4 p-4 rounded-2xl bg-gray-50 border border-gray-200 flex flex-col items-center justify-center text-center animate-fadeIn">
              <img
                src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(group.inviteLink)}`}
                alt="Scan to join WhatsApp group"
                className="w-36 h-36 mb-2 rounded-lg"
              />
              <p className="text-xs font-bold text-gray-700">Scan with WhatsApp camera to join</p>
            </div>
          )}

          {/* Safety Notice & Report */}
          <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-[#25D366]" />
              Safe community listing
            </span>
            <button
              onClick={() => {
                onClose();
                onReport(group);
              }}
              className="text-red-500 hover:text-red-600 flex items-center gap-1 cursor-pointer font-semibold"
            >
              <AlertCircle className="w-3 h-3" />
              Report link
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};
