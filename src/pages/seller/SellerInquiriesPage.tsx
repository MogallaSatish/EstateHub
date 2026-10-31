import React, { useState } from 'react';
import { DashboardLayout } from '../../components/common/DashboardLayout';
import { mockInquiries } from '../../data/mockData';
import { MessageSquare, Phone, Mail, Clock, CheckCircle2, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const SellerInquiriesPage: React.FC = () => {
  const [inquiries, setInquiries] = useState(mockInquiries);

  const updateStatus = (id: string, newStatus: any) => {
    setInquiries(inquiries.map(i => i.id === id ? { ...i, status: newStatus } : i));
  };

  return (
    <DashboardLayout
      portalRole="SELLER"
      title="Received Buyer Inquiries & Leads"
      subtitle="Prospective home buyers inquiring about your listings in Vijayawada."
    >
      <div className="bg-white rounded-2xl border border-[#e2e8f0] shadow-sm overflow-hidden">
        <div className="divide-y divide-slate-100">
          {inquiries.map((inq) => (
            <div key={inq.id} className="p-6 hover:bg-slate-50/60 transition flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="space-y-2 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-bold text-sm text-[#001637]">{inq.buyerName}</span>
                  <span className="text-[10px] font-bold text-slate-400">• {inq.date}</span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-50 text-[#2563eb] border border-blue-200">
                    Target: {inq.propertyTitle} ({inq.propertyPrice})
                  </span>
                </div>

                <p className="text-xs text-slate-600 bg-slate-50 p-3 rounded-lg border border-slate-100 italic">
                  "{inq.message}"
                </p>

                <div className="flex flex-wrap gap-4 text-xs text-slate-500 font-medium">
                  <span className="flex items-center gap-1">
                    <Phone className="w-3.5 h-3.5 text-[#2563eb]" /> {inq.buyerPhone}
                  </span>
                  <span className="flex items-center gap-1">
                    <Mail className="w-3.5 h-3.5 text-[#2563eb]" /> {inq.buyerEmail}
                  </span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 shrink-0">
                <select
                  value={inq.status}
                  onChange={(e) => updateStatus(inq.id, e.target.value)}
                  className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-bold text-slate-800"
                >
                  <option value="NEW">Status: New</option>
                  <option value="REPLIED">Status: Replied</option>
                  <option value="SCHEDULED">Status: Scheduled</option>
                  <option value="CLOSED">Status: Closed</option>
                </select>

                <Link
                  to="/seller/messages"
                  className="px-4 py-1.5 rounded-lg bg-[#2563eb] text-white text-xs font-bold hover:bg-[#1d4ed8] transition"
                >
                  Open Chat
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

