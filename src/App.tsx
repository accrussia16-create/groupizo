import React, { useState, useMemo, useEffect } from 'react';
import { AdminProvider, useAdmin } from './context/AdminContext.tsx';
import { Group } from './types.ts';
import { Header } from './components/Header.tsx';
import { Hero } from './components/Hero.tsx';
import { CategoryTabs } from './components/CategoryTabs.tsx';
import { GroupCard } from './components/GroupCard.tsx';
import { Leaderboard } from './components/Leaderboard.tsx';
import { BrowseSections } from './components/BrowseSections.tsx';
import { FoundersNote } from './components/FoundersNote.tsx';
import { FaqSection } from './components/FaqSection.tsx';
import { BlogSection } from './components/BlogSection.tsx';
import { TrendingTags } from './components/TrendingTags.tsx';
import { GroupDetailModal } from './components/GroupDetailModal.tsx';
import { AddGroupModal } from './components/AddGroupModal.tsx';
import { ReportModal } from './components/ReportModal.tsx';
import { AdultNoticeModal } from './components/AdultNoticeModal.tsx';
import { SearchModal } from './components/SearchModal.tsx';
import { Footer } from './components/Footer.tsx';
import { AdminDashboard } from './admin/AdminDashboard.tsx';
import { Plus, Filter, RefreshCw, CheckCircle2, Lock, Sliders, Shield } from 'lucide-react';

