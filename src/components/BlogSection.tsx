import React, { useState } from 'react';
import { BLOG_ARTICLES } from '../data/blogData.ts';
import { BlogArticle } from '../types.ts';
import { ArrowRight, BookOpen, Clock, Calendar, X } from 'lucide-react';

export const BlogSection: React.FC = () => {
  const [activeArticle, setActiveArticle] = useState<BlogArticle | null>(null);

  return (
    <section id="guides" className="scroll-mt-20 my-16">
      <div className="text-center mb-10">
        <h2 className="text-2xl sm:text-3xl font-black text-white mb-2">Guides &amp; how-tos</h2>
        <p className="text-xs sm:text-sm text-gray-400 max-w-lg mx-auto">
          Simple guides on finding groups, managing your own communities, and getting more out of WhatsApp.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {BLOG_ARTICLES.map((art) => (
          <article
            key={art.slug}
            onClick={() => setActiveArticle(art)}
            className="group bg-[#1e1e1e] border border-[#2d2d2d] hover:border-[#25D366] rounded-2xl overflow-hidden flex flex-col transition-all duration-200 hover:-translate-y-1 hover:shadow-xl cursor-pointer"
          >
            <div className="aspect-video w-full overflow-hidden bg-black/40 relative">
              <img
                src={art.coverImage}
                alt={art.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 opacity-90 group-hover:opacity-100"
                loading="lazy"
              />
              <span className="absolute top-3 left-3 bg-black/75 backdrop-blur-sm text-[#25D366] text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-full border border-[#25D366]/30">
                {art.category}
              </span>
            </div>

            <div className="p-4 sm:p-5 flex flex-col flex-1">
              <h3 className="text-sm sm:text-base font-bold text-white group-hover:text-[#25D366] line-clamp-2 mb-2 transition-colors">
                {art.title}
              </h3>
              
              <p className="text-xs text-gray-400 line-clamp-2 leading-relaxed mb-4 flex-1">
                {art.excerpt}
              </p>

              <div className="pt-3 border-t border-dashed border-white/10 flex items-center justify-between text-[11px] text-gray-400">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3 h-3 text-gray-500" /> {art.date}
                </span>
                <span className="text-[#25D366] font-bold flex items-center gap-0.5">
                  Read guide <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Article Reader Modal */}
      {activeArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="bg-[#181818] border border-white/15 rounded-2xl max-w-2xl w-full max-h-[85vh] overflow-y-auto p-6 sm:p-8 relative shadow-2xl">
            <button
              onClick={() => setActiveArticle(null)}
              className="absolute top-4 right-4 p-2 text-gray-400 hover:text-white rounded-full bg-white/5 hover:bg-white/10 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 text-xs font-bold text-[#25D366] mb-2 uppercase tracking-wide">
              <span>{activeArticle.category}</span>
              <span>&middot;</span>
              <span className="flex items-center gap-1 text-gray-400">
                <Clock className="w-3 h-3" /> {activeArticle.readTime}
              </span>
            </div>

            <h2 className="text-xl sm:text-2xl font-black text-white mb-4">
              {activeArticle.title}
            </h2>

            <div className="w-full aspect-video rounded-xl overflow-hidden mb-6">
              <img 
                src={activeArticle.coverImage} 
                alt={activeArticle.title} 
                className="w-full h-full object-cover" 
              />
            </div>

            <div className="prose prose-invert max-w-none text-sm sm:text-base text-gray-300 leading-relaxed space-y-4 whitespace-pre-line">
              {activeArticle.content}
            </div>

            <div className="mt-8 pt-4 border-t border-white/10 flex justify-end">
              <button
                onClick={() => setActiveArticle(null)}
                className="px-5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-sm cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
