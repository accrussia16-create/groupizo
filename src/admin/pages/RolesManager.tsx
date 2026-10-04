import React from 'react';
import { UserCog, Check, X, Shield } from 'lucide-react';

export const RolesManager: React.FC = () => {
  const permissions = [
    { label: 'View & Inspect Groups', superAdmin: true, admin: true, moderator: true, editor: true },
    { label: 'Add & Edit Group Details', superAdmin: true, admin: true, moderator: true, editor: true },
    { label: 'Delete & Purge Groups', superAdmin: true, admin: true, moderator: false, editor: false },
    { label: 'Approve / Reject Submissions', superAdmin: true, admin: true, moderator: true, editor: false },
    { label: 'Investigate & Resolve Reports', superAdmin: true, admin: true, moderator: true, editor: false },
    { label: 'Execute Link Health Scan', superAdmin: true, admin: true, moderator: true, editor: false },
    { label: 'Manage Homepage Builder', superAdmin: true, admin: true, moderator: false, editor: false },
    { label: 'Edit SEO & Meta Tags', superAdmin: true, admin: true, moderator: false, editor: true },
    { label: 'Manage User Accounts & Bans', superAdmin: true, admin: false, moderator: false, editor: false },
    { label: 'Access Firewall & Security', superAdmin: true, admin: false, moderator: false, editor: false },
    { label: 'Database Backup & Restore', superAdmin: true, admin: false, moderator: false, editor: false }
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white">Administrative Roles &amp; Permissions Matrix</h1>
          <p className="text-xs text-gray-400 mt-1">
            Role-based access control (RBAC) governance for moderators, editors, and super admins
          </p>
        </div>
      </div>

      <div className="bg-[#14171d] border border-white/10 rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-white/10 bg-white/[0.02] text-gray-400 font-bold uppercase tracking-wider text-[10px]">
                <th className="py-4 px-5">System Capability</th>
                <th className="py-4 px-5 text-center text-yellow-400">Super Admin</th>
                <th className="py-4 px-5 text-center text-emerald-400">Admin</th>
                <th className="py-4 px-5 text-center text-sky-400">Moderator</th>
                <th className="py-4 px-5 text-center text-purple-400">Editor</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-white/5 text-gray-300">
              {permissions.map((p, i) => (
                <tr key={i} className="hover:bg-white/[0.02]">
                  <td className="py-3.5 px-5 font-bold text-white flex items-center gap-2">
                    <Shield className="w-3.5 h-3.5 text-gray-500" />
                    <span>{p.label}</span>
                  </td>

                  <td className="py-3.5 px-5 text-center">
                    {p.superAdmin ? (
                      <Check className="w-4 h-4 text-emerald-400 mx-auto stroke-[3]" />
                    ) : (
                      <X className="w-4 h-4 text-gray-600 mx-auto" />
                    )}
                  </td>

                  <td className="py-3.5 px-5 text-center">
                    {p.admin ? (
                      <Check className="w-4 h-4 text-emerald-400 mx-auto stroke-[3]" />
                    ) : (
                      <X className="w-4 h-4 text-gray-600 mx-auto" />
                    )}
                  </td>

                  <td className="py-3.5 px-5 text-center">
                    {p.moderator ? (
                      <Check className="w-4 h-4 text-emerald-400 mx-auto stroke-[3]" />
                    ) : (
                      <X className="w-4 h-4 text-gray-600 mx-auto" />
                    )}
                  </td>

                  <td className="py-3.5 px-5 text-center">
                    {p.editor ? (
                      <Check className="w-4 h-4 text-emerald-400 mx-auto stroke-[3]" />
                    ) : (
                      <X className="w-4 h-4 text-gray-600 mx-auto" />
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
