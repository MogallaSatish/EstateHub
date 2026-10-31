import React from 'react';
import { Link } from 'react-router-dom';
import { DashboardLayout } from '../../components/common/DashboardLayout';
import { mockProperties, mockAuditLogs, mockUsers } from '../../data/mockData';
import { 
  Building2, 
  Users, 
  FolderCheck, 
  ShieldCheck, 
  AlertTriangle, 
  History, 
  TrendingUp, 
  ArrowRight,
  CheckCircle2,
  Lock
} from 'lucide-react';

export const AdminDashboardPage: React.FC = () => {
  return (
    <DashboardLayout
      portalRole="ADMIN"
      title="Institutional Compliance & Platform Oversight"
      subtitle="AP RERA regulatory administration, listing moderation, and user verification."
      actions={
        <Link
          to="/admin/approvals"
          className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition flex items-center gap-1.5 shadow-sm"
        >
          <FolderCheck className="w-4 h-4" />
          <span>Pending Approvals Queue (4)</span>
        </Link>
      }
    >
      <div className="space-y-8">
        {/* KPI Strip */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-[#e2e8f0] shadow-sm">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Total Ventures Listed</span>
            <div className="text-2xl font-extrabold text-[#001637] mt-1">{mockProperties.length} Properties</div>
            <span className="text-[11px] text-emerald-600 font-bold flex items-center gap-1 mt-1">
              <ShieldCheck className="w-3.5 h-3.5" /> 100% Title Checked
            </span>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-[#e2e8f0] shadow-sm">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Pending RERA Verifications</span>
            <div className="text-2xl font-extrabold text-amber-600 mt-1">4 Pending</div>
            <Link to="/admin/approvals" className="text-[11px] text-[#2563eb] font-bold hover:underline mt-1 block">
              Review documents →
            </Link>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-[#e2e8f0] shadow-sm">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Registered Users</span>
            <div className="text-2xl font-extrabold text-[#001637] mt-1">1,480 Active</div>
            <Link to="/admin/users" className="text-[11px] text-[#2563eb] font-bold hover:underline mt-1 block">
              Manage accounts →
            </Link>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-[#e2e8f0] shadow-sm">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Platform Security Status</span>
            <div className="text-2xl font-extrabold text-emerald-600 mt-1">100% HEALTHY</div>
            <span className="text-[11px] text-slate-400 mt-1 block">Zero unauthorized breaches</span>
          </div>
        </div>

        {/* Approvals Quick Queue */}
        <div className="bg-white rounded-2xl border border-[#e2e8f0] shadow-sm p-6 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h2 className="text-base font-bold text-[#001637]">Priority Regulatory Review Queue</h2>
              <p className="text-xs text-slate-500">Submitted listings awaiting AP RERA validation</p>
            </div>
            <Link to="/admin/approvals" className="text-xs font-bold text-[#2563eb] hover:underline">
              Open Full Approvals Desk →
            </Link>
          </div>

          <div className="space-y-3">
            <div className="p-4 rounded-xl border border-amber-200 bg-amber-50/50 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
              <div>
                <span className="font-bold text-[#001637]">Green Meadows Phase 2 (Poranki Venture)</span>
                <div className="text-slate-500 text-[11px] mt-0.5">Submitted by: Amaravati Prime Realty • RERA Code: P04260270014</div>
              </div>
              <div className="flex items-center gap-2">
                <Link
                  to="/admin/approvals"
                  className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold"
                >
                  Verify Documents
                </Link>
              </div>
            </div>

            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
              <div>
                <span className="font-bold text-[#001637]">Capital View Commercial Tower (Gannavaram)</span>
                <div className="text-slate-500 text-[11px] mt-0.5">Submitted by: Horizon Crest • CRDA Approval: CRDA/L4/2026/88</div>
              </div>
              <div className="flex items-center gap-2">
                <Link
                  to="/admin/approvals"
                  className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold"
                >
                  Verify Documents
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Security & Moderation Audit Trail Snapshot */}
        <div className="bg-white rounded-2xl border border-[#e2e8f0] shadow-sm p-6 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h2 className="text-base font-bold text-[#001637]">Recent Compliance & Security Audit Logs</h2>
              <p className="text-xs text-slate-500">Immutable ledger of administrative actions</p>
            </div>
            <Link to="/admin/audit-logs" className="text-xs font-bold text-[#2563eb] hover:underline">
              Full Audit Trail →
            </Link>
          </div>

          <div className="space-y-2">
            {mockAuditLogs.map((log) => (
              <div key={log.id} className="p-3 rounded-xl border border-slate-100 bg-slate-50/70 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                <div className="space-y-0.5">
                  <div className="font-bold text-[#001637] flex items-center gap-2">
                    <span className="font-mono text-[10px] text-slate-400">{log.id}</span>
                    <span>{log.action}</span>
                    <span className="px-1.5 py-0.2 rounded text-[9px] font-bold bg-blue-50 text-[#2563eb]">
                      {log.category}
                    </span>
                  </div>
                  <div className="text-slate-500 text-[11px]">{log.details}</div>
                </div>
                <div className="text-right text-[11px] text-slate-400 shrink-0">
                  <div>{log.timestamp}</div>
                  <div className="font-mono text-[10px]">IP: {log.ipAddress}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

