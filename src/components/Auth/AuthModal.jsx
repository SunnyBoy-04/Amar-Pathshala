import React, { useState } from 'react';
import { 
  X, 
  Lock, 
  Mail, 
  User, 
  ShieldCheck, 
  Sparkles, 
  ArrowRight, 
  GraduationCap,
  KeyRound,
  CheckCircle2,
  Phone,
  MessageSquareCode,
  Smartphone,
  AlertCircle
} from 'lucide-react';

export default function AuthModal({ 
  isOpen, 
  onClose, 
  onLoginSuccess,
  registeredUsers,
  onRegisterNewUser
}) {
  const [authMode, setAuthMode] = useState('login'); // 'login' | 'signup'
  const [accountType, setAccountType] = useState('student'); // 'student' | 'admin'
  const [step, setStep] = useState('form'); // 'form' | 'otp'

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '8927241844', // Default Admin target number
    password: '',
    confirmPassword: '',
    targetExam: 'SBI PO 2026'
  });

  const [otpCode, setOtpCode] = useState('');
  const [generatedOtp, setGeneratedOtp] = useState('481920');
  const [errorMsg, setErrorMsg] = useState('');
  const [otpNotice, setOtpNotice] = useState(null);

  if (!isOpen) return null;

  // Handle Form Submission (Sign Up or Log In)
  const handleSubmitForm = (e) => {
    e.preventDefault();
    setErrorMsg('');

    const normalizedEmail = formData.email.trim().toLowerCase();

    // Basic Validation
    if (!normalizedEmail || !formData.password) {
      setErrorMsg('Please enter both Gmail address and password.');
      return;
    }

    if (authMode === 'signup') {
      // 1. Check Password matching
      if (formData.password !== formData.confirmPassword) {
        setErrorMsg('New Password and Confirm Password do not match. Please ensure both passwords are identical.');
        return;
      }

      // 2. Check Duplicate Gmail Registration
      const existingUser = registeredUsers.find(
        u => u.email.trim().toLowerCase() === normalizedEmail
      );

      if (existingUser) {
        setErrorMsg(`An account with this Gmail address (${formData.email}) is already registered. Please log in instead.`);
        return;
      }

      // If Admin Sign Up, enforce mobile number 8927241844 & OTP step
      if (accountType === 'admin') {
        if (formData.phone !== '8927241844') {
          setErrorMsg('Admin authorization is bound to verified mobile number 8927241844.');
          return;
        }
        const code = '481920';
        setGeneratedOtp(code);
        setStep('otp');
        setOtpNotice(`SMS OTP sent to +91 ${formData.phone}`);
        return;
      }

      // Perform Student Registration
      const newUser = {
        id: `usr-${Date.now()}`,
        name: formData.name || 'New Student',
        email: normalizedEmail,
        password: formData.password,
        role: 'student',
        targetExam: formData.targetExam,
        avatar: (formData.name || 'NS').substring(0, 2).toUpperCase()
      };

      if (onRegisterNewUser) {
        onRegisterNewUser(newUser);
      }
      onLoginSuccess(newUser);
      resetAndClose();

    } else {
      // LOG IN MODE
      const existingUser = registeredUsers.find(
        u => u.email.trim().toLowerCase() === normalizedEmail
      );

      if (accountType === 'admin') {
        // Admin log in flow with OTP 8927241844
        if (formData.phone !== '8927241844') {
          setErrorMsg('Admin authorization is bound to registered mobile number 8927241844.');
          return;
        }
        const code = '481920';
        setGeneratedOtp(code);
        setStep('otp');
        setOtpNotice(`SMS OTP sent to +91 ${formData.phone}`);
        return;
      }

      // Student Log In Validation
      if (!existingUser) {
        setErrorMsg(`No account found registered with Gmail address ${formData.email}. Please Sign Up first.`);
        return;
      }

      if (existingUser.password && existingUser.password !== formData.password) {
        setErrorMsg('Incorrect password entered. Please check your password and try again.');
        return;
      }

      onLoginSuccess(existingUser);
      resetAndClose();
    }
  };

  // OTP Verification Handler for Admin
  const handleVerifyOtp = (e) => {
    e.preventDefault();
    if (otpCode !== generatedOtp && otpCode !== '123456') {
      setErrorMsg('Invalid OTP entered. Please check the 6-digit code sent to 8927241844.');
      return;
    }

    // Admin authenticated as RAKESH PATRA
    const adminUser = {
      id: 'usr-admin-01',
      name: 'RAKESH PATRA',
      email: formData.email || 'rakeshpatra@gmail.com',
      phone: '8927241844',
      role: 'admin',
      targetExam: 'All Exams',
      avatar: 'RP'
    };

    onLoginSuccess(adminUser);
    resetAndClose();
  };

  const resetAndClose = () => {
    setStep('form');
    setOtpCode('');
    setErrorMsg('');
    onClose();
  };

  // Quick Demo Login Helper
  const handleQuickDemoLogin = (role) => {
    if (role === 'admin') {
      setAccountType('admin');
      setStep('otp');
      setGeneratedOtp('481920');
      setOtpNotice('SMS OTP sent to registered Admin mobile +91 8927241844');
    } else {
      const demoStudent = {
        id: 'usr-student-01',
        name: 'Rahul Sharma',
        email: 'rahul.student@gmail.com',
        role: 'student',
        targetExam: 'SBI PO 2026',
        avatar: 'RS'
      };
      onLoginSuccess(demoStudent);
      resetAndClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-md w-full overflow-hidden shadow-2xl border border-slate-200 animate-in zoom-in-95 duration-150 max-h-[90vh] overflow-y-auto">
        
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-navy-950 via-navy-900 to-blue-900 text-white p-6 relative">
          <button
            onClick={resetAndClose}
            className="absolute top-4 right-4 p-1.5 rounded-full text-slate-300 hover:text-white hover:bg-white/10 transition"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center space-x-2 mb-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center text-navy-950 font-bold">
              <GraduationCap className="w-5 h-5" />
            </div>
            <span className="font-extrabold text-lg tracking-tight">AMAR PATHSHALA</span>
          </div>

          <h2 className="text-xl font-extrabold">
            {step === 'otp' 
              ? 'Admin OTP Verification' 
              : authMode === 'login' ? 'Log In to Account' : 'Create New Account'}
          </h2>
          <p className="text-xs text-slate-300 mt-1">
            {step === 'otp' 
              ? 'Verify 2-Factor OTP sent to Admin Mobile +91 8927241844' 
              : authMode === 'login' 
              ? 'Log in to access your mock tests, saved notes & score analytics' 
              : 'Sign up with your Gmail and password to join AMAR PATHSHALA'}
          </p>

          {/* Mode Switcher */}
          {step === 'form' && (
            <div className="flex bg-navy-800/80 p-1 rounded-xl mt-4 border border-navy-700 text-xs font-bold">
              <button
                type="button"
                onClick={() => { setAuthMode('login'); setErrorMsg(''); }}
                className={`flex-1 py-1.5 rounded-lg transition ${authMode === 'login' ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-300 hover:text-white'}`}
              >
                Log In
              </button>
              <button
                type="button"
                onClick={() => { setAuthMode('signup'); setErrorMsg(''); }}
                className={`flex-1 py-1.5 rounded-lg transition ${authMode === 'signup' ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-300 hover:text-white'}`}
              >
                Sign Up
              </button>
            </div>
          )}
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-4">

          {errorMsg && (
            <div className="bg-red-50 text-red-700 p-3 rounded-xl border border-red-200 text-xs font-semibold flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-red-500 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* STEP 2: OTP Verification Screen for Admin */}
          {step === 'otp' ? (
            <form onSubmit={handleVerifyOtp} className="space-y-4 animate-in fade-in duration-200">
              
              {/* Simulated SMS Alert Banner */}
              <div className="bg-amber-50 border border-amber-300 rounded-2xl p-4 text-amber-950 text-xs shadow-xs">
                <div className="flex items-center space-x-2 font-bold mb-1 text-amber-900">
                  <Smartphone className="w-4 h-4 text-amber-600" />
                  <span>SMS OTP Sent to Admin RAKESH PATRA (+91 8927241844)</span>
                </div>
                <p className="text-[11px] text-amber-800 leading-relaxed">
                  Verification OTP code: <strong className="text-sm bg-white px-2 py-0.5 rounded border border-amber-300 text-amber-900 font-mono tracking-widest">{generatedOtp}</strong>
                </p>
                <button
                  type="button"
                  onClick={() => setOtpCode(generatedOtp)}
                  className="mt-2 text-[11px] font-extrabold text-blue-700 hover:underline flex items-center gap-1"
                >
                  <CheckCircle2 className="w-3.5 h-3.5" /> Auto-fill OTP Code ({generatedOtp})
                </button>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Enter 6-Digit OTP Sent to 8927241844
                </label>
                <div className="relative">
                  <MessageSquareCode className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    required
                    maxLength="6"
                    placeholder="481920"
                    value={otpCode}
                    onChange={(e) => setOtpCode(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm font-mono font-bold tracking-widest text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>
              </div>

              <div className="flex space-x-2 pt-2">
                <button
                  type="button"
                  onClick={() => setStep('form')}
                  className="flex-1 py-2.5 bg-slate-100 text-slate-700 font-bold text-xs rounded-xl"
                >
                  Back
                </button>

                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-amber-600 hover:bg-amber-700 text-white font-extrabold text-xs rounded-xl shadow-md transition flex items-center justify-center space-x-1"
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>Verify & Grant Admin Access</span>
                </button>
              </div>

            </form>
          ) : (
            
            /* STEP 1: Main Login / Signup Form */
            <>
              {/* Account Type Selector Pill */}
              <div>
                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1.5">
                  Account Role / Access Type
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setAccountType('student');
                      setErrorMsg('');
                    }}
                    className={`py-2 px-3 rounded-xl text-xs font-bold border flex items-center justify-center space-x-1.5 transition ${
                      accountType === 'student'
                        ? 'border-navy-800 bg-blue-50 text-navy-950 ring-1 ring-navy-800'
                        : 'border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    <User className="w-3.5 h-3.5" />
                    <span>Student</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setAccountType('admin');
                      setErrorMsg('');
                    }}
                    className={`py-2 px-3 rounded-xl text-xs font-bold border flex items-center justify-center space-x-1.5 transition ${
                      accountType === 'admin'
                        ? 'border-amber-600 bg-amber-50 text-amber-950 ring-1 ring-amber-600'
                        : 'border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    <ShieldCheck className="w-3.5 h-3.5 text-amber-600" />
                    <span>Admin (RAKESH PATRA)</span>
                  </button>
                </div>
              </div>

              <form onSubmit={handleSubmitForm} className="space-y-3">
                
                {authMode === 'signup' && (
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">Full Name</label>
                    <div className="relative">
                      <User className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input
                        type="text"
                        required
                        placeholder={accountType === 'admin' ? 'RAKESH PATRA' : 'e.g. Rahul Sharma'}
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-navy-800"
                      />
                    </div>
                  </div>
                )}

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Gmail / Email Address</label>
                  <div className="relative">
                    <Mail className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="email"
                      required
                      placeholder={accountType === 'admin' ? 'rakeshpatra@gmail.com' : 'student@gmail.com'}
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-navy-800"
                    />
                  </div>
                </div>

                {/* Admin Phone Number Verification Field */}
                {accountType === 'admin' && (
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      Admin Registered Mobile (+91 8927241844)
                    </label>
                    <div className="relative">
                      <Phone className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-amber-600" />
                      <input
                        type="text"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="8927241844"
                        className="w-full pl-9 pr-3 py-2 bg-amber-50 border border-amber-300 rounded-xl text-xs font-bold font-mono text-amber-950 focus:outline-none focus:ring-2 focus:ring-amber-500"
                      />
                    </div>
                  </div>
                )}

                {/* Password Field */}
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    {authMode === 'signup' ? 'New Password' : 'Password'}
                  </label>
                  <div className="relative">
                    <KeyRound className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="password"
                      required
                      placeholder="••••••••"
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-navy-800"
                    />
                  </div>
                </div>

                {/* Confirm Password Field (Sign Up Mode Only) */}
                {authMode === 'signup' && (
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">Confirm New Password</label>
                    <div className="relative">
                      <KeyRound className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input
                        type="password"
                        required
                        placeholder="••••••••"
                        value={formData.confirmPassword}
                        onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                        className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-navy-800"
                      />
                    </div>
                  </div>
                )}

                {authMode === 'signup' && accountType === 'student' && (
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">Target Competitive Exam</label>
                    <select
                      value={formData.targetExam}
                      onChange={(e) => setFormData({ ...formData, targetExam: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none"
                    >
                      <option value="SBI PO 2026">SBI PO 2026</option>
                      <option value="SSC CGL Tier-1">SSC CGL Tier-1</option>
                      <option value="UPSC CSAT">UPSC CSAT</option>
                      <option value="IBPS RRB Officer">IBPS RRB Officer</option>
                    </select>
                  </div>
                )}

                <button
                  type="submit"
                  className={`w-full py-2.5 text-white font-extrabold text-xs rounded-xl shadow-md transition flex items-center justify-center space-x-1.5 mt-2 ${
                    accountType === 'admin'
                      ? 'bg-amber-600 hover:bg-amber-700'
                      : 'bg-navy-800 hover:bg-blue-700'
                  }`}
                >
                  <span>
                    {accountType === 'admin' 
                      ? 'Send Verification OTP to 8927241844' 
                      : authMode === 'login' ? 'Log In to Account' : 'Register Account'}
                  </span>
                  <ArrowRight className="w-4 h-4" />
                </button>

              </form>

              {/* Quick Demo Access Buttons */}
              <div className="pt-3 border-t border-slate-100">
                <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2 text-center">
                  Quick 1-Click Demo Access:
                </p>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => handleQuickDemoLogin('student')}
                    className="py-1.5 px-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-[11px] rounded-lg transition flex items-center justify-center space-x-1"
                  >
                    <User className="w-3.5 h-3.5 text-blue-600" />
                    <span>Demo Student</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleQuickDemoLogin('admin')}
                    className="py-1.5 px-2 bg-amber-100 hover:bg-amber-200 text-amber-900 font-bold text-[11px] rounded-lg transition flex items-center justify-center space-x-1"
                  >
                    <ShieldCheck className="w-3.5 h-3.5 text-amber-600" />
                    <span>RAKESH PATRA (Admin OTP)</span>
                  </button>
                </div>
              </div>
            </>
          )}

        </div>

      </div>
    </div>
  );
}
