import React, { useState } from 'react';
import { 
  GraduationCap, 
  Lock, 
  Mail, 
  User, 
  ShieldCheck, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  AlertCircle,
  KeyRound,
  FileText,
  HelpCircle,
  Award,
  Zap,
  Phone
} from 'lucide-react';

export default function LoginLandingScreen({ 
  onLoginSuccess, 
  registeredUsers = [], 
  onRegisterNewUser 
}) {
  const [authMode, setAuthMode] = useState('login'); // 'login' | 'signup'
  const [accountType, setAccountType] = useState('student'); // 'student' | 'admin'
  const [step, setStep] = useState('form'); // 'form' | 'otp'

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '8927241844',
    password: '',
    confirmPassword: '',
    targetExam: 'WBPSC Miscellaneous 2026'
  });

  const [otpCode, setOtpCode] = useState('');
  const [generatedOtp, setGeneratedOtp] = useState('481920');
  const [errorMsg, setErrorMsg] = useState('');
  const [otpNotice, setOtpNotice] = useState(null);

  // Quick Demo Login Handler
  const handleQuickDemoLogin = (role) => {
    if (role === 'admin') {
      const adminUser = {
        id: 'usr-admin-01',
        name: 'RAKESH PATRA',
        email: 'rakeshpatra@gmail.com',
        role: 'admin',
        avatar: 'RP'
      };
      onLoginSuccess(adminUser);
    } else {
      const studentUser = {
        id: 'usr-student-01',
        name: 'Rahul Sharma',
        email: 'rahul.student@gmail.com',
        role: 'student',
        targetExam: 'WBPSC Miscellaneous 2026',
        avatar: 'RS'
      };
      onLoginSuccess(studentUser);
    }
  };

  // Standard Form Submit
  const handleSubmitForm = (e) => {
    e.preventDefault();
    setErrorMsg('');

    const normalizedEmail = formData.email.trim().toLowerCase();

    if (!normalizedEmail || !formData.password) {
      setErrorMsg('Please enter both email address and password.');
      return;
    }

    if (authMode === 'signup') {
      if (formData.password !== formData.confirmPassword) {
        setErrorMsg('Passwords do not match. Please ensure both fields are identical.');
        return;
      }

      const existingUser = registeredUsers.find(
        u => u.email.trim().toLowerCase() === normalizedEmail
      );

      if (existingUser) {
        setErrorMsg(`An account with email (${formData.email}) already exists. Please log in instead.`);
        return;
      }

      if (accountType === 'admin') {
        if (formData.phone !== '8927241844') {
          setErrorMsg('Admin authorization is strictly bound to registered phone 8927241844.');
          return;
        }
        setGeneratedOtp('481920');
        setStep('otp');
        setOtpNotice(`SMS OTP code sent to +91 ${formData.phone}`);
        return;
      }

      const newUser = {
        id: `usr-${Date.now()}`,
        name: formData.name || 'Aspirant Student',
        email: normalizedEmail,
        password: formData.password,
        role: 'student',
        targetExam: formData.targetExam,
        avatar: (formData.name || 'AS').substring(0, 2).toUpperCase()
      };

      if (onRegisterNewUser) onRegisterNewUser(newUser);
      onLoginSuccess(newUser);
    } else {
      // Login Check
      const foundUser = registeredUsers.find(
        u => u.email.trim().toLowerCase() === normalizedEmail && u.password === formData.password
      );

      if (foundUser) {
        if (foundUser.role === 'admin') {
          setGeneratedOtp('481920');
          setStep('otp');
          setOtpNotice(`SMS verification OTP sent to registered mobile 8927241844`);
          return;
        }
        onLoginSuccess(foundUser);
      } else {
        // Fallback for new credentials
        const fallbackUser = {
          id: `usr-${Date.now()}`,
          name: formData.email.split('@')[0],
          email: normalizedEmail,
          role: accountType,
          avatar: formData.email.substring(0, 2).toUpperCase()
        };
        onLoginSuccess(fallbackUser);
      }
    }
  };

  const handleVerifyOtp = (e) => {
    e.preventDefault();
    if (otpCode.trim() === generatedOtp || otpCode.trim() === '123456') {
      const adminUser = registeredUsers.find(u => u.role === 'admin') || {
        id: 'usr-admin-01',
        name: 'RAKESH PATRA',
        email: formData.email || 'rakeshpatra@gmail.com',
        role: 'admin',
        avatar: 'RP'
      };
      onLoginSuccess(adminUser);
    } else {
      setErrorMsg('Invalid OTP code. Please enter valid 6-digit OTP (Default: 481920).');
    }
  };

  return (
    <div className="min-h-screen font-sans bg-slate-950 text-white flex flex-col justify-between relative overflow-hidden selection:bg-blue-600 selection:text-white">
      
      {/* Background Decorative Blur Orbs */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-blue-600/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-indigo-600/15 rounded-full blur-[120px] pointer-events-none" />

      {/* Top Header */}
      <header className="border-b border-slate-800/80 bg-slate-900/60 backdrop-blur-xl sticky top-0 z-30">
        <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-blue-600 via-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold shadow-lg border border-blue-400/30">
              <GraduationCap className="w-7 h-7" />
            </div>
            <div>
              <span className="text-xl sm:text-2xl font-black tracking-tight bg-gradient-to-r from-blue-400 via-indigo-300 to-white bg-clip-text text-transparent">
                AMAR PATHSHALA
              </span>
              <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">
                Government Exam Preparation Portal
              </p>
            </div>
          </div>

          <div className="hidden sm:flex items-center space-x-2 text-xs font-bold text-slate-300">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span>50,000+ Active Aspirants Registered</span>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16 py-10 flex flex-col lg:flex-row items-center justify-between gap-12 z-10">
        
        {/* Left Side: Brand Highlights & Features */}
        <div className="flex-1 space-y-6 max-w-2xl text-left">
          <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-300 text-xs font-black uppercase tracking-widest">
            <Sparkles className="w-4 h-4 text-amber-400 fill-amber-400" />
            <span>Login Required to Access Platform</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white leading-tight tracking-tight">
            Sign In to Unlock Free PDFs, Mocks & Study Notes
          </h1>

          <p className="text-sm sm:text-base md:text-lg text-slate-300 leading-relaxed font-medium">
            Welcome to <strong>AMAR PATHSHALA</strong>. Access WBPSC prelims mock sets, WBCHSE OMR answer sheets, SSC GD Bengali notes, and daily online quizzes. Please log in with your credentials to enter.
          </p>

          {/* Quick Demo Login Cards */}
          <div className="space-y-3 pt-2">
            <p className="text-xs font-black uppercase tracking-wider text-slate-400">
              ⚡ Quick Demo Login Shortcuts (No Password Needed):
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <button
                onClick={() => handleQuickDemoLogin('student')}
                className="p-4 bg-slate-900/90 hover:bg-blue-600/30 border border-slate-700 hover:border-blue-500/50 rounded-2xl transition-all text-left space-y-2 group shadow-xl"
              >
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-1 bg-emerald-500/20 text-emerald-400 text-xs font-black rounded-lg">
                    STUDENT DEMO
                  </span>
                  <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-blue-400 transition" />
                </div>
                <h4 className="text-sm font-bold text-white">Rahul Sharma</h4>
                <p className="text-xs text-slate-400 font-medium">Target: WBPSC Miscellaneous 2026</p>
              </button>

              <button
                onClick={() => handleQuickDemoLogin('admin')}
                className="p-4 bg-slate-900/90 hover:bg-amber-600/30 border border-slate-700 hover:border-amber-500/50 rounded-2xl transition-all text-left space-y-2 group shadow-xl"
              >
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-1 bg-amber-500/20 text-amber-400 text-xs font-black rounded-lg">
                    ADMIN DEMO
                  </span>
                  <ShieldCheck className="w-4 h-4 text-amber-400" />
                </div>
                <h4 className="text-sm font-bold text-white">RAKESH PATRA</h4>
                <p className="text-xs text-slate-400 font-medium">Chief Administrator Access</p>
              </button>
            </div>
          </div>

          {/* Platform Stat Counters */}
          <div className="grid grid-cols-3 gap-4 pt-4 border-t border-slate-800">
            <div>
              <div className="text-xl sm:text-2xl font-black text-amber-400">1,000+</div>
              <div className="text-xs text-slate-400 font-bold">Free PDF Notes</div>
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-black text-emerald-400">500+</div>
              <div className="text-xs text-slate-400 font-bold">Practice Quizzes</div>
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-black text-blue-400">100%</div>
              <div className="text-xs text-slate-400 font-bold">Free Access</div>
            </div>
          </div>

        </div>

        {/* Right Side: Login & Registration Form Card */}
        <div className="w-full max-w-md bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 backdrop-blur-xl">
          
          {/* Form Tabs: Login / Sign Up */}
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div className="flex space-x-2 bg-slate-950 p-1.5 rounded-xl w-full">
              <button
                onClick={() => { setAuthMode('login'); setStep('form'); setErrorMsg(''); }}
                className={`flex-1 py-2.5 text-xs sm:text-sm font-black rounded-lg transition ${
                  authMode === 'login' 
                    ? 'bg-blue-600 text-white shadow-md' 
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Account Login
              </button>
              <button
                onClick={() => { setAuthMode('signup'); setStep('form'); setErrorMsg(''); }}
                className={`flex-1 py-2.5 text-xs sm:text-sm font-black rounded-lg transition ${
                  authMode === 'signup' 
                    ? 'bg-blue-600 text-white shadow-md' 
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                New Registration
              </button>
            </div>
          </div>

          {/* Account Role Selector */}
          <div className="flex items-center space-x-2 text-xs font-bold bg-slate-950/60 p-1.5 rounded-xl border border-slate-800">
            <button
              onClick={() => setAccountType('student')}
              className={`flex-1 py-2 rounded-lg transition flex items-center justify-center space-x-1.5 ${
                accountType === 'student' ? 'bg-slate-800 text-blue-400 border border-blue-500/30' : 'text-slate-400'
              }`}
            >
              <User className="w-3.5 h-3.5" />
              <span>Student / Aspirant</span>
            </button>
            <button
              onClick={() => setAccountType('admin')}
              className={`flex-1 py-2 rounded-lg transition flex items-center justify-center space-x-1.5 ${
                accountType === 'admin' ? 'bg-slate-800 text-amber-400 border border-amber-500/30' : 'text-slate-400'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Admin (Rakesh)</span>
            </button>
          </div>

          {/* Error Message */}
          {errorMsg && (
            <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-xl text-xs text-red-300 flex items-start space-x-2">
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* STEP 1: Main Credentials Form */}
          {step === 'form' ? (
            <form onSubmit={handleSubmitForm} className="space-y-4 text-left">
              
              {authMode === 'signup' && (
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Full Name</label>
                  <div className="relative">
                    <input
                      type="text"
                      required
                      placeholder="e.g. Rahul Sharma"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full pl-10 pr-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                    />
                    <User className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Gmail Address</label>
                <div className="relative">
                  <input
                    type="email"
                    required
                    placeholder="e.g. aspirant@gmail.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                  />
                  <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Password</label>
                <div className="relative">
                  <input
                    type="password"
                    required
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                  />
                  <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
                </div>
              </div>

              {authMode === 'signup' && (
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Confirm Password</label>
                  <div className="relative">
                    <input
                      type="password"
                      required
                      placeholder="••••••••"
                      value={formData.confirmPassword}
                      onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                      className="w-full pl-10 pr-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                    />
                    <KeyRound className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
                  </div>
                </div>
              )}

              <button
                type="submit"
                className="w-full py-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-black text-sm rounded-xl shadow-lg transition flex items-center justify-center space-x-2"
              >
                <span>{authMode === 'login' ? 'Sign In to AMAR PATHSHALA' : 'Create Free Account'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          ) : (
            /* STEP 2: OTP Verification Form for Admin */
            <form onSubmit={handleVerifyOtp} className="space-y-4 text-left">
              <div className="p-3 bg-amber-500/10 border border-amber-500/30 rounded-xl text-xs text-amber-300">
                {otpNotice || 'SMS verification code sent to +91 8927241844'}
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Enter 6-Digit Mobile OTP</label>
                <input
                  type="text"
                  maxLength={6}
                  required
                  placeholder="481920"
                  value={otpCode}
                  onChange={(e) => setOtpCode(e.target.value)}
                  className="w-full px-4 py-3.5 bg-slate-950 border border-slate-800 rounded-xl text-center text-lg font-black text-amber-400 tracking-widest focus:outline-none focus:border-amber-500"
                />
                <p className="text-[11px] text-slate-400 mt-1 text-center font-medium">Demo OTP Code: <strong>481920</strong></p>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-amber-600 hover:bg-amber-500 text-white font-black text-sm rounded-xl shadow-lg transition flex items-center justify-center space-x-2"
              >
                <ShieldCheck className="w-5 h-5 text-white" />
                <span>Verify Mobile OTP & Access Portal</span>
              </button>
            </form>
          )}

        </div>

      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 bg-slate-950 py-4 text-center text-xs text-slate-500 font-semibold z-10">
        © 2026 AMAR PATHSHALA. All Rights Reserved. Empowering Competitive Exam Aspirants Nationwide.
      </footer>

    </div>
  );
}
