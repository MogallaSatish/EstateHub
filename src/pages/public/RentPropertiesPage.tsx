import React, { useState } from 'react';
import { Navbar } from '../../components/common/Navbar';
import { Footer } from '../../components/common/Footer';
import { PropertyCard } from '../../components/common/PropertyCard';
import { mockProperties } from '../../data/mockData';
import { KeyRound, ShieldCheck, MapPin } from 'lucide-react';

export const RentPropertiesPage: React.FC = () => {
  const [selectedFurnishing, setSelectedFurnishing] = useState<string>('ALL');
  const [selectedLocality, setSelectedLocality] = useState<string>('ALL');

  const rentProperties = mockProperties.filter(p => p.listingType === 'RENT');

  const filteredProperties = rentProperties.filter(p => {
    if (selectedFurnishing !== 'ALL' && p.furnishing !== selectedFurnishing) return false;
    if (selectedLocality !== 'ALL' && p.locality !== selectedLocality) return false;
    return true;
  });

  return (
    <div className="min-h-screen bg-[#f9f9ff] flex flex-col font-['Inter']">
      <Navbar />

      <div className="bg-[#001637] text-white py-12 px-4 sm:px-8 border-b border-[#172b4d]">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-2 text-xs font-bold text-[#7ffc97] mb-2 uppercase tracking-wider">
            <KeyRound className="w-4 h-4" />
            <span>Verified Residential Rentals & Commercial Spaces</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold font-['Inter']">Rent Properties in Vijayawada</h1>
          <p className="text-slate-300 text-xs sm:text-sm mt-2 max-w-2xl">
            Executive furnished flats, independent homes, and commercial showroom spaces with standard lease agreements.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8 w-full flex-1">
        <div className="bg-white p-4 rounded-xl border border-[#e2e8f0] shadow-sm mb-8 grid grid-cols-1 sm:grid-cols-3 gap-4 items-center">
          <div>
            <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">Furnishing Status</label>
            <select
              value={selectedFurnishing}
              onChange={(e) => setSelectedFurnishing(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold text-slate-800"
            >
              <option value="ALL">All Furnishing Types</option>
              <option value="Fully Furnished">Fully Furnished</option>
              <option value="Semi-Furnished">Semi-Furnished</option>
              <option value="Unfurnished">Unfurnished</option>
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
              <option value="Tadepalli">Tadepalli</option>
              <option value="MG Road">MG Road</option>
              <option value="Benz Circle">Benz Circle</option>
            </select>
          </div>

          <div className="text-right sm:pt-4">
            <span className="text-xs font-bold text-slate-500">
              Showing <strong className="text-[#001637]">{filteredProperties.length}</strong> Rentals Available
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProperties.map(property => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
};

