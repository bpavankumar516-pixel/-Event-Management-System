import { Loader2 } from 'lucide-react';

export default function LoadingScreen() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-cream">
      <div className="relative">
        <div className="w-16 h-16 rounded-full border-4 border-cream-dark border-t-champagne animate-spin" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-burgundy to-wine animate-pulse" />
        </div>
      </div>
      <p className="mt-6 text-lg font-display text-burgundy tracking-wide animate-pulse">
        Eventora
      </p>
      <p className="mt-1 text-sm text-gray-400">Loading your experience...</p>
    </div>
  );
}
