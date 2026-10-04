import React from 'react';
import { Search, ShieldCheck, CheckCircle2, MessageSquare, Plus } from 'lucide-react';
import { useAdmin } from '../context/AdminContext.tsx';

interface FoundersNoteProps {
  onOpenAddGroup?: () => void;
}

export const FoundersNote: React.FC<FoundersNoteProps> = ({ onOpenAddGroup }) => {
  const { appearance } = useAdmin();
  const brandName = appearance?.siteName || 'GroupHub';
  const primaryColor = appearance?.primaryColor || '#25D366';

  return (
    <div className="space-y-16 my-16">
      
      {/* ── HOW IT WORKS (3 STEPS) ── */}
      <section id="how-it-works" className="scroll-mt-24">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-[#128C7E] font-bold text-xs uppercase tracking-wider mb-2">
            <CheckCircle2 className="w-3.5 h-3.5" /> 3 Simple Steps
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-gray-950">
            How {brandName} Works
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 max-w-lg mx-auto mt-1">
            Discovering and joining genuine WhatsApp communities has never been simpler.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <div className="bg-white border border-gray-200/90 rounded-2xl p-6 shadow-xs hover:shadow-md hover:border-[#25D366] transition-all">
            <div 
              className="w-12 h-12 rounded-2xl flex items-center justify-center font-black text-black text-lg mb-4 shadow-sm"
              style={{ backgroundColor: `${primaryColor}25`, color: '#0d603a' }}
            >
              1
            </div>
            <h3 className="text-gray-900 font-extrabold text-base mb-2">Explore By Your Interests</h3>
            <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
              Search by keywords, select your favorite genre (gaming, education, business, tech), or filter by country and regional city.
            </p>
          </div>

          <div className="bg-white border border-gray-200/90 rounded-2xl p-6 shadow-xs hover:shadow-md hover:border-[#25D366] transition-all">
            <div 
              className="w-12 h-12 rounded-2xl flex items-center justify-center font-black text-black text-lg mb-4 shadow-sm"
              style={{ backgroundColor: `${primaryColor}25`, color: '#0d603a' }}
            >
              2
            </div>
            <h3 className="text-gray-900 font-extrabold text-base mb-2">Check Link &amp; Safety Rating</h3>
            <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
              Every invite link is verified for health status. View group capacity, topic tags, and review moderator checks before entering.
            </p>
          </div>

          <div className="bg-white border border-gray-200/90 rounded-2xl p-6 shadow-xs hover:shadow-md hover:border-[#25D366] transition-all">
            <div 
              className="w-12 h-12 rounded-2xl flex items-center justify-center font-black text-black text-lg mb-4 shadow-sm"
              style={{ backgroundColor: `${primaryColor}25`, color: '#0d603a' }}
            >
              3
            </div>
            <h3 className="text-gray-900 font-extrabold text-base mb-2">Join Instantly on WhatsApp</h3>
            <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
              Click &ldquo;Join Group&rdquo; and WhatsApp opens directly on your phone or desktop to the official invite screen. No registration needed.
            </p>
          </div>

        </div>
      </section>

      {/* ── CALL TO ACTION BANNER (Dark Green Accent Section) ── */}
      <section className="bg-gradient-to-r from-[#0b2114] via-[#0e2a1b] to-[#08180e] rounded-3xl p-8 sm:p-12 text-white shadow-xl relative overflow-hidden">
        <div 
          aria-hidden="true" 
          className="pointer-events-none absolute -right-20 -bottom-20 w-80 h-80 rounded-full bg-[radial-gradient(circle,rgba(37,211,102,0.15)_0%,transparent_70%)]" 
        />

        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-emerald-300 font-bold text-xs uppercase tracking-wider mb-4 border border-white/10">
            <MessageSquare className="w-3.5 h-3.5" /> Community Admins
          </div>

          <h2 className="text-2xl sm:text-4xl font-black tracking-tight mb-3">
            Do You Manage an Active WhatsApp Group?
          </h2>

          <p className="text-emerald-100/80 text-sm sm:text-base leading-relaxed mb-6">
            Get your community discovered by enthusiastic new members. Submit your invite link to our verified directory for free.
          </p>

          <button
            onClick={onOpenAddGroup}
            className="inline-flex items-center gap-2 text-black font-black text-sm px-6 py-3.5 rounded-full shadow-lg transition-transform hover:scale-105 cursor-pointer"
            style={{ backgroundColor: primaryColor }}
          >
            <Plus className="w-4 h-4 stroke-[3]" />
            <span>Submit Your Group (100% Free)</span>
          </button>
        </div>
      </section>

    </div>
  );
};
