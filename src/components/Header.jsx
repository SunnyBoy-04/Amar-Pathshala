import React, { useState } from 'react';
import { 
  GraduationCap, 
  FileText, 
  BookOpen, 
  LayoutDashboard, 
  ShieldAlert, 
  Menu, 
  X, 
  ChevronDown, 
  User, 
  Bell, 
  Award,
  Sparkles,
  LogOut,
  LogIn,
  ShieldCheck
} from 'lucide-react';

export default function Header({ 
  activeTab, 
  setActiveTab, 
  selectedExam, 
  setSelectedExam,
  currentUser,
  onOpenAuthModal,
  onLogout
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [examDropdownOpen, setExamDropdownOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const examsList = [
    { id: 'sbi-po', label: 'SBI PO 2026', badge: 'Active' },
    { id: 'ssc-cgl', label: 'SSC CGL Tier-1', badge: 'Hot' },
    { id: 'upsc-csat', label: 'UPSC CSAT Prelims', badge: 'New' },
    { id: 'ibps-rrb', label: 'IBPS RRB Officer', badge: 'Active' },
  ];

  const handleNavClick = (tabId) => {
    setActiveTab(tabId);
    setMobileMenuOpen(false);
  };

  const isAdmin = currentUser?.role === 'admin';

  return (
    <header className="sticky top-0 z-40 bg-navy-900 text-white border-b border-navy-800 shadow-md">
      <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16">
        <div className="flex items-center justify-between h-16">
          
          {/* Brand Logo */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => handleNavClick('dashboard')}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-emerald-500 flex items-center justify-center shadow-lg text-white font-bold">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center space-x-1.5">
                <span className="font-extrabold text-lg sm:text-xl tracking-tight text-white">AMAR PATHSHALA</span>
                <span className="bg-emerald-500/20 text-emerald-400 text-[10px] px-2 py-0.5 rounded-full border border-emerald-500/30 font-semibold">LIVE</span>
              </div>
              <p className="text-[10px] text-slate-400 tracking-wider hidden sm:block uppercase">Government Exam Prep Portal</p>
            </div>
          </div>

          {/* Exam Switcher (Desktop) */}
          <div className="hidden md:flex items-center">
            <div className="relative">
              <button
                onClick={() => setExamDropdownOpen(!examDropdownOpen)}
                className="flex items-center space-x-2 bg-navy-800/80 hover:bg-navy-800 text-slate-200 hover:text-white px-3 py-1.5 rounded-lg border border-navy-700 text-xs font-medium transition"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>Target: <strong className="text-white font-semibold">{selectedExam}</strong></span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform ${examDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {examDropdownOpen && (
                <div className="absolute left-0 mt-2 w-56 bg-slate-900 border border-slate-800 rounded-xl shadow-xl py-2 z-50 animate-in fade-in zoom-in-95 duration-100">
                  <div className="px-3 py-1.5 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Select Target Exam</div>
                  {examsList.map((exam) => (
                    <button
                      key={exam.id}
                      onClick={() => {
                        setSelectedExam(exam.label);
                        setExamDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-navy-800 transition ${selectedExam === exam.label ? 'text-emerald-400 font-semibold bg-navy-800/50' : 'text-slate-300'}`}
                    >
                      <span>{exam.label}</span>
                      <span className="text-[10px] bg-slate-800 px-1.5 py-0.5 rounded text-slate-400">{exam.badge}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            <button
              onClick={() => handleNavClick('dashboard')}
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition ${
                activeTab === 'dashboard'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-navy-800'
              }`}
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>Dashboard</span>
            </button>

            <button
              onClick={() => handleNavClick('mock-tests')}
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition ${
                activeTab === 'mock-tests' || activeTab === 'mock-engine' || activeTab === 'test-result'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-navy-800'
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>Mock Tests</span>
              <span className="ml-1 px-1.5 py-0.2 text-[10px] bg-emerald-500 text-navy-950 font-bold rounded-full">Live</span>
            </button>

            <button
              onClick={() => handleNavClick('pdf-library')}
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition ${
                activeTab === 'pdf-library'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-navy-800'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>PDF Library</span>
            </button>

            {/* Admin Panel Tab - ONLY VISIBLE IF LOGGED IN AS ADMIN */}
            {isAdmin && (
              <button
                onClick={() => handleNavClick('admin')}
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition border ${
                  activeTab === 'admin'
                    ? 'bg-amber-600 text-white border-amber-500 shadow-sm'
                    : 'bg-amber-500/10 text-amber-300 border-amber-500/30 hover:bg-amber-500/20'
                }`}
              >
                <ShieldCheck className="w-4 h-4 text-amber-400" />
                <span>Admin Panel</span>
                <span className="px-1.5 py-0.2 text-[9px] bg-amber-400 text-slate-950 font-extrabold rounded">ADMIN</span>
              </button>
            )}
          </nav>

          {/* User Profile & Auth Controls */}
          <div className="hidden sm:flex items-center space-x-3">
            
            {currentUser ? (
              <div className="relative">
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center space-x-2 pl-2 border-l border-navy-700 hover:opacity-90 transition"
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-xs ring-2 ${
                    isAdmin ? 'bg-amber-600 ring-amber-400' : 'bg-blue-600 ring-emerald-400'
                  }`}>
                    {currentUser.avatar || 'US'}
                  </div>
                  <div className="text-left text-xs hidden xl:block">
                    <p className="font-semibold text-white flex items-center gap-1">
                      {currentUser.name}
                      {isAdmin && <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />}
                    </p>
                    <p className={`text-[10px] font-medium flex items-center gap-1 ${
                      isAdmin ? 'text-amber-300' : 'text-emerald-400'
                    }`}>
                      {isAdmin ? 'System Admin' : 'Student Account'}
                    </p>
                  </div>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                </button>

                {userDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-slate-900 border border-slate-800 rounded-xl shadow-xl py-2 z-50">
                    <div className="px-3 py-2 border-b border-slate-800">
                      <p className="text-xs font-bold text-white">{currentUser.name}</p>
                      <p className="text-[10px] text-slate-400 truncate">{currentUser.email}</p>
                      <span className={`inline-block mt-1 px-1.5 py-0.5 text-[9px] font-bold rounded ${
                        isAdmin ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' : 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                      }`}>
                        {isAdmin ? 'ADMIN ACCESS' : 'STUDENT'}
                      </span>
                    </div>

                    {isAdmin && (
                      <button
                        onClick={() => {
                          setActiveTab('admin');
                          setUserDropdownOpen(false);
                        }}
                        className="w-full text-left px-3 py-2 text-xs text-amber-300 hover:bg-navy-800 flex items-center space-x-2 font-semibold"
                      >
                        <ShieldAlert className="w-3.5 h-3.5" />
                        <span>Go to Admin Panel</span>
                      </button>
                    )}

                    <button
                      onClick={() => {
                        onLogout();
                        setUserDropdownOpen(false);
                      }}
                      className="w-full text-left px-3 py-2 text-xs text-red-400 hover:bg-navy-800 flex items-center space-x-2 font-semibold"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      <span>Log Out</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <button
                  onClick={onOpenAuthModal}
                  className="flex items-center space-x-1.5 bg-blue-600 hover:bg-blue-500 text-white px-4 py-1.5 rounded-xl text-xs font-extrabold shadow-sm transition"
                >
                  <LogIn className="w-3.5 h-3.5" />
                  <span>Log In / Sign Up</span>
                </button>
              </div>
            )}

          </div>

          {/* Mobile Menu Trigger */}
          <div className="flex md:hidden items-center space-x-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-300 hover:text-white hover:bg-navy-800 focus:outline-none"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-navy-950 border-b border-navy-800 px-4 pt-2 pb-4 space-y-2">
          
          {/* User status card in mobile */}
          <div className="py-2 border-b border-navy-800">
            {currentUser ? (
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-white">{currentUser.name}</p>
                  <span className={`text-[10px] font-semibold ${isAdmin ? 'text-amber-400' : 'text-emerald-400'}`}>
                    {isAdmin ? 'System Administrator' : 'Student Account'}
                  </span>
                </div>
                <button
                  onClick={onLogout}
                  className="px-2.5 py-1 bg-red-600/20 text-red-300 text-xs font-bold rounded"
                >
                  Log Out
                </button>
              </div>
            ) : (
              <button
                onClick={() => {
                  onOpenAuthModal();
                  setMobileMenuOpen(false);
                }}
                className="w-full py-2 bg-blue-600 text-white text-xs font-bold rounded-lg flex items-center justify-center space-x-1"
              >
                <LogIn className="w-4 h-4" />
                <span>Log In / Sign Up</span>
              </button>
            )}
          </div>

          <button
            onClick={() => handleNavClick('dashboard')}
            className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-medium ${
              activeTab === 'dashboard' ? 'bg-blue-600 text-white' : 'text-slate-300 hover:bg-navy-800'
            }`}
          >
            <LayoutDashboard className="w-5 h-5" />
            <span>Dashboard</span>
          </button>

          <button
            onClick={() => handleNavClick('mock-tests')}
            className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium ${
              activeTab === 'mock-tests' || activeTab === 'mock-engine' ? 'bg-blue-600 text-white' : 'text-slate-300 hover:bg-navy-800'
            }`}
          >
            <div className="flex items-center space-x-3">
              <FileText className="w-5 h-5" />
              <span>Mock Test Engine</span>
            </div>
            <span className="px-2 py-0.5 text-xs bg-emerald-500 text-navy-950 font-bold rounded-full">Live</span>
          </button>

          <button
            onClick={() => handleNavClick('pdf-library')}
            className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-medium ${
              activeTab === 'pdf-library' ? 'bg-blue-600 text-white' : 'text-slate-300 hover:bg-navy-800'
            }`}
          >
            <BookOpen className="w-5 h-5" />
            <span>PDF Resource Library</span>
          </button>

          {/* Admin tab conditionally rendered */}
          {isAdmin && (
            <button
              onClick={() => handleNavClick('admin')}
              className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-medium ${
                activeTab === 'admin' ? 'bg-amber-600 text-white' : 'bg-amber-500/10 text-amber-300'
              }`}
            >
              <ShieldCheck className="w-5 h-5 text-amber-400" />
              <span>Admin Dashboard</span>
            </button>
          )}

        </div>
      )}
    </header>
  );
}
