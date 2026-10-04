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
  SystemSettingsConfig
} from '../types/admin.ts';

export const INITIAL_ADMIN_GROUPS: AdminGroup[] = [
  {
    id: 'grp-101',
    slug: 'pakistan-pubg-gamers-gaming',
    title: 'Pakistan PUBG Gamers Official',
    image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=600&auto=format&fit=crop&q=80',
    inviteLink: 'https://chat.whatsapp.com/J8KLmNeopQR91823S',
    category: 'Gaming',
    categorySlug: 'gaming',
    country: 'Pakistan',
    countryCode: 'pk',
    city: 'Lahore',
    language: 'Urdu / English',
    tags: ['PUBG', 'Tournaments', 'Custom Rooms'],
    description: 'Premier competitive PUBG Mobile squad and custom rooms in Pakistan. Strict fair play rules.',
    status: 'active',
    isFeatured: true,
    isPinned: true,
    isVerified: true,
    views: 14820,
    joinClicks: 4210,
    reportsCount: 0,
    createdAt: '2026-09-12',
    lastChecked: '2026-10-04 09:30',
    linkHealth: 'ACTIVE',
    adminNotes: 'Verified community leader. Official scrim organizer.'
  },
  {
    id: 'grp-102',
    slug: 'indian-students-hub-education',
    title: 'Indian Students & UPSC Hub 📚',
    image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=600&auto=format&fit=crop&q=80',
    inviteLink: 'https://chat.whatsapp.com/G8910Ka01La92Ka0',
    category: 'Education',
    categorySlug: 'education',
    country: 'India',
    countryCode: 'in',
    city: 'Delhi',
    language: 'Hindi / English',
    tags: ['UPSC', 'Current Affairs', 'Notes'],
    description: 'Study group for competitive exams in India. Daily PDFs, quizzes, and editorial analyses.',
    status: 'active',
    isFeatured: true,
    isPinned: false,
    isVerified: true,
    views: 22400,
    joinClicks: 7850,
    reportsCount: 1,
    createdAt: '2026-08-20',
    lastChecked: '2026-10-04 08:15',
    linkHealth: 'ACTIVE',
    adminNotes: 'High engagement educational group with zero spam policy.'
  },
  {
    id: 'grp-103',
    slug: 'nigeria-business-network',
    title: 'Nigeria Business & SME Network 🇳🇬',
    image: 'https://images.unsplash.com/photo-1556742049-0a67c5574f73?w=600&auto=format&fit=crop&q=80',
    inviteLink: 'https://chat.whatsapp.com/N7819La01Ka109Ka',
    category: 'Business',
    categorySlug: 'business',
    country: 'Nigeria',
    countryCode: 'ng',
    city: 'Lagos',
    language: 'English',
    tags: ['Business', 'SME', 'Imports', 'Lagos'],
    description: 'Lagos entrepreneurs, merchants, tech founders, and wholesale importers networking group.',
    status: 'active',
    isFeatured: true,
    isPinned: false,
    isVerified: true,
    views: 11950,
    joinClicks: 3410,
    reportsCount: 0,
    createdAt: '2026-09-01',
    lastChecked: '2026-10-03 22:10',
    linkHealth: 'ACTIVE',
    adminNotes: 'Verified Lagos Chamber of Commerce members.'
  },
  {
    id: 'grp-104',
    slug: 'developers-community-tech',
    title: 'Fullstack Devs & AI Engineers',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&auto=format&fit=crop&q=80',
    inviteLink: 'https://chat.whatsapp.com/M891Ka01Ka1928Kl',
    category: 'Technology',
    categorySlug: 'technology',
    country: 'International',
    countryCode: 'global',
    language: 'English',
    tags: ['Coding', 'React', 'TypeScript', 'AI'],
    description: 'Technical community of senior software engineers, open-source devs, and AI builders.',
    status: 'active',
    isFeatured: false,
    isPinned: false,
    isVerified: true,
    views: 18700,
    joinClicks: 5290,
    reportsCount: 0,
    createdAt: '2026-07-15',
    lastChecked: '2026-10-04 10:00',
    linkHealth: 'ACTIVE',
    adminNotes: 'Admin-curated developer community.'
  },
  {
    id: 'grp-105',
    slug: 'uk-jobs-and-careers',
    title: 'UK Jobs & Tech Careers 🇬🇧',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&auto=format&fit=crop&q=80',
    inviteLink: 'https://chat.whatsapp.com/J7819LaPq019Ka92',
    category: 'Jobs',
    categorySlug: 'jobs',
    country: 'United Kingdom',
    countryCode: 'gb',
    city: 'London',
    language: 'English',
    tags: ['UK Jobs', 'Visa Sponsorship', 'London'],
    description: 'Daily verified UK job alerts, tier 2 visa sponsorship leads, and career counseling.',
    status: 'active',
    isFeatured: false,
    isPinned: false,
    isVerified: true,
    views: 9400,
    joinClicks: 2840,
    reportsCount: 0,
    createdAt: '2026-09-18',
    lastChecked: '2026-10-04 07:45',
    linkHealth: 'ACTIVE',
    adminNotes: 'Direct recruiter alerts only.'
  },
  {
    id: 'grp-106',
    slug: 'quick-earn-crypto-reported',
    title: 'Quick 100x Crypto Signals [SUSPICIOUS]',
    image: 'https://images.unsplash.com/photo-1621416894569-0f39ed31d247?w=600&auto=format&fit=crop&q=80',
    inviteLink: 'https://chat.whatsapp.com/C992La81kLz01KqP',
    category: 'Finance',
    categorySlug: 'finance',
    country: 'Global',
    countryCode: 'global',
    language: 'English',
    tags: ['Crypto', 'Signals'],
    description: 'Guaranteed 20% daily returns on token trading.',
    status: 'reported',
    isFeatured: false,
    isPinned: false,
    isVerified: false,
    views: 4500,
    joinClicks: 820,
    reportsCount: 14,
    createdAt: '2026-09-25',
    lastChecked: '2026-10-03 14:00',
    linkHealth: 'ACTIVE',
    adminNotes: 'FLAGGED: 14 users reported financial fraud and scam investment scheme.'
  },
  {
    id: 'grp-107',
    slug: 'hyderabad-deals-expired',
    title: 'Hyderabad Flash Deals 2025',
    image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=600&auto=format&fit=crop&q=80',
    inviteLink: 'https://chat.whatsapp.com/H189KlaZ9101LqAb',
    category: 'Shopping',
    categorySlug: 'shopping',
    country: 'India',
    countryCode: 'in',
    city: 'Hyderabad',
    language: 'Telugu / Hindi',
    tags: ['Deals', 'Shopping'],
    description: 'Seasonal discounts and coupon codes for electronics in Hyderabad.',
    status: 'expired',
    isFeatured: false,
    isPinned: false,
    isVerified: false,
    views: 6100,
    joinClicks: 1400,
    reportsCount: 3,
    createdAt: '2025-11-10',
    lastChecked: '2026-10-04 02:00',
    linkHealth: 'REVOKED',
    adminNotes: 'Admin reset the link. Status returned revoked (410 Gone).'
  },
  {
    id: 'grp-108',
    slug: 'dubai-real-estate-investors-pending',
    title: 'Dubai Real Estate & Off-Plan 🏙️',
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=600&auto=format&fit=crop&q=80',
    inviteLink: 'https://chat.whatsapp.com/D9810LaKa0192Ka0',
    category: 'Business',
    categorySlug: 'business',
    country: 'United Arab Emirates',
    countryCode: 'ae',
    city: 'Dubai',
    language: 'Arabic / English',
    tags: ['Real Estate', 'Dubai', 'Luxury'],
    description: 'Official broker listings, launch presentations, and luxury villa off-plan developments.',
    status: 'pending',
    isFeatured: false,
    isPinned: false,
    isVerified: false,
    views: 0,
    joinClicks: 0,
    reportsCount: 0,
    createdAt: '2026-10-04 09:12',
    lastChecked: '2026-10-04 09:12',
    linkHealth: 'PENDING CHECK',
    adminNotes: 'Submitted 2 hours ago. Awaiting moderation.'
  },
  {
    id: 'grp-109',
    slug: 'friends-chat-pakistan',
    title: 'Friends Chat Pakistan 🇵🇰',
    image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=600&auto=format&fit=crop&q=80',
    inviteLink: 'https://chat.whatsapp.com/F810Ka0192LaPk01',
    category: 'Friendship',
    categorySlug: 'friendship',
    country: 'Pakistan',
    countryCode: 'pk',
    city: 'Karachi',
    language: 'Urdu',
    tags: ['Friendship', 'Karachi', 'Dosti'],
    description: 'A relaxed friendship community for genuine conversation and good company.',
    status: 'active',
    isFeatured: false,
    isPinned: false,
    isVerified: true,
    views: 8900,
    joinClicks: 2150,
    reportsCount: 0,
    createdAt: '2026-09-05',
    lastChecked: '2026-10-04 06:15',
    linkHealth: 'ACTIVE'
  }
];

