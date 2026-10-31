import React, { useState } from 'react';
import { DashboardLayout } from '../../components/common/DashboardLayout';
import { mockAppointments } from '../../data/mockData';
import { Calendar, Clock, MapPin, User, CheckCircle2, XCircle, PlusCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

export const BuyerAppointmentsPage: React.FC = () => {
  const [appointments, setAppointments] = useState(mockAppointments);

  const handleCancel = (id: string) => {
    setAppointments(appointments.map(a => a.id === id ? { ...a, status: 'CANCELLED' } : a));
  };

  return (
    <DashboardLayout
      portalRole="BUYER"
      title="Scheduled Site Visits & Walkthroughs"
      subtitle="Manage your confirmed site inspections with verified project managers and brokers."
      actions={
        <Link
          to="/properties"
          className="px-4 py-2 rounded-lg bg-[#2563eb] text-white text-xs font-bold hover:bg-[#1d4ed8] transition flex items-center gap-1.5 shadow-sm"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Book New Visit</span>
        </Link>
      }
    >
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {appointments.map((appt) => (
            <div key={appt.id} className="bg-white rounded-2xl border border-[#e2e8f0] p-6 shadow-sm space-y-4">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <img
                    src={appt.propertyImage}
                    alt={appt.propertyTitle}
                    className="w-16 h-16 rounded-xl object-cover border border-slate-200"
                  />
                  <div>
                    <span className={`inline-block px-2.5 py-0.5 rounded text-[10px] font-bold ${
                      appt.status === 'CONFIRMED'
                        ? 'bg-emerald-100 text-emerald-800'
                        : appt.status === 'CANCELLED'
                        ? 'bg-rose-100 text-rose-800'
                        : 'bg-amber-100 text-amber-800'
                    }`}>
                      {appt.status}
                    </span>
                    <h3 className="text-sm font-bold text-[#001637] mt-1">{appt.propertyTitle}</h3>
                    <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                      <MapPin className="w-3.5 h-3.5 text-[#2563eb]" /> {appt.locality}
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 grid grid-cols-2 gap-3 text-xs">
                <div>
                  <span className="text-slate-400 block font-semibold text-[10px] uppercase">Inspection Date</span>
                  <div className="font-bold text-[#001637] flex items-center gap-1 mt-0.5">
                    <Calendar className="w-3.5 h-3.5 text-[#2563eb]" /> {appt.date}
                  </div>
                </div>

                <div>
                  <span className="text-slate-400 block font-semibold text-[10px] uppercase">Time Slot</span>
                  <div className="font-bold text-[#001637] flex items-center gap-1 mt-0.5">
                    <Clock className="w-3.5 h-3.5 text-[#2563eb]" /> {appt.timeSlot}
                  </div>
                </div>

                <div>
                  <span className="text-slate-400 block font-semibold text-[10px] uppercase">Visit Type</span>
                  <div className="font-semibold text-slate-700 mt-0.5">{appt.type}</div>
                </div>

                <div>
                  <span className="text-slate-400 block font-semibold text-[10px] uppercase">Assigned Broker</span>
                  <div className="font-semibold text-slate-700 mt-0.5">{appt.agentName}</div>
                </div>
              </div>

              {appt.status !== 'CANCELLED' && (
                <div className="pt-2 flex items-center justify-between gap-3 text-xs">
                  <Link
                    to={`/property/${appt.propertyId}`}
                    className="text-[#2563eb] font-bold hover:underline"
                  >
                    View Property Specs →
                  </Link>
                  <button
                    onClick={() => handleCancel(appt.id)}
                    className="px-3 py-1.5 rounded-lg border border-rose-200 text-rose-600 font-semibold hover:bg-rose-50 transition"
                  >
                    Cancel Appointment
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

