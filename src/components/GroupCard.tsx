import React, { useState } from 'react';
import { Group } from '../types.ts';
import { Globe, MapPin, Tag, ExternalLink, ShieldCheck, Users } from 'lucide-react';
import { useAdmin } from '../context/AdminContext.tsx';

interface GroupCardProps {
  group: Group;
  onOpenDetails: (group: Group) => void;
  onQuickJoin: (group: Group) => void;
  onFilterCountry?: (country: string) => void;
  onFilterCity?: (city: string) => void;
  onFilterCategory?: (categorySlug: string) => void;
}

export const GroupCard: React.FC<GroupCardProps> = ({
  group,
  onOpenDetails,
  onQuickJoin,
  onFilterCountry,
  onFilterCity,
  onFilterCategory
}) => {
  const { appearance } = useAdmin();
  const primaryColor = appearance?.primaryColor || '#25D366';

  const [imgSrc, setImgSrc] = useState(group.image);

  const handleImgError = () => {
    setImgSrc('https://images.unsplash.com/photo-1614680376593-902f749f7ffc?w=600&auto=format&fit=crop&q=80');
  };

  const flagUrl = group.countryCode !== 'global'
    ? `https://flagcdn.com/w40/${group.countryCode.toLowerCase()}.png`
    : null;

  return (
    <div className="group bg-white border border-gray-200/90 hover:border-[#25D366] rounded-2xl overflow-hidden flex flex-col transition-all duration-200 hover:-translate-y-1 hover:shadow-lg hover:shadow-gray-200/70 relative">
      
      {/* Top Banner / Image Area */}
      <div 
        onClick={() => onOpenDetails(group)}
        className="relative h-36 bg-gray-100 overflow-hidden cursor-pointer block"
      >
        <img
          src={imgSrc}
          alt={`${group.title} WhatsApp group`}
          onError={handleImgError}
          className="w-full h-full object-cover group-hover:scale-105 transition-all duration-300"
          loading="lazy"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none" />

        {/* Flag Badge */}
        {flagUrl ? (
          <span 
            className="absolute top-2.5 right-2.5 z-10 rounded shadow-md overflow-hidden border border-black/20"
            title={`${group.country} community`}
          >
            <img
              src={flagUrl}
              alt={group.country}
              className="w-5 h-3.5 object-cover block"
              loading="lazy"
            />
          </span>
        ) : (
          <span className="absolute top-2.5 right-2.5 z-10 rounded-full px-2 py-0.5 bg-black/60 text-xs text-white">
            🌍
          </span>
        )}

        {/* Verified Badge */}
        {group.isVerified && (
          <span className="absolute top-2.5 left-2.5 z-10 flex items-center gap-1 bg-[#128C7E] text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm">
            <ShieldCheck className="w-3 h-3 text-[#25D366]" />
            Verified
          </span>
        )}

        {/* Category Pill Over Image */}
        <span className="absolute bottom-2 left-2.5 z-10 text-[10px] font-extrabold uppercase tracking-wide bg-black/70 backdrop-blur-xs text-[#25D366] px-2 py-0.5 rounded-md border border-[#25D366]/30">
          {group.category}
        </span>
      </div>

      {/* Card Body */}
      <div className="p-4 flex flex-col flex-1 bg-white">
        
        {/* Title */}
        <button
          onClick={() => onOpenDetails(group)}
          className="text-gray-900 hover:text-[#128C7E] font-bold text-base leading-snug line-clamp-1 text-left mb-1.5 transition-colors cursor-pointer"
          title={group.title}
        >
          {group.title}
        </button>

        {/* Description snippet */}
        <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed mb-3 flex-1">
          {group.description || 'Public WhatsApp community group for active members.'}
        </p>

        {/* Location & Tags */}
        <div className="flex flex-wrap items-center gap-1.5 text-[11px] mb-4">
          <button
            onClick={() => onFilterCountry && onFilterCountry(group.country)}
            className="inline-flex items-center gap-1 bg-gray-100 hover:bg-emerald-50 hover:text-[#128C7E] text-gray-700 px-2 py-0.5 rounded-full transition-colors cursor-pointer"
          >
            <Globe className="w-3 h-3 text-gray-500" />
            <span>{group.country}</span>
          </button>

          {group.city && (
            <button
              onClick={() => onFilterCity && onFilterCity(group.city!)}
              className="inline-flex items-center gap-1 bg-gray-100 hover:bg-emerald-50 hover:text-[#128C7E] text-gray-700 px-2 py-0.5 rounded-full transition-colors cursor-pointer"
            >
              <MapPin className="w-3 h-3 text-gray-500" />
              <span>{group.city}</span>
            </button>
          )}

          <span className="inline-flex items-center gap-1 text-gray-400 ml-auto">
            <Users className="w-3 h-3" />
            <span>{group.membersCount}+</span>
          </span>
        </div>

        {/* Action Buttons */}
        <div className="pt-3 border-t border-gray-100 flex items-center gap-2">
          <button
            onClick={() => onQuickJoin(group)}
            className="flex-1 text-black font-extrabold text-xs py-2 px-3 rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-xs hover:brightness-105 active:scale-95"
            style={{ backgroundColor: primaryColor }}
          >
            <span>Join Group</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </button>
          
          <button
            onClick={() => onOpenDetails(group)}
            className="px-3 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-bold transition-colors cursor-pointer"
          >
            Details
          </button>
        </div>

      </div>

    </div>
  );
};
