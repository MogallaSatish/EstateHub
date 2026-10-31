import React, { useState } from 'react';
import { Navbar } from '../../components/common/Navbar';
import { Footer } from '../../components/common/Footer';
import { PropertyCard } from '../../components/common/PropertyCard';
import { mockProperties } from '../../data/mockData';
import { Search, Filter, ShieldCheck, MapPin, SlidersHorizontal } from 'lucide-react';
import { PropertyType } from '../../types';

export const BuyPropertiesPage: React.FC = () => {
  const [selectedType, setSelectedType] = useState<string>('ALL');
  const [selectedLocality, setSelectedLocality] = useState<string>('ALL');
  const [budgetRange, setBudgetRange] = useState<string>('ALL');
  const [reraOnly, setReraOnly] = useState<boolean>(true);

  const buyProperties = mockProperties.filter(p => p.listingType === 'SALE');

  const filteredProperties = buyProperties.filter(property => {
    if (selectedType !== 'ALL' && property.propertyType !== selectedType) return false;
    if (selectedLocality !== 'ALL' && property.locality !== selectedLocality) return false;
    if (reraOnly && !property.reraApproved) return false;
    if (budgetRange === 'under1cr' && property.price >= 10000000) return false;
    if (budgetRange === '1to2cr' && (property.price < 10000000 || property.price > 20000000)) return false;
    if (budgetRange === 'above2cr' && property.price <= 20000000) return false;
    return true;
  });

  return (
    <div className="min-h-screen bg-[#f9f9ff] flex flex-col font-['Inter']">
      <Navbar />

      {/* Header Banner */}
      <div className="bg-[#001637] text-white py-12 px-4 sm:px-8 border-b border-[#172b4d]">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-2 text-xs font-bold text-[#7ffc97] mb-2 uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4" />
            <span>Title-Verified Residential & Commercial Properties</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold font-['Inter']">Buy Properties in Vijayawada & AP</h1>
          <p className="text-slate-300 text-xs sm:text-sm mt-2 max-w-2xl">
            Browse verified luxury flats, independent gated villas, and CRDA approved open ventures. Zero disputes, clear titles.
          </p>
        </div>
      </div>

      {/* Filter and Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8 w-full flex-1">
        {/* Filters Bar */}
        <div className="bg-white p-4 rounded-xl border border-[#e2e8f0] shadow-sm mb-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 items-center">
          <div>
            <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">Property Type</label>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold text-slate-800"
            >
              <option value="ALL">All Categories</option>
              <option value="Apartment">Apartment</option>
              <option value="Independent Villa">Independent Villa</option>
              <option value="Residential Plot">Residential Plot</option>
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">Locality</label>
            <select
              value={selectedLocality}
              onChange={(e) => setSelectedLocality(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold text-slate-800"
            >
              <option value="ALL">All Localities</option>
              <option value="Benz Circle">Benz Circle</option>
              <option value="Poranki">Poranki</option>
              <option value="Gannavaram">Gannavaram</option>
              <option value="Enikepadu">Enikepadu</option>
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">Budget</label>
            <select
              value={budgetRange}
              onChange={(e) => setBudgetRange(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold text-slate-800"
            >
              <option value="ALL">Any Budget</option>
              <option value="under1cr">Under ₹1.00 Cr</option>
              <option value="1to2cr">₹1.00 Cr - ₹2.00 Cr</option>
              <option value="above2cr">Above ₹2.00 Cr</option>
            </select>
          </div>

          <div className="flex items-center gap-2 pt-4">
            <input
              type="checkbox"
              id="reraToggle"
              checked={reraOnly}
              onChange={(e) => setReraOnly(e.target.checked)}
              className="w-4 h-4 text-[#2563eb] rounded border-slate-300 focus:ring-[#2563eb]"
            />
            <label htmlFor="reraToggle" className="text-xs font-semibold text-slate-700 cursor-pointer">
              AP RERA Verified Only
            </label>
          </div>

          <div className="text-right pt-4">
            <span className="text-xs font-bold text-slate-500">
              Showing <strong className="text-[#001637]">{filteredProperties.length}</strong> Results
            </span>
          </div>
        </div>

        {/* Results Grid */}
        {filteredProperties.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProperties.map(property => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-xl border border-slate-200 p-12 text-center max-w-md mx-auto">
            <p className="text-sm font-semibold text-slate-600">No properties matched your selected filters.</p>
            <button
              onClick={() => { setSelectedType('ALL'); setSelectedLocality('ALL'); setBudgetRange('ALL'); setReraOnly(false); }}
              className="mt-3 text-xs font-bold text-[#2563eb] hover:underline"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

