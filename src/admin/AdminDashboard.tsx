import React from 'react';
import { useAdmin } from '../context/AdminContext.tsx';
import { AdminLogin } from './pages/AdminLogin.tsx';
import { AdminLayout } from './AdminLayout.tsx';
import { DashboardOverview } from './pages/DashboardOverview.tsx';
import { GroupManagement } from './pages/GroupManagement.tsx';
import { SubmissionsManager } from './pages/SubmissionsManager.tsx';
import { LinkChecker } from './pages/LinkChecker.tsx';
import { CategoriesManager } from './pages/CategoriesManager.tsx';
import { LocationsManager } from './pages/LocationsManager.tsx';
import { TagsManager } from './pages/TagsManager.tsx';
import { ReportsManager } from './pages/ReportsManager.tsx';
import { UsersManager } from './pages/UsersManager.tsx';
import { FeaturedManager } from './pages/FeaturedManager.tsx';
import { HomepageControl } from './pages/HomepageControl.tsx';
import { AppearanceSettings } from './pages/AppearanceSettings.tsx';
import { CmsPagesManager } from './pages/CmsPagesManager.tsx';
import { BlogManager } from './pages/BlogManager.tsx';
import { SeoManager } from './pages/SeoManager.tsx';
import { AnalyticsDashboard } from './pages/AnalyticsDashboard.tsx';
import { AdsManager } from './pages/AdsManager.tsx';
import { SecuritySettings } from './pages/SecuritySettings.tsx';
import { RolesManager } from './pages/RolesManager.tsx';
import { AuditLog } from './pages/AuditLog.tsx';
import { BackupDatabase } from './pages/BackupDatabase.tsx';
import { SystemSettings } from './pages/SystemSettings.tsx';

export const AdminDashboard: React.FC = () => {
  const { isAuthenticated, activeTab } = useAdmin();

  if (!isAuthenticated) {
    return <AdminLogin />;
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardOverview />;
      case 'groups-all':
        return <GroupManagement initialStatusFilter="all" />;
      case 'groups-pending':
        return <GroupManagement initialStatusFilter="pending" />;
      case 'groups-featured':
        return <GroupManagement initialStatusFilter="featured" />;
      case 'groups-reported':
        return <GroupManagement initialStatusFilter="reported" />;
      case 'groups-expired':
        return <GroupManagement initialStatusFilter="expired" />;
      case 'groups-new':
        return <GroupManagement initialStatusFilter="all" />;
      case 'submissions':
        return <SubmissionsManager />;
      case 'link-checker':
        return <LinkChecker />;
      case 'categories':
        return <CategoriesManager />;
      case 'locations':
        return <LocationsManager />;
      case 'tags':
        return <TagsManager />;
      case 'reports':
        return <ReportsManager />;
      case 'users':
        return <UsersManager />;
      case 'featured':
        return <FeaturedManager />;
      case 'homepage':
        return <HomepageControl />;
      case 'appearance':
        return <AppearanceSettings />;
      case 'pages':
        return <CmsPagesManager />;
      case 'blog':
        return <BlogManager />;
      case 'seo':
        return <SeoManager />;
      case 'analytics':
        return <AnalyticsDashboard />;
      case 'ads':
        return <AdsManager />;
      case 'security':
        return <SecuritySettings />;
      case 'roles':
        return <RolesManager />;
      case 'activity':
        return <AuditLog />;
      case 'backup':
        return <BackupDatabase />;
      case 'settings':
        return <SystemSettings />;
      default:
        return <DashboardOverview />;
    }
  };

  return <AdminLayout>{renderContent()}</AdminLayout>;
};
