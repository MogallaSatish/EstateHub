import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Navbar } from '../../components/common/Navbar';
import { Footer } from '../../components/common/Footer';
import { mockAgents } from '../../data/mockData';
import { 
  Users, 
  ShieldCheck, 
  Star, 
  Phone, 
  Mail, 
  Building2, 
  MapPin, 
  ArrowRight,
  Search
} from 'lucide-react';

export const AgentsDirectoryPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLocality, setSelectedLocality] = useState('ALL');

  const filteredAgents = mockAgents.filter(agent => {
    if (searchTerm) {
      const q = searchTerm.toLowerCase();
      const match = agent.name.toLowerCase().includes(q) || 
                    agent.agency.toLowerCase().includes(q) ||
                    agent.reraRegistrationNumber.toLowerCase().includes(q);
      if (!match) return false;
    }
    if (selectedLocality !== 'ALL' && !agent.operationalLocalities.includes(selectedLocality)) {
      return false;
    }
    return true;
  });

  return (
    <div className="min-h-screen bg-[#f9f9ff] flex flex-col font-['Inter']">
      <Navbar />

      <div className="bg-[#001637] text-white py-12 px-4 sm:px-8 border-b border-[#172b4d]">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-2 text-xs font-bold text-[#7ffc97] mb-2 uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4" />
            <span>Authorized AP RERA Broker Network</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold font-['Inter']">Verified Real Estate Agents</h1>
          <p className="text-slate-300 text-xs sm:text-sm mt-2 max-w-2xl">
            Connect with licensed property advisors across Vijayawada, Guntur, and the capital development corridor.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8 w-full flex-1">
        {/* Search & Filter Bar */}
        <div className="bg-white p-4 rounded-xl border border-[#e2e8f0] shadow-sm mb-8 flex flex-col sm:flex-row gap-4 justify-between items-center">
          <div className="relative flex-1 w-full sm:max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search by agent name, agency, or RERA ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold text-slate-800"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <span className="text-xs text-slate-500 font-semibold whitespace-nowrap">Locality:</span>
            <select
              value={selectedLocality}
              onChange={(e) => setSelectedLocality(e.target.value)}
              className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold text-slate-800"
            >
              <option value="ALL">All Localities</option>
              <option value="Benz Circle">Benz Circle</option>
              <option value="Poranki">Poranki</option>
              <option value="Tadepalli">Tadepalli</option>
              <option value="MG Road">MG Road</option>
            </select>
          </div>
        </div>

        {/* Agents Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAgents.map(agent => (
            <div key={agent.id} className="bg-white rounded-2xl border border-[#e2e8f0] shadow-sm p-6 flex flex-col justify-between hover:shadow-md transition">
              <div>
                <div className="flex items-start gap-4 mb-4">
                  <img
                    src={agent.avatar}
                    alt={agent.name}
                    className="w-16 h-16 rounded-full object-cover border-2 border-slate-100 shadow-sm"
                  />
                  <div>
                    <h3 className="text-base font-bold text-[#001637]">{agent.name}</h3>
                    <p className="text-xs text-slate-500 font-medium">{agent.title}</p>
                    <p className="text-xs font-semibold text-[#2563eb]">{agent.agency}</p>
                    
                    <div className="flex items-center gap-1 text-xs text-amber-500 mt-1 font-bold">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      <span>{agent.rating}</span>
                      <span className="text-slate-400 text-[10px] font-normal">({agent.reviewsCount} verified reviews)</span>
                    </div>
                  </div>
                </div>

                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200 mb-4 w-full">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span className="truncate">RERA: {agent.reraRegistrationNumber}</span>
                </div>

                <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed mb-4">
                  {agent.bio}
                </p>

                {/* Localities covered */}
                <div className="mb-4">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Coverage Areas</span>
                  <div className="flex flex-wrap gap-1">
                    {agent.operationalLocalities.map(loc => (
                      <span key={loc} className="text-[10px] font-semibold bg-slate-100 text-slate-700 px-2 py-0.5 rounded">
                        {loc}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Stats & Actions */}
              <div className="pt-4 border-t border-slate-100">
                <div className="grid grid-cols-2 gap-2 text-center text-xs mb-4">
                  <div className="p-2 rounded-lg bg-slate-50">
                    <span className="text-slate-400 text-[10px] block">Active Listings</span>
                    <span className="font-bold text-[#001637]">{agent.activeListingsCount} Properties</span>
                  </div>
                  <div className="p-2 rounded-lg bg-slate-50">
                    <span className="text-slate-400 text-[10px] block">Experience</span>
                    <span className="font-bold text-[#001637]">{agent.experienceYears} Years</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Link
                    to={`/agent/${agent.id}`}
                    className="flex-1 py-2 text-center rounded-lg bg-[#2563eb] hover:bg-[#1d4ed8] text-white text-xs font-bold transition flex items-center justify-center gap-1"
                  >
                    <span>View Profile</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                  <a
                    href={`tel:${agent.phone}`}
                    className="p-2 rounded-lg border border-slate-200 text-slate-700 hover:text-[#2563eb] hover:bg-slate-50"
                  >
                    <Phone className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
};

