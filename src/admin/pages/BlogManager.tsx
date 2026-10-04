import React, { useState } from 'react';
import { BLOG_ARTICLES } from '../../data/blogData.ts';
import { BlogArticle } from '../../types.ts';
import { BookOpen, PlusCircle, Edit2, Trash2, Calendar, Eye, X } from 'lucide-react';
import { useAdmin } from '../../context/AdminContext.tsx';

export const BlogManager: React.FC = () => {
  const { showToast } = useAdmin();
  const [articles, setArticles] = useState<BlogArticle[]>(BLOG_ARTICLES);
  const [editingArticle, setEditingArticle] = useState<BlogArticle | null>(null);
  const [isAddOpen, setIsAddOpen] = useState(false);

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('WhatsApp Tips');
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState('');
  const [coverImage, setCoverImage] = useState('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&auto=format&fit=crop&q=80');

  const handleOpenAdd = () => {
    setTitle('');
    setCategory('WhatsApp Tips');
    setExcerpt('');
    setContent('');
    setIsAddOpen(true);
  };

  const handleOpenEdit = (art: BlogArticle) => {
    setEditingArticle(art);
    setTitle(art.title);
    setCategory(art.category);
    setExcerpt(art.excerpt);
    setContent(art.content);
    setCoverImage(art.coverImage);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    if (editingArticle) {
      setArticles((prev) =>
        prev.map((a) =>
          a.slug === editingArticle.slug
            ? { ...a, title, category, excerpt, content, coverImage }
            : a
        )
      );
      setEditingArticle(null);
      showToast('Article updated.');
    } else {
      const newArt: BlogArticle = {
        slug: title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        title: title.trim(),
        category,
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        readTime: '5 min read',
        coverImage,
        excerpt: excerpt.trim(),
        content: content.trim()
      };
      setArticles((prev) => [newArt, ...prev]);
      setIsAddOpen(false);
      showToast('Article published to blog section.');
    }
  };

  const handleDelete = (slug: string) => {
    setArticles((prev) => prev.filter((a) => a.slug !== slug));
    showToast('Article deleted.');
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white">Blog &amp; Safety Guides CMS</h1>
          <p className="text-xs text-gray-400 mt-1">
            Publish educational articles on group discovery, community rules, and WhatsApp tips
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="px-4 py-2.5 rounded-xl bg-[#25D366] hover:bg-[#1ebe5a] text-black font-extrabold text-xs flex items-center gap-1.5 shadow-md shadow-[#25D366]/20 transition-all cursor-pointer"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Write New Article</span>
        </button>
      </div>

      {/* Grid of Articles */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {articles.map((art) => (
          <div
            key={art.slug}
            className="bg-[#14171d] border border-white/10 hover:border-[#25D366]/40 rounded-2xl overflow-hidden flex flex-col transition-all shadow-xl"
          >
            <div className="aspect-video w-full relative bg-black/40">
              <img
                src={art.coverImage}
                alt={art.title}
                className="w-full h-full object-cover"
              />
              <span className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-full text-[10px] font-bold bg-black/70 text-[#25D366] border border-[#25D366]/30">
                {art.category}
              </span>
            </div>

            <div className="p-4 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="text-sm font-bold text-white mb-1.5 line-clamp-2">{art.title}</h3>
                <p className="text-xs text-gray-400 line-clamp-2 leading-relaxed mb-4">
                  {art.excerpt}
                </p>
              </div>

              <div className="pt-3 border-t border-white/5 flex items-center justify-between text-xs text-gray-400">
                <span className="font-mono text-[11px]">{art.date}</span>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => handleOpenEdit(art)}
                    className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 hover:text-[#25D366] cursor-pointer"
                    title="Edit article"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleDelete(art.slug)}
                    className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-gray-500 hover:text-red-400 cursor-pointer"
                    title="Delete article"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add / Edit Article Modal */}
      {(isAddOpen || editingArticle) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="bg-[#14171d] border border-white/15 rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl max-h-[92vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-4">
              <h3 className="text-lg font-bold text-white">
                {editingArticle ? 'Edit Guide Article' : 'Write Guide Article'}
              </h3>
              <button
                onClick={() => {
                  setIsAddOpen(false);
                  setEditingArticle(null);
                }}
                className="p-1 rounded-md text-gray-400 hover:text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div>
                <label className="block text-gray-300 font-bold mb-1">Article Title</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. 10 Best WhatsApp Groups for Freelance Designers in 2026"
                  className="w-full bg-[#1b1f28] border border-white/10 rounded-xl px-3.5 py-2 text-white outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-gray-300 font-bold mb-1">Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full bg-[#1b1f28] border border-white/10 rounded-xl px-3 py-2 text-white outline-none cursor-pointer"
                  >
                    <option value="WhatsApp Tips">WhatsApp Tips</option>
                    <option value="WhatsApp Business">WhatsApp Business</option>
                    <option value="Education">Education</option>
                    <option value="Productivity">Productivity</option>
                    <option value="Safety">Safety &amp; Privacy</option>
                  </select>
                </div>

                <div>
                  <label className="block text-gray-300 font-bold mb-1">Cover Image URL</label>
                  <input
                    type="url"
                    value={coverImage}
                    onChange={(e) => setCoverImage(e.target.value)}
                    className="w-full bg-[#1b1f28] border border-white/10 rounded-xl px-3 py-2 text-white outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-300 font-bold mb-1">Excerpt Summary</label>
                <textarea
                  rows={2}
                  value={excerpt}
                  onChange={(e) => setExcerpt(e.target.value)}
                  placeholder="Short 2-sentence teaser for card preview..."
                  className="w-full bg-[#1b1f28] border border-white/10 rounded-xl p-3 text-white outline-none resize-none leading-relaxed"
                />
              </div>

              <div>
                <label className="block text-gray-300 font-bold mb-1">Content Body (Markdown Supported)</label>
                <textarea
                  rows={8}
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Write the full guide here..."
                  className="w-full bg-[#1b1f28] border border-white/10 focus:border-[#25D366] rounded-xl p-3 text-white outline-none font-mono text-xs leading-relaxed"
                />
              </div>

              <div className="pt-2 flex gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setIsAddOpen(false);
                    setEditingArticle(null);
                  }}
                  className="flex-1 py-2.5 rounded-xl bg-white/10 text-gray-300 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-[#25D366] hover:bg-[#1ebe5a] text-black font-extrabold"
                >
                  Publish Article
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
