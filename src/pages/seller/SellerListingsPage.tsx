import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { DashboardLayout } from '../../components/common/DashboardLayout';
import { mockProperties } from '../../data/mockData';
import { Building2, PlusCircle, ShieldCheck, Edit3, Trash2, Eye, EyeOff } from 'lucide-react';

export const SellerListingsPage: React.FC = () => {
  const [properties, setProperties] = useState(mockProperties);

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this listing from EstateHub?')) {
      setProperties(properties.filter(p => p.id !== id));
    }
  };

  return (
    <DashboardLayout
      portalRole="SELLER"
      title="My Property Portfolio & Listings"
      subtitle="Publish, edit, pause, and audit all properties managed by your agency."
      actions={
        <Link
          to="/seller/add-property"
          className="px-4 py-2 rounded-lg bg-[#2563eb] text-white text-xs font-bold hover:bg-[#1d4ed8] transition flex items-center gap-1.5 shadow-sm"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Add New Property</span>
        </Link>
      }
    >
      <div className="bg-white rounded-2xl border border-[#e2e8f0] shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-400 font-bold uppercase text-[10px] tracking-wider border-b border-slate-100">
              <tr>
                <th className="py-3.5 px-6">Property Name & Category</th>
                <th className="py-3.5 px-4">Price / Valuation</th>
                <th className="py-3.5 px-4">Locality</th>
                <th className="py-3.5 px-4">RERA Compliance</th>
                <th className="py-3.5 px-4">Inquiries</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700 font-medium">
              {properties.map((property) => (
                <tr key={property.id} className="hover:bg-slate-50/80 transition">
                  <td className="py-4 px-6 flex items-center gap-3">
                    <img
                      src={property.images[0]}
                      alt={property.title}
                      className="w-12 h-12 rounded-lg object-cover border border-slate-200"
                    />
                    <div>
                      <div className="font-bold text-[#001637]">{property.title}</div>
                      <div className="text-[10px] text-slate-400">{property.propertyType} • {property.listingType}</div>
                    </div>
                  </td>
                  <td className="py-4 px-4 font-bold text-[#001637] tabular-nums">
                    {property.priceDisplay}
                  </td>
                  <td className="py-4 px-4">{property.locality}</td>
                  <td className="py-4 px-4">
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      <ShieldCheck className="w-3 h-3 text-emerald-600" />
                      {property.reraNumber || 'Verified'}
                    </span>
                  </td>
                  <td className="py-4 px-4 tabular-nums">
                    <span className="font-bold text-[#2563eb]">{property.inquiriesCount} Leads</span>
                  </td>
                  <td className="py-4 px-4">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                      {property.status}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-right space-x-2">
                    <Link
                      to={`/seller/edit-property/${property.id}`}
                      className="inline-block p-1.5 rounded-lg border border-slate-200 text-slate-700 hover:text-[#2563eb] hover:bg-slate-50"
                      title="Edit Property"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                    </Link>
                    <Link
                      to={`/property/${property.id}`}
                      className="inline-block p-1.5 rounded-lg border border-slate-200 text-slate-700 hover:text-[#2563eb] hover:bg-slate-50"
                      title="Preview Listing"
                    >
                      <Eye className="w-3.5 h-3.5" />
                    </Link>
                    <button
                      onClick={() => handleDelete(property.id)}
                      className="p-1.5 rounded-lg border border-slate-200 text-rose-600 hover:bg-rose-50"
                      title="Delete Listing"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
};

