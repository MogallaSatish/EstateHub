import React from 'react';
import { Link } from 'react-router-dom';
import { DashboardLayout } from '../../components/common/DashboardLayout';
import { PropertyCard } from '../../components/common/PropertyCard';
import { mockProperties, mockInquiries, mockAppointments, mockNotifications } from '../../data/mockData';
import { 
  Heart, 
  MessageSquare, 
  Calendar, 
  Bell, 
  ArrowRight, 
  TrendingUp, 
  ShieldCheck, 
  Building 
} from 'lucide-react';

export const BuyerDashboardPage: React.FC = () => {
  return (
    <DashboardLayout
      portalRole="BUYER"
      title="Buyer Dashboard Overview"
      subtitle="Welcome back, Suresh. Track your active property searches, site visits, and broker replies."
      actions={
        <Link
          to="/properties"
          className="px-4 py-2 rounded-lg bg-[#2563eb] text-white text-xs font-bold hover:bg-[#1d4ed8] transition flex items-center gap-1.5 shadow-sm"
        >
          <Building className="w-3.5 h-3.5" />
          <span>Explore Verified Ventures</span>
        </Link>
      }
    >
      <div className="space-y-8">
        {/* KPI Metrics Strip */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-xl border border-[#e2e8f0] shadow-sm flex items-center justify-between">
            <div>
              <span className="text-[11px] font-bold text-slate-500 uppercase">Saved Favorites</span>
              <div className="text-2xl font-extrabold text-[#001637] mt-1">4 Properties</div>
              <Link to="/buyer/favorites" className="text-xs text-[#2563eb] font-semibold hover:underline mt-1 inline-block">
                View saved listings →
              </Link>
            </div>
            <div className="w-12 h-12 rounded-xl bg-rose-50 text-rose-500 flex items-center justify-center">
              <Heart className="w-6 h-6" />
            </div>
          </div>

          <div className="bg-white p-5 rounded-xl border border-[#e2e8f0] shadow-sm flex items-center justify-between">
            <div>
              <span className="text-[11px] font-bold text-slate-500 uppercase">Active Inquiries</span>
              <div className="text-2xl font-extrabold text-[#001637] mt-1">{mockInquiries.length} Inquiries</div>
              <Link to="/buyer/inquiries" className="text-xs text-[#2563eb] font-semibold hover:underline mt-1 inline-block">
                Check agent threads →
              </Link>
            </div>
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#2563eb] flex items-center justify-center">
              <MessageSquare className="w-6 h-6" />
            </div>
          </div>

          <div className="bg-white p-5 rounded-xl border border-[#e2e8f0] shadow-sm flex items-center justify-between">
            <div>
              <span className="text-[11px] font-bold text-slate-500 uppercase">Scheduled Visits</span>
              <div className="text-2xl font-extrabold text-[#001637] mt-1">{mockAppointments.length} Booked</div>
              <Link to="/buyer/appointments" className="text-xs text-[#2563eb] font-semibold hover:underline mt-1 inline-block">
                View calendar →
              </Link>
            </div>
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <Calendar className="w-6 h-6" />
            </div>
          </div>

          <div className="bg-white p-5 rounded-xl border border-[#e2e8f0] shadow-sm flex items-center justify-between">
            <div>
              <span className="text-[11px] font-bold text-slate-500 uppercase">Unread Alerts</span>
              <div className="text-2xl font-extrabold text-[#001637] mt-1">2 New</div>
              <Link to="/buyer/notifications" className="text-xs text-[#2563eb] font-semibold hover:underline mt-1 inline-block">
                Read alerts →
              </Link>
            </div>
            <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
              <Bell className="w-6 h-6" />
            </div>
          </div>
        </div>

        {/* 2-Columns: Upcoming Visits & Recent Alerts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Upcoming Visits */}
          <div className="bg-white p-6 rounded-2xl border border-[#e2e8f0] shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold text-[#001637] flex items-center gap-2">
                <Calendar className="w-4 h-4 text-[#2563eb]" /> Upcoming Site Inspections
              </h2>
              <Link to="/buyer/appointments" className="text-xs text-[#2563eb] font-bold hover:underline">
                View All
              </Link>
            </div>

            <div className="space-y-3">
              {mockAppointments.map((appt) => (
                <div key={appt.id} className="p-4 rounded-xl border border-slate-200 bg-slate-50 flex items-start gap-4">
                  <img
                    src={appt.propertyImage}
                    alt={appt.propertyTitle}
                    className="w-16 h-16 rounded-lg object-cover shrink-0"
                  />
                  <div className="flex-1">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                      {appt.status}
                    </span>
                    <h3 className="text-xs font-bold text-[#001637] mt-1">{appt.propertyTitle}</h3>
                    <p className="text-[11px] text-slate-500">{appt.date} • {appt.timeSlot}</p>
                    <p className="text-[11px] text-slate-600 mt-1 font-medium">Assigned Agent: {appt.agentName}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Inquiries Snapshot */}
          <div className="bg-white p-6 rounded-2xl border border-[#e2e8f0] shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold text-[#001637] flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-[#2563eb]" /> Recent Property Queries
              </h2>
              <Link to="/buyer/inquiries" className="text-xs text-[#2563eb] font-bold hover:underline">
                View Inbox
              </Link>
            </div>

            <div className="space-y-3">
              {mockInquiries.map((inq) => (
                <div key={inq.id} className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-[#001637]">{inq.propertyTitle}</span>
                    <span className="text-[10px] font-bold text-slate-400">{inq.date}</span>
                  </div>
                  <p className="text-xs text-slate-600 line-clamp-1 italic">"{inq.message}"</p>
                  <div className="pt-1 flex items-center justify-between text-[11px]">
                    <span className="text-[#2563eb] font-bold">{inq.propertyPrice}</span>
                    <span className="text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded">
                      Status: {inq.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recommended Properties Based on Saved Filters */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-[#001637]">
              Recommended for You in Benz Circle & Poranki
            </h2>
            <Link to="/properties" className="text-xs font-bold text-[#2563eb] hover:underline">
              See more recommendations →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockProperties.slice(0, 3).map((property) => (
              <PropertyCard key={property.id} property={property} isBookmarked />
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

