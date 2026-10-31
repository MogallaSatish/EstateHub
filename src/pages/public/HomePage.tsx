import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Search, 
  MapPin, 
  Building2, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowRight, 
  Filter, 
  Sparkles,
  TrendingUp,
  Award,
  Users,
  Building,
  KeyRound,
  FileCheck
} from 'lucide-react';
import { Navbar } from '../../components/common/Navbar';
import { Footer } from '../../components/common/Footer';
import { PropertyCard } from '../../components/common/PropertyCard';
import { mockProperties } from '../../data/mockData';
import { PropertyType } from '../../types';

export const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'SALE' | 'RENT'>('SALE');
  const [selectedLocality, setSelectedLocality] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [selectedBudget, setSelectedBudget] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<'ALL' | PropertyType>('ALL');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (activeTab === 'RENT') params.append('type', 'RENT');
    if (selectedLocality) params.append('locality', selectedLocality);
    if (selectedType) params.append('propertyType', selectedType);
    navigate(`/properties?${params.toString()}`);
  };

  const filteredProperties = categoryFilter === 'ALL'
    ? mockProperties
    : mockProperties.filter(p => p.propertyType === categoryFilter);

  const localities = [
    { name: 'Benz Circle', count: '142 Properties', image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=600&q=80' },
    { name: 'Poranki & Penamaluru', count: '89 Villas & Plots', image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80' },
    { name: 'Tadepalli & Mangalagiri', count: '114 Riverside High-rises', image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=600&q=80' },
    { name: 'Gannavaram', count: '76 CRDA Open Plots', image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=600&q=80' },
    { name: 'MG Road', count: '48 Commercial Spaces', image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=600&q=80' },
    { name: 'Enikepadu', count: '62 Gated Ventures', image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=600&q=80' }
  ];

  return (
    <div className="min-h-screen bg-[#f9f9ff] flex flex-col font-['Inter']">
      <Navbar />

      {/* Hero Section */}
      <section className="relative bg-[#001637] text-white overflow-hidden py-16 sm:py-24 px-4 sm:px-8">
        {/* Background architectural image with overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-25 scale-105"
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2000&q=80')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#001637] via-[#001637]/90 to-transparent pointer-events-none" />

        <div className="relative max-w-7xl mx-auto z-10">
          <div className="max-w-3xl">
            {/* Top pill badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-[#172b4d] border border-[#34476a] text-[#7ffc97] mb-6 shadow-md">
              <ShieldCheck className="w-4 h-4 text-[#7ffc97]" />
              <span>Andhra Pradesh Certified Real Estate Portal</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.15] mb-6 font-['Inter']">
              Find Your Perfect Place to <span className="text-[#2563eb]">Call Home</span>
            </h1>

            <p className="text-base sm:text-lg text-slate-300 mb-8 max-w-2xl leading-relaxed">
              Explore verified luxury apartments, gated villas, and CRDA-sanctioned open plots across Vijayawada and Amaravati capital region with 100% legal title confidence.
            </p>
          </div>

          {/* Unified Search Filter Box */}
          <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-2xl border border-slate-200 text-slate-900 max-w-4xl">
            {/* Tabs (Buy / Rent) */}
            <div className="flex items-center gap-3 mb-4 pb-3 border-b border-slate-100">
              <button
                type="button"
                onClick={() => setActiveTab('SALE')}
                className={`px-5 py-2 rounded-lg text-xs font-bold transition flex items-center gap-2 ${
                  activeTab === 'SALE'
                    ? 'bg-[#001637] text-white shadow-sm'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                <Building className="w-4 h-4" />
                <span>Buy Properties</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('RENT')}
                className={`px-5 py-2 rounded-lg text-xs font-bold transition flex items-center gap-2 ${
                  activeTab === 'RENT'
                    ? 'bg-[#001637] text-white shadow-sm'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                <KeyRound className="w-4 h-4" />
                <span>Rentals & Commercial</span>
              </button>
            </div>

            {/* Form Fields */}
            <form onSubmit={handleSearch} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 items-end">
              <div>
                <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                  Micro-Market / Locality
                </label>
                <div className="relative">
                  <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-3 pointer-events-none" />
                  <select
                    value={selectedLocality}
                    onChange={(e) => setSelectedLocality(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#2563eb]"
                  >
                    <option value="">All Vijayawada Areas</option>
                    <option value="Benz Circle">Benz Circle</option>
                    <option value="Poranki">Poranki & Penamaluru</option>
                    <option value="Tadepalli">Tadepalli & Mangalagiri</option>
                    <option value="Gannavaram">Gannavaram (Airport)</option>
                    <option value="MG Road">MG Road Corridor</option>
                    <option value="Enikepadu">Enikepadu Bypass</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                  Property Category
                </label>
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#2563eb]"
                >
                  <option value="">All Categories</option>
                  <option value="Apartment">Luxury Apartments</option>
                  <option value="Independent Villa">Independent Villas</option>
                  <option value="Residential Plot">CRDA Open Plots</option>
                  <option value="Commercial Showroom">Commercial Showrooms</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                  Budget (INR)
                </label>
                <select
                  value={selectedBudget}
                  onChange={(e) => setSelectedBudget(e.target.value)}
                  className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#2563eb]"
                >
                  <option value="">Any Budget</option>
                  <option value="under50">Under ₹50 Lakhs</option>
                  <option value="50to1cr">₹50 Lakhs - ₹1 Crore</option>
                  <option value="1to2cr">₹1 Crore - ₹2 Crores</option>
                  <option value="above2cr">₹2 Crores & Above</option>
                </select>
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full py-2.5 px-4 rounded-lg bg-[#2563eb] hover:bg-[#1d4ed8] text-white font-bold text-xs shadow-md transition flex items-center justify-center gap-2 h-10"
                >
                  <Search className="w-4 h-4" />
                  <span>Search Properties</span>
                </button>
              </div>
            </form>
          </div>

          {/* Quick Trust Statistics */}
          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 border-t border-[#172b4d]/80 text-center sm:text-left">
            <div>
              <div className="text-2xl sm:text-3xl font-extrabold text-white tabular-nums">1,240+</div>
              <div className="text-xs text-slate-400 font-medium mt-0.5">AP RERA Verified Listings</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-extrabold text-[#7ffc97] tabular-nums">100%</div>
              <div className="text-xs text-slate-400 font-medium mt-0.5">CRDA Sanction Audited</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-extrabold text-white tabular-nums">₹540 Cr+</div>
              <div className="text-xs text-slate-400 font-medium mt-0.5">Facilitated Transactions</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-extrabold text-[#2563eb] tabular-nums">8,500+</div>
              <div className="text-xs text-slate-400 font-medium mt-0.5">Satisfied Home Owners</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Properties Section */}
      <section className="py-14 px-4 sm:px-8 max-w-7xl mx-auto w-full">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-[#2563eb] uppercase tracking-wider mb-1">
              <Sparkles className="w-4 h-4" />
              <span>Handpicked Portfolio</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#001637] font-['Inter']">
              Featured Properties in Vijayawada
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Prime residential and investment options with certified documentation.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-2">
            {(['ALL', 'Apartment', 'Independent Villa', 'Residential Plot', 'Commercial Showroom'] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => setCategoryFilter(cat)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold transition ${
                  categoryFilter === cat
                    ? 'bg-[#001637] text-white shadow-sm'
                    : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
                }`}
              >
                {cat === 'ALL' ? 'All Types' : cat}
              </button>
            ))}
          </div>
        </div>

        {/* Property Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProperties.slice(0, 6).map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link
            to="/properties"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-[#001637] hover:bg-[#172b4d] text-white text-xs font-bold shadow-md transition"
          >
            <span>View All 1,240+ Properties</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Explore Popular Localities */}
      <section className="bg-slate-100/70 py-16 px-4 sm:px-8 border-y border-slate-200">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#001637]">
              Explore Popular Micro-Markets
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-2">
              High-appreciation residential sectors and rapid infrastructure corridors in the capital region.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {localities.map((loc) => (
              <Link
                key={loc.name}
                to={`/properties?locality=${encodeURIComponent(loc.name.split(' ')[0])}`}
                className="group relative rounded-xl overflow-hidden aspect-[4/3] shadow-sm hover:shadow-lg transition-all border border-slate-200"
              >
                <img
                  src={loc.image}
                  alt={loc.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <h3 className="text-lg font-bold group-hover:text-blue-300 transition">{loc.name}</h3>
                  <div className="flex items-center justify-between text-xs text-slate-300 mt-1">
                    <span>{loc.count}</span>
                    <span className="flex items-center gap-1 text-[#7ffc97] font-semibold text-[11px]">
                      Explore <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Institutional Value Proposition */}
      <section className="py-16 px-4 sm:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#001637]">
            Why Choose EstateHub?
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-2">
            Precision blueprints meet institutional banking. Engineered to reduce buyer friction in high-value real estate.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-xl border border-[#e2e8f0] shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-[#001637]">100% AP RERA Verification</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Every project registration certificate, promoter credentials, and quarterly construction updates are verified against state regulatory archives.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl border border-[#e2e8f0] shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-lg bg-blue-50 text-[#2563eb] flex items-center justify-center">
              <FileCheck className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-[#001637]">CRDA & Master Plan Conformance</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Open plots and ventures are mapped against capital region master zoning, ensuring zero road-widening or alignment disputes.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl border border-[#e2e8f0] shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <Users className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-[#001637]">Certified Broker Network</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Only licensed agents with valid AP RERA agent registrations and proven closing histories are authorized on our platform.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

