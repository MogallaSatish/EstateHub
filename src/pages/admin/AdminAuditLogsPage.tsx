import React, { useState } from 'react';
import { DashboardLayout } from '../../components/common/DashboardLayout';
import { mockAuditLogs } from '../../data/mockData';
import { History, ShieldCheck, Filter, Download } from 'lucide-react';

export const AdminAuditLogsPage: React.FC = () => {
  const [logs, setLogs] = useState(mockAuditLogs);
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');

  const filteredLogs = selectedCategory === 'ALL'
    ? logs
    : logs.filter(l => l.category === selectedCategory);

  return (
    <DashboardLayout
      portalRole="ADMIN"
      title="System Audit Trail & Cryptographic Verification"
      subtitle="Immutable security logs monitoring administrative overrides, role elevations, and title authorizations."
      actions={
        <button
          onClick={() => alert('Exporting signed audit logs (.CSV)...')}
          className="px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition flex items-center gap-1.5"
        >
          <Download className="w-3.5 h-3.5 text-[#2563eb]" />
          <span>Export Audit Trail (CSV)</span>
        </button>
      }
    >
      <div className="bg-white rounded-2xl border border-[#e2e8f0] shadow-sm overflow-hidden">
        {/* Category filter */}
        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs">
            <span className="font-semibold text-slate-500">Filter Event Category:</span>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-bold text-slate-800"
            >
              <option value="ALL">All Categories</option>
              <option value="MODERATION">MODERATION</option>
              <option value="USER_MANAGEMENT">USER_MANAGEMENT</option>
              <option value="SECURITY">SECURITY</option>
            </select>
          </div>
          <span className="text-xs font-mono text-slate-400">
            SHA-256 Ledger Verified
          </span>
        </div>

        {/* Logs Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-['Inter']">
            <thead className="bg-slate-50 text-slate-400 font-bold uppercase text-[10px] tracking-wider border-b border-slate-100">
              <tr>
                <th className="py-3 px-6">Event ID & Action</th>
                <th className="py-3 px-4">Operator / Role</th>
                <th className="py-3 px-4">Target Resource</th>
                <th className="py-3 px-4">Operational Context</th>
                <th className="py-3 px-4">IP Address</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-6 text-right">Timestamp</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700 font-medium">
              {filteredLogs.map((log) => (
                <tr key={log.id} className="hover:bg-slate-50/80 transition">
                  <td className="py-4 px-6">
                    <div className="font-mono text-[11px] font-bold text-[#001637]">{log.id}</div>
                    <div className="text-[10px] font-semibold text-[#2563eb]">{log.action}</div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="font-bold text-[#001637]">{log.userName}</div>
                    <div className="text-[10px] text-slate-400">{log.role}</div>
                  </td>
                  <td className="py-4 px-4 font-mono text-[11px]">{log.targetResource}</td>
                  <td className="py-4 px-4 text-slate-600 max-w-xs">{log.details}</td>
                  <td className="py-4 px-4 font-mono text-[11px] text-slate-500">{log.ipAddress}</td>
                  <td className="py-4 px-4">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      log.status === 'SUCCESS'
                        ? 'bg-emerald-100 text-emerald-800'
                        : log.status === 'WARNING'
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-rose-100 text-rose-800'
                    }`}>
                      {log.status}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-right text-slate-400 text-[11px]">
                    {log.timestamp}
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

