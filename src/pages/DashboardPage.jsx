import { useAuth } from '../context/AuthContext';
import {
  Sparkles, LogOut, Calendar, Users, MapPin, Ticket, BarChart3,
  TrendingUp, Clock, Zap, ChevronRight, Star, Trophy
} from 'lucide-react';

const statCards = [
  { label: 'Total Events', value: '248', icon: Calendar, change: '+12%', color: 'from-burgundy to-wine', iconBg: 'bg-burgundy/10', iconColor: 'text-burgundy' },
  { label: 'Upcoming Events', value: '36', icon: Clock, change: '+8%', color: 'from-blue-500 to-blue-600', iconBg: 'bg-blue-50', iconColor: 'text-blue-600' },
  { label: 'Total Venues', value: '64', icon: MapPin, change: '+5%', color: 'from-emerald-500 to-emerald-600', iconBg: 'bg-emerald-50', iconColor: 'text-emerald-600' },
  { label: 'Tickets Sold', value: '12.4K', icon: Ticket, change: '+22%', color: 'from-champagne to-champagne-500', iconBg: 'bg-champagne-50', iconColor: 'text-champagne-600' },
  { label: 'Total Attendees', value: '8.2K', icon: Users, change: '+18%', color: 'from-purple-500 to-purple-600', iconBg: 'bg-purple-50', iconColor: 'text-purple-600' },
  { label: 'Revenue', value: '\u20B924.5L', icon: TrendingUp, change: '+15%', color: 'from-green-500 to-green-600', iconBg: 'bg-green-50', iconColor: 'text-green-600' },
];

const quickActions = [
  { label: 'Create Event', icon: Calendar, desc: 'Plan a new event', color: 'bg-burgundy/5 hover:bg-burgundy/10 border-burgundy/10', iconColor: 'text-burgundy' },
  { label: 'Add Venue', icon: MapPin, desc: 'Register a venue', color: 'bg-blue-50 hover:bg-blue-100 border-blue-100', iconColor: 'text-blue-600' },
  { label: 'Book Tickets', icon: Ticket, desc: 'New booking', color: 'bg-champagne-50 hover:bg-champagne-100 border-champagne/20', iconColor: 'text-champagne-600' },
  { label: 'View Reports', icon: BarChart3, desc: 'Analytics & data', color: 'bg-emerald-50 hover:bg-emerald-100 border-emerald-100', iconColor: 'text-emerald-600' },
];

const recentActivities = [
  { text: 'New booking for "Tech Summit 2024"', time: '2 mins ago', icon: Ticket, color: 'text-champagne-600 bg-champagne-50' },
  { text: '"Annual Gala" event created', time: '15 mins ago', icon: Calendar, color: 'text-burgundy bg-burgundy/10' },
  { text: '3 new attendees registered', time: '1 hour ago', icon: Users, color: 'text-blue-600 bg-blue-50' },
  { text: '"Grand Hall" venue updated', time: '2 hours ago', icon: MapPin, color: 'text-emerald-600 bg-emerald-50' },
  { text: 'Monthly report generated', time: '5 hours ago', icon: BarChart3, color: 'text-purple-600 bg-purple-50' },
];

