import React, { useState } from 'react';
import { DashboardLayout } from '../../components/common/DashboardLayout';
import { ShieldCheck, CheckCircle2, XCircle, FileText, AlertCircle } from 'lucide-react';

interface ApprovalItem {
  id: string;
  title: string;
  builder: string;
  locality: string;
  reraRegNumber: string;
  crdaZoningCode: string;
  submittedDate: string;
  documentsCount: number;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
}

export const AdminApprovalsPage: React.FC = () => {
  const [items, setItems] = useState<ApprovalItem[]>([
    {
      id: 'appr-1',
      title: 'Green Meadows Luxury Towers (Phase 2)',
      builder: 'Amaravati Prime Developers',
      locality: 'Poranki, Vijayawada',
      reraRegNumber: 'P04260270014',
      crdaZoningCode: 'AP-CRDA-L4-ZONE',
      submittedDate: '30 Oct 2026',
      documentsCount: 6,
      status: 'PENDING'
    },
    {
      id: 'appr-2',
      title: 'Capital View Commercial Arcade',
      builder: 'Horizon Crest Infrastructure',
      locality: 'Gannavaram Airport Road',
      reraRegNumber: 'P04280260331',
      crdaZoningCode: 'AP-CRDA-C2-COMMERCIAL',
      submittedDate: '29 Oct 2026',
      documentsCount: 8,
      status: 'PENDING'
    },
    {
      id: 'appr-3',
      title: 'Krishna Riverside Waterfront Enclave',
      builder: 'Krishna Valley Properties',
      locality: 'Tadepalli Highway',
      reraRegNumber: 'P04260250912',
      crdaZoningCode: 'AP-CRDA-RES-OPEN',
      submittedDate: '28 Oct 2026',
      documentsCount: 5,
      status: 'PENDING'
    }
  ]);

  const handleApprove = (id: string) => {
    setItems(items.map(item => item.id === id ? { ...item, status: 'APPROVED' } : item));
  };

  const handleReject = (id: string) => {
    setItems(items.map(item => item.id === id ? { ...item, status: 'REJECTED' } : item));
  };

  return (
    <DashboardLayout
      portalRole="ADMIN"
      title="AP RERA & CRDA Document Verification Queue"
      subtitle="Examine promoter title deeds, survey maps, and environmental NOCs before landing listings."
    >
      <div className="space-y-4">
        {items.map((item) => (
          <div key={item.id} className="bg-white rounded-2xl border border-[#e2e8f0] p-6 shadow-sm space-y-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-3 border-b border-slate-100">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-bold text-[#001637]">{item.title}</h3>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                    item.status === 'APPROVED'
                      ? 'bg-emerald-100 text-emerald-800'
                      : item.status === 'REJECTED'
                      ? 'bg-rose-100 text-rose-800'
                      : 'bg-amber-100 text-amber-800'
                  }`}>
                    {item.status}
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-0.5">
                  Promoter: <strong>{item.builder}</strong> • Location: {item.locality}
                </p>
              </div>

              <div className="text-right">
                <span className="text-xs font-mono font-bold text-slate-600 block">RERA: {item.reraRegNumber}</span>
                <span className="text-[10px] text-slate-400">Zoning Code: {item.crdaZoningCode}</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-[10px] text-slate-400 font-bold uppercase block">Title Deed Verification</span>
                <span className="font-bold text-emerald-700 flex items-center gap-1 mt-0.5">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Sub-Registrar Cleared
                </span>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-[10px] text-slate-400 font-bold uppercase block">Attached Documents</span>
                <span className="font-bold text-[#001637] mt-0.5 block">{item.documentsCount} Encumbrance & Layout PDFs</span>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-[10px] text-slate-400 font-bold uppercase block">Submission Timestamp</span>
                <span className="font-bold text-slate-700 mt-0.5 block">{item.submittedDate}</span>
              </div>
            </div>

            {item.status === 'PENDING' ? (
              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  onClick={() => handleReject(item.id)}
                  className="px-4 py-2 rounded-lg border border-rose-200 text-rose-600 font-bold text-xs hover:bg-rose-50 transition"
                >
                  Flag Discrepancy & Reject
                </button>
                <button
                  onClick={() => handleApprove(item.id)}
                  className="px-5 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md transition flex items-center gap-1.5"
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>Authorize AP RERA Verified Seal</span>
                </button>
              </div>
            ) : (
              <div className="pt-2 text-right text-xs font-semibold text-slate-500">
                Moderation completed for this venture record.
              </div>
            )}
          </div>
        ))}
      </div>
    </DashboardLayout>
  );
};