export const INITIAL_SUBMISSIONS: Submission[] = [
  {
    id: 'sub-201',
    groupName: 'Dubai Real Estate & Off-Plan 🏙️',
    inviteLink: 'https://chat.whatsapp.com/D9810LaKa0192Ka0',
    submitterName: 'Karim Al-Hassan',
    submitterEmail: 'karim.properties@dubai.ae',
    submitterIp: '194.170.82.14',
    category: 'Business',
    categorySlug: 'business',
    country: 'United Arab Emirates',
    countryCode: 'ae',
    city: 'Dubai',
    description: 'Official broker listings, launch presentations, and luxury villa off-plan developments.',
    tags: ['Real Estate', 'Dubai', 'Luxury'],
    submittedDate: '2026-10-04 09:12',
    status: 'Pending'
  },
  {
    id: 'sub-202',
    groupName: 'German Language B1 Practice Group',
    inviteLink: 'https://chat.whatsapp.com/G8912La91Ka019Ka',
    submitterName: 'Anna Schmidt',
    submitterEmail: 'anna.schmidt@berlin.de',
    submitterIp: '85.214.132.55',
    category: 'Education',
    categorySlug: 'education',
    country: 'Germany',
    countryCode: 'de',
    city: 'Berlin',
    description: 'Daily speaking practice and grammar exercises for Goethe-Zertifikat B1 aspirants.',
    tags: ['German', 'Language', 'Goethe'],
    submittedDate: '2026-10-04 07:40',
    status: 'Pending'
  },
  {
    id: 'sub-203',
    groupName: 'Free Casino Chips Hack 2026',
    inviteLink: 'https://chat.whatsapp.com/H8912Kla9012Ka81',
    submitterName: 'SpamBot99',
    submitterEmail: 'spammer@tempmail.ninja',
    submitterIp: '45.155.205.23',
    category: 'Gaming',
    categorySlug: 'gaming',
    country: 'Global',
    countryCode: 'global',
    description: 'Click to receive unlimited chips on online slots.',
    tags: ['Casino', 'Hacks'],
    submittedDate: '2026-10-03 23:10',
    status: 'Rejected',
    rejectionReason: 'Violates terms: Phishing/Casino referral spam.'
  }
];

