import React from 'react';
import { ShieldCheck, Eye, AlertCircle, ArrowUp } from 'lucide-react';

interface FooterProps {
  onNavigateSection: (sectionId: string) => void;
  onOpenAddGroup: () => void;
  onOpenReport: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigateSection,
  onOpenAddGroup,
  onOpenReport
}) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-white/10 bg-[#0d0d0d] pt-14 pb-8 text-gray-400">
      <div className="max-w-[1200px] mx-auto px-4">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          
          {/* Brand Col */}
          <div className="md:col-span-1 space-y-4">
            <div className="text-2xl font-black text-white tracking-tight">
              Groupizo<span className="text-[#25D366]">.</span>
            </div>
            
            <p className="text-xs text-gray-400 leading-relaxed">
              A reviewed directory for public WhatsApp group invite listings. Every submission is checked before publishing. Invite status is monitored and updated when changes are detected.
            </p>

            <div className="text-xs text-gray-300">
              <strong className="text-white">Support:</strong>{' '}
              <a href="mailto:hello@groupizo.com" className="text-[#25D366] hover:underline">
                hello@groupizo.com
              </a>
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap gap-2 pt-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-[11px] font-semibold text-gray-300">
                <ShieldCheck className="w-3.5 h-3.5 text-[#25D366]" /> Reviewed Listings
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-[11px] font-semibold text-gray-300">
                <Eye className="w-3.5 h-3.5 text-[#25D366]" /> Status Monitored
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-[11px] font-semibold text-gray-300">
                <AlertCircle className="w-3.5 h-3.5 text-[#25D366]" /> Report Supported
              </span>
            </div>
          </div>

          {/* Directory Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-extrabold text-white tracking-wider uppercase">Explore</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => onNavigateSection('hero')} className="hover:text-[#25D366] transition-colors cursor-pointer">
                  Home Directory
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateSection('browse-categories')} className="hover:text-[#25D366] transition-colors cursor-pointer">
                  All Categories
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateSection('browse-countries')} className="hover:text-[#25D366] transition-colors cursor-pointer">
                  All Countries
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateSection('browse-cities')} className="hover:text-[#25D366] transition-colors cursor-pointer">
                  Local Communities
                </button>
              </li>
              <li>
                <button onClick={onOpenAddGroup} className="text-[#25D366] font-bold hover:underline cursor-pointer">
                  + Submit a Group
                </button>
              </li>
            </ul>
          </div>

          {/* About & Trust */}
          <div className="space-y-3">
            <h4 className="text-sm font-extrabold text-white tracking-wider uppercase">About &amp; Trust</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => onNavigateSection('leaderboard')} className="hover:text-[#25D366] transition-colors cursor-pointer">
                  Top Contributors Podium
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateSection('guides')} className="hover:text-[#25D366] transition-colors cursor-pointer">
                  Safety &amp; Guides
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateSection('faq')} className="hover:text-[#25D366] transition-colors cursor-pointer">
                  Editorial &amp; Review Policy
                </button>
              </li>
              <li>
                <button onClick={onOpenReport} className="text-red-400 hover:text-red-300 transition-colors cursor-pointer">
                  Report Broken Link / Spam
                </button>
              </li>
            </ul>
          </div>

          {/* Legal Cluster */}
          <div className="space-y-3">
            <h4 className="text-sm font-extrabold text-white tracking-wider uppercase">Legal &amp; Policy</h4>
            <ul className="space-y-2 text-xs">
              <li><span className="hover:text-white cursor-pointer">Terms of Service</span></li>
              <li><span className="hover:text-white cursor-pointer">Privacy Policy</span></li>
              <li><span className="hover:text-white cursor-pointer">Cookies Policy</span></li>
              <li><span className="hover:text-white cursor-pointer">Disclaimer</span></li>
              <li><span className="hover:text-white cursor-pointer">DMCA Notice</span></li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <div>
            &copy; 2026 Groupizo. All rights reserved.{' '}
            <span className="text-gray-500 block sm:inline mt-1 sm:mt-0">
              Independent curation platform. Not affiliated with WhatsApp Inc. or Meta.
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={scrollToTop}
              className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white cursor-pointer transition-colors flex items-center gap-1.5"
              title="Back to top"
            >
              <span>Back to top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
