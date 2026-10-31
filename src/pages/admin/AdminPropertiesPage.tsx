import React, { useState } from 'react';
import { DashboardLayout } from '../../components/common/DashboardLayout';
import { mockProperties } from '../../data/mockData';
import { Building2, ShieldCheck, Search, Trash2, Eye, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

export const AdminPropertiesPage: React.FC = () => {
  const [properties, setProperties] = useState(mockProperties);
  const [searchTerm, setSearchTerm] = useState('');

  const toggleFeatured = (id: string) => {
    setProperties(properties.map(p => p.id === id ? { ...p, featured: !p.featured } : p));
  };

  const filteredProperties = properties.filter(p => {
    if (searchTerm) {
      const q = searchTerm.toLowerCase();
      return p.title.toLowerCase().includes(q) || p.locality.toLowerCase().includes(q);
    }
    return true;
  });

  return (
    <DashboardLayout
      portalRole="ADMIN"
      title="Universal Property Inventory & Control"
      subtitle="Audit, moderate, feature, or suspend any residential or commercial asset on EstateHub."
    >
      <div className="bg-white rounded-2xl border border-[#e2e8f0] shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
          <div className="relative w-full max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search by property title, RERA code, or locality..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold"
            />
          </div>
          <span className="text-xs font-bold text-slate-500">
            {filteredProperties.length} Total Registered Assets
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-400 font-bold uppercase text-[10px] tracking-wider border-b border-slate-100">
              <tr>
                <th className="py-3 px-6">Property / Venture</th>
                <th className="py-3 px-4">Price</th>
                <th className="py-3 px-4">Locality</th>
                <th className="py-3 px-4">AP RERA Code</th>
                <th className="py-3 px-4">Promoter / Agent</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-6 text-right">Admin Controls</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700 font-medium">
              {filteredProperties.map((property) => (
                <tr key={property.id} className="hover:bg-slate-50/80 transition">
                  <td className="py-4 px-6 flex items-center gap-3">
                    <img
                      src={property.images[0]}
                      alt={property.title}
                      className="w-12 h-12 rounded-lg object-cover border border-slate-200"
                    />
                    <div>
                      <div className="font-bold text-[#001637]">{property.title}</div>
                      <div className="text-[10px] text-slate-400">{property.propertyType}</div>
                    </div>
                  </td>
                  <td className="py-4 px-4 font-bold text-[#001637] tabular-nums">
                    {property.priceDisplay}
                  </td>
                  <td className="py-4 px-4">{property.locality}</td>
                  <td className="py-4 px-4 font-mono text-[11px] font-bold text-slate-600">
                    {property.reraNumber || 'PENDING'}
                  </td>
                  <td className="py-4 px-4">{property.agentName}</td>
                  <td className="py-4 px-4">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800">
                      {property.status}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-right space-x-2">
                    <button
                      onClick={() => toggleFeatured(property.id)}
                      className={`p-1.5 rounded-lg border text-xs font-bold transition ${
                        property.featured
                          ? 'bg-amber-50 text-amber-600 border-amber-200'
                          : 'border-slate-200 text-slate-400 hover:text-amber-500'
                      }`}
                      title="Toggle Featured Badge"
                    >
                      <Star className="w-3.5 h-3.5 fill-current" />
                    </button>
                    <Link
                      to={`/property/${property.id}`}
                      className="inline-block p-1.5 rounded-lg border border-slate-200 text-slate-700 hover:text-[#2563eb]"
                      title="Inspect Public Listing"
                    >
                      <Eye className="w-3.5 h-3.5" />
                    </Link>
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