export default function DashboardPage() {
  const { currentUser, logout } = useAuth();

  return (
    <div className="min-h-screen bg-cream">
      {/* Top Navbar */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-champagne to-champagne-300 flex items-center justify-center shadow-gold">
                <Sparkles className="text-wine" size={18} />
              </div>
              <span className="text-xl font-display font-bold text-gray-900">
                Eventora
              </span>
            </div>

            <div className="flex items-center gap-4">
              {/* User info */}
              <div className="hidden sm:flex items-center gap-3 px-4 py-2 rounded-xl bg-cream/80">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-burgundy to-wine flex items-center justify-center text-white text-xs font-bold">
                  {currentUser?.name?.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-800">{currentUser?.name}</p>
                  <p className="text-xs text-gray-400">{currentUser?.role}</p>
                </div>
              </div>

              {/* Logout */}
              <button
                onClick={logout}
                className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium text-gray-600 hover:text-red-600 hover:bg-red-50 transition-all duration-200"
              >
                <LogOut size={16} />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8 animate-slide-up">
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-wine via-burgundy to-wine p-8 text-white">
            {/* Decorative */}
            <div className="absolute -top-20 -right-20 w-60 h-60 rounded-full bg-champagne/10 blur-3xl" />
            <div className="absolute -bottom-10 -left-10 w-40 h-40 rounded-full bg-white/5 blur-2xl" />

            <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-champagne text-xs font-medium mb-3">
                  <Star size={12} />
                  {currentUser?.role} Dashboard
                </div>
                <h1 className="text-2xl sm:text-3xl font-display font-bold mb-1">
                  Welcome back, {currentUser?.name?.split(' ')[0]}! 👋
                </h1>
                <p className="text-gray-300 text-sm">
                  Here's what's happening with your events today.
                </p>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 backdrop-blur-sm border border-white/10">
                <Trophy size={16} className="text-champagne" />
                <span className="text-sm font-medium">Premium Plan</span>
              </div>
            </div>
          </div>
        </div>

        {/* Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
          {statCards.map((card, i) => {
            const Icon = card.icon;
            return (
              <div
                key={i}
                className="group bg-white rounded-2xl p-6 border border-gray-100 hover:border-champagne/30 hover:shadow-lg transition-all duration-300 animate-slide-up cursor-pointer"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 rounded-xl ${card.iconBg} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                    <Icon size={22} className={card.iconColor} />
                  </div>
                  <span className="text-xs font-semibold text-green-600 bg-green-50 px-2.5 py-1 rounded-full">
                    {card.change}
                  </span>
                </div>
                <p className="text-2xl font-bold text-gray-900 mb-1">{card.value}</p>
                <p className="text-sm text-gray-500">{card.label}</p>
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Quick Actions */}
          <div className="lg:col-span-2 animate-slide-up animation-delay-400">
            <h3 className="text-lg font-display font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Zap size={18} className="text-champagne" />
              Quick Actions
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {quickActions.map((action, i) => {
                const Icon = action.icon;
                return (
                  <button
                    key={i}
                    className={`flex flex-col items-center gap-3 p-5 rounded-2xl border ${action.color} transition-all duration-300 hover:scale-105 group`}
                  >
                    <div className="w-11 h-11 rounded-xl bg-white flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow">
                      <Icon size={20} className={action.iconColor} />
                    </div>
                    <div className="text-center">
                      <p className="text-sm font-semibold text-gray-800">{action.label}</p>
                      <p className="text-xs text-gray-400 mt-0.5">{action.desc}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Recent Activities */}
          <div className="lg:col-span-3 animate-slide-up animation-delay-600">
            <h3 className="text-lg font-display font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Clock size={18} className="text-burgundy" />
              Recent Activities
            </h3>
            <div className="bg-white rounded-2xl border border-gray-100 divide-y divide-gray-50">
              {recentActivities.map((activity, i) => {
                const Icon = activity.icon;
                return (
                  <div
                    key={i}
                    className="flex items-center gap-4 p-4 hover:bg-cream/50 transition-colors cursor-pointer group"
                  >
                    <div className={`w-10 h-10 rounded-xl ${activity.color} flex items-center justify-center flex-shrink-0`}>
                      <Icon size={18} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-gray-800 font-medium truncate">
                        {activity.text}
                      </p>
                      <p className="text-xs text-gray-400 mt-0.5">{activity.time}</p>
                    </div>
                    <ChevronRight size={16} className="text-gray-300 group-hover:text-champagne transition-colors" />
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Footer info */}
        <div className="mt-10 text-center text-xs text-gray-400 animate-fade-in animation-delay-800">
          <p>Logged in as <strong className="text-gray-600">{currentUser?.email}</strong> · Session active</p>
        </div>
      </main>
    </div>
  );
}
