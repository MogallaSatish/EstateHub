import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Navbar } from '../../components/common/Navbar';
import { Footer } from '../../components/common/Footer';
import { Modal } from '../../components/common/Modal';
import { mockProperties, mockAgents } from '../../data/mockData';
import { 
  ShieldCheck, 
  MapPin, 
  Bed, 
  Bath, 
  Maximize, 
  Compass, 
  Calendar, 
  Heart, 
  Share2, 
  Phone, 
  Mail, 
  CheckCircle2, 
  Calculator, 
  Clock, 
  FileCheck2,
  Building,
  Check,
  ArrowLeft
} from 'lucide-react';

export const PropertyDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const property = mockProperties.find(p => p.id === id) || mockProperties[0];
  const agent = mockAgents.find(a => a.id === property.agentId) || mockAgents[0];

  const [activeImage, setActiveImage] = useState(0);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState<'VISIT' | 'INQUIRY' | 'RERA'>('VISIT');
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Form states
  const [formName, setFormName] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formPhone, setFormPhone] = useState('');
  const [formDate, setFormDate] = useState('');
  const [formSlot, setFormSlot] = useState('11:00 AM - 12:00 PM');
  const [formMessage, setFormMessage] = useState('I am interested in scheduling a site visit to inspect this property.');

  // EMI Calculator states
  const [loanAmount, setLoanAmount] = useState<number>(Math.round(property.price * 0.8));
  const [interestRate, setInterestRate] = useState<number>(8.5);
  const [tenureYears, setTenureYears] = useState<number>(20);

  // Calculate monthly EMI: E = P * r * (1 + r)^n / ((1 + r)^n - 1)
  const calculateEMI = () => {
    const p = loanAmount;
    const r = interestRate / 12 / 100;
    const n = tenureYears * 12;
    if (r === 0) return Math.round(p / n);
    const emi = (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    return Math.round(emi);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitSuccess(true);
    setTimeout(() => {
      setSubmitSuccess(false);
      setModalOpen(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-[#f9f9ff] flex flex-col font-['Inter']">
      <Navbar />

      {/* Back button & Breadcrumbs */}
      <div className="bg-white border-b border-[#e2e8f0] px-4 sm:px-8 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <Link to="/properties" className="hover:text-[#2563eb] flex items-center gap-1 font-semibold">
              <ArrowLeft className="w-3.5 h-3.5" /> Back to Properties
            </Link>
            <span>/</span>
            <span>{property.locality}</span>
            <span>/</span>
            <span className="text-[#001637] font-bold truncate max-w-xs">{property.title}</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsBookmarked(!isBookmarked)}
              className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-rose-600 transition"
            >
              <Heart className={`w-4 h-4 ${isBookmarked ? 'fill-rose-500 text-rose-500' : ''}`} />
              <span>{isBookmarked ? 'Saved' : 'Save Property'}</span>
            </button>
            <button
              onClick={() => {
                if (navigator.share) {
                  navigator.share({ title: property.title, url: window.location.href });
                } else {
                  navigator.clipboard.writeText(window.location.href);
                  alert('Listing link copied to clipboard!');
                }
              }}
              className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-[#2563eb] transition"
            >
              <Share2 className="w-4 h-4" />
              <span>Share</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Details View */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8 w-full flex-1">
        {/* Title & Price Header */}
        <div className="bg-white p-6 rounded-2xl border border-[#e2e8f0] shadow-sm mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="text-xs font-bold uppercase tracking-wider bg-[#001637] text-white px-2.5 py-0.5 rounded">
                {property.propertyType}
              </span>
              {property.reraApproved && (
                <button
                  onClick={() => { setModalType('RERA'); setModalOpen(true); }}
                  className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#dcfce7] text-[#15803d] border border-[#bbf7d0] hover:bg-[#bbf7d0] transition cursor-pointer"
                >
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>AP RERA Verified: {property.reraNumber}</span>
                </button>
              )}
              {property.crdaApproved && (
                <span className="text-xs font-bold bg-slate-100 text-slate-700 px-2.5 py-0.5 rounded border border-slate-200">
                  CRDA Approved Layout
                </span>
              )}
            </div>

            <h1 className="text-2xl sm:text-3xl font-bold text-[#001637] font-['Inter']">
              {property.title}
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 flex items-center gap-1.5 mt-1">
              <MapPin className="w-4 h-4 text-[#2563eb]" /> {property.address}
            </p>
          </div>

          <div className="md:text-right border-t md:border-t-0 pt-3 md:pt-0 border-slate-100">
            <div className="text-3xl font-extrabold text-[#172b4d] tabular-nums font-['Inter']">
              {property.priceDisplay}
            </div>
            <div className="text-xs font-semibold text-slate-500 mt-0.5">
              {property.pricePerUnit} (Inclusive of Car Parking & Water)
            </div>
          </div>
        </div>

        {/* Media Gallery */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-8">
          {/* Main Large Image */}
          <div className="lg:col-span-3 rounded-2xl overflow-hidden aspect-video bg-slate-100 border border-slate-200 relative shadow-sm">
            <img
              src={property.images[activeImage] || property.images[0]}
              alt={property.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-md text-white px-3 py-1 rounded-lg text-xs font-medium">
              Image {activeImage + 1} of {property.images.length}
            </div>
          </div>

          {/* Thumbnails Column */}
          <div className="grid grid-cols-3 lg:grid-cols-1 gap-2.5">
            {property.images.map((img, index) => (
              <button
                key={index}
                onClick={() => setActiveImage(index)}
                className={`rounded-xl overflow-hidden aspect-video border-2 transition ${
                  activeImage === index ? 'border-[#2563eb] shadow-md ring-2 ring-blue-200' : 'border-transparent opacity-75 hover:opacity-100'
                }`}
              >
                <img src={img} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Content Layout: 2 Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Specs, Description, Amenities, EMI Calculator */}
          <div className="lg:col-span-2 space-y-8">
            {/* Key Specifications Grid */}
            <div className="bg-white p-6 rounded-2xl border border-[#e2e8f0] shadow-sm">
              <h2 className="text-base font-bold text-[#001637] mb-4">Property Specifications</h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <Bed className="w-5 h-5 text-[#2563eb] mx-auto mb-1" />
                  <span className="text-[11px] text-slate-500 font-semibold block">Bedrooms</span>
                  <span className="text-sm font-bold text-[#001637]">{property.bedrooms ? `${property.bedrooms} BHK` : 'N/A'}</span>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <Bath className="w-5 h-5 text-[#2563eb] mx-auto mb-1" />
                  <span className="text-[11px] text-slate-500 font-semibold block">Bathrooms</span>
                  <span className="text-sm font-bold text-[#001637]">{property.bathrooms || 'N/A'}</span>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <Maximize className="w-5 h-5 text-[#2563eb] mx-auto mb-1" />
                  <span className="text-[11px] text-slate-500 font-semibold block">Super Built-up</span>
                  <span className="text-sm font-bold text-[#001637]">{property.areaSqFt} Sq.Ft ({property.areaSqYards} Sq.Yd)</span>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <Compass className="w-5 h-5 text-[#2563eb] mx-auto mb-1" />
                  <span className="text-[11px] text-slate-500 font-semibold block">Vaastu Facing</span>
                  <span className="text-sm font-bold text-[#001637]">{property.facing}</span>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-slate-100 grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
                <div>
                  <span className="text-slate-400 block font-medium">Possession Stage:</span>
                  <span className="font-bold text-slate-800">{property.possessionStage}</span>
                </div>
                <div>
                  <span className="text-slate-400 block font-medium">Furnishing Status:</span>
                  <span className="font-bold text-slate-800">{property.furnishing}</span>
                </div>
                <div>
                  <span className="text-slate-400 block font-medium">Title Clearance:</span>
                  <span className="font-bold text-emerald-600">100% Verified Clean</span>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="bg-white p-6 rounded-2xl border border-[#e2e8f0] shadow-sm space-y-3">
              <h2 className="text-base font-bold text-[#001637]">Overview & Description</h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed whitespace-pre-line">
                {property.description}
              </p>
            </div>

            {/* Amenities */}
            <div className="bg-white p-6 rounded-2xl border border-[#e2e8f0] shadow-sm">
              <h2 className="text-base font-bold text-[#001637] mb-4">Venture Amenities & Infrastructure</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {property.amenities.map(amenity => (
                  <div key={amenity} className="flex items-center gap-2 p-2.5 rounded-lg bg-slate-50 border border-slate-100 text-xs font-semibold text-slate-800">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{amenity}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Interactive Loan EMI Calculator */}
            <div className="bg-white p-6 rounded-2xl border border-[#e2e8f0] shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <Calculator className="w-5 h-5 text-[#2563eb]" />
                <h2 className="text-base font-bold text-[#001637]">Home Loan EMI Calculator</h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                <div>
                  <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">
                    Loan Amount (₹)
                  </label>
                  <input
                    type="number"
                    value={loanAmount}
                    onChange={(e) => setLoanAmount(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-bold text-slate-800"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">
                    Interest Rate (% p.a.)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    value={interestRate}
                    onChange={(e) => setInterestRate(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-bold text-slate-800"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">
                    Tenure (Years)
                  </label>
                  <input
                    type="number"
                    value={tenureYears}
                    onChange={(e) => setTenureYears(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-bold text-slate-800"
                  />
                </div>
              </div>

              <div className="p-4 rounded-xl bg-blue-50/70 border border-blue-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <span className="text-xs text-slate-600 font-semibold block">Estimated Monthly Installment (EMI):</span>
                  <span className="text-2xl font-extrabold text-[#001637] tabular-nums font-['Inter']">
                    ₹{calculateEMI().toLocaleString('en-IN')} / month
                  </span>
                </div>
                <button
                  onClick={() => { setModalType('INQUIRY'); setModalOpen(true); }}
                  className="px-4 py-2 rounded-lg bg-[#2563eb] text-white text-xs font-bold hover:bg-[#1d4ed8] transition"
                >
                  Get Bank Loan Offers
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Sticky Action Form & Agent Card */}
          <div className="space-y-6">
            {/* Agent Info Card */}
            <div className="bg-white p-6 rounded-2xl border border-[#e2e8f0] shadow-sm text-center">
              <img
                src={agent.avatar}
                alt={agent.name}
                className="w-20 h-20 rounded-full object-cover mx-auto mb-3 border-2 border-white shadow-md"
              />
              <h3 className="text-base font-bold text-[#001637]">{agent.name}</h3>
              <p className="text-xs text-slate-500 font-medium">{agent.title} • {agent.agency}</p>
              
              <div className="my-3 inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                <ShieldCheck className="w-3 h-3 text-emerald-600" />
                <span>RERA ID: {agent.reraRegistrationNumber}</span>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-center gap-3">
                <a
                  href={`tel:${agent.phone}`}
                  className="flex-1 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition"
                >
                  <Phone className="w-3.5 h-3.5" /> Call Agent
                </a>
                <button
                  onClick={() => { setModalType('INQUIRY'); setModalOpen(true); }}
                  className="flex-1 py-2 rounded-lg bg-[#001637] hover:bg-[#172b4d] text-white font-bold text-xs flex items-center justify-center gap-1.5 transition"
                >
                  <Mail className="w-3.5 h-3.5" /> Send Inquiry
                </button>
              </div>
            </div>

            {/* Quick Action Box: Book Site Visit */}
            <div className="bg-gradient-to-br from-[#001637] to-[#172b4d] text-white p-6 rounded-2xl shadow-xl space-y-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#7ffc97]">Direct Builder Channel</span>
                <h3 className="text-lg font-bold text-white mt-1">Book an On-Site Inspection</h3>
                <p className="text-xs text-slate-300 mt-1">
                  Private chauffeured site visit with project engineer & legal counsel.
                </p>
              </div>

              <button
                onClick={() => { setModalType('VISIT'); setModalOpen(true); }}
                className="w-full py-3 rounded-lg bg-[#2563eb] hover:bg-[#1d4ed8] text-white font-bold text-xs shadow-lg transition flex items-center justify-center gap-2"
              >
                <Calendar className="w-4 h-4" />
                <span>Schedule Free Visit</span>
              </button>

              <div className="space-y-1.5 text-[11px] text-slate-300 pt-2 border-t border-slate-700">
                <div className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-emerald-400" /> Free transport from Vijayawada city center
                </div>
                <div className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-emerald-400" /> Physical inspection of AP RERA master plan
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Modal for Booking or Inquiry */}
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={
          modalType === 'VISIT'
            ? 'Schedule Site Inspection'
            : modalType === 'RERA'
            ? 'AP RERA Certificate Details'
            : 'Send Inquiry to Agent'
        }
      >
        {modalType === 'RERA' ? (
          <div className="space-y-4 text-xs">
            <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 space-y-1">
              <div className="font-bold text-sm flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600" /> Official AP RERA Compliance Record
              </div>
              <p>Registration Number: <strong>{property.reraNumber}</strong></p>
              <p>Competent Authority: <strong>Andhra Pradesh Real Estate Regulatory Authority</strong></p>
              <p>Approved Venture Name: <strong>{property.title}</strong></p>
              <p>Zoning Approval: <strong>AP CRDA Land Use Code L-4 (Residential Mixed)</strong></p>
            </div>
            <p className="text-slate-600 leading-relaxed">
              This venture holds valid environmental clearance, municipal water sanction from VMC, and certified survey numbers verified with the local Sub-Registrar Office.
            </p>
            <button
              onClick={() => setModalOpen(false)}
              className="w-full py-2 bg-[#001637] text-white rounded-lg font-bold"
            >
              Close Verification Drawer
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {submitSuccess ? (
              <div className="p-6 text-center text-emerald-700 bg-emerald-50 rounded-xl space-y-2">
                <CheckCircle2 className="w-10 h-10 mx-auto text-emerald-600" />
                <h4 className="font-bold text-base">Request Submitted Successfully!</h4>
                <p className="text-xs">Agent {agent.name} has been notified and will call you within 15 minutes.</p>
              </div>
            ) : (
              <>
                <div>
                  <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">Your Full Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Suresh Varma"
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold text-slate-800"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">Phone Number</label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98480 00000"
                      value={formPhone}
                      onChange={(e) => setFormPhone(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold text-slate-800"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">Email Address</label>
                    <input
                      type="email"
                      required
                      placeholder="suresh@example.com"
                      value={formEmail}
                      onChange={(e) => setFormEmail(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold text-slate-800"
                    />
                  </div>
                </div>

                {modalType === 'VISIT' && (
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">Preferred Date</label>
                      <input
                        type="date"
                        required
                        value={formDate}
                        onChange={(e) => setFormDate(e.target.value)}
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold text-slate-800"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">Time Slot</label>
                      <select
                        value={formSlot}
                        onChange={(e) => setFormSlot(e.target.value)}
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold text-slate-800"
                      >
                        <option>10:00 AM - 11:00 AM</option>
                        <option>11:00 AM - 12:00 PM</option>
                        <option>03:00 PM - 04:00 PM</option>
                        <option>05:00 PM - 06:00 PM</option>
                      </select>
                    </div>
                  </div>
                )}

                <div>
                  <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">Inquiry / Note</label>
                  <textarea
                    rows={3}
                    value={formMessage}
                    onChange={(e) => setFormMessage(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold text-slate-800"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 rounded-lg bg-[#2563eb] hover:bg-[#1d4ed8] text-white font-bold text-xs shadow-md transition"
                >
                  {modalType === 'VISIT' ? 'Confirm Appointment Request' : 'Send Message to Broker'}
                </button>
              </>
            )}
          </form>
        )}
      </Modal>

      <Footer />
    </div>
  );
};

