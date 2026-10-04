import React, { useState } from 'react';
import { BLOG_ARTICLES } from '../data/blogData.ts';
import { BlogArticle } from '../types.ts';
import { ArrowRight, BookOpen, Clock, Calendar, X } from 'lucide-react';
import { useAdmin } from '../context/AdminContext.tsx';

export const BlogSection: React.FC = () => {
  const [activeArticle, setActiveArticle] = useState<BlogArticle | null>(null);
  const { appearance } = useAdmin();
  const brandName = appearance?.siteName || 'GroupHub';

  return (
    <section id="guides" className="scroll-mt-24 my-16">
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-[#128C7E] font-bold text-xs uppercase tracking-wider mb-2">
          <BookOpen className="w-3.5 h-3.5" /> Community Blog
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-gray-950">
          Guides, Safety &amp; WhatsApp Tips
        </h2>
        <p className="text-xs sm:text-sm text-gray-500 max-w-lg mx-auto mt-1">
          Learn how to get the most out of WhatsApp groups, maintain community safety, and grow your audience.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {BLOG_ARTICLES.map((art) => (
          <article
            key={art.slug}
            onClick={() => setActiveArticle(art)}
            className="group bg-white border border-gray-200/90 hover:border-[#25D366] rounded-2xl overflow-hidden flex flex-col transition-all duration-200 hover:-translate-y-1 hover:shadow-lg hover:shadow-gray-200/60 cursor-pointer"
          >
            <div className="aspect-video w-full overflow-hidden bg-gray-100 relative">
              <img
                src={art.coverImage}
                alt={art.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                loading="lazy"
              />
              <span className="absolute top-3 left-3 bg-black/75 backdrop-blur-xs text-[#25D366] text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-full border border-[#25D366]/30">
                {art.category}
              </span>
            </div>

            <div className="p-5 flex flex-col flex-1">
              <h3 className="text-base font-bold text-gray-900 group-hover:text-[#128C7E] line-clamp-2 mb-2 transition-colors">
                {art.title.replace('Groupizo', brandName)}
              </h3>
              
              <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed mb-4 flex-1">
                {art.excerpt}
              </p>

              <div className="pt-3 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
                <span className="flex items-center gap-1 font-mono text-[11px]">
                  <Calendar className="w-3.5 h-3.5 text-gray-400" /> {art.date}
                </span>
                <span className="text-[#128C7E] font-bold flex items-center gap-0.5 text-xs group-hover:translate-x-0.5 transition-transform">
                  Read guide <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Article Reader Modal */}
      {activeArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white border border-gray-200 rounded-3xl max-w-2xl w-full max-h-[85vh] overflow-y-auto p-6 sm:p-8 relative shadow-2xl">
            <button
              onClick={() => setActiveArticle(null)}
              className="absolute top-4 right-4 p-2 text-gray-500 hover:text-gray-900 rounded-full bg-gray-100 hover:bg-gray-200 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 text-xs font-bold text-[#128C7E] mb-2 uppercase tracking-wide">
              <span>{activeArticle.category}</span>
              <span>&middot;</span>
              <span className="flex items-center gap-1 text-gray-500">
                <Clock className="w-3.5 h-3.5" /> {activeArticle.readTime}
              </span>
            </div>

            <h2 className="text-xl sm:text-2xl font-black text-gray-950 mb-4">
              {activeArticle.title.replace('Groupizo', brandName)}
            </h2>

            <div className="w-full aspect-video rounded-2xl overflow-hidden mb-6 bg-gray-100">
              <img 
                src={activeArticle.coverImage} 
                alt={activeArticle.title} 
                className="w-full h-full object-cover" 
              />
            </div>

            <div className="text-sm sm:text-base text-gray-700 leading-relaxed space-y-4 whitespace-pre-line">
              {activeArticle.content.replace(/Groupizo/g, brandName)}
            </div>

            <div className="mt-8 pt-4 border-t border-gray-100 flex justify-end">
              <button
                onClick={() => setActiveArticle(null)}
                className="px-5 py-2 rounded-xl bg-gray-900 hover:bg-black text-white font-bold text-xs cursor-pointer"
              >
                Close Article
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
