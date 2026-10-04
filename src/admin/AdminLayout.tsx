import React, { useState } from 'react';
import { useAdmin } from '../context/AdminContext.tsx';
import {
  LayoutDashboard,
  Users2,
  FolderTree,
  Globe2,
  MapPin,
  Tag,
  ShieldAlert,
  Users,
  Star,
  LayoutTemplate,
  Palette,
  FileText,
  BookOpen,
  Search,
  BarChart3,
  Megaphone,
  Bell,
  Lock,
  UserCog,
  History,
  Database,
  Sliders,
  ExternalLink,
  LogOut,
  ChevronDown,
  ChevronRight,
  Menu,
  X,
  PlusCircle,
  Activity,
  CheckCircle,
  RefreshCw
} from 'lucide-react';

interface AdminLayoutProps {
  children: React.ReactNode;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const {
    activeTab,
    setActiveTab,
    currentUser,
    logout,
    setViewMode,
    submissions,
    reports,
    notifications,
    markNotificationRead,
    markAllNotificationsRead,
    appearance
  } = useAdmin();

  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [groupsSubmenuOpen, setGroupsSubmenuOpen] = useState(true);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const pendingSubmissionsCount = submissions.filter((s) => s.status === 'Pending').length;
  const pendingReportsCount = reports.filter((r) => r.status === 'Pending' || r.status === 'Investigating').length;
  const unreadNotifications = notifications.filter((n) => !n.read).length;

