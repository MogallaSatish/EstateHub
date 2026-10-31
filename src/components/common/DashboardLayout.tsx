import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Building2, 
  LayoutDashboard, 
  Heart, 
  MessageSquare, 
  Calendar, 
  Bell, 
  User, 
  ListPlus, 
  FileText, 
  BarChart3, 
  ShieldCheck, 
  Users, 
  FolderCheck, 
  History, 
  Menu, 
  X, 
  LogOut, 
  ChevronRight,
  ArrowLeft,
  Search
} from 'lucide-react';
import { UserRole } from '../../types';
import { mockUsers } from '../../data/mockData';

interface DashboardLayoutProps {
  children: React.ReactNode;
  portalRole: UserRole;
  title: string;
  subtitle?: string;
  actions?: React.ReactNode;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  children,
  portalRole,
  title,
  subtitle,
  actions
}) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  // Find demo user for this role
  const currentUser = mockUsers.find(u => u.role === portalRole) || mockUsers[0];

  const buyerNav = [
    { name: 'Dashboard Overview', path: '/buyer/overview', icon: LayoutDashboard },
    { name: 'Saved Favorites', path: '/buyer/favorites', icon: Heart },
    { name: 'My Inquiries', path: '/buyer/inquiries', icon: MessageSquare },
    { name: 'Site Appointments', path: '/buyer/appointments', icon: Calendar },
    { name: 'Notifications', path: '/buyer/notifications', icon: Bell, badge: '3' },
    { name: 'My Profile', path: '/buyer/profile', icon: User },
  ];

  const sellerNav = [
    { name: 'Seller Overview', path: '/seller/overview', icon: LayoutDashboard },
    { name: 'My Active Listings', path: '/seller/listings', icon: Building2 },
    { name: 'Post New Property', path: '/seller/add-property', icon: ListPlus },
    { name: 'Received Inquiries', path: '/seller/inquiries', icon: MessageSquare, badge: '5' },
    { name: 'Visit Appointments', path: '/seller/appointments', icon: Calendar },
    { name: 'Buyer Messages', path: '/seller/messages', icon: FileText },
    { name: 'Property Analytics', path: '/seller/analytics', icon: BarChart3 },
  ];

  const adminNav = [
    { name: 'Admin Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
    { name: 'Users Management', path: '/admin/users', icon: Users },
    { name: 'Property Inventory', path: '/admin/properties', icon: Building2 },
    { name: 'RERA Approvals Queue', path: '/admin/approvals', icon: FolderCheck, badge: '4' },
    { name: 'Reports & Analytics', path: '/admin/reports', icon: BarChart3 },
    { name: 'System Audit Logs', path: '/admin/audit-logs', icon: History },
  ];

  const navItems = portalRole === 'ADMIN' ? adminNav : portalRole === 'SELLER' ? sellerNav : buyerNav;

  const getPortalLabel = () => {
    if (portalRole === 'ADMIN') return 'Compliance Admin';
    if (portalRole === 'SELLER') return 'Seller & Agent Hub';
    return 'Buyer Portal';
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] flex flex-col font-['Inter']">
      {/* Top Navbar */}
      <header className="bg-white border-b border-[#e2e8f0] sticky top-0 z-40">
        <div className="px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100"
            >
              <Menu className="w-6 h-6" />
            </button>

            <Link to="/" className="flex items-center gap-2 group">
              <div className="w-8 h-8 rounded-lg bg-[#001637] flex items-center justify-center text-white">
                <Building2 className="w-5 h-5 text-[#2563eb]" />
              </div>
              <div className="hidden sm:block">
                <span className="text-lg font-bold text-[#001637]">Estate<span className="text-[#2563eb]">Hub</span></span>
                <span className="ml-2 text-xs font-semibold px-2 py-0.5 rounded bg-blue-50 text-[#2563eb] border border-blue-200">
                  {getPortalLabel()}
                </span>
              </div>
            </Link>
          </div>

          {/* Quick Actions in Dashboard Header */}
          <div className="flex items-center gap-3">
            <Link
              to="/"
              className="hidden md:flex items-center gap-1 text-xs font-semibold text-slate-600 hover:text-[#2563eb] px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 transition"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Public Site</span>
            </Link>

            <Link
              to="/buyer/notifications"
              className="relative p-2 rounded-lg text-slate-600 hover:bg-slate-100 transition"
            >
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-500"></span>
            </Link>

            <div className="flex items-center gap-2 pl-2 border-l border-slate-200">
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="w-8 h-8 rounded-full object-cover border border-slate-300"
              />
              <div className="hidden sm:block text-left">
                <div className="text-xs font-bold text-[#001637]">{currentUser.name}</div>
                <div className="text-[10px] text-slate-500 font-medium">{currentUser.role}</div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Body */}
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar */}
        <aside
          className={`fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-[#e2e8f0] transform lg:transform-none lg:static transition-transform duration-200 flex flex-col ${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          {/* Mobile close button */}
          <div className="lg:hidden p-4 flex items-center justify-between border-b border-slate-100">
            <span className="font-bold text-[#001637]">{getPortalLabel()}</span>
            <button onClick={() => setSidebarOpen(false)} className="p-1 text-slate-500">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* User Badge */}
          <div className="p-4 m-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-3">
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-sm"
            />
            <div className="overflow-hidden">
              <div className="text-xs font-bold text-[#001637] truncate">{currentUser.name}</div>
              <div className="text-[11px] text-slate-500 truncate">{currentUser.email}</div>
              <span className="inline-block mt-1 text-[9px] font-bold px-1.5 py-0.2 rounded bg-emerald-100 text-emerald-800">
                VERIFIED ID
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 px-3 py-2 space-y-1 overflow-y-auto">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              const Icon = item.icon;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-semibold transition ${
                    isActive
                      ? 'bg-[#2563eb] text-white shadow-sm'
                      : 'text-slate-700 hover:bg-slate-100 hover:text-[#001637]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-500'}`} />
                    <span>{item.name}</span>
                  </div>
                  {item.badge && (
                    <span
                      className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${
                        isActive ? 'bg-white text-[#2563eb]' : 'bg-blue-100 text-[#2563eb]'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Switch Role Footer */}
          <div className="p-3 border-t border-slate-200 space-y-1">
            <div className="text-[10px] uppercase font-bold text-slate-400 px-3 py-1">
              Switch Portals
            </div>
            <Link
              to="/buyer/overview"
              className="block px-3 py-1.5 rounded text-xs text-slate-600 hover:bg-slate-100"
            >
              Buyer Dashboard
            </Link>
            <Link
              to="/seller/overview"
              className="block px-3 py-1.5 rounded text-xs text-slate-600 hover:bg-slate-100"
            >
              Seller & Agent Desk
            </Link>
            <Link
              to="/admin/dashboard"
              className="block px-3 py-1.5 rounded text-xs text-slate-600 hover:bg-slate-100"
            >
              Admin & RERA Moderation
            </Link>
            <Link
              to="/login"
              className="flex items-center gap-2 px-3 py-2 text-xs font-semibold text-rose-600 hover:bg-rose-50 rounded mt-2"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </Link>
          </div>
        </aside>

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto">
            {/* Page Header */}
            <div className="mb-6 pb-4 border-b border-[#e2e8f0] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl font-bold text-[#001637] font-['Inter']">{title}</h1>
                {subtitle && <p className="text-xs text-slate-500 mt-1">{subtitle}</p>}
              </div>
              {actions && <div className="flex items-center gap-2">{actions}</div>}
            </div>

            {/* Page Content */}
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

