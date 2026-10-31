import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Building2, ShieldCheck, User, Mail, Phone, Lock, ArrowRight, CheckCircle2 } from 'lucide-react';
import { UserRole } from '../../types';

export const RegistrationPage: React.FC = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState<UserRole>('BUYER');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [reraId, setReraId] = useState('');
  const [registered, setRegistered] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setRegistered(true);
    setTimeout(() => {
      navigate('/login');
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] flex flex-col justify-center py-12 sm:px-6 lg:px-8 font-['Inter']">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <Link to="/" className="inline-flex items-center gap-2 mb-4">
          <div className="w-10 h-10 rounded-xl bg-[#001637] flex items-center justify-center text-white shadow-md">
            <Building2 className="w-6 h-6 text-[#2563eb]" />
          </div>
          <span className="text-2xl font-bold tracking-tight text-[#001637]">
            Estate<span className="text-[#2563eb]">Hub</span>
          </span>
        </Link>
        <h2 className="text-2xl font-bold text-[#001637]">Create an EstateHub Account</h2>
        <p className="text-xs text-slate-500 mt-1">
          Join the verified Andhra Pradesh real estate network
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4">
        <div className="bg-white py-8 px-6 sm:px-10 shadow-xl rounded-2xl border border-slate-200">
          {registered ? (
            <div className="p-6 text-center space-y-3">
              <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
              <h3 className="text-lg font-bold text-[#001637]">Account Created Successfully!</h3>
              <p className="text-xs text-slate-500">Redirecting you to the sign in gateway...</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                  Account Purpose
                </label>
                <div className="grid grid-cols-2 gap-2 bg-slate-100 p-1.5 rounded-xl border border-slate-200">
                  <button
                    type="button"
                    onClick={() => setRole('BUYER')}
                    className={`py-2 text-xs font-bold rounded-lg transition ${
                      role === 'BUYER' ? 'bg-white text-[#2563eb] shadow-sm' : 'text-slate-600'
                    }`}
                  >
                    Home Buyer / Investor
                  </button>
                  <button
                    type="button"
                    onClick={() => setRole('SELLER')}
                    className={`py-2 text-xs font-bold rounded-lg transition ${
                      role === 'SELLER' ? 'bg-white text-[#2563eb] shadow-sm' : 'text-slate-600'
                    }`}
                  >
                    Owner / Verified Agent
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">Full Legal Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ramesh Varma"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">Mobile Number (OTP Verified)</label>
                <input
                  type="tel"
                  required
                  placeholder="+91 98480 00000"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold"
                />
              </div>

              {role === 'SELLER' && (
                <div>
                  <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">
                    AP RERA Broker Registration ID (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="APRERA/AGT/2026/..."
                    value={reraId}
                    onChange={(e) => setReraId(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold font-mono"
                  />
                </div>
              )}

              <div>
                <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">Create Password</label>
                <input
                  type="password"
                  required
                  placeholder="At least 8 characters"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold"
                />
              </div>

              <div className="flex items-start pt-1">
                <input
                  id="terms"
                  type="checkbox"
                  required
                  className="w-4 h-4 text-[#2563eb] rounded border-slate-300 mt-0.5"
                />
                <label htmlFor="terms" className="ml-2 block text-xs text-slate-600">
                  I agree to the <Link to="/about" className="text-[#2563eb] underline">AP RERA Platform Terms</Link> and privacy compliance standards.
                </label>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 px-4 rounded-lg bg-[#2563eb] hover:bg-[#1d4ed8] text-white font-bold text-xs shadow-md transition flex items-center justify-center gap-2"
              >
                <span>Register & Continue</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}

          <div className="mt-6 pt-6 border-t border-slate-100 text-center">
            <p className="text-xs text-slate-500">
              Already have an account?{' '}
              <Link to="/login" className="text-[#2563eb] font-bold hover:underline">
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