export const INITIAL_LINK_CHECKS: LinkCheckItem[] = [
  {
    id: 'chk-1',
    groupId: 'grp-101',
    groupTitle: 'Pakistan PUBG Gamers Official',
    inviteUrl: 'https://chat.whatsapp.com/J8KLmNeopQR91823S',
    status: 'ACTIVE',
    lastChecked: '2026-10-04 09:30',
    nextCheck: '2026-10-04 21:30',
    failuresCount: 0,
    statusCode: 200,
    createdAt: '2026-09-12'
  },
  {
    id: 'chk-2',
    groupId: 'grp-102',
    groupTitle: 'Indian Students & UPSC Hub 📚',
    inviteUrl: 'https://chat.whatsapp.com/G8910Ka01La92Ka0',
    status: 'ACTIVE',
    lastChecked: '2026-10-04 08:15',
    nextCheck: '2026-10-04 20:15',
    failuresCount: 0,
    statusCode: 200,
    createdAt: '2026-08-20'
  },
  {
    id: 'chk-3',
    groupId: 'grp-107',
    groupTitle: 'Hyderabad Flash Deals 2025',
    inviteUrl: 'https://chat.whatsapp.com/H189KlaZ9101LqAb',
    status: 'REVOKED',
    lastChecked: '2026-10-04 02:00',
    nextCheck: 'Manual Attention Required',
    failuresCount: 5,
    statusCode: 410,
    createdAt: '2025-11-10'
  },
  {
    id: 'chk-4',
    groupId: 'grp-106',
    groupTitle: 'Quick 100x Crypto Signals [SUSPICIOUS]',
    inviteUrl: 'https://chat.whatsapp.com/C992La81kLz01KqP',
    status: 'BROKEN',
    lastChecked: '2026-10-03 14:00',
    nextCheck: 'Manual Attention Required',
    failuresCount: 3,
    statusCode: 404,
    createdAt: '2026-09-25'
  }
];

