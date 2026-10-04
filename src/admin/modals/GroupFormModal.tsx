import React, { useState } from 'react';
import { useAdmin } from '../../context/AdminContext.tsx';
import { AdminGroup, GroupStatus } from '../../types/admin.ts';
import { X, AlertCircle, CheckCircle2, Globe, ShieldCheck, Star, Pin } from 'lucide-react';

interface GroupFormModalProps {
  group: AdminGroup | null;
  onClose: () => void;
}

export const GroupFormModal: React.FC<GroupFormModalProps> = ({ group, onClose }) => {
  const { addGroup, updateGroup, groups, categories, countries } = useAdmin();

  const isEditing = !!group;

  const [title, setTitle] = useState(group?.title || '');
  const [inviteLink, setInviteLink] = useState(group?.inviteLink || '');
  const [description, setDescription] = useState(group?.description || '');
  const [image, setImage] = useState(group?.image || 'https://images.unsplash.com/photo-1614680376593-902f749f7ffc?w=600&auto=format&fit=crop&q=80');
  const [categorySlug, setCategorySlug] = useState(group?.categorySlug || 'gaming');
  const [countryName, setCountryName] = useState(group?.country || 'India');
  const [city, setCity] = useState(group?.city || '');
  const [language, setLanguage] = useState(group?.language || 'English');
  const [tagsStr, setTagsStr] = useState(group?.tags.join(', ') || '');
  const [status, setStatus] = useState<GroupStatus>(group?.status || 'active');
  const [isFeatured, setIsFeatured] = useState(group?.isFeatured || false);
  const [isPinned, setIsPinned] = useState(group?.isPinned || false);
  const [isVerified, setIsVerified] = useState(group?.isVerified ?? true);
  const [seoTitle, setSeoTitle] = useState(group?.seoTitle || '');
  const [seoDescription, setSeoDescription] = useState(group?.seoDescription || '');
  const [slug, setSlug] = useState(group?.slug || '');
  
  const [validationError, setValidationError] = useState('');
  const [duplicateWarning, setDuplicateWarning] = useState('');

  // Validate duplicate link
  const handleLinkChange = (val: string) => {
    setInviteLink(val);
    if (val.trim()) {
      const exists = groups.some((g) => g.id !== group?.id && g.inviteLink.toLowerCase() === val.trim().toLowerCase());
      if (exists) {
        setDuplicateWarning('Warning: Another group in the directory is already using this invite link!');
      } else {
        setDuplicateWarning('');
      }
    } else {
      setDuplicateWarning('');
    }
  };

  const handleSave = (publishStatus?: GroupStatus) => {
    setValidationError('');

    if (!title.trim()) {
      setValidationError('Group Name is required.');
      return;
    }

    if (!inviteLink.trim() || !inviteLink.includes('chat.whatsapp.com')) {
      setValidationError('Please provide a valid WhatsApp invite URL containing chat.whatsapp.com');
      return;
    }

    const selectedCategory = categories.find((c) => c.slug === categorySlug);
    const selectedCountry = countries.find((c) => c.name.toLowerCase() === countryName.toLowerCase());

    const tags = tagsStr
      .split(',')
      .map((t) => t.trim())
      .filter((t) => t.length > 0);

    const targetStatus = publishStatus || status;

    const payload: Partial<AdminGroup> = {
      title: title.trim(),
      slug: slug.trim() || title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      inviteLink: inviteLink.trim(),
      description: description.trim(),
      image: image.trim(),
      category: selectedCategory ? selectedCategory.name : 'General',
      categorySlug: categorySlug,
      country: countryName,
      countryCode: selectedCountry ? selectedCountry.code : 'global',
      city: city.trim() || undefined,
      language: language.trim() || 'English',
      tags: tags.length > 0 ? tags : ['Community'],
      status: targetStatus,
      isFeatured,
      isPinned,
      isVerified,
      seoTitle: seoTitle.trim(),
      seoDescription: seoDescription.trim()
    };

    if (isEditing && group) {
      updateGroup(group.id, payload);
    } else {
      addGroup(payload);
    }

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div 
        className="bg-[#14171d] border border-white/15 rounded-3xl max-w-3xl w-full max-h-[92vh] overflow-y-auto p-6 sm:p-8 relative shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-gray-400 hover:text-white rounded-full bg-white/5 hover:bg-white/10 cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <h2 className="text-xl sm:text-2xl font-black text-white mb-1">
          {isEditing ? `Edit: ${group.title}` : 'Add New WhatsApp Group'}
        </h2>
        <p className="text-xs text-gray-400 mb-6">
          Configure listing parameters, geographic metadata, and discovery settings.
        </p>

        {validationError && (
          <div className="mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{validationError}</span>
          </div>
        )}

        {duplicateWarning && (
          <div className="mb-4 p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{duplicateWarning}</span>
          </div>
        )}

        <div className="space-y-4">
          
          {/* Group Name & Slug */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-300 mb-1">
                Group Name <span className="text-[#25D366]">*</span>
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                  if (!isEditing && !slug) {
                    setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-'));
                  }
                }}
                placeholder="e.g. Pakistan PUBG Gamers Official"
                className="w-full bg-[#1b1f28] border border-white/10 focus:border-[#25D366] rounded-xl px-3.5 py-2 text-xs text-white outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-300 mb-1">
                URL Slug
              </label>
              <input
                type="text"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                placeholder="e.g. pakistan-pubg-gamers-official"
                className="w-full bg-[#1b1f28] border border-white/10 focus:border-[#25D366] rounded-xl px-3.5 py-2 text-xs text-white outline-none"
              />
            </div>
          </div>

          {/* WhatsApp Invite Link */}
          <div>
            <label className="block text-xs font-bold text-gray-300 mb-1">
              WhatsApp Invite Link <span className="text-[#25D366]">*</span>
            </label>
            <input
              type="url"
              value={inviteLink}
              onChange={(e) => handleLinkChange(e.target.value)}
              placeholder="https://chat.whatsapp.com/J8KLmNeopQR91823S"
              className="w-full bg-[#1b1f28] border border-white/10 focus:border-[#25D366] rounded-xl px-3.5 py-2 text-xs text-white outline-none font-mono"
            />
          </div>

          {/* Category, Country & City */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-300 mb-1">Category</label>
              <select
                value={categorySlug}
                onChange={(e) => setCategorySlug(e.target.value)}
                className="w-full bg-[#1b1f28] border border-white/10 focus:border-[#25D366] rounded-xl px-3 py-2 text-xs text-white outline-none cursor-pointer"
              >
                {categories.map((c) => (
                  <option key={c.id} value={c.slug}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-300 mb-1">Country</label>
              <select
                value={countryName}
                onChange={(e) => setCountryName(e.target.value)}
                className="w-full bg-[#1b1f28] border border-white/10 focus:border-[#25D366] rounded-xl px-3 py-2 text-xs text-white outline-none cursor-pointer"
              >
                {countries.map((c) => (
                  <option key={c.id} value={c.name}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-300 mb-1">City (Optional)</label>
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="e.g. Lahore, Delhi, Lagos"
                className="w-full bg-[#1b1f28] border border-white/10 focus:border-[#25D366] rounded-xl px-3 py-2 text-xs text-white outline-none"
              />
            </div>
          </div>

          {/* Language & Tags */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-300 mb-1">Language</label>
              <input
                type="text"
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                placeholder="English / Urdu / Hindi"
                className="w-full bg-[#1b1f28] border border-white/10 focus:border-[#25D366] rounded-xl px-3 py-2 text-xs text-white outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-300 mb-1">Tags (comma-separated)</label>
              <input
                type="text"
                value={tagsStr}
                onChange={(e) => setTagsStr(e.target.value)}
                placeholder="PUBG, Tournaments, Scrims"
                className="w-full bg-[#1b1f28] border border-white/10 focus:border-[#25D366] rounded-xl px-3 py-2 text-xs text-white outline-none"
              />
            </div>
          </div>

          {/* Group Image URL */}
          <div>
            <label className="block text-xs font-bold text-gray-300 mb-1">Cover / Avatar Image URL</label>
            <div className="flex gap-3 items-center">
              <input
                type="url"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                placeholder="https://..."
                className="flex-1 bg-[#1b1f28] border border-white/10 focus:border-[#25D366] rounded-xl px-3 py-2 text-xs text-white outline-none"
              />
              <img
                src={image}
                alt="Preview"
                className="w-10 h-10 rounded-lg object-cover bg-black/40 border border-white/10 flex-shrink-0"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1614680376593-902f749f7ffc?w=100&auto=format&fit=crop&q=80';
                }}
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-bold text-gray-300 mb-1">Group Description</label>
            <textarea
              rows={2}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="What this community is about, rules, schedule..."
              className="w-full bg-[#1b1f28] border border-white/10 focus:border-[#25D366] rounded-xl px-3 py-2 text-xs text-white outline-none resize-none"
            />
          </div>

          {/* Status & Badges Control */}
          <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-300 mb-1">Moderation Status</label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value as GroupStatus)}
                  className="w-full bg-[#1b1f28] border border-white/10 focus:border-[#25D366] rounded-xl px-3 py-2 text-xs text-white outline-none cursor-pointer"
                >
                  <option value="active">Active &amp; Published</option>
                  <option value="pending">Pending Moderation</option>
                  <option value="suspended">Suspended</option>
                  <option value="expired">Expired / Dead Link</option>
                  <option value="reported">Reported</option>
                </select>
              </div>

              <div className="flex flex-col justify-end gap-2 text-xs">
                <label className="flex items-center gap-2 text-gray-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isFeatured}
                    onChange={(e) => setIsFeatured(e.target.checked)}
                    className="rounded border-gray-600 text-[#25D366] focus:ring-[#25D366]"
                  />
                  <span className="flex items-center gap-1 font-bold">
                    <Star className="w-3.5 h-3.5 text-yellow-400" /> Featured on Homepage
                  </span>
                </label>

                <label className="flex items-center gap-2 text-gray-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isPinned}
                    onChange={(e) => setIsPinned(e.target.checked)}
                    className="rounded border-gray-600 text-[#25D366] focus:ring-[#25D366]"
                  />
                  <span className="flex items-center gap-1 font-bold">
                    <Pin className="w-3.5 h-3.5 text-[#25D366]" /> Pin to Top of Category
                  </span>
                </label>

                <label className="flex items-center gap-2 text-gray-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isVerified}
                    onChange={(e) => setIsVerified(e.target.checked)}
                    className="rounded border-gray-600 text-[#25D366] focus:ring-[#25D366]"
                  />
                  <span className="flex items-center gap-1 font-bold">
                    <ShieldCheck className="w-3.5 h-3.5 text-sky-400" /> Verified Badge
                  </span>
                </label>
              </div>
            </div>
          </div>

          {/* SEO Metadata Accordion/Fields */}
          <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 space-y-3">
            <span className="text-xs font-bold text-gray-300 uppercase tracking-wider block">
              SEO &amp; Meta Information
            </span>

            <div>
              <label className="block text-[11px] text-gray-400 mb-1">Custom SEO Title</label>
              <input
                type="text"
                value={seoTitle}
                onChange={(e) => setSeoTitle(e.target.value)}
                placeholder="e.g. Join Pakistan PUBG Gamers WhatsApp Group - Groupizo"
                className="w-full bg-[#1b1f28] border border-white/10 rounded-xl px-3 py-1.5 text-xs text-white outline-none"
              />
            </div>

            <div>
              <label className="block text-[11px] text-gray-400 mb-1">Meta Description</label>
              <input
                type="text"
                value={seoDescription}
                onChange={(e) => setSeoDescription(e.target.value)}
                placeholder="e.g. Active PUBG Mobile Pakistan group link. Tournaments, custom rooms, and daily squads."
                className="w-full bg-[#1b1f28] border border-white/10 rounded-xl px-3 py-1.5 text-xs text-white outline-none"
              />
            </div>
          </div>

        </div>

        {/* Action Buttons */}
        <div className="mt-6 pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-white/10 text-gray-300 hover:text-white text-xs font-bold cursor-pointer"
          >
            Cancel
          </button>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => handleSave('pending')}
              className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-gray-200 text-xs font-bold cursor-pointer"
            >
              Save as Draft
            </button>
            <button
              type="button"
              onClick={() => handleSave('active')}
              className="px-5 py-2.5 rounded-xl bg-[#25D366] hover:bg-[#1ebe5a] text-black text-xs font-black cursor-pointer shadow-lg shadow-[#25D366]/20"
            >
              Save &amp; Publish
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
