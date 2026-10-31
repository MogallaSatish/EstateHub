import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Navbar } from '../../components/common/Navbar';
import { Footer } from '../../components/common/Footer';
import { PropertyCard } from '../../components/common/PropertyCard';
import { mockAgents, mockProperties } from '../../data/mockData';
import { 
  ShieldCheck, 
  Star, 
  Phone, 
  Mail, 
  MapPin, 
  CheckCircle2, 
  Building2, 
  ArrowLeft,
  Calendar
} from 'lucide-react';

export const AgentProfilePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const agent = mockAgents.find(a => a.id === id) || mockAgents[0];
  const agentProperties = mockProperties.filter(p => p.agentId === agent.id);

  const [messageSent, setMessageSent] = useState(false);
  const [leadName, setLeadName] = useState('');
  const [leadPhone, setLeadPhone] = useState('');
  const [leadNote, setLeadNote] = useState('');

  const handleContactAgent = (e: React.FormEvent) => {
    e.preventDefault();
    setMessageSent(true);
    setTimeout(() => setMessageSent(false), 4000);
    setLeadName('');
    setLeadPhone('');
    setLeadNote('');
  };

  return (
    <div className="min-h-screen bg-[#f9f9ff] flex flex-col font-['Inter']">
      <Navbar />

      <div className="bg-white border-b border-[#e2e8f0] px-4 sm:px-8 py-3">
        <div className="max-w-7xl mx-auto flex items-center gap-2 text-xs text-slate-500">
          <Link to="/agents" className="hover:text-[#2563eb] flex items-center gap-1 font-semibold">
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Agents Directory
          </Link>
          <span>/</span>
          <span className="text-[#001637] font-bold">{agent.name}</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8 w-full flex-1 space-y-8">
        {/* Agent Profile Header */}
        <div className="bg-white rounded-2xl border border-[#e2e8f0] p-6 sm:p-8 shadow-sm">
          <div className="flex flex-col md:flex-row gap-6 items-start">
            <img
              src={agent.avatar}
              alt={agent.name}
              className="w-28 h-28 rounded-2xl object-cover border-2 border-slate-100 shadow-md shrink-0"
            />
            <div className="flex-1 space-y-2">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h1 className="text-2xl font-bold text-[#001637] font-['Inter']">{agent.name}</h1>
                  <p className="text-xs text-slate-500 font-semibold">{agent.title} • {agent.agency}</p>
                </div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>RERA: {agent.reraRegistrationNumber}</span>
                </div>
              </div>

              <div className="flex items-center gap-2 text-xs text-amber-500 font-bold">
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                <span>{agent.rating} Rating</span>
                <span className="text-slate-400 font-normal">({agent.reviewsCount} verified client reviews)</span>
              </div>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed pt-2">
                {agent.bio}
              </p>

              <div className="pt-3 flex flex-wrap gap-4 text-xs font-semibold text-slate-700">
                <span className="flex items-center gap-1 text-slate-600">
                  <Phone className="w-3.5 h-3.5 text-[#2563eb]" /> {agent.phone}
                </span>
                <span className="flex items-center gap-1 text-slate-600">
                  <Mail className="w-3.5 h-3.5 text-[#2563eb]" /> {agent.email}
                </span>
                <span className="flex items-center gap-1 text-slate-600">
                  <Building2 className="w-3.5 h-3.5 text-[#2563eb]" /> {agent.dealsClosed}+ Closed Deals
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* 2-Columns: Active Listings & Message Form */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Active Listings Portfolio */}
          <div className="lg:col-span-2 space-y-4">
            <h2 className="text-xl font-bold text-[#001637]">
              Active Properties by {agent.name} ({agentProperties.length})
            </h2>

            {agentProperties.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {agentProperties.map(property => (
                  <PropertyCard key={property.id} property={property} />
                ))}
              </div>
            ) : (
              <div className="p-8 text-center bg-white rounded-xl border border-slate-200">
                <p className="text-xs text-slate-500 font-semibold">No active listings currently under this broker.</p>
              </div>
            )}
          </div>

          {/* Quick Contact Form */}
          <div className="bg-white rounded-2xl border border-[#e2e8f0] p-6 shadow-sm h-fit space-y-4">
            <h3 className="text-base font-bold text-[#001637]">Contact {agent.name}</h3>
            <p className="text-xs text-slate-500">
              Inquire about active listings or request custom property consultation in Vijayawada.
            </p>

            {messageSent ? (
              <div className="p-4 rounded-xl bg-emerald-50 text-emerald-800 text-xs font-semibold text-center">
                Message delivered to {agent.name}. Expect a phone response shortly!
              </div>
            ) : (
              <form onSubmit={handleContactAgent} className="space-y-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">Your Name</label>
                  <input
                    type="text"
                    required
                    value={leadName}
                    onChange={(e) => setLeadName(e.target.value)}
                    placeholder="Enter your name"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">Phone Number</label>
                  <input
                    type="tel"
                    required
                    value={leadPhone}
                    onChange={(e) => setLeadPhone(e.target.value)}
                    placeholder="+91 98480 00000"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">Message</label>
                  <textarea
                    rows={3}
                    required
                    value={leadNote}
                    onChange={(e) => setLeadNote(e.target.value)}
                    placeholder="Describe what kind of property you are looking for..."
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 rounded-lg bg-[#2563eb] hover:bg-[#1d4ed8] text-white font-bold text-xs shadow-md transition"
                >
                  Send Direct Inquiry
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