export const INITIAL_ADMIN_CATEGORIES: AdminCategory[] = [
  { id: 'cat-1', name: 'Gaming', slug: 'gaming', icon: '🎮', description: 'Video games, esports, clan recruitment, mobile scrims', groupsCount: 475, isFeatured: true, isHidden: false, order: 1 },
  { id: 'cat-2', name: 'Education', slug: 'education', icon: '📚', description: 'Study notes, exams, language classes, academic assistance', groupsCount: 169, isFeatured: true, isHidden: false, order: 2 },
  { id: 'cat-3', name: 'Online Earning', slug: 'online-earning', icon: '💸', description: 'Freelancing, remote work, verified digital skills', groupsCount: 158, isFeatured: true, isHidden: false, order: 3 },
  { id: 'cat-4', name: 'Community & Social', slug: 'community-and-social', icon: '💬', description: 'Civic groups, local initiatives, open discussions', groupsCount: 155, isFeatured: true, isHidden: false, order: 4 },
  { id: 'cat-5', name: 'Friendship', slug: 'friendship', icon: '🤝', description: 'Meeting new people, casual conversations, hangout spots', groupsCount: 120, isFeatured: true, isHidden: false, order: 5 },
  { id: 'cat-6', name: 'Business', slug: 'business', icon: '💼', description: 'Trade, startups, wholesale, business development', groupsCount: 112, isFeatured: true, isHidden: false, order: 6 },
  { id: 'cat-7', name: 'Finance', slug: 'finance', icon: '📈', description: 'Investment, stock market, market analysis', groupsCount: 96, isFeatured: false, isHidden: false, order: 7 },
  { id: 'cat-8', name: 'Buy Sell', slug: 'buy-sell', icon: '🛍️', description: 'Classifieds, second-hand goods, marketplace', groupsCount: 70, isFeatured: false, isHidden: false, order: 8 },
  { id: 'cat-9', name: 'Islamic', slug: 'islamic', icon: '🌙', description: 'Quran, Hadith, prayers, Islamic reminders', groupsCount: 58, isFeatured: false, isHidden: false, order: 9 },
  { id: 'cat-10', name: 'Entertainment', slug: 'entertainment', icon: '🎭', description: 'Movies, memes, comedy, viral clips', groupsCount: 52, isFeatured: false, isHidden: false, order: 10 },
  { id: 'cat-11', name: 'Technology', slug: 'technology', icon: '💻', description: 'Programming, AI, gadget reviews, tech support', groupsCount: 47, isFeatured: false, isHidden: false, order: 11 },
  { id: 'cat-12', name: 'Sports', slug: 'sports', icon: '⚽', description: 'Football, cricket, fitness, live match updates', groupsCount: 46, isFeatured: false, isHidden: false, order: 12 }
];

export const INITIAL_ADMIN_COUNTRIES: AdminCountry[] = [
  { id: 'ctry-1', name: 'India', code: 'in', slug: 'india', groupsCount: 462, isFeatured: true, isHidden: false, order: 1 },
  { id: 'ctry-2', name: 'Pakistan', code: 'pk', slug: 'pakistan', groupsCount: 386, isFeatured: true, isHidden: false, order: 2 },
  { id: 'ctry-3', name: 'Global', code: 'global', slug: 'global', groupsCount: 245, isFeatured: true, isHidden: false, order: 3 },
  { id: 'ctry-4', name: 'Indonesia', code: 'id', slug: 'indonesia', groupsCount: 234, isFeatured: true, isHidden: false, order: 4 },
  { id: 'ctry-5', name: 'International', code: 'global', slug: 'international', groupsCount: 136, isFeatured: true, isHidden: false, order: 5 },
  { id: 'ctry-6', name: 'Egypt', code: 'eg', slug: 'egypt', groupsCount: 66, isFeatured: false, isHidden: false, order: 6 },
  { id: 'ctry-7', name: 'Sri Lanka', code: 'lk', slug: 'sri-lanka', groupsCount: 62, isFeatured: false, isHidden: false, order: 7 },
  { id: 'ctry-8', name: 'Nigeria', code: 'ng', slug: 'nigeria', groupsCount: 55, isFeatured: false, isHidden: false, order: 8 },
  { id: 'ctry-9', name: 'United States', code: 'us', slug: 'united-states', groupsCount: 23, isFeatured: false, isHidden: false, order: 9 },
  { id: 'ctry-10', name: 'United Kingdom', code: 'gb', slug: 'united-kingdom', groupsCount: 18, isFeatured: false, isHidden: false, order: 10 }
];

