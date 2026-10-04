import React, { useState } from 'react';
import { useAdmin } from '../../context/AdminContext.tsx';
import { Lock, Mail, Eye, EyeOff, ShieldCheck, ArrowRight, ExternalLink, AlertCircle } from 'lucide-react';

export const AdminLogin: React.FC = () => {
  const { login, setViewMode } = useAdmin();

  const [email, setEmail] = useState('admin@groupizo.com');
  const [password, setPassword] = useState('••••••••••••');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [resetSent, setResetSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      const success = login(email, password, rememberMe);
      if (!success) {
        setErrorMessage('Invalid username or password. Please verify your credentials.');
      }
    }, 600);
  };

  const handleQuickLogin = (role: 'Super Admin' | 'Moderator') => {
    setEmail(role === 'Super Admin' ? 'elijah@groupizo.com' : 'muqeem.mod@gmail.com');
    setPassword('Groupizo2026!Secure');
    login(role === 'Super Admin' ? 'elijah@groupizo.com' : 'muqeem.mod@gmail.com', 'password', true);
  };

  return (
    <div className="min-h-screen bg-[#0d0f13] flex items-center justify-center p-4 relative overflow-hidden text-gray-200">
      
      {/* Background glow ambiance */}
      <div 
        aria-hidden="true"
        className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-[radial-gradient(ellipse_at_center,rgba(37,211,102,0.12)_0%,transparent_70%)] pointer-events-none" 
      />

      <div className="w-full max-w-md relative z-10">
        
        {/* Brand Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#128C7E] to-[#25D366] text-black font-black text-2xl mb-4 shadow-xl shadow-[#25D366]/20">
            G
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Groupizo Administration
          </h1>
          <p className="text-xs sm:text-sm text-gray-400 mt-1.5">
            Centralized directory management and moderation engine
          </p>
        </div>

        {/* Card */}
        <div className="bg-[#14171d] border border-white/15 rounded-3xl p-6 sm:p-8 shadow-2xl relative">
          
          {errorMessage && (
            <div className="mb-5 p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 text-xs flex items-center gap-2.5">
              <AlertCircle className="w-4 h-4 flex-shrink-0 text-red-400" />
              <span>{errorMessage}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Email / Username */}
            <div>
              <label className="block text-xs font-bold text-gray-300 mb-1.5">
                Admin Email / Username
              </label>
              <div className="relative flex items-center">
                <Mail className="w-4 h-4 text-gray-500 absolute left-3.5" />
                <input
                  type="text"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@groupizo.com"
                  className="w-full bg-[#1b1f28] border border-white/10 focus:border-[#25D366] rounded-xl pl-10 pr-4 py-2.5 text-sm text-white outline-none transition-colors"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-bold text-gray-300">Password</label>
                <button
                  type="button"
                  onClick={() => setShowForgotPassword(true)}
                  className="text-xs text-[#25D366] hover:underline cursor-pointer"
                >
                  Forgot password?
                </button>
              </div>

              <div className="relative flex items-center">
                <Lock className="w-4 h-4 text-gray-500 absolute left-3.5" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full bg-[#1b1f28] border border-white/10 focus:border-[#25D366] rounded-xl pl-10 pr-10 py-2.5 text-sm text-white outline-none transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 text-gray-400 hover:text-white cursor-pointer"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Remember Me */}
            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center gap-2 text-xs text-gray-300 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded border-gray-600 text-[#25D366] focus:ring-[#25D366]"
                />
                <span>Remember me for 30 days</span>
              </label>

              <span className="text-[10px] text-gray-500 flex items-center gap-1">
                <ShieldCheck className="w-3 h-3 text-[#25D366]" /> 256-bit SSL
              </span>
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 bg-[#25D366] hover:bg-[#1ebe5a] text-black font-black text-sm rounded-xl shadow-lg shadow-[#25D366]/25 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {isLoading ? (
                  <span className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <span>Authenticate &amp; Enter Dashboard</span>
                    <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                  </>
                )}
              </button>
            </div>

          </form>

          {/* Quick Demo Credentials */}
          <div className="mt-6 pt-5 border-t border-white/10 text-center">
            <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block mb-2.5">
              One-Click Demo Roles
            </span>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => handleQuickLogin('Super Admin')}
                className="py-1.5 px-3 rounded-lg bg-white/5 hover:bg-white/10 text-xs font-bold text-gray-200 border border-white/10 hover:border-[#25D366] cursor-pointer"
              >
                Super Admin
              </button>
              <button
                onClick={() => handleQuickLogin('Moderator')}
                className="py-1.5 px-3 rounded-lg bg-white/5 hover:bg-white/10 text-xs font-bold text-gray-200 border border-white/10 hover:border-[#25D366] cursor-pointer"
              >
                Moderator
              </button>
            </div>
          </div>

        </div>

        {/* Back to public site button */}
        <div className="mt-6 text-center">
          <button
            onClick={() => setViewMode('public')}
            className="text-xs text-gray-400 hover:text-[#25D366] flex items-center justify-center gap-1.5 mx-auto transition-colors cursor-pointer"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>Return to Public Directory Website</span>
          </button>
        </div>

      </div>

      {/* Forgot Password Modal */}
      {showForgotPassword && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="bg-[#14171d] border border-white/15 rounded-2xl max-w-sm w-full p-6 text-center">
            <div className="w-12 h-12 rounded-full bg-[#25D366]/20 text-[#25D366] flex items-center justify-center mx-auto mb-3">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Password Recovery</h3>
            <p className="text-xs text-gray-400 leading-relaxed mb-4">
              Enter your administrative email address. A one-time security reset link will be dispatched.
            </p>
            {resetSent ? (
              <div className="p-3 bg-[#25D366]/15 border border-[#25D366]/30 text-[#25D366] text-xs font-bold rounded-xl mb-4">
                Recovery email dispatched to {email}.
              </div>
            ) : (
              <input
                type="email"
                defaultValue={email}
                className="w-full bg-[#1b1f28] border border-white/10 rounded-xl px-3 py-2 text-xs text-white mb-4 outline-none"
                placeholder="admin@groupizo.com"
              />
            )}
            <div className="flex gap-2">
              <button
                onClick={() => {
                  setShowForgotPassword(false);
                  setResetSent(false);
                }}
                className="flex-1 py-2 rounded-xl bg-white/10 text-xs font-bold text-gray-300"
              >
                Close
              </button>
              {!resetSent && (
                <button
                  onClick={() => setResetSent(true)}
                  className="flex-1 py-2 rounded-xl bg-[#25D366] text-black text-xs font-extrabold"
                >
                  Send Reset Link
                </button>
              )}
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
