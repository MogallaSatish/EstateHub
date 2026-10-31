import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Heart, 
  MapPin, 
  Bed, 
  Bath, 
  Maximize, 
  ShieldCheck, 
  PhoneCall, 
  ArrowUpRight,
  Eye,
  CheckCircle2
} from 'lucide-react';
import { Property } from '../../types';

interface PropertyCardProps {
  property: Property;
  onBookmarkToggle?: (propertyId: string) => void;
  isBookmarked?: boolean;
}

export const PropertyCard: React.FC<PropertyCardProps> = ({ 
  property, 
  onBookmarkToggle,
  isBookmarked = false 
}) => {
  const [bookmarked, setBookmarked] = useState(isBookmarked);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleBookmark = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setBookmarked(!bookmarked);
    onBookmarkToggle?.(property.id);
  };

  return (
    <div className="group bg-white rounded-xl border border-[#e2e8f0] shadow-sm hover:shadow-md hover:border-[#cbd5e1] transition-all duration-200 overflow-hidden flex flex-col h-full">
      {/* 16:9 Media Header */}
      <div className="relative aspect-video w-full overflow-hidden bg-slate-100">
        <img
          src={property.images[currentImageIndex] || property.images[0]}
          alt={property.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />

        {/* Gradient Mask for legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          {property.reraApproved && (
            <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-[#dcfce7] text-[#15803d] border border-[#bbf7d0] shadow-sm">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>AP RERA Verified</span>
            </div>
          )}

          <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-semibold bg-white/95 text-[#001637] backdrop-blur-sm shadow-sm w-fit">
            <span>{property.possessionStage}</span>
          </div>
        </div>

        {/* Floating Bookmark Button */}
        <button
          onClick={handleBookmark}
          aria-label="Bookmark property"
          className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/90 hover:bg-white text-slate-700 flex items-center justify-center shadow-md transition transform active:scale-90 z-10"
        >
          <Heart className={`w-4 h-4 transition ${bookmarked ? 'fill-rose-500 text-rose-500' : 'text-slate-600'}`} />
        </button>

        {/* Bottom Image Overlay: Property Type and Listing Badge */}
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-xs z-10">
          <span className="font-semibold bg-black/50 px-2 py-0.5 rounded backdrop-blur-sm">
            {property.propertyType}
          </span>
          <span className="font-bold text-[11px] bg-[#2563eb] px-2 py-0.5 rounded shadow">
            {property.listingType === 'SALE' ? 'FOR SALE' : 'FOR RENT'}
          </span>
        </div>
      </div>

      {/* Card Content Block */}
      <div className="p-4 sm:p-5 flex flex-col flex-1">
        {/* Pricing Block with Tabular Figures */}
        <div className="flex items-baseline justify-between gap-2 mb-2">
          <div className="flex items-baseline gap-2">
            <span className="text-xl sm:text-2xl font-bold text-[#172b4d] font-['Inter'] tabular-nums tracking-tight">
              {property.priceDisplay}
            </span>
            <span className="text-xs font-medium text-[#64748b]">
              {property.pricePerUnit}
            </span>
          </div>
          {property.reraNumber && (
            <span className="text-[10px] font-mono text-slate-400 hidden sm:inline" title="RERA Reg Number">
              {property.reraNumber}
            </span>
          )}
        </div>

        {/* Title */}
        <Link to={`/property/${property.id}`} className="hover:text-[#2563eb] transition">
          <h3 className="font-semibold text-base text-[#111c2d] line-clamp-1 group-hover:text-[#2563eb]">
            {property.title}
          </h3>
        </Link>

        {/* Locality Pin */}
        <div className="flex items-center gap-1.5 text-xs text-[#64748b] mt-1 mb-4">
          <MapPin className="w-3.5 h-3.5 text-[#2563eb] shrink-0" />
          <span className="truncate">{property.locality}, {property.city}</span>
        </div>

        {/* 3-Column Specifications Grid */}
        <div className="mt-auto pt-3 border-t border-[#e2e8f0] grid grid-cols-3 gap-2 text-center text-xs text-[#1e293b]">
          {property.bedrooms ? (
            <div className="flex flex-col items-center">
              <span className="flex items-center gap-1 text-[#64748b] text-[11px]">
                <Bed className="w-3.5 h-3.5 text-slate-400" /> Beds
              </span>
              <span className="font-bold text-[#111c2d] mt-0.5">{property.bedrooms} BHK</span>
            </div>
          ) : (
            <div className="flex flex-col items-center">
              <span className="text-[#64748b] text-[11px]">Facing</span>
              <span className="font-bold text-[#111c2d] mt-0.5">{property.facing}</span>
            </div>
          )}

          {property.bathrooms ? (
            <div className="flex flex-col items-center border-x border-[#e2e8f0]">
              <span className="flex items-center gap-1 text-[#64748b] text-[11px]">
                <Bath className="w-3.5 h-3.5 text-slate-400" /> Baths
              </span>
              <span className="font-bold text-[#111c2d] mt-0.5">{property.bathrooms}</span>
            </div>
          ) : (
            <div className="flex flex-col items-center border-x border-[#e2e8f0]">
              <span className="text-[#64748b] text-[11px]">Approval</span>
              <span className="font-bold text-emerald-600 mt-0.5">CRDA / RERA</span>
            </div>
          )}

          <div className="flex flex-col items-center">
            <span className="flex items-center gap-1 text-[#64748b] text-[11px]">
              <Maximize className="w-3.5 h-3.5 text-slate-400" /> Area
            </span>
            <span className="font-bold text-[#111c2d] mt-0.5 tabular-nums">
              {property.areaSqYards ? `${property.areaSqYards} Sq.Yd` : `${property.areaSqFt} Sq.Ft`}
            </span>
          </div>
        </div>

        {/* Quick Action Footer */}
        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
          <Link
            to={`/property/${property.id}`}
            className="flex-1 py-2 px-3 text-center rounded-lg bg-[#2563eb] hover:bg-[#1d4ed8] text-white text-xs font-bold transition flex items-center justify-center gap-1.5 shadow-sm"
          >
            <span>View Details</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>

          <a
            href={`tel:${property.agentPhone}`}
            className="p-2 rounded-lg border border-[#e2e8f0] text-slate-700 hover:text-[#2563eb] hover:bg-slate-50 transition"
            title={`Call Agent: ${property.agentName}`}
          >
            <PhoneCall className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
};

