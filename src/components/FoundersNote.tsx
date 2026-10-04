import React from 'react';
import { Search, Bot, CheckCircle } from 'lucide-react';

export const FoundersNote: React.FC = () => {
  return (
    <div className="space-y-16 my-16">
      
      {/* ── THE ORIGIN (FOUNDER'S NOTE) ── */}
      <section className="bg-gradient-to-r from-[#19241b]/60 to-[#121212] border-l-4 border-[#25D366] rounded-r-2xl p-6 sm:p-8">
        <h2 className="text-xl sm:text-2xl font-black text-white mb-3">The Origin</h2>
        <p className="text-sm sm:text-base text-gray-200 leading-relaxed italic mb-6">
          &ldquo;I got tired of clicking WhatsApp invite links that led nowhere — dead pages, expired invites, groups at full capacity. The directories I found weren&apos;t maintaining their listings, so I started building Groupizo as a side project in early 2026. The idea is straightforward: every group gets reviewed before it goes live. After that, our system monitors invite status and updates listings when changes are detected. If a link stops working, the listing is flagged. We only look at what the admin provides — name, image, description. We do not enter groups or read any messages.&rdquo;
        </p>
        <div className="flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-full bg-[#25D366]/20 border border-[#25D366]/40 flex items-center justify-center text-xl flex-shrink-0">
            🧑‍💻
          </div>
          <div>
            <div className="font-extrabold text-white text-sm sm:text-base">Elijah, Founder</div>
            <div className="text-xs text-gray-400">
              Building Groupizo since 2026 &middot; Listings reviewed before publishing
            </div>
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="scroll-mt-20">
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-black text-white mb-2">How Groupizo works</h2>
          <p className="text-xs sm:text-sm text-gray-400 max-w-lg mx-auto">
            Here&apos;s how a group gets from someone&apos;s phone to this page and stays here only if the link keeps working.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          
          <div className="bg-[#1e1e1e] border border-[#2d2d2d] rounded-2xl p-6 hover:border-[#25D366]/40 transition-colors">
            <div className="w-12 h-12 rounded-xl bg-[#25D366]/10 text-[#25D366] flex items-center justify-center mb-4">
              <Search className="w-6 h-6 stroke-[2.5]" />
            </div>
            <h3 className="text-white font-extrabold text-base mb-2">1. Someone submits their group</h3>
            <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">
              They paste their WhatsApp invite link, pick a category and country, and add a short description. It enters our validation verification queue.
            </p>
          </div>

          <div className="bg-[#1e1e1e] border border-[#2d2d2d] rounded-2xl p-6 hover:border-[#25D366]/40 transition-colors">
            <div className="w-12 h-12 rounded-xl bg-[#25D366]/10 text-[#25D366] flex items-center justify-center mb-4">
              <Bot className="w-6 h-6 stroke-[2.5]" />
            </div>
            <h3 className="text-white font-extrabold text-base mb-2">2. We check it and publish</h3>
            <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">
              The link is checked for validity, ensuring the title and category fit. After publishing, our background checker verifies that links stay active without expiring.
            </p>
          </div>

          <div className="bg-[#1e1e1e] border border-[#2d2d2d] rounded-2xl p-6 hover:border-[#25D366]/40 transition-colors">
            <div className="w-12 h-12 rounded-xl bg-[#25D366]/10 text-[#25D366] flex items-center justify-center mb-4">
              <CheckCircle className="w-6 h-6 stroke-[2.5]" />
            </div>
            <h3 className="text-white font-extrabold text-base mb-2">3. You find and join</h3>
            <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">
              Search by topic, city, or country. Tap a group card, click &ldquo;Join Group&rdquo;, and WhatsApp opens straight to the join preview screen. No sign-up required.
            </p>
          </div>

        </div>
      </section>

    </div>
  );
};
