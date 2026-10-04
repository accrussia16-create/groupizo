import React, { useState } from 'react';
import { Group } from '../types.ts';
import { Globe, MapPin, Tag, ExternalLink, ShieldCheck } from 'lucide-react';

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
  const [imgSrc, setImgSrc] = useState(group.image);
  const [imgError, setImgError] = useState(false);

  const handleImgError = () => {
    setImgError(true);
    // Graceful fallback to styled abstract pattern or default
    setImgSrc('https://images.unsplash.com/photo-1614680376593-902f749f7ffc?w=600&auto=format&fit=crop&q=80');
  };

  const flagUrl = group.countryCode !== 'global'
    ? `https://flagcdn.com/w40/${group.countryCode.toLowerCase()}.png`
    : null;

  return (
    <div className="group bg-[#1e1e1e] border border-[#2d2d2d] hover:border-[#25D366] rounded-xl overflow-hidden flex flex-col transition-all duration-200 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/60 relative">
      
      {/* Top Banner / Image Area */}
      <div 
        onClick={() => onOpenDetails(group)}
        className="relative h-[130px] sm:h-[135px] bg-[#111] overflow-hidden cursor-pointer block"
      >
        <img
          src={imgSrc}
          alt={`${group.title} WhatsApp group`}
          onError={handleImgError}
          className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-300"
          loading="lazy"
        />

        {/* Gradient dark overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#1e1e1e] via-transparent to-black/30 pointer-events-none" />

        {/* Country Flag Badge (Top Right) */}
        {flagUrl ? (
          <span 
            className="absolute top-2 right-2 z-10 rounded shadow-md overflow-hidden line-height-0 border border-black/40"
            title={`${group.country} group`}
          >
            <img
              src={flagUrl}
              alt={group.country}
              className="w-5 h-3.5 object-cover block"
              loading="lazy"
            />
          </span>
        ) : (
          <span 
            className="absolute top-2 right-2 z-10 rounded-full px-1.5 py-0.5 bg-black/60 text-[10px] text-gray-300 border border-white/10"
            title="Global group"
          >
            🌍
          </span>
        )}

        {/* Verified Badge */}
        {group.isVerified && (
          <span className="absolute top-2 left-2 z-10 flex items-center gap-1 bg-black/70 backdrop-blur-md px-2 py-0.5 rounded-full text-[10px] font-bold text-[#25D366] border border-[#25D366]/30">
            <ShieldCheck className="w-3 h-3 text-[#25D366]" />
            Verified
          </span>
        )}
      </div>

      {/* Card Body */}
      <div className="p-3 sm:p-3.5 flex flex-col flex-1">
        
        {/* Title */}
        <button
          onClick={() => onOpenDetails(group)}
          className="text-white hover:text-[#25D366] font-bold text-sm sm:text-base leading-snug line-clamp-2 text-left mb-2.5 transition-colors cursor-pointer"
          title={group.title}
        >
          {group.title}
        </button>

        {/* Pills / Metadata */}
        <div className="flex flex-wrap gap-1.5 mt-auto pt-1 text-[11px]">
          {/* Country Pill */}
          <button
            onClick={() => onFilterCountry && onFilterCountry(group.country)}
            className="inline-flex items-center gap-1 bg-white/5 hover:bg-[#25D366]/15 hover:text-[#25D366] hover:border-[#25D366]/30 border border-white/5 px-2 py-0.5 rounded-full text-gray-400 transition-colors cursor-pointer"
            title={`View ${group.country} groups`}
          >
            <Globe className="w-3 h-3 text-gray-400" />
            <span className="truncate max-w-[90px]">{group.country}</span>
          </button>

          {/* City Pill if present */}
          {group.city && (
            <button
              onClick={() => onFilterCity && onFilterCity(group.city!)}
              className="inline-flex items-center gap-1 bg-white/5 hover:bg-[#25D366]/15 hover:text-[#25D366] hover:border-[#25D366]/30 border border-white/5 px-2 py-0.5 rounded-full text-gray-400 transition-colors cursor-pointer"
              title={`View ${group.city} groups`}
            >
              <MapPin className="w-3 h-3 text-gray-400" />
              <span className="truncate max-w-[90px]">{group.city}</span>
            </button>
          )}

          {/* Category Pill */}
          <button
            onClick={() => onFilterCategory && onFilterCategory(group.categorySlug)}
            className="inline-flex items-center gap-1 bg-white/5 hover:bg-[#25D366]/15 hover:text-[#25D366] hover:border-[#25D366]/30 border border-white/5 px-2 py-0.5 rounded-full text-gray-400 transition-colors cursor-pointer"
            title={`View ${group.category} groups`}
          >
            <Tag className="w-3 h-3 text-gray-400" />
            <span className="truncate max-w-[100px]">{group.category}</span>
          </button>
        </div>

        {/* Join & Details CTA Buttons */}
        <div className="mt-3 pt-2.5 border-t border-white/5 flex items-center gap-2">
          <button
            onClick={() => onQuickJoin(group)}
            className="flex-1 bg-[#25D366]/15 hover:bg-[#25D366] text-[#25D366] hover:text-black font-extrabold text-xs py-1.5 px-3 rounded-lg border border-[#25D366]/30 hover:border-transparent transition-all flex items-center justify-center gap-1 cursor-pointer"
          >
            <span>Join Group</span>
            <ExternalLink className="w-3 h-3" />
          </button>
          
          <button
            onClick={() => onOpenDetails(group)}
            className="px-2.5 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 text-xs font-semibold border border-white/5 transition-colors cursor-pointer"
            title="Inspect group details"
          >
            Details
          </button>
        </div>

      </div>

    </div>
  );
};
