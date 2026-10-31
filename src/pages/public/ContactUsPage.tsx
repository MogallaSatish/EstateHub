import React, { useState } from 'react';
import { Navbar } from '../../components/common/Navbar';
import { Footer } from '../../components/common/Footer';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  ShieldCheck, 
  Send, 
  CheckCircle2 
} from 'lucide-react';

export const ContactUsPage: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'Property Purchase Consultation',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', phone: '', subject: 'Property Purchase Consultation', message: '' });
    }, 4000);
  };

  return (
    <div className="min-h-screen bg-[#f9f9ff] flex flex-col font-['Inter']">
      <Navbar />

      <div className="bg-[#001637] text-white py-14 px-4 sm:px-8 border-b border-[#172b4d] text-center">
        <div className="max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-[#172b4d] text-[#7ffc97]">
            <MapPin className="w-3.5 h-3.5" />
            <span>Vijayawada Central Operations Center</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold font-['Inter']">Contact EstateHub</h1>
          <p className="text-xs sm:text-sm text-slate-300">
            Have questions about an AP RERA venture or need property legal consultation? Our team is available 6 days a week.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-12 w-full flex-1">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Details Cards */}
          <div className="space-y-4">
            <div className="bg-white p-6 rounded-2xl border border-[#e2e8f0] shadow-sm space-y-3">
              <div className="w-10 h-10 rounded-lg bg-blue-50 text-[#2563eb] flex items-center justify-center">
                <MapPin className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-sm text-[#001637]">Corporate Headquarters</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                EstateHub Towers, 4th Floor, Opp. Gateway Hotel, Benz Circle, MG Road, Vijayawada, Andhra Pradesh - 520010
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-[#e2e8f0] shadow-sm space-y-3">
              <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <Phone className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-sm text-[#001637]">Phone & Help Desk</h3>
              <p className="text-xs text-slate-600">
                Toll Free: 1800-425-9988<br />
                Direct Desk: +91 (866) 249-9999<br />
                WhatsApp Advisory: +91 98480 22334
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-[#e2e8f0] shadow-sm space-y-3">
              <div className="w-10 h-10 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center">
                <Clock className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-sm text-[#001637]">Operating Hours</h3>
              <p className="text-xs text-slate-600">
                Monday – Saturday: 9:00 AM – 7:30 PM IST<br />
                Sunday: Site inspections by prior appointment only
              </p>
            </div>
          </div>

          {/* Contact Intake Form */}
          <div className="lg:col-span-2 bg-white p-8 rounded-2xl border border-[#e2e8f0] shadow-sm">
            <h2 className="text-xl font-bold text-[#001637] mb-1">Send Us a Direct Message</h2>
            <p className="text-xs text-slate-500 mb-6">
              Fill in your inquiry details and an authorized property advisor will respond within 4 business hours.
            </p>

            {submitted ? (
              <div className="p-8 text-center bg-emerald-50 rounded-xl text-emerald-900 space-y-2">
                <CheckCircle2 className="w-10 h-10 mx-auto text-emerald-600" />
                <h4 className="font-bold text-base">Inquiry Submitted Successfully</h4>
                <p className="text-xs text-slate-600">
                  Reference Ticket #EH-{Math.floor(100000 + Math.random() * 900000)} generated. An officer will call your registered number.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">Full Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Ramesh Varma"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">Phone Number</label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98480 00000"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">Email Address</label>
                    <input
                      type="email"
                      required
                      placeholder="ramesh@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">Subject</label>
                    <select
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold"
                    >
                      <option>Property Purchase Consultation</option>
                      <option>Schedule Site Visit</option>
                      <option>AP RERA Verification Query</option>
                      <option>Broker Partnership Request</option>
                      <option>Post a Property Assistance</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">Message Details</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Provide details about the venture, budget, or preferred locality..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold"
                  />
                </div>

                <button
                  type="submit"
                  className="px-6 py-3 rounded-lg bg-[#2563eb] hover:bg-[#1d4ed8] text-white font-bold text-xs shadow-md transition flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Message</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

