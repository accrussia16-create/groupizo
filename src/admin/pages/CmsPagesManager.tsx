import React, { useState } from 'react';
import { useAdmin } from '../../context/AdminContext.tsx';
import { CmsPage } from '../../types/admin.ts';
import { FileText, Edit2, PlusCircle, Check, X, ExternalLink } from 'lucide-react';

export const CmsPagesManager: React.FC = () => {
  const { cmsPages, updateCmsPage } = useAdmin();

  const [editingPage, setEditingPage] = useState<CmsPage | null>(null);
  const [content, setContent] = useState('');
  const [title, setTitle] = useState('');
  const [status, setStatus] = useState<'Published' | 'Draft' | 'Unpublished'>('Published');

  const handleOpenEdit = (p: CmsPage) => {
    setEditingPage(p);
    setTitle(p.title);
    setContent(p.content);
    setStatus(p.status);
  };

  const handleSave = () => {
    if (editingPage) {
      updateCmsPage(editingPage.id, {
        title,
        content,
        status
      });
      setEditingPage(null);
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white">CMS Institutional Pages</h1>
          <p className="text-xs text-gray-400 mt-1">
            Manage legal disclosures, editorial guidelines, privacy declarations and informational pages
          </p>
        </div>
      </div>

      {/* Pages Table */}
      <div className="bg-[#14171d] border border-white/10 rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-white/10 bg-white/[0.02] text-gray-400 font-bold uppercase tracking-wider text-[10px]">
                <th className="py-3.5 px-4">Page Title</th>
                <th className="py-3.5 px-4">Route Slug</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4">Last Updated</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-white/5 text-gray-300">
              {cmsPages.map((p) => (
                <tr key={p.id} className="hover:bg-white/[0.02] transition-colors">
                  <td className="py-3 px-4 font-bold text-white">
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4 text-[#25D366]" />
                      <span>{p.title}</span>
                    </div>
                  </td>

                  <td className="py-3 px-4 font-mono text-gray-400">
                    /pages/{p.slug}
                  </td>

                  <td className="py-3 px-4">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                      {p.status}
                    </span>
                  </td>

                  <td className="py-3 px-4 font-mono text-gray-400">
                    {p.updatedAt}
                  </td>

                  <td className="py-3 px-4 text-right">
                    <button
                      onClick={() => handleOpenEdit(p)}
                      className="px-3 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-white font-bold text-xs cursor-pointer inline-flex items-center gap-1"
                    >
                      <Edit2 className="w-3 h-3" />
                      <span>Edit Content</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit Content Modal */}
      {editingPage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="bg-[#14171d] border border-white/15 rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-4">
              <h3 className="text-lg font-bold text-white">Edit CMS Page: {editingPage.title}</h3>
              <button
                onClick={() => setEditingPage(null)}
                className="p-1 rounded-md text-gray-400 hover:text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-gray-300 font-bold mb-1">Page Title</label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full bg-[#1b1f28] border border-white/10 rounded-xl px-3 py-2 text-white outline-none"
                  />
                </div>

                <div>
                  <label className="block text-gray-300 font-bold mb-1">Status</label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value as any)}
                    className="w-full bg-[#1b1f28] border border-white/10 rounded-xl px-3 py-2 text-white outline-none cursor-pointer"
                  >
                    <option value="Published">Published</option>
                    <option value="Draft">Draft</option>
                    <option value="Unpublished">Unpublished</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-gray-300 font-bold mb-1">Markdown / HTML Body</label>
                <textarea
                  rows={8}
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="w-full bg-[#1b1f28] border border-white/10 focus:border-[#25D366] rounded-xl p-3 text-white outline-none font-mono text-xs leading-relaxed"
                />
              </div>

              <div className="pt-2 flex gap-2">
                <button
                  type="button"
                  onClick={() => setEditingPage(null)}
                  className="flex-1 py-2 rounded-xl bg-white/10 text-gray-300 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSave}
                  className="flex-1 py-2 rounded-xl bg-[#25D366] text-black font-extrabold"
                >
                  Save Page
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
