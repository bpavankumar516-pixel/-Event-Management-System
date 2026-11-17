import { useState } from 'react';
import { Copy, Check, LogIn, User, Mail, Lock } from 'lucide-react';
import { toast } from 'react-toastify';

const credentials = {
  name: 'Pavan Kumar',
  email: 'pavan@eventora.com',
  password: 'Pavan@123',
  role: 'Admin',
};

export default function DemoCredentials({ onUseDemo, loading }) {
  const [copiedField, setCopiedField] = useState(null);

  const copyToClipboard = async (text, field) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedField(field);
      toast.success(`${field} copied to clipboard!`, { autoClose: 1500 });
      setTimeout(() => setCopiedField(null), 2000);
    } catch {
      toast.error('Failed to copy');
    }
  };

  return (
    <div className="mt-6 animate-slide-up animation-delay-600">
      {/* Divider */}
      <div className="flex items-center gap-3 mb-5">
        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
        <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">
          Demo Access
        </span>
        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
      </div>

      {/* Demo card */}
      <div className="relative rounded-2xl border border-champagne/20 bg-gradient-to-br from-champagne-50/80 to-cream overflow-hidden">
        {/* Shimmer effect */}
        <div className="absolute inset-0 opacity-30 bg-gradient-to-r from-transparent via-champagne/10 to-transparent animate-shimmer bg-[length:200%_100%]" />

        <div className="relative p-5">
          {/* Header */}
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-champagne to-champagne-300 flex items-center justify-center">
              <User size={14} className="text-wine" />
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-800">{credentials.name}</p>
              <p className="text-xs text-champagne-600 font-medium">{credentials.role} Account</p>
            </div>
          </div>

          {/* Credential rows */}
          <div className="space-y-2.5">
            <div className="flex items-center justify-between gap-3 px-3.5 py-2.5 rounded-xl bg-white/80 border border-champagne/10">
              <div className="flex items-center gap-2.5 min-w-0">
                <Mail size={14} className="text-champagne-600 flex-shrink-0" />
                <span className="text-sm text-gray-700 font-mono truncate">{credentials.email}</span>
              </div>
              <button
                onClick={() => copyToClipboard(credentials.email, 'Email')}
                className="flex-shrink-0 p-1.5 rounded-lg hover:bg-champagne/10 transition-colors"
                title="Copy email"
              >
                {copiedField === 'Email' ? (
                  <Check size={14} className="text-green-500" />
                ) : (
                  <Copy size={14} className="text-gray-400" />
                )}
              </button>
            </div>

            <div className="flex items-center justify-between gap-3 px-3.5 py-2.5 rounded-xl bg-white/80 border border-champagne/10">
              <div className="flex items-center gap-2.5 min-w-0">
                <Lock size={14} className="text-champagne-600 flex-shrink-0" />
                <span className="text-sm text-gray-700 font-mono">{credentials.password}</span>
              </div>
              <button
                onClick={() => copyToClipboard(credentials.password, 'Password')}
                className="flex-shrink-0 p-1.5 rounded-lg hover:bg-champagne/10 transition-colors"
                title="Copy password"
              >
                {copiedField === 'Password' ? (
                  <Check size={14} className="text-green-500" />
                ) : (
                  <Copy size={14} className="text-gray-400" />
                )}
              </button>
            </div>
          </div>

          {/* Use Demo button */}
          <button
            onClick={onUseDemo}
            disabled={loading}
            className="mt-4 w-full flex items-center justify-center gap-2 py-3 rounded-xl
                       bg-gradient-to-r from-champagne to-champagne-300 text-wine
                       font-semibold text-sm
                       hover:shadow-lg hover:shadow-champagne/30
                       active:scale-[0.98] transition-all duration-300
                       disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <LogIn size={16} />
            Use Demo Account
          </button>
        </div>
      </div>
    </div>
  );
}
