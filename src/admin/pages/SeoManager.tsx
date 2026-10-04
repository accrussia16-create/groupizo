import React, { useState } from 'react';
import { useAdmin } from '../../context/AdminContext.tsx';
import { Search, Globe, FileCode, CheckCircle, Save, Plus, Trash2 } from 'lucide-react';

export const SeoManager: React.FC = () => {
  const { showToast } = useAdmin();

  const [siteTitle, setSiteTitle] = useState('WhatsApp Group Links Directory (1790+) | Groupizo');
  const [metaDesc, setMetaDesc] = useState('Find 2026 WhatsApp group links on Groupizo. Browse 1790+ reviewed listings across 31+ categories, 52+ countries and 54+ cities.');
  const [canonicalUrl, setCanonicalUrl] = useState('https://groupizo.com');
  const [ogImage, setOgImage] = useState('https://groupizo.com/logo.jpg');
  const [robotsTxt, setRobotsTxt] = useState("User-agent: *\nAllow: /\nDisallow: /admin/\nDisallow: /api/\n\nSitemap: https://groupizo.com/sitemap.xml");
  const [redirects, setRedirects] = useState([
    { from: '/whatsapp-groups-2024', to: '/', code: 301 },
    { from: '/pubg-pakistan', to: '/category/gaming', code: 301 },
    { from: '/crypto-signals', to: '/category/finance', code: 301 }
  ]);
  const [newFrom, setNewFrom] = useState('');
  const [newTo, setNewTo] = useState('');

  const handleSaveGlobal = (e: React.FormEvent) => {
    e.preventDefault();
    showToast('Global SEO configurations, OpenGraph meta, and canonical parameters saved.');
  };

  const handleAddRedirect = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFrom.trim() || !newTo.trim()) return;
    setRedirects([...redirects, { from: newFrom.trim(), to: newTo.trim(), code: 301 }]);
    setNewFrom('');
    setNewTo('');
    showToast('301 redirect rule added.');
  };

  const handleDeleteRedirect = (index: number) => {
    setRedirects(redirects.filter((_, i) => i !== index));
    showToast('Redirect rule removed.');
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white">Search Engine Optimization (SEO)</h1>
          <p className="text-xs text-gray-400 mt-1">
            Meta tags, Open Graph cards, structured data, canonical URLs &amp; 301 redirects
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Global Meta & Open Graph */}
        <div className="bg-[#14171d] border border-white/10 rounded-2xl p-6 shadow-xl space-y-4 text-xs">
          <div className="flex items-center justify-between pb-3 border-b border-white/10">
            <h2 className="text-base font-extrabold text-white flex items-center gap-2">
              <Globe className="w-4 h-4 text-[#25D366]" /> Global Meta Tags
            </h2>
            <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/15 px-2 py-0.5 rounded-full">
              Index / Follow
            </span>
          </div>

          <form onSubmit={handleSaveGlobal} className="space-y-3.5">
            <div>
              <label className="block text-gray-300 font-bold mb-1">Global Website Title</label>
              <input
                type="text"
                value={siteTitle}
                onChange={(e) => setSiteTitle(e.target.value)}
                className="w-full bg-[#1b1f28] border border-white/10 focus:border-[#25D366] rounded-xl px-3 py-2 text-white outline-none"
              />
            </div>

            <div>
              <label className="block text-gray-300 font-bold mb-1">Meta Description (Max 160 chars)</label>
              <textarea
                rows={3}
                value={metaDesc}
                onChange={(e) => setMetaDesc(e.target.value)}
                className="w-full bg-[#1b1f28] border border-white/10 focus:border-[#25D366] rounded-xl p-3 text-white outline-none resize-none leading-relaxed"
              />
              <span className="text-[10px] text-gray-500 font-mono mt-1 block">
                {metaDesc.length} / 160 characters
              </span>
            </div>

            <div>
              <label className="block text-gray-300 font-bold mb-1">Canonical Base URL</label>
              <input
                type="url"
                value={canonicalUrl}
                onChange={(e) => setCanonicalUrl(e.target.value)}
                className="w-full bg-[#1b1f28] border border-white/10 rounded-xl px-3 py-2 text-white outline-none font-mono"
              />
            </div>

            <div>
              <label className="block text-gray-300 font-bold mb-1">OpenGraph Social Share Image URL</label>
              <input
                type="url"
                value={ogImage}
                onChange={(e) => setOgImage(e.target.value)}
                className="w-full bg-[#1b1f28] border border-white/10 rounded-xl px-3 py-2 text-white outline-none font-mono"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 rounded-xl bg-[#25D366] hover:bg-[#1ebe5a] text-black font-extrabold text-xs cursor-pointer shadow-md"
            >
              Save Meta Configuration
            </button>
          </form>
        </div>

        {/* Robots.txt & Sitemap Status */}
        <div className="bg-[#14171d] border border-white/10 rounded-2xl p-6 shadow-xl space-y-4 text-xs">
          <div className="flex items-center justify-between pb-3 border-b border-white/10">
            <h2 className="text-base font-extrabold text-white flex items-center gap-2">
              <FileCode className="w-4 h-4 text-[#25D366]" /> Robots.txt &amp; XML Sitemap
            </h2>
            <span className="text-[10px] font-bold text-[#25D366] flex items-center gap-1">
              <CheckCircle className="w-3 h-3" /> Sitemap Generated
            </span>
          </div>

          <div>
            <label className="block text-gray-300 font-bold mb-1">Robots.txt Content</label>
            <textarea
              rows={5}
              value={robotsTxt}
              onChange={(e) => setRobotsTxt(e.target.value)}
              className="w-full bg-[#1b1f28] border border-white/10 focus:border-[#25D366] rounded-xl p-3 text-white outline-none font-mono leading-relaxed resize-none"
            />
          </div>

          <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 space-y-1">
            <div className="font-bold text-white">Automated XML Sitemap</div>
            <div className="text-gray-400 font-mono text-[11px]">https://groupizo.com/sitemap.xml</div>
            <div className="text-[10px] text-gray-500">Includes: 1,790 groups + 31 categories + 52 countries</div>
          </div>

          {/* 301 Redirects Table */}
          <div className="pt-2">
            <h3 className="font-bold text-white mb-2">Active 301 Redirect Rules</h3>
            <div className="space-y-2 mb-3">
              {redirects.map((r, i) => (
                <div key={i} className="p-2.5 rounded-lg bg-[#1b1f28] border border-white/5 flex items-center justify-between font-mono text-[11px]">
                  <div>
                    <span className="text-red-400">{r.from}</span> &rarr; <span className="text-[#25D366]">{r.to}</span>
                  </div>
                  <button
                    onClick={() => handleDeleteRedirect(i)}
                    className="text-gray-500 hover:text-red-400 cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>

            {/* Add redirect input */}
            <form onSubmit={handleAddRedirect} className="flex gap-2">
              <input
                type="text"
                value={newFrom}
                onChange={(e) => setNewFrom(e.target.value)}
                placeholder="/old-path"
                className="flex-1 bg-[#1b1f28] border border-white/10 rounded-lg px-2.5 py-1 text-white font-mono text-xs outline-none"
              />
              <input
                type="text"
                value={newTo}
                onChange={(e) => setNewTo(e.target.value)}
                placeholder="/new-path"
                className="flex-1 bg-[#1b1f28] border border-white/10 rounded-lg px-2.5 py-1 text-white font-mono text-xs outline-none"
              />
              <button
                type="submit"
                className="px-3 py-1 bg-white/10 hover:bg-white/15 text-white font-bold rounded-lg cursor-pointer"
              >
                Add Rule
              </button>
            </form>
          </div>
        </div>

      </div>

    </div>
  );
};
