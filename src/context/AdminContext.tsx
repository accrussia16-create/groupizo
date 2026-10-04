import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  AdminGroup,
  Submission,
  LinkCheckItem,
  AdminCategory,
  AdminCountry,
  AdminCity,
  AdminTag,
  GroupReport,
  AdminUser,
  AuditLogItem,
  NotificationItem,
  AdSlot,
  CmsPage,
  HomepageSectionConfig,
  AdminAppearance,
  SystemSettingsConfig,
  GroupStatus,
  LinkStatus
} from '../types/admin.ts';
import {
  INITIAL_ADMIN_GROUPS,
  INITIAL_SUBMISSIONS,
  INITIAL_LINK_CHECKS,
  INITIAL_ADMIN_CATEGORIES,
  INITIAL_ADMIN_COUNTRIES,
  INITIAL_ADMIN_CITIES,
  INITIAL_ADMIN_TAGS,
  INITIAL_REPORTS,
  INITIAL_ADMIN_USERS,
  INITIAL_AUDIT_LOGS,
  INITIAL_NOTIFICATIONS,
  INITIAL_HOMEPAGE_CONFIG,
  INITIAL_ADS,
  INITIAL_CMS_PAGES,
  INITIAL_APPEARANCE,
  INITIAL_SYSTEM_SETTINGS
} from '../data/adminMockData.ts';

interface AdminContextType {
  // Navigation & View Mode
  viewMode: 'public' | 'admin';
  setViewMode: (mode: 'public' | 'admin') => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;

  // Auth State
  isAuthenticated: boolean;
  currentUser: AdminUser | null;
  login: (email: string, pass: string, remember: boolean) => boolean;
  logout: () => void;

  // Groups
  groups: AdminGroup[];
  addGroup: (group: Partial<AdminGroup>) => void;
  updateGroup: (id: string, group: Partial<AdminGroup>) => void;
  deleteGroup: (id: string) => void;
  setGroupStatus: (id: string, status: GroupStatus) => void;
  toggleFeatureGroup: (id: string) => void;
  togglePinGroup: (id: string) => void;
  toggleVerifyGroup: (id: string) => void;

  // Submissions
  submissions: Submission[];
  addSubmission: (sub: Partial<Submission>) => void;
  approveSubmission: (id: string) => void;
  rejectSubmission: (id: string, reason: string) => void;
  deleteSubmission: (id: string) => void;

  // Link Checker
  linkChecks: LinkCheckItem[];
  runLinkCheck: (id?: string) => Promise<void>;
  isCheckingLinks: boolean;
  replaceLink: (groupId: string, newUrl: string) => void;

  // Categories, Locations, Tags
  categories: AdminCategory[];
  addCategory: (cat: Partial<AdminCategory>) => void;
  updateCategory: (id: string, cat: Partial<AdminCategory>) => void;
  deleteCategory: (id: string) => void;

  countries: AdminCountry[];
  addCountry: (country: Partial<AdminCountry>) => void;
  updateCountry: (id: string, country: Partial<AdminCountry>) => void;
  deleteCountry: (id: string) => void;

  cities: AdminCity[];
  addCity: (city: Partial<AdminCity>) => void;
  deleteCity: (id: string) => void;

  tags: AdminTag[];
  addTag: (tag: Partial<AdminTag>) => void;
  deleteTag: (id: string) => void;

  // Reports
  reports: GroupReport[];
  addReport: (report: Partial<GroupReport>) => void;
  updateReportStatus: (id: string, status: GroupReport['status'], internalNotes?: string) => void;
  deleteReport: (id: string) => void;

  // Users
  users: AdminUser[];
  updateUserStatus: (id: string, status: AdminUser['status']) => void;
  deleteUser: (id: string) => void;

  // Homepage, Appearance, CMS & Settings
  homepageConfig: HomepageSectionConfig[];
  setHomepageConfig: (cfg: HomepageSectionConfig[]) => void;
  toggleSectionEnabled: (id: string) => void;

  appearance: AdminAppearance;
  updateAppearance: (app: Partial<AdminAppearance>) => void;

