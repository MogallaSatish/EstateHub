import React from 'react';
import { Link } from 'react-router-dom';
import { DashboardLayout } from '../../components/common/DashboardLayout';
import { mockProperties, mockInquiries, mockAppointments } from '../../data/mockData';
import { 
  Building2, 
  Eye, 
  MessageSquare, 
  Calendar, 
  TrendingUp, 
  PlusCircle, 
  ArrowUpRight, 
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';

export const SellerDashboardPage: React.FC = () => {
  return (
    <DashboardLayout
      portalRole="SELLER"
      title="Seller & Agent Performance Overview"
      subtitle="Track listing impressions, qualified buyer inquiries, and upcoming site visits."
      actions={
        <Link
          to="/seller/add-property"
          className="px-4 py-2 rounded-lg bg-[#2563eb] text-white text-xs font-bold hover:bg-[#1d4ed8] transition flex items-center gap-1.5 shadow-sm"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Post New Venture / Flat</span>
        </Link>
      }
    >
      <div className="space-y-8">
        {/* KPI Performance Tiles */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-[#e2e8f0] shadow-sm">
            <div className="flex items-center justify-between text-slate-400 text-xs font-bold uppercase">
              <span>Active Listings</span>
              <Building2 className="w-4 h-4 text-[#2563eb]" />
            </div>
            <div className="text-2xl font-extrabold text-[#001637] mt-2">6 Properties</div>
            <div className="text-[11px] text-emerald-600 font-semibold mt-1 flex items-center gap-1">
              <TrendingUp className="w-3 h-3" /> 100% AP RERA Compliant
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-[#e2e8f0] shadow-sm">
            <div className="flex items-center justify-between text-slate-400 text-xs font-bold uppercase">
              <span>Total Impressions</span>
              <Eye className="w-4 h-4 text-blue-500" />
            </div>
            <div className="text-2xl font-extrabold text-[#001637] mt-2">8,160 Views</div>
            <div className="text-[11px] text-emerald-600 font-semibold mt-1">
              +24% from last 30 days
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-[#e2e8f0] shadow-sm">
            <div className="flex items-center justify-between text-slate-400 text-xs font-bold uppercase">
              <span>Buyer Inquiries</span>
              <MessageSquare className="w-4 h-4 text-purple-500" />
            </div>
            <div className="text-2xl font-extrabold text-[#001637] mt-2">213 Leads</div>
            <div className="text-[11px] text-[#2563eb] font-semibold mt-1">
              5 requires immediate response
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-[#e2e8f0] shadow-sm">
            <div className="flex items-center justify-between text-slate-400 text-xs font-bold uppercase">
              <span>Site Visits</span>
              <Calendar className="w-4 h-4 text-emerald-500" />
            </div>
            <div className="text-2xl font-extrabold text-[#001637] mt-2">18 Scheduled</div>
            <div className="text-[11px] text-emerald-600 font-semibold mt-1">
              2 confirmed this weekend
            </div>
          </div>
        </div>

        {/* Listings Table with Action Buttons */}
        <div className="bg-white rounded-2xl border border-[#e2e8f0] shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-100 flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-[#001637]">Your Published Listings</h2>
              <p className="text-xs text-slate-500">Live on EstateHub public portal</p>
            </div>
            <Link to="/seller/listings" className="text-xs font-bold text-[#2563eb] hover:underline">
              Manage All Listings →
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-400 font-bold uppercase text-[10px] tracking-wider border-b border-slate-100">
                <tr>
                  <th className="py-3 px-6">Property</th>
                  <th className="py-3 px-4">Price</th>
                  <th className="py-3 px-4">Locality</th>
                  <th className="py-3 px-4">RERA Verification</th>
                  <th className="py-3 px-4">Views / Leads</th>
                  <th className="py-3 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700 font-medium">
                {mockProperties.slice(0, 4).map((property) => (
                  <tr key={property.id} className="hover:bg-slate-50/80 transition">
                    <td className="py-4 px-6 flex items-center gap-3">
                      <img
                        src={property.images[0]}
                        alt={property.title}
                        className="w-12 h-12 rounded-lg object-cover border border-slate-200"
                      />
                      <div>
                        <div className="font-bold text-[#001637] line-clamp-1">{property.title}</div>
                        <div className="text-[10px] text-slate-400">{property.propertyType} • {property.possessionStage}</div>
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
                      <span className="font-bold text-slate-900">{property.viewsCount}</span> views / <span className="font-bold text-[#2563eb]">{property.inquiriesCount}</span> leads
                    </td>
                    <td className="py-4 px-6 text-right space-x-2">
                      <Link
                        to={`/seller/edit-property/${property.id}`}
                        className="text-xs font-bold text-[#2563eb] hover:underline"
                      >
                        Edit
                      </Link>
                      <Link
                        to={`/property/${property.id}`}
                        className="text-xs font-bold text-slate-600 hover:text-slate-900"
                      >
                        Preview
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* 2-Columns: Recent Inquiries & Site Appointments */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-[#e2e8f0] shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-[#001637]">Recent Buyer Inquiries</h3>
              <Link to="/seller/inquiries" className="text-xs font-bold text-[#2563eb] hover:underline">
                View Inbox
              </Link>
            </div>
            <div className="space-y-3">
              {mockInquiries.map((inq) => (
                <div key={inq.id} className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-[#001637]">{inq.buyerName}</span>
                    <span className="text-[10px] text-slate-400">{inq.date}</span>
                  </div>
                  <p className="text-xs text-slate-600 italic">"{inq.message}"</p>
                  <div className="text-[11px] text-slate-500 pt-1 flex justify-between">
                    <span>Phone: {inq.buyerPhone}</span>
                    <Link to="/seller/messages" className="text-[#2563eb] font-bold">Reply →</Link>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-[#e2e8f0] shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-[#001637]">Upcoming Site Visits</h3>
              <Link to="/seller/appointments" className="text-xs font-bold text-[#2563eb] hover:underline">
                View Calendar
              </Link>
            </div>
            <div className="space-y-3">
              {mockAppointments.map((appt) => (
                <div key={appt.id} className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between text-xs">
                  <div>
                    <div className="font-bold text-[#001637]">{appt.clientName}</div>
                    <div className="text-slate-500 text-[11px]">{appt.propertyTitle}</div>
                    <div className="text-slate-400 text-[10px] mt-0.5">{appt.date} • {appt.timeSlot}</div>
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                    {appt.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

