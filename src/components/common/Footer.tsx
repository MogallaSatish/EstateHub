import React from 'react';
import { Link } from 'react-router-dom';
import { Building2, ShieldCheck, Mail, Phone, MapPin, ArrowRight, CheckCircle2 } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#001637] text-white border-t border-[#172b4d]">
      {/* Top Banner */}
      <div className="border-b border-[#172b4d] py-8 px-4 sm:px-8 bg-[#00132f]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400">
              <ShieldCheck className="w-7 h-7" />
            </div>
            <div>
              <h4 className="text-lg font-bold text-white">100% Legal & Regulatory Certainty</h4>
              <p className="text-sm text-slate-400">
                Every residential, commercial, and open plot venture is cross-verified against AP RERA & CRDA public records.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Link
              to="/properties"
              className="px-5 py-2.5 rounded-lg bg-[#2563eb] hover:bg-[#1d4ed8] text-white font-semibold text-sm transition flex items-center gap-2 shadow-lg shadow-blue-900/30"
            >
              <span>Explore Verified Ventures</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
        {/* Brand Column */}
        <div className="lg:col-span-2 space-y-4">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-lg bg-[#172b4d] flex items-center justify-center text-white">
              <Building2 className="w-6 h-6 text-[#2563eb]" />
            </div>
            <span className="text-2xl font-bold tracking-tight text-white">Estate<span className="text-[#2563eb]">Hub</span></span>
          </Link>
          <p className="text-sm text-slate-300 leading-relaxed max-w-sm">
            Institutional authority and transactional clarity for the Andhra Pradesh capital region real estate market. 
            Empowering property buyers, verified builders, and certified brokers with verified title intelligence.
          </p>

          <div className="pt-2 space-y-2 text-xs text-slate-400">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-blue-400" />
              <span>EstateHub Tower, Benz Circle, MG Road, Vijayawada - 520010</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-blue-400" />
              <span>Toll Free: 1800-425-9988 / +91 (866) 249-9999</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-blue-400" />
              <span>compliance@estatehub.in / support@estatehub.in</span>
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h5 className="text-sm font-bold uppercase tracking-wider text-white mb-4">Discover</h5>
          <ul className="space-y-2.5 text-sm text-slate-400">
            <li><Link to="/buy" className="hover:text-white transition">Buy Properties</Link></li>
            <li><Link to="/rent" className="hover:text-white transition">Rental Flats & Villas</Link></li>
            <li><Link to="/properties" className="hover:text-white transition">CRDA Open Plots</Link></li>
            <li><Link to="/properties" className="hover:text-white transition">Commercial Showrooms</Link></li>
            <li><Link to="/agents" className="hover:text-white transition">Verified Brokers Directory</Link></li>
          </ul>
        </div>

        {/* Localities in Vijayawada & AP */}
        <div>
          <h5 className="text-sm font-bold uppercase tracking-wider text-white mb-4">Prime Localities</h5>
          <ul className="space-y-2.5 text-sm text-slate-400">
            <li><Link to="/properties?locality=Benz Circle" className="hover:text-white transition">Benz Circle</Link></li>
            <li><Link to="/properties?locality=Poranki" className="hover:text-white transition">Poranki & Penamaluru</Link></li>
            <li><Link to="/properties?locality=Tadepalli" className="hover:text-white transition">Tadepalli & Mangalagiri</Link></li>
            <li><Link to="/properties?locality=Gannavaram" className="hover:text-white transition">Gannavaram (Airport Zone)</Link></li>
            <li><Link to="/properties?locality=MG Road" className="hover:text-white transition">MG Road & Labbipet</Link></li>
            <li><Link to="/properties?locality=Enikepadu" className="hover:text-white transition">Enikepadu Bypass</Link></li>
          </ul>
        </div>

        {/* Portals & Legal */}
        <div>
          <h5 className="text-sm font-bold uppercase tracking-wider text-white mb-4">Portals & Compliance</h5>
          <ul className="space-y-2.5 text-sm text-slate-400">
            <li><Link to="/buyer/overview" className="hover:text-white transition">Buyer Dashboard</Link></li>
            <li><Link to="/seller/overview" className="hover:text-white transition">Seller & Agent Desk</Link></li>
            <li><Link to="/admin/dashboard" className="hover:text-white transition">Institutional Admin</Link></li>
            <li><Link to="/about" className="hover:text-white transition">About EstateHub</Link></li>
            <li><Link to="/contact" className="hover:text-white transition">Regulatory Grievance Cell</Link></li>
          </ul>
        </div>
      </div>

      {/* RERA Notice & Legal Disclaimer */}
      <div className="border-t border-[#172b4d] py-6 px-4 sm:px-8 bg-[#001026] text-xs text-slate-400">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-center md:text-left">
            EstateHub is a registered real estate facilitation platform operating strictly in compliance with the Real Estate (Regulation and Development) Act, 2016 (AP RERA). All project details, RERA numbers, and layout authorizations are verified against the Andhra Pradesh Real Estate Regulatory Authority portal.
          </p>
          <div className="flex items-center gap-4 text-xs font-medium text-slate-400 shrink-0">
            <span>© 2026 EstateHub India.</span>
            <Link to="/about" className="hover:underline">Privacy</Link>
            <Link to="/about" className="hover:underline">Terms</Link>
            <Link to="/admin/audit-logs" className="hover:underline">Audit Trail</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

