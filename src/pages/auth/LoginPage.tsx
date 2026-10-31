import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Building2, ShieldCheck, Lock, Mail, ArrowRight, Check } from 'lucide-react';
import { UserRole } from '../../types';

interface LoginPageProps {
  onLogin?: (role: UserRole) => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  const navigate = useNavigate();
  const [role, setRole] = useState<UserRole>('BUYER');
  const [email, setEmail] = useState('suresh.varma@example.com');
  const [password, setPassword] = useState('password123');

  const handleRoleSelect = (selectedRole: UserRole) => {
    setRole(selectedRole);
    if (selectedRole === 'BUYER') {
      setEmail('suresh.varma@example.com');
    } else if (selectedRole === 'SELLER') {
      setEmail('kavitha.estates@example.com');
    } else {
      setEmail('admin.rajesh@estatehub.in');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin?.(role);
    if (role === 'ADMIN') {
      navigate('/admin/dashboard');
    } else if (role === 'SELLER') {
      navigate('/seller/overview');
    } else {
      navigate('/buyer/overview');
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] flex flex-col justify-center py-12 sm:px-6 lg:px-8 font-['Inter']">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <Link to="/" className="inline-flex items-center gap-2 group mb-4">
          <div className="w-10 h-10 rounded-xl bg-[#001637] flex items-center justify-center text-white shadow-md">
            <Building2 className="w-6 h-6 text-[#2563eb]" />
          </div>
          <span className="text-2xl font-bold tracking-tight text-[#001637]">
            Estate<span className="text-[#2563eb]">Hub</span>
          </span>
        </Link>
        <h2 className="text-2xl font-bold text-[#001637]">Sign in to Your Account</h2>
        <p className="text-xs text-slate-500 mt-1">
          Access your personalized real estate portal & verified portfolio
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4">
        <div className="bg-white py-8 px-6 sm:px-10 shadow-xl rounded-2xl border border-slate-200">
          {/* Persona / Role Selector */}
          <div className="mb-6">
            <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
              Select Your Portal Persona
            </label>
            <div className="grid grid-cols-3 gap-2 bg-slate-100 p-1.5 rounded-xl border border-slate-200">
              {(['BUYER', 'SELLER', 'ADMIN'] as UserRole[]).map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => handleRoleSelect(r)}
                  className={`py-2 text-xs font-bold rounded-lg transition ${
                    role === r
                      ? 'bg-white text-[#2563eb] shadow-sm'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {r === 'BUYER' ? 'Buyer' : r === 'SELLER' ? 'Seller/Agent' : 'Admin'}
                </button>
              ))}
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">
                Email Address or AP RERA ID
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold text-slate-800"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-[11px] font-bold text-slate-500 uppercase">
                  Password
                </label>
                <Link to="/forgot-password" className="text-xs text-[#2563eb] hover:underline font-semibold">
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold text-slate-800"
                />
              </div>
            </div>

            <div className="flex items-center">
              <input
                id="remember-me"
                type="checkbox"
                defaultChecked
                className="w-4 h-4 text-[#2563eb] rounded border-slate-300"
              />
              <label htmlFor="remember-me" className="ml-2 block text-xs text-slate-600 font-medium">
                Keep me signed in on this workstation
              </label>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 px-4 rounded-lg bg-[#2563eb] hover:bg-[#1d4ed8] text-white font-bold text-xs shadow-md transition flex items-center justify-center gap-2"
            >
              <span>Enter {role === 'ADMIN' ? 'Admin Portal' : role === 'SELLER' ? 'Seller Desk' : 'Buyer Dashboard'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-slate-100 text-center">
            <p className="text-xs text-slate-500">
              Don't have an EstateHub account yet?{' '}
              <Link to="/register" className="text-[#2563eb] font-bold hover:underline">
                Create Account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

