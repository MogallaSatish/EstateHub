import React, { useState } from 'react';
import { DashboardLayout } from '../../components/common/DashboardLayout';
import { mockAppointments } from '../../data/mockData';
import { Calendar, Clock, MapPin, Phone, CheckCircle2, XCircle } from 'lucide-react';

export const SellerAppointmentsPage: React.FC = () => {
  const [appointments, setAppointments] = useState(mockAppointments);

  const setStatus = (id: string, st: 'CONFIRMED' | 'CANCELLED') => {
    setAppointments(appointments.map(a => a.id === id ? { ...a, status: st } : a));
  };

  return (
    <DashboardLayout
      portalRole="SELLER"
      title="Received Site Inspection Appointments"
      subtitle="Buyers requesting chauffeured visits and technical walkthroughs for your listings."
    >
      <div className="space-y-4">
        {appointments.map((appt) => (
          <div key={appt.id} className="bg-white rounded-2xl border border-[#e2e8f0] p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-start gap-4">
              <img
                src={appt.propertyImage}
                alt=""
                className="w-16 h-16 rounded-xl object-cover border border-slate-200 shrink-0"
              />
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-sm text-[#001637]">{appt.clientName}</h3>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                    appt.status === 'CONFIRMED' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                  }`}>
                    {appt.status}
                  </span>
                </div>

                <p className="text-xs text-slate-600 font-medium">{appt.propertyTitle}</p>
                <div className="flex flex-wrap gap-3 text-xs text-slate-500 pt-1">
                  <span className="flex items-center gap-1 font-semibold text-[#001637]">
                    <Calendar className="w-3.5 h-3.5 text-[#2563eb]" /> {appt.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-[#2563eb]" /> {appt.timeSlot}
                  </span>
                  <span className="flex items-center gap-1">
                    <Phone className="w-3.5 h-3.5 text-[#2563eb]" /> {appt.clientPhone}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 pt-2 md:pt-0 border-t md:border-t-0 border-slate-100">
              <button
                onClick={() => setStatus(appt.id, 'CONFIRMED')}
                className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-sm transition"
              >
                Confirm Appointment
              </button>
              <button
                onClick={() => setStatus(appt.id, 'CANCELLED')}
                className="px-4 py-2 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 font-bold text-xs transition"
              >
                Reschedule / Decline
              </button>
            </div>
          </div>
        ))}
      </div>
    </DashboardLayout>
  );
};

