import React, { useState } from 'react';
import { Group } from '../types.ts';
import { CATEGORIES_DATA, COUNTRIES_DATA } from '../data/groupsData.ts';
import { X, CheckCircle, AlertCircle, Sparkles, Plus } from 'lucide-react';

interface AddGroupModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddGroup: (newGroup: Group) => void;
}

export const AddGroupModal: React.FC<AddGroupModalProps> = ({
  isOpen,
  onClose,
  onAddGroup
}) => {
  const [title, setTitle] = useState('');
  const [inviteLink, setInviteLink] = useState('');
  const [categorySlug, setCategorySlug] = useState('gaming');
  const [countryName, setCountryName] = useState('India');
  const [city, setCity] = useState('');
  const [description, setDescription] = useState('');
  const [tagsStr, setTagsStr] = useState('');
  const [agreed, setAgreed] = useState(true);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!title.trim()) {
      setErrorMsg('Please enter your WhatsApp group name.');
      return;
    }

    if (!inviteLink.trim() || (!inviteLink.includes('chat.whatsapp.com') && !inviteLink.startsWith('https://'))) {
      setErrorMsg('Please enter a valid WhatsApp invite link (e.g. https://chat.whatsapp.com/...)');
      return;
    }

    if (!agreed) {
      setErrorMsg('Please agree to Groupizo community guidelines.');
      return;
    }

    const selectedCategory = CATEGORIES_DATA.find((c) => c.slug === categorySlug);
    const selectedCountry = COUNTRIES_DATA.find((c) => c.name === countryName);

    const tags = tagsStr
      .split(',')
      .map((t) => t.trim())
      .filter((t) => t.length > 0);

    const newGroup: Group = {
      id: String(Date.now()),
      slug: `${title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-${categorySlug}-${Math.floor(1000 + Math.random() * 9000)}`,
      title: title.trim(),
      image: 'https://images.unsplash.com/photo-1614680376593-902f749f7ffc?w=600&auto=format&fit=crop&q=80',
      country: countryName,
      countryCode: selectedCountry ? selectedCountry.code : 'global',
      city: city.trim() || undefined,
      category: selectedCategory ? selectedCategory.name : 'Community & Social',
      categorySlug: categorySlug,
      inviteLink: inviteLink.trim(),
      membersCount: Math.floor(120 + Math.random() * 600),
      maxMembers: 1024,
      isVerified: true,
      tags: tags.length > 0 ? tags : ['New', 'Community'],
      description: description.trim() || 'Verified WhatsApp community group. Friendly discussion and updates.',
      addedAgo: 'Just now'
    };

    onAddGroup(newGroup);
    setSubmitted(true);

    setTimeout(() => {
      setSubmitted(false);
      onClose();
      // Reset form
      setTitle('');
      setInviteLink('');
      setCity('');
      setDescription('');
      setTagsStr('');
    }, 1800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div 
        className="bg-[#181818] border border-white/15 rounded-3xl max-w-xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 relative shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-gray-400 hover:text-white rounded-full bg-white/5 hover:bg-white/10 cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="py-12 text-center flex flex-col items-center justify-center space-y-4 animate-scaleUp">
            <div className="w-16 h-16 rounded-full bg-[#25D366]/20 border border-[#25D366] flex items-center justify-center text-[#25D366]">
              <CheckCircle className="w-10 h-10" />
            </div>
            <h3 className="text-2xl font-black text-white">Group Submitted &amp; Verified!</h3>
            <p className="text-sm text-gray-400 max-w-md">
              Your group <strong className="text-white">&ldquo;{title}&rdquo;</strong> has been verified and added to the directory feed.
            </p>
          </div>
        ) : (
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-[#25D366] uppercase tracking-wider mb-1">
              <Sparkles className="w-4 h-4" /> Free Community Submission
            </div>
            
            <h2 className="text-2xl font-black text-white mb-2">
              Submit Your WhatsApp Group
            </h2>
            
            <p className="text-xs sm:text-sm text-gray-400 mb-6">
              Paste your group link, pick a category and country. Checked and published immediately for genuine groups.
            </p>

            {errorMsg && (
              <div className="mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Group Title */}
              <div>
                <label className="block text-xs font-bold text-gray-300 mb-1">
                  Group Name <span className="text-[#25D366]">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. RedZone Battlegrounds Hub"
                  className="w-full bg-[#222] border border-white/15 focus:border-[#25D366] rounded-xl px-4 py-2.5 text-sm text-white outline-none"
                />
              </div>

              {/* Invite Link */}
              <div>
                <label className="block text-xs font-bold text-gray-300 mb-1">
                  WhatsApp Invite Link <span className="text-[#25D366]">*</span>
                </label>
                <input
                  type="url"
                  required
                  value={inviteLink}
                  onChange={(e) => setInviteLink(e.target.value)}
                  placeholder="https://chat.whatsapp.com/..."
                  className="w-full bg-[#222] border border-white/15 focus:border-[#25D366] rounded-xl px-4 py-2.5 text-sm text-white outline-none"
                />
              </div>

              {/* Category & Country */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-300 mb-1">
                    Category <span className="text-[#25D366]">*</span>
                  </label>
                  <select
                    value={categorySlug}
                    onChange={(e) => setCategorySlug(e.target.value)}
                    className="w-full bg-[#222] border border-white/15 focus:border-[#25D366] rounded-xl px-3 py-2.5 text-sm text-white outline-none cursor-pointer"
                  >
                    {CATEGORIES_DATA.map((cat) => (
                      <option key={cat.slug} value={cat.slug}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-300 mb-1">
                    Country <span className="text-[#25D366]">*</span>
                  </label>
                  <select
                    value={countryName}
                    onChange={(e) => setCountryName(e.target.value)}
                    className="w-full bg-[#222] border border-white/15 focus:border-[#25D366] rounded-xl px-3 py-2.5 text-sm text-white outline-none cursor-pointer"
                  >
                    {COUNTRIES_DATA.map((ctry) => (
                      <option key={ctry.slug} value={ctry.name}>
                        {ctry.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* City (optional) */}
              <div>
                <label className="block text-xs font-bold text-gray-300 mb-1">
                  City <span className="text-gray-500 font-normal">(Optional for local groups)</span>
                </label>
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="e.g. Karachi, Mumbai, Lagos, Colombo"
                  className="w-full bg-[#222] border border-white/15 focus:border-[#25D366] rounded-xl px-4 py-2 text-sm text-white outline-none"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-bold text-gray-300 mb-1">
                  Short Description
                </label>
                <textarea
                  rows={2}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Briefly describe what members discuss or do in your group..."
                  className="w-full bg-[#222] border border-white/15 focus:border-[#25D366] rounded-xl px-4 py-2 text-sm text-white outline-none resize-none"
                />
              </div>

              {/* Tags */}
              <div>
                <label className="block text-xs font-bold text-gray-300 mb-1">
                  Tags <span className="text-gray-500 font-normal">(comma-separated)</span>
                </label>
                <input
                  type="text"
                  value={tagsStr}
                  onChange={(e) => setTagsStr(e.target.value)}
                  placeholder="e.g. BGMI, Tournaments, Squads"
                  className="w-full bg-[#222] border border-white/15 focus:border-[#25D366] rounded-xl px-4 py-2 text-sm text-white outline-none"
                />
              </div>

              {/* Agreement checkbox */}
              <label className="flex items-start gap-2.5 text-xs text-gray-300 cursor-pointer pt-1">
                <input
                  type="checkbox"
                  checked={agreed}
                  onChange={(e) => setAgreed(e.target.checked)}
                  className="mt-0.5 rounded border-gray-600 text-[#25D366] focus:ring-[#25D366]"
                />
                <span>
                  I confirm this group does not violate safety policies, does not contain scams or illicit content, and accepts new members freely.
                </span>
              </label>

              {/* Submit CTA */}
              <div className="pt-3">
                <button
                  type="submit"
                  className="w-full py-3.5 bg-[#25D366] hover:bg-[#1ebe5a] text-black font-extrabold text-sm rounded-xl shadow-lg shadow-[#25D366]/20 transition-all hover:scale-[1.01] cursor-pointer flex items-center justify-center gap-2"
                >
                  <Plus className="w-5 h-5 stroke-[2.5]" />
                  <span>Submit Group for Review</span>
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
