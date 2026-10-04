import React, { useState } from 'react';
import { Search, Plus, Menu, X, Users, Globe, MapPin, BookOpen, ShieldAlert, Award, ChevronRight, Lock } from 'lucide-react';

interface HeaderProps {
  onOpenSearch: () => void;
  onOpenAddGroup: () => void;
  onOpenReport: () => void;
  onNavigateSection: (sectionId: string) => void;
  activeSection: string;
  onOpenAdmin?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenSearch,
  onOpenAddGroup,
  onOpenReport,
  onNavigateSection,
  activeSection,
  onOpenAdmin
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNav = (sectionId: string) => {
    onNavigateSection(sectionId);
    setMobileMenuOpen(false);
  };

  return (
    <>
      <header className="sticky top-0 z-40 w-full h-16 bg-[#121212]/90 backdrop-blur-md border-b border-white/10 transition-all">
        <div className="max-w-[1200px] h-full mx-auto px-4 flex items-center justify-between">
          
          {/* Logo */}
          <div className="flex items-center gap-3">
            <button 
              onClick={() => handleNav('hero')}
              className="flex items-center gap-2.5 text-left focus:outline-none group cursor-pointer"
            >
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#128C7E] to-[#25D366] flex items-center justify-center shadow-lg shadow-[#25D366]/20 group-hover:scale-105 transition-transform">
                <svg className="w-5 h-5 text-black" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
              </div>
              <div>
                <span className="text-xl font-extrabold tracking-tight text-white flex items-center gap-1">
                  Groupizo<span className="text-[#25D366]">.</span>
                </span>
                <span className="text-[10px] text-gray-400 font-semibold tracking-wider block -mt-1 uppercase">Directory</span>
              </div>
            </button>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-7 h-full">
            <button 
              onClick={() => handleNav('hero')}
              className={`h-full border-b-2 text-sm font-semibold transition-colors cursor-pointer flex items-center ${
                activeSection === 'hero' ? 'border-[#25D366] text-white' : 'border-transparent text-gray-300 hover:text-white'
              }`}
            >
              Home
            </button>
            <button 
              onClick={() => handleNav('browse-categories')}
              className={`h-full border-b-2 text-sm font-semibold transition-colors cursor-pointer flex items-center ${
                activeSection === 'browse-categories' ? 'border-[#25D366] text-white' : 'border-transparent text-gray-300 hover:text-white'
              }`}
            >
              Categories
            </button>
            <button 
              onClick={() => handleNav('browse-countries')}
              className={`h-full border-b-2 text-sm font-semibold transition-colors cursor-pointer flex items-center ${
                activeSection === 'browse-countries' ? 'border-[#25D366] text-white' : 'border-transparent text-gray-300 hover:text-white'
              }`}
            >
              Countries
            </button>
            <button 
              onClick={() => handleNav('browse-cities')}
              className={`h-full border-b-2 text-sm font-semibold transition-colors cursor-pointer flex items-center ${
                activeSection === 'browse-cities' ? 'border-[#25D366] text-white' : 'border-transparent text-gray-300 hover:text-white'
              }`}
            >
              Cities
            </button>
            <button 
              onClick={() => handleNav('leaderboard')}
              className={`h-full border-b-2 text-sm font-semibold transition-colors cursor-pointer flex items-center ${
                activeSection === 'leaderboard' ? 'border-[#25D366] text-white' : 'border-transparent text-gray-300 hover:text-white'
              }`}
            >
              Leaderboard
            </button>
            <button 
              onClick={() => handleNav('guides')}
              className={`h-full border-b-2 text-sm font-semibold transition-colors cursor-pointer flex items-center ${
                activeSection === 'guides' ? 'border-[#25D366] text-white' : 'border-transparent text-gray-300 hover:text-white'
              }`}
            >
              Guides
            </button>
            <button 
              onClick={() => handleNav('faq')}
              className={`h-full border-b-2 text-sm font-semibold transition-colors cursor-pointer flex items-center ${
                activeSection === 'faq' ? 'border-[#25D366] text-white' : 'border-transparent text-gray-300 hover:text-white'
              }`}
            >
              FAQ
            </button>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-3">
            {/* Search Trigger */}
            <button 
              onClick={onOpenSearch}
              className="p-2 rounded-full text-gray-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              title="Search groups (by topic, country, city)"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Desktop Add Group Button */}
            <button 
              onClick={onOpenAddGroup}
              className="hidden sm:inline-flex items-center gap-1.5 bg-[#25D366] hover:bg-[#1ebe5a] text-black font-extrabold text-sm px-4 py-2 rounded-full transition-all shadow-md shadow-[#25D366]/20 hover:scale-[1.02] cursor-pointer"
            >
              <Plus className="w-4 h-4 stroke-[3]" />
              <span>+ Group</span>
            </button>

            {/* Admin Panel Button */}
            {onOpenAdmin && (
              <button
                onClick={onOpenAdmin}
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 rounded-full bg-white/5 hover:bg-white/10 text-white font-bold text-xs border border-white/10 hover:border-[#25D366] transition-colors cursor-pointer"
                title="Open Groupizo Admin Console"
              >
                <Lock className="w-3.5 h-3.5 text-[#25D366]" />
                <span>Admin</span>
              </button>
            )}

            {/* Mobile Add Group Icon */}
            <button 
              onClick={onOpenAddGroup}
              className="sm:hidden p-2 rounded-full bg-[#25D366]/15 text-[#25D366] border border-[#25D366]/30 cursor-pointer"
              aria-label="Add Group"
            >
              <Plus className="w-5 h-5 stroke-[2.5]" />
            </button>

            {/* Mobile Menu Trigger */}
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-gray-300 hover:text-white focus:outline-none cursor-pointer"
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
          className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm transition-opacity"
        />
      )}

