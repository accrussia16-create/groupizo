import React, { useState } from 'react';
import { useAdmin } from '../../context/AdminContext.tsx';
import { AdminCategory } from '../../types/admin.ts';
import {
  FolderTree,
  PlusCircle,
  Edit2,
  Trash2,
  Star,
  Eye,
  EyeOff,
  Search,
  X,
  Check
} from 'lucide-react';

export const CategoriesManager: React.FC = () => {
  const { categories, addCategory, updateCategory, deleteCategory } = useAdmin();

  const [searchQuery, setSearchQuery] = useState('');
  const [editingCat, setEditingCat] = useState<AdminCategory | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Form states
  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [icon, setIcon] = useState('📁');
  const [description, setDescription] = useState('');
  const [isFeatured, setIsFeatured] = useState(false);
  const [seoTitle, setSeoTitle] = useState('');
  const [seoDescription, setSeoDescription] = useState('');

  const filteredCategories = categories.filter((c) =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleOpenAdd = () => {
    setName('');
    setSlug('');
    setIcon('📁');
    setDescription('');
    setIsFeatured(false);
    setSeoTitle('');
    setSeoDescription('');
    setIsAddModalOpen(true);
  };

  const handleOpenEdit = (cat: AdminCategory) => {
    setEditingCat(cat);
    setName(cat.name);
    setSlug(cat.slug);
    setIcon(cat.icon);
    setDescription(cat.description);
    setIsFeatured(cat.isFeatured);
    setSeoTitle(cat.seoTitle || '');
    setSeoDescription(cat.seoDescription || '');
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const payload = {
      name: name.trim(),
      slug: slug.trim() || name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      icon: icon.trim() || '📁',
      description: description.trim(),
      isFeatured,
      seoTitle: seoTitle.trim(),
      seoDescription: seoDescription.trim()
    };

    if (editingCat) {
      updateCategory(editingCat.id, payload);
      setEditingCat(null);
    } else {
      addCategory(payload);
      setIsAddModalOpen(false);
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white">Categories Management</h1>
          <p className="text-xs text-gray-400 mt-1">
            Organize directory genres, icons, featured homepage badges and SEO taxonomies
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="px-4 py-2.5 rounded-xl bg-[#25D366] hover:bg-[#1ebe5a] text-black font-extrabold text-xs flex items-center gap-1.5 shadow-md shadow-[#25D366]/20 transition-all cursor-pointer"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Add New Category</span>
        </button>
      </div>

      {/* Filter / Search */}
      <div className="bg-[#14171d] border border-white/10 rounded-2xl p-4 flex items-center justify-between">
        <div className="w-full sm:w-80 relative flex items-center">
          <Search className="w-4 h-4 text-gray-400 absolute left-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search categories..."
            className="w-full bg-[#1b1f28] border border-white/10 focus:border-[#25D366] rounded-xl pl-9 pr-3 py-2 text-xs text-white outline-none"
          />
        </div>
        <span className="text-xs text-gray-400 font-bold hidden sm:inline">
          {categories.length} Total Categories
        </span>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredCategories.map((c) => (
          <div
            key={c.id}
            className={`p-5 rounded-2xl border transition-all hover:-translate-y-1 hover:shadow-xl flex flex-col justify-between ${
              c.isHidden ? 'bg-[#14171d]/60 border-white/5 opacity-60' : 'bg-[#14171d] border-white/10 hover:border-[#25D366]/40'
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-2xl">
                  {c.icon}
                </div>

                <div className="flex items-center gap-1">
                  <button
                    onClick={() => updateCategory(c.id, { isFeatured: !c.isFeatured })}
                    className={`p-1.5 rounded-lg cursor-pointer transition-colors ${
                      c.isFeatured ? 'text-yellow-400 bg-yellow-400/10' : 'text-gray-500 hover:text-gray-300'
                    }`}
                    title={c.isFeatured ? 'Featured Category' : 'Mark as Featured'}
                  >
                    <Star className="w-4 h-4 fill-current" />
                  </button>

                  <button
                    onClick={() => updateCategory(c.id, { isHidden: !c.isHidden })}
                    className="p-1.5 rounded-lg text-gray-500 hover:text-white cursor-pointer"
                    title={c.isHidden ? 'Show Category' : 'Hide Category'}
                  >
                    {c.isHidden ? <EyeOff className="w-4 h-4 text-amber-400" /> : <Eye className="w-4 h-4" />}
                  </button>

                  <button
                    onClick={() => handleOpenEdit(c)}
                    className="p-1.5 rounded-lg text-gray-400 hover:text-[#25D366] cursor-pointer"
                    title="Edit Category"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => deleteCategory(c.id)}
                    className="p-1.5 rounded-lg text-gray-500 hover:text-red-400 cursor-pointer"
                    title="Delete Category"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <h3 className="text-base font-extrabold text-white mb-0.5">{c.name}</h3>
              <p className="text-[11px] text-gray-400 font-mono mb-2">/{c.slug}</p>
              <p className="text-xs text-gray-400 line-clamp-2 leading-relaxed mb-4">
                {c.description || 'No description provided.'}
              </p>
            </div>

            <div className="pt-3 border-t border-white/5 flex items-center justify-between text-xs">
              <span className="font-bold text-gray-400">
                <strong className="text-[#25D366] text-sm">{c.groupsCount}</strong> groups catalogued
              </span>
              <span className="text-[10px] text-gray-500 font-mono">Order: #{c.order}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Add / Edit Category Modal */}
      {(isAddModalOpen || editingCat) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="bg-[#14171d] border border-white/15 rounded-3xl max-w-md w-full p-6 shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-4">
              <h3 className="text-lg font-bold text-white">
                {editingCat ? `Edit Category: ${editingCat.name}` : 'Create New Category'}
              </h3>
              <button
                onClick={() => {
                  setIsAddModalOpen(false);
                  setEditingCat(null);
                }}
                className="p-1 rounded-md text-gray-400 hover:text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-3.5 text-xs">
              <div>
                <label className="block text-gray-300 font-bold mb-1">Category Name</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    if (!editingCat && !slug) {
                      setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-'));
                    }
                  }}
                  placeholder="e.g. Cryptocurrency"
                  className="w-full bg-[#1b1f28] border border-white/10 focus:border-[#25D366] rounded-xl px-3 py-2 text-white outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-gray-300 font-bold mb-1">URL Slug</label>
                  <input
                    type="text"
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                    placeholder="e.g. crypto"
                    className="w-full bg-[#1b1f28] border border-white/10 focus:border-[#25D366] rounded-xl px-3 py-2 text-white outline-none"
                  />
                </div>

                <div>
                  <label className="block text-gray-300 font-bold mb-1">Emoji / Icon</label>
                  <input
                    type="text"
                    value={icon}
                    onChange={(e) => setIcon(e.target.value)}
                    placeholder="e.g. 🪙"
                    className="w-full bg-[#1b1f28] border border-white/10 focus:border-[#25D366] rounded-xl px-3 py-2 text-white outline-none text-center"
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-300 font-bold mb-1">Short Description</label>
                <textarea
                  rows={2}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Category scope and visitor guidelines..."
                  className="w-full bg-[#1b1f28] border border-white/10 focus:border-[#25D366] rounded-xl px-3 py-2 text-white outline-none resize-none"
                />
              </div>

              <label className="flex items-center gap-2 cursor-pointer pt-1">
                <input
                  type="checkbox"
                  checked={isFeatured}
                  onChange={(e) => setIsFeatured(e.target.checked)}
                  className="rounded border-gray-600 text-[#25D366] focus:ring-[#25D366]"
                />
                <span className="text-gray-300 font-bold">Feature on Homepage Tab Strip</span>
              </label>

              <div className="pt-3 flex gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setIsAddModalOpen(false);
                    setEditingCat(null);
                  }}
                  className="flex-1 py-2 rounded-xl bg-white/10 text-gray-300 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2 rounded-xl bg-[#25D366] hover:bg-[#1ebe5a] text-black font-extrabold"
                >
                  {editingCat ? 'Update Category' : 'Create Category'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
