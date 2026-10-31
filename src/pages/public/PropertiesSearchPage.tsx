import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Navbar } from '../../components/common/Navbar';
import { Footer } from '../../components/common/Footer';
import { PropertyCard } from '../../components/common/PropertyCard';
import { mockProperties } from '../../data/mockData';
import { 
  Search, 
  Map, 
  LayoutGrid, 
  SlidersHorizontal, 
  ShieldCheck, 
  ArrowUpDown,
  Building2,
  Check
} from 'lucide-react';
import { PropertyType } from '../../types';

export const PropertiesSearchPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<string>(searchParams.get('propertyType') || 'ALL');
  const [selectedLocality, setSelectedLocality] = useState<string>(searchParams.get('locality') || 'ALL');
  const [listingType, setListingType] = useState<string>(searchParams.get('type') || 'ALL');
  const [sortBy, setSortBy] = useState<string>('featured');
  const [viewMode, setViewMode] = useState<'grid' | 'map'>('grid');
  const [reraOnly, setReraOnly] = useState<boolean>(false);

  useEffect(() => {
    const loc = searchParams.get('locality');
    const type = searchParams.get('propertyType');
    const lType = searchParams.get('type');
    if (loc) setSelectedLocality(loc);
    if (type) setSelectedType(type);
    if (lType) setListingType(lType);
  }, [searchParams]);

  const filteredProperties = mockProperties.filter(property => {
    if (searchTerm) {
      const q = searchTerm.toLowerCase();
      const match = property.title.toLowerCase().includes(q) || 
                    property.locality.toLowerCase().includes(q) ||
                    property.description.toLowerCase().includes(q);
      if (!match) return false;
    }
    if (listingType !== 'ALL' && property.listingType !== listingType) return false;
    if (selectedType !== 'ALL' && property.propertyType !== selectedType) return false;
    if (selectedLocality !== 'ALL' && !property.locality.toLowerCase().includes(selectedLocality.toLowerCase())) return false;
    if (reraOnly && !property.reraApproved) return false;
    return true;
  }).sort((a, b) => {
    if (sortBy === 'price-low') return a.price - b.price;
    if (sortBy === 'price-high') return b.price - a.price;
    return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
  });

  return (
    <div className="min-h-screen bg-[#f9f9ff] flex flex-col font-['Inter']">
      <Navbar />

      {/* Search Header */}
      <div className="bg-white border-b border-[#e2e8f0] px-4 sm:px-8 py-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-[#001637]">All Properties & Search Results</h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Showing {filteredProperties.length} verified listings across Vijayawada and AP Capital Region
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* View toggle */}
            <div className="bg-slate-100 p-1 rounded-lg flex items-center gap-1 border border-slate-200">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded text-xs font-semibold flex items-center gap-1 transition ${
                  viewMode === 'grid' ? 'bg-white shadow text-[#001637]' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <LayoutGrid className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Grid View</span>
              </button>
              <button
                onClick={() => setViewMode('map')}
                className={`p-1.5 rounded text-xs font-semibold flex items-center gap-1 transition ${
                  viewMode === 'map' ? 'bg-white shadow text-[#001637]' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Map className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Map View</span>
              </button>
            </div>

            {/* Sort by */}
            <div className="flex items-center gap-1.5 text-xs text-slate-600 bg-white border border-slate-200 px-3 py-1.5 rounded-lg">
              <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-transparent text-xs font-semibold text-slate-800 focus:outline-none"
              >
                <option value="featured">Featured First</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Layout with Sidebar Filters */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8 w-full flex-1 flex flex-col lg:flex-row gap-8">
        {/* Filters Sidebar */}
        <aside className="w-full lg:w-72 shrink-0 bg-white p-5 rounded-xl border border-[#e2e8f0] shadow-sm space-y-6 h-fit">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <span className="font-bold text-sm text-[#001637] flex items-center gap-1.5">
              <SlidersHorizontal className="w-4 h-4 text-[#2563eb]" /> Filter Results
            </span>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedType('ALL');
                setSelectedLocality('ALL');
                setListingType('ALL');
                setReraOnly(false);
              }}
              className="text-xs font-semibold text-[#2563eb] hover:underline"
            >
              Reset
            </button>
          </div>

          {/* Search Input */}
          <div>
            <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1.5">Keyword Search</label>
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5 pointer-events-none" />
              <input
                type="text"
                placeholder="Search venture or locality..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold text-slate-800 focus:outline-none focus:ring-1 focus:ring-[#2563eb]"
              />
            </div>
          </div>

          {/* Listing Mode */}
          <div>
            <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1.5">Intent</label>
            <div className="grid grid-cols-3 gap-1 bg-slate-100 p-1 rounded-lg">
              {['ALL', 'SALE', 'RENT'].map((t) => (
                <button
                  key={t}
                  onClick={() => setListingType(t)}
                  className={`py-1.5 text-xs font-semibold rounded text-center transition ${
                    listingType === t ? 'bg-white shadow text-[#001637] font-bold' : 'text-slate-600'
                  }`}
                >
                  {t === 'ALL' ? 'All' : t === 'SALE' ? 'Buy' : 'Rent'}
                </button>
              ))}
            </div>
          </div>

          {/* Property Type */}
          <div>
            <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1.5">Property Category</label>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold text-slate-800"
            >
              <option value="ALL">All Categories</option>
              <option value="Apartment">Apartment</option>
              <option value="Independent Villa">Independent Villa</option>
              <option value="Residential Plot">Residential Plot</option>
              <option value="Commercial Showroom">Commercial Showroom</option>
            </select>
          </div>

          {/* Locality */}
          <div>
            <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1.5">Locality</label>
            <select
              value={selectedLocality}
              onChange={(e) => setSelectedLocality(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold text-slate-800"
            >
              <option value="ALL">All Locations</option>
              <option value="Benz Circle">Benz Circle</option>
              <option value="Poranki">Poranki</option>
              <option value="Tadepalli">Tadepalli</option>
              <option value="Gannavaram">Gannavaram</option>
              <option value="MG Road">MG Road</option>
              <option value="Enikepadu">Enikepadu</option>
            </select>
          </div>

          {/* AP RERA verification checkbox */}
          <div className="pt-2 border-t border-slate-100">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={reraOnly}
                onChange={(e) => setReraOnly(e.target.checked)}
                className="w-4 h-4 text-[#2563eb] rounded border-slate-300"
              />
              <span className="text-xs font-semibold text-slate-700 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> AP RERA Regulated Only
              </span>
            </label>
          </div>
        </aside>

        {/* Property Grid or Interactive Map View */}
        <div className="flex-1">
          {viewMode === 'map' ? (
            <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm min-h-[500px] flex flex-col items-center justify-center text-center relative overflow-hidden">
              <div className="w-full h-96 bg-slate-100 rounded-lg border border-slate-200 flex flex-col items-center justify-center relative bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:16px_16px]">
                {/* Simulated Pins */}
                <div className="absolute top-1/4 left-1/3 bg-[#001637] text-white px-2 py-1 rounded-full text-[11px] font-bold shadow-lg flex items-center gap-1 border border-white">
                  <span>Benz Circle: ₹1.45 Cr</span>
                </div>
                <div className="absolute top-1/2 left-2/3 bg-[#001637] text-white px-2 py-1 rounded-full text-[11px] font-bold shadow-lg flex items-center gap-1 border border-white">
                  <span>Poranki: ₹3.20 Cr</span>
                </div>
                <div className="absolute bottom-1/4 left-1/2 bg-[#001637] text-white px-2 py-1 rounded-full text-[11px] font-bold shadow-lg flex items-center gap-1 border border-white">
                  <span>Gannavaram: ₹68 L</span>
                </div>
                <div className="bg-white/90 backdrop-blur-sm p-4 rounded-xl border border-slate-200 max-w-sm shadow">
                  <Map className="w-8 h-8 text-[#2563eb] mx-auto mb-2" />
                  <h4 className="text-sm font-bold text-[#001637]">Interactive Geographic Map</h4>
                  <p className="text-xs text-slate-500 mt-1">
                    Click pins on the Vijayawada-Amaravati grid to inspect cadastral boundaries and RERA layout sanctions.
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredProperties.map(property => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

