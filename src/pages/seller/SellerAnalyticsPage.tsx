import React from 'react';
import { DashboardLayout } from '../../components/common/DashboardLayout';
import { BarChart3, TrendingUp, Users, Eye, MapPin, Award } from 'lucide-react';

export const SellerAnalyticsPage: React.FC = () => {
  return (
    <DashboardLayout
      portalRole="SELLER"
      title="Property Portfolio Analytics"
      subtitle="Performance telemetry across search impressions, buyer engagement, and visit conversions."
    >
      <div className="space-y-8">
        {/* KPI Strip */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-[#e2e8f0] shadow-sm">
            <span className="text-xs font-bold text-slate-400 uppercase">Average Days on Market</span>
            <div className="text-3xl font-extrabold text-[#001637] mt-1">28 Days</div>
            <p className="text-xs text-emerald-600 font-semibold mt-1">
              42% faster than regional market average
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-[#e2e8f0] shadow-sm">
            <span className="text-xs font-bold text-slate-400 uppercase">Lead Conversion Rate</span>
            <div className="text-3xl font-extrabold text-[#001637] mt-1">8.4%</div>
            <p className="text-xs text-emerald-600 font-semibold mt-1">
              High intent due to AP RERA certification
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-[#e2e8f0] shadow-sm">
            <span className="text-xs font-bold text-slate-400 uppercase">Site Visit Turnout</span>
            <div className="text-3xl font-extrabold text-[#001637] mt-1">92%</div>
            <p className="text-xs text-slate-500 font-semibold mt-1">
              Confirmed attendance via SMS reminders
            </p>
          </div>
        </div>

        {/* Micro-Market Demand Breakdown */}
        <div className="bg-white rounded-2xl border border-[#e2e8f0] p-6 shadow-sm space-y-4">
          <h3 className="text-base font-bold text-[#001637]">Vijayawada Locality Demand Index</h3>
          <p className="text-xs text-slate-500">
            Buyer search volume distribution over the last 30 calendar days
          </p>

          <div className="space-y-4 pt-2">
            <div>
              <div className="flex justify-between text-xs font-bold text-slate-700 mb-1">
                <span>Benz Circle (Luxury 3 BHK & Commercial)</span>
                <span>38% Volume</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
                <div className="bg-[#2563eb] h-2.5 rounded-full" style={{ width: '38%' }}></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-bold text-slate-700 mb-1">
                <span>Poranki & Penamaluru (Gated Villas)</span>
                <span>27% Volume</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
                <div className="bg-emerald-500 h-2.5 rounded-full" style={{ width: '27%' }}></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-bold text-slate-700 mb-1">
                <span>Gannavaram Corridor (CRDA Open Plots)</span>
                <span>21% Volume</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
                <div className="bg-purple-500 h-2.5 rounded-full" style={{ width: '21%' }}></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-bold text-slate-700 mb-1">
                <span>Tadepalli & Mangalagiri (Riverfront Towers)</span>
                <span>14% Volume</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
                <div className="bg-amber-500 h-2.5 rounded-full" style={{ width: '14%' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

