import React from 'react';
import { DashboardLayout } from '../../components/common/DashboardLayout';
import { BarChart3, TrendingUp, DollarSign, ShieldCheck, Download } from 'lucide-react';

export const AdminReportsPage: React.FC = () => {
  return (
    <DashboardLayout
      portalRole="ADMIN"
      title="Institutional Reports & Market Telemetry"
      subtitle="Macro-economic trends, capital inflow, and regulatory compliance distribution in Andhra Pradesh."
      actions={
        <button
          onClick={() => alert('Exporting quarterly AP RERA Compliance Dossier (PDF)...')}
          className="px-4 py-2 rounded-lg bg-[#001637] text-white text-xs font-bold hover:bg-[#172b4d] transition flex items-center gap-1.5 shadow-sm"
        >
          <Download className="w-3.5 h-3.5" />
          <span>Export Audit Dossier (PDF)</span>
        </button>
      }
    >
      <div className="space-y-8">
        {/* Macro KPI Strip */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-[#e2e8f0] shadow-sm">
            <span className="text-xs font-bold text-slate-400 uppercase">Q3 Capital Facilitated</span>
            <div className="text-3xl font-extrabold text-[#001637] mt-1 tabular-nums font-['Inter']">
              ₹148.5 Cr
            </div>
            <p className="text-xs text-emerald-600 font-semibold mt-1">
              +18.2% QoQ Growth across residential transactions
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-[#e2e8f0] shadow-sm">
            <span className="text-xs font-bold text-slate-400 uppercase">Capital Region Avg. Rate</span>
            <div className="text-3xl font-extrabold text-[#001637] mt-1 tabular-nums font-['Inter']">
              ₹5,420 / sq.ft
            </div>
            <p className="text-xs text-slate-500 font-semibold mt-1">
              Weighted index for Vijayawada municipal zone
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-[#e2e8f0] shadow-sm">
            <span className="text-xs font-bold text-slate-400 uppercase">RERA Compliance Rate</span>
            <div className="text-3xl font-extrabold text-emerald-600 mt-1 tabular-nums font-['Inter']">
              99.8%
            </div>
            <p className="text-xs text-slate-500 font-semibold mt-1">
              Highest verification benchmark in South India
            </p>
          </div>
        </div>

        {/* Quarterly Capital Facilitation Table */}
        <div className="bg-white rounded-2xl border border-[#e2e8f0] p-6 shadow-sm space-y-4">
          <h3 className="text-base font-bold text-[#001637]">
            2025 - 2026 Transaction Value Trend (in ₹ Crores)
          </h3>
          <div className="space-y-3 pt-2">
            <div>
              <div className="flex justify-between text-xs font-bold text-slate-700 mb-1">
                <span>Q3 2026 (Current Quarter)</span>
                <span className="text-[#2563eb]">₹148.50 Cr</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden">
                <div className="bg-[#2563eb] h-3 rounded-full" style={{ width: '88%' }}></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-bold text-slate-700 mb-1">
                <span>Q2 2026</span>
                <span className="text-slate-600">₹125.60 Cr</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden">
                <div className="bg-slate-400 h-3 rounded-full" style={{ width: '74%' }}></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-bold text-slate-700 mb-1">
                <span>Q1 2026</span>
                <span className="text-slate-600">₹104.20 Cr</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden">
                <div className="bg-slate-400 h-3 rounded-full" style={{ width: '61%' }}></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-bold text-slate-700 mb-1">
                <span>Q4 2025</span>
                <span className="text-slate-600">₹88.90 Cr</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden">
                <div className="bg-slate-400 h-3 rounded-full" style={{ width: '52%' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

