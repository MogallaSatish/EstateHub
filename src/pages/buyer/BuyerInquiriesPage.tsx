import React, { useState } from 'react';
import { DashboardLayout } from '../../components/common/DashboardLayout';
import { mockInquiries } from '../../data/mockData';
import { MessageSquare, Clock, Phone, Send, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';

export const BuyerInquiriesPage: React.FC = () => {
  const [inquiries, setInquiries] = useState(mockInquiries);
  const [selectedInquiry, setSelectedInquiry] = useState(mockInquiries[0]);
  const [replyText, setReplyText] = useState('');
  const [replySent, setReplySent] = useState(false);

  const handleSendReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyText.trim()) return;
    setReplySent(true);
    setTimeout(() => {
      setReplySent(false);
      setReplyText('');
    }, 2000);
  };

  return (
    <DashboardLayout
      portalRole="BUYER"
      title="My Property Inquiries"
      subtitle="Direct communication threads with certified listing brokers and developers."
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Inquiries Thread List */}
        <div className="bg-white rounded-2xl border border-[#e2e8f0] shadow-sm p-4 space-y-3 h-fit">
          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider px-2">
            Active Query Threads ({inquiries.length})
          </div>

          <div className="space-y-2">
            {inquiries.map((inq) => (
              <div
                key={inq.id}
                onClick={() => setSelectedInquiry(inq)}
                className={`p-3 rounded-xl border transition cursor-pointer ${
                  selectedInquiry.id === inq.id
                    ? 'bg-blue-50/80 border-[#2563eb] shadow-sm'
                    : 'bg-slate-50 border-slate-200 hover:bg-slate-100'
                }`}
              >
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="font-bold text-[#001637] truncate">{inq.propertyTitle}</span>
                  <span className="text-[10px] text-slate-400 shrink-0">{inq.date}</span>
                </div>
                <p className="text-xs text-slate-600 line-clamp-1 italic">"{inq.message}"</p>
                <div className="flex items-center justify-between mt-2 pt-1 border-t border-slate-200/60 text-[11px]">
                  <span className="font-bold text-[#2563eb]">{inq.propertyPrice}</span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-white border border-slate-200 text-slate-700">
                    {inq.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Selected Thread Conversation Window */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-[#e2e8f0] shadow-sm p-6 flex flex-col justify-between min-h-[500px]">
          <div>
            {/* Header info */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-3">
              <div className="flex items-center gap-3">
                <img
                  src={selectedInquiry.propertyImage}
                  alt={selectedInquiry.propertyTitle}
                  className="w-14 h-14 rounded-xl object-cover border border-slate-200"
                />
                <div>
                  <h3 className="text-sm font-bold text-[#001637]">{selectedInquiry.propertyTitle}</h3>
                  <div className="text-xs font-bold text-[#2563eb] mt-0.5">{selectedInquiry.propertyPrice}</div>
                  <Link to={`/property/${selectedInquiry.propertyId}`} className="text-[11px] text-slate-500 hover:underline">
                    View property specs →
                  </Link>
                </div>
              </div>

              <div className="text-right">
                <span className="inline-block px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                  Status: {selectedInquiry.status}
                </span>
              </div>
            </div>

            {/* Message Stream */}
            <div className="py-6 space-y-4">
              {/* Buyer's original message */}
              <div className="flex justify-end">
                <div className="bg-[#2563eb] text-white p-4 rounded-2xl rounded-tr-none max-w-lg shadow-sm text-xs leading-relaxed space-y-1">
                  <p>{selectedInquiry.message}</p>
                  <span className="text-[10px] text-blue-200 block text-right">Sent on {selectedInquiry.date}</span>
                </div>
              </div>

              {/* Agent's response */}
              <div className="flex justify-start">
                <div className="bg-slate-100 text-slate-800 p-4 rounded-2xl rounded-tl-none max-w-lg shadow-sm text-xs leading-relaxed space-y-1 border border-slate-200">
                  <p className="font-bold text-[#001637] mb-1">EstateHub Authorized Broker:</p>
                  <p>
                    Hello Suresh. Thank you for your inquiry. Yes, the title documents have been audited under AP RERA registration #{selectedInquiry.propertyId}. We can arrange an on-site visit this Saturday or Sunday morning with the site manager.
                  </p>
                  <span className="text-[10px] text-slate-400 block">Verified Broker Response</span>
                </div>
              </div>

              {replySent && (
                <div className="flex justify-end animate-in fade-in">
                  <div className="bg-[#2563eb] text-white p-4 rounded-2xl rounded-tr-none max-w-lg shadow-sm text-xs leading-relaxed">
                    <p>{replyText}</p>
                    <span className="text-[10px] text-blue-200 block text-right mt-1">Sent just now</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Quick Reply Form */}
          <form onSubmit={handleSendReply} className="pt-4 border-t border-slate-100 flex gap-2">
            <input
              type="text"
              placeholder="Type your message to the broker..."
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              className="flex-1 px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-[#2563eb]"
            />
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-[#2563eb] hover:bg-[#1d4ed8] text-white text-xs font-bold transition flex items-center gap-1.5"
            >
              <Send className="w-4 h-4" />
              <span>Reply</span>
            </button>
          </form>
        </div>
      </div>
    </DashboardLayout>
  );
};

