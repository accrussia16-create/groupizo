import React, { useState } from 'react';
import { useAdmin } from '../../context/AdminContext.tsx';
import { AdminTag } from '../../types/admin.ts';
import { Tag, PlusCircle, Trash2, Search, Eye, EyeOff, Hash, Merge } from 'lucide-react';

export const TagsManager: React.FC = () => {
  const { tags, addTag, deleteTag } = useAdmin();

  const [searchQuery, setSearchQuery] = useState('');
  const [newTagName, setNewTagName] = useState('');
  const [showMergeModal, setShowMergeModal] = useState(false);
  const [sourceTag, setSourceTag] = useState('');
  const [targetTag, setTargetTag] = useState('');

  const filteredTags = tags.filter((t) =>
    t.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTagName.trim()) return;
    addTag({ name: newTagName.trim() });
    setNewTagName('');
  };

  const handleMerge = () => {
    if (sourceTag && targetTag && sourceTag !== targetTag) {
      // Delete source tag in demo
      const src = tags.find((t) => t.name === sourceTag);
      if (src) deleteTag(src.id);
      setShowMergeModal(false);
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white">Tags &amp; Topics Taxonomy</h1>
          <p className="text-xs text-gray-400 mt-1">
            Topic clusters, hashtag searches, and community keyword associations
          </p>
        </div>

        <button
          onClick={() => setShowMergeModal(true)}
          className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-white font-bold text-xs flex items-center gap-1.5 cursor-pointer border border-white/10 self-start sm:self-auto"
        >
          <Merge className="w-4 h-4 text-[#25D366]" />
          <span>Merge Duplicate Tags</span>
        </button>
      </div>

      {/* Add Tag Quick Form */}
      <div className="bg-[#14171d] border border-white/10 rounded-2xl p-4">
        <form onSubmit={handleCreate} className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1 relative flex items-center">
            <Hash className="w-4 h-4 text-gray-500 absolute left-3" />
            <input
              type="text"
              required
              value={newTagName}
              onChange={(e) => setNewTagName(e.target.value)}
              placeholder="Create new topic tag (e.g. FreeFire, RemoteWork, Scholarships)..."
              className="w-full bg-[#1b1f28] border border-white/10 focus:border-[#25D366] rounded-xl pl-9 pr-3 py-2 text-xs text-white outline-none"
            />
          </div>

          <button
            type="submit"
            className="px-5 py-2 rounded-xl bg-[#25D366] hover:bg-[#1ebe5a] text-black font-extrabold text-xs flex items-center justify-center gap-1.5 cursor-pointer shadow-md"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Create Tag</span>
          </button>
        </form>
      </div>

      {/* Search Bar */}
      <div className="w-full sm:w-80 relative flex items-center">
        <Search className="w-4 h-4 text-gray-400 absolute left-3" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Filter tags..."
          className="w-full bg-[#14171d] border border-white/10 focus:border-[#25D366] rounded-xl pl-9 pr-3 py-2 text-xs text-white outline-none"
        />
      </div>

      {/* Tags Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {filteredTags.map((tag) => (
          <div
            key={tag.id}
            className="p-4 rounded-xl bg-[#14171d] border border-white/10 hover:border-[#25D366]/40 flex items-center justify-between transition-colors"
          >
            <div className="min-w-0">
              <div className="flex items-center gap-1.5 font-bold text-white text-xs">
                <span className="text-[#25D366]">#</span>
                <span className="truncate">{tag.name}</span>
              </div>
              <div className="text-[11px] text-gray-400 mt-1">
                {tag.groupsCount} groups &middot; Popularity score: {tag.popularity}/100
              </div>
            </div>

            <button
              onClick={() => deleteTag(tag.id)}
              className="p-1.5 text-gray-500 hover:text-red-400 cursor-pointer"
              title="Delete tag"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>

      {/* Merge Modal */}
      {showMergeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="bg-[#14171d] border border-white/15 rounded-3xl max-w-sm w-full p-6 shadow-2xl">
            <h3 className="text-lg font-bold text-white mb-2">Merge Similar Tags</h3>
            <p className="text-xs text-gray-400 mb-4">
              Consolidates duplicate spelling variations into a single primary keyword.
            </p>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-gray-300 font-bold mb-1">Source Tag (to be merged &amp; removed)</label>
                <select
                  value={sourceTag}
                  onChange={(e) => setSourceTag(e.target.value)}
                  className="w-full bg-[#1b1f28] border border-white/10 rounded-xl px-3 py-2 text-white outline-none cursor-pointer"
                >
                  <option value="">Select source tag...</option>
                  {tags.map((t) => (
                    <option key={t.id} value={t.name}>
                      #{t.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-gray-300 font-bold mb-1">Target Primary Tag</label>
                <select
                  value={targetTag}
                  onChange={(e) => setTargetTag(e.target.value)}
                  className="w-full bg-[#1b1f28] border border-white/10 rounded-xl px-3 py-2 text-white outline-none cursor-pointer"
                >
                  <option value="">Select target tag...</option>
                  {tags.map((t) => (
                    <option key={t.id} value={t.name}>
                      #{t.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="pt-3 flex gap-2">
                <button
                  type="button"
                  onClick={() => setShowMergeModal(false)}
                  className="flex-1 py-2 rounded-xl bg-white/10 text-gray-300 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleMerge}
                  className="flex-1 py-2 rounded-xl bg-[#25D366] text-black font-extrabold"
                >
                  Confirm Merge
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