export const INITIAL_ADMIN_CITIES: AdminCity[] = [
  { id: 'city-1', name: 'Karachi', slug: 'karachi', country: 'Pakistan', countryCode: 'pk', groupsCount: 31, isHidden: false },
  { id: 'city-2', name: 'Lahore', slug: 'lahore', country: 'Pakistan', countryCode: 'pk', groupsCount: 14, isHidden: false },
  { id: 'city-3', name: 'Multan', slug: 'multan', country: 'Pakistan', countryCode: 'pk', groupsCount: 10, isHidden: false },
  { id: 'city-4', name: 'Lagos', slug: 'lagos', country: 'Nigeria', countryCode: 'ng', groupsCount: 7, isHidden: false },
  { id: 'city-5', name: 'Kampala', slug: 'kampala', country: 'Uganda', countryCode: 'ug', groupsCount: 6, isHidden: false },
  { id: 'city-6', name: 'Delhi', slug: 'delhi', country: 'India', countryCode: 'in', groupsCount: 5, isHidden: false },
  { id: 'city-7', name: 'Chennai', slug: 'chennai', country: 'India', countryCode: 'in', groupsCount: 4, isHidden: false },
  { id: 'city-8', name: 'London', slug: 'london', country: 'United Kingdom', countryCode: 'gb', groupsCount: 4, isHidden: false }
];

export const INITIAL_ADMIN_TAGS: AdminTag[] = [
  { id: 'tag-1', name: 'Mobile Gaming', slug: 'mobile-gaming', groupsCount: 315, popularity: 98, isHidden: false },
  { id: 'tag-2', name: 'Gaming Deals', slug: 'gaming-deals', groupsCount: 206, popularity: 92, isHidden: false },
  { id: 'tag-3', name: 'Game Account Sale', slug: 'game-account-sale', groupsCount: 118, popularity: 84, isHidden: false },
  { id: 'tag-4', name: 'Freelancing', slug: 'freelancing', groupsCount: 95, popularity: 79, isHidden: false },
  { id: 'tag-5', name: 'UPSC Prep', slug: 'upsc-prep', groupsCount: 68, popularity: 72, isHidden: false },
  { id: 'tag-6', name: 'Crypto & Forex', slug: 'crypto-forex', groupsCount: 82, popularity: 65, isHidden: false }
];

export const INITIAL_REPORTS: GroupReport[] = [
  {
    id: 'rep-401',
    groupId: 'grp-106',
    groupTitle: 'Quick 100x Crypto Signals [SUSPICIOUS]',
    groupInviteLink: 'https://chat.whatsapp.com/C992La81kLz01KqP',
    reason: 'Scam',
    reportedByEmail: 'victim.alert@gmail.com',
    reportedIp: '182.185.120.9',
    details: 'Admin sends private DMs requesting USDT deposits for fake automated trading bots.',
    date: '2026-10-04 07:12',
    status: 'Investigating',
    internalNotes: 'Checked group messages via undercover testing. Definite Ponzi scheme.'
  },
  {
    id: 'rep-402',
    groupId: 'grp-107',
    groupTitle: 'Hyderabad Flash Deals 2025',
    groupInviteLink: 'https://chat.whatsapp.com/H189KlaZ9101LqAb',
    reason: 'Broken Link',
    reportedByEmail: 'buyer22@yahoo.com',
    reportedIp: '115.111.45.10',
    details: 'Clicking join says invite link has been reset by creator.',
    date: '2026-10-03 18:30',
    status: 'Resolved',
    internalNotes: 'Marked group as expired.'
  }
];

