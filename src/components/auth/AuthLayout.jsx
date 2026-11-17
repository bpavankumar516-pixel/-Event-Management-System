import { Link } from 'react-router-dom';
import { Sparkles, Calendar, Users, MapPin, Star, Trophy, Music } from 'lucide-react';

const stats = [
  { icon: Calendar, value: '10K+', label: 'Events Hosted' },
  { icon: Users, value: '50K+', label: 'Happy Attendees' },
  { icon: MapPin, value: '200+', label: 'Premium Venues' },
];

const floatingIcons = [
  { icon: Star, top: '15%', left: '10%', delay: '0s', size: 20 },
  { icon: Trophy, top: '25%', right: '15%', delay: '1s', size: 24 },
  { icon: Music, bottom: '30%', left: '8%', delay: '2s', size: 18 },
  { icon: Sparkles, bottom: '20%', right: '12%', delay: '3s', size: 22 },
  { icon: Calendar, top: '60%', left: '20%', delay: '1.5s', size: 16 },
];

export default function AuthLayout({ children, title, subtitle }) {
  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Left Panel — Cinematic Hero */}
      <div className="hidden lg:flex lg:w-[55%] xl:w-[58%] relative overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-wine via-burgundy to-wine-dark" />

        {/* Event image overlay */}
        <div
          className="absolute inset-0 opacity-20 bg-cover bg-center mix-blend-luminosity"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1200&q=80')`,
          }}
        />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-wine/80 via-burgundy/60 to-transparent" />

        {/* Decorative circles */}
        <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-champagne/5 blur-3xl" />
        <div className="absolute -bottom-32 -right-32 w-[500px] h-[500px] rounded-full bg-burgundy-200/10 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-champagne/5 blur-3xl" />

        {/* Floating icons */}
        {floatingIcons.map((item, i) => {
          const IconComp = item.icon;
          return (
            <div
              key={i}
              className="absolute text-champagne/20 animate-float"
              style={{
                top: item.top,
                left: item.left,
                right: item.right,
                bottom: item.bottom,
                animationDelay: item.delay,
                animationDuration: `${5 + i}s`,
              }}
            >
              <IconComp size={item.size} />
            </div>
          );
        })}

        {/* Content */}
        <div className="relative z-10 flex flex-col justify-between p-12 xl:p-16 w-full">
          {/* Logo */}
          <div className="animate-fade-in">
            <Link to="/" className="inline-flex items-center gap-3 group">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-champagne to-champagne-300 flex items-center justify-center shadow-gold group-hover:scale-110 transition-transform duration-300">
                <Sparkles className="text-wine" size={24} />
              </div>
              <div>
                <h1 className="text-2xl font-display font-bold text-white tracking-wide">
                  Eventora
                </h1>
                <p className="text-xs text-champagne-200/60 font-medium tracking-widest uppercase">
                  Event Management
                </p>
              </div>
            </Link>
          </div>

          {/* Center content */}
          <div className="max-w-lg animate-slide-up">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/10 text-champagne-200 text-sm font-medium mb-8">
              <Sparkles size={14} />
              <span>Trusted by 10,000+ Event Organizers</span>
            </div>

            <h2 className="text-4xl xl:text-5xl font-display font-bold text-white leading-tight mb-6">
              Create{' '}
              <span className="bg-gradient-to-r from-champagne-300 via-champagne to-champagne-200 bg-clip-text text-transparent">
                Unforgettable
              </span>
              <br />
              Experiences
            </h2>

            <p className="text-lg text-gray-300/80 leading-relaxed mb-10 font-light">
              Plan, manage, and execute world-class events with our premium
              all-in-one platform. From intimate gatherings to grand
              celebrations.
            </p>

            {/* Glass stats bar */}
            <div className="flex items-center gap-6">
              {stats.map((stat, i) => {
                const IconComp = stat.icon;
                return (
                  <div
                    key={i}
                    className="flex items-center gap-3 px-5 py-3 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 animate-slide-up"
                    style={{ animationDelay: `${(i + 1) * 200}ms` }}
                  >
                    <div className="w-10 h-10 rounded-xl bg-champagne/20 flex items-center justify-center">
                      <IconComp size={18} className="text-champagne" />
                    </div>
                    <div>
                      <p className="text-lg font-bold text-white">{stat.value}</p>
                      <p className="text-xs text-gray-400">{stat.label}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Bottom quote */}
          <div className="animate-fade-in animation-delay-800">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-champagne to-champagne-300 flex items-center justify-center text-wine font-bold text-sm">
                PK
              </div>
              <div>
                <p className="text-sm text-gray-300 italic">
                  "Eventora transformed how we manage our corporate events."
                </p>
                <p className="text-xs text-champagne-200/60 mt-0.5">
                  — Pavan Kumar, Admin
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel — Form Area */}
      <div className="flex-1 flex flex-col min-h-screen lg:min-h-0">
        {/* Mobile header */}
        <div className="lg:hidden bg-gradient-to-r from-wine to-burgundy px-6 py-5">
          <Link to="/" className="inline-flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-champagne to-champagne-300 flex items-center justify-center shadow-gold">
              <Sparkles className="text-wine" size={18} />
            </div>
            <span className="text-xl font-display font-bold text-white">
              Eventora
            </span>
          </Link>
        </div>

        {/* Form container */}
        <div className="flex-1 flex items-center justify-center px-6 py-10 sm:px-8 lg:px-12 xl:px-20 bg-cream overflow-y-auto">
          <div className="w-full max-w-[460px] animate-fade-in">
            {(title || subtitle) && (
              <div className="mb-8">
                {title && (
                  <h2 className="text-2xl sm:text-3xl font-display font-bold text-gray-900 mb-2 animate-slide-up">
                    {title}
                  </h2>
                )}
                {subtitle && (
                  <p className="text-gray-500 text-sm animate-slide-up animation-delay-200">
                    {subtitle}
                  </p>
                )}
              </div>
            )}
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