  const navigateTab = (tab: string) => {
    setActiveTab(tab);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard className="w-4 h-4" /> },
    {
      id: 'groups-menu',
      label: 'Groups',
      icon: <Users2 className="w-4 h-4" />,
      hasSubmenu: true,
      isOpen: groupsSubmenuOpen,
      toggle: () => setGroupsSubmenuOpen(!groupsSubmenuOpen),
      subItems: [
        { id: 'groups-all', label: 'All Groups' },
        { id: 'groups-pending', label: 'Pending Moderation' },
        { id: 'groups-featured', label: 'Featured & Pinned' },
        { id: 'groups-reported', label: 'Reported Groups' },
        { id: 'groups-expired', label: 'Expired / Dead' },
        { id: 'groups-new', label: '+ Add New Group' }
      ]
    },
    {
      id: 'submissions',
      label: 'Submissions',
      icon: <PlusCircle className="w-4 h-4" />,
      badge: pendingSubmissionsCount > 0 ? pendingSubmissionsCount : undefined,
      badgeColor: 'bg-amber-500'
    },
    { id: 'link-checker', label: 'Link Health Checker', icon: <Activity className="w-4 h-4" /> },
    { id: 'categories', label: 'Categories', icon: <FolderTree className="w-4 h-4" /> },
    { id: 'locations', label: 'Countries & Cities', icon: <Globe2 className="w-4 h-4" /> },
    { id: 'tags', label: 'Tags / Topics', icon: <Tag className="w-4 h-4" /> },
    {
      id: 'reports',
      label: 'Reports & Safety',
      icon: <ShieldAlert className="w-4 h-4" />,
      badge: pendingReportsCount > 0 ? pendingReportsCount : undefined,
      badgeColor: 'bg-red-500'
    },
    { id: 'users', label: 'User Accounts', icon: <Users className="w-4 h-4" /> },
    { id: 'featured', label: 'Featured Manager', icon: <Star className="w-4 h-4" /> },
    { id: 'homepage', label: 'Homepage Builder', icon: <LayoutTemplate className="w-4 h-4" /> },
    { id: 'appearance', label: 'Website Appearance', icon: <Palette className="w-4 h-4" /> },
    { id: 'pages', label: 'CMS Pages', icon: <FileText className="w-4 h-4" /> },
    { id: 'blog', label: 'Blog & Guides', icon: <BookOpen className="w-4 h-4" /> },
    { id: 'seo', label: 'SEO & Meta Tags', icon: <Search className="w-4 h-4" /> },
    { id: 'analytics', label: 'Traffic Analytics', icon: <BarChart3 className="w-4 h-4" /> },
    { id: 'ads', label: 'Ad Placements', icon: <Megaphone className="w-4 h-4" /> },
    { id: 'security', label: 'Security & Sessions', icon: <Lock className="w-4 h-4" /> },
    { id: 'roles', label: 'Admin Roles', icon: <UserCog className="w-4 h-4" /> },
    { id: 'activity', label: 'Activity Audit Log', icon: <History className="w-4 h-4" /> },
    { id: 'backup', label: 'Backup / Database', icon: <Database className="w-4 h-4" /> },
    { id: 'settings', label: 'System Settings', icon: <Sliders className="w-4 h-4" /> }
  ];

  const primaryGreen = appearance?.primaryColor || '#25D366';

  return (
    <div className={`min-h-screen ${appearance?.theme === 'light' ? 'bg-[#f4f6f8] text-[#1c1e21]' : 'bg-[#0f1115] text-[#e0e2ec]'} flex`}>
      
      {/* ── DESKTOP SIDEBAR ── */}
      <aside
        className={`hidden lg:flex flex-col border-r ${
          appearance?.theme === 'light' ? 'bg-white border-gray-200' : 'bg-[#14171d] border-white/10'
        } transition-all duration-300 z-30 sticky top-0 h-screen ${
          sidebarCollapsed ? 'w-20' : 'w-64'
        }`}
      >
        {/* Brand Bar */}
        <div className="h-16 px-4 border-b border-white/10 flex items-center justify-between">
          {!sidebarCollapsed ? (
            <div className="flex items-center gap-2.5">
              <div 
                className="w-8 h-8 rounded-lg flex items-center justify-center font-black text-black shadow-md"
                style={{ backgroundColor: primaryGreen }}
              >
                G
              </div>
              <div>
                <span className="font-extrabold text-base tracking-tight text-white flex items-center gap-0.5">
                  Groupizo<span style={{ color: primaryGreen }}>.</span>
                </span>
                <span className="text-[10px] font-bold text-gray-400 tracking-wider block -mt-1 uppercase">Admin Console</span>
              </div>
            </div>
          ) : (
            <div 
              className="w-8 h-8 mx-auto rounded-lg flex items-center justify-center font-black text-black shadow-md"
              style={{ backgroundColor: primaryGreen }}
            >
              G
            </div>
          )}

          <button
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
            title={sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            <Menu className="w-4 h-4" />
          </button>
        </div>

        {/* Sidebar Navigation */}
        <div className="flex-1 overflow-y-auto no-scrollbar py-4 px-3 space-y-1">
          {navItems.map((item) => {
            if (item.hasSubmenu) {
              const isSubActive = item.subItems?.some((sub) => sub.id === activeTab);
              return (
                <div key={item.id} className="space-y-1">
                  <button
                    onClick={item.toggle}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                      isSubActive
                        ? 'text-white bg-white/5'
                        : 'text-gray-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <span style={{ color: isSubActive ? primaryGreen : undefined }}>{item.icon}</span>
                      {!sidebarCollapsed && <span>{item.label}</span>}
                    </div>
                    {!sidebarCollapsed && (
                      <ChevronDown
                        className={`w-3.5 h-3.5 text-gray-400 transition-transform ${
                          item.isOpen ? 'rotate-180' : ''
                        }`}
                      />
                    )}
                  </button>

                  {item.isOpen && !sidebarCollapsed && (
                    <div className="pl-8 pr-1 space-y-1">
                      {item.subItems?.map((sub) => (
                        <button
                          key={sub.id}
                          onClick={() => navigateTab(sub.id)}
                          className={`w-full text-left px-2.5 py-1.5 rounded-lg text-[11px] font-medium transition-colors cursor-pointer flex items-center justify-between ${
                            activeTab === sub.id
                              ? 'text-black font-extrabold shadow-sm'
                              : 'text-gray-400 hover:text-white hover:bg-white/5'
                          }`}
                          style={{
                            backgroundColor: activeTab === sub.id ? primaryGreen : 'transparent'
                          }}
                        >
                          <span>{sub.label}</span>
                          {activeTab === sub.id && <ChevronRight className="w-3 h-3 text-black stroke-[3]" />}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              );
            }

            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => navigateTab(item.id)}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  isActive
                    ? 'text-black font-extrabold shadow-sm'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
                style={{
                  backgroundColor: isActive ? primaryGreen : 'transparent'
                }}
                title={sidebarCollapsed ? item.label : undefined}
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <span style={{ color: isActive ? '#000' : undefined }}>{item.icon}</span>
                  {!sidebarCollapsed && <span className="truncate">{item.label}</span>}
                </div>

                {!sidebarCollapsed && item.badge && (
                  <span className={`text-[10px] text-white font-black px-1.5 py-0.5 rounded-full ${item.badgeColor || 'bg-red-500'}`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Sidebar Footer */}
        <div className="p-3 border-t border-white/10 bg-black/20">
          <button
            onClick={() => setViewMode('public')}
            className="w-full flex items-center gap-2 px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-bold text-gray-300 hover:text-white transition-colors cursor-pointer"
          >
            <ExternalLink className="w-4 h-4 text-[#25D366]" />
            {!sidebarCollapsed && <span>View Public Directory</span>}
          </button>
        </div>
      </aside>

      {/* ── MOBILE DRAWER ── */}
      {mobileMenuOpen && (
        <div 
          onClick={() => setMobileMenuOpen(false)}
          className="lg:hidden fixed inset-0 z-40 bg-black/80 backdrop-blur-sm"
        />
      )}

      <div
        className={`lg:hidden fixed top-0 left-0 z-50 w-72 h-full bg-[#14171d] border-r border-white/10 shadow-2xl flex flex-col transition-transform duration-300 ${
          mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="h-16 px-5 border-b border-white/10 flex items-center justify-between">
          <span className="font-extrabold text-white text-base">Admin Navigation</span>
          <button 
            onClick={() => setMobileMenuOpen(false)}
            className="p-1 rounded-md text-gray-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-3 space-y-1">
          {navItems.map((item) => {
            if (item.hasSubmenu) {
              return (
                <div key={item.id} className="space-y-1">
                  <div className="px-3 py-2 text-xs font-extrabold text-gray-400 uppercase tracking-wider">
                    {item.label}
                  </div>
                  {item.subItems?.map((sub) => (
                    <button
                      key={sub.id}
                      onClick={() => navigateTab(sub.id)}
                      className={`w-full text-left px-3 py-2 rounded-lg text-xs font-medium cursor-pointer ${
                        activeTab === sub.id
                          ? 'bg-[#25D366] text-black font-extrabold'
                          : 'text-gray-300 hover:bg-white/5'
                      }`}
                    >
                      {sub.label}
                    </button>
                  ))}
                </div>
              );
            }

            return (
              <button
                key={item.id}
                onClick={() => navigateTab(item.id)}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-medium cursor-pointer ${
                  activeTab === item.id
                    ? 'bg-[#25D366] text-black font-extrabold'
                    : 'text-gray-300 hover:bg-white/5'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  {item.icon}
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className="text-[10px] bg-red-500 text-white font-bold px-1.5 py-0.5 rounded-full">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        <div className="p-4 border-t border-white/10 bg-black/40">
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              setViewMode('public');
            }}
            className="w-full py-2.5 rounded-xl bg-[#25D366] text-black font-bold text-xs flex items-center justify-center gap-2"
          >
            <ExternalLink className="w-4 h-4" />
            <span>Open Public Website</span>
          </button>
        </div>
      </div>

      {/* ── MAIN CONTENT WRAPPER ── */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* Top Header Bar */}
        <header className="h-16 sticky top-0 z-20 bg-[#14171d]/90 backdrop-blur-md border-b border-white/10 px-4 sm:px-6 flex items-center justify-between">
          
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden p-2 text-gray-400 hover:text-white rounded-lg cursor-pointer"
            >
              <Menu className="w-5 h-5" />
            </button>

            {/* Quick status pill */}
            <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs">
              <span className="w-2 h-2 rounded-full bg-[#25D366] animate-pulse" />
              <span className="text-gray-300">Live Production Mode</span>
            </div>
          </div>

          {/* Right Header Actions */}
          <div className="flex items-center gap-2.5 sm:gap-4">
            
            {/* View Public Website Button */}
            <button
              onClick={() => setViewMode('public')}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-bold text-gray-200 hover:text-[#25D366] transition-all cursor-pointer"
              title="Open public directory view"
            >
              <ExternalLink className="w-3.5 h-3.5 text-[#25D366]" />
              <span className="hidden sm:inline">View Website</span>
            </button>

            {/* Notifications Popover Trigger */}
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="p-2 rounded-xl text-gray-400 hover:text-white hover:bg-white/5 relative cursor-pointer"
                aria-label="Notifications"
              >
                <Bell className="w-4 h-4" />
                {unreadNotifications > 0 && (
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#25D366]" />
                )}
              </button>

              {showNotifications && (
                <div 
                  className="absolute right-0 mt-2 w-80 sm:w-96 bg-[#1a1e26] border border-white/15 rounded-2xl shadow-2xl p-4 z-50 animate-fadeIn"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="flex items-center justify-between pb-3 border-b border-white/10">
                    <span className="text-xs font-black text-white">Notifications ({unreadNotifications})</span>
                    <button
                      onClick={markAllNotificationsRead}
                      className="text-[11px] text-[#25D366] hover:underline cursor-pointer"
                    >
                      Mark all read
                    </button>
                  </div>
                  
                  <div className="divide-y divide-white/5 max-h-64 overflow-y-auto no-scrollbar py-1">
                    {notifications.map((n) => (
                      <div
                        key={n.id}
                        onClick={() => markNotificationRead(n.id)}
                        className={`p-2.5 text-xs rounded-lg transition-colors cursor-pointer ${
                          n.read ? 'opacity-60' : 'bg-white/5'
                        }`}
                      >
                        <div className="font-bold text-white mb-0.5">{n.title}</div>
                        <div className="text-gray-400 text-[11px] leading-snug">{n.message}</div>
                        <div className="text-[10px] text-gray-500 mt-1">{n.timestamp}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Profile Dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-white/5 transition-colors cursor-pointer"
              >
                <img
                  src={currentUser?.avatar || 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=100&auto=format&fit=crop&q=80'}
                  alt={currentUser?.name}
                  className="w-7 h-7 rounded-lg object-cover border border-white/20"
                />
                <span className="hidden md:inline text-xs font-bold text-white">{currentUser?.name}</span>
                <ChevronDown className="w-3 h-3 text-gray-400 hidden md:inline" />
              </button>

              {showProfileMenu && (
                <div 
                  className="absolute right-0 mt-2 w-52 bg-[#1a1e26] border border-white/15 rounded-2xl shadow-2xl py-2 z-50 animate-fadeIn text-xs"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="px-4 py-2 border-b border-white/10">
                    <div className="font-bold text-white">{currentUser?.name}</div>
                    <div className="text-[11px] text-gray-400">{currentUser?.email}</div>
                    <div className="text-[10px] text-[#25D366] font-semibold mt-0.5">{currentUser?.role}</div>
                  </div>

                  <button
                    onClick={() => {
                      setShowProfileMenu(false);
                      navigateTab('security');
                    }}
                    className="w-full text-left px-4 py-2 text-gray-300 hover:text-white hover:bg-white/5 cursor-pointer flex items-center gap-2"
                  >
                    <Lock className="w-3.5 h-3.5" /> Security &amp; Password
                  </button>

                  <button
                    onClick={() => {
                      setShowProfileMenu(false);
                      navigateTab('settings');
                    }}
                    className="w-full text-left px-4 py-2 text-gray-300 hover:text-white hover:bg-white/5 cursor-pointer flex items-center gap-2"
                  >
                    <Sliders className="w-3.5 h-3.5" /> System Settings
                  </button>

                  <div className="border-t border-white/10 my-1" />

                  <button
                    onClick={() => {
                      setShowProfileMenu(false);
                      logout();
                    }}
                    className="w-full text-left px-4 py-2 text-red-400 hover:bg-red-500/10 cursor-pointer flex items-center gap-2 font-bold"
                  >
                    <LogOut className="w-3.5 h-3.5" /> Logout Session
                  </button>
                </div>
              )}
            </div>

          </div>

        </header>

        {/* Page Content */}
        <main className="p-4 sm:p-6 lg:p-8 flex-1">
          {children}
        </main>

      </div>
    </div>
  );
};