export const INITIAL_ADMIN_USERS: AdminUser[] = [
  {
    id: 'usr-1',
    name: 'Elijah (Lead Admin)',
    email: 'elijah@groupizo.com',
    role: 'Super Admin',
    status: 'active',
    submittedGroups: 420,
    reportsSubmitted: 2,
    registrationDate: '2026-01-10',
    lastLogin: '2026-10-04 10:45',
    avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=150&auto=format&fit=crop&q=80'
  },
  {
    id: 'usr-2',
    name: 'Muqeem Ahmed',
    email: 'muqeem.mod@gmail.com',
    role: 'Moderator',
    status: 'active',
    submittedGroups: 30,
    reportsSubmitted: 8,
    registrationDate: '2026-03-14',
    lastLogin: '2026-10-04 08:30',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80'
  },
  {
    id: 'usr-3',
    name: 'Spammy Bot Account',
    email: 'bot488@darkmail.to',
    role: 'Editor',
    status: 'banned',
    submittedGroups: 12,
    reportsSubmitted: 0,
    registrationDate: '2026-09-30',
    lastLogin: '2026-10-01 12:00'
  }
];

export const INITIAL_AUDIT_LOGS: AuditLogItem[] = [
  { id: 'log-1', adminName: 'Elijah (Lead Admin)', adminEmail: 'elijah@groupizo.com', action: 'Approved Group', target: 'Pakistan PUBG Gamers Official', details: 'Passed automatic and manual checks', timestamp: '2026-10-04 09:35', ipAddress: '192.168.1.1' },
  { id: 'log-2', adminName: 'Elijah (Lead Admin)', adminEmail: 'elijah@groupizo.com', action: 'Featured Group', target: 'Indian Students & UPSC Hub 📚', details: 'Pinned to homepage top rotation', timestamp: '2026-10-04 08:20', ipAddress: '192.168.1.1' },
  { id: 'log-3', adminName: 'Muqeem Ahmed', adminEmail: 'muqeem.mod@gmail.com', action: 'Suspended Group', target: 'Quick 100x Crypto Signals', details: 'Multiple scam reports confirmed', timestamp: '2026-10-03 21:14', ipAddress: '182.185.12.44' },
  { id: 'log-4', adminName: 'Elijah (Lead Admin)', adminEmail: 'elijah@groupizo.com', action: 'Created Backup', target: 'Full Database Snapshot', details: 'Automated 24h backup snapshot', timestamp: '2026-10-03 00:00', ipAddress: '127.0.0.1' },
  { id: 'log-5', adminName: 'Muqeem Ahmed', adminEmail: 'muqeem.mod@gmail.com', action: 'Rejected Submission', target: 'Free Casino Chips Hack', details: 'Reason: Phishing spam', timestamp: '2026-10-02 18:22', ipAddress: '182.185.12.44' }
];

export const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  { id: 'notif-1', title: 'New Group Submitted', message: 'Dubai Real Estate & Off-Plan submitted by Karim Al-Hassan', type: 'submission', timestamp: '10 minutes ago', read: false },
  { id: 'notif-2', title: 'Critical Scam Report', message: '14 new reports filed against "Quick 100x Crypto Signals"', type: 'report', timestamp: '1 hour ago', read: false },
  { id: 'notif-3', title: 'Link Checker Warning', message: '3 links returned HTTP 410 (Revoked by admin)', type: 'broken_link', timestamp: '3 hours ago', read: true },
  { id: 'notif-4', title: 'Security Check Passed', message: 'Daily IP rate limit & spam filter report clean', type: 'security', timestamp: '6 hours ago', read: true }
];

