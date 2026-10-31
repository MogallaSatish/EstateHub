import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DashboardLayout } from '../../components/common/DashboardLayout';
import { 
  Building2, 
  ShieldCheck, 
  PlusCircle, 
  Image as ImageIcon, 
  Save, 
  CheckCircle2,
  ArrowRight
} from 'lucide-react';
import { PropertyType, ListingType } from '../../types';

export const SellerAddPropertyPage: React.FC = () => {
  const navigate = useNavigate();
  const [submitted, setSubmitted] = useState(false);

  // Form State
  const [title, setTitle] = useState('');
  const [propertyType, setPropertyType] = useState<PropertyType>('Apartment');
  const [listingType, setListingType] = useState<ListingType>('SALE');
  const [price, setPrice] = useState<number>(12500000);
  const [locality, setLocality] = useState('Benz Circle');
  const [address, setAddress] = useState('');
  const [bedrooms, setBedrooms] = useState<number>(3);
  const [bathrooms, setBathrooms] = useState<number>(3);
  const [areaSqFt, setAreaSqFt] = useState<number>(2200);
  const [areaSqYards, setAreaSqYards] = useState<number>(244);
  const [facing, setFacing] = useState<'East' | 'North' | 'West' | 'South'>('East');
  const [furnishing, setFurnishing] = useState<'Unfurnished' | 'Semi-Furnished' | 'Fully Furnished'>('Semi-Furnished');
  const [possessionStage, setPossessionStage] = useState<'Ready to Move' | 'Under Construction' | 'Immediate'>('Ready to Move');
  const [reraApproved, setReraApproved] = useState(true);
  const [reraNumber, setReraNumber] = useState('P04260260981');
  const [crdaApproved, setCrdaApproved] = useState(true);
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80');

  // Convert number to Lakhs or Crores display string
  const formatPricePreview = (val: number) => {
    if (val >= 10000000) {
      return `₹${(val / 10000000).toFixed(2)} Cr`;
    }
    return `₹${(val / 100000).toFixed(2)} L`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      navigate('/seller/listings');
    }, 2000);
  };

  return (
    <DashboardLayout
      portalRole="SELLER"
      title="Post New Real Estate Venture / Flat"
      subtitle="Publish your verified property onto EstateHub's Andhra Pradesh public network."
    >
      <div className="max-w-4xl bg-white rounded-2xl border border-[#e2e8f0] shadow-sm p-6 sm:p-8">
        {submitted ? (
          <div className="p-8 text-center space-y-3">
            <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
            <h3 className="text-lg font-bold text-[#001637]">Property Submitted for RERA Verification!</h3>
            <p className="text-xs text-slate-500">
              Your listing has entered the regulatory moderation queue and will go live automatically upon credential check.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* 1. Basic Info */}
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-[#001637] pb-2 border-b border-slate-100 uppercase tracking-wider text-xs">
                1. Basic Property Identification
              </h3>

              <div>
                <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">
                  Property Title / Venture Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Skyline Royale Luxury 3 BHK Residences"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">Listing Type</label>
                  <select
                    value={listingType}
                    onChange={(e) => setListingType(e.target.value as ListingType)}
                    className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold"
                  >
                    <option value="SALE">For Sale</option>
                    <option value="RENT">For Rent</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">Property Category</label>
                  <select
                    value={propertyType}
                    onChange={(e) => setPropertyType(e.target.value as PropertyType)}
                    className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold"
                  >
                    <option value="Apartment">Apartment</option>
                    <option value="Independent Villa">Independent Villa</option>
                    <option value="Residential Plot">Residential Plot</option>
                    <option value="Commercial Showroom">Commercial Showroom</option>
                  </select>
                </div>
              </div>
            </div>

            {/* 2. Pricing & Financials */}
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-[#001637] pb-2 border-b border-slate-100 uppercase tracking-wider text-xs">
                2. Pricing & Valuation in INR
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
                <div>
                  <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">
                    Asking Price (Numeric INR)
                  </label>
                  <input
                    type="number"
                    required
                    value={price}
                    onChange={(e) => setPrice(Number(e.target.value))}
                    className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-bold"
                  />
                </div>

                <div className="p-3 bg-blue-50/80 rounded-xl border border-blue-200 text-xs">
                  <span className="text-slate-500 text-[10px] uppercase font-bold block">Standard Notation Display</span>
                  <div className="text-xl font-extrabold text-[#001637] mt-0.5">
                    {formatPricePreview(price)}
                  </div>
                </div>
              </div>
            </div>

            {/* 3. Location & AP RERA Compliance */}
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-[#001637] pb-2 border-b border-slate-100 uppercase tracking-wider text-xs">
                3. Locality & Legal Sanction
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">Locality</label>
                  <select
                    value={locality}
                    onChange={(e) => setLocality(e.target.value)}
                    className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold"
                  >
                    <option value="Benz Circle">Benz Circle</option>
                    <option value="Poranki">Poranki</option>
                    <option value="Tadepalli">Tadepalli</option>
                    <option value="Gannavaram">Gannavaram</option>
                    <option value="MG Road">MG Road</option>
                    <option value="Enikepadu">Enikepadu</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">
                    AP RERA Registration Number
                  </label>
                  <input
                    type="text"
                    required
                    value={reraNumber}
                    onChange={(e) => setReraNumber(e.target.value)}
                    className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-mono font-bold"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">Physical Site Address</label>
                <input
                  type="text"
                  required
                  placeholder="Plot/Door No, Road name, Landmark, Vijayawada"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold"
                />
              </div>

              <div className="flex items-center gap-6 pt-2">
                <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold">
                  <input
                    type="checkbox"
                    checked={reraApproved}
                    onChange={(e) => setReraApproved(e.target.checked)}
                    className="w-4 h-4 text-[#2563eb] rounded"
                  />
                  <span>AP RERA Certificate Attached</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold">
                  <input
                    type="checkbox"
                    checked={crdaApproved}
                    onChange={(e) => setCrdaApproved(e.target.checked)}
                    className="w-4 h-4 text-[#2563eb] rounded"
                  />
                  <span>AP CRDA Sanctioned Layout</span>
                </label>
              </div>
            </div>

            {/* 4. Specifications */}
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-[#001637] pb-2 border-b border-slate-100 uppercase tracking-wider text-xs">
                4. Architectural Dimensions & Layout
              </h3>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div>
                  <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">Bedrooms</label>
                  <input
                    type="number"
                    value={bedrooms}
                    onChange={(e) => setBedrooms(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-bold"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">Bathrooms</label>
                  <input
                    type="number"
                    value={bathrooms}
                    onChange={(e) => setBathrooms(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-bold"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">Super Area (Sq.Ft)</label>
                  <input
                    type="number"
                    value={areaSqFt}
                    onChange={(e) => setAreaSqFt(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-bold"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">Plot Area (Sq.Yds)</label>
                  <input
                    type="number"
                    value={areaSqYards}
                    onChange={(e) => setAreaSqYards(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-bold"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">Vaastu Facing</label>
                  <select
                    value={facing}
                    onChange={(e) => setFacing(e.target.value as any)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold"
                  >
                    <option value="East">East Facing</option>
                    <option value="North">North Facing</option>
                    <option value="West">West Facing</option>
                    <option value="South">South Facing</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">Furnishing</label>
                  <select
                    value={furnishing}
                    onChange={(e) => setFurnishing(e.target.value as any)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold"
                  >
                    <option value="Semi-Furnished">Semi-Furnished</option>
                    <option value="Fully Furnished">Fully Furnished</option>
                    <option value="Unfurnished">Unfurnished</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">Possession</label>
                  <select
                    value={possessionStage}
                    onChange={(e) => setPossessionStage(e.target.value as any)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold"
                  >
                    <option value="Ready to Move">Ready to Move</option>
                    <option value="Under Construction">Under Construction</option>
                    <option value="Immediate">Immediate</option>
                  </select>
                </div>
              </div>
            </div>

            {/* 5. Photos & Description */}
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-[#001637] pb-2 border-b border-slate-100 uppercase tracking-wider text-xs">
                5. Media & Description
              </h3>

              <div>
                <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">
                  Primary Photo Image URL (High-Resolution)
                </label>
                <input
                  type="url"
                  required
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">
                  Detailed Property Description & Floor Highlights
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="Describe architectural features, clubhouse access, water sources, and distance from major junctions..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold"
                />
              </div>
            </div>

            {/* Submit Bar */}
            <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
              <button
                type="button"
                onClick={() => navigate('/seller/listings')}
                className="text-xs font-bold text-slate-500 hover:text-slate-800"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 rounded-lg bg-[#2563eb] hover:bg-[#1d4ed8] text-white font-bold text-xs shadow-md transition flex items-center gap-2"
              >
                <Save className="w-4 h-4" />
                <span>Submit Listing for Review</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </DashboardLayout>
  );
};

