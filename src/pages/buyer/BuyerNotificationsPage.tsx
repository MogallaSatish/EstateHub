import React, { useState } from 'react';
import { DashboardLayout } from '../../components/common/DashboardLayout';
import { mockNotifications } from '../../data/mockData';
import { Bell, CheckCheck, Clock, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const BuyerNotificationsPage: React.FC = () => {
  const [notifications, setNotifications] = useState(mockNotifications);

  const markAllRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  return (
    <DashboardLayout
      portalRole="BUYER"
      title="Notifications & Regulatory Alerts"
      subtitle="Stay updated on price drops, new matching RERA ventures, and appointment approvals."
      actions={
        <button
          onClick={markAllRead}
          className="px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition flex items-center gap-1.5"
        >
          <CheckCheck className="w-3.5 h-3.5 text-[#2563eb]" />
          <span>Mark All as Read</span>
        </button>
      }
    >
      <div className="bg-white rounded-2xl border border-[#e2e8f0] shadow-sm divide-y divide-slate-100 overflow-hidden">
        {notifications.map((notif) => (
          <div
            key={notif.id}
            className={`p-5 flex items-start gap-4 transition ${
              notif.read ? 'bg-white' : 'bg-blue-50/40'
            }`}
          >
            <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
              notif.type === 'APPOINTMENT'
                ? 'bg-emerald-100 text-emerald-700'
                : notif.type === 'PRICE_DROP'
                ? 'bg-rose-100 text-rose-700'
                : 'bg-blue-100 text-[#2563eb]'
            }`}>
              <Bell className="w-5 h-5" />
            </div>

            <div className="flex-1 space-y-1">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold text-[#001637] flex items-center gap-2">
                  <span>{notif.title}</span>
                  {!notif.read && (
                    <span className="w-2 h-2 rounded-full bg-[#2563eb]"></span>
                  )}
                </h4>
                <span className="text-[10px] text-slate-400 font-medium flex items-center gap-1">
                  <Clock className="w-3 h-3" /> {notif.timestamp}
                </span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">{notif.message}</p>
              {notif.link && (
                <div className="pt-1">
                  <Link
                    to={notif.link}
                    className="text-[11px] font-bold text-[#2563eb] hover:underline inline-flex items-center gap-1"
                  >
                    <span>View Details</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </DashboardLayout>
  );
};