  cmsPages: CmsPage[];
  updateCmsPage: (id: string, page: Partial<CmsPage>) => void;

  ads: AdSlot[];
  toggleAdSlot: (id: string) => void;

  systemSettings: SystemSettingsConfig;
  updateSystemSettings: (s: Partial<SystemSettingsConfig>) => void;

  // Notifications & Audit Log
  notifications: NotificationItem[];
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;
  auditLogs: AuditLogItem[];
  addAuditLog: (action: string, target: string, details?: string) => void;

  // Toast
  toast: string | null;
  showToast: (msg: string) => void;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const AdminProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // View mode
  const [viewMode, setViewMode] = useState<'public' | 'admin'>('public');
  const [activeTab, setActiveTab] = useState<string>('dashboard');

  // Auth
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem('grp_admin_auth') === 'true';
  });
  const [currentUser, setCurrentUser] = useState<AdminUser | null>(() => {
    const saved = localStorage.getItem('grp_admin_user');
    return saved ? JSON.parse(saved) : INITIAL_ADMIN_USERS[0];
  });

  // Groups
  const [groups, setGroups] = useState<AdminGroup[]>(() => {
    const saved = localStorage.getItem('grp_admin_groups');
    return saved ? JSON.parse(saved) : INITIAL_ADMIN_GROUPS;
  });

  // Submissions
  const [submissions, setSubmissions] = useState<Submission[]>(() => {
    const saved = localStorage.getItem('grp_admin_submissions');
    return saved ? JSON.parse(saved) : INITIAL_SUBMISSIONS;
  });

  // Link checks
  const [linkChecks, setLinkChecks] = useState<LinkCheckItem[]>(() => {
    const saved = localStorage.getItem('grp_admin_links');
    return saved ? JSON.parse(saved) : INITIAL_LINK_CHECKS;
  });
  const [isCheckingLinks, setIsCheckingLinks] = useState(false);

  // Categories
  const [categories, setCategories] = useState<AdminCategory[]>(() => {
    const saved = localStorage.getItem('grp_admin_categories');
    return saved ? JSON.parse(saved) : INITIAL_ADMIN_CATEGORIES;
  });

  // Countries & Cities
  const [countries, setCountries] = useState<AdminCountry[]>(() => {
    const saved = localStorage.getItem('grp_admin_countries');
    return saved ? JSON.parse(saved) : INITIAL_ADMIN_COUNTRIES;
  });

  const [cities, setCities] = useState<AdminCity[]>(() => {
    const saved = localStorage.getItem('grp_admin_cities');
    return saved ? JSON.parse(saved) : INITIAL_ADMIN_CITIES;
  });

  // Tags
  const [tags, setTags] = useState<AdminTag[]>(() => {
    const saved = localStorage.getItem('grp_admin_tags');
    return saved ? JSON.parse(saved) : INITIAL_ADMIN_TAGS;
  });

  // Reports
  const [reports, setReports] = useState<GroupReport[]>(() => {
    const saved = localStorage.getItem('grp_admin_reports');
    return saved ? JSON.parse(saved) : INITIAL_REPORTS;
  });

  // Users
  const [users, setUsers] = useState<AdminUser[]>(() => {
    const saved = localStorage.getItem('grp_admin_users_list');
    return saved ? JSON.parse(saved) : INITIAL_ADMIN_USERS;
  });

  // Homepage Config
  const [homepageConfig, setHomepageConfig] = useState<HomepageSectionConfig[]>(() => {
    const saved = localStorage.getItem('grp_admin_hp_cfg');
    return saved ? JSON.parse(saved) : INITIAL_HOMEPAGE_CONFIG;
  });

  // Appearance
  const [appearance, setAppearance] = useState<AdminAppearance>(() => {
    const saved = localStorage.getItem('grp_admin_appearance');
    return saved ? JSON.parse(saved) : INITIAL_APPEARANCE;
  });

  // CMS Pages
  const [cmsPages, setCmsPages] = useState<CmsPage[]>(() => {
    const saved = localStorage.getItem('grp_admin_pages');
    return saved ? JSON.parse(saved) : INITIAL_CMS_PAGES;
  });

  // Ads
  const [ads, setAds] = useState<AdSlot[]>(() => {
    const saved = localStorage.getItem('grp_admin_ads');
    return saved ? JSON.parse(saved) : INITIAL_ADS;
  });

  // System Settings
  const [systemSettings, setSystemSettings] = useState<SystemSettingsConfig>(() => {
    const saved = localStorage.getItem('grp_admin_settings');
    return saved ? JSON.parse(saved) : INITIAL_SYSTEM_SETTINGS;
  });

  // Notifications & Audit
  const [notifications, setNotifications] = useState<NotificationItem[]>(() => {
    const saved = localStorage.getItem('grp_admin_notifs');
    return saved ? JSON.parse(saved) : INITIAL_NOTIFICATIONS;
  });

  const [auditLogs, setAuditLogs] = useState<AuditLogItem[]>(() => {
    const saved = localStorage.getItem('grp_admin_audit');
    return saved ? JSON.parse(saved) : INITIAL_AUDIT_LOGS;
  });

  // Toast
  const [toast, setToast] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('grp_admin_groups', JSON.stringify(groups));
  }, [groups]);

  useEffect(() => {
    localStorage.setItem('grp_admin_submissions', JSON.stringify(submissions));
  }, [submissions]);

  useEffect(() => {
    localStorage.setItem('grp_admin_links', JSON.stringify(linkChecks));
  }, [linkChecks]);

  useEffect(() => {
    localStorage.setItem('grp_admin_categories', JSON.stringify(categories));
  }, [categories]);

  useEffect(() => {
    localStorage.setItem('grp_admin_reports', JSON.stringify(reports));
  }, [reports]);

  useEffect(() => {
    localStorage.setItem('grp_admin_hp_cfg', JSON.stringify(homepageConfig));
  }, [homepageConfig]);

  useEffect(() => {
    localStorage.setItem('grp_admin_appearance', JSON.stringify(appearance));
  }, [appearance]);

  useEffect(() => {
    localStorage.setItem('grp_admin_settings', JSON.stringify(systemSettings));
  }, [systemSettings]);

  const addAuditLog = (action: string, target: string, details?: string) => {
    const newLog: AuditLogItem = {
      id: `log-${Date.now()}`,
      adminName: currentUser?.name || 'Admin',
      adminEmail: currentUser?.email || 'admin@groupizo.com',
      action,
      target,
      details,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 16),
      ipAddress: '192.168.1.1'
    };
    setAuditLogs((prev) => [newLog, ...prev]);
  };

  // Auth handlers
  const login = (email: string, pass: string, remember: boolean): boolean => {
    // For demo purposes, accepting standard demo credentials or any non-empty password
    if (email && pass) {
      const user = INITIAL_ADMIN_USERS.find((u) => u.email.toLowerCase() === email.toLowerCase()) || {
        id: 'usr-admin',
        name: 'Lead Admin',
        email: email,
        role: 'Super Admin' as const,
        status: 'active' as const,
        submittedGroups: 420,
        reportsSubmitted: 0,
        registrationDate: '2026-01-01',
        lastLogin: new Date().toISOString().substring(0, 16)
      };

      setIsAuthenticated(true);
      setCurrentUser(user);
      if (remember) {
        localStorage.setItem('grp_admin_auth', 'true');
        localStorage.setItem('grp_admin_user', JSON.stringify(user));
      }
      addAuditLog('Admin Login', `${user.name} logged into dashboard`);
      showToast('Welcome back, Admin!');
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('grp_admin_auth');
    localStorage.removeItem('grp_admin_user');
    addAuditLog('Admin Logout', 'Logged out of admin console');
    showToast('Logged out safely.');
  };

  // Group actions
  const addGroup = (groupData: Partial<AdminGroup>) => {
    const newGrp: AdminGroup = {
      id: `grp-${Date.now()}`,
      slug: groupData.slug || `${groupData.title?.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-${Date.now()}`,
      title: groupData.title || 'New Group',
      image: groupData.image || 'https://images.unsplash.com/photo-1614680376593-902f749f7ffc?w=600&auto=format&fit=crop&q=80',
      inviteLink: groupData.inviteLink || '',
      category: groupData.category || 'General',
      categorySlug: groupData.categorySlug || 'general',
      country: groupData.country || 'Global',
      countryCode: groupData.countryCode || 'global',
      city: groupData.city,
      language: groupData.language || 'English',
      tags: groupData.tags || ['Community'],
      description: groupData.description || 'Verified WhatsApp Group.',
      status: groupData.status || 'active',
      isFeatured: !!groupData.isFeatured,
      isPinned: !!groupData.isPinned,
      isVerified: groupData.isVerified !== undefined ? groupData.isVerified : true,
      views: 0,
      joinClicks: 0,
      reportsCount: 0,
      createdAt: new Date().toISOString().substring(0, 10),
      lastChecked: 'Just now',
      linkHealth: 'ACTIVE',
      adminNotes: groupData.adminNotes
    };

    setGroups((prev) => [newGrp, ...prev]);

    // Also add to link-check registry
    setLinkChecks((prev) => [
      {
        id: `chk-${Date.now()}`,
        groupId: newGrp.id,
        groupTitle: newGrp.title,
        inviteUrl: newGrp.inviteLink,
        status: 'ACTIVE',
        lastChecked: 'Just now',
        nextCheck: 'In 12 hours',
        failuresCount: 0,
        createdAt: new Date().toISOString().substring(0, 10)
      },
      ...prev
    ]);

    addAuditLog('Created Group', newGrp.title);
    showToast(`"${newGrp.title}" added to directory.`);
  };

  const updateGroup = (id: string, updated: Partial<AdminGroup>) => {
    setGroups((prev) =>
      prev.map((g) => (g.id === id ? { ...g, ...updated } : g))
    );
    addAuditLog('Updated Group', id);
    showToast('Group updated successfully.');
  };

  const deleteGroup = (id: string) => {
    const grp = groups.find((g) => g.id === id);
    setGroups((prev) => prev.filter((g) => g.id !== id));
    setLinkChecks((prev) => prev.filter((l) => l.groupId !== id));
    addAuditLog('Deleted Group', grp?.title || id);
    showToast('Group deleted permanently.');
  };

  const setGroupStatus = (id: string, status: GroupStatus) => {
    setGroups((prev) =>
      prev.map((g) => (g.id === id ? { ...g, status } : g))
    );
    addAuditLog(`Set Group Status (${status})`, id);
    showToast(`Group status updated to ${status}.`);
  };

  const toggleFeatureGroup = (id: string) => {
    setGroups((prev) =>
      prev.map((g) => (g.id === id ? { ...g, isFeatured: !g.isFeatured } : g))
    );
    addAuditLog('Toggled Featured Status', id);
    showToast('Featured status updated.');
  };

  const togglePinGroup = (id: string) => {
    setGroups((prev) =>
      prev.map((g) => (g.id === id ? { ...g, isPinned: !g.isPinned } : g))
    );
    addAuditLog('Toggled Pinned Status', id);
    showToast('Pinned status updated.');
  };

  const toggleVerifyGroup = (id: string) => {
    setGroups((prev) =>
      prev.map((g) => (g.id === id ? { ...g, isVerified: !g.isVerified } : g))
    );
    addAuditLog('Toggled Verification Status', id);
    showToast('Verification updated.');
  };

  // Submissions
  const addSubmission = (subData: Partial<Submission>) => {
    const newSub: Submission = {
      id: `sub-${Date.now()}`,
      groupName: subData.groupName || 'New Community',
      inviteLink: subData.inviteLink || '',
      submitterName: subData.submitterName || 'Community Member',
      submitterEmail: subData.submitterEmail || 'visitor@grouphub.com',
      submitterIp: '192.168.1.1',
      category: subData.category || 'General',
      categorySlug: subData.categorySlug || 'general',
      country: subData.country || 'Global',
      countryCode: subData.countryCode || 'global',
      city: subData.city,
      submittedDate: new Date().toISOString().substring(0, 10),
      status: subData.status || 'Pending',
      description: subData.description,
      tags: subData.tags || ['Community']
    };

    setSubmissions((prev) => [newSub, ...prev]);
    addAuditLog('New Group Submission Received', newSub.groupName);

    const newNotif: NotificationItem = {
      id: `notif-${Date.now()}`,
      title: 'New Group Submission',
      message: `"${newSub.groupName}" was submitted for admin review.`,
      type: 'submission',
      timestamp: 'Just now',
      read: false
    };
    setNotifications((prev) => [newNotif, ...prev]);
    showToast(`"${newSub.groupName}" submitted for review.`);
  };

  const approveSubmission = (subId: string) => {
    const sub = submissions.find((s) => s.id === subId);
    if (!sub) return;

    // Create group from submission
    addGroup({
      title: sub.groupName,
      inviteLink: sub.inviteLink,
      category: sub.category,
      categorySlug: sub.categorySlug,
      country: sub.country,
      countryCode: sub.countryCode,
      city: sub.city,
      description: sub.description,
      tags: sub.tags,
      status: 'active'
    });

    setSubmissions((prev) =>
      prev.map((s) => (s.id === subId ? { ...s, status: 'Approved' } : s))
    );
    addAuditLog('Approved Submission', sub.groupName);
    showToast(`Approved "${sub.groupName}" & published live.`);
  };

  const rejectSubmission = (subId: string, reason: string) => {
    const sub = submissions.find((s) => s.id === subId);
    setSubmissions((prev) =>
      prev.map((s) => (s.id === subId ? { ...s, status: 'Rejected', rejectionReason: reason } : s))
    );
    addAuditLog('Rejected Submission', sub?.groupName || subId, `Reason: ${reason}`);
    showToast('Submission rejected.');
  };

  const deleteSubmission = (id: string) => {
    setSubmissions((prev) => prev.filter((s) => s.id !== id));
    showToast('Submission deleted.');
  };

  // Simulated WhatsApp link health-check service
  const runLinkCheck = async (id?: string) => {
    setIsCheckingLinks(true);
    showToast('Simulating live WhatsApp ping to chat.whatsapp.com...');

    await new Promise((r) => setTimeout(r, 1200));

    setLinkChecks((prev) =>
      prev.map((item) => {
        if (id && item.id !== id) return item;
        // Randomly simulate health statuses or keep active
        const isHealthy = Math.random() > 0.15;
        const newStatus: LinkStatus = isHealthy ? 'ACTIVE' : 'BROKEN';
        return {
          ...item,
          status: newStatus,
          lastChecked: 'Just now',
          failuresCount: isHealthy ? 0 : item.failuresCount + 1
        };
      })
    );

    setIsCheckingLinks(false);
    addAuditLog('Executed Link Health Scan', id ? `Target: ${id}` : 'Scanned All Active Invites');
    showToast('Link health check completed.');
  };

  const replaceLink = (groupId: string, newUrl: string) => {
    setGroups((prev) =>
      prev.map((g) => (g.id === groupId ? { ...g, inviteLink: newUrl, linkHealth: 'ACTIVE' } : g))
    );
    setLinkChecks((prev) =>
      prev.map((l) => (l.groupId === groupId ? { ...l, inviteUrl: newUrl, status: 'ACTIVE', failuresCount: 0 } : l))
    );
    addAuditLog('Replaced Group Invite Link', groupId, `New Link: ${newUrl}`);
    showToast('Invite link updated successfully.');
  };

  // Categories
  const addCategory = (catData: Partial<AdminCategory>) => {
    const newCat: AdminCategory = {
      id: `cat-${Date.now()}`,
      name: catData.name || 'New Category',
      slug: catData.slug || catData.name?.toLowerCase().replace(/[^a-z0-9]+/g, '-') || 'new-category',
      icon: catData.icon || '📁',
      description: catData.description || '',
      groupsCount: 0,
      isFeatured: !!catData.isFeatured,
      isHidden: false,
      order: categories.length + 1
    };
    setCategories((prev) => [...prev, newCat]);
    addAuditLog('Created Category', newCat.name);
    showToast(`Category "${newCat.name}" created.`);
  };

  const updateCategory = (id: string, updated: Partial<AdminCategory>) => {
    setCategories((prev) =>
      prev.map((c) => (c.id === id ? { ...c, ...updated } : c))
    );
    addAuditLog('Updated Category', id);
    showToast('Category updated.');
  };

  const deleteCategory = (id: string) => {
    setCategories((prev) => prev.filter((c) => c.id !== id));
    addAuditLog('Deleted Category', id);
    showToast('Category removed.');
  };

  // Countries
  const addCountry = (ctry: Partial<AdminCountry>) => {
    const newCtry: AdminCountry = {
      id: `ctry-${Date.now()}`,
      name: ctry.name || 'New Country',
      code: ctry.code || 'global',
      slug: ctry.slug || ctry.name?.toLowerCase().replace(/[^a-z0-9]+/g, '-') || 'country',
      groupsCount: 0,
      isFeatured: !!ctry.isFeatured,
      isHidden: false,
      order: countries.length + 1
    };
    setCountries((prev) => [...prev, newCtry]);
    addAuditLog('Added Country', newCtry.name);
    showToast(`Country "${newCtry.name}" added.`);
  };

  const updateCountry = (id: string, updated: Partial<AdminCountry>) => {
    setCountries((prev) =>
      prev.map((c) => (c.id === id ? { ...c, ...updated } : c))
    );
    showToast('Country updated.');
  };

  const deleteCountry = (id: string) => {
    setCountries((prev) => prev.filter((c) => c.id !== id));
    showToast('Country removed.');
  };

  // Cities
  const addCity = (city: Partial<AdminCity>) => {
    const newCity: AdminCity = {
      id: `city-${Date.now()}`,
      name: city.name || 'New City',
      slug: city.slug || city.name?.toLowerCase().replace(/[^a-z0-9]+/g, '-') || 'city',
      country: city.country || 'Global',
      countryCode: city.countryCode || 'global',
      groupsCount: 0,
      isHidden: false
    };
    setCities((prev) => [...prev, newCity]);
    addAuditLog('Added City', newCity.name);
    showToast(`City "${newCity.name}" added.`);
  };

  const deleteCity = (id: string) => {
    setCities((prev) => prev.filter((c) => c.id !== id));
    showToast('City removed.');
  };

  // Tags
  const addTag = (tag: Partial<AdminTag>) => {
    const newTag: AdminTag = {
      id: `tag-${Date.now()}`,
      name: tag.name || 'Topic',
      slug: tag.slug || tag.name?.toLowerCase().replace(/[^a-z0-9]+/g, '-') || 'tag',
      groupsCount: 0,
      popularity: 50,
      isHidden: false
    };
    setTags((prev) => [...prev, newTag]);
    showToast(`Tag "${newTag.name}" created.`);
  };

  const deleteTag = (id: string) => {
    setTags((prev) => prev.filter((t) => t.id !== id));
    showToast('Tag removed.');
  };

  // Reports
  const addReport = (reportData: Partial<GroupReport>) => {
    const newReport: GroupReport = {
      id: `rep-${Date.now()}`,
      groupId: reportData.groupId || 'general',
      groupTitle: reportData.groupTitle || 'General Group',
      groupInviteLink: reportData.groupInviteLink || '',
      reason: reportData.reason || 'Broken Link',
      reportedByEmail: reportData.reportedByEmail || 'visitor@grouphub.com',
      reportedIp: '192.168.1.1',
      details: reportData.details || 'Issue reported from public directory.',
      date: new Date().toISOString().substring(0, 10),
      status: 'Pending'
    };

    setReports((prev) => [newReport, ...prev]);

    // If groupId matches, increment report count on the group
    if (newReport.groupId && newReport.groupId !== 'general') {
      setGroups((prev) =>
        prev.map((g) =>
          g.id === newReport.groupId
            ? { ...g, reportsCount: (g.reportsCount || 0) + 1, status: (g.reportsCount || 0) >= 2 ? 'reported' : g.status }
            : g
        )
      );
    }

    addAuditLog('Group Reported', `${newReport.groupTitle} (${newReport.reason})`);

    const newNotif: NotificationItem = {
      id: `notif-${Date.now()}`,
      title: 'Group Reported',
      message: `"${newReport.groupTitle}" was reported: ${newReport.reason}`,
      type: 'report',
      timestamp: 'Just now',
      read: false
    };
    setNotifications((prev) => [newNotif, ...prev]);
    showToast('Report submitted for admin review.');
  };

  const updateReportStatus = (id: string, status: GroupReport['status'], internalNotes?: string) => {
    setReports((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status, internalNotes: internalNotes || r.internalNotes } : r))
    );
    addAuditLog(`Updated Report Status to ${status}`, id);
    showToast('Report status updated.');
  };

  const deleteReport = (id: string) => {
    setReports((prev) => prev.filter((r) => r.id !== id));
    showToast('Report dismissed.');
  };

  // Users
  const updateUserStatus = (id: string, status: AdminUser['status']) => {
    setUsers((prev) =>
      prev.map((u) => (u.id === id ? { ...u, status } : u))
    );
    addAuditLog(`Updated User Status to ${status}`, id);
    showToast(`User status set to ${status}.`);
  };

  const deleteUser = (id: string) => {
    setUsers((prev) => prev.filter((u) => u.id !== id));
    showToast('User removed.');
  };

  // Homepage sections
  const toggleSectionEnabled = (id: string) => {
    setHomepageConfig((prev) =>
      prev.map((s) => (s.id === id ? { ...s, enabled: !s.enabled } : s))
    );
    showToast('Homepage section visibility updated.');
  };

  // Appearance
  const updateAppearance = (app: Partial<AdminAppearance>) => {
    setAppearance((prev) => ({ ...prev, ...app }));
    showToast('Appearance settings saved.');
  };

  // CMS
  const updateCmsPage = (id: string, page: Partial<CmsPage>) => {
    setCmsPages((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...page, updatedAt: new Date().toISOString().substring(0, 10) } : p))
    );
    showToast('Page content saved.');
  };

  // Ads
  const toggleAdSlot = (id: string) => {
    setAds((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status: a.status === 'active' ? 'disabled' : 'active' } : a))
    );
    showToast('Ad slot updated.');
  };

  // System settings
  const updateSystemSettings = (s: Partial<SystemSettingsConfig>) => {
    setSystemSettings((prev) => ({ ...prev, ...s }));
    showToast('System configuration saved.');
  };

  // Notifications
  const markNotificationRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllNotificationsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    showToast('All notifications marked as read.');
  };

  return (
    <AdminContext.Provider
      value={{
        viewMode,
        setViewMode,
        activeTab,
        setActiveTab,
        isAuthenticated,
        currentUser,
        login,
        logout,
        groups,
        addGroup,
        updateGroup,
        deleteGroup,
        setGroupStatus,
        toggleFeatureGroup,
        togglePinGroup,
        toggleVerifyGroup,
        submissions,
        addSubmission,
        approveSubmission,
        rejectSubmission,
        deleteSubmission,
        linkChecks,
        runLinkCheck,
        isCheckingLinks,
        replaceLink,
        categories,
        addCategory,
        updateCategory,
        deleteCategory,
        countries,
        addCountry,
        updateCountry,
        deleteCountry,
        cities,
        addCity,
        deleteCity,
        tags,
        addTag,
        deleteTag,
        reports,
        addReport,
        updateReportStatus,
        deleteReport,
        users,
        updateUserStatus,
        deleteUser,
        homepageConfig,
        setHomepageConfig,
        toggleSectionEnabled,
        appearance,
        updateAppearance,
        cmsPages,
        updateCmsPage,
        ads,
        toggleAdSlot,
        systemSettings,
        updateSystemSettings,
        notifications,
        markNotificationRead,
        markAllNotificationsRead,
        auditLogs,
        addAuditLog,
        toast,
        showToast
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
};
