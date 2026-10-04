import React, { useState } from 'react';
import { Group } from '../types.ts';
import { useAdmin } from '../context/AdminContext.tsx';
import { X, CheckCircle, AlertCircle, Sparkles, Plus, ShieldCheck } from 'lucide-react';

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
  const { categories, countries, appearance } = useAdmin();
  const primaryColor = appearance?.primaryColor || '#25D366';

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
      setErrorMsg('Please agree to community guidelines.');
      return;
    }

    const selectedCategory = categories.find((c) => c.slug === categorySlug);
    const selectedCountry = countries.find((c) => c.name === countryName);

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
      tags: tags.length > 0 ? tags : ['Community'],
      description: description.trim() || 'Verified WhatsApp community group. Friendly discussions and updates.',
      addedAgo: 'Just now'
    };

    onAddGroup(newGroup);
    setSubmitted(true);

    setTimeout(() => {
      setSubmitted(false);
      onClose();
      setTitle('');
      setInviteLink('');
      setCity('');
      setDescription('');
      setTagsStr('');
    }, 1800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-fadeIn">
      <div 
        className="bg-white border border-gray-200 rounded-3xl max-w-xl w-full max-h-[92vh] overflow-y-auto p-6 sm:p-8 relative shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-gray-500 hover:text-gray-900 rounded-full bg-gray-100 hover:bg-gray-200 cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="py-12 text-center flex flex-col items-center justify-center space-y-4 animate-scaleUp">
            <div className="w-16 h-16 rounded-full bg-emerald-100 border border-emerald-300 flex items-center justify-center text-[#128C7E]">
              <CheckCircle className="w-10 h-10" />
            </div>
            <h3 className="text-2xl font-black text-gray-900">Group Submitted Successfully!</h3>
            <p className="text-sm text-gray-600 max-w-md">
              Your group <strong className="text-gray-900">&ldquo;{title}&rdquo;</strong> has been published to the directory.
            </p>
          </div>
        ) : (
          <div>
            <div className="flex items-center gap-1.5 text-xs font-bold text-[#128C7E] uppercase tracking-wider mb-1">
              <Sparkles className="w-4 h-4" /> Free Community Listing
            </div>
            
            <h2 className="text-2xl font-black text-gray-950 mb-1.5">
              Submit Your WhatsApp Group
            </h2>
            
            <p className="text-xs sm:text-sm text-gray-600 mb-6">
              Share your active WhatsApp group with thousands of daily visitors searching for communities.
            </p>

            {errorMsg && (
              <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-gray-700 mb-1">
                  Group Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Lagos Tech Innovators Hub"
                  className="w-full bg-gray-50 border border-gray-200 focus:border-[#25D366] rounded-xl px-4 py-2.5 text-sm text-gray-900 outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">
                  WhatsApp Invite Link <span className="text-red-500">*</span>
                </label>
                <input
                  type="url"
                  required
                  value={inviteLink}
                  onChange={(e) => setInviteLink(e.target.value)}
                  placeholder="https://chat.whatsapp.com/..."
                  className="w-full bg-gray-50 border border-gray-200 focus:border-[#25D366] rounded-xl px-4 py-2.5 text-sm text-gray-900 outline-none font-mono"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Category</label>
                  <select
                    value={categorySlug}
                    onChange={(e) => setCategorySlug(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-200 focus:border-[#25D366] rounded-xl px-3 py-2.5 text-sm text-gray-900 outline-none cursor-pointer"
                  >
                    {categories.filter((c) => !c.isHidden).map((cat) => (
                      <option key={cat.slug} value={cat.slug}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-gray-700 mb-1">Country</label>
                  <select
                    value={countryName}
                    onChange={(e) => setCountryName(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-200 focus:border-[#25D366] rounded-xl px-3 py-2.5 text-sm text-gray-900 outline-none cursor-pointer"
                  >
                    {countries.filter((c) => !c.isHidden).map((ctry) => (
                      <option key={ctry.slug} value={ctry.name}>
                        {ctry.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">
                  City <span className="text-gray-400 font-normal">(Optional for regional groups)</span>
                </label>
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="e.g. Lagos, Karachi, London, Delhi"
                  className="w-full bg-gray-50 border border-gray-200 focus:border-[#25D366] rounded-xl px-4 py-2 text-sm text-gray-900 outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">Description</label>
                <textarea
                  rows={2}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="What is this community about, rules, and who should join..."
                  className="w-full bg-gray-50 border border-gray-200 focus:border-[#25D366] rounded-xl px-4 py-2 text-sm text-gray-900 outline-none resize-none leading-relaxed"
                />
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">Tags (comma-separated)</label>
                <input
                  type="text"
                  value={tagsStr}
                  onChange={(e) => setTagsStr(e.target.value)}
                  placeholder="e.g. Startups, Networking, Coding"
                  className="w-full bg-gray-50 border border-gray-200 focus:border-[#25D366] rounded-xl px-4 py-2 text-sm text-gray-900 outline-none"
                />
              </div>

              <label className="flex items-start gap-2.5 text-xs text-gray-600 cursor-pointer pt-1">
                <input
                  type="checkbox"
                  checked={agreed}
                  onChange={(e) => setAgreed(e.target.checked)}
                  className="mt-0.5 rounded border-gray-300 text-[#128C7E] focus:ring-[#128C7E]"
                />
                <span>
                  I confirm this group does not violate safety policies, contains no scams or illicit content, and accepts members freely.
                </span>
              </label>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3 text-black font-black text-sm rounded-xl shadow-md transition-transform hover:scale-[1.01] cursor-pointer flex items-center justify-center gap-2"
                  style={{ backgroundColor: primaryColor }}
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
