import React, { useState } from 'react';
import { useAdmin } from '../../context/AdminContext.tsx';
import { Sliders, Save, AlertTriangle, CheckCircle } from 'lucide-react';

export const SystemSettings: React.FC = () => {
  const { systemSettings, updateSystemSettings, showToast } = useAdmin();

  const [siteName, setSiteName] = useState(systemSettings.siteName);
  const [siteUrl, setSiteUrl] = useState(systemSettings.siteUrl);
  const [adminEmail, setAdminEmail] = useState(systemSettings.adminEmail);
  const [contactEmail, setContactEmail] = useState(systemSettings.contactEmail);
  const [timezone, setTimezone] = useState(systemSettings.timezone);
  const [language, setLanguage] = useState(systemSettings.language);
  const [groupsPerPage, setGroupsPerPage] = useState(systemSettings.groupsPerPage);
  const [defaultSorting, setDefaultSorting] = useState(systemSettings.defaultSorting);
  const [registrationEnabled, setRegistrationEnabled] = useState(systemSettings.registrationEnabled);
  const [submissionEnabled, setSubmissionEnabled] = useState(systemSettings.submissionEnabled);
  const [autoModeration, setAutoModeration] = useState(systemSettings.autoModeration);
  const [maintenanceMode, setMaintenanceMode] = useState(systemSettings.maintenanceMode);
  const [linkCheckIntervalHours, setLinkCheckIntervalHours] = useState(systemSettings.linkCheckIntervalHours);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateSystemSettings({
      siteName,
      siteUrl,
      adminEmail,
      contactEmail,
      timezone,
      language,
      groupsPerPage,
      defaultSorting,
      registrationEnabled,
      submissionEnabled,
      autoModeration,
      maintenanceMode,
      linkCheckIntervalHours
    });
    showToast('Platform system configuration updated.');
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white">Global System Settings</h1>
          <p className="text-xs text-gray-400 mt-1">
            Core site parameters, contact routing, crawler timers, and platform operational modes
          </p>
        </div>

        <button
          onClick={handleSubmit}
          className="px-5 py-2.5 rounded-xl bg-[#25D366] hover:bg-[#1ebe5a] text-black font-extrabold text-xs flex items-center gap-1.5 shadow-md shadow-[#25D366]/20 transition-all cursor-pointer self-start sm:self-auto"
        >
          <Save className="w-4 h-4" />
          <span>Save Changes</span>
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 text-xs">
        
        {/* General Site Information */}
        <div className="bg-[#14171d] border border-white/10 rounded-2xl p-6 shadow-xl space-y-4">
          <h2 className="text-base font-extrabold text-white">General Information</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-300 font-bold mb-1">Directory Website Name</label>
              <input
                type="text"
                value={siteName}
                onChange={(e) => setSiteName(e.target.value)}
                className="w-full bg-[#1b1f28] border border-white/10 rounded-xl px-3 py-2 text-white outline-none"
              />
            </div>

            <div>
              <label className="block text-gray-300 font-bold mb-1">Public URL Endpoint</label>
              <input
                type="url"
                value={siteUrl}
                onChange={(e) => setSiteUrl(e.target.value)}
                className="w-full bg-[#1b1f28] border border-white/10 rounded-xl px-3 py-2 text-white outline-none font-mono"
              />
            </div>

            <div>
              <label className="block text-gray-300 font-bold mb-1">Admin Email (Notifications)</label>
              <input
                type="email"
                value={adminEmail}
                onChange={(e) => setAdminEmail(e.target.value)}
                className="w-full bg-[#1b1f28] border border-white/10 rounded-xl px-3 py-2 text-white outline-none"
              />
            </div>

            <div>
              <label className="block text-gray-300 font-bold mb-1">Public Support Email</label>
              <input
                type="email"
                value={contactEmail}
                onChange={(e) => setContactEmail(e.target.value)}
                className="w-full bg-[#1b1f28] border border-white/10 rounded-xl px-3 py-2 text-white outline-none"
              />
            </div>
          </div>
        </div>

        {/* Directory & Feed Defaults */}
        <div className="bg-[#14171d] border border-white/10 rounded-2xl p-6 shadow-xl space-y-4">
          <h2 className="text-base font-extrabold text-white">Directory Feed &amp; Crawler Timing</h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-gray-300 font-bold mb-1">Groups Per Page (Pagination)</label>
              <select
                value={groupsPerPage}
                onChange={(e) => setGroupsPerPage(Number(e.target.value))}
                className="w-full bg-[#1b1f28] border border-white/10 rounded-xl px-3 py-2 text-white outline-none cursor-pointer"
              >
                <option value={12}>12 groups</option>
                <option value={24}>24 groups (Recommended)</option>
                <option value={36}>36 groups</option>
                <option value={48}>48 groups</option>
              </select>
            </div>

            <div>
              <label className="block text-gray-300 font-bold mb-1">Default Feed Sorting</label>
              <select
                value={defaultSorting}
                onChange={(e) => setDefaultSorting(e.target.value as any)}
                className="w-full bg-[#1b1f28] border border-white/10 rounded-xl px-3 py-2 text-white outline-none cursor-pointer"
              >
                <option value="newest">Newest Added First</option>
                <option value="views">Most Viewed First</option>
                <option value="joins">Highest Join Conversion</option>
              </select>
            </div>

            <div>
              <label className="block text-gray-300 font-bold mb-1">Link Health Re-Check Interval</label>
              <select
                value={linkCheckIntervalHours}
                onChange={(e) => setLinkCheckIntervalHours(Number(e.target.value))}
                className="w-full bg-[#1b1f28] border border-white/10 rounded-xl px-3 py-2 text-white outline-none cursor-pointer"
              >
                <option value={6}>Every 6 hours</option>
                <option value={12}>Every 12 hours (Recommended)</option>
                <option value={24}>Every 24 hours</option>
              </select>
            </div>
          </div>
        </div>

        {/* Feature Switches & Maintenance Mode */}
        <div className="bg-[#14171d] border border-white/10 rounded-2xl p-6 shadow-xl space-y-4">
          <h2 className="text-base font-extrabold text-white">System Feature Switches</h2>

          <div className="space-y-3">
            <label className="flex items-center justify-between p-3 rounded-xl bg-white/[0.02] border border-white/5 cursor-pointer">
              <div>
                <div className="font-bold text-white">Public Group Submissions</div>
                <div className="text-gray-400 text-[11px]">Allow visitors to submit their WhatsApp group links</div>
              </div>
              <input
                type="checkbox"
                checked={submissionEnabled}
                onChange={(e) => setSubmissionEnabled(e.target.checked)}
                className="w-4 h-4 rounded text-[#25D366] focus:ring-[#25D366]"
              />
            </label>

            <label className="flex items-center justify-between p-3 rounded-xl bg-white/[0.02] border border-white/5 cursor-pointer">
              <div>
                <div className="font-bold text-white">Automatic Link Pre-validation</div>
                <div className="text-gray-400 text-[11px]">Verify invite URL formatting and duplicate checks upon submission</div>
              </div>
              <input
                type="checkbox"
                checked={autoModeration}
                onChange={(e) => setAutoModeration(e.target.checked)}
                className="w-4 h-4 rounded text-[#25D366] focus:ring-[#25D366]"
              />
            </label>

            <label className="flex items-center justify-between p-3 rounded-xl bg-red-500/[0.04] border border-red-500/20 cursor-pointer">
              <div>
                <div className="font-bold text-red-400 flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4" /> Platform Maintenance Mode
                </div>
                <div className="text-gray-400 text-[11px]">Show maintenance screen to visitors while admins maintain access</div>
              </div>
              <input
                type="checkbox"
                checked={maintenanceMode}
                onChange={(e) => setMaintenanceMode(e.target.checked)}
                className="w-4 h-4 rounded text-red-500 focus:ring-red-500"
              />
            </label>
          </div>
        </div>

      </form>
    </div>
  );
};