      {/* Mobile Slide-over Drawer */}
      <div className={`fixed top-0 right-0 z-50 w-72 h-full bg-[#161616] border-l border-white/10 shadow-2xl flex flex-col transition-transform duration-300 ease-in-out ${
        mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        <div className="h-16 px-5 border-b border-white/10 flex items-center justify-between">
          <span className="font-extrabold text-white text-base">Menu</span>
          <button 
            onClick={() => setMobileMenuOpen(false)}
            className="p-1 rounded-md text-gray-400 hover:text-white cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4 flex-1 overflow-y-auto space-y-1">
          <button
            onClick={() => handleNav('hero')}
            className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-gray-300 hover:text-[#25D366] hover:bg-white/5 font-medium text-sm transition-colors text-left cursor-pointer"
          >
            <span className="flex items-center gap-2.5">
              <Users className="w-4 h-4 text-[#25D366]" /> Home Feed
            </span>
            <ChevronRight className="w-4 h-4 text-gray-500" />
          </button>
          <button
            onClick={() => handleNav('browse-categories')}
            className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-gray-300 hover:text-[#25D366] hover:bg-white/5 font-medium text-sm transition-colors text-left cursor-pointer"
          >
            <span className="flex items-center gap-2.5">
              <Globe className="w-4 h-4 text-[#25D366]" /> Categories
            </span>
            <ChevronRight className="w-4 h-4 text-gray-500" />
          </button>
          <button
            onClick={() => handleNav('browse-countries')}
            className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-gray-300 hover:text-[#25D366] hover:bg-white/5 font-medium text-sm transition-colors text-left cursor-pointer"
          >
            <span className="flex items-center gap-2.5">
              <Globe className="w-4 h-4 text-[#25D366]" /> Countries
            </span>
            <ChevronRight className="w-4 h-4 text-gray-500" />
          </button>
          <button
            onClick={() => handleNav('browse-cities')}
            className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-gray-300 hover:text-[#25D366] hover:bg-white/5 font-medium text-sm transition-colors text-left cursor-pointer"
          >
            <span className="flex items-center gap-2.5">
              <MapPin className="w-4 h-4 text-[#25D366]" /> Local Cities
            </span>
            <ChevronRight className="w-4 h-4 text-gray-500" />
          </button>
          <button
            onClick={() => handleNav('leaderboard')}
            className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-gray-300 hover:text-[#25D366] hover:bg-white/5 font-medium text-sm transition-colors text-left cursor-pointer"
          >
            <span className="flex items-center gap-2.5">
              <Award className="w-4 h-4 text-[#25D366]" /> Contributor Podium
            </span>
            <ChevronRight className="w-4 h-4 text-gray-500" />
          </button>
          <button
            onClick={() => handleNav('guides')}
            className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-gray-300 hover:text-[#25D366] hover:bg-white/5 font-medium text-sm transition-colors text-left cursor-pointer"
          >
            <span className="flex items-center gap-2.5">
              <BookOpen className="w-4 h-4 text-[#25D366]" /> Tips & Guides
            </span>
            <ChevronRight className="w-4 h-4 text-gray-500" />
          </button>
          <button
            onClick={() => handleNav('faq')}
            className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-gray-300 hover:text-[#25D366] hover:bg-white/5 font-medium text-sm transition-colors text-left cursor-pointer"
          >
            <span className="flex items-center gap-2.5">
              <ShieldAlert className="w-4 h-4 text-[#25D366]" /> Safety & FAQ
            </span>
            <ChevronRight className="w-4 h-4 text-gray-500" />
          </button>
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenReport();
            }}
            className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-gray-300 hover:text-red-400 hover:bg-red-500/10 font-medium text-sm transition-colors text-left cursor-pointer"
          >
            <span className="flex items-center gap-2.5">
              <ShieldAlert className="w-4 h-4 text-red-400" /> Report a Link
            </span>
            <ChevronRight className="w-4 h-4 text-gray-500" />
          </button>

          {onOpenAdmin && (
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAdmin();
              }}
              className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-[#25D366] hover:bg-[#25D366]/10 font-bold text-sm transition-colors text-left cursor-pointer border border-[#25D366]/20"
            >
              <span className="flex items-center gap-2.5">
                <Lock className="w-4 h-4 text-[#25D366]" /> Admin Console
              </span>
              <ChevronRight className="w-4 h-4 text-[#25D366]" />
            </button>
          )}
        </div>

        <div className="p-4 border-t border-white/10 bg-[#141414]">
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenAddGroup();
            }}
            className="w-full flex items-center justify-center gap-2 bg-[#25D366] text-black font-extrabold text-sm py-3 rounded-xl shadow-lg shadow-[#25D366]/20 cursor-pointer"
          >
            <Plus className="w-5 h-5 stroke-[2.5]" />
            SUBMIT NEW GROUP
          </button>
        </div>
      </div>
    </>
  );
};
