import React, { useState } from 'react';
import { DashboardLayout } from '../../components/common/DashboardLayout';
import { mockInquiries } from '../../data/mockData';
import { Send, User, CheckCircle2, ShieldCheck } from 'lucide-react';

export const SellerMessagesPage: React.FC = () => {
  const [activeChat, setActiveChat] = useState(mockInquiries[0]);
  const [messages, setMessages] = useState([
    { sender: 'buyer', text: mockInquiries[0].message, time: '10:14 AM' },
    { sender: 'agent', text: 'Hello Suresh, thank you for reaching out. Yes, the price is negotiable for immediate registry with 25% down payment.', time: '10:25 AM' }
  ]);
  const [inputVal, setInputVal] = useState('');

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputVal.trim()) return;
    setMessages([...messages, { sender: 'agent', text: inputVal, time: 'Just now' }]);
    setInputVal('');
  };

  return (
    <DashboardLayout
      portalRole="SELLER"
      title="Direct Buyer Communication"
      subtitle="Real-time messaging channels with prospective home buyers."
    >
      <div className="bg-white rounded-2xl border border-[#e2e8f0] shadow-sm grid grid-cols-1 md:grid-cols-3 min-h-[550px] overflow-hidden">
        {/* Contacts Sidebar */}
        <div className="border-r border-slate-100 p-4 space-y-2">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block px-2 mb-2">
            Conversations ({mockInquiries.length})
          </span>
          {mockInquiries.map((inq) => (
            <div
              key={inq.id}
              onClick={() => setActiveChat(inq)}
              className={`p-3 rounded-xl cursor-pointer transition ${
                activeChat.id === inq.id ? 'bg-blue-50 border border-blue-200' : 'hover:bg-slate-50'
              }`}
            >
              <div className="font-bold text-xs text-[#001637]">{inq.buyerName}</div>
              <div className="text-[11px] text-slate-500 truncate">{inq.propertyTitle}</div>
              <div className="text-[10px] text-slate-400 mt-1">{inq.date}</div>
            </div>
          ))}
        </div>

        {/* Chat Window */}
        <div className="md:col-span-2 flex flex-col justify-between p-6">
          {/* Header */}
          <div className="pb-4 border-b border-slate-100 flex items-center justify-between">
            <div>
              <h3 className="font-bold text-sm text-[#001637]">{activeChat.buyerName}</h3>
              <p className="text-xs text-slate-500">Inquiry for {activeChat.propertyTitle}</p>
            </div>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200">
              Verified Buyer
            </span>
          </div>

          {/* Messages Feed */}
          <div className="py-6 space-y-4 flex-1 overflow-y-auto">
            {messages.map((m, idx) => (
              <div
                key={idx}
                className={`flex ${m.sender === 'agent' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`p-3.5 rounded-2xl max-w-md text-xs leading-relaxed space-y-1 ${
                    m.sender === 'agent'
                      ? 'bg-[#2563eb] text-white rounded-tr-none'
                      : 'bg-slate-100 text-slate-800 rounded-tl-none border border-slate-200'
                  }`}
                >
                  <p>{m.text}</p>
                  <span className={`text-[10px] block ${m.sender === 'agent' ? 'text-blue-200 text-right' : 'text-slate-400'}`}>
                    {m.time}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Input Box */}
          <form onSubmit={handleSend} className="pt-4 border-t border-slate-100 flex gap-2">
            <input
              type="text"
              placeholder="Type your reply to buyer..."
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              className="flex-1 px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-[#2563eb]"
            />
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-[#2563eb] hover:bg-[#1d4ed8] text-white text-xs font-bold transition flex items-center gap-1.5"
            >
              <Send className="w-4 h-4" />
              <span>Send</span>
            </button>
          </form>
        </div>
      </div>
    </DashboardLayout>
  );
};

