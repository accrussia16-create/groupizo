export type GroupStatus = 'active' | 'pending' | 'rejected' | 'reported' | 'expired' | 'suspended';
export type LinkStatus = 'ACTIVE' | 'BROKEN' | 'EXPIRED' | 'REVOKED' | 'PENDING CHECK' | 'UNKNOWN';
export type SubmissionStatus = 'Pending' | 'Approved' | 'Rejected' | 'Needs Changes' | 'Spam';
export type ReportStatus = 'Pending' | 'Investigating' | 'Resolved' | 'Dismissed';
export type UserStatus = 'active' | 'suspended' | 'banned';
export type AdminRole = 'Super Admin' | 'Admin' | 'Moderator' | 'Editor';

export interface AdminGroup {
  id: string;
  slug: string;
  title: string;
  image: string;
  inviteLink: string;
  category: string;
  categorySlug: string;
  country: string;
  countryCode: string;
  city?: string;
  language: string;
  tags: string[];
  description: string;
  status: GroupStatus;
  isFeatured: boolean;
  isPinned: boolean;
  isVerified: boolean;
  views: number;
  joinClicks: number;
  reportsCount: number;
  createdAt: string;
  lastChecked: string;
  linkHealth: LinkStatus;
  adminNotes?: string;
  seoTitle?: string;
  seoDescription?: string;
}

export interface Submission {
  id: string;
  groupName: string;
  inviteLink: string;
  submitterName: string;
  submitterEmail: string;
  submitterIp: string;
  category: string;
  categorySlug: string;
  country: string;
  countryCode: string;
  city?: string;
  description: string;
  tags: string[];
  submittedDate: string;
  status: SubmissionStatus;
  rejectionReason?: string;
  adminNotes?: string;
}

export interface LinkCheckItem {
  id: string;
  groupId: string;
  groupTitle: string;
  inviteUrl: string;
  status: LinkStatus;
  lastChecked: string;
  nextCheck: string;
  failuresCount: number;
  statusCode?: number;
  createdAt: string;
}

export interface AdminCategory {
  id: string;
  name: string;
  slug: string;
  icon: string;
  description: string;
  groupsCount: number;
  isFeatured: boolean;
  isHidden: boolean;
  order: number;
  seoTitle?: string;
  seoDescription?: string;
}

export interface AdminCountry {
  id: string;
  name: string;
  code: string;
  slug: string;
  groupsCount: number;
  isFeatured: boolean;
  isHidden: boolean;
  order: number;
  seoTitle?: string;
  seoDescription?: string;
}

export interface AdminCity {
  id: string;
  name: string;
  slug: string;
  country: string;
  countryCode: string;
  groupsCount: number;
  isHidden: boolean;
  seoTitle?: string;
}

export interface AdminTag {
  id: string;
  name: string;
  slug: string;
  groupsCount: number;
  popularity: number; // 1-100
  isHidden: boolean;
}

export interface GroupReport {
  id: string;
  groupId: string;
  groupTitle: string;
  groupInviteLink: string;
  reason: 'Broken Link' | 'Spam' | 'Scam' | 'Inappropriate Content' | 'Wrong Category' | 'Wrong Country' | 'Duplicate' | 'Fake Information' | 'Other';
  reportedByEmail?: string;
  reportedIp: string;
  details: string;
  date: string;
  status: ReportStatus;
  internalNotes?: string;
}

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: AdminRole;
  status: UserStatus;
  submittedGroups: number;
  reportsSubmitted: number;
  registrationDate: string;
  lastLogin: string;
  avatar?: string;
}

export interface AuditLogItem {
  id: string;
  adminName: string;
  adminEmail: string;
  action: string;
  target: string;
  details?: string;
  timestamp: string;
  ipAddress: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  type: 'submission' | 'report' | 'broken_link' | 'security' | 'system';
  timestamp: string;
  read: boolean;
  targetUrl?: string;
}

export interface AdSlot {
  id: string;
  name: string;
  location: 'homepage_top' | 'homepage_middle' | 'homepage_bottom' | 'category_pages' | 'group_pages';
  type: 'banner' | 'html_code';
  bannerUrl?: string;
  targetUrl?: string;
  htmlCode?: string;
  status: 'active' | 'disabled' | 'scheduled';
  startDate: string;
  endDate: string;
  impressions: number;
  clicks: number;
}

export interface CmsPage {
  id: string;
  title: string;
  slug: string;
  content: string;
  status: 'Published' | 'Draft' | 'Unpublished';
  updatedAt: string;
  seoTitle?: string;
  metaDescription?: string;
}

export interface HomepageSectionConfig {
  id: string;
  title: string;
  enabled: boolean;
  order: number;
  customHeading?: string;
  customSubheading?: string;
}

export interface AdminAppearance {
  theme: 'dark' | 'light';
  primaryColor: string;
  siteName: string;
  logoText: string;
  fontFamily: string;
  borderRadius: 'rounded-md' | 'rounded-xl' | 'rounded-2xl' | 'rounded-3xl';
  showJoinCounter: boolean;
}

export interface SystemSettingsConfig {
  siteName: string;
  siteUrl: string;
  adminEmail: string;
  contactEmail: string;
  timezone: string;
  language: string;
  groupsPerPage: number;
  defaultSorting: 'newest' | 'views' | 'joins';
  registrationEnabled: boolean;
  submissionEnabled: boolean;
  autoModeration: boolean;
  maintenanceMode: boolean;
  linkCheckIntervalHours: number;
}