function PublicDirectory() {
  const {
    setViewMode,
    groups: adminGroups,
    submissions,
    addGroup,
    showToast: adminToast,
    toast,
    appearance
  } = useAdmin();

  // Convert admin groups to public Group interface
  const publicGroups: Group[] = useMemo(() => {
    return adminGroups
      .filter((g) => g.status === 'active' || g.status === 'reported')
      .map((g) => ({
        id: g.id,
        slug: g.slug,
        title: g.title,
        image: g.image,
        country: g.country,
        countryCode: g.countryCode,
        city: g.city,
        category: g.category,
        categorySlug: g.categorySlug,
        inviteLink: g.inviteLink,
        membersCount: 400 + (g.views % 600),
        maxMembers: 1024,
        isVerified: g.isVerified,
        tags: g.tags,
        description: g.description,
        addedAgo: g.createdAt
      }));
  }, [adminGroups]);

  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Modals state
  const [detailGroup, setDetailGroup] = useState<Group | null>(null);
  const [isAddGroupOpen, setIsAddGroupOpen] = useState(false);
  const [isReportOpen, setIsReportOpen] = useState(false);
  const [reportTargetGroup, setReportTargetGroup] = useState<Group | null>(null);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [isAdultNoticeOpen, setIsAdultNoticeOpen] = useState(false);

  // Adult mode
  const [adultMode, setAdultMode] = useState<boolean>(() => {
    return sessionStorage.getItem('adultMode') === 'true';
  });

  const pendingSubmissions = submissions.filter((s) => s.status === 'Pending').length;

  // Filter groups
  const filteredGroups = useMemo(() => {
    return publicGroups.filter((g) => {
      // Adult filter
      if (!adultMode && g.isAdult) return false;
      if (adultMode && !g.isAdult && selectedCategory === 'adult-only') return false;

      // Category filter
      if (selectedCategory !== 'all') {
        if (g.categorySlug.toLowerCase() !== selectedCategory.toLowerCase()) {
          return false;
        }
      }

      // Country filter
      if (selectedCountry) {
        if (g.country.toLowerCase() !== selectedCountry.toLowerCase()) {
          return false;
        }
      }

      // City filter
      if (selectedCity) {
        if (!g.city || g.city.toLowerCase() !== selectedCity.toLowerCase()) {
          return false;
        }
      }

      // Tag filter
      if (selectedTag) {
        const hasTag = g.tags.some((t) => t.toLowerCase() === selectedTag.toLowerCase());
        if (!hasTag) return false;
      }

      // Search query filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesTitle = g.title.toLowerCase().includes(q);
        const matchesCat = g.category.toLowerCase().includes(q);
        const matchesCountry = g.country.toLowerCase().includes(q);
        const matchesCity = g.city ? g.city.toLowerCase().includes(q) : false;
        const matchesTags = g.tags.some((t) => t.toLowerCase().includes(q));
        if (!matchesTitle && !matchesCat && !matchesCountry && !matchesCity && !matchesTags) {
          return false;
        }
      }

      return true;
    });
  }, [publicGroups, selectedCategory, selectedCountry, selectedCity, selectedTag, searchQuery, adultMode]);

  // Handle category selection
  const handleSelectCategory = (slug: string) => {
    setSelectedCategory(slug);
    setSelectedCountry(null);
    setSelectedCity(null);
    setSelectedTag(null);
    const gridEl = document.getElementById('group-grid-section');
    if (gridEl) {
      gridEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleSelectCountry = (country: string) => {
    setSelectedCountry(country);
    setSelectedCity(null);
    const gridEl = document.getElementById('group-grid-section');
    if (gridEl) {
      gridEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleSelectCity = (city: string) => {
    setSelectedCity(city);
    const gridEl = document.getElementById('group-grid-section');
    if (gridEl) {
      gridEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleSelectTag = (tag: string) => {
    if (selectedTag === tag) {
      setSelectedTag(null);
    } else {
      setSelectedTag(tag);
      const gridEl = document.getElementById('group-grid-section');
      if (gridEl) {
        gridEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  const handleResetFilters = () => {
    setSelectedCategory('all');
    setSelectedCountry(null);
    setSelectedCity(null);
    setSelectedTag(null);
    setSearchQuery('');
  };

  const handleAdultToggle = () => {
    if (adultMode) {
      setAdultMode(false);
      sessionStorage.removeItem('adultMode');
      adminToast('18+ mode disabled.');
    } else {
      setIsAdultNoticeOpen(true);
    }
  };

  const handleConfirmAdult = () => {
    setAdultMode(true);
    sessionStorage.setItem('adultMode', 'true');
    setIsAdultNoticeOpen(false);
    adminToast('18+ mode enabled.');
  };

  const handleAddGroup = (newGroup: Group) => {
    // Add to admin groups state
    addGroup({
      title: newGroup.title,
      inviteLink: newGroup.inviteLink,
      category: newGroup.category,
      categorySlug: newGroup.categorySlug,
      country: newGroup.country,
      countryCode: newGroup.countryCode,
      city: newGroup.city,
      description: newGroup.description,
      tags: newGroup.tags,
      status: 'active'
    });
  };

  const handleQuickJoin = (group: Group) => {
    window.open(group.inviteLink, '_blank', 'noopener,noreferrer');
    adminToast(`Opening WhatsApp to join ${group.title}...`);
  };

  const handleNavigateSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#121212] text-[#e0e0e0] flex flex-col font-sans selection:bg-[#25D366] selection:text-black">
      
      {/* Toast Alert */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#1e1e1e] border border-[#25D366] text-white px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-3 animate-fadeIn">
          <CheckCircle2 className="w-5 h-5 text-[#25D366] flex-shrink-0" />
          <span className="text-sm font-bold">{toast}</span>
        </div>
      )}

      {/* Floating Admin Switcher */}
      <div className="fixed bottom-6 left-6 z-50">
        <button
          onClick={() => setViewMode('admin')}
          className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#161a22] hover:bg-[#1f2430] border border-[#25D366]/40 hover:border-[#25D366] text-white shadow-2xl transition-all hover:scale-105 cursor-pointer group"
          title="Open Groupizo Admin Console"
        >
          <div className="w-6 h-6 rounded-full bg-[#25D366] flex items-center justify-center text-black font-black text-xs">
            ⚙️
          </div>
          <span className="text-xs font-black tracking-wide">
            Admin Console
          </span>
          {pendingSubmissions > 0 && (
            <span className="px-1.5 py-0.2 bg-amber-500 text-black text-[10px] font-black rounded-full">
              {pendingSubmissions}
            </span>
          )}
        </button>
      </div>

      {/* Header */}
      <Header
        onOpenSearch={() => setIsSearchModalOpen(true)}
        onOpenAddGroup={() => setIsAddGroupOpen(true)}
        onOpenReport={() => {
          setReportTargetGroup(null);
          setIsReportOpen(true);
        }}
        onNavigateSection={handleNavigateSection}
        activeSection="hero"
        onOpenAdmin={() => setViewMode('admin')}
      />

      {/* Hero with live Search & Stats */}
      <Hero
        searchQuery={searchQuery}
        onSearch={(q) => {
          setSearchQuery(q);
          const gridEl = document.getElementById('group-grid-section');
          if (gridEl && q.trim()) {
            gridEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }}
      />

      {/* Main Content Area */}
      <main className="max-w-[1200px] w-full mx-auto px-4 py-8 flex-1">
        
        {/* Category Filter Tabs & 18+ Toggle */}
        <CategoryTabs
          selectedCategory={selectedCategory}
          onSelectCategory={handleSelectCategory}
          adultMode={adultMode}
          onToggleAdult={handleAdultToggle}
        />

        {/* Active Filters Notification / Reset Bar */}
        {(selectedCategory !== 'all' || selectedCountry || selectedCity || selectedTag || searchQuery) && (
          <div className="mb-6 p-3 rounded-xl bg-white/[0.04] border border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-gray-400 flex items-center gap-1 font-semibold">
                <Filter className="w-3.5 h-3.5 text-[#25D366]" /> Filters:
              </span>
              {selectedCategory !== 'all' && (
                <span className="bg-[#25D366]/15 text-[#25D366] font-bold px-2.5 py-0.5 rounded-full border border-[#25D366]/30">
                  Category: {selectedCategory}
                </span>
              )}
              {selectedCountry && (
                <span className="bg-[#25D366]/15 text-[#25D366] font-bold px-2.5 py-0.5 rounded-full border border-[#25D366]/30">
                  Country: {selectedCountry}
                </span>
              )}
              {selectedCity && (
                <span className="bg-[#25D366]/15 text-[#25D366] font-bold px-2.5 py-0.5 rounded-full border border-[#25D366]/30">
                  City: {selectedCity}
                </span>
              )}
              {selectedTag && (
                <span className="bg-[#25D366]/15 text-[#25D366] font-bold px-2.5 py-0.5 rounded-full border border-[#25D366]/30">
                  Tag: #{selectedTag}
                </span>
              )}
              {searchQuery && (
                <span className="bg-[#25D366]/15 text-[#25D366] font-bold px-2.5 py-0.5 rounded-full border border-[#25D366]/30">
                  Search: &ldquo;{searchQuery}&rdquo;
                </span>
              )}
            </div>

            <button
              onClick={handleResetFilters}
              className="text-[#25D366] hover:underline flex items-center gap-1 font-bold cursor-pointer ml-auto"
            >
              <RefreshCw className="w-3 h-3" /> Reset all filters
            </button>
          </div>
        )}

        {/* Group Cards Grid Section */}
        <section id="group-grid-section" className="scroll-mt-24 mb-16">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-xl sm:text-2xl font-black text-white">
              WhatsApp Group Listings
            </h2>
            <span className="text-xs text-gray-400 font-semibold bg-white/5 border border-white/10 px-3 py-1 rounded-full">
              Showing {filteredGroups.length} {filteredGroups.length === 1 ? 'group' : 'groups'}
            </span>
          </div>

          {filteredGroups.length === 0 ? (
            <div className="py-20 text-center bg-[#1e1e1e] border border-white/5 rounded-3xl p-8 max-w-lg mx-auto">
              <div className="w-14 h-14 rounded-full bg-[#25D366]/10 text-[#25D366] flex items-center justify-center mx-auto mb-4">
                <Filter className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">No WhatsApp groups found</h3>
              <p className="text-xs sm:text-sm text-gray-400 mb-6">
                Try clearing your search query or reset your category/country filter to view more listings.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-3">
                <button
                  onClick={handleResetFilters}
                  className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs cursor-pointer transition-colors"
                >
                  Clear Filters
                </button>
                <button
                  onClick={() => setIsAddGroupOpen(true)}
                  className="px-5 py-2.5 rounded-xl bg-[#25D366] hover:bg-[#1ebe5a] text-black font-extrabold text-xs cursor-pointer transition-colors"
                >
                  + Submit This Group
                </button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3.5 sm:gap-5">
              {filteredGroups.map((group) => (
                <GroupCard
                  key={group.id}
                  group={group}
                  onOpenDetails={(g) => setDetailGroup(g)}
                  onQuickJoin={handleQuickJoin}
                  onFilterCountry={handleSelectCountry}
                  onFilterCity={handleSelectCity}
                  onFilterCategory={handleSelectCategory}
                />
              ))}
            </div>
          )}

          {/* Quick Add CTA Banner */}
          <div className="mt-12 text-center py-6 bg-gradient-to-r from-transparent via-[#182319] to-transparent border-t border-b border-[#25D366]/15">
            <p className="text-sm text-gray-300 mb-3">
              Admin of an active WhatsApp community? Get it listed in front of thousands of daily visitors.
            </p>
            <button
              onClick={() => setIsAddGroupOpen(true)}
              className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#1ebe5a] text-black font-extrabold text-sm px-6 py-2.5 rounded-full shadow-lg shadow-[#25D366]/20 transition-all hover:scale-105 cursor-pointer"
            >
              <Plus className="w-4 h-4 stroke-[3]" />
              <span>Submit Your Group (Free)</span>
            </button>
          </div>
        </section>

        {/* Contributor Leaderboard Podium */}
        <Leaderboard onOpenAddGroup={() => setIsAddGroupOpen(true)} />

        {/* Browse by Category, Country, and City */}
        <BrowseSections
          onSelectCategory={handleSelectCategory}
          onSelectCountry={handleSelectCountry}
          onSelectCity={handleSelectCity}
        />

        {/* Founder's Note (E-E-A-T) and How It Works */}
        <FoundersNote />

        {/* FAQ Accordions */}
        <FaqSection
          onOpenReport={() => {
            setReportTargetGroup(null);
            setIsReportOpen(true);
          }}
        />

        {/* Blog & Guides */}
        <BlogSection />

        {/* Trending Tags Cloud */}
        <TrendingTags
          onSelectTag={handleSelectTag}
          activeTag={selectedTag}
        />

      </main>

      {/* Global Footer */}
      <Footer
        onNavigateSection={handleNavigateSection}
        onOpenAddGroup={() => setIsAddGroupOpen(true)}
        onOpenReport={() => {
          setReportTargetGroup(null);
          setIsReportOpen(true);
        }}
      />

      {/* Modals */}
      {detailGroup && (
        <GroupDetailModal
          group={detailGroup}
          onClose={() => setDetailGroup(null)}
          onReport={(g) => {
            setReportTargetGroup(g);
            setIsReportOpen(true);
          }}
        />
      )}

      <AddGroupModal
        isOpen={isAddGroupOpen}
        onClose={() => setIsAddGroupOpen(false)}
        onAddGroup={handleAddGroup}
      />

      <ReportModal
        isOpen={isReportOpen}
        onClose={() => setIsReportOpen(false)}
        targetGroup={reportTargetGroup}
      />

      <AdultNoticeModal
        isOpen={isAdultNoticeOpen}
        onConfirm={handleConfirmAdult}
        onCancel={() => setIsAdultNoticeOpen(false)}
      />

      <SearchModal
        isOpen={isSearchModalOpen}
        onClose={() => setIsSearchModalOpen(false)}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        filteredGroups={filteredGroups}
        onSelectGroup={(g) => setDetailGroup(g)}
      />

    </div>
  );
}

function MainApp() {
  const { viewMode } = useAdmin();

  if (viewMode === 'admin') {
    return <AdminDashboard />;
  }

  return <PublicDirectory />;
}

export default function App() {
  return (
    <AdminProvider>
      <MainApp />
    </AdminProvider>
  );
}