export const INITIAL_HOMEPAGE_CONFIG: HomepageSectionConfig[] = [
  { id: 'sec-hero', title: 'Hero Banner & Search', enabled: true, order: 1 },
  { id: 'sec-trust', title: 'Trust Indicator Strip', enabled: true, order: 2 },
  { id: 'sec-ticker', title: 'Stats Live Ticker', enabled: true, order: 3 },
  { id: 'sec-tabs', title: 'Category Tabs & 18+ Switch', enabled: true, order: 4 },
  { id: 'sec-feed', title: 'Main Groups Grid Feed', enabled: true, order: 5 },
  { id: 'sec-leaderboard', title: 'Contributor Leaderboard Podium', enabled: true, order: 6 },
  { id: 'sec-categories', title: 'Browse by Category Grid', enabled: true, order: 7 },
  { id: 'sec-countries', title: 'Browse by Country Cards', enabled: true, order: 8 },
  { id: 'sec-cities', title: 'Local Communities (Cities)', enabled: true, order: 9 },
  { id: 'sec-origin', title: "The Origin (Founder's Note)", enabled: true, order: 10 },
  { id: 'sec-how', title: 'How It Works (3 Steps)', enabled: true, order: 11 },
  { id: 'sec-faqs', title: 'Frequently Asked Questions', enabled: true, order: 12 },
  { id: 'sec-blog', title: 'Blog & Safety Guides Preview', enabled: true, order: 13 },
  { id: 'sec-tags', title: 'Trending Tag Cloud', enabled: true, order: 14 }
];

export const INITIAL_ADS: AdSlot[] = [
  { id: 'ad-1', name: 'Homepage Top Header Banner', location: 'homepage_top', type: 'banner', bannerUrl: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=1200&auto=format&fit=crop&q=80', targetUrl: 'https://wa.me/support', status: 'active', startDate: '2026-10-01', endDate: '2026-11-01', impressions: 48200, clicks: 1420 },
  { id: 'ad-2', name: 'Category Feed Mid In-Feed Ad', location: 'homepage_middle', type: 'banner', bannerUrl: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=1200&auto=format&fit=crop&q=80', targetUrl: 'https://wa.me/partner', status: 'active', startDate: '2026-10-01', endDate: '2026-10-31', impressions: 24100, clicks: 890 }
];

export const INITIAL_CMS_PAGES: CmsPage[] = [
  { id: 'p-1', title: 'About Us', slug: 'about', status: 'Published', updatedAt: '2026-09-20', content: 'Groupizo was founded in early 2026 to provide a clean, verified directory of active WhatsApp communities...' },
  { id: 'p-2', title: 'Editorial & Review Policy', slug: 'editorial-policy', status: 'Published', updatedAt: '2026-09-22', content: 'Every submission is thoroughly verified by human moderators and automated status crawlers before going live...' },
  { id: 'p-3', title: 'Terms & Conditions', slug: 'terms-and-conditions', status: 'Published', updatedAt: '2026-09-15', content: 'By browsing or submitting to Groupizo, you acknowledge that group interactions take place on WhatsApp...' },
  { id: 'p-4', title: 'Privacy Policy', slug: 'privacy-policy', status: 'Published', updatedAt: '2026-09-15', content: 'We respect your privacy and never sell or monitor communications within private WhatsApp groups...' },
  { id: 'p-5', title: 'Safety & Disclaimer', slug: 'disclaimer', status: 'Published', updatedAt: '2026-09-18', content: 'Groupizo is an independent directory platform not affiliated with Meta or WhatsApp Inc...' }
];

export const INITIAL_APPEARANCE: AdminAppearance = {
  theme: 'dark',
  primaryColor: '#25D366',
  siteName: 'GroupHub',
  logoText: 'GroupHub Directory',
  fontFamily: 'Plus Jakarta Sans',
  borderRadius: 'rounded-2xl',
  showJoinCounter: true,
  heroHeading: 'Find WhatsApp Groups That Match Your Interests',
  heroSubheading: 'Discover public WhatsApp communities by topic, category, country and city.',
  heroSearchPlaceholder: 'Search groups, topics, cities or countries...'
};

export const INITIAL_SYSTEM_SETTINGS: SystemSettingsConfig = {
  siteName: 'GroupHub',
  siteUrl: 'https://grouphub.community',
  adminEmail: 'admin@grouphub.community',
  contactEmail: 'hello@grouphub.community',
  timezone: 'UTC-0',
  language: 'English (US)',
  groupsPerPage: 24,
  defaultSorting: 'newest',
  registrationEnabled: true,
  submissionEnabled: true,
  autoModeration: true,
  maintenanceMode: false,
  linkCheckIntervalHours: 12
};
