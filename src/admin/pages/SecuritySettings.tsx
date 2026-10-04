import React, { useState } from 'react';
import { useAdmin } from '../../context/AdminContext.tsx';
import { Lock, ShieldCheck, Smartphone, Key, History, Ban, AlertCircle } from 'lucide-react';

export const SecuritySettings: React.FC = () => {
  const { showToast } = useAdmin();

  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [sessionTimeoutMinutes, setSessionTimeoutMinutes] = useState(60);
  const [rateLimitEnabled, setRateLimitEnabled] = useState(true);
  const [blockedIps, setBlockedIps] = useState(['45.155.205.23', '185.220.101.5']);
  const [newIp, setNewIp] = useState('');

  const [currentPass, setCurrentPass] = useState('');
  const [newPass, setNewPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');

  const activeSessions = [
    { device: 'Chrome on macOS (Current)', ip: '192.168.1.1', location: 'London, UK', active: 'Active now' },
    { device: 'Safari on iPhone 15', ip: '194.170.82.14', location: 'Dubai, UAE', active: '2 hours ago' },
    { device: 'Firefox on Windows 11', ip: '85.214.132.55', location: 'Berlin, DE', active: '1 day ago' }
  ];

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPass || newPass !== confirmPass) {
      showToast('New passwords do not match!');
      return;
    }
    showToast('Admin password successfully updated.');
    setCurrentPass('');
    setNewPass('');
    setConfirmPass('');
  };

  const handleBlockIp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newIp.trim()) return;
    setBlockedIps([...blockedIps, newIp.trim()]);
    setNewIp('');
    showToast(`IP ${newIp.trim()} added to access firewall blocklist.`);
  };

  const handleRemoveBlockedIp = (ip: string) => {
    setBlockedIps(blockedIps.filter((item) => item !== ip));
    showToast(`IP ${ip} removed from blocklist.`);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white">Security, 2FA &amp; Firewall Controls</h1>
          <p className="text-xs text-gray-400 mt-1">
            Administrative access hardening, two-factor authentication, active sessions and IP blacklists
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Password Reset */}
        <div className="bg-[#14171d] border border-white/10 rounded-2xl p-6 shadow-xl space-y-4 text-xs">
          <h2 className="text-base font-extrabold text-white flex items-center gap-2">
            <Key className="w-4 h-4 text-[#25D366]" /> Change Administrator Password
          </h2>

          <form onSubmit={handlePasswordChange} className="space-y-3.5">
            <div>
              <label className="block text-gray-300 font-bold mb-1">Current Password</label>
              <input
                type="password"
                required
                value={currentPass}
                onChange={(e) => setCurrentPass(e.target.value)}
                placeholder="••••••••••••"
                className="w-full bg-[#1b1f28] border border-white/10 focus:border-[#25D366] rounded-xl px-3 py-2 text-white outline-none"
              />
            </div>

            <div>
              <label className="block text-gray-300 font-bold mb-1">New Password</label>
              <input
                type="password"
                required
                value={newPass}
                onChange={(e) => setNewPass(e.target.value)}
                placeholder="At least 8 characters"
                className="w-full bg-[#1b1f28] border border-white/10 focus:border-[#25D366] rounded-xl px-3 py-2 text-white outline-none"
              />
            </div>

            <div>
              <label className="block text-gray-300 font-bold mb-1">Confirm New Password</label>
              <input
                type="password"
                required
                value={confirmPass}
                onChange={(e) => setConfirmPass(e.target.value)}
                placeholder="Confirm new password"
                className="w-full bg-[#1b1f28] border border-white/10 focus:border-[#25D366] rounded-xl px-3 py-2 text-white outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 rounded-xl bg-[#25D366] hover:bg-[#1ebe5a] text-black font-extrabold text-xs cursor-pointer shadow-md"
            >
              Update Password
            </button>
          </form>
        </div>

        {/* 2FA & Session Hardening */}
        <div className="bg-[#14171d] border border-white/10 rounded-2xl p-6 shadow-xl space-y-4 text-xs">
          <h2 className="text-base font-extrabold text-white flex items-center gap-2">
            <Smartphone className="w-4 h-4 text-[#25D366]" /> Two-Factor Authentication (2FA)
          </h2>

          <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 flex items-center justify-between">
            <div>
              <div className="font-bold text-white mb-0.5">Google Authenticator / Authy</div>
              <div className="text-gray-400 text-[11px]">Require a 6-digit TOTP token upon login</div>
            </div>
            <button
              type="button"
              onClick={() => {
                setTwoFactorEnabled(!twoFactorEnabled);
                showToast(twoFactorEnabled ? '2FA disabled.' : '2FA activated.');
              }}
              className={`px-3 py-1.5 rounded-xl font-bold cursor-pointer transition-colors ${
                twoFactorEnabled ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40' : 'bg-white/10 text-gray-300'
              }`}
            >
              {twoFactorEnabled ? 'Enabled' : 'Disabled'}
            </button>
          </div>

          <div>
            <label className="block text-gray-300 font-bold mb-1">Session Inactivity Timeout</label>
            <select
              value={sessionTimeoutMinutes}
              onChange={(e) => setSessionTimeoutMinutes(Number(e.target.value))}
              className="w-full bg-[#1b1f28] border border-white/10 rounded-xl px-3 py-2 text-white outline-none cursor-pointer"
            >
              <option value={15}>15 minutes of inactivity</option>
              <option value={30}>30 minutes</option>
              <option value={60}>1 hour (Recommended)</option>
              <option value={240}>4 hours</option>
            </select>
          </div>

          {/* Blocked IP Firewall */}
          <div className="pt-2">
            <h3 className="font-bold text-white mb-2 flex items-center gap-1.5">
              <Ban className="w-3.5 h-3.5 text-rose-400" /> Blocked IP Firewall Addresses
            </h3>
            <div className="space-y-1.5 mb-3">
              {blockedIps.map((ip) => (
                <div key={ip} className="p-2 rounded-lg bg-[#1b1f28] flex items-center justify-between font-mono text-[11px]">
                  <span className="text-red-400">{ip}</span>
                  <button
                    onClick={() => handleRemoveBlockedIp(ip)}
                    className="text-xs text-gray-500 hover:text-white cursor-pointer"
                  >
                    Unblock
                  </button>
                </div>
              ))}
            </div>

            <form onSubmit={handleBlockIp} className="flex gap-2">
              <input
                type="text"
                value={newIp}
                onChange={(e) => setNewIp(e.target.value)}
                placeholder="e.g. 192.168.1.50"
                className="flex-1 bg-[#1b1f28] border border-white/10 rounded-xl px-3 py-1.5 text-white font-mono text-xs outline-none"
              />
              <button
                type="submit"
                className="px-3 py-1.5 rounded-xl bg-red-600/20 hover:bg-red-600 text-red-300 hover:text-white font-bold cursor-pointer"
              >
                Block IP
              </button>
            </form>
          </div>
        </div>

      </div>

      {/* Active Sessions List */}
      <div className="bg-[#14171d] border border-white/10 rounded-2xl p-6 shadow-xl">
        <h2 className="text-base font-extrabold text-white mb-1">Active Administrator Sessions</h2>
        <p className="text-xs text-gray-400 mb-4">Devices currently authenticated into the console</p>

        <div className="divide-y divide-white/5 text-xs">
          {activeSessions.map((s, idx) => (
            <div key={idx} className="py-3 flex items-center justify-between">
              <div>
                <div className="font-bold text-white">{s.device}</div>
                <div className="text-gray-400 text-[11px] font-mono">IP: {s.ip} &middot; {s.location}</div>
              </div>
              <span className="font-mono text-emerald-400 font-bold text-[11px]">{s.active}</span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
