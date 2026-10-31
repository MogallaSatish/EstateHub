import React from 'react';
import { Navbar } from '../../components/common/Navbar';
import { Footer } from '../../components/common/Footer';
import { 
  Building2, 
  ShieldCheck, 
  Target, 
  Award, 
  CheckCircle2, 
  MapPin, 
  Users, 
  FileCheck2,
  TrendingUp
} from 'lucide-react';

export const AboutUsPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#f9f9ff] flex flex-col font-['Inter']">
      <Navbar />

      {/* Hero Header */}
      <div className="bg-[#001637] text-white py-16 px-4 sm:px-8 border-b border-[#172b4d] text-center">
        <div className="max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#172b4d] text-[#7ffc97] border border-[#34476a]">
            <ShieldCheck className="w-4 h-4" />
            <span>Built on Institutional Confidence</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold font-['Inter']">About EstateHub</h1>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Pioneering digital governance, title transparency, and escrow certainty for Andhra Pradesh's high-growth capital region.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-4 sm:px-8 py-16 w-full flex-1 space-y-16">
        {/* Mission Statement */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-[#2563eb]">Our Core Mission</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#001637]">
              Eliminating Speculative Chaos in High-Ticket Real Estate
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Founded to restore institutional trust to property transactions in Vijayawada, Guntur, and Amaravati, EstateHub operates as a strict regulatory gatekeeper. We bridge home buyers, commercial enterprises, and certified developers through deep-tier title verification.
            </p>
            <div className="space-y-2 text-xs font-semibold text-slate-700">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Zero unauthorized or unapproved ventures listed</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Comprehensive AP RERA registration auditing before publication</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Standardized pricing in Indian numbering (Lakhs & Crores)</span>
              </div>
            </div>
          </div>

          <div className="rounded-2xl overflow-hidden shadow-lg border border-slate-200 aspect-[4/3]">
            <img
              src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1000&q=80"
              alt="Corporate headquarters"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* 3 Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8 border-t border-slate-200">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-lg bg-blue-50 text-[#2563eb] flex items-center justify-center">
              <Target className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-base text-[#001637]">Precision Architectural Metaphor</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Every listing details physical blueprints, Vaastu orientations, super built-up versus carpet area, and RERA sanctioned layout drawings.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-base text-[#001637]">Regulatory Benchmarking</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Real-time cross-referencing against Andhra Pradesh Real Estate Regulatory Authority archives and CRDA zoning designations.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center">
              <TrendingUp className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-base text-[#001637]">Transparent Valuation</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Secondary rate per Sq. Yard and Sq. Foot metrics provided alongside total acquisition pricing to enable vertical comparison.
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

