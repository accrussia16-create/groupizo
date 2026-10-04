export interface Group {
  id: string;
  slug: string;
  title: string;
  image: string;
  country: string;
  countryCode: string; // ISO 2 code (e.g. 'pk', 'in', 'id', 'us', 'za', 'eg', 'lk', 'ca', 'tr', 'ug')
  city?: string;
  category: string;
  categorySlug: string;
  inviteLink: string;
  membersCount: number;
  maxMembers?: number;
  isAdult?: boolean;
  isVerified?: boolean;
  tags: string[];
  description?: string;
  addedAgo?: string;
}

export interface Contributor {
  rank: number;
  name: string;
  avatar: string;
  approvedGroups: number;
  badge: 'Trusted Uploader' | 'Top Helper' | 'Consistent' | 'Fast Climber';
  badgeColor: string;
  repScore: number;
  percentage: number;
  isTopReached?: boolean;
  hasBlueCheck?: boolean;
}

export interface CategoryInfo {
  name: string;
  slug: string;
  count: number;
  icon?: string;
}

export interface CountryInfo {
  name: string;
  slug: string;
  code: string;
  count: number;
}

export interface CityInfo {
  name: string;
  slug: string;
  country: string;
  code: string;
  count: number;
}

export interface BlogArticle {
  slug: string;
  title: string;
  category: string;
  date: string;
  readTime: string;
  coverImage: string;
  excerpt: string;
  content: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}
