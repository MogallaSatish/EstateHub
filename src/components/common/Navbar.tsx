import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Building2, 
  MapPin, 
  Phone, 
  ShieldCheck, 
  Search, 
  Heart, 
  User as UserIcon, 
  Menu, 
  X, 
  ChevronDown,
  PlusCircle
} from 'lucide-react';
import { UserRole } from '../../types';

interface NavbarProps {
  currentRole?: UserRole;
  onRoleChange?: (role: UserRole) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentRole = 'BUYER', onRoleChange }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Buy', path: '/buy' },
    { name: 'Rent', path: '/rent' },
    { name: 'Search', path: '/properties' },
    { name: 'Agents', path: '/agents' },
    { name: 'About Us', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  const getPortalLink = () => {
    if (currentRole === 'ADMIN') return '/admin/dashboard';
    if (currentRole === 'SELLER') return '/seller/overview';
    return '/buyer/overview';
  };

  const getPortalName = () => {
    if (currentRole === 'ADMIN') return 'Admin Portal';
    if (currentRole === 'SELLER') return 'Seller Desk';
    return 'Buyer Dashboard';
  };

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-[#e2e8f0] shadow-sm">
      {/* Top Utility Bar */}
      <div className="bg-[#001637] text-white text-xs py-2 px-4 sm:px-8 border-b border-[#172b4d]">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-2">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-slate-300">
              <MapPin className="w-3.5 h-3.5 text-[#2563eb]" />
              <span className="font-medium text-white">Vijayawada & AP Capital Region</span>
            </span>
            <span className="hidden sm:inline-block text-slate-500">|</span>
            <span className="hidden sm:flex items-center gap-1.5 text-emerald-400 font-medium">
              <ShieldCheck className="w-3.5 h-3.5" />
              100% AP RERA & CRDA Regulated Listings
            </span>
          </div>

          <div className="flex items-center gap-3">
            <a href="tel:+91866249999" className="hidden md:flex items-center gap-1 text-slate-300 hover:text-white transition">
              <Phone className="w-3 h-3 text-[#2563eb]" />
              <span>Helpline: +91 (866) 249-9999</span>
            </a>

            {/* Quick Demo Role Switcher */}
            <div className="relative">
              <button
                onClick={() => setRoleDropdownOpen(!roleDropdownOpen)}
                className="bg-[#172b4d] hover:bg-[#203a66] text-white px-2.5 py-1 rounded text-xs font-semibold flex items-center gap-1.5 border border-[#34476a] transition"
                title="Switch role view for demo"
              >
                <span>View Role: <strong className="text-[#7ffc97]">{currentRole}</strong></span>
                <ChevronDown className="w-3 h-3" />
              </button>

              {roleDropdownOpen && (
                <div className="absolute right-0 mt-1.5 w-44 bg-white text-slate-800 rounded-lg shadow-xl border border-slate-200 py-1.5 z-50 text-xs">
                  <div className="px-3 py-1 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                    Switch Active Persona
                  </div>
                  {(['BUYER', 'SELLER', 'ADMIN'] as UserRole[]).map((r) => (
                    <button
                      key={r}
                      onClick={() => {
                        onRoleChange?.(r);
                        setRoleDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3 py-1.5 hover:bg-slate-100 flex items-center justify-between ${
                        currentRole === r ? 'font-bold text-[#2563eb] bg-blue-50' : ''
                      }`}
                    >
                      <span>{r === 'BUYER' ? 'Home Buyer' : r === 'SELLER' ? 'Owner / Agent' : 'Site Administrator'}</span>
                      {currentRole === r && <span className="w-1.5 h-1.5 rounded-full bg-[#2563eb]"></span>}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 h-18 flex items-center justify-between">
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="w-10 h-10 rounded-lg bg-[#001637] flex items-center justify-center text-white shadow-md group-hover:bg-[#172b4d] transition">
            <Building2 className="w-6 h-6 text-[#2563eb]" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-xl font-bold tracking-tight text-[#001637] font-['Inter']">Estate<span className="text-[#2563eb]">Hub</span></span>
              <span className="text-[10px] font-bold uppercase bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded border border-emerald-300">AP RERA</span>
            </div>
            <p className="text-[10px] text-slate-500 font-medium tracking-wide">Institutional Trust & Clarity</p>
          </div>
        </Link>

        {/* Desktop Links */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.path}
                to={link.path}
                className={`px-3 py-2 rounded-md text-sm font-semibold transition ${
                  isActive
                    ? 'text-[#2563eb] bg-blue-50/80 font-bold'
                    : 'text-[#1e293b] hover:text-[#2563eb] hover:bg-slate-50'
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* Right CTA Actions */}
        <div className="hidden sm:flex items-center gap-3">
          <Link
            to="/buyer/favorites"
            className="p-2 rounded-lg text-slate-600 hover:text-[#2563eb] hover:bg-slate-100 relative transition"
            title="Saved Favorites"
          >
            <Heart className="w-5 h-5" />
            <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-rose-500"></span>
          </Link>

          <Link
            to={getPortalLink()}
            className="flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-lg border border-[#e2e8f0] text-[#001637] hover:bg-slate-50 transition"
          >
            <UserIcon className="w-4 h-4 text-[#2563eb]" />
            <span>{getPortalName()}</span>
          </Link>

          <Link
            to="/seller/add-property"
            className="flex items-center gap-1.5 text-xs font-bold px-4 py-2 rounded-lg bg-[#2563eb] hover:bg-[#1d4ed8] text-white shadow-sm transition"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Post Property</span>
          </Link>

          <Link
            to="/login"
            className="text-xs font-semibold text-slate-600 hover:text-[#001637] px-2 py-2"
          >
            Sign In
          </Link>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex sm:hidden items-center gap-2">
          <Link
            to="/buyer/favorites"
            className="p-2 rounded-md text-slate-700"
          >
            <Heart className="w-5 h-5 text-rose-500" />
          </Link>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-md text-slate-700 hover:bg-slate-100"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-6 py-4 space-y-3">
          <div className="grid grid-cols-2 gap-2 pb-3 border-b border-slate-100">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`py-2 px-3 rounded text-sm font-medium ${
                  location.pathname === link.path ? 'bg-blue-50 text-[#2563eb] font-bold' : 'text-slate-700'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="flex flex-col gap-2 pt-2">
            <Link
              to={getPortalLink()}
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 w-full py-2.5 rounded-lg border border-slate-200 text-sm font-semibold text-[#001637]"
            >
              <UserIcon className="w-4 h-4 text-[#2563eb]" />
              <span>Go to {getPortalName()}</span>
            </Link>

            <Link
              to="/seller/add-property"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 w-full py-2.5 rounded-lg bg-[#2563eb] text-white text-sm font-bold"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Post New Property</span>
            </Link>

            <div className="flex items-center justify-between pt-2 text-xs text-slate-500">
              <Link to="/login" onClick={() => setMobileMenuOpen(false)} className="underline font-semibold">
                Sign In
              </Link>
              <Link to="/register" onClick={() => setMobileMenuOpen(false)} className="underline font-semibold">
                Register Account
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

