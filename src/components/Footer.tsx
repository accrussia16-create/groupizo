import React from 'react';
import { ShieldCheck, Eye, AlertCircle, ArrowUp, MessageCircle } from 'lucide-react';
import { useAdmin } from '../context/AdminContext.tsx';

interface FooterProps {
  onNavigateSection: (sectionId: string) => void;
  onOpenAddGroup: () => void;
  onOpenReport?: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigateSection,
  onOpenAddGroup,
  onOpenReport
}) => {
  const { appearance, setViewMode } = useAdmin();
  const brandName = appearance?.siteName || 'GroupHub';
  const primaryColor = appearance?.primaryColor || '#25D366';

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-gray-200 bg-gray-50 pt-16 pb-10 text-gray-600">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          
          {/* Brand Column */}
          <div className="md:col-span-1 space-y-4">
            <div className="flex items-center gap-2">
              <div 
                className="w-8 h-8 rounded-xl flex items-center justify-center font-black text-black shadow-xs"
                style={{ backgroundColor: primaryColor }}
              >
                <MessageCircle className="w-4 h-4 text-black fill-black/20" />
              </div>
              <span className="text-2xl font-black text-gray-950 tracking-tight">
                {brandName}<span style={{ color: primaryColor }}>.</span>
              </span>
            </div>
            
            <p className="text-xs text-gray-600 leading-relaxed">
              A curated community directory for discovering active public WhatsApp groups.
              Browse verified links across categories, countries, and regional cities.
            </p>

            <div className="text-xs text-gray-700">
              <strong className="text-gray-950">Support &amp; Inquiries:</strong><br />
              <a href="mailto:contact@grouphub.community" className="text-[#128C7E] hover:underline font-medium">
                contact@grouphub.community
              </a>
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap gap-2 pt-1">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-gray-200 text-[11px] font-semibold text-gray-700 shadow-2xs">
                <ShieldCheck className="w-3.5 h-3.5 text-[#25D366]" /> Verified Links
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-gray-200 text-[11px] font-semibold text-gray-700 shadow-2xs">
                <Eye className="w-3.5 h-3.5 text-[#25D366]" /> Health Monitored
              </span>
            </div>
          </div>

          {/* Directory Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-black text-gray-900 tracking-wider uppercase">Explore Groups</h4>
            <ul className="space-y-2 text-xs font-medium">
              <li>
                <button onClick={() => onNavigateSection('group-grid-section')} className="hover:text-[#128C7E] transition-colors cursor-pointer">
                  All WhatsApp Groups
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateSection('browse-categories')} className="hover:text-[#128C7E] transition-colors cursor-pointer">
                  Directory Categories
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateSection('browse-countries')} className="hover:text-[#128C7E] transition-colors cursor-pointer">
                  Country Hubs
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateSection('browse-cities')} className="hover:text-[#128C7E] transition-colors cursor-pointer">
                  Metropolitan Cities
                </button>
              </li>
              <li>
                <button onClick={onOpenAddGroup} className="text-[#128C7E] font-bold hover:underline cursor-pointer">
                  + Submit Your Group
                </button>
              </li>
            </ul>
          </div>

          {/* Community & Safety */}
          <div className="space-y-3">
            <h4 className="text-xs font-black text-gray-900 tracking-wider uppercase">Community &amp; Trust</h4>
            <ul className="space-y-2 text-xs font-medium">
              <li>
                <button onClick={() => onNavigateSection('how-it-works')} className="hover:text-[#128C7E] transition-colors cursor-pointer">
                  How GroupHub Works
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateSection('guides')} className="hover:text-[#128C7E] transition-colors cursor-pointer">
                  Guides &amp; WhatsApp Tips
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateSection('faq')} className="hover:text-[#128C7E] transition-colors cursor-pointer">
                  Frequently Asked Questions
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setViewMode('admin')} 
                  className="text-gray-900 font-bold hover:text-[#128C7E] transition-colors cursor-pointer flex items-center gap-1"
                >
                  <span>Admin Console</span> &rsaquo;
                </button>
              </li>
            </ul>
          </div>

          {/* Legal Disclosures */}
          <div className="space-y-3">
            <h4 className="text-xs font-black text-gray-900 tracking-wider uppercase">Legal &amp; Policy</h4>
            <ul className="space-y-2 text-xs font-medium text-gray-500">
              <li>Terms of Service</li>
              <li>Privacy Policy</li>
              <li>Community Guidelines</li>
              <li>DMCA Copyright Notice</li>
              <li>Independent Platform Disclaimer</li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-200/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <div>
            &copy; {new Date().getFullYear()} {brandName}. All rights reserved.{' '}
            <span className="text-gray-400 block sm:inline mt-1 sm:mt-0">
              Independent curation platform. Not affiliated with WhatsApp Inc. or Meta Platforms, Inc.
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={scrollToTop}
              className="px-3 py-1.5 rounded-lg bg-white hover:bg-gray-100 text-gray-700 border border-gray-200 cursor-pointer transition-colors flex items-center gap-1.5 text-xs font-semibold shadow-2xs"
            >
              <span>Back to top</span>
              <ArrowUp className="w-3.5 h-3.5 text-[#128C7E]" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
