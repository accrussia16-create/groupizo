import React, { useState } from 'react';
import { Search, Plus, Menu, X, Users, Globe, MapPin, BookOpen, HelpCircle, ChevronRight, Lock, Sparkles, MessageCircle } from 'lucide-react';
import { useAdmin } from '../context/AdminContext.tsx';

interface HeaderProps {
  onOpenSearch: () => void;
  onOpenAddGroup: () => void;
  onNavigateSection: (sectionId: string) => void;
  activeSection: string;
  onOpenAdmin?: () => void;
  onOpenReport?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenSearch,
  onOpenAddGroup,
  onNavigateSection,
  activeSection,
  onOpenAdmin,
  onOpenReport
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { appearance } = useAdmin();

  const brandName = appearance?.siteName || 'GroupHub';
  const primaryColor = appearance?.primaryColor || '#25D366';

  const handleNav = (sectionId: string) => {
    onNavigateSection(sectionId);
    setMobileMenuOpen(false);
  };

  return (
    <>
      <header className="sticky top-0 z-40 w-full h-18 bg-white/95 backdrop-blur-md border-b border-gray-200/80 shadow-xs transition-all">
        <div className="max-w-[1240px] h-full mx-auto px-4 sm:px-6 flex items-center justify-between">
          
          {/* Logo */}
          <div className="flex items-center gap-3">
            <button 
              onClick={() => handleNav('hero')}
              className="flex items-center gap-2.5 text-left focus:outline-none group cursor-pointer"
            >
              <div 
                className="w-10 h-10 rounded-2xl flex items-center justify-center shadow-md shadow-[#25D366]/25 group-hover:scale-105 transition-transform"
                style={{ backgroundColor: primaryColor }}
              >
                <MessageCircle className="w-5 h-5 text-black fill-black/20 stroke-[2.5]" />
              </div>
              <div>
                <span className="text-xl sm:text-2xl font-black tracking-tight text-gray-950 flex items-center">
                  {brandName}<span style={{ color: primaryColor }}>.</span>
                </span>
                <span className="text-[10px] text-gray-500 font-bold tracking-wider block -mt-1 uppercase">
                  Community Directory
                </span>
              </div>
            </button>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden xl:flex items-center gap-6 h-full text-sm font-semibold text-gray-700">
            <button 
              onClick={() => handleNav('group-grid-section')}
              className="hover:text-[#128C7E] transition-colors cursor-pointer py-2"
            >
              Groups
            </button>
            <button 
              onClick={() => handleNav('browse-categories')}
              className="hover:text-[#128C7E] transition-colors cursor-pointer py-2"
            >
              Categories
            </button>
            <button 
              onClick={() => handleNav('browse-countries')}
              className="hover:text-[#128C7E] transition-colors cursor-pointer py-2"
            >
              Countries
            </button>
            <button 
              onClick={() => handleNav('browse-cities')}
              className="hover:text-[#128C7E] transition-colors cursor-pointer py-2"
            >
              Cities
            </button>
            <button 
              onClick={() => handleNav('how-it-works')}
              className="hover:text-[#128C7E] transition-colors cursor-pointer py-2"
            >
              How It Works
            </button>
            <button 
              onClick={() => handleNav('guides')}
              className="hover:text-[#128C7E] transition-colors cursor-pointer py-2"
            >
              Blog
            </button>
            <button 
              onClick={() => handleNav('faq')}
              className="hover:text-[#128C7E] transition-colors cursor-pointer py-2"
            >
              FAQ
            </button>
          </nav>

          {/* Action Buttons */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            {/* Search Trigger */}
            <button 
              onClick={onOpenSearch}
              className="p-2.5 rounded-full text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors cursor-pointer"
              title="Search groups by topic, keyword, country"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Desktop Add Group Button */}
            <button 
              onClick={onOpenAddGroup}
              className="hidden sm:inline-flex items-center gap-1.5 text-black font-extrabold text-sm px-4.5 py-2.5 rounded-full transition-all shadow-md shadow-[#25D366]/20 hover:scale-[1.02] cursor-pointer"
              style={{ backgroundColor: primaryColor }}
            >
              <Plus className="w-4 h-4 stroke-[3]" />
              <span>Add Group</span>
            </button>

            {/* Admin Console Switcher */}
            {onOpenAdmin && (
              <button
                onClick={onOpenAdmin}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold text-xs border border-gray-200 transition-colors cursor-pointer"
                title="Open GroupHub Admin Console"
              >
                <Lock className="w-3.5 h-3.5 text-[#128C7E]" />
                <span className="hidden sm:inline">Admin</span>
              </button>
            )}

            {/* Mobile Add Group Icon */}
            <button 
              onClick={onOpenAddGroup}
              className="sm:hidden p-2 rounded-full text-black font-bold cursor-pointer"
              style={{ backgroundColor: primaryColor }}
              aria-label="Add Group"
            >
              <Plus className="w-5 h-5 stroke-[2.5]" />
            </button>

            {/* Mobile Hamburger */}
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 rounded-lg text-gray-700 hover:bg-gray-100 cursor-pointer"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Backdrop */}
      {mobileMenuOpen && (
        <div 
          onClick={() => setMobileMenuOpen(false)}
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs transition-opacity"
        />
      )}

      {/* Mobile Drawer */}
      <div className={`fixed top-0 right-0 z-50 w-72 h-full bg-white shadow-2xl flex flex-col transition-transform duration-300 ease-in-out ${
        mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        <div className="h-16 px-5 border-b border-gray-100 flex items-center justify-between">
          <span className="font-extrabold text-gray-900 text-base">{brandName} Navigation</span>
          <button 
            onClick={() => setMobileMenuOpen(false)}
            className="p-1 rounded-md text-gray-500 hover:text-gray-900 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4 flex-1 overflow-y-auto space-y-1 text-sm font-semibold text-gray-700">
          <button
            onClick={() => handleNav('group-grid-section')}
            className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-gray-100 text-left cursor-pointer"
          >
            <span className="flex items-center gap-2.5">
              <Users className="w-4 h-4 text-[#128C7E]" /> All Groups
            </span>
            <ChevronRight className="w-4 h-4 text-gray-400" />
          </button>

          <button
            onClick={() => handleNav('browse-categories')}
            className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-gray-100 text-left cursor-pointer"
          >
            <span className="flex items-center gap-2.5">
              <Globe className="w-4 h-4 text-[#128C7E]" /> Categories
            </span>
            <ChevronRight className="w-4 h-4 text-gray-400" />
          </button>

          <button
            onClick={() => handleNav('browse-countries')}
            className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-gray-100 text-left cursor-pointer"
          >
            <span className="flex items-center gap-2.5">
              <Globe className="w-4 h-4 text-[#128C7E]" /> Countries
            </span>
            <ChevronRight className="w-4 h-4 text-gray-400" />
          </button>

          <button
            onClick={() => handleNav('browse-cities')}
            className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-gray-100 text-left cursor-pointer"
          >
            <span className="flex items-center gap-2.5">
              <MapPin className="w-4 h-4 text-[#128C7E]" /> Regional Cities
            </span>
            <ChevronRight className="w-4 h-4 text-gray-400" />
          </button>

          <button
            onClick={() => handleNav('how-it-works')}
            className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-gray-100 text-left cursor-pointer"
          >
            <span className="flex items-center gap-2.5">
              <Sparkles className="w-4 h-4 text-[#128C7E]" /> How It Works
            </span>
            <ChevronRight className="w-4 h-4 text-gray-400" />
          </button>

          <button
            onClick={() => handleNav('guides')}
            className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-gray-100 text-left cursor-pointer"
          >
            <span className="flex items-center gap-2.5">
              <BookOpen className="w-4 h-4 text-[#128C7E]" /> Community Blog
            </span>
            <ChevronRight className="w-4 h-4 text-gray-400" />
          </button>

          <button
            onClick={() => handleNav('faq')}
            className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-gray-100 text-left cursor-pointer"
          >
            <span className="flex items-center gap-2.5">
              <HelpCircle className="w-4 h-4 text-[#128C7E]" /> Frequently Asked Questions
            </span>
            <ChevronRight className="w-4 h-4 text-gray-400" />
          </button>

          {onOpenAdmin && (
            <div className="pt-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAdmin();
                }}
                className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-900 font-bold text-left cursor-pointer border border-gray-200"
              >
                <span className="flex items-center gap-2.5">
                  <Lock className="w-4 h-4 text-[#128C7E]" /> Admin Console
                </span>
                <ChevronRight className="w-4 h-4 text-gray-500" />
              </button>
            </div>
          )}
        </div>

        <div className="p-4 border-t border-gray-100 bg-gray-50">
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenAddGroup();
            }}
            className="w-full py-3 rounded-xl text-black font-extrabold text-sm flex items-center justify-center gap-2 shadow-md cursor-pointer"
            style={{ backgroundColor: primaryColor }}
          >
            <Plus className="w-5 h-5 stroke-[2.5]" />
            SUBMIT NEW GROUP
          </button>
        </div>
      </div>
    </>
  );
};
